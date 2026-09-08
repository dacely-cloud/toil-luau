-- Temporary Play-mode bridge for the isolated UI clone. No persistence writes.
local Players=game:GetService("Players")
local RunService=game:GetService("RunService")
assert(RunService:IsStudio(),"UI scenarios are Studio-only")
local folder=game.ReplicatedStorage:WaitForChild("CookieUiVerification")
local Model=require(folder.Model)
local remote=folder.Action
local owner=Players:GetPlayers()[1]
assert(owner)
local state=Model.new()
state.cookies=1e12;state.earned=1e15;state.prestige=2;state.chips=10
state.lumps=100;state.magic=100;state.economy.xp=1600
state.soundEnabled=false;state.reducedMotion=true
for i=1,#Model.Buildings do state.buildings[i]=10;state.levels[i]=2 end
local events,eventId={},0
local function send()
    if not owner.Parent then return end
    local snapshot=Model.snapshot(state)
    snapshot.ready=true;snapshot.playerId=owner.UserId;snapshot.serverNow=os.time()
    snapshot.saveStatus="Isolated UI verification — no saved progress"
    snapshot.events=events;snapshot.socialPlayers={}
    remote:FireClient(owner,snapshot)
end
local action=remote.OnServerEvent:Connect(function(player,kind,arg,quantity)
    if player~=owner then return end
    local ok,message
    if kind=="advanced" then ok,message=Model.advancedAction(state,arg,quantity)
    elseif kind=="golden" then message=Model.collectGolden(state,arg);ok=message~=nil
    elseif kind=="click" then Model.click(state)
    elseif kind=="sync" then send();return
    else return end
    if message then
        eventId+=1;table.insert(events,{id=eventId,kind=ok and "success" or "error",text=message})
        if #events>8 then table.remove(events,1)end
    end
    send()
end)
local elapsed=0
local heartbeat=RunService.Heartbeat:Connect(function(dt)
    Model.tick(state,dt);elapsed+=dt
    if elapsed>=.25 then elapsed=0;send()end
end)
script.Destroying:Connect(function()action:Disconnect();heartbeat:Disconnect()end)
send()
