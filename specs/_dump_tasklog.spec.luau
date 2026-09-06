local Lest = require('../.lest/core')
local describe, it = Lest.describe, Lest.it
local ok, err = pcall(require, "./_spike_env")
if not ok then print("ENV ERR: " .. tostring(err)) end
local taskLog = _G.__spikeTaskLog or {}
describe("dump", function ()
	it("full taskLog", function ()
		for i = 1, #taskLog do print("TLOG[" .. i .. "]: " .. tostring(taskLog[i])) end
	end)
end)
return nil
