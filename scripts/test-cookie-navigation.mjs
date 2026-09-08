import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const source=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=source.indexOf('navigateBack=function()',source.indexOf('local function App()'));
const end=source.indexOf('\n\t\tlocal h =',start);
assert(start>=0 && end>start);
const focusStart=source.indexOf('local focusTab=');
const focusEnd=source.indexOf('\n\t\tlocal target=',focusStart);
assert(focusStart>=0 && focusEnd>focusStart);
const code=`
local function focusName(mobile,currentPage,currentTab)
 ${source.slice(focusStart,focusEnd)}
 return name
end
for _,tab in {"Options","Stats","More"} do
 assert(focusName(false,"Bake",tab)=="tabMore", "desktop focus uses an existing toolbar button")
 assert(focusName(true,"More",tab)=="navMore", "mobile focus returns to its visible navigation")
end
assert(focusName(false,"Bake","Buildings")=="bigCookie")
assert(focusName(false,"Bake","Adventure")=="tabAdventure")

local function run(mobile,page,tab,work,confirm,editing,adventure)
 local function state(value)
  local cell={value};cell[2]=function(next)cell[1]=next end;return cell
 end
 local confirmFresh,empireEdit,workPage=state(confirm),state(editing),state(work)
 local adventurePage=state(adventure or "Home")
 local hover=7
 local function setHover(v)hover=v end
 local function setPage(v)page=v end
 local function setTab(v)tab=v end
 local navigateBack
 ${source.slice(start,end)}
 local handled=navigateBack()
 return handled,page,tab,workPage[1],confirmFresh[1],empireEdit[1],adventurePage[1]
end
for _,tab in {"More","Adventure","Work"} do
 local handled,page,next=run(false,"Bake",tab,"Jobs",false,false)
 assert(handled and next=="Buildings", "desktop menu closes")
end
for _,mobile in {false,true} do
 for _,tab in {"Options","Stats"} do
  local handled,_,parent=run(mobile,"More",tab,"Jobs",false,false)
  assert(handled and parent=="More", "settings and stats return to their More menu")
 end
end
local handled,_,tab,_,_,_,adventure=run(false,"Bake","Adventure","Jobs",false,false,"Garden")
assert(handled and tab=="Adventure" and adventure=="Home", "activity returns to Adventure cards")
local handled,page,tab,work=run(true,"More","Work","Collection",false,false)
assert(handled and page=="More" and tab=="Work" and work=="Jobs")
handled,page,tab=run(true,"More","Buildings","Jobs",false,false)
assert(handled and page=="Bake")
handled,page,tab=run(true,"Shop","Options","Jobs",false,false)
assert(handled and page=="Bake", "hidden menu must not consume back on Shop")
local _,_,_,_,confirm=run(false,"Bake","Adventure","Jobs",true,false)
assert(confirm==false)
local _,_,_,work,_,editing=run(false,"Bake","Work","Empire",false,true)
assert(editing==false and work=="Empire", "close editor before leaving its page")
assert(not run(true,"Bake","Options","Jobs",false,false), "Bake has no back destination")
assert(not run(false,"Bake","Buildings","Jobs",false,false))
print("PASS controller back: menus, Work sections, empire editor, confirmation, mobile pages and root")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-navigation-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const r=spawnSync(process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau'),[file],{encoding:'utf8'});
 if(r.error)throw r.error;
 process.stdout.write(r.stdout);process.stderr.write(r.stderr);assert.equal(r.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
