import {artParts,flags} from './models.js';
const mc=(prompt,correct,others,explanation)=>({type:'choice',prompt,correct,options:[correct,...others],explanation});
const tf=(prompt,right,explanation)=>mc(prompt,right?'Ja':'Nein',[right?'Nein':'Ja'],explanation);
const fill=(prompt,correct,explanation,accepted=[])=>({type:'text',prompt,correct,explanation,accepted});
const open=(prompt,model)=>({type:'open',prompt,model,lines:3});
const sequence=(prompt,items,explanation)=>({type:'order',prompt,items,correct:items.join(' '),explanation});
const questions=(title,tasks)=>({kind:'questions',title,tasks});
const picture=(kind,name,description)=>({family:'book2',kind,name,description});
const draw=(title,prompt,model)=>({kind:'drawing',title,instructions:prompt,model,tasks:[]});
const painting=(title,art,targets,instructions)=>({kind:'painting',title,art,targets,instructions,tasks:[]});
function unit(id,title,intro,tip,groups,art=null){return {id,title,intro,tip,art,groups:groups.map((g,gi)=>({...g,id:`book2-${id}-g${gi+1}`,tasks:g.tasks.map((q,qi)=>({...q,id:`book2:${id}:${gi+1}:${qi+1}`,...(q.options?{options:[...q.options.slice(qi%q.options.length),...q.options.slice(0,qi%q.options.length)]}:{})}))}))};}
const know=(id,title,rows)=>unit(id,title,'Lies jeden Satz. Wähle die passende Ergänzung.','Prüfe alle Möglichkeiten. Nur eine passt zur Bedeutung.',[questions('Welches Wort passt?',rows.map(([p,a,b,c,why])=>mc(p,a,[b,c],why)))]);
export const bookChapters=[
 {id:'woerter',title:'Wörter verstehen',subtitle:'Sinnvolle Sätze, Eigenschaften und Reime',icon:'book',units:[
  know('alltagswoerter','Was brauche ich im Alltag?',[
   ['Mit einem Schlüssel öffne ich …','ein Schloss.','eine Wolke.','ein Lied.','Ein passender Schlüssel öffnet das Schloss.'],['Ich schreibe eine Notiz mit einem …','Stift.','Schuh.','Kissen.','Ein Stift ist ein Schreibgerät.'],['Bei Regen hält ein Schirm meinen Kopf …','trocken.','unsichtbar.','viereckig.','Der Schirm hält Regen ab.'],['Eine Suppe esse ich mit einem …','Löffel.','Kamm.','Besen.','Der Löffel passt zur flüssigen Suppe.'],['Ein nasses Handtuch soll …','trocknen.','fliegen.','singen.','Beim Trocknen gibt es Feuchtigkeit ab.'],['Ich stelle eine Blume in eine …','Vase.','Socke.','Wolke.','Eine Vase kann Wasser und Blumen aufnehmen.'],['Für ein Buch aus der Bücherei gilt eine …','Ausleihfrist.','Schuhgröße.','Flughöhe.','Bis zum vereinbarten Termin wird das Buch zurückgebracht.'],['Zum Kehren benutze ich einen …','Besen.','Becher.','Ball.','Ein Besen hilft beim Fegen.']
  ].map(r=>r)),
  know('tierwissen','Tiere und ihre Welt',[
   ['Eine Biene besucht oft …','Blüten.','Fernseher.','Schultaschen.','In Blüten findet sie Nektar und Pollen.'],['Ein Fisch lebt im …','Wasser.','Kleiderschrank.','Backofen.','Fische sind an das Leben im Wasser angepasst.'],['Eine Katze kann …','miauen.','Schuhe binden.','Briefe schreiben.','Miauen ist eine Lautäußerung der Katze.'],['Ein Vogelnest ist ein Platz zum …','Brüten.','Autofahren.','Backen.','Viele Vögel legen ihre Eier in ein Nest.'],['Eine Schnecke trägt bei vielen Arten ein …','Haus.','Fahrrad.','Telefon.','Das Schneckenhaus gehört zum Tier.'],['Aus einer Raupe kann ein … werden.','Schmetterling','Schneeball','Schlüssel','Bei Schmetterlingen entwickelt sich die Raupe über die Puppe weiter.'],['Ein Igel hat auf dem Rücken …','Stacheln.','Federn.','Schuppen.','Stacheln schützen den Igel.'],['Ein Kaninchen frisst zum Beispiel …','Heu.','Schrauben.','Plastik.','Heu ist ein wichtiges Futter für Kaninchen.']
  ]),
  know('naturwoerter','Draußen entdecken',[
   ['Eine Eichel wächst an einer …','Eiche.','Wolke.','Rose.','Die Eichel ist die Frucht der Eiche.'],['Wenn Wasser gefriert, entsteht …','Eis.','Sand.','Holz.','Gefrorenes Wasser ist Eis.'],['Eine Pfütze ist mit … gefüllt.','Wasser','Wolle','Papier','Regenwasser sammelt sich in Vertiefungen.'],['Die Wurzeln einer Pflanze wachsen meist in der …','Erde.','Schultasche.','Lampe.','Wurzeln nehmen Wasser und Nährstoffe auf.'],['Ein Windstoß kann Blätter …','bewegen.','lesen.','füttern.','Wind bewegt lose Blätter.'],['Nach dem Winter kommt der …','Frühling.','Herbst.','Winter.','Die Jahreszeiten folgen aufeinander.'],['Viele Bäume verlieren im Herbst ihre …','Blätter.','Wurzeln.','Stämme.','Bei vielen Laubbäumen fallen die Blätter im Herbst ab.'],['Die Sonne gibt uns …','Licht.','Seife.','Brot.','Sonnenlicht erreicht die Erde.']
  ]),
  know('dinge-werkzeuge','Dinge und ihre Aufgaben',[
   ['Eine Uhr zeigt die …','Zeit.','Schuhgröße.','Buchfarbe.','Mit einer Uhr liest man die Uhrzeit ab.'],['Mit einer Lupe sehe ich kleine Dinge …','größer.','leiser.','süßer.','Eine Lupe vergrößert das Bild.'],['Ein Thermometer misst die …','Temperatur.','Lautstärke.','Wortlänge.','Die Skala zeigt eine Temperatur.'],['Ein Helm schützt den …','Kopf.','Teller.','Baum.','Ein passender Helm schützt den Kopf.'],['In einem Rucksack kann ich Dinge …','tragen.','kochen.','auflösen.','Ein Rucksack ist eine Tragetasche für den Rücken.'],['Eine Waage zeigt, wie … etwas ist.','schwer','lustig','laut','Eine Waage bestimmt eine Masse bzw. ein Gewicht.'],['Mit einer Gießkanne bekommt die Pflanze …','Wasser.','Schuhe.','Musik.','Mit der Gießkanne gießt man Pflanzen.'],['Eine Landkarte hilft beim …','Orientieren.','Zähneputzen.','Schlafen.','Eine Karte zeigt Orte und Wege.']
  ]),
  know('reime','Welche Wörter reimen sich?',[
   ['Was reimt sich auf Haus?','Maus','Hase','Hose','Haus und Maus klingen am Ende gleich.'],['Was reimt sich auf Hut?','Mut','Hand','Heft','Hut und Mut haben den gleichen Reim.'],['Was reimt sich auf Fisch?','Tisch','Fuchs','Fass','Fisch und Tisch enden auf denselben Lauten.'],['Was reimt sich auf Schuh?','Kuh','Schaf','Schnee','Schuh und Kuh klingen am Ende gleich.'],['Was reimt sich auf Wand?','Sand','Wind','Wald','Wand und Sand bilden einen Reim.'],['Was reimt sich auf Tanne?','Kanne','Tonne','Tante','Tanne und Kanne reimen sich.'],['Was reimt sich auf Brot?','Boot','Buch','Baum','Brot und Boot haben denselben Wortausgang.'],['Was reimt sich auf Tasche?','Flasche','Tasse','Tafel','Tasche und Flasche reimen sich.']
  ]),
  know('genau-lesen','Ein kleines Wort macht einen Unterschied',[
   ['Was ist das Gegenteil von leer?','voll','weich','rund','Leer und voll beschreiben unterschiedliche Füllstände.'],['Welche Aussage ist sinnvoll?','Die Lampe leuchtet.','Die Lampe bellt.','Die Lampe frühstückt.','Eine Lampe gibt Licht.'],['Welches Wort bedeutet mehrere Bücher?','Bücher','Buch','Buche','Bücher ist die Mehrzahl von Buch.'],['Welche Aussage ist verneint?','Der Hund schläft nicht.','Der Hund schläft.','Der Hund ist müde.','Nicht verneint die Handlung.'],['Was ist das Gegenteil von unter?','über','neben','mit','Über und unter beschreiben entgegengesetzte Lagen.'],['Welche Frage sucht einen Ort?','Wo liegt das Heft?','Wie alt bist du?','Warum lachst du?','Wo fragt nach einem Ort.'],['Was bedeutet zuerst?','am Anfang','am Ende','nirgendwo','Zuerst nennt den ersten Schritt.'],['Welche Aussage passt zu einer Bitte?','Hilfst du mir bitte?','Hier steht ein Baum.','Heute ist Dienstag.','Die Frage bittet freundlich um Hilfe.']
  ])
 ]},
 {id:'bilder',title:'Bilddetektive',subtitle:'Schau genau hin und prüfe die Sätze',icon:'cat',units:[]},
 {id:'farben',title:'Farbenwerkstatt',subtitle:'Lies und färbe die passenden Flächen',icon:'flower',units:[]},
 {id:'formen',title:'Formen und Orte',subtitle:'Groß und klein, davor und dahinter',icon:'star',units:[]},
 {id:'zaehlen',title:'Zählen und vergleichen',subtitle:'Lies die Frage und zähle im Bild',icon:'apple',units:[]},
 {id:'raetsel',title:'Wörterrätsel',subtitle:'Hinweise verbinden und Wörter entdecken',icon:'box',units:[]},
 {id:'comics',title:'Bildergeschichten',subtitle:'Bilder, Sätze und Reihenfolgen verbinden',icon:'robot',units:[]},
 {id:'gestalten',title:'Lesen und gestalten',subtitle:'Lies einen Text und mache daraus dein Bild',icon:'kite',units:[]}
];

