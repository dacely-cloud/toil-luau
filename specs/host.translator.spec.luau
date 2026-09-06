--!strict
-- Host translator spec: tests the new applyStyle CSS-to-Roblox-UI mappings.
local Lest = require("../.lest/core")
local describe, it, expect = Lest.describe, Lest.it, Lest.expect

local _hostEnv
local function hostEnv()
	if _hostEnv == nil then
		local ok, env = pcall(require, "./_host_env")
		if not ok then error("host env require: " .. tostring(env), 2) end
		_hostEnv = env
	end
	return _hostEnv
end

local _globalsSet = false
local function setGlobals()
	if _globalsSet then return end
	local e = hostEnv()
	local _G0 = getfenv(0) or _G
	_G0.isNaN = e.isNaN
		_G0.parseFloat = e.parseFloat
		_G0.parseInt = e.parseInt
		_G0.Number = e.Number
	_globalsSet = true
end

local _hostMod
local function host()
	if _hostMod == nil then
		setGlobals()
		local ok, mod = pcall(require, "../out/host/roblox-host")
		if not ok then error("host require: " .. tostring(mod), 2) end
		_hostMod = mod
	end
	return _hostMod
end

-- Build a minimal HostNode for applyStyle tests.
local function mkNode(nodeType, classes)
	local env = hostEnv().env
	local inst = env.newInstance("Frame")
	return {
		nodeType = nodeType,
		tagName = string.lower(nodeType),
		classList = classes or {},
		attributes = {},
		states = {},
		inst = inst,
		styleState = {},
		parent = nil,
	}
end

-- Find a helper child by name on the instance tree.
local function findHelper(node, name)
	-- Check styleState first (ensureHelperChild tracks there).
	if node.styleState ~= nil and node.styleState[name] ~= nil then
		return node.styleState[name]
	end
	-- Fallback: check the instance children.
	local inst = node.inst
	if inst == nil then return nil end
	local children = inst.children or inst.Children or {}
	for _, child in ipairs(children) do
		if child.Name == name then
			return child
		end
	end
	return nil
end

describe("host translator", function()
	describe("box-shadow", function()
		it("creates a UIStroke helper for box-shadow", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { ["box-shadow"] = "0 0 10px #ff0004" }, env)
			local shadow = findHelper(node, "ToilShadow")
			expect(shadow ~= nil).toBe(true)
			expect(shadow.ClassName).toBe("UIStroke")
			expect(shadow.Thickness).toBe(10)
		end)

		it("sets shadow color from the box-shadow value", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { ["box-shadow"] = "0 0 5px rgba(0, 255, 0, 0.5)" }, env)
			local shadow = findHelper(node, "ToilShadow")
			expect(shadow ~= nil).toBe(true)
			expect(shadow.Color ~= nil).toBe(true)
			expect(shadow.Thickness).toBe(5)
		end)

		it("does not create shadow for box-shadow: none", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { ["box-shadow"] = "none" }, env)
			local shadow = findHelper(node, "ToilShadow")
			expect(shadow == nil).toBe(true)
		end)
	end)

	describe("gap / row-gap / column-gap", function()
		it("sets UIListLayout Padding for gap on a row flex", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { display = "flex", gap = "20px" }, env)
			local layout = findHelper(node, "ToilLayout")
			expect(layout ~= nil).toBe(true)
			expect(layout.Padding ~= nil).toBe(true)
			expect(layout.Padding.Offset).toBe(20)
		end)

		it("sets UIListLayout Padding for row-gap on a column flex", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { display = "flex", ["flex-direction"] = "column", ["row-gap"] = "30px" }, env)
			local layout = findHelper(node, "ToilLayout")
			expect(layout ~= nil).toBe(true)
			expect(layout.Padding ~= nil).toBe(true)
			expect(layout.Padding.Offset).toBe(30)
		end)
	end)

	describe("align-items", function()
		it("sets HorizontalAlignment to Center for column flex with align-items: center", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { display = "flex", ["flex-direction"] = "column", ["align-items"] = "center" }, env)
			local layout = findHelper(node, "ToilLayout")
			expect(layout ~= nil).toBe(true)
			expect(layout.HorizontalAlignment ~= nil).toBe(true)
			expect(layout.HorizontalAlignment.Name).toBe("Center")
		end)

		it("sets VerticalAlignment to Bottom for row flex with align-items: flex-end", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { display = "flex", ["align-items"] = "flex-end" }, env)
			local layout = findHelper(node, "ToilLayout")
			expect(layout ~= nil).toBe(true)
			expect(layout.VerticalAlignment ~= nil).toBe(true)
			expect(layout.VerticalAlignment.Name).toBe("Bottom")
		end)
	end)

	describe("letter-spacing", function()
		it("stores letter-spacing as a custom attribute", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("TextLabel", {})
			h.applyStyle(node, { ["letter-spacing"] = "2px" }, env)
			expect(node.inst.LetterSpacing).toBe("2px")
		end)
	end)

	describe("firstColor / firstLength helpers", function()
		it("firstColor extracts the first color from a box-shadow", function()
			local h = host()
			expect(h.firstColor("0 0 10px #ff0004")).toBe("#ff0004")
			expect(h.firstColor("0 0 10px rgba(0, 255, 0, 0.5)")).toBe("rgba(0, 255, 0, 0.5)")
			expect(h.firstColor("0 0 10px")).toBe("")
		end)

		it("firstLength extracts the blur radius (3rd length) from a box-shadow", function()
			local h = host()
			expect(h.firstLength("0 0 10px #ff0004")).toBe("10px")
			expect(h.firstLength("0 0 5px")).toBe("5px")
		end)
	end)
end)

return nil