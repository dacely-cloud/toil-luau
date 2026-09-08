import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const source=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=source.indexOf('local unlocked=state.buildings[8]>0');
const end=source.indexOf('elseif adventurePage[1]=="Seasons"',start);
assert(start>=0 && end>start);
const code=`
local function render(towers,magic,width)
 local state={buildings={[8]=towers},magic=magic}
 local pane,y,w={},0,width-48
 local controls,labels,requests,images={},{},{},{}
 local function label(id,value,x,y,w,h)assert(w>0 and h>0);labels[id]=value;return {}end
 local function picture(id,asset)images[asset]=true;return {}end
 local function box(id,x,y,w,h,color,children)assert(w>=0 and h>0);return {}end
 local function send(...)table.insert(requests,{...})end
 local function button(id,title,x,y,w,h,callback)
  assert(w>=44 and h>=44);controls[id]={title=title,click=callback};return {}
 end
 ${source.slice(start,end)}
 return controls,labels,requests,images
end
for _,width in {320,401,600,900} do
 for _,magic in {0,39.9,40,59.9,60,100} do
  local c,l,r,images=render(0,magic,width)
  c.spellLucky.click();c.spellCookies.click()
  assert(#r==0 and c.spellLucky.title=="Need a wizard tower")
  c,l,r,images=render(1,magic,width)
  c.spellLucky.click();c.spellCookies.click()
  assert(images.CookieWizardTower and images.GoldenCookie and images.Cookie)
  assert(l.magicAmount==math.floor(magic).." / 100 magic")
  assert(#r==(magic>=60 and 2 or magic>=40 and 1 or 0))
  if magic>=40 then assert(r[1][1]=="advanced" and r[1][2]=="spell" and r[1][3]=="lucky")end
  if magic>=60 then assert(r[2][3]=="cookies")end
  if magic==39.9 then assert(c.spellLucky.title=="Ready in 1s")end
  if magic==59.9 then assert(c.spellCookies.title=="Ready in 1s")end
 end
end
print("PASS magic view: tower unlock, exact spell thresholds, countdowns, configured artwork, request targets and four widths")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-magic-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const r=spawnSync(process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau'),[file],{encoding:'utf8'});
 if(r.error)throw r.error;
 process.stdout.write(r.stdout);process.stderr.write(r.stderr);assert.equal(r.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
