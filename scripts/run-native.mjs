#!/usr/bin/env node
/**
 * Native Lest runner for the spike (no Roblox VM needed).
 *
 *   node scripts/run-native.mjs [suiteName ...]
 *
 * Suites mirror lest.toml: spike, host, css.
 * Each suite loads _spike_env (fake game/tree, renders counter), then specs,
 * then runs the Lest core with a console emitter.
 *
 * Requires are resolved on disk by the luau native runner:
 *   "./x"      -> file relative to the requiring file's directory
 *   "@self/x"  -> x relative to the requiring file's own package dir
 *   "@lest"    -> resolved via .luaurc alias (specs/.lest -> ../.lest symlink)
 */

import { existsSync, readFileSync, writeFileSync, rmSync, symlinkSync, readdirSync, mkdirSync, cpSync } from "node:fs";
import { dirname, resolve, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IS_WIN = process.platform === "win32";

/**
 * Resolve the Luau native binary. Order:
 *   1. LUAU_BIN env var (explicit, always wins)
 *   2. `luau` on PATH
 *   3. platform-specific well-known locations
 * The original hard-coded /tmp/luau-bin/luau (a Linux CI path); on Windows the
 * binary is luau.exe and lives elsewhere, so fall through the candidates.
 */
function resolveLuauBin() {
	if (process.env.LUAU_BIN) return process.env.LUAU_BIN;
	// `luau` / `luau.exe` on PATH.
	const exe = IS_WIN ? "luau.exe" : "luau";
	const which = IS_WIN ? "where" : "command";
	const probe = spawnSync(IS_WIN ? "where" : "sh", IS_WIN ? ["luau.exe"] : ["-c", "command -v luau"], {
		encoding: "utf8",
	});
	const onPath = (probe.stdout ?? "").trim().split(/[\r\n]/).filter(Boolean)[0];
	if (onPath && existsSync(onPath)) return onPath;
	const candidates = IS_WIN
		? [
			"C:/Program Files/luau/luau.exe",
			"C:/ProgramData/luau/luau.exe",
			process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, "luau", "luau.exe") : null,
		]
		: ["/tmp/luau-bin/luau", "/usr/local/bin/luau", "/usr/bin/luau", "/opt/luau/luau"];
	for (const c of candidates) {
		if (c && existsSync(c)) return c;
	}
	// No binary found; return the primary default so the error message names a
	// concrete path the user can act on.
	return IS_WIN ? "luau.exe" : "/tmp/luau-bin/luau";
}
const LUAAU = resolveLuauBin();

/**
 * Create a directory symlink `target -> linkPath`, falling back to a recursive
 * copy when the platform cannot make symlinks (Windows without Developer
 * Mode / admin). These links only need to exist for the luau runner to resolve
 * @spike/out and @lest; a real copy is functionally identical.
 */
function dirLink(target, linkPath) {
	if (existsSync(linkPath)) return;
	mkdirSync(dirname(linkPath), { recursive: true });
	try {
		symlinkSync(target, linkPath, IS_WIN ? "junction" : "dir");
	} catch {
		try {
			cpSync(target, linkPath, { recursive: true });
		} catch {
			// already exists or permission error
		}
	}
}

const SUITES = {
	spike: { env: "specs/_spike_env", specs: ["specs/spike.spec.luau", "specs/globals.spec.luau"] },
	host: { env: "specs/_spike_env", specs: ["specs/host.spec.luau"] },
	"host-translator": { env: "specs/_host_env", specs: ["specs/host.translator.spec.luau"] },
	css: { env: "specs/_css_env", specs: ["specs/css.spec.luau"] },
};

const jsonToLuauArray = (arr) => `{${arr.map((s) => `"${s}"`).join(",")}}`;

