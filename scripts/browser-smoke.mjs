import { chromium, firefox, webkit } from 'playwright';
const base = (process.env.SITE_URL || 'http://127.0.0.1:4173').replace(/\/$/,'');
const revision=process.env.EXPECTED_RELEASE;
const locales=['fa','en','ar'];
const routes=['about','services','work','process','contact','network','network/sbc','blog','blog/reading-the-cover'];
const errors=[];
const check=(v,message)=>{if(!v)throw new Error(message)};
const viewports=[[320,568],[360,800],[390,844],[430,932],[768,1024],[820,1180],[1024,1366],[1366,1024],[844,390],[1024,768],[1280,800],[1440,900]];
const engines=Object.entries({chromium,firefox,webkit}).filter(([name])=>!process.env.BROWSER_ENGINE||name===process.env.BROWSER_ENGINE);
for(const [engine,launch] of engines){
  const browser=await launch.launch({headless:true});
  for(const [width,height] of viewports){
    const page=await browser.newPage({viewport:{width,height},hasTouch:width<=1100,reducedMotion:'no-preference'});
    page.setDefaultTimeout(10000);
    let jsErrors=[];
    page.on('pageerror',error=>jsErrors.push(error.message));
    for(const lang of locales){
      const home=lang==='fa'?'/':'/'+lang+'/';
      const contact='/'+lang+'/contact/';
      const urls=[home,...(lang==='fa'?['/fa/']:[]),...routes.map(route=>'/'+lang+'/'+route+'/'),'/'+lang+'/missing-page-typography-check/'];
      for(const path of urls){
        try{
          jsErrors=[];
          const response=await page.goto(base+path+(revision?'?rev='+revision:''),{waitUntil:'domcontentloaded',timeout:45000});
          const missing=path.includes('missing-page-typography-check');
          check(missing?response?.status()===404:response?.ok(),'HTTP '+response?.status());
          check(await page.locator('html').getAttribute('lang')===lang,'Wrong language');
          await page.locator('main').waitFor({state:'visible'});
          if(revision)check(await page.locator('meta[name="jigsaw-release"]').getAttribute('content')===revision,'Stale release');
          await page.evaluate(()=>document.fonts.ready);
          const digitPattern=lang==='fa'?/[۰-۹]/:lang==='ar'?/[٠-٩]/:/[0-9]/;
          const forbidden=lang==='en'?/[۰-۹٠-٩]/:lang==='fa'?/[0-9٠-٩]/:/[0-9۰-۹]/;
          for(const str of await page.locator('.locale-number,.process-index,.stage-controls button,.error-code,time').allTextContents()){
            check(digitPattern.test(str)&&!forbidden.test(str),'Wrong display numerals: '+str);
          }
          if(!missing){
            const heading=page.locator('main h1').first();
            const fontFamily=await heading.evaluate(el=>getComputedStyle(el).fontFamily);
            const explicitlyEnglish=await heading.getAttribute('lang')==='en';
            if(lang==='fa'&&!explicitlyEnglish)check(fontFamily.includes('Digi Hamishe'),'Wrong Persian heading font');
            if(lang==='ar'&&!explicitlyEnglish)check(fontFamily.includes('IBM Plex Sans Arabic'),'Wrong Arabic heading font');
          }
          if(lang==='fa'||lang==='ar'){
            const expected=lang==='fa'?'Digi Hamishe':'IBM Plex Sans Arabic';
            check(await page.evaluate(f=>document.fonts.check('700 24px "'+f+'"','۱۲۳ ابجد')&&[...document.fonts].some(x=>x.family.replace(/["']/g,'')===f&&x.status==='loaded'),expected),'Locale font not loaded: '+expected);
          }
          await page.waitForTimeout(100);
          const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
          check(overflow<=3,'Horizontal page overflow: '+overflow+'px');
          if(path===home){
            const header=page.locator('header').first();
            const mobile=header.locator('.mobile');
            if(width<1280){
              check(await mobile.isVisible(),'Mobile/tablet menu missing');
              await mobile.locator('summary').first().click();
              await mobile.locator('.dropdown').waitFor({state:'visible'});
              const box=await mobile.locator('.dropdown').boundingBox();
              check(box&&box.x>=-1&&box.x+box.width<=width+1,'Navigation clipped horizontally');
              await mobile.locator('summary').first().click();
            }else check(await header.locator('.desktop').isVisible(),'Desktop navigation missing');
          }
          if(path===contact){
            await page.locator('.connection-primary').first().click();
            await page.locator('#connection-quiz[open]').waitFor({state:'visible'});
            const quizOverflow=await page.locator('#connection-quiz').evaluate(el=>el.scrollWidth-el.clientWidth);
            check(quizOverflow<=3,'Quiz horizontal overflow: '+quizOverflow+'px');
            await page.locator('[name="topics"]').first().check();
            await page.locator('[data-quiz-step="1"] [data-quiz-next]').click();
            await page.locator('[name="firstName"]').fill('Test');
            await page.locator('[name="lastName"]').fill('Preview');
            await page.locator('[name="email"]').fill('test@example.com');
            await page.locator('[data-quiz-step="2"] [data-quiz-next]').click();
            await page.locator('[data-quiz-step="3"]').waitFor({state:'visible'});
            check(!forbidden.test(await page.locator('.quiz-counter').innerText()),'Wrong dynamic quiz numerals');
            await page.locator('[data-quiz-step="3"] [data-quiz-back]').click();
            check(await page.locator('[name="firstName"]').inputValue()==='Test','Answers lost');
            await page.locator('.quiz-close').click();
            await page.locator('#connection-quiz').waitFor({state:'hidden'});
            await page.locator('.connection-word').scrollIntoViewIfNeeded();
            await page.locator('.connection-word').evaluate(el=>el.scrollIntoView({block:'center'}));
            await page.waitForTimeout(300);
            check(await page.locator('.connection-word span').count()===6,'Wordmark missing');
          }
          check(!jsErrors.length,jsErrors.join('; '));
          console.log('PASS',engine,width+'x'+height,path);
        }catch(error){errors.push(engine+' '+width+'x'+height+' '+path+': '+error.message);}
      }
    }
    await page.close();
  }
  await browser.close();
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