const pictureChecks=[
 ['ida-bild','Ida ist bereit',picture('explorer','Ida','Ida mit Hut, Jacke, Stiefeln und Tasche. Links liegt ein offenes Buch.'),[
  ['Auf dem Namensschild steht Ida.',true,'Unter der Figur steht Ida.'],['Ida trägt einen Hut.',true,'Der Hut hat eine breite Krempe.'],['Ida hält einen Regenschirm.',false,'Es ist kein Schirm zu sehen.'],['Rechts neben Ida steht eine Tasche.',true,'Die Tasche ist auf deiner rechten Bildseite.'],['Links liegt ein offenes Buch.',true,'Das Buch liegt links von der Figur.'],['Ida trägt Schlittschuhe.',false,'Auf dem Bild siehst du Stiefel.'],['Ida hat vier Taschen.',false,'Es gibt eine Tasche.']]],
 ['momo-bild','Momo und das Kissen',picture('cat','Momo','Katze Momo sitzt auf einem Kissen. Links liegt ein Ball, rechts steht ein Napf.'),[
  ['Das Tier ist eine Katze.',true,'Die Ohren, Schnurrhaare und der Schwanz passen zu einer Katze.'],['Die Katze heißt Rolo.',false,'Unter dem Bild steht Momo.'],['Momo trägt ein Halsband.',true,'Das Band liegt unter dem Kopf.'],['Links von Momo liegt ein Ball.',true,'Der Ball liegt auf deiner linken Seite.'],['Rechts steht ein Napf.',true,'Der Napf steht rechts.'],['Momo sitzt auf einem Fahrrad.',false,'Momo sitzt auf einem Kissen.'],['Momo hat einen langen Schwanz.',true,'Der Schwanz ist rechts hinter dem Körper zu sehen.']]],
 ['fahrrad-bild','Was ist am Fahrrad?',picture('bicycle',null,'Fahrrad mit zwei Rädern, Sattel, Klingel und einem Korb mit drei Äpfeln.'),[
  ['Das Fahrrad hat zwei Räder.',true,'Du siehst ein vorderes und ein hinteres Rad.'],['Am Lenker ist eine Klingel.',true,'Die kleine runde Klingel sitzt am Lenker.'],['Im Korb liegen Bücher.',false,'Im Korb liegen Äpfel.'],['Im Korb liegen drei Äpfel.',true,'Zähle die drei Früchte.'],['Das Fahrrad hat ein Segel.',false,'Ein Segel gehört hier nicht zum Bild.'],['Über dem Rahmen sitzt der Sattel.',true,'Der Sattel ist oberhalb des Rahmens befestigt.'],['Es sind keine Pedale zu sehen.',false,'Unten am Rahmen ist ein Pedal mit Kurbel.']]],
 ['garten-bild','Ein Garten voller Details',picture('garden',null,'Haus mit einem Baum links, einer Sonne rechts oben, einer Wolke und fünf Blumen unten.'),[
  ['Links vom Haus steht ein Baum.',true,'Der Baum steht links.'],['Das Haus hat zwei Fenster.',true,'Zähle die beiden Fenster.'],['Auf dem Dach steht ein Elefant.',false,'Auf dem Dach steht kein Tier.'],['Die Sonne ist über dem Haus.',true,'Die Sonne ist rechts oben.'],['Vor dem Haus wachsen fünf Blumen.',true,'Unten stehen fünf Blumen.'],['Das Haus hat keine Tür.',false,'Die Tür ist unten in der Hauswand.'],['Oben ist eine Wolke zu sehen.',true,'Die Wolke ist links von der Sonne.']]],
 ['rolo-bild','Roboter Rolo',picture('robot','Rolo','Roboter Rolo mit zwei Antennen, zwei Augen, drei Bauchknöpfen, zwei Händen und zwei Stiefeln.'),[
  ['Der Roboter heißt Rolo.',true,'Der Name steht unter der Figur.'],['Rolo hat zwei Antennen.',true,'Über dem Kopf stehen zwei Antennen.'],['Rolo hat nur ein Auge.',false,'Es sind zwei Augen.'],['Auf dem Bauch sind drei Knöpfe.',true,'Die drei Knöpfe stehen untereinander.'],['Rolo hat sechs Hände.',false,'Du siehst zwei Hände.'],['Rolo trägt zwei Stiefel.',true,'An jedem Bein ist ein Stiefel.'],['Auf Rolos Kopf sitzt eine Katze.',false,'Über dem Kopf sind nur die Antennen.']]],
 ['nila-bild','Nila auf dem Blatt',picture('snail','Nila','Schnecke Nila auf einem großen Blatt; links steht eine Blume.'),[
  ['Nila ist eine Schnecke.',true,'Du siehst ein Schneckenhaus und Fühler.'],['Nila trägt ein Schneckenhaus.',true,'Auf dem Körper liegt das runde Haus.'],['Nila sitzt auf einem Blatt.',true,'Das große Blatt liegt unter ihr.'],['Die Blume steht rechts von Nila.',false,'Die Blume steht auf deiner linken Seite.'],['Auf dem Haus ist eine Spirale.',true,'Die Linie windet sich nach innen.'],['Nila hat einen Fahrradlenker.',false,'Die beiden Fühler sind keine Fahrradteile.'],['Unter dem Bild steht Nila.',true,'Lies den Namen.']]]
];
bookChapters[1].units=pictureChecks.map(([id,title,art,rows])=>unit(id,title,'Sieh dir das Bild an. Entscheide dann bei jedem Satz: Ja oder Nein.','Antworte mit dem, was du im Bild erkennen oder lesen kannst. Links und rechts meinen deine Bildseite.',[questions('Stimmt der Satz zum Bild?',rows.map(r=>tf(...r))),questions('Mit eigenen Worten',[open('Schreibe einen weiteren Satz, der zum Bild passt.','Beschreibe ein tatsächlich sichtbares Detail. Verschiedene Sätze sind möglich.')])],art));

