'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {createHash}=require('node:crypto');
const {parseTargets,collectFromRoots}=require('./collect-dependencies.cjs');
const receipt=JSON.parse(fs.readFileSync(path.join(__dirname,'../../phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/evidence-002/simd-ci42152274083/raw-text.json'),'utf8'));
const originalLog=receipt.files.find(x=>x.name==='build.log').text;
assert.equal(createHash('sha256').update(originalLog).digest('hex'),'b4a5a12dc4d08ee1f9df772c6d7f619467ecab99a55ebcb426c513526699bac2');
const expected=originalLog.split(/\r?\n/).filter(x=>x.startsWith('X86ASM\t')).map(x=>x.slice(7)).sort();
const generated=['config.asm','config_components.asm','libswscale/x86/uops_macros.gen.asm'];
function fixture(fn){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-dependency-test-'));
 const objects=path.join(temp,'objects'),evidence=path.join(temp,'evidence');fs.mkdirSync(objects);fs.mkdirSync(evidence);
 const log=path.join(evidence,'build.log');fs.writeFileSync(log,originalLog);
 const write=(name,text)=>{const file=path.join(objects,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);};
 for(const target of expected)write(target.replace(/\.o$/,'.d'),target+': /build/source/'+target.replace(/\.o$/,'.asm')+' config.asm\n');
 for(const file of generated)write(file,'%define SYNTHETIC_FIXTURE 1\n');
 try{fn({temp,objects,evidence,log,write});}
 finally{const resolved=path.resolve(temp);assert.ok(resolved.startsWith(path.resolve(os.tmpdir())+path.sep+'phase30-dependency-test-'));fs.rmSync(resolved,{recursive:true,force:true});}
}
test('collects only48 pinned targets and three generated files without mutating source',()=>fixture(({objects,log,write})=>{
 write('unapproved.d','never read');const before=fs.readFileSync(log);const r=collectFromRoots(objects,log);
 assert.deepEqual(r.targets,expected);assert.equal(r.files.length,51);assert.equal(r.scope,'RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE');
 assert.deepEqual(r.files.filter(x=>x.kind==='generated').map(x=>x.path),generated);assert.ok(!r.files.some(x=>x.path==='unapproved.d'));
 for(const file of r.files){const bytes=fs.readFileSync(path.join(objects,file.path));assert.equal(file.bytes,bytes.length);assert.equal(file.text,bytes.toString());assert.equal(file.sha256,createHash('sha256').update(bytes).digest('hex'));}
 assert.deepEqual(fs.readFileSync(log),before);assert.equal(r.limits.dependencyFileBytes,65536);assert.equal(r.limits.generatedFileBytes,131072);assert.equal(r.limits.totalFileBytes,524288);
}));
test('accepts parallel-build target ordering only as a closed set',()=>assert.deepEqual(parseTargets(expected.slice().reverse().map(p=>'X86ASM\t'+p).join('\n')),expected));
for(const bad of ['../../outside.o','/outside.o','libavcodec/x86/../h264.o','libavcodec\\x86\\h264.o','libavcodec/x86/unknown.o','libavcodec/x86/h264_idct.o extra'])test('rejects unexpected or unsafe target '+bad,()=>assert.throws(()=>parseTargets(originalLog+'\nX86ASM\t'+bad),/DEPENDENCY_TARGET/));
test('rejects duplicate target before file access',()=>assert.throws(()=>parseTargets(originalLog+'\nX86ASM\t'+expected[0]),/DEPENDENCY_TARGET/));
test('rejects missing target',()=>assert.throws(()=>parseTargets(originalLog.replace('X86ASM\t'+expected[0]+'\n','')),/DEPENDENCY_TARGET/));
test('rejects malformed X86ASM log line',()=>assert.throws(()=>parseTargets(originalLog+'\nX86ASM '+expected[0]),/DEPENDENCY_TARGET/));
test('rejects missing dependency file',()=>fixture(({objects,log})=>{fs.unlinkSync(path.join(objects,expected[0].replace(/\.o$/,'.d')));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_INPUT/);}));
test('rejects missing exact generated file',()=>fixture(({objects,log})=>{fs.unlinkSync(path.join(objects,generated[2]));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_INPUT/);}));
test('rejects oversized dependency before reading it',()=>fixture(({objects,log,write})=>{write(expected[0].replace(/\.o$/,'.d'),Buffer.alloc(65537,65));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_FILE_LIMIT/);}));
test('allows exact64KiB dependency and128KiB generated bounds',()=>fixture(({objects,log,write})=>{write(expected[0].replace(/\.o$/,'.d'),Buffer.alloc(65536,65));write('config_components.asm',Buffer.alloc(131072,65));const r=collectFromRoots(objects,log);assert.equal(r.files.find(x=>x.path==='config_components.asm').bytes,131072);}));
test('rejects oversized generated file',()=>fixture(({objects,log,write})=>{write('config_components.asm',Buffer.alloc(131073,65));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_FILE_LIMIT/);}));
test('rejects aggregate overflow',()=>fixture(({objects,log,write})=>{for(const target of expected.slice(0,9))write(target.replace(/\.o$/,'.d'),Buffer.alloc(65536,65));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_TOTAL/);}));
for(const bytes of [Buffer.from([0]),Buffer.from([255]),Buffer.from([27,91,49]),Buffer.from([0xc2,0x80])])test('rejects unsafe raw dependency text '+bytes.toString('hex'),()=>fixture(({objects,log,write})=>{write(expected[0].replace(/\.o$/,'.d'),bytes);assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_TEXT/);}));
test('does not traverse paths contained inside raw dependency text',()=>fixture(({objects,log,write})=>{const text=expected[0]+': ../../outside /etc/passwd C:/private\n';write(expected[0].replace(/\.o$/,'.d'),text);const r=collectFromRoots(objects,log);assert.equal(r.files[0].text,text);}));
test('rejects oversized log',()=>fixture(({objects,log})=>{fs.writeFileSync(log,Buffer.alloc(1048577,65));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_FILE_LIMIT/);}));
test('rejects file growth after open',()=>fixture(({objects,log})=>{const file=path.join(objects,expected[0].replace(/\.o$/,'.d'));const original=fs.readSync;let changed=false;fs.readSync=function(fd,...args){if(!changed&&fs.fstatSync(fd).ino===fs.statSync(file).ino){changed=true;fs.appendFileSync(file,'X');}return original(fd,...args);};try{assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_INPUT_CHANGED/);}finally{fs.readSync=original;}}));
test('rejects symlink file',{skip:process.platform==='win32'},()=>fixture(({objects,log,temp})=>{const file=path.join(objects,expected[0].replace(/\.o$/,'.d'));const outside=path.join(temp,'outside');fs.writeFileSync(outside,'private fixture');fs.unlinkSync(file);fs.symlinkSync(outside,file);assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_INPUT/);}));
test('rejects intermediate symlink directory',{skip:process.platform==='win32'},()=>fixture(({objects,log,temp})=>{const directory=path.join(objects,'libavcodec','x86'),moved=path.join(temp,'moved');fs.renameSync(directory,moved);fs.symlinkSync(moved,directory);assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_DIRECTORY/);}));
test('rejects FIFO input immediately',{skip:process.platform!=='linux'},()=>fixture(({objects,log})=>{const {spawnSync}=require('node:child_process');const file=path.join(objects,expected[0].replace(/\.o$/,'.d'));fs.unlinkSync(file);assert.equal(spawnSync('mkfifo',[file],{timeout:1000}).status,0);assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_INPUT/);}));

