-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- toil-luau: install the JS-semantics runtime into this module's environment.
do
	local _rt = require(game:GetService("ReplicatedStorage"):WaitForChild("ToilRuntime"))
	local _env = getfenv(0)
	for _k, _v in pairs(_rt) do
		if rawget(_env, _k) == nil then
			_env[_k] = _v
		end
	end
end
local exports = {}
--[[
	*
	 * Public entry point for the Roblox UI host.
	 *
	 * `mountReactRoot` creates a ScreenGui, builds the hostConfig, and mounts a
	 * React 19 element tree onto it. Returns a handle with `unmount()`,
	 * `tick(now)`, and the root `gui` instance.
	 
]]
local React = TS.import(script, game:GetService("ReplicatedStorage"), "node_modules", "@toil", "react", "index.js")
local ReactReconciler = TS.import(script, game:GetService("ReplicatedStorage"), "node_modules", "@toil", "react-reconciler", "index.js")
local drainTasks = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "polyfills").drainTasks
local _roblox_host = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host", "roblox-host")
local buildHostConfig = _roblox_host.buildHostConfig
local identityFromProps = _roblox_host.identityFromProps
local _animations = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host", "animations")
local makeRealClock = _animations.makeRealClock
local createDriver = _animations.createDriver
local tick = _animations.tick
local syncAnimations = _animations.syncAnimations
local stopAnimations = _animations.stopAnimations
local createRealEngine = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "css", "engine").createEngine
--* Roblox signal/connection shapes, typed as methods so calls emit `:`. 
-- ------------------------------------------------------------------ Engine env
--[[
	*
	 * Build the default HostEnv that reads the real Roblox engine globals.
	 * In tests, a fake env is injected instead.
	 
]]
local function makeEngineEnv()
	local function newInstance(className)
		local inst = Instance.new(className)
		inst.Parent = nil
		return inst
	end
	local function newUDim2(xScale, xOffset, yScale, yOffset)
		return UDim2.new(xScale, xOffset, yScale, yOffset)
	end
	local function newUDim(scale, offset)
		return UDim.new(scale, offset)
	end
	local function newVector2(x, y)
		return Vector2.new(x, y)
	end
	local function newColor3(r, g, b)
		-- parseColor yields 0-255 components. Color3.new expects 0-1 (and
		-- clamps at render, so Color3.new(20, 24, 33) would paint pure white);
		-- Color3.fromRGB is the 0-255 constructor.
		return Color3.fromRGB(r, g, b)
	end
	local function newColorSequence(colors)
		local kpCtor = ColorSequenceKeypoint
		local c3 = Color3
		local count = #colors
		local kps = {}
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += 1
				else
					_shouldIncrement = true
				end
				if not (i < count) then
					break
				end
				local t = if count <= 1 then 0 else i / (count - 1)
				local col = colors[i + 1]
				local _kpCtor = kpCtor.new(t, c3.fromRGB(col.r, col.g, col.b))
				table.insert(kps, _kpCtor)
			end
		end
		return ColorSequence.new(kps)
	end
	local function newNumberSequence(values)
		local kpCtor = NumberSequenceKeypoint
		local count = #values
		local kps = {}
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += 1
				else
					_shouldIncrement = true
				end
				if not (i < count) then
					break
				end
				local t = if count <= 1 then 0 else i / (count - 1)
				local _kpCtor = kpCtor.new(t, values[i + 1])
				table.insert(kps, _kpCtor)
			end
		end
		return NumberSequence.new(kps)
	end
	local function enumValue(name)
		-- name is "EnumType.Member" e.g. "Font.GothamBold". Roblox raises on
		-- an unknown enum or member, so the lookup is protected.
		local parts = string.split(name, ".")
		if #parts ~= 2 then
			return nil
		end
		local ok, value = pcall(function()
			local enumTable = Enum[parts[1]]
			if enumTable == nil then
				return nil
			end
			return enumTable[parts[2]]
		end)
		return if ok then value else nil
	end
	local function destroy(inst)
		inst:Destroy()
	end
	local function setTimeout(fn, delaySeconds)
		-- task.delay schedules on the Roblox task scheduler; the returned thread
		-- is what task.cancel needs to abort it.
		return task.delay(if delaySeconds < 0 then 0 else delaySeconds, fn)
	end
	local function clearTimeout(handle)
		pcall(function()
			task.cancel(handle)
		end)
	end
	return {
		newInstance = newInstance,
		newUDim2 = newUDim2,
		newUDim = newUDim,
		newVector2 = newVector2,
		newColor3 = newColor3,
		newColorSequence = newColorSequence,
		newNumberSequence = newNumberSequence,
		enumValue = enumValue,
		destroy = destroy,
		setTimeout = setTimeout,
		clearTimeout = clearTimeout,
	}
