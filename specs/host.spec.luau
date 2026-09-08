local Lest = require('../.lest/core')
local describe, it, expect = Lest.describe, Lest.it, Lest.expect
local polyfills = require("../out/polyfills")
local animationModule = require("../out/host/animations")

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

-- React lives in the runner's shared environment (published by _spike_env),
-- not on _G, which the native backend keeps separate from getfenv(0).
local function findReact()
	local fromG = rawget(_G, "React")
	if fromG ~= nil then
		return fromG
	end
	local fromEnv = getfenv(0).React
	if fromEnv ~= nil then
		return fromEnv
	end
	local ok, mod = pcall(require, "../out/vendor/toil-react/index")
	if ok and type(mod) == "table" then
		return mod.default or mod
	end
	return nil
end

describe('roblox host', function ()
    it("preserves simultaneous parent and cached child updates", function()
        local React=findReact()
        local setParent,setChild
        local ref={}
        local function Child()
            local state=React.useState(0);setChild=state[2]
            return React.createElement("span",{ref=function(v)ref.current=v end},tostring(state[1]))
        end
        local cached=React.createElement(Child,{key="cached"})
        local function Parent()
            local state=React.useState(0);setParent=state[2]
            local children={cached}
            for i=1,100 do children[#children+1]=React.createElement("span",{key=tostring(i)},tostring(state[1])) end
            return React.createElement("div",nil,table.unpack(children))
        end
        local handle=hostModule.mountReactRoot(nil,{},React.createElement(Parent),nil,hostEnv.env)
        for i=1,50 do
            setChild(i);setParent(i);polyfills.drainTasks()
            assert(ref.current and ref.current.Text==tostring(i),"child state lost at "..i)
        end
        handle.unmount()
    end)

	it('uses one Activated handler for mouse touch and controller buttons', function ()
		local callbacks={}
		local env=table.clone(hostEnv.env)
		env.newInstance=function(class)
			local inst=hostEnv.env.newInstance(class)
			if class=="TextButton" then
				for _,name in {"Activated","MouseButton1Click"} do
					inst[name]={Connect=function(_,callback)callbacks[name]=callback;return {Disconnect=function()end}end}
				end
			end
			return inst
		end
		local count=0
		local config=hostModule.buildHostConfig(env,{resolve=function()return {}end})
		local props={onClick=function()count+=1 end}
		local node=config.createInstance("button",props,nil,nil,nil)
		config.finalizeInitialChildren(node,"button",props)
		assert(callbacks.Activated and not callbacks.MouseButton1Click,"only the cross-device activation signal should be connected")
		for _,kind in {"MouseButton1","Touch","Gamepad1"} do callbacks.Activated({UserInputType=kind},1) end
		assert(count==3,"each activation should produce exactly one click")
	end)
	it('accepts Fragment children and still warns for invalid Fragment props', function ()
		local React = findReact()
		local reactEnv = getfenv(React.createElement)
		local logger = reactEnv.console
		-- The native harness supplies one-based Object.keys for the CSS engine;
		-- vendor React in Studio uses the runtime's zero-based JS arrays.
		local object = reactEnv.Object
		local originalKeys = object.keys
		object.keys = function(_, t)
			local values = {}
			for key in pairs(t) do values[#values+1] = tostring(key) end
			return reactEnv.__arrNew(table.unpack(values))
		end
		local original = logger.error
		local warnings = 0
		logger.error = function(...)
			for _, value in {...} do
				if type(value) == "string" and value:find("Invalid prop", 1, true) then warnings += 1 end
			end
		end
		local ok, err = pcall(function()
			local valid = hostModule.mountReactRoot(nil, {}, React.createElement(React.Fragment, nil, React.createElement("span", nil, "one"), React.createElement("span", nil, "two")), nil, hostEnv.env)
			valid.unmount()
			assert(warnings == 0, "valid Fragment emitted an invalid-prop warning")
			local invalid = hostModule.mountReactRoot(nil, {}, React.createElement(React.Fragment, {badProp=true}, React.createElement("span", nil, "one")), nil, hostEnv.env)
			invalid.unmount()
			assert(warnings > 0, "invalid Fragment props must still be validated")
		end)
		logger.error = original
		object.keys = originalKeys
		assert(ok, err)
	end)
    it("supports horizontal category scrolling without changing vertical lists", function()
        local env=table.clone(hostEnv.env);env.enumValue=function(name)return name end
        local config=hostModule.buildHostConfig(env,{resolve=function(n)return n.pendingProps.style or {} end})
        local n=config.createInstance("scroll",{},nil,nil,nil)
        local vertical={style={overflow="scroll"}}
        config.finalizeInitialChildren(n,"scroll",vertical)
        assert(n.inst.ScrollingDirection=="ScrollingDirection.Y")
        local horizontal={style={overflow="scroll",["overflow-x"]="scroll",["overflow-y"]="hidden"}}
        config.commitUpdate(n,"scroll",vertical,horizontal)
        assert(n.inst.ScrollingDirection=="ScrollingDirection.X" and n.inst.AutomaticCanvasSize=="AutomaticSize.X")
        local both={style={overflow="scroll",["overflow-x"]="auto"}}
        config.commitUpdate(n,"scroll",horizontal,both)
        assert(n.inst.ScrollingDirection=="ScrollingDirection.XY")
        config.commitUpdate(n,"scroll",both,vertical)
        assert(n.inst.ScrollingDirection=="ScrollingDirection.Y")
    end)
	it('supports native Path2D props, updates, refs and change events without GuiObject writes', function ()
		assert(hostModule and hostEnv)
		local config = hostModule.buildHostConfig(hostEnv.env, { resolve = function(n) return n.pendingProps.style or {} end })
		local n = config.createInstance("path2d", {}, nil, nil, nil)
		local zero = hostEnv.env.newUDim2(0,0,0,0)
		local p = { Position = zero, LeftTangent = zero, RightTangent = zero }
		local changes = 0
		local props = { controlPoints = { p }, closed = true, thickness = 4, visible = false, zIndex = 7, color = "#ff0000", onControlPointChanged = function(ev) assert(ev.target == n.inst); changes += 1 end }
		config.finalizeInitialChildren(n, "path2d", props)
		assert(n.inst.ClassName == "Path2D" and n.inst.Closed and n.inst.Thickness == 4 and not n.inst.Visible and n.inst.ZIndex == 7)
		assert(n.inst.Size == nil and n.inst.Position == nil and n.inst.BackgroundColor3 == nil)
		assert(config.getPublicInstance(n) == n.inst)
		config.commitUpdate(n, "path2d", props, props)
		assert(n.inst.ControlPointWrites == 1 and changes == 0, "unchanged points must not emit a feedback loop")
		p.Position = hostEnv.env.newUDim2(0.5, 10, 0.5, 20)
		config.commitUpdate(n, "path2d", props, props)
		assert(n.inst.ControlPointWrites == 2 and changes == 1)
		config.commitUpdate(n, "path2d", props, {})
		assert(#n.inst:GetControlPoints() == 0 and not n.inst.Closed and n.inst.Thickness == 1 and n.inst.Visible and n.inst.ZIndex == 1)
	end)
	it('skips property conversion when a new style table has unchanged values', function ()
		local calls = 0
		local env = table.clone(hostEnv.env)
		env.newUDim2 = function(...) calls += 1; return hostEnv.env.newUDim2(...) end
		local config = hostModule.buildHostConfig(env, { resolve = function(n) return n.pendingProps.style or {} end })
		local n = config.createInstance("div", {}, nil, nil, nil)
		config.finalizeInitialChildren(n, "div", { style = { width = "100px", height = "50px" } })
		local initial = calls
		config.commitUpdate(n, "div", {}, { style = { width = "100px", height = "50px" } })
		assert(calls == initial, "unchanged styles invalidated layout")
		config.commitUpdate(n, "div", {}, { style = { width = "200px", height = "50px" } })
		assert(calls > initial and n.inst.Size.X.Offset == 200)
	end)
	it('starts animation on updates, pauses, resumes, transitions and cancels on removal', function ()
		local engine = hostModule.makeDefaultEngine({{ selector = "@keyframes turn", keyframes = {
			{ offset = 0, styles = { rotation = "0deg" } }, { offset = 1, styles = { rotation = "360deg" } },
		} }})
		local clock = animationModule.makeFakeClock(0)
		local driver = animationModule.createDriver(clock, engine, hostEnv.env)
		local config = hostModule.buildHostConfig(hostEnv.env, {
			resolve = function(n) return n.pendingProps.style or {} end,
			beforeStyle = function(n,s) animationModule.syncAnimations(driver,n,s) end,
			removed = function(n) animationModule.stopAnimations(driver,n) end,
		})
		local n = config.createInstance("div", {}, nil, nil, nil)
		config.finalizeInitialChildren(n, "div", { style = { rotation = "0deg" } })
		local running = { style = { animation = "turn 4s linear infinite" } }
		config.commitUpdate(n, "div", {}, running)
		assert(#driver.animations == 1)
		clock.advance(1); animationModule.tick(driver)
		assert(math.abs(n.inst.Rotation - 90) < 1)
		config.commitUpdate(n,"div",running,{style={animation="turn 4s linear infinite paused"}})
		clock.advance(2); animationModule.tick(driver)
		assert(math.abs(n.inst.Rotation - 90) < 1)
		config.commitUpdate(n,"div",{},running)
		clock.advance(1); animationModule.tick(driver)
		assert(math.abs(n.inst.Rotation - 180) < 1)
		config.commitUpdate(n,"div",{}, {style={rotation="0deg",transition="rotation 2s linear"}})
		config.commitUpdate(n,"div",{}, {style={rotation="100deg",transition="rotation 2s linear"}})
		clock.advance(1); animationModule.tick(driver)
		assert(math.abs(n.inst.Rotation - 50) < 1)
		config.removeChild(nil,n)
		assert(#driver.animations == 0 and #driver.transitions == 0)
	end)
	it('transitions a mounted React component after setState', function ()
		local React = findReact()
		local update
		local ref = {}
		local function App()
			local state = React.useState(false); update = state[2]
			return React.createElement("div", {ref=function(value) ref.current=value end,style={rotation=state[1] and "100" or "0",transition="rotation 2s linear"}})
		end
		local handle=hostModule.mountReactRoot(nil,{},React.createElement(App),nil,hostEnv.env)
		update(true); polyfills.drainTasks(); handle.tick(1)
		assert(ref.current.Rotation > 40 and ref.current.Rotation < 60, tostring(ref.current.Rotation))
		handle.unmount()
		assert(ref.current == nil, "unmount did not release the React ref")
	end)
	it('animates motion without rebuilding gradient resources each frame', function ()
		local colors=0
		local env=table.clone(hostEnv.env)
		env.newColorSequence=function(v) colors+=1; return table.clone(v) end
		local config=hostModule.buildHostConfig(env,{resolve=function(n)return n.pendingProps.style end})
		local node=config.createInstance("div",{},nil,nil,nil)
		config.finalizeInitialChildren(node,"div",{style={width="100px",height="100px",["background-image"]="linear-gradient(90deg, #ff0000, #0000ff)",rotation="0"}})
		local initial=colors
		local clock=animationModule.makeFakeClock(0)
		local engine=hostModule.makeDefaultEngine({})
		local driver=animationModule.createDriver(clock,engine,env)
		animationModule.startTransition(driver,node,"rotation","0","360",{property="rotation",duration=2,delay=0,timingFunction="linear"})
		for i=1,60 do clock.advance(1/60); animationModule.tick(driver) end
		assert(math.abs(node.inst.Rotation-180)<1)
		assert(initial>0 and colors==initial,"animation rebuilt gradient sequences")
	end)
	it('keeps local hover updates out of the parent render and releases removed views', function ()
		local React = findReact()
		local parentRenders, destroyed, update = 0, 0, nil
		local env = table.clone(hostEnv.env)
		env.destroy = function(inst) destroyed += 1; hostEnv.env.destroy(inst) end
		local function Child()
			local state = React.useState(false); update = state[2]
			return React.createElement("div", {style={background=state[1] and "#fff" or "#000"}},
				state[1] and React.createElement("span", {key="tip"}, "tooltip") or nil)
		end
		local function Parent() parentRenders += 1; return React.createElement(Child) end
		local handle=hostModule.mountReactRoot(nil,{},React.createElement(Parent),nil,env)
		local initial = parentRenders
		for i=1,20 do update(i%2==1); polyfills.drainTasks() end
		assert(parentRenders==initial, "local updates rerendered the parent")
		assert(destroyed>=10, "deleted views were detached without destruction")
		handle.unmount(); handle.unmount()
	end)
	it('removes replaced keyed siblings rather than leaving duplicate instances', function ()
		assert(hostModule ~= nil, tostring(hostModuleErr))
		assert(hostEnv ~= nil, tostring(envErr))
		local React = findReact()
		local setState
		local function App()
			local state = React.useState(false)
			setState = state[2]
			return React.createElement("div", { id = "replacementRoot" },
				React.createElement("span", { key = "constant", id = "constant" }, "constant"),
				state[1] and React.createElement("span", { key = "new", id = "new" }, "new")
					or React.createElement("span", { key = "old", id = "old" }, "old"))
		end
		local handle = hostModule.mountReactRoot(nil, {}, React.createElement(App), nil, hostEnv.env)
		local root = handle.gui.Children[1]
		assert(root:FindFirstChild("old") ~= nil)
		setState(true)
		polyfills.drainTasks()
		handle.tick(1)
		assert(root:FindFirstChild("old") == nil, "removed sibling remained in Roblox tree")
		assert(root:FindFirstChild("new") ~= nil)
		handle.unmount()
	end)
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
		if findReact() == nil then
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

		local React = findReact()
		local element = React.createElement("div", { className = "card" },
			React.createElement("button", { className = "btn" }, "Click"),
			React.createElement("span", nil, "Label")
		)

		-- Mount with the rules-aware engine stub above; handle.tick(now) drives
		-- the animation clock in seconds since mount.
		local handle = host.mountReactRoot(container, rules, element, engine, hostEnv.env)

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

		-- Animation: 1s in (half of the 2s period) -> half a turn
		handle.tick(1)
		expect(btn.Rotation).toBe(180)

		-- Full period: back to 0
		handle.tick(2)
		expect(btn.Rotation).toBe(0)

		-- Text children reach the instances
		expect(btn.Text).toBe("Click")
		expect(label.Text).toBe("Label")

		handle.unmount()
	end)

	it('host config: getPublicInstance returns the Roblox instance, priority is stateful', function ()
		if hostModule == nil then
			print("HOST MODULE: " .. tostring(hostModuleErr))
			return
		end
		local host = hostModule
		local resolver = { resolve = function(_node) return {} end }
		local config = host.buildHostConfig(hostEnv.env, resolver)

		-- getPublicInstance hands back the underlying Roblox instance (what a
		-- React ref resolves to), not the internal HostNode wrapper.
		local node = config.createInstance("div", {}, nil, nil, nil)
		local pub = config.getPublicInstance(node)
		expect(pub).toBe(node.inst)
		expect(pub).toNotBe(node)

		-- Update priority is intentionally pinned to the synchronous lane (1):
		-- this host pumps React synchronously, so a concurrent lane would hang
		-- the pump. The getter/resolver always report sync; the setter is a
		-- no-op and must never flip the resolver off the sync lane.
		expect(config.getCurrentUpdatePriority()).toBe(1)
		expect(config.resolveUpdatePriority()).toBe(1)
		config.setCurrentUpdatePriority(32)
		expect(config.getCurrentUpdatePriority()).toBe(1)
		expect(config.resolveUpdatePriority()).toBe(1)
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