test('enforces total bounds immediately below, at and above512KiB',()=>fixture(({objects,log,write})=>{
 for(const target of expected)write(target.replace(/\.o$/,'.d'),'A');
 for(const name of generated)write(name,Buffer.alloc(131072,65));
 for(const target of expected.slice(0,2))write(target.replace(/\.o$/,'.d'),Buffer.alloc(65536,65));
 write(generated[2],Buffer.alloc(131025,65));assert.equal(collectFromRoots(objects,log).totalFileBytes,524287);
 write(generated[2],Buffer.alloc(131026,65));assert.equal(collectFromRoots(objects,log).totalFileBytes,524288);
 write(generated[2],Buffer.alloc(131027,65));assert.throws(()=>collectFromRoots(objects,log),/DEPENDENCY_TOTAL/);
}));
test('rejects regular-to-FIFO substitution without blocking',{skip:process.platform!=='linux'},()=>fixture(({objects,log})=>{
 const {spawnSync}=require('node:child_process');const file=path.join(objects,expected[0].replace(/\.o$/,'.d'));
 const script='const fs=require("node:fs"),{spawnSync}=require("node:child_process");const file=process.argv[4],original=fs.lstatSync;let replaced=false;fs.lstatSync=function(p){const info=original(p);if(p===file&&!replaced){replaced=true;fs.unlinkSync(file);const result=spawnSync("mkfifo",[file],{timeout:1000});if(result.status!==0)throw Error("FIXTURE_FIFO");}return info;};try{require(process.argv[3]).collectFromRoots(process.argv[1],process.argv[2]);process.exitCode=2;}catch(e){if(e.message!=="DEPENDENCY_INPUT")throw e;}';
 const result=spawnSync(process.execPath,['-e',script,objects,log,require.resolve('./collect-dependencies.cjs'),file],{timeout:2000,encoding:'utf8'});
 assert.equal(result.error,undefined);assert.equal(result.status,0,result.stderr);
}));

for(const selected of [expected[0].replace(/\.o$/,'.d'),'config_components.asm'])test('preserves UTF8 BOM bytes in '+selected,()=>fixture(({objects,log,write})=>{
 const original=Buffer.from('\ufeffSYNTHETIC_RAW_EVIDENCE\n');write(selected,original);
 const record=collectFromRoots(objects,log).files.find(x=>x.path===selected);
 const reconstructed=Buffer.from(record.text,'utf8');
 assert.deepEqual(reconstructed,original);assert.equal(reconstructed.length,record.bytes);
 assert.equal(createHash('sha256').update(reconstructed).digest('hex'),record.sha256);
}));
