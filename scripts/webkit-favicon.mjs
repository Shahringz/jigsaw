import { webkit } from 'playwright';
const site=(process.env.SITE_URL||'https://jigsawstudio.ir').replace(/\/$/,'');
const revision=process.env.EXPECTED_RELEASE;
const browser=await webkit.launch();
const check=(v,m)=>{if(!v)throw new Error(m)};
try {
  for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:820,height:1180}]) {
    const page=await browser.newPage({viewport,hasTouch:viewport.width<1000});
    for (const route of ['/','/en/','/ar/','/fa/contact/','/en/contact/','/ar/contact/','/fa/favicon-test-not-found/']) {
      const response=await page.goto(site+route+'?rev='+revision,{waitUntil:'domcontentloaded',timeout:45000});
      check(route.includes('not-found')?response.status()===404:response.ok(),route+' HTTP '+response.status());
      const result=await page.evaluate(async()=>{
        const links=[...document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"],link[rel="mask-icon"]')];
        const names=['favicon-16x16.png','favicon-32x32.png','favicon-48x48.png','favicon.svg','favicon.ico','apple-touch-icon.png','safari-pinned-tab-v2.svg'];
        const results=[];
        for(const name of names){
          const link=links.find(l=>new URL(l.href).pathname.endsWith('/'+name));
          if(!link)throw new Error('Missing declaration: '+name);
          if(name.endsWith('.ico')||name==='safari-pinned-tab-v2.svg')continue;
          const image=new Image();
          image.src=link.href;
          await Promise.race([image.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Decode timeout: '+name)),10000))]);
          const size=name==='favicon.svg'?48:name==='apple-touch-icon.png'?180:Number(name.match(/(\d+)x/)[1]);
          if(name!=='favicon.svg'&&(image.naturalWidth!==size||image.naturalHeight!==size))throw new Error('Wrong dimensions: '+name);
          const canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
          const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0,size,size);
          const pixels=ctx.getImageData(0,0,size,size).data;
          if(name!=='apple-touch-icon.png'){
            if(pixels[3]!==0||pixels[(size*size-1)*4+3]!==0)throw new Error('Background not transparent: '+name);
            let white=0,yellow=0,dark=0;
            for(let i=0;i<pixels.length;i+=4){
              const [r,g,b,a]=pixels.subarray(i,i+4);
              if(a<220)continue;
              if(r>230&&g>230&&b>230)white++;
              if(r>150&&g>100&&b<140&&r>b+55)yellow++;
              if(r<110&&g<110&&b<110)dark++;
            }
            if(!white||!yellow||!dark)throw new Error('Missing brand colours: '+name);
          }
          results.push(name);
        }
        return {revision:document.querySelector('meta[name="jigsaw-release"]')?.content,results};
      });
      check(result.revision===revision,'Stale release: '+route);
      console.log('PASS WebKit decoded icons',viewport.width,route,result.results.join(', '));
    }
    await page.close();
  }
}finally{await browser.close();}
