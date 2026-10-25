import snapshot from './lexicon.json' with {type:'json'};
export const verbs = [...snapshot].sort((a,b)=>a.id.localeCompare(b.id,'de'));
export const verbTenses=[{id:'present',title:'Präsens',explanation:'Die Gegenwart: etwas geschieht jetzt oder regelmäßig.'},{id:'perfect',title:'Perfekt',explanation:'Die gesprochene Vergangenheit: haben oder sein im Präsens + Partizip II.'},{id:'past',title:'Präteritum',explanation:'Die einfache Vergangenheit: Du findest sie oft in Geschichten.'},{id:'pluperfect',title:'Plusquamperfekt',explanation:'Etwas war schon vor einem anderen vergangenen Ereignis geschehen: hatte oder war + Partizip II.'},{id:'imperative',title:'Imperativ',explanation:'Eine Bitte oder Aufforderung: an du, an ihr oder höflich an Sie.'}];
const pronouns=['ich','du','er / sie / es','wir','ihr','sie','Sie'];
const reflexives=['mich','dich','sich','uns','euch','sich','sich'];
const auxiliaryForms={haben:{present:['habe','hast','hat','haben','habt','haben','haben'],past:['hatte','hattest','hatte','hatten','hattet','hatten','hatten']},sein:{present:['bin','bist','ist','sind','seid','sind','sind'],past:['war','warst','war','waren','wart','waren','waren']}};
const modal=new Set(['können','dürfen','mögen','müssen','sollen','wollen']);
const dual={fahren:['sein','haben'],fliegen:['sein','haben'],schwimmen:['sein','haben'],reiten:['sein','haben'],laufen:['sein','haben'],ziehen:['haben','sein'],ausziehen:['sein','haben'],umziehen:['sein','haben'],heilen:['haben','sein'],verbrennen:['haben','sein'],rollen:['haben','sein'],starten:['haben','sein'],treten:['haben','sein'],brechen:['haben','sein']};
const usage={fahren:'Ortswechsel: Ich bin nach Hause gefahren. Mit einem Fahrzeug als Objekt: Ich habe den Bus gefahren.',fliegen:'Ortswechsel: Ich bin geflogen. Ein Flugzeug steuern: Ich habe das Flugzeug geflogen.',schwimmen:'Beide Hilfsverben kommen vor: Bei einem Ortswechsel meist sein, bei der Tätigkeit auch haben.',reiten:'Bei einem Ortswechsel meist sein, bei der Tätigkeit oder mit einem Objekt auch haben.',laufen:'Bei einem Ortswechsel meist sein. Mit einem Streckenobjekt sind auch Formen mit haben gebräuchlich.',ziehen:'Etwas ziehen: haben. An einen anderen Ort ziehen: sein.',ausziehen:'Aus einer Wohnung ausziehen: sein. Ein Kleidungsstück ausziehen: haben.',umziehen:'In eine andere Wohnung umziehen: sein. Jemanden umziehen: haben. Bei sich umziehen lautet das Hilfsverb ebenfalls haben.',heilen:'Jemanden heilen: haben. Eine Wunde ist geheilt: sein.',verbrennen:'Etwas verbrennen: haben. Selbst verbrennen: sein.',rollen:'Etwas rollen: haben. Sich rollend fortbewegen: sein.',starten:'Etwas starten: haben. Eine Reise oder einen Flug beginnen: auch sein.',treten:'Etwas treten: haben. An einen Ort treten: sein.',brechen:'Etwas brechen: haben. Etwas zerbricht oder bricht auseinander: sein.'};
function weak(stem){return [stem+'te',stem+'test',stem+'te',stem+'ten',stem+'tet',stem+'ten'].map(x=>[x]);}
function strong(stem,plural=stem+'en'){return [[stem],[stem+'st'],[stem],[plural],[stem+'t'],[plural]];}
export function verbVariants(v){
 if(v.id==='hängen')return [{label:'etwas hängen · Ich hänge das Bild an die Wand.',...v},{...v,label:'irgendwo hängen · Das Bild hing an der Wand.',past:strong('hing'),participle:'gehangen'}];
 if(v.id==='schaffen')return [{...v,label:'etwas bewältigen · Ich habe es geschafft.'},{...v,label:'etwas erschaffen · Die Künstlerin schuf ein Bild.',past:strong('schuf'),participle:'geschaffen'}];
 if(v.id==='bewegen')return [{...v,label:'in Bewegung bringen · Ich bewegte den Stuhl.'},{...v,label:'zu etwas veranlassen · Das bewog mich zum Helfen.',past:strong('bewog'),participle:'bewogen'}];
 if(v.id==='erschrecken')return [{...v,label:'jemanden erschrecken · Der Lärm erschreckte mich.'},{...v,label:'selbst erschrecken · Ich bin erschrocken.',present:['erschrecke','erschrickst','erschrickt','erschrecken','erschreckt','erschrecken'].map(x=>[x]),past:strong('erschrak'),participle:'erschrocken',auxiliary:'sein',imperative:['erschrick','erschreckt']}];
 if(v.id==='passieren')return [{...v,label:'geschehen · Es ist etwas passiert.'},{...v,label:'eine Grenze passieren · Ich habe die Grenze passiert.',auxiliary:'haben',impersonal:false,noImperative:false,imperative:['passiere','passiert']}];
 return [v];
}
export function auxiliaryChoices(v){return dual[v.id]||[v.auxiliary];}
export function verbNotes(v){const notes=[];
 if(v.prefix)notes.push(`Trennbares Verb: ${v.id}. Im Hauptsatz steht „${v.prefix}“ am Ende, zum Beispiel „ich ${v.present[0].join(' ')}“.`);
 if(v.reflexive)notes.push('Hier übst du die Verwendung mit sich: ich … mich, du … dich, wir … uns.');
 if(modal.has(v.id))notes.push('Mit einem weiteren Verb verwendet man im Perfekt oft den Ersatzinfinitiv: „Ich habe gehen müssen.“ Die Tabelle zeigt das Modalverb ohne ein weiteres Verb. Ein gewöhnlicher Imperativ ist hier nicht üblich.');
 if(v.impersonal)notes.push('Für diese Verwendung ist die Form mit es üblich. Deshalb zeigt die Tabelle hier nur es.');
 if(usage[v.id])notes.push(usage[v.id]);
 if(['stehen','sitzen','liegen'].includes(v.id))notes.push('Hier steht das in der Standardsprache verbreitete Hilfsverb haben. Regional sind auch Formen mit sein üblich.');
 if(v.id==='werden')notes.push('Hier ist werden ein Vollverb: „Ich bin größer geworden.“ Beim Passiv kommt die andere Form worden vor.');
 if(v.id==='backen')notes.push('Neben backte ist auch buk richtig. Neben du backst / er backt kommen du bäckst / er bäckt vor.');
 if(v.id==='senden')notes.push('Neben sendete / gesendet sind auch sandte / gesandt gebräuchlich.');
 if(v.id==='wenden')notes.push('Neben wendete / gewendet sind auch wandte / gewandt gebräuchlich.');
 if(v.id==='verwenden')notes.push('Neben verwendete / verwendet sind auch verwandte / verwandt möglich.');
 return notes;
}
const token=(text,kind)=>({text,kind});
function finiteParts(text,v){
 const base=v.prefix?v.id.slice(v.prefix.length):v.id;
 const stem=base.endsWith('en')?base.slice(0,-2):base.endsWith('n')?base.slice(0,-1):base;
 return text.toLocaleLowerCase('de').startsWith(stem)&&text.length>stem.length?[token(text.slice(0,stem.length),'stem'),token(text.slice(stem.length),'ending')]:[token(text,'finite')];
}
export function conjugationRows(v,tense='present',auxiliary=v.auxiliary){
 if(tense==='imperative'){
  if(v.noImperative)return [];
  return ['du','ihr','Sie'].map((pronoun,i)=>{
   const formal=i===2,first=formal?(v.id==='sein'?'seien':v.present[3][0]):v.imperative[i];
   const parts=[...finiteParts(first[0].toLocaleUpperCase('de')+first.slice(1),v)];
   if(formal)parts.push(token('Sie','pronoun'));
   if(v.reflexive)parts.push(token(['dich','euch','sich'][i],'reflexive'));
   if(v.prefix)parts.push(token(v.prefix,'prefix'));
   return {pronoun,parts:spaced(parts),text:spaced(parts).map(t=>t.text).join('')+'!',spoken:spaced(parts).map(t=>t.text).join('')+'!'};
  });
 }
 const people=v.impersonal?[2]:[0,1,2,3,4,5,6];
 return people.map(i=>{
  const person=v.impersonal?'es':pronouns[i];let parts=[];
  if(tense==='perfect'||tense==='pluperfect'){
   const form=auxiliaryForms[auxiliary][tense==='perfect'?'present':'past'][i];parts.push(token(form,'auxiliary'));
   if(v.reflexive)parts.push(token(reflexives[i],'reflexive'));
   parts.push(token(v.participle,'participle'));
  }else{
   const form=v[tense==='past'?'past':'present'][i===6?5:i];parts.push(...finiteParts(form[0],v));
   if(v.reflexive)parts.push(token(reflexives[i],'reflexive'));
   if(v.prefix)parts.push(token(v.prefix,'prefix'));
  }
  parts=spaced(parts);const text=parts.map(t=>t.text).join('');
  return {pronoun:person,parts,text,spoken:`${i===2&&!v.impersonal?'er':person} ${text}`};
 });
}
function spaced(parts){return parts.flatMap((t,i)=>i>0&&!(t.kind==='ending')?[token(' ','space'),t]:[t]);}
export function verbLetter(id){return id[0].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleUpperCase('de');}
export function searchVerbs(query,letter='all'){
 const fold=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('de').replaceAll('ß','ss');
 const needle=fold(query.trim());return verbs.filter(v=>(letter==='all'||verbLetter(v.id)===letter)&&fold(v.id).includes(needle));
}
