import {stories,storyWordCount} from './stories.js';
import {syllableWords,gestures,onsetTable,helperModules,rhymePairs,diceOrders,wordBag} from './helperData.js';
import {grammarTopics,grammarQuestions} from '../grammar.js';
import {planSchedule} from './plans.js';
const text=t=>({kind:'text',text:t});
const question=(prompt,options=[],lines=2)=>({kind:'question',prompt,options,lines:options.length?0:lines});
function finalize(id,title,subtitle,sections,solutions,withSolutions=false){const all=[...sections,...(withSolutions?[{title:'Lösungen und Hinweise für die Begleitung',solution:true,blocks:solutions}]:[])];return {id,title,subtitle,filename:`Fit-in-Deutsch_${id}.pdf`,sections:all.map((s,si)=>({...s,blocks:s.blocks.map((b,bi)=>({...b,id:`${id}-s${si}-b${bi}`}))}))};}
export function storySection(story){return {title:`Lesegeschichte: ${story.title}`,blocks:[text(`Stufe ${story.level} · ${storyWordCount(story)} Wörter. Lies den Text zuerst in Ruhe. Du darfst beim Antworten nachlesen.`),...story.paragraphs.map(text),...story.questions.map((q,i)=>question(`${i+1}. ${q.prompt}`,q.options||[],q.type==='open'?3:0))]};}
export function storySolutions(story){return [text(`Lesegeschichte: ${story.title}`),...story.questions.map((q,i)=>text(`${i+1}. ${q.type==='open'?'Musterantwort: '+q.model:q.correct+(/[.!?]$/.test(q.correct)?' ':'. ')+q.explanation}`))];}
export function createStoryWorksheet(story,{solutions=false}={}){return finalize(`Lesetext-${story.id}`,story.title,`Lesen und Verstehen · Stufe ${story.level} · Name: ____________________ · Datum: __________`,[storySection(story)],storySolutions(story),solutions);}
export function grammarSection(topic){return {title:`Grammatik · Klasse ${topic.grade}: ${topic.title}`,blocks:[text(topic.rule),...topic.steps.map((t,i)=>text(`${i+1}. ${t}`)),...(topic.infoTable?[{kind:'table',headers:topic.infoTable.headers,rows:topic.infoTable.rows,caption:topic.infoTable.caption}]:[]),...(topic.caseTable?[{kind:'table',headers:['Fall','Frage','Maskulin','Feminin','Neutral','Mehrzahl'],rows:topic.caseTable,caption:'Die vier Fälle'}]:[]),...(topic.timeline?[{kind:'list',items:topic.timeline.map(t=>`${t.title}: ${t.text}`)}]:[]),...topic.examples.map((e,i)=>text(`Beispiel ${i+1}: ${e.text} – ${e.note}`)),text(`Achte darauf: ${topic.pitfall}`),...grammarQuestions(topic).map((q,i)=>question(`${i+1}. ${q.context?q.context+' ':''}${q.prompt}${q.tokens?' Wortgruppen: '+q.tokens.map(t=>t.word).join(' / '):''}`,q.options||[],q.tokens?2:0))]};}
export function grammarSolutions(topic){return [text(`Grammatik: ${topic.title}`),...grammarQuestions(topic).map((q,i)=>text(`${i+1}. ${q.correct} – ${q.explanation}`))];}
export function letterSection(letters){const entries=letters.filter(l=>l!=='ß').map(l=>onsetTable.find(e=>e.upper===l));return {title:'Buchstaben und Anfangslaute',blocks:[text('Schaut die Buchstaben und Bilder an. Sprecht das Wort. Hört dann nur auf den Anfang. Buchstabenname und Laut sind nicht immer gleich.'),{kind:'arts',items:entries.map(l=>({name:l.image,label:`${l.upper} ${l.lower} · ${l.word} · ${l.soundNote}`}))},...letters.flatMap(letter=>{
 if(letter==='ß')return [text('ß ist das Eszett. Es steht nicht am Wortanfang. Das große ẞ gibt es ebenfalls. Beispiel: Straße.'),question('Finde und kreise ß ein: Straße · Sonne · groß · Bus',[],1)];
 const entry=onsetTable.find(e=>e.upper===letter),gesture=gestures.find(g=>g.letter===letter);
 return [text(`${letter} ${entry.lower}: ${entry.word}. Anfangslaut: ${entry.soundNote}.${gesture?' Bewegung: '+gesture.movement+' Lautbildung: '+gesture.sound:''}`),question(`Schreibe ${letter} und ${entry.lower} mehrmals. Nenne oder zeichne ein weiteres passendes Wort.`,[],2)];
 })]};}
