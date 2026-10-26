import {autumnDays,autumnUnits} from './content.js';
import {createWordsearch,shuffled} from './learning.js';
const text=value=>({kind:'text',text:value});
const question=(prompt,options=[],lines=2)=>({kind:'question',prompt,options,lines});
const diagram=(spec,caption='')=>({kind:'diagram',spec,caption});
function riddleSpec(group,solutions=false){return {kind:'riddle',entries:group.tasks,maxLetter:Math.max(...group.tasks.map(q=>q.letter)),solution:group.solution,solutions};}
function unitBlocks(unit){
 const blocks=[text(unit.intro),{kind:'list',items:unit.rules},...unit.examples.map(example=>text('Beispiel: '+example))];
 for(const group of unit.groups){blocks.push(text(group.title));if(group.instructions)blocks.push(text(group.instructions));
  if(group.kind==='reading')blocks.push(...group.paragraphs.map(text));
  if(group.diagram)blocks.push(diagram(group.diagram));
  if(group.arts)blocks.push({kind:'arts',items:group.arts});
  if(group.table)blocks.push({kind:'table',...group.table});
  if(group.passage)blocks.push(...group.passage.map(text));
  if(group.wordBank)blocks.push(text('Wörterhilfe: '+group.wordBank.join(' · ')));
  if(group.kind==='wordsearch'){const puzzle=createWordsearch(group.words,group.id);blocks.push(text('Suchwörter: '+group.words.join(' · ')),diagram({kind:'wordsearch',...puzzle}),question('Markiere die Suchwörter im Gitter.',[],0));}
  if(group.kind==='riddle')blocks.push(diagram(riddleSpec(group)));
  if(group.kind==='drawing')blocks.push(diagram({kind:'drawing'},'Platz für dein eigenes Bild.'));
  if(group.tasks.length&&group.tasks.every(q=>q.type==='clock'))blocks.push(diagram({kind:'clocks',clocks:group.tasks.map(()=>[12,0]),blank:true},'Zeichne bei jeder Uhr den kurzen Stundenzeiger und den langen Minutenzeiger ein.'));
  if(group.layout==='compact'&&group.tasks.every(q=>!['clock','order'].includes(q.type))){
   const options=[...new Set(group.tasks.flatMap(q=>q.options||[]))];if(options.length)blocks.push(text('Wähle aus: '+options.join(' · ')));
   blocks.push({kind:'table',caption:group.title,headers:['Aufgabe','Deine Antwort'],rows:group.tasks.map((q,i)=>[`${i+1}. ${q.prompt}`,'________________________'])});
  }else for(const [i,q]of group.tasks.entries()){
   const suffix=q.type==='order'?' Bausteine: '+shuffled(q.items,q.id).map(x=>x.item).join(' / '):q.type==='riddle'?` (${q.correct.length} Buchstaben; markiertes Feld: ${q.letter+1})`:'';
   blocks.push(question(`${i+1}. ${q.prompt}${suffix}`,q.options||[],q.type==='open'?(q.lines||3):q.type==='order'?3:1));
  }
  if(group.kind==='riddle')blocks.push(question('Das Lösungswort lautet:',[],1));
 }
 return blocks;
}
function answerBlocks(unit){const blocks=[];for(const group of unit.groups){if(!group.tasks.length&&!['wordsearch','riddle','drawing'].includes(group.kind))continue;blocks.push(text(group.title));
 if(group.kind==='wordsearch'){const puzzle=createWordsearch(group.words,group.id);blocks.push(diagram({kind:'wordsearch',...puzzle,solutions:true}),...puzzle.placements.map(p=>{const [r,c]=p.cells[0],[er,ec]=p.cells.at(-1);return text(`${p.source}: Zeile ${r+1}, Spalte ${c+1} bis Zeile ${er+1}, Spalte ${ec+1}.`);}));}
 if(group.kind==='drawing')blocks.push(text('Eigene Bildidee. Besprecht gemeinsam, was zu erkennen ist. Es gibt keine automatische Bewertung.'));
 for(const [i,q]of group.tasks.entries())blocks.push(text(`${i+1}. ${q.type==='open'?'Mögliche Antwort / Hinweis: '+q.model:q.correct+(q.accepted?.length?' (auch: '+q.accepted.join(' / ')+')':'')+'. '+q.explanation}`));
 if(group.kind==='riddle')blocks.push(diagram(riddleSpec(group,true)),text('Lösungswort: '+group.solution));
 }return blocks;}
function finish(id,title,subtitle,sections){return {id,title,subtitle,filename:`Fit-in-Deutsch_Herbstferien-2026_${id}.pdf`,sections:sections.map((s,si)=>({...s,blocks:s.blocks.map((b,bi)=>({...b,id:`autumn-print-${id}-${si}-${bi}`}))}))};}
export function createAutumnWorksheet(scope,{solutions=false,pass={}}={}){
 if(scope==='pass')return finish('Mein-Lernpass','Mein Lernpass · Herbstferien 2026','Mein persönlicher Rückblick auf die Übungen in dieser App',[
  {title:'Das bin ich',blocks:[text(`Name oder Fantasiename: ${pass.name||'________________________'}`),text(`Ort und Datum: ${pass.date||'________________________'}`),text('Ich habe im Lernbereich „Herbstferien 2026“ geübt. Dies ist mein eigener Lernrückblick.')]},
  {title:'Meine Lernschritte',blocks:autumnDays.map(d=>text(`[${pass.goals?.[d.day]?'x':' '}] Tag ${d.day}: ${d.goals[0]}`))},
  {title:'Das nehme ich mit',blocks:[text(`Darauf bin ich stolz: ${pass.proud||'________________________________________________'}`),text(`Mein neues Lieblingswort: ${pass.word||'________________________________________________'}`),text(`Das möchte ich weiter üben: ${pass.next||'________________________________________________'}`),text('Meine Unterschrift / Begleitung: ______________________________________________')]}]);
 const units=scope==='all'?autumnUnits:typeof scope==='number'?autumnUnits.filter(u=>u.day===scope):autumnUnits.filter(u=>u.id===scope);
 if(!units.length)throw new Error('Unbekanntes Herbstferien-Lernmaterial.');
 const title=scope==='all'?'Herbstferien 2026 · Alle fünf Thementage':typeof scope==='number'?`Herbstferien 2026 · Tag ${scope}: ${autumnDays.find(d=>d.day===scope).title}`:units[0].title;
 const sections=units.map(u=>({title:`Tag ${u.day} · Lernblatt ${u.number}: ${u.title}`,blocks:unitBlocks(u)}));
 if(solutions)sections.push(...units.map(u=>({title:`Lösungen und Hinweise · Tag ${u.day}, Lernblatt ${u.number}`,solution:true,blocks:answerBlocks(u)})));
 return finish(scope==='all'?'Alle-Tage':typeof scope==='number'?`Tag-${scope}`:scope,title,'Name: ____________________ · Datum: __________ · Eigene Übungen zum Lesen, Sprechen und Schreiben',sections);
}
