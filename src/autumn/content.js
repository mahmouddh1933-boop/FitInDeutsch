// Original exercises inspired by the themes and formats of the supplied 35-page workbook.
const choice=(prompt,correct,others,explanation,extra={})=>({type:'choice',prompt,correct,options:[correct,...others],explanation,...extra});
const fill=(prompt,correct,explanation,extra={})=>({type:'text',prompt,correct,explanation,...extra});
const open=(prompt,model,lines=3)=>({type:'open',prompt,model,lines});
const tf=(prompt,right,explanation)=>choice(prompt,right?'Richtig':'Falsch',[right?'Falsch':'Richtig'],explanation);
const order=(prompt,items,explanation)=>({type:'order',prompt,items,correct:items.join(' '),explanation});
const group=(title,tasks,extra={})=>({title,tasks,...extra});
const pairs=(title,rows,extra={})=>group(title,rows.map(([prompt,correct])=>choice(prompt,correct,rows.map(r=>r[1]).filter(x=>x!==correct),`${prompt} → ${correct}`,{select:true})),extra);
const riddle=(solution,rows)=>({kind:'riddle',title:'Worträtsel mit Lösungswort',instructions:'Löse die Rätsel. Nimm aus jeder Zeile den Buchstaben im farbig markierten Kästchen. Lies diese Buchstaben von oben nach unten.',solution,tasks:rows.map(([prompt,correct,letter])=>fill(prompt,correct,`Gesucht ist ${correct}. Der markierte Buchstabe ist ${correct[letter-1]}.`,{letter:letter-1,caseSensitive:false,type:'riddle'}))});
const search=words=>({kind:'wordsearch',title:'Wörter im Buchstabengitter',instructions:'Suche die Wörter von links nach rechts oder von oben nach unten. Tippe zuerst den ersten und dann den letzten Buchstaben an. Ä = AE, Ö = OE, Ü = UE und ß = SS gelten nur im Gitter.',words,tasks:[]});
const diary=()=>group('Mein Lerntagebuch',[open('Schreibe zwei neue Wörter mit einem passenden Beispielsatz.','Zum Beispiel: freundlich – Mein Nachbar ist freundlich. Deine Wörter und Sätze dürfen anders sein.'),open('Was gelang dir heute? Was möchtest du weiter üben?','Zum Beispiel: Ich konnte einen Text verstehen. Uhrzeiten möchte ich noch üben.')]);
function unit(id,title,intro,rules,examples,groups,extra={}){return {id,title,intro,rules,examples,groups:groups.map((g,gi)=>({...g,id:`${id}-g${gi+1}`,tasks:g.tasks.map((q,qi)=>({...q,id:`autumn:${id}:${gi+1}:${qi+1}`,...(q.options?{options:[...q.options.slice(qi%q.options.length),...q.options.slice(0,qi%q.options.length)]}:{})}))})),...extra};}

