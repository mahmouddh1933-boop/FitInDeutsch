# Fit in Deutsch – bildreich lernen

Eigenständiger, deutschsprachiger App-Prototyp, inspiriert vom Lernprinzip der vom Nutzer bereitgestellten Huroof-App: Lernweg, Lernkarten, Hören, Bildzuordnung, Satzbau, kurze Geschichten und persönlicher Fortschritt. Die arabischen Inhalte, Übersetzungen und Firebase-Konfiguration der Vorlage wurden nicht übernommen.

## App herunterladen – ohne Installation

[Fit-in-Deutsch.zip herunterladen](https://github.com/mahmouddh1933-boop/FitInDeutsch/raw/refs/heads/main/downloads/Fit-in-Deutsch.zip). Die ZIP entpacken und `index.html` im Browser öffnen. Bilder, Programm und Schrift sind eingebettet. Für das Vorlesen wird eine deutsche Browserstimme benötigt.

Das Downloadpaket wird nach `npm run build` mit `python3 tools/package-download.py` erstellt.

## Quellcode starten

Voraussetzung: Node.js 22.12 oder neuer (geprüft mit Node.js 24).

```sh
cd /workspace/FitInDeutsch
npm ci --cache /tmp/fit-npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

## Inhalte

- 6 Themenwelten: Schule, Essen, Stadt, Menschen, Natur, Zuhause.
- 24 lokal gezeichnete SVG-Bildmotive mit deutschen Nomen und Artikeln.
- Jede Lektion: 4 Wortkarten, 4 Bildzuordnungen, 4 Hörzuordnungen und ein Satzbau mit Fehlerkorrektur.
- 3 kurze Lesegeschichten mit Vorlesen und Verständnisfrage.
- Offener Lernweg, Themensuche, Wortschatzliste, Lerntage, Wochenübersicht, Tagesziel und 4 Erfolge.
- Fortschritt im lokalen Browser, ohne Anmeldung oder Backend. Wiederholungen geben Lernpunkte und zählen zum Tagesziel; Wörter und Themen werden nur einmal gezählt.
- Responsive Oberfläche, Tastaturbedienung, Dialogfokus und reduzierte Bewegung.

Die Schrift Manrope stammt aus der bereitgestellten App; die SIL-OFL-Lizenz liegt in `public/OFL.txt`. Alle Illustrationen sind lokale SVG-Komponenten in `src/Art.jsx`. Es gibt keine externen Schrift- oder Bildabrufe. Vorlesen verwendet die Web Speech API; Verfügbarkeit, Stimmen und gegebenenfalls Netzwerkverbindungen hängen vom Browser und Gerät ab. Bei einem gemeldeten Sprachausgabefehler zeigt die Hörübung das Zielwort als Alternative. Die Aussprache muss auf den vorgesehenen Schülergeräten geprüft werden.

## Prüfen und bauen

```sh
npm test
npm run build
npx playwright test
```

Die Browsertests erwarten einen laufenden Entwicklungsserver auf Port 5173 und Chromium unter `/usr/bin/chromium`. Bei anderen Systemen `playwright.config.js` an den installierten Browser anpassen. Die Tests prüfen einen vollständigen Lernablauf inklusive Fehlerkorrektur und Speicherung, Suche, Lernweg, Geschichten, Dialogbedienung und Mobilansicht. Die erzeugte Webseite liegt in `dist/` und kann auf einem statischen Hosting veröffentlicht werden. Der Quellcode benötigt den beschriebenen Build-Schritt.

## Einordnung und Grenzen

Dies ist eine erste funktionsfähige Lernhilfe, kein vollständiger Ersatz aller Module der Huroof-App und kein offizielles Angebot des Landes NRW. Die Inhalte sind erste Beispiele, ohne bescheinigtes Sprachniveau oder pädagogische Freigabe. Die Wörter im Fortschritt bedeuten bearbeitete Lerninhalte, keine bestätigte Sprachbeherrschung.

Die angegebene Informationsquelle ist https://www.schulministerium.nrw/ferienintensivtraining-fit-deutsch. Der Abruf wurde am 24.10.2026 durch die Netzwerkverbindung mit HTTP 403 blockiert; Programmdetails konnten daher noch nicht geprüft werden. Die Domainanforderung wurde in der Umgebung gespeichert. Nach Freischaltung muss die Quelle geprüft werden, bevor Aussagen zu Fördervorgaben, Zielgruppen oder Kursgestaltung übernommen werden.

Die App enthält bislang keine Lehrkraftverwaltung, Konten, Cloud-Synchronisierung, Einstufungstests oder umfassenden Grammatik- und Alphabetkurse. Die drei Geschichten sind freies Übungsmaterial und geben keine Lernpunkte.
