-- toil-luau: install the JS-semantics runtime into this module's environment.
do
	local _rt = require(game:GetService("ReplicatedStorage"):WaitForChild("ToilRuntime"))
	local _env = getfenv(0)
	for _k, _v in pairs(_rt) do
		if rawget(_env, _k) == nil then
			_env[_k] = _v
		end
	end
end
-- Compiled with roblox-ts v3.0.0
--[[
	*
	 * Spike polyfills: run the React 19 runtime (@toil/*) on Roblox Luau.
	 *
	 * This module must be required before any @toil/* module is loaded, because
	 * the runtime reads process / performance at init and schedules work through
	 * queueMicrotask / setTimeout / setImmediate.
	 *
	 * roblox-ts flavor notes:
	 *  - A missing global is `nil` in Luau, which roblox-ts maps to `null`
	 *    (so absence checks compare to null, not "undefined").
	 *  - `#x` is `x.size()`; Array is 0-based in TS (roblox-ts emits 1-based).
	 *  - The Luau runtime is single-threaded and the mock never yields, so the
	 *    polyfill queues are drained by drainTasks() instead of running
	 *    asynchronously.
	 
]]
local microtasks = {}
local macrotasks = {}
--* Remove and return the first queued task. O(n), fine for a spike. 
local function dequeue(arr)
	local fn = table.remove(arr, 1)
	if fn == nil then
		error("dequeue: task queue is empty")
	end
	return fn
end
if _G.process == nil then
	_G.process = {
		env = {
			NODE_ENV = "development",
		},
	}
end
if _G.queueMicrotask == nil then
	_G.queueMicrotask = function(fn)
		local _fn = fn
		table.insert(microtasks, _fn)
	end
end
if _G.setTimeout == nil then
	_G.setTimeout = function(fn, _ms)
		local _fn = fn
		table.insert(macrotasks, _fn)
		return #macrotasks
	end
	_G.clearTimeout = function(_id)
		-- The mock never cancels; the queue is drained whole.
	end
	_G.setImmediate = function(fn)
		-- React's scheduler treats immediates as urgent macrotasks: prepend so
		-- they run before later-scheduled work.
		local existing = {}
		local macs = macrotasks
		for i = 0, #macs - 1 do
			local _arg0 = macs[i + 1]
			table.insert(existing, _arg0)
		end
		table.clear(macrotasks)
		local _fn = fn
		table.insert(macrotasks, _fn)
		for i = 0, #existing - 1 do
			local _arg0 = existing[i + 1]
			table.insert(macrotasks, _arg0)
		end
		return #macrotasks
	end
	_G.clearImmediate = function(_id)
		-- The mock never cancels; the queue is drained whole.
	end
end
if _G.performance == nil then
	local ticks = 0
	_G.performance = {
		now = function(self)
			ticks += 1
			return ticks
		end,
	}
end
--[[
	*
	 * Run queued micro- and macrotasks until both queues are empty.
	 * Microtasks are always drained before the next macrotask, mirroring the
	 * event-loop ordering React relies on.
	 
]]
local log
local function drainTasks()
	-- The runtime (loaded before this module) owns the real queues: the
	-- scheduler captured setImmediate / setTimeout / queueMicrotask from the
	-- runtime's globals, so those tasks land in __spike* queues, not in the
	-- local arrays above. Microtasks always run before the next macrotask.
	local micro = _G.__spikeMicrotasks or {}
	local macro = _G.__spikeMacrotasks or {}
	local guard = 0
	local drained = 0
	while true do
		if guard > 2000 then
			error("drainTasks: task queue did not empty within 2000 steps")
		end
		if #micro > 0 then
			local fn = dequeue(micro)
			fn()
			guard += 1
			drained += 1
			continue
		end
		if #macro > 0 then
			local fn = dequeue(macro)
			fn()
			guard += 1
			drained += 1
			continue
		end
		break
	end
	if drained > 0 then
		log("drainTasks: drained " .. tostring(drained) .. " tasks")
	end
end
local taskLog = {}
_G.__spikeTaskLog = taskLog
function log(msg)
	local _msg = msg
	table.insert(taskLog, _msg)
end
return {
	drainTasks = drainTasks,
	log = log,
	taskLog = taskLog,
}
