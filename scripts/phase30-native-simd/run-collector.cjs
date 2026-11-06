'use strict';
// Fixed-scope offline research collector lifecycle; never prune or remove by broad filters.
const fs=require('node:fs');
const path=require('node:path');
const {randomBytes}=require('node:crypto');
const {execFile}=require('node:child_process');
const {parseTargets}=require('./collect-dependencies.cjs');
const IMAGE='node@sha256:6f7b03f7c2c8e2e784dcf9295400527b9b1270fd37b7e9a7285cf83b6951452d';
const MAX_OUTPUT=1048576;
const INSPECT_FORMAT='{"id":{{json .Id}},"name":{{json .Name}},"labels":{{json .Config.Labels}},"state":{"running":{{json .State.Running}},"exitCode":{{json .State.ExitCode}},"oomKilled":{{json .State.OOMKilled}}}}';
const fail=()=>{throw Error('COLLECTOR_REJECTED');};
function createIdentity(runId,attempt,nonce){
 if(typeof runId!=='string'||runId!==runId.trim()||!/^[1-9][0-9]{0,19}$/.test(runId)||typeof attempt!=='string'||attempt!==attempt.trim()||!/^[1-9][0-9]{0,5}$/.test(attempt)||typeof nonce!=='string'||nonce.length!==16||!/^[a-f0-9]+$/.test(nonce))fail();
 const labels=Object.freeze({'org.congdongngonngu.phase30.task':'simd-dependency-collector','org.congdongngonngu.phase30.run':runId,'org.congdongngonngu.phase30.attempt':attempt,'org.congdongngonngu.phase30.nonce':nonce});
 return Object.freeze({runId,attempt,nonce,name:'phase30-deps-'+runId+'-'+attempt+'-'+nonce,labels});
}
function decode(bytes){
 if(!Buffer.isBuffer(bytes)||bytes.length>MAX_OUTPUT)fail();
 try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);}catch{fail();}
}
function ids(bytes){
 const text=decode(bytes).trim();if(!text)return [];
 const result=text.split(/\r?\n/);
 if(result.length>1||result.some(x=>!/^[a-f0-9]{64}$/.test(x)))fail();
 return result;
}
function validateBody(bytes){
 let value;try{value=JSON.parse(decode(bytes));}catch{fail();}
 if(value?.scope!=='RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE'||!Array.isArray(value.targets)||value.targets.length!==48||value.targets.some(x=>typeof x!=='string'))fail();
 const expected=parseTargets(value.targets.map(x=>'X86ASM\t'+x).join('\n'));
 if(JSON.stringify(expected)!==JSON.stringify(value.targets))fail();
}
function validMount(value){return typeof value==='string'&&value.startsWith('/')&&path.posix.resolve(value)===value&&!/[^A-Za-z0-9_./-]/.test(value);}
async function runCollector({docker,identity,mounts,user}){
 const owned=createIdentity(identity.runId,identity.attempt,identity.nonce);
 if(typeof docker!=='function'||!mounts||!['objects','evidence','research'].every(key=>validMount(mounts[key]))||typeof user!=='string'||user!==user.trim()||!/^[1-9][0-9]{0,9}:[1-9][0-9]{0,9}$/.test(user))fail();
 const proof={scope:'PHASE30_RESEARCH_COLLECTOR_CLEANUP_ONLY',status:'UNVERIFIED',cidResolved:false,createSucceeded:false,startAttempted:false,bodyStatus:'NOT_RUN',ownershipVerified:false,stateRunning:null,stateExitCode:null,stateOOMKilled:null,removeAttempted:false,removeSucceeded:false,absenceQueries:0};
 const command=async(args,timeout=3000)=>{const bytes=await docker(args,{timeout,maxBuffer:MAX_OUTPUT});decode(bytes);return bytes;};
 const nameFilter='name=^/'+owned.name+'$';
 const labels=Object.entries(owned.labels).flatMap(([key,value])=>['--label',key+'='+value]);
 const labelFilters=Object.entries(owned.labels).flatMap(([key,value])=>['--filter','label='+key+'='+value]);
 const list=async filters=>ids(await command(['container','ls','--all','--no-trunc','--format','{{.ID}}',...filters]));
 const inspect=async cid=>{
  let value;try{value=JSON.parse(decode(await command(['inspect','--format',INSPECT_FORMAT,cid])));}catch{fail();}
  if(value?.id!==cid||value.name!=='/'+owned.name||!value.labels||Object.entries(owned.labels).some(([k,v])=>value.labels[k]!==v))fail();
  const state=value.state;
  if(!state||typeof state.running!=='boolean'||!Number.isInteger(state.exitCode)||state.exitCode<0||state.exitCode>255||typeof state.oomKilled!=='boolean')fail();
  return {running:state.running,exitCode:state.exitCode,oomKilled:state.oomKilled};
 };
 const record=state=>{proof.ownershipVerified=true;proof.stateRunning=state.running;proof.stateExitCode=state.exitCode;proof.stateOOMKilled=state.oomKilled;};
 let cid,output,createAccepted=false;
 try{
  const created=decode(await command(['create','--name',owned.name,...labels,'--user',user,'--network','none','--read-only','--cpus','1','--memory','192m','--memory-swap','192m','--pids-limit','32','--cap-drop','ALL','--security-opt','no-new-privileges','--tmpfs','/tmp:rw,nosuid,noexec,size=16m','-v',mounts.objects+':/build/objects:ro','-v',mounts.evidence+':/evidence:ro','-v',mounts.research+':/research:ro',IMAGE,'node','/research/collect-dependencies.cjs'],5000)).trim();
  if(!/^[a-f0-9]{64}$/.test(created))fail();
  cid=created;createAccepted=true;proof.cidResolved=true;proof.createSucceeded=true;
  record(await inspect(cid));
  proof.startAttempted=true;
  let raw;
  try{raw=await command(['start','--attach',cid],20000);}catch(error){proof.bodyStatus=error.code==='ETIMEDOUT'?'TIMEOUT':'ERROR';throw error;}
  const state=await inspect(cid);record(state);
  if(state.running||state.exitCode!==0||state.oomKilled){proof.bodyStatus='CONTAINER_FAILED';fail();}
  try{validateBody(raw);}catch{proof.bodyStatus='INVALID_OUTPUT';fail();}
  output=raw;proof.bodyStatus='PASS';
 }catch{
  if(proof.bodyStatus==='NOT_RUN')proof.bodyStatus=createAccepted?'STATE_UNVERIFIED':'CREATE_FAILED';
 }finally{
  // A failed/timed-out create can have reached the daemon. Resolve only this unique
  // exact name and fixed ownership labels; an unresolved create never proves absence.
  if(!cid){
   try{
    const matching=await list(['--filter',nameFilter,...labelFilters]);
    const named=await list(['--filter',nameFilter]);
    if(matching.length===1&&JSON.stringify(matching)===JSON.stringify(named)){cid=matching[0];proof.cidResolved=true;}
   }catch{/* Keep UNVERIFIED. No ambiguous or foreign deletion. */}
  }
  if(cid){
   try{
    record(await inspect(cid));
    proof.removeAttempted=true;
    try{await command(['rm','--force',cid]);proof.removeSucceeded=true;}catch{/* Query observed absence, but removal failure remains fail-closed. */}
    const byId=await list(['--filter','id='+cid]);proof.absenceQueries++;
    const byName=await list(['--filter',nameFilter]);proof.absenceQueries++;
    if(proof.removeSucceeded&&byId.length===0&&byName.length===0)proof.status='VERIFIED_ABSENT';
   }catch{/* Failed inspection/listing or wrong ownership cannot establish cleanup. */}
  }
 }
 const ok=proof.bodyStatus==='PASS'&&proof.status==='VERIFIED_ABSENT';
 return {ok,cleanup:proof,...(ok?{output}: {})};
}
function writeResults(hostDirectory,result){
 const root=path.resolve(hostDirectory);
 if(root!==hostDirectory||!fs.lstatSync(root).isDirectory()||fs.realpathSync.native(root)!==root)fail();
 fs.writeFileSync(path.join(root,'collector-cleanup.json'),JSON.stringify(result.cleanup,null,2)+'\n',{flag:'wx',mode:0o400});
 if(result.ok){
  if(result.cleanup.status!=='VERIFIED_ABSENT')fail();
  validateBody(result.output);
  fs.writeFileSync(path.join(root,'assembly-dependencies.json'),result.output,{flag:'wx',mode:0o400});
 }
}
function dockerRunner(args,{timeout,maxBuffer}){
 return new Promise((resolve,reject)=>{
  execFile('docker',args,{shell:false,windowsHide:true,encoding:'buffer',timeout,maxBuffer,killSignal:'SIGKILL'},(error,stdout)=>{
   if(error){const safe=Error('DOCKER_COMMAND_FAILED');if(error.code==='ERR_CHILD_PROCESS_STDIO_MAXBUFFER')safe.code='OUTPUT_LIMIT';else if(error.code==='ETIMEDOUT')safe.code='ETIMEDOUT';else if(error.killed)safe.code='TERMINATED';reject(safe);}else resolve(stdout);
  });
 });
}
function operationalConfig(){
 if(process.platform!=='linux'||process.argv.length!==2)fail();
 const temporary=process.env.RUNNER_TEMP,workspace=process.env.GITHUB_WORKSPACE;
 if(!validMount(temporary)||!validMount(workspace))fail();
 const identity=createIdentity(process.env.GITHUB_RUN_ID,process.env.GITHUB_RUN_ATTEMPT,randomBytes(8).toString('hex'));
 const mounts={objects:path.join(temporary,'simd-build','objects'),evidence:path.join(temporary,'simd-evidence'),research:path.join(workspace,'scripts','phase30-native-simd')};
 const hostDirectory=path.join(temporary,'simd-host');
 for(const directory of [...Object.values(mounts),hostDirectory])if(!fs.lstatSync(directory).isDirectory()||fs.realpathSync.native(directory)!==directory)fail();
 const uid=process.getuid(),gid=process.getgid();if(!Number.isInteger(uid)||uid<1||!Number.isInteger(gid)||gid<1)fail();
 return {identity,mounts,user:uid+':'+gid,hostDirectory};
}
module.exports={createIdentity,runCollector,writeResults};
if(require.main===module){
 (async()=>{const config=operationalConfig();const result=await runCollector({...config,docker:dockerRunner});writeResults(config.hostDirectory,result);if(!result.ok)process.exitCode=1;console.log(result.ok?'COLLECTOR_COMPLETED_WITH_VERIFIED_CLEANUP':'COLLECTOR_REJECTED');})().catch(()=>{console.error('COLLECTOR_REJECTED');process.exitCode=1;});
}