const welcomeText=[
 'Hallo! Ich heiße Nora und bin neun Jahre alt. Seit dem Sommer wohne ich mit meinem Vater und meiner Schwester in Duisburg. Meine Schwester Jule ist zwölf. Wir gehen beide gern in den Park, aber wir haben verschiedene Hobbys.',
 'Ich lese gern Tiergeschichten und bastle kleine Figuren aus Papier. Jule fährt lieber Roller und spielt Basketball. Am Samstag bauen wir gemeinsam ein Vogelhaus. Ich male das Dach blau, und Jule hält die Bretter fest. Unser Vater hilft uns mit dem Werkzeug.',
 'In der Feriengruppe sitze ich neben Emil. Er ist acht und zeichnet lustige Tiere. Zuerst bin ich ein wenig schüchtern. Emil fragt: „Wollen wir zusammen malen?“ Jetzt freue ich mich auf morgen. Meine Lieblingsfarbe ist Grün. Zum Mittagessen wünsche ich mir Nudeln mit Tomatensoße.'
];
const dayText=[
 'An einem Ferientag klingelt Emils Wecker um sieben Uhr. Um Viertel nach sieben frühstückt er mit seiner Oma. Er isst Haferflocken mit einer Birne und trinkt Wasser. Danach putzt er die Zähne und packt seine Tasche.',
 'Um halb neun geht Emil mit Oma zum Ferienkurs. Der Kurs beginnt um neun Uhr. Zuerst begrüßen sich alle. Dann lesen die Kinder eine Geschichte und basteln ein kleines Heft. Um Viertel nach zehn machen sie eine Pause.',
 'Um zwölf Uhr endet der Kurs. Um halb eins essen Emil und Oma eine Gemüsesuppe. Am Nachmittag trifft Emil seine Freundin Nora auf dem Spielplatz. Um Viertel vor sieben gibt es Abendessen. Vor dem Schlafen liest er zehn Minuten. Um acht Uhr macht er das Licht aus.'
];
const autumnText=[
 'Im Oktober besucht unsere Feriengruppe den Stadtpark. Unter den Bäumen liegen gelbe und rote Blätter. Ein Windstoß wirbelt einige davon durch die Luft. Sami findet eine glänzende Kastanie. Er steckt sie in seinen Stoffbeutel.',
 'Am Teich beobachten wir zwei Enten. Wir bleiben auf dem Weg und lassen die Tiere in Ruhe. Plötzlich beginnt es zu regnen. Gut, dass wir Regenjacken dabei haben! Unter einem Dach warten wir, bis der Schauer vorüber ist.',
 'Zurück im Kurs legen wir die gesammelten Blätter zwischen Zeitungspapier. Später gestalten wir damit ein Herbstbild. Wir sprechen über die Jahreszeiten: Für unsere Monatstabelle gehören September, Oktober und November zum Herbst.'
];
export const autumnDays=[
 {day:1,title:'Wir lernen uns kennen',subtitle:'Über mich, meine Hobbys und unsere Gruppe',icon:'people',goals:['Ich kann mich vorstellen.','Ich kann nach Hobbys fragen.','Ich kann Eigenschaften und Regeln beschreiben.'],units:[
  unit('kennenlernen','Mein Steckbrief und deine Fragen','Wir lernen einander kennen. Du entscheidest selbst, was du über dich erzählen möchtest.',[
   'Ein Steckbrief enthält kurze Angaben. Für die Vorstellung machst du daraus ganze Sätze.','Bei einer Frage hörst du auf das Fragewort: [[focus:Wer? Wie? Wo? Was?]]','Du darfst persönliche Fragen auslassen und mit einer erfundenen Person üben.'
  ],['[[focus:Ich heiße]] Emil. [[focus:Ich wohne]] in Essen. Ich baue gern mit Bausteinen.','Wie alt bist du? – [[focus:Ich bin neun Jahre alt.]]'],[
   group('Das bin ich',[...['Mein Vorname oder ein erfundener Name','Mein Alter','Mein Wohnort','Mein Hobby','Meine Lieblingsfarbe','Mein Lieblingsessen','Zwei Eigenschaften von mir'].map(prompt=>open(prompt,'Deine persönliche Antwort passt hier. Du kannst auch eine Figur erfinden.',1))],{layout:'compact',instructions:'Fülle deinen Steckbrief aus. Zeichne dich anschließend auf einem Blatt Papier.'}),
   pairs('Welche Antwort passt zur Frage?',[['Wie heißt du?','Ich heiße Sami.'],['Wie alt bist du?','Ich bin acht Jahre alt.'],['Wo wohnst du?','Ich wohne in Essen.'],['Was machst du gern?','Ich fahre gern Roller.'],['Welche Farbe magst du?','Ich mag Grün.'],['Wie bist du?','Ich bin neugierig und freundlich.']]),
   group('Stell dich vor',[open('Schreibe vier ganze Sätze über dich. Lies sie einem anderen Kind vor.','Zum Beispiel: Ich heiße Sami. Ich bin acht Jahre alt. Ich wohne in Essen. Ich fahre gern Roller.',5)])
  ],{scene:'welcome'}),
  unit('noras-geschichte','Lesen: Nora findet Anschluss','Lies Noras Geschichte in Ruhe. Alle Antworten findest du im Text.',[
   'Lies zuerst den ganzen Text. Suche danach Namen, Zahlen und wichtige Tätigkeiten.','Bei einer falschen Aussage kannst du die richtige Information im Text zeigen.','Schreibe offene Antworten in ganzen Sätzen. Eine passende Formulierung kann anders aussehen als die Musterantwort.'
  ],['Nora ist [[focus:neun]] Jahre alt. → Wie alt ist Nora? Nora ist neun Jahre alt.'],[
   group('Noras Geschichte',[],{kind:'reading',paragraphs:welcomeText}),
   group('Richtig oder falsch?',[
    tf('Nora wohnt in Duisburg.',true,'Im ersten Abschnitt nennt Nora Duisburg als Wohnort.'),tf('Jule ist Noras kleine Schwester.',false,'Jule ist zwölf, Nora neun. Jule ist also älter.'),tf('Nora liest gern Tiergeschichten.',true,'Das steht am Anfang des zweiten Abschnitts.'),tf('Jule spielt gern Basketball.',true,'Jule fährt Roller und spielt Basketball.'),tf('Die Familie baut am Sonntag ein Vogelhaus.',false,'Sie baut es am Samstag.'),tf('Nora malt das Dach blau.',true,'Nora übernimmt das Anmalen des Daches.'),tf('Emil ist zehn Jahre alt.',false,'Emil ist acht Jahre alt.'),tf('Noras Lieblingsfarbe ist Grün.',true,'Das erzählt Nora im letzten Abschnitt.')
   ]),
   group('Wähle die passende Antwort',[
    choice('Wer hilft mit dem Werkzeug?','Noras Vater',['Emils Oma','Jules Lehrerin'],'Im zweiten Abschnitt hilft der Vater.'),choice('Wie fühlt Nora sich zuerst?','ein wenig schüchtern',['sehr wütend','schon müde'],'Nora beschreibt sich zuerst als ein wenig schüchtern.'),choice('Was wünscht Nora sich zu essen?','Nudeln mit Tomatensoße',['Reis mit Erbsen','Brot mit Honig'],'Ihr Essenswunsch steht im letzten Satz.')
   ]),group('Antworte in ganzen Sätzen',[
    open('Mit wem wohnt Nora zusammen?','Nora wohnt mit ihrem Vater und ihrer Schwester zusammen.'),open('Was macht Nora gern? Nenne zwei Hobbys.','Nora liest gern Tiergeschichten und bastelt Figuren aus Papier.'),open('Was machen Nora und Jule gemeinsam?','Sie bauen am Samstag gemeinsam ein Vogelhaus.'),open('Wie hilft Emil Nora, in der Gruppe anzukommen?','Er fragt, ob sie zusammen malen wollen.')
   ])
  ],{scene:'welcome'}),
  unit('hobbyverben','Hobbys: Wer macht was?','Das Verb verändert sich mit der Person. Bei lesen und fahren verändert sich auch ein Vokal.',[
   'Regelmäßig: ich [[verb:spiele]], du [[verb:spielst]], er oder sie [[verb:spielt]].','Bei lesen heißt es: ich lese, du [[verb:liest]], er oder sie [[verb:liest]]. Bei fahren: ich fahre, du [[verb:fährst]], er oder sie [[verb:fährt]].','Bei basteln ist [[focus:ich bastle]] häufig. [[focus:Ich bastele]] ist ebenfalls richtig.'
  ],['Ich [[verb:lese]] ein Tierbuch. Du [[verb:liest]] eine Geschichte.','Nora [[verb:fährt]] Roller. Wir [[verb:fahren]] gemeinsam.'],[
   group('Ergänze die Verbformen',[
    ...[['spielen','spiele','spielst','spielt'],['zeichnen','zeichne','zeichnest','zeichnet'],['tanzen','tanze','tanzt','tanzt'],['singen','singe','singst','singt'],['basteln','bastle','bastelst','bastelt'],['schwimmen','schwimme','schwimmst','schwimmt'],['lesen','lese','liest','liest'],['fahren','fahre','fährst','fährt']].flatMap(([v,...forms])=>forms.map((f,i)=>fill(`${v}: ${['ich','du','er / sie'][i]} …`,f,`${v}: ${['ich','du','er oder sie'][i]} ${f}.`,{caseSensitive:false,...(v==='basteln'&&i===0?{accepted:['bastele']}: {})})))
   ],{layout:'compact'}),
   group('Das passende Verb im Satz',[
    fill('Sami … mit einem blauen Stift. (zeichnen)','zeichnet','Sami ist eine Person: er zeichnet.',{caseSensitive:false}),fill('Ich … ein Boot aus Papier. (basteln)','bastle','Zu ich passt bastle oder bastele.',{accepted:['bastele'],caseSensitive:false}),fill('Du … eine lustige Geschichte. (lesen)','liest','Bei du verändert sich lesen zu liest.',{caseSensitive:false}),fill('Wir … im Schwimmbad. (schwimmen)','schwimmen','Bei wir lautet die Form schwimmen.',{caseSensitive:false}),fill('Jule … mit dem Roller. (fahren)','fährt','Bei er oder sie steht fährt mit ä.',{caseSensitive:false}),fill('Ihr … ein Lied. (singen)','singt','Zu ihr passt singt.',{caseSensitive:false}),fill('Emil und Nora … zusammen. (spielen)','spielen','Emil und Nora sind mehrere Personen: sie spielen.',{caseSensitive:false}),fill('Du … zur Musik. (tanzen)','tanzt','Nach dem z in tanz- kommt bei du nur t: du tanzt.',{caseSensitive:false})
   ]),group('Deine Hobbys',[open('Schreibe drei Sätze: Was machst du gern?','Zum Beispiel: Ich lese gern. Ich baue gern. Ich singe gern.'),open('Frage ein anderes Kind nach zwei Hobbys und schreibe darüber.','Zum Beispiel: Mila malt gern. Sie spielt auch gern Basketball.')])
  ]),
  unit('eigenschaften','Eigenschaften und Gegenteile','Adjektive beschreiben, wie jemand oder etwas ist. Ein Mensch kann ganz verschiedene Eigenschaften haben.',[
   'Gegenteile stehen sich in ihrer Bedeutung gegenüber: [[adjective:groß]] und [[adjective:klein]].','Mit [[focus:und]] verbindest du passende Informationen. [[focus:Aber]] zeigt einen Unterschied.','Ein Aussagesatz beginnt groß und endet mit einem Punkt. Das Verb steht normalerweise an der zweiten Stelle.'
  ],['Emil ist [[adjective:ruhig]] und [[adjective:hilfsbereit]].','Ich spreche manchmal leise, [[focus:aber]] beim Singen bin ich laut.'],[
   pairs('Finde das Gegenteil',[['laut','leise'],['groß','klein'],['schnell','langsam'],['fröhlich','traurig'],['warm','kalt'],['mutig','ängstlich'],['freundlich','unfreundlich'],['stark','schwach']]),
   group('Ordne die Wörter. Beachte den vorgegebenen Satzanfang',[
    order('Beginne mit „Ich“:',['Ich','bin','neugierig.'],'Ich steht zuerst, bin an zweiter Stelle.'),order('Beginne mit „Nora“:',['Nora','ist','sehr','freundlich.'],'Nora ist sehr freundlich.'),order('Beginne mit „Wir“:',['Wir','sind','heute','fröhlich.'],'Das Verb sind steht nach Wir.'),order('Eine Frage beginnt hier mit „Bist“:',['Bist','du','sportlich?'],'In dieser Ja-Nein-Frage steht das Verb zuerst.')
   ]),group('Beschreibe dich und eine Figur',[open('Schreibe einen Satz mit „und“ und einen Satz mit „aber“.','Ich bin freundlich und neugierig. Ich bin ruhig, aber beim Spielen lache ich laut.'),open('Erfinde eine Figur. Beschreibe zwei ihrer Eigenschaften.','Meine Figur heißt Timo. Er ist mutig und hilfsbereit.')])
  ]),
  unit('unsere-gruppe','Fragen, helfen und zusammen lernen','In einer Gruppe hören wir zu, helfen freundlich und fragen nach, wenn etwas unklar ist.',[
   'Bei trennbaren Verben steht ein Teil am Satzende: Wir hören [[focus:zu]]. Wir räumen [[focus:auf]].','Mit [[focus:bitte]] und einer freundlichen Frage kannst du um Hilfe bitten.','Notiere im Interview nur Antworten, die das andere Kind mitteilen möchte. Eine erfundene Figur ist auch möglich.'
  ],['Entschuldigung, kannst du das [[focus:bitte langsam wiederholen]]?','Wir [[verb:helfen]] einander.'],[
   group('Unsere Gruppenregeln',[
    fill('Wir … uns, bevor wir sprechen. (melden)','melden','Wir melden uns.',{caseSensitive:false}),fill('Wir … einander zu. (hören)','hören','Wir hören zu. Zu steht am Ende.',{caseSensitive:false}),fill('Wir … anderen Kindern. (helfen)','helfen','Wir helfen anderen Kindern.',{caseSensitive:false}),fill('Wir … freundlich miteinander. (sprechen)','sprechen','Wir sprechen freundlich miteinander.',{caseSensitive:false}),fill('Wir … nach dem Basteln auf. (räumen)','räumen','Das Verb heißt aufräumen: Wir räumen auf.',{caseSensitive:false}),fill('Wir … gemeinsam neue Wörter. (lernen)','lernen','Wir lernen gemeinsam.',{caseSensitive:false})
   ],{wordBank:['lernen','sprechen','räumen','melden','helfen','hören']}),
   pairs('Was kannst du in der Situation sagen?',[
    ['Ein Wort ist neu für dich.','Was bedeutet dieses Wort?'],['Du brauchst Hilfe beim Lesen.','Kannst du mir bitte beim Lesen helfen?'],['Die Erklärung ist zu schnell.','Bitte sprich etwas langsamer.'],['Du hast den letzten Satz nicht gehört.','Kannst du den letzten Satz bitte wiederholen?'],['Du möchtest etwas fragen.','Darf ich eine Frage stellen?']
   ]),group('Partnerinterview',[
    ...[1,2,3].map(i=>open(`Interview ${i}: Wie heißt das Kind? Was macht es gern? Wie beschreibt es sich?`,'Notiere Name oder Fantasiename, ein Hobby und eine selbst genannte Eigenschaft. Andere Antworten sind möglich.',3)),open('Schreibe anschließend drei Sätze über ein Kind oder eine erfundene Figur.','Zum Beispiel: Toni ist neun. Toni tanzt gern. Toni ist freundlich.',4)
   ])
  ]),
  unit('raetsel-tag1','Spiel und Lerntagebuch: Gemeinsam starten','Wiederhole Wörter aus unserem ersten Thementag.',[
   'Lies das gesuchte Wort zuerst ganz. Suche dann seinen Anfang im Gitter.','Im Worträtsel steht genau ein Buchstabe in jedem Kästchen. Umlaute bleiben dort ein Buchstabe.','Beim Lösungswort helfen dir die markierten Kästchen.'
  ],['Im Gitter wird [[focus:FÜHLEN]] als [[focus:FUEHLEN]] geschrieben. Im normalen Text bleibt das ü.'],[
   search(['MALEN','LESEN','TANZEN','BASTELN','SINGEN','SPIELEN','ROLLER','FREUND','MUTIG','LACHEN']),
   riddle('FREUNDE',[
    ['Das Gegenteil von traurig; vier Buchstaben.','FROH',1],['Wer gern Neues entdeckt, ist …','NEUGIERIG',7],['Das Gegenteil von laut.','LEISE',2],['Wer sich etwas traut, ist …','MUTIG',2],['Mit der Stimme ein Lied machen.','SINGEN',3],['Eine Person, mit der du gern spielst.','FREUND',6],['Du benutzt Augen und ein Buch zum …','LESEN',2]
   ]),diary()
  ])
 ]},
 {day:2,title:'Zeit und Herbst entdecken',subtitle:'Wochentage, Monate, Uhrzeiten und mein Tagesablauf',icon:'clock',goals:['Ich kann Tage und Monate ordnen.','Ich kann Uhrzeiten lesen.','Ich kann meinen Tagesablauf und den Herbst beschreiben.'],units:[
  unit('wochentage','Gestern, heute und morgen','Eine Woche hat sieben Tage. Nach dem Sonntag beginnt die nächste Woche wieder mit Montag.',[
   'Die Reihenfolge lautet: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.','[[focus:Gestern]] liegt einen Tag vor heute. [[focus:Morgen]] liegt einen Tag nach heute.','Wochentage sind Nomen: Du schreibst sie groß. In [[focus:am Montag]] steckt die Verbindung an dem.'
  ],['Heute ist Donnerstag. Gestern war Mittwoch. Morgen ist Freitag.'],[
   group('Bringe die Woche in Ordnung',[order('Beginne mit Montag.',['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'],'Nach Sonntag beginnt eine neue Woche mit Montag.')]),
   group('Buchstabensalat: Finde den Wochentag',[
    ...[['T N A G O M','Montag'],['S T A D I E N G','Dienstag'],['W O T M I C T H','Mittwoch'],['R E I F T A G','Freitag'],['G S A M S T A','Samstag'],['N O S T A N G','Sonntag']].map(([letters,answer])=>fill(letters,answer,`Die Buchstaben bilden ${answer}.`,{letters:letters.split(' ')}))
   ]),group('Ergänze den Nachbartag',[
    fill('Heute ist Dienstag. Gestern war …','Montag','Montag liegt direkt vor Dienstag.'),fill('Heute ist Freitag. Morgen ist …','Samstag','Samstag folgt auf Freitag.'),fill('Gestern war Sonntag. Heute ist …','Montag','Nach Sonntag beginnt die Woche mit Montag.'),fill('Morgen ist Mittwoch. Heute ist …','Dienstag','Dienstag liegt direkt vor Mittwoch.'),fill('Heute ist Sonntag. Morgen ist …','Montag','Der Übergang zur nächsten Woche zählt mit.'),fill('Heute ist Montag. Gestern war …','Sonntag','Der Sonntag liegt vor dem Montag.')
   ]),group('Deine Woche',[open('An welchen Tagen lernst du? Was machst du an einem freien Tag?','Zum Beispiel: Von Montag bis Freitag gehe ich zur Schule. Am Samstag besuche ich den Spielplatz.'),open('Welcher Wochentag gefällt dir besonders? Begründe mit „weil“.','Ich mag Samstag, weil ich dann Zeit zum Spielen habe.')])
  ]),
  unit('monate','Monate und Jahreszeiten','Zwölf Monate bilden ein Jahr. Wir ordnen die Monate nach der Einteilung der Wetterkunde.',[
   'Frühling: März, April, Mai. Sommer: Juni, Juli, August.','Herbst: September, Oktober, November. Winter: Dezember, Januar, Februar.','Nach Dezember folgt Januar im neuen Jahr. Die Einteilung nach Monaten ist nicht genau dasselbe wie der astronomische Jahreszeitenbeginn.'
  ],['[[focus:Oktober]] gehört in unserer Monatstabelle zum [[focus:Herbst]].'],[
   group('Ordne jeden Monat einer Jahreszeit zu',[
    ...[['Januar','Winter'],['Februar','Winter'],['März','Frühling'],['April','Frühling'],['Mai','Frühling'],['Juni','Sommer'],['Juli','Sommer'],['August','Sommer'],['September','Herbst'],['Oktober','Herbst'],['November','Herbst'],['Dezember','Winter']].map(([m,s])=>choice(m,s,['Frühling','Sommer','Herbst','Winter'].filter(x=>x!==s),`${m} gehört nach unserer Monatseinteilung zum ${s}.`,{select:true}))
   ],{layout:'compact',diagram:{kind:'seasons'}}),
   group('Davor oder danach?',[
    fill('Welcher Monat kommt vor März?','Februar','Die ersten Monate heißen Januar, Februar, März.'),fill('Welcher Monat kommt nach Mai?','Juni','Auf Mai folgt Juni.'),fill('Welcher Monat kommt vor September?','August','August liegt zwischen Juli und September.'),fill('Welcher Monat kommt nach November?','Dezember','Dezember ist der letzte Monat des Jahres.'),fill('Welcher Monat kommt nach Dezember?','Januar','Nach Dezember beginnt ein neues Jahr.'),fill('Welcher Monat kommt vor Januar?','Dezember','Gemeint ist Dezember im vorherigen Jahr.')
   ]),group('Ein kleiner Geburtstagskalender',[open('Frage zwei Kinder nach ihrem Geburtstagsmonat, wenn sie ihn nennen möchten. Notiere Monat und Jahreszeit.','Zum Beispiel: Alex – April – Frühling. Sam – Dezember – Winter. Du kannst auch Geburtstage erfinden.'),open('Welche Jahreszeit magst du? Was kannst du dann machen?','Ich mag den Herbst, weil ich bunte Blätter sammeln kann.')])
  ]),
  unit('uhrzeiten','Uhren lesen und Zeiger einstellen','Der kurze Zeiger zeigt die Stunde. Der lange Zeiger zeigt die Minuten.',[
   '[[focus:Viertel nach]] heißt: 15 Minuten nach einer vollen Stunde. [[focus:Viertel vor]] heißt: 15 Minuten vor der nächsten Stunde.','[[focus:Halb neun]] bedeutet 8:30 Uhr: Die neunte Stunde ist erst halb erreicht. Der kurze Zeiger steht zwischen 8 und 9.','Eine Zeigeruhr unterscheidet nicht zwischen Morgen und Abend. Hier üben wir Uhrzeiten von 1 bis 12.'
  ],['8:15 Uhr = Viertel nach acht. 8:30 Uhr = halb neun. 8:45 Uhr = Viertel vor neun.'],[
   group('Lies die acht Uhren',[
    ...[[6,0,'sechs Uhr'],[9,30,'halb zehn'],[2,15,'Viertel nach zwei'],[10,45,'Viertel vor elf'],[12,0,'zwölf Uhr'],[4,30,'halb fünf'],[7,15,'Viertel nach sieben'],[1,45,'Viertel vor zwei']].map(([h,m,words],i)=>fill(`Uhr ${i+1}: Schreibe die Uhrzeit mit Zahlen (zum Beispiel 8:15).`,`${h}:${String(m).padStart(2,'0')}`,`Uhr ${i+1} zeigt ${words}.`,{format:'time',caseSensitive:false}))
   ],{diagram:{kind:'clocks',clocks:[[6,0],[9,30],[2,15],[10,45],[12,0],[4,30],[7,15],[1,45]]},layout:'compact'}),
   group('Stelle die Zeiger ein',[
    ...[[8,0,'acht Uhr'],[9,30,'halb zehn'],[5,15,'Viertel nach fünf'],[11,45,'Viertel vor zwölf']].map(([h,m,words])=>({type:'clock',prompt:`Stelle die Uhr auf ${words}.`,correct:`${h}:${String(m).padStart(2,'0')}`,explanation:`${words} ist ${h}:${String(m).padStart(2,'0')} Uhr.`}))
   ],{layout:'compact'}),
   group('Von Worten zu Zahlen',[
    ...[['halb vier','3:30'],['Viertel nach elf','11:15'],['Viertel vor acht','7:45'],['halb eins','12:30']].map(([w,t])=>fill(`${w}: Wie lautet die Uhrzeit mit Zahlen?`,t,`${w} = ${t} Uhr.`,{format:'time',caseSensitive:false}))
   ]),group('Deine Zeiten',[open('Wann stehst du an einem freien Tag auf? Schreibe einen Satz.','Zum Beispiel: An einem freien Tag stehe ich um acht Uhr auf.'),open('Wann isst du zu Mittag? Wann gehst du ins Bett?','Zum Beispiel: Ich esse um zwölf Uhr zu Mittag. Um acht Uhr gehe ich ins Bett.')])
  ]),
  unit('emils-ferientag','Lesen: Emils Ferientag','Achte beim Lesen darauf, welche Tätigkeit zu welcher Uhrzeit gehört.',[
   'Unterstreiche gedanklich zuerst die Uhrzeiten. Suche dann das passende Verb.','Bei um zwölf endet nicht der ganze Tag, sondern nur der Ferienkurs.','Morgens, danach, am Nachmittag und vor dem Schlafen helfen dir beim Ordnen.'
  ],['Um halb neun [[verb:geht]] Emil los. Der Kurs [[verb:beginnt]] um neun Uhr. Das sind verschiedene Zeitpunkte.'],[
   group('Emils Ferientag',[],{kind:'reading',paragraphs:dayText}),
   group('Wann macht Emil das?',[
    ...[['Wann klingelt sein Wecker?','7:00'],['Wann frühstückt er?','7:15'],['Wann geht er zum Kurs los?','8:30'],['Wann beginnt die Pause?','10:15'],['Wann isst er mit Oma zu Mittag?','12:30'],['Wann macht er das Licht aus?','8:00']].map(([p,t])=>fill(`${p} Schreibe die Zeigeruhrzeit (1–12).`,t,`Im Text steht ${t==='8:00'?'acht Uhr am Abend':t+' Uhr'}.`,{format:'time',caseSensitive:false}))
   ]),group('Lies genau',[
    choice('Was isst Emil zum Frühstück?','Haferflocken mit einer Birne',['Brot mit Marmelade','Nudeln mit Käse'],'Das steht im ersten Abschnitt.'),choice('Mit wem geht Emil zum Kurs?','mit seiner Oma',['mit Jule','mit seinem Vater'],'Oma begleitet Emil.'),choice('Wann endet der Kurs?','um zwölf Uhr',['um zehn Uhr','um halb eins'],'Um halb eins isst Emil schon zu Mittag.'),choice('Was macht Emil vor dem Schlafen?','Er liest zehn Minuten.',['Er spielt Basketball.','Er geht zum Kurs.'],'Seine letzte Tätigkeit vor dem Lichtausmachen ist Lesen.')
   ]),group('Erzähle und ordne',[
    order('Ordne Emils Tag vom Morgen bis zum Abend.',['frühstücken','zum Kurs gehen','zu Mittag essen','Nora auf dem Spielplatz treffen','vor dem Schlafen lesen'],'Frühstück und Kurs sind am Morgen, der Spielplatz am Nachmittag, Lesen am Abend.'),open('Was machen die Kinder im Ferienkurs?','Sie lesen eine Geschichte und basteln ein kleines Heft.'),open('Beschreibe deinen eigenen freien Tag in vier Sätzen.','Zum Beispiel: Morgens frühstücke ich. Danach gehe ich nach draußen. Am Nachmittag spiele ich. Abends lese ich.',5)
   ])
  ],{scene:'clock'}),
  unit('herbst-im-park','Lesen und Schreiben: Ein Tag im Herbst','Wir beobachten den Herbst und planen eine kleine Herbstwoche.',[
   'Ein Sachtext oder Erlebnistext enthält genaue Informationen. Schau für jede Antwort noch einmal nach.','Wörter wie [[noun:Blatt]], [[noun:Kastanie]], [[noun:Wind]] und [[noun:Regenjacke]] helfen beim Beschreiben.','Ein Wochenplan ist ein Vorschlag. Du kannst ihn ändern und an das Wetter anpassen.'
  ],['Am Dienstag [[verb:sammle]] ich Blätter. Bei Regen [[verb:bleibe]] ich drinnen und bastle.'],[
   group('Unser Ausflug in den Park',[],{kind:'reading',paragraphs:autumnText}),
   group('Richtig oder falsch?',[
    tf('Die Gruppe ist im Oktober im Park.',true,'Der erste Satz nennt Oktober.'),tf('Alle Blätter im Park sind blau.',false,'Im Text liegen gelbe und rote Blätter am Boden.'),tf('Sami findet eine Kastanie.',true,'Er steckt sie in seinen Stoffbeutel.'),tf('Die Kinder jagen die Enten.',false,'Sie bleiben auf dem Weg und lassen die Tiere in Ruhe.'),tf('Bei Regen warten sie unter einem Dach.',true,'Sie warten den Schauer ab.'),tf('Die Blätter werden zwischen Zeitungspapier gelegt.',true,'Das machen sie nach dem Ausflug.')
   ]),group('Ergänze Wörter aus dem Text',[
    fill('Ein … wirbelt Blätter durch die Luft.','Windstoß','Ein Windstoß bewegt die Blätter.'),fill('Sami trägt die Kastanie in einem … .','Stoffbeutel','Er benutzt einen Stoffbeutel.'),fill('Am … beobachten wir Enten.','Teich','Die Enten sind am Teich.'),fill('Unsere … schützen uns vor Regen.','Regenjacken','Die Kinder haben Regenjacken dabei.'),fill('Zwischen … trocknen die Blätter.','Zeitungspapier','Die Gruppe legt die Blätter zwischen Zeitungspapier.'),fill('Zum Herbst gehört nach unserer Monatseinteilung auch der … .','November','Herbstmonate sind September, Oktober und November.')
   ],{wordBank:['Teich','November','Stoffbeutel','Windstoß','Zeitungspapier','Regenjacken']}),
   group('Plane deine Herbstwoche',[...['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'].map(d=>open(`${d}: Was möchtest du machen?`,'Notiere einen eigenen Plan, zum Beispiel: im Park Blätter sammeln.',1))],{layout:'compact'}),
   group('Schreibe über den Herbst',[open('Was nimmst du an einem regnerischen Tag mit? Nenne zwei Dinge.','Zum Beispiel: Ich nehme eine Regenjacke und einen Schirm mit.'),open('Schreibe drei Sätze über deine Herbstwoche.','Zum Beispiel: Am Montag bastle ich. Am Mittwoch lese ich ein Buch. Am Samstag gehe ich in den Park.',4)])
  ],{scene:'autumn'}),
  unit('raetsel-tag2','Spiel und Lerntagebuch: Unsere Zeitwörter','Wiederhole Wörter rund um Woche, Jahr und Herbst.',[
   'Bei Buchstabengittern kann ein Wort waagerecht oder senkrecht stehen.','Überprüfe bei jedem Rätsel die Wortlänge.','Die markierten Buchstaben verraten dir ein passendes Jahreszeitenwort.'
  ],['Das normale Wort heißt [[focus:Frühling]]. Nur im Gitter steht [[focus:FRUEHLING]].'],[
   search(['MORGEN','ABEND','UHR','HERBST','WINTER','SOMMER','MONTAG','OKTOBER','WOCHE','MITTAG']),
   riddle('HERBST',[
    ['Die Jahreszeit nach dem Sommer.','HERBST',1],['Sie fallen im Herbst vom Baum.','BLÄTTER',6],['Wasser, das aus Wolken fällt.','REGEN',1],['Die Tageszeit nach dem Nachmittag.','ABEND',2],['Der Tag zwischen Freitag und Sonntag.','SAMSTAG',1],['Der Monat nach September.','OKTOBER',3]
   ]),diary()
  ])
 ]}
];

