const baseTopics = [
 {id:'school',title:'In der Schule',description:'Dein Schultag steckt voller Wörter.',color:'#e9eee8',accent:'#527a63',scene:'school',tag:'Dein nächster Schritt',words:[['der Rucksack','Rucksack'],['das Buch','Buch'],['der Stift','Stift'],['die Schere','Schere']],sentence:['Ich','lese','ein','Buch.']},
 {id:'food',title:'Essen & Trinken',description:'Was kommt heute auf deinen Teller?',color:'#f8ede1',accent:'#b77845',scene:'food',words:[['der Apfel','Apfel'],['das Brot','Brot'],['das Wasser','Wasser'],['die Karotte','Karotte']],sentence:['Ich','esse','einen','Apfel.']},
 {id:'city',title:'Meine Stadt',description:'Entdecke die Welt vor deiner Tür.',color:'#e8eff4',accent:'#648ba6',scene:'city',words:[['das Haus','Haus'],['der Bus','Bus'],['das Fahrrad','Fahrrad'],['der Baum','Baum']],sentence:['Ich','fahre','mit','dem Bus.']},
 {id:'people',title:'Ich & die anderen',description:'Zusammen macht Lernen mehr Spaß.',color:'#f3e9e5',accent:'#b78178',scene:'people',words:[['die Freundin','Freundin'],['die Familie','Familie'],['die Hand','Hand'],['das Herz','Herz']],sentence:['Wir','lernen','heute','zusammen.']},
 {id:'nature',title:'Draußen unterwegs',description:'Kleine Abenteuer in der Natur.',color:'#ebefda',accent:'#85924f',scene:'nature',words:[['die Blume','Blume'],['die Sonne','Sonne'],['der Vogel','Vogel'],['der Schmetterling','Schmetterling']],sentence:['Die','Sonne','scheint','heute.']},
 {id:'home',title:'Mein Zuhause',description:'Hier kennst du dich bald gut aus.',color:'#eee9f4',accent:'#9581ad',scene:'home',words:[['der Stuhl','Stuhl'],['das Bett','Bett'],['die Lampe','Lampe'],['die Tür','Tür']],sentence:['Die','Lampe','ist','hell.']}
];
const extraWords = {
 school:'das Heft|📓;das Lineal|📏;der Radiergummi|Radiergummi;die Tafel|Tafel;der Computer|💻;die Uhr|🕘;der Pinsel|🖌️;die Büroklammer|📎',
 food:'der Käse|🧀;das Ei|🥚;die Milch|🥛;die Pizza|🍕;der Reis|🍚;die Suppe|🍲;der Kuchen|🍰;das Eis|🍨',
 city:'die Schule|🏫;das Krankenhaus|🏥;die Bank|🏦;die Post|🏤;die Brücke|🌉;die Ampel|🚦;die Straße|🛣️;der Brunnen|⛲',
 people:'die Mutter|👩;der Vater|👨;die Schwester|👧;der Bruder|👦;das Baby|👶;die Großmutter|👵;der Großvater|👴;die Lehrerin|👩‍🏫',
 nature:'der Berg|⛰️;der Fluss|🏞️;das Meer|🌊;der Wald|🌲;der Pilz|🍄;das Blatt|🍃;der Stein|🪨;der Stern|⭐',
 home:'das Sofa|🛋️;der Schlüssel|🔑;der Spiegel|🪞;die Badewanne|🛁;die Dusche|🚿;die Toilette|🚽;die Seife|🧼;der Besen|🧹'
};
const parseWords = text => text.split(';').map(w=>w.split('|'));
const extraTopics = [
 ['animals','Tiere entdecken','Wer bellt, miaut oder brüllt?','der Hund|🐕;die Katze|🐈;das Pferd|🐎;die Kuh|🐄;das Schaf|🐑;die Ziege|🐐;das Schwein|🐖;das Huhn|🐔;die Ente|🦆;der Fisch|🐟;der Elefant|🐘;der Löwe|🦁',['Die','Katze','schläft','heute.']],
 ['clothes','Meine Kleidung','Was ziehst du heute an?','die Hose|👖;das Kleid|👗;das T-Shirt|👕;die Jacke|🧥;der Pullover|👚;der Schuh|👞;die Socke|🧦;die Mütze|🧢;der Hut|🎩;der Schal|🧣;der Handschuh|🧤;der Regenschirm|☂️',['Ich','trage','eine','Jacke.']],
 ['body','Mein Körper','Von Kopf bis Fuß: Das bin ich.','der Kopf|🙂;das Auge|👁️;das Ohr|👂;die Nase|👃;der Mund|👄;der Zahn|🦷;die Zunge|👅;der Arm|💪;der Fuß|🦶;das Bein|🦵;der Finger|☝️;das Gehirn|🧠',['Ich','höre','mit','den Ohren.']],
 ['fruit','Buntes Obst','Süße Wörter für deinen Obstkorb.','die Banane|🍌;die Birne|🍐;die Orange|🍊;die Zitrone|🍋;die Erdbeere|🍓;die Kirsche|🍒;die Traube|🍇;die Melone|🍉;die Ananas|🍍;der Pfirsich|🍑;die Kiwi|🥝;die Mango|🥭',['Ich','esse','eine','Banane.']],
 ['vegetables','Gemüse im Garten','Entdecke, was im Garten wächst.','die Tomate|🍅;die Gurke|🥒;die Kartoffel|🥔;die Zwiebel|🧅;der Knoblauch|🧄;die Paprika|🫑;der Brokkoli|🥦;der Salat|🥬;die Aubergine|🍆;der Mais|🌽;die Erbse|🫛;die Olive|🫒',['Die','Tomate','ist','rot.']],
 ['transport','Unterwegs sein','Auf Rädern, auf Schienen, in der Luft.','das Auto|🚗;der Zug|🚆;die Straßenbahn|🚊;die U-Bahn|🚇;das Taxi|🚕;das Motorrad|🏍️;der Roller|🛴;das Flugzeug|✈️;das Schiff|🚢;das Boot|⛵;der Hubschrauber|🚁;der Lastwagen|🚚',['Ich','fahre','mit','dem Zug.']],
 ['sports','Sport & Bewegung','Bewege dich und lerne neue Wörter.','der Fußball|⚽;der Basketball|🏀;der Tennisball|🎾;der Volleyball|🏐;der Tischtennisschläger|🏓;der Badmintonschläger|🏸;der Boxhandschuh|🥊;der Schlittschuh|⛸️;der Ski|🎿;die Taucherbrille|🤿;der Pokal|🏆;die Medaille|🏅',['Wir','spielen','heute','Fußball.']],
 ['hobbies','Spielen & Freizeit','Zeit für Musik, Spiele und Kreativität.','die Gitarre|🎸;das Klavier|🎹;die Trompete|🎺;die Trommel|🥁;die Geige|🎻;das Mikrofon|🎤;die Kamera|📷;der Würfel|🎲;das Puzzle|🧩;der Drachen|🪁;der Teddybär|🧸;die Spielkonsole|🎮',['Ich','spiele','gerne','Gitarre.']],
 ['weather','Wetter & Jahreszeiten','Wie sieht der Himmel heute aus?','die Wolke|☁️;der Regen|🌧️;der Schnee|❄️;der Wind|🌬️;der Blitz|⚡;der Regenbogen|🌈;das Thermometer|🌡️;der Schneemann|⛄;der Frühling|🌷;der Sommer|🏖️;der Herbst|🍂;der Winter|🏔️',['Heute','ist','es','kalt.']],
 ['jobs','Menschen & Berufe','Wer hilft uns im Alltag?','die Ärztin|👩‍⚕️;der Koch|👨‍🍳;der Feuerwehrmann|👨‍🚒;die Polizistin|👮‍♀️;der Bauer|👨‍🌾;die Mechanikerin|👩‍🔧;der Bauarbeiter|👷;die Sängerin|👩‍🎤;der Maler|👨‍🎨;die Wissenschaftlerin|👩‍🔬;der Astronaut|👨‍🚀;die Richterin|👩‍⚖️',['Die','Ärztin','hilft','dem Kind.']],
 ['colors','Farben überall','Mach deine Welt ein bisschen bunter.','rot|color:#df5656;blau|color:#548ed4;gelb|color:#edcc4f;grün|color:#659b65;orange|color:#e79a4b;lila|color:#9a72b9;rosa|color:#eca7ba;braun|color:#966c48;schwarz|color:#252525;weiß|color:#ffffff;grau|color:#989898;türkis|color:#56b7b0',['Meine','Lieblingsfarbe','ist','blau.']],
 ['numbers','Zahlen von 1 bis 12','Zählen, erkennen und richtig schreiben.','eins|digit:1;zwei|digit:2;drei|digit:3;vier|digit:4;fünf|digit:5;sechs|digit:6;sieben|digit:7;acht|digit:8;neun|digit:9;zehn|digit:10;elf|digit:11;zwölf|digit:12',['Ich','sehe','hier','drei Äpfel.']],
 ['feelings','So fühle ich mich','Für jedes Gefühl gibt es ein Wort.','froh|😃;traurig|😢;müde|🥱;wütend|😠;überrascht|😲;ängstlich|😨;verliebt|😍;krank|🤒;verlegen|😳;nachdenklich|🤔;gelangweilt|😑;aufgeregt|🤩',['Ich','bin','heute','froh.']],
 ['everyday','Kleine Alltagshelfer','Dinge, die du jeden Tag brauchst.','das Handy|📱;die Brille|👓;die Zahnbürste|🪥;der Kamm|🪮;die Flasche|🍾;die Tasse|☕;der Teller|🍽️;der Löffel|🥄;die Gabel|🍴;das Messer|🔪;der Korb|🧺;der Mülleimer|🗑️',['Ich','brauche','meine','Brille.']]
];
const palettes=[['#e9eee8','#527a63'],['#f8ede1','#b77845'],['#e8eff4','#648ba6'],['#f3e9e5','#b78178'],['#ebefda','#85924f'],['#eee9f4','#9581ad']];
export const topics=[...baseTopics.map(t=>({...t,words:[...t.words,...parseWords(extraWords[t.id])]})),...extraTopics.map(([id,title,description,text,sentence],i)=>({id,title,description,words:parseWords(text),sentence,color:palettes[i%6][0],accent:palettes[i%6][1],scene:id}))];
export const wordCount=topics.reduce((n,t)=>n+t.words.length,0);
const moreSentences={
 school:['Mein Heft ist blau.','Der Computer ist neu.'],
 food:['Die Milch ist kalt.','Die Suppe schmeckt gut.'],
 city:['Die Schule ist groß.','Die Ampel ist rot.'],
 people:['Meine Schwester spielt gerne.','Mein Großvater liest gerne.'],
 nature:['Das Meer ist blau.','Der Stern leuchtet hell.'],
 home:['Der Schlüssel ist klein.','Die Dusche ist warm.'],
 animals:['Die Ziege frisst Gras.','Der Löwe brüllt laut.'],
 clothes:['Mein Schuh ist braun.','Der Schal ist weich.'],
 body:['Meine Zunge ist rot.','Mein Finger ist lang.'],
 fruit:['Die Melone ist süß.','Die Mango schmeckt süß.'],
 vegetables:['Der Brokkoli ist grün.','Die Erbse ist rund.'],
 transport:['Das Taxi fährt schnell.','Das Boot schwimmt langsam.'],
 sports:['Der Boxhandschuh ist rot.','Die Medaille glänzt schön.'],
 hobbies:['Meine Kamera macht Bilder.','Mein Puzzle ist bunt.'],
 weather:['Der Regenbogen ist bunt.','Im Winter fällt Schnee.'],
 jobs:['Die Mechanikerin repariert Autos.','Die Richterin spricht Recht.'],
 colors:['Mein Pullover ist rosa.','Die Wolke ist weiß.'],
 numbers:['Ich zähle bis acht.','Hier sind zwölf Sterne.'],
 feelings:['Ich bin heute verliebt.','Ben ist heute aufgeregt.'],
 everyday:['Meine Tasse ist voll.','Der Korb ist leer.']
};
export function topicLessons(topic){return Array.from({length:Math.ceil(topic.words.length/4)},(_,i)=>({...topic,id:i===0?topic.id:`${topic.id}:${i+1}`,parentId:topic.id,title:`${topic.title} · Lektion ${i+1}`,words:topic.words.slice(i*4,i*4+4),sentence:i===0?topic.sentence:moreSentences[topic.id][i-1].split(' ')}));}
export function topicComplete(progress,topic){return topicLessons(topic).every(l=>progress.completed.includes(l.id));}
export const initialProgress = {xp:0, completed:[], learned:[], days:[], daily:{},activities:{},mistakes:[]};
export function dayKey(){return new Date().toLocaleDateString('sv-SE');}
export function finishActivity(progress,id,day=dayKey()){
 return {...progress,xp:progress.xp+15,activities:{...progress.activities,[id]:(progress.activities?.[id]||0)+1},days:[...new Set([...progress.days,day])],daily:{...progress.daily,[day]:(progress.daily[day]||0)+1}};
}
export function finishLesson(progress,topic,day=dayKey()) {
 return {...progress,xp:progress.xp+30,completed:[...new Set([...progress.completed,topic.id])], learned:[...new Set([...progress.learned,...topic.words.map(w=>w[0])])],days:[...new Set([...progress.days,day])],daily:{...progress.daily,[day]:(progress.daily[day]||0)+1}};
}
export function readProgress(storage){try{const p=JSON.parse(storage.getItem('fit-deutsch-progress'));if(p && Number.isFinite(p.xp) && p.xp>=0 && ['completed','learned','days'].every(k=>Array.isArray(p[k])) && p.daily && typeof p.daily==='object' && !Array.isArray(p.daily))return {...p,activities:p.activities&&typeof p.activities==='object'&&!Array.isArray(p.activities)?p.activities:{},mistakes:Array.isArray(p.mistakes)?p.mistakes.filter(q=>q&&typeof q.id==='string'&&typeof q.correct==='string'&&typeof q.prompt==='string'):[]};}catch{}return structuredClone(initialProgress);}
