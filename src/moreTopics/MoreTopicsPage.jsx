import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,Highlighter,Search,Volume2} from 'lucide-react';
import {moreTopics,skillAreas,moreTopicQuestionCount} from './content';
import {MarkedText} from '../MarkedText';
import {plainGrammar} from '../grammar/helpers';
import {useBackNavigation} from '../navigation';
import {LessonWidget,PoetryFeedback} from './Widgets';
import './moreTopics.css';
export function MoreTopicsPage({progress,setProgress,onComplete,onMistake,speak,soundMessage}){
 const [grade,setGrade]=useState(2),[area,setArea]=useState('all'),[query,setQuery]=useState(''),[selected,setSelected]=useState(null);
 const heading=useRef(null);useBackNavigation(()=>setSelected(null),!!selected);useEffect(()=>{window.scrollTo(0,0);heading.current?.focus({preventScroll:true});},[selected]);
 function update(fn){setProgress(p=>{const record=p.moreTopics?.[selected]||{};return {...p,moreTopics:{...p.moreTopics,[selected]:fn(record)}};});}
 function field(key,value){update(r=>({...r,[key]:typeof value==='function'?value(r[key]):value}));}
 if(selected){const topic=moreTopics.find(t=>t.id===selected);return <TopicDetail key={selected} topic={topic} record={progress.moreTopics?.[selected]||{}} done={!!progress.activities?.[`more:${selected}`]} update={update} onMistake={onMistake} onField={field} onComplete={()=>onComplete(`more:${selected}`)} onBack={()=>setSelected(null)} speak={speak} soundMessage={soundMessage}/>;}
 const shown=moreTopics.filter(t=>t.grade===grade&&(area==='all'||t.area===area)&&plainGrammar(`${t.title} ${t.intro}`).toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de')));
 return <>
  <div className="catalog-summary"><BookOpen size={23}/><span><strong>40 neue Themen</strong> · {moreTopicQuestionCount} Wissensfragen · eigene Texte und praktische Lernhilfen</span></div>
  <div className="more-grades">{[[2,'Festigen und erste Texte'],[3,'Mit Kriterien arbeiten'],[4,'Selbstständig anwenden']].map(([g,title])=><button key={g} aria-pressed={grade===g} onClick={()=>{setGrade(g);setQuery('');}}><strong>Klasse {g}</strong><span>{title}</span><small>{moreTopics.filter(t=>t.grade===g).length} Themen</small></button>)}</div>
  <label className="search-box"><Search size={18}/><input aria-label="Zusätzliches Thema suchen" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Thema in dieser Klasse suchen …"/></label>
  <div className="more-area-tabs" aria-label="Lernbereich auswählen"><button aria-pressed={area==='all'} onClick={()=>setArea('all')}>Alle Bereiche</button>{skillAreas.map(a=><button key={a.id} aria-pressed={area===a.id} onClick={()=>setArea(a.id)}>{a.icon} {a.title}</button>)}</div>
  <p className="reading-tip">Die Klassen geben Orientierung. Alle Themen sind frei zugänglich. Wähle ein Thema, lies die Beispiele und probiere die Aufgaben allein oder gemeinsam aus.</p>
  <div className="more-topic-grid">{shown.map(t=><button key={t.id} className="more-topic-card" onClick={()=>setSelected(t.id)}><span className="more-topic-icon" aria-hidden="true">{skillAreas.find(a=>a.id===t.area).icon}</span><span className="eyebrow">KLASSE {t.grade} · {skillAreas.find(a=>a.id===t.area).title.toLocaleUpperCase('de')}</span><h3>{t.title}</h3><p>{t.intro}</p><span>{progress.activities?.[`more:${t.id}`]?<><Check size={16}/> Wissensrunde geübt</>:'Erklären, ausprobieren und selbst schreiben'} <ArrowRight size={16}/></span></button>)}</div>
  {!shown.length&&<div className="empty-state"><Search size={28}/><p>Hier gibt es keinen Treffer. Ändere die Suche oder den Lernbereich.</p></div>}
 </>;
}
function TopicDetail({topic,record,done,update,onMistake,onField,onComplete,onBack,speak,soundMessage}){
 const [marks,setMarks]=useState(true),heading=useRef(null);
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo(0,0);},[]);
 const score=topic.questions.filter(q=>record.checked?.[q.id]&&record.answers?.[q.id]===q.correct).length;
 return <article className="white-panel more-topic-detail">
  <div className="study-heading"><button className="text-button" onClick={onBack}><ArrowLeft size={16}/> Zurück zu Mehr Themen</button><button className="text-button" aria-pressed={marks} onClick={()=>setMarks(v=>!v)}><Highlighter size={16}/>{marks?'Markierungen ausblenden':'Markierungen anzeigen'}</button></div>
  <span className="more-topic-icon" aria-hidden="true">{skillAreas.find(a=>a.id===topic.area).icon}</span><span className="eyebrow">KLASSE {topic.grade} · {skillAreas.find(a=>a.id===topic.area).title.toLocaleUpperCase('de')}</span><h2 ref={heading} tabIndex={-1}>{topic.title}</h2><p className="more-intro">{topic.intro}</p>
  <button className="listen-button" onClick={()=>speak([topic.intro,...topic.steps].map(plainGrammar).join(' '))}><Volume2 size={18}/> Erklärung anhören</button>
  <h3 className="more-section-title">So gehst du vor</h3><ol className="more-steps">{topic.steps.map((step,i)=><li key={i}><span>{i+1}</span><p><MarkedText text={step} enabled={marks}/></p></li>)}</ol>
  <h3 className="more-section-title">Schau dir die Beispiele an</h3><div className="more-examples">{topic.examples.map((text,i)=><article key={i}><span className="eyebrow">BEISPIEL {i+1}</span><p><MarkedText text={text} enabled={marks}/></p><button className="text-button" onClick={()=>speak(plainGrammar(text))} aria-label={`Themenbeispiel ${i+1} anhören`}><Volume2 size={16}/> Beispiel anhören</button></article>)}</div>
  <LessonWidget topic={topic} record={record} onField={onField} speak={speak}/>
  <h3 className="more-section-title">Prüfe dein Wissen</h3><div className="more-quiz">{topic.questions.map(q=><fieldset key={q.id}><legend>{q.prompt}</legend><div className="more-answer-options">{q.options.map(option=><label key={option}><input type="radio" name={q.id} checked={record.answers?.[q.id]===option} onChange={()=>update(r=>({...r,answers:{...r.answers,[q.id]:option},checked:{...r.checked,[q.id]:false}}))}/><span>{option}</span></label>)}</div><button className="text-button" disabled={!record.answers?.[q.id]} onClick={()=>{update(r=>({...r,checked:{...r.checked,[q.id]:true}}));if(record.answers?.[q.id]!==q.correct)onMistake?.({...q,mode:'moreTopics',hint:topic.steps[0]});}}>Antwort prüfen</button>{record.checked?.[q.id]&&<p role="status" className={`feedback ${record.answers?.[q.id]===q.correct?'success':'retry'}`}>{record.answers?.[q.id]===q.correct?'Richtig! ':'Schau noch einmal nach. '}{q.explanation}</p>}</fieldset>)}</div>
  <div className="more-completion"><p>{score} von 3 Wissensfragen richtig geprüft.</p><button className="primary-button" disabled={score<3||done} onClick={onComplete}>{done?<><Check size={17}/> Wissensrunde schon geübt</>:'Wissensrunde abschließen'}</button></div>
  <section className="writing-workspace"><h3>Jetzt selbst ausprobieren</h3><p>{topic.task}</p><label className="field-label" htmlFor="more-draft">Mein Text oder meine Notizen</label><textarea id="more-draft" rows={9} value={typeof record.draft==='string'?record.draft:''} onChange={e=>onField('draft',e.target.value)} placeholder="Hier ist Platz für deinen eigenen Entwurf …"/>
   {topic.widget==='poetry'&&<PoetryFeedback draft={record.draft||''}/>}
   <h4>Meine Prüfliste</h4><div className="writing-criteria">{topic.criteria.map((c,i)=><label key={c}><input type="checkbox" checked={!!record.criteria?.[i]} onChange={()=>onField('criteria',v=>({...v,[i]:!v?.[i]}))}/><span>{c}</span></label>)}</div><p className="muted">Dein Entwurf und deine Häkchen bleiben in diesem Browser. Eigene Texte, Vorträge und Schrift werden nicht automatisch benotet. Nutze die Prüfliste und besprecht eure Ergebnisse.</p>
  </section><p className="sound-status" role="status">{soundMessage}</p><button className="text-button" onClick={onBack}><ArrowLeft size={16}/> Zurück zur Themenauswahl</button>
 </article>;
}
