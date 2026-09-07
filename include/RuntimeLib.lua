-- Spike: the native Lest VM resolves require() on disk, relative to this file.
local Promise = require("./Promise")

local RunService = game:GetService("RunService")

local OUTPUT_PREFIX = "roblox-ts: "
local NODE_MODULES = "node_modules"
local DEFAULT_SCOPE = "@rbxts"

local TS = {}

TS.Promise = Promise

-- Spike: map a fake-tree instance path to the emitted file on disk.
-- The file lives at <root>/include/RuntimeLib.lua (roblox-ts restores
-- include/ from upstream on every build), so relative requires use
-- "../../" to reach <root>/out/. Vendor files carry .js names but are
-- Luau content; postbuild renames them to .luau, which the native
-- require() resolver accepts.
local function spikeRequire(instance)
	local p = instance.__path or ""
	local function stripJs(x)
		if x:sub(-3) == ".js" then
			return x:sub(1, -4)
		end
		return x
	end
	if p == "rbxts_include/RuntimeLib" then
		return "RuntimeLib"
	end
	if p == "rbxts_include/Promise" then
		return "Promise"
	end
	local c = nil -- getfenv(0).__spikeRequireCache (cache path is for the module depth, not the include/RuntimeLib depth)
	if c and c[p] ~= nil then
		return c[p]
	end
	local target
	local t = p:match("^TS/(.*)$")
	if t then
		target = stripJs(t)
	else
		local r = p:match("^node_modules/@toil/react%-reconciler/(.*)$")
		if r then
			target = "vendor/toil-react-reconciler/" .. stripJs(r)
		else
			local r = p:match("^node_modules/@toil/scheduler/(.*)$")
			if r then
			target = "vendor/toil-scheduler/" .. stripJs(r)
		else
			local r = p:match("^node_modules/@toil/react/(.*)$")
			if r then
			target = "vendor/toil-react/" .. stripJs(r)
		else
				error("spike: unmapped instance path " .. p, 2)
			end
			end
			end
	end
	local ownSrc = debug.info(2, "s") or ""
	local outRoot = ownSrc:match("^(.*)/out/") or "."
	local outRootEsc = outRoot:gsub("([%.%-%(%)%[%]%*%+%?%^%$%{%}])", "%%%1")
	local ownRel = ownSrc:match("^" .. outRootEsc .. "/out/(.*)$")
	if not ownRel then
		return "../../" .. target
	end
	local ownBase = ownRel:match("^(.*)/[^/]+$") or ""
	local up = 0
	local tmp = ownBase
	while tmp ~= "" and tmp ~= "." do
		up += 1
		tmp = tmp:match("^(.*)/[^/]+$") or ""
	end
	local prefix = string.rep("../", up)
	return prefix .. target
end


local function isPlugin(context)
	return RunService:IsStudio() and context:FindFirstAncestorWhichIsA("Plugin") ~= nil
end

function TS.getModule(context, scope, moduleName)
	-- legacy call signature
	if moduleName == nil then
		moduleName = scope
		scope = DEFAULT_SCOPE
	end

	-- ensure modules have fully replicated
	if RunService:IsRunning() and RunService:IsClient() and not isPlugin(context) and not game:IsLoaded() then
		game.Loaded:Wait()
	end

	local object = context
	repeat
		local nodeModulesFolder = object:FindFirstChild(NODE_MODULES)
		if nodeModulesFolder then
			local scopeFolder = nodeModulesFolder:FindFirstChild(scope)
			if scopeFolder then
				local module = scopeFolder:FindFirstChild(moduleName)
				if module then
					return module
				end
			end
		end
		object = object.Parent
	until object == nil

	error(OUTPUT_PREFIX .. "Could not find module: " .. moduleName, 2)
end

-- This is a hash which TS.import uses as a kind of linked-list-like history of [Script who Loaded] -> Library
local currentlyLoading = {}
local registeredLibraries = {}

