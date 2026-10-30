'use strict';
const fs=require('node:fs'),path=require('node:path');
function annotation(name,text){return '::error title=FFmpeg experiment '+name+'::'+text.slice(-2000).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,'').replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A');}
function report(root){
 for(const name of ['stage.txt','configure.log','build.log','container.log']){
  const file=path.join(root,name);let descriptor;
  try{descriptor=fs.openSync(file,'r');const info=fs.fstatSync(descriptor);if(!info.isFile())continue;const length=Math.min(info.size,2000),bytes=Buffer.alloc(length);fs.readSync(descriptor,bytes,0,length,Math.max(0,info.size-length));console.log(annotation(name,bytes.toString('utf8')));}
  catch(error){if(error.code!=='ENOENT')throw error;}
  finally{if(descriptor!==undefined)fs.closeSync(descriptor);}
 }
}
module.exports={annotation};
if(require.main===module){if(process.argv.length!==3)throw Error('REPORT_ARGUMENTS');report(process.argv[2]);}