import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
// Standalone bounded TEST acceptance. Never reads sessions/secrets or writes upstream content.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.HUB_PLAYWRIGHT_MODULE || 'playwright-core');
const frontend = resolve(process.env.FRONTEND_ROOT || '../CongDongNgonNgu-Front-End-Web');
const { startFixtureServer, fixtureLanguage } = await import(pathToFileURL(resolve(frontend, 'scripts/ui-locale-fixture-server.mjs')));
const target = new URL(process.env.HUB_TARGET_ORIGIN || 'https://cong-dong-ngon-ngu-sigma.vercel.app').origin;
assert.equal(target, 'https://cong-dong-ngon-ngu-sigma.vercel.app', 'Only the established TEST deployment is accepted');
const out = resolve(process.env.HUB_ARTIFACT_DIR || resolve(frontend, 'artifacts/phase25-final'));
await mkdir(out, { recursive:true });
const fixture = await startFixtureServer(0);
const browser = await chromium.launch({headless:true,channel:'chrome'});
const report = { scope:'ACTUAL_DEPLOYED_PUBLIC_HUB_PLUS_SEPARATE_SYNTHETIC_MECHANICS', target, frontendMain:'58ea2686fb0e805eb483d9f53e10e94d139b9420', realInventoryAsserted:false, liveAuthenticatedProof:false, checks:[], accessibility:[], screenshots:[], pageErrors:[], requestErrors:[], blockedMutations:[], fixtureResidual:0, screenReader:'NOT_RUN', status:'RUNNING' };
const record=(name,detail={})=>report.checks.push({name,status:'PASS',...detail});
const text=(locale,en,vi)=>locale==='en'?en:vi;
let apiBase=null;
const scaffold={language:fixtureLanguage,seo:{canonicalPath:'/languages/vietnamese'},metrics:{learnerCount:{state:'NOT_AVAILABLE_YET',value:null},contributorCount:{state:'NOT_AVAILABLE_YET',value:null},resourceCount:{state:'NOT_AVAILABLE_YET',value:null}},sections:[],filters:{levels:[],topic:null,levelOptions:['A1','A2','B1','B2','C1','C2'],levelRequired:false,topicState:'NOT_AVAILABLE_YET'}};
let mode='normal';
async function makePage(locale,width,synthetic=false){
 const context=await browser.newContext({viewport:{width,height:1000},serviceWorkers:'block'});
 await context.addInitScript(locale=>localStorage.setItem('congdongngonngu.ui-locale.v1',locale),locale);
 await context.route('**/*',async route=>{
  const req=route.request(),url=new URL(req.url()),api=/^\/(?:api\/)?v1\//.test(url.pathname);
  const bootstrap=api&&req.method()==='POST'&&url.pathname.endsWith('/auth/refresh')&&!req.postData();
  if(!['GET','HEAD','OPTIONS'].includes(req.method())&&!bootstrap){report.blockedMutations.push({method:req.method(),path:url.pathname});return route.abort();}
  if(synthetic&&api){
   const headers={'access-control-allow-origin':target,'access-control-allow-credentials':'true','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'Content-Type,Authorization,X-CSRF-Token'};
   if(req.method()==='OPTIONS')return route.fulfill({status:204,headers,body:''});
   const respond=(data,status=200)=>route.fulfill({status,headers,contentType:'application/json',body:JSON.stringify(status<400?{success:true,data}:{success:false,error:{code:'HTTP_'+status,message:'TEST_ONLY_INTERNAL_DETAIL_DO_NOT_DISPLAY'}})});
   if(url.pathname.endsWith('/languages/vietnamese')){
    if(mode==='loading')await new Promise(done=>setTimeout(done,500));
    return mode==='hub-error'?respond(null,503):respond(fixtureLanguage);
   }
   if(url.pathname.endsWith('/languages/vietnamese/overview'))return respond(scaffold);
   if(url.pathname.endsWith('/related'))return respond({items:[],nextCursor:null});
   if(url.pathname.endsWith('/library/resources')&&(url.searchParams.get('type')==='SENTENCE'||mode==='ineligible'))return respond({items:[],nextCursor:null});
   const path=url.pathname.replace(/^\/v1\//,'/api/v1/')+url.search;
   const response=await context.request.fetch(fixture.origin+path,{method:req.method(),data:req.postData()||undefined});
   return route.fulfill({response,headers:{...response.headers(),...headers}});
  }
  if(url.origin!==target&&!api)return route.abort();
  return route.continue();
 });
 const page=await context.newPage();page.setDefaultTimeout(45000);
 page.on('pageerror',e=>report.pageErrors.push(e.message));
 page.on('requestfailed',req=>report.requestErrors.push({path:new URL(req.url()).pathname,error:req.failure()?.errorText}));
 page.on('response',response=>{const url=new URL(response.url());if(!synthetic&&url.pathname.endsWith('/languages/vietnamese/overview'))apiBase=url.origin+url.pathname.slice(0,url.pathname.indexOf('/languages/'));});
 return {page,context};
}
async function ready(page,locale){await page.getByRole('heading',{name:'Tiếng Việt',exact:true}).waitFor();await page.getByRole('navigation',{name:text(locale,'Language hub sections','Các phần của không gian ngôn ngữ')}).waitFor();}
async function geometry(page,name){const g=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));assert.ok(g.document<=g.width+1&&g.body<=g.width+1,JSON.stringify(g));record(name,g);}
async function switchLocale(page,locale){let combo=page.getByRole('combobox',{name:/Interface language|Ngôn ngữ giao diện/}).filter({visible:true}).first();let drawer=false;if(!await combo.count()){await page.getByRole('button',{name:/Open menu|Mở menu/}).first().click();drawer=true;combo=page.getByRole('dialog').getByRole('combobox',{name:/Interface language|Ngôn ngữ giao diện/});}await combo.selectOption(locale);if(drawer)await page.keyboard.press('Escape');await ready(page,locale);assert.equal(await page.locator('html').getAttribute('lang'),locale);}
async function audit(page,name){
 await page.addScriptTag({path:process.env.HUB_AXE_PATH});
 const result=await page.evaluate(async()=>{
  const r=await window.axe.run({include:['main']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
  const incomplete=r.incomplete.map(({id,nodes})=>({id,targets:nodes.map(n=>n.target)}));
  const parse=c=>{const m=c.match(/rgba?\(([^)]+)\)/);return m?m[1].split(',').map(Number):null;};
  const lum=rgb=>rgb.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((v,n,i)=>v+n*[.2126,.7152,.0722][i],0);
  const manual=[];
  for(const rule of incomplete)for(const target of rule.targets){
   const el=document.querySelector(target[0]);
   if(el?.closest('[aria-hidden="true"]')){manual.push({rule:rule.id,target,disposition:'DECORATIVE_ARIA_HIDDEN'});continue;}
   if(rule.id!=='color-contrast'||!el){manual.push({rule:rule.id,target,disposition:'UNRESOLVED'});continue;}
   const css=getComputedStyle(el),fg=parse(css.color);let bg=null,a=el,complex=false;
   while(a){const style=getComputedStyle(a),rgba=parse(style.backgroundColor);if(style.backgroundImage!=='none')complex=true;if(rgba&&(rgba.length===3||rgba[3]===1)){bg=rgba.slice(0,3);break;}if(rgba&&rgba[3]>0)complex=true;a=a.parentElement;}
   const alpha=fg?.[3]??1,blended=fg&&bg?fg.slice(0,3).map((v,i)=>v*alpha+bg[i]*(1-alpha)):null;
   const ratio=blended&&!complex?(Math.max(lum(blended),lum(bg))+.05)/(Math.min(lum(blended),lum(bg))+.05):null;
   manual.push({rule:rule.id,target,foreground:css.color,background:bg,ratio,minimum:4.5,disposition:ratio>=4.5?'CSS_COLOR_SAMPLE_PASS_NOT_PIXEL_CERTIFICATION':'UNRESOLVED'});
  }
  return {violations:r.violations.map(({id,impact,nodes})=>({id,impact,targets:nodes.map(n=>n.target)})),incomplete,manualIncomplete:manual,passes:r.passes.length};
 });
 report.accessibility.push({name,...result});assert.deepEqual(result.violations,[],name+' axe violations');assert.ok(result.manualIncomplete.every(n=>n.disposition!=='UNRESOLVED'),JSON.stringify(result.manualIncomplete));record(name+'-axe');
}
try{
 for(const locale of ['vi','en']){
  const {page,context}=await makePage(locale,1440);
  for(const width of [320,375,390,412,768,1024,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(target+'/languages/vietnamese?level=B2&topic=travel');await ready(page,locale);
   const nav=page.getByRole('navigation',{name:text(locale,'Language hub sections','Các phần của không gian ngôn ngữ')});
   assert.equal(await nav.getByRole('link').count(),10);assert.equal(await nav.getByRole('button').count(),0);
   assert.ok(!(await page.locator('main').innerText()).match(/Sắp có|Coming soon|Chưa khả dụng/));
   assert.equal(await page.getByRole('link',{name:text(locale,'Open Vocabulary in Library','Mở Từ vựng trong Thư viện')}).getAttribute('href'),'/library?language=vi&type=VOCABULARY&level=B2&topic=travel');
   await geometry(page,locale+'-'+width+'-actual-Hub');await audit(page,locale+'-'+width);
   const file=locale+'-'+width+'-viewport.png';await page.screenshot({path:resolve(out,file)});report.screenshots.push(file);
   await nav.getByRole('link').first().focus();
   for(let step=0;step<10;step++){
    if(step>0)await page.keyboard.press('Tab');
    const focused=await page.evaluate(()=>{const el=document.activeElement,r=el.getBoundingClientRect(),css=getComputedStyle(el);return {href:el.getAttribute('href'),visible:el.matches(':focus-visible'),outline:parseFloat(css.outlineWidth),left:r.left,right:r.right,width:innerWidth};});
    assert.ok(focused.visible&&focused.outline>0&&focused.left>=-1&&focused.right<=focused.width+1,JSON.stringify(focused));
    if(step===9)assert.ok(focused.href.includes('#hub-practice'));
    record(locale+'-'+width+'-actual-category-focus-'+step,focused);
   }
   await page.keyboard.press('Enter');await page.waitForFunction(()=>document.activeElement?.id==='hub-practice');
   await nav.getByRole('link',{name:text(locale,'Practice','Luyện tập'),exact:true}).press('Enter');await page.waitForFunction(()=>document.activeElement?.id==='hub-practice');
   await geometry(page,locale+'-'+width+'-deferred-keyboard');
  }
  await switchLocale(page,locale==='vi'?'en':'vi');await switchLocale(page,locale);await page.reload();await ready(page,locale);record(locale+'-actual-locale-switch-reload');
  for(const [key,label,path] of [['community',text(locale,'Community','Cộng đồng'),'/community'],['questions',text(locale,'Q&A','Hỏi đáp'),'/community/ask/question'],['exchange',text(locale,'Exchange','Trao đổi'),'/exchange']]){
   await page.goto(target+'/languages/vietnamese');await ready(page,locale);await page.getByRole('navigation',{name:text(locale,'Language hub sections','Các phần của không gian ngôn ngữ')}).getByRole('link',{name:label,exact:true}).click();
   if(key==='questions'){await page.waitForURL('**/login');assert.equal(new URL(page.url()).pathname,'/login');assert.equal(await page.evaluate(()=>history.state?.usr?.from),'/community/ask/question');}
   else if(key==='exchange')await page.locator('#discovery-auth-heading').waitFor();
   else {await page.getByRole('heading',{name:'Cùng học, cùng góp tiếng nói.'}).waitFor();assert.equal(new URL(page.url()).searchParams.get('languageCode'),'vi');await page.waitForLoadState('networkidle');}
   record(locale+'-actual-route-'+key,{targetLocaleAccepted:key==='exchange'});await page.goBack();await ready(page,locale);await page.goForward();record(locale+'-actual-history-'+key);
  }
  for(const [name,type] of [[text(locale,'Open Vocabulary in Library','Mở Từ vựng trong Thư viện'),'VOCABULARY'],[text(locale,'Open Sentences in Library','Mở Mẫu câu trong Thư viện'),'SENTENCE'],[text(locale,'Open Resources in Library','Mở Tài nguyên trong Thư viện'),null]]){
   await page.goto(target+'/languages/vietnamese?level=B2&topic=travel');await ready(page,locale);
   const responsePromise=page.waitForResponse(r=>new URL(r.url()).pathname.endsWith('/library/resources')&&r.request().method()==='GET');
   await page.getByRole('link',{name,exact:true}).click();const response=await responsePromise;assert.equal(response.status(),200);
   const u=new URL(page.url());assert.equal(u.searchParams.get('language'),'vi');assert.equal(u.searchParams.get('type'),type);assert.equal(u.searchParams.get('level'),'B2');assert.equal(u.searchParams.get('topic'),'travel');
   await page.waitForLoadState('networkidle');await geometry(page,locale+'-actual-library-'+(type||'ALL'));record(locale+'-actual-library-public-read-'+(type||'ALL'),{statusCode:200,inventoryClaim:false});await page.goBack();await ready(page,locale);
  }
  assert.ok(apiBase,'Actual public API base not observed');const paymentResponse=await context.request.get(apiBase+'/membership/catalog');assert.equal(paymentResponse.status(),200);const payment=(await paymentResponse.json()).data.payment;assert.equal(payment.available,false);assert.equal(payment.qrAvailable,false);assert.equal(payment.provider,null);report.payment={available:false,qrAvailable:false,provider:null,source:'ACTUAL_PUBLIC_TEST_GET'};
  await context.close();
 }
 for(const locale of ['vi','en']){
  const {page,context}=await makePage(locale,1440,true);
  for(const width of [320,375,390,412,768,1024,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(target+'/languages/vietnamese');await ready(page,locale);
   await page.getByRole('link',{name:text(locale,'Open Vocabulary in Library','Mở Từ vựng trong Thư viện')}).click();await page.getByRole('link',{name:/xin chào/}).first().waitFor();await geometry(page,locale+'-'+width+'-synthetic-list');
   await page.getByRole('link',{name:/xin chào/}).first().click();await page.getByRole('heading',{name:'xin chào',exact:true}).waitFor();assert.ok((await page.locator('main').innerText()).includes('CC BY 4.0'));assert.ok((await page.locator('main').innerText()).includes('Synthetic TEST fixture'));await geometry(page,locale+'-'+width+'-synthetic-source-license-detail');
   await page.goto(target+'/library?language=vi&type=SENTENCE');await page.getByRole('heading',{name:text(locale,'No matching resources','Chưa có tài nguyên phù hợp')}).waitFor();await geometry(page,locale+'-'+width+'-synthetic-empty');
  }
  mode='hub-error';await page.goto(target+'/languages/vietnamese');await page.getByRole('heading',{name:text(locale,'Could not load the language hub','Không thể tải không gian ngôn ngữ')}).waitFor();assert.ok(!(await page.locator('main').innerText()).includes('TEST_ONLY_INTERNAL'));mode='normal';await page.getByRole('button',{name:text(locale,'Try again','Thử lại')}).click();await ready(page,locale);record(locale+'-synthetic-Hub-error-retry');
  mode='loading';const navigation=page.goto(target+'/languages/vietnamese');await page.getByRole('status',{name:text(locale,'Loading the language hub','Đang tải không gian ngôn ngữ')}).waitFor();await navigation;await ready(page,locale);mode='normal';record(locale+'-synthetic-Hub-loading');
  for(const state of ['missing','denied']){await page.goto(target+'/library/'+state);await page.getByRole('heading',{name:text(locale,'Resource unavailable','Tài nguyên không khả dụng')}).waitFor();assert.ok(!(await page.locator('main').innerText()).includes('TEST_ONLY_INTERNAL'));record(locale+'-synthetic-'+state+'-detail');}
  mode='ineligible';await page.goto(target+'/library?language=vi');await page.getByRole('heading',{name:text(locale,'No matching resources','Chưa có tài nguyên phù hợp')}).waitFor();assert.equal(await page.getByRole('link',{name:/xin chào/}).count(),0);mode='normal';record(locale+'-synthetic-ineligible-exclusion');
  await context.close();
 }
 assert.deepEqual(report.pageErrors,[]);assert.deepEqual(report.requestErrors,[]);assert.deepEqual(report.blockedMutations,[]);report.status='PASS';
}catch(error){report.status='FAIL';report.failure=error.message;throw error;}finally{await browser.close();await fixture.close();await writeFile(resolve(out,'report.json'),JSON.stringify(report,null,2));}
console.log(JSON.stringify({status:report.status,checks:report.checks.length,axe:report.accessibility.length,screenshots:report.screenshots.length,pageErrors:report.pageErrors.length,requestErrors:report.requestErrors.length,fixtureResidual:0}));
