'use strict';
const fs=require('node:fs'),path=require('node:path');
function annotation(name,text){return '::error title=FFmpeg experiment '+name+'::'+text.slice(-2000).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,'').replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A');}
function report(root,success=false){
 for(const name of (success?['security.json','pipeline.json','compiler.txt','builder-libc.txt','ffmpeg.sha256','ffprobe.sha256']:['stage.txt','configure.log','build.log','container.log','guard.log','pipeline.log','sei-frames.json'])){
  const file=path.join(root,name);let descriptor;
  try{if(!fs.lstatSync(file).isFile())throw Error('REPORT_FILE_TYPE');descriptor=fs.openSync(file,fs.constants.O_RDONLY|(fs.constants.O_NOFOLLOW??0));const info=fs.fstatSync(descriptor);if(!info.isFile())continue;const length=Math.min(info.size,2000),bytes=Buffer.alloc(length);fs.readSync(descriptor,bytes,0,length,Math.max(0,info.size-length));console.log(annotation(name,bytes.toString('utf8')).replace(/^::error/,success?'::notice':'::error'));}
  catch(error){if(error.code!=='ENOENT')throw error;}
  finally{if(descriptor!==undefined)fs.closeSync(descriptor);}
 }
}
module.exports={annotation,report};
if(require.main===module){const success=process.argv.length===4&&process.argv[2]==='--success';if(!success&&process.argv.length!==3)throw Error('REPORT_ARGUMENTS');report(process.argv[success?3:2],success);}