function TS.import(context, module, ...)
	for i = 1, select("#", ...) do
		module = module:WaitForChild((select(i, ...)))
	end

	if module.ClassName ~= "ModuleScript" then
		error(OUTPUT_PREFIX .. "Failed to import! Expected ModuleScript, got " .. module.ClassName, 2)
	end

	currentlyLoading[context] = module

	-- Check to see if a case like this occurs:
	-- module -> Module1 -> Module2 -> module

	-- WHERE currentlyLoading[module] is Module1
	-- and currentlyLoading[Module1] is Module2
	-- and currentlyLoading[Module2] is module

	local currentModule = module
	local depth = 0

	while currentModule do
		depth = depth + 1
		currentModule = currentlyLoading[currentModule]

		if currentModule == module then
			local str = currentModule.Name -- Get the string traceback

			for _ = 1, depth do
				currentModule = currentlyLoading[currentModule]
				str = str .. "  ⇒ " .. currentModule.Name
			end

			error(OUTPUT_PREFIX .. "Failed to import! Detected a circular dependency chain: " .. str, 2)
		end
	end

	if not registeredLibraries[module] then
		if _G[module] then
			error(
				OUTPUT_PREFIX
				.. "Invalid module access! Do you have multiple TS runtimes trying to import this? "
				.. module:GetFullName(),
				2
			)
		end

		_G[module] = TS
		registeredLibraries[module] = true -- register as already loaded for subsequent calls
	end

	local data = require(spikeRequire(module))

	if currentlyLoading[context] == module then -- Thread-safe cleanup!
		currentlyLoading[context] = nil
	end

	return data
end

function TS.instanceof(obj, class)
	-- custom Class.instanceof() check
	if type(class) == "table" and type(class.instanceof) == "function" then
		return class.instanceof(obj)
	end

	-- metatable check
	if type(obj) == "table" then
		obj = getmetatable(obj)
		while obj ~= nil do
			if obj == class then
				return true
			end
			local mt = getmetatable(obj)
			if mt then
				obj = mt.__index
			else
				obj = nil
			end
		end
	end

	return false
end

function TS.async(callback)
	return function(...)
		local n = select("#", ...)
		local args = { ... }
		return Promise.new(function(resolve, reject)
			coroutine.wrap(function()
				local ok, result = pcall(callback, unpack(args, 1, n))
				if ok then
					resolve(result)
				else
					reject(result)
				end
			end)()
		end)
	end
end

function TS.await(promise)
	if not Promise.is(promise) then
		return promise
	end

	local status, value = promise:awaitStatus()
	if status == Promise.Status.Resolved then
		return value
	elseif status == Promise.Status.Rejected then
		error(value, 2)
	else
		error("The awaited Promise was cancelled", 2)
	end
end

local SIGN = 2 ^ 31
local COMPLEMENT = 2 ^ 32
local function bit_sign(num)
	-- Restores the sign after an unsigned conversion according to 2s complement.
	if bit32.btest(num, SIGN) then
		return num - COMPLEMENT
	else
		return num
	end
end

function TS.bit_lrsh(a, b)
	return bit_sign(bit32.arshift(a, b))
end

TS.TRY_RETURN = 1
TS.TRY_BREAK = 2
TS.TRY_CONTINUE = 3

function TS.try(try, catch, finally)
	-- execute try
	local trySuccess, exitTypeOrTryError, returns = pcall(try)
	local exitType, tryError
	if trySuccess then
		exitType = exitTypeOrTryError
	else
		tryError = exitTypeOrTryError
	end

	local catchSuccess = true
	local catchError

	-- if try block failed, and catch block exists, execute catch
	if not trySuccess and catch then
		local newExitTypeOrCatchError, newReturns
		catchSuccess, newExitTypeOrCatchError, newReturns = pcall(catch, tryError)
		local newExitType
		if catchSuccess then
			newExitType = newExitTypeOrCatchError
		else
			catchError = newExitTypeOrCatchError
		end

		if newExitType then
			exitType, returns = newExitType, newReturns
		end
	end

	-- execute finally
	if finally then
		local newExitType, newReturns = finally()
		if newExitType then
			exitType, returns = newExitType, newReturns
		end
	end

	-- if exit type is a control flow, do not rethrow errors
	if exitType ~= TS.TRY_RETURN and exitType ~= TS.TRY_BREAK and exitType ~= TS.TRY_CONTINUE then
		-- if catch block threw an error, rethrow it
		if not catchSuccess then
			error(catchError, 2)
		end

		-- if try block threw an error and there was no catch block, rethrow it
		if not trySuccess and not catch then
			error(tryError, 2)
		end
	end

	return exitType, returns
end

function TS.generator(callback)
	local co = coroutine.create(callback)
	return {
		next = function(...)
			if coroutine.status(co) == "dead" then
				return { done = true }
			else
				local success, value = coroutine.resume(co, ...)
				if success == false then
					error(value, 2)
				end
				return {
					value = value,
					done = coroutine.status(co) == "dead",
				}
			end
		end,
	}
end

return TS
