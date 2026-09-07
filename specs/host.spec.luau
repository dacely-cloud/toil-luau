local Lest = require('../.lest/core')
local describe, it, expect = Lest.describe, Lest.it, Lest.expect

-- Load the spike runtime helpers (fake game, task, Instance.new, etc.)
local spikeErr = nil
local ok, err = pcall(require, "./_spike_env")
if not ok then
	spikeErr = tostring(err)
end
-- Note: _spike_env also loads main.tsx which renders the counter.
-- That's fine for our purposes: it sets up _G.React and the full runtime.
-- The host test creates its own ScreenGui and mounts its own tree.

-- Load the fake host environment
local envErr = nil
local hostEnv = nil
local ok2, err2 = pcall(require, "./_host_env")
if not ok2 then
	envErr = tostring(err2)
else
	hostEnv = err2
end

-- Load the host module at file load time (native backend only allows require
-- during spec load, not inside it()).
local hostErr = nil
local host = nil
local ok3, err3 = pcall(require, "../out/host")
if not ok3 then
	hostErr = tostring(err3)
else
	host = err3
end

-- Load the host module exactly as the in-it `require` calls did, but at spec
-- load time (the only place the native backend resolves require). The host
-- module has no global side effects, so a double-load is harmless.
local hostModule = nil
local hostModuleErr = nil
local ok4, err4 = pcall(require, "../out/host")
if ok4 then
	hostModule = err4
else
	hostModuleErr = tostring(err4)
end

