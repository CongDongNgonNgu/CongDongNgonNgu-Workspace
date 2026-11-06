'use strict';
// In-memory research fixture construction only. Never runs a processor or reads files.
const {createHash}=require('node:crypto');
const SOURCE_SHA='2ef27e95df445401f512f2e6f07674ae155f8f14b866001100889fbf0839019f';
const CASES=Object.freeze(['lc_positive','explicit_absent_positive','first_sbr','first_crc','truncated_fil','before_channel','late_sbr','explicit_absent_late']);
const MAX_BYTES=4096;
const SILENCE=Buffer.from('211004608c1c','hex');
// This exact existing CPE has max_sfb=0, both gains140, no pulse/TNS/gain-control.
// Its parsed ID_END occupies bits43..45; bits46..47 are zero padding. Not a scan.
const CORE=[...SILENCE].map(x=>x.toString(2).padStart(8,'0')).join('').slice(0,43);
const CONTAINERS=Object.freeze({moov:0,trak:0,mdia:0,minf:0,stbl:0,stsd:8,mp4a:28,avc1:78});
const fail=()=>{throw Error('AAC_FIXTURE_STRUCTURE');};
function parse(bytes,start,end,depth,counter){
 if(depth>8)fail();const result=[];
 for(let p=start;p<end;){
  if(++counter.count>128||p+8>end)fail();
  const size=bytes.readUInt32BE(p),type=bytes.toString('latin1',p+4,p+8);
  if(size<8||p+size>end)fail();
  const node={type,start:p,end:p+size,data:Buffer.from(bytes.subarray(p+8,p+size))};
  if(Object.hasOwn(CONTAINERS,type)){
   const skip=CONTAINERS[type];if(p+8+skip>node.end)fail();
   node.prefix=Buffer.from(bytes.subarray(p+8,p+8+skip));
   node.children=parse(bytes,p+8+skip,node.end,depth+1,counter);
  }
  result.push(node);p+=size;
 }
 return result;
}
function flatten(nodes){return nodes.flatMap(n=>[n,...(n.children?flatten(n.children):[])]);}
function one(nodes,type){const matches=nodes.filter(n=>n.type===type);if(matches.length!==1)fail();return matches[0];}
function encode(node){
 const data=node.children?Buffer.concat([node.prefix,...node.children.map(encode)]):node.data;
 if(data.length+8>MAX_BYTES)fail();const head=Buffer.alloc(8);head.writeUInt32BE(data.length+8);head.write(node.type,4,'latin1');return Buffer.concat([head,data]);
}
function descriptor(tag,data){
 if(data.length>1024)fail();const header=Buffer.from([tag,0x80|(data.length>>>21),0x80|((data.length>>>14)&127),0x80|((data.length>>>7)&127),data.length&127]);return Buffer.concat([header,data]);
}
function esds(asc){
 // Preserve the exact source's ES id, flags and 13-byte decoder header/bitrates.
 const decoder=Buffer.concat([Buffer.from('401500000000007d00000009e3','hex'),descriptor(5,asc)]);
 const es=Buffer.concat([Buffer.from('000200','hex'),descriptor(4,decoder),descriptor(6,Buffer.from([2]))]);
 return Buffer.concat([Buffer.alloc(4),descriptor(3,es)]);
}
function track(bytes,node,media){
 const all=flatten(node.children),audio=all.some(n=>n.type==='mp4a'),stsz=one(all,'stsz'),stco=one(all,'stco'),stsc=one(all,'stsc');
 const count=stsz.data.readUInt32BE(8);if(stsz.data.readUInt32BE(4)!==0||count!==(audio?25:2)||stsz.data.length!==12+4*count)fail();
 const sizes=Array.from({length:count},(_,i)=>stsz.data.readUInt32BE(12+4*i));
 const chunks=stco.data.readUInt32BE(4);if(chunks!==(audio?3:2)||stco.data.length!==8+4*chunks)fail();
 const rows=stsc.data.readUInt32BE(4);if(rows<1||rows>3||stsc.data.length!==8+12*rows)fail();
 const mappings=Array.from({length:rows},(_,i)=>({first:stsc.data.readUInt32BE(8+12*i),count:stsc.data.readUInt32BE(12+12*i),description:stsc.data.readUInt32BE(16+12*i)}));
 if(mappings[0].first!==1||mappings.some((m,i)=>!m.count||m.description!==1||(i&&m.first<=mappings[i-1].first)))fail();
 let sample=0,mapping=0;const samples=[],chunkHeads=[];
 for(let i=0;i<chunks;i++){
  while(mapping+1<rows&&mappings[mapping+1].first<=i+1)mapping++;
  let p=stco.data.readUInt32BE(8+4*i);chunkHeads.push(sample);
  for(let k=0;k<mappings[mapping].count;k++){
   const size=sizes[sample];if(!size||p<media.start+8||p+size>media.end||sample>=count)fail();
   samples.push({oldOffset:p,index:sample,chunk:i,data:Buffer.from(bytes.subarray(p,p+size))});p+=size;sample++;
  }
 }
 if(sample!==count)fail();return{audio,all,stsz,stco,samples,chunkHeads};
}
function pack(bits){if(!/^[01]+$/.test(bits))fail();const padded=bits.padEnd(Math.ceil(bits.length/8)*8,'0');return Buffer.from(Array.from({length:padded.length/8},(_,i)=>Number.parseInt(padded.slice(i*8,i*8+8),2)));}
function fill(payload,count=payload.length){if(count<1||count>14||payload.length>2)fail();return'110'+count.toString(2).padStart(4,'0')+[...payload].map(x=>x.toString(2).padStart(8,'0')).join('');}
function changedSample(name){
 const payload=name==='first_crc'?Buffer.from([0xe0,0]):Buffer.from([0xd0]);
 const extension=fill(payload,name==='truncated_fil'?14:payload.length);
 return pack(name==='before_channel'?extension+CORE+'111':CORE+extension+'111');
}
function buildAacFixture(source,name){
 if(typeof name!=='string'||!CASES.includes(name))throw Error('AAC_FIXTURE_CASE');
 if(!Buffer.isBuffer(source)||source.length>MAX_BYTES)throw Error('AAC_FIXTURE_SOURCE');
 const bytes=Buffer.from(source);
 if(createHash('sha256').update(bytes).digest('hex')!==SOURCE_SHA)throw Error('AAC_FIXTURE_SOURCE');
 const top=parse(bytes,0,bytes.length,0,{count:0});
 if(top.map(n=>n.type).join(',')!=='ftyp,moov,free,mdat')fail();
 const movie=one(top,'moov'),media=one(top,'mdat'),tracks=movie.children.filter(n=>n.type==='trak').map(n=>track(bytes,n,media));
 if(tracks.length!==2)fail();const audios=tracks.filter(t=>t.audio),videos=tracks.filter(t=>!t.audio);if(audios.length!==1||videos.length!==1)fail();const audio=audios[0];
 const originalEsds=one(audio.all,'esds');
 if(!originalEsds.data.equals(esds(Buffer.from('119056e500','hex'))))fail();
 const global=tracks.flatMap(t=>t.samples).sort((a,b)=>a.oldOffset-b.oldOffset);let originalEnd=media.start+8;
 for(const sample of global){if(sample.oldOffset!==originalEnd)fail();originalEnd+=sample.data.length;}if(originalEnd!==media.end)fail();
 // Every reused six-byte source sample must match the closed, grammar-parsed core.
 for(const sample of audio.samples.slice(1))if(!sample.data.equals(SILENCE))fail();
 for(const sample of audio.samples)sample.data=Buffer.from(SILENCE);
 const explicit=name==='explicit_absent_positive'||name==='explicit_absent_late';
 originalEsds.data=esds(Buffer.from(explicit?'119056e500':'1190','hex'));
 if(!['lc_positive','explicit_absent_positive'].includes(name)){
  const index=name==='late_sbr'||name==='explicit_absent_late'?24:0;audio.samples[index].data=changedSample(name);
 }
 for(const sample of audio.samples)audio.stsz.data.writeUInt32BE(sample.data.length,12+4*sample.index);
 const mediaIndex=top.indexOf(media);let position=top.slice(0,mediaIndex).reduce((n,x)=>n+encode(x).length,0)+8;
 for(const sample of global){sample.offset=position;position+=sample.data.length;}
 for(const t of tracks)for(let i=0;i<t.chunkHeads.length;i++)t.stco.data.writeUInt32BE(t.samples[t.chunkHeads[i]].offset,8+4*i);
 media.data=Buffer.concat(global.map(s=>s.data));const result=Buffer.concat(top.map(encode));if(result.length>MAX_BYTES)fail();return result;
}
module.exports={buildAacFixture,CASES};
