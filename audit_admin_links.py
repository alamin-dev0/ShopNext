import os, re
from pathlib import Path
folder = Path('admin')
files = sorted(folder.glob('*.html'))
print('HTML files:', len(files))
for f in files:
    text = f.read_text(encoding='utf-8', errors='ignore')
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', text)
    broken = []
    for h in hrefs:
        if h.startswith(('http:', 'https:', 'mailto:', '#', '../', 'javascript:')):
            continue
        target = (folder / h).resolve()
        # If target is within same folder and named a file
        if not target.exists() or not target.is_file():
            broken.append(h)
    if broken:
        print('FILE:', f.name)
        for b in sorted(set(broken)):
            print('  BROKEN:', b)
print('Audit done')