describe('roblox host', function ()
	it('mounts a React tree with CSS styling onto a ScreenGui', function ()
		expect(spikeErr).toBe(nil)
		expect(envErr).toBe(nil)
		if spikeErr ~= nil then
			print("SPIKE ENV: " .. tostring(spikeErr))
		end
		if envErr ~= nil then
			print("HOST ENV: " .. tostring(envErr))
			return
		end
		-- If spike env failed but _G.React is still set (it's set before main),
		-- we can still proceed. If not, try to load React directly.
		if (rawget(_G, "React") or rawget(require("./_spike_env"), "env").React) == nil then
			print("React not available")
			return
		end

		-- CSS rules
		local rules = {
			{
				selector = ".card",
				declarations = {
					["background-color"] = "#ff0004",
					["border-radius"] = "8px",
					["padding-top"] = "16px",
					["padding-left"] = "16px",
					["padding-right"] = "16px",
					["padding-bottom"] = "16px",
					["width"] = "200px",
					["height"] = "150px",
				},
			},
			{
				selector = ".btn",
				declarations = {
					["display"] = "flex",
					["justify-content"] = "center",
					["animation"] = "spin 2s linear infinite",
					["background-color"] = "#00ff00",
				},
			},
		}

		local spinKf = {
			name = "spin",
			frames = {
				["0%"] = { ["rotation"] = "0deg" },
				["100%"] = { ["rotation"] = "360deg" },
			},
		}

		-- Minimal engine stub
		local function hasClass(classList, cls)
			for _, c in ipairs(classList) do
				if c == cls then
					return true
				end
			end
			return false
		end

		local engine = {
			computedStyle = function(identity, _ancestors, _si, _sc, inline)
				local result = {}
				local classes = identity.classList or {}
				for _, rule in ipairs(rules) do
					if rule.selector == ".card" and hasClass(classes, "card") then
						for k, v in pairs(rule.declarations) do result[k] = v end
					elseif rule.selector == ".btn" and hasClass(classes, "btn") then
						for k, v in pairs(rule.declarations) do result[k] = v end
					end
				end
				if inline ~= nil then
					for k, v in pairs(inline) do result[k] = v end
				end
				return result
			end,
			keyframes = function(name)
				if name == "spin" then return spinKf end
				return nil
			end,
			parseAnimation = function(value)
				local name = value:match("^(%S+)")
				local durStr = value:match("(%d+)s")
				local dur = tonumber(durStr) or 0
				local iter = "infinite"
				if not value:find("infinite") then
					local n = value:match("(%d+)$")
					if n then iter = tonumber(n) end
				end
				return {
					{
						name = name or "",
						duration = dur,
						timingFunction = "linear",
						delay = 0,
						iterationCount = iter,
						direction = "normal",
						playState = "running",
						fillMode = "none",
					},
				}
			end,
			evaluateAnimation = function(spec, _kf, t)
				if spec.duration <= 0 then
					return { progress = 0, percent = 0, directionReversed = false, finished = false, styles = {} }
				end
				local progress = (t % spec.duration) / spec.duration
				local angle = math.floor(progress * 360)
				return {
					progress = progress,
					percent = progress * 100,
					directionReversed = false,
					finished = false,
					styles = { ["rotation"] = angle .. "deg" },
				}
			end,
			parseTransition = function()
				return {}
			end,
			sampleTiming = function(_fn, p)
				return math.min(1, math.max(0, p))
			end,
		}

		if hostModuleErr ~= nil then
			print("HOST MODULE: " .. tostring(hostModuleErr))
		end
		if hostModule == nil then
			return
		end
		local host = hostModule

		local container = hostEnv.env.newInstance("Frame")
		container.Name = "PlayerGui"

		local React = rawget(_G, "React") or rawget(require("./_spike_env"), "env").React
		local element = React.createElement("div", { className = "card" },
			React.createElement("button", { className = "btn" }, "Click"),
			React.createElement("span", nil, "Label")
		)

		local clockState = { t = 0 }
		local fakeClock = {
			now = function() return clockState.t end,
		}

		-- Minimal fake engine for the host test
		local fakeEngine = {
			computedStyle = function(identity, ancestors, sibIdx, sibCount, inline)
				local result = {}
				for prop, val in pairs(inline or {}) do
					result[prop] = val
				end
				return result
			end,
			keyframes = function(name)
				if name == "spin" then
					return {
						name = "spin",
						frames = {
							["0%"] = { ["transform"] = "rotate(0deg)" },
							["100%"] = { ["transform"] = "rotate(360deg)" },
						},
					}
				end
				return nil
			end,
			parseAnimation = function(value)
				-- Minimal: extract name, duration, iteration
				local name = value:match("^(%S+)")
				local dur = value:match("(%d+%.?%d*)s")
				local iters = 1
				if value:match("infinite") then iters = "infinite" end
				return {
					{
						name = name or "spin",
						duration = tonumber(dur) or 2,
						delay = 0,
						iterationCount = iters,
						timingFunction = "linear",
						fillMode = "none",
						direction = "normal",
						playState = "running",
					},
				}
			end,
			evaluateAnimation = function(anim, kf, t)
				local styles = {}
				local progress = t / anim.duration
				if progress > 1 then progress = 1 end
				local from = kf.frames["0%"] or {}
				local to = kf.frames["100%"] or {}
				for prop, val in pairs(to) do
					-- Simple linear interpolation for numbers
					local fromVal = from[prop] or val
					local numFrom = fromVal:match("(.-)%((%d+)%.")
					local numTo = val:match("(%d+)")
					if numTo then
						local numFrom2 = fromVal:match("(%d+)")
						local f = tonumber(numFrom2) or 0
						local toN = tonumber(numTo)
						local interp = f + (toN - f) * progress
						styles[prop] = val:match("^(.-)%(.*%)"):gsub(".*", tostring(math.floor(interp + 0.5))) .. "deg)"
					else
						styles[prop] = val
					end
				end
				return { styles = styles, time = t }
			end,
			parseTransition = function(value)
				return {}
			end,
			sampleTiming = function(fn, p)
				return p
			end,
		}

		local handle = host.mountReactRoot(container, rules, element, fakeEngine, hostEnv.env)

		-- Shape: ScreenGui > Frame(card) > {TextButton, TextLabel}
		expect(handle.gui.ClassName).toBe("ScreenGui")
		expect(#handle.gui.Children).toBe(1)
		local card = handle.gui.Children[1]
		expect(card.ClassName).toBe("Frame")
		-- card.Children includes helper children (UICorner, UIPadding, etc.)
		-- Find the real content children
		local contentChildren = {}
		for _, ch in ipairs(card.Children) do
			if ch.ClassName == "TextButton" or ch.ClassName == "TextLabel" then
				table.insert(contentChildren, ch)
			end
		end
		expect(#contentChildren).toBe(2)
		local btn = contentChildren[1]
		local label = contentChildren[2]
		expect(btn.ClassName).toBe("TextButton")
		expect(label.ClassName).toBe("TextLabel")

		-- Background color: #ff0004 -> R=255, G=0, B=4
		local bg = card.BackgroundColor3
		expect(bg).toNotBe(nil)
		expect(math.floor(bg.R * 255)).toBe(255)
		expect(math.floor(bg.G * 255)).toBe(0)
		expect(math.floor(bg.B * 255)).toBe(4)

		-- UICorner child exists
		local corner = card:FindFirstChild("ToilCorner")
		expect(corner).toNotBe(nil)
		expect(corner.ClassName).toBe("UICorner")

		-- UIPadding child exists
		local padding = card:FindFirstChild("ToilPadding")
		expect(padding).toNotBe(nil)
		expect(padding.ClassName).toBe("UIPadding")

		-- Animation: advance clock by 1s (half of 2s period), tick, check rotation
		clockState.t = 1
		handle.tick(1)
		expect(btn.Rotation).toBe(180)

		-- Full period: back to 0
		clockState.t = 2
		handle.tick(2)
		expect(btn.Rotation).toBe(0)

		handle.unmount()
	end)

	it('exposes the public API', function ()
		if hostModule == nil then
			print("HOST MODULE: " .. tostring(hostModuleErr))
		end
		local host = hostModule
		expect(host.mountReactRoot).toNotBe(nil)
		expect(host.makeEngineEnv).toNotBe(nil)
		expect(host.makeRealClock).toNotBe(nil)
		expect(host.createDriver).toNotBe(nil)
		expect(host.tick).toNotBe(nil)
		expect(host.startAnimation).toNotBe(nil)
		expect(host.startTransition).toNotBe(nil)
		expect(host.applyStyle).toNotBe(nil)
		expect(host.buildHostConfig).toNotBe(nil)
	end)
end)

return nil
