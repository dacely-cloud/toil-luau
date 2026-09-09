import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const source=fs.readFileSync('cookie-clicker/App.luau','utf8');
const start=source.indexOf('\tlocal lastSignature');
const end=source.indexOf('\tlocal connection = remote.OnClientEvent',start);
assert(start>=0 && end>start);
const code=`
local mobile,currentPage,currentTab=true,"Bake","Stats"
local revision,renders,counters=0,0,0
local refresh=function()renders+=1 end
local refreshCounters=function()counters+=1 end
local Model={Buildings={{price=10}},Upgrades={{id="available",price=25,building=1,required=1},{id="locked",price=17,building=1,required=100}},Achievements={}}
function Model.jobLevel()return 5 end
Model.MonetizationConfig={PassOrder={"VIP"}}
function Model.price(_,_,bulk)return 10*bulk end
local snapshot={cookies=0,earned=100000,buildings={1},upgrades={},achievements={},played=0,bakery="Test",cps=1,clickPower=1,soundEnabled=true,soundVolume=100,reducedMotion=false,goldenId=0,goldenUntil=0,ready=true}
${source.slice(start,end)}
update(false)
assert(renders==1)
for i=1,40 do snapshot.cookies=i;snapshot.played=i*.25;update(false) end
assert(renders==1,"hidden Stats and shop thresholds must not rebuild Bake")
assert(counters==41,"cookie counters remain live")
currentPage="Shop";update(true)
local before=renders
snapshot.cookies=24;update(false)
assert(renders==before+1,"visible upgrade affordability updates")
snapshot.cookies=18;update(false);before=renders
snapshot.cookies=16;update(false)
assert(renders==before,"locked upgrade price must not trigger render")
currentPage="More";currentTab="Work";update(true);before=renders
snapshot.played=10.25;update(false);assert(renders==before)
snapshot.played=11;update(false);assert(renders==before+1,"visible timer must update")
mobile=false;currentPage="Bake";currentTab="Stats";update(true);before=renders
snapshot.played=11.25;update(false);assert(renders==before)
snapshot.played=12;update(false);assert(renders==before+1,"desktop Stats refreshes once per second")
snapshot.buildings[1]=2;update(false);assert(renders==before+2,"purchases update immediately")
print("PASS render policy: hidden menus and prices stay idle; counters, visible prices, timers and purchases update")
`;
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'toil-render-policy-'));
try {
 const file=path.join(dir,'test.luau');fs.writeFileSync(file,code);
 const bin=process.env.LUAU_BIN || path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
 const r=spawnSync(bin,[file],{encoding:'utf8'});
 if(r.error)throw r.error;
 process.stdout.write(r.stdout);process.stderr.write(r.stderr);assert.equal(r.status,0);
} finally {fs.rmSync(dir,{recursive:true,force:true});}
