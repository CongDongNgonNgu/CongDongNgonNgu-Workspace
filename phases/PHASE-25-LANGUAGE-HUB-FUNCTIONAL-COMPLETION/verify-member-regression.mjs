import assert from 'node:assert/strict';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
// Reuse the accepted Phase24 harness; isolate notification refresh traffic from locale domain-request assertions.
const frontend=resolve(process.env.FRONTEND_ROOT||'../CongDongNgonNgu-Front-End-Web');
const output=resolve(frontend,'artifacts/phase25-member-regression');
await mkdir(output,{recursive:true});
const source=await readFile(resolve(frontend,'scripts/verify-member-locale-runtime.mjs'),'utf8');
let adapted=source;
const substitutions=[
 ["from './member-locale-fixture-server.mjs'", "from '../../scripts/member-locale-fixture-server.mjs'"],
 ['fixture.requests.length', "fixture.requests.filter(r=>!r.path.includes('/notifications')).length"],
 ['const authenticatedRequests =', "await page.waitForLoadState('networkidle'); const authenticatedRequests ="],
 ['const filterRoute=page.url();', "await page.waitForLoadState('networkidle'); const filterRoute=page.url();"],
 ["if (opened) await page.keyboard.press('Escape');", "if (opened) await page.keyboard.press('Escape'); await page.waitForLoadState('networkidle');"]
];
const changes=[];
for(const [before,after] of substitutions){
 const count=adapted.split(before).length-1;assert.ok(count>0,'Missing inherited harness marker: '+before);
 adapted=adapted.replaceAll(before,after);changes.push({before,after,count});
}
await writeFile(resolve(output,'harness-adaptation.json'),JSON.stringify({source:'scripts/verify-member-locale-runtime.mjs',sourceSha256:createHash('sha256').update(source).digest('hex'),reason:'Unrelated notification refresh raced total request count. Domain auth/profile/language/exchange requests still asserted unchanged after settled locale switching.',changes},null,2));
const temporary=resolve(output,'phase25-member-harness.mjs');
await writeFile(temporary,adapted);
process.env.MEMBER_LOCALE_ARTIFACT_DIR=output;
process.env.MEMBER_LOCALE_TARGET_ORIGIN='https://cong-dong-ngon-ngu-sigma.vercel.app';
await import(pathToFileURL(temporary));
