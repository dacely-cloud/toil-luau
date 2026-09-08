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

	describe("colors (parseColor)", function()
		it("named colours incl. transparent", function()
			local h = host()
			local t = h.parseColor("tomato")
			expect(t.r).toBe(255)
			expect(t.g).toBe(99)
			expect(t.b).toBe(71)
			expect(t.a).toBe(1)
			expect(h.parseColor("transparent").a).toBe(0)
		end)
		it("8-digit hex carries alpha", function()
			local h = host()
			local c = h.parseColor("#ff000480")
			expect(c.r).toBe(255)
			expect(c.g).toBe(0)
			expect(c.b).toBe(4)
			expect(math.abs(c.a - (128 / 255)) < 0.01).toBe(true)
		end)
		it("4-digit hex", function()
			local h = host()
			local c = h.parseColor("#f00f")
			expect(c.r).toBe(255)
			expect(c.g).toBe(0)
			expect(c.b).toBe(0)
			expect(c.a).toBe(1)
		end)
		it("hsl -> rgb", function()
			local h = host()
			local c = h.parseColor("hsl(240, 100%, 50%)")
			expect(c.r).toBe(0)
			expect(c.g).toBe(0)
			expect(c.b).toBe(255)
		end)
		it("hsla carries alpha", function()
			local h = host()
			local c = h.parseColor("hsla(0, 100%, 50%, 0.5)")
			expect(c.r).toBe(255)
			expect(c.g).toBe(0)
			expect(c.b).toBe(0)
			expect(math.abs(c.a - 0.5) < 0.01).toBe(true)
		end)
	end)

	describe("size constraints, aspect ratio, line height", function()
		it("min/max width/height create a UISizeConstraint", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, {
				["min-width"] = "80px",
				["max-width"] = "200px",
				["min-height"] = "40px",
				["max-height"] = "120px",
			}, env)
			local sc = findHelper(node, "ToilSizeConstraint")
			expect(sc ~= nil).toBe(true)
			expect(sc.MinSize.X).toBe(80)
			expect(sc.MinSize.Y).toBe(40)
			expect(sc.MaxSize.X).toBe(200)
			expect(sc.MaxSize.Y).toBe(120)
		end)
		it("aspect-ratio 16 / 9 creates a UIAspectRatioConstraint", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { ["aspect-ratio"] = "16 / 9" }, env)
			local ar = findHelper(node, "ToilAspect")
			expect(ar ~= nil).toBe(true)
			expect(math.abs(ar.AspectRatio - (16 / 9)) < 0.001).toBe(true)
		end)
		it("line-height sets LineHeight on a text instance", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("span", {})
			node.inst = env.newInstance("TextLabel")
			h.applyStyle(node, { ["line-height"] = "1.5" }, env)
			expect(node.inst.LineHeight).toBe(1.5)
		end)
	end)

	describe("extractUrl", function()
		it("pulls a quoted asset id out of url(...)", function()
			local h = host()
			expect(h.extractUrl('url("rbxassetid://123")')).toBe("rbxassetid://123")
			expect(h.extractUrl("url(rbxassetid://456)")).toBe("rbxassetid://456")
			expect(h.extractUrl("linear-gradient(90deg, #fff, #000)")).toBe("")
		end)
	end)

	describe("text / image extras", function()
		it("text-overflow: ellipsis -> TextTruncate.AtEnd", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("span", {})
			node.inst = env.newInstance("TextLabel")
			h.applyStyle(node, { ["text-overflow"] = "ellipsis" }, env)
			expect(node.inst.TextTruncate.Name).toBe("AtEnd")
		end)
		it("flex-wrap: wrap -> UIListLayout.Wraps", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("Frame", {})
			h.applyStyle(node, { display = "flex", ["flex-wrap"] = "wrap" }, env)
			local layout = findHelper(node, "ToilLayout")
			expect(layout ~= nil).toBe(true)
			expect(layout.Wraps).toBe(true)
		end)
		it("object-fit: cover -> ScaleType.Crop on an image", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("img", {})
			node.inst = env.newInstance("ImageLabel")
			h.applyStyle(node, { ["object-fit"] = "cover" }, env)
			expect(node.inst.ScaleType.Name).toBe("Crop")
		end)
		it("background-image url on an image sets Image", function()
			local h = host()
			local env = hostEnv().env
			local node = mkNode("img", {})
			node.inst = env.newInstance("ImageLabel")
			h.applyStyle(node, { ["background-image"] = 'url("rbxassetid://999")' }, env)
			expect(node.inst.Image).toBe("rbxassetid://999")
		end)
	end)
end)

return nil