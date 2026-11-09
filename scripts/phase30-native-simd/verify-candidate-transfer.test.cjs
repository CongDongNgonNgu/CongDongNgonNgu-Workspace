'use strict';
// Opaque synthetic bytes exercise transfer identity only, never package validity.
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createHash}=require('node:crypto');
const {verifyTransfer}=require('./verify-candidate-transfer.cjs');
const sha=b=>createHash('sha256').update(b).digest('hex');
const SOURCE='a'.repeat(40);
const BINARY_PINS={ffmpeg:'031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3',ffprobe:'36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3'};
function fixture(t){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-transfer-'));
 t.after(()=>{
  const resolved=path.resolve(root),temp=path.resolve(os.tmpdir());
  assert.equal(path.dirname(resolved),temp);assert.match(path.basename(resolved),/^phase30-transfer-[A-Za-z0-9]+$/);
  assert.equal(fs.lstatSync(resolved).isDirectory(),true);assert.equal(fs.lstatSync(resolved).isSymbolicLink(),false);
  fs.rmSync(resolved,{recursive:true,force:true});
 });
 const archive=path.join(root,'simd-candidate.tar.gz'),host=path.join(root,'simd-host');
 fs.mkdirSync(host);
 const bytes=Buffer.from('OPAQUE SYNTHETIC BYTES - NOT AN ARCHIVE');fs.writeFileSync(archive,bytes);
 const proof={scope:'INTERNAL_SIMD_MATERIAL_CANDIDATE_ONLY',archiveBytes:bytes.length,archiveSha256:sha(bytes),repeatArchiveSha256:sha(bytes),readback:'PASS',capsuleReadback:'PASS',sameInputsTwoArchiveWrites:'IDENTICAL',licenseClearance:'HOLD',materialClearance:'HOLD_INDEPENDENT_REVIEW',nativePublication:'NOT_RUN',backendAdoption:'NOT_RUN',renderAcceptance:'NOT_RUN',workerAcceptance:'NOT_RUN',resourceAcceptance:'NOT_RUN',members:Object.fromEntries(Object.entries(BINARY_PINS).map(([n,p])=>['bin/'+n,{bytes:1,sha256:p}])),capsuleInventories:{}};
 const proofPath=path.join(host,'candidate-archive-proof.json');
 const save=()=>fs.writeFileSync(proofPath,JSON.stringify(proof));save();
 return {root,archive,proof,proofPath,save,bytes,options:{root,eventName:'workflow_dispatch',retainCandidate:'true',sourceSha:SOURCE}};
}
function rejects(options){assert.throws(()=>verifyTransfer(options));}
test('explicit manual identity succeeds for opaque fixture without package approval',t=>{
 const f=fixture(t),result=verifyTransfer(f.options);
 assert.equal(result.scope,'CONTROLLED_CANDIDATE_TRANSFER_IDENTITY_ONLY');
 assert.equal(result.archiveBytes,f.bytes.length);assert.equal(result.archiveSha256,sha(f.bytes));assert.equal(result.sourceSha,SOURCE);
 assert.equal(fs.readFileSync(f.archive).equals(f.bytes),true);
});
test('opt out, automated event and malformed source fail closed',t=>{
 const f=fixture(t);
 for(const patch of [{retainCandidate:'false'},{retainCandidate:true},{retainCandidate:undefined},{eventName:'push'},{eventName:'pull_request'},{sourceSha:'abc'},{sourceSha:'a'.repeat(39)+'g'}])rejects({...f.options,...patch});
});
test('missing proof and candidate deny transfer',t=>{
 const f=fixture(t);fs.unlinkSync(f.proofPath);rejects(f.options);f.save();fs.unlinkSync(f.archive);rejects(f.options);
});
test('wrong bytes, size, second identity and binary provenance deny transfer',t=>{
 const f=fixture(t);
 for(const patch of [{archiveSha256:'0'.repeat(64)},{archiveBytes:f.bytes.length+1},{repeatArchiveSha256:'0'.repeat(64)}]){const previous={...f.proof};Object.assign(f.proof,patch);f.save();rejects(f.options);Object.assign(f.proof,previous);}
 f.proof.members['bin/ffmpeg'].sha256='0'.repeat(64);f.save();rejects(f.options);
});
test('success, HOLD and no-adoption proof states are mandatory',t=>{
 const f=fixture(t);
 for(const [key,value]of [['scope','OTHER'],['readback','FAIL'],['capsuleReadback','FAIL'],['sameInputsTwoArchiveWrites','DIFFERENT'],['licenseClearance','PASS'],['materialClearance','PASS'],['backendAdoption','PASS'],['nativePublication','PASS'],['workerAcceptance','PASS'],['resourceAcceptance','PASS'],['renderAcceptance','PASS']]){const old=f.proof[key];f.proof[key]=value;f.save();rejects(f.options);f.proof[key]=old;}
});
test('proof and candidate hard size limits apply before reading large payloads',t=>{
 const f=fixture(t);fs.writeFileSync(f.proofPath,Buffer.alloc(65537,32));rejects(f.options);f.save();
 const fd=fs.openSync(f.archive,'w');fs.ftruncateSync(fd,64*1024*1024+1);fs.closeSync(fd);rejects(f.options);
});
test('duplicate proof keys cannot silently replace provenance',t=>{
 const f=fixture(t),raw=fs.readFileSync(f.proofPath,'utf8');fs.writeFileSync(f.proofPath,raw.replace('{','{"backendAdoption":"PASS",'));rejects(f.options);
});
test('symlink candidate and symlink proof deny transfer',{skip:process.platform==='win32'?'Linux nofollow gate; Windows symlink privilege differs':false},t=>{
 const f=fixture(t),target=path.join(f.root,'target');fs.renameSync(f.archive,target);fs.symlinkSync(target,f.archive);rejects(f.options);fs.unlinkSync(f.archive);fs.renameSync(target,f.archive);
 const proofTarget=path.join(f.root,'proof-target');fs.renameSync(f.proofPath,proofTarget);fs.symlinkSync(proofTarget,f.proofPath);rejects(f.options);
});
test('changed candidate during fd reads denies transfer',t=>{
 const f=fixture(t),real=fs.readSync;let changed=false;
 t.mock.method(fs,'readSync',function(fd,...args){const count=real.call(fs,fd,...args);if(!changed&&fs.fstatSync(fd).size===f.bytes.length){changed=true;const file=fs.openSync(f.archive,'a');fs.writeSync(file,Buffer.from('changed'));fs.closeSync(file);}return count;});
 rejects(f.options);assert.equal(changed,true);
});

test('formatted proof, escaped keys and independent objects remain valid while nested duplicate keys reject',t=>{
 const f=fixture(t);f.proof.notes={first:{same:'one'},second:{same:'two'}};
 fs.writeFileSync(f.proofPath,JSON.stringify(f.proof,null,2)+String.fromCharCode(10));
 assert.equal(verifyTransfer(f.options).archiveSha256,sha(f.bytes));
 const formatted=fs.readFileSync(f.proofPath,'utf8');
 fs.writeFileSync(f.proofPath,formatted.replace('"same": "one"','"same": "one", "sa\\u006de": "two"'));
 rejects(f.options);
});