export const shopPrices=[['1 kg Äpfel',240,'🍎'],['1 Brot',260,'🍞'],['1 Liter Milch',120,'🥛'],['1 Packung Reis',180,'🍚'],['1 Gurke',90,'🥒'],['1 Joghurt',60,'🥣'],['1 Flasche Wasser',80,'💧'],['4 Brötchen',160,'🥖']];
export const euro=cents=>(cents/100).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const gardenText=[
 'Unsere Feriengruppe besucht einen kleinen Gemeinschaftsgarten. Frau Weber zeigt uns zuerst das Beet mit den Karotten. Vorsichtig lockert sie die Erde. Unter den grünen Blättern entdecken wir orange Wurzeln. Kartoffeln wachsen ebenfalls unter der Erde, aber sie sind Knollen.',
 'Neben dem Beet stehen Kürbispflanzen. Ihre großen Früchte liegen auf dem Boden. Die Gurkenpflanzen wachsen an einer Rankhilfe nach oben. Sami pflückt mit Frau Webers Erlaubnis eine Gurke. Nora sammelt drei reife Birnen unter einem Baum. Emil trägt den leeren Korb herbei.',
 'Am Gartentisch waschen wir zuerst unsere Hände und danach das geerntete Gemüse. Frau Weber schneidet die Gurke in Scheiben. Die Gruppe probiert gemeinsam. Zum Schluss schreiben wir Schilder für die Beete. Auf Noras Schild steht: „Hier wachsen Karotten.“'
];
autumnDays.push({day:3,title:'Essen, ernten und einkaufen',subtitle:'Lebensmittel, Artikel, höfliche Gespräche und Preise',icon:'garden',goals:['Ich kann Lebensmittel zuordnen.','Ich kann höflich einkaufen.','Ich kann Preise verstehen und Wechselgeld berechnen.'],units:[
 unit('lebensmittel','Lebensmittel ordnen','Obst, Gemüse und andere Lebensmittel begegnen uns im Garten und im Laden.',[
  'Wir ordnen hier nach Verwendung in der Küche: Tomaten und Gurken zählen dabei zum Gemüse.','Milch ist auch ein Getränk. In dieser Aufgabe ordnen wir sie zu den [[focus:Milchprodukten]], damit jede Karte genau einen Platz hat.','Eine Einkaufsliste nennt Dinge und Mengen. Du musst keine persönlichen Essgewohnheiten nennen.'
 ],['Die Birne gehört zum [[focus:Obst]]. Reis gehört zu [[focus:Brot und Getreide]].'],[
  group('Wähle für jedes Lebensmittel die passende Gruppe',[
   ...[['Obst',['Apfel','Birne','Banane','Traube']],['Gemüse',['Karotte','Tomate','Gurke','Kartoffel']],['Milchprodukte',['Milch','Käse','Joghurt','Quark']],['Brot und Getreide',['Brot','Reis','Haferflocken','Nudeln']],['Getränke',['Wasser','Tee','Saft','Apfelschorle']],['Gewürze',['Salz','Pfeffer','Zimt','Paprikapulver']]].flatMap(([category,words])=>words.map(word=>choice(word,category,['Obst','Gemüse','Milchprodukte','Brot und Getreide','Getränke','Gewürze'].filter(c=>c!==category),`${word} gehört in dieser Küchen-Einteilung zu ${category}.`,{select:true})))
  ],{layout:'compact',arts:[{name:'🍎',label:'der Apfel'},{name:'🥒',label:'die Gurke'},{name:'🍞',label:'das Brot'}]}),
  group('Welches Wort passt nicht zur genannten Gruppe?',[
   choice('Obst: Birne – Apfel – Gurke – Banane','Gurke',['Birne','Apfel','Banane'],'Die Gurke wird in der Küche zum Gemüse gezählt.'),choice('Milchprodukte: Quark – Joghurt – Reis – Käse','Reis',['Quark','Joghurt','Käse'],'Reis ist Getreide.'),choice('Getränke: Wasser – Tee – Karotte – Saft','Karotte',['Wasser','Tee','Saft'],'Die Karotte ist Gemüse.'),choice('Gewürze: Zimt – Salz – Brot – Pfeffer','Brot',['Zimt','Salz','Pfeffer'],'Brot ist kein Gewürz.'),choice('Gemüse: Kartoffel – Zwiebel – Traube – Tomate','Traube',['Kartoffel','Zwiebel','Tomate'],'Die Traube ist Obst.'),choice('Brot und Getreide: Nudeln – Brot – Haferflocken – Butter','Butter',['Nudeln','Brot','Haferflocken'],'Butter ist ein Milchprodukt.')
  ]),group('Über Essen sprechen',[open('Plane ein kleines Picknick. Nenne zwei Speisen und ein Getränk.','Zum Beispiel: Für das Picknick nehme ich Brot, Gurken und Wasser mit.'),open('Was möchtest du gern probieren? Schreibe einen Satz.','Zum Beispiel: Ich möchte eine Birne probieren.')])
 ]),
 unit('artikel-mehrzahl','Ein Apfel, zwei Äpfel','Lerne ein Nomen mit seinem Artikel. Oft verändert sich in der Mehrzahl auch das Wort.',[
  'In der Einzahl heißen die bestimmten Artikel [[article:der]], [[article:die]] und [[article:das]]. In der Mehrzahl heißt der bestimmte Artikel immer die.','Nach kaufen, nehmen oder essen steht das gekaufte oder gegessene Ding häufig im Akkusativ: ein Apfel → [[accusative:einen Apfel]].','Bei Käse spricht man im Alltag oft von einem Stück Käse oder mehreren Käsesorten. Ein Plural ist also nicht grundsätzlich unmöglich. Bei Joghurt sind der und regional auch das richtig.'
 ],['[[article:Der]] Apfel – zwei [[noun:Äpfel]]. Ich kaufe [[accusative:einen Apfel]].','[[article:Das]] Brötchen – zwei [[noun:Brötchen]]. Ich nehme [[accusative:ein Brötchen]].'],[
  group('Schreibe den bestimmten Artikel',[
   ...[['Apfel','der'],['Banane','die'],['Ei','das'],['Gurke','die'],['Kartoffel','die'],['Brot','das'],['Brötchen','das'],['Saft','der'],['Tomate','die'],['Joghurt','der']].map(([w,a])=>fill(`… ${w}`,a,w==='Joghurt'?'Der Joghurt ist verbreitet; regional ist auch das Joghurt richtig.':`${a} ${w}`,{caseSensitive:false,...(w==='Joghurt'?{accepted:['das']}: {})}))
  ],{layout:'compact'}),
  group('Wie heißen zwei davon? Schreibe nur das Nomen',[
   ...[['Apfel','Äpfel'],['Banane','Bananen'],['Ei','Eier'],['Gurke','Gurken'],['Kartoffel','Kartoffeln'],['Brot','Brote'],['Brötchen','Brötchen'],['Saft','Säfte'],['Tomate','Tomaten'],['Joghurt','Joghurts']].map(([w,p])=>fill(`Einzahl: ${w}. Mehrzahl: zwei …`,p,`${w} → ${p}${w==='Joghurt'?' (auch: Joghurte)':''}.`,w==='Joghurt'?{accepted:['Joghurte']}:{}))
  ],{layout:'compact'}),
  group('Ein, eine oder einen?',[
   ...[['Ich kaufe … Apfel.','einen'],['Nora möchte … Birne.','eine'],['Wir nehmen … Brot.','ein'],['Emil isst … Ei.','ein'],['Sami kauft … Saft.','einen'],['Ich brauche … Tomate.','eine']].map(([s,a])=>choice(s,a,['ein','eine','einen'].filter(x=>x!==a),'Als Objekt nach diesem Verb: der → einen, die → eine, das → ein.'))
  ]),group('Mein Einkaufszettel',[open('Schreibe sechs Dinge mit einer Menge auf deinen Einkaufszettel.','Zum Beispiel: 2 Äpfel, 1 Brot, 3 Tomaten, 1 Liter Milch, 4 Brötchen, 1 Flasche Wasser.',6)])
 ]),
 unit('im-laden','Im Laden freundlich sprechen','Du kannst nach einem Ort, einem Preis oder einer Ware fragen.',[
  '[[focus:Wo finde ich …?]] fragt nach dem Ort. [[focus:Wie viel kostet …?]] fragt nach dem Preis.','Mit [[focus:Ich hätte gern …]] oder [[focus:Ich möchte bitte …]] sagst du freundlich, was du brauchst.','Ein Gespräch besteht aus aufeinander passenden Beiträgen: Begrüßung, Wunsch, Preis, Bezahlen und Verabschiedung.'
 ],['Entschuldigung, wo finde ich die Haferflocken? – Im Regal neben dem Reis.'],[
  group('Ergänze den Einkaufsdialog',[
   fill('Kind: …, wo finde ich die Milch?','Entschuldigung','Mit Entschuldigung sprichst du jemanden freundlich an.'),fill('Mitarbeiter: Die Milch steht im … neben dem Joghurt.','Regal','Ein Regal bietet Platz für Waren.'),fill('Kind: Wie viel … ein Liter Milch?','kostet','Die Frage heißt: Wie viel kostet ein Liter Milch?',{caseSensitive:false}),fill('Mitarbeiter: Im Übungsladen kostet die Milch einen Euro … . (1,20 €)','zwanzig','1,20 € spricht man hier: ein Euro zwanzig.',{caseSensitive:false}),fill('Kind: Ich … bitte auch eine Gurke.','möchte','Ich möchte bitte ist eine höfliche Formulierung.',{caseSensitive:false}),fill('Mitarbeiter: Die Gurken … bei den Tomaten.','liegen','Mehrere Gurken: sie liegen.',{caseSensitive:false}),fill('Kind: Vielen … für die Hilfe!','Dank','Vielen Dank ist eine feste Wendung.'),fill('Mitarbeiter: Gern. Auf …!','Wiedersehen','Auf Wiedersehen ist ein Abschiedsgruß.')
  ],{wordBank:['möchte','Entschuldigung','Regal','liegen','kostet','zwanzig','Wiedersehen','Dank']}),
  group('Ordne das Gespräch an der Kasse',[order('Bringe diese sechs Beiträge in eine sinnvolle Reihenfolge.',[
   'Kind: Guten Tag! Ich möchte diese Waren bezahlen.','Kasse: Guten Tag! Zusammen kostet das 4 Euro.','Kind: Hier sind 5 Euro.','Kasse: Danke. Du bekommst 1 Euro zurück.','Kind: Danke, auf Wiedersehen!','Kasse: Auf Wiedersehen und einen schönen Tag!'
  ],'Erst kommt der Preis, danach die Bezahlung und dann das Wechselgeld.')]),
  pairs('Was möchtest du mit der Frage erfahren?',[
   ['Wo stehen die Gurken?','den Ort'],['Wie viel kostet das Brot?','den Preis'],['Haben Sie Birnen?','ob eine Ware da ist'],['Woher kommen die Äpfel?','die Herkunft']
  ]),group('Sag es freundlich',[open('Formuliere höflich: „Ich will Reis.“','Ich möchte bitte eine Packung Reis. Auch andere freundliche Formulierungen passen.'),open('Spielt zu zweit einen Einkauf und notiert vier Gesprächsbeiträge.','Kind: Guten Tag, ich hätte gern Brot. Verkäuferin: Gern. Kind: Wie viel kostet es? Verkäuferin: Zwei Euro sechzig.',5)])
 ]),
 unit('preise','Preise lesen und Wechselgeld rechnen','Die Preisliste gehört zu unserem erfundenen Übungsladen. Rechne in Euro und Cent.',[
  '1 Euro sind [[focus:100 Cent]]. 0,90 € sind 90 Cent.','Für mehrere Waren addierst du die Preise. Wechselgeld ist: bezahlter Betrag minus Gesamtpreis.','Achte auf die Menge: Der Brötchenpreis gilt für [[focus:vier Brötchen]], der Apfelpreis für [[focus:ein Kilogramm]].'
 ],['1 Joghurt kostet 0,60 €. Zwei Joghurts kosten 1,20 €.'],[
  group('Die Preise im Übungsladen',[],{table:{caption:'Diese Preise gelten nur für die folgenden Aufgaben.',headers:['Ware und Menge','Preis'],rows:shopPrices.map(([w,c])=>[w,euro(c)])}}),
  group('Lies und rechne',[
   fill('Wie viel kostet eine Gurke? Schreibe den Betrag in Euro.','0,90','Die Gurke kostet 90 Cent, also 0,90 €.',{format:'money',caseSensitive:false}),choice('Was kostet mehr?','das Brot',['die Packung Reis'],'Brot: 2,60 €. Reis: 1,80 €.'),choice('Was ist in dieser Preisliste am günstigsten?','ein Joghurt',['eine Gurke','eine Flasche Wasser'],'0,60 € ist der kleinste Preis der Liste.'),fill('Ein Brot und ein Liter Milch kosten zusammen … Euro.','3,80','2,60 € + 1,20 € = 3,80 €.',{format:'money',caseSensitive:false}),fill('Zwei Joghurts und eine Gurke kosten zusammen … Euro.','2,10','0,60 € + 0,60 € + 0,90 € = 2,10 €.',{format:'money',caseSensitive:false}),fill('Du kaufst 1 kg Äpfel und 1 Packung Reis. Du bezahlst 5 €. Wie viel Euro bekommst du zurück?','0,80','2,40 € + 1,80 € = 4,20 €. 5,00 € − 4,20 € = 0,80 €.',{format:'money',caseSensitive:false}),choice('Du hast 4 €. Reicht das für eine Flasche Wasser, vier Brötchen und einen Liter Milch?','Ja, 0,40 € bleiben übrig.',['Nein, 0,40 € fehlen.','Ja, genau 4 € reichen.'],'0,80 € + 1,60 € + 1,20 € = 3,60 €. Von 4 € bleiben 0,40 €.')
  ]),group('Preise in Worten',[
   fill('Wie sprichst du 2,60 €?','zwei Euro sechzig','Zwei Euro sechzig oder zwei Euro und sechzig Cent.',{accepted:['zwei Euro und sechzig Cent'],caseSensitive:false}),fill('Wie sprichst du 1,20 €?','ein Euro zwanzig','Ein Euro zwanzig oder ein Euro und zwanzig Cent.',{accepted:['ein Euro und zwanzig Cent','einen Euro zwanzig','einen Euro und zwanzig Cent'],caseSensitive:false}),fill('Wie sprichst du 0,90 €?','neunzig Cent','0,90 € sind neunzig Cent.',{caseSensitive:false}),fill('Wie sprichst du 3,45 €?','drei Euro fünfundvierzig','Drei Euro fünfundvierzig.',{accepted:['drei Euro und fünfundvierzig Cent'],caseSensitive:false})
  ]),group('Rechengeschichten',[
   fill('Nora kauft vier Brötchen und einen Liter Milch. Sie bezahlt 5 €. Wie viel Euro bekommt sie zurück?','2,20','1,60 € + 1,20 € = 2,80 €. 5 € − 2,80 € = 2,20 €.',{format:'money',caseSensitive:false}),fill('Sami kauft drei Joghurts. Wie viel Euro zahlt er?','1,80','3 × 0,60 € = 1,80 €.',{format:'money',caseSensitive:false}),fill('Emil hat 10 €. Er kauft 2 kg Äpfel und ein Brot. Wie viel Euro bleiben?','2,60','2 × 2,40 € + 2,60 € = 7,40 €. 10 € − 7,40 € = 2,60 €.',{format:'money',caseSensitive:false})
  ]),group('Dein Einkauf',[open('Stelle einen Einkauf für höchstens 5 € zusammen. Notiere Rechnung und Restgeld.','Zum Beispiel: Brot 2,60 € + Milch 1,20 € = 3,80 €. Von 5 € bleiben 1,20 €. Andere passende Einkäufe sind möglich.',4)])
 ]),
 unit('gemeinschaftsgarten','Lesen: Ernte im Gemeinschaftsgarten','Wir lesen über Pflanzen, Zusammenarbeit und die Ernte.',[
  'Unterscheide: unter der Erde, an einer Pflanze über der Erde und an einem Baum.','Karotten sind Wurzeln, Kartoffeln sind Knollen. Beide wachsen unter der Erde.','Suche im Text nach, bevor du entscheidest, ob eine Aussage richtig oder falsch ist.'
 ],['Die Birne wächst [[place:am Baum]]. Die Kartoffel wächst [[place:unter der Erde]].'],[
  group('Ernte im Gemeinschaftsgarten',[],{kind:'reading',paragraphs:gardenText}),
  group('Richtig oder falsch?',[
   tf('Frau Weber zeigt das Karottenbeet.',true,'Die Gruppe geht zuerst zu diesem Beet.'),tf('Kartoffeln sind Wurzeln wie Karotten.',false,'Der Text unterscheidet Wurzeln und Knollen.'),tf('Die Kürbisse liegen auf dem Boden.',true,'Sie liegen neben den Pflanzen auf dem Boden.'),tf('Sami pflückt heimlich eine Gurke.',false,'Er pflückt sie mit Frau Webers Erlaubnis.'),tf('Nora sammelt drei Birnen.',true,'Drei reife Birnen liegen unter dem Baum.'),tf('Die Kinder essen, bevor sie ihre Hände waschen.',false,'Zuerst waschen sie Hände und Gemüse.')
  ]),group('Was steht im Text?',[
   choice('Wie wachsen die Gurken in diesem Garten?','an einer Rankhilfe nach oben',['unter der Erde','auf einem Baum'],'Die Rankhilfe stützt die Gurkenpflanzen.'),choice('Wer holt den Korb?','Emil',['Nora','Frau Weber'],'Emil bringt den leeren Korb.'),choice('Was schneidet Frau Weber in Scheiben?','die Gurke',['die Birne','die Kartoffel'],'Die Gruppe probiert Gurkenscheiben.'),choice('Was schreiben die Kinder am Ende?','Schilder für die Beete',['Briefe an einen Laden','Fahrkarten'],'Noras Schild nennt die Karotten.')
  ]),group('Wo wächst der essbare Teil?',[
   ...[['Karotte','unter der Erde'],['Kartoffel','unter der Erde'],['Zwiebel','unter der Erde'],['Kürbis','an einer Pflanze über der Erde'],['Gurke','an einer Pflanze über der Erde'],['Tomate','an einer Pflanze über der Erde'],['Birne','am Baum'],['Apfel','am Baum']].map(([w,a])=>choice(w,a,['unter der Erde','an einer Pflanze über der Erde','am Baum'].filter(x=>x!==a),`${w}: Der essbare Teil wächst ${a}.`,{select:true}))
  ]),group('Erzähle vom Garten',[open('Was macht die Gruppe vor dem Essen? Antworte in einem ganzen Satz.','Die Gruppe wäscht zuerst die Hände und dann das geerntete Gemüse.'),open('Erfinde ein Beet und schreibe ein Schild mit zwei Sätzen.','Hier wachsen Tomaten. Bitte vorsichtig gießen!')])
 ],{scene:'garden'}),
 unit('raetsel-tag3','Spiel und Lerntagebuch: Unser kleiner Markt','Rund ums Einkaufen gibt es viele neue Wörter zu entdecken.',[
  'Im Gitter stehen die Wörter ohne Artikel und in Großbuchstaben.','Im Worträtsel bleibt [[focus:Ä]] ein einzelner Buchstabe.','Beim Lösungswort helfen dir die farbigen Felder.'
 ],['Normal: [[focus:Käse]]. Gitter: [[focus:KAESE]].'],[
  search(['APFEL','BROT','MILCH','KÄSE','REIS','TOMATE','BIRNE','WASSER','KASSE','KORB']),
  riddle('MARKT',[
   ['Ein weißes Getränk und ein Milchprodukt.','MILCH',1],['Eine gelbe, gebogene Frucht.','BANANE',2],['Das backt die Bäckerei; vier Buchstaben.','BROT',2],['Ein Milchprodukt, das oft in Scheiben auf Brot liegt.','KÄSE',1],['Ein orangefarbenes Wurzelgemüse; sieben Buchstaben.','KAROTTE',5]
  ]),diary()
 ])
]});

