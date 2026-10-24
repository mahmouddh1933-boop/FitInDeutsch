# Fit in Deutsch – bildreich lernen

Deutschsprachige Lern-App für Schülerinnen und Schüler, inspiriert vom Lernprinzip der bereitgestellten Huroof-App: kleine Lernschritte, Wortkarten, verschiedene Aufgaben, Satzbau, Geschichten, Grammatik und persönlicher Fortschritt. Arabische Inhalte, Übersetzungen und Firebase-Konfiguration wurden nicht übernommen.

## App herunterladen – ohne Installation

[Fit-in-Deutsch.zip herunterladen](https://github.com/mahmouddh1933-boop/FitInDeutsch/raw/refs/heads/main/downloads/Fit-in-Deutsch.zip). Die ZIP entpacken und `index.html` im Browser öffnen. Programm, SVG-Bilder und Schrift sind eingebettet. Piktogramme werden über die Emoji-Schrift des Geräts angezeigt. Zum Vorlesen wird eine deutsche Browserstimme benötigt.

Das Downloadpaket wird mit `npm run build` und anschließend `python3 tools/package-download.py` erstellt. In dieser Cloud ist die direkte Navigation zu lokalen `file:`-Adressen durch die Browserverwaltung gesperrt. Das einzelne HTML-Dokument wird deshalb auch per HTTP mit gesperrten Zusatzanfragen funktional geprüft. Das lokale Öffnen und die verfügbare deutsche Stimme sollten auf den Schülergeräten getestet werden.

## Was enthalten ist – Version 0.2

- **20 Themen mit 240 unterschiedlichen Wortschatzeinträgen**: Schule, Essen, Stadt, Menschen, Natur, Zuhause, Tiere, Kleidung, Körper, Obst, Gemüse, Verkehr, Sport, Freizeit, Wetter, Berufe, Farben, Zahlen, Gefühle und Alltagshelfer.
- **60 kleine Lektionen** mit je 4 Wortkarten, Bildzuordnung, Hörzuordnung und Satzbau; 60 unterschiedliche Beispielsätze. Die Themenkarte öffnet die nächste noch nicht bearbeitete Lektion.
- **7 zusätzliche Wortschatzübungen**: Bild & Wort, fehlender Buchstabe, Buchstabensalat, Artikel, Wort schreiben, Hören & erkennen sowie richtig oder falsch. Insgesamt 1.644 Aufgabenvarianten. Satzbau kommt in den Lektionen dazu.
- **Deutsches Alphabet**: A–Z, Ä, Ö, Ü und ß mit Groß-/Kleinschreibung, Buchstabennamen, Bildbeispielen und Vorlesen. 90 Aufgaben in drei Übungsarten, aufgeteilt in kleine Runden: Groß & klein, Buchstaben ergänzen und Buchstaben hören. Dazu sch, ch, ei, ie, eu, au und äu mit Hörbeispielen.
- **12 einfache Grammatikthemen mit 72 Aufgaben**: bestimmte und unbestimmte Artikel, Einzahl/Mehrzahl, Personalpronomen, sein, haben, Präsens, nicht/kein, W-Fragen, Satzstellung, Ortsangaben und mein/dein. Jedes Thema enthält eine Erklärung und Beispiele; jede Frage gibt erklärendes Feedback.
- **Fehler wiederholen**: falsch beantwortete Aufgaben aus Wortschatz, Alphabet und Grammatik bleiben browserlokal gespeichert. Wiederholungsrunden enthalten bis zu 6 Aufgaben. Erst eine vollständig abgeschlossene Wiederholungsrunde entfernt ihre Aufgaben aus der Sammlung.
- 3 Lesegeschichten mit Vorlesen und Verständnisfragen, Themensuche, Wortsuche, Lernweg, Wortschatzliste, Wochenübersicht, Tagesziel und Erfolge.
- Responsive Darstellung für Handy und Computer, Tastaturbedienung und Dialogfokus.

Die Artikelübung erscheint nur bei Themen mit Nomen. Farben, Zahlen und Gefühle werden ohne erfundenen Artikel gelernt. Buchstabensalat verwendet einzelne Kärtchen mit eigenen Kennungen, damit mehrfach vorkommende Buchstaben erhalten bleiben. Umlaute und ß bleiben erhalten; ß wird beim Prüfen nicht durch ss ersetzt.

## Fortschritt und ältere Lernstände

Alle Daten bleiben im selben Browser unter `fit-deutsch-progress`; es gibt keine Anmeldung und kein Backend. Bestehende Lernstände der ersten Version werden erweitert, nicht gelöscht. Eine frühere Vier-Wort-Lektion zählt weiterhin als erste Lektion des erweiterten Themas. Erst alle drei Lektionen zusammen schließen das Thema ab.

Lektionen geben 30 Punkte und fügen ihre vier Wörter dem bearbeiteten Lernwortschatz hinzu. Zusätzliche Übungsrunden geben 15 Punkte und zählen zum Tagesziel; sie tragen nicht pauschal Wörter oder ganze Themen als gelernt ein. Wiederholungen können erneut Punkte geben. Die Statistik beschreibt bearbeitete Lerninhalte und keine bestätigte Sprachbeherrschung.

## Quellcode starten

Voraussetzung: Node.js 22.12 oder neuer (geprüft mit Node.js 24).

```sh
cd /workspace/FitInDeutsch
npm ci --cache /tmp/fit-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

## Prüfen und bauen

```sh
npm test
npm run build
npx --cache /tmp/fit-npm-cache playwright test
python3 tools/package-download.py
```

Browsertests erwarten einen laufenden Entwicklungsserver auf Port 5173 und Chromium unter `/usr/bin/chromium`. Auf anderen Systemen `playwright.config.js` an den installierten Browser anpassen. Tests prüfen die Datenbanken, Wort- und Buchstabenintegrität, alte Lernstände, vollständige Lern- und Übungsrunden, Fehlerkorrektur und Wiederholung, Grammatik, Speicherung, Suche und Mobilansichten. Die erzeugte Webseite liegt in `dist/` und kann auf einem statischen Hosting veröffentlicht werden.

## Aufbau und Medien

- `src/data.js`: Themen, Wortschatz, Lektionen und Fortschritt.
- `src/learning.js`: sieben Wortschatzmodi, Alphabet und Buchstabenaufgaben.
- `src/grammar.js`: Erklärungen, Beispiele und Grammatikaufgaben.
- `src/LearningPages.jsx`: gemeinsame Aufgabenoberfläche sowie Wortschatz-, Alphabet-, Grammatik- und Wiederholungsbereiche.
- `src/Art.jsx`: SVG-Zeichnungen, Farbfelder, Zahlen und Piktogramme.
- `tools/package-download.py`: eigenständig öffnungsfähiges Downloadpaket mit Schrift und Lizenztexten.

Die Schrift Manrope stammt aus der bereitgestellten App; die SIL-OFL-Lizenz liegt in `public/OFL.txt`. Es gibt keine externen Schrift- oder Bildabrufe. Die Emoji-Darstellung hängt vom Gerät ab. Vorlesen verwendet die Web Speech API; verfügbare Stimmen und mögliche Netzwerkverbindungen hängen vom Gerät ab. Bei gemeldeten Sprachausgabefehlern wird das Hörwort zusätzlich angezeigt. Die Aussprache muss auf den vorgesehenen Geräten geprüft werden.

## Einordnung

Dies ist eine unabhängige Lernhilfe und kein offizielles NRW-Angebot oder vollständiger Ersatz aller Huroof-Module. Die Lerninhalte sind noch nicht pädagogisch freigegeben. Es gibt keine zertifizierte Einstufung, Lehrkraftverwaltung, Konten oder Cloud-Synchronisierung.

Die angegebene Informationsquelle ist https://www.schulministerium.nrw/ferienintensivtraining-fit-deutsch. Ihr Abruf war während der Erstellung mit HTTP 403 blockiert; offizielle Programmdetails konnten nicht geprüft werden. Die drei Geschichten sind freies Übungsmaterial und verändern die Lernpunkte nicht.
