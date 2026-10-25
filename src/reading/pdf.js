import {jsPDF} from 'jspdf';
import {pdfFont} from '../pdfFont.js';
import {plainGrammar} from '../grammar/helpers.js';
function printable(text,focus=false){return plainGrammar(focus?text.replace(/\[\[focus:([^\]]+)\]\]/g,'[$1]'):text).replaceAll('↔',' <-> ').replaceAll('→',' -> ').replaceAll('↓',' -> ').replaceAll('…','...');}
async function svgPng(svg,signal){if(signal?.aborted)throw new Error('Abgebrochen');const image=new Image(),source=svg.cloneNode(true);source.setAttribute('xmlns','http://www.w3.org/2000/svg');source.setAttribute('width','600');source.setAttribute('height','600');const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(source)],{type:'image/svg+xml'}));try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('Ein Bild konnte nicht ins PDF übernommen werden.'));image.src=url;});const canvas=document.createElement('canvas');canvas.width=600;canvas.height=600;canvas.getContext('2d').drawImage(image,0,0,600,600);return canvas.toDataURL('image/png');}finally{URL.revokeObjectURL(url);}}
export async function downloadWorksheetPdf(worksheet,root,{signal}={}){
 await document.fonts.ready;
 const images=new Map();for(const element of root.querySelectorAll('[data-pdf-visual]')){const svg=element.querySelector('svg');if(svg)images.set(element.dataset.pdfVisual,await svgPng(svg,signal));}
 if(signal?.aborted)return;
 const pdf=new jsPDF({unit:'mm',format:'a4',compress:true,putOnlyUsedFonts:true});pdf.addFileToVFS('Manrope-Regular.ttf',pdfFont);pdf.addFont('Manrope-Regular.ttf','Manrope','normal');pdf.setFont('Manrope');pdf.setProperties({title:worksheet.title,author:'Fit in Deutsch',subject:'Lernmaterial zum Lesen und Deutschlernen'});
 const left=15,width=180,bottom=279;let y=17;
 function nextPage(){pdf.addPage();y=17;}
 function room(height){if(y+height>bottom)nextPage();}
 function lineText(text,{size=10,space=2,focus=false,color=[48,65,49]}={}){
  pdf.setFontSize(size);const lineHeight=size*.5;
  if(!text.includes('[[')){for(const line of pdf.splitTextToSize(printable(text,focus),width)){room(lineHeight);pdf.setTextColor(...color);pdf.text(line,left,y+lineHeight*.78);y+=lineHeight;}y+=space;return;}
  const pattern=/\[\[([a-z]+):([^\]]+)\]\]/g,runs=[];let cursor=0,match;
  while((match=pattern.exec(text))){runs.push({text:text.slice(cursor,match.index)});runs.push({text:focus&&match[1]==='focus'?'['+match[2]+']':match[2],mark:true});cursor=pattern.lastIndex;}runs.push({text:text.slice(cursor)});
  let line=[],used=0;function flush(){room(lineHeight);let x=left;for(const token of line){if(token.mark&&token.text.trim()){pdf.setFillColor(233,239,220);pdf.rect(x,y,token.width,lineHeight,'F');pdf.setDrawColor(97,126,74);pdf.line(x,y+lineHeight-.2,x+token.width,y+lineHeight-.2);}pdf.setTextColor(...color);pdf.text(token.text,x,y+lineHeight*.78);x+=token.width;}y+=lineHeight;line=[];used=0;}
  for(const run of runs)for(const token of printable(run.text).split(/(\s+)/).filter(Boolean)){const w=pdf.getTextWidth(token);if(used+w>width&&line.length)flush();if(!line.length&&!token.trim())continue;line.push({text:token,mark:run.mark,width:w});used+=w;}if(line.length)flush();y+=space;
 }
 function heading(text,size=14){room(32);lineText(text,{size,space:4,color:[35,77,49]});}
 function drawTable(block){lineText(block.caption||'',{size:9});const cols=block.headers.length,cw=width/cols;
  function measure(values){pdf.setFontSize(9);const lines=values.map(v=>pdf.splitTextToSize(printable(v),cw-4));return {lines,height:Math.max(...lines.map(l=>l.length))*4+5};}
  function row(values,header=false){const {lines,height}=measure(values);if(header){pdf.setFillColor(236,241,226);pdf.rect(left,y,width,height,'F');}pdf.setDrawColor(200,210,189);for(let i=0;i<cols;i++){pdf.rect(left+i*cw,y,cw,height);pdf.setTextColor(50,69,47);pdf.text(lines[i],left+i*cw+2,y+5);}y+=height;}
  room(measure(block.headers).height+(block.rows.length?measure(block.rows[0]).height:0));row(block.headers,true);for(const values of block.rows){if(y+measure(values).height>bottom){nextPage();row(block.headers,true);}row(values);}y+=5;
 }
 function cards(items){const cols=2,cw=width/cols;for(let i=0;i<items.length;i+=cols){const values=items.slice(i,i+cols);pdf.setFontSize(11);const wrapped=values.map(v=>pdf.splitTextToSize(printable(v),cw-10)),height=Math.max(14,...wrapped.map(l=>l.length*5+7));room(height+3);for(let j=0;j<values.length;j++){pdf.setDrawColor(164,183,142);pdf.setLineDashPattern([1,1],0);pdf.rect(left+j*cw,y,cw-3,height);pdf.setLineDashPattern([],0);pdf.text(wrapped[j],left+j*cw+4,y+7);}y+=height+3;}y+=3;}
 function artRow(block,items){const cw=width/3;for(let i=0;i<items.length;i+=3){pdf.setFontSize(9);const row=items.slice(i,i+3),labels=row.map(item=>pdf.splitTextToSize(printable(item.label),cw-7)),height=45+Math.max(...labels.map(l=>l.length))*4;room(height);for(let j=0;j<row.length;j++){const image=images.get(`${block.id}-${i+j}`);if(!image)throw new Error('Ein Bild fehlt im PDF. Bitte nutze die Druckansicht.');pdf.addImage(image,'PNG',left+j*cw+10,y,35,35);pdf.setTextColor(49,65,45);pdf.text(labels[j],left+j*cw+3,y+41);}y+=height;}}
 function syllables(word){room(19);let x=left;pdf.setFontSize(13);word.syllables.forEach((syllable,i)=>{const color=i%2?[167,91,64]:[62,105,139],w=pdf.getTextWidth(syllable);pdf.setTextColor(...color);pdf.text(syllable,x,y+5);pdf.setDrawColor(...color);pdf.lines([[w*.25,3,w*.75,3,w,0]],x,y+7);x+=w+1;});pdf.setTextColor(75,90,64);pdf.setFontSize(9);pdf.text(`(${word.syllables.length} ${word.syllables.length===1?'Silbe':'Silben'})`,x+3,y+5);y+=18;}
 heading(worksheet.title,18);lineText(worksheet.subtitle,{size:10});if(worksheet.sections.some(s=>s.blocks.some(b=>b.prompt?.includes('[[focus:'))))lineText('In [eckigen Klammern] steht die Wortgruppe, die du untersuchen sollst.',{size:9});
 for(const section of worksheet.sections){if(section.solution&&y>20)nextPage();heading(section.title);for(const block of section.blocks){if(signal?.aborted)return;
  if(block.kind==='text')lineText(block.text);
  if(block.kind==='list')for(const item of block.items)lineText('- '+item);
  if(block.kind==='question'){room(18);lineText(block.prompt,{focus:true});if(block.options.length)lineText(block.options.map(o=>'[ ] '+o).join('    '),{size:9,space:4});else{for(let n=0;n<block.lines;n++){room(7);pdf.setDrawColor(183,192,173);pdf.line(left,y+5,left+width,y+5);y+=7;}y+=4;}}
  if(block.kind==='table')drawTable(block);
  if(block.kind==='cards')cards(block.items);
  if(block.kind==='syllables')for(const word of block.words)syllables(word);
  if(block.kind==='arts')artRow(block,block.items);
  if(block.kind==='paint'){lineText(block.prompt);artRow(block,[{label:'Bild 1'},{label:'Bild 2'},{label:'Bild 3'}]);}
 }}
 const pages=pdf.getNumberOfPages();for(let page=1;page<=pages;page++){pdf.setPage(page);pdf.setFontSize(8);pdf.setTextColor(115,128,101);pdf.text(`Fit in Deutsch · Seite ${page} / ${pages}`,left,290);}
 if(signal?.aborted)return;pdf.save(worksheet.filename);
}
