'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {createIdentity,runCollector,writeResults}=require('./run-collector.cjs');
const receipt=JSON.parse(fs.readFileSync(path.join(__dirname,'../../phases/PHASE-30-RICH-MEDIA-ATTACHMENTS/evidence-002/simd-ci42152274083/raw-text.json'),'utf8'));
const targets=receipt.files.find(x=>x.name==='build.log').text.split(/\r?\n/).filter(x=>x.startsWith('X86ASM\t')).map(x=>x.slice(7)).sort();
const validOutput=()=>Buffer.from(JSON.stringify({scope:'RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE',targets})+'\n');
const identity=()=>createIdentity('42152274083','1','0123456789abcdef');
const cid='a'.repeat(64);
const mounts={objects:'/owned/build/objects',evidence:'/owned/build-evidence',research:'/owned/research'};
function fakeDocker(options={}){
 const id=identity(),calls=[];let present=false,started=false,removeAttempted=false;
 const docker=async(args,settings)=>{
  calls.push({args:[...args],settings:{...settings}});
  if(args[0]==='create'){
   present=!options.createAbsent;
   if(options.createError)throw Object.assign(Error('PRIVATE_DOCKER_ERROR'),{code:'ETIMEDOUT'});
   return Buffer.from(options.badCID?'not-a-cid\n':cid+'\n');
  }
  if(args[0]==='inspect'){
   if(options.inspectError)throw Error('PRIVATE_INSPECT_ERROR');
   return Buffer.from(JSON.stringify({id:cid,name:'/'+id.name,labels:options.wrongLabels?{...id.labels,'org.congdongngonngu.phase30.task':'foreign'}:id.labels,state:{running:started&&!!options.running,exitCode:started?(options.exitCode??0):0,oomKilled:started&&!!options.oom}}));
  }
  if(args[0]==='start'){
   started=true;
   if(options.startError)throw Object.assign(Error('PRIVATE_START_ERROR'),{code:options.startError});
   return options.output??validOutput();
  }
  if(args[0]==='rm'){
   removeAttempted=true;
   if(options.rmError)throw Error('PRIVATE_RM_ERROR');
   if(!options.stillPresent)present=false;
   return Buffer.from(cid+'\n');
  }
  if(args[0]==='container'&&args[1]==='ls'){
   if(options.listError||(options.nameListError&&removeAttempted&&args.includes('name=^/'+id.name+'$')))throw Error('PRIVATE_LIST_ERROR');
   if(options.ambiguousDiscovery&&!removeAttempted)return Buffer.from(cid+'\n'+'b'.repeat(64)+'\n');
   return Buffer.from(present?cid+'\n':'');
  }
  throw Error('UNEXPECTED_FAKE_COMMAND');
 };
 return {docker,calls,wasRemoved:()=>removeAttempted};
}
async function run(options){const fake=fakeDocker(options);const result=await runCollector({docker:fake.docker,identity:identity(),mounts,user:'1001:1001'});return {...fake,result};}
test('successful body requires owned container cleanup and two successful absence queries',async()=>{const {result,calls}=await run();assert.equal(result.ok,true);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(result.cleanup.absenceQueries,2);assert.equal(result.cleanup.removeSucceeded,true);assert.deepEqual(result.output,validOutput());const create=calls.find(x=>x.args[0]==='create');assert.ok(create.args.includes('--read-only'));assert.ok(create.args.includes('none'));assert.ok(create.args.includes('node@sha256:6f7b03f7c2c8e2e784dcf9295400527b9b1270fd37b7e9a7285cf83b6951452d'));assert.ok(create.args.filter(x=>x.includes(':ro')).length===3);assert.equal(calls.find(x=>x.args[0]==='start').settings.timeout,20000);});
for(const code of ['ETIMEDOUT','EIO'])test('body failure '+code+' still removes only exact owned CID',async()=>{const {result,calls}=await run({startError:code});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(result.output,undefined);assert.deepEqual(calls.find(x=>x.args[0]==='rm').args,['rm','--force',cid]);});
test('wrong labels prohibit start and removal',async()=>{const {result,calls}=await run({wrongLabels:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.ok(!calls.some(x=>x.args[0]==='start'||x.args[0]==='rm'));});
for(const option of ['rmError','listError','nameListError','stillPresent','inspectError'])test(option+' cannot produce cleanup PASS',async()=>{const {result}=await run({[option]:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.equal(result.output,undefined);});
for(const state of [{exitCode:17},{oom:true},{running:true}])test('rejects unsuccessful actual container state '+JSON.stringify(state),async()=>{const {result,wasRemoved}=await run(state);assert.equal(result.ok,false);assert.equal(result.output,undefined);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.equal(wasRemoved(),true);});
test('create error recovers cleanup through exact name and labels without claiming run success',async()=>{const {result,calls}=await run({createError:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.ok(calls.some(x=>x.args[0]==='rm'));const discovery=calls.filter(x=>x.args[0]==='container');assert.ok(discovery.some(x=>x.args.includes('name=^/'+identity().name+'$')&&x.args.some(a=>a.startsWith('label='))));assert.ok(!calls.some(x=>x.args[0]==='start'));});
test('unresolved create error stays UNVERIFIED despite empty discovery',async()=>{const {result,calls}=await run({createError:true,createAbsent:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.ok(!calls.some(x=>x.args[0]==='rm'));});
test('malformed create output can recover cleanup but cannot start body',async()=>{const {result,calls}=await run({badCID:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');assert.ok(!calls.some(x=>x.args[0]==='start'));});
for(const output of [Buffer.from('not-json\n'),Buffer.from([255]),Buffer.from(JSON.stringify({scope:'foreign',targets})),Buffer.from(JSON.stringify({scope:'RESEARCH_DEPENDENCIES_ONLY_NOT_LINK_OR_SOURCE_CLOSURE',targets:targets.slice(1)}))])test('invalid body output is withheld after cleanup '+output.length,async()=>{const {result}=await run({output});assert.equal(result.ok,false);assert.equal(result.output,undefined);assert.equal(result.cleanup.status,'VERIFIED_ABSENT');});
test('identity rejects noncanonical ids and distinct attempts/names remain scoped',()=>{for(const run of ['0','../1','1\n','001'])assert.throws(()=>createIdentity(run,'1','0123456789abcdef'));assert.notEqual(createIdentity('1','1','0123456789abcdef').name,createIdentity('1','2','0123456789abcdef').name);});
function hostFixture(fn){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'phase30-collector-driver-'));try{fn(dir);}finally{const resolved=path.resolve(dir);assert.ok(resolved.startsWith(path.resolve(os.tmpdir())+path.sep+'phase30-collector-driver-'));fs.rmSync(resolved,{recursive:true,force:true});}}
test('publishes dependency bytes only after verified cleanup receipt',async()=>{const {result}=await run();hostFixture(dir=>{writeResults(dir,result);const proof=JSON.parse(fs.readFileSync(path.join(dir,'collector-cleanup.json'),'utf8'));assert.equal(proof.status,'VERIFIED_ABSENT');assert.deepEqual(fs.readFileSync(path.join(dir,'assembly-dependencies.json')),validOutput());assert.ok(!JSON.stringify(proof).includes('PRIVATE'));});});
test('failure publishes only generic cleanup observations',async()=>{const {result}=await run({listError:true});hostFixture(dir=>{writeResults(dir,result);assert.deepEqual(fs.readdirSync(dir),['collector-cleanup.json']);assert.ok(!fs.readFileSync(path.join(dir,'collector-cleanup.json'),'utf8').includes('PRIVATE'));});});
test('exclusive cleanup receipt prevents overwriting prior proof or publishing output',async()=>{const {result}=await run();hostFixture(dir=>{fs.writeFileSync(path.join(dir,'collector-cleanup.json'),'KEEP');assert.throws(()=>writeResults(dir,result));assert.equal(fs.readFileSync(path.join(dir,'collector-cleanup.json'),'utf8'),'KEEP');assert.ok(!fs.existsSync(path.join(dir,'assembly-dependencies.json')));});});


test('ambiguous create discovery never removes any container',async()=>{const {result,calls}=await run({createError:true,ambiguousDiscovery:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.ok(!calls.some(x=>x.args[0]==='rm'));});
test('fallback ownership mismatch never removes a discovered container',async()=>{const {result,calls}=await run({createError:true,wrongLabels:true});assert.equal(result.ok,false);assert.equal(result.cleanup.status,'UNVERIFIED');assert.ok(!calls.some(x=>x.args[0]==='rm'));});
test('existing dependency destination remains unchanged',async()=>{const {result}=await run();hostFixture(dir=>{const output=path.join(dir,'assembly-dependencies.json');fs.writeFileSync(output,'KEEP');assert.throws(()=>writeResults(dir,result));assert.equal(fs.readFileSync(output,'utf8'),'KEEP');assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'collector-cleanup.json'),'utf8')).status,'VERIFIED_ABSENT');});});

test('unknown lifecycle profile rejects before Docker I/O',async()=>{const fake=fakeDocker();await assert.rejects(()=>runCollector({docker:fake.docker,identity:identity(),mounts,user:'1001:1001',profile:'UNKNOWN'}));assert.equal(fake.calls.length,0);});
test('AAC and dependency identities cannot share task labels or container names',()=>{const deps=identity(),aac=createIdentity('42152274083','1','0123456789abcdef','AAC');assert.notEqual(deps.name,aac.name);assert.notEqual(deps.labels['org.congdongngonngu.phase30.task'],aac.labels['org.congdongngonngu.phase30.task']);});
