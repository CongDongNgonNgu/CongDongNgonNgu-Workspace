'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {corruptFixture}=require('./corrupt-fixture.cjs');
const fixtures=require('./fixtures.json');
for(const name of ['videoOnly'])test('corrupts slices in owned '+name+' without mutating source',()=>{
 const original=Buffer.from(fixtures[name].base64,'base64'),snapshot=Buffer.from(original);
 const result=corruptFixture(original);
 assert.ok(result.changedSlices>0);assert.equal(result.bytes.length,original.length);assert.deepEqual(original,snapshot);
 const mdat=original.indexOf(Buffer.from('mdat'));assert.ok(mdat>4);assert.deepEqual(result.bytes.subarray(0,mdat+4),original.subarray(0,mdat+4));assert.notDeepEqual(result.bytes,original);
});
test('rejects unknown or previously mutated sources',()=>{assert.throws(()=>corruptFixture(Buffer.alloc(32)),/OWNED_FIXTURE_REQUIRED/);const source=Buffer.from(fixtures.videoOnly.base64,'base64');source[source.length-1]^=1;assert.throws(()=>corruptFixture(source),/OWNED_FIXTURE_REQUIRED/);});
test('refuses the interleaved audio fixture',()=>assert.throws(()=>corruptFixture(Buffer.from(fixtures.withAudio.base64,'base64')),/OWNED_FIXTURE_REQUIRED/));

test('preserves every byte outside independently inspected slice payloads',()=>{const source=Buffer.from(fixtures.videoOnly.base64,'base64'),result=corruptFixture(source);assert.equal(result.changedSlices,2);for(let index=0;index<source.length;index++){const mutated=(index>=862&&index<=922)||(index>=935&&index<=949);assert.equal(result.bytes[index],mutated?0x55:source[index]);}});