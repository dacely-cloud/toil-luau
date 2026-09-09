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
--[[
	*
	 * Clock-based animation and transition driver for the Roblox UI host.
	 *
	 * Drives @keyframes animations and CSS transitions using a Clock abstraction
	 * (no wall clock inside the module). The driver is started by the host's
	 * commit phase and advanced by calling tick() each frame (in Roblox this is
	 * RunService.Heartbeat; in tests the fake clock advances manually).
	 
]]
local _roblox_host = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host", "roblox-host")
local applyStyle = _roblox_host.applyStyle
local applyAnimatedStyle = _roblox_host.applyAnimatedStyle
local interpolateValue = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "css", "engine").interpolateValue
--[[
	*
	 * Keys of a record via the Luau builtin pairs(): the host must not depend on
	 * the JS `Object` global, which the native test runner does not expose to
	 * every module.
	 
]]
local function keysOf(rec)
	local out = {}
	for k in pairs(rec) do
		table.insert(out, k)
	end
	return out
end
-- Module-local helper: Lest's VM never gets the spike helper globals,
-- so string ops route through plain Luau builtins.
local function charAt(s, i)
	return string.sub(s, i + 1, i + 1)
end
-- ------------------------------------------------------------------ Clock
--[[
	*
	 * A clock that returns the current time in seconds.
	 * The real implementation wraps os.clock(); tests inject a fake.
	 
]]
--* The real clock implementation for the Roblox runtime. 
local function makeRealClock()
	local nowFn = function()
		return os.clock()
	end
	return {
		now = nowFn,
	}
end
--[[
	*
	 * A fake clock for tests: the caller advances it by calling advance(delta).
	 
]]
local function makeFakeClock(start)
	local t = start
	local nowFn = function()
		return t
	end
	local advanceFn = function(delta)
		t += delta
	end
	local valueFn = function()
		return t
	end
	return {
		now = nowFn,
		advance = advanceFn,
		value = valueFn,
	}
end
-- ------------------------------------------------------------------ Animation state
--[[
	*
	 * A running keyframe animation on a specific node.
	 
]]
--[[
	*
	 * A running CSS transition on a specific node.
	 
]]
--[[
	*
	 * The animation driver state. One driver per mounted root.
	 
]]
-- ------------------------------------------------------------------ Driver
--[[
	*
	 * Create a new animation driver.
	 
]]
local function createDriver(clock, engine, env)
	return {
		animations = {},
		transitions = {},
		clock = clock,
		engine = engine,
		env = env,
	}