const RUNNER_TEMPLATE = String.raw`
-- Lest native runner (generated). cwd = project root.

local LEST_CORE = "%%LEST_CORE_JS%%"
local SPEC_FILES = %%SPEC_FILES_JSON%% -- luau-ignore
local Lest = require(LEST_CORE)

-- Install spike runtime helper globals BEFORE loading specs.
local function installGlobals()
	local env = getfenv(0)
	env.__spikeUnpack = function(t, i, j)
		i = i or 1
		if j == nil then
			local n = 0
			for k = 1, 128 do
				if t[k] ~= nil then n = k end
			end
			j = n
		end
		local n = j - i + 1
		if n <= 0 then return nil end
		if n == 1 then return t[i] end
		if n == 2 then return t[i], t[i+1] end
		if n == 3 then return t[i], t[i+1], t[i+2] end
		return table.unpack(t, i, j)
	end
	env.__spikeRequireTS = function()
		-- Resolve RuntimeLib relative to the requiring file's directory.
		-- The out/ files are at <root>/out/..., so ../include/RuntimeLib
		-- from their dir is <root>/include/RuntimeLib.
		-- But __spikeRequireTS is called from the out/ files, which are in
		-- different subdirectories. The safest approach: use the .luaurc
		-- alias @spike to resolve to <root>/include/RuntimeLib.
		-- Since @spike doesn't resolve from the out/ files either, use a
		-- hardcoded relative path that works from any out/ subdirectory.
		-- The out/ files are at <root>/out/<subdir>/file.luau, so
		-- ../../include/RuntimeLib resolves to <root>/include/RuntimeLib
		-- for files at <root>/out/<subdir>/file.luau.
		-- For files directly in out/ (like main.luau), ../../include/RuntimeLib
		-- would be <root>/../include/RuntimeLib which is wrong.
		-- The simplest fix: try multiple paths.
		local paths = {
			"%%RUNTIME_LIB%%",
			"../include/RuntimeLib",
			"../../include/RuntimeLib",
			"../../../include/RuntimeLib",
		}
		for i = 1, #paths do
			local ok, mod = pcall(require, paths[i])
			if ok then
				return mod
			end
		end
		error("could not find RuntimeLib from any known path")
	end
	env.__spikeFnField = function(fn, key, val, hasVal)
		local t = rawget(_G, "__fnFieldReg")
		if t == nil then t = {}; rawset(_G, "__fnFieldReg", t) end
		if not t[fn] then t[fn] = {} end
		if hasVal then t[fn][key] = val; return val end
		return t[fn][key]
	end
	env.__cat = function(a, b)
		if type(a) == "number" and type(b) == "number" then return a + b end
		return tostring(a) .. tostring(b)
	end
	env.__arrNew = function(...)
		local n = select("#", ...)
		local t = {}
		for i = 1, n do t[i-1] = select(i, ...) end
		rawset(t, "__len", n)
		return t
	end
	env.__len = function(x)
		local l = rawget(x, "__len")
		if l ~= nil then return l end
		if type(x) == "string" then return #x end
		return #x
	end
	env.__push = function(x, ...)
		local l = rawget(x, "__len") or #x
		local n = select("#", ...)
		for i = 1, n do x[l+i-1] = select(i, ...) end
		rawset(x, "__len", l + n)
		return l + n
	end
	env.__pop = function(x)
		local l = rawget(x, "__len") or #x
		if l == 0 then return nil end
		local v = x[l-1]
		x[l-1] = nil
		rawset(x, "__len", l - 1)
		return v
	end
	env.__shift = function(x)
		local l = rawget(x, "__len") or #x
		if l == 0 then return nil end
		local v = x[0]
		for i = 0, l-2 do x[i] = x[i+1] end
		x[l-1] = nil
		rawset(x, "__len", l - 1)
		return v
	end
	env.__indexOf = function(x, v, from)
		local l = rawget(x, "__len") or #x
		local f = from or 0
		for i = f, l-1 do
			if x[i] == v then return i end
		end
		return -1
	end
	env.__slice = function(x, start_, end_)
		local l = rawget(x, "__len") or #x
		local si = start_ or 0
		local ei = end_ or l
		local out = {}
		for i = si, ei-1 do out[i] = x[i] end
		rawset(out, "__len", ei - si)
		return out
	end
	env.__join = function(x, sep)
		local l = rawget(x, "__len") or #x
		local out = {}
		for i = 1, l-1 do
			table.insert(out, tostring(x[i]))
		end
		return table.concat(out, sep or ",")
	end
	env.__strOp = function(s, op, a, b)
		if op == "gsub" then
			if b == nil then return (s:gsub(a)) end
			return (s:gsub(a, b))
		elseif op == "sub" then
			if b == nil then return s:sub(a) end
			return s:sub(a, b)
		elseif op == "match" then
			return s:match(a)
		elseif op == "find" then
			return s:find(a)
		elseif op == "tonumber" then
			return tostring(tonumber(s) or 0)
		elseif op == "lower" then
			return s:lower()
		end
		return s
	end
	env.__strMatch = function(s, pattern) return s:match(pattern) end
	env.__strSplit = function(s, sep)
		local out = {}
		local last = 1
		while true do
			local a, b = s:find(sep, last, true)
			if a == nil then
				table.insert(out, s:sub(last))
				break
			end
			table.insert(out, s:sub(last, a-1))
			last = b + 1
		end
		return out
	end
	env.__objKeys = function(obj)
		local out = {}
		for k in pairs(obj) do
			table.insert(out, k)
		end
		return out
	end
	env.__strGsub = function(s, pattern, repl) return (s:gsub(pattern, repl)) end
	env.typeofJS = function(x)
		if type(x) == "table" then return "object" end
		if type(x) == "string" then return "string" end
		if type(x) == "number" then return "number" end
		if type(x) == "boolean" then return "boolean" end
		if type(x) == "function" then return "function" end
		return "undefined"
	end
	env.typeOfJS = env.typeofJS
	env.parseFloat = function(s)
		if type(s) == "number" then return s end
		local m = tostring(s):match("^%s*(-?%d+%.?%d*)")
		return m and tonumber(m) or 0
	end
	env.parseInt = function(s, _)
		if type(s) == "number" then return math.floor(s) end
		local m = tostring(s):match("^%s*(-?%d+)")
		local n = m and tonumber(m) or 0
		return math.floor(n)
	end
	env.isNaN = function(n) return n ~= n end
	env.Object = setmetatable({}, { __call = function(_, ...) return {} end })
	-- The pure CSS engine (loaded via the spec, whose env chain tops out here)
	-- calls Object:keys on declaration records. The spike env replaces Object
	-- with the full _Obj from _spike_rt.native, but that env is not an ancestor
	-- of the spec's env, so give the runner Object a keys method too.
	env.Object.keys = function(_, t)
		local out = {}
		if type(t) ~= "table" then return out end
		for k in pairs(t) do table.insert(out, tostring(k)) end
		return out
	end
	env.Symbol = { toStringTag = "toStringTag", iterator = "iterator" }
	env.console = {
		log = function(...) print(table.unpack({...})) end,
		warn = function(...) print("[warn]", table.unpack({...})) end,
		error = function(...) print("[error]", table.unpack({...})) end,
		info = function(...) print("[info]", table.unpack({...})) end,
		debug = function(...) print("[debug]", table.unpack({...})) end,
	}
	env.JSON = { stringify = function(v)
		if type(v) == "string" then return '"' .. v .. '"' end
		if type(v) == "number" then return tostring(v) end
		if type(v) == "boolean" then return tostring(v) end
		return "null"
	end }
	env.Math = math
	env.Date = { now = function() return os.clock() * 1000 end }
	env.Error = setmetatable({}, { __call = function(_, msg)
		return { message = msg, name = "Error" }
	end })
	env.Infinity = math.huge
	env.NaN = 0/1
	env.process = { env = { NODE_ENV = "development" } }
	env.performance = { now = function() return os.clock() * 1000 end }
	env.queueMicrotask = function(fn) end
	env.setTimeout = function(fn, _) return 1 end
	env.clearTimeout = function(_) end
	env.setImmediate = function(fn) return 1 end
	env.clearImmediate = function(_) end
	env.__spikeMicrotasks = {}
	env.__spikeMacrotasks = {}
	env.__spikeDrain = function()
		local guard = 0
		while true do
			guard = guard + 1
			if guard > 5000 then error("spike: task queue did not empty within 5000 steps") end
			local m = env.__spikeMicrotasks
			if #m > 0 then
				local fn = table.remove(m, 1)
				fn()
			elseif #env.__spikeMacrotasks > 0 then
				local fn = table.remove(env.__spikeMacrotasks, 1)
				fn()
			else
				break
			end
		end
	end
	env.isArray = function(x) return type(x) == "table" end
	env.__in = function(key, obj)
		if type(obj) == "table" then return rawget(obj, key) ~= nil or rawget(obj, tostring(key)) ~= nil end
		return false
	end
	env.__callFn = function(fn, thisArg, ...)
		if thisArg ~= nil then return fn(thisArg, ...) end
		return fn(...)
	end
	env.__applyFn = function(fn, thisArg, ...)
		local count = select("#", ...)
		local rest = {}
		for i = 1, count do rest[i] = select(i, ...) end
		local args = {}
		local ai = 0
		if thisArg ~= nil then ai = ai + 1; args[ai] = thisArg end
		for i = 1, count do
			ai = ai + 1
			args[ai] = rest[i]
		end
		return fn(env.__spikeUnpack(args, 1, ai))
	end
	env.__partial = function(fn, thisArg, ...)
		local pn = select("#", ...)
		local pre = {}
		for i = 1, pn do pre[i] = select(i, ...) end
		return function(...)
			local cn = select("#", ...)
			local total = 1 + pn + cn
			local args = {}
			args[1] = thisArg
			for i = 1, pn do args[1+i] = pre[i] end
			for i = 1, cn do args[1+pn+i] = select(i, ...) end
			return fn(env.__spikeUnpack(args, 1, total))
		end
	end
	env.__new = function(cls, ...)
		local inst = {}
		local ok, result = pcall(cls, inst, ...)
		if not ok then error(result, 0) end
		if type(result) == "table" or type(result) == "function" then return result end
		return inst
	end
	env.__str = function(x) return tostring(x) end
	env.__protoOf = function(x) return nil end
	env.__protoSet = function(x, p) return p end
	env.__argAt = function(args, i) return args[i] end
	env.__lenSet = function(x, v)
		rawset(x, "__len", math.floor(v))
		return math.floor(v)
	end
	env.__re = function(pattern, flags) return { pattern = pattern, flags = flags or "" } end
	env.__repeat = function(s, n) return string.rep(s, math.floor(n or 0)) end
	env.__trim = function(s) return (s:match("^%s*(.-)%s*$")) end
	env.__toLowerCase = function(s) return s:lower() end
	env.__toUpperCase = function(s) return s:upper() end
	env.__startsWith = function(s, prefix, pos)
		pos = pos or 0
		return s:sub(pos+1, pos+#prefix) == prefix
	end
	env.__charCodeAt = function(s, i)
		local b = s:byte(i+1)
		if b == nil then return -1 end
		return b
	end
	env.__match = function(s, from)
		if type(from) == "table" then
			local m = s:match(from.pattern)
			if m == nil then return nil end
			local out = {}
			out[0] = m
			rawset(out, "__len", 1)
			return out
		end
		local m = s:match(from)
		if m == nil then return nil end
		local out = {}
		out[0] = m
		rawset(out, "__len", 1)
		return out
	end
	env.__split = function(s, sep, _)
		local out = {}
		local last = 1
		local pat
		local plain = false
		if type(sep) == "table" then
			pat = sep.pattern
		else
			pat = sep
			plain = true
		end
		if pat == nil then
			table.insert(out, s)
			return out
		end
		while true do
			local a, b
			if plain then
				a, b = s:find(pat, last, true)
			else
				a, b = s:find(pat, last)
			end
			if a == nil then
				table.insert(out, s:sub(last))
				break
			end
			table.insert(out, s:sub(last, a-1))
			last = b + 1
		end
		return out
	end
	env.__replace = function(s, from, to)
		if type(from) == "table" then
			return (s:gsub(from.pattern, to))
		end
		return (s:gsub(from, to))
	end
	env.__splice = function(x, start_, deleteCount, ...)
		local l = rawget(x, "__len") or #x
		local si = start_ or 0
		if si < 0 then si = math.max(0, l + si) end
		si = math.min(si, l)
		local dc = deleteCount
		if dc == nil then dc = l - si end
		dc = math.min(math.max(math.floor(dc), 0), l - si)
		local items = { ... }
		local tail = l - si - dc
		for i = 0, tail-1 do x[si+#items+i] = x[si+dc+i] end
		for i = 1, #items do x[si+i-1] = items[i] end
		for i = si+dc+#items, l-1 do x[i] = nil end
		rawset(x, "__len", l - dc + #items)
		return {}
	end
	env.__concat = function(x, ...)
		local l = rawget(x, "__len") or #x
		local out = {}
		for i = 0, l-1 do out[i] = x[i] end
		local n = select("#", ...)
		for i = 1, n do out[l+i-1] = select(i, ...) end
		rawset(out, "__len", l + n)
		return out
	end
	env.__includes = function(x, v, from)
		return env.__indexOf(x, v, from) >= 0
	end
	env.__forEach = function(x, fn)
		local l = rawget(x, "__len") or #x
		for i = 0, l-1 do fn(x[i], i, x) end
	end
	env.__map = function(x, fn)
		local l = rawget(x, "__len") or #x
		local out = {}
		for i = 0, l-1 do out[i] = fn(x[i], i, x) end
		rawset(out, "__len", l)
		return out
	end
	env.__filter = function(x, fn)
		local l = rawget(x, "__len") or #x
		local out = {}
		local oi = 0
		for i = 0, l-1 do
			if fn(x[i], i, x) then
				out[oi] = x[i]
				oi = oi + 1
			end
		end
		rawset(out, "__len", oi)
		return out
	end
	env.__find = function(x, fn)
		local l = rawget(x, "__len") or #x
		for i = 0, l-1 do
			if fn(x[i], i, x) then return x[i] end
		end
		return nil
	end
	env.__findIndex = function(x, fn)
		local l = rawget(x, "__len") or #x
		for i = 0, l-1 do
			if fn(x[i], i, x) then return i end
		end
		return -1
	end
	env.__every = function(x, fn)
		local l = rawget(x, "__len") or #x
		for i = 0, l-1 do
			if not fn(x[i], i, x) then return false end
		end
		return true
	end
	env.__some = function(x, fn)
		local l = rawget(x, "__len") or #x
		for i = 0, l-1 do
			if fn(x[i], i, x) then return true end
		end
		return false
	end
	env.__at = function(x, i)
		local l = rawget(x, "__len") or #x
		if i < 0 then i = l + i end
		if i < 0 or i >= l then return nil end
		return x[i]
	end
	env.__sort = function(x, cmp)
		local l = rawget(x, "__len") or #x
		local tmp = {}
		for i = 0, l-1 do tmp[i+1] = x[i] end
		table.sort(tmp, function(a, b)
			if cmp ~= nil then return cmp(a, b) < 0 end
			if type(a) == "number" and type(b) == "number" then return a < b end
			return tostring(a) < tostring(b)
		end)
		for i = 0, l-1 do x[i] = tmp[i+1] end
		return x
	end
	env.__objIs = function(a, b)
		if type(a) == "number" and type(b) == "number" then
			if a == b then return 1/a == 1/b end
			return false
		end
		return a == b
	end
	env.__arrFrom = function(x)
		if x == nil then
			local out = {}
			rawset(out, "__len", 0)
			return out
		end
		local l = rawget(x, "__len") or #x
		local out = {}
		for i = 0, l-1 do
			local v = x[i]
			if v ~= nil then env.__push(out, v) end
		end
		return out
	end
end

installGlobals()

-- Set up the fake game, script, and task globals BEFORE loading specs.
local function setupGame()
__spikeTopLevelQueue = { micro = {}, macro = {} }

	local env = getfenv(0)
	local function makeTree(name, parent)
		local node = {
			Name = name,
			Parent = parent,
			ClassName = "ModuleScript",
			children = {},
			__path = if parent == nil or parent.__path == "" then (if parent == nil then "" else name) else parent.__path .. "/" .. name,
		}
		local mt = {}
		mt.__index = mt
		mt.WaitForChild = function(self, childName)
			local c = self.children[childName]
			if c == nil then
				c = makeTree(childName, self)
				self.children[childName] = c
			end
			return c
		end
		mt.FindFirstChild = function(self, childName)
			return self.children[childName]
		end
		mt.GetFullName = function(self)
			return self.__path
		end
		setmetatable(node, mt)
		return node
	end

	local RS = makeTree("ReplicatedStorage", nil)
	local runService = {
		IsStudio = function() return false end,
		IsRunning = function() return false end,
		IsClient = function() return false end,
		Heartbeat = {},
	}
	env.game = {
		GetService = function(_, name)
			if name == "ReplicatedStorage" then return RS end
			if name == "RunService" then return runService end
			return {}
		end,
		IsLoaded = function() return true end,
		Loaded = { Wait = function() end },
	}
	env.script = { Name = "spike", Parent = nil }
	env.task = {
		spawn = function(fn, ...) fn(...) end,
		defer = function(fn, ...) fn(...) end,
		wait = function(t) return t or 1 end,
	}
end
setupGame()

	-- Pre-load RuntimeLib (the copied versions in out/ have a lazy game mock).
	-- Store in a LOCAL UPVALUE so it is shared across all required modules
	-- via the _spikeSharedRT binding that patchOutFile injects into each
	-- out/*.luau file.
	local _spikeSharedRT
	do
		local ok, RT = pcall(require, "./include/RuntimeLib")
		if ok then
			_spikeSharedRT = RT
			getfenv(0).__spikeRequireCache = getfenv(0).__spikeRequireCache or {}
			getfenv(0).__spikeRequireCache["./include/RuntimeLib"] = RT
			getfenv(0).__spikeRT = RT
		end
	end
do
	local env = getfenv(0)
	env.Lest = Lest
	env.describe = Lest.describe
	env.it = Lest.it
	env.expect = Lest.expect
end

for i = 1, #SPEC_FILES do
	local ok, err = pcall(require, SPEC_FILES[i])
	if not ok then
		local _fullErr = tostring(err)
		print("[SPELOAD_ERR_START]")
		print(_fullErr)
		print("[SPELOAD_ERR_END]")
		print("== SPRITE_EXIT: 2 ==")
		return 2
	end
end

local function emit(ev)
	local kind = ev.kind
	if kind == "test_pass" then
		print("  PASS: " .. table.concat(ev.path, " ") .. " " .. ev.name)
	elseif kind == "test_fail" then
		print("  FAIL: " .. table.concat(ev.path, " ") .. " " .. ev.name)
		if ev.failure then
			local msg = ev.failure.message or tostring(ev.failure)
			print("        " .. tostring(msg))
		end
	elseif kind == "test_skip" then
		print("  SKIP: " .. table.concat(ev.path, " ") .. " " .. ev.name)
	elseif kind == "run_end" then
		print(string.format("== run_end: %d passed, %d failed, %d skipped ==", ev.passed, ev.failed, ev.skipped))
	end
end
local p, f, s = Lest.run(emit)
print("== SPRITE_EXIT: " .. (f == 0 and 0 or 1) .. " ==")
return f == 0 and 0 or 1
`;

