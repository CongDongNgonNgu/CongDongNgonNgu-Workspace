'use strict';
// Correct the ordering of one exact synthetic first sample, never arbitrary media.
const {createHash}=require('node:crypto'),fixture=require('./sei-fixture.json');
function prefixSyntheticSei(source){
 if(!Buffer.isBuffer(source)||source.length!==1109||createHash('sha256').update(source).digest('hex')!==fixture.sha256)throw Error('OWNED_SEI_FIXTURE_REQUIRED');
 if(source.readUInt32BE(958)!==69||(source[962]&31)!==5||source.readUInt32BE(1031)!==47||(source[1035]&31)!==6||source.readUInt32BE(1082)!==23||(source[1086]&31)!==1)throw Error('SEI_FIXTURE_LAYOUT');
 const result=Buffer.concat([source.subarray(0,958),source.subarray(1031,1082),source.subarray(958,1031),source.subarray(1082)]);
 if(createHash('sha256').update(result).digest('hex')!==fixture.prefixedSha256)throw Error('SEI_FIXTURE_OUTPUT');return result;
}
module.exports={prefixSyntheticSei};