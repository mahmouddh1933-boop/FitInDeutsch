import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbs,verbTenses,conjugationRows,verbVariants,searchVerbs,auxiliaryChoices} from '../src/verbs/conjugation.js';
import {moreTopics,skillAreas,moreTopicQuestionCount} from '../src/moreTopics/content.js';
import {plainGrammar,markLabels} from '../src/grammar/helpers.js';
import {chooseGermanVoice,createSpeechPlayer} from '../src/speech.js';
const verb=id=>verbs.find(v=>v.id===id);
const forms=(id,t='present',aux)=>conjugationRows(verb(id),t,aux).map(r=>r.spoken);

test('500 distinct common verbs are German-alphabetically sorted and every displayed form is complete',()=>{
 assert.equal(verbs.length,500);assert.equal(new Set(verbs.map(v=>v.id)).size,500);assert.deepEqual(verbs.map(v=>v.id),verbs.map(v=>v.id).sort((a,b)=>a.localeCompare(b,'de')));
 assert.ok(verbs.findIndex(v=>v.id==='ändern')<verbs.findIndex(v=>v.id==='bauen'));
 for(const v of verbs)for(const variant of verbVariants(v))for(const tense of verbTenses)for(const aux of auxiliaryChoices(variant)){
  const rows=conjugationRows(variant,tense.id,aux);
  assert.equal(rows.length,tense.id==='imperative'?(variant.noImperative?0:3):(variant.impersonal?1:7),`${v.id} ${tense.id}`);
  for(const row of rows){assert.ok(row.text&&row.spoken);assert.ok(!/undefined|null|\[\[/.test(row.text));assert.equal(row.parts.map(p=>p.text).join('')+(tense.id==='imperative'?'!':''),row.text);}
 }
});
test('independent core paradigms cover irregular vowels, modern spelling and strong past forms',()=>{
 const expected={sein:['bin','bist','ist','sind','seid','sind'],haben:['habe','hast','hat','haben','habt','haben'],werden:['werde','wirst','wird','werden','werdet','werden'],essen:['esse','isst','isst','essen','esst','essen'],geben:['gebe','gibst','gibt','geben','gebt','geben'],nehmen:['nehme','nimmst','nimmt','nehmen','nehmt','nehmen'],lesen:['lese','liest','liest','lesen','lest','lesen'],wissen:['weiß','weißt','weiß','wissen','wisst','wissen'],müssen:['muss','musst','muss','müssen','müsst','müssen'],können:['kann','kannst','kann','können','könnt','können']};
 for(const [id,list] of Object.entries(expected))assert.deepEqual(verb(id).present.map(f=>f[0]),list,id);
 for(const [id,past,pp] of [['gehen','ging','gegangen'],['bringen','brachte','gebracht'],['denken','dachte','gedacht'],['sprechen','sprach','gesprochen'],['essen','aß','gegessen'],['schließen','schloss','geschlossen'],['wissen','wusste','gewusst'],['müssen','musste','gemusst'],['vorbereiten','bereitete vor','vorbereitet'],['bereiten','bereitete','bereitet']]){assert.equal(verb(id).past[0].join(' '),past,id);assert.equal(verb(id).participle,pp,id);}
 assert.deepEqual(verb('verzeihen').past.map(f=>f[0]),['verzieh','verziehst','verzieh','verziehen','verzieht','verziehen']);
 assert.deepEqual(verb('müssen').past.map(f=>f[0]),['musste','musstest','musste','mussten','musstet','mussten']);
});
test('separable and inseparable verbs and imperative sentence order stay correct',()=>{
 assert.equal(forms('anrufen')[0],'ich rufe an');assert.equal(forms('aufstehen')[1],'du stehst auf');assert.equal(forms('teilnehmen')[1],'du nimmst teil');assert.equal(forms('festhalten')[2],'er hält fest');assert.equal(forms('kennenlernen')[0],'ich lerne kennen');assert.equal(forms('unterhalten')[1],'du unterhältst');assert.equal(forms('unterscheiden')[0],'ich unterscheide');assert.equal(forms('ausfüllen')[0],'ich fülle aus');assert.equal(forms('bewerben','imperative')[0],'Bewirb dich!');assert.equal(forms('übernehmen')[0],'ich übernehme');assert.equal(forms('wiederholen')[0],'ich wiederhole');
 assert.deepEqual(forms('sein','imperative'),['Sei!','Seid!','Seien Sie!']);assert.deepEqual(forms('nehmen','imperative'),['Nimm!','Nehmt!','Nehmen Sie!']);assert.deepEqual(forms('anrufen','imperative'),['Rufe an!','Ruft an!','Rufen Sie an!']);assert.deepEqual(forms('beeilen','imperative'),['Beeile dich!','Beeilt euch!','Beeilen Sie sich!']);
 assert.equal(forms('müssen','imperative').length,0);assert.equal(forms('regnen','imperative').length,0);assert.deepEqual(forms('regnen'),['es regnet']);
});
test('compound past tenses choose the correct auxiliary and place reflexives correctly',()=>{
 assert.equal(forms('gehen','perfect')[0],'ich bin gegangen');assert.equal(forms('machen','perfect')[0],'ich habe gemacht');assert.equal(forms('gehen','pluperfect')[0],'ich war gegangen');assert.equal(forms('machen','pluperfect')[1],'du hattest gemacht');assert.equal(forms('erinnern','perfect')[0],'ich habe mich erinnert');assert.equal(forms('beeilen','pluperfect')[3],'wir hatten uns beeilt');assert.equal(forms('werden','perfect')[0],'ich bin geworden');assert.equal(forms('fahren','perfect','haben')[0],'ich habe gefahren');assert.equal(forms('fahren','perfect','sein')[0],'ich bin gefahren');
});
test('meaning-dependent paradigms do not mix strong and weak forms',()=>{
 const [hang,hangState]=verbVariants(verb('hängen'));assert.equal(conjugationRows(hang,'perfect')[0].text,'habe gehängt');assert.equal(conjugationRows(hangState,'past')[0].text,'hing');assert.equal(conjugationRows(hangState,'perfect')[0].text,'habe gehangen');
 const [scare,startle]=verbVariants(verb('erschrecken'));assert.equal(conjugationRows(scare)[2].text,'erschreckt');assert.equal(conjugationRows(scare,'past')[0].text,'erschreckte');assert.equal(conjugationRows(startle)[2].text,'erschrickt');assert.equal(conjugationRows(startle,'past')[0].text,'erschrak');assert.equal(conjugationRows(startle,'perfect')[0].text,'bin erschrocken');
 assert.equal(conjugationRows(verbVariants(verb('schaffen'))[1],'perfect')[0].text,'habe geschaffen');
 assert.equal(conjugationRows(verbVariants(verb('bewegen'))[1],'past')[0].text,'bewog');
});
test('search and A–Z filters respect German umlauts and do not invent X/Y verbs',()=>{
 assert.ok(searchVerbs('offnen').some(v=>v.id==='öffnen'));assert.ok(searchVerbs('', 'A').some(v=>v.id==='ändern'));assert.ok(searchVerbs('auf').every(v=>v.id.includes('auf')));assert.equal(searchVerbs('','X').length,0);assert.equal(searchVerbs('not-a-verb').length,0);
});
test('forty additional units cover all four skill areas in grades two to four with 120 answerable questions',()=>{
 assert.equal(moreTopics.length,40);assert.equal(moreTopicQuestionCount,120);assert.deepEqual([2,3,4].map(g=>moreTopics.filter(t=>t.grade===g).length),[13,15,12]);
 const ids=[];
 for(const grade of [2,3,4])for(const area of skillAreas)assert.ok(moreTopics.some(t=>t.grade===grade&&t.area===area.id));
 for(const t of moreTopics){assert.equal(t.steps.length,3);assert.ok(t.examples.length>=2);assert.ok(t.intro&&t.task);assert.equal(t.criteria.length,3);assert.equal(t.questions.length,3);
  for(const q of t.questions){ids.push(q.id);assert.ok(q.prompt&&q.correct&&q.explanation);assert.ok(q.options.includes(q.correct));assert.equal(new Set(q.options).size,q.options.length);}
  for(const text of [t.intro,...t.steps,...t.examples]){for(const match of text.matchAll(/\[\[([a-z]+):([^\]]+)\]\]/g))assert.ok(markLabels[match[1]],t.id);assert.ok(!plainGrammar(text).includes('[['));}
 }
 assert.equal(new Set(ids).size,120);
});
test('literacy examples preserve word-family accuracy, poetry schemes and chart values',()=>{
 const derive=moreTopics.find(t=>t.id==='ableiten');assert.ok(derive.examples.some(e=>plainGrammar(e).includes('gefällt')&&plainGrammar(e).includes('gefallen')));
 const poetry=moreTopics.find(t=>t.id==='gedichte-gestalten');const elf=plainGrammar(poetry.examples[0]).split('\n').slice(1);assert.deepEqual(elf.map(l=>l.split(' ').length),[1,2,3,4,1]);const rondell=plainGrammar(poetry.examples[1]).split('\n').slice(1);assert.equal(rondell.length,8);assert.equal(rondell[0],rondell[3]);assert.equal(rondell[0],rondell[6]);assert.equal(rondell[1],rondell[7]);
 const chart=moreTopics.find(t=>t.id==='sachtext-grafik').chart;assert.equal(chart.reduce((n,r)=>n+r[1],0),50);assert.equal(chart.at(-1)[1]-chart[3][1],8);
 const book=moreTopics.find(t=>t.id==='minibuch-gemeinsam');assert.equal(book.pages.length,4);assert.ok(book.pages.every(p=>p[1].split(/\s+/).length>=30));
});
function fakeHost({audio=true,voices}={}){const spoken=[],played=[],messages=[],listeners=new Map(),timers=[];class Utterance{constructor(text){this.text=text;}}class Audio{constructor(src){this.src=src;this.currentTime=0;played.push(this);}play(){this.played=true;return Promise.resolve();}pause(){this.paused=true;}}
 const synth={cancel(){},speak(u){spoken.push(u);}};if(voices){synth.getVoices=()=>voices.value;synth.addEventListener=(name,fn)=>listeners.set(name,fn);synth.removeEventListener=name=>listeners.delete(name);}
 const host={speechSynthesis:synth,SpeechSynthesisUtterance:Utterance,Audio:audio?Audio:null,setTimeout(fn){timers.push(fn);return timers.length;},clearTimeout(){}};return {host,spoken,played,messages,listeners,timers};}
test('German voices are explicit and English default voices are not used for German',()=>{
 const english={lang:'en-US',default:true},german={lang:'de-DE',localService:true},austrian={lang:'de-AT'};assert.equal(chooseGermanVoice([english,austrian,german]),german);assert.equal(chooseGermanVoice([english]),null);
 const f=fakeHost({voices:{value:[english,german]}});const player=createSpeechPlayer(x=>f.messages.push(x),f.host);player.speak('  Guten   Morgen. ');assert.equal(f.spoken[0].text,'Guten Morgen.');assert.equal(f.spoken[0].voice,german);assert.equal(f.spoken[0].lang,'de-DE');
});
test('Mäuse and its article use a bundled audio reference, including decomposed umlauts, and stop on navigation',()=>{
 const f=fakeHost(),player=createSpeechPlayer(x=>f.messages.push(x),f.host);player.speak('Ma\u0308use');assert.equal(f.played.length,1);assert.ok(f.played[0].src.startsWith('data:audio/mpeg;base64,'));assert.equal(f.spoken.length,0);player.stop();assert.ok(f.played[0].paused);assert.equal(f.played[0].currentTime,0);player.speak('die Mäuse');assert.equal(f.played.length,2);player.speak('Katze');assert.ok(f.played[1].paused);assert.equal(f.spoken[0].text,'Katze');
});
test('late voice loading is cancellable and failed reference audio falls back to German speech',()=>{
 const vv={value:[]},f=fakeHost({voices:vv}),player=createSpeechPlayer(()=>{},f.host);player.speak('Hund');assert.equal(f.spoken.length,0);player.stop();vv.value=[{lang:'de-DE'}];f.timers[0]();assert.equal(f.spoken.length,0);
 player.speak('Mäuse');f.played[0].onerror();assert.equal(f.spoken[0].text,'Mäuse');assert.equal(f.spoken[0].lang,'de-DE');
});
