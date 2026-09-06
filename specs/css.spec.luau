local Lest = require("../.lest/core")
local describe, it, expect = Lest.describe, Lest.it, Lest.expect

local _engineMod
local function eng(rules)
	if _engineMod == nil then
		local ok, mod = pcall(require, "../out/css/engine")
		if not ok then error("engine require: " .. tostring(mod), 2) end
		_engineMod = mod
	end
	return _engineMod.createEngine(rules or {})
end
local function mkid(nodeType, o)
	o = o or {}
	return {
		nodeType = nodeType,
		tagName = o.tagName or string.lower(nodeType),
		id = o.id,
		classList = o.classes or {},
		attributes = o.attrs or {},
		states = o.states or {},
	}
end

describe("css engine", function()
	describe("selector parsing", function()
		local function colorFor(sel, node, states)
			local e2 = eng({ { selector = sel, declarations = { color = "red" } } })
			return e2.computedStyle(node, nil, 0, 0, nil).color
		end
		it("matches by tag", function() expect(colorFor("button", mkid("Button")) == "red").toBe(true) end)
		it("does not match wrong tag", function() expect(colorFor("button", mkid("Frame")) ~= "red").toBe(true) end)
		it("matches by class", function() expect(colorFor(".primary", mkid("Button", { classes = { "primary" } })) == "red").toBe(true) end)
		it("matches by id", function() expect(colorFor("#nav", mkid("Frame", { id = "nav" })) == "red").toBe(true) end)
		it("matches child combinator", function()
			local e2 = eng({ { selector = "a > b", declarations = { color = "red" } } })
			local styles = e2.computedStyle(mkid("B", { tagName = "b" }), { mkid("A", { tagName = "a" }) }, 0, 0, nil)
			expect(styles.color == "red").toBe(true)
		end)
		it("matches attribute", function()
			local e2 = eng({ { selector = "[disabled]", declarations = { color = "red" } } })
			local styles = e2.computedStyle(mkid("Button", { attrs = { disabled = "true" } }), nil, 0, 0, nil)
			expect(styles.color == "red").toBe(true)
		end)
		it("matches pseudo-class :hover", function()
			local e2 = eng({ { selector = "button:hover", declarations = { color = "red" } } })
			local hit = e2.computedStyle(mkid("Button"), nil, 0, 0, nil)
			-- hover state present on the node's states (an ARRAY of state names)
			local hit2 = e2.computedStyle(mkid("Button", { states = { "hover" } }), nil, 0, 0, nil)
			expect(hit2.color == "red").toBe(true)
			expect(hit.color ~= "red").toBe(true)
		end)
		it("matches :first-child / :last-child", function()
			local e2 = eng({
				{ selector = "a:first-child", declarations = { color = "red" } },
				{ selector = "a:last-child", declarations = { color = "blue" } },
			})
			-- sibling position is passed to computedStyle as 0-based args
			local first = e2.computedStyle(mkid("A"), nil, 0, 3, nil)
			local last = e2.computedStyle(mkid("A"), nil, 2, 3, nil)
			expect(first.color == "red").toBe(true)
			expect(last.color == "blue").toBe(true)
		end)
		it("matches :nth-child(2n+1)", function()
			local e2 = eng({ { selector = "a:nth-child(2n+1)", declarations = { color = "red" } } })
			local odd1 = e2.computedStyle(mkid("A"), nil, 0, 5, nil)
			local even = e2.computedStyle(mkid("A"), nil, 1, 5, nil)
			expect(odd1.color == "red").toBe(true)
			expect(even.color ~= "red").toBe(true)
		end)
		it("matches comma-separated groups", function()
			local e2 = eng({ { selector = "a, b", declarations = { color = "red" } } })
			local a = e2.computedStyle(mkid("A"), nil, 0, 0, nil)
			local b = e2.computedStyle(mkid("B"), nil, 0, 0, nil)
			local c = e2.computedStyle(mkid("C"), nil, 0, 0, nil)
			expect(a.color == "red").toBe(true)
			expect(b.color == "red").toBe(true)
			expect(c.color ~= "red").toBe(true)
		end)
	end)

	describe("specificity + cascade", function()
		local function resolve(rules, node, inline)
			local e2 = eng(rules)
			return e2.computedStyle(node, nil, 0, 0, inline)
		end
		it("higher specificity wins", function()
			local s = resolve({
				{ selector = "div", declarations = { color = "low" } },
				{ selector = ".box", declarations = { color = "mid" } },
				{ selector = "#top", declarations = { color = "high" } },
			}, mkid("Div", { id = "top", classes = { "box" } }))
			expect(s.color).toBe("high")
		end)
		it("same specificity: source order wins (later wins)", function()
			local s = resolve({
				{ selector = ".x", declarations = { color = "first" } },
				{ selector = "[data]", declarations = { color = "second" } },
			}, mkid("A", { classes = { "x" }, attrs = { data = "y" } }))
			expect(s.color).toBe("second")
		end)
		it("inline style wins over everything", function()
			local s = resolve({
				{ selector = "#top", declarations = { color = "red", width = "10px" } },
			}, mkid("Div", { id = "top" }), { color = "blue" })
			expect(s.color).toBe("blue")
			expect(s.width).toBe("10px")
		end)
		it("cascade merges declarations (non-overriding props kept)", function()
			local s = resolve({
				{ selector = "a", declarations = { width = "5px", color = "red" } },
				{ selector = "a", declarations = { height = "7px" } },
			}, mkid("A"))
			expect(s.width).toBe("5px")
			expect(s.color).toBe("red")
			expect(s.height).toBe("7px")
		end)
	end)

	describe("layout placement (engine returns raw values; host computes anchor/offset)", function()
		local function styleOf(rules, node, inline)
			local e2 = eng(rules)
			return e2.computedStyle(node, nil, 0, 0, inline)
		end
		it("centered block carries position/size declarations through", function()
			local s = styleOf({
				{ selector = "frame", declarations = { position = "center", width = "100px", height = "50px" } },
			}, mkid("Frame"))
			expect(s.position).toBe("center")
			expect(s.width).toBe("100px")
			expect(s.height).toBe("50px")
		end)
		it("top-left placement carries its declarations", function()
			local s = styleOf({
				{ selector = "frame", declarations = { position = "top left", width = "10px", height = "10px" } },
			}, mkid("Frame"))
			expect(s.position).toBe("top left")
			expect(s.width).toBe("10px")
			expect(s.height).toBe("10px")
		end)
		it("explicit offsets pass through untouched", function()
			local s = styleOf({
				{ selector = "frame", declarations = { position = "center", width = "200px", height = "100px", left = "10px", top = "20px" } },
			}, mkid("Frame"))
			expect(s.left).toBe("10px")
			expect(s.top).toBe("20px")
			expect(s.position).toBe("center")
		end)
	end)

	describe("keyframes + animation", function()
		local function kfEngine()
			return eng({
				{ selector = "a", declarations = { animation = "grow 1s ease-in-out" } },
				{
					selector = "@keyframes grow",
					keyframes = {
						{ offset = 0, styles = { width = "0px" } },
						{ offset = 1, styles = { width = "100px" } },
					},
				},
			})
		end
		it("parseAnimation extracts name, duration, timing", function()
			local e2 = kfEngine()
			local styles = e2.computedStyle(mkid("A"), nil, 0, 0, nil)
			local specs = e2.parseAnimation(styles.animation)
			expect(specs[1].name).toBe("grow")
			expect(specs[1].duration).toBe(1.0)
			expect(specs[1].timingFunction).toBe("ease-in-out")
		end)
		it("keyframes returns the frame set", function()
			local e2 = kfEngine()
			local kf = e2.keyframes("grow")
			expect(kf ~= nil).toBe(true)
			expect(kf.frames[1].offset).toBe(0)
			expect(kf.frames[2].offset).toBe(1)
		end)
		it("evaluateAnimation interpolates at midpoint", function()
			local e2 = kfEngine()
			local kf = e2.keyframes("grow")
			local anim = {
				name = "grow",
				duration = 1.0,
				timingFunction = "linear",
				delay = 0,
				iterationCount = 1,
				direction = "normal",
				fillMode = "none",
				playState = "running",
			}
			local out = e2.evaluateAnimation(anim, kf, 0.5)
			expect(out.styles.width ~= nil).toBe(true)
			local n = tonumber(out.styles.width:match("^(%d+%.?%d*)"))
			expect(n ~= nil).toBe(true)
			expect(math.abs(n - 50) < 1).toBe(true)
		end)
		it("sampleTiming: linear", function()
			local e2 = eng({})
			expect(e2.sampleTiming("linear", 0.3)).toBeCloseTo(0.3, 4)
			expect(e2.sampleTiming("linear", 1.0)).toBeCloseTo(1.0, 4)
		end)
		it("sampleTiming: ease-in-out endpoints", function()
			local e2 = eng({})
			expect(e2.sampleTiming("ease-in-out", 0.0)).toBeCloseTo(0.0, 4)
			expect(e2.sampleTiming("ease-in-out", 1.0)).toBeCloseTo(1.0, 4)
		end)
	end)

	describe("parseTransition", function()
		it("parses property duration timing", function()
			local e2 = eng({})
			local t = e2.parseTransition("width 0.5s ease 0.1s")[1]
			expect(t.property).toBe("width")
			expect(t.duration).toBe(0.5)
			expect(t.delay).toBe(0.1)
			expect(t.timingFunction).toBe("ease")
		end)
		it("defaults delay to 0", function()
			local e2 = eng({})
			local t = e2.parseTransition("width 300ms")[1]
			expect(t.duration).toBe(0.3)
			expect(t.delay).toBe(0.0)
		end)
	end)
end)

