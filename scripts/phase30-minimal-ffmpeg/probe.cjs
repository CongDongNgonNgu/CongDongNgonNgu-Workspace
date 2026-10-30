'use strict';
// Disposable CI feasibility only. Never imported by the application.
const {execFileSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root='/scratch',tools='/build',evidence='/evidence';
const fixtures=require('./fixtures.json');
const started=Date.now(),deadline=started+15000;
function run(tool,args){const remaining=deadline-Date.now();if(remaining<1)throw Error('EXPERIMENT_DEADLINE');return execFileSync(path.join(tools,tool),args,{cwd:root,env:{OMP_NUM_THREADS:'1',TMPDIR:root},timeout:remaining,maxBuffer:131072,stdio:['ignore','pipe','pipe']}).toString('utf8');}
const common=['-hide_banner','-nostdin','-y','-v','error','-threads','1','-filter_threads','1','-filter_complex_threads','1','-max_alloc','33554432','-xerror','-err_detect','explode'];
const inputArgs=file=>['-protocol_whitelist','file,pipe','-i',file];
const probe=file=>JSON.parse(run('ffprobe',['-v','error','-protocol_whitelist','file,pipe','-threads','1','-max_alloc','33554432','-show_streams','-show_format','-of','json',file]));
function decode(file){run('ffmpeg',[...common,...inputArgs(file),'-map','0:v:0','-map','0:a:0?','-sn','-dn','-threads','1','-f','null','-']);}
const results=[];
for(const name of ['videoOnly','withAudio']){
 const bytes=Buffer.from(fixtures[name].base64,'base64');
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==fixtures[name].sha256)throw Error('FIXTURE_HASH');
 const source=path.join(root,name+'.mp4'),normalized=path.join(root,name+'-normalized.mp4'),thumbnail=path.join(root,name+'.jpg');fs.writeFileSync(source,bytes,{flag:'wx',mode:0o600});
 const before=probe(source);decode(source);
 run('ffmpeg',[...common,...inputArgs(source),'-map','0:v:0','-map','0:a:0?','-map_metadata','-1','-map_metadata:s','-1','-map_chapters','-1','-c','copy','-bsf:v','filter_units=remove_types=6','-movflags','+faststart',normalized]);
 decode(normalized);const after=probe(normalized);
 const video=after.streams.find(stream=>stream.codec_type==='video');
 if(video?.codec_name!=='h264'||video.width!==128||video.height!==72||after.streams.length!==(name==='withAudio'?2:1))throw Error('OUTPUT_STREAMS');
 if(name==='withAudio'&&!after.streams.some(stream=>stream.codec_type==='audio'&&stream.codec_name==='aac'&&stream.sample_rate==='48000'&&stream.channels===2))throw Error('AAC_MISMATCH');
 run('ffmpeg',[...common,...inputArgs(normalized),'-map','0:v:0','-frames:v','1','-an','-map_metadata','-1','-vf',"scale=w='min(320,iw)':h='min(320,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",'-threads','1','-c:v','mjpeg','-q:v','4','-update','1',thumbnail]);
 decode(thumbnail);const image=probe(thumbnail).streams[0];
 if(image.codec_name!=='mjpeg'||image.width>320||image.height>320||fs.statSync(thumbnail).size>262144)throw Error('THUMBNAIL');
 results.push({name,sourceHash:fixtures[name].sha256,sourceStreams:before.streams.length,outputStreams:after.streams.length,width:video.width,height:video.height,thumbnailWidth:image.width,thumbnailHeight:image.height});
}
fs.writeFileSync(path.join(evidence,'pipeline.json'),JSON.stringify({status:'BASIC_COMMAND_FEASIBILITY_ONLY',elapsedMs:Date.now()-started,results,resourceAcceptance:'NOT_RUN',applicationAuthorization:'NOT_RUN',renderAcceptance:'NOT_RUN'},null,2));
console.log('MINIMAL_PIPELINE=BASIC_COMMANDS_PASS');