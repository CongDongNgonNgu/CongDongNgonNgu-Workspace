'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {deriveRecipe}=require('./prepare-recipe.cjs');
const source=()=>execFileSync('git',['show','HEAD:scripts/phase30-minimal-ffmpeg/build.sh']);
test('derives exactly one fixed assembly configuration change',()=>{const b=source(),r=deriveRecipe(b);assert.equal(r.toString(),b.toString().replace('--disable-x86asm','--enable-x86asm --x86asmexe=/build/nasm-source/nasm'));assert.ok(b.includes(Buffer.from('--disable-x86asm')));});
test('rejects unknown source recipe',()=>assert.throws(()=>deriveRecipe(Buffer.from('unreviewed')),/RECIPE_IDENTITY/));
test('rejects newline-transformed source',()=>assert.throws(()=>deriveRecipe(Buffer.from(source().toString().replaceAll('\n','\r\n'))),/RECIPE_IDENTITY/));
test('rejects already modified candidate',()=>assert.throws(()=>deriveRecipe(deriveRecipe(source())),/RECIPE_IDENTITY/));
