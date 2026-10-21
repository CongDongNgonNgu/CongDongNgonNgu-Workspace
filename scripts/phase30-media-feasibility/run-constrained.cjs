'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
function validateBudget(cpu,memory,swap){const [quota,period]=cpu.trim().split(/\s+/).map(Number);assert(Number.isFinite(quota)&&quota>0&&period>0&&quota/period<=0.1,'CPU_QUOTA_REQUIRED');assert(Number(memory)>0&&Number(memory)<=512*1024*1024,'MEMORY_CAP_REQUIRED');assert.equal(Number(swap),0,'NO_SWAP_REQUIRED');}
function validateImageMemory(results){assert(results.length>0,'IMAGE_MEMORY_MEASUREMENTS_REQUIRED');for(const item of results)assert(Number.isFinite(item.linuxVmHwmKiB)&&item.linuxVmHwmKiB>0&&item.linuxVmHwmKiB<=192*1024,'IMAGE_WORKER_VMHWM_BUDGET');return Math.max(...results.map(item=>item.linuxVmHwmKiB));}
function validateMemoryEvents(events){for(const key of ['oom','oom_kill'])assert(new RegExp('(?:^|\\n)'+key+' 0(?:\\n|$)').test(events),'NO_OOM_EVENTS');if(/(?:^|\n)oom_group_kill /.test(events))assert(/(?:^|\n)oom_group_kill 0(?:\n|$)/.test(events),'NO_OOM_EVENTS');}
function main(options={}){
 const read=options.read||(name=>fs.readFileSync('/sys/fs/cgroup/'+name,'utf8').trim());
 const write=options.write||((name,value)=>fs.writeFileSync(name,value));
 const run=options.run||((script,args=[])=>{const result=spawnSync(process.execPath,[path.join(__dirname,script),...args],{encoding:'utf8',timeout:script==='memory-regression.cjs'?10000:480000,maxBuffer:256*1024,windowsHide:true});assert.ifError(result.error);process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0,script+' failed');});
 const report={scope:'LINUX_CGROUP_SYNTHETIC_FEASIBILITY_NOT_RENDER_DEPLOYMENT',recordedAt:new Date().toISOString(),node:process.version,assertionsPassed:false,limitations:['No actual Render runtime or shared-API concurrency measurement.','Synthetic fixtures are not a complete adversarial corpus.','Candidate format/size/duration limits still require independent contract review.','FFmpeg LGPL build provenance/archives remain pinned in the workflow; no redistribution to clients.','Linux VmHWM reflects current exec address space, with kernel accounting limitations; rusage can inherit earlier high water.','192MiB is a measured acceptance threshold, not an OS-enforced per-worker cap; cgroup pressure is not free-headroom proof.']};
 let failure;
 try{
  report.cpuMax=read('cpu.max');report.memoryMax=read('memory.max');report.swapMax=read('memory.swap.max');validateBudget(report.cpuMax,report.memoryMax,report.swapMax);
  write('/evidence/preflight.json',JSON.stringify({uid:process.getuid?.()??null,cpuMax:report.cpuMax,memoryMax:report.memoryMax,swapMax:report.swapMax,evidenceWriteVerified:true})+'\n');
  // A separate process exits and releases its deliberate allocation before media experiments.
  run('memory-regression.cjs');
  run('image-benchmark.cjs',['--self-test']);run('video-benchmark.cjs',['--self-test']);run('document-benchmark.cjs',['--self-test']);run('image-benchmark.cjs');run('video-benchmark.cjs');run('document-benchmark.cjs');
  const image=JSON.parse(fs.readFileSync(process.env.IMAGE_RESULT_PATH,'utf8')),video=JSON.parse(fs.readFileSync(process.env.VIDEO_RESULT_PATH,'utf8'));
  const document=JSON.parse(fs.readFileSync(process.env.DOCUMENT_RESULT_PATH,'utf8'));assert(image.assertionsPassed&&video.assertionsPassed&&document.assertionsPassed,'ASSERTIONS_REQUIRED');assert.equal(document.results.length,14,'DOCUMENT_CASES_REQUIRED');
  report.documentMaxRssKiB=Math.max(...document.results.map(x=>x.processMaxRssKiB));assert(report.documentMaxRssKiB>0&&report.documentMaxRssKiB<=192*1024,'DOCUMENT_WORKER_RSS_BUDGET');
  report.imageRawRusageKiB=image.results.map(x=>({name:x.name,processMaxRssKiB:x.processMaxRssKiB}));report.imageMaxRssKiB=Math.max(...image.results.map(x=>x.processMaxRssKiB));
  report.imageLinuxVmHwmKiB=image.results.map(x=>({name:x.name,linuxVmHwmKiB:x.linuxVmHwmKiB}));report.imageMemoryMetric='LINUX_PROC_STATUS_VMHWM_CURRENT_EXEC';
  report.imageMaxLinuxVmHwmKiB=validateImageMemory(image.results);
  const videoRss=[];for(const item of video.results){if(item.pipelineWallMs!==undefined)assert(item.pipelineWallMs<=15000,'VIDEO_WHOLE_PIPELINE_DEADLINE');for(const stage of item.stages||[]){assert(stage.wallMs<30000,'VIDEO_STAGE_DEADLINE');for(const line of stage.benchmark){const match=/maxrss=(\d+)KiB/.exec(line);if(match)videoRss.push(Number(match[1]));}}}
  assert(videoRss.length>=6,'VIDEO_MEMORY_MEASUREMENTS_REQUIRED');report.videoMaxRssKiB=Math.max(...videoRss);assert(report.videoMaxRssKiB>0&&report.videoMaxRssKiB<=192*1024,'VIDEO_WORKER_RSS_BUDGET');
 }catch(error){failure=error;report.failureCode=/^[A-Z0-9_]{1,100}$/.test(error.message)?error.message:'EXPERIMENT_OR_ASSERTION_FAILED';}
 finally{
  // Preserve cgroup evidence even when an experiment/assertion/preflight fails.
  for(const [field,file] of [['memoryPeak','memory.peak'],['memoryEvents','memory.events']]){try{report[field]=read(file);}catch(error){report[field]=null;report[field+'ReadFailed']=true;failure??=error;report.failureCode??='CGROUP_EVIDENCE_READ_FAILED';}}
  if(report.memoryEvents!==null){try{validateMemoryEvents(report.memoryEvents);}catch(error){failure??=error;report.failureCode??='NO_OOM_EVENTS';}}
  report.assertionsPassed=!failure;report.finishedAt=new Date().toISOString();write('/evidence/budget.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }
 if(failure)throw failure;
}
module.exports={validateBudget,validateImageMemory,validateMemoryEvents,main};if(require.main===module)main();
