local Players = game:GetService("Players")
Players.CharacterAutoLoads = false
for _, player in Players:GetPlayers() do if player.Character then player.Character:Destroy() end end
local RS = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local DataStoreService = game:GetService("DataStoreService")
local HttpService = game:GetService("HttpService")
local folder = RS:WaitForChild("CookieClicker")
local configSource=game:GetService("ServerStorage"):WaitForChild("MonetizationConfig")
local Config=require(configSource)
local oldCatalog=folder:FindFirstChild("LiveMonetizationConfig")
if oldCatalog then oldCatalog:Destroy() end
local liveCatalog=configSource:Clone();liveCatalog.Name="LiveMonetizationConfig";liveCatalog.Parent=folder
local Model = require(folder:WaitForChild("Model"))
require(folder:WaitForChild("Monetization"))(Model,Config)
assert(#Config.verify()==0,"Invalid monetization config")
local Persistence = require(folder:WaitForChild("Persistence"))
local remote = folder:FindFirstChild("Action") or Instance.new("RemoteEvent")
remote.Name, remote.Parent = "Action", folder
local studio = RunService:IsStudio()
-- Studio uses the same persistence code with isolated, in-memory storage.
local memory = {}
local store = studio and {UpdateAsync=function(_,key,callback)
	local value=callback(memory[key]); if value~=nil then memory[key]=value end; return value
end} or DataStoreService:GetDataStore("ToilCookieClicker_v1")
local persistence = Persistence.new(Model,store,{now=os.time,wait=task.wait})
local EmpireStore=require(folder:WaitForChild("EmpireStore"))
local EmpireService=require(folder:WaitForChild("EmpireService"))
local empireStore=EmpireStore.new(studio and store or DataStoreService:GetDataStore("ToilCookieEmpires_v1"))
local empireChanged=function()end
local empireService=EmpireService.new(empireStore,persistence,function(record)empireChanged(record)end)
local charityStore=require(folder:WaitForChild("CharityStore")).new(Model,studio and store or DataStoreService:GetDataStore("ToilCookieCharities_v1"))
local charityService=require(folder:WaitForChild("CharityService")).new(Model,charityStore,persistence,os.time)
local sessions = {}
local friendBoost=require(folder:WaitForChild("FriendBoost"))(function(a,b)
    for attempt=1,3 do
        local ok,result=pcall(function()return a:IsFriendsWithAsync(b.UserId)end)
        if ok then return result end
        if attempt<3 then task.wait(attempt) end
    end
    return false
end,task.spawn,function(player,count)
    local session=sessions[player]
    if session and not session.closing then session.state.friendCount=count end
end)
local economyRandom=Random.new()
local shuttingDown = false
local publicPlayers={}
local publicUpdated=-math.huge
local function filteredName(player,text)
	if type(text)~="string" or #text>96 then return nil end
	text=text:match("^%s*(.-)%s*$")
	local length=utf8.len(text)
	if not length or length<1 or length>24 then return nil end
	local ok,result=pcall(function()
		return game:GetService("TextService"):FilterStringAsync(text,player.UserId):GetNonChatStringForBroadcastAsync()
	end)
	return ok and result or nil
end
local function notice(session, kind, message)
	session.eventId=(session.eventId or 0)+1
	session.events=session.events or {}
	table.insert(session.events,{id=session.eventId,kind=kind,text=message})
	if #session.events>8 then table.remove(session.events,1) end
end
local function send(player, session)
	if not player.Parent then return end
	local snapshot = Model.snapshot(session.state,true)
    snapshot.paidRandomAllowed=session.paidRandomAllowed==true
	snapshot.saveStatus = session.saveStatus
	snapshot.ready = session.ready and not session.closing
	snapshot.events = session.events
    snapshot.serverNow=os.time()
    snapshot.playerId=player.UserId
    if session.empireInvite and session.empireInvite.expires>os.time() and not session.state.economy.empireId then
        snapshot.empireInvite=session.empireInvite
    end
    if session.empire then
        local r=session.empire;local count=0
        for _,member in r.members do if member.active then count+=1 end end
        snapshot.empire={id=r.owner,name=r.name,badge=r.badge,level=r.level,points=r.points,members=count}
    end
    snapshot.empirePending=session.state.economy.empireMembership~=nil or session.state.economy.empireDonation~=nil or session.empireFinalizing==true
    snapshot.charityPending=session.state.economy.charityPending~=nil or session.charityFinalizing==true
    if os.clock()-publicUpdated>=1 then
        publicUpdated=os.clock();publicPlayers={}
        for other,entry in sessions do
            if entry.ready and not entry.closing then
                local charity=entry.state.economy.charity
                table.insert(publicPlayers,{id=other.UserId,name=other.DisplayName,endsAt=charity and charity.endsAt or 0,pot=charity and charity.pot or 0,empireId=entry.state.economy.empireId,empireName=entry.empire and entry.empire.name,empireBadge=entry.empire and entry.empire.badge})
            end
        end
        table.sort(publicPlayers,function(a,b)return a.id<b.id end)
    end
    snapshot.socialPlayers=publicPlayers
	remote:FireClient(player,snapshot)
end
local monetization=require(folder:WaitForChild("RobloxMonetization"))(Model,Config,folder,sessions,persistence,charityStore,notice,send)
empireChanged=function(record)
    publicUpdated=-math.huge
    for teammate,entry in sessions do
        if empireService.acceptRecord(entry,teammate.UserId,record) then send(teammate,entry) end
    end
end
local function achievements(session)
	session.seenAchievements=session.seenAchievements or {}
	for name in session.state.achievements do
		if not session.seenAchievements[name] then
			session.seenAchievements[name]=true
			notice(session,"achievement","You did it! "..name)
		end
	end
end
local function load(player)
	if sessions[player] or shuttingDown then return end
	local pending={state=Model.new(),ready=false,tokens=40,saveStatus="Opening your bakery..."}
	sessions[player]=pending
	local token=HttpService:GenerateGUID(false)
	local passes,entitlementsReady=monetization.entitlements(player)
	while not entitlementsReady and player.Parent and sessions[player]==pending and not shuttingDown do
		pending.saveStatus="Checking your owned passes...";send(player,pending);task.wait(5)
		passes,entitlementsReady=monetization.entitlements(player)
	end
	while player.Parent and sessions[player]==pending and not shuttingDown do
		local session, reason = persistence.load("player_"..player.UserId,token,passes)
		if session then
			if not player.Parent or shuttingDown then persistence.save(session,true); return end
			session.tokens=40
            -- Temporary level-5 background preview for Studio; published progression stays unchanged.
            if studio then session.state.economy.xp=math.max(session.state.economy.xp,1600) end
			session.state.bakery=(session.state.customName and filteredName(player,session.state.customName)) or player.DisplayName.."'s bakery"
			session.saveStatus=studio and "Test game: progress resets when testing stops" or "Your bakery is saved"
			session.seenAchievements=table.clone(session.state.achievements)
			sessions[player]=session
            task.spawn(function()monetization.policy(player,session);send(player,session)end)
            session.state.friendCount=friendBoost.count(player)
            task.spawn(function()
                for _=1,10 do
                    if not player.Parent or session.closing then return end
                    local ok,data=pcall(function()return player:GetJoinData()end)
                    local launch=ok and data.LaunchData
                    if type(launch)=="string" and launch~="" then
                        local parsed,value=pcall(function()return HttpService:JSONDecode(launch)end)
                        local id=parsed and type(value)=="table" and value.cookieEmpire
                        if type(id)=="number" and id==id and id%1==0 and id>0 and id<=9007199254740991 then
                            local record=empireStore.read(id)
                            if record and not session.closing and not session.state.economy.empireId then
                                session.empireInvite={id=id,name=record.name,badge=record.badge,expires=os.time()+600}
                                send(player,session)
                            end
                        end
                        return
                    end
                    task.wait(1)
                end
            end)
            task.spawn(function() session.empireBusy=true;empireService.refresh(session,player.UserId);empireService.resume(session,player.UserId);session.empireBusy=false;session.charityBusy=true;charityService.refresh(session,player.UserId);charityService.resume(session,player.UserId);session.charityBusy=false end)
			if session.offlineCookies>=1 then notice(session,"success","Welcome back! Your bakery made "..math.floor(session.offlineCookies).." cookies while you were away.") end
			send(player,session)
			return
		end
		pending.saveStatus=reason
		send(player,pending)
		task.wait(10)
	end
end
local function save(player, session, release)
	if not session.canSave then return end
	if session.saving and not release then return end
	session.saveStatus="Saving your bakery..."
	local ok=persistence.save(session,release)
	session.saveStatus=ok and (studio and "Saved for this test only" or "Your bakery is saved") or "Could not save yet. We will try again."
	if not ok then notice(session,"error",session.saveStatus) end
	send(player,session)
	return ok
end
Players.PlayerAdded:Connect(function(player)friendBoost.add(player);load(player)end)
for _, player in Players:GetPlayers() do friendBoost.add(player);task.spawn(load,player) end
Players.PlayerRemoving:Connect(function(player)
    friendBoost.remove(player)
	local session=sessions[player]
	if session then
		session.closing=true
		save(player,session,true)
	end
	sessions[player]=nil
end)
remote.OnServerEvent:Connect(function(player, action, index, quantity, sell)
	local session=sessions[player]
	if not session then return end
	if session.tokens<1 then return end
	session.tokens-=1
	if action=="sync" then
		local now=os.clock()
		if session.lastSync and now-session.lastSync<1 then return end
		session.lastSync=now;send(player,session);return
	end
	if not session.ready or session.closing then
		notice(session,"error","Please wait while we open your saved bakery."); send(player,session); return
	end
	local state=session.state
    if session.purchaseBusy then return end
	if action=="empire" then
        if index=="declineInvite" then session.empireInvite=nil;send(player,session);return end
        if index=="invite" then
            if session.lastEmpireInvite and os.clock()-session.lastEmpireInvite<5 then return end
            session.lastEmpireInvite=os.clock()
            local valid=type(quantity)=="number" and quantity==quantity and quantity%1==0 and math.abs(quantity)<=9007199254740991
            local target=valid and Players:GetPlayerByUserId(quantity)
            local recipient=target and sessions[target]
            local empire=session.empire
            local member=empire and empire.members[tostring(player.UserId)]
            if not recipient or target==player or not recipient.ready or recipient.closing or recipient.state.economy.empireId then
                notice(session,"error","Choose a player here who is not in an empire yet.")
            elseif not empire or not member or not member.active or session.state.economy.empireId~=empire.owner or session.state.economy.empireMembership then
                notice(session,"error","Join an empire before inviting friends.")
            elseif recipient.empireInvite and recipient.empireInvite.expires>os.time() then
                notice(session,"info","They already have an invitation to answer.")
            else
                recipient.empireInvite={id=empire.owner,name=empire.name,badge=empire.badge,expires=os.time()+120}
                notice(recipient,"info",player.DisplayName.." invited you to their empire!")
                notice(session,"success","Invitation sent to "..target.DisplayName.."!")
                send(target,recipient)
            end
            send(player,session);return
        end
        if session.empireBusy or (session.lastEmpireAction and os.clock()-session.lastEmpireAction<1) then return end
        session.lastEmpireAction=os.clock();session.empireBusy=true
        local arg=quantity
        if index=="create" or index=="rename" then arg=filteredName(player,quantity) end
        if session.closing or not session.ready then session.empireBusy=false;return end
        local ok,message
        if (index=="create" or index=="rename") and not arg then ok,message=false,"Try a short empire name."
        else ok,message=empireService.action(session,player.UserId,index,arg,sell) end
        session.empireBusy=false;publicUpdated=-math.huge
        if session.state.economy.empireId then session.empireInvite=nil end
        notice(session,ok and "success" or "error",message)
        send(player,session);return
    elseif action=="click" then Model.click(state); achievements(session); return
	elseif action=="trade" and type(index)=="number" and index%1==0 and Model.Buildings[index] and (quantity==1 or quantity==10 or quantity==100) and type(sell)=="boolean" then
		local before=state.buildings[index]
		local success,xp=Model.trade(state,index,quantity,sell)
		if success then
			local amount=math.abs(state.buildings[index]-before)
			notice(session,"success",(sell and "Sold " or "You bought ")..amount.." "..Model.Buildings[index].name..(amount>1 and " buildings!" or "!")..(xp>0 and " +"..xp.." XP" or ""))
		else notice(session,"error",sell and "You do not own any of these yet." or "Not enough cookies yet. Keep baking!") end
	elseif action=="upgrade" and type(index)=="string" then
		local success,xp=Model.buyUpgrade(state,index)
		if success then notice(session,"success","Boost bought! Your bakery is stronger now."..(xp>0 and " +"..xp.." XP" or ""))
		else notice(session,"error","You need more cookies, or already have this boost.") end
    elseif action=="fundraiser" or action=="charity" then
        if session.charityBusy or (session.lastCharityAction and os.clock()-session.lastCharityAction<1) then return end
        if action=="fundraiser" and index~="start" and index~="claim" then return end
        if action=="charity" and index~="help" and index~="steal" then return end
        local other,target
        if action=="charity" then
            if type(quantity)~="number" or quantity~=quantity or quantity%1~=0 or math.abs(quantity)>9007199254740991 then return end
            other=Players:GetPlayerByUserId(quantity);target=other and sessions[other]
            if not target or not target.ready or target.closing or not target.state.economy.charityRef then
                notice(session,"error","That fundraiser is not available.");send(player,session);return
            end
            if index=="steal" and (target.state.shieldUntil or 0)>os.time() then
                notice(session,"error","This bakery has an active shield.");send(player,session);return
            end
        end
        session.lastCharityAction=os.clock();session.charityBusy=true
        local ok,message=charityService.action(session,player.UserId,index,quantity,target and target.state.economy.charityRef)
        session.charityBusy=false;publicUpdated=-math.huge
        notice(session,ok and "success" or "error",message)
        if ok and target and not target.closing then
            charityService.refresh(target,other.UserId)
            notice(target,"info",player.DisplayName..(index=="help" and " helped your fundraiser!" or " took some fundraiser cookies."))
            send(other,target)
        end
    elseif action=="economy" and type(index)=="string" then
		local ok,message=Model.economyAction(state,index,quantity,economyRandom:NextNumber())
		notice(session,ok and "success" or "error",message)
	elseif action=="advanced" and type(index)=="string" then
		local ok,message=Model.advancedAction(state,index,quantity)
		notice(session,ok and "success" or "error",message)
	elseif action=="golden" and type(index)=="number" then
		local message=Model.collectGolden(state,index)
		if message then notice(session,"achievement",message) end
	elseif action=="rename" then
		if session.renaming or (session.lastRename and os.clock()-session.lastRename<10) then return end
		session.lastRename=os.clock();session.renaming=true
		local name=filteredName(player,index)
		session.renaming=false
		if session.closing or not session.ready then return end
		if name then state.customName=name;state.bakery=name;notice(session,"success","Your bakery has a new name!")
		else notice(session,"error","Try a short name, up to 24 letters. If it fails, try again later.") end
	elseif action=="motion" and type(index)=="boolean" then
		state.reducedMotion=index
	elseif action=="sound" and type(index)=="boolean" then
		state.soundEnabled=index
	elseif action=="volume" then
		if not Model.setVolume(state,index) then return end
	elseif action=="save" then
		if not session.lastManualSave or os.clock()-session.lastManualSave>=15 then
			session.lastManualSave=os.clock()
			task.spawn(function() if save(player,session,false) then notice(session,"success",session.saveStatus);send(player,session) end end)
		else notice(session,"info","Your bakery is already saving automatically.") end
	else return end
	achievements(session)
	send(player,session)
end)
local elapsed=0
RunService.Heartbeat:Connect(function(dt)
	elapsed+=dt
	for _, session in sessions do
		if session.ready and not session.closing then
			session.tokens=math.min(40,session.tokens+30*dt)
			if os.time()>=session.leaseUntil then
				session.ready=false
				session.saveStatus="Saving is taking too long. Please rejoin to protect your bakery."
				notice(session,"error",session.saveStatus)
			else Model.tick(session.state,dt);Model.goldenTick(session.state);achievements(session) end
		end
	end
	if elapsed>=.25 then elapsed=0;for player,session in sessions do send(player,session) end end
end)
task.spawn(function()
    while task.wait(15) do
        for player,session in sessions do
            if session.ready and not session.closing and not session.charityBusy then
                task.spawn(function()
                    session.charityBusy=true
                    charityService.refresh(session,player.UserId)
                    charityService.resume(session,player.UserId)
                    session.charityBusy=false
                end)
            end
            if session.ready and not session.closing and not session.empireBusy then
                task.spawn(function()
                    session.empireBusy=true
                    empireService.refresh(session,player.UserId)
                    if session.empireFinalizing then empireService.finish(session)
                    elseif session.state.economy.empireDonation or session.state.economy.empireMembership then empireService.resume(session,player.UserId) end
                    session.empireBusy=false
                end)
            end
        end
    end
end)
task.spawn(function()
	while task.wait(60) do for player,session in sessions do if not session.closing then task.spawn(save,player,session,false) end end end
end)
game:BindToClose(function()
	shuttingDown=true
	local pending=0
	for player,session in sessions do
		session.closing=true
		pending+=1
		task.spawn(function() save(player,session,true);pending-=1 end)
	end
	local deadline=os.clock()+25
	while pending>0 and os.clock()<deadline do task.wait(.1) end
end)
print("[CookieClicker] Server ready")
