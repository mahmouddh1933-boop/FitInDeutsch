import {bookChapters,bookUnits} from './content.js';
import {shuffled} from '../autumn/learning.js';
const text=value=>({kind:'text',text:value});
const diagram=(spec,blank=false,size=92)=>({kind:'diagram',size,spec:{...spec,family:'book2',printBlank:blank}});
function blocks(unit){const out=[text(unit.intro),text('Lesehilfe: '+unit.tip)];if(unit.art)out.push(diagram(unit.art));
 for(const group of unit.groups){out.push(text(group.title));
  if(group.kind==='reading')out.push(...group.paragraphs.map(text));
  if(group.kind==='comic')for(const [i,p]of group.panels.entries())out.push(text(`Bild ${i+1}: ${p.text}`),diagram(p.art,false,65));
  if(group.kind==='painting')out.push({kind:'list',items:group.instructions},diagram(group.art,true,110));
  if(group.kind==='drawing')out.push(text(group.instructions),{kind:'diagram',size:88,spec:{kind:'drawing'}});
  const compact=group.tasks.filter(q=>q.type==='choice'||q.type==='text');
  if(compact.length)out.push({kind:'table',caption:'Lies und beantworte. Wähle bei Auswahlaufgaben genau eine Antwort.',headers:['Aufgabe und Auswahl','Deine Antwort'],rows:compact.map((q,i)=>[`${i+1}. ${q.prompt}${q.options?' Auswahl: '+q.options.join(' / '):''}`,'________________'])});
  for(const q of group.tasks.filter(q=>q.type==='order'||q.type==='open'))out.push({kind:'question',prompt:q.prompt+(q.items?' Bausteine: '+shuffled(q.items,q.id).map(x=>x.item).join(' / '):''),options:[],lines:q.type==='open'?3:2});
 }
 return out;
}
function solutions(unit){const out=[];for(const g of unit.groups){out.push(text(g.title));if(g.kind==='painting'){out.push(...g.instructions.map(text),diagram({...g.art,printPaint:g.targets},false,90));}if(g.kind==='drawing')out.push(text('Hinweis zum eigenen Bild: '+g.model));for(const q of g.tasks)out.push(text(q.prompt+' – '+(q.type==='open'?'Mögliche Antwort / Hinweis: '+q.model:q.correct+'. '+q.explanation)));}return out;}
export function createBookWorksheet(scope,{solutions:withSolutions=false}={}){
 const chapter=scope.startsWith('chapter:')?bookChapters.find(c=>c.id===scope.slice(8)):null;
 const units=scope==='all'?bookUnits:chapter?bookUnits.filter(u=>u.chapter===chapter.id):bookUnits.filter(u=>u.id===scope);
 if(!units.length)throw new Error('Unbekanntes Buch-2-Lernmaterial.');
 const title=scope==='all'?'Buch 2 Deutsch · Meine Lesewerkstatt':chapter?`Buch 2 Deutsch · ${chapter.title}`:units[0].title;
 const sections=units.map((u,i)=>({title:`${bookChapters.find(c=>c.id===u.chapter).title} · Übung ${u.number}: ${u.title}`,pageBreak:i>0,blocks:blocks(u)}));
 if(withSolutions)sections.push(...units.map(u=>({title:'Lösungen und Hinweise: '+u.title,solution:true,blocks:solutions(u)})));
 return {id:`book2-${scope}`,title,subtitle:'Eigene Leseübungen · Name: ____________________ · Datum: __________',filename:`Fit-in-Deutsch_Buch-2-Deutsch_${scope.replace(':','-')}.pdf`,sections:sections.map((section,si)=>({...section,blocks:section.blocks.map((block,bi)=>({...block,id:`book2-print-${scope}-${si}-${bi}`}))}))};
}