function flagUnit(id,title,countries){const art={family:'book2',kind:'flags',countries,description:countries.map(c=>flags[c].name).join(', ')+' – Flaggen zum Färben'};const targets=Object.fromEntries(artParts(art).map(p=>[p.id,p.color]));return unit(id,title,'Lies die Anweisungen und färbe die Flächen. Weiße Flächen dürfen weiß bleiben.','Links und rechts sind von deinem Blick auf das Bild aus gemeint. In der Flagge Deutschlands heißt der gelbe Streifen auch Gold.',[painting('Färbe die Flaggen',art,targets,artParts(art).map(p=>`${p.label}: ${p.color}.`)),questions('Lies noch einmal nach',[mc('Was bedeutet „der mittlere Streifen“?','der Streifen zwischen den beiden äußeren',['immer der obere Streifen','immer der linke Streifen'],'Die Mitte liegt zwischen den äußeren Flächen.'),open('Welche zwei Farben kommen in diesen Flaggen vor? Schreibe ihre Namen.','Nenne zwei Farben, die du in diesen Flaggen verwendet hast.')])]);}
bookChapters[2].units=[
 flagUnit('flaggen-eins','Streifen von oben und von links',['de','fr','it']),
 flagUnit('flaggen-zwei','Andere Reihenfolgen, andere Flaggen',['ie','at','be']),
 flagUnit('flaggen-drei','Kreuze und ein Dreieck',['ch','se','cz']),
 unit('idas-farben','Idas farbige Ausrüstung','Ida packt ihre Sachen. Lies genau und färbe nur die genannten Flächen.','Für eine neue Farbe wählst du zuerst den Farbstift und dann die passende Fläche.',[
  painting('Ida bekommt Farben',picture('explorer','Ida'),{hut:'lila',jacke:'gelb',tasche:'grün',stiefel:'blau'},['Der Hut soll lila werden.','Färbe die Jacke gelb.','Die Tasche bekommt Grün.','Beide Stiefel sollen blau sein.']),questions('Hast du genau gelesen?',[mc('Was soll grün werden?','die Tasche',['die Jacke','der Hut'],'In der Anweisung steht: Die Tasche bekommt Grün.'),mc('Wie viele Stiefel bekommen Blau?','beide',['nur einer','keiner'],'Beide bedeutet hier zwei.')])
 ]),
 unit('segelfarben','Ein Segelboot bekommt Farbe','Ein Boot wartet auf seine Farben. Die Anweisungen nennen seine Teile.','Unterscheide die Segel über dem Rumpf von der kleinen Fahne oben.',[
  painting('Färbe das Boot',picture('boat'),{rumpf:'orange',segel:'gelb',flagge:'rot',meer:'blau'},['Der Schiffsrumpf wird orange.','Färbe beide Segel gelb.','Die kleine Fahne soll rot sein.','Das Wasser bekommt Blau.']),questions('Wörter zum Boot',[mc('Welcher Teil ist ganz oben?','die Fahne',['das Wasser','der Rumpf'],'Die Fahne sitzt oben am Mast.'),mc('Wo sind die Segel?','über dem Rumpf',['unter Wasser','im Korb'],'Die beiden Segel sind oberhalb des Rumpfes.')])
 ]),
 unit('formfarben','Große und kleine Formen','Manche Formen sehen gleich aus, sind aber verschieden groß.','Lies auch die Wörter groß und klein. Sie gehören zur Anweisung.',[
  painting('Färbe jede genannte Form',{family:'book2',kind:'shapes',items:[{id:'kreis-gross',kind:'circle',label:'großer Kreis',x:155,y:155,size:160},{id:'kreis-klein',kind:'circle',label:'kleiner Kreis',x:430,y:155,size:80},{id:'quadrat-gross',kind:'square',label:'großes Quadrat',x:155,y:430,size:160},{id:'quadrat-klein',kind:'square',label:'kleines Quadrat',x:430,y:430,size:80}]},{'kreis-gross':'rot','kreis-klein':'gelb','quadrat-gross':'blau','quadrat-klein':'grün'},['Der große Kreis wird rot.','Der kleine Kreis bleibt nicht weiß: Färbe ihn gelb.','Das große Quadrat bekommt Blau.','Das kleine Quadrat wird grün.']),questions('Lies und unterscheide',[mc('Welche Form soll gelb sein?','der kleine Kreis',['das kleine Quadrat','der große Kreis'],'In der zweiten Anweisung steht der kleine Kreis.'),mc('Wie viele Formen gibt es?','vier',['drei','fünf'],'Zwei Kreise und zwei Quadrate ergeben vier Formen.')])
 ])
];

