'use strict';
// Disposable CI feasibility only. Never imported by the application.
const {execFileSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root='/scratch',tools='/build',evidence='/evidence';
const fixtures=require('./fixtures.json'),{corruptFixture}=require('./corrupt-fixture.cjs');
const started=Date.now(),deadline=started+15000;
function run(tool,args){const remaining=deadline-Date.now();if(remaining<1)throw Error('EXPERIMENT_DEADLINE');return execFileSync(path.join(tools,tool),args,{cwd:root,env:{OMP_NUM_THREADS:'1',TMPDIR:root},timeout:remaining,maxBuffer:131072,stdio:['ignore','pipe','pipe']}).toString('utf8');}
const common=['-hide_banner','-nostdin','-y','-v','error','-threads','1','-filter_threads','1','-filter_complex_threads','1','-max_alloc','33554432','-xerror','-err_detect','explode'];
const inputArgs=file=>['-protocol_whitelist','file,pipe','-i',file];
const probe=file=>JSON.parse(run('ffprobe',['-v','error','-protocol_whitelist','file,pipe','-threads','1','-max_alloc','33554432','-show_streams','-show_format','-of','json',file]));
function decode(file){run('ffmpeg',[...common,...inputArgs(file),'-map','0:v:0','-map','0:a:0?','-sn','-dn','-threads','1','-f','null','-']);}
function normalize(source,output,audio){return run('ffmpeg',[...common,...inputArgs(source),'-map','0:v:0','-map','0:a:0?','-map_metadata','-1','-map_metadata:s','-1','-map_chapters','-1','-metadata:s:v:0','language=und','-metadata:s:v:0','handler_name=VideoHandler',...(audio?['-metadata:s:a:0','language=und','-metadata:s:a:0','handler_name=SoundHandler']:[]),'-c','copy','-bsf:v','filter_units=remove_types=6','-movflags','+faststart',output]);}
const results=[];
for(const name of ['videoOnly','withAudio']){
 const bytes=Buffer.from(fixtures[name].base64,'base64');
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==fixtures[name].sha256)throw Error('FIXTURE_HASH');
 const source=path.join(root,name+'.mp4'),normalized=path.join(root,name+'-normalized.mp4'),thumbnail=path.join(root,name+'.jpg');fs.writeFileSync(source,bytes,{flag:'wx',mode:0o600});
 const before=probe(source);decode(source);
 normalize(source,normalized,name==='withAudio');
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
// Positive controls precede absence assertions; all marker values are synthetic.
const markers={title:'PHASE30_SYNTHETIC_TITLE',comment:'PHASE30_SYNTHETIC_COMMENT',sei:'PHASE30_SYNTHETIC_SEI_ONLY',stream:'PHASE30_SYNTHETIC_STREAM'};
const decorated=path.join(root,'decorated.mp4'),sanitized=path.join(root,'sanitized.mp4');
run('ffmpeg',[...common,...inputArgs(path.join(root,'videoOnly.mp4')),'-map','0:v:0','-c','copy','-metadata','title='+markers.title,'-metadata','comment='+markers.comment,'-metadata:s:v:0','handler_name='+markers.stream,'-bsf:v','h264_metadata=sei_user_data=11111111-2222-3333-4444-555555555555+'+markers.sei,'-movflags','+faststart',decorated]);
const decoratedBytes=fs.readFileSync(decorated),decoratedHash=crypto.createHash('sha256').update(decoratedBytes).digest('hex');
const sourceInfo=probe(decorated);decode(decorated);
if(sourceInfo.format?.tags?.title!==markers.title||sourceInfo.format?.tags?.comment!==markers.comment||sourceInfo.streams[0]?.tags?.handler_name!==markers.stream||!decoratedBytes.includes(Buffer.from(markers.sei)))throw Error('METADATA_POSITIVE_CONTROL');
function seiCount(file){const frames=JSON.parse(run('ffprobe',['-v','error','-protocol_whitelist','file,pipe','-threads','1','-max_alloc','33554432','-select_streams','v:0','-show_frames','-of','json',file])).frames;if(!Array.isArray(frames)||frames.length!==2)throw Error('FRAME_POSITIVE_CONTROL');return frames.reduce((count,frame)=>count+(frame.side_data_list??[]).filter(data=>data.side_data_type==='H.26[45] User Data Unregistered SEI message').length,0);}
const sourceSei=seiCount(decorated);if(sourceSei<1)throw Error('SEI_POSITIVE_CONTROL');
normalize(decorated,sanitized,false);decode(sanitized);const normalizedInfo=probe(sanitized),normalizedBytes=fs.readFileSync(sanitized),outputSei=seiCount(sanitized);
if(outputSei!==0||normalizedInfo.format?.tags?.title!==undefined||normalizedInfo.format?.tags?.comment!==undefined||Object.values(markers).some(marker=>normalizedBytes.includes(Buffer.from(marker)))||normalizedInfo.streams[0]?.tags?.handler_name!=='VideoHandler')throw Error('SYNTHETIC_METADATA_SURVIVED');
if(crypto.createHash('sha256').update(fs.readFileSync(decorated)).digest('hex')!==decoratedHash)throw Error('SOURCE_MUTATED');
const corrupt=corruptFixture(Buffer.from(fixtures.videoOnly.base64,'base64')),corrupted=path.join(root,'corrupted.mp4');fs.writeFileSync(corrupted,corrupt.bytes,{flag:'wx',mode:0o600});
if(probe(corrupted).streams[0]?.codec_name!=='h264')throw Error('CORRUPT_CONTAINER_NOT_PROBED');
let corruptExit;
try{decode(corrupted);}catch(error){if(!Number.isInteger(error.status)||error.status<1||error.signal||error.code||!Buffer.isBuffer(error.stderr)||error.stderr.length<1||error.stderr.length>131072)throw error;corruptExit=error.status;}
if(corruptExit===undefined)throw Error('CORRUPT_DECODE_ACCEPTED');
fs.writeFileSync(path.join(evidence,'security.json'),JSON.stringify({status:'SYNTHETIC_METADATA_AND_CORRUPT_SLICE_PROBES_ONLY',metadataPositiveControl:true,sourceSei,outputSei,syntheticMarkersRemoved:true,sourceUnchanged:true,corruptSliceCount:corrupt.changedSlices,corruptDecodeExit:corruptExit,fullWorker:'NOT_RUN',resourceAcceptance:'NOT_RUN',renderAcceptance:'NOT_RUN',authorizationAcceptance:'NOT_RUN'},null,2));
console.log('SYNTHETIC_METADATA_CORRUPTION_PROBES=PASS');