const routeText=[
 'Sami geht am Morgen mit seiner älteren Schwester zur Schule. Beide tragen helle Jacken mit reflektierenden Streifen. Auf dem Gehweg bleiben sie ein Stück vom Fahrbahnrand entfernt. Sami steckt sein Handy in die Tasche, damit er gut auf den Weg achten kann.',
 'An der großen Kreuzung ist die Fußgängerampel rot. Sami und seine Schwester warten. Als das grüne Fußgängersymbol leuchtet, schauen sie nach links, rechts und noch einmal links. Ein abbiegendes Auto hält an. Erst als der Weg frei ist, gehen sie ruhig über die Straße.',
 'An der nächsten Ecke gibt es einen Zebrastreifen. Sie bleiben davor stehen und zeigen, dass sie hinübermöchten. Ein Fahrrad und ein Auto halten an. Sami prüft auch die andere Richtung. Dann gehen beide hinüber. Vor der Schule treffen sie Nora, die mit dem Bus gekommen ist. Gemeinsam gehen sie in die Schule.'
];
export const mapPlaces=[['A','Bäckerei'],['B','Spielplatz'],['C','Bibliothek'],['D','Park'],['E','Schule'],['F','Haltestelle']];
autumnDays.push({day:4,title:'Auf unseren Wegen',subtitle:'Verkehrszeichen verstehen und Wege beschreiben',icon:'traffic',goals:['Ich erkenne wichtige Verkehrszeichen.','Ich kann umsichtiges Verhalten beschreiben.','Ich kann einen einfachen Stadtplan lesen.'],units:[
 unit('verkehrszeichen','Schilder und Fußgängerampeln','Form und Farbe helfen beim Erkennen von Verkehrszeichen. Wir unterscheiden Schilder für Fahrzeuge und Hinweise für Menschen zu Fuß.',[
  'Das achteckige [[focus:STOP]]-Schild und das umgedrehte Dreieck regeln den Fahrzeugverkehr.','Eine Fußgängerampel hat normalerweise [[focus:Rot und Grün]]. Eine gelbe Phase gehört zur üblichen Fahrzeugampel.','Bei Grün vor dem Losgehen prüfen, ob der Weg frei ist. Achte besonders auf abbiegende Fahrzeuge. Bei Rot bleibst du am Rand stehen.'
 ],['Ein blaues rundes Schild mit Fahrrad zeigt einen [[focus:Radweg]].','Rot beim Fußgängersymbol bedeutet: [[focus:stehen bleiben]].'],[
  group('Welche Bedeutung hat das Schild?',[
   ...[['stop','Fahrzeuge müssen hier anhalten.'],['yield','Fahrzeuge müssen anderen die Vorfahrt lassen.'],['crossing','Hier ist ein Fußgängerüberweg.'],['noentry','Fahrzeuge dürfen hier nicht hineinfahren.'],['cycle','Hier ist ein Radweg.'],['walk','Hier ist ein Gehweg.'],['children','Achtung, Kinder können auf die Fahrbahn kommen.'],['bus','Hier ist eine Bushaltestelle.']].map(([sign,a],i)=>choice(`Schild ${i+1}`,a,['stop','yield','crossing','noentry','cycle','walk','children','bus'].map(x=>({stop:'Fahrzeuge müssen hier anhalten.',yield:'Fahrzeuge müssen anderen die Vorfahrt lassen.',crossing:'Hier ist ein Fußgängerüberweg.',noentry:'Fahrzeuge dürfen hier nicht hineinfahren.',cycle:'Hier ist ein Radweg.',walk:'Hier ist ein Gehweg.',children:'Achtung, Kinder können auf die Fahrbahn kommen.',bus:'Hier ist eine Bushaltestelle.'})[x]).filter(x=>x!==a),a,{select:true}))
  ],{diagram:{kind:'signs',signs:['stop','yield','crossing','noentry','cycle','walk','children','bus']}}),
  group('Die Fußgängerampel',[
   choice('Welches Licht bedeutet: Ich bleibe am Fahrbahnrand stehen?','Rot',['Grün','Blau'],'Bei Rot darfst du nicht mit dem Überqueren beginnen.'),choice('Welche zwei Farben hat die übliche Fußgängerampel?','Rot und Grün',['Rot und Gelb','Gelb und Blau'],'Die Fußgängersignale zeigen Rot und Grün.'),choice('Was machst du vor dem Losgehen bei Grün?','Ich schaue und prüfe, ob der Weg frei ist.',['Ich schaue nur auf mein Handy.','Ich renne sofort los.'],'Auch abbiegende Fahrzeuge müssen beachtet werden.'),choice('Was unterscheidet die übliche Fahrzeugampel?','Sie hat auch ein gelbes Licht.',['Sie zeigt nur Blau.','Sie hat keine Farben.'],'Die Fahrzeugampel hat Rot, Gelb und Grün.')
  ],{diagram:{kind:'pedestrian'}}),group('Entdecke deine Umgebung',[open('Beschreibe zwei Schilder, die du kennst. Du darfst einen Weg erfinden.','Zum Beispiel: Ich sehe ein blaues Schild mit einem Fahrrad. Es zeigt einen Radweg.')])
 ]),
 unit('verkehrswoerter','Wörter für unterwegs','Nomen und zusammengesetzte Wörter helfen dir, Wege genauer zu beschreiben.',[
  'Lerne den Artikel mit: [[article:die]] Ampel, [[article:der]] Gehweg, [[article:das]] Fahrrad.','Bei zusammengesetzten Nomen bestimmt der letzte Teil meistens den Artikel: die Straße + die Bahn = [[focus:die Straßenbahn]].','Wir verbinden hier [[focus:Wortbausteine]]. Das sind nicht immer einzelne Sprechsilben.'
 ],['Fuß + gänger = [[noun:Fußgänger]]. Bus + halte + stelle = [[noun:Bushaltestelle]].'],[
  group('Ergänze den Artikel',[
   ...[['Auto','das'],['Bus','der'],['Fahrrad','das'],['Ampel','die'],['Straße','die'],['Zebrastreifen','der'],['Gehweg','der'],['Kreuzung','die'],['Haltestelle','die'],['Helm','der'],['Straßenbahn','die'],['Schild','das']].map(([w,a])=>fill(`… ${w}`,a,`${a} ${w}`,{caseSensitive:false}))
  ],{layout:'compact',arts:[{name:'🚲',label:'das Fahrrad'},{name:'🚌',label:'der Bus'},{name:'🚊',label:'die Straßenbahn'}]}),
  group('Womit sind die Kinder unterwegs?',[
   choice('Nora sitzt im Linienbus. Sie fährt …','mit dem Bus',['mit dem Fahrrad','mit der Straßenbahn'],'Ein Linienbus fährt auf der Straße.'),choice('Sami geht auf dem Gehweg. Er geht …','zu Fuß',['mit dem Auto','mit dem Bus'],'Wer geht, ist zu Fuß unterwegs.'),choice('Jule tritt in die Pedale. Sie fährt …','mit dem Fahrrad',['mit dem Bus','mit der Straßenbahn'],'Ein Fahrrad bewegt man mit Pedalen.'),choice('Emil sitzt bei seinem Vater im Personenwagen. Er fährt …','mit dem Auto',['zu Fuß','mit dem Fahrrad'],'Personenwagen ist ein anderes Wort für Auto.'),choice('Lea sitzt in der Bahn, die auf Schienen durch die Stadt fährt. Sie fährt …','mit der Straßenbahn',['mit dem Fahrrad','mit dem Auto'],'Eine Straßenbahn fährt auf Schienen.')
  ]),group('Setze die Wortbausteine zusammen',[
   ...[['Fahr + rad','Fahrrad'],['Bus + halte + stelle','Bushaltestelle'],['Zebra + streifen','Zebrastreifen'],['Geh + weg','Gehweg'],['Fuß + gänger','Fußgänger'],['Straßen + bahn','Straßenbahn']].map(([p,a])=>fill(p,a,`Zusammen schreibt man ${a}.`))
  ]),group('Beschreibe einen Weg',[open('Wie könnte eine erfundene Figur zum Ferienkurs kommen? Schreibe zwei Sätze.','Emil fährt mit dem Bus. Von der Haltestelle geht er zu Fuß zum Kurs.')])
 ]),
 unit('samis-schulweg','Lesen: Samis aufmerksamer Schulweg','Im Straßenverkehr achten wir auf Menschen, Fahrzeuge und Signale.',[
  'Lies den Text und unterscheide: Was passiert an der Ampel, was am Zebrastreifen?','Ein grünes Licht ersetzt das Umschauen nicht. Am Zebrastreifen prüfen wir, ob die Fahrzeuge wirklich anhalten.','Wir überqueren ruhig und aufmerksam. Die Beschreibungen helfen beim Sprachlernen; übe echte Wege mit einer verlässlichen Begleitperson.'
 ],['Sami [[verb:wartet]], [[verb:schaut]] und [[verb:geht]] erst dann los.'],[
  group('Samis Schulweg',[],{kind:'reading',paragraphs:routeText}),
  group('Richtig oder falsch?',[
   tf('Sami geht mit seiner älteren Schwester.',true,'Sie gehen gemeinsam zu Fuß.'),tf('Beide tragen dunkle Jacken ohne Streifen.',false,'Die Jacken sind hell und haben reflektierende Streifen.'),tf('Sami schaut unterwegs dauernd auf sein Handy.',false,'Er steckt es in die Tasche.'),tf('Bei Rot warten die beiden.',true,'Sie bleiben an der großen Kreuzung stehen.'),tf('Bei Grün rennen sie sofort los.',false,'Sie schauen und warten, bis der Weg frei ist.'),tf('Ein abbiegendes Auto hält an.',true,'Erst dann gehen sie über die Straße.'),tf('Am Zebrastreifen hält nur ein Fahrrad an.',false,'Ein Fahrrad und ein Auto halten an.'),tf('Nora kommt mit dem Bus.',true,'Das steht im letzten Abschnitt.')
  ]),group('Finde die passende Information',[
   choice('Warum steckt Sami das Handy weg?','Damit er auf den Weg achten kann.',['Damit es schneller lädt.','Weil er es verschenken will.'],'Er möchte seine Aufmerksamkeit auf den Weg richten.'),choice('Worauf achten sie bei Grün besonders?','auf ein abbiegendes Auto',['auf einen Ball im Klassenzimmer','auf ein Buch im Regal'],'Das Auto biegt an der Kreuzung ab.'),choice('Wer wartet vor der Schule?','Nora',['Frau Weber','Emils Oma'],'Nora ist schon mit dem Bus angekommen.')
  ]),group('Antworte mit ganzen Sätzen',[
   open('Was tragen Sami und seine Schwester?','Sie tragen helle Jacken mit reflektierenden Streifen.'),open('Was machen sie, bevor sie bei Grün losgehen?','Sie schauen nach links, rechts und noch einmal links und prüfen, ob der Weg frei ist.'),open('Was tun die Fahrzeuge am Zebrastreifen?','Ein Fahrrad und ein Auto halten an.'),open('Nenne eine aufmerksame Handlung aus der Geschichte und erkläre sie.','Sami steckt sein Handy weg, damit er auf den Weg achten kann. Andere passende Handlungen sind möglich.')
  ])
 ],{scene:'traffic'}),
 unit('verkehrsregeln','Umsichtig handeln: dürfen und müssen','Dürfen beschreibt eine Erlaubnis. Nicht dürfen beschreibt ein Verbot. Müssen beschreibt eine Pflicht oder Notwendigkeit.',[
  '[[focus:Ich darf nicht …]] heißt: Es ist verboten. [[focus:Ich muss nicht …]] heißt dagegen: Es ist nicht nötig.','Am STOP-Schild müssen die angesprochenen Fahrzeugführenden anhalten.','Ein Fahrradhelm schützt den Kopf. Wir empfehlen ihn ausdrücklich; eine allgemeine gesetzliche Fahrradhelmpflicht besteht in Deutschland nicht.'
 ],['Bei Rot [[verb:darf]] ich nicht losgehen. Am STOP-Schild [[verb:muss]] das Auto anhalten.'],[
  group('Ist dieses Verhalten umsichtig?',[
   tf('Ich bleibe bei rotem Fußgängersignal stehen.',true,'Bei Rot beginne ich nicht mit dem Überqueren.'),tf('Ich renne zwischen parkenden Autos auf die Fahrbahn.',false,'Dort kann ich Fahrzeuge schlecht sehen und selbst schlecht gesehen werden.'),tf('Vor dem Überqueren schaue ich in beide Richtungen.',true,'Ich prüfe, ob der Weg wirklich frei ist.'),tf('Beim Radfahren trage ich zum Schutz einen Helm.',true,'Ein gut sitzender Helm schützt den Kopf.'),tf('Ich drängle beim Einsteigen in den Bus.',false,'Ich lasse andere aussteigen und steige ruhig ein.'),tf('Ich bleibe am Zebrastreifen aufmerksam.',true,'Ich prüfe, ob Fahrzeuge anhalten.'),tf('Im Dunkeln fahre ich ohne Fahrradlicht.',false,'Beleuchtung macht das Fahrrad sichtbar und den Weg erkennbar.'),tf('An der Haltestelle halte ich Abstand zur Fahrbahn.',true,'Ich warte mit Abstand und gehe erst zum Bus, wenn er hält.')
  ]),group('Wähle die passende Bedeutung',[
   choice('Verbot: Bei Rot … ich nicht mit dem Überqueren beginnen.','darf',['muss'],'Nicht dürfen drückt hier das Verbot aus.'),choice('Pflicht für das Fahrzeug: Am STOP-Schild … es anhalten.','muss',['darf'],'Müssen beschreibt die Pflicht anzuhalten.'),choice('Erlaubnis: Wenn das Fußgängersignal grün und der Weg frei ist, … ich losgehen.','darf',['muss'],'Grün erlaubt das Losgehen, zwingt aber niemanden.'),choice('Verbot: Während der Fahrt … ich die Bustür nicht öffnen.','darf',['muss'],'Nicht dürfen bezeichnet das Verbot.'),choice('Erlaubnis: An einem geeigneten sicheren Spielort … ich Ball spielen.','darf',['muss'],'Dürfen heißt: Es ist erlaubt.'),choice('Welche Aussage ist richtig?','Ein Helm ist beim Radfahren zum Schutz empfohlen.',['Alle Kinder müssen in Deutschland gesetzlich immer einen Fahrradhelm tragen.','Ein Helm ersetzt funktionierende Bremsen.'],'Ein Fahrradhelm ist eine wichtige Empfehlung; eine allgemeine gesetzliche Pflicht gibt es nicht.')
  ]),group('Unser Regelplakat',[open('Formuliere eine Regel mit „Wir dürfen nicht …“.','Wir dürfen bei Rot nicht über die Straße gehen.'),open('Formuliere eine Empfehlung zum Radfahren.','Wir tragen beim Radfahren zum Schutz einen Helm.'),open('Schreibe eine freundliche Erinnerung für die Bushaltestelle.','Bitte halte Abstand zur Fahrbahn und lass andere zuerst aussteigen.')])
 ]),
 unit('stadtplan','Ein Stadtplan und gute Wegbeschreibungen','Auf unserem Übungsplan zeigt der Pfeil nach Norden. Du startest unten und gehst zunächst nach oben.',[
  'Wenn du vom Start nach Norden schaust, ist links Westen und rechts Osten.','[[focus:Bis zur Kreuzung]] endet an der Kreuzung. [[focus:Über die Kreuzung]] führt auf die andere Seite.','Die Buchstaben A bis F stehen für Orte. Lies die Hinweise und trage die passenden Ortsnamen ein.'
 ],['Geh vom Start bis zur Kreuzung. Biege dort [[focus:links]] ab. Am Ende liegt die Schule.'],[
  group('Ordne die Orte A bis F zu',[
   ...mapPlaces.map(([letter,place])=>choice(`Welcher Ort gehört zu ${letter}?`,place,mapPlaces.map(x=>x[1]).filter(x=>x!==place),`${letter} = ${place}. Lies dazu die Hinweise unter dem Plan.`,{select:true}))
  ],{diagram:{kind:'map'},passage:[
   'Geh vom Start nach oben. Vor der Kreuzung liegt links die Bäckerei und rechts der Spielplatz.',
   'Geh geradeaus über die Kreuzung. Dahinter liegt links die Bibliothek und rechts der Park.',
   'Biegst du an der Kreuzung nach links ab, liegt am Ende dieser Straße die Schule. Rechts am Ende der anderen Straße liegt die Haltestelle.'
  ]}),group('Welcher Weg passt vom Start aus?',[
   choice('Wie kommst du zur Schule?','Bis zur Kreuzung gehen, dann links abbiegen.',['Vor der Kreuzung rechts abbiegen.','Über die Kreuzung gehen, dann zum rechten Gebäude.'],'Die Schule liegt bei E, links am Ende der Querstraße.'),choice('Wie kommst du zur Haltestelle?','Bis zur Kreuzung gehen, dann rechts abbiegen.',['Vor der Kreuzung links zur Bäckerei.','Geradeaus bis zum linken Gebäude hinter der Kreuzung.'],'Die Haltestelle liegt bei F, rechts am Ende der Querstraße.'),choice('Wo liegt die Bibliothek?','Hinter der Kreuzung auf der linken Seite.',['Vor der Kreuzung auf der rechten Seite.','Am rechten Ende der Querstraße.'],'Die Bibliothek gehört zu C.')
  ]),group('Ergänze die Wegauskunft',[
   fill('Kind: …, wie komme ich zur Schule?','Entschuldigung','So beginnst du freundlich.'),fill('Person: Geh … bis zur Kreuzung.','geradeaus','Zuerst gehst du vom Start nach oben.',{caseSensitive:false}),fill('Person: Dann biege nach … ab.','links','Die Schule liegt am linken Ende der Querstraße.',{caseSensitive:false}),fill('Kind: Also nicht nach …?','rechts','Rechts liegt die Haltestelle.',{caseSensitive:false}),fill('Person: Genau. Kind: Vielen …!','Dank','Die feste Wendung lautet Vielen Dank.')
  ],{wordBank:['links','Entschuldigung','Dank','geradeaus','rechts']}),group('Beschreibe selbst',[open('Beschreibe den Weg vom Start zum Park in drei Schritten. Ergänze einen Hinweis zur Ampel.','Geh vom Start geradeaus bis zur Ampel. Warte bei Rot. Wenn das Fußgängersignal grün und der Weg frei ist, gehe über die Kreuzung. Hinter der Kreuzung liegt der Park rechts.',5)])
 ]),
 unit('raetsel-tag4','Spiel und Lerntagebuch: Aufmerksam unterwegs','Erkenne Wörter und entschlüssle eine wichtige Eigenschaft für unterwegs.',[
  'Straße wird nur im Buchstabengitter als [[focus:STRASSE]] geschrieben.','Lies bei den Rätselhinweisen bis zum Ende. Die Wortlänge hilft.','Das Lösungswort sagt, wie wir gut unterwegs sein möchten.'
 ],['Das [[noun:Schild]] zeigt eine Regel oder einen Hinweis.'],[
  search(['AMPEL','AUTO','BUS','HELM','STRASSE','FAHRRAD','SCHILD','LINKS','RECHTS','GEHWEG']),
  riddle('SICHER',[
   ['Es steht an der Straße und zeigt eine Regel oder einen Hinweis.','SCHILD',1],['Das Gegenteil von rechts.','LINKS',2],['Ein Warnruf: …, ein Fahrzeug kommt!','ACHTUNG',2],['Er schützt beim Fahrradfahren den Kopf.','HELM',1],['Auf ihm gehen Menschen neben der Fahrbahn.','GEHWEG',2],['Diese Ampelfarbe sagt: stehen bleiben.','ROT',1]
  ]),diary()
 ])
]});

