local Players = game:GetService("Players")
Players.CharacterAutoLoads = false
for _, player in Players:GetPlayers() do if player.Character then player.Character:Destroy() end end
local RS = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local DataStoreService = game:GetService("DataStoreService")
local HttpService = game:GetService("HttpService")
local folder = RS:WaitForChild("CookieClicker")
local Model = require(folder:WaitForChild("Model"))
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
local empireService=EmpireService.new(empireStore,persistence)
local charityStore=require(folder:WaitForChild("CharityStore")).new(Model,studio and store or DataStoreService:GetDataStore("ToilCookieCharities_v1"))
local charityService=require(folder:WaitForChild("CharityService")).new(Model,charityStore,persistence,os.time)
local sessions = {}
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
	local snapshot = Model.snapshot(session.state)
	snapshot.saveStatus = session.saveStatus
	snapshot.ready = session.ready and not session.closing
	snapshot.events = session.events
    snapshot.serverNow=os.time()
    snapshot.playerId=player.UserId
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
	while player.Parent and sessions[player]==pending and not shuttingDown do
		local session, reason = persistence.load("player_"..player.UserId,token)
		if session then
			if not player.Parent or shuttingDown then persistence.save(session,true); return end
			session.tokens=40
            -- Temporary level-5 background preview for Studio; published progression stays unchanged.
            if studio then session.state.economy.xp=math.max(session.state.economy.xp,1600) end
			session.state.bakery=(session.state.customName and filteredName(player,session.state.customName)) or player.DisplayName.."'s bakery"
			session.saveStatus=studio and "Test game: progress resets when testing stops" or "Your bakery is saved"
			session.seenAchievements=table.clone(session.state.achievements)
			sessions[player]=session
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
Players.PlayerAdded:Connect(load)
for _, player in Players:GetPlayers() do task.spawn(load,player) end
Players.PlayerRemoving:Connect(function(player)
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
	if action=="empire" then
        if session.empireBusy or (session.lastEmpireAction and os.clock()-session.lastEmpireAction<1) then return end
        session.lastEmpireAction=os.clock();session.empireBusy=true
        local arg=quantity
        if index=="create" or index=="rename" then arg=filteredName(player,quantity) end
        if session.closing or not session.ready then session.empireBusy=false;return end
        local ok,message
        if (index=="create" or index=="rename") and not arg then ok,message=false,"Try a short empire name."
        else ok,message=empireService.action(session,player.UserId,index,arg,sell) end
        session.empireBusy=false;publicUpdated=-math.huge
        notice(session,ok and "success" or "error",message)
        send(player,session);return
    elseif action=="click" then Model.click(state); achievements(session); return
	elseif action=="trade" and type(index)=="number" and index%1==0 and Model.Buildings[index] and (quantity==1 or quantity==10 or quantity==100) and type(sell)=="boolean" then
		local before=state.buildings[index]
		if Model.trade(state,index,quantity,sell) then
			local amount=math.abs(state.buildings[index]-before)
			notice(session,"success",(sell and "Sold " or "You bought ")..amount.." "..Model.Buildings[index].name..(amount>1 and " buildings!" or "!"))
		else notice(session,"error",sell and "You do not own any of these yet." or "Not enough cookies yet. Keep baking!") end
	elseif action=="upgrade" and type(index)=="string" then
		if Model.buyUpgrade(state,index) then notice(session,"success","Boost bought! Your bakery is stronger now.")
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