const shapes=(items,description)=>({family:'book2',kind:'shapes',items,description});
const s=(id,kind,x,y,size,color='weiß',extra={})=>({id,kind,x,y,size,color,label:id,...extra});
const positionUnits=[
 ['oben-unten','Was liegt über und unter?',shapes([s('Kreis','circle',300,105,120),s('Dreieck','triangle',300,300,140),s('Quadrat','square',300,495,100)],'Oben ein Kreis, in der Mitte ein Dreieck, unten ein Quadrat.'),[
  ['Welche Form liegt oben?','der Kreis','das Quadrat','das Dreieck'],['Wo liegt das Quadrat?','unter dem Dreieck','über dem Kreis','im Kreis'],['Was liegt zwischen Kreis und Quadrat?','das Dreieck','ein Stern','ein Herz'],['Der Kreis liegt …','über dem Dreieck.','unter dem Quadrat.','neben dem Quadrat.'],['Welche Form liegt ganz unten?','das Quadrat','der Kreis','ein Pfeil']]],
 ['links-rechts','Auf welcher Seite?',shapes([s('Stern','star',130,285,165),s('Mond','moon',460,285,160)],'Links steht ein Stern, rechts ein Mond.'),[
  ['Was siehst du links?','einen Stern','einen Mond','ein Kreuz'],['Wo liegt der Mond?','rechts vom Stern','links vom Stern','unter dem Stern'],['Der Stern liegt …','neben dem Mond.','hinter dem Mond.','im Mond.'],['Was ist rechts?','der Mond','der Stern','ein Dreieck'],['Die beiden Formen liegen …','nebeneinander.','übereinander.','ineinander.']]],
 ['vor-hinter','Welche Form verdeckt die andere?',shapes([s('Viereck','square',245,285,275,'grau'),s('Stern','star',350,320,240,'gelb')],'Ein Stern überdeckt einen Teil eines grauen Vierecks.'),[
  ['Welche Form verdeckt einen Teil der anderen?','der Stern','das Viereck','ein Kreis'],['Welche Form ist im Bild hinten?','das Viereck','der Stern','ein Mond'],['Der Stern liegt …','vor dem Viereck.','hinter dem Viereck.','ganz außerhalb des Vierecks.'],['Kannst du das ganze Viereck sehen?','Nein','Ja','Es gibt kein Viereck.'],['Welche Beschreibung passt?','Die Formen überlappen sich.','Die Formen liegen weit auseinander.','Es gibt nur eine Form.']]],
 ['gross-klein','Gleiche Form, andere Größe',shapes([s('großes Dreieck','triangle',155,160,190),s('kleines Dreieck','triangle',445,160,85),s('kleines Herz','heart',155,445,85),s('großes Herz','heart',445,445,185)],'Oben links ein großes Dreieck, oben rechts ein kleines; unten links ein kleines Herz, unten rechts ein großes.'),[
  ['Wo ist das größere Dreieck?','links oben','rechts oben','rechts unten'],['Wo ist das kleinere Herz?','links unten','rechts unten','links oben'],['Wie viele Herzen siehst du?','zwei','eins','drei'],['Das größere Herz liegt …','rechts unten.','links oben.','rechts oben.'],['Welche Aussage stimmt?','Es gibt zwei verschieden große Dreiecke.','Alle Formen sind gleich groß.','Es gibt drei Herzen.']]],
 ['musterlesen','Punkte oder Streifen?',shapes([s('gepunkteter Kreis','circle',170,280,210,'weiß',{pattern:'dots'}),s('gestreiftes Quadrat','square',435,280,175,'weiß',{pattern:'stripes'})],'Links ein Kreis mit Punkten, rechts ein Quadrat mit Streifen.'),[
  ['Welche Form hat Punkte?','der Kreis','das Quadrat','ein Dreieck'],['Welche Form hat Streifen?','das Quadrat','der Kreis','ein Herz'],['Wo liegt der Kreis?','links vom Quadrat','rechts vom Quadrat','unter dem Quadrat'],['Was beschreibt das Muster im Kreis?','viele einzelne Punkte','lange gerade Streifen','keine Markierung'],['Welche Aussage passt?','Die Formen haben verschiedene Muster.','Beide Formen sind leer.','Beide Formen haben nur Streifen.']]],
 ['formen-finden','Finde die beschriebene Form',shapes([s('Kreis','circle',110,150,115),s('Quadrat','square',300,150,110),s('Dreieck','triangle',490,150,120),s('Herz','heart',110,430,120),s('Rechteck','rectangle',300,430,140),s('Ring','ring',490,430,120)],'Oben Kreis, Quadrat und Dreieck; unten Herz, Rechteck und Ring.'),[
  ['Welche Form hat drei Ecken?','das Dreieck','der Kreis','der Ring'],['Welche Form hat in der Mitte ein Loch?','der Ring','das Herz','das Quadrat'],['Welche Form liegt unter dem Quadrat?','das Rechteck','das Herz','der Kreis'],['Welche Form hat keine Ecken?','der Kreis','das Dreieck','das Quadrat'],['Welche Aussage stimmt?','Ein Quadrat ist auch ein Viereck.','Ein Kreis hat vier Ecken.','Ein Dreieck hat sechs Seiten.']]]
];
const ownShapeTasks={
 'oben-unten':['Zeichne einen Kreis über einem Dreieck. Ergänze darunter ein Quadrat.','Von oben nach unten: Kreis, Dreieck, Quadrat.'],
 'links-rechts':['Zeichne links einen Stern und rechts einen Mond.','Stern links, Mond rechts.'],
 'vor-hinter':['Zeichne zwei überlappende Formen. Markiere, welche Form vorne liegt.','Die vordere Form verdeckt einen Teil der hinteren.'],
 'gross-klein':['Zeichne zwei verschieden große Herzen. Das größere Herz soll rechts sein.','Ein kleines Herz links und ein großes Herz rechts.'],
 'musterlesen':['Zeichne ein Quadrat mit Punkten und einen Kreis mit Streifen.','Punkte sind einzelne Tupfen. Streifen sind längere Linien.'],
 'formen-finden':['Zeichne zwei grüne Quadrate und drei blaue Dreiecke.','Es gibt insgesamt fünf Formen: zwei Quadrate und drei Dreiecke.']
};
bookChapters[3].units=positionUnits.map(([id,title,art,rows])=>unit(id,title,'Lies die Frage und schau auf die Lage, Größe oder Form.','Links und rechts sind so gemeint, wie du auf das Bild schaust. Bei überlappenden Formen liegt die verdeckende Form vorne.',[questions('Schau genau hin',rows.map(([p,a,b,c])=>mc(p,a,[b,c],`Zum Bild passt: ${a}`))),draw('Deine eigene Anordnung',...ownShapeTasks[id])],art));