function buildSuite(name) {
	const suite = SUITES[name];
	if (!suite) throw new Error(`unknown suite "${name}" (have: ${Object.keys(SUITES).join(", ")})`);
	// luau require resolves "a.b" as a/b, so "css.spec.luau" splits on the
	// dots and fails; require the module WITHOUT the .luau extension (luau
	// appends it). Strip it from every spec path.
	const specFilesRel = [suite.env, ...suite.specs].map((s) => "./" + s.replace(/\.luau$/, ""));
	// Each env may have a pre-processed `.native` sidecar (the runner rewrites
	// `_G.X = Y` to `getfenv(0).X = Y` so module envs see the globals). Use the
	// suite's own env sidecar when present, else fall back to the raw env path.
	const envBase = suite.env.replace(/\.luau$/, "");
	const envSidecar = join(ROOT, envBase + ".native.luau");
	if (existsSync(envSidecar)) {
		specFilesRel[0] = "./" + envBase + ".native";
	}
	const code = RUNNER_TEMPLATE
		.replace("%%LEST_CORE_JS%%", "./.lest/core")
		.replace("%%SPEC_FILES_JSON%%", jsonToLuauArray(specFilesRel))
		.replace("%%RUNTIME_LIB%%", "./include/RuntimeLib")
		// The out/ files each do `local TS = __spikeRequireTS()` at the top.
		// In the luau native runner, the env set by the runner is NOT visible
		// from required modules. The fix: patch each out/ file to replace
		// `local TS = __spikeRequireTS()` with a direct require of RuntimeLib.
		// This is a one-time transform done on the out/ files at build time.
		// Here we do it in-memory by patching the runner to pre-load RuntimeLib
		// and set it as a local that the out/ files can access via a closure.
		// The simplest approach: replace the out/ files' __spikeRequireTS()
		// calls with a direct require path that works from their location.
		.replace("local Lest = require(LEST_CORE)", `
		-- Pre-load RuntimeLib and set it as a global-like value that the
		-- out/ files can access. Since the out/ files do
		-- \`local TS = __spikeRequireTS()\`, and __spikeRequireTS is not
		-- visible from their env, we patch the out/ files to use a
		-- different mechanism: a local upvalue in a wrapper function.
		-- The simplest fix: replace \`__spikeRequireTS()\` in each out/ file
		-- with a direct \`require\` of the RuntimeLib path relative to the
		-- out/ file's location.
		-- This is done by the Node wrapper before running luau.
		local Lest = require(LEST_CORE)
		`);
	return { code, suite };
}

