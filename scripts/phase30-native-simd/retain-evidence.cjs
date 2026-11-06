'use strict';
// Closed text-only research upload. No build directory or archive is retained.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const FILES=Object.freeze(['stage.txt','source-proof.json','recipe-proof.json','candidate-recipe.sh','nasm-configure.log','nasm-build.log','nasm-config.log','nasm-version.txt','nasm.sha256','nasm-LICENSE','container.log','configure.log','build.log','compiler.txt','binutils.txt','builder-libc.txt','builder-os.txt','configure-args.txt','config.h','config_components.h','config.mak','inventory.json','config-delta.txt','object-inventory.txt','source-assembly-inventory.txt','LICENSE.md','COPYING.LGPLv2.1','COPYING.LGPLv3','COPYING.GPLv2','COPYING.GPLv3',...['ffmpeg','ffprobe'].flatMap(t=>[t+'.sha256',t+'.dynamic.txt',t+'.versions.txt',t+'.program-headers.txt',t+'.version.txt',t+'.protocols.txt']),'decoders.txt','encoders.txt','filters.txt','bsfs.txt']);
function checkText(bytes){
 if(!Buffer.isBuffer(bytes)||bytes.length>1048576)throw Error('EVIDENCE_TEXT_LIMIT');
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{throw Error('EVIDENCE_TEXT_UTF8');}
 if(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(text))throw Error('EVIDENCE_TEXT_CONTROL');
 return bytes;
}
function retain(directory,target,hostDirectory){
 const directories=hostDirectory===undefined?[directory]:[directory,hostDirectory];
 for(const input of directories)if(!fs.lstatSync(input).isDirectory())throw Error('EVIDENCE_DIRECTORY');
 fs.mkdirSync(target,{mode:0o700});
 const manifest={scope:'RESEARCH_TEXT_ONLY_NOT_BINARY_OR_SOURCE_CLOSURE',files:{},missing:[],bytes:0};
 for(const name of FILES){
  let file,stat,sourceIndex;
  for(const [index,input] of directories.entries()){
   const candidate=path.join(input,name);let info;
   try{info=fs.lstatSync(candidate);}catch(e){if(e.code==='ENOENT')continue;throw e;}
   if(stat)throw Error('EVIDENCE_DUPLICATE');file=candidate;stat=info;sourceIndex=index;
  }
  if(!stat){manifest.missing.push(name);continue;}
  if(!stat.isFile()||stat.size>1048576)throw Error('EVIDENCE_INPUT');
  const fd=fs.openSync(file,fs.constants.O_RDONLY|(fs.constants.O_NOFOLLOW||0)|(fs.constants.O_NONBLOCK||0));
  let bytes;try{
   const opened=fs.fstatSync(fd);
   if(!opened.isFile()||opened.size!==stat.size||opened.dev!==stat.dev||opened.ino!==stat.ino)throw Error('EVIDENCE_INPUT');
   const b=Buffer.alloc(stat.size+1);let n=0;
   while(n<b.length){const count=fs.readSync(fd,b,n,b.length-n,null);if(!count)break;n+=count;}
   if(n!==stat.size)throw Error('EVIDENCE_INPUT');bytes=checkText(b.subarray(0,n));
  }finally{fs.closeSync(fd);}
  manifest.bytes+=bytes.length;if(manifest.bytes>8*1048576)throw Error('EVIDENCE_TOTAL');
  fs.writeFileSync(path.join(target,name),bytes,{flag:'wx',mode:0o400});
  manifest.files[name]={sourceIndex,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
 }
 fs.writeFileSync(path.join(target,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx',mode:0o400});
 return manifest;
}
module.exports={checkText,retain};
if(require.main===module){try{if(![4,5].includes(process.argv.length))throw Error('EVIDENCE_ARGUMENTS');const result=retain(process.argv[2],process.argv[3],process.argv[4]);console.log(JSON.stringify({files:Object.keys(result.files).length,bytes:result.bytes,missing:result.missing.length}));}catch{console.error('RESEARCH_EVIDENCE_REJECTED');process.exitCode=1;}}
