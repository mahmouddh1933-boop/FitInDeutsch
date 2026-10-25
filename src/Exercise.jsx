import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Check,RotateCcw,Volume2,Star} from 'lucide-react';
import {ObjectArt} from './Art';
import {normalize} from './learning';
import {MarkedText} from './MarkedText';
export function Exercise({title,questions,onExit,onComplete,onMistake,speak,soundMessage,markings=true}){
 const [index,setIndex]=useState(0),[answer,setAnswer]=useState(''),[selected,setSelected]=useState([]),[checked,setChecked]=useState(false),[done,setDone]=useState(false),[wrongIds,setWrongIds]=useState([]);
 const heading=useRef(null),input=useRef(null);
 const question=questions[index];
 useEffect(()=>{heading.current?.focus();},[index,done]);
 if(!questions.length)return <div className="white-panel"><h2>Hier gibt es noch keine passenden Aufgaben.</h2><p className="muted">Wähle für diese Übungsart ein anderes Thema.</p><button className="text-button" onClick={onExit}>Zurück zur Auswahl</button></div>;
 const value=question.tokens?selected.map(id=>question.tokens.find(t=>t.index===id).word).join(' '):question.letters?selected.map(id=>question.letters.find(l=>l.index===id).letter).join(''):answer;
 const clean=text=>text.normalize('NFC').trim().replace(/\s+/g,' ');
 const correct=question.options||question.caseSensitive?clean(value)===clean(question.correct):normalize(value)===normalize(question.correct);
 function check(e){e?.preventDefault();if(!value.trim())return;setChecked(true);if(!correct){setWrongIds(ids=>ids.includes(question.id)?ids:[...ids,question.id]);onMistake?.(question);}else input.current?.blur();}
 function next(){if(index===questions.length-1){setDone(true);onComplete?.();}else{setIndex(i=>i+1);setAnswer('');setSelected([]);setChecked(false);}}
 const score=questions.length-wrongIds.length;
 if(done)return <section className="white-panel exercise-done"><div className="completion-medal"><Star size={47}/></div><span className="eyebrow">RUNDE ABGESCHLOSSEN</span><h2 ref={heading} tabIndex={-1}>Gut gemacht!</h2><p>{questions.length} Aufgaben bearbeitet.</p><p><strong>{score} von {questions.length}</strong> gleich beim ersten Versuch richtig.</p><p className="muted">{wrongIds.length?'Fehler gehören zum Lernen. Wiederholen hilft dir, sicherer zu werden.':'Alle Aufgaben beim ersten Versuch geschafft!'}</p><div className="completion-points"><Star size={18}/> +15 Lernpunkte</div><button className="primary-button" onClick={onExit}>Zurück zur Auswahl <ArrowLeft size={17}/></button></section>;
 return <section className="white-panel exercise-panel">
  <div className="exercise-top"><button className="text-button" onClick={onExit}><ArrowLeft size={17}/> Zurück zur Auswahl</button><span>{index+1} / {questions.length}</span></div>
  <div className="lesson-track"><span style={{width:`${(index+1)/questions.length*100}%`}}/></div>
  <span className="eyebrow">{title}</span><h2 ref={heading} tabIndex={-1}><MarkedText text={question.prompt} enabled={markings}/></h2>
  {question.context&&<div className="grammar-question-context"><MarkedText text={question.context} enabled={markings} keepFocus/></div>}
  {question.hint&&<details className="grammar-question-hint"><summary>Tipp ansehen</summary><p><MarkedText text={question.hint} enabled={markings}/></p></details>}
  {question.definition&&<blockquote className="definition-card">{question.definition}</blockquote>}
  {question.image&&<div className="exercise-art"><ObjectArt name={question.image}/></div>}
  {question.speak&&<><button className="listen-button" onClick={()=>speak(question.speak)}><Volume2 size={22}/> Anhören</button>{soundMessage&&<div role="status" className="notice">{soundMessage}<p>Zum Weiterlesen: <strong>{question.speak}</strong></p></div>}</>}
  {question.masked&&<div className="masked-word" aria-label={`Wort mit Lücke: ${question.masked}`}>{question.masked}</div>}
  {question.tokens?<><p className="muted">Tippe die Wortgruppen in der richtigen Reihenfolge an.</p><div className="sentence-slots grammar-token-slots" aria-label="Dein Satz">{value||'Hier entsteht dein Satz …'}</div><div className="token-bank">{question.tokens.map(t=><button key={t.index} disabled={selected.includes(t.index)||(checked&&correct)} onClick={()=>{setSelected(a=>[...a,t.index]);setChecked(false);}}>{t.word}</button>)}</div><div className="letter-tools"><button disabled={!selected.length||(checked&&correct)} onClick={()=>{setSelected(a=>a.slice(0,-1));setChecked(false);}}><ArrowLeft size={15}/> Letzte Wortgruppe zurück</button><button disabled={!selected.length||(checked&&correct)} onClick={()=>{setSelected([]);setChecked(false);}}><RotateCcw size={15}/> Neu legen</button></div></>:
   question.letters?<><div className="letter-slots" aria-label="Dein Wort">{value||'Tippe auf die Buchstaben …'}</div><div className="letter-bank">{question.letters.map(l=><button key={l.index} aria-label={`Buchstabe ${l.letter}, Kärtchen ${l.index+1}`} disabled={selected.includes(l.index)||(checked&&correct)} onClick={()=>{setSelected(a=>[...a,l.index]);setChecked(false);}}>{l.letter}</button>)}</div><div className="letter-tools"><button disabled={!selected.length||(checked&&correct)} onClick={()=>{setSelected(a=>a.slice(0,-1));setChecked(false);}}><ArrowLeft size={15}/> Letzten zurück</button><button disabled={!selected.length||(checked&&correct)} onClick={()=>{setSelected([]);setChecked(false);}}><RotateCcw size={15}/> Neu legen</button></div></>:
   question.pictureOptions?<div className="test-picture-options">{question.pictureOptions.map((option,i)=><button key={option.label} aria-label={`Bild ${i+1}`} aria-pressed={answer===option.label} disabled={checked&&correct} className={answer===option.label?'selected':''} onClick={()=>{setAnswer(option.label);setChecked(false);}}><ObjectArt name={option.image}/><span>{i+1}</span></button>)}</div>:
   question.options?<div className="exercise-options">{question.options.map(option=><button key={option} aria-pressed={answer===option} className={`${answer===option?'selected':''} ${checked&&answer===option?(correct?'correct':'wrong'):''}`} disabled={checked&&correct} onClick={()=>{setAnswer(option);setChecked(false);}}>{option}</button>)}</div>:
   <form onSubmit={check} className="answer-form"><label htmlFor="exercise-answer">{question.masked?`Fehlende Buchstaben der Reihe nach (${question.missingPositions?.length||1})`:'Deine Antwort'}</label><input ref={input} id="exercise-answer" value={answer} disabled={checked&&correct} onChange={e=>{setAnswer(e.target.value);setChecked(false);}} maxLength={question.masked?(question.missingPositions?.length||1):60} autoComplete="off" autoCorrect="off" spellCheck={false}/><button type="submit" hidden>Antwort prüfen</button></form>}
  {checked&&<div className={`feedback ${correct?'success':'retry'}`} role="status">{correct?<Check size={18}/>:<RotateCcw size={18}/>}<span>{correct?'Richtig! ':'Noch nicht ganz. '}<MarkedText text={question.explanation} enabled={markings}/></span></div>}
  <button className="primary-button lesson-next" disabled={!value.trim()} onClick={checked&&correct?next:check}>{checked&&correct?(index===questions.length-1?'Runde abschließen':'Nächste Frage'):'Prüfen'} <ArrowRight size={17}/></button>
 </section>;
}
