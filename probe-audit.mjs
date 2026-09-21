import { chromium } from 'playwright';

// luminance + contrast helper (WCAG 2.x)
function lum(r,g,b){const f=c=>{c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);}
function contrast(a,b){const A=lum(...a),B=lum(...b);const hi=Math.max(A,B),lo=Math.min(A,B);return (hi+0.05)/(lo+0.05);}
function parse(css){
  const m=css.match(/rgba?\(([^)]+)\)/); if(!m) return null;
  const parts=m[1].split(',').map(s=>parseFloat(s.trim()));
  const [r,g,b]=parts; const a=parts[3]!==undefined?parts[3]:1;
  const bg=Math.round(255);
  const rr=Math.round(r*a+bg*(1-a));
  const gg=Math.round(g*a+bg*(1-a));
  const bb=Math.round(b*a+bg*(1-a));
  return [rr,gg,bb];
}

const base='http://localhost:3000';
const urls=['/ar','/en','/ar/about','/en/about','/ar/services','/ar/services/filler','/en/before-after','/ar/appointment','/en/contact'];
const browser = await chromium.launch();
const results=[];

const reqStatus = await fetch(base+'/ar/privacy',{method:'GET'});
const reqStatus2 = await fetch(base+'/en/terms',{method:'GET'});
console.log('FETCH /ar/privacy ->', reqStatus.status);
console.log('FETCH /en/terms ->', reqStatus2.status);

for (const p of urls){
  const page=await browser.newPage();
  const consoleMsgs=[], failed=[], images=[];
  page.on('console',m=>{if(m.type()==='error'||m.type()==='warning') consoleMsgs.push(m.type()+':'+m.text());});
  page.on('requestfailed',r=>failed.push(r.url()));
  page.on('response',r=>{if(r.status()>=400) failed.push(r.status()+' '+r.url());});
  await page.goto(base+p,{waitUntil:'networkidle',timeout:30000}).catch(e=>{consoleMsgs.push('NAVFAIL:'+e.message);});
  const meta=await page.evaluate(()=>{
    const overflow=document.documentElement.scrollWidth>document.documentElement.clientWidth;
    const imgs=[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src);
    const fg=document.querySelector('footer');
    let footerBg=null, footerFg=null, footerContrast=null;
    if(fg){
      footerBg=getComputedStyle(fg).backgroundColor;
      const para=fg.querySelector('p');
      if(para) footerFg=getComputedStyle(para).color;
    }
    return {lang:document.documentElement.lang,dir:document.documentElement.dir,overflow,missingImgs:imgs,footerBg,footerFg};
  });
  results.push({p,...meta,consoleMsgs,failed});
  await page.close();
}

for(const r of results){
  console.log('\n=== '+r.p+' ===');
  console.log(' lang='+r.lang+' dir='+r.dir+' overflow='+r.overflow);
  if(r.missingImgs.length) console.log(' MISSING_IMGS: '+r.missingImgs.join(', '));
  console.log(' footer bg='+r.footerBg+' para fg='+r.footerFg);
  if(r.footerBg&&r.footerFg){
    const bg=parse(r.footerBg), fg=parse(r.footerFg);
    if(bg&&fg) { const c=contrast(fg,bg); console.log(' FOOTER CONTRAST = '+c.toFixed(2)); }
  }
  (r.consoleMsgs||[]).forEach(m=>console.log(' CONSOLE: '+m));
  (r.failed||[]).forEach(f=>console.log(' FAILED: '+f));
}
await browser.close();