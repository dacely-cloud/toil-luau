-- Spike environment: fake Roblox surface + module load order.
-- Required at the top level of the spec (the only place require() works).
--
-- Load order matters:
--   1. _spike_rt defines every JS global the emitted vendor code expects.
--   2. The fake game/tree lets the emitted `game:GetService(...)` chains and
--      the patched RuntimeLib's require bridge resolve.
--   3. Scheduler and React are preloaded and published as bare globals
--      (getfenv(0).Scheduler / getfenv(0).React) because roblox-ts elided the reconciler's
--      `import ... from "@toil/scheduler"` / `import React from "@toil/react"`
--      as type-only, leaving the reconciler factory to read them as globals.
--   4. main renders the counter at load time and errors if anything is off.

require("./_spike_rt.native")

-- Fake game/tree BEFORE any vendor require: the emitted RuntimeLib reads
-- `game:GetService("RunService")` at module load, which drags Promise in with
-- it, and Promise reads the same at line 224. Without this, the first vendor
-- require above runs with game == nil.
local function makeTree(name, parent)
	local node = {
		Name = name,
		Parent = parent,
		ClassName = "ModuleScript",
		children = {},
		__path = if parent == nil or parent.__path == "" then (if parent == nil then "" else name) else parent.__path .. "/" .. name,
	}
	local mt = {}
	mt.__index = mt
	mt.WaitForChild = function(self, childName)
		local c = self.children[childName]
		if c == nil then
			c = makeTree(childName, self)
			self.children[childName] = c
		end
		return c
	end
	mt.FindFirstChild = function(self, childName)
		return self.children[childName]
	end
	mt.GetFullName = function(self)
		return self.__path
	end
	setmetatable(node, mt)
	return node
end

local RS = makeTree("ReplicatedStorage", nil)
local runService = {
	IsStudio = function()
		return false
	end,
	IsRunning = function()
		return false
	end,
	IsClient = function()
		return false
	end,
	Heartbeat = {},
}
getfenv(0).game = {
	GetService = function(_, name)
		if name == "ReplicatedStorage" then
			return RS
		end
		if name == "RunService" then
			return runService
		end
		return {}
	end,
	IsLoaded = function()
		return true
	end,
	Loaded = { Wait = function() end },
}
getfenv(0).script = { Name = "spike", Parent = nil }
getfenv(0).task = {
	spawn = function(fn, ...)
		fn(...)
	end,
	defer = function(fn, ...)
		fn(...)
	end,
	wait = function(t)
		return t or 1
	end,
}

-- Pre-require the real vendor modules so the patched out/ wrappers (which
-- resolve to the same on-disk paths) reuse the same module instances.
local _schedPre = require("../out/vendor/toil-scheduler/index")
local _reactPre = require("../out/vendor/toil-react/index")

local RT = {}

local scheduler = require("../out/vendor/toil-scheduler/index")
getfenv(0).Scheduler = scheduler
local react = require("../out/vendor/toil-react/index")
local react = require("../out/vendor/toil-react/index").default

local main = require("../out/main")
-- main's patched header re-required the vendor index wrappers, which
-- clobbered getfenv(0).React with the namespace table (no default
-- export at the top level). main captured what it needed at load time;
-- restore the default for modules loaded afterwards (the host).
local _reactMod = require("../out/vendor/toil-react/index")
getfenv(0).React = _reactMod.default

return { main = main }