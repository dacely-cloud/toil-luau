import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const source=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=source.indexOf('navigateBack=function()',source.indexOf('local function App()'));
const end=source.indexOf('\n\t\tlocal h =',start);
assert(start>=0 && end>start);
const code=`
local function run(mobile,page,tab,work,confirm,editing)
 local function state(value)
  local cell={value};cell[2]=function(next)cell[1]=next end;return cell
 end
 local confirmFresh,empireEdit,workPage=state(confirm),state(editing),state(work)
 local adventurePage=state("Home")
 local hover=7
 local function setHover(v)hover=v end
 local function setPage(v)page=v end
 local function setTab(v)tab=v end
 local navigateBack
 ${source.slice(start,end)}
 local handled=navigateBack()
 return handled,page,tab,workPage[1],confirmFresh[1],empireEdit[1]
end
for _,tab in {"Options","Stats","Adventure","Work"} do
 local handled,page,next=run(false,"Bake",tab,"Jobs",false,false)
 assert(handled and next=="Buildings", "desktop menu closes")
end
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
