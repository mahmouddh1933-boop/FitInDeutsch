import {topic,ex,choices,question} from './helpers.js';
const constituentRows=[
 ['Mila liest ein Buch.','Mila','liest','ein Buch','Wer liest ein Buch? Mila.'],['Der Hund frisst sein Futter.','Der Hund','frisst','sein Futter','Wer frisst? Der Hund.'],['Heute spielt Ben Fußball.','Ben','spielt','Fußball','Wer spielt heute? Ben.'],['Die Kinder malen Bilder.','Die Kinder','malen','Bilder','Wer malt Bilder? Die Kinder.'],['Im Garten wächst eine Blume.','eine Blume','wächst','Im Garten','Was wächst im Garten? Eine Blume.'],['Wir lernen Deutsch.','Wir','lernen','Deutsch','Wer lernt Deutsch? Wir.'],['Das Fahrrad steht im Hof.','Das Fahrrad','steht','im Hof','Was steht im Hof? Das Fahrrad.'],['Am Abend kocht mein Vater.','mein Vater','kocht','Am Abend','Wer kocht? Mein Vater.'],['Die Sonne scheint hell.','Die Sonne','scheint','hell','Was scheint? Die Sonne.'],['Du suchst den Schlüssel.','Du','suchst','den Schlüssel','Wer sucht den Schlüssel? Du.'],['Auf dem Sofa schläft die Katze.','die Katze','schläft','Auf dem Sofa','Wer schläft auf dem Sofa? Die Katze.'],['Mein Bruder trinkt Wasser.','Mein Bruder','trinkt','Wasser','Wer trinkt Wasser? Mein Bruder.']
];
export const grade3=[
 topic('comparison',3,'Adjektive steigern','Mit Adjektiven kannst du Eigenschaften vergleichen. Dafür gibt es Grundform, Vergleichsstufe und Höchststufe.',[
  'Die Grundform heißt Positiv: [[adjective:schnell]]. Bei Gleichheit benutzt du so … wie: Ben ist so schnell wie Mila.',
  'Der Komparativ hat oft -er: [[adjective:schneller]]. Beim Unterschied steht als: Mila ist schneller als Ben.',
  'Der Superlativ drückt die höchste Stufe aus: [[adjective:am schnellsten]]. Manche Formen verändern den Stamm: gut – besser – am besten.'
 ],[ex('schnell → [[adjective:schneller]] → [[adjective:am schnellsten]]','Die drei Stufen beschreiben dieselbe Eigenschaft.'),ex('groß → [[adjective:größer]] → [[adjective:am größten]]','Hier kommt ein Umlaut hinzu.'),ex('gut → [[adjective:besser]] → [[adjective:am besten]]','Diese Formen musst du dir merken.'),ex('Mila ist [[adjective:größer]] [[focus:als]] Ben.','Beim Komparativ steht in diesem Vergleich als.')],choices(`Wie lautet der Komparativ von schnell?|schneller|am schnellsten|schnellig|Die Vergleichsstufe endet hier auf -er.
Wie lautet der Superlativ von klein?|am kleinsten|kleiner|kleinig|Die Höchststufe lautet am kleinsten.
Wie lautet der Komparativ von groß?|größer|großer|am größten|Groß bekommt in der Vergleichsstufe einen Umlaut.
Wie lautet der Komparativ von gut?|besser|guter|am besten|Gut wird unregelmäßig gesteigert.
Wie lautet der Superlativ von gut?|am besten|am gutesten|besser|Die Höchststufe ist am besten.
Wie lautet der Komparativ von hoch?|höher|hocher|am höchsten|Die Vergleichsstufe heißt höher.
Wie lautet der Komparativ von alt?|älter|alter|am ältesten|Alt bekommt einen Umlaut.
Wie lautet der Superlativ von warm?|am wärmsten|wärmer|am warmersten|Die Höchststufe heißt am wärmsten.
Mila ist größer ___ Ben.|als|wie|mit|Ein Unterschied im Komparativ wird hier mit als verglichen.
Ben ist so groß ___ Mila.|wie|als|von|Bei Gleichheit heißt es so … wie.
Welche Form ist die Grundform?|klein|kleiner|am kleinsten|Klein ist der Positiv.
Welche Reihe ist richtig?|viel – mehr – am meisten|viel – vieler – am vielsten|viel – mehr – am mehrsten|Viel wird unregelmäßig gesteigert.`),'Nicht größer wie, sondern [[adjective:größer]] [[focus:als]]. Bei Gleichheit heißt es so groß wie.',['adjective','suffix','focus']),
 topic('compound-nouns',3,'Zusammengesetzte Nomen','Aus zwei oder mehr Wörtern kann ein neues Nomen entstehen. Das letzte Nomen ist das Grundwort und bestimmt den Artikel.',[
  'Suche zuerst das rechte Wort: die Sonne + der Schirm → [[article:der]] Sonnen[[noun:schirm]]. Das neue Wort ist eine Art Schirm.',
  'Das linke Wort beschreibt genauer, was gemeint ist. Eine Haustür ist eine Tür zu einem Haus.',
  'Manchmal brauchst du einen Verbindungslaut: Arbeit + Blatt → Arbeitsblatt. Das zusammengesetzte Nomen schreiben wir als ein Wort.'
 ],[ex('die Sonne + der Schirm → [[article:der]] Sonnen[[noun:schirm]]','Schirm bestimmt den Artikel der.'),ex('das Haus + die Tür → [[article:die]] Haus[[noun:tür]]','Tür bestimmt den Artikel die.'),ex('die Arbeit + das Blatt → [[article:das]] Arbeit[[focus:s]]blatt','Das s verbindet die Bestandteile.'),ex('das Kind + das Zimmer → [[article:das]] Kinder[[noun:zimmer]]','Zimmer ist das Grundwort.')],choices(`Haus + Tür: Wie heißt das neue Nomen?|Haustür|Haustürenhaus|Haus Tür|Die beiden Wörter werden zusammengeschrieben.
Welcher Artikel passt zu „Sonnenschirm“?|der|die|das|Das Grundwort ist der Schirm.
Welcher Artikel passt zu „Haustür“?|die|der|das|Das Grundwort ist die Tür.
Welcher Artikel passt zu „Kinderzimmer“?|das|der|die|Das Grundwort ist das Zimmer.
Arbeit + Blatt: Welche Form ist richtig?|Arbeitsblatt|Arbeitblatt|Arbeit Blatt|Hier verbindet ein s die Bestandteile.
Schule + Tasche: Welche Form ist richtig?|Schultasche|Schuletasche|Schule Tasche|Bei Schultasche fällt das e von Schule weg.
Was ist das Grundwort von „Apfelbaum“?|Baum|Apfel|Apfelbaum ist kein Nomen|Das rechte Wort Baum ist das Grundwort.
Welcher Artikel passt zu „Fußball“?|der|die|das|Das Grundwort ist der Ball.
Welche Erklärung passt zu „Gartenhaus“?|Ein Haus im Garten|Ein Garten im Haus|Ein Haus ohne Garten|Das Grundwort Haus sagt, um welche Art Sache es geht.
Welcher Artikel passt zu „Bilderbuch“?|das|der|die|Das Grundwort ist das Buch.
Welche Schreibweise ist richtig?|Zahnbürste|Zahn Bürste|zahnbürste|Das neue Nomen wird zusammengeschrieben und beginnt groß.
Was bestimmt meistens den Artikel?|Das letzte Nomen|Immer das erste Wort|Die Anzahl der Buchstaben|Das Grundwort steht rechts.`),'Der Artikel kommt vom Grundwort, nicht automatisch vom ersten Nomen.',['noun','article','focus']),
 topic('compound-verbs-adjectives',3,'Verben und Adjektive zusammensetzen','Mehrere Wortteile können ein neues Verb oder Adjektiv bilden. Die Teile tragen gemeinsam zur Bedeutung bei.',[
  'Bei Verben können Zusätze die Handlung genauer beschreiben: [[prefix:auf]][[verb:stehen]], [[prefix:mit]][[verb:kommen]].',
  'Manche dieser Verben werden im Satz getrennt: Ich [[verb:stehe]] früh [[prefix:auf]]. Die Grundform schreiben wir aufstehen.',
  'Zusammengesetzte Adjektive beschreiben oft genauer: [[focus:hell]][[adjective:blau]], [[focus:eis]][[adjective:kalt]]. Hier üben wir eindeutige Zusammenschreibungen.'
 ],[ex('auf + stehen → [[verb:aufstehen]]','Der Zusatz verändert die Bedeutung von stehen.'),ex('Ich [[verb:rufe]] dich [[prefix:an]].','Die Teile von anrufen stehen hier getrennt.'),ex('hell + blau → [[adjective:hellblau]]','Das neue Adjektiv beschreibt einen hellen Blauton.'),ex('Eis + kalt → [[adjective:eiskalt]]','Das Adjektiv bedeutet besonders kalt.')],choices(`Wie lautet die Grundform aus auf + stehen?|aufstehen|auf stehen|Aufstehen heißt immer ein Nomen|Die Grundform dieses Verbs wird zusammengeschrieben.
Wie lautet die Grundform aus mit + kommen?|mitkommen|mit kommen|mitkommt|Mitkommen ist die Grundform.
Wie lautet die Grundform aus an + rufen?|anrufen|an rufen|anruft|Anrufen ist die Grundform.
Ergänze „Ich stehe früh ___.“|auf|mit|an|Das Verb lautet aufstehen.
Ergänze „Ben kommt morgen ___.“|mit|an|ab|Das Verb lautet mitkommen.
Ergänze „Mila ruft mich ___.“|an|weg|auf|Das Verb lautet anrufen.
hell + blau: Welche Form ist richtig?|hellblau|hell blau|Hellblau als Adjektiv immer groß|Dieses Farbadjektiv wird zusammengeschrieben.
dunkel + grün: Welche Form ist richtig?|dunkelgrün|dunkel grün|Dunkelgrün im Satz immer groß|Das neue Adjektiv beschreibt einen dunklen Grünton.
Eis + kalt: Welches Adjektiv entsteht?|eiskalt|eis kalt|Eiskalt im Satz immer groß|Eiskalt ist eine Zusammensetzung.
Schnee + weiß: Welches Adjektiv entsteht?|schneeweiß|schnee weiß|Schneeweiß im Satz immer groß|Schneeweiß bedeutet sehr weiß.
Welches Wort ist ein zusammengesetztes Adjektiv?|hellgelb|laufen|Haus|Hellgelb ist aus hell und gelb gebildet.
Welche Grundform gehört zu „Ich gehe weg“?|weggehen|weg geht|geheweg|In der Grundform stehen die Teile zusammen.`),'In einem Satz können die Teile eines trennbaren Verbs auseinanderstehen.',['verb','adjective','prefix','focus']),
 topic('rearrange',3,'Satzglieder mit der Umstellprobe finden','Satzglieder sind Wörter oder Wortgruppen, die im Satz eine Aufgabe haben. Mit der Umstellprobe erkennst du viele zusammengehörige Gruppen.',[
  'Stelle eine Wortgruppe als Ganzes an den Anfang. Wenn der Satz sinnvoll bleibt, hast du oft ein Satzglied gefunden.',
  'Verschiebe zum Beispiel [[time:am Morgen]] gemeinsam. Aus Mila spielt am Morgen im Park wird: Am Morgen spielt Mila im Park.',
  'In einem Aussagesatz bleibt die Personalform des Verbs an der zweiten Satzgliedstelle. Die Umstellprobe ist eine Hilfe; nicht jede zufällige Verschiebung ist richtig.'
 ],[ex('[[subject:Mila]] [[predicate:spielt]] [[time:am Morgen]] [[place:im Park]].','Die farbigen Gruppen gehören jeweils zusammen.'),ex('[[time:Am Morgen]] [[predicate:spielt]] [[subject:Mila]] [[place:im Park]].','Am Morgen wurde als ganze Gruppe verschoben.'),ex('[[place:Im Park]] [[predicate:spielt]] [[subject:Mila]] [[time:am Morgen]].','Auch im Park kann gemeinsam vorne stehen.'),ex('[[subject:Der kleine Hund]] [[predicate:schläft]].','Der kleine Hund ist eine zusammengehörige Gruppe.')],choices(`Welche Umstellung ist richtig?|Heute liest Mila ein Buch.|Heute Mila liest ein Buch.|Heute liest Buch Mila ein.|Das Verb liest steht nach Heute.
Welche Wörter gehören in „Ben spielt im Garten“ zusammen?|im Garten|spielt im|Ben Garten|Im Garten lässt sich als Gruppe verschieben.
Welche Umstellung ist richtig?|Im Hof steht das Fahrrad.|Im steht Hof das Fahrrad.|Das steht Fahrrad im Hof.|Im Hof wurde als ganze Gruppe verschoben.
Welche Umstellung ist richtig?|Am Abend kocht mein Vater.|Am kocht Abend mein Vater.|Mein Abend Vater kocht.|Am Abend bleibt zusammen.
Welche Gruppe bildet das Subjekt in „Der kleine Hund schläft“?|Der kleine Hund|kleine Hund schläft|Der kleine|Die vollständige Gruppe beantwortet Wer schläft?
Welche Umstellung ist richtig?|Morgen gehen wir ins Kino.|Morgen wir ins Kino gehen.|Gehen morgen wir ins Kino.|Die Personalform gehen steht an zweiter Satzgliedstelle.
Welche Gruppe kann in „Ich lerne nach der Schule“ gemeinsam nach vorn?|nach der Schule|lerne nach|Ich der Schule|Nach der Schule ist eine Zeitangabe.
Welche Umstellung ist richtig?|Auf dem Sofa schläft die Katze.|Auf schläft dem Sofa die Katze.|Die auf Katze schläft Sofa.|Auf dem Sofa bleibt als Gruppe zusammen.
Welche Umstellung erhält die Aussage?|Ein Buch liest Mila heute.|Ein heute liest Buch Mila.|Heute Mila ein Buch liest.|Das Objekt Ein Buch wurde gemeinsam nach vorn gestellt.
Wo steht die Personalform im Aussagesatz nach der Umstellung?|An zweiter Satzgliedstelle|Immer am Ende|Immer an vierter Stelle|Die Satzgliedstellung ist entscheidend, nicht die Wortzahl.
Welche Gruppe gehört zusammen in „Wir spielen jeden Tag“?|jeden Tag|spielen jeden|Wir Tag|Jeden Tag lässt sich gemeinsam verschieben.
Welche Umstellung ist richtig?|Nach dem Essen liest Ben.|Nach liest dem Essen Ben.|Ben nach liest dem Essen.|Die Zeitgruppe Nach dem Essen bleibt zusammen.`),'Verschiebe die ganze Wortgruppe. Aus im Garten darf nicht im … Garten werden.',['subject','predicate','place','time']),
 topic('subject',3,'Das Subjekt: Wer oder was?','Das Subjekt sagt, wer oder was etwas tut oder in einem Zustand ist. Du findest es häufig mit der Frage Wer oder was?',[
  'Suche zuerst das Prädikat und frage danach: Wer oder was schläft? Antwort: [[subject:Der Hund]].',
  'Das Subjekt kann aus einem Wort oder aus mehreren Wörtern bestehen: Mila, wir oder der kleine Hund.',
  'Es steht nicht immer am Anfang. In Heute spielt Ben ist [[subject:Ben]] das Subjekt.'
 ],[ex('[[subject:Mila]] liest ein Buch.','Wer liest? Mila.'),ex('Heute spielt [[subject:Ben]] Fußball.','Das Subjekt steht hinter dem Verb.'),ex('[[subject:Der kleine Hund]] schläft.','Das ganze Satzglied gehört zur Antwort.'),ex('Im Garten wächst [[subject:eine Blume]].','Was wächst? Eine Blume.')],constituentRows.map(([context,subject,verb,object,why])=>question('Welches Satzglied ist das Subjekt?',subject,[verb,object],why,context)),'Nicht automatisch das erste Wort auswählen. Stelle die Wer-oder-was-Frage.',['subject']),
 topic('predicate',3,'Das Prädikat: Was tut jemand?','Das Prädikat ist der verbale Kern des Satzes. Es beschreibt die Handlung, den Vorgang oder den Zustand.',[
  'Frage zum Beispiel: Was tut Mila? Sie [[predicate:liest]]. Die Personalform passt zum Subjekt.',
  'Ein Prädikat kann aus mehreren Teilen bestehen: Mila [[predicate:hat]] ein Buch [[predicate:gelesen]]. Beide Verbteile gehören dazu.',
  'Bei trennbaren Verben gehört der abgetrennte Zusatz ebenfalls dazu: Ben [[predicate:steht]] früh [[predicate:auf]].'
 ],[ex('Mila [[predicate:liest]] ein Buch.','Das Prädikat besteht hier aus einem Wort.'),ex('Mila [[predicate:hat]] ein Buch [[predicate:gelesen]].','Hat und gelesen bilden gemeinsam das Prädikat.'),ex('Ben [[predicate:steht]] früh [[predicate:auf]].','Auf gehört zu aufstehen.'),ex('Das Kind [[predicate:ist]] müde.','Auch ein Zustand hat ein Verb als Kern.')],[...constituentRows.slice(0,8).map(([context,subject,verb,object])=>question('Finde das Prädikat.',verb,[subject,object],`${verb} ist hier die Personalform des Verbs.`,context)),...choices(`Finde alle Prädikatsteile in „Mila hat ein Buch gelesen.“|hat gelesen|Mila hat|ein Buch|Die Hilfsverbform hat und das Partizip gelesen gehören zusammen.
Finde alle Prädikatsteile in „Ben steht früh auf.“|steht auf|Ben steht|früh auf|Das Verb ist aufstehen.
Finde alle Prädikatsteile in „Wir werden morgen spielen.“|werden spielen|Wir werden|morgen spielen|Werden und spielen bilden den verbalen Kern.
Finde das Verb in „Das Kind ist müde.“|ist|Kind|müde|Ist ist die Personalform von sein.`)],'Bei mehreren Verbteilen gehört nicht nur das erste Verb zum Prädikat.',['predicate']),
 topic('past-simple',3,'Präteritum: die erste Vergangenheit','Das Präteritum erzählt von Vergangenem. Du findest es besonders oft in Geschichten und schriftlichen Berichten.',[
  'Regelmäßige Verben bilden oft -te: ich [[verb:lernte]], er [[verb:spielte]].',
  'Unregelmäßige Formen ändern sich stärker: gehen → ging, sehen → sah. Diese Formen lernst du mit.',
  'Auch im Alltag sind war und hatte häufig: Gestern [[verb:war]] ich müde. Ich [[verb:hatte]] Hunger.'
 ],[ex('Heute spiele ich. Gestern [[verb:spielte]] ich.','Spielte ist eine Präteritumform.'),ex('Ich gehe. Ich [[verb:ging]].','Gehen verändert seinen Stamm.'),ex('Mila [[verb:war]] gestern krank.','War gehört zu sein.'),ex('Ben [[verb:hatte]] Zeit.','Hatte gehört zu haben.')],choices(`Setze ins Präteritum: Ich lerne.|Ich lernte.|Ich habe gelernt.|Ich werde lernen.|Lernte ist die einfache Vergangenheitsform.
Gestern ___ Ben Fußball.|spielte|spielt|wird spielen|Spielte steht im Präteritum.
Gestern ___ ich nach Hause.|ging|gehe|werde gehen|Ging ist die Präteritumform von gehen.
Gestern ___ Mila müde.|war|ist|wird sein|War gehört zum Präteritum von sein.
Früher ___ ich mehr Zeit.|hatte|habe|werde haben|Hatte ist eine Vergangenheitsform.
Er ___ gestern ein Bild.|malte|malt|wird malen|Malte wird mit -te gebildet.
Sie ___ gestern laut.|lachte|lacht|wird lachen|Lachte ist Präteritum.
Wir ___ gestern Musik.|hörten|hören|werden hören|Hörten gehört zum Präteritum.
Ben ___ gestern einen Vogel.|sah|sieht|wird sehen|Sah ist die Präteritumform von sehen.
Mila ___ gestern ein Buch.|las|liest|wird lesen|Las ist die Präteritumform von lesen.
Welcher Satz steht im Präteritum?|Ich schrieb einen Brief.|Ich schreibe einen Brief.|Ich habe einen Brief geschrieben.|Schrieb ist die einfache Vergangenheitsform.
Welcher Satz steht im Präteritum?|Wir fanden den Ball.|Wir finden den Ball.|Wir haben den Ball gefunden.|Fanden ist eine Form von finden im Präteritum.`),'Präteritum und Perfekt erzählen beide von Vergangenem, werden aber unterschiedlich gebildet.',['verb','time']),
 topic('perfect',3,'Perfekt: die gesprochene Vergangenheit','Das Perfekt erzählt von Vergangenem. Es wird besonders häufig beim Sprechen verwendet.',[
  'Du brauchst eine Form von [[verb:haben]] oder [[verb:sein]] und das [[verb:Partizip II]]: Ich habe gespielt.',
  'Das Hilfsverb passt zur Person. Das Partizip steht in einem einfachen Aussagesatz meist am Ende.',
  'Viele Bewegungsverben mit Ortswechsel benutzen sein: Ich bin gegangen. Nicht jedes Verb bekommt ge-: Ich habe besucht.'
 ],[ex('Ich [[predicate:habe]] Fußball [[predicate:gespielt]].','Habe und gespielt gehören zusammen.'),ex('Mila [[predicate:ist]] nach Hause [[predicate:gegangen]].','Gehen wird hier mit sein gebildet.'),ex('Wir [[predicate:haben]] ein Buch [[predicate:gelesen]].','Lesen hat die besondere Form gelesen.'),ex('Ben [[predicate:hat]] uns [[predicate:besucht]].','Besucht bekommt hier kein zusätzliches ge-.')],choices(`Setze ins Perfekt: Ich spiele.|Ich habe gespielt.|Ich spielte.|Ich werde spielen.|Das Perfekt besteht aus habe und gespielt.
Mila ___ ein Bild gemalt.|hat|ist|wird|Malen bildet hier das Perfekt mit haben.
Ich ___ nach Hause gegangen.|bin|habe|werde|Ein Ortswechsel mit gehen bildet hier das Perfekt mit sein.
Wir haben ein Buch ___.|gelesen|gelest|lesen|Das Partizip II von lesen heißt gelesen.
Du ___ ein Lied gesungen.|hast|bist|wirst|Singen bildet das Perfekt hier mit haben.
Ben ist mit dem Bus ___.|gefahren|gefahrt|fahren|Das Partizip II heißt gefahren.
Ich habe viel ___.|gelernt|gelernen|lernen|Das Partizip II von lernen lautet gelernt.
Sie hat lange ___.|geschlafen|geschlaft|schlafen|Das Partizip II heißt geschlafen.
Wir ___ im Park gelaufen.|sind|haben|werden|Hier ist eine Bewegung mit Ortswechsel gemeint: sind gelaufen.
Welcher Satz steht im Perfekt?|Mila hat gelacht.|Mila lachte.|Mila lacht.|Hat gelacht ist Perfekt.
Welcher Satz ist richtig?|Ich habe gegessen.|Ich bin gegessen.|Ich habe geesst.|Essen bildet das Perfekt mit haben und gegessen.
Welcher Satz ist richtig?|Wir haben Oma besucht.|Wir haben Oma gebesucht.|Wir sind Oma besucht.|Besuchen bildet das Partizip besucht, ohne zusätzliches ge-.`),'Nicht jede Vergangenheitsform beginnt mit ge-. Auch das Hilfsverb muss passen.',['predicate','verb']),
 topic('prefixes',3,'Vorsilben: ver-, be-, ge-','Eine Vorsilbe ist ein Wortbaustein vor dem Wortstamm. Sie kann die Bedeutung oder die grammatische Form verändern.',[
  'Bei [[prefix:ver]][[stem:kaufen]] und [[prefix:be]][[stem:malen]] steht der vordere Baustein vor dem Stamm.',
  'Bei [[prefix:ge]][[stem:lern]][[suffix:t]] gehört ge- zur Bildung des Partizips II. Das ist eine andere Aufgabe als bei ver- oder be-.',
  'Achte auf die ganze Wortfamilie. Nicht jede zufällige Buchstabenfolge am Wortanfang ist eine Vorsilbe.'
 ],[ex('[[prefix:ver]]kaufen','Ver- steht vor dem Wortstamm.'),ex('[[prefix:be]]malen','Be- steht vor malen.'),ex('[[prefix:ge]]lern[[suffix:t]]','Ge- und -t helfen hier, das Partizip zu bilden.'),ex('[[prefix:ver]]packen','Die Vorsilbe verändert die Bedeutung von packen.')],choices(`Welche Vorsilbe erkennst du in „verkaufen“?|ver-|be-|ge-|Ver- steht am Anfang vor kaufen.
Welche Vorsilbe erkennst du in „bemalen“?|be-|ver-|ge-|Be- steht vor malen.
Welche Vorsilbe erkennst du in „gelacht“?|ge-|ver-|be-|Ge- ist hier ein Baustein des Partizips II.
Welche Vorsilbe erkennst du in „verpacken“?|ver-|ge-|be-|Ver- steht vor packen.
Welche Vorsilbe erkennst du in „besuchen“?|be-|ver-|ge-|Be- ist hier der vordere Wortbaustein.
Welche Vorsilbe erkennst du in „gespielt“?|ge-|be-|ver-|Ge- gehört hier zum Partizip II.
Welche Vorsilbe erkennst du in „verreisen“?|ver-|be-|ge-|Ver- steht vor reisen.
Welche Vorsilbe erkennst du in „bezahlen“?|be-|ge-|ver-|Be- steht vor zahlen.
Welche Vorsilbe erkennst du in „gemalt“?|ge-|be-|ver-|Ge- ist hier ein Baustein des Partizips.
Welche Vorsilbe erkennst du in „verstehen“?|ver-|be-|ge-|Ver- ist der vordere Baustein.
Welche Vorsilbe erkennst du in „beantworten“?|be-|ver-|ge-|Be- steht vor dem Stamm von antworten.
Welche Vorsilbe erkennst du in „gelernt“?|ge-|be-|ver-|Ge- gehört hier zur Partizipbildung.`),'Ge- in einem Partizip hat nicht dieselbe Aufgabe wie jede bedeutungsverändernde Vorsilbe.',['prefix','stem','suffix']),
 topic('suffixes',3,'Nachsilben: -heit, -keit, -nis, -ung','Eine Nachsilbe ist ein Wortbaustein am Ende eines Wortes. Mit manchen Nachsilben entstehen neue Nomen.',[
  'Aus schön wird [[noun:Schön]][[suffix:heit]], aus freundlich wird [[noun:Freundlich]][[suffix:keit]].',
  'Wörter mit -heit, -keit und -ung sind sehr oft feminine Nomen: die Freiheit, die Bewegung.',
  'Bei -nis musst du den Artikel mitlernen: das Erlebnis, aber die Finsternis. Nomen mit diesen Nachsilben schreiben wir groß.'
 ],[ex('Frei[[suffix:heit]]','Die Nachsilbe lautet -heit.'),ex('Freundlich[[suffix:keit]]','Die Nachsilbe lautet -keit.'),ex('Erleb[[suffix:nis]]','Das Erlebnis hat den Artikel das.'),ex('Beweg[[suffix:ung]]','Die Bewegung ist ein Nomen.')],choices(`Welche Nachsilbe steckt in „Freiheit“?|-heit|-keit|-ung|Freiheit endet auf -heit.
Welche Nachsilbe steckt in „Freundlichkeit“?|-keit|-heit|-nis|Freundlichkeit endet auf -keit.
Welche Nachsilbe steckt in „Erlebnis“?|-nis|-ung|-heit|Erlebnis endet auf -nis.
Welche Nachsilbe steckt in „Bewegung“?|-ung|-nis|-keit|Bewegung endet auf -ung.
Welche Nachsilbe steckt in „Sicherheit“?|-heit|-keit|-nis|Sicherheit endet auf -heit.
Welche Nachsilbe steckt in „Richtigkeit“?|-keit|-heit|-ung|Richtigkeit endet auf -keit.
Welche Nachsilbe steckt in „Ergebnis“?|-nis|-heit|-ung|Ergebnis endet auf -nis.
Welche Nachsilbe steckt in „Sammlung“?|-ung|-nis|-keit|Sammlung endet auf -ung.
Welche Nachsilbe steckt in „Schönheit“?|-heit|-keit|-nis|Schönheit endet auf -heit.
Welche Nachsilbe steckt in „Tapferkeit“?|-keit|-heit|-ung|Tapferkeit endet auf -keit.
Welche Nachsilbe steckt in „Geheimnis“?|-nis|-ung|-heit|Geheimnis endet auf -nis.
Welcher Artikel gehört zu „Bewegung“?|die|der|das|Es heißt die Bewegung.`),'Die Nachsilbe -nis hat nicht immer denselben Artikel.',['suffix','noun','article'])
];
