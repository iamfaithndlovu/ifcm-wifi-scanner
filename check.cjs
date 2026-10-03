const {chromium} = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage();const errors=[];const requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>requests.push(r.url()));
 for(const [width,height] of [[390,844],[360,640],[320,568],[768,1024],[1440,900]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4173');await page.waitForTimeout(900);
  if(!await page.locator('.surprise').evaluate(e=>e.classList.contains('revealed')))throw Error('Reveal failed');
  const sizes=await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
  if(sizes.width>width)throw Error('Horizontal overflow');
  let prior=await page.locator('#quote').textContent();for(let i=0;i<60;i++){await page.locator('#another').click();const next=await page.locator('#quote').textContent();if(prior===next)throw Error('Repeated quote');prior=next}
  console.log(JSON.stringify({viewport:[width,height],document:sizes,clicks:60}));
  if(width===390)await page.screenshot({path:'tmp/mobile-preview.png',fullPage:true});
 }
 await page.emulateMedia({reducedMotion:'reduce'});if(await page.locator('body').evaluate(e=>getComputedStyle(e,'::before').animationName)!=='none')throw Error('Reduced motion failed');
 if(await page.locator('input,form,iframe').count())throw Error('Unexpected collection surface');
 if(requests.some(u=>!u.startsWith('http://127.0.0.1:4173/')))throw Error('External request');
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: no errors, no external requests, 300 non-repeating changes, reduced motion.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
