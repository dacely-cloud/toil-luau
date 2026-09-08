import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';

// Execute the actual owned-building render branch, including its helper calls.
// The first purchase previously called a deleted icon() helper here.
const source = fs.readFileSync('cookie-clicker/App.luau', 'utf8');
const start = source.indexOf('local rows = {}', source.indexOf('if tab == "Buildings" then'));
const end = source.indexOf('\n\t\telse', start);
assert(start >= 0 && end > start);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'toil-building-view-'));
const file = path.join(dir, 'test.luau');
const code = `
local ImageNames=(function() ${fs.readFileSync('cookie-clicker/ImageNames.luau','utf8')} end)()
local ImageConfig=(function() ${fs.readFileSync('cookie-clicker/ImageConfig.luau','utf8')} end)()
assert(#ImageConfig.verify()==0)
for key,mapping in ImageNames do for _,name in mapping do assert(ImageConfig.get(key:find("Backgrounds") and "ZoneBackground/"..name or name)) end end
local function element(kind, props, ...) return {kind=kind, props=props, children={...}} end
local e=element
local function label(id,text,...) return {id=id,text=text} end
local function picture(id,name,...) return {id=id,image=ImageConfig.get(name)} end
${source.slice(source.indexOf('local function buildingPicture('),source.indexOf('local stripeCache'))}
local function box(id,x,y,w,h,color,children) return {id=id,children=children} end
local function rail(id,...) return {id=id} end
local function style(...) return {} end
local number=tostring
local titleStyle={}
local Model={Buildings={},multiplier=function()return 1 end}
for i=1,20 do Model.Buildings[i]={name="Building "..i,icon="icon"..i,color="#ffffff",cps=i} end
local function render(count)
 local center,centerW,h={},600,900
 local state={buildings={}}
 for i=1,20 do state.buildings[i]=count end
 ${source.slice(start,end)}
 return center[1].children
end
assert(#render(0)==2, "empty bakery hints")
for _,count in {1,10,100} do
 local rows=render(count)
 assert(#rows==20, "all owned building types render")
 for i,row in rows do
  assert(#row.children==4+math.min(count,14), "bounded sprite count")
  assert(row.children[4].image==ImageConfig.get(ImageNames.buildings[i]), "configured building image")
 end
end
print("PASS owned-building view: empty, first purchase, bulk purchases, all 20 buildings")
`;
try {
 for (const name of ['Images2Config','CookieBackgrounds','MenuButtonConfig']) fs.copyFileSync('cookie-clicker/'+name+'.luau',path.join(dir,name+'.luau'));
 fs.writeFileSync(file, code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const binary=process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau');
 const result=spawnSync(binary,[file],{encoding:'utf8'});
 if(result.error) throw result.error;
 process.stdout.write(result.stdout);
 process.stderr.write(result.stderr);
 assert.equal(result.status,0,'building render regression');
} finally { fs.rmSync(dir,{recursive:true,force:true}); }
