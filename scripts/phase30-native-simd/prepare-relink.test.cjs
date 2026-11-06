'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {deriveRelink}=require('./prepare-relink.cjs');
const source=()=>execFileSync('git',['show','HEAD:scripts/phase30-minimal-ffmpeg/link-provenance.sh']);
test('derives only two fixed candidate assertions and stricter recompile guard',()=>{const before=source().toString(),r=deriveRelink(Buffer.from(before)).toString();const expected=before.replace('2af1963c499a3005ad4d6037794b9e4bc383c7a1c0f545267297195d68f9ccee','031ffb3a5ccd03437daf983c121b9f01d3974ed8e295057faa912925f84db5f3').replace('64c3340d0325afa37fff5015bfacf162095103dc2cbd319d799d70cc9633d24e','36e837d351e47d525dd6438f0141c2c7dc4bc7d49e27e3836acff137a601b9b3').replace("'(^|[[:space:]])-c([[:space:]]|$)'","'(^|[[:space:]])(-c|([^[:space:]]*/)?(nasm|yasm))([[:space:]]|$)'");assert.equal(r,expected);assert.ok(r.includes('cmp --silent'));assert.ok(r.includes('timeout --kill-after=5s 60'));});
test('rejects unknown relink recipe',()=>assert.throws(()=>deriveRelink(Buffer.from('unreviewed')),/RELINK_IDENTITY/));
test('rejects newline-transformed relink recipe',()=>assert.throws(()=>deriveRelink(Buffer.from(source().toString().replaceAll('\n','\r\n'))),/RELINK_IDENTITY/));
test('rejects already derived relink',()=>assert.throws(()=>deriveRelink(deriveRelink(source())),/RELINK_IDENTITY/));

test('actual GNU grep rejects C and every absolute or relative NASM/YASM invocation',()=>{
 const {spawnSync}=require('node:child_process');const grep=process.platform==='win32'?'C:/Program Files/Git/usr/bin/grep.exe':'grep';const text=deriveRelink(source()).toString(),pattern=text.match(/if grep -Eq '([^']+)'/)[1];
 for(const command of ['gcc -c src/file.c','/build/nasm-source/nasm -felf64 file.asm','nasm -felf64 file.asm','/usr/bin/nasm -felf64 file.asm','./tools/yasm file.asm']){const r=spawnSync(grep,['-Eq',pattern],{input:command+'\n',timeout:2000});assert.equal(r.error,undefined);assert.equal(r.status,0,command);}
 const link=spawnSync(grep,['-Eq',pattern],{input:'gcc -Wl,-t,-Map=/evidence/ffmpeg.link-map.txt -o ffmpeg_g fftools/ffmpeg.o\n',timeout:2000});assert.equal(link.error,undefined);assert.equal(link.status,1);
});
