'use strict';
// Identity gate for one explicitly requested research transfer. Never an archive
// parser, distribution selector, license review or application processor gate.
const fs=require('node:fs'),path=require('node:path');
const {createHash}=require('node:crypto');
const ARCHIVE_LIMIT=64*1024*1024,PROOF_LIMIT=65536;
const BINARY_PINS=Object.freeze({
 ffmpeg:'031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3',
 ffprobe:'36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3',
});
const deny=()=>{throw Error('CANDIDATE_TRANSFER_HOLD');};
const digest=b=>createHash('sha256').update(b).digest('hex');
const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
const same=(a,b)=>a.dev===b.dev&&a.ino===b.ino&&a.size===b.size&&a.mtimeNs===b.mtimeNs&&a.ctimeNs===b.ctimeNs;
function parents(file){
 const result=[];let current=path.dirname(file);
 while(true){
  const st=fs.lstatSync(current,{bigint:true});if(!st.isDirectory()||st.isSymbolicLink())deny();
  result.push([current,st.dev,st.ino]);const next=path.dirname(current);if(next===current)break;current=next;
 }
 return result;
}
function sameParents(a,b){return a.length===b.length&&a.every((x,i)=>x.every((v,j)=>v===b[i][j]));}
function readRegular(file,limit,retain){
 const beforeParents=parents(file),before=fs.lstatSync(file,{bigint:true});
 if(!before.isFile()||before.isSymbolicLink()||before.size<1n||before.size>BigInt(limit))deny();
 const fd=fs.openSync(file,fs.constants.O_RDONLY|(fs.constants.O_NOFOLLOW||0)|(fs.constants.O_NONBLOCK||0));
 try{
  const opened=fs.fstatSync(fd,{bigint:true});if(!opened.isFile()||!same(before,opened))deny();
  const hash=createHash('sha256'),parts=[],buffer=Buffer.alloc(Math.min(65536,Number(opened.size)+1));let total=0;
  while(true){const n=fs.readSync(fd,buffer,0,buffer.length,null);if(n===0)break;total+=n;if(total>limit||BigInt(total)>opened.size)deny();hash.update(buffer.subarray(0,n));if(retain)parts.push(Buffer.from(buffer.subarray(0,n)));}
  const after=fs.fstatSync(fd,{bigint:true}),named=fs.lstatSync(file,{bigint:true});
  if(BigInt(total)!==opened.size||!named.isFile()||!same(opened,after)||!same(opened,named)||!sameParents(beforeParents,parents(file)))deny();
  return{bytes:total,sha256:hash.digest('hex'),...(retain?{data:Buffer.concat(parts)}:{})};
 }finally{fs.closeSync(fd);}
}
function parseProof(bytes){
 // JSON.parse establishes syntax. This bounded second walk detects duplicate
 // decoded keys within each object, including escaped spellings of the same key.
 let text,obj;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);obj=JSON.parse(text);}catch{deny();}
 let at=0;const whitespace=c=>c!==undefined&&[9,10,13,32].includes(c.charCodeAt(0));const ws=()=>{while(whitespace(text[at]))at++;};
 function string(){const start=at++;while(at<text.length){const c=text[at++];if(c.charCodeAt(0)===34)return JSON.parse(text.slice(start,at));if(c.charCodeAt(0)===92)at++;}deny();}
 function value(depth){
  if(depth>32)deny();ws();const c=text[at];
  if(c==='{'){
   at++;ws();const keys=new Set();if(text[at]==='}'){at++;return;}
   while(true){ws();const key=string();if(keys.has(key))deny();keys.add(key);ws();at++;value(depth+1);ws();const sep=text[at++];if(sep==='}')return;}
  }
  if(c==='['){at++;ws();if(text[at]===']'){at++;return;}while(true){value(depth+1);ws();if(text[at++]===']')return;}}
  if(c==='"'){string();return;}
  while(at<text.length&&!whitespace(text[at])&&!',]}'.includes(text[at]))at++;
 }
 value(0);return obj;
}
function verifyTransfer({root,eventName,retainCandidate,sourceSha}={}){
 try{
  if(eventName!=='workflow_dispatch'||retainCandidate!=='true'||typeof sourceSha!=='string'||!/^[a-f0-9]{40}$/.test(sourceSha)||typeof root!=='string'||!path.isAbsolute(root))deny();
  const directory=path.resolve(root),proofPath=path.join(directory,'simd-host','candidate-archive-proof.json'),archivePath=path.join(directory,'simd-candidate.tar.gz');
  const proofFile=readRegular(proofPath,PROOF_LIMIT,true),proof=parseProof(proofFile.data);
  if(!proof||typeof proof!=='object'||Array.isArray(proof)||proof.scope!=='INTERNAL_SIMD_MATERIAL_CANDIDATE_ONLY'||proof.readback!=='PASS'||proof.capsuleReadback!=='PASS'||proof.sameInputsTwoArchiveWrites!=='IDENTICAL'||proof.licenseClearance!=='HOLD'||proof.materialClearance!=='HOLD_INDEPENDENT_REVIEW')deny();
  for(const field of ['nativePublication','backendAdoption','renderAcceptance','workerAcceptance','resourceAcceptance'])if(proof[field]!=='NOT_RUN')deny();
  if(!Number.isSafeInteger(proof.archiveBytes)||proof.archiveBytes<1||proof.archiveBytes>ARCHIVE_LIMIT||!hex(proof.archiveSha256)||proof.repeatArchiveSha256!==proof.archiveSha256||!proof.members||typeof proof.members!=='object'||Array.isArray(proof.members))deny();
  for(const [name,pin]of Object.entries(BINARY_PINS)){const member=proof.members['bin/'+name];if(!member||typeof member!=='object'||Array.isArray(member)||member.sha256!==pin||!Number.isSafeInteger(member.bytes)||member.bytes<1||member.bytes>20000000)deny();}
  const archive=readRegular(archivePath,ARCHIVE_LIMIT,false);
  if(archive.bytes!==proof.archiveBytes||archive.sha256!==proof.archiveSha256)deny();
  return{scope:'CONTROLLED_CANDIDATE_TRANSFER_IDENTITY_ONLY',sourceSha,archiveBytes:archive.bytes,archiveSha256:archive.sha256,proofSha256:proofFile.sha256,licenseClearance:'HOLD',materialClearance:'HOLD_INDEPENDENT_REVIEW',backendAdoption:'NOT_RUN',nativePublication:'NOT_RUN'};
 }catch{deny();}
}
module.exports={verifyTransfer};
if(require.main===module){
 try{
  if(process.argv.length!==2)deny();
  const result=verifyTransfer({root:process.env.RUNNER_TEMP,eventName:process.env.GITHUB_EVENT_NAME,retainCandidate:process.env.PHASE30_RETAIN_CANDIDATE,sourceSha:process.env.GITHUB_SHA});
  process.stdout.write(JSON.stringify(result)+'\n');
 }catch{process.stderr.write('CANDIDATE_TRANSFER_HOLD\n');process.exitCode=1;}
}
