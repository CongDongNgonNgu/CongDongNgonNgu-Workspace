'use strict';
// Research source inspection only. Never extracts, builds or executes source.
const fs = require('node:fs');
const {createHash} = require('node:crypto');
const {gunzipSync, inflateRawSync} = require('node:zlib');
const ROOT = 'nasm-2.16.03';
const SOURCE_BYTES = 1688160;
const SOURCE_SHA = '5bc940dd8a4245686976a8f7e96ba9340a0915f2d5b88356874890e207bdb581';
const MAX_TAR = 16 * 1024 * 1024;
const CRITICAL = Object.freeze({
 LICENSE: '1563996c52e220e15ef2418e67d39488255aa8c28c89e617074d3afe3ee329e0',
 configure: '6fd0c93645fa81312a94c2d4d0c663df7ce7f7de9839393fba0e2a875d9c888e',
 INSTALL: 'fff279722d876b04e70826b4768a93f2ecba5e0c0146f479ce5f6dfe5d332676',
 version: '950b3339c2fd68c6cd81bec41148fe4994b68d0fd1eaafbb112f92a1bb9a2107',
});
const fail = code => { throw new Error(code); };
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const zero = bytes => bytes.every(x => x === 0);
function number(bytes) {
 const value = bytes.toString('latin1');
 if (!/^[0-7]+(?:\0| )*$/.test(value)) fail('SOURCE_NUMBER');
 const n = Number.parseInt(value, 8);
 if (!Number.isSafeInteger(n)) fail('SOURCE_NUMBER');
 return n;
}
function nameField(bytes) {
 const end = bytes.indexOf(0);
 if (end >= 0 && !zero(bytes.subarray(end))) fail('SOURCE_PATH');
 const name = bytes.subarray(0, end < 0 ? bytes.length : end).toString('latin1');
 if (!/^[A-Za-z0-9._/+\-]+$/.test(name)) fail('SOURCE_PATH');
 return name;
}
function decodeGzip(bytes) {
 if (!Buffer.isBuffer(bytes) || bytes.length < 18 || bytes.length > SOURCE_BYTES) fail('SOURCE_GZIP_LIMIT');
 if (bytes[0] !== 31 || bytes[1] !== 139 || bytes[2] !== 8 || ![0,8].includes(bytes[3])) fail('SOURCE_GZIP_HEADER');
 let start = 10;
 if (bytes[3] === 8) {
  const end = bytes.indexOf(0, start);
  if (end < start || end > start + 128 || end >= bytes.length - 8) fail('SOURCE_GZIP_HEADER');
  if (!/^[A-Za-z0-9._-]+$/.test(bytes.subarray(start,end).toString('latin1'))) fail('SOURCE_GZIP_HEADER');
  start = end + 1;
 }
 let decoded;
 try { decoded = inflateRawSync(bytes.subarray(start), {maxOutputLength: MAX_TAR, info: true}); }
 catch { fail('SOURCE_GZIP'); }
 if (decoded.engine.bytesWritten !== bytes.length - start - 8) fail('SOURCE_GZIP_TRAILING');
 // Gunzip independently verifies trailer CRC32 and ISIZE after framing is closed.
 try {
  const verified = gunzipSync(bytes, {maxOutputLength: MAX_TAR});
  if (!verified.equals(decoded.buffer)) fail('SOURCE_GZIP');
 } catch { fail('SOURCE_GZIP'); }
 return decoded.buffer;
}
function checkTar(tar) {
 if (!Buffer.isBuffer(tar) || tar.length > MAX_TAR || tar.length % 512 !== 0) fail('SOURCE_TAR_LIMIT');
 const seen = new Map();
 const critical = Object.create(null);
 let offset = 0, files = 0, fileBytes = 0, terminated = false;
 while (offset + 512 <= tar.length) {
  const h = tar.subarray(offset,offset+512);
  if (zero(h)) {
   if (offset + 1024 > tar.length || !zero(tar.subarray(offset,offset+1024))) fail('SOURCE_TERMINATOR');
   if (!zero(tar.subarray(offset))) fail('SOURCE_TRAILING');
   terminated = true; break;
  }
  if (seen.size >= 1300) fail('SOURCE_MEMBER_LIMIT');
  let sum = 0;
  for (let i=0;i<512;i++) sum += i>=148 && i<156 ? 32 : h[i];
  if (number(h.subarray(148,156)) !== sum) fail('SOURCE_CHECKSUM');
  // Closed GNU header used by this exact release; no long-name/PAX/prefix semantics.
  if (!h.subarray(257,265).equals(Buffer.from('ustar  \0')) || !zero(h.subarray(345))) fail('SOURCE_HEADER');
  const type = String.fromCharCode(h[156]);
  if (!['0','5'].includes(type) || !zero(h.subarray(157,257))) fail('SOURCE_ENTRY');
  let name = nameField(h.subarray(0,100));
  if (type === '5' && name.endsWith('/')) name = name.slice(0,-1);
  const parts = name.split('/');
  if (parts[0] !== ROOT || parts.some(p => !p || p === '.' || p === '..') || (parts.length===1 && type!=='5')) fail('SOURCE_PATH');
  if (seen.has(name)) fail('SOURCE_DUPLICATE');
  for(let i=1;i<parts.length;i++) if(seen.get(parts.slice(0,i).join('/'))==='0') fail('SOURCE_PARENT');
  if(type==='0' && [...seen.keys()].some(p=>p.startsWith(name+'/'))) fail('SOURCE_PARENT');
  const size = number(h.subarray(124,136));
  if(size > 1500000) fail('SOURCE_FILE_LIMIT');
  if(type==='5' && size!==0) fail('SOURCE_DIRECTORY');
  fileBytes += size;
  if(fileBytes > 13000000) fail('SOURCE_EXPANDED_LIMIT');
  const end = offset+512+size, next = offset+512+Math.ceil(size/512)*512;
  if(next > tar.length) fail('SOURCE_TRUNCATED');
  if(!zero(tar.subarray(end,next))) fail('SOURCE_PADDING');
  seen.set(name,type);
  if(type==='0') {
   files++;
   const relative=parts.slice(1).join('/');
   if(Object.hasOwn(CRITICAL,relative)) critical[relative]=sha(tar.subarray(offset+512,end));
  }
  offset=next;
 }
 if(!terminated) fail('SOURCE_TERMINATOR');
 if(!files) fail('SOURCE_EMPTY');
 return {members:seen.size,files,fileBytes,tarBytes:tar.length,critical:{...critical}};
}
function inspectSource(bytes) {
 if(!Buffer.isBuffer(bytes) || bytes.length!==SOURCE_BYTES || sha(bytes)!==SOURCE_SHA) fail('SOURCE_IDENTITY');
 const result=checkTar(decodeGzip(bytes));
 if(result.members!==1218 || result.files!==1190 || result.fileBytes!==12673767 || result.tarBytes!==13639680) fail('SOURCE_INVENTORY');
 for(const [name,digest] of Object.entries(CRITICAL)) if(result.critical[name]!==digest) fail('SOURCE_CRITICAL_HASH');
 return {scope:'RESEARCH_SOURCE_ONLY_NO_EXTRACTION',archiveBytes:SOURCE_BYTES,archiveSha256:SOURCE_SHA,...result};
}
function inspectFile(path) {
 // Reject symlink/nonregular inputs before open; enforce the same on the opened fd.
 const initial=fs.lstatSync(path);
 if(!initial.isFile() || initial.size!==SOURCE_BYTES) fail('SOURCE_INPUT_FILE');
 const fd=fs.openSync(path,fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
 try {
  const opened=fs.fstatSync(fd);
  if(!opened.isFile() || opened.size!==SOURCE_BYTES || opened.dev!==initial.dev || opened.ino!==initial.ino) fail('SOURCE_INPUT_FILE');
  const bytes=Buffer.alloc(SOURCE_BYTES+1);let total=0;
  while(total<bytes.length) {const n=fs.readSync(fd,bytes,total,bytes.length-total,null);if(!n)break;total+=n;}
  return inspectSource(bytes.subarray(0,total));
 } finally {fs.closeSync(fd);}
}
module.exports={checkTar,decodeGzip,inspectSource,inspectFile};
if(require.main===module) {
 try {if(process.argv.length!==3) fail('SOURCE_ARGUMENTS');console.log(JSON.stringify(inspectFile(process.argv[2])));}
 catch {console.error('NASM_SOURCE_REJECTED');process.exitCode=1;}
}