end
--[[
	*
	 * Start a keyframe animation on a node.
	 * Called from the commit phase when a node's computed style includes
	 * an "anim:" entry.
	 
]]
local function startAnimation(driver, node, spec, keyframes)
	-- Remove any existing animation on this node with the same name
	local existing = -1
	for ii = 0, #driver.animations - 1 do
		if driver.animations[ii + 1].node == node and driver.animations[ii + 1].spec.name == __spikeOptField(spec, "name") then
			existing = ii
			break
		end
	end
	if existing >= 0 then
		local _animations = driver.animations
		local _existing = existing
		table.remove(_animations, _existing + 1)
	end
	local base = {}
	local baseKeys = keysOf(node.computed)
	for ki = 0, #baseKeys - 1 do
		base[baseKeys[ki + 1]] = node.computed[baseKeys[ki + 1]]
	end
	local _animations = driver.animations
	local _arg0 = {
		node = node,
		spec = spec,
		keyframes = keyframes,
		base = base,
		startTime = driver.clock.now(),
		pausedAt = if spec.playState == "paused" then driver.clock.now() else nil,
		engine = driver.engine,
		env = driver.env,
	}
	table.insert(_animations, _arg0)
	-- Mark the properties this animation owns so a re-render's applyStyle
	-- leaves them to the driver (see applyStyle's animated-prop guard).
	local ap = (node.styleState.animatedProps) or {}
	for fi = 0, #keyframes.frames - 1 do
		local ks = keysOf(keyframes.frames[fi + 1].styles)
		for ki = 0, #ks - 1 do
			ap[ks[ki + 1]] = true
		end
	end
	node.styleState.animatedProps = ap
end
--[[
	*
	 * Start a CSS transition on a node for a specific property.
	 * Called from the commit phase when a property value changes and the
	 * style declares a transition for that property.
	 
]]
local function startTransition(driver, node, property, from, to, spec)
	-- Remove any existing transition on this node+property
	local existing = -1
	for ii = 0, #driver.transitions - 1 do
		if driver.transitions[ii + 1].node == node and driver.transitions[ii + 1].property == property then
			existing = ii
			break
		end
	end
	if existing >= 0 then
		local _transitions = driver.transitions
		local _existing = existing
		table.remove(_transitions, _existing + 1)
	end
	local _transitions = driver.transitions
	local _arg0 = {
		node = node,
		property = property,
		from = from,
		to = to,
		spec = spec,
		startTime = driver.clock.now(),
		engine = driver.engine,
		env = driver.env,
	}
	table.insert(_transitions, _arg0)
end
--[[
	*
	 * Advance all running animations and transitions to the current clock time.
	 * Call this once per frame (RunService.Heartbeat in Roblox, manually in tests).
	 
]]
local applyAnimatedValues, applyBaseStyle, rebuildAnimatedProps, applyTransitionValue, interpolateString
local function tick(driver)
	local now = driver.clock.now()
	-- --- Keyframe animations ---
	for i = #driver.animations - 1, 0, -1 do
		local anim = driver.animations[i + 1]
		if anim.node.inst == nil then
			local _animations = driver.animations
			local _i = i
			table.remove(_animations, _i + 1)
			continue
		end
		local _condition = anim.pausedAt
		if _condition == nil then
			_condition = now
		end
		local elapsed = _condition - anim.startTime
		local _binding = anim
		local spec = _binding.spec
		local keyframes = _binding.keyframes
		-- Check if finished (non-infinite)
		local totalDuration = if spec.iterationCount == "infinite" then math.huge else spec.delay + spec.duration * (spec.iterationCount)
		if elapsed >= totalDuration and spec.iterationCount ~= "infinite" then
			-- Animation finished: release the lock so the base/final write lands.
			anim.node.styleState.animatedProps = nil
			if spec.fillMode == "forwards" or spec.fillMode == "both" then
				-- Hold the final frame.
				local sample = driver.engine.evaluateAnimation(spec, keyframes, totalDuration)
				applyAnimatedValues(anim.node, sample.styles, driver.env)
			else
				-- fill-mode none: the element returns to its base style.
				applyBaseStyle(anim.node, anim.base, driver.env)
			end
			-- Remove from running list, then restore the lock for any animations
			-- still running on this node (so their props stay driver-owned).
			local _animations = driver.animations
			local _i = i
			table.remove(_animations, _i + 1)
			rebuildAnimatedProps(driver, anim.node)
			continue
		end
		-- Evaluate at current time
		local sample = driver.engine.evaluateAnimation(spec, keyframes, elapsed)
		-- Apply the interpolated values
		applyAnimatedValues(anim.node, sample.styles, driver.env)
	end
	-- --- CSS transitions ---
	for i = #driver.transitions - 1, 0, -1 do
		local trans = driver.transitions[i + 1]
		if trans.node.inst == nil then
			local _transitions = driver.transitions
			local _i = i
			table.remove(_transitions, _i + 1)
			continue
		end
		local elapsed = now - trans.startTime
		local _binding = trans
		local spec = _binding.spec
		-- Account for delay
		local effectiveElapsed = elapsed - spec.delay
		if effectiveElapsed < 0 then
			-- Still in delay; apply from-value
			applyTransitionValue(trans.node, trans.property, trans.from, driver.env)
			continue
		end
		if effectiveElapsed >= spec.duration then
			-- Transition finished: apply to-value
			applyTransitionValue(trans.node, trans.property, trans.to, driver.env)
			local _transitions = driver.transitions
			local _i = i
			table.remove(_transitions, _i + 1)
			continue
		end
		-- In progress: interpolate
		local progress = effectiveElapsed / spec.duration
		local timedProgress = driver.engine.sampleTiming(spec.timingFunction, progress)
		local value = interpolateString(trans.from, trans.to, timedProgress)
		applyTransitionValue(trans.node, trans.property, value, driver.env)
	end
end
-- ------------------------------------------------------------------ Apply helpers
--[[
	*
	 * Rebuild a node's animated-prop lock from the animations still running on it.
	 * Called when one animation finishes, so a node with several animations (e.g.
	 * a card running both `mesh` and a one-shot `fade-in`) keeps the lock for the
	 * survivors instead of dropping it entirely (which would let a re-render reset
	 * the still-animating properties).
	 
]]
function rebuildAnimatedProps(driver, node)
	local ap = {}
	local any = false
	for i = 0, #driver.animations - 1 do
		local a = driver.animations[i + 1]
		if a.node ~= node then
			continue
		end
		for fi = 0, #a.keyframes.frames - 1 do
			local ks = keysOf(a.keyframes.frames[fi + 1].styles)
			for ki = 0, #ks - 1 do
				ap[ks[ki + 1]] = true
				any = true
			end
		end
	end
	node.styleState.animatedProps = if any then ap else nil
end
--[[
	*
	 * Apply a set of interpolated style values to a node.
	 * The values are canonical CSS strings; we merge them into the node's
	 * computed style and re-run applyStyle.
	 
]]
function applyAnimatedValues(node, values, env)
	applyAnimatedStyle(node, values, env)
end
--* Restore a node to the style it had before an animation started. 
function applyBaseStyle(node, base, env)
	local restored = {}
	local keys = keysOf(base)
	for ki = 0, #keys - 1 do
		restored[keys[ki + 1]] = base[keys[ki + 1]]
	end
	applyStyle(node, restored, env)
end
--[[
	*
	 * Apply a single transitioned property value to a node.
	 
]]
function applyTransitionValue(node, property, value, env)
	applyAnimatedStyle(node, {
		[property] = value,
	}, env)
end
--[[
	*
	 * Interpolate between two canonical CSS strings at a given progress (0..1).
	 * Handles numeric values (with optional unit suffix) and snaps non-numeric
	 * values to the closer end.
	 
]]
function interpolateString(from, to, t)
	return interpolateValue(from, to, t)
end
--* Keep animations and transitions synchronized with React commits, not just initial mount. 
local function syncAnimations(driver, node, targetStyle)
	local previous = node.styleState.targetStyle
	local _condition = targetStyle.animation
	if _condition == nil then
		_condition = targetStyle["anim:"]
		if _condition == nil then
			_condition = ""
		end
	end
	local declaration = _condition
	local _result
	if previous ~= nil then
		local _condition_1 = previous.animation
		if _condition_1 == nil then
			_condition_1 = previous["anim:"]
			if _condition_1 == nil then
				_condition_1 = ""
			end
		end
		_result = _condition_1
	else
		_result = ""
	end
	local oldDeclaration = _result
	if declaration ~= oldDeclaration then
		local specs = driver.engine.parseAnimation(declaration)
		for i = #driver.animations - 1, 0, -1 do
			local running = driver.animations[i + 1]
			if running.node ~= node then
				continue
			end
			local retained = false
			for j = 0, #specs - 1 do
				local spec = specs[j + 1]
				local old = running.spec
				if __spikeOptField(old, "name") == __spikeOptField(spec, "name") and old.duration == spec.duration and old.delay == spec.delay and old.iterationCount == spec.iterationCount and old.direction == spec.direction and old.fillMode == spec.fillMode and old.timingFunction == spec.timingFunction then
					if spec.playState == "paused" and running.pausedAt == nil then
						running.pausedAt = driver.clock.now()
					end
					if spec.playState ~= "paused" and running.pausedAt ~= nil then
						running.startTime += driver.clock.now() - running.pausedAt
						running.pausedAt = nil
					end
					running.spec = spec
					retained = true
					break
				end
			end
			if not retained then
				local _animations = driver.animations
				local _i = i
				table.remove(_animations, _i + 1)
			end
		end
		rebuildAnimatedProps(driver, node)
		for j = 0, #specs - 1 do
			local spec = specs[j + 1]
			local exists = false
			for i = 0, #driver.animations - 1 do
				if driver.animations[i + 1].node == node and driver.animations[i + 1].spec.name == __spikeOptField(spec, "name") then
					exists = true
				end
			end
			if not exists then
				local keyframes = driver.engine.keyframes(__spikeOptField(spec, "name"))
				if keyframes ~= nil then
					local oldComputed = node.computed
					node.computed = targetStyle
					startAnimation(driver, node, spec, keyframes)
					node.computed = oldComputed
				end
			end
		end
	end
	local _condition_1 = previous ~= nil
	if _condition_1 then
		local _condition_2 = targetStyle.transition
		if _condition_2 == nil then
			_condition_2 = ""
		end
		_condition_1 = _condition_2 ~= ""
	end
	if _condition_1 then
		local _engine = driver.engine
		local _condition_2 = targetStyle.transition
		if _condition_2 == nil then
			_condition_2 = ""
		end
		local transitions = _engine.parseTransition(_condition_2)
		for i = 0, #transitions - 1 do
			local spec = transitions[i + 1]
			if spec.duration <= 0 then
				continue
			end
			local keys = if spec.property == "all" then keysOf(targetStyle) else { spec.property }
			for j = 0, #keys - 1 do
				local property = keys[j + 1]
				if property == "transition" or property == "animation" then
					continue
				end
				if previous[property] ~= nil and targetStyle[property] ~= nil and previous[property] ~= targetStyle[property] then
					local _exp = driver
					local _exp_1 = node
					local _condition_3 = node.computed[property]
					if _condition_3 == nil then
						_condition_3 = previous[property]
					end
					startTransition(_exp, _exp_1, property, _condition_3, targetStyle[property], spec)
				end
			end
		end
	end
	local target = {}
	for key, value in pairs(targetStyle) do
		target[key] = value
	end
	node.styleState.targetStyle = target
end
--* Remove all scheduled work for an unmounted subtree immediately. 
local function stopAnimations(driver, node)
	for i = #driver.animations - 1, 0, -1 do
		if driver.animations[i + 1].node == node then
			local _animations = driver.animations
			local _i = i
			table.remove(_animations, _i + 1)
		end
	end
	for i = #driver.transitions - 1, 0, -1 do
		if driver.transitions[i + 1].node == node then
			local _transitions = driver.transitions
			local _i = i
			table.remove(_transitions, _i + 1)
		end
	end
	node.styleState.animatedProps = nil
	for i = 0, #node.children - 1 do
		stopAnimations(driver, node.children[i + 1])
	end
end
local function extractSuffix(s)
	-- Find the first non-numeric character (after optional leading - or +)
	local i = 0
	if i < #s and (charAt(s, i) == "-" or charAt(s, i) == "+") then
		i = 1
	end
	while i < #s do
		local c = charAt(s, i)
		if (c >= "0" and c <= "9") or c == "." then
			i += 1
		else
			break
		end
	end
	return string.sub(s, i + 1)
end
return {
	makeRealClock = makeRealClock,
	makeFakeClock = makeFakeClock,
	createDriver = createDriver,
	startAnimation = startAnimation,
	startTransition = startTransition,
	tick = tick,
	interpolateString = interpolateString,
	syncAnimations = syncAnimations,
	stopAnimations = stopAnimations,
}
