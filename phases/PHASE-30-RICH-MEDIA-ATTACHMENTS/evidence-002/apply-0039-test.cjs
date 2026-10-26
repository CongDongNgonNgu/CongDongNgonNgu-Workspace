'use strict';
// Exact TEST operator. Invocation attests an independently observed main CI;
// this script cannot establish GitHub success from its command-line argument.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process'),{createRequire}=require('node:module');
const ROOT='D:\\Work\\CongDongNgonNgu\\CongDongNgonNgu-Back-End';
const REV='c209ce81097a0fe385cfb9f9c367520c0f7c7618',TREE='48617164f7968bbf125ce84f922344f105fafac4';
const FILE='0039_phase30_attachments.sql',SHA='6c8540daa6255089d3706e8c6893795efe1d8f7dce2273eca432c71ea6c19b9c';
const TABLES=['attachments','attachment_upload_replay_leases','attachment_bindings','attachment_objects','attachment_cleanup_jobs','attachment_quota_counters','attachment_processing_lease','attachment_initiation_admissions'];
const normalize=s=>s.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
const digest=s=>crypto.createHash('sha256').update(normalize(s)).digest('hex');
let stage='INVOCATION',commitAttempted=false,commitConfirmed=false;
const requireCondition=value=>{if(!value)throw Error('REJECTED');};
const gitRaw=(...args)=>execFileSync('git',args,{cwd:ROOT,encoding:'utf8',stdio:['ignore','pipe','ignore']});
const git=(...args)=>gitRaw(...args).trim();
async function main(){
 const args=process.argv.slice(2),verify=args.length===1&&args[0]==='--verify-only';
 requireCondition(verify||(args.length===2&&args[0]==='--apply-0039-authorized-test'&&args[1]==='--main-ci-40261190199-confirmed'));
 stage='SOURCE';requireCondition(git('branch','--show-current')==='main'&&git('rev-parse','HEAD')===REV&&git('rev-parse','origin/main')===REV&&git('rev-parse','HEAD^{tree}')===TREE&&git('status','--porcelain')==='');
 const files=fs.readdirSync(path.join(ROOT,'database/migrations')).filter(x=>x.endsWith('.sql')&&!x.endsWith('.down.sql')).sort();
 requireCondition(files.length===39&&files.at(-1)===FILE);
 const sources=new Map(files.map(file=>{const sql=normalize(gitRaw('show',REV+':database/migrations/'+file)),hash=digest(sql);requireCondition(hash===digest(fs.readFileSync(path.join(ROOT,'database/migrations',file),'utf8')));return [file,{sql,hash}];}));
 requireCondition(sources.get(FILE).hash===SHA);
 process.loadEnvFile(path.join(ROOT,'.env'));
 const backendRequire=createRequire(path.join(ROOT,'package.json'));
 const {direct,local}=backendRequire('./scripts/phase30-sql-target.cjs').validatedTestTarget(process.env.DATABASE_URL);requireCondition(local===false);
 const {Pool}=backendRequire('pg');
 const pool=()=>{const p=new Pool({connectionString:direct.toString(),max:1,connectionTimeoutMillis:10000,query_timeout:45000});p.on('error',()=>{});return p;};
 async function identity(c){const x=(await c.query("SELECT current_database() db,current_schema() schema,current_setting('server_version_num')::int version")).rows[0];requireCondition(x.db==='neondb'&&x.schema==='public'&&x.version===180006);}
 async function history(c,count){const rows=(await c.query('SELECT filename,checksum FROM public.schema_migrations ORDER BY filename')).rows;requireCondition(rows.length===count&&rows.every(x=>sources.get(x.filename)?.hash===x.checksum));const pending=files.filter(f=>!rows.some(x=>x.filename===f));requireCondition(count===38?pending.length===1&&pending[0]===FILE:pending.length===0);}
 async function schema(c){
  const counts={};for(const table of TABLES){const n=Number((await c.query('SELECT count(*) n FROM public.'+table)).rows[0].n);requireCondition(n===(table==='attachment_processing_lease'?1:0));counts[table]=n;}
  const singleton=(await c.query('SELECT singleton,owner,attachment_id,expires_at FROM public.attachment_processing_lease')).rows;requireCondition(singleton.length===1&&singleton[0].singleton===true&&['owner','attachment_id','expires_at'].every(k=>singleton[0][k]===null));
  const fks=(await c.query("SELECT conname,condeferrable,condeferred,convalidated,confdeltype,pg_get_constraintdef(oid,true) definition FROM pg_constraint WHERE contype='f' AND connamespace='public'::regnamespace AND conrelid='public.attachments'::regclass AND confrelid='public.attachment_objects'::regclass AND conname=ANY($1)",[['phase30_source_identity','phase30_normalized_identity','phase30_thumbnail_identity']])).rows;
  const fkColumns={phase30_source_identity:'source_object_id',phase30_normalized_identity:'normalized_object_id',phase30_thumbnail_identity:'thumbnail_object_id'};
  requireCondition(fks.length===3&&fks.every(x=>x.condeferrable&&!x.condeferred&&x.convalidated&&x.confdeltype==='a'&&x.definition==='FOREIGN KEY ('+fkColumns[x.conname]+', id) REFERENCES attachment_objects(id, attachment_id) DEFERRABLE'));
  const uniqueExpected={phase30_post_author_language:['community_posts','UNIQUE (id, author_user_id, target_language_id)'],phase30_text_group_author:['study_group_texts','UNIQUE (group_id, id, author_user_id)'],phase30_message_conversation_author:['direct_messages','UNIQUE (conversation_id, id, sender_user_id)']};
  const unique=(await c.query("SELECT conname,conrelid::regclass::text relation,pg_get_constraintdef(oid,true) definition FROM pg_constraint WHERE connamespace='public'::regnamespace AND contype='u' AND convalidated AND conname=ANY($1)",[Object.keys(uniqueExpected)])).rows;requireCondition(unique.length===3&&unique.every(x=>x.relation===uniqueExpected[x.conname][0]&&x.definition===uniqueExpected[x.conname][1]));
  const expectedTriggers=[...sources.get(FILE).sql.matchAll(/CREATE TRIGGER (phase30_\w+) BEFORE ([A-Z ]+) ON (\w+) FOR EACH ROW EXECUTE FUNCTION (\w+)\(\);/g)];requireCondition(expectedTriggers.length===6);
  const triggers=(await c.query("SELECT t.tgname,t.tgrelid::regclass::text relation,t.tgtype,p.proname,n.nspname function_schema FROM pg_trigger t JOIN pg_proc p ON p.oid=t.tgfoid JOIN pg_namespace n ON n.oid=p.pronamespace WHERE t.tgrelid=ANY($1::regclass[]) AND NOT t.tgisinternal AND t.tgenabled='O' AND t.tgname=ANY($2)",[TABLES.map(t=>'public.'+t),expectedTriggers.map(x=>x[1])])).rows;
  requireCondition(triggers.length===6&&expectedTriggers.every(x=>{const t=triggers.find(t=>t.tgname===x[1]);const bits=3+(x[2].includes('INSERT')?4:0)+(x[2].includes('DELETE')?8:0)+(x[2].includes('UPDATE')?16:0);return t&&t.relation===x[3]&&t.proname===x[4]&&t.function_schema==='public'&&t.tgtype===bits;}));
  const expectedFunctions=[...sources.get(FILE).sql.matchAll(/CREATE FUNCTION (phase30_\w+)\(([^)]*)\) RETURNS (trigger|boolean) LANGUAGE (plpgsql|sql) AS \$\$([\s\S]*?)\$\$;/g)];requireCondition(expectedFunctions.length===7);
  const functions=(await c.query("SELECT p.proname,p.prosrc,p.prosecdef,p.proconfig,l.lanname,pg_get_function_identity_arguments(p.oid) args,pg_get_function_result(p.oid) result FROM pg_proc p JOIN pg_language l ON l.oid=p.prolang WHERE p.pronamespace='public'::regnamespace AND p.proname=ANY($1)",[expectedFunctions.map(x=>x[1])])).rows;
  requireCondition(functions.length===7&&expectedFunctions.every(x=>{const f=functions.find(f=>f.proname===x[1]);return f&&f.args===x[2]&&f.result===x[3]&&f.lanname===x[4]&&normalize(f.prosrc)===x[5]&&!f.prosecdef&&f.proconfig===null;}));
  await c.query('SELECT source_object_id,normalized_object_id,thumbnail_object_id,upload_slot_held,pending_slot_held FROM public.attachments LIMIT 0');await c.query('SELECT singleton FROM public.attachment_processing_lease WHERE singleton');await c.query('SELECT attachment_id,owner FROM public.attachment_upload_replay_leases LIMIT 0');await c.query('SELECT put_supervision_id,put_abandoned_at FROM public.attachment_objects LIMIT 0');return counts;
 }
 if(!verify){
  const p=pool();let c;try{stage='CONNECT';c=await p.connect();c.on('error',()=>{});stage='TRANSACTION';await c.query('BEGIN');await c.query("SET LOCAL search_path=public; SET LOCAL lock_timeout='5s'; SET LOCAL statement_timeout='30s'; SET LOCAL idle_in_transaction_session_timeout='15s'");await c.query('SELECT pg_advisory_xact_lock(20260910)');await c.query('LOCK TABLE public.schema_migrations IN SHARE ROW EXCLUSIVE MODE');stage='BASELINE';await identity(c);await history(c,38);const present=(await c.query("SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename=ANY($1)",[TABLES])).rows;requireCondition(present.length===0);stage='DDL';await c.query(sources.get(FILE).sql);await c.query('INSERT INTO public.schema_migrations(filename,checksum) VALUES($1,$2)',[FILE,SHA]);stage='PRECOMMIT';await history(c,39);await schema(c);stage='COMMIT';commitAttempted=true;await c.query('COMMIT');commitConfirmed=true;}catch(error){if(c)await c.query('ROLLBACK').catch(()=>{});throw error;}finally{if(c)c.release(true);await p.end();}
 }
 const p=pool();let c;try{stage='INDEPENDENT_READ';c=await p.connect();c.on('error',()=>{});await c.query('BEGIN READ ONLY');await c.query("SET LOCAL search_path=public; SET LOCAL statement_timeout='30s'");await identity(c);await history(c,39);const counts=await schema(c);await c.query('ROLLBACK');console.log(JSON.stringify({status:verify?'VERIFIED_APPLIED':'APPLIED_AND_INDEPENDENTLY_VERIFIED',target:'EXACT_APPROVED_TEST',revision:REV,tree:TREE,mainCiRun:'40261190199',migration:FILE,checksum:SHA,history:39,counts,startupGate:'PASS',formatEnablement:false,fixturesCreated:false}));}finally{if(c)c.release(true);await p.end();}
}
main().catch(()=>{console.error(JSON.stringify({status:commitConfirmed?'APPLIED_POSTCHECK_FAILED':commitAttempted?'COMMIT_UNCERTAIN':'REJECTED_NO_CONFIRMED_COMMIT',stage,next:commitAttempted?'INDEPENDENT_VERIFY_DO_NOT_REAPPLY':'REVIEW_NO_AUTOMATIC_RETRY'}));process.exitCode=1;});
