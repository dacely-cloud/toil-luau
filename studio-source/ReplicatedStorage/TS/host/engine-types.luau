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
-- Compiled with roblox-ts v3.0.0
--[[
	*
	 * Public type surface of the CSS engine (src/css/engine.ts), written in
	 * parallel. The host depends only on this surface: when the real engine is
	 * present, src/host/index.ts passes the engine created by the real
	 * `createEngine(rules)` through this interface; while it is being written,
	 * these declarations are the contract.
	 *
	 * Computed style values are CANONICAL STRINGS ("2px", "#ff0004", "0.5",
	 * "flex", "ease-in-out", "infinite"). Keys with the "tr:" prefix hold
	 * transform tokens; the "anim:" key holds a parsed animation spec string.
	 * The host must not couple to those internals beyond reading the values.
	 
]]
--* A single parsed CSS rule, as handed to the engine. 
--* One keyframe frame: property -> canonical value string. 
--* A named @keyframes set: frames in offset order. 
--* One parsed animation declaration (one of a comma list). 
--* The engine's evaluation of one animation at time t (seconds). 
--* One transition declaration for a single property. 
--* Identity of one element for cascade/selector matching. 
--* The engine handle the host drives. 
return nil
