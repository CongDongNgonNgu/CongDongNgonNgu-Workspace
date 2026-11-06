'use strict';
// Fixed-scope offline research collector lifecycle; never prune or remove by broad filters.
const fs=require('node:fs');
const path=require('node:path');
const {randomBytes}=require('node:crypto');
const {execFile}=require('node:child_process');
const {parseTargets}=require('./collect-dependencies.cjs');
const IMAGE='node@sha256:6f7b03f7c2c8e2e784dcf9295400527b9b1270fd37b7e9a7285cf83b6951452d';
const MAX_OUTPUT=1048576;
// Only two literal profiles exist: callers cannot supply scripts or resource options.
const PROFILES=Object.freeze({
 DEPS:Object.freeze({namePrefix:'phase30-deps-',task:'simd-dependency-collector',cleanupScope:'PHASE30_RESEARCH_COLLECTOR_CLEANUP_ONLY',timeout:20000,tmpfs:'/tmp:rw,nosuid,noexec,size=16m',entry:'/research/collect-dependencies.cjs',cleanupFile:'collector-cleanup.json',outputFile:'assembly-dependencies.json',mounts:Object.freeze([['objects','/build/objects'],['evidence','/evidence'],['research','/research']])}),
 AAC:Object.freeze({namePrefix:'phase30-aac-',task:'simd-aac-command-probe',cleanupScope:'PHASE30_AAC_OBSERVATIONAL_CLEANUP_ONLY',timeout:60000,tmpfs:'/scratch:rw,nosuid,noexec,size=64m',entry:'/research/aac-command-probe.cjs',cleanupFile:'aac-cleanup.json',outputFile:'aac-observations.json',mounts:Object.freeze([['ffmpeg','/processors/ffmpeg'],['ffprobe','/processors/ffprobe'],['research','/research'],['fixtures','/fixtures.json']])}),
});
function getProfile(name){if(typeof name!=='string'||!Object.hasOwn(PROFILES,name))throw Error('COLLECTOR_REJECTED');return PROFILES[name];}
const INSPECT_FORMAT='{"id":{{json .Id}},"name":{{json .Name}},"labels":{{json .Config.Labels}},"state":{"running":{{json .State.Running}},"exitCode":{{json .State.ExitCode}},"oomKilled":{{json .State.OOMKilled}}}}';
const fail=()=>{throw Error('COLLECTOR_REJECTED');};
function createIdentity(runId,attempt,nonce,profile='DEPS'){
 const descriptor=getProfile(profile);
 if(typeof runId!=='string'||runId!==runId.trim()||!/^[1-9][0-9]{0,19}$/.test(runId)||typeof attempt!=='string'||attempt!==attempt.trim()||!/^[1-9][0-9]{0,5}$/.test(attempt)||typeof nonce!=='string'||nonce.length!==16||!/^[a-f0-9]+$/.test(nonce))fail();
 const labels=Object.freeze({'org.congdongngonngu.phase30.task':descriptor.task,'org.congdongngonngu.phase30.run':runId,'org.congdongngonngu.phase30.attempt':attempt,'org.congdongngonngu.phase30.nonce':nonce});
 return Object.freeze({profile,runId,attempt,nonce,name:descriptor.namePrefix+runId+'-'+attempt+'-'+nonce,labels});
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
function exactKeys(value,keys){return value&&typeof value==='object'&&!Array.isArray(value)&&JSON.stringify(Object.keys(value).sort())===JSON.stringify([...keys].sort());}
function integer(value,ceiling){return Number.isInteger(value)&&value>=0&&value<=ceiling;}
function digest(value){return typeof value==='string'&&value.length===64&&/^[a-f0-9]+$/.test(value);}
function validateAac(value){
 const {CASES}=require('./aac-fixtures.cjs');
 const rootKeys=['scope','complete','positiveControlsValid','results','resourceAcceptance','workerAcceptance','renderAcceptance','continuationPolicy'];
 const caseKeys=['name','status','sourceBytes','sourceSha256','normalizedBytes','thumbnailBytes','commands'];
 const commandKeys=['stage','status','signal','error','stdoutBytes','stderrBytes','stdoutSha256','stderrSha256','lateSbrError','audioProfile','exitPredicate','quietPredicate','exitAndLcProfilePredicate'];
 const stages=['SOURCE_PROBE','SOURCE_DECODE','NORMALIZE','OUTPUT_PROBE','OUTPUT_DECODE','THUMBNAIL','THUMBNAIL_DECODE'];
 const signals=['SIGHUP','SIGINT','SIGQUIT','SIGILL','SIGTRAP','SIGABRT','SIGBUS','SIGFPE','SIGKILL','SIGUSR1','SIGSEGV','SIGUSR2','SIGPIPE','SIGALRM','SIGTERM','SIGCHLD','SIGCONT','SIGSTOP','SIGTSTP','SIGTTIN','SIGTTOU','SIGURG','SIGXCPU','SIGXFSZ','SIGVTALRM','SIGPROF','SIGWINCH','SIGIO','SIGSYS'];
 if(!exactKeys(value,rootKeys)||value.scope!=='AAC_COMMAND_OBSERVATIONS_ONLY_NOT_SECURITY_PASS'||typeof value.complete!=='boolean'||typeof value.positiveControlsValid!=='boolean'||value.continuationPolicy!=='INDEPENDENT_COMMAND_OBSERVATIONS'||!['resourceAcceptance','workerAcceptance','renderAcceptance'].every(k=>value[k]==='NOT_RUN')||!Array.isArray(value.results)||value.results.length!==CASES.length)fail();
 for(const [index,row] of value.results.entries()){
  if(!exactKeys(row,caseKeys)||row.name!==CASES[index]||!['OBSERVED','NOT_RUN','ERROR'].includes(row.status)||!integer(row.sourceBytes,4096)||!digest(row.sourceSha256)||![row.normalizedBytes,row.thumbnailBytes].every(n=>n===null||integer(n,67108864))||!Array.isArray(row.commands)||row.commands.length!==stages.length)fail();
  for(const [i,command] of row.commands.entries()){
   if(!exactKeys(command,commandKeys)||command.stage!==stages[i]||!(command.status===null||integer(command.status,255))||!(command.signal===null||signals.includes(command.signal))||!['NONE','TIMEOUT','OUTPUT_LIMIT','EXECUTION','NOT_RUN','BUDGET'].includes(command.error)||!integer(command.stdoutBytes,196608)||!integer(command.stderrBytes,196608)||!digest(command.stdoutSha256)||!digest(command.stderrSha256)||!['NONE','LC','HE-AAC','HE-AACv2','OTHER'].includes(command.audioProfile)||!['lateSbrError','exitPredicate','quietPredicate','exitAndLcProfilePredicate'].every(k=>typeof command[k]==='boolean'))fail();
   const expectedExit=command.status===0&&command.signal===null&&command.error==='NONE'&&command.stdoutBytes<=131072&&command.stderrBytes<=131072;
   const expectedQuiet=expectedExit&&command.stderrBytes===0;
   const expectedExitLC=expectedExit&&command.audioProfile==='LC';
   if(command.exitPredicate!==expectedExit||command.quietPredicate!==expectedQuiet||command.exitAndLcProfilePredicate!==expectedExitLC)fail();
  }
 }
 if(value.complete&&value.results.some(row=>row.status!=='OBSERVED'||row.commands.some(command=>command.signal!==null||['BUDGET','TIMEOUT','EXECUTION','OUTPUT_LIMIT'].includes(command.error))))fail();
 // False summaries remain conservative HOLD data. True summaries must follow the
 // recorded observations; no negative-case rejection/security PASS is inferred.
 if(value.positiveControlsValid&&value.results.slice(0,2).some(row=>row.status!=='OBSERVED'||!(row.normalizedBytes>0&&row.normalizedBytes<=3145728)||!(row.thumbnailBytes>0&&row.thumbnailBytes<=262144)||!row.commands.every(command=>command.quietPredicate)||!row.commands[0].exitAndLcProfilePredicate||!row.commands[3].exitAndLcProfilePredicate))fail();
 return value;
}
function validateBody(bytes,profile='DEPS'){
 getProfile(profile);
 let value;try{value=JSON.parse(decode(bytes));}catch{fail();}
 if(profile==='AAC')return validateAac(value);
 if(value?.scope!=='RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE'||!Array.isArray(value.targets)||value.targets.length!==48||value.targets.some(x=>typeof x!=='string'))fail();
 const expected=parseTargets(value.targets.map(x=>'X86ASM\t'+x).join('\n'));
 if(JSON.stringify(expected)!==JSON.stringify(value.targets))fail();
 return value;
}
function validMount(value){return typeof value==='string'&&value.startsWith('/')&&path.posix.resolve(value)===value&&!/[^A-Za-z0-9_./-]/.test(value);}
async function runCollector({docker,identity,mounts,user,profile='DEPS'}){
 const descriptor=getProfile(profile);
 if(identity?.profile!==profile)fail();
 const owned=createIdentity(identity.runId,identity.attempt,identity.nonce,profile);
 if(typeof docker!=='function'||!mounts||JSON.stringify(Object.keys(mounts).sort())!==JSON.stringify(descriptor.mounts.map(([key])=>key).sort())||!descriptor.mounts.every(([key])=>validMount(mounts[key]))||typeof user!=='string'||user!==user.trim()||!/^[1-9][0-9]{0,9}:[1-9][0-9]{0,9}$/.test(user))fail();
 const proof={scope:descriptor.cleanupScope,status:'UNVERIFIED',cidResolved:false,createSucceeded:false,startAttempted:false,bodyStatus:'NOT_RUN',ownershipVerified:false,stateRunning:null,stateExitCode:null,stateOOMKilled:null,removeAttempted:false,removeSucceeded:false,absenceQueries:0};
 if(profile==='AAC')Object.assign(proof,{complete:null,positiveControlsValid:null,observationalVerdict:'HOLD_NOT_RUN'});
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
 let cid,output,createAccepted=false,bodyAccepted=false;
 try{
  const created=decode(await command(['create','--name',owned.name,...labels,'--user',user,'--network','none','--read-only','--cpus','1','--memory','192m','--memory-swap','192m','--pids-limit','32','--cap-drop','ALL','--security-opt','no-new-privileges','--tmpfs',descriptor.tmpfs,...descriptor.mounts.flatMap(([key,target])=>['-v',mounts[key]+':'+target+':ro']),IMAGE,'node',descriptor.entry],5000)).trim();
  if(!/^[a-f0-9]{64}$/.test(created))fail();
  cid=created;createAccepted=true;proof.cidResolved=true;proof.createSucceeded=true;
  record(await inspect(cid));
  proof.startAttempted=true;
  let raw;
  try{raw=await command(['start','--attach',cid],descriptor.timeout);}catch(error){proof.bodyStatus=error.code==='ETIMEDOUT'?'TIMEOUT':'ERROR';throw error;}
  const state=await inspect(cid);record(state);
  if(state.running||state.exitCode!==0||state.oomKilled){proof.bodyStatus='CONTAINER_FAILED';fail();}
  let observed;
  try{observed=validateBody(raw,profile);}catch{proof.bodyStatus='INVALID_OUTPUT';fail();}
  output=raw;bodyAccepted=true;
  if(profile==='DEPS')proof.bodyStatus='PASS';
  else{
   proof.bodyStatus=observed.complete?'OBSERVATIONS_COMPLETE':'OBSERVATIONS_INCOMPLETE';
   proof.complete=observed.complete;proof.positiveControlsValid=observed.positiveControlsValid;
   proof.observationalVerdict=!observed.complete?'HOLD_INCOMPLETE':!observed.positiveControlsValid?'HOLD_POSITIVE_CONTROLS':'COMPLETE_OBSERVATIONS_ONLY';
  }
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
 const ok=bodyAccepted&&proof.status==='VERIFIED_ABSENT';
 return {profile,ok,cleanup:proof,...(ok?{output}: {})};
}
function writeResults(hostDirectory,result,profile='DEPS'){
 const descriptor=getProfile(profile);
 if(result?.profile!==profile||result.cleanup?.scope!==descriptor.cleanupScope)fail();
 const root=path.resolve(hostDirectory);
 if(root!==hostDirectory||!fs.lstatSync(root).isDirectory()||fs.realpathSync.native(root)!==root)fail();
 fs.writeFileSync(path.join(root,descriptor.cleanupFile),JSON.stringify(result.cleanup,null,2)+'\n',{flag:'wx',mode:0o400});
 if(result.ok){
  if(result.cleanup.status!=='VERIFIED_ABSENT')fail();
  validateBody(result.output,profile);
  fs.writeFileSync(path.join(root,descriptor.outputFile),result.output,{flag:'wx',mode:0o400});
 }
}
function dockerRunner(args,{timeout,maxBuffer}){
 return new Promise((resolve,reject)=>{
  execFile('docker',args,{shell:false,windowsHide:true,encoding:'buffer',timeout,maxBuffer,killSignal:'SIGKILL'},(error,stdout)=>{
   if(error){const safe=Error('DOCKER_COMMAND_FAILED');if(error.code==='ERR_CHILD_PROCESS_STDIO_MAXBUFFER')safe.code='OUTPUT_LIMIT';else if(error.code==='ETIMEDOUT')safe.code='ETIMEDOUT';else if(error.killed)safe.code='TERMINATED';reject(safe);}else resolve(stdout);
  });
 });
}
function operationalConfig(profile='DEPS'){
 getProfile(profile);
 if(process.platform!=='linux'||process.argv.length!==2)fail();
 const temporary=process.env.RUNNER_TEMP,workspace=process.env.GITHUB_WORKSPACE;
 if(!validMount(temporary)||!validMount(workspace))fail();
 const identity=createIdentity(process.env.GITHUB_RUN_ID,process.env.GITHUB_RUN_ATTEMPT,randomBytes(8).toString('hex'),profile);
 const research=path.join(workspace,'scripts','phase30-native-simd');
 const mounts=profile==='DEPS'?{objects:path.join(temporary,'simd-build','objects'),evidence:path.join(temporary,'simd-evidence'),research}:{ffmpeg:path.join(temporary,'simd-build','ffmpeg'),ffprobe:path.join(temporary,'simd-build','ffprobe'),research,fixtures:path.join(workspace,'scripts','phase30-minimal-ffmpeg','fixtures.json')};
 const hostDirectory=path.join(temporary,'simd-host');
 for(const [key,file] of [...Object.entries(mounts),['host',hostDirectory]]){
  const stat=fs.lstatSync(file);if(fs.realpathSync.native(file)!==file)fail();
  const isFile=profile==='AAC'&&['ffmpeg','ffprobe','fixtures'].includes(key);
  if(isFile?(!stat.isFile()||stat.size<1||stat.size>(key==='fixtures'?32768:20000000)):!stat.isDirectory())fail();
 }
 const uid=process.getuid(),gid=process.getgid();if(!Number.isInteger(uid)||uid<1||!Number.isInteger(gid)||gid<1)fail();
 return {profile,identity,mounts,user:uid+':'+gid,hostDirectory};
}
function operationalExitCode(result,profile='DEPS'){
 const descriptor=getProfile(profile);
 if(result?.profile!==profile||result.cleanup?.scope!==descriptor.cleanupScope)fail();
 return result.ok&&(profile==='DEPS'||result.cleanup.observationalVerdict==='COMPLETE_OBSERVATIONS_ONLY')?0:1;
}
async function runOperational(profile='DEPS'){
 const config=operationalConfig(profile);
 const result=await runCollector({...config,docker:dockerRunner});
 // Retain schema-valid AAC data after verified cleanup, including explicit HOLDs.
 writeResults(config.hostDirectory,result,profile);
 const exitCode=operationalExitCode(result,profile);if(exitCode)process.exitCode=exitCode;
 console.log(profile==='DEPS'?(exitCode?'COLLECTOR_REJECTED':'COLLECTOR_COMPLETED_WITH_VERIFIED_CLEANUP'):(exitCode?'AAC_OBSERVATIONS_HELD':'AAC_OBSERVATIONS_RECORDED_NOT_SECURITY_PASS'));
 return result;
}
module.exports={createIdentity,runCollector,writeResults,runOperational,operationalExitCode};
if(require.main===module){runOperational('DEPS').catch(()=>{console.error('COLLECTOR_REJECTED');process.exitCode=1;});}
