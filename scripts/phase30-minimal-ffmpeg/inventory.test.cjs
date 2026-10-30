'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const baseline=path.resolve(__dirname,'../../phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/evidence-002/minimal-ffmpeg-ci40997259137');
const {checkInventory}=require('./inventory.cjs');
const read=name=>fs.readFileSync(path.join(baseline,name),'utf8');
const input=()=>Object.fromEntries(['config.h','config_components.h','ffmpeg.dynamic.txt','ffprobe.dynamic.txt','ffmpeg.versions.txt','ffprobe.versions.txt'].map(name=>[name,read(name)]));
test('accepts independently recorded actual CI component and ELF inventory',()=>{assert.deepEqual(checkInventory(input()),{components:36,configuration:90,needed:['libc.so.6','libm.so.6'],maximumGlibc:'2.35',scope:'INVENTORY_ONLY_NOT_RENDER_OR_RELEASE_CLEARANCE'});});
for(const [name,from,to] of [
 ['config_components.h','#define CONFIG_H264_DECODER 1','#define CONFIG_H264_DECODER 0'],
 ['config_components.h','#define CONFIG_HEVC_DECODER 0','#define CONFIG_HEVC_DECODER 1'],
 ['config.h','#define CONFIG_NETWORK 0','#define CONFIG_NETWORK 1'],
 ['config.h','#define CONFIG_CBS_H264 1','#define CONFIG_CBS_H264 0'],
])test('rejects changed '+from,()=>{const value=input();assert.ok(value[name].includes(from));value[name]=value[name].replace(from,to);assert.throws(()=>checkInventory(value),/INVENTORY_CONFIG/);});
for(const addition of ['#define CONFIG_UNREVIEWED 1','#define CONFIG_H264_DECODER 0','#define CONFIG_INVALID 2','# define CONFIG_HIDDEN 1'])test('rejects appended component '+addition,()=>{const value=input();value['config_components.h']+='\n'+addition+'\n';assert.throws(()=>checkInventory(value),/INVENTORY_CONFIG/);});
for(const tool of ['ffmpeg','ffprobe']){
 test(tool+' rejects extra shared dependency',()=>{const value=input();value[tool+'.dynamic.txt']+='\n 0x0000000000000001 (NEEDED) Shared library: [libcodec.so.1]\n';assert.throws(()=>checkInventory(value),/INVENTORY_ELF/);});
 for(const tag of ['RPATH','RUNPATH','TEXTREL','AUDIT','DEPAUDIT','FILTER','AUXILIARY'])test(tool+' rejects '+tag,()=>{const value=input();value[tool+'.dynamic.txt']+='\n 0x000000000000000f ('+tag+') [injected]\n';assert.throws(()=>checkInventory(value),/INVENTORY_ELF/);});
 for(const version of ['GLIBC_2.36','GLIBC_PRIVATE','GCC_4.0.0','GLIBC_2.350'])test(tool+' rejects '+version,()=>{const value=input();value[tool+'.versions.txt']+='\n 0x00e0: Name: '+version+' Flags: none Version: 99\n';assert.throws(()=>checkInventory(value),/INVENTORY_ABI/);});
 test(tool+' rejects empty ELF evidence',()=>{const value=input();value[tool+'.dynamic.txt']='';assert.throws(()=>checkInventory(value),/INVENTORY_INPUT/);});
 test(tool+' rejects missing version requirements',()=>{const value=input();value[tool+'.versions.txt']='No version information found';assert.throws(()=>checkInventory(value),/INVENTORY_ABI/);});
}
test('rejects missing and oversized evidence',()=>{for(const bad of [undefined,'x'.repeat(262145)]){const value=input();value['config.h']=bad;assert.throws(()=>checkInventory(value),/INVENTORY_INPUT/);}});
