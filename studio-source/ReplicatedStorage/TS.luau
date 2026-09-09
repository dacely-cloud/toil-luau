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
	 * Public entry point for toil-luau.
	 *
	 * toil-luau runs the real React 19 reconciler (vendored as @toil/*) on Roblox
	 * Luau. This module re-exports the public surface so a consumer can do:
	 *
	 *   import { mountReactRoot, React } from "toil-luau";
	 *   mountReactRoot(playerGui, cssRules, <MyApp />, undefined, envOverride?);
	 *
	 * - `mountReactRoot` and friends live in ./host (the Roblox UI host).
	 * - `React` re-exports the vendored React 19 runtime (hooks, createElement,
	 *   JSX).
	 * - The CSS engine, animation driver, and host config are re-exported for
	 *   advanced consumers.
	 
]]
local _index = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host")
exports.mountReactRoot = _index.mountReactRoot
exports.makeEngineEnv = _index.makeEngineEnv
exports.makeDefaultEngine = _index.makeDefaultEngine
exports.applyStyle = _index.applyStyle
exports.buildHostConfig = _index.buildHostConfig
exports.tick = _index.tick
exports.createDriver = _index.createDriver
exports.startAnimation = _index.startAnimation
exports.startTransition = _index.startTransition
exports.makeRealClock = _index.makeRealClock
exports.makeFakeClock = _index.makeFakeClock
local _polyfills = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "polyfills")
exports.drainTasks = _polyfills.drainTasks
exports.log = _polyfills.log
exports.taskLog = _polyfills.taskLog
-- CSS text -> StyleRule[] (selectors, @keyframes, @media, @import).
local _loader = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "css", "loader")
exports.parseCss = _loader.parseCss
exports.cssToRules = _loader.cssToRules
-- The vendored React 19 runtime (single-copy graph). The vendor entry is a
-- CommonJS module (`export = React`), so import it as a namespace and
-- re-export it. Consumers write `React.useState`, `React.createContext`, etc.
local React = TS.import(script, game:GetService("ReplicatedStorage"), "node_modules", "@toil", "react", "index.js")
exports.React = React
return exports