const display=(items,description)=>({family:'book2',kind:'display',items,description});
function gridItems(kinds){return kinds.map((kind,i)=>({kind,x:100+(i%4)*135,y:100+Math.floor(i/4)*145,scale:.68}));}
const numberWords=['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf'];
const count=(prompt,n,why)=>({...fill(prompt,String(n),why,[numberWords[n]]),caseSensitive:false});
bookChapters[4].units=[
 unit('obst-zaehlen','Äpfel im Lesebild','Lies erst die Frage. Zähle dann die passenden Dinge.','Eine Zahl kannst du als Ziffer oder als Wort eingeben.',[
  questions('Zähle im Bild',[count('Wie viele Äpfel sind zu sehen?',7,'Es sind sieben Äpfel.'),count('Wie viele Bücher liegen zwischen den Äpfeln?',2,'Die beiden Bücher erkennst du an ihren Seiten.'),count('Wie viele Dinge sind es zusammen?',9,'7 Äpfel + 2 Bücher = 9 Dinge.'),mc('Was ist häufiger zu sehen?','Äpfel',['Bücher','Beides ist gleich oft zu sehen.'],'Sieben ist mehr als zwei.'),count('Ein Apfel wird weggenommen. Wie viele Äpfel bleiben?',6,'7 − 1 = 6.')])
 ],display(gridItems(['apple','apple','book','apple','apple','apple','book','apple','apple']),'Sieben Äpfel und zwei Bücher.')),
 unit('sterne-zaehlen','Sterne und Wolken','Manchmal sind verschiedene Dinge gemischt. Zähle jede Sorte getrennt.','Lege beim Zählen den Finger an jedes bereits gezählte Bild.',[
  questions('Sterne entdecken',[count('Wie viele Sterne siehst du?',6,'Es sind sechs Sterne.'),count('Wie viele Wolken siehst du?',3,'Es sind drei Wolken.'),count('Wie viele Bilder sind es insgesamt?',9,'6 + 3 = 9.'),mc('Was ist öfter zu sehen?','Sterne',['Wolken','Beides gleich oft.'],'Sechs Sterne sind mehr als drei Wolken.'),count('Zwei Sterne kommen dazu. Wie viele wären es dann?',8,'6 + 2 = 8.')])
 ],display(gridItems(['star','cloud','star','star','cloud','star','star','cloud','star']),'Sechs Sterne und drei Wolken.')),
 unit('katzen-zaehlen','Katzen und Bälle','Zähle die gezeichneten Tiere und ihre Spielsachen.','Die Fragen beziehen sich auf dieses Bild.',[
  questions('Genau gezählt',[count('Wie viele Katzen sind im Bild?',3,'Es sind drei Katzen.'),count('Wie viele Bälle siehst du?',4,'Es sind vier Bälle.'),count('Wie viele Dinge und Tiere sind es zusammen?',7,'3 Katzen + 4 Bälle = 7.'),count('Jede gezeichnete Katze hat zwei Ohren. Wie viele Ohren sind das zusammen?',6,'3 × 2 = 6 Ohren in diesem Bild.'),mc('Reicht ein Ball für jede gezeichnete Katze?','Ja, ein Ball bleibt übrig.',['Nein, ein Ball fehlt.','Nein, es gibt keine Bälle.'],'Vier Bälle reichen für drei Katzen.')])
 ],display(gridItems(['cat','ball','cat','ball','ball','cat','ball']),'Drei Katzen mit jeweils zwei Ohren und vier Bälle.')),
 unit('zug-zaehlen','Räder und Wagen','Ein Zug besteht hier aus einer Lok und zwei angehängten Wagen.','Zähle nur die Teile, nach denen gefragt wird.',[
  questions('Zähle am Zug',[count('Wie viele Lokomotiven siehst du?',1,'Vorne steht eine Lok.'),count('Wie viele angehängte Wagen siehst du?',2,'Hinter der Lok sind zwei Wagen.'),count('Wie viele Räder sind im Bild sichtbar?',6,'An jedem der drei Fahrzeuge sind zwei Räder sichtbar.'),count('Wie viele Rauchwolken sind gezeichnet?',3,'Über dem Schornstein stehen drei Wolken.'),count('Wie viele Fahrzeuge sind es mit der Lok zusammen?',3,'1 Lok + 2 Wagen = 3 Fahrzeuge.')])
 ],picture('train',null,'Eine Lok, zwei angehängte Wagen, sechs sichtbare Räder und drei Rauchwolken.')),
 unit('formen-zaehlen','Ecken und Formen zählen','Auch Formen kann man zählen und vergleichen.','Ein Kreis und ein Ring haben keine Ecken.',[
  questions('Lies und zähle',[count('Wie viele Dreiecke siehst du?',3,'Es sind drei Dreiecke.'),count('Wie viele Kreise siehst du?',2,'Es sind zwei Kreise.'),count('Wie viele Formen sind es zusammen?',5,'3 + 2 = 5.'),count('Wie viele Ecken haben die drei Dreiecke zusammen?',9,'Jedes Dreieck hat drei Ecken: 3 × 3 = 9.'),mc('Welche Formen haben hier keine Ecken?','die Kreise',['die Dreiecke','alle Formen haben Ecken.'],'Kreise sind rund und haben keine Ecken.')])
 ],shapes([s('Dreieck 1','triangle',120,140,110),s('Kreis 1','circle',330,140,100),s('Dreieck 2','triangle',500,140,100),s('Kreis 2','circle',170,420,120),s('Dreieck 3','triangle',430,420,130)],'Drei Dreiecke und zwei Kreise.')),
 unit('mischbild-zaehlen','Das gemischte Suchbild','Lies jede Frage bis zum Ende. Nicht immer sollst du alles zählen.','Zuerst getrennt zählen, danach bei Bedarf zusammenrechnen.',[
  questions('Genau unterscheiden',[count('Wie viele Blumen sind zu sehen?',3,'Es sind drei Blumen.'),count('Wie viele Äpfel sind zu sehen?',4,'Es sind vier Äpfel.'),count('Wie viele Bälle sind zu sehen?',1,'Es ist ein Ball.'),count('Wie viele Äpfel und Blumen sind es zusammen?',7,'4 + 3 = 7. Der Ball zählt hier nicht mit.'),count('Wie viele Bilder sind es insgesamt?',8,'4 + 3 + 1 = 8.')])
 ],display(gridItems(['flower','apple','ball','apple','flower','apple','apple','flower']),'Drei Blumen, vier Äpfel und ein Ball.'))
];

