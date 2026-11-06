'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {buildAacFixture,CASES}=require('./aac-fixtures.cjs');
const source=()=>Buffer.from(require('../phase30-minimal-ffmpeg/fixtures.json').withAudio.base64,'base64');
const SILENCE=Buffer.from('211004608c1c','hex');
// Independent, test-only box/table reader; does not call builder internals.
function boxes(b,start,end){const a=[];for(let p=start;p<end;){assert.ok(p+8<=end);const n=b.readUInt32BE(p);assert.ok(n>=8&&p+n<=end);a.push({type:b.toString('latin1',p+4,p+8),start:p,end:p+n,data:b.subarray(p+8,p+n)});p+=n;}return a;}
const find=(a,t)=>{const found=a.filter(x=>x.type===t);assert.equal(found.length,1,t);return found[0];};
const children=(b,x,skip=0)=>boxes(b,x.start+8+skip,x.end);
function read(b){
 const top=boxes(b,0,b.length),mdat=find(top,'mdat'),moov=find(top,'moov');const tracks=children(b,moov).filter(x=>x.type==='trak').map(trak=>{
  const mdia=find(children(b,trak),'mdia'),md=children(b,mdia),handler=find(md,'hdlr').data.toString('latin1',8,12),stbl=find(children(b,find(md,'minf')),'stbl'),table=children(b,stbl);
  const sz=find(table,'stsz').data,co=find(table,'stco').data,sc=find(table,'stsc').data,counts=sz.readUInt32BE(8),fixed=sz.readUInt32BE(4);const sizes=Array.from({length:counts},(_,i)=>fixed||sz.readUInt32BE(12+4*i));
  const offsets=Array.from({length:co.readUInt32BE(4)},(_,i)=>co.readUInt32BE(8+4*i));const mapping=Array.from({length:sc.readUInt32BE(4)},(_,i)=>({first:sc.readUInt32BE(8+12*i),count:sc.readUInt32BE(12+12*i),description:sc.readUInt32BE(16+12*i)}));
  let j=0,m=0;const samples=[];for(let i=0;i<offsets.length;i++){while(m+1<mapping.length&&mapping[m+1].first<=i+1)m++;assert.equal(mapping[m].description,1);let p=offsets[i];for(let k=0;k<mapping[m].count;k++){const size=sizes[j];assert.ok(size>0&&p>=mdat.start+8&&p+size<=mdat.end);samples.push({offset:p,size,data:b.subarray(p,p+size),index:j,chunk:i});p+=size;j++;}}assert.equal(j,counts);
  const entry=find(children(b,find(table,'stsd'),8),handler==='soun'?'mp4a':'avc1');let asc;
  if(handler==='soun'){
   const esds=find(children(b,entry,28),'esds').data;let p=4;
   const descriptor=()=>{const tag=esds[p++];let size=0,n=0,v;do{assert.ok(++n<=4);v=esds[p++];size=size*128+(v&127);}while(v&128);const end=p+size;assert.ok(end<=esds.length);return{tag,size,end};};
   const es=descriptor();assert.equal(es.tag,3);assert.equal(es.end,esds.length);p+=3;const dc=descriptor();assert.equal(dc.tag,4);p+=13;const spec=descriptor();assert.equal(spec.tag,5);asc=esds.subarray(p,spec.end);assert.equal(spec.end,dc.end);p=dc.end;const sl=descriptor();assert.equal(sl.tag,6);assert.equal(sl.size,1);assert.equal(esds[p],2);assert.equal(sl.end,es.end);
  }
  return{kind:handler,samples,offsets,mapping,sizes,asc,timing:find(table,'stts').data,trackHeader:find(children(b,trak),'tkhd').data,mediaHeader:find(md,'mdhd').data};
 });
 const global=tracks.flatMap(t=>t.samples.map(s=>({...s,kind:t.kind}))).sort((a,b)=>a.offset-b.offset);let end=mdat.start+8;for(const s of global){assert.equal(s.offset,end);end+=s.size;}assert.equal(end,mdat.end);return{tracks,global,top};
}
function bits(b){return[...b].map(x=>x.toString(2).padStart(8,'0')).join('');}
const audio=r=>r.tracks.find(t=>t.kind==='soun'),video=r=>r.tracks.find(t=>t.kind==='vide');
test('closed case set and unknown inputs fail before mutation',()=>{assert.deepEqual(CASES,['lc_positive','explicit_absent_positive','first_sbr','first_crc','truncated_fil','before_channel','late_sbr','explicit_absent_late']);for(const name of ['unknown','__proto__',null,{}])assert.throws(()=>buildAacFixture(source(),name),/AAC_FIXTURE_CASE/);for(const input of [Buffer.alloc(0),Buffer.alloc(4097),Buffer.from(source().subarray(0,-1)),new Uint8Array(source())])assert.throws(()=>buildAacFixture(input,'lc_positive'),/AAC_FIXTURE_SOURCE/);const b=source();b[0]^=1;assert.throws(()=>buildAacFixture(b,'lc_positive'),/AAC_FIXTURE_SOURCE/);});
test('LC positive has exact independently parsed tables, descriptors and original video/timing/order',()=>{
 const original=source(),snapshot=Buffer.from(original),before=read(original),result=buildAacFixture(original,'lc_positive'),after=read(result);
 assert.equal(result.length,original.length-18);assert.ok(result.length<=4096);assert.equal(audio(after).asc.toString('hex'),'1190');assert.equal(audio(after).samples.length,25);assert.equal(video(after).samples.length,2);assert.deepEqual(audio(after).sizes,Array(25).fill(6));for(const s of audio(after).samples)assert.deepEqual(s.data,SILENCE);
 assert.deepEqual(audio(after).mapping,audio(before).mapping);assert.deepEqual(video(after).mapping,video(before).mapping);assert.deepEqual(after.global.map(s=>[s.kind,s.index,s.chunk]),before.global.map(s=>[s.kind,s.index,s.chunk]));
 for(const kind of ['soun','vide']){const a=after.tracks.find(t=>t.kind===kind),b=before.tracks.find(t=>t.kind===kind);assert.deepEqual(a.timing,b.timing);assert.deepEqual(a.trackHeader,b.trackHeader);assert.deepEqual(a.mediaHeader,b.mediaHeader);}
 assert.deepEqual(video(after).samples.map(s=>s.data),video(before).samples.map(s=>s.data));assert.deepEqual(original,snapshot);assert.notDeepEqual(audio(after).offsets,audio(before).offsets);assert.notDeepEqual(video(after).offsets,video(before).offsets);
 for(const name of ['ftyp','free'])assert.deepEqual(find(after.top,name).data,find(before.top,name).data);
});
test('explicit absent positive retains five-byte ASC with otherwise matching silence payloads',()=>{const out=buildAacFixture(source(),'explicit_absent_positive'),r=read(out);assert.equal(out.length,source().length-15);assert.equal(audio(r).asc.toString('hex'),'119056e500');for(const s of audio(r).samples)assert.deepEqual(s.data,SILENCE);});
for(const name of ['first_sbr','first_crc','truncated_fil','before_channel','late_sbr','explicit_absent_late'])test('bounded '+name+' changes only the selected audio sample with independently framed FIL',()=>{
 const input=source(),snapshot=Buffer.from(input),out=buildAacFixture(input,name),r=read(out),positive=read(buildAacFixture(input,name==='explicit_absent_late'?'explicit_absent_positive':'lc_positive'));const selected=name==='late_sbr'||name==='explicit_absent_late'?24:0;
 assert.equal(audio(r).asc.toString('hex'),name==='explicit_absent_late'?'119056e500':'1190');assert.equal(audio(r).samples.length,25);assert.deepEqual(video(r).samples.map(s=>s.data),video(positive).samples.map(s=>s.data));
 for(let i=0;i<25;i++)if(i!==selected)assert.deepEqual(audio(r).samples[i].data,SILENCE);
 const payload=bits(audio(r).samples[selected].data),prefix=bits(SILENCE).slice(0,43),at=name==='before_channel'?0:43;
 assert.equal(payload.slice(at,at+3),'110');assert.equal(parseInt(payload.slice(at+3,at+7),2),name==='truncated_fil'?14:name==='first_crc'?2:1);assert.equal(payload.slice(at+7,at+11),name==='first_crc'?'1110':'1101');
 if(name!=='before_channel')assert.equal(payload.slice(0,43),prefix);else assert.equal(payload.slice(15,58),prefix);
 const end=name==='before_channel'?58:name==='first_crc'?66:58;assert.equal(payload.slice(end,end+3),'111');assert.ok(/^0*$/.test(payload.slice(end+3)));assert.deepEqual(input,snapshot);assert.ok(out.length<=4096);assert.notDeepEqual(audio(r).samples[selected].data,SILENCE);
});
test('deterministic rebuilds and source binding reject transformed bytes',()=>{for(const name of CASES){const a=buildAacFixture(source(),name),b=buildAacFixture(source(),name);assert.deepEqual(a,b);assert.throws(()=>buildAacFixture(a,name),/AAC_FIXTURE_SOURCE/);assert.equal(createHash('sha256').update(a).digest('hex'),createHash('sha256').update(b).digest('hex'));}});

