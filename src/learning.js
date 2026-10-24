export const modes=[
 {id:'picture',title:'Bild & Wort',icon:'🖼️',description:'Welches Wort passt zum Bild?'},
 {id:'missing',title:'Fehlender Buchstabe',icon:'✏️',description:'Ergänze den fehlenden Buchstaben.'},
 {id:'scramble',title:'Buchstabensalat',icon:'🔠',description:'Bringe die Buchstaben in die richtige Reihenfolge.'},
 {id:'article',title:'Artikel üben',icon:'📘',description:'Heißt es der, die oder das?'},
 {id:'write',title:'Wort schreiben',icon:'📝',description:'Schreibe das Wort zum Bild.'},
 {id:'listen',title:'Hören & erkennen',icon:'🎧',description:'Höre das Wort und finde es wieder.'},
 {id:'truefalse',title:'Richtig oder falsch?',icon:'🔎',description:'Passen das Bild und das Wort zusammen?'}
];
export function bareWord(label){return label.replace(/^(der|die|das) /,'');}
export function normalize(text){return text.normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('de');}
export function scrambledLetters(word){const letters=Array.from(word);let result=letters.map((letter,index)=>({letter,index})).reverse();if(result.map(x=>x.letter).join('')===word)result=[...result.slice(1),result[0]];return result;}
function rotated(values,index){const offset=index%values.length;return [...values.slice(offset),...values.slice(0,offset)];}
export function makeQuestions(topic,mode){
 return topic.words.filter(([label])=>mode!=='article'||/^(der|die|das) /.test(label)).map(([label,image],i)=>{
  const word=bareWord(label),chars=Array.from(word),position=Math.max(1,Math.floor(chars.length/2));
  const distractors=topic.words.map(w=>w[0]).filter(w=>w!==label).slice(0,3);
  const base={id:`${topic.id}:${mode}:${label}`,mode,image,word:label,explanation:`Das Wort heißt „${label}“.`,correct:label,prompt:'Welches Wort passt zum Bild?',options:rotated([label,...distractors],i)};
  if(mode==='missing')return {...base,prompt:'Welcher Buchstabe fehlt?',masked:chars.map((c,j)=>j===position?'_':c).join(''),correct:chars[position],options:null,explanation:`${word} – hier fehlt „${chars[position]}“.`};
  if(mode==='scramble')return {...base,prompt:'Ordne die Buchstaben.',letters:scrambledLetters(word),correct:word,options:null};
  if(mode==='article')return {...base,prompt:`Welcher Artikel gehört zu „${word}“?`,correct:label.split(' ')[0],options:rotated(['der','die','das'],i)};
  if(mode==='write')return {...base,prompt:'Schreibe das Wort zum Bild. Ohne Artikel.',correct:word,options:null};
  if(mode==='listen')return {...base,prompt:'Höre das Wort. Welche Antwort passt?',speak:label,image:null};
  if(mode==='truefalse'){const shown=i%2===0?label:topic.words[(i+1)%topic.words.length][0];return {...base,prompt:`Passt „${shown}“ zum Bild?`,correct:i%2===0?'Ja':'Nein',options:['Ja','Nein']};}
  return base;
 });
}
const letterRows=[
 ['A','Apfel','Apfel','A'],['B','Buch','Buch','Be'],['C','Computer','💻','Ce'],['D','Drachen','🪁','De'],['E','Elefant','🐘','E'],['F','Fisch','🐟','Eff'],['G','Gitarre','🎸','Ge'],['H','Haus','Haus','Ha'],['I','Igel','🦔','I'],['J','Jacke','🧥','Jott'],['K','Katze','🐈','Ka'],['L','Lampe','Lampe','Ell'],['M','Maus','🐁','Emm'],['N','Nase','👃','Enn'],['O','Orange','🍊','O'],['P','Pinsel','🖌️','Pe'],['Q','Qualle','🪼','Ku'],['R','Rucksack','Rucksack','Err'],['S','Sonne','Sonne','Ess'],['T','Tomate','🍅','Te'],['U','Uhr','🕘','U'],['V','Vogel','Vogel','Vau'],['W','Wasser','Wasser','We'],['X','Xylophon','Xylophon','Iks'],['Y','Yoga','🧘','Ypsilon'],['Z','Zitrone','🍋','Zett'],['Ä','Äpfel','Apfel','Ä'],['Ö','Öl','Öl','Ö'],['Ü','Überraschung','🎁','Ü'],['ß','Straße','🛣️','Eszett']
];
export const alphabet=letterRows.map(([upper,word,image,sound])=>({upper,lower:upper==='ß'?'ß':upper.toLocaleLowerCase('de'),word,image,sound}));
export function alphabetQuestions(type){return alphabet.map((letter,i)=>{
 const base={id:`alphabet:${type}:${letter.upper}`,mode:'alphabet',image:letter.image,word:letter.word,prompt:letter.upper==='ß'?'Wie schreibt man das Eszett in „Straße“?':`Welcher kleine Buchstabe gehört zu ${letter.upper}?`,correct:letter.lower,options:rotated([letter.lower,...alphabet.map(l=>l.lower).filter(l=>l!==letter.lower).slice(i%20,i%20+3)],i),explanation:`${letter.upper} und ${letter.lower} gehören zusammen. Beispiel: ${letter.word}.`};
 if(type==='missing'){const pos=letter.word.indexOf(letter.upper);return {...base,prompt:'Welcher Buchstabe fehlt?',masked:Array.from(letter.word).map((c,j)=>j===pos?'_':c).join(''),correct:letter.upper,options:rotated([letter.upper,...alphabet.map(l=>l.upper).filter(l=>l!==letter.upper).slice(i%20,i%20+3)],i),explanation:`${letter.word} schreibt man hier mit „${letter.upper}“.`};}
 if(type==='listen')return {...base,prompt:'Höre den Buchstabennamen. Welcher Buchstabe ist es?',image:null,speak:letter.sound,correct:letter.upper,options:rotated([letter.upper,...alphabet.map(l=>l.upper).filter(l=>l!==letter.upper).slice(i%20,i%20+3)],i)};
 return base;
 });}
export const soundGroups=[['sch','Schule','🏫'],['ch','Buch','Buch'],['ei','Eis','🍨'],['ie','Brief','✉️'],['eu','Feuer','🔥'],['au','Haus','Haus'],['äu','Bäume','Baum']];