const helperInstructions={
 sounds:['Höre ein Beispielwort und sprich den ersten Laut nach. Nutzt die beschriebenen Bewegungen als freie Merksignale. Sie sind keine standardisierte Gebärdensprache.','Vergleicht den Laut mit dem Buchstabennamen. Bei m übt ihr den Summton und nicht den Namen em.'],
 onsets:['Suche die passenden Bilder in der Anlauttabelle. Sprich jedes Wort und achte auf seinen Anfang.','C, V, X, Y und qu können besondere Lautverbindungen haben. ß steht nicht am Wortanfang.'],
 rhythm:['Sprich ein Wort langsam. Klatsche für jede Silbe einmal. Vergleiche danach mit den Silbenbögen.','Bei Reimen hörst du auf den Klang ab dem betonten Vokal, nicht nur auf gleiche Buchstaben.'],
 syllables:['Lies jede Silbe, dann das ganze Wort. Die Farben wechseln; ein Bogen gehört zu einer Silbe.','Ei, au und eu bilden in diesen Beispielen jeweils zusammen einen Laut und werden nicht in einzelne Buchstaben zerlegt.'],
 cards:['Schneidet die Kärtchen aus. Für das Memory braucht ihr jede Silbe zweimal. Mischt sie und legt sie verdeckt hin.','Deckt zwei Karten auf und lest die Silben. Gleiche Silben bilden ein Paar. Anschließend legt ihr Wörter aus mehreren Silben.'],
 rocket:['Eine Begleitperson stellt 20 Sekunden ein. Lies die Reihe laut und möglichst genau. Markiert, bis wohin du gekommen bist.','Beim nächsten Versuch geht es um deinen eigenen Fortschritt. Die Zahl ist keine automatische Messung deiner Lesefähigkeit.'],
 bag:['Schreibt die kurzen Wörter oder Sätze auf Zettel, schneidet sie aus und legt sie in einen Beutel.','Zieht abwechselnd einen Zettel und lest vor. Bei einem schwierigen Wort darf die andere Person helfen.'],
 paint:['Lies die Anweisung genau. Wähle nur das gesuchte Bild und färbe es in der genannten Farbe.','Lies danach noch einmal und kontrolliere deine Auswahl.'],
 dice:['Würfelt einmal. Lest den Auftrag zur Zahl laut und führt ihn aus.','Ihr dürft eine Bewegung auch durch Zeigen oder eine Fingerbewegung ersetzen.'],
 tandem:['Lest abwechselnd einen Satz. Die Begleitperson kann zuerst vormachen, dann liest das Kind nach.','Bei einem schwierigen Wort wartet ihr kurz, helft freundlich und lest den Satz noch einmal gemeinsam.']
};
export function helperSection(id,words=['mama','sonne','rakete','lampe']){
 const module=helperModules.find(m=>m.id===id),selected=words.map(id=>syllableWords.find(w=>w.id===id)).filter(Boolean);
 let blocks=helperInstructions[id].map(text);
 if(id==='sounds')blocks.push(...gestures.slice(0,4).flatMap(g=>[text(`${g.letter} wie ${g.word}: ${g.sound} Bewegung: ${g.movement}`),question(`Sprich ${g.word}. Beschreibe oder zeige die passende Bewegung.`,[],1)]));
 if(id==='onsets')blocks.push({kind:'arts',items:onsetTable.slice(0,6).map(l=>({name:l.image,label:`${l.upper} ${l.lower}: ${l.word}`}))},question('Welche drei Bildwörter beginnen mit verschiedenen Lauten? Schreibe oder zeichne sie.',[],3));
 if(id==='rhythm')blocks.push(...selected.map(w=>question(`Sprich „${w.word}“. Wie oft klatschst du?`,[],1)),...rhymePairs.slice(0,4).map(q=>question(`Was reimt sich auf ${q.word}?`,q.options)));
 if(id==='syllables')blocks.push({kind:'syllables',words:selected},...selected.map(w=>question(`Schreibe „${w.word}“ mit Silbentrennung und zeichne darunter einen Bogen je Silbe.`,[],2)));
 if(id==='cards')blocks.push(text('Memory-Kärtchen: Suche immer zwei gleiche Silben.'),{kind:'cards',items:['Ma','Ma','La','La','So','So','Na','Na','Ra','Ra','To','To']},text('Zusätzliche Kärtchen zum Wörterlegen: Schneide für jede Aufgabe die folgenden Silben aus.'),...selected.flatMap(w=>[{kind:'cards',items:[...w.syllables].reverse()},question(`Lege das Wort ${w.word} aus den Silbenkärtchen. Schreibe es auf.`,[],1)]));
 if(id==='rocket')blocks.push({kind:'cards',items:selected.map(w=>w.word)},text('Meine erste Runde: ______ Wörter markiert. Meine zweite Runde: ______ Wörter markiert.'),question('Welches Wort möchtest du danach noch einmal langsam lesen?',[],2));
 if(id==='bag')blocks.push({kind:'cards',items:[...selected.map(w=>w.word),...wordBag.slice(0,6)]},question('Schreibe einen gezogenen Satz ab und male ein passendes kleines Bild dazu.',[],3));
 if(id==='paint')blocks.push({kind:'paint',prompt:'Male den Ball rot. Male die Baumkrone grün. Male das Haus blau.'});
 if(id==='dice')blocks.push({kind:'list',items:diceOrders.map((d,i)=>`${i+1}: ${d}`)},question('Welchen Auftrag hast du gelesen und ausgeführt?',[],2));
 if(id==='tandem')blocks.push(text('Ich lese: Mila geht in die Schule. / Du liest: Ben wartet vor der Tür. / Ich lese: Gemeinsam gehen sie hinein. / Du liest: Heute lesen sie ein Buch.'),question('Erzählt einander, was die beiden Kinder machen.',[],2));
 return {title:`Lesenhelfer: ${module.title}`,blocks};
}
export function helperSolutions(id,words){const selected=(words||[]).map(id=>syllableWords.find(w=>w.id===id)).filter(Boolean);if(id==='rhythm')return [text('Silbenklatschen: '+selected.map(w=>`${w.word}: ${w.syllables.length}`).join('; ')),text('Reime: '+rhymePairs.slice(0,4).map(q=>`${q.word} – ${q.correct}`).join('; '))];if(id==='syllables'||id==='cards')return [text('Silben: '+selected.map(w=>w.syllables.join('-')).join('; '))];if(id==='paint')return [text('Ball rot, Baumkrone grün, Haus blau.')];return [text(`${helperModules.find(m=>m.id===id).title}: Besprecht die mündlichen oder praktischen Ergebnisse gemeinsam. Es gibt hier nicht immer eine einzige schriftliche Lösung.`)];}
export function createDayWorksheet(day,{solutions=false}={}){
 const band=day.band==='early'?'Klasse 1–2':'Klasse 3–4',sections=[{title:'Tagesübersicht und Morgenritual',blocks:[text('Dieser Plan ist ein Vorschlag. Tempo, Pausen und Hilfen können an die Gruppe angepasst werden.'),{kind:'table',caption:'Vorschlag für etwa 105 Minuten mit Pause',headers:['Baustein','Minuten'],rows:planSchedule(day).map(([label,min])=>[label,String(min)])},{kind:'list',items:day.ritual},question('Heute heiße ich: __________. Ich fühle mich: __________. Das möchte ich lernen:',[],2)]}];
 const answerKey=[];
 if(day.letters)sections.push(letterSection(day.letters));
 for(const id of day.helpers||[]){sections.push(helperSection(id,day.words));answerKey.push(...helperSolutions(id,day.words));}
 for(const id of day.grammar){const topic=grammarTopics.find(t=>t.id===id);sections.push(grammarSection(topic));answerKey.push(...grammarSolutions(topic));}
 if(day.story){const story=stories.find(s=>s.id===day.story);sections.push(storySection(story));answerKey.push(...storySolutions(story));}
 sections.push({title:'Gemeinsamer Abschluss',blocks:[question(day.reflection,[],4),text('Heute geschafft: __________________________   Das übe ich weiter: __________________________')]});
 return finalize(`Tag-${day.day}-${day.band}`,`Tag ${day.day}: ${day.title}`,`5-tägige Maßnahme · ${band} · Name: ____________________ · Datum: __________`,sections,answerKey,solutions);
}
export function createHelperWorksheet(id,{solutions=false}={}){const words=['mama','sonne','rakete','lampe'];return finalize(`Lesenhelfer-${id}`,helperModules.find(m=>m.id===id).title,'Lesenhelfer · Name: ____________________ · Datum: __________',[helperSection(id,words)],helperSolutions(id,words),solutions);}
