import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const app=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=app.indexOf('for _,boost in Model.HeavenlyBoosts do');
const end=app.indexOf('if state.heavenly.slot then',start);
assert(start>=0 && end>start);
const model=fs.readFileSync('cookie-clicker/LateGame.luau','utf8');
const definitions=model.slice(model.indexOf('Model.HeavenlyBoosts='),model.indexOf('local boostsById'));
const code=`
local Model={}
${definitions}
local function render(chips,owned,width)
 local state={chips=chips,heavenly=owned}
 local pane,y,w={},0,width-48
 local viewCache={}
 local uiFont="Arial"
 local function remember(_,_,_,build)return build()end
 local controls,requests={},{}
 local function picture(...)return {}end
 local function label(...)return {}end
 local function box(...)return {}end
 local function send(...)table.insert(requests,{...})end
 local function button(id,title,x,y,w,h,callback)
  assert(w>0 and h>=44);controls[id]={title=title,click=callback};return {}
 end
 ${app.slice(start,end)}
 return controls,requests
end
for _,width in {320,359,600,900} do
 for _,boost in Model.HeavenlyBoosts do
  local c,r=render(0,{},width);c['heavenly_'..boost.id].click();assert(#r==0)
  local owned={}
  if boost.requires then
   c,r=render(1000,owned,width);c['heavenly_'..boost.id].click();assert(#r==0)
   owned[boost.requires]=true
  end
  c,r=render(boost.cost,owned,width);c['heavenly_'..boost.id].click()
  assert(#r==1 and r[1][1]=='advanced' and r[1][2]=='heavenly' and r[1][3]==boost.id)
  owned[boost.id]=true;c,r=render(1000,owned,width)
  assert(c['heavenly_'..boost.id].title=='Owned!')
  c['heavenly_'..boost.id].click();assert(#r==0)
 end
end
${app.slice(app.indexOf('local suffixes ='),app.indexOf('local function style('))}
for _,n in {0,999,1e6,1e15,1e33,1e36,1e98,1e100} do assert(#number(n,true)<32,'number overflows UI') end
print('PASS all nine boost cards: affordability, prerequisites, purchase targets, owned controls and large-number formatting')
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-boosts-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const result=spawnSync(process.env.LUAU_BIN || path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau'),[file],{encoding:'utf8'});
 if(result.error)throw result.error;
 process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
