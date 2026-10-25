import {topic,ex,choices,orderTask} from './helpers.js';
export const grade2=[
 topic('infinitive',2,'Die Grundform von Verben','Die Grundform eines Verbs heißt Infinitiv. So findest du das Verb meistens im Wörterbuch.',[
  'Viele Grundformen enden auf [[suffix:en]]: [[verb:spiel]][[suffix:en]], [[verb:lern]][[suffix:en]]. Manche enden auf -n, etwa sammeln.',
  'Die Personalform passt zu einer Person: du spielst. Die Grundform dazu ist spielen.',
  'Auch unregelmäßige Verben haben eine Grundform: ist gehört zu sein, hat gehört zu haben.'
 ],[ex('ich spiele → [[verb:spielen]]','Die Grundform hat hier die Endung -en.'),ex('du malst → [[verb:malen]]','Die Personalendung -st gehört nicht zur Grundform.'),ex('er ist → [[verb:sein]]','Sein ist unregelmäßig.'),ex('wir sammeln → [[verb:sammeln]]','Manche Grundformen enden nur auf -n.')],choices(`Wie heißt die Grundform zu „ich spiele“?|spielen|spielt|spielst|Die Grundform ist spielen.
Wie heißt die Grundform zu „du malst“?|malen|malt|malst|Zu malst gehört malen.
Wie heißt die Grundform zu „sie lacht“?|lachen|lacht|lachst|Lachen ist die Grundform.
Wie heißt die Grundform zu „wir lernen“?|lernen|lernt|lernst|Hier sieht die Wir-Form genauso aus wie die Grundform.
Wie heißt die Grundform zu „er hört“?|hören|hörst|höre|Zu hört gehört hören.
Wie heißt die Grundform zu „ich singe“?|singen|singt|singst|Die Grundform lautet singen.
Wie heißt die Grundform zu „du gehst“?|gehen|geht|gehe|Gehen steht im Wörterbuch.
Wie heißt die Grundform zu „sie ist“?|sein|sind|bist|Ist ist eine Form von sein.
Wie heißt die Grundform zu „er hat“?|haben|hast|habt|Hat gehört zu haben.
Wie heißt die Grundform zu „ihr sammelt“?|sammeln|sammelt|sammelst|Sammeln endet auf -n.
Wie heißt die Grundform zu „ich bastle“?|basteln|bastelt|bastelst|Basteln ist die Grundform.
Wie heißt die Grundform zu „du liest“?|lesen|liest|lese|Lesen ist die Grundform des unregelmäßigen Verbs.`),'Eine Personalform ist nicht automatisch die Grundform.',['verb','suffix']),
 topic('personal-forms',2,'Personalformen von Verben','Ein Verb verändert seine Form je nachdem, wer etwas tut. Diese Formen heißen Personalformen.',[
  'Bestimme zuerst die Person: ich, du, er/sie/es, wir, ihr oder sie.',
  'Bei vielen Verben bleibt der [[stem:Wortstamm]] gleich: lern-. Dazu kommen [[suffix:Endungen]]: ich lern-e, du lern-st, er lern-t.',
  'Die häufigsten Endungen sind -e, -st, -t, -en, -t, -en. Manche Verben sind unregelmäßig; lerne ihre Formen als Gruppe.'
 ],[ex('ich [[stem:lern]][[suffix:e]] · du [[stem:lern]][[suffix:st]]','Ich und du brauchen verschiedene Endungen.'),ex('er [[stem:lern]][[suffix:t]] · wir [[stem:lern]][[suffix:en]]','Die Einzahl und Mehrzahl unterscheiden sich.'),ex('ihr [[stem:lern]][[suffix:t]] · sie [[stem:lern]][[suffix:en]]','Ihr und sie sind unterschiedliche Personen.'),ex('ich [[verb:bin]] · du [[verb:bist]]','Sein hat besondere Formen.')],choices(`Ich ___ ein Bild.|male|malst|malt|Zu ich passt die Endung -e.
Du ___ gerne.|singst|singe|singen|Zu du passt hier -st.
Er ___ einen Ball.|sucht|suche|suchen|Zu er passt hier -t.
Wir ___ zusammen.|lernen|lernt|lernst|Zu wir gehört lernen.
Ihr ___ die Musik.|hört|hören|höre|Zu ihr passt hier -t.
Die Kinder ___ im Garten.|spielen|spielt|spielst|Mehrere Kinder: sie spielen.
Ich ___ laut.|lache|lachst|lacht|Ich lache.
Du ___ im Park.|wohnst|wohne|wohnen|Du wohnst hat die Endung -st.
Mila ___ ein Bild.|malt|male|malen|Mila kann durch sie ersetzt werden: sie malt.
Ben und ich ___ den Weg.|suchen|sucht|suchst|Ben und ich sind wir.
Du und Mila ___ ein Lied.|singt|singen|singe|Du und Mila sind ihr.
Die Vögel ___ hoch.|fliegen|fliegt|fliegst|Die Vögel sind sie in der Mehrzahl.`),'Die Endung richtet sich nach der Person, nicht nach dem nächsten Wort im Satz.',['stem','suffix','verb']),
 topic('opposites',2,'Gegenteile bei Adjektiven','Viele Adjektive haben ein Gegenteil. Die beiden Wörter beschreiben entgegengesetzte Eigenschaften.',[
  'Stelle dir beide Eigenschaften vor: Ein Stein ist [[adjective:hart]], ein Kissen ist [[adjective:weich]].',
  'Manche Gegenteile sind ganz andere Wörter: groß – klein. Andere entstehen mit einer Vorsilbe: glücklich – unglücklich.',
  'Der Zusammenhang ist wichtig. Das Gegenteil von alt kann bei Menschen jung und bei Gegenständen neu sein.'
 ],[ex('[[adjective:groß]] ↔ [[adjective:klein]]','Diese Wörter vergleichen die Größe.'),ex('[[adjective:warm]] ↔ [[adjective:kalt]]','Hier geht es um die Temperatur.'),ex('[[adjective:hell]] ↔ [[adjective:dunkel]]','Hier geht es um Licht.'),ex('ein [[adjective:alter]] Mensch ↔ ein [[adjective:junger]] Mensch','Bei Menschen ist jung das passende Gegenteil.')],choices(`Was ist das Gegenteil von groß?|klein|rund|grün|Groß und klein beschreiben entgegengesetzte Größen.
Was ist das Gegenteil von warm?|kalt|weich|laut|Warm und kalt betreffen die Temperatur.
Was ist das Gegenteil von hell?|dunkel|schnell|schön|Hell und dunkel betreffen das Licht.
Was ist das Gegenteil von laut?|leise|lang|neu|Laut und leise betreffen die Lautstärke.
Was ist das Gegenteil von schnell?|langsam|hart|süß|Schnell und langsam beschreiben das Tempo.
Was ist das Gegenteil von hart?|weich|voll|breit|Hart und weich beschreiben, wie sich etwas anfühlt.
Was ist das Gegenteil von lang?|kurz|hoch|leicht|Lang und kurz beschreiben eine Länge.
Was ist das Gegenteil von voll?|leer|müde|froh|Ein Gefäß kann voll oder leer sein.
Was ist bei Menschen das Gegenteil von alt?|jung|neu|frisch|Bei Menschen sagt man jung.
Was ist das Gegenteil von sauber?|schmutzig|sicher|hungrig|Sauber und schmutzig sind Gegenteile.
Was ist das Gegenteil von schwer im Sinne von Gewicht?|leicht|kurz|billig|Schwer und leicht beschreiben das Gewicht.
Was ist das Gegenteil von glücklich?|unglücklich|ungeduldig|unsichtbar|Hier entsteht das Gegenteil mit un-.`),'Nicht jedes Wort mit un- ist automatisch das gesuchte Gegenteil.',['adjective','prefix']),
 topic('statements',2,'Aussagesatz und Punkt','Mit einem Aussagesatz erzählst du etwas oder gibst eine Information. Am Ende steht ein Punkt.',[
  'In einem einfachen Aussagesatz steht die [[predicate:Personalform des Verbs]] an der zweiten Stelle der Satzglieder.',
  'Ein Satzglied kann mehrere Wörter haben: [[subject:Der kleine Hund]] [[predicate:schläft]]. Das Verb steht trotzdem an zweiter Stelle.',
  'Der Satz beginnt groß und endet mit einem [[punctuation:Punkt]]. Er ist keine direkte Frage.'
 ],[ex('[[subject:Mila]] [[predicate:liest]] ein Buch[[punctuation:.]]','Mila ist die erste Gruppe, liest die zweite.'),ex('[[time:Heute]] [[predicate:spielt]] Ben draußen[[punctuation:.]]','Auch ein Zeitwort darf am Anfang stehen.'),ex('[[subject:Der kleine Hund]] [[predicate:schläft]][[punctuation:.]]','Das erste Satzglied hat drei Wörter.'),ex('Wir haben Zeit[[punctuation:.]]','Die Aussage wird durch einen Punkt abgeschlossen.')],[...choices(`Welcher Satz ist eine Aussage?|Mila liest ein Buch.|Liest Mila ein Buch?|Lies das Buch!|Die Aussage erzählt, was Mila tut.
Welches Zeichen passt zur Aussage „Wir spielen heute“?|.|?|!|Eine gewöhnliche Aussage endet mit einem Punkt.
Wo steht die Personalform in „Heute malt Ben ein Bild.“?|An zweiter Satzgliedstelle|Immer als letztes Wort|Immer als erstes Wort|Heute ist die erste Gruppe; malt folgt als zweite.
Wie viele Wörter hat das erste Satzglied in „Der kleine Hund schläft.“?|3|1|2|Der kleine Hund ist eine zusammengehörige Wortgruppe.
Welcher Satz ist eine Aussage?|Das Wasser ist kalt.|Ist das Wasser kalt?|Trink das Wasser!|Hier wird eine Information gegeben.
Welche Fassung ist richtig?|Heute scheint die Sonne.|Heute die Sonne scheint.|Heute scheint die Sonne?|Das Verb steht nach Heute; die Aussage endet mit einem Punkt.`),orderTask('Baue einen Aussagesatz. Beginne mit „Ich“.','Ich|lese|ein Buch.'),orderTask('Baue einen Aussagesatz. Beginne mit „Mila“.','Mila|malt|ein Bild.'),orderTask('Baue einen Aussagesatz. Beginne mit „Ben“.','Ben|sucht|den Ball.'),orderTask('Baue einen Aussagesatz. Beginne mit „Wir“.','Wir|haben|Zeit.'),orderTask('Baue einen Aussagesatz. Beginne mit „Die Katze“.','Die Katze|trinkt|Wasser.'),orderTask('Baue einen Aussagesatz. Beginne mit „Der Hund“.','Der Hund|frisst|sein Futter.')],'Zweite Stelle bedeutet nicht immer zweites Wort.',['subject','predicate','time','punctuation']),
 topic('question-sentences',2,'Fragesatz und Fragezeichen','Ein Fragesatz bittet um eine Antwort. Am Ende steht ein Fragezeichen.',[
  'Bei einer Ja-Nein-Frage steht die Personalform meist vorn: [[verb:Kommst]] du mit?',
  'Eine W-Frage beginnt mit einem Fragewort: [[focus:Wo]] wohnst du? Danach kommt die Personalform.',
  'Verändere beim Umformen nicht nur das Satzzeichen. Meist musst du auch die Wortstellung ändern.'
 ],[ex('[[verb:Spielst]] du mit[[punctuation:?]]','Darauf kann man mit Ja oder Nein antworten.'),ex('[[focus:Wo]] wohnst du[[punctuation:?]]','Wo fragt nach einem Ort.'),ex('Mila liest. → [[verb:Liest]] Mila[[punctuation:?]]','Für diese Frage rückt das Verb nach vorn.'),ex('[[focus:Wann]] kommst du[[punctuation:?]]','Wann fragt nach einer Zeit.')],choices(`Welches Zeichen beendet „Kommst du mit“?|?|.|,|Eine direkte Frage endet mit einem Fragezeichen.
Welche Frage gehört zu „Mila liest.“?|Liest Mila?|Mila liest?|Lesen Mila.|Bei der Ja-Nein-Frage steht liest vorn.
Welches Wort fragt nach einem Ort?|Wo|Wer|Wann|Wo fragt nach dem Ort.
Welche Fassung ist eine Ja-Nein-Frage?|Spielt Ben mit?|Ben spielt mit.|Spiel mit, Ben!|Das Verb spielt steht am Anfang.
Welche Fassung ist eine W-Frage?|Wann beginnt die Schule?|Beginnt die Schule?|Die Schule beginnt.|Die Frage beginnt mit dem Fragewort Wann.
Welche Frage gehört zu „Du hast Zeit.“?|Hast du Zeit?|Du Zeit hast?|Haben Zeit du?|Hast rückt an den Satzanfang.
Welche Frage gehört zu „Ihr singt.“?|Singt ihr?|Ihr singt.|Ihr singen?|Die Personalform singt steht vorn.
Was gehört an das Ende einer direkten Frage?|Ein Fragezeichen|Ein Komma|Immer ein Ausrufezeichen|Das Fragezeichen kennzeichnet die direkte Frage.
Welcher Satz fragt nach einer Person?|Wer ist das?|Wo ist das?|Wann ist das?|Wer fragt nach einer Person.
Welche Fassung ist richtig?|Wie heißt du?|Wie du heißt?|Wie heißt du.|Nach Wie folgt hier die Personalform heißt.
Welche Frage gehört zu „Der Hund schläft.“?|Schläft der Hund?|Der schläft Hund?|Schlafen der Hund?|Schläft steht vor dem Subjekt der Hund.
Welche Fassung ist richtig?|Warum lachst du?|Warum du lachst?|Warum lachst du.|In dieser Frage steht das Verb nach dem Fragewort.`),'Ein Aussagesatz wird nicht durch bloßes Anhängen eines Fragezeichens zur neutralen Ja-Nein-Frage.',['verb','punctuation','focus']),
 topic('exclamations',2,'Ausrufe und Aufforderungen','Mit einem Ausruf zeigst du zum Beispiel Überraschung. Mit einer Aufforderung sagst du jemandem, was er oder sie tun soll.',[
  'Ein deutlicher Ausruf kann mit einem [[punctuation:Ausrufezeichen]] enden: Wie schön!',
  'Eine betonte Aufforderung benutzt oft die Befehlsform: [[verb:Komm]] her! [[verb:Öffne]] das Fenster!',
  'Eine ruhig formulierte Bitte kann auch einen Punkt haben. In den folgenden Aufgaben sind ausdrücklich betonte Aufforderungen gemeint.'
 ],[ex('Wie schön[[punctuation:!]]','Ein freudiger Ausruf.'),ex('[[verb:Komm]] sofort her[[punctuation:!]]','Eine deutliche Aufforderung.'),ex('[[verb:Seid]] bitte leise[[punctuation:!]]','Die Aufforderung richtet sich an mehrere Kinder.'),ex('Bitte öffne das Fenster.','Eine ruhige Bitte darf mit einem Punkt enden.')],choices(`Welches Zeichen passt zu dem deutlichen Ausruf „Hurra“?|!|?|,|Ein deutlicher Ausruf wird durch ! betont.
Welche Fassung ist eine Aufforderung?|Komm bitte her!|Kommst du her?|Du kommst her.|Komm ist hier eine Befehlsform.
Welche Fassung ist eine Frage?|Machst du mit?|Mach mit!|Du machst mit.|Die Frage bittet um eine Antwort.
Wie lautet eine betonte Aufforderung an ein Kind?|Lies das Buch!|Liest du das Buch?|Du liest das Buch.|Lies ist die Befehlsform für du.
Wie lautet eine Aufforderung an mehrere Kinder?|Seid bitte leise!|Sei bitte leise!|Bist du leise?|Seid richtet sich hier an ihr.
Welches Zeichen passt zum deutlichen Warnruf „Vorsicht“?|!|,|?|Ein Warnruf kann mit ! hervorgehoben werden.
Welche Fassung ist ein Ausruf?|Das ist ja toll!|Ist das toll?|Das ist toll.|Das Ausrufezeichen hebt die Begeisterung hervor.
Welche Fassung ist eine Aufforderung?|Öffne die Tür!|Öffnest du die Tür?|Die Tür ist offen.|Öffne fordert zu einer Handlung auf.
Darf eine ruhig formulierte Bitte mit einem Punkt enden?|Ja|Nein, niemals|Nur mit zwei Punkten|Das Satzzeichen hängt auch von Betonung und Absicht ab.
Wie lautet eine Aufforderung an ein Kind?|Hilf mir bitte!|Hilfst du mir?|Du hilfst mir.|Hilf ist die Befehlsform für du.
Welche Fassung ist eine betonte Aufforderung?|Bleibt hier!|Bleibt ihr hier?|Ihr bleibt hier.|Bleibt fordert mehrere Personen zum Bleiben auf.
Welches Zeichen passt zum begeisterten Ausruf „Wie wunderschön“?|!|,|:|Ein Ausrufezeichen macht die Begeisterung deutlich.`),'Nicht jede Bitte muss mit ! enden. Die Betonung und Situation entscheiden mit.',['verb','punctuation'])
];
grade2.find(t=>t.id==='personal-forms').infoTable={caption:'Personalformen am Beispiel lernen',headers:['Person','Wortstamm + Endung'],rows:[['ich','lern-e'],['du','lern-st'],['er / sie / es','lern-t'],['wir','lern-en'],['ihr','lern-t'],['sie (Mehrzahl)','lern-en']]};
