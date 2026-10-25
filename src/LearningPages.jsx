import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,RotateCcw,Volume2,Star} from 'lucide-react';
import {topics,wordCount} from './data';
import {ObjectArt} from './Art';
import {alphabet,alphabetQuestions,modes,makeQuestions,normalize} from './learning';
import {Exercise} from './Exercise';
export {GrammarPage} from './GrammarPage';
import './learning.css';
import TimedTest from './TimedTest';
import {useBackNavigation} from './navigation';
import {testModes,testSizes,testDurations,createTest} from './testing';
import {SoundPatternCatalog,SoundPatternDetail} from './SoundPatterns';
import {soundPatterns} from './phonics';

export function Vocabulary({progress,topicId,onTopicChange,onLearnWords,onTestFinished,speak,soundMessage,onStopSpeech}){
 const [query,setQuery]=useState(''),[card,setCard]=useState(0),[stage,setStage]=useState('learn'),[active,setActive]=useState(null),[mode,setMode]=useState(null),[count,setCount]=useState(5),[seconds,setSeconds]=useState(60);
 const topic=topics.find(t=>t.id===topicId)||topics[0],shown=topic.words.filter(([label])=>normalize(label).includes(normalize(query))),[label,image]=topic.words[card];
 const setupHeading=useRef(null);
 useBackNavigation(()=>{if(active){setActive(null);setStage('setup');}else setStage('learn');},!!active||stage==='setup');
 useEffect(()=>{if(stage==='setup')setupHeading.current?.focus();},[stage]);
 function choose(id){onStopSpeech();onTopicChange(id);setQuery('');setCard(0);setStage('learn');setMode(null);}
 function begin(){onStopSpeech();setActive(createTest(topic,mode,count,seconds));}
 if(active)return <TimedTest test={active} onExit={()=>{setActive(null);setStage('setup');}} onFinished={onTestFinished} speak={speak} soundMessage={soundMessage} onStopSpeech={onStopSpeech}/>;
 if(stage==='setup')return <section className="white-panel test-setup">
  <button className="text-button" onClick={()=>setStage('learn')}><ArrowLeft size={17}/> Zurück zu den 20 Wörtern</button>
  <span className="eyebrow">{topic.title} · DEIN TEST, DEINE WAHL</span><h2 ref={setupHeading} tabIndex={-1}>Wie möchtest du dich testen?</h2><p className="muted">Wähle eine Testart, die Anzahl der Wörter und dein Zeitlimit.</p>
  <fieldset><legend>1. Deine Testart</legend><div className="mode-grid">{testModes.map(m=><label key={m.id} className={`mode-card ${mode===m.id?'active':''}`}><input type="radio" name="test-mode" value={m.id} checked={mode===m.id} onChange={()=>setMode(m.id)}/><span aria-hidden="true">{m.icon}</span><strong>{m.title}</strong>{m.difficulty&&<em className="test-difficulty">{m.difficulty}</em>}<small>{m.description}</small></label>)}</div></fieldset>
  <fieldset><legend>2. Wie viele Wörter?</legend><div className="test-setting-options">{testSizes.map(n=><label key={n}><input type="radio" name="word-count" value={n} checked={count===n} onChange={()=>setCount(n)}/>{n} Wörter</label>)}</div></fieldset>
  <fieldset><legend>3. Wie viel Zeit?</legend><div className="test-setting-options">{testDurations.map(n=><label key={n}><input type="radio" name="test-duration" value={n} checked={seconds===n} onChange={()=>setSeconds(n)}/>{n} Sekunden</label>)}</div></fieldset>
  <div className="test-start-summary"><p><strong>{count} zufällige Wörter</strong> aus „{topic.title}“ · <strong>{seconds} Sekunden</strong> für den gesamten Test.</p><p>Erst „Jetzt starten“ zieht die Wörter und startet die Uhr. Nach Ablauf der Zeit endet der Test automatisch. Antworten und Lösungen siehst du am Ende. Wenn du den Test verlässt, wird er abgebrochen.</p></div>
  <button className="primary-button" disabled={!mode} onClick={begin}>Jetzt starten <ArrowRight size={17}/></button>
 </section>;
 return <div className="vocab-page">
  <div className="catalog-summary"><BookOpen size={22}/><span><strong>{wordCount} Wörter</strong> · {topics.length} Themen · jeweils 20 Wörter zum freien Lernen</span></div>
  <label className="field-label" htmlFor="vocab-topic">Dein Thema</label><select id="vocab-topic" className="learning-select" value={topic.id} onChange={e=>choose(e.target.value)}>{topics.map(t=><option key={t.id} value={t.id}>{t.title} · {t.words.length} Wörter</option>)}</select>
  <section className="white-panel"><div className="study-heading"><div><h2>{topic.title}</h2><p className="muted">Lerne alle 20 Wörter in deinem Tempo. Du entscheidest, wann du bereit für einen Test bist.</p></div><button className="primary-button" onClick={()=>setStage('setup')}>Test starten <ArrowRight size={17}/></button></div>
   <div className="study-card"><span className="eyebrow">WORT {card+1} VON {topic.words.length}</span><ObjectArt name={image}/><h3>{label}</h3><button className="listen-button" onClick={()=>speak(label)}><Volume2 size={20}/> Wort anhören</button><button className="text-button mark-word" disabled={progress.learned.includes(label)} onClick={()=>onLearnWords([label])}>{progress.learned.includes(label)?<><Check size={16}/> Als gelernt markiert</>:'Als gelernt markieren'}</button><div className="study-navigation"><button disabled={card===0} onClick={()=>{onStopSpeech();setCard(i=>i-1);}}><ArrowLeft size={17}/> Voriges Wort</button><span>{card+1} / {topic.words.length}</span><button disabled={card===topic.words.length-1} onClick={()=>{onStopSpeech();setCard(i=>i+1);}}>Nächstes Wort <ArrowRight size={17}/></button></div></div>
   <p className="sound-status" role="status">{soundMessage}</p><h3 className="word-list-title">Alle 20 Wörter auf einen Blick</h3><label className="search-box vocab-search"><input placeholder="Wort in diesem Thema suchen …" aria-label="Wort in diesem Thema suchen" value={query} onChange={e=>setQuery(e.target.value)}/></label>
   <div className="word-gallery">{shown.map(([word,picture])=><div className="word-tile" key={word}><button className="word-select" onClick={()=>{onStopSpeech();setCard(topic.words.findIndex(w=>w[0]===word));}} aria-label={`${word} lernen`}><ObjectArt name={picture}/><strong>{word}</strong></button><button onClick={()=>speak(word)} aria-label={`${word} anhören`}><Volume2 size={18}/></button>{progress.learned.includes(word)&&<span className="word-learned"><Check size={12}/> Gelernt</span>}</div>)}</div>
   {!shown.length&&<p className="muted">In diesem Thema gibt es keinen Treffer. Wähle ein anderes Thema oder lösche die Suche.</p>}
   <div className="study-bottom"><button className="text-button" disabled={topic.words.every(([w])=>progress.learned.includes(w))} onClick={()=>onLearnWords(topic.words.map(w=>w[0]))}>Alle 20 Wörter als gelernt markieren</button><button className="primary-button" onClick={()=>setStage('setup')}>Test starten <ArrowRight size={17}/></button></div>
  </section>
 </div>;
}
export function AlphabetPage({speak,soundMessage,onComplete,onMistake,initialLetter=null,progress}){
 const [selected,setSelected]=useState(()=>alphabet.find(l=>l.upper===initialLetter)||alphabet[0]),[active,setActive]=useState(null),[part,setPart]=useState(0),[soundId,setSoundId]=useState(null),[soundRound,setSoundRound]=useState(0);
 function showSoundCatalog(){setSoundId(null);requestAnimationFrame(()=>document.querySelector('.sound-pattern-catalog')?.scrollIntoView({block:'start'}));}
 function exitExercise(){setActive(null);if(!soundId&&active?.id.startsWith('phonics:'))requestAnimationFrame(()=>document.querySelector('.sound-pattern-catalog')?.scrollIntoView({block:'start'}));}
 useBackNavigation(()=>active?exitExercise():showSoundCatalog(),!!active||!!soundId);
 if(active)return <Exercise key={active.id} title={active.title} questions={active.questions} onExit={exitExercise} onComplete={()=>onComplete(active.id)} onMistake={onMistake} speak={speak} soundMessage={soundMessage}/>;
 if(soundId)return <SoundPatternDetail key={soundId} pattern={soundPatterns.find(p=>p.id===soundId)} onBack={showSoundCatalog} round={soundRound} onRoundChange={setSoundRound} onPractice={setActive} speak={speak} soundMessage={soundMessage} progress={progress}/>;
 return <div><section className="white-panel"><h2>Von A bis Z – und noch mehr</h2><p className="muted">26 Buchstaben, dazu Ä, Ö, Ü und ß. Tippe einen Buchstaben an. Hör dir seinen Namen und das Beispielwort getrennt an.</p><div className="alphabet-grid">{alphabet.map(l=><button key={l.upper} aria-label={`Buchstabe ${l.upper}`} aria-pressed={selected.upper===l.upper} onClick={()=>setSelected(l)}>{l.upper}<small>{l.lower}</small></button>)}</div><div className="letter-detail"><div><span className="big-letter">{selected.upper} <small>{selected.lower}</small></span><p>{selected.upper==='ß'?'ß heißt Eszett oder scharfes S. Es steht nicht am Wortanfang. Der Großbuchstabe ẞ ist möglich.':`${selected.upper} ist der Großbuchstabe. ${selected.lower} ist der Kleinbuchstabe.`}</p><button className="listen-button" onClick={()=>speak(selected.sound)}><Volume2 size={18}/> Buchstabenname anhören</button></div><div className="letter-example"><ObjectArt name={selected.image}/><strong>{selected.word}</strong><button className="text-button" onClick={()=>speak(selected.word)}><Volume2 size={17}/> Beispiel anhören</button></div></div><p role="status" className="sound-status">{soundMessage}</p><p className="notice">Ein Buchstabenname ist nicht immer der Laut im Wort. Zum Beispiel heißt B „Be“, aber in „Buch“ hörst du am Anfang nur den kurzen Laut.</p></section>
  <section className="white-panel"><h2>Buchstaben üben</h2><label className="field-label" htmlFor="alphabet-part">Deine kleine Runde</label><select id="alphabet-part" className="learning-select" value={part} onChange={e=>setPart(Number(e.target.value))}>{Array.from({length:5},(_,i)=><option key={i} value={i}>Runde {i+1}: {alphabet[i*6].upper} bis {alphabet[Math.min(i*6+5,29)].upper}</option>)}</select><div className="mode-grid">{[['lower','Groß & klein','Aa'],['missing','Buchstaben ergänzen','_'],['listen','Buchstaben hören','🎧']].map(([id,title,icon])=><button className="mode-card" key={id} onClick={()=>setActive({id:`alphabet:${id}:${part}`,title,questions:alphabetQuestions(id).slice(part*6,part*6+6)})}><span>{icon}</span><strong>{title}</strong><small>6 Aufgaben</small></button>)}</div></section>
  <SoundPatternCatalog onSelect={id=>{setSoundRound(0);setSoundId(id);window.scrollTo(0,0);}} onPractice={setActive} progress={progress}/>
 </div>;
}
export function ReviewPage({progress,onComplete,speak,soundMessage,onMistake,setProgress}){
 const [active,setActive]=useState(null);
 useBackNavigation(()=>setActive(null),!!active);
 if(active)return <Exercise title="Fehler wiederholen" questions={active} onExit={()=>setActive(null)} onComplete={()=>{onComplete('review');const ids=new Set(active.map(q=>q.id));setProgress(p=>({...p,mistakes:p.mistakes.filter(q=>!ids.has(q.id))}));}} onMistake={onMistake} speak={speak} soundMessage={soundMessage}/>;
 return <section className="white-panel review-panel"><RotateCcw size={34}/><h2>{progress.mistakes.length?'Aus Fehlern wird Wissen.':'Hier ist Platz zum Weiterlernen.'}</h2><p className="muted">{progress.mistakes.length?`${progress.mistakes.length} ${progress.mistakes.length===1?'Aufgabe wartet':'Aufgaben warten'} auf dich. Wir üben in kleinen Runden mit höchstens 6 Aufgaben.`:'Wenn eine Antwort in Wortschatz, Alphabet oder Grammatik noch nicht stimmt, sammeln wir die Aufgabe hier. Dein Fortschritt bleibt erhalten.'}</p>{progress.mistakes.length>0&&<button className="primary-button" onClick={()=>setActive(progress.mistakes.slice(0,6))}>Fehler wiederholen <ArrowRight size={17}/></button>}</section>;
}