const riddleSets=[
 ['raetsel-schultasche','Was gehört in die Schultasche?',[
  [['Ich habe viele Seiten.','Du kannst in mir lesen.','Oft habe ich einen Titel.'],'das Buch','der Ball','die Gabel'],
  [['Ich mache Zeichen auf Papier.','Du hältst mich in der Hand.','Mit mir kannst du schreiben.'],'der Stift','der Hut','die Wolke'],
  [['Ich habe zwei Klingen.','Ich kann Papier schneiden.','Halte mich vorsichtig an den Griffen.'],'die Schere','die Tasse','der Spiegel'],
  [['Ich zeige gerade Abstände.','Auf mir stehen Zahlen und kleine Striche.','Du kannst mit mir Linien ziehen.'],'das Lineal','das Kissen','die Vase']
 ],'BUCH'],
 ['raetsel-kueche','Rätsel aus der Küche',[
  [['Ich habe einen Stiel und eine kleine Mulde.','Mit mir kannst du Suppe essen.','Ich gehöre zum Besteck.'],'der Löffel','der Kamm','der Schuh'],
  [['Ich bin ein Gefäß.','Du kannst aus mir trinken.','Oft habe ich einen Henkel.'],'die Tasse','die Socke','die Schere'],
  [['Ich halte Lebensmittel kalt.','Ich brauche meist Strom.','Innen stehen oft Milch und Gemüse.'],'der Kühlschrank','der Teppich','die Gießkanne'],
  [['Ich wachse an einem Baum.','Ich bin eine Frucht.','In meiner Mitte gibt es Kerne.'],'der Apfel','der Stuhl','der Schlüssel']
 ],'LÖFFEL'],
 ['raetsel-draussen','Draußen gefunden',[
  [['Ich habe zwei Räder.','Mit Pedalen bewegst du mich.','Mit meinem Lenker kannst du steuern.'],'das Fahrrad','das Boot','der Ball'],
  [['Du hältst mich über deinen Kopf.','Ich lasse mich aufspannen.','Bei Regen kann ich dich trocken halten.'],'der Regenschirm','der Löffel','die Brille'],
  [['Du siehst mich am Himmel.','Sonnenlicht und Regentropfen lassen mich entstehen.','Ich zeige mehrere Farben in einem Bogen.'],'der Regenbogen','der Rucksack','der Teller'],
  [['Ich habe Wurzeln und einen Stamm.','An meinen Ästen wachsen Blätter oder Nadeln.','Vögel können in mir sitzen.'],'der Baum','der Ballon','der Schal']
 ],'BAUM'],
 ['raetsel-tiere','Tierische Hinweise',[
  [['Ich bin ein Vogel.','Ich kann nicht fliegen.','Ich schwimme gut und watschle an Land.'],'der Pinguin','die Katze','der Adler'],
  [['Ich habe Fühler.','Viele von uns tragen ein Haus.','Ich krieche langsam.'],'die Schnecke','das Pferd','der Spatz'],
  [['Ich bin ein Säugetier.','Ich habe ein Fell.','Ich kann miauen und schnurren.'],'die Katze','die Ente','die Eiche'],
  [['Ich bin ein Insekt.','Ich entwickle mich aus einer Raupe.','Ich habe auffällige Flügel.'],'der Schmetterling','der Hase','der Wal']
 ],'KATZE'],
 ['raetsel-zuhause','Was steht zu Hause?',[
  [['Ich habe ein Gestell.','Ich liege vor deinen Augen auf der Nase.','Meine Gläser können beim Sehen helfen.'],'die Brille','die Flasche','die Gabel'],
  [['Ich bin aus Wachs.','Ich habe einen Docht.','Eine erwachsene Person kann mich zum Leuchten anzünden.'],'die Kerze','der Schlüssel','der Ball'],
  [['Du legst den Kopf auf mich.','Ich bin weich.','Oft liege ich im Bett.'],'das Kissen','das Lineal','der Stein'],
  [['Ich habe eine Fläche und meistens Beine.','Du stellst Teller oder ein Heft auf mich.','An mir kannst du sitzen und arbeiten.'],'der Tisch','der Regen','der Mond']
 ],'KISSEN'],
 ['raetsel-reise','Rätsel für die Reise',[
  [['Ich schwimme auf dem Wasser.','Menschen können in mir sitzen.','Manche von uns haben Segel.'],'das Boot','der Besen','die Uhr'],
  [['Ich habe Riemen.','Du trägst mich auf dem Rücken.','Ich biete Platz für deine Sachen.'],'der Rucksack','der Spiegel','die Schüssel'],
  [['Ich zeige Orte und Wege.','Du kannst mich auf Papier oder auf einem Bildschirm ansehen.','Ich helfe bei der Orientierung.'],'die Karte','die Socke','die Kerze'],
  [['Ich fahre auf Schienen.','Oft habe ich mehrere Wagen.','Menschen reisen in mir von Ort zu Ort.'],'der Zug','die Blume','das Kissen']
 ],'BOOT']
];
bookChapters[5].units=riddleSets.map(([id,title,rows,word])=>unit(id,title,'Lies alle drei Hinweise. Erst zusammen verraten sie die Lösung.','Ein einzelner Hinweis kann zu vielen Dingen passen. Die Lösung muss zu allen Hinweisen passen.',[
 questions('Was ist gesucht?',rows.map(([clues,a,b,c])=>mc(clues.join(' '),a,[b,c],`Die Lösung lautet: ${a}.`))),
 questions('Buchstaben in die richtige Reihenfolge bringen',[sequence('Ordne die Buchstaben zu einem Wort aus den Rätseln.',[...word],`Das Wort heißt ${word}. Jeder Buchstabe wird einmal benutzt.`)]),
 questions('Dein eigenes Rätsel',[open('Erfinde drei Hinweise zu einem anderen Gegenstand.','Zum Beispiel: Ich bin rund. Man kann mich rollen. Mit mir kann man spielen. Lösung: der Ball. Andere klare Rätsel sind möglich.')])
 ]));

