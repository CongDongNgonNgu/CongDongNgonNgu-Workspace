'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {annotation}=require('./report-failure.cjs');
test('escapes workflow command delimiters and removes control bytes',()=>{assert.equal(annotation('stage.txt','bad%\nnext\r\x00'),'::error title=FFmpeg experiment stage.txt::bad%25%0Anext%0D');});
test('retains a bounded tail instead of unbounded logs',()=>{assert.equal(annotation('build.log','x'.repeat(5000)).split('::').pop().length,2000);});