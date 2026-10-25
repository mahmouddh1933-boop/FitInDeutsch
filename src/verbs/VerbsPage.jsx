import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,BookOpen,Highlighter,Search,Volume2} from 'lucide-react';
import {verbs,verbTenses,verbVariants,auxiliaryChoices,verbNotes,conjugationRows,searchVerbs,verbLetter} from './conjugation';
import {useBackNavigation} from '../navigation';
import './verbs.css';
export function VerbsPage({speak,soundMessage}){
 const [selected,setSelected]=useState(null),[query,setQuery]=useState(''),[letter,setLetter]=useState('all'),[tense,setTense]=useState('present'),[marks,setMarks]=useState(true),[variant,setVariant]=useState(0),[auxiliary,setAuxiliary]=useState('haben');
 const heading=useRef(null);useBackNavigation(()=>setSelected(null),!!selected);
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo(0,0);},[selected]);
 function choose(id){const v=verbs.find(v=>v.id===id);setSelected(id);setTense('present');setVariant(0);setAuxiliary(v.auxiliary);}
 if(!selected){const shown=searchVerbs(query,letter);return <>
  <div className="catalog-summary"><BookOpen size={23}/><span><strong>500 häufige Verben</strong> · alphabetisch von A bis Z · fünf Formen zum Entdecken</span></div>
  <label className="search-box"><Search size={19}/><input aria-label="Verb suchen" placeholder="Verb suchen, z. B. gehen …" value={query} onChange={e=>setQuery(e.target.value)}/></label>
  <div className="verb-alphabet" aria-label="Verben nach Anfangsbuchstaben"><button aria-pressed={letter==='all'} onClick={()=>setLetter('all')}>Alle</button>{Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(l=><button key={l} disabled={!verbs.some(v=>verbLetter(v.id)===l)} aria-pressed={letter===l} onClick={()=>setLetter(l)}>{l}</button>)}</div>
  <p className="reading-tip">Wähle ein Verb. Zuerst siehst du das Präsens. Darüber kannst du Perfekt, Präteritum, Plusquamperfekt oder Imperativ auswählen. Verben mit sich sind nach dem Grundverb einsortiert.</p>
  <p className="verb-count" role="status">{shown.length} von 500 Verben</p>
  <div className="verb-list">{Array.from(new Set(shown.map(v=>verbLetter(v.id)))).map(l=><section key={l}><h2>{l}</h2><div>{shown.filter(v=>verbLetter(v.id)===l).map(v=><button key={v.id} onClick={()=>choose(v.id)}>{v.id}{v.reflexive&&<small>mit sich</small>}</button>)}</div></section>)}</div>
  {!shown.length&&<div className="empty-state"><Search size={28}/><h3>Kein Verb gefunden</h3><p>Ändere deinen Suchbegriff oder wähle „Alle“.</p></div>}
 </>;}
 const base=verbs.find(v=>v.id===selected),variants=verbVariants(base),verb=variants[variant],rows=conjugationRows(verb,tense,auxiliary),notes=verbNotes(verb),definition=verbTenses.find(t=>t.id===tense);
 return <section className="white-panel verb-detail">
  <div className="study-heading"><button className="text-button" onClick={()=>setSelected(null)}><ArrowLeft size={16}/> Zurück zu den 500 Verben</button><button className="text-button" aria-pressed={marks} onClick={()=>setMarks(x=>!x)}><Highlighter size={16}/>{marks?'Markierungen ausblenden':'Markierungen anzeigen'}</button></div>
  <span className="eyebrow">VERBEN KONJUGIEREN · SCHRITT FÜR SCHRITT</span><h2 ref={heading} tabIndex={-1}>{verb.reflexive?'sich ':''}{verb.id}</h2>
  <label className="field-label" htmlFor="verb-switch">Verb wechseln</label><select id="verb-switch" className="learning-select" value={selected} onChange={e=>choose(e.target.value)}>{verbs.map(v=><option key={v.id} value={v.id}>{v.id}{v.reflexive?' (mit sich)':''}</option>)}</select>
  <label className="field-label" htmlFor="verb-tense">Welche Form möchtest du sehen?</label><select id="verb-tense" className="learning-select verb-tense" value={tense} onChange={e=>setTense(e.target.value)}>{verbTenses.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select>
  {variants.length>1&&<><label className="field-label" htmlFor="verb-meaning">Bedeutung / Verwendung</label><select id="verb-meaning" className="learning-select" value={variant} onChange={e=>{const i=Number(e.target.value);setVariant(i);setAuxiliary(variants[i].auxiliary);}}>{variants.map((v,i)=><option key={i} value={i}>{v.label}</option>)}</select></>}
  {['perfect','pluperfect'].includes(tense)&&auxiliaryChoices(verb).length>1&&<><label className="field-label" htmlFor="verb-auxiliary">Hilfsverb passend zur Verwendung</label><select id="verb-auxiliary" className="learning-select" value={auxiliary} onChange={e=>setAuxiliary(e.target.value)}>{auxiliaryChoices(verb).map(a=><option key={a} value={a}>{a}</option>)}</select></>}
  <div className="verb-explanation"><h3>{definition.title}</h3><p>{definition.explanation}</p>{tense==='pluperfect'&&<p className="verb-example">Beispiel: Als der Unterricht begann, <strong>hatte</strong> ich schon <strong>gefrühstückt</strong>.</p>}</div>
  {marks&&<div className="verb-legend"><span className="verb-mark vm-ending">Endung / Zeitbaustein</span><span className="verb-mark vm-finite">besondere Form</span><span className="verb-mark vm-prefix">trennbarer Teil</span><span className="verb-mark vm-auxiliary">Hilfsverb</span><span className="verb-mark vm-participle">Partizip II</span></div>}
  {rows.length?<><div className="conjugation-table-wrap"><table className="conjugation-table"><caption>{verb.id} · {definition.title}</caption><thead><tr><th scope="col">Person</th><th scope="col">Verbform</th><th scope="col">Hören</th></tr></thead><tbody>{rows.map(row=><tr key={row.pronoun}><th scope="row">{row.pronoun}</th><td>{row.parts.map((part,i)=><span key={i} className={marks&&part.kind!=='space'?`verb-mark vm-${part.kind}`:undefined}>{part.text}</span>)}{tense==='imperative'?'!':''}</td><td><button className="verb-listen" aria-label={`${row.spoken} anhören`} onClick={()=>speak(row.spoken)}><Volume2 size={19}/></button></td></tr>)}</tbody></table></div><button className="listen-button" onClick={()=>speak(rows.map(r=>r.spoken).join(tense==='imperative'?' ':'. '))}><Volume2 size={18}/> Alle Formen anhören</button></>:<p className="reading-tip">Für diese Verwendung gibt es keinen gewöhnlichen Imperativ. Bitte oder Aufforderung lassen sich mit anderen passenden Verben ausdrücken, zum Beispiel „Komm bitte!“.</p>}
  {tense==='imperative'&&rows.length>0&&<p className="reading-tip">Die du- und ihr-Form stehen meistens ohne Personalpronomen. Bei der höflichen Form bleibt Sie erhalten. Bei ich und er/sie/es gibt es keinen entsprechenden Imperativ.</p>}
  {notes.length>0&&<aside className="verb-notes"><h3>Das hilft dir beim Lernen</h3><ul>{notes.map(n=><li key={n}>{n}</li>)}</ul></aside>}
  <p className="sound-status" role="status">{soundMessage}</p>
 </section>;
}
