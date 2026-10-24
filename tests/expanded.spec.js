import {test,expect} from '@playwright/test';
import {topics} from '../src/data.js';
import {makeQuestions,modes,alphabetQuestions} from '../src/learning.js';
import {grammarQuestions,grammarTopics} from '../src/grammar.js';
async function submit(page,question){
 const panel=page.locator('.exercise-panel');
 if(question.letters){for(let n=0;n<Array.from(question.correct).length;n++){const letter=Array.from(question.correct)[n];const button=panel.locator('.letter-bank button:not(:disabled)').filter({hasText:new RegExp('^'+letter.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).first();await button.click();}}
 else if(question.options)await panel.locator('.exercise-options').getByRole('button',{name:question.correct,exact:true}).click();
 else await panel.getByRole('textbox').fill(question.correct);
 await panel.getByRole('button',{name:'Prüfen',exact:true}).click();await expect(panel.getByRole('status')).toContainText('Richtig!');
 await panel.getByRole('button',{name:/Nächste Frage|Runde abschließen/}).click();
}
for(const mode of modes){test(`word practice: ${mode.id} completes a full round`,async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Wortschatz & Übungen',exact:true}).click();
 await page.getByRole('button',{name:new RegExp(mode.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();await page.getByRole('button',{name:'Übung starten',exact:true}).click();
 for(const q of makeQuestions(topics[0],mode.id))await submit(page,q);
 await expect(page.getByRole('heading',{name:'Gut gemacht!'})).toBeVisible();await expect(page.locator('.exercise-done')).toContainText('12 von 12');
 const p=await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')));expect(p.activities[`vocab:school:${mode.id}`]).toBe(1);expect(p.learned).toHaveLength(0);
 });}
test('missing letters save mistakes, review removes only completed review questions',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Wortschatz & Übungen',exact:true}).click();await page.getByRole('button',{name:/Fehlender Buchstabe/}).click();await page.getByRole('button',{name:'Übung starten',exact:true}).click();
 await page.getByRole('textbox').fill('x');await page.getByRole('button',{name:'Prüfen',exact:true}).click();await expect(page.locator('.feedback')).toContainText('Noch nicht ganz');
 const q=makeQuestions(topics[0],'missing')[0];await submit(page,q);
 await page.reload();await page.getByRole('button',{name:'Fehler wiederholen',exact:true}).click();await expect(page.locator('.review-panel')).toContainText('1 Aufgabe');await page.locator('.review-panel').getByRole('button',{name:'Fehler wiederholen',exact:true}).click();await submit(page,q);await expect(page.getByRole('heading',{name:'Gut gemacht!'})).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fit-deutsch-progress')).mistakes.length)).toBe(0);
});
for(const [type,title]of [['lower','Groß & klein'],['missing','Buchstaben ergänzen'],['listen','Buchstaben hören']])test(`alphabet: ${type} handles umlauts and ß`,async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Deutsches Alphabet',exact:true}).click();await expect(page.locator('.alphabet-grid button')).toHaveCount(30);await page.getByRole('button',{name:'Buchstabe ß',exact:true}).click();await expect(page.locator('.letter-detail')).toContainText('Eszett');
 await page.getByRole('combobox',{name:'Deine kleine Runde'}).selectOption('4');await page.getByRole('button',{name:new RegExp(title)}).click();for(const q of alphabetQuestions(type).slice(24))await submit(page,q);await expect(page.getByRole('heading',{name:'Gut gemacht!'})).toBeVisible();
});
test('grammar explains a rule, corrects errors and persists completion',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Einfache Grammatik',exact:true}).click();await expect(page.locator('.grammar-card')).toHaveCount(12);await page.getByRole('button',{name:/Das Verb „sein“/}).click();await expect(page.locator('.grammar-detail')).toContainText('ich bin, du bist');await page.getByRole('button',{name:'Jetzt üben · 6 Fragen'}).click();
 await page.locator('.exercise-options').getByRole('button',{name:'bist',exact:true}).click();await page.getByRole('button',{name:'Prüfen',exact:true}).click();await expect(page.locator('.feedback')).toContainText('Zu ich gehört bin');
 for(const q of grammarQuestions(grammarTopics.find(t=>t.id==='sein')))await submit(page,q);
 await expect(page.locator('.exercise-done')).toContainText('5 von 6');await page.reload();await page.getByRole('button',{name:'Einfache Grammatik',exact:true}).click();await expect(page.locator('.grammar-card').filter({hasText:'Das Verb „sein“'})).toContainText('Schon geübt');
});
test('expanded word lessons preserve original progress and show new topic content',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('fit-deutsch-progress',JSON.stringify({xp:30,completed:['school'],learned:['der Rucksack','das Buch','der Stift','die Schere'],days:['2026-10-24'],daily:{'2026-10-24':1}})));
 await page.goto('/');await page.getByRole('button',{name:'Los geht’s',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('Lektion 2');await expect(page.getByRole('dialog')).toContainText('das Heft');await page.getByRole('button',{name:'Übung schließen'}).click();await page.getByRole('button',{name:'Wortschatz & Übungen',exact:true}).click();await page.getByRole('combobox',{name:'Dein Thema'}).selectOption('animals');await expect(page.locator('.word-tile')).toHaveCount(12);await expect(page.locator('.word-gallery')).toContainText('der Hund');
 await page.getByRole('combobox',{name:'Dein Thema'}).selectOption('colors');await expect(page.locator('.mode-card')).toHaveCount(6);await expect(page.locator('.word-tile')).toHaveCount(12);
});
test('expanded pages remain usable on a narrow mobile screen',async({page})=>{
 await page.setViewportSize({width:360,height:800});await page.goto('/');
 for(const name of ['Wortschatz & Übungen','Deutsches Alphabet','Einfache Grammatik','Fehler wiederholen']){await page.getByRole('button',{name:'Menü öffnen'}).click();await page.getByRole('button',{name,exact:true}).first().click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.getByRole('button',{name:'Menü öffnen'}).click();await page.getByRole('button',{name:'Deutsches Alphabet',exact:true}).click();await page.screenshot({path:'/tmp/fit-alphabet-mobile.png',fullPage:true,animations:'disabled'});
});
