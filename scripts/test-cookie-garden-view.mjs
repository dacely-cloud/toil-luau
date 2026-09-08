import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const source=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=source.indexOf('local planted=state.gardenReady>0');
const end=source.indexOf('elseif adventurePage[1]=="Market"',start);
assert(start>=0 && end>start);
const code=`
local function render(farms,lumps,ready,played,boost)
 local state={buildings={0,0,farms},lumps=lumps,gardenReady=ready,played=played,gardenBoostUntil=boost}
 local pane,y,w={},0,300
 local clicked,request
 local function label(...)return {} end
 local function picture(...)return {} end
 local function box(id,x,y,w,h,color,children)return {children=children} end
 local function text(...)end
 local function send(kind,action)request={kind,action} end
 local function button(id,title,x,y,w,h,callback)
  clicked={id=id,title=title,callback=callback};return clicked
 end
 ${source.slice(start,end)}
 clicked.callback()
 return clicked,request
end
local b,r=render(0,1,0,10,0);assert(not r and b.title=="Buy a farm first")
b,r=render(1,0,0,10,0);assert(not r and b.title=="Need 1 sugar lump")
b,r=render(1,1,0,10,0);assert(r[1]=="advanced" and r[2]=="plant")
b,r=render(1,1,70,10,0);assert(not r and b.title=="Growing...")
b,r=render(1,1,70,69.9,0);assert(not r)
b,r=render(1,1,70,70,0);assert(b.id=="harvestGarden" and r[2]=="harvest")
b,r=render(1,1,0,71,670);assert(r[2]=="plant", "boost permits a new crop")
print("PASS garden view: locked, missing lump, empty, growing, exact harvest boundary and active boost")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-garden-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const fallback=path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const r=spawnSync(process.env.LUAU_BIN || (fs.existsSync(fallback)?fallback:'luau'),[file],{encoding:'utf8'});
 if(r.error)throw r.error;
 process.stdout.write(r.stdout);process.stderr.write(r.stderr);assert.equal(r.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
