'use strict';
// Bounded diagnostic, not an attachment processor or an application-memory guarantee.
const assert=require('node:assert/strict');const fs=require('node:fs');const os=require('node:os');const {spawnSync}=require('node:child_process');
function vmHwmKiB(status){const match=/^VmHWM:\s+(\d+) kB$/m.exec(status);const value=Number(match?.[1]);assert(Number.isFinite(value)&&value>0,'POSITIVE_LINUX_VMHWM_REQUIRED');return value;}
function current(){return {linuxVmHwmKiB:vmHwmKiB(fs.readFileSync('/proc/self/status','utf8')),rawRusageMaxRssKiB:process.resourceUsage().maxRSS};}
function main(){
 assert.equal(process.platform,'linux','LINUX_DIAGNOSTIC_ONLY');
 if(process.argv.includes('--trivial-child')){console.log(JSON.stringify(current()));return;}
 const started=performance.now();
 // Touch physical pages; bounded allocation is160MiB, below the192MiB experiment allocation ceiling.
 const allocationBytes=160*1024*1024;assert(allocationBytes<=192*1024*1024,'DIAGNOSTIC_ALLOCATION_BUDGET');
 const heavy=Buffer.alloc(allocationBytes,0x5a);const parent=current();
 const remaining=10000-(performance.now()-started);assert(remaining>0,'DIAGNOSTIC_DEADLINE');
 const result=spawnSync(process.execPath,[__filename,'--trivial-child'],{encoding:'utf8',timeout:Math.floor(remaining),maxBuffer:4096,windowsHide:true});
 assert.ifError(result.error);assert.equal(result.status,0,'TRIVIAL_CHILD_FAILED');
 const child=JSON.parse(result.stdout);assert(Number.isFinite(child.linuxVmHwmKiB)&&child.linuxVmHwmKiB>0&&child.linuxVmHwmKiB<128*1024,'TRIVIAL_CHILD_VMHWM_BUDGET');
 assert(Number.isFinite(child.rawRusageMaxRssKiB)&&child.rawRusageMaxRssKiB>0,'RAW_RUSAGE_REQUIRED');
 // Keep the allocation live until after child exec; this process exits before media benchmarks start.
 assert.equal(heavy[0]+heavy[heavy.length-1],0xb4,'DIAGNOSTIC_ALLOCATION_LIVE');
 const elapsedMs=performance.now()-started;assert(elapsedMs<=10000,'DIAGNOSTIC_DEADLINE');
 const inheritanceReproduced=child.rawRusageMaxRssKiB>child.linuxVmHwmKiB+32*1024&&child.rawRusageMaxRssKiB>=parent.linuxVmHwmKiB*0.8;
 const report={scope:'LINUX_HEAVY_PARENT_TRIVIAL_EXEC_DIAGNOSTIC',recordedAt:new Date().toISOString(),kernelVersion:os.release(),node:process.version,allocationBytes,elapsedMs,parent,child,inheritanceReproduced,interpretation:inheritanceReproduced?'RAW_RUSAGE_HIGH_WATER_EXCEEDS_CURRENT_EXEC_VMHWM':'INHERITANCE_NOT_REPRODUCED_ON_THIS_RUN',assertionsPassed:true,limitations:['Diagnostic reproduction is not required or guaranteed across kernel/spawn implementations.','Linux proc accounting is an approximation, not a hard per-worker memory cap.','This separate process exits before media runs; cgroup memory.peak still includes this intentional diagnostic allocation.']};
 fs.writeFileSync('/evidence/memory-regression.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
}
module.exports={vmHwmKiB};if(require.main===module)main();
