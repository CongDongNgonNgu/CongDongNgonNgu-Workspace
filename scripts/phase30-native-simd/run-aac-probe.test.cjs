'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {createIdentity,runCollector,writeResults}=require('./run-collector.cjs');
const {runAacProbe,writeAacResults,aacExitCode}=require('./run-aac-probe.cjs');
const {CASES}=require('./aac-fixtures.cjs');
const cid='b'.repeat(64);
const mounts={ffmpeg:'/owned/simd-build/ffmpeg',ffprobe:'/owned/simd-build/ffprobe',research:'/repo/scripts/phase30-native-simd',fixtures:'/repo/scripts/phase30-minimal-ffmpeg/fixtures.json'};
const identity=()=>createIdentity('42152274083','1','0123456789abcdef','AAC');
const stages=['SOURCE_PROBE','SOURCE_DECODE','NORMALIZE','OUTPUT_PROBE','OUTPUT_DECODE','THUMBNAIL','THUMBNAIL_DECODE'];
const emptyHash=require('node:crypto').createHash('sha256').update('').digest('hex');
function caseResult(name,status='OBSERVED'){
 return {name,status,sourceBytes:2048,sourceSha256:'c'.repeat(64),normalizedBytes:status==='OBSERVED'?1536:null,thumbnailBytes:status==='OBSERVED'?512:null,commands:stages.map(stage=>({stage,status:status==='OBSERVED'?0:null,signal:null,error:status==='OBSERVED'?'NONE':'BUDGET',stdoutBytes:0,stderrBytes:0,stdoutSha256:emptyHash,stderrSha256:emptyHash,lateSbrError:false,audioProfile:['SOURCE_PROBE','OUTPUT_PROBE'].includes(stage)&&status==='OBSERVED'?'LC':'NONE',exitPredicate:status==='OBSERVED',quietPredicate:status==='OBSERVED',exitAndLcProfilePredicate:status==='OBSERVED'&&['SOURCE_PROBE','OUTPUT_PROBE'].includes(stage)}))};
}
function body(overrides={}){return Buffer.from(JSON.stringify({scope:'AAC_COMMAND_OBSERVATIONS_ONLY_NOT_SECURITY_PASS',complete:true,positiveControlsValid:true,resourceAcceptance:'NOT_RUN',workerAcceptance:'NOT_RUN',renderAcceptance:'NOT_RUN',continuationPolicy:'INDEPENDENT_COMMAND_OBSERVATIONS',results:CASES.map(name=>caseResult(name)),...overrides})+'\n');}
function fakeDocker(options={}){
 const calls=[];let present=false,started=false;const id=identity();
 const docker=async(args,settings)=>{
  calls.push({args:[...args],settings:{...settings}});
  if(args[0]==='create'){present=true;return Buffer.from(cid+'\n');}
  if(args[0]==='inspect')return Buffer.from(JSON.stringify({id:cid,name:'/'+id.name,labels:options.foreignLabels?createIdentity('42152274083','1','0123456789abcdef').labels:id.labels,state:{running:false,exitCode:0,oomKilled:false}}));
  if(args[0]==='start'){started=true;if(options.timeout)throw Object.assign(Error('private'),{code:'ETIMEDOUT'});return options.output??body();}
  if(args[0]==='rm'){if(options.removeFails)throw Error('private');present=false;return Buffer.from(cid+'\n');}
  if(args[0]==='container')return Buffer.from(present?cid+'\n':'');
  throw Error('unexpected fake command');
 };
 return {docker,calls,started:()=>started};
}
async function run(options={}){const fake=fakeDocker(options);return {...fake,result:await runAacProbe({docker:fake.docker,identity:identity(),mounts,user:'1001:1001'})};}
test('AAC uses fixed observational task,60sdeadline,192MiB,CPU1,scratch64MiB and only four readonly mounts',async()=>{
 const {result,calls}=await run();assert.equal(result.ok,true);assert.equal(result.profile,'AAC');assert.equal(result.cleanup.scope,'PHASE30_AAC_OBSERVATIONAL_CLEANUP_ONLY');assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(result.cleanup.observationalVerdict,'COMPLETE_OBSERVATIONS_ONLY');assert.equal(result.cleanup.positiveControlsValid,true);
 const create=calls.find(x=>x.args[0]==='create').args;assert.ok(create.includes('org.congdongngonngu.phase30.task=simd-aac-command-probe'));assert.ok(create.includes('--read-only'));assert.ok(create.includes('192m'));assert.equal(create[create.indexOf('--cpus')+1],'1');assert.ok(create.includes('/scratch:rw,nosuid,noexec,size=64m'));assert.deepEqual(create.filter((x,i)=>create[i-1]==='-v'),[mounts.ffmpeg+':/processors/ffmpeg:ro',mounts.ffprobe+':/processors/ffprobe:ro',mounts.research+':/research:ro',mounts.fixtures+':/fixtures.json:ro']);assert.deepEqual(create.slice(-2),['node','/research/aac-command-probe.cjs']);assert.ok(!create.some(x=>x.includes('/evidence:')));assert.equal(calls.find(x=>x.args[0]==='start').settings.timeout,60000);assert.deepEqual(result.output,body());
});
test('AAC timeout still cleans exact owned container and publishes no body',async()=>{const {result,calls}=await run({timeout:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.deepEqual(calls.find(x=>x.args[0]==='rm').args,['rm','--force',cid]);assert.equal(result.output,undefined);});
test('AAC uncertain cleanup withholds even complete observations',async()=>{const {result}=await run({removeFails:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.equal(result.output,undefined);});
test('AAC valid incomplete observations remain explicit HOLD research data',async()=>{const results=CASES.map((name,i)=>caseResult(name,i<2?'OBSERVED':'NOT_RUN'));const {result}=await run({output:body({complete:false,positiveControlsValid:true,results})});assert.equal(result.ok,true);assert.equal(result.cleanup.bodyStatus,'OBSERVATIONS_INCOMPLETE');assert.equal(result.cleanup.observationalVerdict,'HOLD_INCOMPLETE');assert.equal(JSON.parse(result.output).complete,false);});
test('failed positive controls remain observational HOLD rather than security PASS',async()=>{const {result}=await run({output:body({positiveControlsValid:false})});assert.equal(result.ok,true);assert.equal(result.cleanup.observationalVerdict,'HOLD_POSITIVE_CONTROLS');});
for(const [index,overrides] of [{scope:'RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE'},{complete:'true'},{positiveControlsValid:'true'},{resourceAcceptance:'PASS'},{renderAcceptance:'PASS'},{results:CASES.slice(1).map(name=>caseResult(name))},{results:CASES.map(()=>caseResult(CASES[0]))},{results:CASES.map(name=>caseResult(name,'PASS'))},{results:CASES.map(name=>caseResult(name,'NOT_RUN'))}].entries())test('AAC rejects contradictory or substituted result case '+index,async()=>{const {result}=await run({output:body(overrides)});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(result.output,undefined);});
test('AAC refuses DEPS identity before create',async()=>{const fake=fakeDocker();await assert.rejects(()=>runAacProbe({docker:fake.docker,identity:createIdentity('42152274083','1','0123456789abcdef'),mounts,user:'1001:1001'}));assert.equal(fake.calls.length,0);});
test('DEPS task labels cannot authorize AAC start or cleanup',async()=>{const {result,calls}=await run({foreignLabels:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.ok(!calls.some(x=>x.args[0]==='start'||x.args[0]==='rm'));});
test('DEPS result scope cannot pass the AAC writer',async()=>{const {result}=await run();hostFixture(dir=>{assert.throws(()=>writeResults(dir,result));assert.deepEqual(fs.readdirSync(dir),[]);});});
function hostFixture(fn){const root=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-aac-runner-'));try{fn(root);}finally{const absolute=path.resolve(root);assert.ok(absolute.startsWith(path.resolve(os.tmpdir())+path.sep+'phase30-aac-runner-'));fs.rmSync(absolute,{recursive:true,force:true});}}
test('AAC publishes only its fixed filenames and preserves trailing newline after cleanup',async()=>{const {result}=await run();hostFixture(dir=>{writeAacResults(dir,result);assert.deepEqual(fs.readdirSync(dir).sort(),['aac-cleanup.json','aac-observations.json']);assert.deepEqual(fs.readFileSync(path.join(dir,'aac-observations.json')),body());assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'aac-cleanup.json'))).status,'VERIFIED_ABSENT');assert.ok(!fs.existsSync(path.join(dir,'assembly-dependencies.json')));});});
test('AAC cannot overwrite existing receipt or publish observations on failed cleanup',async()=>{const {result}=await run({removeFails:true});hostFixture(dir=>{writeAacResults(dir,result);assert.deepEqual(fs.readdirSync(dir),['aac-cleanup.json']);assert.throws(()=>writeAacResults(dir,result));});});

test('incomplete and failed-control data is retained while CLI disposition stays nonzero',async()=>{
 for(const output of [body({complete:false}),body({positiveControlsValid:false})]){
  const {result}=await run({output});assert.equal(result.ok,true);assert.equal(aacExitCode(result),1);
  hostFixture(dir=>{writeAacResults(dir,result);assert.deepEqual(fs.readFileSync(path.join(dir,'aac-observations.json')),output);});
 }
 const {result}=await run();assert.equal(aacExitCode(result),0);
});
test('problematic negative observations do not acquire a security PASS or block diagnostic retention',async()=>{
 const results=CASES.map(name=>caseResult(name));results[2].commands[1].lateSbrError=true;results[2].commands[1].quietPredicate=false;results[2].commands[1].stderrBytes=31;
 const {result}=await run({output:body({results})});assert.equal(result.ok,true);assert.equal(aacExitCode(result),0);const saved=JSON.parse(result.output);assert.equal(saved.workerAcceptance,'NOT_RUN');assert.equal(saved.results[2].commands[1].lateSbrError,true);assert.ok(!Object.hasOwn(saved,'negativeTestsPass'));
});
for(const [label,mutate] of [
 ['unknown root field',v=>{v.secretPath='/private';}],
 ['wrong continuation',v=>{v.continuationPolicy='WORKER_PASS';}],
 ['oversize source',v=>{v.results[0].sourceBytes=4097;}],
 ['invalid source digest',v=>{v.results[0].sourceSha256='z'.repeat(64);}],
 ['oversize observed output',v=>{v.results[0].normalizedBytes=67108865;}],
 ['unknown case field',v=>{v.results[0].path='/private';}],
 ['missing ordered command',v=>{v.results[0].commands.pop();}],
 ['wrong command stage',v=>{v.results[0].commands[0].stage='NORMALIZE';}],
 ['unknown command field',v=>{v.results[0].commands[0].stderr='raw private text';}],
 ['invalid exit code',v=>{v.results[0].commands[0].status=-1;}],
 ['unknown signal',v=>{v.results[0].commands[0].signal='SIG_UNREVIEWED';}],
 ['oversize stdout observation',v=>{v.results[0].commands[0].stdoutBytes=196609;}],
 ['unknown audio profile',v=>{v.results[0].commands[0].audioProfile='HE-AACv3';}],
 ['mistyped predicate',v=>{v.results[0].commands[0].quietPredicate='true';}],
])test('closed AAC typed boundary rejects '+label,async()=>{const value=JSON.parse(body());mutate(value);const {result}=await run({output:Buffer.from(JSON.stringify(value)+'\n')});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(result.output,undefined);});
test('oversize observed bytes can remain explicit ERROR data without changing format acceptance',async()=>{
 const results=CASES.map(name=>caseResult(name));results[2].status='ERROR';results[2].normalizedBytes=67108864;
 const {result}=await run({output:body({complete:false,results})});assert.equal(result.ok,true);assert.equal(aacExitCode(result),1);assert.equal(JSON.parse(result.output).results[2].normalizedBytes,67108864);
});
test('AAC writer rejects dependency-profile receipt before any write',async()=>{
 const {result}=await run();const foreign={...result,profile:'DEPS',cleanup:{...result.cleanup,scope:'PHASE30_RESEARCH_COLLECTOR_CLEANUP_ONLY'}};
 hostFixture(dir=>{assert.throws(()=>writeAacResults(dir,foreign));assert.deepEqual(fs.readdirSync(dir),[]);});
});
test('thin AAC CLI rejects arbitrary arguments without Docker execution',()=>{
 const {spawnSync}=require('node:child_process');const child=spawnSync(process.execPath,[path.join(__dirname,'run-aac-probe.cjs'),'--profile=DEPS'],{encoding:'utf8',timeout:3000});assert.equal(child.status,1);assert.match(child.stderr,/AAC_PROBE_REJECTED/);assert.ok(!child.stderr.includes('--profile=DEPS'));
});

for(const [label,mutate] of [
 ['positive control has stderr',v=>{const c=v.results[0].commands[1];c.stderrBytes=1;c.quietPredicate=false;}],
 ['positive control command errored',v=>{const c=v.results[0].commands[1];c.status=null;c.error='EXECUTION';c.exitPredicate=false;c.quietPredicate=false;c.exitAndLcProfilePredicate=false;}],
 ['exit predicate claims success at status1',v=>{v.results[2].commands[1].status=1;}],
 ['quiet predicate ignores stderr',v=>{v.results[2].commands[1].stderrBytes=1;}],
 ['LC predicate ignores different profile',v=>{v.results[2].commands[0].audioProfile='OTHER';}],
 ['exit predicate falsely denies status0',v=>{v.results[2].commands[1].exitPredicate=false;}],
 ['predicate ignores worker stdout ceiling',v=>{v.results[2].commands[1].stdoutBytes=131073;}],
 ['positive control normalized output empty',v=>{v.results[0].normalizedBytes=0;}],
 ['positive control normalized output above3MiB',v=>{v.results[0].normalizedBytes=3145729;}],
 ['positive control thumbnail above256KiB',v=>{v.results[1].thumbnailBytes=262145;}],
 ['positive control source probe is not LC',v=>{const c=v.results[0].commands[0];c.audioProfile='OTHER';c.exitAndLcProfilePredicate=false;}],
 ['complete corpus includes BUDGET',v=>{const c=v.results[2].commands[2];c.status=null;c.error='BUDGET';c.exitPredicate=false;c.quietPredicate=false;c.exitAndLcProfilePredicate=false;}],
 ['complete corpus includes TIMEOUT',v=>{const c=v.results[2].commands[1];c.status=null;c.signal='SIGKILL';c.error='TIMEOUT';c.exitPredicate=false;c.quietPredicate=false;c.exitAndLcProfilePredicate=false;}],
 ['complete corpus includes native signal',v=>{const c=v.results[2].commands[1];c.status=null;c.signal='SIGSEGV';c.exitPredicate=false;c.quietPredicate=false;c.exitAndLcProfilePredicate=false;}],
 ['complete corpus includes OUTPUT_LIMIT',v=>{const c=v.results[2].commands[1];c.error='OUTPUT_LIMIT';c.exitPredicate=false;c.quietPredicate=false;c.exitAndLcProfilePredicate=false;}],
])test('rejects contradictory AAC claim: '+label,async()=>{const value=JSON.parse(body());mutate(value);const {result}=await run({output:Buffer.from(JSON.stringify(value)+'\n')});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(result.output,undefined);});

test('nonzero negative codec exit and dependent NOT_RUN remain complete observations',async()=>{
 const results=CASES.map(name=>caseResult(name)),row=results[2];
 Object.assign(row.commands[1],{status:1,stderrBytes:64,stderrSha256:'d'.repeat(64),exitPredicate:false,quietPredicate:false,exitAndLcProfilePredicate:false});
 const skipped=caseResult(row.name,'NOT_RUN').commands;
 for(let i=2;i<row.commands.length;i++)row.commands[i]={...skipped[i],error:'NOT_RUN'};
 const {result}=await run({output:body({results})});assert.equal(result.ok,true);assert.equal(aacExitCode(result),0);assert.equal(JSON.parse(result.output).results[2].commands[2].error,'NOT_RUN');
});
test('honest noisy-control HOLD remains retained with nonzero disposition',async()=>{
 const results=CASES.map(name=>caseResult(name));Object.assign(results[0].commands[1],{stderrBytes:31,stderrSha256:'d'.repeat(64),quietPredicate:false});
 const output=body({positiveControlsValid:false,results}),{result}=await run({output});assert.equal(result.ok,true);assert.equal(aacExitCode(result),1);
 hostFixture(dir=>{writeAacResults(dir,result);assert.deepEqual(fs.readFileSync(path.join(dir,'aac-observations.json')),output);});
});
test('honest fatal incomplete observations remain retained as HOLD',async()=>{
 const results=CASES.map(name=>caseResult(name));results[2].status='ERROR';Object.assign(results[2].commands[1],{status:null,signal:'SIGKILL',error:'TIMEOUT',exitPredicate:false,quietPredicate:false,exitAndLcProfilePredicate:false});
 const output=body({complete:false,results}),{result}=await run({output});assert.equal(result.ok,true);assert.equal(aacExitCode(result),1);assert.equal(result.cleanup.observationalVerdict,'HOLD_INCOMPLETE');
 hostFixture(dir=>{writeAacResults(dir,result);assert.deepEqual(fs.readFileSync(path.join(dir,'aac-observations.json')),output);});
});
test('true positive controls allow exact unchanged output ceilings',async()=>{
 const results=CASES.map(name=>caseResult(name));for(const row of results.slice(0,2)){row.normalizedBytes=3145728;row.thumbnailBytes=262144;}
 const {result}=await run({output:body({results})});assert.equal(result.ok,true);assert.equal(aacExitCode(result),0);
});
test('consistent predicate observations survive below,at,above worker stdout ceiling',async()=>{
 for(const bytes of [131071,131072,131073]){
  const results=CASES.map(name=>caseResult(name));Object.assign(results[2].commands[1],{stdoutBytes:bytes,stdoutSha256:'e'.repeat(64),exitPredicate:bytes<=131072,quietPredicate:bytes<=131072});
  const {result}=await run({output:body({results})});assert.equal(result.ok,true);assert.equal(JSON.parse(result.output).results[2].commands[1].exitPredicate,bytes<=131072);
 }
});
