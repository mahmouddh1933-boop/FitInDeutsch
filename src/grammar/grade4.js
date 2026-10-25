import {topic,ex,choices,question} from './helpers.js';
const objects=[
 ['Mila gibt dem Kind einen Ball.','dem Kind','einen Ball','Mila'],['Ben schenkt seiner Mutter Blumen.','seiner Mutter','Blumen','Ben'],['Der Vater zeigt dem Jungen ein Bild.','dem Jungen','ein Bild','Der Vater'],['Die Lehrerin erklärt den Kindern die Aufgabe.','den Kindern','die Aufgabe','Die Lehrerin'],['Ich bringe meiner Schwester ein Buch.','meiner Schwester','ein Buch','Ich'],['Wir schicken unserem Opa einen Brief.','unserem Opa','einen Brief','Wir'],['Mila gibt ihrer Freundin einen Stift.','ihrer Freundin','einen Stift','Mila'],['Ben zeigt dem Gast den Garten.','dem Gast','den Garten','Ben'],['Die Mutter liest dem Baby eine Geschichte vor.','dem Baby','eine Geschichte','Die Mutter'],['Der Koch bringt den Gästen das Essen.','den Gästen','das Essen','Der Koch'],['Ich kaufe meinem Bruder ein Eis.','meinem Bruder','ein Eis','Ich'],['Die Frau reicht dem Mann die Tasche.','dem Mann','die Tasche','Die Frau']
];
const places=[['Wir spielen im Garten.','Wo?','Wohin?','Woher?','Im Garten nennt den Ort.'],['Ben geht nach Hause.','Wohin?','Wo?','Woher?','Nach Hause nennt das Ziel.'],['Mila kommt aus Berlin.','Woher?','Wohin?','Wo?','Aus Berlin nennt die Herkunft.'],['Das Buch liegt auf dem Tisch.','Wo?','Woher?','Wohin?','Auf dem Tisch nennt den Ort.'],['Wir fahren nach Köln.','Wohin?','Wo?','Woher?','Nach Köln nennt das Ziel.'],['Der Zug kommt aus Hamburg.','Woher?','Wo?','Wohin?','Aus Hamburg nennt die Herkunft.'],['Die Katze sitzt unter dem Bett.','Wo?','Wohin?','Woher?','Unter dem Bett nennt den Ort.'],['Ben läuft in den Park.','Wohin?','Woher?','Wo?','In den Park nennt das Ziel.'],['Mila nimmt das Buch aus der Tasche.','Woher?','Wo?','Wohin?','Aus der Tasche nennt den Ausgangsort.'],['Die Kinder sind auf dem Schulhof.','Wo?','Wohin?','Woher?','Auf dem Schulhof nennt den Ort.'],['Wir gehen zum Bahnhof.','Wohin?','Wo?','Woher?','Zum Bahnhof nennt das Ziel.'],['Ben kehrt vom Sportplatz zurück.','Woher?','Wo?','Wohin?','Vom Sportplatz nennt den Ausgangsort.']];
const times=[['Morgen besucht uns Mila.','Wann?','Wie lange?','Wie oft?','Morgen nennt einen Zeitpunkt.'],['Wir lesen eine Stunde lang.','Wie lange?','Wann?','Wie oft?','Eine Stunde lang nennt eine Dauer.'],['Ben übt jeden Tag.','Wie oft?','Wann genau?','Wo?','Jeden Tag nennt eine regelmäßige Häufigkeit.'],['Um acht Uhr beginnt die Schule.','Wann?','Wie lange?','Wie oft?','Um acht Uhr nennt einen Zeitpunkt.'],['Mila wartet zehn Minuten lang.','Wie lange?','Wie oft?','Wo?','Zehn Minuten lang nennt eine Dauer.'],['Wir treffen uns zweimal pro Woche.','Wie oft?','Wie lange?','Wohin?','Zweimal pro Woche nennt eine Häufigkeit.'],['Gestern hat es geregnet.','Wann?','Wie oft?','Wie lange?','Gestern nennt eine Zeit.'],['Der Film dauert zwei Stunden.','Wie lange?','Wie oft?','Woher?','Zwei Stunden gibt die Dauer an.'],['Ben fährt täglich mit dem Bus.','Wie oft?','Wie lange?','Wohin?','Täglich sagt, wie häufig etwas geschieht.'],['Am Montag beginnt der Kurs.','Wann?','Wie lange?','Wie oft?','Am Montag nennt einen Zeitpunkt.'],['Mila bleibt drei Tage lang.','Wie lange?','Wie oft?','Wo?','Drei Tage lang nennt eine Dauer.'],['Wir üben jeden zweiten Tag.','Wie oft?','Wie lange?','Woher?','Jeden zweiten Tag beschreibt die Wiederholung.']];
export const grade4=[
 topic('cases',4,'Die vier Fälle im Überblick','Nomen und ihre Begleiter können in vier Fällen stehen. Der Fall zeigt, welche Aufgabe eine Wortgruppe im Satz oder in einer anderen Wortgruppe hat.',[
  'Der [[nominative:Nominativ]] antwortet auf Wer oder was? Der [[genitive:Genitiv]] antwortet häufig auf Wessen?',
  'Der [[dative:Dativ]] antwortet auf Wem? Der [[accusative:Akkusativ]] antwortet auf Wen oder was?',
  'Betrachte immer den Zusammenhang. Ein Artikel allein reicht nicht: die kann etwa Nominativ oder Akkusativ sein. Das Verb und die Frage helfen.'
 ],[ex('[[nominative:Der Vater]] liest.','Wer liest? Der Vater: Nominativ.'),ex('Das Buch [[genitive:des Kindes]] liegt hier.','Wessen Buch? Des Kindes: Genitiv.'),ex('Mila hilft [[dative:dem Kind]].','Wem hilft Mila? Dem Kind: Dativ.'),ex('Ben liest [[accusative:das Buch]].','Was liest Ben? Das Buch: Akkusativ.')],[
 question('In welchem Fall steht die markierte Wortgruppe?','Nominativ',['Genitiv','Dativ','Akkusativ'],'Wer bellt? Der Hund: Nominativ.','[[focus:Der Hund]] bellt.'),
 question('In welchem Fall steht die markierte Wortgruppe?','Akkusativ',['Nominativ','Genitiv','Dativ'],'Was lese ich? Das Buch: Akkusativ.','Ich lese [[focus:das Buch]].'),
 question('In welchem Fall steht die markierte Wortgruppe?','Dativ',['Nominativ','Genitiv','Akkusativ'],'Wem helfe ich? Dem Kind: Dativ.','Ich helfe [[focus:dem Kind]].'),
 question('In welchem Fall steht die markierte Wortgruppe?','Genitiv',['Nominativ','Dativ','Akkusativ'],'Wessen Fahrrad? Des Vaters: Genitiv.','Das Fahrrad [[focus:des Vaters]] ist rot.'),
 question('In welchem Fall steht die markierte Wortgruppe?','Nominativ',['Genitiv','Dativ','Akkusativ'],'Was blüht? Die Blume: Nominativ.','[[focus:Die Blume]] blüht.'),
 question('In welchem Fall steht die markierte Wortgruppe?','Akkusativ',['Nominativ','Genitiv','Dativ'],'Wen sehen wir? Den Vogel: Akkusativ.','Wir sehen [[focus:den Vogel]].'),
 question('In welchem Fall steht die markierte Wortgruppe?','Dativ',['Nominativ','Genitiv','Akkusativ'],'Wem antwortet Ben? Der Lehrerin: Dativ.','Ben antwortet [[focus:der Lehrerin]].'),
 question('In welchem Fall steht die markierte Wortgruppe?','Genitiv',['Nominativ','Dativ','Akkusativ'],'Wessen Tasche? Der Mutter: Genitiv.','Die Tasche [[focus:der Mutter]] liegt hier.'),
 question('In welchem Fall steht die markierte Wortgruppe?','Nominativ',['Genitiv','Dativ','Akkusativ'],'Wer lacht? Das Kind: Nominativ.','[[focus:Das Kind]] lacht.'),
 question('In welchem Fall steht die markierte Wortgruppe?','Dativ',['Nominativ','Genitiv','Akkusativ'],'Wem danke ich? Den Kindern: Dativ Plural.','Ich danke [[focus:den Kindern]].'),
 question('In welchem Fall steht die markierte Wortgruppe?','Akkusativ',['Nominativ','Genitiv','Dativ'],'Was sucht Mila? Den Schlüssel: Akkusativ.','Mila sucht [[focus:den Schlüssel]].'),
 question('In welchem Fall steht die markierte Wortgruppe?','Genitiv',['Nominativ','Dativ','Akkusativ'],'Wessen Dach? Des Hauses: Genitiv.','Das Dach [[focus:des Hauses]] ist alt.')
 ],'Wer oder was? und Wen oder was? enthalten beide was. Unterscheide die Rolle im ganzen Satz.',['nominative','genitive','dative','accusative']),
 topic('nominative',4,'1. Fall: Nominativ','Der Nominativ ist die Grundform des Nomens. Das Subjekt eines Satzes steht im Nominativ.',[
  'Frage mit dem Verb: [[focus:Wer oder was]] schläft? Antwort: [[nominative:Der Hund]].',
  'Die bestimmten Artikel heißen im Nominativ: der, die, das und in der Mehrzahl die.',
  'Nicht nur Lebewesen können ein Subjekt sein: [[nominative:Das Wasser]] fließt. Es gibt außerdem weitere Verwendungen des Nominativs, etwa nach sein.'
 ],[ex('[[nominative:Der Hund]] schläft.','Wer schläft? Der Hund.'),ex('[[nominative:Die Blume]] wächst.','Was wächst? Die Blume.'),ex('[[nominative:Das Kind]] lacht.','Wer lacht? Das Kind.'),ex('[[nominative:Die Kinder]] spielen.','Wer spielt? Die Kinder, im Plural.')],choices(`___ Hund schläft.|Der|Den|Dem|Wer schläft? Der Hund steht im Nominativ.
___ Blume wächst.|Die|Der|Den|Die Blume ist das Subjekt.
___ Kind lacht.|Das|Den|Dem|Das Kind steht im Nominativ.
___ Kinder spielen.|Die|Den|Dem|Die ist hier der Nominativartikel im Plural.
___ Mann singt.|Der|Den|Dem|Wer singt? Der Mann.
___ Frau liest.|Die|Der|Dem|Wer liest? Die Frau.
___ Buch liegt hier.|Das|Dem|Den|Was liegt hier? Das Buch.
___ Vogel fliegt.|Der|Den|Dem|Der Vogel ist das Subjekt.
___ Sonne scheint.|Die|Der|Den|Was scheint? Die Sonne.
___ Mädchen malt.|Das|Dem|Den|Das Mädchen ist grammatisch neutral.
___ Ball rollt.|Der|Den|Dem|Was rollt? Der Ball.
Welche Frage passt zum Subjekt?|Wer oder was?|Wem?|Wessen?|Das Subjekt steht im Nominativ.`),'Die Stelle im Satz allein bestimmt den Fall nicht.',['nominative','subject']),
 topic('genitive',4,'2. Fall: Genitiv','Der Genitiv beschreibt hier, zu wem oder wozu etwas gehört. Du fragst: Wessen?',[
  'In das Fahrrad [[genitive:des Vaters]] fragst du: Wessen Fahrrad? Des Vaters.',
  'Bei vielen männlichen und sächlichen Nomen stehen des und eine Endung -s oder -es: des Vaters, des Kindes.',
  'Bei weiblichen Nomen und im Plural heißt der bestimmte Artikel der: der Mutter, der Kinder. Die Besitzangabe gehört oft zu einem Nomen.'
 ],[ex('das Fahrrad [[genitive:des Vaters]]','Wessen Fahrrad? Des Vaters.'),ex('die Tasche [[genitive:der Mutter]]','Wessen Tasche? Der Mutter.'),ex('das Spielzeug [[genitive:des Kindes]]','Das Kind → des Kindes.'),ex('die Bücher [[genitive:der Kinder]]','Im Genitiv Plural steht hier der.')],choices(`Das Fahrrad ___ Vaters ist rot.|des|dem|den|Wessen Fahrrad? Des Vaters.
Die Tasche ___ Mutter ist groß.|der|die|den|Wessen Tasche? Der Mutter.
Das Spielzeug ___ Kindes ist neu.|des|dem|das|Der Genitiv lautet des Kindes.
Die Bücher ___ Kinder liegen hier.|der|den|die|Im Genitiv Plural steht der Kinder.
Das Fell ___ Hundes ist weich.|des|dem|den|Wessen Fell? Des Hundes.
Das Dach ___ Hauses ist alt.|des|dem|das|Das Haus wird zu des Hauses.
Der Name ___ Frau steht hier.|der|die|den|Die Frau wird im Genitiv zu der Frau.
Die Farbe ___ Autos ist blau.|des|dem|das|Wessen Farbe? Die Farbe des Autos.
Das Zimmer ___ Schwester ist hell.|der|die|den|Die Schwester → der Schwester.
Das Ende ___ Films ist spannend.|des|dem|den|Der Film → des Films.
Welches ist die Genitivfrage?|Wessen?|Wem?|Wohin?|Wessen fragt hier nach einer Zugehörigkeit.
Welche Form ist richtig?|des Kindes|des Kind|dem Kindes|Das neutrale Nomen bekommt hier die Endung -es.`),'Eine Genitivgruppe wie des Kindes ist oft Teil einer größeren Wortgruppe, nicht automatisch ein eigenes Objekt.',['genitive','suffix']),
 topic('dative',4,'3. Fall: Dativ','Den Dativ erfragst du mit Wem? Einige Verben verlangen eine Ergänzung in diesem Fall.',[
  'Frage: Wem hilft Mila? Sie hilft [[dative:dem Kind]].',
  'Die bestimmten Artikel heißen hier dem, der, dem; im Plural den. Im Dativ Plural kommt bei vielen Nomen ein -n hinzu: den Kindern.',
  'Lerne häufige Verbindungen mit: jemandem helfen, jemandem danken, jemandem antworten. Nicht jede Ergänzung wird gleich geformt.'
 ],[ex('Mila hilft [[dative:dem Mann]].','Der Mann → dem Mann.'),ex('Ben dankt [[dative:der Frau]].','Die Frau → der Frau.'),ex('Ich antworte [[dative:dem Kind]].','Das Kind → dem Kind.'),ex('Wir helfen [[dative:den Kindern]].','Im Plural steht den; Kinder bekommt ein n.')],choices(`Mila hilft ___ Mann.|dem|den|der|Helfen verlangt hier den Dativ: dem Mann.
Ben dankt ___ Frau.|der|die|den|Wem dankt Ben? Der Frau.
Ich antworte ___ Kind.|dem|das|den|Wem antworte ich? Dem Kind.
Wir helfen ___ Kindern.|den|die|der|Dativ Plural: den Kindern.
Der Ball gehört ___ Mädchen.|dem|das|den|Gehören verlangt hier den Dativ.
Ich danke ___ Vater.|dem|den|der|Der Vater wird zu dem Vater.
Wir antworten ___ Lehrerin.|der|die|den|Die Lehrerin wird zu der Lehrerin.
Mila gibt ___ Hund Wasser.|dem|den|der|Wem gibt sie Wasser? Dem Hund.
Ben hilft ___ Schwester.|der|die|den|Wem hilft Ben? Der Schwester.
Ich schenke ___ Kind ein Buch.|dem|das|den|Dem Kind ist der Empfänger im Dativ.
Welche Frage gehört zum Dativ?|Wem?|Wen oder was?|Wessen?|Wem ist die Dativfrage.
Welche Form steht im Dativ Plural?|den Kindern|die Kinder|der Kinder|Der Artikel den und die Endung -n kennzeichnen diese Form.`),'Bei der Frau kann der Dativartikel der stehen. Der bedeutet also nicht immer männlich.',['dative','suffix']),
 topic('accusative',4,'4. Fall: Akkusativ','Den Akkusativ erfragst du mit Wen oder was? Viele Verben können eine Ergänzung in diesem Fall haben.',[
  'Frage: Wen sieht Mila? Sie sieht [[accusative:den Hund]]. Was liest Ben? Er liest [[accusative:das Buch]].',
  'Beim männlichen bestimmten Artikel wird der zu den. Die und das bleiben hier gleich. Im Plural steht die.',
  'Benutze die Frage zum ganzen Satz. Ein gleich aussehender Artikel wie das kann je nach Aufgabe Nominativ oder Akkusativ sein.'
 ],[ex('Ich sehe [[accusative:den Hund]].','Der Hund → den Hund.'),ex('Mila sucht [[accusative:die Tasche]].','Die Tasche bleibt in dieser Form gleich.'),ex('Ben liest [[accusative:das Buch]].','Was liest Ben? Das Buch.'),ex('Wir sehen [[accusative:die Kinder]].','Akkusativ Plural: die Kinder.')],choices(`Ich sehe ___ Hund.|den|dem|der|Wen sehe ich? Den Hund.
Mila sucht ___ Tasche.|die|der|den|Was sucht Mila? Die Tasche.
Ben liest ___ Buch.|das|dem|den|Was liest Ben? Das Buch.
Wir sehen ___ Kinder.|die|den|der|Akkusativ Plural: die Kinder.
Ich finde ___ Schlüssel.|den|dem|der|Der Schlüssel wird zu den Schlüssel.
Mila kauft ___ Apfel.|den|dem|der|Der Apfel wird im Akkusativ zu den Apfel.
Wir besuchen ___ Frau.|die|der|den|Wen besuchen wir? Die Frau.
Ben malt ___ Haus.|das|dem|den|Was malt Ben? Das Haus.
Ich höre ___ Vogel.|den|dem|der|Wen höre ich? Den Vogel.
Die Katze trinkt ___ Wasser.|das|dem|den|Was trinkt sie? Das Wasser.
Welche Frage gehört zum Akkusativ?|Wen oder was?|Wem?|Wessen?|Wen oder was ist die Akkusativfrage.
Welche Form ist Akkusativ?|den Ball|der Ball|dem Ball|Beim männlichen Nomen wird der zu den.`),'Die Was-Frage allein genügt nicht: Unterscheide, ob die Wortgruppe Subjekt oder Ergänzung ist.',['accusative','object']),
 topic('dative-object',4,'Das Dativobjekt','Ein Dativobjekt ist eine Ergänzung des Verbs im dritten Fall. Du findest es mit der Frage Wem?',[
  'Frage mit dem Verb: Wem gibt Mila einen Ball? Antwort: [[dative:dem Kind]].',
  'Ein Satz kann mehrere Ergänzungen haben: Mila gibt [[dative:dem Kind]] [[accusative:einen Ball]]. Wem? Dem Kind. Was? Einen Ball.',
  'Das Dativobjekt kann aus einem oder mehreren Wörtern bestehen. Nicht jede Gruppe mit einer Dativform ist ein Dativobjekt; nach einer Präposition kann sie eine andere Aufgabe haben.'
 ],[ex('Mila gibt [[dative:dem Kind]] einen Ball.','Dem Kind beantwortet Wem gibt Mila einen Ball?'),ex('Ben hilft [[dative:seiner Mutter]].','Helfen steht hier mit einem Dativobjekt.'),ex('Ich schenke [[dative:meinem Bruder]] ein Buch.','Die ganze Wortgruppe ist die Ergänzung.'),ex('Das Buch liegt [[place:auf dem Tisch]].','Auf dem Tisch ist hier eine Ortsangabe, kein Dativobjekt.')],objects.map(([context,d,a,s])=>question('Finde das Dativobjekt. Frage: Wem?',d,[a,s],`Wem? ${d}. Diese Ergänzung steht im Dativ.`,context)),'Nicht jede Wortgruppe mit dem ist automatisch ein Dativobjekt.',['dative','accusative','place']),
 topic('accusative-object',4,'Das Akkusativobjekt','Ein Akkusativobjekt ist eine Ergänzung des Verbs im vierten Fall. Du findest es mit Wen oder was?',[
  'Frage mit dem Verb: Was gibt Mila dem Kind? Antwort: [[accusative:einen Ball]].',
  'Unterscheide es vom Subjekt: [[subject:Mila]] gibt [[dative:dem Kind]] [[accusative:einen Ball]]. Wer gibt? Mila. Was gibt sie? Einen Ball.',
  'Die Ergänzung gehört als ganze Gruppe zusammen. Artikel oder Adjektive sind Teil dieser Gruppe.'
 ],[ex('Ben liest [[accusative:ein spannendes Buch]].','Was liest Ben? Die ganze Gruppe ist die Antwort.'),ex('Ich sehe [[accusative:den Hund]].','Wen sehe ich? Den Hund.'),ex('Mila gibt dem Kind [[accusative:einen Ball]].','Was gibt Mila dem Kind? Einen Ball.'),ex('[[subject:Der Hund]] trägt [[accusative:den Ball]].','Subjekt und Akkusativobjekt haben verschiedene Aufgaben.')],objects.map(([context,d,a,s])=>question('Finde das Akkusativobjekt. Frage: Wen oder was?',a,[d,s],`Wen oder was? ${a}. Diese Ergänzung steht im Akkusativ.`,context)),'Das Subjekt beantwortet Wer oder was?, das Akkusativobjekt dagegen Wen oder was?',['subject','dative','accusative']),
 topic('adverb-place',4,'Ortsangaben: Wo, wohin, woher?','Eine adverbiale Bestimmung des Ortes gibt einen Ort, ein Ziel oder eine Herkunft an.',[
  '[[focus:Wo?]] fragt nach dem Ort: Wir spielen [[place:im Garten]].',
  '[[focus:Wohin?]] fragt nach dem Ziel: Ben geht [[place:nach Hause]].',
  '[[focus:Woher?]] fragt nach der Herkunft oder dem Ausgangsort: Mila kommt [[place:aus Berlin]]. Suche die Antwort als ganze Wortgruppe.'
 ],[ex('Wir spielen [[place:im Garten]].','Wo spielen wir?'),ex('Ben geht [[place:nach Hause]].','Wohin geht Ben?'),ex('Mila kommt [[place:aus Berlin]].','Woher kommt Mila?'),ex('[[place:Auf dem Tisch]] liegt ein Buch.','Auch am Satzanfang kann eine Ortsangabe stehen.')],places.map(([context,c,a,b,why])=>question('Mit welcher Ortsfrage untersuchst du hier die Ortsangabe?',c,[a,b],why,context)),'Ort, Ziel und Herkunft sind verschiedene Fragen.',['place','focus']),
 topic('adverb-time',4,'Zeitangaben: Wann, wie lange, wie oft?','Eine adverbiale Bestimmung der Zeit nennt zum Beispiel einen Zeitpunkt, eine Dauer oder eine Häufigkeit.',[
  '[[focus:Wann?]] fragt nach einem Zeitpunkt: [[time:am Montag]], [[time:morgen]], [[time:um acht Uhr]].',
  '[[focus:Wie lange?]] fragt nach der Dauer: [[time:zwei Stunden lang]].',
  '[[focus:Wie oft?]] fragt nach der Häufigkeit: [[time:täglich]], [[time:zweimal pro Woche]]. Die passende Frage hängt von der Aussage ab.'
 ],[ex('[[time:Morgen]] kommt Mila.','Wann kommt sie? Morgen.'),ex('Wir lesen [[time:eine Stunde lang]].','Wie lange lesen wir?'),ex('Ben übt [[time:jeden Tag]].','Wie oft übt Ben?'),ex('Der Kurs beginnt [[time:um acht Uhr]].','Um acht Uhr ist ein Zeitpunkt.')],times.map(([context,c,a,b,why])=>question('Welche Zeitfrage passt am genauesten zur Zeitangabe?',c,[a,b],why,context)),'Wie oft? fragt nach Wiederholungen, wie lange? nach der Dauer.',['time','focus']),
 topic('future',4,'Die Zukunft: Futur I','Mit dem Futur I kannst du ausdrücken, was später geschehen wird oder was du erwartest.',[
  'Du brauchst eine Personalform von [[verb:werden]] und die Grundform des anderen Verbs.',
  'Die Formen lauten: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie werden. Die Grundform steht im einfachen Aussagesatz am Ende.',
  'Auch das Präsens kann Zukünftiges ausdrücken: Morgen spiele ich. In diesem Thema üben wir ausdrücklich die Form mit werden.'
 ],[ex('Ich [[predicate:werde]] morgen [[predicate:lernen]].','Werde passt zu ich; lernen ist die Grundform.'),ex('Du [[predicate:wirst]] später [[predicate:kommen]].','Wirst passt zu du.'),ex('Wir [[predicate:werden]] zusammen [[predicate:spielen]].','Das Prädikat hat zwei Teile.'),ex('Morgen spiele ich.','Das kann ebenfalls Zukunft meinen, ist aber grammatisch Präsens.')],choices(`Ergänze im Futur I: Ich ___ morgen lernen.|werde|wirst|wird|Zu ich gehört werde.
Du ___ später kommen.|wirst|werde|wird|Zu du gehört wirst.
Mila ___ morgen spielen.|wird|wirst|werde|Mila entspricht sie: wird.
Wir ___ am Montag starten.|werden|werdet|wird|Zu wir gehört werden.
Ihr ___ morgen lesen.|werdet|werden|wirst|Zu ihr gehört werdet.
Die Kinder ___ bald singen.|werden|werdet|wird|Sie in der Mehrzahl: werden.
Ich werde ein Buch ___.|lesen|gelesen|las|Im Futur I steht hier die Grundform.
Ben wird nach Hause ___.|gehen|gegangen|ging|Werden verbindet sich hier mit dem Infinitiv gehen.
Welcher Satz steht im Futur I?|Wir werden morgen malen.|Wir malten gestern.|Wir haben gemalt.|Werden und malen bilden Futur I.
Welche Form gehört zu Futur I?|wird spielen|hat gespielt|spielte|Wird plus Grundform kennzeichnet hier Futur I.
Welche Fassung ist richtig?|Du wirst gewinnen.|Du wird gewinnen.|Du wirst gewonnen.|Wirst passt zur Person, gewinnen ist die Grundform.
Kann Präsens manchmal ebenfalls Zukunft meinen?|Ja, zum Beispiel mit morgen|Nein, niemals|Nur mit gestern|Morgen spiele ich kann Zukünftiges meinen.`),'Werde gelernt ist kein Futur I. Nach werden brauchst du hier die Grundform lernen.',['predicate','time']),
 topic('past-perfect',4,'Plusquamperfekt: noch vor der Vergangenheit','Mit dem Plusquamperfekt beschreibst du ein Ereignis, das schon vor einem anderen vergangenen Ereignis stattgefunden hatte.',[
  'Du bildest es mit [[verb:hatte]] oder [[verb:war]] in der passenden Personalform und dem [[verb:Partizip II]].',
  'Zuerst: Ich hatte gegessen. Später: Ich ging los. Das Essen lag vor dem Losgehen.',
  'Vergleiche: Ich habe gegessen ist Perfekt. Ich hatte gegessen ist Plusquamperfekt. Die Hilfsverbform macht den Unterschied.'
 ],[ex('Ich [[predicate:hatte]] schon [[predicate:gegessen]], bevor ich losging.','Das Essen geschah früher als das Losgehen.'),ex('Mila [[predicate:war]] schon [[predicate:gegangen]], als Ben kam.','Mila ging vor Bens Ankunft.'),ex('Wir [[predicate:hatten]] [[predicate:gelernt]], bevor der Test begann.','Das Lernen lag vor dem Test.'),ex('Du [[predicate:warst]] bereits [[predicate:angekommen]].','Warst passt zu du; angekommen ist das Partizip.')],choices(`Ergänze im Plusquamperfekt: Ich ___ schon gegessen, bevor ich losging.|hatte|habe|werde|Hatte gegessen beschreibt das frühere Ereignis.
Mila ___ schon gegangen, als Ben kam.|war|ist|wird|War gegangen ist Plusquamperfekt.
Wir ___ gelernt, bevor der Test begann.|hatten|haben|werden|Hatten ist die passende Vergangenheitsform von haben.
Du ___ schon angekommen, als ich anrief.|warst|bist|wirst|Warst angekommen steht im Plusquamperfekt.
Ihr ___ alles vorbereitet, bevor die Gäste kamen.|hattet|habt|werdet|Hattet passt zu ihr.
Die Kinder ___ schon eingeschlafen, als wir kamen.|waren|sind|werden|Waren eingeschlafen beschreibt das frühere Einschlafen.
Welcher Satz steht im Plusquamperfekt?|Ben hatte das Buch gelesen.|Ben hat das Buch gelesen.|Ben wird das Buch lesen.|Hatte gelesen ist Plusquamperfekt.
Welche Form ist Plusquamperfekt?|war gelaufen|ist gelaufen|wird laufen|War plus Partizip II zeigt hier Vorvergangenheit.
Was geschah zuerst: „Ich hatte gegessen, bevor ich ging“?|Das Essen|Das Gehen|Beides muss gleichzeitig sein|Das Plusquamperfekt markiert hier das frühere Essen.
Welche Fassung ist richtig?|Wir waren nach Hause gefahren.|Wir haben nach Hause gefahren.|Wir waren nach Hause fahren.|Waren passt hier zum Partizip gefahren.
Wie heißt das Hilfsverb zu ich im Plusquamperfekt von haben?|hatte|habe|hast|Ich hatte ist die Vergangenheitsform.
Was brauchst du zusätzlich zu hatte oder war?|Das Partizip II|Immer nur die Grundform|Immer das Wort morgen|Die Bildung braucht ein Partizip wie gelernt oder gegangen.`),'Plusquamperfekt bedeutet nicht einfach besonders lange her. Es setzt Vergangenes zu noch früherem Geschehen in Beziehung.',['predicate','time']),
 topic('speech-before',4,'Wörtliche Rede: Begleitsatz davor','Bei wörtlicher Rede wird genau wiedergegeben, was jemand sagt. Der Begleitsatz kann vor der Rede stehen.',[
  'Der Begleitsatz nennt zum Beispiel, wer spricht: Mila sagt. Danach folgt ein [[punctuation:Doppelpunkt]].',
  'Die gesprochenen Wörter stehen zwischen [[punctuation:„]] und [[punctuation:“]]. Das erste Wort der Rede beginnt groß.',
  'Das Satzschlusszeichen der Rede steht vor dem schließenden Anführungszeichen: „Ich komme.“ oder „Kommst du?“'
 ],[ex('Mila sagt[[punctuation::]] [[punctuation:„]]Ich komme[[punctuation:.]][[punctuation:“]]','Der Begleitsatz steht vorn.'),ex('Ben fragt[[punctuation::]] [[punctuation:„]]Kommst du[[punctuation:?]][[punctuation:“]]','Das Fragezeichen bleibt innerhalb der Rede.'),ex('Mutter ruft[[punctuation::]] [[punctuation:„]]Kommt her[[punctuation:!]][[punctuation:“]]','Auch das Ausrufezeichen steht vor dem Schlusszeichen.'),ex('Opa sagt: „Heute ist es schön.“','Die Rede beginnt mit einem Großbuchstaben.')],choices(`Welches Zeichen folgt nach dem vorangestellten Begleitsatz „Mila sagt“?|:|,|;|Vor der angekündigten wörtlichen Rede steht hier ein Doppelpunkt.
Welche Fassung ist richtig?|Mila sagt: „Ich komme.“|Mila sagt, „Ich komme.“|Mila sagt „Ich komme“.|Doppelpunkt, Anführungszeichen und innerer Punkt sind richtig.
Wo steht das Fragezeichen?|Vor dem schließenden Anführungszeichen|Immer nach beiden Anführungszeichen|Es fällt weg|Eine gesprochene Frage behält ihr Fragezeichen in der Rede.
Welche Fassung ist richtig?|Ben fragt: „Kommst du?“|Ben fragt: „Kommst du“?|Ben fragt, „Kommst du?“|Das Fragezeichen gehört zur gesprochenen Frage.
Wie beginnt das erste Wort einer vollständigen wörtlichen Rede?|Groß|Immer klein|Immer mit einem Komma|Die vollständige Rede beginnt groß.
Welche Fassung ist richtig?|Mutter ruft: „Kommt her!“|Mutter ruft: „Kommt her“!|Mutter ruft, „Kommt her!“|Das Ausrufezeichen steht innerhalb der Rede.
Was ist in „Ben sagt: ‚Hallo‘“ die Aufgabe von „Ben sagt“?|Begleitsatz|Akkusativobjekt|Zeitangabe|Der Begleitsatz nennt den Sprecher und das Sprechen.
Welche Fassung ist richtig?|Opa sagt: „Ich lese.“|Opa sagt: „ich lese.“|Opa sagt, „Ich lese.“|Die Rede beginnt groß; der Begleitsatz endet mit einem Doppelpunkt.
Welches Zeichen eröffnet deutsche wörtliche Rede?|„|“|:|Das öffnende deutsche Anführungszeichen steht unten.
Welches Zeichen schließt deutsche wörtliche Rede?|“|„|:|Das schließende deutsche Anführungszeichen steht oben.
Welche Fassung ist richtig?|Mila flüstert: „Sei leise.“|Mila flüstert, „Sei leise.“|Mila flüstert: Sei leise.|Die Rede ist durch Anführungszeichen abgegrenzt.
Braucht die Rede „Ich komme.“ ihren Punkt innerhalb der Anführungszeichen?|Ja|Nein, nie|Nur nach dem Begleitsatz|Der Punkt beendet hier den gesprochenen Satz.`),'Bei einem Begleitsatz davor kommt der Doppelpunkt vor die wörtliche Rede.',['punctuation','capital']),
 topic('speech-after',4,'Wörtliche Rede: Begleitsatz danach','Der Begleitsatz kann auch nach der wörtlichen Rede stehen. Dann ändern sich die Satzzeichen an der Verbindung.',[
  'Die Rede steht zuerst in Anführungszeichen. Danach folgt ein [[punctuation:Komma]] und der Begleitsatz: „Ich komme“, sagt Mila.',
  'Ein Punkt am Ende einer Aussage innerhalb der Rede fällt hier weg. Frage- und Ausrufezeichen bleiben erhalten.',
  'Der Begleitsatz geht nach dem Komma weiter. Ein Verb wie sagt oder fragt schreibt man dort klein; Namen bleiben groß.'
 ],[ex('„Ich komme“[[punctuation:,]] [[verb:sagt]] Mila.','Der innere Punkt der Aussage fällt weg.'),ex('„Kommst du[[punctuation:?]]“[[punctuation:,]] [[verb:fragt]] Ben.','Fragezeichen und verbindendes Komma bleiben beide stehen.'),ex('„Halt[[punctuation:!]]“[[punctuation:,]] [[verb:ruft]] Mila.','Auch nach ! folgt noch das Komma zum Begleitsatz.'),ex('„Ich lese“, sagt Ben[[punctuation:.]]','Der gesamte Satz endet nach dem Begleitsatz.')],choices(`Welche Fassung ist richtig?|„Ich komme“, sagt Mila.|„Ich komme.“ sagt Mila.|„Ich komme“, Sagt Mila.|Der innere Punkt entfällt; nach dem Schlusszeichen steht ein Komma.
Welches Zeichen verbindet die Rede mit dem nachgestellten Begleitsatz?|Komma|Doppelpunkt|Semikolon|Hier folgt nach der Rede ein Komma.
Welche Fassung ist richtig?|„Kommst du?“, fragt Ben.|„Kommst du“, fragt Ben?|„Kommst du?“ fragt Ben.|Das Fragezeichen bleibt, und das Komma wird ergänzt.
Welche Fassung ist richtig?|„Halt!“, ruft Mila.|„Halt“, ruft Mila!|„Halt!“ ruft Mila.|Das Ausrufezeichen bleibt innerhalb der Rede.
Wie schreibt man sagt nach dem verbindenden Komma?|klein|Immer groß|Nur mit Großbuchstaben|Der Begleitsatz setzt den ganzen Satz fort.
Was passiert mit dem inneren Punkt der Aussage?|Er entfällt hier|Er wird zum Doppelpunkt|Er steht doppelt|Vor dem nachgestellten Begleitsatz steht hier kein innerer Aussagepunkt.
Welche Fassung ist richtig?|„Ich lese“, sagt Ben.|„Ich lese.“, sagt Ben.|„Ich lese“ sagt Ben.|Punkt innen weg, Komma außen dazu.
Was passiert mit einem gesprochenen Fragezeichen?|Es bleibt erhalten|Es fällt immer weg|Es wird immer zum Punkt|Die Frage soll als Frage erkennbar bleiben.
Welche Fassung ist richtig?|„Wie schön!“, ruft Ben.|„Wie schön“, ruft Ben!|„Wie schön!“ ruft Ben.|Ausrufezeichen innen und Komma außen sind nötig.
Wo steht der abschließende Punkt des gesamten Satzes?|Nach dem Begleitsatz|Vor dem öffnenden Zeichen|Nach jedem Wort|Der ganze Satz endet nach sagt Mila.
Welche Fassung ist richtig?|„Wir spielen“, erklärt Mila.|„Wir spielen.“ erklärt Mila.|„Wir spielen“, Erklärt Mila.|Erklärt steht klein hinter dem Komma.
Welche Fassung ist richtig?|„Wo wohnst du?“, fragt Mila.|„Wo wohnst du“, fragt Mila?|„Wo wohnst du?“ fragt Mila.|Das Fragezeichen bleibt in der Rede, das Komma verbindet.`),'Nach ? und ! brauchst du vor dem nachgestellten Begleitsatz trotzdem noch das Komma.',['punctuation','verb']),
 topic('quotation-marks',4,'Anführungszeichen bei direkter Rede','Anführungszeichen grenzen die gesprochenen Wörter von der Erzählerstimme ab. Du kannst damit zeigen, wo die Rede beginnt und endet.',[
  'Im Deutschen üben wir hier die Form [[punctuation:„unten auf]] und [[punctuation:oben zu“]].',
  'Nur die gesprochenen Wörter stehen innerhalb der Zeichen. Der Begleitsatz bleibt außerhalb.',
  'Die Satzzeichen hängen von der Stellung des Begleitsatzes ab. Wiederhole dazu auch die Themen Begleitsatz davor und danach.'
 ],[ex('Mila sagt: [[punctuation:„]]Ich komme.[[punctuation:“]]','Die Rede steht zwischen zwei Zeichen.'),ex('[[punctuation:„]]Ich komme[[punctuation:“]], sagt Mila.','Der Begleitsatz gehört nicht in die Zeichen.'),ex('Ben fragt: „Wann kommst du[[punctuation:?]]“','Das Fragezeichen gehört zur gesprochenen Frage.'),ex('„Hallo[[punctuation:!]]“, ruft Ben.','Das Ausrufezeichen steht innen, das Komma außen.')],choices(`Welche Zeichen benutzen wir hier für deutsche wörtliche Rede?|„…“|[ … ]|( … )|Die Rede steht zwischen deutschen Anführungszeichen.
Welches Zeichen steht am Anfang der Rede?|„|“|,|Das öffnende Zeichen steht unten.
Welches Zeichen steht am Ende der Rede?|“|„|:|Das schließende Zeichen steht oben.
Was steht in den Anführungszeichen?|Die gesprochenen Wörter|Immer der ganze Begleitsatz|Nur der Name des Sprechers|Die Zeichen grenzen die eigentliche Rede ab.
Welche Fassung grenzt die Rede richtig ab?|Mila sagt: „Ich lese.“|„Mila sagt: Ich lese.“|Mila „sagt: Ich lese.“|Mila sagt ist der Begleitsatz und bleibt außen.
Welche Fassung grenzt die Rede richtig ab?|„Ich lese“, sagt Ben.|„Ich lese, sagt Ben.“|Ich lese, „sagt Ben.“|Die gesprochenen Wörter sind Ich lese.
Wie viele Anführungszeichen braucht eine einzelne, ununterbrochene Rede hier?|Zwei|Eines|Vier|Eines öffnet und eines schließt.
Wo steht das Fragezeichen in Ben fragt: „Wo bist du?“?|Innerhalb der Anführungszeichen|Vor dem Begleitsatz|Immer nach dem Schlusszeichen|Das Fragezeichen gehört zur Rede.
Gehört „sagt Mila“ in „Ich komme“, sagt Mila. zur gesprochenen Rede?|Nein|Ja, immer|Nur das Wort sagt|Sagt Mila ist der Begleitsatz.
Welche Fassung ist richtig?|Ben sagt: „Hallo!“|Ben sagt: „Hallo!|Ben sagt: Hallo!“|Beide Anführungszeichen müssen vorhanden sein.
Welche Fassung ist richtig?|„Komm mit!“, ruft Ben.|„Komm mit!, ruft Ben.“|Komm mit! „ruft Ben.“|Die Rede endet nach dem Ausrufezeichen.
Woran erkennst du das Ende der gesprochenen Wörter?|Am schließenden Anführungszeichen|Immer am Namen|Immer am ersten Komma|Das schließende Zeichen begrenzt die Rede.`),'Setze nicht versehentlich den ganzen Begleitsatz in die Anführungszeichen.',['punctuation']),
 topic('main-subordinate',4,'Hauptsatz und Nebensatz','Ein Hauptsatz kann in der Regel allein als vollständiger Satz stehen. Ein Nebensatz ist meist von einem anderen Satz abhängig.',[
  'Im Hauptsatz steht die Personalform im normalen Aussagesatz an zweiter Satzgliedstelle: Ich [[verb:bleibe]] hier.',
  'Ein Nebensatz kann mit weil, dass oder wenn beginnen. Die Personalform steht dann am Ende: weil es [[verb:regnet]].',
  'Zwischen Haupt- und Nebensatz steht ein Komma. Der Nebensatz kann vor oder nach dem Hauptsatz stehen.'
 ],[ex('Ich [[verb:bleibe]] hier[[punctuation:,]] weil es [[verb:regnet]].','Bleibe steht im Hauptsatz vorn, regnet am Nebensatzende.'),ex('Weil es [[verb:regnet]][[punctuation:,]] [[verb:bleibe]] ich hier.','Der Nebensatz kann auch zuerst stehen.'),ex('Ich weiß[[punctuation:,]] dass Ben [[verb:kommt]].','Dass leitet einen Nebensatz ein.'),ex('Wenn du Zeit [[verb:hast]][[punctuation:,]] [[verb:spielen]] wir.','Die Nebensatzform hast steht am Ende seiner Gruppe.')],choices(`Welche Wortgruppe ist hier ein Nebensatz?|weil es regnet|Ich bleibe hier.|Ben liest ein Buch.|Weil leitet einen abhängigen Satz mit Verb am Ende ein.
Wo steht die Personalform im Nebensatz mit weil?|Am Ende des Nebensatzes|Immer als erstes Wort|Immer als zweites Wort|Weil es heute regnet: regnet steht am Ende.
Welche Fassung ist richtig?|Ich bleibe hier, weil es regnet.|Ich bleibe hier, weil es regnet heute.|Ich bleibe hier weil es regnet.|Zwischen Haupt- und Nebensatz steht ein Komma.
Welcher Satz kann hier allein stehen?|Mila liest ein Buch.|weil Mila ein Buch liest|dass Mila ein Buch liest|Mila liest ein Buch ist ein vollständiger Hauptsatz.
Welche Fassung ist richtig?|Ich weiß, dass Ben kommt.|Ich weiß, dass kommt Ben.|Ich weiß dass Ben kommt.|Im dass-Satz steht kommt am Ende; das Komma trennt.
Welches Wort kann hier einen Nebensatz einleiten?|wenn|aber|und|Wenn kann einen Nebensatz einleiten.
Welche Fassung ist richtig?|Wenn du kommst, freue ich mich.|Wenn du kommst freue ich mich.|Wenn kommst du, freue ich mich.|Der Nebensatz endet vor dem Komma.
Kann ein Nebensatz vor dem Hauptsatz stehen?|Ja|Nein, nie|Nur ohne Komma|Zum Beispiel: Weil es regnet, bleibe ich hier.
Was trennt hier Haupt- und Nebensatz?|Ein Komma|Immer ein Doppelpunkt|Immer ein Ausrufezeichen|Die Satzgrenze wird durch das Komma markiert.
Welche Wortgruppe ist ein Nebensatz?|dass Mila heute singt|Mila singt heute.|Heute singt Mila.|Dass leitet den abhängigen Satz ein.
Welche Fassung ist richtig?|Weil Ben müde ist, schläft er.|Weil Ben ist müde, schläft er.|Weil Ben müde ist schläft er.|Ist steht am Nebensatzende; das Komma trennt.
Ist jeder Satz mit aber ein Nebensatz?|Nein|Ja, immer|Nur am Morgen|Aber verbindet oft zwei Hauptsätze.`),'Weil, dass und wenn leiten hier Nebensätze ein; aber hat eine andere Aufgabe.',['verb','punctuation']),
 topic('conjunction-commas',4,'Kommas bei weil, dass, wenn, aber','Bindewörter heißen Konjunktionen. Sie können Teilsätze verbinden. Hier übst du Satzgrenzen mit weil, dass, wenn und aber.',[
  'Vor einem nachgestellten Nebensatz mit weil, dass oder wenn steht ein Komma: Ich bleibe hier[[punctuation:,]] weil es regnet.',
  'Steht der Nebensatz vorn, kommt das Komma an sein Ende: Wenn du kommst[[punctuation:,]] freue ich mich.',
  'Aber verbindet hier zwei Hauptsätze; auch davor steht ein Komma. Nicht jedes Bindewort verlangt pauschal ein Komma: Bei einfachen Verbindungen mit und oder oder steht oft keines.'
 ],[ex('Ich bleibe zu Hause[[punctuation:,]] weil ich krank bin.','Weil beginnt den nachgestellten Nebensatz.'),ex('Mila sagt[[punctuation:,]] dass Ben kommt.','Das Komma steht vor dass.'),ex('Wenn du Zeit hast[[punctuation:,]] spielen wir.','Der Nebensatz steht zuerst.'),ex('Ben liest[[punctuation:,]] aber Mila malt.','Aber verbindet hier zwei Hauptsätze.')],choices(`Welche Fassung ist richtig?|Ich bleibe hier, weil es regnet.|Ich bleibe hier weil, es regnet.|Ich bleibe hier weil es regnet.|Das Komma trennt den weil-Satz ab.
Welche Fassung ist richtig?|Mila sagt, dass Ben kommt.|Mila sagt dass, Ben kommt.|Mila sagt dass Ben kommt.|Das Komma steht vor dem dass-Satz.
Welche Fassung ist richtig?|Wir spielen, wenn du kommst.|Wir spielen wenn, du kommst.|Wir spielen wenn du kommst.|Der nachgestellte wenn-Satz wird mit Komma abgetrennt.
Welche Fassung ist richtig?|Ben liest, aber Mila malt.|Ben liest aber, Mila malt.|Ben liest aber Mila malt.|Vor aber steht zwischen diesen Hauptsätzen ein Komma.
Welche Fassung ist richtig?|Weil es regnet, bleibe ich hier.|Weil, es regnet bleibe ich hier.|Weil es regnet bleibe ich hier.|Das Komma kommt an das Ende des vorderen Nebensatzes.
Welche Fassung ist richtig?|Wenn Ben kommt, spielen wir.|Wenn, Ben kommt spielen wir.|Wenn Ben kommt spielen wir.|Das Komma trennt die Teilsätze.
Welche Fassung ist richtig?|Ich weiß, dass du Zeit hast.|Ich weiß dass, du Zeit hast.|Ich weiß dass du Zeit hast.|Das Komma steht vor dass.
Welche Fassung ist richtig?|Mila lacht, weil der Witz lustig ist.|Mila lacht weil, der Witz lustig ist.|Mila lacht weil der Witz lustig ist.|Der weil-Satz wird abgetrennt.
Welche Fassung ist richtig?|Ich möchte gehen, aber ich warte noch.|Ich möchte gehen aber, ich warte noch.|Ich möchte gehen aber ich warte noch.|Hier verbindet aber zwei vollständige Hauptsätze.
Welche Fassung ist richtig?|Wir freuen uns, wenn du bleibst.|Wir freuen uns wenn, du bleibst.|Wir freuen uns wenn du bleibst.|Vor dem nachgestellten wenn-Satz steht ein Komma.
Muss vor jedem und immer ein Komma stehen?|Nein|Ja|Nur bei kurzen Wörtern|Eine einfache Verbindung mit und braucht oft kein Komma.
Welche Fassung ist richtig?|Dass du kommst, freut mich.|Dass, du kommst freut mich.|Dass du kommst freut mich.|Der vordere dass-Satz endet vor dem Komma.`),'Das Komma trennt ganze Teilsätze. Es steht nicht beliebig direkt nach dem Bindewort.',['punctuation','verb']),
 topic('nominalized-verbs',4,'Verben werden zu Nomen','Manchmal wird ein Verb wie ein Nomen verwendet. Das nennt man Substantivierung oder Nominalisierung.',[
  'Ein vorangestellter Artikel ist ein Hinweis: [[article:das]] [[noun:Lesen]], [[article:ein]] [[noun:Lachen]].',
  'Auch versteckte Artikel helfen: beim = bei dem, zum = zu dem. Deshalb heißt es beim [[noun:Spielen]] und zum [[noun:Lernen]].',
  'Das substantivierte Verb beginnt groß. Als normales Verb bleibt es klein: Wir lesen. Das Lesen macht Spaß.'
 ],[ex('Wir [[verb:lesen]]. Das [[noun:Lesen]] macht Spaß.','Die Verwendung entscheidet über die Schreibung.'),ex('Beim [[noun:Spielen]] vergeht die Zeit schnell.','Beim enthält den Artikel dem.'),ex('Ich brauche Ruhe zum [[noun:Lernen]].','Zum enthält zu dem.'),ex('Ein lautes [[noun:Lachen]] ist zu hören.','Ein begleitet hier ein Nomen.')],choices(`Das ___ macht Spaß.|Lesen|lesen|LESEN|Der Artikel das zeigt die substantivierte Verwendung.
Beim ___ vergeht die Zeit schnell.|Spielen|spielen|SPIELEN|Beim enthält bei dem; Spielen wird groß.
Ich brauche Ruhe zum ___.|Lernen|lernen|LERNEN|Zum enthält einen Artikel.
Wir ___ ein Buch.|lesen|Lesen|LESEN|Hier ist lesen ein normales Verb.
Das ___ ist gesund.|Schwimmen|schwimmen|SCHWIMMEN|Schwimmen wird hier als Nomen verwendet.
Ein lautes ___ ist zu hören.|Lachen|lachen|LACHEN|Ein begleitet hier das substantivierte Verb.
Mila möchte ___.|tanzen|Tanzen|TANZEN|Nach möchte steht hier die normale Grundform klein.
Beim ___ tragen wir einen Helm.|Radfahren|radfahren|RADFAHREN|Nach beim steht hier das substantivierte Radfahren.
Das ___ fällt Ben leicht.|Rechnen|rechnen|RECHNEN|Das kennzeichnet hier die Nomenverwendung.
Wir gehen heute ___.|schwimmen|Schwimmen|SCHWIMMEN|Hier ist schwimmen ein Verb und bleibt klein.
Zum ___ brauche ich einen Stift.|Schreiben|schreiben|SCHREIBEN|Zum zeigt die substantivierte Verwendung an.
Beim ___ bin ich leise.|Lesen|lesen|LESEN|Beim Lesen ist eine Nomenverwendung.`),'Nicht jede Grundform ist automatisch groß. Achte auf die Verwendung im Satz.',['noun','verb','article']),
 topic('nominalized-adjectives',4,'Adjektive werden zu Nomen','Auch ein Adjektiv kann wie ein Nomen gebraucht werden. Dann beginnt es mit einem großen Buchstaben.',[
  'Häufige Hinweise sind etwas, nichts, viel oder wenig: etwas [[noun:Schönes]], nichts [[noun:Neues]].',
  'Auch ein Artikel kann ein substantiviertes Adjektiv begleiten: das [[noun:Gute]]. Es steht dann kein eigenes Nomen dahinter, das damit beschrieben wird.',
  'Vergleiche: ein [[adjective:schönes]] Bild – etwas [[noun:Schönes]]. Im ersten Beispiel beschreibt schönes das Nomen Bild.'
 ],[ex('Ich sehe etwas [[noun:Schönes]].','Etwas weist hier auf die substantivierte Form hin.'),ex('Es gibt nichts [[noun:Neues]].','Neues steht als Nomen und beginnt groß.'),ex('Das [[noun:Gute]] bleibt in Erinnerung.','Das begleitet die substantivierte Eigenschaft.'),ex('Ein [[adjective:schönes]] Bild hängt dort.','Schönes beschreibt Bild und bleibt hier klein.')],choices(`Ich wünsche dir etwas ___.|Gutes|gutes|GUTES|Etwas Gutes ist eine substantivierte Form.
Heute gibt es nichts ___.|Neues|neues|NEUES|Nach nichts steht hier das substantivierte Neues.
Wir haben viel ___ erlebt.|Schönes|schönes|SCHÖNES|Schönes wird hier als Nomen verwendet.
Das ___ bleibt.|Gute|gute|GUTE|Das begleitet hier ein substantiviertes Adjektiv.
Ich sehe ein ___ Bild.|schönes|Schönes|SCHÖNES|Schönes beschreibt das Nomen Bild und bleibt klein.
Ben erzählt etwas ___.|Lustiges|lustiges|LUSTIGES|Etwas Lustiges ist substantiviert.
Es ist nichts ___ passiert.|Schlimmes|schlimmes|SCHLIMMES|Schlimmes wird nach nichts als Nomen verwendet.
Wir lernen etwas ___.|Wichtiges|wichtiges|WICHTIGES|Wichtiges ist hier substantiviert.
Der ___ Ball liegt dort.|rote|Rote|ROTE|Rote beschreibt das Nomen Ball.
Mila bringt etwas ___ mit.|Süßes|süßes|SÜSSES|Süßes ist hier eine substantivierte Eigenschaft.
Ich wünsche dir alles ___.|Gute|gute|GUTE|In alles Gute wird Gute großgeschrieben.
Wir hören eine ___ Geschichte.|lustige|Lustige|LUSTIGE|Lustige beschreibt Geschichte und bleibt klein.`),'Steht ein Nomen direkt hinter dem beschreibenden Adjektiv, bleibt dieses oft klein: ein schönes Bild.',['noun','adjective','article'])
];
grade4.find(t=>t.id==='cases').caseTable=[
 ['Nominativ','Wer oder was?','der Vater','die Mutter','das Kind','die Kinder'],
 ['Genitiv','Wessen?','des Vaters','der Mutter','des Kindes','der Kinder'],
 ['Dativ','Wem?','dem Vater','der Mutter','dem Kind','den Kindern'],
 ['Akkusativ','Wen oder was?','den Vater','die Mutter','das Kind','die Kinder']
];
grade4.find(t=>t.id==='past-perfect').timeline=[{title:'1 · Zuerst',text:'Ich hatte gegessen.'},{title:'2 · Danach',text:'Ich ging los.'}];