const icon=(kind,x,y,scale=1,color)=>({kind,x,y,scale,color});
const panel=(text,items)=>({text,art:display(items,text)});
export const bookStories=[
 {id:'rolo-schatten',title:'Rolo sucht Schatten',panels:[
  panel('Die Sonne scheint. Rolo steht auf dem warmen Weg.',[icon('sun',470,110,1),icon('robot',300,365,1.5)]),
  panel('Rolo entdeckt einen Baum und geht zu ihm.',[icon('tree',205,290,2.1),icon('robot',450,375,1.2)]),
  panel('Unter der Baumkrone findet Rolo einen schattigen Platz.',[icon('tree',300,250,2.8),icon('robot',305,418,1.1)])
 ],questions:[['Was scheint am Anfang?','die Sonne','der Mond','eine Lampe'],['Wohin geht Rolo?','zu einem Baum','in ein Boot','auf eine Wolke']],facts:[['Rolo sucht einen schattigen Platz.',true],['Am Ende steht Rolo auf dem Baum.',false],['Die Geschichte zeigt drei Schritte.',true]]},
 {id:'momos-hut',title:'Momo und der große Hut',panels:[
  panel('Momo findet eine Kiste vor der Tür.',[icon('cat',180,365,1.4),icon('box',425,390,1.4)]),
  panel('In der Kiste liegt ein großer Hut.',[icon('box',300,400,2),icon('hat',300,335,1.1)]),
  panel('Momo setzt den Hut auf. Er rutscht ihr über die Ohren.',[icon('cat',300,385,1.5),icon('hat',300,280,1.4)])
 ],questions:[['Was liegt in der Kiste?','ein Hut','ein Buch','ein Apfel'],['Wohin setzt Momo den Hut?','auf den Kopf','auf ein Boot','unter die Kiste']],facts:[['Momo findet eine Kiste.',true],['Der Hut ist winzig klein.',false],['Hier handelt eine Katze wie eine Person.',true]]},
 {id:'drachen-baum',title:'Ein Drachen hängt fest',panels:[
  panel('Ein Drachen hängt in den Zweigen eines Baumes.',[icon('tree',290,300,2.7),icon('kite',380,210,.9)]),
  panel('Ein freundlicher Vogel löst die Schnur vom Zweig.',[icon('tree',240,330,2.2),icon('kite',390,300,.8),icon('bird',385,215,.9)]),
  panel('Der Drachen liegt auf dem Boden. Der Vogel sitzt daneben.',[icon('kite',250,410,1.1),icon('bird',420,440,1)])
 ],questions:[['Wo hängt der Drachen zuerst?','im Baum','im Schrank','unter Wasser'],['Wer hilft in dieser Fantasiegeschichte?','ein Vogel','ein Fisch','eine Schnecke']],facts:[['Die Schnur hängt am Zweig fest.',true],['Am Ende hängt der Drachen noch im Baum.',false],['Der Vogel sitzt am Ende beim Drachen.',true]]},
 {id:'buch-gefunden',title:'Das Buch auf dem Weg',panels:[
  panel('Ein Buch liegt auf einem Weg. Rolo sieht es.',[icon('book',175,430,1.1),icon('robot',420,365,1.4)]),
  panel('Rolo hebt das Buch auf und schlägt es auf.',[icon('robot',300,350,1.5),icon('book',300,395,.9)]),
  panel('Momo kommt dazu. Beide schauen gemeinsam in das Buch.',[icon('cat',180,375,1.4),icon('robot',435,350,1.4),icon('book',307,415,.9)])
 ],questions:[['Was findet Rolo?','ein Buch','einen Schuh','einen Ball'],['Wer kommt zum Lesen dazu?','Momo','ein Zug','ein Wal']],facts:[['Das Buch liegt zuerst auf einem Weg.',true],['Rolo wirft das Buch ins Wasser.',false],['Am Ende schauen zwei Figuren in das Buch.',true]]},
 {id:'blumengeschenk',title:'Eine Blume für Momo',panels:[
  panel('Rolo möchte Momo eine Blume schenken.',[icon('robot',190,350,1.3),icon('flower',420,380,1.3)]),
  panel('Er stellt die Blume vorsichtig in eine kleine Kiste.',[icon('robot',140,360,1.1),icon('box',350,420,1.8),icon('flower',350,335,1.1)]),
  panel('Momo freut sich über das Geschenk und bedankt sich.',[icon('cat',190,375,1.5),icon('box',405,440,1.3),icon('flower',405,366,1)])
 ],questions:[['Was möchte Rolo verschenken?','eine Blume','einen Zug','einen Baum'],['Worin steht die Blume am Ende?','in einer Kiste','in einem Schuh','in einem Buch']],facts:[['Das Geschenk ist für Momo.',true],['Rolo legt die Blume unter einen Stein.',false],['Momo bedankt sich.',true]]},
 {id:'zwei-boote',title:'Treffen auf dem See',panels:[
  panel('Ein kleines Segelboot fährt allein auf dem See.',[icon('boat',290,320,2)]),
  panel('Ein zweites Boot kommt von der anderen Seite.',[icon('boat',150,350,1.4),icon('boat',450,300,1.2,'#8ba795')]),
  panel('Nun fahren die beiden Boote ein Stück nebeneinander.',[icon('boat',160,350,1.5),icon('boat',450,350,1.5,'#8ba795'),icon('sun',315,100,1)])
 ],questions:[['Wie viele Boote siehst du am Anfang?','eins','zwei','drei'],['Wie fahren die Boote am Ende?','nebeneinander','übereinander','unter der Erde']],facts:[['Ein zweites Boot kommt hinzu.',true],['Am Ende sind es drei Boote.',false],['Die Boote fahren auf einem See.',true]]},
 {id:'ball-hinterm-baum',title:'Wo ist der Ball?',panels:[
  panel('Momo spielt mit ihrem Ball.',[icon('cat',190,360,1.4),icon('ball',405,420,1.2)]),
  panel('Der Ball rollt hinter einen Baum. Momo sucht ihn.',[icon('ball',349,447,.9),icon('tree',325,330,1.7),icon('cat',135,410,.9)]),
  panel('Ein Vogel zeigt Momo den Ball. Sie können weiterspielen.',[icon('cat',185,365,1.3),icon('ball',350,450,1),icon('bird',450,400,.85)])
 ],questions:[['Was sucht Momo?','ihren Ball','ihren Schirm','ihre Uhr'],['Wer zeigt ihr den Ball?','ein Vogel','ein Boot','eine Blume']],facts:[['Der Ball rollt hinter einen Baum.',true],['Momo sucht ein Fahrrad.',false],['Am Ende ist der Ball wiedergefunden.',true]]},
 {id:'picknickfreunde',title:'Ein gemeinsames Picknick',panels:[
  panel('Rolo und Momo bringen drei Äpfel zu einem Picknick mit.',[icon('cat',150,340,1.1),icon('robot',455,330,1.1),icon('apple',235,445,.6),icon('apple',310,445,.6),icon('apple',385,445,.6)]),
  panel('Sie setzen sich neben einen Baum und teilen die Äpfel.',[icon('tree',300,195,1.5),icon('cat',150,415,1),icon('robot',470,390,1),icon('apple',235,480,.55),icon('apple',310,480,.55),icon('apple',385,480,.55)]),
  panel('Nach dem Essen lesen sie zusammen ein Buch.',[icon('cat',160,380,1.3),icon('robot',440,350,1.3),icon('book',300,425,.8)])
 ],questions:[['Welche Früchte bringen sie mit?','Äpfel','Bananen','Birnen'],['Was tun sie nach dem Essen?','Sie lesen gemeinsam.','Sie bauen einen Zug.','Sie gehen in eine Höhle.']],facts:[['Am Anfang sind drei Äpfel gezeichnet.',true],['Die Freunde teilen nichts miteinander.',false],['Am Ende lesen die beiden ein Buch.',true]]}
];
bookChapters[6].units=bookStories.map(story=>unit(story.id,story.title,'Diese kleine Bildergeschichte ist erfunden. Lies die Bildtexte in Ruhe.','Du darfst beim Antworten zu den Bildern und Sätzen zurückschauen.',[
 {kind:'comic',title:'Drei Bilder – eine Geschichte',panels:story.panels,tasks:[]},
 questions('Bilder und Sätze verstehen',[...story.questions.map(([p,a,b,c])=>mc(p,a,[b,c],`Richtig ist: ${a}`)),...story.facts.map(([p,right])=>tf(p,right,right?'Der Satz passt zu den Bildtexten.':'Vergleiche: '+story.panels.map(p=>p.text).join(' ')))]),
 questions('Erst, dann, zum Schluss',[sequence('Ordne die drei Bildtexte nach der Geschichte.',story.panels.map(p=>p.text),'Lies die Handlung von Bild 1 über Bild 2 bis Bild 3.'),open('Erzähle die Geschichte in zwei oder drei eigenen Sätzen.','Verwende zum Beispiel zuerst, dann und am Ende. Deine Formulierungen dürfen anders sein.')])
 ]));

