import {test,expect} from '@playwright/test';
import {topics} from '../src/data.js';
import {testModes,createTest} from '../src/testing.js';
async function setup(page,mode,count=5,seconds=60){
 await page.goto('/');await page.getByRole('button',{name:'Los geht’s',exact:true}).click();await page.getByRole('button',{name:'Test starten',exact:true}).first().click();
 await expect(page.getByRole('radio')).toHaveCount(9);await page.getByRole('radio',{name:testModes.find(m=>m.id===mode).title,exact:false}).check();await page.getByRole('radio',{name:`${count} Wörter`,exact:true}).check();await page.getByRole('radio',{name:`${seconds} Sekunden`,exact:true}).check();
}
async function clock(page){const time=new Date('2026-10-25T10:00:00Z');await page.clock.install({time});await page.clock.pauseAt(new Date('2026-10-25T10:00:01Z'));}
async function respond(page,q){
 if(q.pictureOptions){const i=q.pictureOptions.findIndex(x=>x.label===q.correct);await page.getByRole('button',{name:`Bild ${i+1}`,exact:true}).click();}
 else if(q.missingPositions){for(let i=0;i<q.missingPositions.length;i++)await page.getByRole('textbox',{name:`Lücke ${i+1}`,exact:true}).fill(Array.from(q.correct)[i]);}
 else if(q.letters){for(const letter of Array.from(q.correct)){const escape=letter.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');await page.locator('.letter-bank button:not(:disabled)').filter({hasText:new RegExp(`^${escape}$`)}).first().click();}}
 else await page.getByRole('textbox').fill(q.correct);
 await page.getByRole('button',{name:/^(Antwort abgeben|Test abschließen)$/}).click();
}
for(const mode of testModes)test(`timed ${mode.id}: five random words and one final score`,async({page})=>{
 await clock(page);await page.addInitScript(()=>{Math.random=()=>0;});await setup(page,mode.id);await expect(page.getByRole('timer')).toHaveCount(0);await page.getByRole('button',{name:'Jetzt starten'}).click();
 const session=createTest(topics[0],mode.id,5,60,()=>0);await expect(page.getByRole('timer')).toHaveText('01:00');
 if(mode.id==='listen'){await expect(page.locator('.test-picture-options button')).toHaveCount(4);await expect(page.locator('.exercise-options')).toHaveCount(0);}
 for(const q of session.questions)await respond(page,q);
 await expect(page.getByRole('heading',{name:'Dein Testergebnis'})).toBeVisible();await expect(page.locator('.test-results')).toContainText('5 von 5 Wörtern richtig');await expect(page.locator('.result-row')).toHaveCount(5);
 const p=await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')));expect(p.testHistory).toHaveLength(1);expect(p.xp).toBe(15);expect(p.learned).toHaveLength(5);
});
for(const count of [5,10])for(const seconds of [60,90,120])test(`configuration ${count} words / ${seconds}s starts only on explicit start and expires`,async({page})=>{
 await clock(page);await setup(page,'write',count,seconds);await page.clock.fastForward(240_000);await expect(page.getByRole('timer')).toHaveCount(0);await page.getByRole('button',{name:'Jetzt starten'}).click();await expect(page.getByRole('timer')).toHaveText(seconds===60?'01:00':seconds===90?'01:30':'02:00');
 await page.clock.fastForward((seconds-1)*1000);await expect(page.getByRole('timer')).toHaveText('00:01');await page.clock.fastForward(1000);await expect(page.getByRole('heading',{name:'Die Zeit ist um.'})).toBeVisible();await expect(page.locator('.result-row.unanswered')).toHaveCount(count);
 const p=await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')));expect(p.testHistory).toHaveLength(1);expect(p.testHistory[0].seconds).toBe(seconds);expect(new Set(p.testHistory[0].items.map(x=>x.question.word)).size).toBe(count);expect(p.xp).toBe(0);
 await page.clock.fastForward(120_000);expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')).testHistory.length)).toBe(1);
});
test('clock continues between answers; wrong and skipped responses remain distinct',async({page})=>{
 await clock(page);await page.addInitScript(()=>{Math.random=()=>0;});await setup(page,'write');await page.getByRole('button',{name:'Jetzt starten'}).click();
 const session=createTest(topics[0],'write',5,60,()=>0);await page.clock.fastForward(10_000);await respond(page,session.questions[0]);await expect(page.getByRole('timer')).toHaveText('00:50');await page.getByRole('textbox').fill('falsch');await page.getByRole('button',{name:'Antwort abgeben',exact:true}).click();await page.getByRole('button',{name:'Überspringen',exact:true}).click();await page.clock.fastForward(10_000);await expect(page.getByRole('timer')).toHaveText('00:40');await page.clock.fastForward(40_000);
 const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')).testHistory[0]);expect([result.correctCount,result.wrongCount,result.skippedCount,result.unansweredCount]).toEqual([1,1,1,2]);await expect(page.locator('.result-row')).toHaveCount(5);await page.reload();await page.getByRole('button',{name:'Fehler wiederholen',exact:true}).click();await expect(page.locator('.review-panel')).toContainText('1 Aufgabe');
});
test('test abortion stops the old timer and does not create a result',async({page})=>{
 await clock(page);await setup(page,'missing',10,120);await page.getByRole('button',{name:'Jetzt starten'}).click();await page.getByRole('button',{name:'Test abbrechen'}).click();await page.clock.fastForward(180_000);await expect(page.locator('.word-tile')).toHaveCount(20);expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')).testHistory.length)).toBe(0);
});
test('hearing uses German speech without exposing the answer in text',async({page})=>{
 await page.addInitScript(()=>{Math.random=()=>0;window.spoken=[];Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){window.spoken.push({text:u.text,lang:u.lang});}},configurable:true});});await setup(page,'listen');await page.getByRole('button',{name:'Jetzt starten'}).click();await page.getByRole('button',{name:'Wort anhören',exact:true}).click();const q=createTest(topics[0],'listen',5,60,()=>0).questions[0];expect(await page.evaluate(()=>window.spoken)).toEqual([{text:q.speak,lang:'de-DE'}]);await expect(page.locator('.timed-test')).not.toContainText(q.word);
});
test('narrow mobile configuration and letter test fit without horizontal overflow',async({page})=>{
 await page.setViewportSize({width:360,height:800});await page.goto('/');await page.getByRole('button',{name:'Los geht’s',exact:true}).click();await expect(page.locator('.word-tile')).toHaveCount(20);await page.getByRole('button',{name:'Test starten',exact:true}).first().click();await page.getByRole('radio',{name:'Buchstabensalat',exact:false}).check();await page.getByRole('radio',{name:'10 Wörter',exact:true}).check();await page.getByRole('radio',{name:'120 Sekunden',exact:true}).check();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'/tmp/fit-test-setup-mobile.png',fullPage:true,animations:'disabled'});await page.getByRole('button',{name:'Jetzt starten'}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('.letter-bank button')).not.toHaveCount(0);
});
