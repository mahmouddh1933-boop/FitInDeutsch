import React from 'react';
import {markLabels} from './grammar/helpers';
export function MarkedText({text='',enabled=true,keepFocus=false}){
 const parts=[],pattern=/\[\[([a-z]+):([^\]]+)\]\]/g;let cursor=0,match;
 while((match=pattern.exec(text))){if(match.index>cursor)parts.push(text.slice(cursor,match.index));const [,kind,word]=match,label=markLabels[kind];parts.push(<span key={`${match.index}-${kind}`} className={label&&(enabled||(keepFocus&&kind==='focus'))?`grammar-mark mark-${kind}`:undefined} title={enabled?label:undefined}>{word}</span>);cursor=pattern.lastIndex;}
 if(cursor<text.length)parts.push(text.slice(cursor));return <>{parts}</>;
}
export function MarkLegend({skills=[],enabled=true}){return <div className="grammar-legend" aria-label="Bedeutung der Markierungen">{skills.map(kind=><span key={kind} className={enabled?`grammar-mark mark-${kind}`:undefined}>{markLabels[kind]}</span>)}</div>;}
