import {test} from 'node:test';
import assert from 'node:assert/strict';
import {soundPatterns, soundQuestions, soundTaskCount, soundExampleCount, mixedSoundQuestions} from '../src/phonics.js';
import {finishActivity, initialProgress, readProgress} from '../src/data.js';

test('all requested connections plus äu have substantial original examples and varied exercises', () => {
 assert.deepEqual(soundPatterns.map(p=>p.id), ['sch','ch','ei','au','eu','ie','sp','st','ck','pf','ng','tz','qu','äu']);
 assert.equal(soundTaskCount,180);assert.equal(soundExampleCount,183);
 const ids=[];
 for(const pattern of soundPatterns){
  assert.ok(pattern.examples.length>=8,pattern.id);assert.ok(pattern.sentences.length>=2);assert.ok(pattern.tips.length);
  assert.equal(new Set(pattern.examples.map(e=>e.word)).size,pattern.examples.length);
  for(const e of pattern.examples){assert.ok(e.at>=0);assert.equal(e.word.slice(e.at,e.at+pattern.id.length).toLocaleLowerCase('de'),pattern.id);}
  const questions=soundQuestions(pattern);assert.equal(questions.length,pattern.id==='ch'?24:12);
  assert.equal(questions.filter(q=>q.speak).length,2);assert.equal(questions.filter(q=>q.options===null).length,2);
  for(const q of questions){ids.push(q.id);assert.ok(q.prompt&&q.correct&&q.explanation&&q.hint, q.id);
   if(q.options){assert.ok(q.options.length>=3);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.options.includes(q.correct));}
   if(q.masked){assert.equal(q.masked.replace(/_+/,q.correct),q.word);assert.equal(q.missingPositions.length,pattern.id.length);assert.equal(q.masked.match(/_/g).length,q.correct.length);}
  }
 }
 assert.equal(new Set(ids).size,180);
});
test('ch explains all requested pronunciations and does not mark regional China or Chemie variants wrong',()=>{
 const p=soundPatterns.find(p=>p.id==='ch');assert.equal(p.sections.length,10);
 for(const word of ['Bach','Bauch','Buch','Licht','China','Chemie','Milch','Mädchen','Häuschen','Chor','Chef','Chip','Couch','Fuchs','höchste'])assert.ok(p.examples.some(e=>e.word===word),word);
 assert.ok(p.sections[4].rule.includes('k oder sch'));assert.ok(p.sections[4].rule.includes('nicht pauschal falsch'));
 const tasks=soundQuestions(p);assert.ok(tasks.some(q=>q.prompt.includes('China')&&q.correct.includes('regional')));assert.ok(tasks.some(q=>q.prompt.includes('Chemie')&&q.correct.includes('regionale')));
 for(const q of tasks)if(/China|Chemie/.test(q.prompt))assert.ok(!q.options.includes('Nur der Ich-Laut ist richtig.'));
});
test('sp/st stem boundaries, ck/tz spelling, ng and ie exceptions are explicit',()=>{
 const all=id=>{const p=soundPatterns.find(p=>p.id===id);return JSON.stringify(p);};
 for(const [id,terms] of [['sp',['Wespe','auspacken','Wortstamm']],['st',['Kiste','Haustür','verstehen']],['ck',['kurz','k-Laut']],['tz',['Herz','Pilz']],['ng',['zusätzliches g','an-geben','sinken']],['ie',['Familie','Linie']]])for(const term of terms)assert.ok(all(id).includes(term),id+': '+term);
 const plurals=soundPatterns.find(p=>p.id==='äu').examples.filter(e=>['Bäume','Häuser','Mäuse'].includes(e.word));assert.ok(plurals.every(e=>e.count>1));
});
test('mixed rounds select twelve distinct connections, vary and retain original question identities',()=>{
 const original=new Set(soundPatterns.flatMap(p=>soundQuestions(p).map(q=>q.id)));
 for(let attempt=0;attempt<20;attempt++){const round=mixedSoundQuestions();assert.equal(round.length,12);assert.equal(new Set(round.map(q=>q.id.split(':')[1])).size,12);assert.ok(round.every(q=>original.has(q.id)));}
 assert.notDeepEqual(mixedSoundQuestions(()=>0).map(q=>q.id),mixedSoundQuestions(()=>.9).map(q=>q.id));
});
test('phonics rounds earn activity credit without changing vocabulary; old and new stored questions remain readable',()=>{
 const p=finishActivity(initialProgress,'phonics:ch:round-3','2026-10-25');assert.equal(p.xp,15);assert.equal(p.activities['phonics:ch:round-3'],1);assert.deepEqual(p.learned,[]);
 const q=soundQuestions(soundPatterns[0])[1];const stored={...p,mistakes:[q]};const read=readProgress({getItem:()=>JSON.stringify(stored)});assert.equal(read.mistakes[0].id,q.id);assert.equal(read.mistakes[0].masked,q.masked);assert.equal(read.mistakes[0].missingPositions.length,3);
});
