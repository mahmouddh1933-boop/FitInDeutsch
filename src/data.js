import {alphabet} from './learning.js';
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
 nature:'der Berg|⛰️;der Fluss|Fluss;das Meer|Meer;der Wald|🌲;der Pilz|🍄;das Blatt|🍃;der Stein|🪨;der Stern|⭐',
 home:'das Sofa|🛋️;der Schlüssel|🔑;der Spiegel|🪞;die Badewanne|🛁;die Dusche|🚿;die Toilette|🚽;die Seife|🧼;der Besen|🧹'
};
const parseWords = text => text.split(';').map(w=>w.split('|'));
const extraTopics = [
 ['animals','Tiere entdecken','Wer bellt, miaut oder brüllt?','der Hund|🐕;die Katze|🐈;das Pferd|🐎;die Kuh|🐄;das Schaf|🐑;die Ziege|🐐;das Schwein|🐖;das Huhn|🐔;die Ente|🦆;der Fisch|🐟;der Elefant|🐘;der Löwe|🦁',['Die','Katze','schläft','heute.']],
 ['clothes','Meine Kleidung','Was ziehst du heute an?','die Hose|👖;das Kleid|👗;das T-Shirt|👕;die Jacke|🧥;der Pullover|👚;der Schuh|👞;die Socke|🧦;die Mütze|Mütze;der Hut|🎩;der Schal|🧣;der Handschuh|🧤;der Regenschirm|☂️',['Ich','trage','eine','Jacke.']],
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
 ['everyday','Kleine Alltagshelfer','Dinge, die du jeden Tag brauchst.','das Handy|📱;die Brille|👓;die Zahnbürste|🪥;der Kamm|🪮;die Flasche|Wasserflasche;die Tasse|☕;der Teller|🍽️;der Löffel|🥄;die Gabel|🍴;das Messer|🔪;der Korb|🧺;der Mülleimer|🗑️',['Ich','brauche','meine','Brille.']]
];
const palettes=[['#e9eee8','#527a63'],['#f8ede1','#b77845'],['#e8eff4','#648ba6'],['#f3e9e5','#b78178'],['#ebefda','#85924f'],['#eee9f4','#9581ad']];
const existingTopics=[...baseTopics.map(t=>({...t,words:[...t.words,...parseWords(extraWords[t.id])]})),...extraTopics.map(([id,title,description,text,sentence],i)=>({id,title,description,words:parseWords(text),sentence,color:palettes[i%6][0],accent:palettes[i%6][1],scene:id}))];
const additionalWords={
 school:'der Bleistift|✏️;der Kugelschreiber|🖊️;die Schultasche|🎒;der Taschenrechner|Taschenrechner;der Ordner|🗂️;die Lupe|🔍;die Weltkarte|🗺️;das Mikroskop|🔬',
 food:'die Butter|🧈;das Fleisch|🥩;die Nudeln|🍝;der Honig|🍯;die Schokolade|🍫;das Salz|🧂;der Tee|🍵;der Saft|🧃',
 city:'die Kirche|⛪;die Moschee|🕌;das Schloss|🏰;die Fabrik|🏭;das Hotel|🏨;das Stadion|🏟️;das Zelt|⛺;das Riesenrad|🎡',
 people:'die Eltern|👨‍👩‍👧;der Junge|🧒;das Mädchen|👧;der Freund|🧑;die Nachbarin|👩‍🦱;der Nachbar|🧔;die Zwillinge|👯;das Paar|👫',
 nature:'der Mond|🌙;die Erde|🌍;der Vulkan|🌋;die Insel|🏝️;die Wüste|🏜️;die Welle|🌊;die Muschel|🐚;das Nest|🪺',
 home:'der Tisch|Tisch;das Fenster|🪟;der Schrank|Schrank;der Teppich|Teppich;das Kissen|Kissen;der Wecker|⏰;die Kerze|🕯️;die Waschmaschine|Waschmaschine',
 animals:'der Tiger|🐅;der Bär|🐻;der Affe|🐒;das Kaninchen|🐇;die Maus|🐁;der Frosch|🐸;die Schildkröte|🐢;die Schlange|🐍',
 clothes:'der Stiefel|👢;der Turnschuh|👟;die Sandale|🩴;der Rock|Rock;der Mantel|Mantel;der Gürtel|Gürtel;die Krawatte|👔;der Badeanzug|🩱',
 body:'der Bauch|body:Bauch;der Rücken|body:Rücken;der Hals|body:Hals;die Schulter|body:Schulter;das Knie|body:Knie;die Haare|💇;der Daumen|👍;die Lippen|💋',
 fruit:'die Pflaume|Pflaume;die Aprikose|Aprikose;die Himbeere|Himbeere;die Heidelbeere|🫐;der Granatapfel|Granatapfel;die Kokosnuss|🥥;die Feige|Feige;die Dattel|Dattel',
 vegetables:'der Kürbis|🎃;der Blumenkohl|Blumenkohl;der Spinat|Spinat;die Bohne|🫘;die Linse|Linse;der Kohl|Kohl;das Radieschen|Radieschen;die Rote Bete|Rote Bete',
 transport:'der Traktor|🚜;das Polizeiauto|🚓;der Krankenwagen|🚑;das Feuerwehrauto|🚒;das Segelboot|⛵;das Kanu|🛶;die Rakete|🚀;der Heißluftballon|🎈',
 sports:'das Skateboard|🛹;der Helm|⛑️;das Tor|🥅;der Golfschläger|🏌️;der Federball|Federball;die Hantel|🏋️;der Badeball|Badeball;das Springseil|Springseil',
 hobbies:'die Flöte|🪈;das Schachspiel|♟️;die Spielkarte|🃏;die Marionette|🎭;die Farbpalette|🎨;das Fernglas|Fernglas;die Briefmarke|Briefmarke;das Karussell|🎠',
 weather:'der Nebel|🌫️;der Hagel|🌨️;das Gewitter|⛈️;der Sturm|🌪️;der Frost|🧊;die Hitze|🥵;die Kälte|🥶;der Regentropfen|💧',
 jobs:'der Bäcker|👨‍🍳;die Friseurin|💇‍♀️;der Gärtner|🧑‍🌾;die Pilotin|👩‍✈️;der Briefträger|📮;die Zahnärztin|🦷;der Fotograf|📸;die Tänzerin|💃',
 colors:'hellblau|color:#a9d9f5;dunkelblau|color:#203a80;hellgrün|color:#b0d87d;dunkelgrün|color:#254a33;beige|color:#d6c3a2;gold|color:#d4af37;silber|color:#c6c9ce;dunkelrot|color:#862d38',
 numbers:'dreizehn|digit:13;vierzehn|digit:14;fünfzehn|digit:15;sechzehn|digit:16;siebzehn|digit:17;achtzehn|digit:18;neunzehn|digit:19;zwanzig|digit:20',
 feelings:'stolz|😌;ruhig|🧘;einsam|😔;erleichtert|😮‍💨;enttäuscht|😞;neugierig|🧐;zufrieden|😊;unsicher|😟',
 everyday:'die Einkaufstasche|🛍️;das Geschenk|🎁;das Portemonnaie|👛;die Geldmünze|Geldmünze;der Geldschein|💶;die Sicherheitsnadel|🧷;die Schachtel|📦;die Batterie|🔋'
};
export const topics=existingTopics.map(t=>({...t,title:t.id==='numbers'?'Zahlen von 1 bis 20':t.title,words:[...t.words,...parseWords(additionalWords[t.id])]}));
export const wordCount=topics.reduce((n,t)=>n+t.words.length,0);
export function topicComplete(progress,topic){return topic.words.every(([label])=>progress.learned.includes(label));}
export function markWordsLearned(progress,words,day=dayKey()) {return {...progress,learned:[...new Set([...progress.learned,...words])],days:[...new Set([...progress.days,day])]};}
export const initialProgress = {xp:0, completed:[], learned:[], days:[], daily:{},activities:{},mistakes:[],testHistory:[]};
export function dayKey(){return new Date().toLocaleDateString('sv-SE');}
export function finishActivity(progress,id,day=dayKey()){
 return {...progress,xp:progress.xp+15,activities:{...progress.activities,[id]:(progress.activities?.[id]||0)+1},days:[...new Set([...progress.days,day])],daily:{...progress.daily,[day]:(progress.daily[day]||0)+1}};
}
export function refreshQuestionArtwork(question){
 const word=topics.flatMap(t=>t.words).find(([label])=>label===question.word);
 const letter=alphabet.find(l=>l.word===question.word);
 return {...question,...(question.image?{image:word?.[1]||letter?.image||question.image}:{}),...(Array.isArray(question.pictureOptions)?{pictureOptions:question.pictureOptions.map(option=>({...option,image:topics.flatMap(t=>t.words).find(([label])=>label===option.label)?.[1]||option.image}))}:{})};
}
export function readProgress(storage){
 try{
  const p=JSON.parse(storage.getItem('fit-deutsch-progress'));
  if(p&&Number.isFinite(p.xp)&&p.xp>=0&&['completed','learned','days'].every(k=>Array.isArray(p[k]))&&p.daily&&typeof p.daily==='object'&&!Array.isArray(p.daily))return {...p,
   testHistory:Array.isArray(p.testHistory)?p.testHistory.slice(-50):[],
   activities:p.activities&&typeof p.activities==='object'&&!Array.isArray(p.activities)?p.activities:{},
   mistakes:Array.isArray(p.mistakes)?p.mistakes.filter(q=>q&&typeof q.id==='string'&&typeof q.correct==='string'&&typeof q.prompt==='string').map(refreshQuestionArtwork):[]
  };
 }catch{}
 return structuredClone(initialProgress);
}
