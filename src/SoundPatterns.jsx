import React, {useEffect, useRef} from 'react';
import {ArrowLeft, ArrowRight, BookOpen, Check, Headphones, Volume2} from 'lucide-react';
import {ObjectArt} from './Art';
import {soundPatterns, soundQuestions, soundExampleCount, soundTaskCount, mixedSoundQuestions} from './phonics';
import './phonics.css';

function PatternWord({word, pattern, at = word.toLocaleLowerCase('de').lastIndexOf(pattern)}) {
 if (at < 0) return word;
 return <>{word.slice(0, at)}<mark className="phonics-mark">{word.slice(at, at + pattern.length)}</mark>{word.slice(at + pattern.length)}</>;
}
function ExamplePicture({example}) {
 if (!example.image) return <span className="phonics-word-symbol" aria-hidden="true">Aa</span>;
 return <span className={`phonics-picture ${example.count > 1 ? 'phonics-plural' : ''}`} aria-hidden="true">{Array.from({length: example.count}, (_, i) => <ObjectArt key={i} name={example.image}/>)}</span>;
}
export function SoundPatternCatalog({onSelect, onPractice, progress}) {
 return <section className="white-panel sound-pattern-catalog">
  <span className="eyebrow">WEITER MIT LAUTEN UND WORTBAUSTEINEN</span>
  <h2>Buchstaben, die zusammen klingen</h2>
  <p className="phonics-lead">Manche Buchstaben ergeben einen Laut, andere eine Lautverbindung. Entdecke die Unterschiede, höre ganze Wörter und übe danach in kleinen Runden.</p>
  <div className="phonics-summary"><BookOpen size={20}/><span><strong>{soundPatterns.length} Verbindungen</strong> · {soundExampleCount} Beispielwörter · {soundTaskCount} Aufgaben</span></div>
  <div className="sound-groups sound-pattern-grid">{soundPatterns.map(pattern => {
   const sample = pattern.examples[0], rounds = soundQuestions(pattern).length / 6;
   const done = Array.from({length: rounds}, (_, i) => progress?.activities?.[`phonics:${pattern.id}:round-${i + 1}`]).filter(Boolean).length;
   return <button className="sound-pattern-card" key={pattern.id} onClick={() => onSelect(pattern.id)} aria-label={`${pattern.title} lernen und üben`}>
    <strong>{pattern.title}</strong><ExamplePicture example={sample}/><span className="phonics-sample"><PatternWord word={sample.word} pattern={pattern.id} at={sample.at}/></span>
    <p>{pattern.description}</p><small>{pattern.examples.length} Beispiele · {soundQuestions(pattern).length} Aufgaben</small>
    {done > 0 && <small className="phonics-done"><Check size={13}/>{done} von {rounds} Runden schon geübt</small>}
    <span className="phonics-card-action">Entdecken und üben <ArrowRight size={15}/></span>
   </button>;
  })}</div>
  <div className="phonics-mixed"><div><h3>Alles gemischt üben</h3><p>Zwölf zufällige Aufgaben aus zwölf verschiedenen Verbindungen. Ohne Zeitdruck.</p></div><button className="secondary-button" onClick={() => onPractice({id: 'phonics:mixed', title: 'Buchstabenverbindungen · Mischrunde', questions: mixedSoundQuestions()})}>Mischrunde starten <ArrowRight size={17}/></button></div>
 </section>;
}
export function SoundPatternDetail({pattern, onBack, onPractice, speak, soundMessage, progress, round, onRoundChange}) {
 const heading = useRef(null);
 const questions = soundQuestions(pattern), rounds = questions.length / 6;
 useEffect(() => {heading.current?.focus({preventScroll: true}); window.scrollTo({top: 0, behavior: 'instant'});}, [pattern.id]);
 const finished = !!progress?.activities?.[`phonics:${pattern.id}:round-${round + 1}`];
 return <section className="white-panel sound-pattern-detail">
  <button className="text-button" onClick={onBack}><ArrowLeft size={16}/> Zurück zu den Buchstabenverbindungen</button>
  <div className="phonics-detail-heading"><span className="phonics-big" aria-hidden="true">{pattern.title}</span><div><span className="eyebrow">HÖREN · ENTDECKEN · SELBST AUSPROBIEREN</span><h2 ref={heading} tabIndex={-1}>{pattern.title} entdecken und üben</h2><p>{pattern.description}</p></div></div>
  <p className="reading-tip">Höre zuerst das ganze Wort. Sprecht danach gemeinsam die markierte Stelle. Ein Buchstabenname ist nicht immer der Laut im Wort.</p>
  <div className="phonics-practice-jump"><span>{pattern.examples.length} Beispielwörter · {questions.length} Aufgaben</span><button className="text-button" onClick={() => document.getElementById('phonics-practice')?.scrollIntoView({behavior: 'smooth', block: 'start'})}>Direkt zu den Übungen <ArrowRight size={16}/></button></div>
  {pattern.sections.map((section, index) => <section className="phonics-rule" key={section.title} aria-labelledby={`phonics-rule-${index}`}><h3 id={`phonics-rule-${index}`}>{section.title}</h3><p>{section.rule}</p>
   <div className="phonics-examples">{section.examples.map(example => <button key={example.word} onClick={() => speak(example.word)} aria-label={`${example.word} anhören`}>
    <ExamplePicture example={example}/><strong><PatternWord word={example.word} pattern={pattern.id}/></strong><span><Volume2 size={16}/> Wort anhören</span>
   </button>)}</div>
  </section>)}
  <section className="phonics-sentences"><h3>Die Verbindung im Satz</h3>{pattern.sentences.map(sentence => <article key={sentence}><p>{sentence}</p><button className="listen-button" onClick={() => speak(sentence)} aria-label={`Satz anhören: ${sentence}`}><Volume2 size={17}/> Satz anhören</button></article>)}</section>
  <aside className="phonics-tips"><h3>Genau hinhören</h3><ul>{pattern.tips.map(tip => <li key={tip}>{tip}</li>)}</ul></aside>
  <section className="phonics-practice" id="phonics-practice"><Headphones size={25}/><h3>Jetzt bist du dran</h3><p>Jede Runde hat sechs Aufgaben: Buchstaben ergänzen, Wörter hören und auswählen, Schreibweisen vergleichen oder Regeln anwenden. Du kannst Hinweise öffnen und Fehler verbessern.</p>
   <label className="field-label" htmlFor="phonics-round">Deine Übungsrunde</label><select className="learning-select" id="phonics-round" value={round} onChange={event => onRoundChange(Number(event.target.value))}>{Array.from({length: rounds}, (_, i) => <option key={i} value={i}>Runde {i + 1} · Aufgaben {i * 6 + 1}–{i * 6 + 6}{progress?.activities?.[`phonics:${pattern.id}:round-${i + 1}`] ? ' · Schon geübt' : ''}</option>)}</select>
   {finished && <p className="phonics-done"><Check size={16}/> Diese Runde hast du schon geübt. Du darfst sie wiederholen.</p>}
   <button className="primary-button" onClick={() => onPractice({id: `phonics:${pattern.id}:round-${round + 1}`, title: `${pattern.title} · Runde ${round + 1}`, questions: questions.slice(round * 6, round * 6 + 6)})}>Runde starten · 6 Aufgaben <ArrowRight size={17}/></button>
  </section><p className="sound-status" role="status">{soundMessage}</p><button className="text-button" onClick={onBack}><ArrowLeft size={16}/> Zurück zu allen Verbindungen</button>
 </section>;
}
