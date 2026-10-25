import {alphabet} from '../learning.js';
export const syllableWords=[
 ['Mama',['Ma','ma'],'👩'],['Papa',['Pa','pa'],'👨'],['Sonne',['Son','ne'],'Sonne'],['Lampe',['Lam','pe'],'Lampe'],['Nase',['Na','se'],'👃'],['Hase',['Ha','se'],'🐇'],['Blume',['Blu','me'],'Blume'],['Rakete',['Ra','ke','te'],'🚀'],['Tomate',['To','ma','te'],'🍅'],['Banane',['Ba','na','ne'],'🍌'],['Schokolade',['Scho','ko','la','de'],'🍫'],['Schmetterling',['Schmet','ter','ling'],'Schmetterling'],['Regen',['Re','gen'],'🌧️'],['Feuer',['Feu','er'],'🔥'],['Eule',['Eu','le'],'🦉'],['Auto',['Au','to'],'🚗'],['Bücher',['Bü','cher'],'📚'],['Schule',['Schu','le'],'🏫'],['Wasser',['Was','ser'],'Wasser'],['Feder',['Fe','der'],'🪶'],['Karte',['Kar','te'],'🗺️'],['Apfel',['Ap','fel'],'Apfel'],['Birne',['Bir','ne'],'🍐'],['Hund',['Hund'],'🐕'],['Ball',['Ball'],'Badeball'],['Fisch',['Fisch'],'🐟'],['Buch',['Buch'],'Buch'],['Tisch',['Tisch'],'Tisch'],['Hand',['Hand'],'Hand'],['Schiff',['Schiff'],'🚢'],['Brief',['Brief'],'✉️'],['Biene',['Bie','ne'],'🐝'],['Rose',['Ro','se'],'🌹'],['Katze',['Kat','ze'],'🐈'],['Mütze',['Müt','ze'],'Mütze'],['Ei',['Ei'],'🥚']
].map(([word,syllables,art])=>({id:word.toLocaleLowerCase('de'),word,syllables,art}));
export const rhymePairs=[
 ['Haus','Maus',['Bus','Hut']],['Hund','Mund',['Hand','Katze']],['Ball','Fall',['Baum','Bus']],['Fisch','Tisch',['Fuchs','Tasche']],['Nase','Hase',['Rose','Regen']],['Rose','Dose',['Sonne','Auto']],['Hut','Mut',['Mund','Hund']],['Baum','Traum',['Buch','Mond']],['Brot','Boot',['Brett','Ball']],['Hand','Sand',['Hund','Ende']],['Sonne','Tonne',['Suppe','Nase']],['Bein','Stein',['Baum','Buch']]
].map(([word,correct,others],i)=>({id:`rhyme-${i}`,word,correct,options:[correct,...others]}));
export const gestures=[
 {letter:'A',word:'Apfel',art:'Apfel',sound:'Sprich ein kurzes offenes a wie am Anfang von Apfel.',movement:'Öffne die Arme weit. Dein Mund ist dabei offen.'},
 {letter:'I',word:'Igel',art:'🦔',sound:'Ziehe ein langes i wie am Anfang von Igel. Die Lippen gehen etwas in die Breite.',movement:'Zeige einen Finger gerade nach oben wie einen langen Strich.'},
 {letter:'O',word:'Ofen',art:'Ofen',sound:'Forme mit den Lippen ein rundes o wie am Anfang von Ofen.',movement:'Forme mit Daumen und Zeigefinger einen Kreis.'},
 {letter:'U',word:'Uhr',art:'🕘',sound:'Runde die Lippen für ein langes u wie am Anfang von Uhr.',movement:'Halte beide Hände wie eine kleine Schale vor dich.'},
 {letter:'M',word:'Maus',art:'🐁',sound:'Schließe die Lippen und summe mmm. Sprich nicht den Buchstabennamen em.',movement:'Zeige mit zwei Fingern auf die geschlossenen Lippen.'},
 {letter:'F',word:'Fisch',art:'🐟',sound:'Lege die oberen Zähne leicht an die Unterlippe und lasse Luft für fff heraus.',movement:'Halte eine flache Hand vor den Mund und spüre die Luft.'},
 {letter:'L',word:'Lampe',art:'Lampe',sound:'Die Zungenspitze liegt oben hinter den Zähnen. Sprich ein kurzes l, nicht el.',movement:'Zeichne mit einem Finger ein großes L in die Luft.'},
 {letter:'N',word:'Nase',art:'👃',sound:'Lege die Zungenspitze oben an und summe nnn. Sprich nicht en.',movement:'Zeige auf deine Nase und spüre beim Summen die Schwingung.'}
];
const soundNotes={A:'kurzes a',B:'kurzes b',C:'hier wie k',D:'kurzes d',E:'langes e',F:'fff',G:'kurzes g',H:'Hauchlaut h',I:'langes i',J:'j wie in ja',K:'kurzes k',L:'l ohne el',M:'mmm ohne em',N:'nnn ohne en',O:'langes o',P:'kurzes p',Q:'qu klingt hier wie k und w zusammen',R:'r; regional verschieden',S:'hier stimmhaft, wie ein Summen',T:'kurzes t',U:'langes u',V:'hier wie f',W:'hier wie in Wasser',X:'hier k und s zusammen',Y:'hier wie j',Z:'t und s zusammen',Ä:'kurzes ä',Ö:'langes ö',Ü:'langes ü'};
export const onsetTable=alphabet.filter(l=>l.upper!=='ß').map(l=>({...l,...(l.upper==='E'?{word:'Esel',image:'🫏'}:{}),...(l.upper==='O'?{word:'Ohr',image:'👂'}:{}),soundNote:soundNotes[l.upper]}));
export const wordBag=['Mila malt.','Der Hund schläft.','Ich sehe eine Blume.','Der Ball ist rot.','Wir lesen zusammen.','Die Sonne scheint.','Ben hat ein Buch.','Die Katze sitzt hier.','Ich trinke Wasser.','Wir gehen zur Schule.','Meine Mütze ist blau.','Das Schiff fährt.'];
export const diceOrders=['Klatsche dreimal.','Zeige vier Finger.','Winke zweimal mit einer Hand.','Hüpfe dreimal wie ein Frosch.','Zeige auf etwas Blaues im Raum.','Male mit einem Finger einen Kreis in die Luft.'];
export const paintTasks=[{id:'paint-ball',prompt:'Male den Ball rot.',target:'ball',color:'rot'},{id:'paint-tree',prompt:'Male die Baumkrone grün.',target:'tree',color:'grün'},{id:'paint-house',prompt:'Male das Haus blau.',target:'house',color:'blau'},{id:'paint-ball-yellow',prompt:'Male den Ball gelb.',target:'ball',color:'gelb'}];
export const paintColors={rot:'#cd7464',blau:'#719fbd',grün:'#83a56a',gelb:'#e3c574'};
export const helperModules=[
 {id:'sounds',group:1,title:'Laute & Merksignale',icon:'✋',description:'Buchstaben, Anfangslaute und einfache Lernbewegungen verbinden.'},
 {id:'onsets',group:1,title:'Die Anlauttabelle',icon:'🔤',description:'Zu Buchstaben passende Bildwörter entdecken.'},
 {id:'rhythm',group:1,title:'Reime & Silbenklatschen',icon:'👏',description:'Gleiche Wortenden hören und Silben mitklatschen.'},
 {id:'syllables',group:2,title:'Silbenschrift & Silbenbögen',icon:'🌈',description:'Wörter mit Farben und Bögen in überschaubare Teile gliedern.'},
 {id:'cards',group:2,title:'Silbenkärtchen-Spiele',icon:'🧩',description:'Gleiche Silben finden und Wörter zusammensetzen.'},
 {id:'rocket',group:2,title:'Raketenlesen · 20 Sekunden',icon:'🚀',description:'Eine kurze Reihe lesen und gelesene Wörter selbst markieren.'},
 {id:'bag',group:2,title:'Wörter aus dem Säckchen',icon:'🎒',description:'Kurze Wörter oder Sätze ziehen und abwechselnd vorlesen.'},
 {id:'paint',group:3,title:'Lesen & Malen',icon:'🎨',description:'Eine Anweisung lesen und das passende Bild färben.'},
 {id:'dice',group:3,title:'Aufträge würfeln',icon:'🎲',description:'Eine kurze Anweisung würfeln, lesen und ausführen.'},
 {id:'tandem',group:3,title:'Tandem-Lesen',icon:'🤝',description:'Abwechselnd lesen und einander unterstützen.'}
];
export const helperGroups={1:'Basis: Laute und Sprachgefühl',2:'Silben und Wörter trainieren',3:'Verstehen und gemeinsam lesen'};
