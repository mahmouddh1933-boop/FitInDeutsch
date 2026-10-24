"""Package the Vite build as an HTML app that opens directly from a ZIP."""
from pathlib import Path
import base64
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

Dies ist ein unabhängiger Prototyp und kein offizielles NRW-Angebot.
'''
licenses = [('Manrope-OFL.txt', root / 'public/OFL.txt'), ('React-LICENSE.txt', root / 'node_modules/react/LICENSE'), ('ReactDOM-LICENSE.txt', root / 'node_modules/react-dom/LICENSE'), ('Lucide-LICENSE.txt', root / 'node_modules/lucide-react/LICENSE')]
(root / 'downloads').mkdir(exist_ok=True)
with zipfile.ZipFile(root / 'downloads/Fit-in-Deutsch.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    archive.writestr('Fit-in-Deutsch/index.html', html)
    archive.writestr('Fit-in-Deutsch/STARTEN.txt', notes)
    for name, path in licenses:
        archive.write(path, 'Fit-in-Deutsch/Lizenzen/' + name)
print('Created downloads/Fit-in-Deutsch.zip')
