import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const source=fs.readFileSync('cookie-clicker/App.luau','utf8').replaceAll('\r\n','\n');
const start=source.indexOf('text("charityHelp",state.charityPending');
const end=source.indexOf('\n                else\n                    local artW=',start);
assert(start>=0 && end>start);
const code=`
local Model={Fundraisers={{name="30 min",seconds=1800,cost=500,multiplier=1.5},{name="1 hour",seconds=3600,cost=1000,multiplier=1.8},{name="4 hours",seconds=14400,cost=2500,multiplier=2.5},{name="8 hours",seconds=28800,cost=5000,multiplier=3}}}
function Model.fundraiserCost(_,index)return Model.Fundraisers[index].cost end
local function render(balance,charity,now,pending,friends,width)
 local state={charityPending=pending,serverNow=now,socialPlayers=friends or {},playerId=1}
 local economy={jar=balance,charity=charity}
 local pane,y,w={},8,width-48
 local controls,labels,requests={},{},{}
 local workPage={"Charity"};workPage[2]=function(v)workPage[1]=v end
 local function number(n)return tostring(math.floor(n))end
 local function label(id,value,...)labels[id]=value;return {}end
 local function picture(...)return {}end
 local function box(id,x,y,width,height,color,children)return {}end
 local function text(...)end
 local function send(...)table.insert(requests,{...})end
 local function button(id,title,x,y,width,height,callback)
  assert(width>0 and height>=40,"usable controls")
  controls[id]={title=title,click=callback};return {}
 end
 ${source.slice(start,end)}
 return controls,labels,requests,workPage
end
for _,width in {320,401,600,900} do
 for tier=1,4 do
  local c,l,r=render(Model.Fundraisers[tier].cost,nil,100,false,nil,width)
  c["startCharity"..tier].click()
  assert(#r==1 and r[1][1]=="fundraiser" and r[1][2]=="start" and r[1][3]==tier)
 end
 local c,l,r,page=render(499,nil,100,false,nil,width)
 c.startCharity1.click();assert(#r==0 and page[1]=="Jar")
 c,l,r=render(500,nil,100,true,nil,width);c.startCharity1.click();assert(#r==0)
 local charity={tier=1,endsAt=200,pot=750}
 c,l,r=render(0,charity,199,false,nil,width);c.claimCharity.click();assert(#r==0 and l.partyTime=="1 min left")
 c,l,r=render(0,charity,200,false,nil,width);c.claimCharity.click();assert(r[1][2]=="claim" and l.partyTime=="Ready!")
 c,l,r=render(0,charity,201,true,nil,width);c.claimCharity.click();assert(#r==0)
 c,l,r=render(0,charity,100,false,{{id=1,name="Self",endsAt=200,pot=750},{id=2,name="Friend",endsAt=200,pot=750},{id=3,name="Expired",endsAt=100,pot=750}},width)
 assert(not c.helpCharity1 and not c.helpCharity3)
 c.helpCharity2.click();c.stealCharity2.click()
 assert(r[1][1]=="charity" and r[1][2]=="help" and r[1][3]==2)
 assert(r[2][2]=="steal" and r[2][3]==2)
end
print("PASS charity view: four tiers, affordability, pending saves, exact claim boundary, self/expired exclusion and friend action targets at four widths")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-charity-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const r=spawnSync(process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau'),[file],{encoding:'utf8'});
 if(r.error)throw r.error;
 process.stdout.write(r.stdout);process.stderr.write(r.stderr);assert.equal(r.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
