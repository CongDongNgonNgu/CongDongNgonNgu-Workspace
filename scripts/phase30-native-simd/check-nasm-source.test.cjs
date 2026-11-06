'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {gzipSync}=require('node:zlib');
const {checkTar,decodeGzip,inspectSource}=require('./check-nasm-source.cjs');
const root='nasm-2.16.03';
function header(name,size=0,type='0') {
 const h=Buffer.alloc(512);h.write(name);h.write('0000664\0',100);h.write('0000000\0',108);h.write('0000000\0',116);
 h.write(size.toString(8).padStart(11,'0')+'\0',124);h.write('00000000000\0',136);h.fill(32,148,156);h.write(type,156);h.write('ustar  \0',257);checksum(h);return h;
}
function checksum(h){h.fill(32,148,156);h.write([...h].reduce((a,b)=>a+b,0).toString(8).padStart(6,'0')+'\0 ',148);return h;}
function entry(name,data=Buffer.alloc(0),type='0'){return Buffer.concat([header(name,data.length,type),data,Buffer.alloc((512-data.length%512)%512)]);}
function tar(...entries){return Buffer.concat([...entries,Buffer.alloc(1024)]);}
const valid=()=>tar(entry(root+'/',Buffer.alloc(0),'5'),entry(root+'/version',Buffer.from('2.16.03\n')));
test('inspects safe regular research tar without extraction',()=>assert.deepEqual(checkTar(valid()),{members:2,files:1,fileBytes:8,tarBytes:2560,critical:{version:'950b3339c2fd68c6cd81bec41148fe4994b68d0fd1eaafbb112f92a1bb9a2107'}}));
for(const name of ['../evil','/nasm-2.16.03/a','C:/evil',root+'/../evil',root+'//a',root+'/./a',root+'/a\\b',root+'/a:b',root+'/a\nb','foreign/a'])test('rejects unsafe path '+JSON.stringify(name),()=>assert.throws(()=>checkTar(tar(entry(name))),/SOURCE_PATH/));
for(const type of ['1','2','3','4','6','7','x','g','L','K'])test('rejects unsupported tar type '+type,()=>assert.throws(()=>checkTar(tar(entry(root+'/a',Buffer.alloc(0),type))),/SOURCE_ENTRY/));
test('rejects duplicate paths',()=>assert.throws(()=>checkTar(tar(entry(root+'/a'),entry(root+'/a'))),/SOURCE_DUPLICATE/));
for(const reverse of [false,true])test('rejects parent-file collision order '+reverse,()=>{const a=[entry(root+'/a'),entry(root+'/a/b')];assert.throws(()=>checkTar(tar(...(reverse?a.reverse():a))),/SOURCE_PARENT/);});
test('rejects corrupt header checksum',()=>{const b=valid();b[100]^=1;assert.throws(()=>checkTar(b),/SOURCE_CHECKSUM/);});
test('rejects link target even for regular type',()=>{const h=header(root+'/a');h.write('foreign',157);assert.throws(()=>checkTar(tar(checksum(h))),/SOURCE_ENTRY/);});
test('rejects unsupported magic',()=>{const h=header(root+'/a');h[257]=0;assert.throws(()=>checkTar(tar(checksum(h))),/SOURCE_HEADER/);});
test('rejects noncanonical name after NUL',()=>{const h=header(root+'/a');h[99]=65;assert.throws(()=>checkTar(tar(checksum(h))),/SOURCE_PATH/);});
test('rejects numeric garbage',()=>{const h=header(root+'/a');h.write('00000000009\0',124);assert.throws(()=>checkTar(tar(checksum(h))),/SOURCE_NUMBER/);});
test('rejects binary numeric size',()=>{const h=header(root+'/a');h[124]=128;assert.throws(()=>checkTar(tar(checksum(h))),/SOURCE_NUMBER/);});
test('rejects directory data',()=>assert.throws(()=>checkTar(tar(entry(root+'/',Buffer.from('x'),'5'))),/SOURCE_DIRECTORY/));
test('rejects oversized member before payload access',()=>assert.throws(()=>checkTar(tar(header(root+'/a',1500001))),/SOURCE_FILE_LIMIT/));
test('rejects too many members',()=>assert.throws(()=>checkTar(tar(...Array.from({length:1301},(_,i)=>entry(root+'/'+i)))),/SOURCE_MEMBER_LIMIT/));
test('rejects expanded file total',()=>assert.throws(()=>checkTar(tar(...Array.from({length:9},(_,i)=>entry(root+'/'+i,Buffer.alloc(1500000))))),/SOURCE_EXPANDED_LIMIT/));
test('rejects oversized tar',()=>assert.throws(()=>checkTar(Buffer.alloc(16*1024*1024+512)),/SOURCE_TAR_LIMIT/));
test('rejects truncated payload',()=>assert.throws(()=>checkTar(header(root+'/a',1000)),/SOURCE_TRUNCATED/));
test('rejects nonzero file padding',()=>{const b=valid();b[1024+8]=1;assert.throws(()=>checkTar(b),/SOURCE_PADDING/);});
test('rejects missing two-block terminator',()=>assert.throws(()=>checkTar(valid().subarray(0,1536)),/SOURCE_TERMINATOR/));
test('rejects nonzero bytes after terminator',()=>assert.throws(()=>checkTar(Buffer.concat([valid(),Buffer.alloc(512,1)])),/SOURCE_TRAILING/));
test('rejects empty tar',()=>assert.throws(()=>checkTar(Buffer.alloc(1024)),/SOURCE_EMPTY/));
test('accepts one complete CRC-checked gzip member',()=>assert.deepEqual(decodeGzip(gzipSync(valid())),valid()));
test('rejects concatenated gzip members',()=>assert.throws(()=>decodeGzip(Buffer.concat([gzipSync(valid()),gzipSync(valid())])),/SOURCE_GZIP_TRAILING/));
test('rejects gzip trailing data',()=>assert.throws(()=>decodeGzip(Buffer.concat([gzipSync(valid()),Buffer.from('x')])),/SOURCE_GZIP_TRAILING/));
test('rejects gzip CRC corruption',()=>{const b=gzipSync(valid());b[b.length-8]^=1;assert.throws(()=>decodeGzip(b),/SOURCE_GZIP/);});
test('rejects gzip expansion bomb',()=>assert.throws(()=>decodeGzip(gzipSync(Buffer.alloc(16*1024*1024+1))),/SOURCE_GZIP/));
test('rejects unsupported gzip optional fields',()=>{const b=gzipSync(valid());b[3]=4;assert.throws(()=>decodeGzip(b),/SOURCE_GZIP_HEADER/);});
test('rejects unpinned source bytes before parsing',()=>assert.throws(()=>inspectSource(gzipSync(valid())),/SOURCE_IDENTITY/));

