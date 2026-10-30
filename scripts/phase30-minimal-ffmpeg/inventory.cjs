'use strict';
// Isolated build-evidence guard, never application/runtime or licensing clearance.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const baseline=path.resolve(__dirname,'../../phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/evidence-002/minimal-ffmpeg-ci40997259137');
const pins={'config.h':'99970b0b636ab0ad787c8b5e3b2c86e303d0cffe8513ce80eaa80585e486397e','config_components.h':'2d148bc791cb57f17db86d5bcd8011956a10abd91cdfec3b8fbdca3f3f1ebfe5'};
const files=[...Object.keys(pins),...['ffmpeg','ffprobe'].flatMap(tool=>[tool+'.dynamic.txt',tool+'.versions.txt'])];
function declarations(text){
 const result=[];
 for(const line of text.split(/\r?\n/)){
  if(!/^\s*#\s*define\s+CONFIG_/.test(line))continue;
  const match=/^#define (CONFIG_[A-Z0-9_]+) (0|1|2026)$/.exec(line);
  if(!match||(match[2]==='2026'&&match[1]!=='CONFIG_THIS_YEAR'))throw Error('INVENTORY_CONFIG_DECLARATION');
  result.push([match[1],match[2]]);
 }
 if(!result.length)throw Error('INVENTORY_CONFIG_EMPTY');
 return result.sort(([a],[b])=>a.localeCompare(b));
}
function checkInventory(input){
 for(const name of files)if(typeof input?.[name]!=='string'||!input[name].length||Buffer.byteLength(input[name])>262144)throw Error('INVENTORY_INPUT');
 const enabled={};
 for(const [name,sha256] of Object.entries(pins)){
  const recorded=fs.readFileSync(path.join(baseline,name));
  if(createHash('sha256').update(recorded).digest('hex')!==sha256)throw Error('INVENTORY_BASELINE_HASH');
  const actual=declarations(input[name]),expected=declarations(recorded.toString('utf8'));
  if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('INVENTORY_CONFIG_CHANGED');
  enabled[name]=actual.filter(([,value])=>value==='1').length;
 }
 const allowedTags=new Set(['NEEDED','INIT','FINI','INIT_ARRAY','INIT_ARRAYSZ','FINI_ARRAY','FINI_ARRAYSZ','HASH','GNU_HASH','STRTAB','SYMTAB','STRSZ','SYMENT','DEBUG','PLTGOT','PLTRELSZ','PLTREL','JMPREL','RELA','RELASZ','RELAENT','VERNEED','VERNEEDNUM','VERSYM','NULL']);
 const needed=['libc.so.6','libm.so.6'];
 for(const tool of ['ffmpeg','ffprobe']){
  const dynamic=input[tool+'.dynamic.txt'],tags=[...dynamic.matchAll(/^\s*0x[0-9a-f]+\s+\(([^)]+)\)/gm)].map(match=>match[1]);
  const dependencies=[...dynamic.matchAll(/\(NEEDED\)\s+Shared library: \[([^\]]+)\]/g)].map(match=>match[1]).sort();
  if(!tags.length||tags.some(tag=>!allowedTags.has(tag))||tags.filter(tag=>tag==='NEEDED').length!==2||JSON.stringify(dependencies)!==JSON.stringify(needed))throw Error('INVENTORY_ELF');
  const versions=input[tool+'.versions.txt'];
  const libraries=[...versions.matchAll(/File:\s+(\S+)/g)].map(match=>match[1]).sort();
  const names=[...versions.matchAll(/Name:\s+(\S+)/g)].map(match=>match[1]);
  if(JSON.stringify(libraries)!==JSON.stringify(needed)||!names.length||names.some(name=>!/^GLIBC_\d+\.\d+(?:\.\d+)?$/.test(name)))throw Error('INVENTORY_ABI');
  let maximum=[0,0,0];
  for(const name of names){const parts=name.slice(6).split('.').map(Number);while(parts.length<3)parts.push(0);if(parts[0]!==2||parts[1]>35||(parts[1]===35&&parts[2]>0))throw Error('INVENTORY_ABI');for(let i=0;i<3;i++){if(parts[i]>maximum[i]){maximum=parts;break;}if(parts[i]<maximum[i])break;}}
  if(maximum.join('.')!=='2.35.0')throw Error('INVENTORY_ABI_BASELINE');
 }
 return {components:enabled['config_components.h'],configuration:enabled['config.h'],needed,maximumGlibc:'2.35',scope:'INVENTORY_ONLY_NOT_RENDER_OR_RELEASE_CLEARANCE'};
}
module.exports={checkInventory};
if(require.main===module){try{if(process.argv.length!==3)throw Error('INVENTORY_ARGUMENTS');const directory=path.resolve(process.argv[2]);const input={};for(const name of files){const file=path.join(directory,name),info=fs.lstatSync(file);if(!info.isFile()||info.size<1||info.size>262144)throw Error('INVENTORY_INPUT');input[name]=fs.readFileSync(file,'utf8');}console.log(JSON.stringify(checkInventory(input)));}catch(error){console.error(/^INVENTORY_[A-Z_]+$/.test(error.message)?error.message:'INVENTORY_REJECTED');process.exitCode=1;}}
