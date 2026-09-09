import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const source=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=source.indexOf('local gain=Model.ascensionGain(state)');
const end=source.indexOf('elseif adventurePage[1]=="Boosts"',start);
assert(start>=0 && end>start);
const code=`
local function render(gain,confirmed,width)
 local state={prestige=3,chips=2}
 local Model={ascensionGain=function()return gain end,starGoal=function(stars)return stars^4*1e11 end,starMultiplier=function(stars)return 1+stars*.05 end,Balance={RebirthCookies=1e11,StarProductionBonus=.05,StarBonusSoftcap=100}}
 local pane,y,w={},0,width-48
 local controls,labels,requests={},{},{}
 local confirmFresh={confirmed};confirmFresh[2]=function(value)confirmFresh[1]=value end
 local function number(value)return tostring(value)end
 local function text(id,value)labels[id]=value end
 local function label(id,value,x,y,w,h)assert(w>0);labels[id]=value;return {}end
 local function picture(...)return {}end
 local function box(...)return {}end
 local function send(...)table.insert(requests,{...})end
 local function button(id,title,x,y,w,h,callback)controls[id]={click=callback};return {}end
 ${source.slice(start,end)}
 return controls,labels,requests,confirmFresh
end
for _,width in {320,401,600,900} do
 for _,confirmed in {false,true} do
  local c,l,r,state=render(0,confirmed,width)
  c.ascendBakery.click();assert(#r==0,"zero reward cannot ascend")
 end
 local c,l,r,state=render(2,false,width)
 c.ascendBakery.click();assert(#r==0 and state[1],"first click only requests confirmation")
 c,l,r,state=render(2,true,width)
 assert(l.freshDetails:find("wrinklers") and l.freshDetails:find("ingredients"))
 c.cancelAscend.click();assert(#r==0 and not state[1],"cancel preserves bakery")
 c,l,r,state=render(2,true,width)
 c.ascendBakery.click()
 assert(#r==1 and r[1][1]=="advanced" and r[1][2]=="ascend" and not state[1])
end
print("PASS ascension view: zero reward blocked, first click confirms, cancel sends nothing, explicit confirmation sends reset at four widths")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-ascension-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const result=spawnSync(process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau'),[file],{encoding:'utf8'});
 if(result.error)throw result.error;
 process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
