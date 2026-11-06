'use strict';
// Research-only bounded relink; original script and processor pins remain frozen.
const fs=require('node:fs');
const {createHash}=require('node:crypto');
const {execFileSync}=require('node:child_process');
const BASE_SHA='1ee4d1a2d8d290022ff691e7e92e2662c26cb0e31c25fa2f88e12885c58653cc';
const DELTAS=Object.freeze([
 ['2af1963c499a3005ad4d6037794b9e4bc383c7a1c0f545267297195d68f9ccee','031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3'],
 ['64c3340d0325afa37fff5015bfacf162095103dc2cbd319d799d70cc9633d24e','36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3'],
 ["'(^|[[:space:]])-c([[:space:]]|$)'","'(^|[[:space:]])(-c|([^[:space:]]*/)?(nasm|yasm))([[:space:]]|$)'"]
]);
const sha=b=>createHash('sha256').update(b).digest('hex');
function deriveRelink(bytes){
 if(!Buffer.isBuffer(bytes)||bytes.length>16384||sha(bytes)!==BASE_SHA)throw Error('RELINK_IDENTITY');
 let text=bytes.toString('utf8');
 for(const [before,after]of DELTAS){if(text.split(before).length!==2)throw Error('RELINK_DELTA');text=text.replace(before,after);}
 return Buffer.from(text);
}
module.exports={deriveRelink};
if(require.main===module){try{
 if(process.argv.length!==3)throw Error('RELINK_ARGUMENTS');
 const original=execFileSync('git',['show','HEAD:scripts/phase30-minimal-ffmpeg/link-provenance.sh'],{maxBuffer:16384,timeout:3000,stdio:['ignore','pipe','ignore']});
 const derived=deriveRelink(original);fs.writeFileSync(process.argv[2],derived,{flag:'wx',mode:0o400});
 console.log(JSON.stringify({scope:'RESEARCH_RELINK_ONLY_NOT_ADOPTION',baselineSha256:sha(original),derivedSha256:sha(derived),deltas:DELTAS}));
}catch{console.error('CANDIDATE_RELINK_REJECTED');process.exitCode=1;}}
