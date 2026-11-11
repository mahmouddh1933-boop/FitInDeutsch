export const colors={rot:{label:'Rot',hex:'#d95750'},blau:{label:'Blau',hex:'#527fbd'},gelb:{label:'Gelb / Gold',hex:'#edc74d'},grün:{label:'Grün',hex:'#6f9a60'},orange:{label:'Orange',hex:'#df9347'},lila:{label:'Lila',hex:'#9770b2'},rosa:{label:'Rosa',hex:'#e6a2b6'},braun:{label:'Braun',hex:'#98734f'},schwarz:{label:'Schwarz',hex:'#303735'},weiß:{label:'Weiß',hex:'#ffffff'},grau:{label:'Grau',hex:'#a6aca5'}};
export const flags={
 de:{name:'Deutschland',ratio:5/3,orientation:'horizontal',labels:['oberer Streifen','mittlerer Streifen','unterer Streifen'],values:['schwarz','rot','gelb']},
 fr:{name:'Frankreich',ratio:3/2,orientation:'vertical',labels:['linker Streifen','mittlerer Streifen','rechter Streifen'],values:['blau','weiß','rot']},
 it:{name:'Italien',ratio:3/2,orientation:'vertical',labels:['linker Streifen','mittlerer Streifen','rechter Streifen'],values:['grün','weiß','rot']},
 ie:{name:'Irland',ratio:2,orientation:'vertical',labels:['linker Streifen','mittlerer Streifen','rechter Streifen'],values:['grün','weiß','orange']},
 at:{name:'Österreich',ratio:3/2,orientation:'horizontal',labels:['oberer Streifen','mittlerer Streifen','unterer Streifen'],values:['rot','weiß','rot']},
 be:{name:'Belgien',ratio:13/15,orientation:'vertical',labels:['linker Streifen','mittlerer Streifen','rechter Streifen'],values:['schwarz','gelb','rot']},
 ch:{name:'Schweiz',ratio:1,orientation:'cross',labels:['Hintergrund','Kreuz'],values:['rot','weiß']},
 se:{name:'Schweden',ratio:8/5,orientation:'nordic',labels:['Hintergrund','Kreuz'],values:['blau','gelb']},
 cz:{name:'Tschechien',ratio:3/2,orientation:'triangle',labels:['oberer Streifen','unterer Streifen','linkes Dreieck'],values:['weiß','rot','blau']}
};
const parts={
 explorer:[['hut','Hut','blau'],['jacke','Jacke','grün'],['tasche','Tasche','gelb'],['stiefel','Stiefel','rot']],
 robot:[['kopf','Kopf','grau'],['bauch','Bauch','blau'],['haende','Hände','gelb'],['stiefel','Stiefel','grün'],['knöpfe','drei Knöpfe','rot']],
 cat:[['fell','Fell','grau'],['halsband','Halsband','rot'],['kissen','Kissen','gelb'],['ball','Ball','blau'],['napf','Napf','grün']],
 bicycle:[['rahmen','Rahmen','grün'],['sattel','Sattel','braun'],['korb','Korb','gelb'],['klingel','Klingel','grau']],
 garden:[['dach','Dach','rot'],['wand','Hauswand','gelb'],['baum','Baumkrone','grün'],['blumen','fünf Blumen','rosa'],['sonne','Sonne','gelb']],
 boat:[['rumpf','Schiffsrumpf','rot'],['segel','beide Segel','weiß'],['flagge','Fahne','gelb'],['meer','Wasser','blau']],
 train:[['lok','Lokomotive','rot'],['wagen1','erster Wagen','gelb'],['wagen2','zweiter Wagen','grün'],['rauch','drei Rauchwolken','grau']],
 snail:[['haus','Schneckenhaus','braun'],['koerper','Schneckenkörper','gelb'],['blatt','großes Blatt','grün'],['blume','Blume','rosa']],
 picnic:[['decke','Decke','grün'],['korb','Korb','braun'],['flasche','Wasserflasche','blau'],['tassen','beide Tassen','gelb']]
};
export function artParts(spec){
 if(spec.kind==='flags')return spec.countries.flatMap(code=>flags[code].labels.map((label,i)=>({id:`${code}:${i}`,label:`${flags[code].name}: ${label}`,color:flags[code].values[i]})));
 if(spec.kind==='shapes')return spec.items.map(item=>({id:item.id,label:item.label,color:item.color||'weiß'}));
 return (parts[spec.kind]||[]).map(([id,label,color])=>({id,label,color}));
}
export function effectivePaint(group,values={}){return Object.fromEntries(artParts(group.art).map(p=>[p.id,values[p.id]||'weiß']));}
export function paintScore(group,record={}){const answers=effectivePaint(group,record.paints?.[group.id]);const entries=Object.entries(group.targets);return {total:entries.length,correct:record.paintChecks?.[group.id]?entries.filter(([key,value])=>answers[key]===value).length:0};}
