-- CSS engine test environment.
--
-- The pure CSS engine (out/css/engine.luau) has no Roblox service access and
-- no scheduler/react dependency, so it does NOT need the full spike env (which
-- renders the counter at load time and currently fails on the vendor
-- scheduler's work loop). It only needs:
--   1. _spike_rt.native: the JS globals the emitted Luau expects (typeOfJS,
--      parseFloat, isNaN, string helpers, the __spike* task queues).
--   2. A minimal fake `game`/`script`/`task` so any incidental engine-global
--      reads resolve.
--
-- The css spec requires the engine module directly and unit-tests it.

require("./_spike_rt.native")

-- Minimal fake Roblox surface (engine is pure, but keep the globals defined so
-- nothing reads a nil `game`).
local RS = { Name = "ReplicatedStorage", Parent = nil, children = {} }
RS.WaitForChild = function(self, name)
	local c = self.children[name]
	if c == nil then
		c = { Name = name, Parent = self, children = {} }
		c.WaitForChild = RS.WaitForChild
		self.children[name] = c
	end
	return c
end
local runService = {
	IsStudio = function() return false end,
	IsRunning = function() return false end,
	IsClient = function() return false end,
	Heartbeat = {},
}
getfenv(0).game = {
	GetService = function(_, name)
		if name == "ReplicatedStorage" then return RS end
		if name == "RunService" then return runService end
		return {}
	end,
	IsLoaded = function() return true end,
	Loaded = { Wait = function() end },
}
getfenv(0).script = { Name = "css", Parent = nil }
getfenv(0).task = {
	spawn = function(fn, ...) fn(...) end,
	defer = function(fn, ...) fn(...) end,
	wait = function(t) return t or 1 end,
}

-- The engine module is pure; require it once and publish it so the spec can
-- import the same instance. (The spec may also require it directly.)
local engine = require("../out/css/engine")
getfenv(0).__cssEngine = engine

return { engine = engine }