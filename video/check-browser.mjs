import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try {
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:5173/downloads/Fit-in-Deutsch-Kapitel.txt');
 await page.setContent('<html lang="de"><meta charset="utf-8"><title>Videoprüfung</title><video id="tour" controls muted preload="auto" src="/downloads/Fit-in-Deutsch-Erklaervideo.mp4" style="width:100%"></video></html>');
 await page.waitForFunction(()=>document.querySelector('video').readyState>=2,{},{timeout:30000});
 const info=await page.evaluate(()=>{const v=document.querySelector('video');return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,error:v.error?.message||null};});
 if(info.width!==1920||info.height!==1080||info.duration<660||info.error)throw Error(JSON.stringify(info));
 for(const seconds of [1,145,385,558,630,653]){
  await page.evaluate(seconds=>new Promise((resolve,reject)=>{const v=document.querySelector('video');v.addEventListener('seeked',resolve,{once:true});v.addEventListener('error',()=>reject(v.error?.message),{once:true});v.currentTime=seconds;}),seconds);
  await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
 }
 await page.locator('video').evaluate(v=>v.play());await page.waitForTimeout(600);
 const playing=await page.locator('video').evaluate(v=>({time:v.currentTime,paused:v.paused,error:v.error?.message||null}));
 if(playing.paused||playing.time<=653||playing.error)throw Error(JSON.stringify(playing));
 console.log('PASS: browser loads H.264/AAC video, seeks through six chapters, and plays normally.',info);
}finally{await browser.close();}
