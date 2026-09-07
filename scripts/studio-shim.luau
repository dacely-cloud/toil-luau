--!nocheck
--[[
	toil-luau Studio shim -- the JavaScript globals the vendored React 19 graph
	reads as bare identifiers (`process.env.NODE_ENV`, `setTimeout`, `console`).

	The native Lest runner installs these in specs/_spike_rt.luau, where one
	global table is shared by every required module. Roblox gives each script
	its own environment, so `_G.process` set by one script is NOT visible as a
	bare `process` in another -- hence this module, which owns the globals and
	hands them back for the staging script to bind as locals per file.

	Queue names matter: polyfills.drainTasks() drains _G.__spikeMicrotasks and
	_G.__spikeMacrotasks, not the module-local arrays polyfills itself would
	otherwise create. Installing them here first means polyfills sees them
	already set, skips its own, and drainTasks drains the queues React's
	scheduler actually pushed work into.
]]

_G.__spikeMicrotasks = _G.__spikeMicrotasks or {}
_G.__spikeMacrotasks = _G.__spikeMacrotasks or {}

if _G.process == nil then
	_G.process = { env = { NODE_ENV = "development" } }
end

if _G.performance == nil then
	_G.performance = {
		now = function()
			return os.clock() * 1000
		end,
	}
end

if _G.queueMicrotask == nil then
	_G.queueMicrotask = function(fn)
		table.insert(_G.__spikeMicrotasks, fn)
	end
end

if _G.setTimeout == nil then
	_G.setTimeout = function(fn, _ms)
		table.insert(_G.__spikeMacrotasks, fn)
		return #_G.__spikeMacrotasks
	end
	_G.clearTimeout = function(_id) end
	-- React's scheduler treats immediates as urgent: run before queued work.
	_G.setImmediate = function(fn)
		table.insert(_G.__spikeMacrotasks, 1, fn)
		return 1
	end
	_G.clearImmediate = function(_id) end
end

if _G.console == nil then
	local function noop() end
	_G.console = {
		log = function(...) print(...) end,
		info = function(...) print(...) end,
		warn = function(...) warn(...) end,
		error = function(...) warn(...) end,
		group = noop,
		groupCollapsed = noop,
		groupEnd = noop,
		timeStamp = noop,
		-- React 19 wraps work in console.createTask(name):run(fn) for async
		-- stack traces. Accept both `t.run(fn)` and `t:run(fn)` call shapes,
		-- since the vendor taming can emit either.
		createTask = function(_name)
			local t = {}
			t.run = function(a, b)
				local fn = if type(b) == "function" then b else a
				if type(fn) == "function" then
					return fn()
				end
				return nil
			end
			return t
		end,
	}
end

return {
	process = _G.process,
	performance = _G.performance,
	queueMicrotask = _G.queueMicrotask,
	setTimeout = _G.setTimeout,
	clearTimeout = _G.clearTimeout,
	setImmediate = _G.setImmediate,
	clearImmediate = _G.clearImmediate,
	console = _G.console,
}