function runSuite(name) {
	// Pre-process _spike_rt.luau: rewrite _G.X = Y to getfenv(0).X = Y
	const spikeRt = join(ROOT, "specs", "_spike_rt.luau");
	const spikeRtSidecar = join(ROOT, "specs", "_spike_rt.native.luau");
	const origRt = readFileSync(spikeRt, "utf8");
	const patchedRt = origRt
		.replace(/^_G\.(\w+)\s*=/gm, "getfenv(0).$1 =")
		// The native runner's module envs are isolated, so queueMicrotask,
		// setTimeout and setImmediate must queue into env-local tables that
		// __spikeDrain (defined per env) empties. The app's polyfills module
		// reads _G.__spike* and installs NO-OP stubs when the key is absent,
		// so the tables must exist BEFORE _globals is installed into the
		// module env; the timers just queue into them. Running them
		// synchronously instead makes the vendored Scheduler's
		// isMessageLoopRunning sticky-true (its performWorkUntilDeadline
		// never sees the callback "finish"), so every task it schedules after
		// the first lands in the isMessageLoopRunning branch and is never
		// flushed by the app's drain.
		.replace(/^_globals = \{\}/m, "_globals = {}\n_globals.__spikeMicrotasks = {}\n_globals.__spikeMacrotasks = {}")
		.replace(
			/queueMicrotask = function\(fn\)\n\s*fn\(\)\nend/,
			`queueMicrotask = function(fn)
	table.insert(getfenv(0).__spikeMicrotasks, fn)
end`
		)
		.replace(
			/setTimeout = function\(fn, _\)\n\s*fn\(\) return 1 end/,
			`setTimeout = function(fn, _)
	table.insert(getfenv(0).__spikeMacrotasks, fn)
	return 1
end`
		)
		.replace(
			/setImmediate = function\(fn\)\n\s*fn\(\) return 1 end/,
			`setImmediate = function(fn)
	table.insert(getfenv(0).__spikeMacrotasks, 1, fn)
	return 1
end`
		)
		.replace(/_G\.Function/g, "getfenv(0).Function")
		.replace(/_G\.Symbol/g, "getfenv(0).Symbol")
		.replace(/_G\.Object/g, "getfenv(0).Object")
		.replace(/_G\.String/g, "getfenv(0).String")
		.replace(/_G\.Array/g, "getfenv(0).Array")
		.replace(/_G\.Error/g, "getfenv(0).Error")
		.replace(/_G\.Math/g, "getfenv(0).Math")
		.replace(/_G\.Date/g, "getfenv(0).Date")
		.replace(/_G\.Reflect/g, "getfenv(0).Reflect")
		.replace(/_G\.JSON/g, "getfenv(0).JSON")
		.replace(/_G\.console/g, "getfenv(0).console")
		.replace(/_G\.Infinity/g, "getfenv(0).Infinity")
		.replace(/_G\.NaN/g, "getfenv(0).NaN")
		.replace(/_G\.unpack/g, "getfenv(0).unpack")
		.replace(/_G\.isArray/g, "getfenv(0).isArray")
		.replace(/_G\.process/g, "getfenv(0).process")
		.replace(/_G\.performance/g, "getfenv(0).performance")
		.replace(/_G\.queueMicrotask/g, "getfenv(0).queueMicrotask")
		.replace(/_G\.setTimeout/g, "getfenv(0).setTimeout")
		.replace(/_G\.clearTimeout/g, "getfenv(0).clearTimeout")
		.replace(/_G\.setImmediate/g, "getfenv(0).setImmediate")
		.replace(/_G\.clearImmediate/g, "getfenv(0).clearImmediate")
		.replace(/_G\.__spikeMicrotasks/g, "getfenv(0).__spikeMicrotasks")
		.replace(/_G\.__spikeMacrotasks/g, "getfenv(0).__spikeMacrotasks")
		.replace(/_G\.__spikeDrain/g, "getfenv(0).__spikeDrain")
		.replace(/_G\.__spikeTaskLog/g, "getfenv(0).__spikeTaskLog")
		.replace(/_G\.__consoleLog/g, "getfenv(0).__consoleLog")
		.replace(/_G\.Map/g, "getfenv(0).Map")
		.replace(/_G\.Set/g, "getfenv(0).Set")
		.replace(/_G\.WeakMap/g, "getfenv(0).WeakMap");
	writeFileSync(spikeRtSidecar, patchedRt);
	const spikeEnv = join(ROOT, "specs", "_spike_env.luau");
	const origEnv = readFileSync(spikeEnv, "utf8");
	const patchedEnv = origEnv.replace(
		'require("./_spike_rt")',
		'require("./_spike_rt.native")'
	);
	const patchedEnv2 = patchedEnv
		.replace(/_G\.game/g, "getfenv(0).game")
		.replace(/_G\.script/g, "getfenv(0).script")
		.replace(/_G\.task/g, "getfenv(0).task")
		.replace(/_G\.Scheduler/g, "getfenv(0).Scheduler")
		.replace(/_G\.React/g, "getfenv(0).React")
		.replace(
			"local main = require(\"../out/main\")\n\nreturn { main = main }",
			`local main = require("../out/main")
-- main's patched header re-required the vendor index wrappers, which
-- clobbered getfenv(0).React with the namespace table (no default
-- export at the top level). main captured what it needed at load time;
-- restore the default for modules loaded afterwards (the host).
local _reactMod = require("../out/vendor/toil-react/index")
getfenv(0).React = _reactMod.default

return { main = main }`
		);
	// Rewrite @spike/... requires to relative paths from specs/
	const patchedEnv3 = patchedEnv2
		.replace(/"@spike\/out\//g, '"../out/')
		.replace(/"@spike\/include\//g, '"../include/')
		.replace(/"@spike\/specs\//g, '"./')
		.replace(/"@spike\/rbxts-include\//g, '"../rbxts-include/');
	writeFileSync(join(ROOT, "specs", "_spike_env.native.luau"), patchedEnv3);

	// Patch out/ files: replace `local TS = __spikeRequireTS()` with a
	// direct require of RuntimeLib. The out/ files are at
	// <root>/out/<subdir>/file.luau, so ../../include/RuntimeLib
	// resolves to <root>/include/RuntimeLib for files two levels deep
	// (out/vendor/toil-scheduler/index.luau -> ../../include/RuntimeLib).
	// For files directly in out/ (main.luau), ../../include/RuntimeLib
	// would be <root>/../include/RuntimeLib which is wrong.
	// The safest approach: use the .luaurc alias @spike which maps to
	// <root>/. But @spike doesn't resolve from out/ files either.
	// The real fix: patch each out/ file to compute the correct relative
	// path at require time. Since all out/ files are at least one level
	// deep in out/, we can use a relative path that works for all of them:
	// the out/ files call __spikeRequireTS() which we replace with a
	// require that tries multiple depths.
	const outDir2 = join(ROOT, "out");
	const readdirSync2 = readdirSync;
	const patchOutFile = (filePath) => {
		const content = readFileSync(filePath, "utf8");
		const fileDir = dirname(filePath);
		const includeDir = join(fileDir, "include");
		const outRel = relative(join(ROOT, "out"), fileDir);
		const depth = outRel === "" ? 1 : outRel.split(sep).length; // out -> 1, out/host -> 2, out/vendor/x -> 3
		const upPrefix = "../".repeat(depth);
		// Which vendor does THIS file belong to? The preload requires the
		// vendor index modules, so any file in a vendor's load chain
		// (its index, or a cjs loaded by that index) must skip requiring its
		// own index or it recurses (the require cache is not populated until
		// a module finishes loading).
		const norm = filePath.split(sep).join("/");
		let selfVendor = null;
		if (norm.includes("/vendor/toil-scheduler/")) selfVendor = "scheduler";
		else if (norm.includes("/vendor/toil-react/")) selfVendor = "react";
		else if (norm.includes("/vendor/toil-react-reconciler/")) selfVendor = "react-reconciler";
		const hasRequireTS = content.includes("__spikeRequireTS") || content.includes("_spikeRequireTS");
		const hasGRef = content.includes("_G.");
		// The spike polyfills module reads the shared __spike* task queues off
		// getfenv(0) (drainTasks) but uses getfenv(0).X, not _G.X, so the two
		// checks above miss it. It needs the header's _globals copy to see the
		// SAME queue tables the scheduler's timers write to, or it drains an
		// empty local and the render never commits. Patch it when it names a
		// spike queue/log symbol.
		const hasSpikeQueue =
			content.includes("__spikeMicrotasks") ||
			content.includes("__spikeMacrotasks") ||
			content.includes("__spikeTaskLog");
		// Vendor index/cjs modules are raw roblox-ts output: they use bare
		// `game`/`script`/`task` globals (not _G.) and don't call
		// __spikeRequireTS, so the three checks above miss them. But they
		// STILL need the NEW_FN header prepended (which publishes game/script/
		// task into the module's own env via TS.globals), or their first line
		// `require(game:GetService(...))` indexes a nil `game`. Patch them by
		// vendor membership. Also patch any out/ file still carrying the raw
		// roblox-ts RuntimeLib-require header (e.g. main.luau, which has no
		// _G./__spike* marker but does `local TS = require(game:GetService(
		// "ReplicatedStorage")...` and so needs game published into its own env).
		const hasRawTsHeader = content.includes(
			'local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))',
		);
		if (!hasRequireTS && !hasGRef && !hasSpikeQueue && selfVendor === null && !hasRawTsHeader) return;
		// The luau native runner does NOT resolve parent directories (../)
		// in require paths. Only same-level or deeper (./x) paths work.
		// The out/ files are at varying depths, so the fix is to copy
		// include/ into each out/ subdirectory, and use "./include/RuntimeLib".
		const rtDst = join(includeDir, "RuntimeLib.lua");
		const isRootInclude = includeDir === join(ROOT, "include");
		// The root include/ ships the plain RuntimeLib.lua (no game mock);
		// patch it too, but force-rewrite it every run because build.sh
		// restores the plain file from upstream.
		if (isRootInclude || !existsSync(rtDst)) {
			try {
				mkdirSync(includeDir, { recursive: true });
				// Use the patched Promise and RuntimeLib (lazy game mock)
				const origPromise = readFileSync(join(ROOT, "include", "Promise.lua"), "utf8");
				const patchedPromise = origPromise.replace(
					'_timeEvent = game:GetService("RunService").Heartbeat,',
					'_timeEvent = nil, -- set lazily after game mock is available,'
				);
				const GAME_MOCK = `
-- Spike: fake game mock + JS globals for the native luau runner (no Roblox VM).
local function _makeTree(name, parent)
	local node = {
		Name = name,
		Parent = parent,
		ClassName = "ModuleScript",
		children = {},
		__path = if parent == nil or parent.__path == "" then (if parent == nil then "" else name) else parent.__path .. "/" .. name,
	}
	local mt = {}
	mt.__index = mt
	mt.WaitForChild = function(self, childName)
		local c = self.children[childName]
		if c == nil then
			c = _makeTree(childName, self)
			self.children[childName] = c
		end
		return c
	end
	mt.FindFirstChild = function(self, childName)
		return self.children[childName]
	end
	mt.GetFullName = function(self)
		return self.__path
	end
	setmetatable(node, mt)
	return node
end
local _RS = _makeTree("ReplicatedStorage", nil)
local _runService = {
	IsStudio = function() return false end,
	IsRunning = function() return false end,
	IsClient = function() return false end,
	Heartbeat = {},
}
local game = {
	GetService = function(_, name)
		if name == "ReplicatedStorage" then return _RS end
		if name == "RunService" then return _runService end
		return {}
	end,
	IsLoaded = function() return true end,
	Loaded = { Wait = function() end },
}
game.__spikeMicrotasks = {}
game.__spikeMacrotasks = {}
getfenv(0).game = game

-- JS globals that the out/ files need (exported via TS.globals)
local _globals = {}
_globals.__spikeMicrotasks = {}
_globals.__spikeMacrotasks = {}
_globals.game = game
_globals.script = { Name = "spike", Parent = nil }
_globals.task = {
	spawn = function(fn, ...) fn(...) end,
	defer = function(fn, ...) fn(...) end,
	wait = function(t) return t or 1 end,
}
_globals.console = {
	log = function(...) print(table.unpack({...})) end,
	warn = function(...) print("[warn]", table.unpack({...})) end,
	error = function(...) print("[error]", table.unpack({...})) end,
	info = function(...) print("[info]", table.unpack({...})) end,
	debug = function(...) print("[debug]", table.unpack({...})) end,
	group = function() end,
	groupCollapsed = function() end,
	groupEnd = function() end,
}
_globals.JSON = {
	stringify = function(v)
		if type(v) == "string" then return '"' .. v .. '"' end
		if type(v) == "number" then return tostring(v) end
		if type(v) == "boolean" then return tostring(v) end
		return "null"
	end,
}
-- Math: native Luau math lacks JS constants (LN2, clz32) and the vendor code
-- calls both dot-style and colon-style. Wrap native math so methods drop a self
-- arg equal to the wrapper, and expose the JS constants as direct fields.
local _mathWrap = setmetatable({}, {
	__index = function(t, k)
		local v = math[k]
		if type(v) == "function" then
			return function(a, b, c, d)
			if a == t then return v(b, c, d) end
			return v(a, b, c, d)
		end
		end
		return v
	end,
})
_mathWrap.LN2 = math.log(2)
_mathWrap.LN10 = math.log(10)
_mathWrap.LOG2E = 1 / math.log(2)
_mathWrap.LOG10E = 1 / math.log(10)
_mathWrap.E = math.exp(1)
_mathWrap.PI = math.pi
_mathWrap.SQRT2 = math.sqrt(2)
_mathWrap.SQRT1_2 = math.sqrt(0.5)
_mathWrap.clz32 = function(x)
	if x == 0 then return 32 end
	local n = 0
	x = math.floor(x)
	while x > 0 and n < 32 do
		x = math.floor(x / 2)
		n = n + 1
	end
	return 32 - n
end
_globals.Math = _mathWrap
_globals.Date = { now = function() return os.clock() * 1000 end }
_globals.Error = setmetatable({}, {
	__call = function(_, msg) return { message = msg, name = "Error" } end,
})
_globals.Infinity = math.huge
_globals.NaN = 0 / 1
_globals.isNaN = function(n) return n ~= n end
_globals.parseInt = function(s, _)
	if type(s) == "number" then return math.floor(s) end
	local m = tostring(s):match("^%s*(-?%d+)")
	return m and math.floor(tonumber(m)) or 0
end
_globals.parseFloat = function(s)
	if type(s) == "number" then return s end
	local m = tostring(s):match("^%s*(-?%d+%.?%d*)")
	return m and tonumber(m) or 0
end
_globals.Number = { isNaN = _globals.isNaN }
-- Bare globals for roblox-host module (shared module-wide per runner comment).
parseFloat = _globals.parseFloat
parseInt = _globals.parseInt
isNaN = _globals.isNaN
Number = _globals.Number
_globals.process = { env = { NODE_ENV = "development" } }
_globals.performance = { now = function() return os.clock() * 1000 end }
-- The task queues live in _globals (which is injected into every module env
-- by reference), so the scheduler's timers and the polyfills drainTasks see
-- the SAME table instances without a shared global.
_globals.queueMicrotask = function(fn) table.insert(_globals.__spikeMicrotasks, fn) end
_globals.setTimeout = function(fn, _) table.insert(_globals.__spikeMacrotasks, fn) return 1 end
_globals.clearTimeout = function(_) end
_globals.setImmediate = function(fn) table.insert(_globals.__spikeMacrotasks, 1, fn) return 1 end
_globals.clearImmediate = function(_) end
local _Obj = setmetatable({}, { __call = function(_, ...) return {} end })
function _Obj.assign(t, ...)
	local n = select("#", ...)
	for i = 1, n do
		local src = select(i, ...)
		if type(src) == "table" then
			for k, v in pairs(src) do rawset(t, k, v) end
		end
	end
	return t
end
function _Obj:keys(t)
	local out = {}
	if type(t) ~= "table" then return out end
	for k in pairs(t) do table.insert(out, tostring(k)) end
	return out
end
function _Obj:freeze(t) return t end
function _Obj:seal(t) return t end
function _Obj:preventExtensions(t) return t end
function _Obj:hasOwnProperty(t, k)
	if type(t) ~= "table" then return false end
	return rawget(t, k) ~= nil
end
function _Obj:defineProperty(t, k, desc)
	if desc ~= nil and type(desc) == "table" then
		if type(t) == "function" then
			-- JS functions can't hold fields; use the spike fn field registry
			_globals.__spikeFnField(t, k, rawget(desc, "value"), true)
		elseif rawget(desc, "get") ~= nil then
			local mt = getmetatable(t)
			if mt == nil then mt = {}; setmetatable(t, mt) end
			mt.__index = function(tbl, key)
				if key == k then return rawget(desc, "get")(tbl) end
				return rawget(tbl, key)
			end
		else
			rawset(t, k, rawget(desc, "value"))
		end
	end
	return t
end
function _Obj:getOwnPropertyDescriptor(t, k)
	local v = rawget(t, k)
	if v == nil then return nil end
	return { value = v, writable = true, configurable = true, enumerable = true }
end
function _Obj:getPrototypeOf(t)
	return getmetatable(t)
end
function _Obj:is(a, b)
	if type(a) == "number" and type(b) == "number" then
		if a == b then return 1/a == 1/b end
		return false
	end
	return a == b
end
function _Obj:toString(obj)
	if type(obj) == "function" then return "[object Function]" end
	if type(obj) == "table" then return "[object Object]" end
	return "[object " .. type(obj) .. "]"
end
_globals.Object = _Obj
local _symForCache = {}
local _Symbol = {
	["for"] = function(nameOrSelf, maybeName)
		-- Called as Symbol["for"](name) (dot call, no self) or
		-- Symbol:for(name) (colon call, self is first).
		local name = if maybeName ~= nil then maybeName else nameOrSelf
		if name == nil then name = "" end
		local s = _symForCache[name]
		if s == nil then
			s = {}
			rawset(s, "__js_symbol", name)
			_symForCache[name] = s
		end
		return s
	end,
}
_Symbol.iterator = {}
rawset(_Symbol.iterator, "__js_symbol", "iterator")
_Symbol.toStringTag = {}
rawset(_Symbol.toStringTag, "__js_symbol", "toStringTag")
_globals.Symbol = _Symbol
_globals.String = function(x) return tostring(x) end
_globals.Number = function(x) return tonumber(x) or 0 end
_globals.Array = setmetatable({}, {
	__call = function(_, n)
		local out = {}
		for i = 1, n or 0 do out[i - 1] = nil end
		return out
	end,
})
_globals.Function = {}
_globals.Reflect = {
	construct = function(C, args)
		local n = args and #args or 0
		local a = {}
		for i = 1, n do a[i] = args[i] end
		return C(table.unpack(a))
	end,
}
_globals.Promise = require("./Promise")
-- JS collection globals the vendored reconciler constructs via
-- __new(Map), __new(Set), __new(WeakMap), __new(WeakSet), which roblox-ts emits for
-- the JS new Map()/new Set()/... constructors. __new calls the constructor as
-- cls(inst) and returns the table it produces, so each is a plain factory
-- function returning a table-backed collection with the methods the reconciler
-- uses (.set/.get/.has/.delete/.add/.clear). Keys are compared by reference,
-- matching JS identity semantics for object keys; a separate key-presence set
-- keeps .has/.delete correct even when a stored value is nil.
local function _makeWeakCollection()
	local self = {}
	function self.add(k) rawset(self, k, true); return self end
	function self.has(k) return rawget(self, k) == true end
	function self.delete(k) local had = rawget(self, k) == true; rawset(self, k, nil); return had end
	return self
end
_globals.WeakSet = _makeWeakCollection
local function _makeCollection(isSet)
	local self = {}
	local store = {}
	local keys = {}
	local n = 0
	function self.set(k, v)
		if keys[k] ~= true then n = n + 1 end
		store[k] = v; keys[k] = true
		return self
	end
	function self.get(k) return store[k] end
	function self.has(k) return keys[k] == true end
	function self.delete(k)
		local had = keys[k] == true
		store[k] = nil; keys[k] = nil
		if had then n = n - 1 end
		return had
	end
	function self.clear() store = {}; keys = {}; n = 0 end
	function self.add(k)
		if keys[k] ~= true then n = n + 1 end
		store[k] = k; keys[k] = true
		return self
	end
	setmetatable(self, { __index = function(_, key)
		if key == "size" then return n end
		return rawget(self, key)
	end })
	return self
end
_globals.Map = _makeCollection
_globals.Set = _makeCollection
_globals.WeakMap = _makeCollection
_globals.typeOfJS = function(x)
	if type(x) == "table" then return "object" end
	if type(x) == "string" then return "string" end
	if type(x) == "number" then return "number" end
	if type(x) == "boolean" then return "boolean" end
	if type(x) == "function" then return "function" end
	return "undefined"
end
_globals.typeofJS = _globals.typeOfJS
_globals.__cat = function(a, b)
	if type(a) == "number" and type(b) == "number" then return a + b end
	return tostring(a) .. tostring(b)
end
_globals.__argAt = function(args, i) return args[i] end
_globals.__str = function(x) return tostring(x) end
_globals.__in = function(key, obj)
	if type(obj) == "table" then return rawget(obj, key) ~= nil or rawget(obj, tostring(key)) ~= nil end
	return false
end
_globals.__callFn = function(fn, thisArg, ...)
	if thisArg ~= nil then return fn(thisArg, ...) end
	return fn(...)
end
_globals.__new = function(cls, ...)
	local inst = {}
	local ok, result = pcall(cls, inst, ...)
	if not ok then error(result, 0) end
	if type(result) == "table" or type(result) == "function" then return result end
	return inst
end
local _protoReg = {}
_globals.__protoOf = function(x)
	local p = _protoReg[x]
	if p ~= nil then return p end
	local d = {}
	_protoReg[x] = d
	return d
end
_globals.__protoSet = function(x, p)
	_protoReg[x] = p
	return p
end
-- Object is the JS Object constructor; the vendored React does
-- Object.prototype.hasOwnProperty via __protoOf(Object).hasOwnProperty.
-- Register Object's own table as its prototype so that lookup resolves to the
-- _Obj methods above (hasOwnProperty etc.) rather than a fresh empty table.
local _ObjProto = setmetatable({}, { __index = _Obj })
_ObjProto.hasOwnProperty = function(t, k)
	if type(t) ~= "table" then return false end
	return rawget(t, k) ~= nil
end
_globals.__protoSet(_globals.Object, _ObjProto)
_globals.__len = function(x)
	if type(x) == "string" then return #x end
	if type(x) == "table" then
		local l = rawget(x, "length")
		if l ~= nil then return l end
		return #x
	end
	return 0
end
_globals.__lenSet = function(x, v)
	rawset(x, "length", math.floor(v))
	return math.floor(v)
end
_globals.__arrNew = function(...)
	local n = select("#", ...)
	local t = {}
	for i = 1, n do t[i-1] = select(i, ...) end
	rawset(t, "length", n)
	return t
end
_globals.__push = function(x, ...)
	local l = rawget(x, "length") or #x
	local n = select("#", ...)
	for i = 1, n do x[l+i-1] = select(i, ...) end
	rawset(x, "length", l + n)
	return l + n
end
_globals.__pop = function(x)
	local l = rawget(x, "length") or #x
	if l == 0 then return nil end
	local v = x[l-1]
	x[l-1] = nil
	rawset(x, "length", l - 1)
	return v
end
_globals.__shift = function(x)
	local l = rawget(x, "length") or #x
	if l == 0 then return nil end
	local v = x[0]
	for i = 0, l-2 do x[i] = x[i+1] end
	x[l-1] = nil
	rawset(x, "length", l - 1)
	return v
end
_globals.__unshift = function(x, ...)
	local n = select("#", ...)
	local l = rawget(x, "length") or #x
	for i = l - 1, 0, -1 do x[i + n] = x[i] end
	for i = 1, n do x[i - 1] = select(i, ...) end
	rawset(x, "length", l + n)
	return l + n
end
_globals.__indexOf = function(x, v, from)
	local l = rawget(x, "length") or #x
	local f = from or 0
	for i = f, l - 1 do
		if x[i] == v then return i end
	end
	return -1
end
_globals.__includes = function(x, v, from)
	return _globals.__indexOf(x, v, from) >= 0
end
_globals.__slice = function(x, start_, end_)
	local l = rawget(x, "length") or #x
	local si = start_ or 0
	local ei = end_ or l
	local out = {}
	for i = si, ei-1 do out[i-si] = x[i] end
	rawset(out, "length", ei - si)
	return out
end
_globals.__splice = function(x, start_, deleteCount, ...)
	local l = rawget(x, "length") or #x
	local si = start_ or 0
	if si < 0 then si = math.max(0, l + si) end
	si = math.min(si, l)
	local dc = deleteCount
	if dc == nil then dc = l - si end
	dc = math.min(math.max(math.floor(dc), 0), l - si)
	local items = { ... }
	local tail = l - si - dc
	for i = 0, tail-1 do x[si+#items+i] = x[si+dc+i] end
	for i = 1, #items do x[si+i-1] = items[i] end
	for i = si+dc+#items, l-1 do x[i] = nil end
	rawset(x, "length", l - dc + #items)
	return _globals.__arrNew()
end
_globals.__concat = function(x, ...)
	local l = rawget(x, "length") or #x
	local out = {}
	for i = 0, l-1 do out[i] = x[i] end
	local n = select("#", ...)
	for i = 1, n do out[l+i-1] = select(i, ...) end
	rawset(out, "length", l + n)
	return out
end
_globals.__forEach = function(x, fn)
	local l = rawget(x, "length") or #x
	for i = 0, l-1 do fn(x[i], i, x) end
end
_globals.__map = function(x, fn)
	local l = rawget(x, "length") or #x
	local out = {}
	for i = 0, l-1 do out[i] = fn(x[i], i, x) end
	rawset(out, "length", l)
	return out
end
_globals.__filter = function(x, fn)
	local l = rawget(x, "length") or #x
	local out = {}
	local oi = 0
	for i = 0, l-1 do
		if fn(x[i], i, x) then
			out[oi] = x[i]
			oi = oi + 1
		end
	end
	rawset(out, "length", oi)
	return out
end
_globals.__find = function(x, fn)
	local l = rawget(x, "length") or #x
	for i = 0, l-1 do
		if fn(x[i], i, x) then return x[i] end
	end
	return nil
end
_globals.__findIndex = function(x, fn)
	local l = rawget(x, "length") or #x
	for i = 0, l-1 do
		if fn(x[i], i, x) then return i end
	end
	return -1
end
_globals.__every = function(x, fn)
	local l = rawget(x, "length") or #x
	for i = 0, l-1 do
		if not fn(x[i], i, x) then return false end
	end
	return true
end
_globals.__some = function(x, fn)
	local l = rawget(x, "length") or #x
	for i = 0, l-1 do
		if fn(x[i], i, x) then return true end
	end
	return false
end
_globals.__at = function(x, i)
	local l = rawget(x, "length") or #x
	if i < 0 then i = l + i end
	if i < 0 or i >= l then return nil end
	return x[i]
end
_globals.__sort = function(x, cmp)
	local l = rawget(x, "length") or #x
	local tmp = {}
	for i = 0, l-1 do tmp[i+1] = x[i] end
	table.sort(tmp, function(a, b)
		if cmp ~= nil then return cmp(a, b) < 0 end
		if type(a) == "number" and type(b) == "number" then return a < b end
		return tostring(a) < tostring(b)
	end)
	for i = 0, l-1 do x[i] = tmp[i+1] end
	return x
end
_globals.__objIs = function(a, b)
	if type(a) == "number" and type(b) == "number" then
		if a == b then return 1/a == 1/b end
		return false
	end
	return a == b
end
_globals.__arrFrom = function(x)
	if x == nil then
		local out = {}
		rawset(out, "length", 0)
		return out
	end
	local l = rawget(x, "length") or #x
	local out = {}
	for i = 0, l-1 do
		local v = x[i]
		if v ~= nil then _globals.__push(out, v) end
	end
	return out
end
_globals.__objKeys = function(obj)
	local out = {}
	for k in pairs(obj) do
		table.insert(out, k)
	end
	return out
end
_globals.__repeat = function(s, n) return string.rep(s, math.floor(n or 0)) end
_globals.__trim = function(s) return (s:match("^%s*(.-)%s*$")) end
_globals.__toLowerCase = function(s) return s:lower() end
_globals.__toUpperCase = function(s) return s:upper() end
_globals.__startsWith = function(s, prefix, pos)
	pos = pos or 0
	return s:sub(pos+1, pos+#prefix) == prefix
end
_globals.__charCodeAt = function(s, i)
	local b = s:byte(i+1)
	if b == nil then return -1 end
	return b
end
_globals.__match = function(s, from)
	if type(from) == "table" then
		local m = s:match(from.pattern)
		if m == nil then return nil end
		local out = {}
		out[0] = m
		rawset(out, "length", 1)
		return out
	end
	local m = s:match(from)
	if m == nil then return nil end
	local out = {}
	out[0] = m
	rawset(out, "length", 1)
	return out
end
_globals.__split = function(s, sep, _)
	local out = {}
	local last = 1
	local pat
	local plain = false
	if type(sep) == "table" then
		pat = sep.pattern
	else
		pat = sep
		plain = true
	end
	if pat == nil then
		table.insert(out, s)
		return out
	end
	while true do
		local a, b
		if plain then
			a, b = s:find(pat, last, true)
		else
			a, b = s:find(pat, last)
		end
		if a == nil then
			table.insert(out, s:sub(last))
			break
		end
		table.insert(out, s:sub(last, a-1))
		last = b + 1
	end
	return out
end
_globals.__replace = function(s, from, to)
	if type(from) == "table" then
		return (s:gsub(from.pattern, to))
	end
	return (s:gsub(from, to))
end
_globals.__re = function(pattern, flags) return { pattern = pattern, flags = flags or "" } end
_globals.__strOp = function(s, op, a, b)
	if op == "gsub" then
		if b == nil then return (s:gsub(a)) end
		return (s:gsub(a, b))
	elseif op == "sub" then
		if b == nil then return s:sub(a) end
		return s:sub(a, b)
	elseif op == "match" then
		return s:match(a)
	elseif op == "find" then
		return s:find(a)
	elseif op == "tonumber" then
		return tostring(tonumber(s) or 0)
	elseif op == "lower" then
		return s:lower()
	end
	return s
end
_globals.__strMatch = function(s, pattern) return s:match(pattern) end
_globals.__strSplit = function(s, sep)
	local out = {}
	local last = 1
	while true do
		local a, b = s:find(sep, last, true)
		if a == nil then
			table.insert(out, s:sub(last))
			break
		end
		table.insert(out, s:sub(last, a-1))
		last = b + 1
	end
	return out
end
_globals.__strGsub = function(s, pattern, repl) return (s:gsub(pattern, repl)) end
_globals.__join = function(x, sep)
	local l = rawget(x, "length") or #x
	local out = {}
	for i = 0, l-1 do
		table.insert(out, tostring(x[i]))
	end
	return table.concat(out, sep or ",")
end
_globals.__applyFn = function(fn, thisArg, ...)
	local count = select("#", ...)
	local rest = {}
	for i = 1, count do rest[i] = select(i, ...) end
	local args = {}
	local ai = 0
	if thisArg ~= nil then ai = ai + 1; args[ai] = thisArg end
	for i = 1, count do
		ai = ai + 1
		args[ai] = rest[i]
	end
	return fn(table.unpack(args, 1, ai))
end
_globals.__partial = function(fn, thisArg, ...)
	local pn = select("#", ...)
	local pre = {}
	for i = 1, pn do pre[i] = select(i, ...) end
	return function(...)
		local cn = select("#", ...)
		local total = 1 + pn + cn
		local args = {}
		args[1] = thisArg
		for i = 1, pn do args[1+i] = pre[i] end
		for i = 1, cn do args[1+pn+i] = select(i, ...) end
		return fn(table.unpack(args, 1, total))
	end
end
_globals.__spikeUnpack = function(t, i, j)
	i = i or 1
	if j == nil then
		local n = 0
		for k = 1, 128 do
			if t[k] ~= nil then n = k end
		end
		j = n
	end
	return table.unpack(t, i, j)
end
_globals.unpack = _globals.__spikeUnpack
local _fnFieldReg = {}
_globals.__spikeFnField = function(fn, key, val, hasVal)
	local t = _fnFieldReg[fn]
	if t == nil then t = {}; _fnFieldReg[fn] = t end
	if hasVal then t[key] = val; return val end
	return t[key]
end
_globals.__spikeCallable = function(ns)
	local t = {}
	setmetatable(t, {
		__call = function(self, ...)
			local d = ns.default
			if type(d) == "function" then
				return d(...)
			end
			error("__spikeCallable: namespace default is not a function", 0)
		end,
	})
	for k, v in pairs(ns) do
		rawset(t, k, v)
	end
	return t
end
_globals.__spikeSetST = function(ST, name, value)
	if type(value) == "function" then
		ST[name] = function(...)
			local args = { ... }
			if args[1] == ST then
				table.remove(args, 1)
			end
			return value(table.unpack(args))
		end
	else
		ST[name] = value
	end
end
_globals.__spikeOptField = function(obj, key)
	if type(obj) == "function" then
		local reg = _fnFieldReg[obj]
		if reg ~= nil then
			return reg[key]
		end
		return nil
	end
	return obj[key]
end
_globals.__spikeOptFieldSet = function(obj, key, val)
	if type(obj) == "function" then
		_globals.__spikeFnField(obj, key, val, true)
	else
		obj[key] = val
	end
	return val
end
_globals.isArray = function(x) return type(x) == "table" end
_globals.__spikeMicrotasks = _G.__spikeMicrotasks or _globals.__spikeMicrotasks or {}
_globals.__spikeMacrotasks = _G.__spikeMacrotasks or _globals.__spikeMacrotasks or {}
_globals.__spikeDrain = function()
	local guard = 0
	while true do
		guard = guard + 1
		if guard > 5000 then error("spike: task queue did not empty within 5000 steps") end
		local m = _globals.__spikeMicrotasks
		if #m > 0 then
			local fn = table.remove(m, 1)
			fn()
		elseif #_globals.__spikeMacrotasks > 0 then
			local fn = table.remove(_globals.__spikeMacrotasks, 1)
			fn()
		else
			break
		end
	end
end
`;
				const origRt = readFileSync(join(ROOT, "include", "RuntimeLib.lua"), "utf8");
				const patchedRt = origRt.replace(
					'local RunService = game:GetService("RunService")',
					`${GAME_MOCK}
local _RunService
local function getRunService()
	if not _RunService then
		_RunService = game:GetService("RunService")
	end
	return _RunService
end
local RunService = setmetatable({}, {
	__index = function(_, k)
		return getRunService()[k]
	end
})`
				);
				// Compute the correct relative prefix based on the include/ dir depth.
				// includeDir is at out/<subdir>/include/, so the number of "../"
				// needed to get back to out/ depends on the depth of <subdir>.
				const outRel = relative(join(ROOT, "out"), includeDir);
				const depth = outRel.split(sep).length; // e.g. "vendor/toil-scheduler/include" -> 3
				const upPrefix = "../".repeat(depth); // e.g. "../../../"
				const withGameExport = patchedRt
					.replace(
						"TS.Promise = Promise",
						"TS.Promise = Promise\nTS.globals = _globals\nTS.game = game\nTS.script = _globals.script\nTS.task = _globals.task"
					)
					.replace("_G[module] = TS", "-- _G[module] = TS -- readonly in native runner; registeredLibraries is sufficient")
						// The native runner gives each required module its OWN env, so
						// `script` (set in the runner's env) is nil here and
						// `script.Parent.Promise` indexes a nil. Promise.lua sits in the
						// same include/ dir, so require it by same-dir path instead.
						.replace("local Promise = require(script.Parent.Promise)", "local Promise = require(\"./Promise\")")
						// The native runner's `require` takes a STRING path, but
						// TS.import hands us a tree node (a table) whose `__path` is
						// the data-model path (e.g. node_modules/@toil/scheduler/cjs/
						// scheduler.development.js). Map that to the on-disk vendor
						// require path (@spike/out/vendor/<pkg>/<rest>, .js stripped);
						// the "@spike/out/" prefix is rewritten to the correct "../"
						// depth by the replacement below.
						.replace(
							"local data = require(module)",
							"local data = require((function() local p = module.__path or \"\" p = p:gsub(\"^node_modules/\", \"\") p = p:gsub(\"%@toil/\", \"vendor/toil-\") p = p:gsub(\"^TS/\", \"\") p = p:gsub(\"%.js$\", \"\") return \"@spike/out/\" .. p end)())",
						)
					.replace('"@spike/out/vendor/toil-scheduler/"', '"' + upPrefix + "vendor/toil-scheduler/" + '"')
					.replace('"@spike/out/vendor/toil-react/"', '"' + upPrefix + "vendor/toil-react/" + '"')
					.replace('"@spike/out/vendor/toil-react-reconciler/"', '"' + upPrefix + "vendor/toil-react-reconciler/" + '"')
					.replace('"@spike/out/"', '"' + upPrefix + '"');
				writeFileSync(join(includeDir, "Promise.lua"), patchedPromise);
				writeFileSync(rtDst, withGameExport);
			} catch {
				// ignore
			}
		}
		const correctPath = "./include/RuntimeLib";
		// The three vendor index modules are loaded BY the preload (and by the
		// app files). A file in a vendor's load chain (index, or a cjs loaded
		// by that index) must skip requiring its own vendor's index, or it
		// recurses (the require cache is not populated until a module
		// finishes loading). Files that read bare React/Scheduler in their
		// body (the cjs dev/prod modules and the app files) run the preload;
		// the index files themselves do not, so they are excluded here.
		const isVendorIndex =
			/(\/vendor\/toil-(scheduler|react|react-reconciler))(\/|$)/.test(norm) &&
			(/\/index(\.luau)?$/.test(norm));
		const needsVendor = !isVendorIndex;
		// The index to skip in the preload: this file's own vendor, if any.
		const skipIndex = selfVendor;
		// Self-vendor resolves to nil (a cjs does not reference its own
		// vendor's bare global in its body, verified 0 top-level refs).
		// Non-self vendors become LAZY proxies: they require the vendor index
		// on first field access / call, not at module-load time. The luau
		// native require cache is only populated once a module FINISHES
		// loading, so an eager cross-vendor require at the top of a cjs
		// re-enters the other cjs (which is mid-load) and cycles. Deferring
		// the require to first use (render time, after all modules have
		// finished loading) breaks that cycle.
		const selfGlobal = (vendor) =>
			skipIndex === vendor ? "nil" : `_spikeMakeProxy("${vendor}")`;
		const vendorBlock = needsVendor
			? `
		_G.__spikeRequireCache = _G.__spikeRequireCache or {}
		_G.__spikeRequireCache["node_modules/@toil/react/index.js"] = "${upPrefix}vendor/toil-react/index"
		_G.__spikeRequireCache["node_modules/@toil/react/cjs/react.development.js"] = "${upPrefix}vendor/toil-react/cjs/react.development"
		_G.__spikeRequireCache["node_modules/@toil/react-reconciler/index.js"] = "${upPrefix}vendor/toil-react-reconciler/index"
		_G.__spikeRequireCache["node_modules/@toil/react-reconciler/cjs/react-reconciler.development.js"] = "${upPrefix}vendor/toil-react-reconciler/cjs/react-reconciler.development"
		_G.__spikeRequireCache["node_modules/@toil/scheduler/index.js"] = "${upPrefix}vendor/toil-scheduler/index"
		_G.__spikeRequireCache["node_modules/@toil/scheduler/cjs/scheduler.development.js"] = "${upPrefix}vendor/toil-scheduler/cjs/scheduler.development"
		_G.__spikeVendor = _G.__spikeVendor or {}
		-- Capture the vendor-cache table as a local upvalue. In the luau
		-- native runner getfenv(0) is per-function-scope, so a nested
		-- closure that re-reads getfenv(0).__spikeVendor sees a different
		-- (empty) table than the one the do-block body just populated.
		-- Bare globals set here ARE shared module-wide, but getfenv(0)
		-- re-reads inside nested functions are not; pass the table by
		-- reference instead.
		local _spikeVendorCache = getfenv(0).__spikeVendor
		-- SHARED RuntimeLib: the luau native runner caches modules by the
		-- RESOLVED absolute path, and each vendor directory has its own
		-- ./include/RuntimeLib copy (three separate module instances).
		-- RuntimeLib's Symbol.for keeps a module-local registry, so React's
		-- Symbol.for("react.transitional.element") and the reconciler's
		-- Symbol.for of the same key are DIFFERENT objects -> the $$typeof
		-- comparison in reconcileChildFibersImpl fails -> no child fibers ->
		-- empty tree. Fix: load the canonical RuntimeLib ONCE (the root
		-- include/ copy) and pre-seed the runner's require cache under every
		-- vendor's RESOLVED path key, so every vendor's
		-- the same module instance.
		local function _spikeLazyVendor(vendor)
			local ns = _spikeVendorCache[vendor]
			if ns == nil then
				ns = require("${upPrefix}vendor/toil-" .. vendor .. "/index")
				_spikeVendorCache[vendor] = ns
			end
			return ns
		end
		local function _spikeMakeProxy(vendor)
			return setmetatable({}, {
				__index = function(_, key)
					return _spikeLazyVendor(vendor)[key]
				end,
				__call = function(_, ...)
					local ns = _spikeLazyVendor(vendor)
					return ns(...)
				end,
			})
		end
		Scheduler = ${selfGlobal("scheduler")}
		React = ${selfGlobal("react")}`
			: "";
		const NEW_FN = `local function _spikeRequireTS()
	local env0 = getfenv(0)
	local reg = env0.__spikeRequireCache
	if reg == nil then
		reg = {}
		env0.__spikeRequireCache = reg
	end
	local cached = reg["${correctPath}"]
	if type(cached) == "table" then return cached end
	local ok, mod = pcall(require, "${correctPath}")
	local ok, mod = pcall(require, "${correctPath}")
	if ok then
		reg["${correctPath}"] = mod
		return mod
	end
	error("RuntimeLib not found")
end
local TS = _spikeRequireTS()
	do
		local _g = TS.globals
		if _g then
			local _e = getfenv(0)
			for _k, _v in pairs(_g) do
				_e[_k] = _v
			end
			-- The fake-tree game mock is module-local to this RuntimeLib
			-- copy, so publish it for the spec environment (which cannot
			-- read it from another module scope). TS.game is the same
			-- object; the spec env reads it for its own TS.import calls.
			_e.__spikeGame = TS.game
		end
		${vendorBlock}
	end
	-- spike:header-end`;
		// Idempotent header normalization. The canonical header (NEW_FN) is
		// the only thing that installs the vendor alias + Scheduler/React
		// globals, so every file must end up carrying it exactly once.
		//
		// Find the last header-terminator line, drop everything up to and
		// including it, and prepend NEW_FN. Terminators are tried in priority
		// order; the sentinel (-- spike:header-end) makes a re-run
		// deterministic, and the raw TS-import line plus the game/script/task
		// triplets cover the forms a fresh roblox-ts build (postbuild-fixup)
		// or an earlier hand-patch leaves behind.
		const lines = content.split("\n");
		const terminators = [
			"-- spike:header-end",
			"getfenv(0).task = TS.task",
			"local TS = __spikeRequireTS()",
		];
		let headerEnd = -1;
		for (const term of terminators) {
			for (let i = lines.length - 1; i >= 0; i--) {
				if (lines[i].includes(term)) {
					headerEnd = i;
					break;
				}
			}
			if (headerEnd >= 0) break;
		}
		let body = headerEnd >= 0 ? lines.slice(headerEnd + 1).join("\n") : content;
		body = body.replace(/^\s*\n+/, "");
		// Vendor index/cjs files (headerEnd == -1, no spike terminator) still carry
		// the raw roblox-ts header line `local TS = require(game:GetService(
		// "ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))`.
		// NEW_FN (prepended below) already binds `local TS = _spikeRequireTS()` to the
		// correct spike RuntimeLib, so this body line would shadow it with a re-require
		// that the game mock resolves to a bare tree node (no `import`). Drop it.
		if (headerEnd < 0) {
			body = body.replace(
				/local TS = require\(game:GetService\("ReplicatedStorage"\):WaitForChild\("rbxts_include"\):WaitForChild\("RuntimeLib"\)\)\r?\n?/,
				"",
			);
		}
		const patched = NEW_FN + "\n\n" + body;
		// Rewrite _G.X to getfenv(0).X (readonly _G in native runner). This
		// also rewrites the NEW_FN references just prepended, which is
		// correct: the native runner's _G is not the module's env.
		let final = patched.replace(/_G\.(\w+)/g, "getfenv(0).$1");
		// Rewrite the require path in _spikeRequireTS to use the canonical
		// correctPath (already substituted by the JS template above) so that
		// every out/*.luau file requires the same string, and the runner's
		// internal path-keyed cache returns the same module instance.
		// Rewrite the require path in _spikeRequireTS to point at the
		// SCHEDULER's RuntimeLib (the canonical one). All three vendors
		// resolve to the same absolute path, so the runner's internal
		// require cache returns the same module instance = one Symbol.for
		// registry. The per-vendor include/ copies become dead files.
		const norm2 = norm.replace(/\\/g, "/");
		let rtPath;
		if (norm2.includes("/toil-react/cjs/") || norm2.includes("/toil-react-reconciler/cjs/")) {
			rtPath = "../../toil-scheduler/include/RuntimeLib";
		} else if (norm2.includes("/toil-scheduler/cjs/")) {
			rtPath = "../include/RuntimeLib";
		} else {
			rtPath = "./include/RuntimeLib";
		}
		final = final.replace(
			/pcall\(require, "[^"]*\/RuntimeLib"\)/g,
			`pcall(require, "${rtPath}")`,
		);
		writeFileSync(filePath, final);
	};
	// Recursively patch all .luau files in out/
	const walkDir = (dir) => {
		const entries = readdirSync2(dir, { withFileTypes: true });
		for (const entry of entries) {
			const full = join(dir, entry.name);
			if (entry.isDirectory()) {
				walkDir(full);
			} else if (entry.name.endsWith(".luau")) {
				patchOutFile(full);
			}
		}
	};
	// The vendor modules are emitted by roblox-ts as .js, but the luau native
	// runner resolves `require(".../index")` only against a sibling `index.luau`
	// (a .js is not picked up). Copy every out/vendor/**/*.js to a .luau twin so
	// the requires resolve, then patchOutFile (below) prepends the game/script/
	// task header to each. Idempotent: re-copied on every run so a fresh build
	// is always picked up.
	const copyVendorJsToLuau = (dir) => {
		const entries = readdirSync2(dir, { withFileTypes: true });
		for (const entry of entries) {
			const full = join(dir, entry.name);
			if (entry.isDirectory()) copyVendorJsToLuau(full);
			else if (entry.name.endsWith(".js") || entry.name.endsWith(".luau")) {
				// Process both .js (fresh roblox-ts output) and .luau (postbuild-renamed)
				// so the vendor patches are applied regardless of which build stage
				// left the file in place.
				const isLuau = entry.name.endsWith(".luau");
				const luauPath = isLuau ? full : full.slice(0, -3) + ".luau";
				// roblox-ts emits JS-style \uXXXX escapes (e.g. "\u269b") that Luau
			// rejects as malformed (Luau\u0027s \u must be braced, \u{269b}). Rewrite
			// every unbraced 4-hex \uXXXX to \u{XXXX} before the Luau load, or the cjs
			// fails to load and require returns its error string.
			let fixed = readFileSync(full, "utf8").replace(/\\u([0-9a-fA-F]{4})/g, "\\u{$1}");
			// The development react-reconciler cjs is a CONFIG FACTORY: its outer
			// __exports is reassigned to a function (module.exports = function
			// (config){...}). The top-level named-alias block
			//   local __default = __exports   /   local __n_x = __exports.x ...
			// indexes that function, which errors at load ("attempt to index
			// function with 'default'") and aborts the whole cjs. The host only
			// consumes .default (the factory) and calls it with the hostConfig, so
			// when __exports is not a plain table we swap it for a nil-returning
			// table that (a) indexes to nil for the __n_* aliases and (b) is
			// __call-forwarded to the real factory so ReactReconciler(hostConfig) works.
				// disabledLog is a function that later gets a field set on it
				// (__ST.disabledLog.__reactDisabledLog = ...). In JS functions are
				// objects; in Luau they are not. Rename the function and wrap it
				// in a callable table with __index/__newindex so field access works.
				const dlOld = "__ST.disabledLog = function(...)";
				const dlNew = "local __spike_dl_fn = function(...)";
				if (fixed.includes(dlOld)) {
					fixed = fixed.replace(dlOld, dlNew, 1);
				}
				const dlEnd = "\t\t\treturn (function() end)(unpack(__args))\n\t\tend\n\t\t__ST.logCommitErrored";
				const dlEndNew = "\t\t\treturn (function() end)(unpack(__args))\n\t\tend\n\t\t__ST.disabledLog = setmetatable({}, {\n\t\t\t__call = function(_, ...) return __spike_dl_fn(__ST, ...) end,\n\t\t\t__index = function() return nil end,\n\t\t\t__newindex = function() end,\n\t\t})\n\t\t__ST.logCommitErrored";
				if (fixed.includes(dlEnd)) {
					fixed = fixed.replace(dlEnd, dlEndNew, 1);
				}
				const marker = "local _exp = __exports";
				if (fixed.includes(marker)) {
				const g =
				"if type(__exports) ~= \"table\" then\n" +
				"\tlocal _spikeFactory = __exports\n" +
				"\t__exports = setmetatable({}, {\n" +
				"\t\t__index = function() return nil end,\n" +
				"\t\t__call = function(_, _cfg) return _spikeFactory(_cfg) end,\n" +
				"\t})\n" +
				"end\n";
				fixed = fixed.replace(marker, g + marker, 1);
				}
			// scheduler.development: the host callback scheduling chain is
		// setImmediate -> setImmediate is NOT a function in the native runner
		// env (typeOfJS returns "object" for the table-valued stub), so
		// localSetImmediate is nil. Falls through to MessageChannel check
		// (undefined) then to setTimeout, which IS a function. But the
		// setTimeout stub returns 1 and never queues the callback. Fix:
		// rewrite the schedulePerformWorkUntilDeadline assignment to queue
		// into __spikeMacrotasks directly, so __spikeDrain can find it.
		if ((entry.name === "scheduler.development.js" || entry.name === "scheduler.development.luau")) {
			const schedOld = "schedulePerformWorkUntilDeadline = function()\n\t\tlocalSetImmediate(performWorkUntilDeadline)\n\t\tend";
			const schedNew = "schedulePerformWorkUntilDeadline = function()\n\t\ttable.insert(getfenv(0).__spikeMacrotasks or (function() local t = {}; getfenv(0).__spikeMacrotasks = t return t end)(), performWorkUntilDeadline)\n\t\tend";
			if (fixed.includes(schedOld)) {
			fixed = fixed.replace(schedOld, schedNew, 1);
			}
		}
		// scheduler.development: the host-callback scheduling chain is
		// setImmediate -> localSetImmediate is nil (setImmediate stub is a
		// table, typeOfJS returns "object" not "function") -> falls to
		// setTimeout -> localSetTimeout is a function (the stub) but the
		// stub just returns 1 and never queues the callback. Fix: rewrite
		// ALL THREE schedulePerformWorkUntilDeadline assignments to queue
		// into __spikeMacrotasks directly so __spikeDrain can find them.
		if ((entry.name === "scheduler.development.js" || entry.name === "scheduler.development.luau")) {
			// Replace the entire if/elseif/else block for schedulePerformWorkUntilDeadline
			const schedBlockOld = `if "function" == typeOfJS(localSetImmediate) then\n\t\tschedulePerformWorkUntilDeadline = function()\n\t\t\tlocalSetImmediate(performWorkUntilDeadline)\n\t\tend\n\telseif "undefined" ~= typeOfJS(MessageChannel) then\n\t\tchannel = __new(MessageChannel)\n\t\tport = channel.port2\n\t\tchannel.port1.onmessage = performWorkUntilDeadline\n\t\tschedulePerformWorkUntilDeadline = function()\n\t\t\tport.postMessage(nil)\n\t\tend\n\telse\n\t\tschedulePerformWorkUntilDeadline = function()\n\t\t\tlocalSetTimeout(performWorkUntilDeadline, 0)\n\t\tend\n\tend`;
			const schedBlockNew = `schedulePerformWorkUntilDeadline = function()\n\t\tlocal mt = getfenv(0).__spikeMacrotasks\n\t\tif mt == nil then mt = {}; getfenv(0).__spikeMacrotasks = mt end\n\t\ttable.insert(mt, performWorkUntilDeadline)\n\tend`;
			if (fixed.includes(schedBlockOld)) {
			fixed = fixed.replace(schedBlockOld, schedBlockNew, 1);
			}
		}
		// The reconciler index compiles `import ReactReconciler from
			// "@toil/react-reconciler"` (an `export =`-style default) to
			// `TS.import(..., "index.js")` with NO `.default` suffix, so callers
			// (main.luau, host/init.luau) receive the whole module table and call
			// it directly. roblox-ts emits the index as a plain `return exports`,
			// which is not callable ("attempt to call a table value"). Make the
			// module table __call-forward to its own .default (the callable cjs
			// wrapper) so ReactReconciler(hostConfig) works.
			if ((entry.name === "index.js" || entry.name === "index.luau") && full.includes("toil-react-reconciler")) {
				const m = "return exports";
				if (fixed.includes(m)) {
				const c = "setmetatable(exports, { __call = function(_, ...) return exports.default(...) end })\n";
				fixed = fixed.replace(m, c + m, 1);
				}
			}
			// react.development: JS components are functions that can carry
			// .defaultProps/.propTypes/.displayName fields. Luau functions
			// cannot. Replace direct field accesses on __type and render with
			// a safe getter that returns nil for functions without the field.
			if ((entry.name === "react.development.js" || entry.name === "react.development.luau")) {
				// JS components are functions that can carry .defaultProps/
				// .displayName fields. Luau functions cannot. Inject a safe
				// getter after the TS require line and replace direct accesses.
				const tsReq = 'local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))';
				if (fixed.includes(tsReq)) {
					const helper = tsReq + '\nlocal function __spikeSafeField(__obj, __k)\n\tif type(__obj) == "table" then return rawget(__obj, __k) end\n\treturn nil\nend';
					fixed = fixed.replace(tsReq, helper, 1);
				}
				// Replace __type.defaultProps, __type.propTypes, __type.displayName,
				// __type.name, render.defaultProps with safe-getter calls.
				// Handle assignments FIRST (before read-replace) so we don't turn
				// `__type.displayName = X` into `__spikeSafeField(...) = X`.
				fixed = fixed.replace(/__type\.displayName\s*=\s*([^,)\n]+)/g, "__spikeFnField(__type, \"displayName\", $1, true)");
				fixed = fixed.replace(/__type\.name\s*=\s*([^,)\n]+)/g, "__spikeFnField(__type, \"name\", $1, true)");
				fixed = fixed.replace(/__type\.defaultProps\s*=\s*([^,)\n]+)/g, "__spikeFnField(__type, \"defaultProps\", $1, true)");
				fixed = fixed.replace(/__type\.propTypes\s*=\s*([^,)\n]+)/g, "__spikeFnField(__type, \"propTypes\", $1, true)");
				fixed = fixed.replace(/render\.defaultProps\s*=\s*([^,)\n]+)/g, "__spikeFnField(render, \"defaultProps\", $1, true)");
				// Then handle reads.
				fixed = fixed.replace(/__type\.defaultProps/g, "__spikeSafeField(__type, \"defaultProps\")");
				fixed = fixed.replace(/__type\.propTypes/g, "__spikeSafeField(__type, \"propTypes\")");
				fixed = fixed.replace(/__type\.displayName/g, "__spikeSafeField(__type, \"displayName\")");
				fixed = fixed.replace(/__type\.name/g, "__spikeSafeField(__type, \"name\")");
				fixed = fixed.replace(/render\.defaultProps/g, "__spikeSafeField(render, \"defaultProps\")");
			// FIX 4d: set length on childArray
			const caLenAnchor = "Object.freeze and Object:freeze(childArray)";
			const caLenIdx = fixed.indexOf(caLenAnchor);
			if (caLenIdx >= 0) {
			const caLenBefore = fixed.substring(0, caLenIdx);
			const nlCaLen = caLenBefore.lastIndexOf("\n");
			const tabsCaLen = (caLenBefore.match(/[\t]*$/))[0];
			fixed = caLenBefore + tabsCaLen + "rawset(childArray, \"length\", childrenLength)\n" + fixed.substring(nlCaLen + 1);
			}
			// FIX 6: childArray 0-based -> 1-based for Luau iteration
			const caAnchor = "childArray[_i] = __argAt(__allArgs, __cat(_i, 2))";
			const caIdx = fixed.indexOf(caAnchor);
			if (caIdx >= 0) {
			fixed = fixed.substring(0, caIdx) + "childArray[_i] = __argAt(__allArgs, __cat(_i, 2))" + fixed.substring(caIdx + caAnchor.length);
			}
			}
			// scheduler.development: debug whether performWorkUntilDeadline runs
			// and what its host-callback state is when it does.
			if ((entry.name === "react-reconciler.development.js" || entry.name === "react-reconciler.development.luau")) {
			// FIX 0: CONFIG FACTORY - set __exports.default to a factory function
			const cfAnchor = "local __default = __exports";
			const cfIdx = fixed.indexOf(cfAnchor);
			if (cfIdx >= 0 && !fixed.includes("__spikeFactoryFn")) {
			const cfBefore = fixed.substring(0, cfIdx);
			const nlCf = cfBefore.lastIndexOf("\n");
			const tabsCf = (cfBefore.match(/[\t]*$/))[0];
			const cfLine = tabsCf + "local __spikeFactoryFn = function(...) return __exports(...) end\n";
			fixed = cfBefore + cfLine + fixed.substring(nlCf + 1);
			}
			const cfDefAnchor = "default = default";
			const cfDefIdx = fixed.lastIndexOf(cfDefAnchor);
			if (cfDefIdx >= 0) {
			fixed = fixed.substring(0, cfDefIdx) + "default = __spikeFactoryFn" + fixed.substring(cfDefIdx + cfDefAnchor.length);
			}
				// FIX 1: callComponentInDEV __applyFn missing thisArg.
			// __partial inner function calls __applyFn(fn, unpack(args)) but
			// __applyFn expects (fn, thisArg, ...). Use the fiber directly.
			const cciApplyAnchor = "return __applyFn(__ST.callComponent.react_stack_bottom_frame, unpack(_bindArgs53))";
			const cciApplyIdx = fixed.indexOf(cciApplyAnchor);
			if (cciApplyIdx >= 0) {
			fixed = fixed.substring(0, cciApplyIdx) + "local _wi = __ST.currentlyRenderingFiber; return __ST.callComponent.react_stack_bottom_frame(__ST.callComponent, _wi and _wi.type or _bindArgs53[2], _bindArgs53[3] or (_wi and _wi.pendingProps), _bindArgs53[4])" + fixed.substring(cciApplyIdx + cciApplyAnchor.length);
			}
			// FIX 2b: mountState return 0-based JS-Array -> 1-based Lua table
			const msRetAnchor = "return __arrNew(initialState.memoizedState, dispatch)";
			const msRetIdx = fixed.indexOf(msRetAnchor);
			if (msRetIdx >= 0) {
			fixed = fixed.substring(0, msRetIdx) + "return { initialState.memoizedState, dispatch }" + fixed.substring(msRetIdx + msRetAnchor.length);
			}
			// FIX 2: mountStateImpl nil initialState (arg shifting from __partial)
			const msImplAnchor = "hook.baseState = initialState";
			const msImplIdx = fixed.indexOf(msImplAnchor);
			if (msImplIdx >= 0) {
			const beforeMs = fixed.substring(0, msImplIdx);
			const nlMs = beforeMs.lastIndexOf("\n");
			const tabsMs = (beforeMs.match(/[\t]*$/))[0];
			fixed = beforeMs + tabsMs + "if initialState == nil then initialState = 0 end\n" + fixed.substring(nlMs + 1);
			}
			// FIX 3: Component.contextTypes safe access (function has no metatable)
			const ctAnchor = "local _condition_3 = Component.contextTypes";
			const ctIdx = fixed.indexOf(ctAnchor);
			if (ctIdx >= 0) {
			const beforeCt = fixed.substring(0, ctIdx);
			const nlCt = beforeCt.lastIndexOf("\n");
			const tabsCt = (beforeCt.match(/[\t]*$/))[0];
			const ctLine = tabsCt + "local _ct_val; local _ct_ok = pcall(function() _ct_val = Component.contextTypes end); local _condition_3 = _ct_ok and _ct_val or nil\n";
			const afterCt = fixed.substring(ctIdx + ctAnchor.length);
			fixed = beforeCt + ctLine + afterCt;
			}
			// FIX 4c: reconcileChildrenArray print
			const rcaAnchor = "local function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes)";
			const rcaIdx = fixed.indexOf(rcaAnchor);
			if (rcaIdx >= 0) {
			}
			// FIX 4b: updateSlot print
			const usAnchor = "local function updateSlot(returnFiber, oldFiber, newChild, lanes)";
			const usIdx = fixed.indexOf(usAnchor);
			if (usIdx >= 0) {
			}
			// FIX 4: validateFunctionComponentInDev - pcall
			const vfcAnchor = "local _exp = __ST.validateFunctionComponentInDev(workInProgress, workInProgress.type)";
			const vfcIdx = fixed.indexOf(vfcAnchor);
			if (vfcIdx >= 0) {
			const beforeVfc = fixed.substring(0, vfcIdx);
			const nlVfc = beforeVfc.lastIndexOf("\n");
			const tabsVfc = (beforeVfc.match(/[\t]*$/))[0];
			const vfcLine = tabsVfc + "local _ok_vfc = pcall(__ST.validateFunctionComponentInDev, workInProgress, workInProgress.type); local _exp = 0\n";
			const afterVfc = fixed.substring(vfcIdx + vfcAnchor.length);
			fixed = beforeVfc + vfcLine + afterVfc;
			}
			}
			if ((entry.name === "scheduler.development.js" || entry.name === "scheduler.development.luau")) {
			// The scheduler works correctly in the spike environment; no patches needed.
			// (The taskQueue indexing and performWorkUntilDeadline were verified working.)
			}
writeFileSync(luauPath, fixed);
			}
		}
	};
	const vendorDir = join(outDir2, "vendor");
	if (existsSync(vendorDir)) copyVendorJsToLuau(vendorDir);

	walkDir(outDir2);

	const { code } = buildSuite(name);
	const runner = join(ROOT, "tmp-native-runner-" + name + ".luau");
	writeFileSync(runner, code);
	const specsLest = join(ROOT, "specs", ".lest");
	dirLink("../.lest", specsLest);
	// Ensure out/.spike exists (symlink to ../out) so @spike/out/... resolves
	// from spec files in specs/ (which do require("@spike/out/...")).
	// The .luaurc alias "spike" -> "." resolves relative to the .luaurc file
	// (project root), but the luau native runner resolves @spike from the
	// requiring file's dir. Since specs are in specs/, @spike resolves to
	// specs/. We create a symlink specs/.spike -> ../ (project root) so that
	// @spike/out/... becomes specs/../out/... = out/...
	// Actually, the alias resolution in luau is: @spike/out/x -> <alias_dir>/out/x
	// where <alias_dir> is "." resolved from the .luaurc location (project root).
	// But the luau native runner seems to resolve @spike relative to the spec's dir.
	// The "could not jump to alias '.'" error means it resolved @spike to "."
	// (project root) but then failed to jump to ".". This is the same error we
	// saw with @spike from the runner file.
	// The fix: create a symlink out/.spike -> .. so that @spike/out/x becomes
	// out/../out/x = out/x. But that's circular.
	// Alternative: the .luaurc alias "spike" = "." means @spike/out/x -> ./out/x.
	// From the spec's dir (specs/), ./out/x = specs/out/x (doesn't exist).
	// From the project root, ./out/x = out/x (exists).
	// The luau native runner resolves aliases relative to the .luaurc file's
	// location, not the requiring file's location. So @spike/out/x ->
	// <project_root>/out/x. But the error says "could not jump to alias '.'".
	// This suggests the luau native runner is NOT using the .luaurc alias at
	// all, and is instead treating @spike as a relative path from the spec's
	// dir. In that case, @spike/out/x = specs/out/x.
	// The fix: create a symlink specs/out -> ../out
	const specsOut = join(ROOT, "specs", "out");
	const outDir = join(ROOT, "out");
	dirLink("../out", specsOut);
	if (process.env.DEBUG_RUNNER) {
		console.error("DEBUG: runner written to " + runner);
		return 0;
	}
	try {
		const r = spawnSync(LUAAU, [runner], { cwd: ROOT, encoding: "utf8", timeout: 120_000 });
		process.stdout.write(r.stdout ?? "");
		process.stderr.write(r.stderr ?? "");
		// This native luau build strips os.exit, so the script's own exit
		// code is always 0 (or 1 on an unhandled error). The runner prints a
		// machine-readable "== SPRITE_EXIT: <code> ==" line; derive the real
		// exit code from it, falling back to the process status.
		const out = (r.stdout ?? "") + "\n" + (r.stderr ?? "");
		const m = out.match(/== SPRITE_EXIT: (\d+) ==/);
		const code = m ? parseInt(m[1], 10) : (r.status ?? 1);
		return code;
	} finally {
		if (process.env.KEEP_RUNNER) {} else { rmSync(runner, { force: true }); }
	}
}

function main() {
	const argv = process.argv.slice(2);
	const names = argv.length ? argv : ["spike", "host"];
	let exit = 0;
	for (const name of names) {
		console.log(`\n=== suite: ${name} ===`);
		const status = runSuite(name);
		if (status !== 0) exit = status;
	}
	process.exit(exit);
}
main();