-- ------------------------------------------------------------------ css loader

local _loaderMod
local function loader()
	if _loaderMod == nil then
		local ok, mod = pcall(require, "../out/css/loader")
		if not ok then error("loader require: " .. tostring(mod), 2) end
		_loaderMod = mod
	end
	return _loaderMod
end

describe("css loader", function()
	it("parses a simple rule", function()
		local mod = loader()
		local rules = mod.parseCss(".card { background-color: #ff0004; width: 200px; }")
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe(".card")
		expect(rules[1].declarations["background-color"]).toBe("#ff0004")
		expect(rules[1].declarations["width"]).toBe("200px")
	end)

	it("parses multiple rules", function()
		local mod = loader()
		local rules = mod.parseCss("a { color: red; } b { color: blue; }")
		expect(#rules).toBe(2)
		expect(rules[1].selector).toBe("a")
		expect(rules[2].selector).toBe("b")
		expect(rules[1].declarations.color).toBe("red")
		expect(rules[2].declarations.color).toBe("blue")
	end)

	it("parses comma-separated selector groups", function()
		local mod = loader()
		local rules = mod.parseCss("a, b, c { color: red; }")
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe("a, b, c")
		expect(rules[1].declarations.color).toBe("red")
	end)

	it("parses @keyframes", function()
		local mod = loader()
		local rules = mod.parseCss("@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }")
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe("@keyframes spin")
		expect(rules[1].keyframes ~= nil).toBe(true)
		local frames = rules[1].declarations
		expect(frames["0%"] ~= nil).toBe(true)
		expect(frames["100%"] ~= nil).toBe(true)
		expect(frames["0%"]:match("transform: rotate%((%d+)deg%)") == "0").toBe(true)
		expect(frames["100%"]:match("transform: rotate%((%d+)deg%)") == "360").toBe(true)
	end)

	it("parses @media with nested rules", function()
		local mod = loader()
		local rules = mod.parseCss("@media (max-width: 600px) { .card { width: 100px; } }")
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe(".card")
		expect(rules[1].media).toBe("(max-width:600px)")
		expect(rules[1].declarations.width).toBe("100px")
	end)

	it("parses @import with quoted url", function()
		local mod = loader()
		local rules = mod.parseCss("@import \"theme.css\";")
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe("@import")
		expect(rules[1].importFrom).toBe("theme.css")
	end)

	it("parses @import with bare url", function()
		local mod = loader()
		local rules = mod.parseCss("@import theme.css;")
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe("@import")
		expect(rules[1].importFrom).toBe("theme.css")
	end)

	it("skips comments", function()
		local mod = loader()
		local css = [[
			/* block comment */
			.card {
			-- line comment
			width: 10px; /* inline */
			}
		]]
		local rules = mod.parseCss(css)
		expect(#rules).toBe(1)
		expect(rules[1].selector).toBe(".card")
		expect(rules[1].declarations.width).toBe("10px")
	end)

	it("feeds parsed rules into the cascade engine", function()
		local mod = loader()
		local css = [[
			.btn {
			background-color: #00ff00;
			width: 100px;
			}
			.btn:hover {
			background-color: #ff0004;
			}
		]]
		local rules = mod.parseCss(css)
		local e2 = eng(rules)
		local normal = e2.computedStyle(mkid("Button", { classes = { "btn" } }), nil, 0, 0, nil)
		expect(normal["background-color"]).toBe("#00ff00")
		expect(normal.width).toBe("100px")
		local hover = e2.computedStyle(mkid("Button", { classes = { "btn" }, states = { "hover" } }), nil, 0, 0, nil)
		expect(hover["background-color"]).toBe("#ff0004")
		expect(hover.width).toBe("100px")
	end)

	it("parses @keyframes and feeds into the engine's keyframes lookup", function()
		local mod = loader()
		local css = [[
			@keyframes grow {
			0% { width: 0px; }
			100% { width: 100px; }
			}
		]]
		local rules = mod.parseCss(css)
		local e2 = eng(rules)
		local kf = e2.keyframes("grow")
		expect(kf ~= nil).toBe(true)
		expect(kf.frames[1].offset).toBe(0)
		expect(kf.frames[2].offset).toBe(100)
	end)

	it("parses a full stylesheet with mixed at-rules and normal rules", function()
		local mod = loader()
		local css = [[
			@import "base.css";
			/* app styles */
			body { margin: 0; }
			.header {
			background-color: #333;
			padding: 16px;
			}
			.header .title {
			font-size: 24px;
			color: white;
			}
			@keyframes fade {
			from { opacity: 0; }
			to { opacity: 1; }
			}
			@media (min-width: 768px) {
			.header { padding: 32px; }
			}
		]]
		local rules = mod.parseCss(css)
		expect(#rules).toBe(6)
		expect(rules[1].selector).toBe("@import")
		expect(rules[1].importFrom).toBe("base.css")
		local mediaRule = nil
		for _, r in ipairs(rules) do
			if r.selector == ".header" and r.media ~= nil then
			mediaRule = r
			break
			end
		end
		expect(mediaRule ~= nil).toBe(true)
		expect(mediaRule.media).toBe("(min-width:768px)")
		expect(mediaRule.declarations.padding).toBe("32px")
		local kfRule = nil
		for _, r in ipairs(rules) do
			if r.selector == "@keyframes fade" then
			kfRule = r
			break
			end
		end
		expect(kfRule ~= nil).toBe(true)
		expect(kfRule.declarations["from"] ~= nil).toBe(true)
		expect(kfRule.declarations["to"] ~= nil).toBe(true)
	end)
end)

return nil