test('accepts a bounded ordinary gzip filename',()=>{const b=gzipSync(valid());const h=Buffer.from(b.subarray(0,10));h[3]=8;assert.deepEqual(decodeGzip(Buffer.concat([h,Buffer.from('source.tar\0'),b.subarray(10)])),valid());});
test('rejects unterminated gzip filename',()=>{const b=Buffer.alloc(200,65);b[0]=31;b[1]=139;b[2]=8;b[3]=8;assert.throws(()=>decodeGzip(b),/SOURCE_GZIP_HEADER/);});
test('rejects oversized compressed input before decompression',()=>assert.throws(()=>decodeGzip(Buffer.alloc(1688161)),/SOURCE_GZIP_LIMIT/));
test('rejects truncated gzip',()=>assert.throws(()=>decodeGzip(gzipSync(valid()).subarray(0,20)),/SOURCE_GZIP/));
test('rejects incomplete tar record',()=>assert.throws(()=>checkTar(Buffer.alloc(513)),/SOURCE_TAR_LIMIT/));
test('rejects tampered bytes with exact archive size',()=>assert.throws(()=>inspectSource(Buffer.alloc(1688160)),/SOURCE_IDENTITY/));
test('file interface rejects directories and wrong-size files',()=>{
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path');const {inspectFile}=require('./check-nasm-source.cjs');const dir=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-nasm-test-'));
 try {assert.throws(()=>inspectFile(dir),/SOURCE_INPUT_FILE/);const file=path.join(dir,'wrong.tar.gz');fs.writeFileSync(file,'synthetic');assert.throws(()=>inspectFile(file),/SOURCE_INPUT_FILE/);assert.deepEqual(fs.readdirSync(dir),['wrong.tar.gz']);}
 finally {fs.rmSync(dir,{recursive:true,force:true});}
});
test('file interface rejects symlinks without following',{skip:process.platform==='win32'},()=>{
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path');const {inspectFile}=require('./check-nasm-source.cjs');const dir=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-nasm-test-'));
 try {const file=path.join(dir,'target');fs.writeFileSync(file,Buffer.alloc(1688160));const link=path.join(dir,'link');fs.symlinkSync(file,link);assert.throws(()=>inspectFile(link),/SOURCE_INPUT_FILE/);}
 finally {fs.rmSync(dir,{recursive:true,force:true});}
});

test('rejects regular-to-FIFO replacement without blocking',{skip:process.platform!=='linux'},()=>{
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path');const {spawnSync}=require('node:child_process');const dir=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-nasm-fifo-'));const target=path.join(dir,'source');
 try {
  fs.writeFileSync(target,Buffer.alloc(1688160));
  const child=spawnSync(process.execPath,['-e',
   'const fs=require("node:fs"),{spawnSync}=require("node:child_process");const target=process.argv[1];const original=fs.lstatSync;fs.lstatSync=function(p){const s=original(p);if(p===target){fs.unlinkSync(target);const r=spawnSync("mkfifo",[target],{timeout:1000});if(r.status!==0)throw Error("FIXTURE_FIFO");}return s;};try{require(process.argv[2]).inspectFile(target);process.exitCode=2;}catch(e){if(e.message!=="SOURCE_INPUT_FILE")throw e;}',target,require.resolve('./check-nasm-source.cjs')],{timeout:2000,encoding:'utf8'});
  assert.equal(child.error,undefined);assert.equal(child.status,0,child.stderr);
 } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
