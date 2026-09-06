local Lest = require('../.lest/core')
local describe, it = Lest.describe, Lest.it

local function names(t)
	local out = {}
	for k in pairs(t or {}) do
		table.insert(out, tostring(k))
	end
	table.sort(out)
	return table.concat(out, ",")
end

describe('globals probe', function ()
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