end
--[[
	*
	 * Default engine: the real CSS engine built from `rules`.
	 * While src/css/engine.ts is being brought up to the Engine contract,
	 * mountReactRoot accepts an explicit engine to override this.
	 
]]
local function makeDefaultEngine(rules)
	return createRealEngine(rules)
end
-- ------------------------------------------------------------------ Mount handle
--[[
	*
	 * The handle returned by mountReactRoot.
	 
]]
-- ------------------------------------------------------------------ mountReactRoot
--[[
	*
	 * Mount a React element tree onto a Roblox ScreenGui.
	 *
	 * @param container - An existing instance to parent the ScreenGui to (e.g. PlayerGui).
	 *                    If undefined, the ScreenGui is not parented (caller must do so).
	 * @param rules - The CSS rules to build the engine from.
	 * @param element - The React element to render.
	 * @param engine - The CSS engine (built from `rules`).
	 * @param env - The Roblox API adapter. Defaults to the real engine globals.
	 * @param clock - The clock for animation timing. Defaults to a real clock.
	 * @returns A MountHandle with gui, unmount(), and tick(now).
	 
]]
local function mountReactRoot(container, rules, element, engine, envOverride)
	local e = envOverride or makeEngineEnv()
	local eng = engine or makeDefaultEngine(rules)
	local inlineOnly = engine == nil
	for i = 0, #rules - 1 do
		if rules[i + 1].keyframes == nil then
			inlineOnly = false
		end
	end
	-- The animation clock counts seconds since mount, so handle.tick(now) can
	-- pin it to an absolute time (tests drive animations deterministically);
	-- the Heartbeat path leaves the override unset and reads the real clock.
	local realClock = makeRealClock()
	local mountedAt = realClock.now()
	local clockOverride
	local c = {
		now = function()
			if clockOverride ~= nil then
				return clockOverride
			end
			return realClock.now() - mountedAt
		end,
	}
	-- Create the ScreenGui
	local gui = e.newInstance("ScreenGui")
	gui.Name = "ToilRoot"
	gui.ResetOnSpawn = false
	gui.ZIndexBehavior = e.enumValue("ZIndexBehavior.Sibling")
	if container ~= nil then
		gui.Parent = container
	end
	-- Build the HostNode wrapper for the ScreenGui
	local guiNode = {
		kind = "host",
		nodeType = "gui",
		inst = gui,
		text = "",
		computed = {},
		classId = "",
		classes = "",
		pendingProps = {},
		parent = nil,
		children = {},
		layoutOrder = 0,
		styleState = {},
		identity = {
			tagName = "gui",
			classList = {},
			attributes = {},
			states = {},
		},
	}
	local driver = createDriver(c, eng, e)
	-- Build the style resolver
	-- A function property, not a method: StyleResolver.resolve is called with
	-- a dot (resolver.resolve(node)), so a method form would bind the node to
	-- `self` and leave `node` nil.
	local resolver = {
		beforeStyle = function(node, style)
			return syncAnimations(driver, node, style)
		end,
		removed = function(node)
			return stopAnimations(driver, node)
		end,
		resolve = function(node)
			-- Inline-only trees have no selector dependencies. Reuse normalization
			-- when a React render recreates an equivalent style object.
			if inlineOnly then
				local _condition = node.pendingProps.style
				if _condition == nil then
					_condition = {}
				end
				local input = _condition
				local old = node.styleState.inlineInput
				local equal = old ~= nil
				if old ~= nil then
					for k, v in pairs(input) do
						if old[k] ~= v then
							equal = false
						end
					end
					for k, v in pairs(old) do
						if input[k] ~= v then
							equal = false
						end
					end
				end
				if not equal then
					local snapshot = {}
					for k, v in pairs(input) do
						snapshot[k] = v
					end
					node.styleState.inlineInput = snapshot
					node.styleState.inlineResolved = eng.computedStyle(node.identity, {}, 0, 0, input)
				end
				local result = {}
				local cached = node.styleState.inlineResolved
				for k, v in pairs(cached) do
					result[k] = v
				end
				return result
			end
			-- Keep the identity fresh from the node's last props, so selectors
			-- re-match even when commitUpdate does not fire.
			node.identity = identityFromProps(node, node.pendingProps)
			-- Build the ancestor chain from the node's parent chain
			local ancestors = {}
			local parent = node.parent
			while parent ~= nil do
				local _ancestors = ancestors
				local _identity = parent.identity
				table.insert(_ancestors, _identity)
				parent = parent.parent
			end
			-- Reverse so outermost is first
			-- reverse in place
			local rev = {}
			for ri = #ancestors - 1, 0, -1 do
				local _arg0 = ancestors[ri + 1]
				table.insert(rev, _arg0)
			end
			ancestors = rev
			-- Compute sibling index
			local siblingIndex = 0
			local siblingCount = 0
			if node.parent ~= nil then
				siblingCount = #node.parent.children
				do
					local i = 0
					local _shouldIncrement = false
					while true do
						if _shouldIncrement then
							i += 1
						else
							_shouldIncrement = true
						end
						if not (i < siblingCount) then
							break
						end
						if node.parent.children[i + 1] == node then
							siblingIndex = i
							break
						end
					end
				end
			end
			return eng.computedStyle(node.identity, ancestors, siblingIndex, siblingCount, node.pendingProps.style)
		end,
		engine = engine,
	}
	-- Build the host config
	local hostConfig = buildHostConfig(e, resolver)
	-- Create the reconciler
	local reconciler = ReactReconciler(hostConfig)
	-- Create the container (10 args, matching src/main.tsx)
	local root = reconciler.createContainer(guiNode, 0, nil, false, nil, "", function(errorValue, _info)
		-- A render error must not vanish: React swallows it and commits an
		-- empty tree, which is far harder to diagnose than a printed error.
		local _errorValue = errorValue
		local detail = if type(_errorValue) == "table" then errorValue else nil
		print("[toil] uncaught render error:", if detail ~= nil then tostring(detail.message) .. "\n" .. tostring(detail.stack) else tostring(errorValue))
	end, function(errorValue, _info)
		print("[toil] caught render error:", tostring(errorValue))
	end, function(errorValue, _info)
		print("[toil] recoverable render error:", tostring(errorValue))
	end, function()
		-- console.log("default-indicator");
	end)
	-- Render the element
	clockOverride = 0
	reconciler.updateContainer(element, root, nil, nil)
	drainTasks()
	clockOverride = nil
	-- In real Roblox, RunService.Heartbeat flushes React's task queue (so a
	-- setState from an event handler renders on the next frame) and advances
	-- the animations. Roblox members are method calls, so the signal goes
	-- through the SignalLike shape (emits `:Connect`); the Lest native
	-- backend fakes `game` with an empty Heartbeat table, which the probe
	-- skips.
	local heartbeatConnection
	local runService = game:GetService("RunService")
	local heartbeat = if runService ~= nil then runService.Heartbeat else nil
	local _condition = heartbeat ~= nil
	if _condition then
		local _arg0 = heartbeat.Connect
		_condition = type(_arg0) == "function"
	end
	if _condition then
		heartbeatConnection = heartbeat:Connect(function(_dt)
			drainTasks()
			tick(driver)
		end)
	end
	-- Build the handle
	local unmounted = false
	local function doUnmount()
		if unmounted then
			return nil
		end
		unmounted = true
		if heartbeatConnection ~= nil then
			heartbeatConnection:Disconnect()
		end
		-- Let React release hooks and refs before destroying the root GUI.
		-- Keep the payload's element field present in Luau (a nil field is
		-- omitted from the JS object merge performed by the reconciler).
		reconciler.updateContainer(React.createElement(React.Fragment, nil), root, nil, nil)
		drainTasks()
		stopAnimations(driver, guiNode)
		e.destroy(gui)
	end
	local function doTick(now)
		clockOverride = now
		tick(driver)
		clockOverride = nil
	end
	return {
		gui = gui,
		unmount = doUnmount,
		tick = doTick,
	}
end
-- Re-export for consumers
local _roblox_host_1 = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host", "roblox-host")
exports.applyStyle = _roblox_host_1.applyStyle
exports.buildHostConfig = _roblox_host_1.buildHostConfig
local _loader = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "css", "loader")
exports.parseCss = _loader.parseCss
exports.cssToRules = _loader.cssToRules
local _animations_1 = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host", "animations")
exports.tick = _animations_1.tick
exports.createDriver = _animations_1.createDriver
exports.startAnimation = _animations_1.startAnimation
exports.startTransition = _animations_1.startTransition
exports.makeRealClock = _animations_1.makeRealClock
exports.makeFakeClock = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host", "animations").makeFakeClock
exports.makeEngineEnv = makeEngineEnv
exports.makeDefaultEngine = makeDefaultEngine
exports.mountReactRoot = mountReactRoot
return exports
