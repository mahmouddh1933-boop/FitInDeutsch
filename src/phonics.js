// Original German literacy material. Words are spoken whole; regional variants
// are explained, never judged against a single browser voice.
const example = (word, image = null, count = 1) => ({word, image, count});
const section = (title, rule, rows) => ({title, rule, examples: rows.map(row => Array.isArray(row) ? example(...row) : example(row))});
const ruleQuestion = (prompt, correct, others, explanation) => ({prompt, correct, options: [correct, ...others], explanation});
function pattern(id, title, description, sections, sentences, tips, rules, extra = []) {
 return {id, title, description, sections, sentences, tips, rules, extra, examples: sections.flatMap(s => s.examples).map(e => ({...e, at: e.word.toLocaleLowerCase('de').lastIndexOf(id)}))};
}
export const soundPatterns = [
 pattern('sch', 'sch', 'Drei Buchstaben, ein sch-Laut: am Anfang, in der Mitte und am Ende.', [
  section('Der sch-Laut', 'Lass die Luft ruhig durch den leicht gespitzten Mund strömen. Sprich sch als einen Laut, nicht als drei Buchstabennamen.', [['Schule','🏫'],['Schere','Schere'],['Schiff','🚢'],['Schuh','👟'],['Fisch','🐟'],['Tisch','Tisch'],['Tasche','🎒'],['Flasche','Wasserflasche'],['Schnee','❄️'],['Kirsche','🍒']])
 ], ['Die Schere liegt auf dem Tisch.', 'In der Tasche ist eine Flasche.'], ['Höre genau hin: Kirche und Kirsche haben verschiedene Laute.', 'Wortbausteine beachten: Häuschen besteht aus Haus und -chen. Dort werden s und ch getrennt gesprochen.'], [
  ruleQuestion('Wie sprichst du sch in „Schule“?', 'Als einen sch-Laut', ['Als s und k','Als drei Buchstabennamen'], 'In Schule bilden s, c und h gemeinsam den sch-Laut.'),
  ruleQuestion('Welches Wort endet mit sch?', 'Fisch', ['Schule','Tasche'], 'Bei Fisch steht sch am Wortende.'),
  ruleQuestion('Welches Wort hat einen anderen Laut als „Kirsche“?', 'Kirche', ['Tasche','Schere'], 'Kirche hat den Ich-Laut ch. Kirsche enthält sch.')
 ]),
 pattern('ch', 'ch', 'Bach, Bauch, Licht, China: Entdecke die verschiedenen Aussprachen.', [
  section('1 · Ach-Laut nach a, o, u und au', 'In diesen Wörtern hörst du ch weiter hinten im Mund. Lass die Luft ohne Kratzen ausströmen. Bauch gehört wegen au ebenfalls dazu.', [['Bach','Fluss'],['Bauch','body:Bauch'],['Buch','Buch'],['Dach','Haus'],['Loch'],['Tuch'],['lachen','😄'],['kochen','🍲']]),
  section('2 · Ich-Laut nach helleren Selbstlauten', 'Nach e, i, ä, ö, ü, ei, eu und äu klingt ch in diesen Beispielen wie in ich. Die Zunge liegt weiter vorn als beim Ach-Laut.', [['Becher','Becher'],['Licht','💡'],['Bäche','Fluss',2],['Löcher'],['Bücher','Buch',3],['weich'],['Teich'],['feucht'],['Bäuche'],['lächeln','😊'],['Eiche','Baum'],['leuchten','💡']]),
  section('3 · Ich-Laut nach Mitlauten', 'Auch nach l, n oder r hörst du in diesen Wörtern den Ich-Laut. In durch steht direkt vor ch ein r.', [['Milch','🥛'],['manch'],['durch'],['welche']]),
  section('4 · Die Endung -chen', 'Die Verkleinerungsendung -chen wird mit dem Ich-Laut gesprochen. Achte auf den Wortbaustein: Haus + -chen wird Häuschen. Das s gehört zum Wortstamm.', [['Mädchen','👧'],['Häuschen','Haus'],['Mäuschen','🐁'],['Bäumchen','Baum'],['Männchen']]),
  section('5 · China und Chemie: regionale Varianten', 'China und Chemie beginnen häufig mit dem Ich-Laut. Regional sind auch Aussprachen mit k oder sch üblich. Diese Varianten sind nicht pauschal falsch. Eine deutsche Browserstimme kann eine andere Variante verwenden als eure Lehrkraft.', [['China','🇨🇳'],['Chemie','🧪'],['chinesisch']]),
  section('6 · ch klingt wie k', 'In manchen Wörtern aus anderen Sprachen wird ch als k gesprochen. Lerne diese Wörter mit ihrem Klang.', [['Chor'],['Chaos'],['Chlor'],['Christ']]),
  section('7 · ch klingt wie sch', 'In diesen Wörtern hörst du am Anfang einen sch-Laut. Die Schreibweise bleibt ch.', [['Chef'],['Chance'],['Chauffeur'],['Chalet']]),
  section('8 · ch klingt wie tsch', 'In diesen gebräuchlichen Wörtern hörst du einen tsch-Laut. Auch am Wortende von Couch ist das so.', [['Chip'],['Chips'],['Chat','💬'],['checken'],['Coach'],['Couch','🛋️']]),
  section('9 · chs klingt oft wie k und s', 'In Fuchs, Dachs, sechs und wachsen werden die Buchstaben chs als k und s gesprochen.', [['Fuchs','🦊'],['Dachs','🦡'],['sechs','6'],['wachsen','🌱']]),
  section('10 · ch und s an einer Wortbausteingrenze', 'Die Regel für chs gilt nicht überall: In nächste und höchste bleibt der Ich-Laut erhalten. In „des Bachs“ bleiben der Ach-Laut und ein eigenes s. Achte auf die Wortbausteine.', [['nächste'],['höchste'],['Bachs']])
 ], ['Der Bach ist flach.', 'Das Licht ist hell.', 'Das Mädchen liest ein Buch.'], ['Bach und Bauch haben den Ach-Laut. Licht und ich haben den Ich-Laut.', 'Sprich den Ich-Laut nicht automatisch wie sch. Vergleiche Kirche und Kirsche.', 'Die Übersicht zeigt wichtige Fälle im Deutschen. Bei Namen und weiteren Fremdwörtern können zusätzliche Aussprachen vorkommen.'], [
  ruleQuestion('Wie klingt ch in „Bauch“?', 'Wie in Bach', ['Wie in Licht','Wie in Chef'], 'Nach au hörst du in Bauch den Ach-Laut, genau wie in Bach.'),
  ruleQuestion('Welche Aussage über „China“ passt?', 'Die Aussprache kann regional verschieden sein.', ['Nur k ist richtig.','Nur sch ist richtig.'], 'China wird regional mit Ich-Laut, k oder sch gesprochen. Die App wertet diese Varianten nicht als Fehler.'),
  ruleQuestion('Wie klingt ch in „Chor“?', 'Wie k', ['Wie in ich','Wie tsch'], 'Chor beginnt mit einem k-Laut.')
 ], [
  ruleQuestion('Welches Wort hat den Ich-Laut?', 'Licht', ['Bach','Bauch'], 'Nach i hörst du in Licht den Ich-Laut.'),
  ruleQuestion('Welches Wort hat den Ach-Laut?', 'Buch', ['Milch','weich'], 'In Buch steht vor ch ein u: Hier hörst du den Ach-Laut.'),
  ruleQuestion('Wie klingt ch in „Milch“?', 'Wie in ich', ['Wie k','Wie sch'], 'Nach l hörst du in Milch den Ich-Laut.'),
  ruleQuestion('Wie klingt die Endung in „Mädchen“?', 'Mit dem Ich-Laut', ['Mit dem Ach-Laut','Mit k und s'], 'Die Endung -chen hat den Ich-Laut.'),
  ruleQuestion('Wie wird „Häuschen“ aufgebaut?', 'Haus + -chen', ['Häu + sch + en','Haus + -sch'], 'Das s gehört zu Haus. Danach folgt -chen mit dem Ich-Laut.'),
  ruleQuestion('Wie klingt ch in „Chef“?', 'Wie sch', ['Wie k','Wie in Bach'], 'Chef beginnt mit einem sch-Laut, wird aber mit Ch geschrieben.'),
  ruleQuestion('Wie klingt ch in „Chip“?', 'Wie tsch', ['Wie in ich','Wie k und s'], 'In Chip hörst du am Anfang einen tsch-Laut.'),
  ruleQuestion('Welche Lautfolge hörst du bei chs in „Fuchs“?', 'k und s', ['sch','Nur den Ich-Laut'], 'Fuchs wird mit der Lautfolge k und s gesprochen.'),
  ruleQuestion('Gilt „chs klingt wie ks“ auch für „höchste“?', 'Nein, hier bleibt der Ich-Laut.', ['Ja, immer.','Hier ist ch stumm.'], 'Bei höchste steht ch vor einem angehängten s. Die Wortbausteine helfen beim Unterscheiden.'),
  ruleQuestion('Wie klingt ch in „feucht“?', 'Wie in ich', ['Wie in Bach','Wie tsch'], 'Nach eu hörst du in feucht den Ich-Laut.'),
  ruleQuestion('Welches Wort hat ch wie in „ich“?', 'Bücher', ['Buch','Dach'], 'Nach ü hat Bücher den Ich-Laut. Buch und Dach haben den Ach-Laut.'),
  ruleQuestion('Welche Aussage zu „Chemie“ passt?', 'Es gibt übliche regionale Aussprachevarianten.', ['Es muss überall wie Chef beginnen.','Das ch wird nie gesprochen.'], 'Bei Chemie kommen je nach Region Ich-Laut, k oder sch vor. Fragt eure Lehrkraft und hört die ganze Wortform.')
 ]),
 pattern('ei', 'ei', 'Zwei Buchstaben verbinden sich zum ei-Laut.', [section('Ein gemeinsamer Laut', 'Sprich ei gleitend zusammen wie in Eis. Die beiden Buchstaben werden nicht als Buchstabennamen gesprochen.', [['Eis','🍨'],['Ei','🥚'],['Eimer','🪣'],['Bein','🦵'],['Seil','🪢'],['Reis','🍚'],['Kleid','👗'],['Seife','🧼'],['Stein','🪨'],['Leiter','🪜']])], ['Ein Ei liegt im Eimer.', 'Mein Kleid ist weiß.'], ['Verwechsle ei nicht mit ie: In Eis hörst du ei, in Biene ein langes i.'], [
  ruleQuestion('Welches Wort hat den gleichen ei-Laut wie „Eis“?', 'Seil', ['Biene','Eule'], 'In Seil hörst du den ei-Laut.'),
  ruleQuestion('Welche Verbindung steht in „Bein“?', 'ei', ['ie','eu'], 'Bein schreibt man mit ei.'),
  ruleQuestion('Was ist bei „ei“ wichtig?', 'Die Buchstaben gemeinsam sprechen', ['Beide Buchstabennamen einzeln sagen','Das i immer weglassen'], 'ei ist in diesen Wörtern ein zusammenhängender Gleitlaut.')
 ]),
 pattern('au', 'au', 'Höre den au-Laut wie in Auto und Haus.', [section('Vom a zum u gleiten', 'Sprich au fließend zusammen. Auto, Haus und Bauch enthalten denselben au-Laut.', [['Auto','🚗'],['Haus','Haus'],['Maus','🐁'],['Baum','Baum'],['Auge','👁️'],['Bauch','body:Bauch'],['Zaun'],['Schaufel','🪏'],['Traube','🍇'],['Schaukel']])], ['Die Maus sitzt am Haus.', 'Das Auto steht am Zaun.'], ['au ist etwas anderes als äu: Haus hat au, Häuser hat äu.'], [
  ruleQuestion('Welches Wort enthält au?', 'Baum', ['Bäume','Biene'], 'Baum hat au. In Bäume wird daraus äu.'),
  ruleQuestion('Welches Wort hat denselben au-Laut wie „Haus“?', 'Maus', ['Eule','Eis'], 'Haus und Maus haben denselben au-Laut.'),
  ruleQuestion('Welche Form schreibt man mit au?', 'Haus', ['Häuser','Mäuse'], 'Haus schreibt man mit au. Häuser und Mäuse mit äu.')
 ]),
 pattern('eu', 'eu', 'eu klingt wie in Eule und heute.', [section('Den eu-Laut hören', 'Sprich eu als einen Gleitlaut wie am Anfang von Eule. Sprich nicht e und u als zwei getrennte Buchstabennamen.', [['Eule','🦉'],['Euro','Geldmünze'],['Feuer','🔥'],['neun','9'],['Freund'],['Freude','😊'],['Kreuz'],['heute','📅'],['teuer']])], ['Heute scheint die Sonne.', 'Neun Freunde sehen eine Eule.'], ['eu und äu klingen in diesen Beispielen gleich. Die Schreibweise musst du trotzdem unterscheiden.'], [
  ruleQuestion('Welches Wort klingt bei eu wie „Eule“?', 'Feuer', ['Auto','Eimer'], 'Feuer enthält den eu-Laut.'),
  ruleQuestion('Wie verhalten sich eu und äu in „Eule“ und „Bäume“?', 'Sie klingen gleich, werden aber anders geschrieben.', ['Sie werden immer gleich geschrieben.','eu klingt wie ein langes i.'], 'eu und äu stehen hier für denselben Gleitlaut.'),
  ruleQuestion('Welche Verbindung fehlt in „h__te“?', 'eu', ['ei','ie'], 'Heute wird mit eu geschrieben.')
 ]),
 pattern('ie', 'ie', 'ie steht meistens für ein langes i.', [section('Das lange i', 'Sprich ein langes i wie in Biene. Die Buchstaben i und e gehören in diesen Beispielen zu diesem Laut.', [['Biene','🐝'],['Brief','✉️'],['Wiese'],['Tier'],['Sieb'],['Lied','🎵'],['Ziege','🐐'],['Fliege','🪰'],['Spiegel'],['Schiene']])], ['Die Biene fliegt über die Wiese.', 'Im Brief steht ein Lied.'], ['ei und ie unterscheiden sich: Eis hat ei, Biene hat ein langes i.', 'ie ist nicht ausnahmslos ein einzelner langer Laut: In Familie oder Linie werden i und e nicht einfach als ein langes i gesprochen. Höre solche Wörter als Ganzes.'], [
  ruleQuestion('Welchen Laut hörst du bei ie in „Biene“?', 'Ein langes i', ['Den ei-Laut','Ein kurzes e'], 'In Biene steht ie für ein langes i.'),
  ruleQuestion('Welches Wort wird mit ie geschrieben?', 'Brief', ['Bein','Eis'], 'Brief hat ie. Bein und Eis haben ei.'),
  ruleQuestion('Welche Aussage stimmt?', 'ie steht meistens für ein langes i.', ['ie klingt immer wie ei.','Jedes lange i wird mit ie geschrieben.'], 'ie ist eine häufige Schreibweise für ein langes i, aber es gibt weitere Schreibweisen und Ausnahmen.')
 ]),
 pattern('sp', 'sp', 'Am Wort- oder Stamm-Anfang meist sch und p.', [
  section('Am Anfang eines Wortstamms', 'Spiel und Spinne beginnen mit sch und p. Auch bei verspielen bleibt der Anfang des Wortstamms spielen erhalten.', [['Spiel','🎲'],['Spinne','🕷️'],['Sport','⚽'],['Spiegel'],['Spaß','😄'],['sprechen','💬'],['springen'],['verspielen']]),
  section('Im Wortinneren und an Wortgrenzen', 'In Wespe und Knospe hörst du s und p. In auspacken treffen aus und packen aufeinander: Auch dort bleiben s und p getrennte Laute.', [['Wespe'],['Knospe','🌱'],['auspacken','📦']])
 ], ['Die Spinne sitzt am Spiegel.', 'Wir packen die Tasche aus.'], ['Entscheidend ist der Anfang des Wortstamms, nicht nur der Anfang des ganzen Wortes.'], [
  ruleQuestion('Wie beginnt „Spiel“?', 'Mit sch und p', ['Mit s und t','Nur mit p'], 'Am Wortstammanfang wird sp hier wie sch und p gesprochen.'),
  ruleQuestion('Wie klingt sp in „Wespe“?', 'Wie s und p', ['Wie sch und p','Wie f'], 'Im Wortinneren von Wespe hörst du s und p.'),
  ruleQuestion('Was gilt für „auspacken“?', 'aus + packen: s und p bleiben erhalten.', ['Es beginnt immer mit schp.','Das s wird nicht gesprochen.'], 'Hier gehören s und p zu verschiedenen Wortbausteinen.')
 ]),
 pattern('st', 'st', 'Am Wort- oder Stamm-Anfang meist sch und t.', [
  section('Am Anfang eines Wortstamms', 'Stein, Stern und Stuhl beginnen mit sch und t. Bei verstehen beginnt der Wortstamm stehen ebenfalls so.', [['Stein','🪨'],['Stern','⭐'],['Stuhl','Stuhl'],['Stift','Stift'],['Straße','🛣️'],['Stunde','🕘'],['stehen'],['verstehen']]),
  section('Im Wortinneren und an Wortgrenzen', 'In Kiste und Weste hörst du s und t. Bei Haustür gehören s und t zu Haus und Tür. Sie werden dort nicht zu scht.', [['Kiste','📦'],['Weste'],['Fenster','🪟'],['Haustür','Tür']])
 ], ['Ein Stift liegt auf dem Stuhl.', 'Die Kiste steht an der Haustür.'], ['Regionale Aussprachen können abweichen. Die Beispiele erklären die verbreitete Standardsprache.'], [
  ruleQuestion('Wie beginnt „Stern“ in der verbreiteten Standardsprache?', 'Mit sch und t', ['Mit sch und p','Nur mit s'], 'Am Wortstammanfang wird st hier als sch und t gesprochen.'),
  ruleQuestion('Wie klingt st in „Kiste“?', 'Wie s und t', ['Wie sch und t','Wie z'], 'Im Inneren von Kiste hörst du s und t.'),
  ruleQuestion('Warum beginnt „verstehen“ beim Stamm mit sch und t?', 'Weil stehen der Wortstamm ist.', ['Weil jedes st überall gleich klingt.','Weil ver nicht gesprochen wird.'], 'Nach der Vorsilbe ver- beginnt der Wortstamm stehen.')
 ]),
 pattern('ck', 'ck', 'Zwei Buchstaben stehen für einen k-Laut.', [section('Nach einem kurzen betonten Selbstlaut', 'ck wird als ein k-Laut gesprochen. In diesen Wörtern zeigt ck, dass der Selbstlaut davor kurz ist. Lerne die Schreibung zusammen mit dem Wort.', [['Jacke','🧥'],['Socke','🧦'],['Decke'],['Brücke'],['Zucker'],['backen','🍞'],['Schnecke','🐌'],['Rucksack','Rucksack'],['Bäcker'],['Druck']])], ['Die Jacke liegt auf der Decke.', 'Der Bäcker will Brot backen.'], ['Sprich bei ck nicht ein zusätzliches c. Vergleiche kurz: backen und lang: Haken. Nicht nach jedem k-Laut steht ck.'], [
  ruleQuestion('Wie viele k-Laute sprichst du bei ck in „Jacke“?', 'Einen', ['Zwei','Drei'], 'ck steht hier für einen k-Laut.'),
  ruleQuestion('Wie ist das a in „Jacke“?', 'Kurz', ['Lang','Stumm'], 'Das betonte a vor ck ist hier kurz.'),
  ruleQuestion('Welche Schreibweise passt?', 'backen', ['baken','bakken'], 'Backen schreibt man mit ck. Haken ist ein anderes Wort mit langem a.')
 ]),
 pattern('pf', 'pf', 'p und f werden dicht nacheinander gesprochen.', [section('Die Lautverbindung pf', 'Schließe zuerst kurz die Lippen für p. Lass dann für f Luft zwischen oberen Zähnen und Unterlippe ausströmen. Verbinde beides ohne zusätzliche Silbe.', [['Pferd','🐎'],['Pfanne','🍳'],['Pfeil','➡️'],['Pflanze','🪴'],['Apfel','Apfel'],['Kopf','🙂'],['Topf','Topf'],['Knopf'],['Zopf'],['Tropfen','💧']])], ['Ein Apfel liegt neben dem Topf.', 'Das Pferd steht bei der Pflanze.'], ['Im Alltag wird pf regional manchmal vereinfacht. Übe hier die vollständige Verbindung p und f.'], [
  ruleQuestion('Welche Laute verbindest du bei pf?', 'p und f', ['p und s','k und w'], 'Bei pf folgen p und f ohne zusätzliche Silbe aufeinander.'),
  ruleQuestion('Welches Wort endet mit pf?', 'Topf', ['Pfanne','Apfel'], 'In Topf steht pf am Wortende.'),
  ruleQuestion('Welche Schreibweise ist richtig?', 'Pferd', ['Ferd','Pferdt'], 'Pferd beginnt mit der Verbindung Pf.')
 ]),
 pattern('ng', 'ng', 'Ein Nasenlaut wie am Ende von Ring.', [section('Den ng-Laut bilden', 'Höre Ring und singen. Der Laut entsteht hinten im Mund, und die Luft strömt durch die Nase. In diesen Wörtern sprichst du kein zusätzliches g.', [['Ring','💍'],['singen','🎵'],['Finger','Hand'],['Zunge','👅'],['Junge'],['Engel'],['Angel','🎣'],['Hunger'],['lang'],['springen']])], ['Der Junge kann singen.', 'Ein Ring steckt am Finger.'], ['Vergleiche singen mit sinken: Bei nk hörst du zusätzlich k.', 'Achte auf Wortbausteine: an-geben und un-gut haben an dieser Grenze n und g, keinen gemeinsamen ng-Laut.'], [
  ruleQuestion('Sprichst du bei ng in „Ring“ ein zusätzliches g?', 'Nein', ['Ja, immer','Nur am Wortende'], 'ng bildet in Ring einen Nasenlaut ohne zusätzliches g.'),
  ruleQuestion('Welches Wort hat nach dem Nasenlaut zusätzlich ein k?', 'sinken', ['singen','Ring'], 'Bei nk in sinken hörst du zusätzlich k.'),
  ruleQuestion('Was ist an „angeben“ besonders?', 'an- + geben: Hier gehören n und g zu verschiedenen Wortbausteinen.', ['Es endet mit ng.','Das g wird immer weggelassen.'], 'Beim Zusammentreffen der Wortbausteine an- und geben bleiben n und g erhalten.')
 ]),
 pattern('tz', 'tz', 't und s verbinden sich; die Schreibung zeigt oft einen kurzen Selbstlaut.', [section('Die Lautfolge t und s', 'tz klingt wie z: Du verbindest t und s. Nach einem kurzen betonten Selbstlaut steht in diesen Beispielen tz. Du sprichst kein zusätzliches t.', [['Katze','🐈'],['Mütze','Mütze'],['Pfütze'],['Platz'],['Sitz','Stuhl'],['Hitze','☀️'],['Blitz','⚡'],['Witz','😄'],['Netz'],['Schatz']])], ['Die Katze sitzt neben der Mütze.', 'Auf dem Platz ist eine Pfütze.'], ['Nicht jeder z-Laut wird tz geschrieben. Nach einem Mitlaut steht zum Beispiel nur z: Herz und Pilz.'], [
  ruleQuestion('Welche Lautfolge hörst du bei tz?', 't und s', ['k und s','p und f'], 'tz und z stehen hier für die Lautfolge t und s.'),
  ruleQuestion('Wie ist der betonte Selbstlaut vor tz in „Katze“?', 'Kurz', ['Lang','Nicht hörbar'], 'Das a in Katze ist kurz.'),
  ruleQuestion('Welches Wort wird mit tz geschrieben?', 'Mütze', ['Herz','Pilz'], 'Mütze hat tz. Nach r in Herz und l in Pilz steht z.')
 ]),
 pattern('qu', 'Qu / qu', 'Im Deutschen klingt qu meistens wie k und w.', [section('Q kommt meist mit u', 'Sprich k und das deutsche w dicht nacheinander. Das u wird hier nicht wie ein eigenes u gesprochen. Am Wortanfang von Nomen schreibst du Qu, im Wortinneren qu.', [['Qualle','🪼'],['Quelle'],['Quark'],['Quitte'],['Quadrat','Quadrat'],['Quiz'],['quer'],['bequem'],['Aquarium','🐠'],['quaken','🐸']])], ['Eine Qualle schwimmt im Aquarium.', 'Die Quelle liegt hinter dem Wald.'], ['In diesen deutschen Wörtern ergibt qu die Verbindung k und w. Einzelne Fremdwörter oder Namen können abweichen.'], [
  ruleQuestion('Wie klingt qu in „Qualle“?', 'Wie k und w', ['Wie k und ein eigenes u','Wie p und f'], 'In Qualle werden k und das deutsche w verbunden.'),
  ruleQuestion('Welche Schreibweise ist richtig?', 'Quelle', ['Kwelle','Qelle'], 'Quelle schreibt man mit Qu.'),
  ruleQuestion('Welches Wort hat qu im Wortinneren?', 'bequem', ['Qualle','Quiz'], 'Bei bequem steht qu in der Wortmitte.')
 ]),
 pattern('äu', 'äu', 'Schon bekanntes au hilft dir oft bei der Schreibung äu.', [section('Gleicher Klang wie eu', 'äu klingt in diesen Wörtern wie eu in Eule. Ein verwandtes Wort mit au hilft häufig beim Schreiben: Baum wird Bäume, Haus wird Häuser.', [['Bäume','Baum',3],['Häuser','Haus',3],['Mäuse','🐁',3],['Träume'],['Zäune'],['Räume'],['Bäuche'],['läuft','🏃']])], ['Die Mäuse laufen zwischen den Bäumen.', 'In den Häusern sind viele Räume.'], ['Nicht jedes Wort mit diesem Klang hat äu. Suche ein verwandtes Wort: Bäume kommt von Baum, heute aber nicht von einem Wort mit au.'], [
  ruleQuestion('Welches Wort hilft dir bei der Schreibung von „Bäume“?', 'Baum', ['Biene','Bein'], 'Baum hat au. In der Mehrzahl Bäume steht äu.'),
  ruleQuestion('Wie klingt äu in „Mäuse“?', 'Wie eu in Eule', ['Wie au in Maus','Wie ie in Biene'], 'äu und eu haben in diesen Beispielen denselben Klang.'),
  ruleQuestion('Welche Mehrzahl gehört zu „Haus“?', 'Häuser', ['Heuser','Hauser'], 'Haus wird in der Mehrzahl zu Häuser: au wird äu.')
 ])
];
const alternate = ['sch','ch','ei','ie','au','eu','sp','st','ck','pf','ng','tz','qu','äu'];
const rotate = (items,i) => [...items.slice(i%items.length),...items.slice(0,i%items.length)];
function hole(pattern,e) {
 const at=e.at;
 return {masked:e.word.slice(0,at)+'_'.repeat(pattern.id.length)+e.word.slice(at+pattern.id.length),correct:e.word.slice(at,at+pattern.id.length),missingPositions:Array.from({length:pattern.id.length},(_,i)=>at+i)};
}
export function soundQuestions(pattern) {
 const examples=pattern.examples.slice(0,8);
 const base=(e)=>({mode:'phonics',word:e.word,hint:pattern.sections.find(s=>s.examples.some(x=>x.word===e.word))?.rule||pattern.description});
 const gap=(e,options)=>{const missing=hole(pattern,e),upper=e.at===0&&e.word[0]!==e.word[0].toLocaleLowerCase('de'),distractors=alternate.filter(x=>x!==pattern.id).slice(0,3).map(x=>upper?x[0].toLocaleUpperCase('de')+x.slice(1):x);return {...base(e),...missing,prompt:options?'Welche Buchstabenverbindung fehlt?':'Ergänze die fehlende Buchstabenverbindung.',options:options?[missing.correct,...distractors]:null,explanation:`${e.word} schreibt man an dieser Stelle mit ${missing.correct}.`};};
 const listen=(e)=>({...base(e),prompt:'Höre das ganze Wort. Welches Wort hörst du?',speak:e.word,correct:e.word,options:[e.word,...examples.filter(x=>x.word!==e.word).slice(0,3).map(x=>x.word)],explanation:`Das gehörte Wort ist ${e.word}.`});
 const e=examples;
 const wrongSpellings=['x','s','kk'].map(x=>e[4].word.slice(0,e[4].at)+x+e[4].word.slice(e[4].at+pattern.id.length)).filter(w=>w!==e[4].word);
 const position=e[5].at===0?'Am Wortanfang':e[5].at+pattern.id.length===e[5].word.length?'Am Wortende':'In der Wortmitte';
 const tasks=[gap(e[0],true),gap(e[1],false),listen(e[2]),
  {prompt:`Welches Wort enthält die Verbindung ${pattern.id}?`,correct:e[3].word,options:[e[3].word,'Oma','Auto','Fisch'].filter((w,i,a)=>a.indexOf(w)===i&& (w===e[3].word||!w.toLocaleLowerCase('de').includes(pattern.id))),explanation:`In ${e[3].word} findest du ${pattern.id}.`,hint:'Lies die Wörter und suche die Buchstaben nebeneinander.'},
  {prompt:`Welches Wort passt zu „${hole(pattern,e[4]).masked}“ mit ${pattern.id}?`,correct:e[4].word,options:[e[4].word,...wrongSpellings],explanation:`Die richtige Schreibweise ist ${e[4].word}.`,hint:`Achte auf die Verbindung ${pattern.id}.`},
  {...base(e[5]),prompt:`Wo steht ${pattern.id} im Wort „${e[5].word}“?`,correct:position,options:['Am Wortanfang','In der Wortmitte','Am Wortende'],explanation:`In ${e[5].word} steht ${pattern.id} ${position==='Am Wortanfang'?'am Anfang':position==='Am Wortende'?'am Ende':'in der Mitte'}.`},
  gap(e[6],true),gap(e[7],false),listen(e[0]),...pattern.rules,...pattern.extra];
 return tasks.map((q,i)=>({...q,id:`phonics:${pattern.id}:${i}`,mode:'phonics',options:q.options?rotate(q.options,i):q.options,hint:q.hint||pattern.description}));
}
export function mixedSoundQuestions(random=Math.random) {
 const groups=[...soundPatterns];for(let i=groups.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[groups[i],groups[j]]=[groups[j],groups[i]];}
 return groups.slice(0,12).map(p=>{const questions=soundQuestions(p);return questions[Math.floor(random()*questions.length)];});
}
export const soundExampleCount=soundPatterns.reduce((n,p)=>n+p.examples.length,0);
export const soundTaskCount=soundPatterns.reduce((n,p)=>n+soundQuestions(p).length,0);
// Retain the earlier compact export for callers that only need a sample word.
export const soundGroups=soundPatterns.map(p=>[p.id,p.examples[0].word,p.examples[0].image]);
