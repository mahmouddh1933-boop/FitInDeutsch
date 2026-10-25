import {test,expect} from '@playwright/test';
import {topics} from '../src/data.js';
test('twenty-word study is free, manual and retains progress',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.getByRole('button',{name:'Los geht’s'}).click();await expect(page.locator('.word-tile')).toHaveCount(20);await expect(page.getByText('Lektion',{exact:false})).toHaveCount(0);await expect(page.getByRole('timer')).toHaveCount(0);await page.getByRole('button',{name:'Als gelernt markieren',exact:true}).click();await expect(page.locator('.study-card')).toContainText('Als gelernt markiert');await page.reload();await page.getByRole('button',{name:'Mein Fortschritt',exact:true}).click();await expect(page.locator('.word-chips button')).toHaveCount(1);expect(errors).toEqual([]);
});
test('search, learning path, stories and twenty-word learning',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Meine Themen',exact:true}).click();await page.getByRole('textbox',{name:'Thema oder Wort suchen'}).fill('Apfel');await expect(page.locator('.topic-card')).toHaveCount(2);await expect(page.locator('.topics-grid')).toContainText('Buntes Obst');
 await page.getByRole('textbox').fill('unbekannt');await expect(page.getByText('Dieses Wort ist noch nicht dabei.')).toBeVisible();
 await page.getByRole('button',{name:'Mein Lernweg',exact:true}).click();await expect(page.locator('.path-card')).toHaveCount(20);await page.locator('.path-card').first().click();await expect(page.locator('.word-tile')).toHaveCount(20);
 await page.getByRole('button',{name:'Lesegeschichten',exact:true}).click();await page.locator('.reading-story-card').first().click();const question=page.locator('.story-question').filter({hasText:'Was liest Mila?'});await question.getByRole('radio',{name:'eine Lampe',exact:true}).check();await question.getByRole('button',{name:'Antwort prüfen'}).click();await expect(question.getByRole('status')).toContainText('Lies noch einmal');await question.getByRole('radio',{name:'ein Buch',exact:true}).check();await question.getByRole('button',{name:'Antwort prüfen'}).click();await expect(question.getByRole('status')).toContainText('Richtig!');
});
test('mobile layout and navigation',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.screenshot({path:'/tmp/fit-mobile.png',fullPage:true});await page.getByRole('button',{name:'Menü öffnen'}).click();await page.getByRole('button',{name:'Meine Erfolge',exact:true}).click();await expect(page.getByRole('heading',{name:'Darauf kannst du stolz sein!'})).toBeVisible();
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');await page.screenshot({path:'/tmp/fit-desktop.png',fullPage:true});
});

test('German speech is requested and a speech failure gives actionable feedback',async({page})=>{
 await page.addInitScript(()=>{window.spoken=[];Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){window.spoken.push({text:u.text,lang:u.lang});u.onerror?.();}},configurable:true});});
 await page.goto('/');await page.getByRole('button',{name:'Los geht’s'}).click();await page.locator('.study-card').getByRole('button',{name:'Wort anhören',exact:true}).click();await expect(page.locator('.sound-status')).toContainText('Vorlesen ist gerade nicht verfügbar');expect(await page.evaluate(()=>window.spoken)).toEqual([{text:'der Rucksack',lang:'de-DE'}]);
});
