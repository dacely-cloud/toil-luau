local Lest = require('../.lest/core')
local describe, it = Lest.describe, Lest.it

local ok, err = pcall(require, "./_spike_env")
if not ok then
	print("ENV ERR: " .. tostring(err))
end
local taskLog = _G.__spikeTaskLog or {}

describe("tasklog probe", function ()
	it("dumps taskLog", function ()
		for i = 1, #taskLog do
			print("TLOG: " .. tostring(taskLog[i]))
		end
	end)
end)

return nil