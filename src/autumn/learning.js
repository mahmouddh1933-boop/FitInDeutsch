export function gridWord(word){return word.normalize('NFC').toLocaleUpperCase('de').replaceAll('Ä','AE').replaceAll('Ö','OE').replaceAll('Ü','UE').replaceAll('ẞ','SS').replaceAll('ß','SS');}
function seeded(seed){let n=2166136261;for(const char of String(seed))n=Math.imul(n^char.charCodeAt(0),16777619);return()=>{n+=0x6d2b79f5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
export function shuffled(items,seed){const out=items.map((item,index)=>({item,index})),random=seeded(seed);for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}if(out.length>1&&out.every((v,i)=>v.index===i))out.push(out.shift());return out;}
export function createWordsearch(words,seed,size=13){
 const random=seeded(seed),grid=Array.from({length:size},()=>Array(size).fill('')),placements=[];
 const sorted=[...words].sort((a,b)=>gridWord(b).length-gridWord(a).length);
 for(let wi=0;wi<sorted.length;wi++){
  const word=gridWord(sorted[wi]);if(word.length>size)throw new Error('Wort ist länger als das Suchgitter.');
  const candidates=[];
  for(const [dr,dc]of [[0,1],[1,0]])for(let r=0;r<size;r++)for(let c=0;c<size;c++){
   const endR=r+dr*(word.length-1),endC=c+dc*(word.length-1);if(endR>=size||endC>=size)continue;
   const cells=Array.from(word,(_,i)=>[r+dr*i,c+dc*i]);if(cells.some(([y,x],i)=>grid[y][x]&&grid[y][x]!==word[i]))continue;
   candidates.push({word,source:sorted[wi],cells,score:cells.filter(([y,x])=>grid[y][x]).length+random()+(wi%2===(dr===1?1:0)?.5:0)});
  }
  if(!candidates.length)throw new Error('Suchwort konnte nicht platziert werden.');
  const best=candidates.sort((a,b)=>b.score-a.score)[0];best.cells.forEach(([r,c],i)=>grid[r][c]=word[i]);placements.push(best);
 }
 const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';for(let r=0;r<size;r++)for(let c=0;c<size;c++)if(!grid[r][c])grid[r][c]=alphabet[Math.floor(random()*alphabet.length)];
 return {grid,placements};
}
export function selectSearchWord(grid,start,end,words){
 if(!start||!end)return null;const [r,c]=start,[er,ec]=end;
 if(r!==er&&c!==ec||er<r||ec<c)return null;
 const count=Math.max(er-r,ec-c)+1,cells=Array.from({length:count},(_,i)=>[r+(er===r?0:i),c+(ec===c?0:i)]);
 if(cells.some(([y,x])=>!grid[y]?.[x]))return null;
 const value=cells.map(([y,x])=>grid[y][x]).join('');return words.some(w=>gridWord(w)===value)?{word:value,cells}:null;
}
function clean(value,caseSensitive=true){const text=String(value??'').normalize('NFC').trim().replace(/\s+/g,' ');return caseSensitive?text:text.toLocaleLowerCase('de');}
function money(value){const input=clean(value,false),isCents=/cent$/.test(input),number=input.replace(/(?:euro|eur|€|cent)/g,'').replace(/\s/g,'');if(!/^\d+(?:[.,]\d{1,2})?$/.test(number))return null;return Math.round(Number(number.replace(',','.'))*(isCents?1:100));}
function time(value){const match=clean(value,false).replace(/\s*uhr$/,'').match(/^(\d{1,2})[:.](\d{2})$/);if(!match||+match[1]<1||+match[1]>12||+match[2]>59)return null;return `${+match[1]}:${match[2]}`;}
export function answerReady(q,value){if(q.type==='open')return false;if(q.type==='order')return Array.isArray(value)&&value.length===q.items.length;if(q.type==='clock')return value?.hour&&value?.minute!==''&&value?.minute!=null;return typeof value==='string'&&!!value.trim();}
export function isCorrect(q,value){
 if(q.type==='open')return null;
 if(!answerReady(q,value))return false;
 if(q.type==='order')return value.every((index,i)=>index===i);
 if(q.type==='clock')return time(`${value.hour}:${value.minute}`)===time(q.correct);
 if(q.format==='money')return money(value)!==null&&money(value)===money(q.correct);
 if(q.format==='time')return time(value)!==null&&time(value)===time(q.correct);
 return [q.correct,...q.accepted||[]].some(answer=>clean(value,q.caseSensitive!==false)===clean(answer,q.caseSensitive!==false));
}
export function unitStatus(unit,record={}){
 const questions=unit.groups.flatMap(g=>g.tasks).filter(q=>q.type!=='open');let total=questions.length,correct=questions.filter(q=>record.checked?.[q.id]&&isCorrect(q,record.answers?.[q.id])).length;
 for(const group of unit.groups.filter(g=>g.kind==='wordsearch')){const found=record.searches?.[group.id]||[];total+=group.words.length;correct+=group.words.filter(word=>found.includes(gridWord(word))).length;}
 return {correct,total,ready:total>0&&correct===total};
}
export function secretLetters(group,answers={}){return group.tasks.map(q=>clean(answers[q.id],false).toLocaleUpperCase('de')[q.letter]||'·').join('');}
