export const topics = [
 {id:'school',title:'In der Schule',description:'Dein Schultag steckt voller Wörter.',color:'#e9eee8',accent:'#527a63',scene:'school',tag:'Dein nächster Schritt',words:[['der Rucksack','Rucksack'],['das Buch','Buch'],['der Stift','Stift'],['die Schere','Schere']],sentence:['Ich','lese','ein','Buch.']},
 {id:'food',title:'Essen & Trinken',description:'Was kommt heute auf deinen Teller?',color:'#f8ede1',accent:'#b77845',scene:'food',words:[['der Apfel','Apfel'],['das Brot','Brot'],['das Wasser','Wasser'],['die Karotte','Karotte']],sentence:['Ich','esse','einen','Apfel.']},
 {id:'city',title:'Meine Stadt',description:'Entdecke die Welt vor deiner Tür.',color:'#e8eff4',accent:'#648ba6',scene:'city',words:[['das Haus','Haus'],['der Bus','Bus'],['das Fahrrad','Fahrrad'],['der Baum','Baum']],sentence:['Ich','fahre','mit','dem Bus.']},
 {id:'people',title:'Ich & die anderen',description:'Zusammen macht Lernen mehr Spaß.',color:'#f3e9e5',accent:'#b78178',scene:'people',words:[['die Freundin','Freundin'],['die Familie','Familie'],['die Hand','Hand'],['das Herz','Herz']],sentence:['Wir','lernen','heute','zusammen.']},
 {id:'nature',title:'Draußen unterwegs',description:'Kleine Abenteuer in der Natur.',color:'#ebefda',accent:'#85924f',scene:'nature',words:[['die Blume','Blume'],['die Sonne','Sonne'],['der Vogel','Vogel'],['der Schmetterling','Schmetterling']],sentence:['Die','Sonne','scheint','heute.']},
 {id:'home',title:'Mein Zuhause',description:'Hier kennst du dich bald gut aus.',color:'#eee9f4',accent:'#9581ad',scene:'home',words:[['der Stuhl','Stuhl'],['das Bett','Bett'],['die Lampe','Lampe'],['die Tür','Tür']],sentence:['Die','Lampe','ist','hell.']}
];
export const initialProgress = {xp:0, completed:[], learned:[], days:[], daily:{}};
export function dayKey(){return new Date().toLocaleDateString('sv-SE');}
export function finishLesson(progress,topic,day=dayKey()) {
 return {...progress,xp:progress.xp+30,completed:[...new Set([...progress.completed,topic.id])], learned:[...new Set([...progress.learned,...topic.words.map(w=>w[0])])],days:[...new Set([...progress.days,day])],daily:{...progress.daily,[day]:(progress.daily[day]||0)+1}};
}
export function readProgress(storage){try{const p=JSON.parse(storage.getItem('fit-deutsch-progress'));if(p && Number.isFinite(p.xp) && p.xp>=0 && ['completed','learned','days'].every(k=>Array.isArray(p[k])) && p.daily && typeof p.daily==='object')return p;}catch{}return structuredClone(initialProgress);}
