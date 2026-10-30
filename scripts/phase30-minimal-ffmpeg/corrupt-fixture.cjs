'use strict';
// Mutation of one exact owned synthetic fixture, never a media-validation API.
const {createHash}=require('node:crypto'),fixture=require('./fixtures.json').videoOnly;
function corruptFixture(source){
 if(!Buffer.isBuffer(source)||createHash('sha256').update(source).digest('hex')!==fixture.sha256)throw Error('OWNED_FIXTURE_REQUIRED');
 const bytes=Buffer.from(source);let offset=0,changedSlices=0;
 while(offset+8<=bytes.length){
  const size=bytes.readUInt32BE(offset),end=offset+size;if(size<8||end>bytes.length)throw Error('FIXTURE_STRUCTURE');
  if(bytes.toString('ascii',offset+4,offset+8)==='mdat'){
   let position=offset+8;
   while(position<end){if(position+4>end)throw Error('FIXTURE_NAL');const length=bytes.readUInt32BE(position);position+=4;if(length<1||position+length>end)throw Error('FIXTURE_NAL');const type=bytes[position]&31;if((type===1||type===5)&&length>8){bytes.fill(0x55,position+8,position+length);changedSlices++;}position+=length;}
  }
  offset=end;
 }
 if(offset!==bytes.length||changedSlices<1)throw Error('FIXTURE_STRUCTURE');return {bytes,changedSlices};
}
module.exports={corruptFixture};