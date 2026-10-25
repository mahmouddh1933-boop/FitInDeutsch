# Fit in Deutsch – Wörter lernen und selbst testen

Deutschsprachige Lern-App, inspiriert vom Ablauf der bereitgestellten Huroof-App. Arabische Inhalte, Übersetzungen und Firebase-Konfiguration wurden nicht übernommen.

## App herunterladen

[Fit-in-Deutsch.zip herunterladen](https://github.com/mahmouddh1933-boop/FitInDeutsch/raw/refs/heads/main/downloads/Fit-in-Deutsch.zip). ZIP vollständig entpacken und `index.html` öffnen. Keine Installation und kein Konto nötig. Programm, SVG-Bilder und Manrope-Schrift sind eingebettet; Piktogramme verwenden die Emoji-Schrift des Geräts.

## Erklärvideo

[Erklärvideo ansehen oder herunterladen (MP4)](https://raw.githubusercontent.com/mahmouddh1933-boop/FitInDeutsch/main/downloads/Fit-in-Deutsch-Erklaervideo.mp4)

Rund elf Minuten in Full HD zur Version 0.6: Funktionen einzeln erklärt, mit deutscher synthetischer Sprecherstimme, animierten App-Ansichten, Untertiteln, 48 Kapiteln und eigener dezenter Musik. [Kapitelübersicht](downloads/Fit-in-Deutsch-Kapitel.txt) · [Untertitel](downloads/Fit-in-Deutsch-Untertitel.srt). Produktionsquellen und Hinweise stehen in [video/README.md](video/README.md).

## Ablauf – Version 0.7

**20 Themen mit jeweils genau 20 Wörtern, insgesamt 400 Wörter.** Keine Aufteilung in Lektionen. Ein Thema zeigt eine frei bedienbare Wortkarte mit Bild und Vorlesefunktion sowie die gesamte bebilderte Liste. Einzelne Wörter oder alle 20 Wörter können freiwillig als gelernt markiert werden. Dabei läuft kein Timer. Ein Test bleibt jederzeit freiwillig.

Über **Test starten** öffnet sich die Auswahl:

1. **Schreiben:** Ein Bild erscheint. Das deutsche Wort wird ohne Artikel geschrieben. Groß-/Kleinschreibung, Umlaute und ß werden berücksichtigt.
2. **Hören:** Der Benutzer klickt auf **Wort anhören** und wählt eines von vier Bildern. Während des Tests werden keine Wortlösungen als Text eingeblendet.
3. **Fehlende Buchstaben:** Bild und Wort mit Lücken erscheinen. Bis 5 Zeichen fehlt ein Buchstabe, bei 6–9 Zeichen fehlen zwei, bei längeren Wörtern drei. Die Lücken sind über das Wort verteilt, meist bleiben Anfang und Ende sichtbar. Bei sehr kurzen Wörtern wie Ei bleibt wenigstens der Anfang stehen. Leerzeichen und Bindestriche werden nicht entfernt. Die Lücken werden einzeln von links nach rechts ergänzt.
4. **Buchstabensalat:** Ein Bild und gemischte Buchstabenkärtchen erscheinen. Alle Buchstaben müssen richtig angeordnet werden. Wiederholte Buchstaben haben eigene Kärtchen; Rücknahme und Neulegen sind möglich.

5. **Definitionen verstehen (schwer):** Eine deutsche Erklärung erscheint ohne Bild. Der Benutzer wählt aus vier Wörtern das passende Wort. Alle 400 Einträge besitzen eine eigene Definition. Die Antwortmöglichkeiten stammen aus demselben Thema; eng verwandte Ober- und Unterbegriffe werden als konkurrierende Antworten ausgeschlossen.

Dazu wählt der Benutzer **5 oder 10 Wörter** und **60, 90 oder 120 Sekunden**. Erst **Jetzt starten** zieht eine zufällige Auswahl ohne doppelte Wörter aus der gewählten Themenliste und startet den Countdown. Das Zeitlimit gilt für den gesamten Test und wird zwischen Fragen nicht zurückgesetzt. Antworten werden einmal abgegeben; die Lösungen erscheinen erst am Ende. Überspringen ist möglich.

Bei Zeitablauf endet der Test automatisch. Ein monotoner Zeitgeber und eine erneute Fristprüfung bei jeder Antwort verhindern zusätzliche Antwortzeit durch verzögerte Timer. Der Countdown berücksichtigt auch zwischenzeitlich inaktive Tabs. Das Verlassen der Testansicht bricht den Test ohne Ergebnis ab; ein Neuladen startet keinen alten Test neu.

Die Auswertung zeigt richtige, falsche, übersprungene und unbeantwortete Aufgaben, Antworten und Lösungen. Pro richtigem Wort gibt es drei Punkte. Nur richtig beantwortete Wörter werden zusätzlich als gelernt gespeichert. Auch ein abgelaufener Test bleibt als Versuch in der Statistik; unbeantwortete Wörter zählen nicht als falsch beantwortet oder gelernt. Die letzten 50 Tests bleiben browserlokal erhalten.

## Weitere Bereiche

- Deutsches Alphabet: A–Z, Ä, Ö, Ü und ß, Groß-/Kleinschreibung, Bildwörter, Buchstabennamen und 90 Übungsaufgaben. Dazu 14 Buchstabenverbindungen mit 183 Beispielwörtern und 180 Aufgaben (siehe unten).
- Grammatik für Klasse 1 bis 4: 53 Themen mit 636 Aufgaben und 212 erklärten Beispielen. Alle Themen der vorgegebenen Liste und die bisherigen Zusatzthemen sind enthalten.
- Fehlerwiederholung für falsch beantwortete Test-, Alphabet- und Grammatikaufgaben. Wiederholungsrunden sind zum Lernen und haben keinen Timer.
- 15 Lesegeschichten in drei Stufen mit 135 Verständnisfragen, Lesenhelfer und zwei Fünf-Tage-Pläne (siehe unten).
- Suche, frei wählbare Themen, Fortschritt, Lerntage, Tagesziel und Erfolge.

Die fünf Testarten beziehen sich auf die Wortschatztests. Alphabet- und Grammatikübungen bleiben eigenständige Lernbereiche.

## Buchstabenverbindungen und Lernpfad

Unter **Deutsches Alphabet → Buchstaben, die zusammen klingen** öffnet jede Karte eine eigene Erklärungsseite: sch, ch, ei, au, eu, ie, sp, st, ck, pf, ng, tz, Qu/qu und das bisherige äu. Insgesamt stehen 183 Beispielwörter, Beispielsätze, Hinweise und 180 Aufgaben bereit. Die relevante Stelle wird im Wort markiert. Wörter und Sätze lassen sich vollständig mit deutscher Browserstimme anhören. Mehrzahlbilder wie Bäume, Häuser, Mäuse und Bücher zeigen mehrere Objekte.

Die **ch-Seite** hat zehn Abschnitte mit 53 Wörtern: Ach-Laut nach a/o/u/au (Bach, Bauch, Buch), Ich-Laut nach helleren Selbstlauten (Licht, Bücher, weich, feucht) und Mitlauten (Milch, durch), die Endung -chen, China/Chemie mit üblichen regionalen Varianten, k wie in Chor, sch wie in Chef, tsch wie in Chip/Couch, chs wie in Fuchs sowie Wortbausteingrenzen in höchste, nächste und Bachs. Die unterschiedlichen China-/Chemie-Aussprachen werden nicht gegen eine einzelne Browserstimme als falsch bewertet. Weitere Fremdwörter und Eigennamen können zusätzlich abweichen.

Bei sp/st wird zwischen Wortstammanfang (Spiel, Stein, verspielen, verstehen), Wortinnerem (Wespe, Kiste) und Grenzen zwischen Wortbausteinen (auspacken, Haustür) unterschieden. ck/tz erklären die häufige Schreibung nach kurzen betonten Selbstlauten, pf die Verbindung p/f, ng den Nasenlaut ohne zusätzliches g (mit Abgrenzung zu nk und an-geben), qu die Verbindung k und deutsches w. Auch ie-Ausnahmen wie Familie und Linie sowie die Schreibung von eu/äu werden angesprochen.

Jede Verbindung hat zwei Sechserrunden, ch hat vier. Aufgaben umfassen geschriebene Lücken mit zwei oder drei Buchstaben, Auswahlaufgaben, Hörfragen, Schreibweisen, Positionen im Wort und Regelanwendung. Eine freiwillige Mischrunde zieht zwölf Aufgaben aus zwölf unterschiedlichen Verbindungen. Übungen haben keinen Timer, bieten Hinweise und erklärende Rückmeldungen. Abgeschlossene Runden werden als Aktivität gespeichert, zählen zum Tagesziel und vergeben die bisherigen Übungspunkte; sie markieren keine Vokabeln pauschal als gelernt. Fehler erscheinen in der vorhandenen Wiederholung. Beim Zurückgehen aus einer Übung bleiben Verbindung und Rundenauswahl erhalten.

Die linke Navigation beginnt mit **Deutsches Alphabet → Lesenhelfer → Meine Themen → Fehler wiederholen → Einfache Grammatik → 5-Tägige Maßnahme**. Die übrigen Bereiche folgen darunter. Der Schriftzug **Erstellt von Mahmoud Barakat** steht im oberen Bereich und in der linken Seitenleiste, auch im mobilen Menü.

## Grammatik nach Klassen

Die Klassen sind eine Orientierung anhand der Nutzerliste, keine amtliche Einstufung. Alle Themen sind ohne Sperren zugänglich. 47 Themen bilden die Liste einschließlich eines Überblicks und je eines eigenen Themas zu den vier Fällen ab. Sechs bisherige Zusatzthemen bleiben erhalten.

| Bereich | Themen | Inhalt |
| --- | ---: | --- |
| Klasse 1 | 8 | Nomen, Verben, Adjektive erkennen; Nomen- und Satzanfangsschreibung; Einzahl/Mehrzahl; Wörter im Satz; Schlusspunkt |
| Klasse 2 | 15 | Die neun gewünschten Themen zu Artikeln, Grund-/Personalformen, Gegenteilen, Satzarten und Präsens; zusätzlich sein, haben, nicht/kein, W-Fragen, Satzbau und einfache Ortsbeziehungen |
| Klasse 3 | 12 | Pronomen, Steigerung, Zusammensetzungen, Umstellprobe, Subjekt, Prädikat, Präteritum, Perfekt sowie Vor- und Nachsilben |
| Klasse 4 | 18 | Fallübersicht, vier einzelne Fälle, Dativ-/Akkusativobjekt, Orts-/Zeitangaben, Futur I, Plusquamperfekt, drei Themen zur wörtlichen Rede, Haupt-/Nebensatz, Konjunktionen/Kommas sowie zwei Themen zur Substantivierung |

Jedes Thema besitzt eine Einführung, drei Erklärungsschritte, vier Beispiele mit erläuternden Notizen, einen Hinweis auf einen typischen Fehler und zwölf unterschiedliche Aufgaben. Farben und Beschriftungen kennzeichnen z. B. Nomen, Verben, Satzglieder, Wortbausteine und Satzzeichen. Die Markierungen lassen sich ausblenden. Gezielt zu untersuchende Wortgruppen bleiben in Aufgaben neutral hervorgehoben.

Zusätzliche Hilfen sind die Vier-Fälle-Tabelle, Tabellen mit Personal- und Besitzformen sowie eine Zeitleiste für das Plusquamperfekt. Beispiele lassen sich einzeln oder zusammen vorlesen; Formatierungszeichen werden nicht mitgesprochen. Die Suche arbeitet innerhalb der gewählten Klasse.

Die Übungen enthalten Auswahl- und Lückenfragen, Wort-/Satzgliedbestimmung, Satzzeichenentscheidungen und Aufgaben zum Ordnen von Wortgruppen. Tipps können bei Bedarf aufgeklappt werden. Nach falschen Antworten erklärt die App die Regel und erlaubt eine Korrektur. Auswahlaufgaben zur Großschreibung prüfen die Buchstabenform tatsächlich und akzeptieren die kleingeschriebene Gegenoption nicht als richtig. Grammatikübungen haben keinen Timer.

Die bisherigen Grammatik-IDs und ihre ersten sechs Aufgaben bleiben erhalten. Frühere Lernpunkte, Übungsmarkierungen und Fehleraufgaben werden weiterverwendet; alle Themen sind jetzt auf zwölf Aufgaben erweitert.

## Lesegeschichten, Lesenhelfer und Fünf-Tage-Pläne

Die **15 selbst verfassten Geschichten** verteilen sich auf drei Stufen mit je fünf Texten: Stufe 1 enthält 69–77 Wörter und kurze, einfache Sätze, Stufe 2 enthält 130–140 Wörter und erste Begründungen, Stufe 3 enthält 222–227 Wörter mit komplexeren Zusammenhängen und Perspektiven. Jeder Text hat drei Richtig/Falsch-Fragen, drei Auswahlfragen und drei offene Fragen. Geschlossene Antworten werden erst nach „Antwort prüfen“ ausgewertet. Offene Antworten haben Musterantworten zur gemeinsamen Besprechung und werden nicht automatisch benotet. Antworten werden browserlokal gespeichert.

Der **Lesenhelfer** bietet zehn interaktive Angebote: Lautbildung mit frei gewählten Merksignalen, eine Anlauttabelle mit 29 Bildwörtern und einem Hinweis zu ß, Reime/Silbenklatschen, 36 Wörter in farbiger Silbenschrift mit Bögen, Silben-Memory und Wortbau, Raketenlesen mit 20 Sekunden, Wörter und Sätze aus dem Säckchen ohne Wiederholungen, Lese-Mal-Aufgaben, gewürfelte Handlungsaufträge und Tandem-Lesen mit wechselnden Personen. Merksignale sind keine standardisierte Gebärdensprache; die Audiofunktion liest Beispielwörter. Raketenlesen zählt selbst bestätigte Einträge und bewertet weder Aussprache noch Lesefähigkeit. Ein Link zum Bildungsportal Niedersachsen bietet weitere Anregungen; die Materialien in der App sind selbst erstellt.

Der Bereich **5-Tägige Maßnahme** enthält zwei frei zugängliche Pläne mit je fünf Tagen. Für Klasse 1–2 werden alle 30 Alphabetzeichen, alle zehn Lesenhelfer-Angebote und ausgewählte Grammatikthemen aus Klasse 1 und 2 kombiniert. Für Klasse 3–4 gibt es täglich zwei passende Grammatikthemen und eine Lesegeschichte. Jeder Tag umfasst ein einfaches Morgenritual, Lernphasen, eine Pause und einen gemeinsamen Abschluss; die vorgeschlagenen 105 Minuten können angepasst werden. Ablauf-Häkchen werden lokal gespeichert. Verknüpfungen öffnen die zugewiesenen Buchstaben, Übungen, Grammatikthemen oder Geschichten direkt.

**PDF und Drucken:** Jede Geschichte, jedes Lesenhelfer-Übungsblatt und jeder vollständige Tag besitzt eine Druckansicht. „PDF herunterladen“ erzeugt eine A4-Datei direkt im Browser, auch in der entpackten App ohne Internetzugriff. „Drucken / PDF speichern“ verwendet alternativ den Druckdialog des Browsers. Die Materialien enthalten freie Antwortzeilen und optional ein getrenntes Lösungsblatt mit Musterantworten. Tagespakete enthalten das vollständige Morgenritual, Buchstabenbilder bzw. den vollständigen Lesetext, die zugewiesenen Lesenhelfer-Arbeitsaufträge, sämtliche Erklärungsschritte, Tabellen, vier Beispiele und zwölf Aufgaben je zugewiesenem Grammatikthema sowie den Abschluss. Sie enthalten keine bloße Linkliste. Die Auswahl eines Lesenhelfer-Arbeitsblatts ist ein festes Übungsset; der interaktive Bereich bietet darüber hinaus weitere Wörter und Runden. Schülerantworten aus den interaktiven Übungen werden nicht in die leeren Arbeitsblätter übernommen.

PDFs verwenden jsPDF und eine eingebettete statische Manrope-Schrift (aus der vollständigen Google-Fonts-Version abgeleitet, einschließlich ẞ; Lizenz in `public/Manrope-PDF-OFL.txt`). Farbig markierte Grammatikstellen bleiben unterstrichen; gezielt untersuchte Wortgruppen sind zusätzlich mit eckigen Klammern gekennzeichnet. Silben bleiben farbig mit Bögen. Die ZIP enthält die Lizenztexte aller Produktionsabhängigkeiten. Ein Ein-Datei-Build schließt dynamische Bibliotheksimporte ein, damit der Download selbstständig funktioniert.

## Zurück-Navigation und Bildkorrekturen

Der obere Zurück-Button bleibt beim Scrollen sichtbar. Innerhalb eines Lernbereichs führt er zuerst eine Ebene zurück: vom Test zur Testauswahl, von dort zu den 20 Wörtern; in der Grammatik von der Übung zur Erklärung und von dort zur Themenliste. Danach folgt die zuletzt besuchte App-Seite. Beim ersten Besuch der Startseite ist der sichtbare Zurück-Button deaktiviert, weil es noch keine vorherige Seite gibt. Die Suche bleibt bei der Rückkehr zur Themenliste erhalten. Ein Zurück aus einem laufenden Test beendet dessen Countdown ohne Ergebnis. Bereits abgeschlossene Ergebnisse bleiben gespeichert.

Die Bilder für Ä (drei Äpfel), Mütze (Strickmütze), Taschenrechner (mit Display und Tasten), Meer (offene Wasserfläche), Fluss (Wasserlauf zwischen Ufern), Flasche (Wasserflasche) und Geldmünze (Euro-Münze) sind eigene SVG-Grafiken. Auch gespeicherte Fehleraufgaben verwenden beim Laden die aktuellen Bilder.

## Daten und ältere Lernstände

Alles bleibt unter `fit-deutsch-progress` im selben Browser. Alte Wörter, Lernpunkte und Daten aus der früheren Version werden erhalten. Frühere Lektionsmarkierungen werden nicht mehr angezeigt und schließen keine neue Zwanzig-Wörter-Liste pauschal ab. Ein Thema zählt als gelernt, wenn alle 20 Wörter markiert oder im Test richtig beantwortet wurden. Diese Markierungen sind keine bescheinigte Sprachbeherrschung.

Bei lokalen HTML-Dateien hängt die Speicherung vom Browser und Dateipfad ab. Wenn möglich, die neue Datei am bisherigen Ort öffnen. Beim Löschen der Browserdaten oder Gerätewechsel werden die lokalen Daten nicht übertragen. Es gibt keine Konten, Serverdatenbank oder Cloud-Synchronisierung.

## Entwickeln und prüfen

Voraussetzung: Node.js ab 22.12, geprüft mit Node.js 24.

```sh
cd /workspace/FitInDeutsch
npm ci --cache /tmp/fit-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

```sh
npm test
npx --cache /tmp/fit-npm-cache playwright test
npm run build
python3 tools/package-download.py
```

Playwright startet den Entwicklungsserver bei Bedarf automatisch. Die Konfiguration erwartet Chromium unter `/usr/bin/chromium`; auf anderen Systemen anpassen. Tests prüfen Inhalte, Zufallsauswahl ohne Wiederholung, alle fünf Testarten, Definitionen, Zurück-Navigation, korrigierte Bilder, Länge und Position der Buchstabenlücken, alte Lernstände, Ergebnisse, Timerstart/-ablauf/-abbruch, sämtliche Zeit-/Wortanzahlkombinationen sowie mobile Darstellung. Grammatikprüfungen decken alle 53 Erklärungsseiten, Aufgabenrunden aus allen Klassen, Großschreibung, Markierungsschalter, Vorlesetext, Fallschema und Rücknavigation ab. Neue Prüfungen decken alle Lesestufen, Fragearten, Lesehilfen, Timer, vollständige Tagesmaterialien, direkte Bereichsverknüpfungen und mobile Druckansichten ab. Echte PDF-Downloads werden gespeichert und mit `pdftotext` auf vollständigen Inhalt und deutsche Zeichen geprüft; dafür muss Poppler installiert sein.

Die Webversion liegt in `dist/`; die eigenständig öffnungsfähige ZIP liegt in `downloads/`. Direkte `file:`-Navigation ist im Cloud-Testbrowser administrativ gesperrt. Die einzelne HTML-Datei wird daher zusätzlich per HTTP mit blockierten externen Anfragen geprüft. Das Öffnen auf Schülergeräten und die Aussprache sind dort zu prüfen.

## Aufbau

- `src/data.js`: 20 Themen, jeweils 20 Wörter, browserlokaler Fortschritt.
- `src/testing.js`: fünf Testarten, Stichproben, Lückenlogik, Auswertung und Ergebnis-Speicherung.
- `src/definitions.js`: 400 deutsche Worterklärungen und Auswahlregeln für Antwortmöglichkeiten.
- `src/navigation.jsx`: Rücksprungziele innerhalb der Lernbereiche.
- `src/TimedTest.jsx`: zeitbegrenzter Test und Ergebnisansicht.
- `src/LearningPages.jsx`: freies Lernen, Testauswahl, Alphabet, Grammatik und Wiederholung.
- `src/grammar.js` und `src/grammar/`: nach Klassen organisierte Erklärungen, Beispiele und Aufgaben.
- `src/GrammarPage.jsx`, `src/MarkedText.jsx`, `src/grammar.css`: Klassen-Auswahl, Erklärungsansicht, sichere Textmarkierungen, Tabellen und Zeitleiste.
- `src/Exercise.jsx`: gemeinsame Aufgabenansicht mit Tipps, Rückmeldungen und Wortgruppen zum Ordnen.
- `src/learning.js`: Alphabet- und weitere Wortaufgaben.
- `src/phonics.js`, `src/SoundPatterns.jsx`, `src/phonics.css`: Buchstabenverbindungen, Beispiele, Aufgaben und Erklärungsansichten.
- `src/Art.jsx` und `src/ExtraArt.jsx`: SVG-Bilder, Diagramme, Farbfelder, Zahlen und Piktogramme.
- `src/reading/`: Lesetexte, interaktive Lesehilfen, Tagespläne, gemeinsame Arbeitsblatt-Daten und PDF-/Druckansicht.
- `src/pdfFont.js`: eingebettete Manrope-Schrift für PDF-Ausgaben.
- `tools/package-download.py`: ZIP mit eingebettetem Programm, Schrift und Lizenztexten.

## Medien und Einordnung

Manrope stammt aus der bereitgestellten App und steht unter SIL-OFL (`public/OFL.txt`). Es gibt keine externen Bild- oder Schriftabrufe. Vorlesen verwendet die deutsche Sprachausgabe des Browsers; Stimmen und mögliche Netzwerkverbindungen hängen vom Gerät ab. Bei einem Hörfehler wird im Test keine Lösung eingeblendet; der Benutzer kann abbrechen und eine andere Testart wählen. In freien Lernübungen ist eine Texthilfe möglich.

Diese App ist eine unabhängige Lernhilfe, kein offizielles NRW-Angebot, kein zertifizierter Sprachtest und noch nicht pädagogisch freigegeben. Die angegebene Quelle https://www.schulministerium.nrw/ferienintensivtraining-fit-deutsch konnte während der Erstellung wegen HTTP 403 nicht abgerufen werden. Offizielle Programmdetails sind daher noch nicht abgeglichen.
