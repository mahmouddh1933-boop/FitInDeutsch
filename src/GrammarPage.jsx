import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,Search,Volume2,Highlighter} from 'lucide-react';
import {grammarTopics,grammarQuestions,grammarSearchText,grammarTaskCount} from './grammar';
import {plainGrammar} from './grammar/helpers';
import {MarkedText,MarkLegend} from './MarkedText';
import {Exercise} from './Exercise';
import {useBackNavigation} from './navigation';
import './grammar.css';
export function GrammarPage({progress,speak,soundMessage,onComplete,onMistake,initialTopicId=null}){
 const [grade,setGrade]=useState(grammarTopics.find(t=>t.id===initialTopicId)?.grade||1),[query,setQuery]=useState(''),[selected,setSelected]=useState(()=>grammarTopics.find(t=>t.id===initialTopicId)||null),[active,setActive]=useState(false),[markings,setMarkings]=useState(true);
 const heading=useRef(null);
 useBackNavigation(()=>active?setActive(false):setSelected(null),!!selected);
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});},[selected?.id,active]);
 const showing=grammarTopics.filter(t=>t.grade===grade&&grammarSearchText(t).toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de')));
 function toggle(){setMarkings(m=>!m);}
 if(selected&&active)return <><div className="grammar-practice-tools"><button onClick={toggle} aria-pressed={markings}><Highlighter size={16}/>{markings?'Markierungen ausblenden':'Markierungen anzeigen'}</button></div><Exercise title={`Klasse ${selected.grade} · ${selected.title}`} questions={grammarQuestions(selected)} onExit={()=>setActive(false)} onComplete={()=>onComplete(`grammar:${selected.id}`)} onMistake={onMistake} speak={speak} soundMessage={soundMessage} markings={markings}/></>;
 if(selected)return <section className="white-panel grammar-detail">
  <div className="grammar-detail-top"><button className="text-button" onClick={()=>setSelected(null)}><ArrowLeft size={16}/> Zurück zu Klasse {grade}</button><button className="marking-toggle" onClick={toggle} aria-pressed={markings}><Highlighter size={16}/>{markings?'Markierungen ausblenden':'Markierungen anzeigen'}</button></div>
  <span className="grammar-emoji" aria-hidden="true">{selected.icon}</span><span className="eyebrow">KLASSE {selected.grade}{selected.supplement?' · ZUSATZTHEMA':''} · VERSTEHEN UND AUSPROBIEREN</span><h2 ref={heading} tabIndex={-1}>{selected.title}</h2>
  <p className="grammar-lead"><MarkedText text={selected.rule} enabled={markings}/></p><MarkLegend skills={selected.skills} enabled={markings}/>
  <ol className="grammar-steps">{selected.steps.map((step,i)=><li key={i}><span>{i+1}</span><p><MarkedText text={step} enabled={markings}/></p></li>)}</ol>
  {selected.infoTable&&<div className="grammar-table-wrap grammar-info-table"><table><caption>{selected.infoTable.caption}</caption><thead><tr>{selected.infoTable.headers.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{selected.infoTable.rows.map((row,index)=><tr key={index}>{row.map((value,i)=>i===0?<th key={i} scope="row">{value}</th>:<td key={i}>{value}</td>)}</tr>)}</tbody></table></div>}
  {selected.caseTable&&<p className="table-scroll-hint">Weitere Spalten: Du kannst die Tabelle seitlich verschieben.</p>}
  {selected.caseTable&&<div className="grammar-table-wrap"><table><caption>Beispielwörter mit bestimmtem Artikel in den vier Fällen</caption><thead><tr>{['Fall','Frage','Maskulin','Feminin','Neutral','Mehrzahl'].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{selected.caseTable.map(row=><tr key={row[0]}>{row.map((value,i)=>i===0?<th scope="row" key={i}>{value}</th>:<td key={i}>{value}</td>)}</tr>)}</tbody></table></div>}
  {selected.timeline&&<ol className="grammar-timeline" aria-label="Reihenfolge der Ereignisse">{selected.timeline.map(event=><li key={event.title}><strong>{event.title}</strong><span>{event.text}</span></li>)}</ol>}
  <div className="section-heading grammar-examples-heading"><h3>Schau dir die Beispiele an</h3><button className="text-button" onClick={()=>speak(selected.examples.map(e=>plainGrammar(e.text)+'. '+e.note).join(' '))}><Volume2 size={17}/> Alle Beispiele anhören</button></div>
  <div className="grammar-examples">{selected.examples.map((example,i)=><article key={i}><span className="eyebrow">BEISPIEL {i+1}</span><p><MarkedText text={example.text} enabled={markings}/></p><small>{example.note}</small><button onClick={()=>speak(plainGrammar(example.text))} aria-label={`Beispiel ${i+1} anhören`}><Volume2 size={17}/></button></article>)}</div>
  <div className="grammar-pitfall"><strong>Achte darauf</strong><p><MarkedText text={selected.pitfall} enabled={markings}/></p></div><p className="sound-status" role="status">{soundMessage}</p>
  <div className="grammar-start"><div><strong>Jetzt bist du dran.</strong><p>12 Aufgaben mit Tipps und erklärenden Rückmeldungen. Ohne Zeitdruck.</p></div><button className="primary-button" onClick={()=>setActive(true)}>Jetzt üben · {selected.questions.length} Aufgaben <ArrowRight size={17}/></button></div>
 </section>;
 return <>
  <div className="catalog-summary"><BookOpen size={22}/><span><strong>{grammarTopics.length} Themen</strong> · {grammarTaskCount} Aufgaben · Erklärungen und markierte Beispiele</span></div>
  <section className="grammar-grade-section"><h2 ref={heading} tabIndex={-1}>Welche Klasse möchtest du entdecken?</h2><p>Die Klassen sind eine Orientierung nach deiner Themenliste. Alle Themen sind frei zugänglich. Klasse 2 enthält zusätzlich sechs bekannte Grundlagen.</p><div className="grammar-grades" aria-label="Klasse auswählen">{[1,2,3,4].map(g=><button key={g} aria-pressed={grade===g} onClick={()=>{setGrade(g);setQuery('');}}><strong>Klasse {g}</strong><span>{grammarTopics.filter(t=>t.grade===g).length} Themen</span></button>)}</div></section>
  <label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Thema in Klasse ${grade} suchen …`} aria-label="Grammatikthema suchen"/></label>
  <div className="grammar-grid">{showing.map((t,i)=><button key={t.id} className="grammar-card" onClick={()=>setSelected(t)}><span className="grammar-emoji" aria-hidden="true">{t.icon}</span><span className="eyebrow">KLASSE {grade} · {t.supplement?'ZUSATZ':`THEMA ${String(i+1).padStart(2,'0')}`}</span><h3>{t.title}</h3><p>{plainGrammar(t.examples[0].text)}</p><span className="grammar-card-bottom">{progress.activities?.[`grammar:${t.id}`]?<><Check size={16}/> Schon geübt</>:`${t.questions.length} Aufgaben`}<ArrowRight size={16}/></span></button>)}</div>
  {!showing.length&&<div className="empty-state"><Search size={28}/><h3>Hier gibt es keinen Treffer.</h3><p>Lösche die Suche oder wähle eine andere Klasse.</p></div>}
 </>;
}
