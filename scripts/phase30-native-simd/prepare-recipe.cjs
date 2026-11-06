'use strict';
// Offline research recipe derivation. No source or processor is executed here.
const fs=require('node:fs');
const {createHash}=require('node:crypto');
const {execFileSync}=require('node:child_process');
const BASE_SHA='ffbcec79112bc6f19a6e565feac98fa862cd6a19a6a7579d858585e4ecc00f08';
const BEFORE='--disable-x86asm';
const AFTER='--enable-x86asm --x86asmexe=/build/nasm-source/nasm';
const sha=b=>createHash('sha256').update(b).digest('hex');
function deriveRecipe(bytes){
 if(!Buffer.isBuffer(bytes)||bytes.length>16384||sha(bytes)!==BASE_SHA)throw Error('RECIPE_IDENTITY');
 const text=bytes.toString('utf8');
 if(text.split(BEFORE).length!==2)throw Error('RECIPE_DELTA');
 return Buffer.from(text.replace(BEFORE,AFTER));
}
module.exports={deriveRecipe};
if(require.main===module){
 try{
  if(process.argv.length!==3)throw Error('RECIPE_ARGUMENTS');
  const original=execFileSync('git',['show','HEAD:scripts/phase30-minimal-ffmpeg/build.sh'],{maxBuffer:16384,timeout:3000,stdio:['ignore','pipe','ignore']});
  const derived=deriveRecipe(original);
  fs.writeFileSync(process.argv[2],derived,{flag:'wx',mode:0o400});
  console.log(JSON.stringify({scope:'RESEARCH_RECIPE_ONLY',baselineSha256:sha(original),derivedSha256:sha(derived),before:BEFORE,after:AFTER}));
 }catch{console.error('CANDIDATE_RECIPE_REJECTED');process.exitCode=1;}
}
