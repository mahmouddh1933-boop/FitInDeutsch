import React,{useState,useRef,useEffect,useCallback} from 'react';
import {ArrowLeft,ArrowRight,Volume2,RotateCcw,Clock,Check,X,Star} from 'lucide-react';
import {ObjectArt} from './Art';
import {testModes,remainingSeconds,formatTime,buildTestResult} from './testing';

export default function TimedTest({test,onExit,onFinished,speak,soundMessage,onStopSpeech}){
 const [index,setIndex]=useState(0),[answer,setAnswer]=useState(''),[selected,setSelected]=useState([]),[missing,setMissing]=useState({}),[remaining,setRemaining]=useState(test.seconds),[result,setResult]=useState(null);
 const [timing]=useState(()=>{const start=performance.now();return {start,deadline:start+test.seconds*1000};});
 const answers=useRef([]),finished=useRef(false),heading=useRef(null),finishCallback=useRef(onFinished),stopSpeech=useRef(onStopSpeech);
 finishCallback.current=onFinished;stopSpeech.current=onStopSpeech;
 const finish=useCallback((reason,now=performance.now())=>{
  if(finished.current)return;finished.current=true;stopSpeech.current?.();
  const summary=buildTestResult(test,answers.current,reason,(now-timing.start)/1000);
  setRemaining(remainingSeconds(timing.deadline,now));setResult(summary);finishCallback.current(summary);
 },[test,timing]);
 useEffect(()=>{
  function tick(){const now=performance.now();setRemaining(remainingSeconds(timing.deadline,now));if(now>=timing.deadline)finish('timeout',now);}
  if(result)return;const timer=setInterval(tick,200);document.addEventListener('visibilitychange',tick);tick();
  return ()=>{clearInterval(timer);document.removeEventListener('visibilitychange',tick);};
 },[finish,timing,result]);
 useEffect(()=>{heading.current?.focus();},[index,result]);
 useEffect(()=>()=>stopSpeech.current?.(),[]);
 const question=test.questions[index],mode=testModes.find(m=>m.id===test.mode);
 const value=question.letters?selected.map(id=>question.letters.find(l=>l.index===id).letter).join(''):question.missingPositions?question.missingPositions.map((_,i)=>missing[i]||'').join(''):answer;
 function submit(event,skipped=false){
  event?.preventDefault();const now=performance.now();if(finished.current)return;
  if(now>=timing.deadline){finish('timeout',now);return;}
  if(!skipped&&(!value.trim()||(question.missingPositions&&value.length!==question.missingPositions.length)))return;
  if(answers.current.some(a=>a.questionId===question.id))return;
  stopSpeech.current?.();answers.current.push({questionId:question.id,value:skipped?'':value,skipped});
  if(index===test.questions.length-1)finish('finished',now);
  else{setIndex(i=>i+1);setAnswer('');setSelected([]);setMissing({});}
 }
 if(result)return <section className="white-panel test-results">
  <div className="completion-medal"><Star size={45}/></div><span className="eyebrow">{test.topicTitle} · {mode.title}</span><h2 ref={heading} tabIndex={-1}>{result.reason==='timeout'?'Die Zeit ist um.':'Dein Testergebnis'}</h2>
  <p>{result.correctCount} von {test.count} Wörtern richtig · {Math.ceil(result.elapsedSeconds)} von {test.seconds} Sekunden</p>
  <div className="result-stats"><div><strong>{result.correctCount}</strong><span>Richtig</span></div><div><strong>{result.wrongCount}</strong><span>Falsch</span></div><div><strong>{result.skippedCount}</strong><span>Übersprungen</span></div><div><strong>{result.unansweredCount}</strong><span>Offen</span></div></div>
  <p className="muted">{result.correctCount===test.count?'Alles richtig – gut gemacht!':'Schau dir die Antworten in Ruhe an. Beim nächsten Mal klappt es noch besser.'} Du bekommst {result.correctCount*3} Lernpunkte.</p>
  <div className="test-answer-review">{result.items.map(item=><article key={item.question.id} className={`result-row ${item.status}`}><span>{item.status==='correct'?<Check size={18}/>:item.status==='wrong'?<X size={18}/>:<Clock size={18}/>}</span><div><strong>{item.question.word}</strong>{item.question.definition&&<p>{item.question.definition}</p>}<p>{item.status==='unanswered'?'Nicht mehr beantwortet':item.status==='skipped'?'Übersprungen':`Deine Antwort: ${item.answer}`}</p>{item.status!=='correct'&&<p className="correct-answer">Richtige Antwort: {item.question.correct}</p>}</div></article>)}</div>
  <button className="primary-button" onClick={onExit}>Zurück zur Testauswahl <ArrowLeft size={17}/></button>
 </section>;
 return <section className="white-panel timed-test" aria-label={`${mode.title}: ${test.topicTitle}`}>
  <div className="test-top"><button className="text-button" onClick={onExit}><ArrowLeft size={16}/> Zurück zur Testauswahl</button><span className={`test-clock ${remaining<=10?'urgent':''}`} role="timer" aria-label="Verbleibende Zeit"><Clock size={19}/>{formatTime(remaining)}</span></div>
  <div className="lesson-track"><span style={{width:`${index/test.count*100}%`}}/></div><span className="eyebrow">{test.topicTitle} · {mode.title} · WORT {index+1} VON {test.count}</span><h2 ref={heading} tabIndex={-1}>{question.prompt}</h2>
  {question.definition&&<blockquote className="definition-card">{question.definition}</blockquote>}
  {question.image&&<div className="exercise-art"><ObjectArt name={question.image}/></div>}
  {question.speak&&<><button className="listen-button" onClick={()=>speak(question.speak)}><Volume2 size={24}/> Wort anhören</button>{soundMessage&&<p className="notice" role="status">{soundMessage} Du kannst den Test abbrechen und eine andere Testart wählen.</p>}</>}
  {question.masked&&<div className="masked-word">{question.masked}</div>}
  {question.letters?<><div className="letter-slots" aria-label="Dein Wort">{value||'Tippe auf die Buchstaben …'}</div><div className="letter-bank">{question.letters.map(l=><button key={l.index} aria-label={`Buchstabe ${l.letter}, Kärtchen ${l.index+1}`} disabled={selected.includes(l.index)} onClick={()=>setSelected(a=>[...a,l.index])}>{l.letter}</button>)}</div><div className="letter-tools"><button disabled={!selected.length} onClick={()=>setSelected(a=>a.slice(0,-1))}><ArrowLeft size={15}/> Letzten zurück</button><button disabled={!selected.length} onClick={()=>setSelected([])}><RotateCcw size={15}/> Neu legen</button></div></>:
   question.pictureOptions?<div className="test-picture-options">{question.pictureOptions.map((option,i)=><button key={option.label} aria-label={`Bild ${i+1}`} aria-pressed={answer===option.label} className={answer===option.label?'selected':''} onClick={()=>setAnswer(option.label)}><ObjectArt name={option.image}/><span>{i+1}</span></button>)}</div>:
   question.options?<div className="exercise-options">{question.options.map(option=><button key={option} aria-pressed={answer===option} className={answer===option?'selected':''} onClick={()=>setAnswer(option)}>{option}</button>)}</div>:
   <form onSubmit={submit} className="answer-form">{question.missingPositions?<><p>Das Wort hat {Array.from(question.word.replace(/^(der|die|das) /,'')).length} Zeichen. Ergänze die Lücken von links nach rechts.</p><div className="missing-inputs">{question.missingPositions.map((_,i)=><label key={i}>Lücke {i+1}<input aria-label={`Lücke ${i+1}`} value={missing[i]||''} onChange={e=>setMissing(m=>({...m,[i]:e.target.value}))} maxLength={1} autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false}/></label>)}</div></>:<><label htmlFor="test-answer">Dein Wort (ohne Artikel)</label><input id="test-answer" value={answer} onChange={e=>setAnswer(e.target.value)} maxLength={60} autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false}/></>}{test.mode==='write'&&<small>Achte auf Groß- und Kleinschreibung.</small>}<button type="submit" hidden>Antwort abgeben</button></form>}
  <div className="test-actions"><button className="text-button" onClick={e=>submit(e,true)}>Überspringen</button><button className="primary-button" disabled={!value.trim()||(question.missingPositions&&value.length!==question.missingPositions.length)} onClick={submit}>{index===test.count-1?'Test abschließen':'Antwort abgeben'} <ArrowRight size={17}/></button></div>
  <p className="muted test-note">Die Zeit läuft für den gesamten Test. Die Auswertung kommt am Ende. Mit „Zurück“ brichst du den laufenden Versuch ab.</p>
 </section>;
}
