'use strict';
// Offline research evidence only. Never follows paths found inside dependency text.
const fs=require('node:fs');
const path=require('node:path');
const {createHash}=require('node:crypto');
// Closed targets observed in committed CI42152274083/build.log, whose text SHA is below.
const TARGETS=Object.freeze([
 "libavcodec/x86/aacpsdsp.o",
 "libavcodec/x86/blockdsp.o",
 "libavcodec/x86/fpel.o",
 "libavcodec/x86/h264_chromamc.o",
 "libavcodec/x86/h264_chromamc_10bit.o",
 "libavcodec/x86/h264_deblock.o",
 "libavcodec/x86/h264_deblock_10bit.o",
 "libavcodec/x86/h264_idct.o",
 "libavcodec/x86/h264_idct_10bit.o",
 "libavcodec/x86/h264_intrapred.o",
 "libavcodec/x86/h264_intrapred_10bit.o",
 "libavcodec/x86/h264_qpel_10bit.o",
 "libavcodec/x86/h264_qpel_8bit.o",
 "libavcodec/x86/h264_weight.o",
 "libavcodec/x86/h264_weight_10bit.o",
 "libavcodec/x86/hpeldsp.o",
 "libavcodec/x86/idctdsp.o",
 "libavcodec/x86/me_cmp.o",
 "libavcodec/x86/mpegvideoencdsp.o",
 "libavcodec/x86/pixblockdsp.o",
 "libavcodec/x86/qpel.o",
 "libavcodec/x86/sbrdsp.o",
 "libavcodec/x86/simple_idct10.o",
 "libavcodec/x86/videodsp.o",
 "libavfilter/x86/vf_hflip.o",
 "libavfilter/x86/vf_transpose.o",
 "libavutil/x86/aes.o",
 "libavutil/x86/cpuid.o",
 "libavutil/x86/crc.o",
 "libavutil/x86/fixed_dsp.o",
 "libavutil/x86/float_dsp.o",
 "libavutil/x86/imgutils.o",
 "libavutil/x86/lls.o",
 "libavutil/x86/tx_float.o",
 "libswresample/x86/audio_convert.o",
 "libswresample/x86/rematrix.o",
 "libswresample/x86/resample.o",
 "libswscale/x86/input.o",
 "libswscale/x86/ops_common.o",
 "libswscale/x86/ops_float.o",
 "libswscale/x86/ops_int.o",
 "libswscale/x86/output.o",
 "libswscale/x86/range_convert.o",
 "libswscale/x86/rgb_2_rgb.o",
 "libswscale/x86/scale.o",
 "libswscale/x86/scale_avx2.o",
 "libswscale/x86/yuv2yuvX.o",
 "libswscale/x86/yuv_2_rgb.o"
]);
const GENERATED=Object.freeze(['config.asm','config_components.asm','libswscale/x86/uops_macros.gen.asm']);
const LIMITS=Object.freeze({dependencyFileBytes:65536,generatedFileBytes:131072,totalFileBytes:524288,buildLogBytes:1048576});
const OBSERVED_LOG_SHA='b4a5a12dc4d08ee1f9df772c6d7f619467ecab99a55ebcb426c513526699bac2';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=code=>{throw Error(code);};
function safeText(bytes){
 let text;
 try{text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);}catch{fail('DEPENDENCY_TEXT');}
 if(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/.test(text))fail('DEPENDENCY_TEXT');
 return text;
}
function parseTargets(text){
 if(typeof text!=='string'||Buffer.byteLength(text)>LIMITS.buildLogBytes)fail('DEPENDENCY_FILE_LIMIT');
 safeText(Buffer.from(text));
 const targets=[];
 for(const line of text.split(/\r?\n/)){
  if(!/^\s*X86ASM/.test(line))continue;
  const match=/^X86ASM\t([A-Za-z0-9_./]+\.o)$/.exec(line);
  if(!match||!TARGETS.includes(match[1])||targets.includes(match[1]))fail('DEPENDENCY_TARGET');
  targets.push(match[1]);
 }
 targets.sort();
 if(JSON.stringify(targets)!==JSON.stringify(TARGETS))fail('DEPENDENCY_TARGET');
 return targets;
}
function parents(root,relative){
 const names=[root];
 const parts=relative.split('/');
 for(let i=1;i<parts.length;i++)names.push(path.join(root,...parts.slice(0,i)));
 return names.map(name=>{
  const info=fs.lstatSync(name);
  if(!info.isDirectory()||fs.realpathSync.native(name)!==name)fail('DEPENDENCY_DIRECTORY');
  return {dev:info.dev,ino:info.ino};
 });
}
function readOwnedText(root,relative,limit){
 // Inputs are read-only after the build has exited; this is not atomic openat isolation
 // against a malicious concurrent directory writer or a kernel I/O cancellation claim.
 if(!path.isAbsolute(root)||path.resolve(root)!==root||!relative||relative.split('/').some(x=>!x||x==='.'||x==='..')||!/^[A-Za-z0-9_./]+$/.test(relative))fail('DEPENDENCY_INPUT');
 try{
  const beforeParents=parents(root,relative);
  const file=path.join(root,...relative.split('/'));
  const initial=fs.lstatSync(file);
  if(!initial.isFile())fail('DEPENDENCY_INPUT');
  if(initial.size<1||initial.size>limit)fail('DEPENDENCY_FILE_LIMIT');
  const fd=fs.openSync(file,fs.constants.O_RDONLY|(fs.constants.O_NOFOLLOW||0)|(fs.constants.O_NONBLOCK||0));
  try{
   const opened=fs.fstatSync(fd);
   if(!opened.isFile()||opened.size!==initial.size||opened.dev!==initial.dev||opened.ino!==initial.ino)fail('DEPENDENCY_INPUT');
   const bytes=Buffer.alloc(opened.size+1);let total=0;
   while(total<bytes.length){const n=fs.readSync(fd,bytes,total,bytes.length-total,null);if(!n)break;total+=n;}
   const after=fs.fstatSync(fd);
   if(total!==opened.size||after.size!==opened.size||after.mtimeMs!==opened.mtimeMs||after.ctimeMs!==opened.ctimeMs||JSON.stringify(parents(root,relative))!==JSON.stringify(beforeParents))fail('DEPENDENCY_INPUT_CHANGED');
   const content=bytes.subarray(0,total);
   return {bytes:total,sha256:sha(content),text:safeText(content)};
  }finally{fs.closeSync(fd);}
 }catch(error){if(/^DEPENDENCY_[A-Z_]+$/.test(error.message))throw error;fail('DEPENDENCY_INPUT');}
}
function collectFromRoots(objectsRoot,logPath){
 // Root injection is a test seam. Operational CLI below admits no paths/options.
 if(!path.isAbsolute(logPath)||path.resolve(logPath)!==logPath||path.basename(logPath)!=='build.log')fail('DEPENDENCY_INPUT');
 const buildLog=readOwnedText(path.dirname(logPath),'build.log',LIMITS.buildLogBytes);
 const targets=parseTargets(buildLog.text);
 const selections=[...targets.map(target=>({path:target.slice(0,-2)+'.d',kind:'dependency',target})),...GENERATED.map(file=>({path:file,kind:'generated'}))];
 const files=[];let totalFileBytes=0;
 for(const selection of selections){
  const record=readOwnedText(objectsRoot,selection.path,selection.kind==='dependency'?LIMITS.dependencyFileBytes:LIMITS.generatedFileBytes);
  totalFileBytes+=record.bytes;
  if(totalFileBytes>LIMITS.totalFileBytes)fail('DEPENDENCY_TOTAL');
  files.push({...selection,...record});
 }
 return {scope:'RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE',targetProvenance:{run:42152274083,observedBuildLogSha256:OBSERVED_LOG_SHA},limits:LIMITS,buildLog:{bytes:buildLog.bytes,sha256:buildLog.sha256},targets,totalFileBytes,files};
}
module.exports={parseTargets,collectFromRoots};
if(require.main===module){
 try{if(process.argv.length!==2)fail('DEPENDENCY_ARGUMENTS');console.log(JSON.stringify(collectFromRoots('/build/objects','/evidence/build.log')));}
 catch{console.error('ASSEMBLY_DEPENDENCIES_REJECTED');process.exitCode=1;}
}
