local Players = game:GetService("Players")
-- Cookie Clicker is entirely UI-driven; no world avatar is needed.
-- Set this before any yielding initialization so joins never start a spawn.
Players.CharacterAutoLoads = false
for _, player in Players:GetPlayers() do
	if player.Character then player.Character:Destroy() end
end
local RS = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local DataStoreService = game:GetService("DataStoreService")
local Model = require(RS:WaitForChild("CookieClicker"):WaitForChild("Model"))
local folder = RS.CookieClicker
local remote = folder:FindFirstChild("Action") or Instance.new("RemoteEvent")
remote.Name = "Action"
remote.Parent = folder
local store = not RunService:IsStudio() and DataStoreService:GetDataStore("ToilCookieClicker_v1") or nil
local sessions = {}
local function finite(n) return type(n) == "number" and n == n and n >= 0 and n < math.huge end
local function restore(data)
	local state = Model.new()
	if type(data) ~= "table" or data.version ~= 1 then return state end
	for _, key in { "cookies", "earned", "handmade", "clicks", "played", "goldenClicks" } do
		if finite(data[key]) then state[key] = data[key] end
	end
	for i = 1, #Model.Buildings do
		local n = type(data.buildings) == "table" and data.buildings[i]
		if finite(n) then state.buildings[i] = math.min(1000000, math.floor(n)) end
	end
	for _, u in Model.Upgrades do if type(data.upgrades) == "table" and data.upgrades[u.id] == true then state.upgrades[u.id] = true end end
	for _, a in Model.Achievements do if type(data.achievements) == "table" and data.achievements[a[1]] == true then state.achievements[a[1]] = true end end
	return state
end
local function send(player, session)
	local snapshot = Model.snapshot(session.state)
	snapshot.saveStatus = session.saveStatus
	remote:FireClient(player, snapshot)
end
local function load(player)
	if sessions[player] then return end
	local session = { state = Model.new(), ready = false, canSave = false, tokens = 40, saveStatus = "Loading save…" }
	sessions[player] = session
	-- Studio playtests are isolated from published saves and do not require API access.
	if RunService:IsStudio() then
		session.saveStatus = "Studio test • session only"
	else
		local ok, data = pcall(function() return store:GetAsync("player_" .. player.UserId) end)
		if ok then
			session.state = restore(data)
			session.canSave = true
			session.saveStatus = "Saved"
		else session.saveStatus = "Save unavailable • retry on rejoin" end
	end
	session.state.bakery = player.DisplayName .. "'s bakery"
	session.ready = true
	if player.Parent then send(player, session) end
end
local function save(player, session)
	if not session.canSave or session.saving then return end
	session.saving = true
	local snapshot = Model.snapshot(session.state)
	local ok = pcall(function() store:UpdateAsync("player_" .. player.UserId, function() return snapshot end) end)
	session.saveStatus = ok and "Saved" or "Save failed • will retry"
	session.saving = false
end
Players.PlayerAdded:Connect(load)
for _, player in Players:GetPlayers() do task.spawn(load, player) end
Players.PlayerRemoving:Connect(function(player)
	local session = sessions[player]
	if session then save(player, session) end
	sessions[player] = nil
end)
remote.OnServerEvent:Connect(function(player, action, index, quantity, sell)
	local session = sessions[player]
	if not session or not session.ready or session.tokens < 1 then return end
	session.tokens -= 1
	local state = session.state
	if action == "click" then Model.click(state); return
	elseif action == "trade" and type(index) == "number" and type(quantity) == "number" and type(sell) == "boolean" then
		Model.trade(state, index, quantity, sell)
	elseif action == "upgrade" and type(index) == "string" then Model.buyUpgrade(state, index)
	elseif action == "save" then task.spawn(save, player, session)
	elseif action ~= "sync" then return end
	send(player, session)
end)
local elapsed = 0
RunService.Heartbeat:Connect(function(dt)
	elapsed += dt
	for _, session in sessions do
		session.tokens = math.min(40, session.tokens + 30 * dt)
		if session.ready then Model.tick(session.state, dt) end
	end
	if elapsed >= 0.25 then
		elapsed = 0
		for player, session in sessions do if session.ready then send(player, session) end end
	end
end)
task.spawn(function()
	while task.wait(60) do for player, session in sessions do task.spawn(save, player, session) end end
end)
game:BindToClose(function()
	local pending = 0
	for player, session in sessions do
		pending += 1
		task.spawn(function() save(player, session); pending -= 1 end)
	end
	local deadline = os.clock() + 25
	while pending > 0 and os.clock() < deadline do task.wait(0.1) end
end)
print("[CookieClicker] Server ready")
