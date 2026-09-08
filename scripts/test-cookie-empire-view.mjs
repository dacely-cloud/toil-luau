import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const source=fs.readFileSync('cookie-clicker/App.luau','utf8').replaceAll('\r\n','\n');
const start=source.indexOf('local empire=state.empire');
const end=source.indexOf('elseif workPage[1]=="Charity" then',start);
assert(start>=0 && end>start);
const code=`
local function render(empire,stamina,pending,friends,width,editing)
 local state={empire=empire,empirePending=pending,playerId=1,socialPlayers=friends}
 local economy={stamina=stamina}
 local ImageNames={badges={cookie="Cookie",crown="CookieCrown",star="GoldenCookie",heart="Cookie",shield="CookieJar",bakery="CookieStore"}}
 local function hook(value)local h={value};h[2]=function(v)h[1]=v end;return h end
 local empireEdit,empireBadge,empireNameDraft=hook(editing),hook("cookie"),{current="Cookie Team"}
 local pane,y,w={},8,width-48
 local controls,labels,requests,images={},{},{},{}
 local function number(n)return tostring(n)end
 local function label(id,value,...)labels[id]=value;return {}end
 local function text(id,value,height)labels[id]=value;y+=(height or 60)+8 end
 local function picture(id,asset,...)table.insert(images,asset);return {}end
 local function box(id,x,y,width,height,color,children)assert(width>=0 and height>0);return {}end
 local function style(...)return {}end
 local function e(tag,props)controls[props.id]=props;return {}end
 local function send(...)table.insert(requests,{...})end
 local function button(id,title,x,y,width,height,callback)
  assert(width>=44 and height>=44,"small hit target: "..id)
  assert(not controls[id],"duplicate control "..id)
  controls[id]={title=title,click=callback};return {}
 end
 ${source.slice(start,end)}
 return controls,labels,requests,images,empireBadge
end
local function team(owner,level,points)
 return {id=owner,name="Cookie Team",badge="crown",level=level,points=points,members=2}
end
for _,width in {320,401,600,900} do
 local c,l,r,images,badge=render(nil,100,false,{
  {empireId=2,empireName="First",empireBadge="crown"},
  {empireId=2,empireName="First",empireBadge="crown"},
  {empireId=3,empireName="Second",empireBadge="shield"},
 },width,false)
 assert(c.joinEmpire2 and c.joinEmpire3 and not c.donateEmpire10)
 c.joinEmpire2.click();c.joinEmpire3.click()
 assert(r[1][2]=="join" and r[1][3]==2 and r[2][3]==3)
 c.empireNameInput.onChange({value="New Team"});c.badgestar.click()
 -- State setters become visible on the next render, as in React.
 assert(badge[1]=="star")
 c.saveEmpire.click();assert(r[3][2]=="create" and r[3][3]=="New Team")
 for _,pending in {false,true} do
  c,l,r=render(team(1,2,200),25,pending,{},width,true)
  assert(c.editEmpire and not c.leaveEmpire)
  c.donateEmpire10.click();c.donateEmpire25.click();c.donateEmpire50.click()
  c.upgradeEmpire.click();c.saveEmpire.click()
  if pending then assert(#r==0,"pending save allowed mutation")
  else
   assert(#r==4 and r[1][2]=="donate" and r[1][3]==10 and r[2][3]==25)
   assert(r[3][2]=="upgrade" and r[3][3]==2 and r[4][2]=="rename")
  end
  c,l,r=render(team(2,2,200),100,pending,{},width,false)
  assert(not c.upgradeEmpire and not c.editEmpire and c.leaveEmpire)
  c.leaveEmpire.click();assert(#r==(pending and 0 or 1))
  c,l,r=render(nil,100,pending,{{empireId=2,empireName="Team"}},width,false)
  c.saveEmpire.click();c.joinEmpire2.click();assert(#r==(pending and 0 or 2))
 end
 c,l,r=render(team(1,2,199),9,false,{},width,false)
 c.upgradeEmpire.click();c.donateEmpire10.click();assert(#r==0)
 assert(c.upgradeEmpire.title=="Need 1 more points")
 c,l,r=render(team(1,100,10000),100,false,{},width,false)
 assert(not c.upgradeEmpire and l.empirePoints=="Your team is at the highest level!")
end
print("PASS empire view: join deduplication/targets, name input, badges, owner/member permissions, donation affordability, pending saves and max level at four widths")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-empire-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const result=spawnSync(process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau'),[file],{encoding:'utf8'});
 if(result.error)throw result.error;
 process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
