# Fit in Deutsch – Wörter lernen und selbst testen

Deutschsprachige Lern-App, inspiriert vom Ablauf der bereitgestellten Huroof-App. Arabische Inhalte, Übersetzungen und Firebase-Konfiguration wurden nicht übernommen.

## App herunterladen

[Fit-in-Deutsch.zip herunterladen](https://github.com/mahmouddh1933-boop/FitInDeutsch/raw/refs/heads/main/downloads/Fit-in-Deutsch.zip). ZIP vollständig entpacken und `index.html` öffnen. Keine Installation und kein Konto nötig. Programm, SVG-Bilder und Manrope-Schrift sind eingebettet; Piktogramme verwenden die Emoji-Schrift des Geräts.

## Ablauf – Version 0.3

**20 Themen mit jeweils genau 20 Wörtern, insgesamt 400 Wörter.** Keine Aufteilung in Lektionen. Ein Thema zeigt eine frei bedienbare Wortkarte mit Bild und Vorlesefunktion sowie die gesamte bebilderte Liste. Einzelne Wörter oder alle 20 Wörter können freiwillig als gelernt markiert werden. Dabei läuft kein Timer. Ein Test bleibt jederzeit freiwillig.

Über **Test starten** öffnet sich die Auswahl:

1. **Schreiben:** Ein Bild erscheint. Das deutsche Wort wird ohne Artikel geschrieben. Groß-/Kleinschreibung, Umlaute und ß werden berücksichtigt.
2. **Hören:** Der Benutzer klickt auf **Wort anhören** und wählt eines von vier Bildern. Während des Tests werden keine Wortlösungen als Text eingeblendet.
3. **Fehlende Buchstaben:** Bild und Wort mit Lücken erscheinen. Bis 5 Zeichen fehlt ein Buchstabe, bei 6–9 Zeichen fehlen zwei, bei längeren Wörtern drei. Die Lücken sind über das Wort verteilt, meist bleiben Anfang und Ende sichtbar. Bei sehr kurzen Wörtern wie Ei bleibt wenigstens der Anfang stehen. Leerzeichen und Bindestriche werden nicht entfernt. Die Lücken werden einzeln von links nach rechts ergänzt.
4. **Buchstabensalat:** Ein Bild und gemischte Buchstabenkärtchen erscheinen. Alle Buchstaben müssen richtig angeordnet werden. Wiederholte Buchstaben haben eigene Kärtchen; Rücknahme und Neulegen sind möglich.

Dazu wählt der Benutzer **5 oder 10 Wörter** und **60, 90 oder 120 Sekunden**. Erst **Jetzt starten** zieht eine zufällige Auswahl ohne doppelte Wörter aus der gewählten Themenliste und startet den Countdown. Das Zeitlimit gilt für den gesamten Test und wird zwischen Fragen nicht zurückgesetzt. Antworten werden einmal abgegeben; die Lösungen erscheinen erst am Ende. Überspringen ist möglich.

Bei Zeitablauf endet der Test automatisch. Ein monotoner Zeitgeber und eine erneute Fristprüfung bei jeder Antwort verhindern zusätzliche Antwortzeit durch verzögerte Timer. Der Countdown berücksichtigt auch zwischenzeitlich inaktive Tabs. Das Verlassen der Testansicht bricht den Test ohne Ergebnis ab; ein Neuladen startet keinen alten Test neu.

Die Auswertung zeigt richtige, falsche, übersprungene und unbeantwortete Aufgaben, Antworten und Lösungen. Pro richtigem Wort gibt es drei Punkte. Nur richtig beantwortete Wörter werden zusätzlich als gelernt gespeichert. Auch ein abgelaufener Test bleibt als Versuch in der Statistik; unbeantwortete Wörter zählen nicht als falsch beantwortet oder gelernt. Die letzten 50 Tests bleiben browserlokal erhalten.

## Weitere Bereiche

- Deutsches Alphabet: A–Z, Ä, Ö, Ü und ß, Groß-/Kleinschreibung, Bildwörter, Buchstabennamen und 90 Übungsaufgaben. Dazu sch, ch, ei, ie, eu, au und äu.
- 12 einfache Grammatikthemen mit Erklärungen, Beispielen und 72 Aufgaben: Artikel, Einzahl/Mehrzahl, Pronomen, sein, haben, Präsens, nicht/kein, W-Fragen, Satzstellung, Ortsangaben und mein/dein.
- Fehlerwiederholung für falsch beantwortete Test-, Alphabet- und Grammatikaufgaben. Wiederholungsrunden sind zum Lernen und haben keinen Timer.
- Drei Lesegeschichten, Suche, frei wählbare Themen, Fortschritt, Lerntage, Tagesziel und Erfolge.

Die vier Testarten beziehen sich auf die Wortschatztests. Alphabet- und Grammatikübungen bleiben eigenständige Lernbereiche.

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

Playwright startet den Entwicklungsserver bei Bedarf automatisch. Die Konfiguration erwartet Chromium unter `/usr/bin/chromium`; auf anderen Systemen anpassen. Tests prüfen Inhalte, Zufallsauswahl ohne Wiederholung, alle Testarten, Länge und Position der Buchstabenlücken, alte Lernstände, Ergebnisse, Timerstart/-ablauf/-abbruch, sämtliche Zeit-/Wortanzahlkombinationen sowie mobile Darstellung.

Die Webversion liegt in `dist/`; die eigenständig öffnungsfähige ZIP liegt in `downloads/`. Direkte `file:`-Navigation ist im Cloud-Testbrowser administrativ gesperrt. Die einzelne HTML-Datei wird daher zusätzlich per HTTP mit blockierten externen Anfragen geprüft. Das Öffnen auf Schülergeräten und die Aussprache sind dort zu prüfen.

## Aufbau

- `src/data.js`: 20 Themen, jeweils 20 Wörter, browserlokaler Fortschritt.
- `src/testing.js`: vier Testarten, Stichproben, Lückenlogik, Auswertung und Ergebnis-Speicherung.
- `src/TimedTest.jsx`: zeitbegrenzter Test und Ergebnisansicht.
- `src/LearningPages.jsx`: freies Lernen, Testauswahl, Alphabet, Grammatik und Wiederholung.
- `src/grammar.js` und `src/learning.js`: weitere Lernaufgaben.
- `src/Art.jsx` und `src/ExtraArt.jsx`: SVG-Bilder, Diagramme, Farbfelder, Zahlen und Piktogramme.
- `tools/package-download.py`: ZIP mit eingebettetem Programm, Schrift und Lizenztexten.

## Medien und Einordnung

Manrope stammt aus der bereitgestellten App und steht unter SIL-OFL (`public/OFL.txt`). Es gibt keine externen Bild- oder Schriftabrufe. Vorlesen verwendet die deutsche Sprachausgabe des Browsers; Stimmen und mögliche Netzwerkverbindungen hängen vom Gerät ab. Bei einem Hörfehler wird im Test keine Lösung eingeblendet; der Benutzer kann abbrechen und eine andere Testart wählen. In freien Lernübungen ist eine Texthilfe möglich.

Diese App ist eine unabhängige Lernhilfe, kein offizielles NRW-Angebot, kein zertifizierter Sprachtest und noch nicht pädagogisch freigegeben. Die angegebene Quelle https://www.schulministerium.nrw/ferienintensivtraining-fit-deutsch konnte während der Erstellung wegen HTTP 403 nicht abgerufen werden. Offizielle Programmdetails sind daher noch nicht abgeglichen.
