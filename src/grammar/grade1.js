import {topic,ex,choices,identify,orderTask} from './helpers.js';
export const grade1=[
 topic('nouns',1,'Namenwörter erkennen','Namenwörter heißen auch Nomen oder Substantive. Sie benennen Menschen, Tiere, Pflanzen, Dinge und auch Gedanken oder Gefühle.',[
  'Frage: Kann ich dazu einen Begleiter wie der, die oder das setzen? Zum Beispiel: [[article:der]] [[noun:Hund]]. Das ist eine gute Hilfe.',
  'Auch Eigennamen wie Mila sind Nomen. Und etwas, das du nicht anfassen kannst, kann ein Nomen sein: [[article:die]] [[noun:Freude]], [[article:die]] [[noun:Angst]].',
  'Nomen schreiben wir [[capital:groß]]. Die blaue Markierung zeigt dir in den Beispielen das Namenwort.'
 ],[ex('Der [[noun:Hund]] schläft.','Hund benennt ein Tier.'),ex('Das [[noun:Kind]] lacht.','Kind benennt einen Menschen.'),ex('Die [[noun:Blume]] wächst.','Blume benennt eine Pflanze.'),ex('Ich habe [[noun:Angst]].','Auch ein Gefühl kann ein Nomen sein.')],identify([
 ['Der Hund schläft.','Hund','schläft','Der','Hund ist der Name eines Tieres.'],['Das Kind lacht.','Kind','lacht','Das','Kind benennt einen Menschen.'],['Die Blume wächst.','Blume','wächst','Die','Blume benennt eine Pflanze.'],['Ich lese ein Buch.','Buch','lese','Ich','Buch ist ein Ding: das Buch.'],['Der Ball rollt.','Ball','rollt','Der','Ball ist ein Ding: der Ball.'],['Ich habe Hunger.','Hunger','habe','Ich','Hunger benennt einen Zustand.'],['Die Katze springt.','Katze','springt','Die','Katze ist ein Tier.'],['Das Wasser fließt.','Wasser','fließt','Das','Wasser ist ein Stoff: das Wasser.'],['Ich spüre Freude.','Freude','spüre','Ich','Freude benennt ein Gefühl.'],['Der Baum ist groß.','Baum','groß','ist','Baum benennt eine Pflanze.'],['Die Sonne scheint.','Sonne','scheint','Die','Sonne ist ein Nomen.'],['Das Fahrrad ist neu.','Fahrrad','neu','ist','Fahrrad benennt einen Gegenstand.']
 ],'das Nomen'),'Nicht nur Dinge sind Nomen. Auch [[noun:Liebe]] und [[noun:Zeit]] sind Namenwörter.',['noun','article','capital']),
 topic('verbs',1,'Tuwörter erkennen','Tuwörter heißen Verben. Sie sagen oft, was jemand tut oder was geschieht. Manche Verben beschreiben einen Zustand.',[
  'Frage zum Beispiel: Was tut das Kind? Es [[verb:spielt]]. Was geschieht mit der Blume? Sie [[verb:wächst]].',
  'Verben können ihre Form verändern: ich [[verb:spiele]], du [[verb:spielst]]. Die Grundform heißt [[verb:spielen]].',
  'Auch [[verb:sein]], [[verb:haben]] und [[verb:bleiben]] sind Verben, obwohl man dabei keine sichtbare Handlung sehen muss.'
 ],[ex('Mila [[verb:liest]].','Was tut Mila? Sie liest.'),ex('Der Vogel [[verb:fliegt]].','Was tut der Vogel? Er fliegt.'),ex('Die Pflanze [[verb:wächst]].','Das Verb beschreibt, was geschieht.'),ex('Ben [[verb:ist]] müde.','Auch ist ist eine Verbform.')],identify([
 ['Mila liest ein Buch.','liest','Mila','Buch','Liest sagt, was Mila tut.'],['Der Hund bellt.','bellt','Hund','Der','Bellt ist die Tätigkeit des Hundes.'],['Wir malen zusammen.','malen','Wir','zusammen','Malen beschreibt unsere Tätigkeit.'],['Die Blume wächst.','wächst','Blume','Die','Wächst sagt, was mit der Blume geschieht.'],['Ben ist müde.','ist','Ben','müde','Ist ist eine Form des Verbs sein.'],['Ich habe Zeit.','habe','Zeit','Ich','Habe ist eine Form von haben.'],['Die Kinder laufen.','laufen','Kinder','Die','Laufen ist eine Tätigkeit.'],['Der Fisch schwimmt.','schwimmt','Fisch','Der','Schwimmt sagt, was der Fisch tut.'],['Du schläfst tief.','schläfst','Du','tief','Schläfst gehört zum Verb schlafen.'],['Das Eis schmilzt.','schmilzt','Eis','Das','Schmilzt beschreibt einen Vorgang.'],['Ihr singt laut.','singt','laut','Ihr','Singt ist das Tuwort.'],['Ich bleibe hier.','bleibe','hier','Ich','Auch bleiben ist ein Verb.']
 ],'das Verb'),'Ein Verb muss keine Bewegung beschreiben. [[verb:ist]] und [[verb:hat]] gehören ebenfalls dazu.',['verb']),
 topic('adjectives',1,'Wiewörter erkennen','Wiewörter heißen Adjektive. Sie beschreiben, wie jemand oder etwas ist.',[
  'Frage: Wie ist der Ball? Er ist [[adjective:rund]]. Wie ist das Wasser? Es ist [[adjective:kalt]].',
  'Du kannst viele Adjektive zwischen Artikel und Nomen setzen: der [[adjective:kleine]] Hund. Die Endung kann sich dabei ändern.',
  'Ein Adjektiv verrät eine Eigenschaft. Namenwörter benennen etwas; Verben beschreiben Tätigkeiten, Vorgänge oder Zustände.'
 ],[ex('Die Blume ist [[adjective:rot]].','Wie ist die Blume? Rot.'),ex('Das Kind ist [[adjective:fröhlich]].','Fröhlich beschreibt das Kind.'),ex('Das [[adjective:weiche]] Kissen liegt hier.','Weiche gehört zum Adjektiv weich.'),ex('Der Weg ist [[adjective:lang]].','Lang beschreibt eine Eigenschaft.')],identify([
 ['Der Ball ist rund.','rund','Ball','ist','Rund beantwortet die Frage: Wie ist der Ball?'],['Das Wasser ist kalt.','kalt','Wasser','ist','Kalt beschreibt das Wasser.'],['Der Hund ist klein.','klein','Hund','ist','Klein ist eine Eigenschaft.'],['Mila ist fröhlich.','fröhlich','Mila','ist','Fröhlich beschreibt, wie Mila ist.'],['Die Suppe ist warm.','warm','Suppe','ist','Warm beschreibt die Temperatur.'],['Das Buch ist spannend.','spannend','Buch','ist','Spannend beschreibt das Buch.'],['Der Stein ist hart.','hart','Stein','ist','Hart ist eine Eigenschaft.'],['Die Schnecke ist langsam.','langsam','Schnecke','ist','Langsam beschreibt hier die Schnecke.'],['Der Himmel ist blau.','blau','Himmel','ist','Blau ist eine Farbe und ein Adjektiv.'],['Das Kissen ist weich.','weich','Kissen','ist','Weich beschreibt, wie sich das Kissen anfühlt.'],['Der Weg ist lang.','lang','Weg','ist','Lang beschreibt den Weg.'],['Das Zimmer ist hell.','hell','Zimmer','ist','Hell beschreibt das Zimmer.']
 ],'das Adjektiv'),'Farben wie [[adjective:rot]] und [[adjective:blau]] sind hier Adjektive.',['adjective']),
 topic('noun-capitals',1,'Nomen großschreiben','Nomen beginnen mit einem großen Buchstaben. Das gilt auch mitten im Satz.',[
  'Erkenne zuerst das Nomen. Ein Artikel kann helfen: [[article:das]] [[noun:Buch]].',
  'Schreibe den Anfangsbuchstaben groß: b → [[capital:B]]. Die übrigen Buchstaben bleiben meist klein.',
  'Ein Wort wird nicht groß, nur weil es wichtig klingt. Entscheidend ist hier die Wortart Nomen.'
 ],[ex('Ich lese ein [[capital:B]]uch.','Buch ist ein Nomen und beginnt mit B.'),ex('Die [[capital:K]]atze schläft.','Katze benennt ein Tier.'),ex('Wir haben [[capital:Z]]eit.','Auch Zeit ist ein Nomen.'),ex('Mila hat [[capital:F]]reude am Spielen.','Freude ist ein Gefühlswort und ein Nomen.')],choices(`Welche Schreibweise ist richtig: das ___?|Buch|buch|BUCH|Das Nomen Buch beginnt mit B.
Welche Schreibweise ist richtig: die ___?|Katze|katze|KATZE|Katze ist ein Nomen.
Welche Schreibweise ist richtig: der ___?|Hund|hund|HUND|Hund benennt ein Tier und beginnt groß.
Welche Schreibweise ist richtig: eine ___?|Blume|blume|BLUME|Blume ist ein Nomen.
Welche Schreibweise ist richtig: ein ___?|Kind|kind|KIND|Kind wird als Nomen großgeschrieben.
Welche Schreibweise ist richtig: der ___?|Baum|baum|BAUM|Baum ist ein Namenwort.
Ich habe ___.|Hunger|hunger|HUNGER|Hunger ist ein Nomen und beginnt groß.
Wir brauchen ___.|Wasser|wasser|WASSER|Wasser ist ein Nomen.
Ich habe heute viel ___.|Zeit|zeit|ZEIT|Zeit ist ein Nomen.
Wir gehen in die ___.|Schule|schule|SCHULE|Schule beginnt mit einem großen S.
Die ___ scheint.|Sonne|sonne|SONNE|Sonne ist ein Nomen.
Das ___ ist weich.|Kissen|kissen|KISSEN|Kissen ist ein Nomen.`),'Nicht das ganze Wort muss groß sein: [[noun:Hund]], nicht HUND.',['noun','capital']),
 topic('sentence-capitals',1,'Am Satzanfang großschreiben','Das erste Wort eines Satzes beginnt mit einem großen Buchstaben, unabhängig von seiner Wortart.',[
  'Suche den Anfang des Satzes. Dort setzt du einen [[capital:Großbuchstaben]].',
  'Nach einem Punkt beginnt ein neuer Satz: Ich lese. [[capital:D]]anach male ich.',
  'Auch ein Verb oder ein Pronomen beginnt am Satzanfang groß: [[capital:I]]ch singe. [[capital:S]]pielst du mit?'
 ],[ex('[[capital:H]]eute ist es warm.','Heute steht am Satzanfang.'),ex('[[capital:I]]ch lerne Deutsch.','Das Pronomen Ich beginnt hier groß.'),ex('Ben liest. [[capital:D]]ann spielt er.','Nach dem Punkt startet ein neuer Satz.'),ex('[[capital:K]]ommst du mit?','Auch in einer Frage beginnt das erste Wort groß.')],choices(`Welcher Satzanfang ist richtig: ___ lerne Deutsch.|Ich|ich|ICH|Ich steht am Satzanfang.
Welcher Satzanfang ist richtig: ___ ist es warm.|Heute|heute|HEUTE|Heute beginnt diesen Satz.
Welcher Satzanfang ist richtig: ___ spielen zusammen.|Wir|wir|WIR|Wir steht am Satzanfang.
Welcher Satzanfang ist richtig: ___ kommt Ben.|Morgen|morgen|MORGEN|Morgen wird am Satzanfang großgeschrieben.
Welcher Satzanfang ist richtig: ___ du mit?|Kommst|kommst|KOMMST|Eine Frage beginnt ebenfalls groß.
Ich lese. ___ male ich.|Dann|dann|DANN|Nach dem Punkt beginnt ein neuer Satz.
Es regnet. ___ bleibe ich hier.|Deshalb|deshalb|DESHALB|Deshalb beginnt den neuen Satz.
___ mir bitte!|Hilf|hilf|HILF|Auch eine Aufforderung beginnt groß.
___ liegt mein Buch.|Hier|hier|HIER|Hier ist das erste Wort.
___ geht es dir?|Wie|wie|WIE|Wie beginnt den Fragesatz.
___ bin müde.|Ich|ich|ICH|Am Satzanfang beginnt das Wort groß.
___ heißt du?|Wie|wie|WIE|Das erste Wort der Frage beginnt mit W.`),'Ein Adjektiv kann am Satzanfang groß sein, ohne dadurch ein Nomen zu werden.',['capital','punctuation']),
 topic('sentence-words',1,'Wörter im Satz erkennen','Ein Satz besteht aus einzelnen Wörtern. Zwischen geschriebenen Wörtern stehen Leerzeichen.',[
  'Sprich den Satz langsam und zeige bei jedem Wort auf eine neue Stelle.',
  'Artikel wie [[article:der]] und kurze Wörter wie ich zählen als eigene Wörter.',
  'Punkt und Fragezeichen sind Satzzeichen. Sie zählen hier nicht als Wörter.'
 ],[ex('Ich | lese | ein | Buch.','Dieser Satz hat vier Wörter.'),ex('Der | Hund | schläft.','Der ist ein eigenes Wort: zusammen drei Wörter.'),ex('Wir | spielen.','Zwei Wörter, aber der Punkt ist kein Wort.'),ex('Mila | und | Ben | lachen.','Auch und zählt als Wort.')],choices(`Wie viele Wörter hat der Satz „Ich lese ein Buch.“?|4|3|5|Ich / lese / ein / Buch sind vier Wörter.
Wie viele Wörter hat „Der Hund schläft.“?|3|2|4|Der / Hund / schläft sind drei Wörter.
Wie viele Wörter hat „Wir spielen.“?|2|1|3|Wir und spielen sind zwei Wörter.
Wie viele Wörter hat „Mila und Ben lachen.“?|4|3|5|Auch und ist ein eigenes Wort.
Wie viele Wörter hat „Heute scheint die Sonne.“?|4|3|5|Heute / scheint / die / Sonne.
Wie viele Wörter hat „Ich bin müde.“?|3|2|4|Ich / bin / müde.
Wie viele Wörter hat „Kommst du mit?“?|3|2|4|Kommst / du / mit; das Fragezeichen zählt nicht.
Wie viele Wörter hat „Das kleine Kind lacht.“?|4|3|5|Das / kleine / Kind / lacht.
Wie viele Wörter hat „Wir gehen in die Schule.“?|5|4|6|Wir / gehen / in / die / Schule.
Wie viele Wörter hat „Ben malt ein schönes Bild.“?|5|4|6|Ben / malt / ein / schönes / Bild.
Wie viele Wörter hat „Ich esse.“?|2|1|3|Ich und esse sind zwei Wörter.
Wie viele Wörter hat „Die Katze sitzt auf dem Sofa.“?|6|5|7|Die / Katze / sitzt / auf / dem / Sofa.`),'Die Zahl der Buchstaben ist nicht die Zahl der Wörter.',['article','punctuation']),
 topic('full-stop',1,'Den Punkt am Satzende setzen','Ein einfacher Aussagesatz endet mit einem Punkt. Der Punkt zeigt: Dieser Gedanke ist zu Ende.',[
  'Eine Aussage erzählt oder beschreibt etwas: Der Hund schläft[[punctuation:.]]',
  'Setze den Punkt direkt hinter das letzte Wort, ohne Leerzeichen davor.',
  'Danach folgt ein Leerzeichen. Der nächste Satz beginnt wieder groß.'
 ],[ex('Ich male[[punctuation:.]]','Die Aussage ist vollständig.'),ex('Der Ball ist rot[[punctuation:.]]','Der Punkt schließt die Aussage ab.'),ex('Ben liest[[punctuation:.]] Mila spielt[[punctuation:.]]','Hier stehen zwei Sätze und zwei Punkte.'),ex('Wir gehen nach Hause[[punctuation:.]]','Ein längerer Satz bekommt ebenfalls nur seinen Schlusspunkt.')],choices(`Welche Fassung ist richtig?|Ich lese.|Ich lese|Ich lese ,|Eine Aussage endet mit einem Punkt.
Welche Fassung ist richtig?|Der Hund schläft.|Der Hund schläft|Der Hund schläft ,|Nach schläft steht der Punkt.
Welche Fassung ist richtig?|Wir malen.|Wir malen|Wir malen ,|Der Punkt beendet die Aussage.
Welches Zeichen beendet die Aussage „Das Wasser ist kalt“?|.|,|:|Eine Aussage endet hier mit einem Punkt.
Welches Zeichen beendet „Mila spielt im Garten“?|.|,|:|Die Aussage ist mit dem Punkt abgeschlossen.
Welche Fassung ist richtig?|Ben singt.|Ben singt|Ben singt ,|Nach dem letzten Wort folgt ein Punkt.
Wie viele Punkte brauchen zwei Aussagesätze?|2|1|3|Jeder der beiden Sätze braucht einen Schlusspunkt.
Welche Fassung ist richtig?|Es regnet.|Es regnet|Es regnet ,|Die Aussage bekommt einen Punkt.
Wo steht der Punkt?|Direkt nach dem letzten Wort|Vor dem ersten Wort|Nach jedem Wort|Der Punkt markiert das Ende des ganzen Satzes.
Welche Fassung ist richtig?|Ich lerne. Dann spiele ich.|Ich lerne dann spiele ich|Ich lerne, Dann spiele ich.|Hier sind zwei vollständige Aussagen getrennt.
Welche Fassung ist richtig?|Die Sonne scheint.|Die Sonne scheint|Die Sonne scheint ,|Eine Aussage endet mit einem Punkt.
Was kommt nach dem Punkt zwischen zwei Sätzen?|Ein Leerzeichen und ein Großbuchstabe|Immer ein Komma|Immer ein Kleinbuchstabe|Der neue Satz beginnt nach einem Leerzeichen groß.`),'Ein Punkt gehört ans Satzende und nicht nach jedes Wort.',['punctuation','capital'])
];
