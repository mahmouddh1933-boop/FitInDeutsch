import {test} from 'node:test';
import assert from 'node:assert/strict';
import {autumnDays,autumnUnits,autumnTasks,autumnStats,shopPrices,mapPlaces} from '../src/autumn/content.js';
import {answerReady,createWordsearch,gridWord,isCorrect,secretLetters,selectSearchWord,unitStatus} from '../src/autumn/learning.js';
import {createAutumnWorksheet} from '../src/autumn/worksheets.js';
import {markLabels,plainGrammar} from '../src/grammar/helpers.js';
const task=(id,part)=>autumnUnits.find(u=>u.id===id).groups.flatMap(g=>g.tasks).find(q=>q.prompt.includes(part));

test('five ordered autumn days contain thirty substantial units and the complete range of workbook formats',()=>{
 assert.deepEqual(autumnDays.map(d=>d.day),[1,2,3,4,5]);assert.ok(autumnDays.every(d=>d.units.length===6&&d.goals.length===3));assert.equal(autumnUnits.length,30);assert.equal(autumnTasks.length,500);assert.equal(autumnStats.closed,413);assert.equal(autumnStats.open,87);assert.equal(autumnStats.searchWords,50);assert.equal(autumnStats.readings,6);
 assert.equal(new Set(autumnUnits.map(u=>u.id)).size,30);assert.equal(new Set(autumnTasks.map(q=>q.id)).size,500);
 for(const u of autumnUnits){assert.equal(u.rules.length,3);assert.ok(u.examples.length);assert.ok(u.groups.length>=3);for(const group of u.groups){for(const q of group.tasks){assert.ok(q.prompt&&q.id);if(q.letters)assert.deepEqual([...q.correct.toLocaleUpperCase('de')].sort(),[...q.letters].sort());if(q.type==='open')assert.ok(q.model);else assert.ok(q.correct&&q.explanation);if(q.options){assert.ok(q.options.includes(q.correct));assert.equal(new Set(q.options).size,q.options.length);}}for(const s of [u.intro,...u.rules,...u.examples])for(const m of s.matchAll(/\[\[([a-z]+):/g))assert.ok(markLabels[m[1]],m[1]);}}
 for(const type of ['choice','text','order','clock','riddle','open'])assert.ok(autumnTasks.some(q=>q.type===type));
});
test('all six reading texts are original complete passages, and answerable factual questions retain their supporting facts',()=>{
 const passages=autumnUnits.flatMap(u=>u.groups.filter(g=>g.kind==='reading').map(g=>g.paragraphs));for(const p of passages){assert.equal(p.length,3);assert.ok(p.join(' ').split(/\s+/).length>=100);}
 const corpus=passages.flat().join(' ');for(const fact of ['neun Jahre','Duisburg','zwölf','Viertel nach sieben','Um halb eins','reflektierenden Streifen','grünes Lesezeichen','vier Wochen'])assert.ok((corpus+' '+autumnUnits.flatMap(u=>u.rules).join(' ')).includes(fact),fact);
 assert.ok(corpus.includes('erfundene Tiergeschichte'));assert.ok(!corpus.includes('Fridolin'));assert.ok(!corpus.includes('Hallo, ich bin Amina'));
});
test('every riddle has a valid highlighted letter and yields its independently specified secret word',()=>{
 const expected=['FREUNDE','HERBST','MARKT','SICHER','LESEN'];const riddles=autumnUnits.flatMap(u=>u.groups.filter(g=>g.kind==='riddle'));assert.equal(riddles.length,5);
 riddles.forEach((group,i)=>{assert.equal(group.solution,expected[i]);assert.ok(group.tasks.every(q=>q.letter>=0&&q.letter<q.correct.length));const answers=Object.fromEntries(group.tasks.map(q=>[q.id,q.correct]));assert.equal(secretLetters(group,answers),expected[i]);assert.equal(secretLetters(group,{}),'·'.repeat(expected[i].length));});
});
test('all fifty search words actually occur forwards in reproducible grids, and invalid directions are rejected',()=>{
 assert.equal(gridWord('Mäuse, Straße'),'MAEUSE, STRASSE');
 for(const group of autumnUnits.flatMap(u=>u.groups.filter(g=>g.kind==='wordsearch'))){const p=createWordsearch(group.words,group.id);assert.deepEqual(p,createWordsearch(group.words,group.id));assert.equal(p.grid.length,13);assert.ok(p.grid.every(row=>row.length===13));for(const word of group.words){const value=gridWord(word);let occurrences=0;for(let r=0;r<13;r++)for(let c=0;c<13;c++)for(const [dy,dx]of [[0,1],[1,0]])if([...value].every((letter,i)=>p.grid[r+dy*i]?.[c+dx*i]===letter))occurrences++;assert.ok(occurrences>0,word);}
  for(const placement of p.placements){assert.equal(selectSearchWord(p.grid,placement.cells[0],placement.cells.at(-1),group.words).word,placement.word);assert.equal(selectSearchWord(p.grid,placement.cells.at(-1),placement.cells[0],group.words),null);}
  assert.equal(selectSearchWord(p.grid,[0,0],[2,2],group.words),null);assert.equal(selectSearchWord(p.grid,[0,0],[99,0],group.words),null);
 }
});
test('clock and money answers accept equivalent numeric notation but reject wrong amounts and invalid times',()=>{
 const clock=task('uhrzeiten','Uhr 2:');assert.equal(clock.correct,'9:30');for(const value of ['9:30','09:30','9.30 Uhr'])assert.equal(isCorrect(clock,value),true,value);for(const value of ['10:30','9:60','21:30','9:3',''])assert.equal(isCorrect(clock,value),false,value);
 const before=task('uhrzeiten','Viertel vor acht:');assert.equal(before.correct,'7:45');assert.ok(isCorrect(before,'07:45'));
 const editor=task('uhrzeiten','halb zehn');assert.equal(answerReady(editor,{hour:'9',minute:''}),false);assert.equal(isCorrect(editor,{hour:'9',minute:'30'}),true);assert.equal(isCorrect(editor,{hour:'10',minute:'30'}),false);
 const price=task('preise','Wie viel kostet eine Gurke');for(const value of ['0,90','0.90 €','90 Cent','0,9 Euro'])assert.ok(isCorrect(price,value),value);for(const value of ['90','0,80','0,90 irgendwas','neunzig'])assert.equal(isCorrect(price,value),false,value);
});
test('independent price calculations, article variants and verb paradigms match the new worksheet answers',()=>{
 assert.deepEqual(shopPrices.map(p=>p[1]),[240,260,120,180,90,60,80,160]);
 for(const [part,amount]of [['Ein Brot und ein Liter Milch','3,80'],['Zwei Joghurts und eine Gurke','2,10'],['Du kaufst 1 kg Äpfel','0,80'],['Nora kauft vier Brötchen','2,20'],['Sami kauft drei Joghurts','1,80'],['Emil hat 10','2,60']])assert.equal(task('preise',part).correct,amount);
 assert.ok(isCorrect(task('artikel-mehrzahl','… Joghurt'),'das'));assert.ok(isCorrect(task('artikel-mehrzahl','Einzahl: Joghurt'),'Joghurte'));assert.ok(isCorrect(task('hobbyverben','basteln: ich'),'bastele'));assert.equal(task('hobbyverben','fahren: du').correct,'fährst');
 assert.ok(isCorrect(task('artikel-mehrzahl','Einzahl: Apfel'),'Äpfel'));assert.equal(isCorrect(task('artikel-mehrzahl','Einzahl: Apfel'),'äpfel'),false);
 assert.deepEqual(mapPlaces.map(p=>p[1]),['Bäckerei','Spielplatz','Bibliothek','Park','Schule','Haltestelle']);
});
test('completion requires explicitly checked answers and all search words while open work remains ungraded',()=>{
 const unit=autumnUnits.find(u=>u.id==='raetsel-tag1'),record={answers:{},checked:{},searches:{}};
 assert.equal(unitStatus(unit,record).correct,0);assert.equal(unitStatus(unit,record).total,17);for(const group of unit.groups){for(const q of group.tasks)if(q.correct)record.answers[q.id]=q.correct;if(group.kind==='wordsearch')record.searches[group.id]=group.words.map(gridWord);}
 assert.equal(unitStatus(unit,record).ready,false);for(const q of unit.groups.flatMap(g=>g.tasks).filter(q=>q.correct))record.checked[q.id]=true;assert.equal(unitStatus(unit,record).ready,true);
 const first=unit.groups.find(g=>g.kind==='riddle').tasks[0];record.answers[first.id]='falsch';assert.equal(unitStatus(unit,record).ready,false);assert.equal(isCorrect({type:'open'},'Mein eigener Text'),null);
});
test('full, day and single-unit worksheets include all materials and add complete separately labelled solutions only on request',()=>{
 const all=createAutumnWorksheet('all');assert.equal(all.sections.length,30);const ids=all.sections.flatMap(s=>s.blocks.map(b=>b.id));assert.equal(new Set(ids).size,ids.length);assert.ok(!all.sections.some(s=>s.solution));
 const solved=createAutumnWorksheet('all',{solutions:true});assert.equal(solved.sections.length,60);assert.equal(solved.sections.filter(s=>s.solution).length,30);
 const text=solved.sections.flatMap(s=>s.blocks.map(b=>b.text||b.prompt||'')).join(' ');for(const q of autumnTasks)if(q.type==='open')assert.ok(text.includes(q.model),q.id);else assert.ok(text.includes(q.correct),q.id);
 for(const d of autumnDays)assert.equal(createAutumnWorksheet(d.day).sections.length,6);
 assert.equal(createAutumnWorksheet('stadtplan').sections.length,1);assert.throws(()=>createAutumnWorksheet('unknown'));
 assert.ok(all.sections.flatMap(s=>s.blocks).some(b=>b.kind==='diagram'&&b.spec.kind==='clocks'&&b.spec.blank));
});
test('the learning pass uses voluntary personal reflection without asserting official attendance or dates',()=>{
 const pass=createAutumnWorksheet('pass',{pass:{name:'Mila',proud:'Ich lese gern.',goals:{2:true}}});const texts=pass.sections.flatMap(s=>s.blocks.map(b=>plainGrammar(b.text||''))).join(' ');
 assert.ok(texts.includes('Mila'));assert.ok(texts.includes('[x] Tag 2'));assert.ok(texts.includes('Ich lese gern.'));assert.ok(!texts.includes('teilgenommen'));assert.ok(!texts.includes('19.10.2026'));assert.equal(createAutumnWorksheet('pass').sections.length,3);
});
