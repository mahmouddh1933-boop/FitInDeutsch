import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,Download,Printer} from 'lucide-react';
import {MarkedText} from '../MarkedText';
import {ObjectArt} from '../Art';
import {PaintPicture,SyllableWord} from './ReaderArt';
import {downloadWorksheetPdf} from './pdf';
import {AutumnVisual} from '../autumn/Visuals';
export function WorksheetDocument({worksheet}){return <div id="print-sheet" className="worksheet-document"><header><span>FIT IN DEUTSCH · LERNMATERIAL</span><h1>{worksheet.title}</h1><p>{worksheet.subtitle}</p></header>{worksheet.sections.map((section,i)=><section key={i} className={`worksheet-section ${section.solution?'worksheet-solutions':''}`}><h2>{section.title}</h2>{section.blocks.map(block=><WorksheetBlock key={block.id} block={block}/>)}</section>)}</div>;}
function WorksheetBlock({block}){
 if(block.kind==='diagram')return <figure className="worksheet-diagram"><div data-pdf-visual={`${block.id}-0`}><AutumnVisual spec={block.spec}/></div>{block.caption&&<figcaption>{block.caption}</figcaption>}</figure>;
 if(block.kind==='text')return <p><MarkedText text={block.text}/></p>;
 if(block.kind==='list')return <ul>{block.items.map((item,i)=><li key={i}><MarkedText text={item}/></li>)}</ul>;
 if(block.kind==='question')return <div className="worksheet-question"><p><MarkedText text={block.prompt} keepFocus/></p>{block.options.length?<div className="worksheet-options">{block.options.map(option=><span key={option}>□ {option}</span>)}</div>:<div className="worksheet-answer-lines">{Array.from({length:block.lines},(_,i)=><div key={i}/>)}</div>}</div>;
 if(block.kind==='table')return <div className="worksheet-table"><table><caption>{block.caption}</caption><thead><tr>{block.headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{block.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}><MarkedText text={cell}/></td>)}</tr>)}</tbody></table></div>;
 if(block.kind==='cards')return <div className="worksheet-cards">{block.items.map((item,i)=><div key={i}>{item}</div>)}</div>;
 if(block.kind==='syllables')return <div className="worksheet-syllables">{block.words.map(w=><SyllableWord key={w.id} entry={w}/>)}</div>;
 if(block.kind==='arts')return <div className="worksheet-arts">{block.items.map((item,i)=><figure key={i}><div data-pdf-visual={`${block.id}-${i}`}><ObjectArt name={item.name}/></div><figcaption>{item.label}</figcaption></figure>)}</div>;
 if(block.kind==='paint')return <div className="worksheet-paint"><p>{block.prompt}</p><div className="worksheet-arts">{['ball','tree','house'].map((kind,i)=><figure key={kind}><div data-pdf-visual={`${block.id}-${i}`}><PaintPicture kind={kind}/></div><figcaption>Bild {i+1}</figcaption></figure>)}</div></div>;
 return null;
}
export function DocumentPreview({build,onBack,allowSolutions=true}){
 const [solutions,setSolutions]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');const root=useRef(null),controller=useRef(null),alive=useRef(true);const worksheet=build(solutions);
 useEffect(()=>{window.scrollTo(0,0);return()=>{alive.current=false;controller.current?.abort();};},[]);
 async function download(){setBusy(true);setError('');controller.current=new AbortController();try{await downloadWorksheetPdf(worksheet,root.current,{signal:controller.current.signal});}catch(e){if(alive.current)setError('Das PDF konnte nicht vollständig erstellt werden. Du kannst stattdessen „Drucken / PDF speichern“ verwenden.');}finally{if(alive.current)setBusy(false);}}
 return <div className="document-preview"><div className="print-controls white-panel"><button className="text-button" onClick={onBack}><ArrowLeft size={16}/> Zurück zum Lernmaterial</button><h2>Druckansicht und PDF</h2><p>Die Vorschau enthält den vollständigen Text und alle ausgewählten Aufgaben. Antworten bleiben frei; ein Lösungsblatt kannst du ergänzen.</p>{allowSolutions&&<label className="solution-option"><input type="checkbox" checked={solutions} onChange={e=>setSolutions(e.target.checked)} disabled={busy}/> Lösungsblatt und Musterantworten anhängen</label>}<div className="document-actions"><button className="primary-button" onClick={download} disabled={busy}><Download size={17}/>{busy?'PDF wird erstellt …':'PDF herunterladen'}</button><button className="secondary-button" onClick={()=>window.print()}><Printer size={17}/> Drucken / PDF speichern</button></div>{error&&<p role="alert">{error}</p>}</div><div ref={root}><WorksheetDocument worksheet={worksheet}/></div></div>;
}