const creativeTexts=[
 {id:'fantasiegarten',title:'Ein Garten für kleine Tiere',text:'Im Garten steht ein hohes Vogelhaus. Links davon wächst ein Apfelbaum. Unter dem Baum liegen drei Äpfel. Rechts vom Vogelhaus blühen zwei große Blumen. Auf dem Dach sitzt ein kleiner Vogel. Hinter dem Garten sieht man einen Hügel.',facts:[['Links vom Vogelhaus wächst ein Apfelbaum.',true],['Unter dem Baum liegen fünf Äpfel.',false],['Auf dem Dach sitzt ein Vogel.',true]],prompt:'Zeichne das Vogelhaus, den Baum links daneben und die beiden Blumen rechts. Ergänze die drei Äpfel und den Vogel.',model:'Wichtig sind die genannten Dinge, ihre Anzahl und ihre Lage. Dein Zeichenstil ist frei.'},
 {id:'lesezimmer',title:'Ein Zimmer für Bücher',text:'Nuri richtet eine Leseecke ein. Vor dem Fenster steht ein weiches Kissen. Daneben liegt eine Decke. Auf einem kleinen Tisch stehen eine Lampe und ein Becher Wasser. Vier Bücher liegen auf einem Stapel. Nuri setzt sich hin und sucht eine lustige Geschichte aus.',facts:[['Nuri richtet eine Leseecke ein.',true],['Auf dem Tisch steht ein Eimer Sand.',false],['Auf dem Stapel liegen vier Bücher.',true]],prompt:'Zeichne Nuris Leseecke mit Kissen, Decke, Tisch, Lampe und Bücherstapel. Schreibe einen Buchtitel dazu.',model:'Vergleiche dein Bild mit den Dingen im Text. Einen eigenen Buchtitel darfst du erfinden.'},
 {id:'wolkendorf',title:'Post im Wolkendorf',text:'Das ist eine Fantasiegeschichte. Über dem Wolkendorf fährt ein fliegendes Postboot. Seine Fahne ist lila. Im Boot liegen drei gelbe Briefe. Ein Vogel zeigt den Weg zum Wolkenhaus. Dort wartet ein freundlicher Roboter auf eine Nachricht.',facts:[['Die Geschichte ist erfunden.',true],['Im Boot liegen sechs Briefe.',false],['Ein Roboter wartet auf eine Nachricht.',true]],prompt:'Zeichne das Wolkendorf, das Postboot und drei Briefe. Erfinde, was in einem der Briefe steht.',model:'Die Fahne ist lila, die drei Briefe sind gelb. Für die Nachricht gibt es viele passende Ideen.'},
 {id:'laternenweg',title:'Ein Weg durch die Nacht',text:'Es wird dunkel. Auf einem Weg stehen vier Laternen. Die erste Laterne leuchtet gelb, die zweite orange, die dritte gelb und die vierte orange. Am Ende des Weges steht ein kleines Haus. In seinem Fenster brennt Licht. Über dem Haus sind fünf Sterne zu sehen.',facts:[['Auf dem Weg stehen vier Laternen.',true],['Alle Laternen leuchten blau.',false],['Über dem Haus sind fünf Sterne.',true]],prompt:'Zeichne den Weg mit vier Laternen in der richtigen Farbreihenfolge. Ergänze das Haus und fünf Sterne.',model:'Von vorne nach hinten: gelb, orange, gelb, orange. Im Bild gibt es vier Laternen und fünf Sterne.'},
 {id:'regengeschichte',title:'Platz unter dem Schirm',text:'Leni geht mit einem großen Schirm zum Park. Unterwegs trifft sie Amir. Er hat keinen Schirm dabei. Leni fragt: „Möchtest du mit unter meinen Schirm?“ Amir nickt. Gemeinsam gehen sie langsam weiter. Am Parkeingang hört der Regen auf. Beide lachen.',facts:[['Amir hat keinen Schirm dabei.',true],['Leni läuft allein weg.',false],['Am Ende hört der Regen auf.',true]],prompt:'Zeichne zwei Bilder: zuerst Leni und Amir im Regen, danach die beiden am Park. Zeige, wie sie einander helfen.',model:'Im ersten Bild teilen die beiden einen Schirm. Im zweiten Bild hat der Regen aufgehört. Gefühle kannst du passend zum Text darstellen.'},
 {id:'gartenvers',title:'Ein kleines Gedicht wird zum Bild',text:'Im Garten steht ein kleines Haus.\nEin Vogel schaut zum Fenster raus.\nDer Wind bewegt ein buntes Band.\nZwei Kinder winken mit der Hand.',facts:[['Im Gedicht steht ein Haus im Garten.',true],['Fünf Kinder winken.',false],['Ein Vogel schaut aus dem Fenster.',true]],prompt:'Male ein Bild zum Gedicht. Ergänze das Haus, den Vogel, ein buntes Band und zwei winkende Kinder.',model:'Es gibt ein Haus, einen Vogel, ein Band und zwei Kinder. Die Farbwahl und weitere passende Details sind frei.'},
 {id:'zeichenauftrag',title:'Schritt für Schritt zum Roboter',text:'Zeichne zuerst einen großen rechteckigen Bauch. Darüber kommt ein kleiner quadratischer Kopf. Male zwei runde Augen in den Kopf. An den Bauch setzt du zwei Arme und zwei Beine. Auf den Bauch kommen drei Knöpfe. Zum Schluss gibst du deinem Roboter einen Namen.',facts:[['Der Bauch soll rechteckig sein.',true],['Der Roboter bekommt nur ein Auge.',false],['Auf den Bauch kommen drei Knöpfe.',true]],prompt:'Führe den Zeichenauftrag in der angegebenen Reihenfolge aus. Schreibe den Namen deines Roboters dazu.',model:'Prüfe Bauch, Kopf, zwei Augen, zwei Arme, zwei Beine und drei Knöpfe. Dein Roboter darf ganz anders aussehen als andere Roboter.'},
 {id:'eigene-geschichte',title:'Wie geht die Geschichte weiter?',text:'Juna geht an einem See spazieren. Neben einem Baum findet sie eine kleine Kiste. Auf der Kiste steht: „Für einen freundlichen Menschen.“ Juna schaut sich um. Dann öffnet sie vorsichtig den Deckel. Was sie entdeckt, überrascht sie.',facts:[['Juna ist an einem See.',true],['Sie findet einen großen Zug.',false],['Auf der Kiste steht eine Nachricht.',true]],prompt:'Erfinde, was in der Kiste liegt. Zeichne den Anfang und dein eigenes Ende der Geschichte.',model:'Zum Beispiel könnte in der Kiste ein Buch mit einem Brief liegen. Auch ganz andere schlüssige Ideen sind möglich.'}
];
const textCorrections={fantasiegarten:'Unter dem Baum liegen drei Äpfel.',lesezimmer:'Auf dem Tisch stehen eine Lampe und ein Becher Wasser.',wolkendorf:'Im Boot liegen drei Briefe.',laternenweg:'Die Laternen leuchten abwechselnd gelb und orange.',regengeschichte:'Leni teilt ihren Schirm mit Amir.',gartenvers:'Zwei Kinder winken.',zeichenauftrag:'Der Roboter bekommt zwei Augen.','eigene-geschichte':'Juna findet eine kleine Kiste.'};
bookChapters[7].units=creativeTexts.map(story=>unit(story.id,story.title,'Lies den Text. Setze die Informationen anschließend in deinem eigenen Bild um.','Dein Bild und deine Geschichte werden nicht automatisch benotet. Nutze die Hinweise und besprecht eure Ideen.',[
 {kind:'reading',title:'Lies in Ruhe',paragraphs:story.text.split('\n'),tasks:[]},
 questions('Was steht im Text?',story.facts.map(([p,right])=>tf(p,right,right?'Diese Information steht im Text.':textCorrections[story.id]))),
 draw('Dein Bild zum Text',story.prompt,story.model),
 questions('Schreibe oder erzähle',[open('Beschreibe dein Bild mit zwei ganzen Sätzen.','Erwähne Dinge oder Figuren aus dem Text. Weitere passende Ideen darfst du ergänzen.'),open('Welche Stelle hast du genau gelesen, bevor du gezeichnet hast?',story.model)])
 ]));

export const bookUnits=bookChapters.flatMap(chapter=>chapter.units.map((u,i)=>({...u,chapter:chapter.id,number:i+1})));
export const bookTasks=bookUnits.flatMap(u=>u.groups.flatMap(g=>g.tasks));
export const bookStats={chapters:bookChapters.length,units:bookUnits.length,questions:bookTasks.length,closed:bookTasks.filter(q=>q.type!=='open').length,open:bookTasks.filter(q=>q.type==='open').length,paintTargets:bookUnits.flatMap(u=>u.groups.filter(g=>g.kind==='painting')).reduce((n,g)=>n+Object.keys(g.targets).length,0),comics:bookStories.length,texts:creativeTexts.length};
