'use strict';
// Thin literal AAC observation entrypoint; no script/options/environment override.
const {runCollector,writeResults,runOperational,operationalExitCode}=require('./run-collector.cjs');
function runAacProbe(options){return runCollector({...options,profile:'AAC'});}
function writeAacResults(hostDirectory,result){return writeResults(hostDirectory,result,'AAC');}
function aacExitCode(result){return operationalExitCode(result,'AAC');}
module.exports={runAacProbe,writeAacResults,aacExitCode};
if(require.main===module){runOperational('AAC').catch(()=>{console.error('AAC_PROBE_REJECTED');process.exitCode=1;});}
