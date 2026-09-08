"""Refresh the existing test place from a freshly built .studio-stage tree.

Preserves world objects and unrelated scripts. Run npm run cookie:build first.
Every copied Source is checked after serialization before replacing the place.
"""
from pathlib import Path
import xml.etree.ElementTree as ET
import uuid

ROOT = Path(__file__).resolve().parent.parent
STAGE = ROOT / '.studio-stage'
PLACE = ROOT / 'cookie-animation-test.rbxlx'
tree = ET.parse(PLACE)
root = tree.getroot()
expected = {}


def name(item):
    return item.findtext('./Properties/string[@name="Name"]')


def child(parent, title, kind):
    matches = [item for item in parent.findall('Item') if name(item) == title]
    if len(matches) > 1:
        raise RuntimeError(f'Duplicate place object: {title}')
    if matches:
        return matches[0]
    item = ET.SubElement(parent, 'Item', {'class': kind, 'referent': 'RBX' + uuid.uuid4().hex})
    properties = ET.SubElement(item, 'Properties')
    ET.SubElement(properties, 'string', {'name': 'Name'}).text = title
    return item


def source(item, path):
    if item.get('class') not in ('ModuleScript', 'Script', 'LocalScript'):
        raise RuntimeError(f'Cannot write source to {name(item)} ({item.get("class")})')
    properties = item.find('Properties')
    value = properties.find('ProtectedString[@name="Source"]')
    if value is None:
        value = ET.SubElement(properties, 'ProtectedString', {'name': 'Source'})
    value.text = path.read_text(encoding='utf-8')
    expected[item.get('referent')] = value.text


def sync(directory, parent, ts=False):
    for path in sorted(directory.iterdir()):
        if path.is_dir():
            kind = 'ModuleScript' if ts and (path / 'init.luau').exists() else 'Folder'
            sync(path, child(parent, path.name, kind), ts)
        elif path.suffix in ('.luau', '.lua'):
            if path.stem == 'init':
                # Staging includes placeholder init modules for plain folders.
                if parent.get('class') == 'ModuleScript':
                    source(parent, path)
                continue
            title = path.stem
            kind = 'ModuleScript'
            for suffix, cls in (('.client', 'LocalScript'), ('.server', 'Script')):
                if title.endswith(suffix):
                    title, kind = title[:-len(suffix)], cls
                    break
            source(child(parent, title, kind), path)


replicated = child(root, 'ReplicatedStorage', 'ReplicatedStorage')
for folder, title, kind in (
    ('include', 'rbxts_include', 'Folder'),
    ('node_modules', 'node_modules', 'Folder'),
    ('TS', 'TS', 'ModuleScript'),
    ('CookieClicker', 'CookieClicker', 'Folder'),
):
    sync(STAGE / folder, child(replicated, title, kind), folder == 'TS')
for title in ('ToilRuntime', 'ImageConfig', 'Images2Config', 'CookieBackgrounds', 'MenuButtonConfig'):
    source(child(replicated, title, 'ModuleScript'), STAGE / (title + '.luau'))
sync(STAGE / 'ServerScriptService', child(root, 'ServerScriptService', 'ServerScriptService'))
starter = child(root, 'StarterPlayer', 'StarterPlayer')
sync(STAGE / 'StarterPlayerScripts', child(starter, 'StarterPlayerScripts', 'StarterPlayerScripts'))

temporary = PLACE.with_suffix('.refresh.rbxlx')
tree.write(temporary, encoding='utf-8', xml_declaration=True)
actual = {
    item.get('referent'): item.findtext('./Properties/ProtectedString[@name="Source"]')
    for item in ET.parse(temporary).getroot().iter('Item')
}
assert all(actual.get(key) == value for key, value in expected.items()), 'Serialized source mismatch'
temporary.replace(PLACE)
print(f'Refreshed and verified {len(expected)} scripts in {PLACE.name}')
