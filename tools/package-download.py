"""Package the Vite build as an HTML app that opens directly from a ZIP."""
from pathlib import Path
import base64
import json
import re
import zipfile

root = Path(__file__).resolve().parent.parent
html = (root / 'dist/index.html').read_text()
js_path = re.search(r'<script[^>]*src="([^"]+)"[^>]*></script>', html).group(1)
css_path = re.search(r'<link[^>]*href="([^"]+)"[^>]*>', html).group(1)
js = (root / 'dist' / js_path.lstrip('/')).read_text()
css = (root / 'dist' / css_path.lstrip('/')).read_text()
font = base64.b64encode((root / 'public/manrope-latin.woff2').read_bytes()).decode()
css = css.replace('/manrope-latin.woff2', 'data:font/woff2;base64,' + font)
html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', lambda _: '<script type="module">' + js.replace('</script', '<\\/script') + '</script>', html)
html = re.sub(r'<link[^>]*href="[^"]+"[^>]*>', lambda _: '<style>' + css + '</style>', html)
notes = '''Fit in Deutsch – direkt starten

1. Die ZIP vollständig entpacken.
2. index.html in einem aktuellen Browser öffnen.

Keine Installation und kein Konto nötig. Bilder und Schrift sind enthalten.
Zum Vorlesen benötigt dein Browser eine deutsche Stimme; je nach Gerät kann
hierfür Internet nötig sein. Dein Fortschritt bleibt in diesem Browser.
Bei lokalen Dateien kann die Speicherung je nach Browser eingeschränkt sein.

Neu: 15 Lesegeschichten in 3 Stufen, Lesenhelfer und zwei 5-Tage-Pläne.
Texte, Fragen und vollständige Tagesmaterialien lassen sich über die
Druckansicht direkt als PDF herunterladen oder ausdrucken. Ein Lösungsblatt
kann bei Bedarf angehängt werden. Für den PDF-Download ist kein Internet nötig.

Dies ist ein unabhängiger Prototyp und kein offizielles NRW-Angebot.
'''
licenses = [('Manrope-OFL.txt', root / 'public/OFL.txt'), ('Manrope-PDF-OFL.txt', root / 'public/Manrope-PDF-OFL.txt')]
# Include license/notice files for all production dependencies, including the
# PDF library and its optional bundled modules. Do not ship development tools.
lock = json.loads((root / 'package-lock.json').read_text())
for location, entry in lock['packages'].items():
    if not location or entry.get('dev'):
        continue
    package = root / location
    name = location.replace('node_modules/', '').replace('/', '_')
    for path in sorted(package.iterdir()):
        if path.is_file() and path.name.lower().startswith(('license', 'licence', 'copying', 'notice', 'copyright')):
            licenses.append((name + '/' + path.name, path))
(root / 'downloads').mkdir(exist_ok=True)
with zipfile.ZipFile(root / 'downloads/Fit-in-Deutsch.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    archive.writestr('Fit-in-Deutsch/index.html', html)
    archive.writestr('Fit-in-Deutsch/STARTEN.txt', notes)
    for name, path in licenses:
        archive.write(path, 'Fit-in-Deutsch/Lizenzen/' + name)
print('Created downloads/Fit-in-Deutsch.zip')
