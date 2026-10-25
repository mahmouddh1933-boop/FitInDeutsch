export const markLabels={noun:'Nomen',verb:'Verb',adjective:'Adjektiv',article:'Artikel',capital:'Großbuchstabe',punctuation:'Satzzeichen',subject:'Subjekt',predicate:'Prädikat',object:'Ergänzung',place:'Ort',time:'Zeit',prefix:'Vorsilbe',suffix:'Nachsilbe',stem:'Wortstamm',nominative:'Nominativ',genitive:'Genitiv',dative:'Dativ',accusative:'Akkusativ',focus:'Untersuche diese Stelle'};
export function plainGrammar(text){return text.replace(/\[\[([a-z]+):([^\]]+)\]\]/g,(_,kind,word)=>word);}
export const question=(prompt,correct,others,explanation,context='')=>({prompt,correct,options:[correct,...others],explanation,context});
export function choices(text){return text.trim().split('\n').map(line=>{const [prompt,correct,wrong1,wrong2,explanation,context='']=line.split('|');return question(prompt,correct,[wrong1,wrong2],explanation,context);});}
export function topic(id,grade,title,rule,steps,examples,questions,pitfall,skills){
 return {id,grade,title,icon:['','🌱','🌿','🌳','🎓'][grade],rule,steps,examples,example:plainGrammar(examples[0].text),questions,pitfall,skills};
}
export const ex=(text,note)=>({text,note});
export function identify(items,category){return items.map(([sentence,answer,a,b,why])=>question(`Finde ${category} im Satz.`,answer,[a,b],why,sentence));}
export function orderTask(prompt,sentence){const parts=sentence.split('|');return {prompt,correct:parts.join(' '),tokens:parts.map((word,index)=>({word,index})).reverse(),caseSensitive:true,explanation:`Der richtige Satz lautet: ${parts.join(' ')}`};}