test('closed six-byte AAC core has a parsed END boundary, not an arbitrary trailing bit search',()=>{
 const raw=bits(SILENCE);let position=0;const take=n=>{const v=Number.parseInt(raw.slice(position,position+n),2);position+=n;return v;};
 assert.equal(take(3),1);assert.equal(take(4),0);assert.equal(take(1),1);assert.equal(take(1),0);assert.equal(take(2),0);assert.equal(take(1),1);assert.equal(take(6),0);assert.equal(take(1),0);assert.equal(take(2),0);
 for(let channel=0;channel<2;channel++){assert.equal(take(8),140);assert.equal(take(1),0);assert.equal(take(1),0);assert.equal(take(1),0);}
 assert.equal(position,43);assert.equal(take(3),7);assert.equal(raw.slice(position),'00');assert.equal(createHash('sha256').update(SILENCE).digest('hex'),'8a487dc722403a9dffef435b459f5afa999401a7623878ad7ab41eeb8ea0609b');
});
test('returned buffers do not alias source or another case',()=>{const input=source(),snapshot=Buffer.from(input),a=buildAacFixture(input,'lc_positive'),b=buildAacFixture(input,'lc_positive');a.fill(0);assert.deepEqual(input,snapshot);assert.notDeepEqual(a,b);assert.deepEqual(b,buildAacFixture(input,'lc_positive'));});
