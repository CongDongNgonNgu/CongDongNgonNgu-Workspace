'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
function validateBudget(cpu,memory,swap){const [quota,period]=cpu.trim().split(/\s+/).map(Number);assert(Number.isFinite(quota)&&quota>0&&period>0&&quota/period<=0.1,'CPU_QUOTA_REQUIRED');assert(Number(memory)>0&&Number(memory)<=512*1024*1024,'MEMORY_CAP_REQUIRED');assert.equal(Number(swap),0,'NO_SWAP_REQUIRED');}
function main(){
 const read=name=>fs.readFileSync('/sys/fs/cgroup/'+name,'utf8').trim();
 const cpu=read('cpu.max'),memory=read('memory.max'),swap=read('memory.swap.max');validateBudget(cpu,memory,swap);
 fs.writeFileSync('/evidence/preflight.json',JSON.stringify({uid:process.getuid(),cpuMax:cpu,memoryMax:memory,swapMax:swap,evidenceWriteVerified:true})+'\n');
 const run=(script,args=[])=>{const result=spawnSync(process.execPath,[path.join(__dirname,script),...args],{encoding:'utf8',timeout:480000,maxBuffer:256*1024,windowsHide:true});assert.ifError(result.error);process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0,script+' failed');};
 run('video-benchmark.cjs',['--self-test']);run('document-benchmark.cjs',['--self-test']);run('image-benchmark.cjs');run('video-benchmark.cjs');run('document-benchmark.cjs');
 const image=JSON.parse(fs.readFileSync(process.env.IMAGE_RESULT_PATH,'utf8')),video=JSON.parse(fs.readFileSync(process.env.VIDEO_RESULT_PATH,'utf8'));
 const document=JSON.parse(fs.readFileSync(process.env.DOCUMENT_RESULT_PATH,'utf8'));assert(image.assertionsPassed&&video.assertionsPassed&&document.assertionsPassed,'ASSERTIONS_REQUIRED');assert.equal(document.results.length,14,'DOCUMENT_CASES_REQUIRED');const documentMaxRssKiB=Math.max(...document.results.map(x=>x.processMaxRssKiB));assert(documentMaxRssKiB>0&&documentMaxRssKiB<=192*1024,'DOCUMENT_WORKER_RSS_BUDGET');for(const item of video.results)if(item.pipelineWallMs!==undefined)assert(item.pipelineWallMs<=15000,'VIDEO_WHOLE_PIPELINE_DEADLINE');
 const imageMaxRssKiB=Math.max(...image.results.map(x=>x.processMaxRssKiB));assert(imageMaxRssKiB<=192*1024,'IMAGE_WORKER_RSS_BUDGET');
 const videoRss=[];for(const item of video.results)for(const stage of item.stages||[]){assert(stage.wallMs<30000,'VIDEO_STAGE_DEADLINE');for(const line of stage.benchmark){const match=/maxrss=(\d+)KiB/.exec(line);if(match)videoRss.push(Number(match[1]));}}
 assert(videoRss.length>=6,'VIDEO_MEMORY_MEASUREMENTS_REQUIRED');const videoMaxRssKiB=Math.max(...videoRss);assert(videoMaxRssKiB>0&&videoMaxRssKiB<=192*1024,'VIDEO_WORKER_RSS_BUDGET');
 const events=read('memory.events');assert(/oom_kill 0(?:\n|$)/.test(events),'NO_OOM_KILL');
 const report={scope:'LINUX_CGROUP_SYNTHETIC_FEASIBILITY_NOT_RENDER_DEPLOYMENT',recordedAt:new Date().toISOString(),node:process.version,cpuMax:cpu,memoryMax:memory,swapMax:swap,memoryPeak:read('memory.peak'),memoryEvents:events,imageMaxRssKiB,videoMaxRssKiB,documentMaxRssKiB,assertionsPassed:true,limitations:['No actual Render runtime or shared-API concurrency measurement.','Synthetic fixtures are not a complete adversarial corpus.','Candidate format/size/duration limits still require independent contract review.','FFmpeg LGPL build provenance/archives remain pinned in the workflow; no redistribution to clients.']};
 fs.writeFileSync('/evidence/budget.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}
module.exports={validateBudget};if(require.main===module)main();