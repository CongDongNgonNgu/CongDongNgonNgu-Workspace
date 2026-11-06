'use strict';
// Owned synthetic command observations only. Never an application/worker acceptance gate.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const {spawnSync}=require('node:child_process');
const {performance}=require('node:perf_hooks');
const {buildAacFixture,CASES}=require('./aac-fixtures.cjs');
const STAGES=Object.freeze(['SOURCE_PROBE','SOURCE_DECODE','NORMALIZE','OUTPUT_PROBE','OUTPUT_DECODE','THUMBNAIL','THUMBNAIL_DECODE']);
const MAX_OUTPUT=131072,BUDGET_MS=55000;
const PINS=Object.freeze({ffmpeg:'031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3',ffprobe:'36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3'});
const BASE=Object.freeze(['-hide_banner','-nostdin','-y','-v','error','-threads','1','-filter_threads','1','-filter_complex_threads','1','-max_alloc','33554432','-xerror','-err_detect','explode']);
const sha=b=>createHash('sha256').update(b).digest('hex');
const fail=()=>{throw Error('AAC_OBSERVATION_REJECTED');};
function observeCommand(result,stage){
 if(!STAGES.includes(stage)||!result||typeof result!=='object')fail();
 const stdout=Buffer.isBuffer(result.stdout)?result.stdout:Buffer.alloc(0),stderr=Buffer.isBuffer(result.stderr)?result.stderr:Buffer.alloc(0);
 if(stdout.length>196608||stderr.length>196608)fail();
 const status=Number.isInteger(result.status)&&result.status>=0&&result.status<=255?result.status:null;
 const signal=typeof result.signal==='string'&&/^SIG[A-Z0-9]{1,12}$/.test(result.signal)?result.signal:null;
 let error='NONE';
 if(result.error?.code==='ETIMEDOUT')error='TIMEOUT';
 else if(stdout.length>MAX_OUTPUT||stderr.length>MAX_OUTPUT||result.error?.code==='ENOBUFS'||result.error?.code==='ERR_CHILD_PROCESS_STDIO_MAXBUFFER')error='OUTPUT_LIMIT';
 else if(result.error||signal||status===null||(result.signal!==null&&result.signal!==undefined&&signal===null))error='EXECUTION';
 let audioProfile='NONE';
 if(stage.endsWith('PROBE')){
  try{
   const data=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(stdout));
   const audio=Array.isArray(data.streams)?data.streams.filter(s=>s.codec_type==='audio'):[];
   if(audio.length)audioProfile=audio.length===1&&audio[0].codec_name==='aac'&&['LC','HE-AAC','HE-AACv2'].includes(audio[0].profile)?audio[0].profile:'OTHER';
  }catch{audioProfile='OTHER';}
 }
 const exitPredicate=status===0&&signal===null&&error==='NONE';
 return {stage,status,signal,error,stdoutBytes:stdout.length,stderrBytes:stderr.length,stdoutSha256:sha(stdout),stderrSha256:sha(stderr),lateSbrError:stderr.toString('utf8').includes('Implicit SBR was found with a first occurrence after the first frame.'),audioProfile,exitPredicate,quietPredicate:exitPredicate&&stderr.length===0,exitAndLcProfilePredicate:exitPredicate&&audioProfile==='LC'};
}
function skipped(stage,error='NOT_RUN'){
 return {stage,status:null,signal:null,error,stdoutBytes:0,stderrBytes:0,stdoutSha256:sha(Buffer.alloc(0)),stderrSha256:sha(Buffer.alloc(0)),lateSbrError:false,audioProfile:'NONE',exitPredicate:false,quietPredicate:false,exitAndLcProfilePredicate:false};
}
function commands(input,normalized,thumbnail){
 const probe=file=>['ffprobe',['-v','error','-protocol_whitelist','file,pipe','-threads','1','-max_alloc','33554432','-show_streams','-show_format','-show_chapters','-of','json',file]];
 const decode=file=>['ffmpeg',[...BASE,'-protocol_whitelist','file,pipe','-i',file,'-map','0:v:0','-map','0:a:0?','-sn','-dn','-threads','1','-f','null','-']];
 return [probe(input),decode(input),['ffmpeg',[...BASE,'-protocol_whitelist','file,pipe','-i',input,'-map','0:v:0','-map','0:a:0?','-map_metadata','-1','-map_metadata:s','-1','-map_chapters','-1','-metadata:s:v:0','language=und','-metadata:s:v:0','handler_name=VideoHandler','-metadata:s:a:0','language=und','-metadata:s:a:0','handler_name=SoundHandler','-c','copy','-bsf:v','filter_units=remove_types=6','-movflags','+faststart',normalized]],probe(normalized),decode(normalized),['ffmpeg',[...BASE,'-protocol_whitelist','file,pipe','-i',normalized,'-map','0:v:0','-frames:v','1','-an','-map_metadata','-1','-vf',"scale=w='min(320,iw)':h='min(320,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",'-threads','1','-c:v','mjpeg','-q:v','4','-update','1',thumbnail]],['ffmpeg',[...BASE,'-protocol_whitelist','file,pipe','-i',thumbnail,'-threads','1','-f','null','-']]];
}
function measuredFile(file,limit){
 let info;try{info=fs.lstatSync(file);}catch(e){if(e.code==='ENOENT')return null;throw e;}
 if(!info.isFile()||info.size<1||info.size>67108864)fail();
 return {bytes:info.size,valid:info.size<=limit};
}
function runExperiment({source,directory,invoke,now=()=>performance.now()}){
 if(!Buffer.isBuffer(source)||typeof invoke!=='function'||typeof now!=='function'||path.resolve(directory)!==directory||!fs.lstatSync(directory).isDirectory()||fs.realpathSync.native(directory)!==directory)fail();
 const original=sha(source),started=now(),results=[];
 const remaining=()=>{const elapsed=now()-started;if(!Number.isFinite(elapsed)||elapsed<0)fail();return BUDGET_MS-elapsed;};
 for(const name of CASES){
  const bytes=buildAacFixture(source,name),input=path.join(directory,name+'.input.mp4'),normalized=path.join(directory,name+'.normalized.mp4'),thumbnail=path.join(directory,name+'.jpg');
  fs.writeFileSync(input,bytes,{flag:'wx',mode:0o600});
  const record={name,status:'OBSERVED',sourceBytes:bytes.length,sourceSha256:sha(bytes),normalizedBytes:null,thumbnailBytes:null,commands:[]};
  const steps=commands(input,normalized,thumbnail);let fatal=false,noNormalized=false,noThumbnail=false;
  for(let i=0;i<STAGES.length;i++){
   const stage=STAGES[i],left=remaining();
   if(left<=0){record.status=record.commands.some(c=>!['NOT_RUN','BUDGET'].includes(c.error))?'ERROR':'NOT_RUN';record.commands.push(skipped(stage,'BUDGET'));continue;}
   if(fatal||(i>=3&&noNormalized)||(i===6&&noThumbnail)){record.commands.push(skipped(stage));continue;}
   const [tool,args]=steps[i];let result;
   try{result=invoke(tool,args,Math.max(1,Math.min(3000,Math.floor(left))));}catch{result={status:null,signal:null,error:{code:'EXECUTION'}};}
   const observation=observeCommand(result,stage);record.commands.push(observation);
   if(observation.error!=='NONE'||observation.signal){fatal=true;record.status='ERROR';}
   if(i===2){const file=measuredFile(normalized,3145728);record.normalizedBytes=file?.bytes??null;noNormalized=!file?.valid;if(file&&!file.valid){fatal=true;record.status='ERROR';}}
   if(i===5){const file=measuredFile(thumbnail,262144);record.thumbnailBytes=file?.bytes??null;noThumbnail=!file?.valid;if(file&&!file.valid){fatal=true;record.status='ERROR';}}
  }
  if(sha(fs.readFileSync(input))!==record.sourceSha256)fail();
  results.push(record);
 }
 if(sha(source)!==original)fail();
 const positiveControlsValid=results.slice(0,2).every(r=>r.status==='OBSERVED'&&r.normalizedBytes>0&&r.normalizedBytes<=3145728&&r.thumbnailBytes>0&&r.thumbnailBytes<=262144&&r.commands.every(c=>c.quietPredicate)&&r.commands.filter(c=>c.stage.endsWith('PROBE')).every(c=>c.exitAndLcProfilePredicate));
 return {scope:'AAC_COMMAND_OBSERVATIONS_ONLY_NOT_SECURITY_PASS',complete:results.every(r=>r.status==='OBSERVED'),positiveControlsValid,results,resourceAcceptance:'NOT_RUN',workerAcceptance:'NOT_RUN',renderAcceptance:'NOT_RUN',continuationPolicy:'INDEPENDENT_COMMAND_OBSERVATIONS'};
}
function verifyTool(name){
 const file='/processors/'+name,fd=fs.openSync(file,fs.constants.O_RDONLY|(fs.constants.O_NOFOLLOW||0)|(fs.constants.O_NONBLOCK||0));
 try{
  const before=fs.fstatSync(fd);if(!before.isFile()||before.size<1||before.size>16777216)fail();
  const hash=createHash('sha256'),buffer=Buffer.alloc(65536);let count=0;
  for(;;){const n=fs.readSync(fd,buffer,0,buffer.length,null);if(!n)break;count+=n;if(count>before.size)fail();hash.update(buffer.subarray(0,n));}
  const after=fs.fstatSync(fd);if(count!==before.size||after.size!==before.size||after.mtimeMs!==before.mtimeMs||after.ctimeMs!==before.ctimeMs||hash.digest('hex')!==PINS[name])fail();
 }finally{fs.closeSync(fd);}
}
module.exports={observeCommand,runExperiment,STAGES};
if(require.main===module){
 let directory;
 try{
  if(process.platform!=='linux'||process.arch!=='x64'||process.argv.length!==2)fail();
  for(const name of Object.keys(PINS))verifyTool(name);
  const info=fs.lstatSync('/fixtures.json');if(!info.isFile()||info.size<1||info.size>32768)fail();
  const fixture=JSON.parse(fs.readFileSync('/fixtures.json','utf8'));if(typeof fixture.withAudio?.base64!=='string'||fixture.withAudio.base64.length>8192)fail();
  const source=Buffer.from(fixture.withAudio.base64,'base64');
  if(source.toString('base64')!==fixture.withAudio.base64)fail();
  directory=fs.mkdtempSync('/scratch/aac-probe-');
  const invoke=(tool,args,timeout)=>spawnSync('/processors/'+tool,args,{cwd:directory,env:{OMP_NUM_THREADS:'1',TMPDIR:directory,TMP:directory,TEMP:directory},shell:false,windowsHide:true,timeout,killSignal:'SIGKILL',maxBuffer:MAX_OUTPUT,stdio:['ignore','pipe','pipe']});
  const result=runExperiment({source,directory,invoke});console.log(JSON.stringify(result));
 }catch{console.error('AAC_OBSERVATION_REJECTED');process.exitCode=1;}
 finally{if(directory){if(!/^\/scratch\/aac-probe-[A-Za-z0-9]+$/.test(directory))throw Error('UNSAFE_SCRATCH');fs.rmSync(directory,{recursive:true,force:true});}}
}