const forestText=[
 'Dies ist eine erfundene Tiergeschichte. Eines Morgens findet Igel Ivo eine Einladung in seinem Briefkasten: „Am Freitag feiern wir ein Lesefest unter der alten Eiche. Bring deine Lieblingsgeschichte mit!“ Ivo freut sich, doch dann wird er unsicher. Er liest manche Wörter noch langsam.',
 'Am Nachmittag besucht ihn Maus Mina. Ivo zeigt ihr die Einladung. „Wir können abwechselnd lesen“, schlägt Mina vor. Zuerst liest Mina einen Satz, dann Ivo. Schwierige Wörter teilen sie in kleine Stücke. Sie lachen über die Geschichte und üben an den nächsten Tagen weiter.',
 'Am Donnerstag sucht Ivo ein kurzes Buch über einen Frosch aus. Er legt ein grünes Lesezeichen hinein. Beim Fest am Freitag liest Ivo die ersten drei Sätze vor. Mina liest weiter. Wenn ein Wort schwierig ist, warten die Tiere freundlich. Am Ende klatschen alle. Ivo ist stolz: Er musste nicht schnell lesen. Er durfte sich Zeit nehmen und bekam Hilfe.'
];
autumnDays.push({day:5,title:'Bücher, Geschichten und unser Abschluss',subtitle:'In der Bibliothek, eine Tiergeschichte und mein Lernrückblick',icon:'books',goals:['Ich kann nach einem Buch fragen.','Ich kann eine Geschichte verstehen und ordnen.','Ich kann über meine Fortschritte sprechen.'],units:[
 unit('bibliothekswoerter','In der Bibliothek entdecken','In einer Bibliothek kannst du Bücher ansehen und oft auch ausleihen. Frage nach, welche Regeln und Fristen dort gelten.',[
  'Der [[noun:Titel]] ist der Name eines Buches. Die Autorin oder der Autor schreibt es.','[[verb:Ausleihen]] bedeutet: etwas für eine vereinbarte Zeit mitnehmen und danach zurückbringen.','Die Frist in unserer erfundenen Übungsbücherei beträgt vier Wochen. Eine echte Bibliothek kann andere Fristen haben.'
 ],['Ich suche ein Buch über Tiere. Wo stehen die [[noun:Sachbücher]]?'],[
  group('Die passenden Artikel',[
   ...[['Buch','das'],['Regal','das'],['Bibliothek','die'],['Bibliothekarin','die'],['Bilderbuch','das'],['Geschichte','die'],['Ausweis','der'],['Märchen','das'],['Seite','die'],['Titel','der']].map(([w,a])=>fill(`… ${w}`,a,`${a} ${w}`,{caseSensitive:false}))
  ],{layout:'compact',arts:[{name:'📖',label:'das Buch'},{name:'📚',label:'die Bücher'},{name:'🪪',label:'der Ausweis'}]}),
  pairs('Welche Erklärung gehört zum Wort?',[
   ['das Regal','Möbel, in dem Bücher stehen'],['ausleihen','für eine vereinbarte Zeit mitnehmen'],['zurückbringen','wieder an den Ausleihort bringen'],['die Bibliothekarin','Frau, die in der Bibliothek arbeitet und hilft'],['der Titel','Name eines Buches'],['der Autor','Mann, der ein Buch schreibt'],['das Bilderbuch','Buch mit vielen Bildern']
  ]),group('Wörter im Zusammenhang',[
   fill('Ich stelle das Buch zurück ins … .','Regal','Im Regal stehen Bücher.'),fill('Ich möchte ein Buch … und später zurückbringen.','ausleihen','Ausleihen ist ein zeitweises Mitnehmen.',{caseSensitive:false}),fill('Auf dem … stehen meine Angaben für die Ausleihe.','Ausweis','Der Ausweis hilft bei der Zuordnung der Ausleihe.'),fill('Der Name eines Buches heißt … .','Titel','Der Titel steht oft vorne auf dem Buch.'),fill('Im Übungsdialog darf ich das Buch vier … behalten.','Wochen','Das ist die Frist der erfundenen Übungsbücherei.'),fill('Auf jeder … kann Text oder ein Bild stehen.','Seite','Ein Buch besteht aus Seiten.'),fill('Beim Lesen nehme ich Rücksicht und spreche … .','leise','So störe ich andere beim Lesen nicht.',{caseSensitive:false})
  ],{wordBank:['leise','Regal','Titel','ausleihen','Wochen','Seite','Ausweis']}),group('Meine Bücher',[open('Über welches Thema möchtest du ein Buch lesen? Warum?','Ich möchte ein Buch über den Weltraum lesen, weil ich Sterne spannend finde.'),open('Was möchtest du eine Person in der Bibliothek fragen?','Entschuldigung, wo finde ich die Bücher über Planeten?')])
 ],{scene:'books'}),
 unit('ausleihe','Bücher ausleihen und gut behandeln','Wir üben ein höfliches Ausleihgespräch und formulieren hilfreiche Regeln.',[
  'Eine Bitte kann mit dem Imperativ stehen: [[verb:Sprich]] leise! [[verb:Behandle]] das Buch vorsichtig!','Bei trennbaren Verben steht der zweite Teil am Ende: [[focus:Bring das Buch zurück!]]','Frage nach der Ausleihfrist. Die vier Wochen in unserem Gespräch sind ein Übungsbeispiel.'
 ],['Lies die Geschichte! Bring das Buch rechtzeitig zurück!'],[
  group('Ist das rücksichtsvoll?',[
   tf('Ich blättere vorsichtig um.',true,'So bleiben die Seiten heil.'),tf('Ich male in ein ausgeliehenes Buch.',false,'Das Buch soll auch anderen Kindern zur Verfügung stehen.'),tf('Ich bringe das Buch zur vereinbarten Zeit zurück.',true,'Dann können andere es ausleihen.'),tf('Ich reiße eine Seite heraus.',false,'Dadurch wird das Buch beschädigt.'),tf('Ich frage, wenn ich etwas nicht finde.',true,'Die Mitarbeitenden helfen gern.'),tf('Ich schreie neben einer lesenden Person.',false,'Ich nehme Rücksicht auf andere.'),tf('Ich halte Essen und Getränke von den ausgeliehenen Büchern fern.',true,'So werden die Bücher nicht schmutzig oder nass.'),tf('Ich renne zwischen den Regalen hindurch.',false,'Ruhiges Gehen ist rücksichtsvoller.')
  ]),group('Ergänze das Befehls- oder Bittewort',[
   fill('sprechen: … bitte leise!','Sprich','Der Imperativ zu sprechen heißt Sprich!'),fill('behandeln: … das Buch vorsichtig!','Behandle','Die übliche du-Form lautet Behandle!'),fill('zurückbringen: … das Buch rechtzeitig zurück!','Bring','Bring oder Bringe ist richtig. Zurück bleibt am Ende.',{accepted:['Bringe']}),fill('rennen: … nicht zwischen den Regalen!','Renn','Renn oder Renne ist richtig.',{accepted:['Renne']}),fill('essen: … nicht über dem ausgeliehenen Buch!','Iss','Zu essen lautet der Imperativ Iss!')
  ]),group('Dialog an der Ausleihe',[
   fill('Kind: Guten Tag, ich … ein Buch über Tiere.','suche','Ich suche ein Buch.',{caseSensitive:false}),fill('Bibliothekar: Die Tierbücher … du links im Regal.','findest','Zu du gehört findest.',{caseSensitive:false}),fill('Kind: Darf ich dieses Buch …?','ausleihen','Das ist eine Frage nach dem zeitweisen Mitnehmen.',{caseSensitive:false}),fill('Bibliothekar: Ja. Hast du deinen … dabei?','Ausweis','Der Ausweis gehört zur Ausleihe.'),fill('Kind: Wie lange? Bibliothekar: In unserer Übungsbücherei … Wochen.','vier','Hier ist die vereinbarte Übungsfrist vier Wochen.',{caseSensitive:false}),fill('Kind: Vielen … für die Hilfe!','Dank','Die feste Wendung heißt Vielen Dank.')
  ],{wordBank:['findest','vier','Ausweis','suche','Dank','ausleihen']}),group('Unser Bücherplakat',[open('Schreibe drei freundliche Regeln für eine Leseecke. Spiele danach das Ausleihgespräch zu zweit.','Sprich leise! Behandle die Bücher vorsichtig! Räume sie nach dem Lesen zurück ins Regal!',5)])
 ]),
 unit('ivos-lesefest','Lesen: Ivos kleines Lesefest','Eine Geschichte über gemeinsames Lesen, Geduld und passende Hilfe.',[
  'Diese Tiergeschichte ist erfunden. In wirklichen Wäldern veranstalten Igel und Mäuse keine Lesefeste.','Achte auf die Zeitwörter zuerst, am Nachmittag, am Donnerstag und am Freitag.','Langsam zu lesen ist in Ordnung. Wenn ein Wort schwierig ist, darfst du Hilfe bekommen.'
 ],['Mina liest [[focus:einen Satz]], danach ist Ivo dran. Das ist abwechselndes Lesen.'],[
  group('Ivos kleines Lesefest',[],{kind:'reading',paragraphs:forestText}),
  group('Antworte in ganzen Sätzen',[
   open('Was findet Ivo in seinem Briefkasten?','Er findet eine Einladung zu einem Lesefest.'),open('Warum wird Ivo unsicher?','Er liest manche Wörter noch langsam und macht sich deshalb Gedanken.'),open('Wie hilft Mina ihm beim Üben?','Sie lesen abwechselnd und teilen schwierige Wörter in kleine Stücke.'),open('Welches Buch sucht Ivo aus?','Er sucht ein kurzes Buch über einen Frosch aus.'),open('Warum ist Ivo am Ende stolz?','Er hat beim Fest mitgelesen, sich Zeit genommen und Hilfe angenommen. Andere passende Begründungen sind möglich.')
  ]),group('Lies genau',[
   tf('Das Lesefest findet am Freitag statt.',true,'Das steht in der Einladung und im letzten Abschnitt.'),tf('Ivo liest von Anfang an alle Wörter sehr schnell.',false,'Manche Wörter liest er noch langsam.'),tf('Mina schlägt abwechselndes Lesen vor.',true,'Zuerst liest sie, dann Ivo.'),tf('Ivos Lesezeichen ist rot.',false,'Er legt ein grünes Lesezeichen ins Buch.'),tf('Die Tiere warten freundlich bei schwierigen Wörtern.',true,'Sie nehmen sich gemeinsam Zeit.')
  ]),group('Was passiert zuerst?',[
   order('Ordne die Ereignisse nach der Geschichte.',[
    'Ivo findet die Einladung.','Mina schlägt gemeinsames Lesen vor.','Beide üben an den nächsten Tagen.','Ivo wählt am Donnerstag ein Froschbuch.','Ivo und Mina lesen beim Fest vor.','Alle Tiere klatschen am Ende.'
   ],'Die Einladung kommt zuerst, das gemeinsame Vorlesen beim Fest später und der Applaus zuletzt.')
  ])
 ],{scene:'forest'}),
 unit('gefuehle-buecherkarte','Gefühle und meine Bücherkarte','Für Gefühle gibt es viele Wörter. Wie du dich selbst fühlst, entscheidest du.',[
  'Eine Beschreibung wie [[focus:Ich bin stolz, weil ich etwas geschafft habe]] verbindet ein Gefühl mit einem Grund.','Im Nebensatz mit weil steht das gebeugte Verb am Ende: weil ich das Buch gelesen [[verb:habe]].','Eine Bücherkarte nennt Titel, Autorin oder Autor, Figuren, Ort und eine kurze Zusammenfassung.'
 ],['Ich bin [[adjective:neugierig]], weil ich das Ende erfahren [[verb:möchte]].','Ich bin [[adjective:ruhig]], weil ich genug Zeit [[verb:habe]].'],[
  pairs('Welches Gefühlswort passt zur Erklärung?',[
   ['Ich freue mich über etwas, das mir gelungen ist.','stolz'],['Ich brauche Ruhe und Schlaf.','müde'],['Ich freue mich und möchte lachen.','fröhlich'],['Ich vermisse etwas und könnte weinen.','traurig'],['Ich befürchte, dass etwas Schlimmes passiert.','ängstlich'],['Ich möchte unbedingt etwas Neues erfahren.','neugierig']
  ]),group('Deine Gefühle sind deine',[open('Wie fühlst du dich heute? Schreibe einen Satz mit „weil“.','Zum Beispiel: Ich bin fröhlich, weil wir heute zusammen lesen. Andere Gefühle sind genauso möglich.'),open('Wie könnte Ivo sich vor und nach dem Fest fühlen? Begründe.','Vor dem Fest ist er unsicher, weil er langsam liest. Danach ist er stolz, weil er mitgelesen hat.')]),
  group('Meine Bücherkarte',[
   ...[['Wie heißt dein Buch?','Nenne einen echten Titel oder erfinde ein Buch.'],['Wer hat es geschrieben?','Trage Autorin oder Autor ein. Bei einem erfundenen Buch darfst du selbst die Person sein.'],['Welche Figuren kommen vor?','Zum Beispiel: Ivo und Mina.'],['Wo spielt die Geschichte?','Zum Beispiel: im Wald unter einer Eiche.'],['Worum geht es in zwei bis drei Sätzen?','Zum Beispiel: Zwei Tiere üben gemeinsam. Beim Lesefest lesen sie abwechselnd vor.'],['Was gefällt dir an dem Buch?','Zum Beispiel: Mir gefällt, dass die Tiere geduldig helfen.']].map(([p,m])=>open(p,m,p.startsWith('Worum')?4:2))
  ]),{kind:'drawing',title:'Gestalte ein eigenes Buchcover',instructions:'Male ein Cover für dein echtes oder erfundenes Buch. Den Titel kannst du anschließend auf Papier dazuschreiben.',tasks:[]}
 ]),
 unit('wochenquiz','Unser Wochenquiz und mein Rückblick','Schau zurück: Was hast du entdeckt? Bei den Quizfragen gibt es jeweils eine passende Antwort.',[
  'Du darfst in allen bisherigen Übungen nachlesen. Es gibt keinen Zeitdruck.','Die Quizfragen haben feste Lösungen. Dein persönlicher Rückblick hat dagegen keine richtige oder falsche Antwort.','Du kannst am Ende einen eigenen Lernpass ausfüllen und ausdrucken.'
 ],['Ein neuer Lernschritt kann sein: [[focus:Ich kann höflich um Wiederholung bitten.]]'],[
  group('Zwölf Fragen aus unserer Ferienwoche',[
   choice('Was ist das Gegenteil von langsam?','schnell',['leise','klein'],'Langsam und schnell sind Gegenteile.'),choice('Welcher Tag folgt auf Donnerstag?','Freitag',['Mittwoch','Sonntag'],'Donnerstag, Freitag, Samstag.'),choice('Welcher Monat gehört zum Herbst?','November',['Juni','Februar'],'Unsere Herbstmonate sind September, Oktober, November.'),choice('Was bedeutet halb zehn?','9:30 Uhr',['10:30 Uhr','9:15 Uhr'],'Die zehnte Stunde ist halb erreicht.'),choice('Welches Lebensmittel ist in unserer Küchen-Einteilung Obst?','die Birne',['die Kartoffel','der Reis'],'Birnen wachsen als Obst an Bäumen.'),choice('Welche Form passt: „Ich kaufe … Apfel“?','einen',['eine','ein'],'Der Apfel steht hier im Akkusativ: einen Apfel.'),choice('Wie fragst du nach dem Preis?','Wie viel kostet das?',['Wo steht das?','Wie alt bist du?'],'Kostet fragt nach dem Preis.'),choice('Was machst du bei rotem Fußgängersignal?','Ich bleibe stehen.',['Ich renne los.','Ich schaue nur nach oben.'],'Bei Rot beginnst du nicht mit dem Überqueren.'),choice('Welches Wort setzt du aus Bus + halte + stelle zusammen?','Bushaltestelle',['Busstellehalte','Haltebusstelle'],'Die Wortbausteine ergeben Bushaltestelle.'),choice('Was ist der Titel eines Buches?','der Name des Buches',['der Preis des Regals','die Nummer der Bushaltestelle'],'Der Titel benennt das Buch.'),choice('Wie lautet eine freundliche Bitte?','Kannst du das bitte wiederholen?',['Ich höre nie zu.','Du sollst schweigen.'],'Eine freundliche Nachfrage hilft beim Lernen.'),choice('Was hilft Ivo in unserer Geschichte?','Geduld und gemeinsames Lesen',['Zeitdruck und Auslachen','möglichst lautes Rufen'],'Mina und die Tiere unterstützen ihn geduldig.')
  ]),group('Mein persönlicher Rückblick',[
   open('Das hat mir in der Ferienwoche gefallen:','Hier zählt deine eigene Meinung.'),open('Diese drei Wörter möchte ich mir merken:','Wähle selbst drei Wörter und erkläre eines davon.'),open('Das war für mich schwierig:','Du darfst ehrlich sein. Schwierige Stellen zeigen, wo Hilfe nützlich ist.'),open('Diesen Fortschritt habe ich bemerkt:','Zum Beispiel: Ich kann jetzt halb zehn auf der Uhr erkennen.'),open('Das möchte ich als Nächstes üben:','Zum Beispiel: Ich möchte längere Sätze lesen.')
  ]),group('Eine Dankeskarte',[open('Schreibe eine kleine Dankeskarte an die Gruppe oder eine helfende Person.','Liebe Gruppe, danke für das gemeinsame Spielen. Ich fand schön, dass wir einander geholfen haben. Viele Grüße, …',5)])
 ]),
 unit('raetsel-tag5','Spiel und Lerntagebuch: Bücher öffnen Welten','Zum Abschluss wiederholen wir Wörter aus unserer Lesewelt.',[
  'Vergleiche beim Suchen jeden Buchstaben, auch am Ende eines Wortes.','Die Kästchen im Rätsel verraten die Länge des gesuchten Wortes.','Dein Lerntagebuch darf auch sagen, was du morgen weiter entdecken möchtest.'
 ],['[[focus:Märchen]] wird nur im Suchgitter als [[focus:MAERCHEN]] geschrieben.'],[
  search(['BUCH','REGAL','LESEN','LEISE','SEITE','TITEL','MÄRCHEN','AUSWEIS','BILD','GESCHICHTE']),
  riddle('LESEN',[
   ['Buchstaben und Wörter verstehen: Das kannst du beim …','LESEN',1],['In diesem Möbel stehen die Bücher.','REGAL',2],['Die Karte für deine Bibliotheksausleihe.','AUSWEIS',3],['Ein Blatt im Buch hat eine Vorder- und eine Rück…','SEITE',2],['Dein Vorname ist ein …','NAME',1]
  ]),diary()
 ])
]});

// Keep days ordered even when independent content blocks are edited.
autumnDays.sort((a,b)=>a.day-b.day);
export const autumnUnits=autumnDays.flatMap(d=>d.units.map((u,index)=>({...u,day:d.day,number:index+1})));
export const autumnTasks=autumnUnits.flatMap(u=>u.groups.flatMap(g=>g.tasks));
export const autumnStats={days:autumnDays.length,units:autumnUnits.length,tasks:autumnTasks.length,closed:autumnTasks.filter(q=>q.type!=='open').length,open:autumnTasks.filter(q=>q.type==='open').length,searchWords:autumnUnits.flatMap(u=>u.groups.filter(g=>g.kind==='wordsearch')).reduce((n,g)=>n+g.words.length,0),readings:autumnUnits.flatMap(u=>u.groups.filter(g=>g.kind==='reading')).length};
