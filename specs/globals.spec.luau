local Lest = require('../.lest/core')
local describe, it = Lest.describe, Lest.it
local polyfills = require("../out/polyfills")
local runtime = getfenv(polyfills.drainTasks)
local Map, __forEach = runtime.Map, runtime.__forEach

local function names(t)
	local out = {}
	for k in pairs(t or {}) do
		table.insert(out, tostring(k))
	end
	table.sort(out)
	return table.concat(out, ",")
end

describe('globals probe', function ()
	it('Map forEach visits values and tolerates deletion and appended keys', function ()
		local m = Map()
		m.set("a", 1)
		m.set("b", 2)
		local seen = {}
		__forEach(m, function(value, key, map)
			assert(map == m)
			table.insert(seen, key .. value)
			if key == "a" then
				m["delete"]("a")
				m["delete"]("b")
				m.set("c", 3)
			end
		end)
		assert(table.concat(seen, ",") == "a1,c3")
		assert(m.size == 1 and m.get("c") == 3 and not m.has("a"))
	end)
	it('Map forEach visits entries appended after clearing during iteration', function ()
		local m = Map()
		m.set("a", 1)
		m.set("b", 2)
		local seen = {}
		__forEach(m, function(value, key)
			table.insert(seen, value)
			if key == "a" then m.clear(); m.set("c", 3) end
		end)
		assert(#seen == 2 and seen[1] == 1 and seen[2] == 3)
	end)
	it('lists the globals the VM binds', function ()
		print("globals: [" .. names(_G) .. "]")
		print("game:", game)
		print("script:", script)
		print("Instance:", Instance)
		print("task:", task)
		print("Enum:", Enum)
	end)
end)

return nil
