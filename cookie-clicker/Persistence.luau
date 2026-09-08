-- DataStore adapter is injected so failures and overlapping sessions are testable.
local Persistence = {}
local function finite(n)
	return type(n) == "number" and n == n and n >= 0 and n < math.huge
end
function Persistence.new(Model, store, options)
	local now, wait = options.now, options.wait
	local leaseSeconds = 180
	local service = {}
	local function restore(data)
		if data ~= nil and (type(data) ~= "table" or data.version ~= 1) then return nil end
		local state = Model.new()
		if not data then return state end
		for _, key in {"cookies","earned","handmade","clicks","played","goldenClicks"} do
			if finite(data[key]) then state[key] = data[key] end
		end
		if finite(data.goldenId) then state.goldenId=math.min(1e12,math.floor(data.goldenId)) end
		for i=1,#Model.Buildings do
			local n = type(data.buildings)=="table" and data.buildings[i]
			if finite(n) then state.buildings[i] = math.min(1000000,math.floor(n)) end
		end
		for _, u in Model.Upgrades do if type(data.upgrades)=="table" and data.upgrades[u.id]==true then state.upgrades[u.id]=true end end
		for _, a in Model.Achievements do if type(data.achievements)=="table" and data.achievements[a[1]]==true then state.achievements[a[1]]=true end end
		Model.restoreAdvanced(state,data)
		Model.restoreEconomy(state,data)
		Model.restoreSocial(state,data)
		state.soundEnabled = data.soundEnabled ~= false
		Model.setVolume(state,data.soundVolume)
		state.reducedMotion = data.reducedMotion == true
		if type(data.customName)=="string" and #data.customName<=96 then state.customName=data.customName end
		return state
	end
	local function retry(callback)
		local ok, result
		for attempt=1,3 do
			ok, result = pcall(callback)
			if ok then return true, result end
			if attempt<3 then wait(attempt) end
		end
		return false, result
	end
	function service.load(key, token)
		local reason = "Could not load your bakery. Retrying..."
		local ok, data = retry(function()
			return store:UpdateAsync(key,function(old)
				local state = restore(old)
				if not state then reason="This save needs a newer game version."; return nil end
				local lock = old and old.session
				if type(lock)=="table" and lock.id~=token and finite(lock.expires) and lock.expires>now() then
					reason="Your bakery is open elsewhere. Waiting for it to close..."; return nil
				end
				-- Preserve savedAt while claiming: retries must not lose offline time.
				state.savedAt = old and old.savedAt
				state.session = {id=token,expires=now()+leaseSeconds}
				return state
			end)
		end)
		if not ok or not data then return nil, reason end
		local state = restore(data)
		local before = state.cookies
		if finite(data.savedAt) then Model.tick(state,math.clamp(now()-data.savedAt,0,8*60*60)) end
		return {key=key,token=token,state=state,offlineCookies=state.cookies-before,leaseUntil=data.session.expires,ready=true,canSave=true}
	end
	function service.save(session, release)
		if session.closed then return true end
		if not session.canSave then return false end
		-- A final save waits for an in-flight autosave, then takes a fresh snapshot.
		if session.saving and not release then return false end
		local deadline = now()+20
		while session.saving and now()<deadline do wait(.05) end
		if session.saving then return false end
		session.saving=true
		local snapshot = Model.snapshot(session.state)
		snapshot.savedAt=now()
		if not release then snapshot.session={id=session.token,expires=now()+leaseSeconds} end
		local ok, result = retry(function()
			return store:UpdateAsync(session.key,function(old)
				if type(old)~="table" or type(old.session)~="table" or old.session.id~=session.token then return nil end
				return snapshot
			end)
		end)
		session.saving=false
		if ok and result then
			-- Retries consume time; the server must honor the expiry actually saved.
			session.leaseUntil=not release and snapshot.session.expires or now()
			session.closed=release==true
			return true
		end
		if ok then session.canSave=false; session.ready=false end
		return false
	end
	return service
end
return Persistence
