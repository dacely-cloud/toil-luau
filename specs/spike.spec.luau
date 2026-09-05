local Lest = require('../.lest/core')
local describe, it, expect = Lest.describe, Lest.it, Lest.expect

local envErr = nil
local ok, err = pcall(require, "./_spike_env")
if not ok then
	if type(err) == "table" then
		local parts = { "table-error:" }
		for k, v in pairs(err) do
			parts[#parts + 1] = tostring(k) .. "=" .. tostring(v)
		end
		envErr = table.concat(parts, " | ")
	else
		envErr = tostring(err)
	end
end

local _polyfills = require("../out/polyfills")
local taskLog = _polyfills.taskLog or {}

describe('react 19 spike', function ()
	it('renders the counter through the real reconciler', function ()
		if envErr ~= nil then
			print("ENV ERROR:\n" .. envErr)
			print("taskLog (last 40):")
			for i = math.max(1, #taskLog - 39), #taskLog do
				print("  " .. tostring(taskLog[i]))
			end
			local clog = _G.__consoleLog
			if clog ~= nil then
				print("console (last 40):")
				for i = math.max(1, #clog - 39), #clog do
					print("  " .. tostring(clog[i]))
				end
			end
		end
		expect(envErr).toBe(nil)
		local final = taskLog[#taskLog]
		if final ~= "SPIKE-OK" then
			print("taskLog (last 12):")
			for i = math.max(1, #taskLog - 11), #taskLog do
				print("  " .. tostring(taskLog[i]))
			end
		end
		expect(final).toBe("SPIKE-OK")
	end)
end)

return nil