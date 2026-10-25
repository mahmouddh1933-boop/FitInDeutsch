# Fit in Deutsch – Erklärvideo

Vollständiger deutschsprachiger Rundgang durch die App, Version 0.6.0: 48 einzeln erklärte Funktionen, echte App-Ansichten, deutsche synthetische Sprecherstimme, Untertitel, Kapitel und selbst erzeugte Hintergrundmusik. Die Schülerdaten stammen aus einer neu angelegten Demo-Browsersitzung. App-Code und Benutzerfortschritt werden nicht verändert.

## Fertige Dateien

- `downloads/Fit-in-Deutsch-Erklaervideo.mp4`: Full HD, H.264/AAC, eingebettete Kapitel und sichtbare Untertitel.
- `downloads/Fit-in-Deutsch-Untertitel.srt`: Untertitel separat.
- `downloads/Fit-in-Deutsch-Kapitel.txt`: Zeitmarken aller Funktionen.
- `downloads/Fit-in-Deutsch-Videovorschau.jpg`: Vorschaubild.

Der Film verwendet animierte Originalansichten und Vorher/Nachher-Zustände. Zeitgeber wurden nur während der Demo-Aufnahme angehalten; die Funktionsweise der App bleibt unverändert. Die Beispiele werden durch echte Klicks und Eingaben erzeugt. Die eingeblendeten Listen erklären jeweils den Bedienablauf. Zusätzliche Animationen und Hervorhebungen gehören zum Video.

## Erneut erstellen

Zur zusätzlichen Wiedergabeprüfung bei laufendem Entwicklungsserver `node video/check-browser.mjs` ausführen.

Voraussetzungen: Node.js und die Projektabhängigkeiten, Chromium, Python mit Pillow/NumPy und `piper-tts`, FFmpeg mit libx264/libass und DejaVu Sans. Arbeitsdateien werden standardmäßig unter `/tmp/fit-video` angelegt (`FIT_VIDEO_WORK` überschreibt den Ort).

Die fertige Version dauert etwa elf Minuten. `python3 video/verify.py` prüft Format, Kapitelzeiten, Untertitel-Stichproben und die vollständige Dekodierung.

Die lokale deutsche Stimme ist **Thorsten medium**, Piper-Modell, Datensatz CC0. Bezugsquelle des Modells einschließlich Model Card:

https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-de_DE-thorsten-medium.tar.bz2

Entpacken nach `/tmp/fit-video`, sodass dort `vits-piper-de_DE-thorsten-medium/de_DE-thorsten-medium.onnx` liegt. Das Modell wird nicht im Repository ausgeliefert. Piper steht unter GPL-3.0, ONNX Runtime unter MIT; die Werkzeuge werden hier nur lokal zur Produktion verwendet, nicht im App-Download eingebettet. Stimmenprojekt: https://github.com/thorstenMueller/Thorsten-Voice. Die Verwendung der frei bereitgestellten synthetischen Stimme bedeutet keine Empfehlung der App durch den Sprecher.

```sh
mkdir -p /tmp/fit-video/{screens,audio,frames,clips}
npm run dev -- --port 5173
# In einer weiteren Shell:
node video/capture.mjs
python3 video/narrate.py
python3 video/render.py
```

`storyboard.json` enthält alle Sprechertexte, Titel, Hinweise und Bildzustände. `capture.mjs` öffnet die App in einer isolierten Browsersitzung und erfasst 86 originale Zustände. `narrate.py` synthetisiert Sätze einzeln, damit Untertitel und Ton zeitlich zusammenpassen. `render.py` baut die Gestaltung, langsame Kamerafahrten, Überblendungen, Untertitel und Kapitel auf. Es komponiert eine eigene ruhige Instrumentalbegleitung aus synthetischen Klängen, ohne fremde Musikaufnahmen oder Melodien zu verwenden. Schrift: Manrope (SIL OFL, siehe `public/Manrope-PDF-OFL.txt`) und DejaVu Sans. Es werden nur gerasterte Darstellungen der Schriften im Film ausgegeben.

Zum reinen Prüfen der Gestaltung `FIT_VIDEO_COMPOSE_ONLY=1 python3 video/render.py` ausführen. Fertige temporäre Kapitel-Clips werden bei erneutem Rendern wiederverwendet; nach Änderungen an Bildgestaltung oder Timing das Verzeichnis `clips` leeren. Der abschließende Film wird immer neu erstellt.
