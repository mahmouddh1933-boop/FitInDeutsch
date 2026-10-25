import {makeQuestions,normalize} from './learning.js';
import {definitions,definitionDistractors} from './definitions.js';
import {finishActivity,markWordsLearned,dayKey} from './data.js';
export const testModes=[
 {id:'listen',title:'Hören',icon:'🎧',description:'Höre das Wort und wähle das passende Bild.'},
 {id:'write',title:'Schreiben',icon:'✍️',description:'Schreibe das Wort zum Bild, ohne Artikel.'},
 {id:'missing',title:'Fehlender Buchstabe',icon:'✏️',description:'Ergänze die fehlenden Buchstaben. Die Wortlänge hilft dir.'},
 {id:'scramble',title:'Buchstabensalat',icon:'🔠',description:'Ordne alle Buchstaben zum richtigen Wort.'},
 {id:'definition',title:'Definitionen verstehen',icon:'📖',difficulty:'Schwer',description:'Lies die deutsche Erklärung und wähle das passende Wort.'}
];
export const testSizes=[5,10];
export const testDurations=[60,90,120];
export function shuffle(items,random=Math.random){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export function missingWord(word){
 const chars=Array.from(word),available=chars.map((c,i)=>({c,i})).filter(({c,i})=>/^[a-zäöüß]$/i.test(c)&&i>0&&i<chars.length-1).map(x=>x.i);
 if(!available.length)chars.forEach((c,i)=>{if(i>0&&/^[a-zäöüß]$/i.test(c))available.push(i);});
 const count=Math.min(chars.length<=5?1:chars.length<=9?2:3,available.length);
 const positions=Array.from({length:count},(_,i)=>available[Math.floor((i+1)*available.length/(count+1))]);
 return {masked:chars.map((c,i)=>positions.includes(i)?'_':c).join(''),missingPositions:positions,correct:positions.map(i=>chars[i]).join('')};
}
export function createTest(topic,mode,count,seconds,random=Math.random){
 if(!testModes.some(m=>m.id===mode)||!testSizes.includes(count)||!testDurations.includes(seconds))throw new Error('Ungültige Testauswahl.');
 const bank=mode==='definition'?topic.words.map(([label])=>{
  if(!definitions[label])throw new Error(`Für ${label} fehlt die Definition.`);
  return {id:`${topic.id}:definition:${label}`,mode,word:label,correct:label,definition:definitions[label],prompt:'Welches Wort passt zu dieser Definition?',image:null,explanation:`${label}: ${definitions[label]}`};
 }):makeQuestions(topic,mode);if(bank.length<count)throw new Error('Nicht genug Wörter für diesen Test.');
 const questions=shuffle(bank,random).slice(0,count).map(q=>{
  const question={...q};
  if(q.options)question.options=shuffle(q.options,random);
  if(mode==='definition')question.options=shuffle([q.correct,...shuffle(definitionDistractors(topic,q.word),random).slice(0,3)],random);
  if(mode==='listen'){const others=shuffle(topic.words.filter(([label])=>label!==q.word),random).slice(0,3);const target=topic.words.find(([label])=>label===q.word);question.pictureOptions=shuffle([target,...others].map(([label,image])=>({label,image})),random);question.options=null;question.prompt='Höre das Wort. Welches Bild passt?';}
  if(q.letters){question.letters=shuffle(q.letters,random);if(question.letters.map(l=>l.letter).join('')===q.correct)question.letters=[...question.letters.slice(1),question.letters[0]];}
  if(mode==='missing'){const word=q.word.replace(/^(der|die|das) /,'');Object.assign(question,missingWord(word));question.prompt=`Ergänze ${question.missingPositions.length===1?'den fehlenden Buchstaben':`die ${question.missingPositions.length} fehlenden Buchstaben`}.`;question.explanation=`${word} – die fehlenden Buchstaben sind: ${Array.from(question.correct).join(', ')}.`;}
  return question;
 });
 return {topicId:topic.id,topicTitle:topic.title,mode,count,seconds,questions};
}
export function answerMatches(question,value){
 const clean=s=>s.normalize('NFC').trim().replace(/\s+/g,' ');
 if(question.mode==='write'||question.mode==='scramble')return clean(value)===clean(question.correct);
 return normalize(value)===normalize(question.correct);
}
export function remainingSeconds(deadline,now){return Math.max(0,Math.ceil((deadline-now)/1000));}
export function formatTime(seconds){return `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;}
export function buildTestResult(test,answers,reason,elapsedSeconds,finishedAt=new Date().toISOString()){
 const items=test.questions.map(question=>{
  const response=answers.find(a=>a.questionId===question.id);
  const status=!response?'unanswered':response.skipped?'skipped':answerMatches(question,response.value)?'correct':'wrong';
  return {question,answer:response?.value??'',status};
 });
 return {...test,items,reason,finishedAt,elapsedSeconds:Math.min(test.seconds,Math.max(0,elapsedSeconds)),correctCount:items.filter(x=>x.status==='correct').length,wrongCount:items.filter(x=>x.status==='wrong').length,skippedCount:items.filter(x=>x.status==='skipped').length,unansweredCount:items.filter(x=>x.status==='unanswered').length};
}
export function finishTimedTest(progress,result,day=dayKey()){
 const recorded=finishActivity(progress,`test:${result.topicId}:${result.mode}`,day);
 const learned=markWordsLearned(recorded,result.items.filter(i=>i.status==='correct').map(i=>i.question.word),day);
 const mistakes=[...progress.mistakes];
 for(const item of result.items.filter(i=>i.status==='wrong')){const i=mistakes.findIndex(q=>q.id===item.question.id);if(i<0)mistakes.push(item.question);else mistakes[i]=item.question;}
 return {...learned,xp:progress.xp+result.correctCount*3,mistakes,testHistory:[...(progress.testHistory||[]),result].slice(-50)};
}
