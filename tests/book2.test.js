import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bookChapters,bookUnits,bookTasks,bookStats,bookStories} from '../src/book2/content.js';
import {artParts,colors,flags,effectivePaint,paintScore} from '../src/book2/models.js';
import {bookUnitStatus} from '../src/book2/learning.js';
import {isCorrect} from '../src/autumn/learning.js';
import {createBookWorksheet} from '../src/book2/worksheets.js';
const unit=id=>bookUnits.find(u=>u.id===id);

test('book two has 52 original units in eight skill chapters with complete task data',()=>{
 assert.deepEqual(bookChapters.map(c=>c.units.length),[6,6,6,6,6,6,8,8]);assert.equal(bookUnits.length,52);assert.equal(bookStats.questions,300);assert.equal(bookStats.closed,261);assert.equal(bookStats.open,39);assert.equal(bookStats.paintTargets,37);assert.equal(bookStats.comics,8);assert.equal(bookStats.texts,8);
 assert.equal(new Set(bookUnits.map(u=>u.id)).size,52);assert.equal(new Set(bookTasks.map(q=>q.id)).size,300);
 for(const u of bookUnits){assert.ok(u.title&&u.intro&&u.tip);assert.ok(u.groups.length);for(const q of u.groups.flatMap(g=>g.tasks)){assert.ok(q.prompt&&q.id);if(q.type==='open')assert.ok(q.model);else assert.ok(q.correct&&q.explanation);if(q.options){assert.ok(q.options.includes(q.correct));assert.equal(new Set(q.options).size,q.options.length);}}}
 const corpus=JSON.stringify(bookChapters);for(const name of ['Quallo','Fridolin','Bert ist ein Boxer','Klaus und Kevin','jandorf'])assert.ok(!corpus.includes(name));
});
test('all 37 paint targets refer to real drawable parts and supported colors',()=>{
 for(const u of bookUnits)for(const g of u.groups.filter(g=>g.kind==='painting')){const parts=artParts(g.art);assert.equal(new Set(parts.map(p=>p.id)).size,parts.length);for(const [key,value]of Object.entries(g.targets)){assert.ok(parts.some(p=>p.id===key),key);assert.ok(colors[value],value);}assert.equal(paintScore(g,{}).correct,0);assert.equal(paintScore(g,{paints:{[g.id]:g.targets},paintChecks:{[g.id]:true}}).correct,Object.keys(g.targets).length);}
});
test('flag orders and Swiss geometry use independent factual fixtures, and intentionally white regions need not be colored',()=>{
 for(const [code,values]of Object.entries({de:['schwarz','rot','gelb'],fr:['blau','weiß','rot'],it:['grün','weiß','rot'],ie:['grün','weiß','orange'],at:['rot','weiß','rot'],be:['schwarz','gelb','rot'],ch:['rot','weiß'],se:['blau','gelb'],cz:['weiß','rot','blau']}))assert.deepEqual(flags[code].values,values,code);
 assert.equal(flags.ch.ratio,1);assert.equal(flags.de.orientation,'horizontal');assert.equal(flags.fr.orientation,'vertical');assert.equal(flags.cz.orientation,'triangle');
 const group=unit('flaggen-eins').groups[0],paint=Object.fromEntries(Object.entries(group.targets).filter(([,v])=>v!=='weiß'));assert.equal(effectivePaint(group,paint)['fr:1'],'weiß');assert.equal(paintScore(group,{paints:{[group.id]:paint},paintChecks:{[group.id]:true}}).correct,9);
});
test('identical letter tiles may trade identities without rejecting a correct word',()=>{
 const q={type:'order',items:['B','O','O','T'],correct:'B O O T'};assert.equal(isCorrect(q,[0,2,1,3]),true);assert.equal(isCorrect(q,[0,1,1,3]),false);assert.equal(isCorrect(q,[3,1,2,0]),false);assert.equal(isCorrect(q,[0,1,2,4]),false);
 const spoon=bookTasks.find(q=>q.type==='order'&&q.correct==='L Ö F F E L');assert.ok(spoon);assert.equal(isCorrect(spoon,[5,1,3,2,4,0]),true);
 assert.equal(isCorrect({type:'order',items:['Zuerst','Danach'],correct:'Zuerst Danach'},[1,0]),false);
});
test('counting pictures, shapes and calculations have consistent independent answers',()=>{
 for(const [id,answers]of [['obst-zaehlen',['7','2','9','Äpfel','6']],['sterne-zaehlen',['6','3','9','Sterne','8']],['katzen-zaehlen',['3','4','7','6','Ja, ein Ball bleibt übrig.']],['zug-zaehlen',['1','2','6','3','3']],['formen-zaehlen',['3','2','5','9','die Kreise']],['mischbild-zaehlen',['3','4','1','7','8']]])assert.deepEqual(unit(id).groups.flatMap(g=>g.tasks).map(q=>q.correct),answers,id);
 const art=unit('mischbild-zaehlen').art;assert.equal(art.items.filter(i=>i.kind==='apple').length,4);assert.equal(art.items.filter(i=>i.kind==='flower').length,3);assert.equal(art.items.filter(i=>i.kind==='ball').length,1);
 const q=unit('obst-zaehlen').groups[0].tasks[0];assert.ok(isCorrect(q,'sieben'));assert.ok(isCorrect(q,'7'));assert.equal(isCorrect(q,'8'),false);
});
test('spatial tasks describe actual separation, sizes and drawing order',()=>{
 const vertical=unit('oben-unten').art.items;assert.ok(vertical[0].y<vertical[1].y&&vertical[1].y<vertical[2].y);
 const overlap=unit('vor-hinter').art.items;assert.equal(overlap[0].kind,'square');assert.equal(overlap[1].kind,'star');assert.ok(overlap[1].x-overlap[1].size/2<overlap[0].x+overlap[0].size/2);
 const size=unit('gross-klein').art.items;assert.ok(size[0].size>size[1].size);assert.ok(size[2].size<size[3].size);
 assert.ok(unit('musterlesen').art.items.some(i=>i.pattern==='dots'));assert.ok(unit('musterlesen').art.items.some(i=>i.pattern==='stripes'));
});
test('every comic has three distinct original panels and an order task matching its complete captions',()=>{
 assert.equal(bookStories.length,8);for(const story of bookStories){assert.equal(story.panels.length,3);assert.equal(new Set(story.panels.map(p=>p.text)).size,3);assert.ok(story.panels.every(p=>p.art.items.length&&p.text.length>20));const q=unit(story.id).groups.flatMap(g=>g.tasks).find(q=>q.type==='order');assert.deepEqual(q.items,story.panels.map(p=>p.text));}
 const combined=unit('momos-hut').groups.flatMap(g=>g.tasks).find(q=>q.prompt==='Der Hut ist winzig klein.');assert.equal(combined.correct,'Nein');assert.ok(combined.explanation.includes('großer Hut'));
});
test('completion needs explicit checks, preserves free drawing, and invalidates an edited paint answer',()=>{
 const u=unit('idas-farben'),painting=u.groups[0],record={answers:{},checked:{},paints:{[painting.id]:painting.targets},paintChecks:{}};
 for(const q of u.groups.flatMap(g=>g.tasks)){record.answers[q.id]=q.correct;record.checked[q.id]=true;}
 assert.equal(bookUnitStatus(u,record).ready,false);record.paintChecks[painting.id]=true;assert.equal(bookUnitStatus(u,record).ready,true);record.paints[painting.id]={...painting.targets,hut:'rot'};assert.equal(bookUnitStatus(u,record).ready,false);
 assert.equal(isCorrect({type:'open'},'Mein eigenes Ende.'),null);
});
test('whole book, chapter and unit exports include all original material, optional models and unique visual IDs',()=>{
 const all=createBookWorksheet('all');assert.equal(all.sections.length,52);assert.equal(all.sections.filter(s=>s.pageBreak).length,51);assert.ok(!all.sections.some(s=>s.solution));assert.equal(createBookWorksheet('chapter:comics').sections.length,8);assert.equal(createBookWorksheet('idas-farben').sections.length,1);assert.throws(()=>createBookWorksheet('unbekannt'));
 const solved=createBookWorksheet('all',{solutions:true});assert.equal(solved.sections.length,104);assert.equal(solved.sections.filter(s=>s.solution).length,52);const ids=solved.sections.flatMap(s=>s.blocks.map(b=>b.id));assert.equal(new Set(ids).size,ids.length);
 const text=solved.sections.flatMap(s=>s.blocks.map(b=>b.text||'')).join(' ');for(const q of bookTasks)assert.ok(text.includes(q.type==='open'?q.model:q.correct),q.id);
 const blank=createBookWorksheet('flaggen-eins').sections.flatMap(s=>s.blocks).find(b=>b.kind==='diagram');assert.equal(blank.spec.printBlank,true);const key=createBookWorksheet('flaggen-eins',{solutions:true}).sections.find(s=>s.solution).blocks.find(b=>b.kind==='diagram');assert.deepEqual(key.spec.printPaint,unit('flaggen-eins').groups[0].targets);
});
