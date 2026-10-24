import {test,expect} from '@playwright/test';
import {topics} from '../src/data.js';
test('complete a lesson, correct errors and restore saved progress',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{name:'Hallo, schön, dass du da bist!'})).toBeVisible();
 await page.getByRole('button',{name:'Los geht’s'}).click();
 const dialog=page.getByRole('dialog');
 for(let i=0;i<4;i++){await expect(dialog.getByRole('button',{name:topics[0].words[i][0],exact:true})).toBeVisible();await dialog.getByRole('button',{name:'Weiter',exact:true}).click();}
 await dialog.getByRole('button',{name:'Bild 1: Buch',exact:true}).click();await dialog.getByRole('button',{name:'Prüfen'}).click();await expect(dialog.locator('.feedback')).toContainText('Schau noch einmal');
 for(let stage=0;stage<2;stage++)for(const [,picture]of topics[0].words){await dialog.getByRole('button',{name:new RegExp(`Bild [1-4]: ${picture}$`)}).click();await dialog.getByRole('button',{name:'Prüfen'}).click();await expect(dialog.locator('.feedback')).toContainText('Genau richtig');await dialog.getByRole('button',{name:'Weiter',exact:true}).click();}
 // An incorrect sentence must be repairable.
 for(const w of ['Buch.','ein','lese','Ich'])await dialog.locator('.sentence-options').getByRole('button',{name:w,exact:true}).click();
 await dialog.getByRole('button',{name:'Prüfen'}).click();await expect(dialog.locator('.feedback')).toContainText('Fast!');
 for(const w of ['Buch.','ein','lese','Ich'])await dialog.locator('.sentence-slots').getByRole('button',{name:w,exact:true}).click();
 for(const w of topics[0].sentence)await dialog.locator('.sentence-options').getByRole('button',{name:w,exact:true}).click();
 await dialog.getByRole('button',{name:'Prüfen'}).click();await dialog.getByRole('button',{name:'Übung abschließen'}).click();await expect(dialog).toContainText('+30 Lernpunkte');
 await dialog.getByRole('button',{name:'Weiter entdecken'}).click();await page.reload();
 await page.getByRole('button',{name:'Mein Fortschritt',exact:true}).click();await expect(page.locator('.stat-grid')).toContainText('4');await expect(page.locator('.word-chips button')).toHaveCount(4);
 await expect(page.locator('.goal-ring')).toContainText('1 / 2');expect(errors).toEqual([]);
});
test('search, learning path, stories and keyboard dialog dismissal',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Meine Themen',exact:true}).click();await page.getByRole('textbox',{name:'Thema oder Wort suchen'}).fill('Apfel');await expect(page.locator('.topic-card')).toHaveCount(1);
 await page.getByRole('textbox').fill('unbekannt');await expect(page.getByText('Dieses Wort ist noch nicht dabei.')).toBeVisible();
 await page.getByRole('button',{name:'Mein Lernweg',exact:true}).click();await expect(page.locator('.path-card')).toHaveCount(6);await page.locator('.path-card').first().click();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
 await page.getByRole('button',{name:'Lesegeschichten',exact:true}).click();const story=page.locator('.story-card').first();await story.getByRole('button',{name:'eine Lampe',exact:true}).click();await expect(story.getByRole('status')).toContainText('Lies noch einmal');await story.getByRole('button',{name:'ein Buch',exact:true}).click();await expect(story.getByRole('status')).toContainText('Genau richtig');
});
test('mobile layout and navigation',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.screenshot({path:'/tmp/fit-mobile.png',fullPage:true});await page.getByRole('button',{name:'Menü öffnen'}).click();await page.getByRole('button',{name:'Meine Erfolge',exact:true}).click();await expect(page.getByRole('heading',{name:'Darauf kannst du stolz sein!'})).toBeVisible();
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');await page.screenshot({path:'/tmp/fit-desktop.png',fullPage:true});
});

test('German speech is requested and a speech failure gives actionable feedback',async({page})=>{
 await page.addInitScript(()=>{window.spoken=[];Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){window.spoken.push({text:u.text,lang:u.lang});u.onerror?.();}},configurable:true});});
 await page.goto('/');await page.getByRole('button',{name:'Los geht’s'}).click();const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'der Rucksack',exact:true}).click();await expect(dialog.getByRole('status')).toContainText('Vorlesen ist gerade nicht verfügbar');expect(await page.evaluate(()=>window.spoken)).toEqual([{text:'der Rucksack',lang:'de-DE'}]);
});
