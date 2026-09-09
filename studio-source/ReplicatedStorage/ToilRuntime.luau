--!nocheck
-- toil-luau: generated from specs/_spike_rt.luau by scripts/stage-studio.mjs.
-- Do not edit; edit the spec runtime and re-stage.
local _envBaseline = {}
for _k in pairs(getfenv(0)) do
	_envBaseline[_k] = true
end
local _gBaseline = {}
for _k in pairs(_G) do
	_gBaseline[_k] = true
end
--!nocheck
-- Spike runtime: the JS-semantic layer that lets the roblox-ts-emitted React 19
-- vendor code run on plain Luau (Lest native backend, Luau 0.709, no game).
--
-- Contract source: scripts/tame-vendor.mjs. Every helper below is named exactly
-- as the tamer emits it. Two conventions matter everywhere:
--   * JS arrays are 0-BASED Luau tables; their length lives in lenReg because
--     Luau's # ignores key 0.
--   * Method calls on JS globals are emitted as COLON calls (Object:keys(t)),
--     so every method's first parameter is the global table itself.

-- ---------------------------------------------------------------- js number

local function jsNum(n)
	if n ~= n then
		return "NaN"
	end
	if n == math.huge then
		return "Infinity"
	end
	if n == -math.huge then
		return "-Infinity"
	end
	if math.type(n) == "integer" then
		return tostring(n)
	end
	if n == 0 then
		if 1 / n == -math.huge then
			return "-0"
		end
		return "0"
	end
	local s = string.format("%.14g", n)
	-- %.14g pads two-digit exponents ("1e-07"); JS does not ("1e-7").
	local mant, sign, digits = s:match("^(.-)e([%+%-])(%d+)$")
	if mant and sign and digits then
		return mant .. "e" .. sign .. tostring(tonumber(digits))
	end
	return s
end

-- ---------------------------------------------------------------- js string

local jsArrMeta = {}
local lenReg = {}

local function isArray(x)
	if type(x) ~= "table" then
		return false
	end
	if getmetatable(x) == jsArrMeta then
		return true
	end
	return lenReg[x] ~= nil
end

local function getLen(x)
	local t = type(x)
	if t == "string" then
		return #x
	end
	if t == "table" then
		local l = lenReg[x]
		if l ~= nil then
			return l
		end
		local v = rawget(x, "length")
		if type(v) == "number" then
			return v
		end
		return #x
	end
	return 0
end

local function jsStr(x)
	local t = type(x)
	if x == nil then
		return "null"
	end
	if t == "number" then
		return jsNum(x)
	end
	if t == "boolean" then
		return x and "true" or "false"
	end
	if t == "string" then
		return x
	end
	if t == "table" then
		if isArray(x) then
			local parts = {}
			local l = getLen(x)
			for i = 0, l - 1 do
				parts[#parts + 1] = jsStr(x[i])
			end
			return table.concat(parts, ",")
		end
		return "[object Object]"
	end
	if t == "function" then
		return "[function]"
	end
	return tostring(x)
end

-- ---------------------------------------------------------------- typeOfJS

function typeOfJS(x)
	local t = type(x)
	if t == "table" then
		return "object"
	end
	if t == "string" or t == "number" or t == "boolean" or t == "function" then
		return t
	end
	return "undefined"
end

-- The host (src/host/index.ts) declares a lowercase `typeofJS` and calls it to
-- check whether a value is a function before invoking a Roblox signal. Same
-- semantics as typeOfJS above; different name because the host's source uses
-- the lowercase identifier.
function typeofJS(x)
	return typeOfJS(x)
end

_G.isArray = isArray

-- ---------------------------------------------------------------- __cat

function __cat(a, b)
	if type(a) == "number" and type(b) == "number" then
		return a + b
	end
	return jsStr(a) .. jsStr(b)
end
-- ---------------------------------------------------------------- __argAt

-- 0-based element access for the tamer's `arguments[e]` desugaring (the
-- unified __allArgs list). Routed through a call so roblox-ts never applies
-- its 1-based index shift to the 0-based JS array.
function __argAt(args, i)
	return args[i]
end

-- ---------------------------------------------------------------- arrays

function __arrNew(...)
	local n = select("#", ...)
	local t = {}
	for i = 1, n do
		t[i - 1] = select(i, ...)
	end
	lenReg[t] = n
	setmetatable(t, jsArrMeta)
	return t
end

function __len(x)
	local l = getLen(x)
	if type(x) ~= "table" and type(x) ~= "string" then
		return nil
	end
	return l
end

function __lenSet(x, v)
	v = math.floor(v)
	if isArray(x) then
		local l = getLen(x)
		if v < l then
			for i = v, l - 1 do
				x[i] = nil
			end
		end
		lenReg[x] = v
	else
		rawset(x, "length", v)
	end
	return v
end

-- ---------------------------------------------------------------- prototypes

-- Identity-keyed registries: protoReg[obj] = prototype, accReg[obj][key] = getter.
local protoReg = {}
local accReg = {}

local function chainLookup(t, k)
	local p = protoReg[t]
	if p ~= nil then
		return p[k]
	end
	return nil
end

local FunctionProto -- forward: assigned in the Function section below
local ObjectProto -- forward: assigned after the Object section

-- A JS function owns a default prototype; create it lazily so that
-- `F.prototype.x = ...` works before any explicit prototype assignment.
function __protoOf(x)
	local p = protoReg[x]
	if p ~= nil then
		return p
	end
	local isFn = type(x) == "function"
	if not isFn and type(x) == "table" then
		local mt = getmetatable(x)
		isFn = mt ~= nil and type(rawget(mt, "__call")) == "function"
	end
	if isFn then
		local d = {}
		protoReg[x] = d
		__protoSet(d, FunctionProto)
		return d
	end
	if type(x) == "table" then
		return ObjectProto
	end
	return nil
end

function __protoSet(x, p)
	if type(x) ~= "table" and type(x) ~= "function" then
		return
	end
	protoReg[x] = p
	-- The VM's setmetatable only accepts tables; functions carry their
	-- prototype in the registry alone (instances, which are tables, get
	-- the metatable wiring and walk the chain at index time).
	if type(x) == "function" then
		return p
	end
	local mt = getmetatable(x)
	local hasAcc = accReg[x] ~= nil
	if mt == nil then
		mt = {}
		setmetatable(x, mt)
	end
	if hasAcc then
		mt.__index = function(t, k)
			local acc = accReg[t]
			if acc ~= nil and acc[k] ~= nil then
				return acc[k](t)
			end
			return chainLookup(t, k)
		end
	else
		mt.__index = p
	end
	return p
end

local function defineAccessor(obj, key, getter)
	local acc = accReg[obj]
	if acc == nil then
		acc = {}
		accReg[obj] = acc
	end
	acc[key] = getter
	local mt = getmetatable(obj)
	if mt == nil then
		mt = {}
		setmetatable(obj, mt)
	end
	mt.__index = function(t, k)
		local a = accReg[t]
		if a ~= nil and a[k] ~= nil then
			return a[k](t)
		end
		return chainLookup(t, k)
	end
end

-- ---------------------------------------------------------------- __in

function __in(key, obj)
	local tk = type(key)
	if tk == "number" then
		key = math.floor(key)
	end
	local strKey = tostring(key)
	local t = obj
	while t ~= nil do
		local hit = rawget(t, key) ~= nil or rawget(t, strKey) ~= nil
		local acc = accReg[t]
		if acc ~= nil and (acc[key] ~= nil or acc[strKey] ~= nil) then
			hit = true
		end
		if hit then
			return true
		end
		t = protoReg[t]
	end
	if isArray(obj) and strKey == "length" then
		return true
	end
	return false
end

-- ---------------------------------------------------------------- calls

-- JS f.call(thisArg, ...): a nil thisArg (undefined) is the receiver
-- slot only and is dropped; a non-nil receiver is passed first (method
-- style, which is what the tamer's call rewrites are for).
function __callFn(fn, thisArg, ...)
	if thisArg ~= nil then
		return fn(thisArg, ...)
	end
	return fn(...)
end

-- Tamer convention: __applyFn(fn, thisArg, ...). A nil thisArg (JS
-- undefined/null) is dropped; otherwise it is passed first. Vararg counts
-- come from select("#", ...), never #table, because the first argument can
-- be nil (a hole makes # indeterminate).
function __applyFn(fn, thisArg, ...)
	local count = select("#", ...)
	local rest = {}
	for i = 1, count do
		rest[i] = select(i, ...)
	end
	if count == 1 and isArray(rest[1]) then
		-- f.apply(thisArg, [a, b, ...])
		local list = rest[1]
		local l = getLen(list)
		local args = {}
		local __ai = 0
		if thisArg ~= nil then
			__ai = __ai + 1
			args[__ai] = thisArg
		end
		for i = 0, l - 1 do
			__ai = __ai + 1
			args[__ai] = list[i]
		end
		return fn(__spikeUnpack(args, 1, __ai))
	end
	-- bind-thunk form: obj.apply(...runtimeArgs) flattened by the tamer.
	-- Explicit index counter: `args[#args + 1]` miscounts when an earlier
	-- slot is nil (a leading-nil hole makes #args read too small and the
	-- next append overwrites index 1).
	local args = {}
	local __ai = 0
	if thisArg ~= nil then
		__ai = __ai + 1
		args[__ai] = thisArg
	end
	for i = 1, count do
		__ai = __ai + 1
		args[__ai] = rest[i]
	end
	return fn(__spikeUnpack(args, 1, __ai))
end

-- Tamer convention: __partial(fn, thisArg, ...dataArgs). The thisArg is
-- ALWAYS forwarded first (even nil): the tamer's thunks are of the form
-- (...args) => __applyFn(target, ...args) and consume the thisArg slot
-- themselves (dropping it when nil).
function __partial(fn, thisArg, ...)
	-- No # on tables that may hold a leading nil (the thisArg slot or a
	-- nil data arg); count with select and build with explicit indices.
	local pn = select("#", ...)
	local pre = {}
	for i = 1, pn do
		pre[i] = select(i, ...)
	end
	return function(...)
		local cn = select("#", ...)
		local total = 1 + pn + cn
		local args = {}
		args[1] = thisArg
		for i = 1, pn do
			args[1 + i] = pre[i]
		end
		for i = 1, cn do
			args[1 + pn + i] = select(i, ...)
		end
		return fn(__spikeUnpack(args, 1, total))
	end
end

function __new(cls, ...)
	if typeOfJS(cls) ~= "function" then
		error("__new: not a constructor: " .. jsStr(cls), 0)
	end
	local inst = {}
	local proto = protoReg[cls]
	if proto ~= nil then
		__protoSet(inst, proto)
	end
	local ok, result = pcall(cls, inst, ...)
	if not ok then
		error(result, 0)
	end
	if type(result) == "table" or type(result) == "function" then
		return result
	end
	return inst
end

-- ---------------------------------------------------------------- toString

function __str(x)
	return jsStr(x)
end

local function jsInt(n)
	return math.floor(n)
end

function __numToBase(x, base)
	base = base or 10
	if type(x) ~= "number" then
		x = tonumber(x) or 0
	end
	local neg = x < 0
	local n = jsInt(math.abs(x))
	if n == 0 then
		return "0"
	end
	local digits = "0123456789abcdefghijklmnopqrstuvwxyz"
	local out = {}
	while n > 0 do
		local r = n % base
		out[#out + 1] = digits:sub(r + 1, r + 1)
		n = jsInt(n / base)
	end
	if neg then
		out[#out + 1] = "-"
	end
	for i = 1, math.floor(#out / 2) do
		local j = #out - i + 1
		out[i], out[j] = out[j], out[i]
	end
	return table.concat(out)
end

function __objIs(a, b)
	if type(a) == "number" and type(b) == "number" then
		if a == b then
			-- distinguish +0 / -0
			return 1 / a == 1 / b
		end
		return false
	end
	return a == b
end

function __arrFrom(x)
	if x == nil then
		return __arrNew()
	end
	local t = type(x)
	if t == "string" then
		local out = {}
		for i = 1, #x do
			out[i - 1] = x:sub(i, i)
		end
		lenReg[out] = #out
		setmetatable(out, jsArrMeta)
		return out
	end
	if t == "table" then
		local l = getLen(x)
		local out = __arrNew()
		for i = 0, l - 1 do
			local v = x[i]
			if v ~= nil then
				__push(out, v)
			end
		end
		return out
	end
	return __arrNew(x)
end

-- ---------------------------------------------------------------- regex

local function classChar(cls, c)
	if cls == "d" then
		return c:match("%d") ~= nil
	end
	if cls == "w" then
		return c:match("%w") ~= nil
	end
	if cls == "s" then
		return c:match("%s") ~= nil
	end
	return c == cls
end

local function compileRe(pattern, flags)
	local pos = 1
	local n = #pattern
	local ngroups = 0
	local function peek()
		return pattern:sub(pos, pos)
	end
	local function nextc()
		local c = pattern:sub(pos, pos)
		pos = pos + 1
		return c
	end
	local function parseClass()
		nextc()
		local negate = false
		if peek() == "^" then
			negate = true
			nextc()
		end
		local members = {}
		while pos <= n and peek() ~= "]" do
			local c = nextc()
			if c == "\\" then
				members[#members + 1] = { cls = nextc() }
			elseif c ~= "]" then
				if peek() == "-" then
					nextc()
					local c3 = nextc()
					members[#members + 1] = { range = { c, c3 } }
				else
					members[#members + 1] = { ch = c }
				end
			end
		end
		if pos <= n then
			nextc()
		end
		return { kind = "class", negate = negate, members = members }
	end
	local function parseAtom()
		local c = peek()
		if c == "(" then
			nextc()
			local alts = parseAlt()
			if peek() == ")" then
				nextc()
			end
			ngroups = ngroups + 1
			return { kind = "group", alts = alts, cap = ngroups }
		elseif c == "[" then
			return parseClass()
		elseif c == "^" then
			nextc()
			return { kind = "anchorStart" }
		elseif c == "$" then
			nextc()
			return { kind = "anchorEnd" }
		elseif c == "." then
			nextc()
			return { kind = "dot" }
		end
		local ch = nextc()
		if ch == "\\" then
			return { kind = "escape", ch = nextc() }
		end
		return { kind = "char", ch = ch }
	end
	local function parseItem()
		local atom = parseAtom()
		local q = nil
		local c = peek()
		if c == "*" then
			nextc()
			q = "*"
		elseif c == "+" then
			nextc()
			q = "+"
		elseif c == "?" then
			nextc()
			q = "?"
		end
		return { kind = "item", atom = atom, q = q }
	end
	local function parseSeq()
		local items = {}
		while pos <= n and peek() ~= "|" and peek() ~= ")" do
			items[#items + 1] = parseItem()
		end
		return items
	end
	local parseAlt
	parseAlt = function()
		local alts = {}
		alts[1] = parseSeq()
		while pos <= n and peek() == "|" do
			nextc()
			alts[#alts + 1] = parseSeq()
		end
		return alts
	end
	local ast = parseAlt()
	return { ast = ast, flags = flags or "", ngroups = ngroups, pattern = pattern }
end

local function atomMatch(atom, c)
	local k = atom.kind
	if k == "char" then
		return atom.ch == c
	end
	if k == "dot" then
		return c ~= "" and c ~= "\n"
	end
	if k == "escape" then
		local e = atom.ch
		if e == "d" then
			return c:match("%d") ~= nil
		end
		if e == "w" then
			return c:match("%w") ~= nil
		end
		if e == "s" then
			return c:match("%s") ~= nil
		end
		if e == "D" then
			return c:match("%d") == nil
		end
		if e == "W" then
			return c:match("%w") == nil
		end
		if e == "S" then
			return c:match("%s") == nil
		end
		if e == "n" then
			return c == "\n"
		end
		if e == "t" then
			return c == "\t"
		end
		if e == "r" then
			return c == "\r"
		end
		return c == e
	end
	if k == "class" then
		local hit = false
		for _, m in ipairs(atom.members) do
			if m.ch then
				if m.ch == c then
					hit = true
					break
				end
			elseif m.cls then
				if classChar(m.cls, c) then
					hit = true
					break
				end
			elseif m.range then
				if c >= m.range[1] and c <= m.range[2] then
					hit = true
					break
				end
			end
		end
		return hit ~= atom.negate
	end
	return false
end

-- Greedy backtracking matcher. Returns endPos (1-based, exclusive) + caps, or nil.
local function matchAt(re, s, pos)
	local function matchSeq(items, idx, p, caps)
		if idx > #items then
			return p, caps
		end
		local item = items[idx]
		local atom = item.atom
		local k = atom.kind
		if k == "anchorStart" then
			if p == 1 then
				return matchSeq(items, idx + 1, p, caps)
			end
			return nil, nil
		end
		if k == "anchorEnd" then
			if p > #s then
				return matchSeq(items, idx + 1, p, caps)
			end
			return nil, nil
		end
		if k == "group" then
			local function tryGroup(p0, caps0)
				for _, seq in ipairs(atom.alts) do
					local r, rcaps = matchSeq(seq, 1, p0, caps0)
					if r then
						rcaps[atom.cap] = s:sub(p0, r - 1)
						return r, rcaps
					end
				end
				return nil, nil
			end
			local q = item.q
			if q == nil then
				local r, rcaps = tryGroup(p, caps)
				if r then
					local r2, rcaps2 = matchSeq(items, idx + 1, r, rcaps)
					if r2 then
						return r2, rcaps2
					end
				end
				return nil, nil
			elseif q == "?" then
				local r, rcaps = tryGroup(p, caps)
				if r then
					local r2, rcaps2 = matchSeq(items, idx + 1, r, rcaps)
					if r2 then
						return r2, rcaps2
					end
				end
				return matchSeq(items, idx + 1, p, caps)
			else
				local states = { { p = p, caps = caps } }
				local p2, caps2 = p, caps
				while true do
					local r3, rc3 = tryGroup(p2, caps2)
					if not r3 then
						break
					end
					p2, caps2 = r3, rc3
					states[#states + 1] = { p = p2, caps = caps2 }
				end
				local minN = if q == "+" then 1 else 0
				if #states - 1 < minN then
					return nil, nil
				end
				for i = #states, minN, -1 do
					local st = states[i]
					local r4, rc4 = matchSeq(items, idx + 1, st.p, st.caps)
					if r4 then
						return r4, rc4
					end
				end
				return nil, nil
			end
		end
		local q = item.q
		if q == nil then
			local c = s:sub(p, p)
			if c ~= "" and atomMatch(atom, c) then
				return matchSeq(items, idx + 1, p + 1, caps)
			end
			return nil, nil
		end
		local function consumes(pp)
			local c = s:sub(pp, pp)
			return c ~= "" and atomMatch(atom, c) or false
		end
		if q == "*" then
			local p2 = p
			while consumes(p2) do
				p2 = p2 + 1
			end
			while true do
				local r, rcaps = matchSeq(items, idx + 1, p2, caps)
				if r then
					return r, rcaps
				end
				if p2 == p then
					return nil, nil
				end
				p2 = p2 - 1
			end
		elseif q == "+" then
			if not consumes(p) then
				return nil, nil
			end
			local p2 = p + 1
			while consumes(p2) do
				p2 = p2 + 1
			end
			while true do
				local r, rcaps = matchSeq(items, idx + 1, p2, caps)
				if r then
					return r, rcaps
				end
				if p2 == p + 1 then
					return nil, nil
				end
				p2 = p2 - 1
			end
		else
			if consumes(p) then
				local r, rcaps = matchSeq(items, idx + 1, p + 1, caps)
				if r then
					return r, rcaps
				end
			end
			return matchSeq(items, idx + 1, p, caps)
		end
	end
	local caps = {}
	for _, seq in ipairs(re.ast) do
		local r, rcaps = matchSeq(seq, 1, pos, caps)
		if r then
			return r, rcaps
		end
	end
	return nil, nil
end

function __re(pattern, flags)
	return compileRe(pattern, flags)
end

-- ---------------------------------------------------------------- string methods

function __repeat(s, n)
	n = jsInt(n or 0)
	if n <= 0 then
		return ""
	end
	local out = {}
	for _ = 1, n do
		out[#out + 1] = s
	end
	return table.concat(out)
end

function __trim(s)
	return (s:match("^%s*(.-)%s*$"))
end

function __toLowerCase(s)
	return s:lower()
end

function __toUpperCase(s)
	return s:upper()
end

function __startsWith(s, prefix, pos)
	pos = pos or 0
	return s:sub(pos + 1, pos + #prefix) == prefix
end

function __charCodeAt(s, i)
	local b = s:byte(i + 1)
	if b == nil then
		return -1
	end
	return b
end

local function reFindAll(re, s, from)
	local out = {}
	local pos = from or 1
	while pos <= #s + 1 do
		local r, caps = matchAt(re, s, pos)
		if r == nil then
			break
		end
		local full = s:sub(pos, r - 1)
		out[#out + 1] = { full = full, caps = caps, start = pos }
		if r == pos then
			pos = pos + 1
		else
			pos = r
		end
	end
	return out
end

function __match(s, from)
	local re
	if type(from) == "table" then
		re = from
	else
		re = compileRe(from, "")
	end
	local found = reFindAll(re, s, 1)
	local g = (re.flags:find("g") or false) ~= false
	if g then
		local out = __arrNew()
		for i = 1, #found do
			__push(out, found[i].full)
		end
		return out
	end
	if #found == 0 then
		return nil
	end
	local m = found[1]
	local res = __arrNew(m.full)
	local caps = m.caps
	for i = 1, re.ngroups do
		res[i] = caps[i]
	end
	lenReg[res] = re.ngroups + 1
	res.index = m.start - 1
	res.input = s
	return res
end

function __split(s, sep, limit)
	if sep == nil then
		return __arrNew(s)
	end
	local out = __arrNew()
	if type(sep) == "table" then
		-- regex split
		local re = sep
		local last = 1
		for _, m in ipairs(reFindAll(re, s, 1)) do
			__push(out, s:sub(last, m.start - 1))
			if limit ~= nil and getLen(out) >= limit then
				break
			end
			last = m.start + #m.full
		end
		__push(out, s:sub(last))
	else
		if sep == "" then
			for i = 1, #s do
				__push(out, s:sub(i, i))
				if limit ~= nil and getLen(out) >= limit then
					break
				end
			end
			return out
		end
		local last = 1
		while true do
			local a, b = s:find(sep, last, true)
			if a == nil then
				break
			end
			__push(out, s:sub(last, a - 1))
			if limit ~= nil and getLen(out) >= limit then
				break
			end
			last = b + 1
		end
		__push(out, s:sub(last))
	end
	return out
end

local function applyTemplate(template, full, caps, s, matchStart, matchEnd)
	local out = {}
	local i = 1
	while i <= #template do
		local c = template:sub(i, i)
		if c == "$" and i < #template then
			local d = template:sub(i + 1, i + 1)
			if d == "&" then
				out[#out + 1] = full
				i = i + 2
				continue
			elseif d == "`" then
				out[#out + 1] = s:sub(1, matchStart - 1)
				i = i + 2
				continue
			elseif d == "'" then
				out[#out + 1] = s:sub(matchEnd)
				i = i + 2
				continue
			elseif d:match("%d") ~= nil then
				local n = tonumber(d)
				out[#out + 1] = caps[n] or ""
				i = i + 2
				continue
			end
		end
		out[#out + 1] = c
		i = i + 1
	end
	return table.concat(out)
end

function __replace(s, from, to)
	local re
	if type(from) == "table" then
		re = from
	else
		re = compileRe(from, "")
	end
	local g = re.flags:find("g") ~= nil
	local pieces = {}
	local last = 1
	local pos = 1
	local all = reFindAll(re, s, 1)
	local count = if g then #all else math.min(1, #all)
	for i = 1, count do
		local m = all[i]
		local start = m.start
		local full = m.full
		if type(to) == "function" then
			local args = { full }
			local caps = m.caps
			for c = 1, re.ngroups do
				args[#args + 1] = caps[c]
			end
			args[#args + 1] = start - 1
			args[#args + 1] = s
			repl = to(table.unpack(args))
		else
			repl = applyTemplate(to, full, m.caps, s, start, start + #full - 1)
		end
		pieces[#pieces + 1] = s:sub(last, start - 1)
		pieces[#pieces + 1] = repl
		last = start + #full
	end
	pieces[#pieces + 1] = s:sub(last)
	return table.concat(pieces)
end

-- ---------------------------------------------------------------- array methods

local function sameValue(a, b)
	if a == b then
		return true
	end
	if type(a) == "number" and type(b) == "number" then
		return a ~= a and b ~= b
	end
	return false
end

function __push(x, ...)
	local l = getLen(x)
	local n = select("#", ...)
	for i = 1, n do
		x[l + i - 1] = select(i, ...)
	end
	lenReg[x] = l + n
	return l + n
end

function __pop(x)
	local l = getLen(x)
	if l == 0 then
		return nil
	end
	local v = x[l - 1]
	x[l - 1] = nil
	lenReg[x] = l - 1
	return v
end

function __shift(x)
	local l = getLen(x)
	if l == 0 then
		return nil
	end
	local v = x[0]
	for i = 0, l - 2 do
		x[i] = x[i + 1]
	end
	x[l - 1] = nil
	lenReg[x] = l - 1
	return v
end

function __unshift(x, ...)
	local n = select("#", ...)
	local l = getLen(x)
	for i = l - 1, 0, -1 do
		x[i + n] = x[i]
	end
	for i = 1, n do
		x[i - 1] = select(i, ...)
	end
	lenReg[x] = l + n
	return l + n
end

function __splice(x, start, deleteCount, ...)
	local l = getLen(x)
	local si = start or 0
	if si < 0 then
		si = math.max(0, l + si)
	end
	si = math.min(si, l)
	local dc = deleteCount
	if dc == nil then
		dc = l - si
	end
	dc = math.min(math.max(jsInt(dc), 0), l - si)
	local items = { ... }
	local removed = __arrNew()
	for i = 0, dc - 1 do
		__push(removed, x[si + i])
	end
	local tail = l - si - dc
	for i = 0, tail - 1 do
		x[si + #items + i] = x[si + dc + i]
	end
	for i = 1, #items do
		x[si + i - 1] = items[i]
	end
	local clearFrom = si + dc + #items
	for i = clearFrom, l - 1 do
		x[i] = nil
	end
	lenReg[x] = l - dc + #items
	return removed
end

function __slice(x, start, endIdx)
	if type(x) == "string" then
		local l = #x
		local si = start or 0
		local ei = endIdx
		if si < 0 then
			si = math.max(0, l + si)
		end
		if ei == nil then
			ei = l
		elseif ei < 0 then
			ei = l + ei
		end
		ei = math.min(math.max(ei, si), l)
		return x:sub(si + 1, ei)
	end
	local l = getLen(x)
	local si = start or 0
	if si < 0 then
		si = math.max(0, l + si)
	end
	si = math.min(si, l)
	local ei = endIdx
	if ei == nil then
		ei = l
	elseif ei < 0 then
		ei = l + ei
	end
	ei = math.min(math.max(ei, si), l)
	local out = __arrNew()
	for i = si, ei - 1 do
		__push(out, x[i])
	end
	return out
end

function __concat(x, ...)
	if type(x) == "string" then
		local out = x
		local n = select("#", ...)
		for i = 1, n do
			out = out .. jsStr(select(i, ...))
		end
		return out
	end
	local out = __arrNew()
	local l = getLen(x)
	for i = 0, l - 1 do
		__push(out, x[i])
	end
	local n = select("#", ...)
	for i = 1, n do
		local v = select(i, ...)
		if isArray(v) then
			local vl = getLen(v)
			for j = 0, vl - 1 do
				__push(out, v[j])
			end
		else
			__push(out, v)
		end
	end
	return out
end

function __indexOf(x, v, from)
	if type(x) == "string" then
		local pos = string.find(x, v, (from or 0) + 1, true)
		if pos == nil then
			return -1
		end
		return pos - 1
	end
	local l = getLen(x)
	local f = from or 0
	if f < 0 then
		f = math.max(0, l + f)
	end
	for i = f, l - 1 do
		if sameValue(x[i], v) then
			return i
		end
	end
	return -1
end

function __includes(x, v, from)
	if type(x) == "string" then
		return string.find(x, v, (from or 0) + 1, true) ~= nil
	end
	return __indexOf(x, v, from) >= 0
end

function __join(x, sep)
	if type(x) == "string" then
		return x
	end
	sep = sep or ","
	local l = getLen(x)
	local out = {}
	for i = 0, l - 1 do
		out[#out + 1] = jsStr(x[i])
	end
	return table.concat(out, sep)
end

function __forEach(x, fn)
	-- Tamed JS routes both Array.forEach and Map.forEach here. Maps are not
	-- numeric arrays; treating them as one silently skips React's deletions.
	if type(x) == "table" and type(rawget(x, "forEach")) == "function" then
		x.forEach(fn)
		return
	end
	if type(x) == "string" then
		for i = 1, #x do
			fn(x:sub(i, i), i - 1, x)
		end
		return
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		fn(x[i], i, x)
	end
end

function __map(x, fn)
	local out = __arrNew()
	if type(x) == "string" then
		for i = 1, #x do
			local r = fn(x:sub(i, i), i - 1, x)
			__push(out, r)
		end
		return out
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		local r = fn(x[i], i, x)
		__push(out, r)
	end
	return out
end

function __filter(x, fn)
	local out = __arrNew()
	if type(x) == "string" then
		for i = 1, #x do
			local c = x:sub(i, i)
			if fn(c, i - 1, x) then
				__push(out, c)
			end
		end
		return out
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		local v = x[i]
		if fn(v, i, x) then
			__push(out, v)
		end
	end
	return out
end

function __find(x, fn)
	if type(x) == "string" then
		for i = 1, #x do
			local c = x:sub(i, i)
			if fn(c, i - 1, x) then
				return c
			end
		end
		return nil
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		local v = x[i]
		if fn(v, i, x) then
			return v
		end
	end
	return nil
end

function __findIndex(x, fn)
	if type(x) == "string" then
		for i = 1, #x do
			if fn(x:sub(i, i), i - 1, x) then
				return i - 1
			end
		end
		return -1
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		if fn(x[i], i, x) then
			return i
		end
	end
	return -1
end

function __every(x, fn)
	if type(x) == "string" then
		for i = 1, #x do
			if not fn(x:sub(i, i), i - 1, x) then
				return false
			end
		end
		return true
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		if not fn(x[i], i, x) then
			return false
		end
	end
	return true
end

function __some(x, fn)
	if type(x) == "string" then
		for i = 1, #x do
			if fn(x:sub(i, i), i - 1, x) then
				return true
			end
		end
		return false
	end
	local l = getLen(x)
	for i = 0, l - 1 do
		if fn(x[i], i, x) then
			return true
		end
	end
	return false
end

function __at(x, i)
	if type(x) == "string" then
		local l = #x
		if i < 0 then
			i = l + i
		end
		if i < 0 or i >= l then
			return nil
		end
		return x:sub(i + 1, i + 1)
	end
	local l = getLen(x)
	if i < 0 then
		i = l + i
	end
	if i < 0 or i >= l then
		return nil
	end
	return x[i]
end

function __sort(x, cmp)
	if type(x) == "string" then
		return x
	end
	local l = getLen(x)
	local tmp = {}
	for i = 0, l - 1 do
		tmp[i + 1] = x[i]
	end
	local function less(a, b)
		if cmp ~= nil then
			return cmp(a, b) < 0
		end
		local ta, tb = type(a), type(b)
		if ta == "number" and tb == "number" then
			return a < b
		end
		return jsStr(a) < jsStr(b)
	end
	-- insertion sort: n is tiny in the vendor code
	for i = 2, l do
		local v = tmp[i]
		local j = i - 1
		while j >= 1 and less(v, tmp[j]) do
			tmp[j + 1] = tmp[j]
			j = j - 1
		end
		tmp[j + 1] = v
	end
	for i = 0, l - 1 do
		x[i] = tmp[i + 1]
	end
	return x
end

-- ---------------------------------------------------------------- Object

local Obj = {}

function Obj:keys(t)
	local out = __arrNew()
	if type(t) ~= "table" then
		return out
	end
	local nums = {}
	local strings = {}
	for k in pairs(t) do
		if type(k) == "number" and k == math.floor(k) and k >= 0 then
			nums[#nums + 1] = k
		elseif type(k) == "string" then
			strings[#strings + 1] = k
		end
	end
	table.sort(nums)
	for _, k in ipairs(nums) do
		__push(out, tostring(k))
	end
	for _, k in ipairs(strings) do
		__push(out, k)
	end
	return out
end

function Obj:hasOwnProperty(t, k)
	if type(t) ~= "table" then
		return false
	end
	if type(k) == "number" and k == math.floor(k) then
		return rawget(t, k) ~= nil or rawget(t, tostring(k)) ~= nil
	end
	return rawget(t, k) ~= nil
end

local function makeDescriptor(v)
	return { value = v, writable = true, configurable = true, enumerable = true }
end

function Obj:defineProperty(t, k, desc)
	if type(t) == "function" then
		__spikeFnField(t, k, if type(desc) == "table" and desc.value ~= nil then desc.value else nil, true)
		return t
	end
	if type(k) == "number" and k == math.floor(k) then
		local s = tostring(k)
		if rawget(t, k) == nil and rawget(t, s) ~= nil then
			k = s
		end
	end
	if desc ~= nil then
		if rawget(desc, "get") ~= nil then
			defineAccessor(t, k, function(self)
				return rawget(desc, "get")(self)
			end)
		else
			rawset(t, k, rawget(desc, "value"))
		end
	end
	return t
end

function Obj:defineProperties(t, props)
	if type(props) == "table" then
		for k, desc in pairs(props) do
			self.defineProperty(self, t, k, desc)
		end
	end
	return t
end

function Obj:freeze(t)
	return t
end

function Obj:seal(t)
	return t
end

function Obj:preventExtensions(t)
	return t
end

function Obj:getOwnPropertyDescriptor(t, k)
	if type(t) ~= "table" then
		return nil
	end
	local v = rawget(t, k)
	if v == nil and type(k) == "string" then
		v = rawget(t, tonumber(k))
	end
	if v == nil then
		local acc = accReg[t]
		if acc ~= nil and acc[k] ~= nil then
			return { get = acc[k], configurable = true, enumerable = true }
		end
		return nil
	end
	return makeDescriptor(v)
end

function Obj:getPrototypeOf(t)
	return protoReg[t]
end

function Obj:assign(t, ...)
	local n = select("#", ...)
	for i = 1, n do
		local src = select(i, ...)
		if type(src) == "table" then
			for k, v in pairs(src) do
				rawset(t, k, v)
			end
		end
	end
	return t
end

_G.Object = Obj
protoReg[Obj] = { toString = function(self, obj)
	return "[object Object]"
end }
-- Object.prototype as the vendor reads it via __protoOf(Object)
ObjectProto = protoReg[Obj]

function Obj.hasOwnProperty(self, obj, key)
	-- JS boxes a primitive receiver and finds no own property, so
	-- Object.prototype.hasOwnProperty.call(5, "x") is false, not a throw.
	-- rawget would raise on a non-table, so match JS and answer false.
	if type(obj) ~= "table" then
		return false
	end
	if type(key) == "number" and key == math.floor(key) then
		return rawget(obj, key) ~= nil or rawget(obj, tostring(key)) ~= nil
	end
	return rawget(obj, key) ~= nil
end

-- __callFn passes (thisArg, key); direct prototype calls pass (obj, key).
-- The harden wrapper re-injects ObjectProto as the first argument in both
-- cases, so the object is always the second argument.
function ObjectProto.hasOwnProperty(self, obj, key)
	return Obj.hasOwnProperty(Object, obj, key)
end
function ObjectProto.toString(self, obj)
	if type(obj) == "number" then
		return jsNum(obj)
	end
	if type(obj) == "boolean" then
		return tostring(obj)
	end
	if type(obj) == "string" then
		return obj
	end
	if type(obj) == "function" then
		return "[function]"
	end
	local tag = rawget(obj, _G.Symbol.toStringTag)
	if tag ~= nil then
		return "[object " .. tostring(tag) .. "]"
	end
	return "[object Object]"
end

-- ---------------------------------------------------------------- Symbol

local symForCache = {}

local function makeSymbol(name)
	local s = {}
	rawset(s, "__js_symbol", name)
	return s
end

local Sym = {}

Sym["for"] = function(self, name)
	local s = symForCache[name]
	if s == nil then
		s = makeSymbol(name)
		symForCache[name] = s
	end
	return s
end

-- emitted code reads Symbol["for"] as a computed access; the key exists above.
Sym.iterator = makeSymbol("iterator")
Sym.toStringTag = makeSymbol("toStringTag")

_G.Symbol = Sym

-- (ObjectProto.toString references Symbol.toStringTag via _G at call time.)

-- ---------------------------------------------------------------- Error

local ErrorImpl = {}

local function makeError(message, thisArg)
	local e = if type(thisArg) == "table" then thisArg else {}
	rawset(e, "message", message)
	rawset(e, "name", "Error")
	rawset(e, "stack", debug.traceback("Error: " .. tostring(message), 2))
	return e
end

setmetatable(ErrorImpl, {
	__call = function(self, a, b)
		-- Direct JS call: Error("msg"). __new path: Error(instance, "msg").
		if type(a) == "table" then
			return makeError(b, a)
		end
		return makeError(a, nil)
	end,
})

_G.Error = ErrorImpl

-- ---------------------------------------------------------------- String / Array / Function

_G.String = function(x)
	return jsStr(x)
end

_G.Array = setmetatable({}, {
	__call = function(self, n)
		local out = {}
		lenReg[out] = jsInt(n or 0)
		setmetatable(out, jsArrMeta)
		return out
	end,
})

FunctionProto = {
	toString = function(self, f)
		local info = debug.getinfo(f, "nS")
		local name = info and info.name or "anonymous"
		return "function " .. name .. "()"
	end,
}
_G.Function = {}
protoReg[_G.Function] = FunctionProto

-- ---------------------------------------------------------------- JSON

local function jsonStringify(v, depth)
	depth = depth or 0
	if depth > 40 then
		return "null"
	end
	if v == nil then
		return "null"
	end
	local t = type(v)
	if t == "boolean" then
		return v and "true" or "false"
	end
	if t == "number" then
		return jsNum(v)
	end
	if t == "string" then
		local e = v:gsub('[%z\1-\31\\"]', function(c)
			if c == '"' then
				return '\\"'
			elseif c == "\\" then
				return "\\\\"
			elseif c == "\n" then
				return "\\n"
			elseif c == "\t" then
				return "\\t"
			elseif c == "\r" then
				return "\\r"
			elseif c == "\b" then
				return "\\b"
			elseif c == "\f" then
				return "\\f"
			end
			return string.format("\\u%04x", c:byte())
		end)
		return '"' .. e .. '"'
	end
	if t == "table" then
		if isArray(v) then
			local l = getLen(v)
			local parts = {}
			for i = 0, l - 1 do
				parts[#parts + 1] = jsonStringify(v[i], depth + 1)
			end
			return "[" .. table.concat(parts, ",") .. "]"
		end
		local parts = {}
		for k, val in pairs(v) do
			if type(k) == "string" and type(val) ~= "function" then
				parts[#parts + 1] = jsonStringify(k, depth + 1) .. ":" .. jsonStringify(val, depth + 1)
			end
		end
		return "{" .. table.concat(parts, ",") .. "}"
	end
	return "null"
end

local JSON = {}

function JSON:stringify(v)
	return jsonStringify(v)
end

_G.JSON = JSON

-- ---------------------------------------------------------------- Math / Date / Reflect

local M = {}

function M:floor(x)
	return math.floor(x)
end

function M:random()
	return math.random()
end

function M:log(x)
	return math.log(x)
end

function M:clz32(x)
	x = bit32.band(x, 0xFFFFFFFF)
	if x == 0 then
		return 32
	end
	local n = 0
	if x < 16384 then
		n = n + 16
		x = bit32.lshift(x, 16)
	end
	if x < 1048576 then
		n = n + 8
		x = bit32.lshift(x, 8)
	end
	if x < 67108864 then
		n = n + 4
		x = bit32.lshift(x, 4)
	end
	if x < 1073741824 then
		n = n + 2
		x = bit32.lshift(x, 2)
	end
	if x < 2147483648 then
		n = n + 1
	end
	return n
end

M.LN2 = math.log(2)

_G.Math = M

local D = {}

function D.now(self)
	return os.clock() * 1000
end

_G.Date = D

local R = {}

function R:construct(C, args)
	local list = if type(args) == "table" then args else __arrNew()
	local n = getLen(list)
	local a = {}
	for i = 0, n - 1 do
		a[i + 1] = list[i]
	end
	return __new(C, table.unpack(a))
end

_G.Reflect = R

-- ---------------------------------------------------------------- console

_G.__consoleLog = {}

local function clog(level, args)
	local parts = {}
	for i = 1, #args do
		parts[#parts + 1] = jsStr(args[i])
	end
	local line = table.concat(parts, " ")
	local entry = level .. ": " .. line
	table.insert(_G.__consoleLog, entry)
	print("[" .. level .. "] " .. line)
end

local Cn = {}

function Cn:error(...)
	local args = { ... }
	clog("error", args)
end

function Cn:warn(...)
	local args = { ... }
	clog("warn", args)
end

function Cn:log(...)
	local args = { ... }
	clog("log", args)
end

function Cn:info(...)
	local args = { ... }
	clog("info", args)
end

function Cn:debug(...)
	local args = { ... }
	clog("debug", args)
end

function Cn:group(...)
end

function Cn:groupCollapsed(...)
end

function Cn:groupEnd(...)
end

function Cn:createTask(name)
	local task = {
		name = name,
		label = name,
		_id = 0,
		_lastAccessTime = 0,
		state = "running",
		disabled = false,
		timestamp = 0,
	}
	task.log = function()
	end
	-- The dev build calls `task.run(callback, ...)` as a dot call, so the
	-- callback is the first argument.
	task.run = function(fn, ...)
		return fn(...)
	end
	return task
end

_G.console = Cn

-- ---------------------------------------------------------------- constants

-- The emitted files open with a raw `require(instance)` for RuntimeLib.
-- The bridge turns that into an on-disk require, relative to this file (specs/).
local rtlibCache = nil
-- Field storage for JS functions, which cannot hold fields in this VM
-- (the reconciler's CJS module exports a bare factory function, and the
-- module tail does `module.exports.default = module.exports` etc.).
local fnFieldReg = {}
function __spikeFnField(fn, key, val, hasVal)
	local t = fnFieldReg[fn]
	if t == nil then
		t = {}
		fnFieldReg[fn] = t
	end
	if hasVal then
		t[key] = val
		return val
	end
	return t[key]
end

-- __spikeRequireTS removed: staged modules require RuntimeLib directly.

-- The VM's table.unpack mis-handles tables with a leading nil (it
-- compacted the values and appended a nil, shifting every argument).
-- Return the values as an explicit multi-value result instead.
function __spikeUnpack(t, i, j)
	i = i or 1
	if j == nil then
		local n = 0
		for k = 1, 128 do
			if t[k] ~= nil then
				n = k
			end
		end
		j = n
	end
	local n = j - i + 1
	if n <= 0 then
		return nil
	end
	if n == 1 then
		return t[i]
	end
	if n == 2 then
		return t[i], t[i + 1]
	end
	if n == 3 then
		return t[i], t[i + 1], t[i + 2]
	end
	if n == 4 then
		return t[i], t[i + 1], t[i + 2], t[i + 3]
	end
	if n == 5 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4]
	end
	if n == 6 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5]
	end
	if n == 7 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6]
	end
	if n == 8 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7]
	end
	if n == 9 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8]
	end
	if n == 10 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9]
	end
	if n == 11 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9], t[i + 10]
	end
	if n == 12 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9], t[i + 10], t[i + 11]
	end
	if n == 13 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9], t[i + 10], t[i + 11], t[i + 12]
	end
	if n == 14 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9], t[i + 10], t[i + 11], t[i + 12], t[i + 13]
	end
	if n == 15 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9], t[i + 10], t[i + 11], t[i + 12], t[i + 13], t[i + 14]
	end
	if n == 16 then
		return t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6], t[i + 7], t[i + 8], t[i + 9], t[i + 10], t[i + 11], t[i + 12], t[i + 13], t[i + 14], t[i + 15]
	end
	return table.unpack(t, i, j)
end

_G.unpack = __spikeUnpack

_G.Infinity = math.huge
_G.NaN = 0 / 1

-- ---------------------------------------------------------------- task queues

_G.__spikeMicrotasks = {}
_G.__spikeMacrotasks = {}

local function drain()
	local guard = 0
	while true do
		guard = guard + 1
		if guard > 5000 then
			error("spike: task queue did not empty within 5000 steps")
		end
		local m = _G.__spikeMicrotasks
		if #m > 0 then
			local fn = table.remove(m, 1)
			fn()
		elseif #_G.__spikeMacrotasks > 0 then
			local fn = table.remove(_G.__spikeMacrotasks, 1)
			fn()
		else
			break
		end
	end
end

_G.__spikeDrain = drain

if _G.process == nil then
	_G.process = { env = { NODE_ENV = "development" } }
end
if _G.performance == nil then
	_G.performance = {
		now = function()
			return os.clock() * 1000
		end,
	}
end
if _G.queueMicrotask == nil then
	_G.queueMicrotask = function(fn)
		table.insert(_G.__spikeMicrotasks, fn)
	end
end
if _G.setTimeout == nil then
	_G.setTimeout = function(fn, _ms)
		table.insert(_G.__spikeMacrotasks, fn)
		return #_G.__spikeMacrotasks
	end
end
if _G.clearTimeout == nil then
	_G.clearTimeout = function(_id)
	end
end
if _G.setImmediate == nil then
	_G.setImmediate = function(fn)
		table.insert(_G.__spikeMacrotasks, 1, fn)
		return 1
	end
end
if _G.clearImmediate == nil then
	_G.clearImmediate = function(_id)
	end
end

-- roblox-ts emits the same method sometimes as a colon call (global
-- receiver) and sometimes as a dot call (local/computed receiver), so
-- every global method accepts both conventions: it re-injects the global
-- table as self when the call did not bring one.
-- ---------------------------------------------------------------- Map / Set / WeakMap
--
-- The vendor code calls these with dot style (m.set(k, v) -- no self), so
-- each instance carries its own method closures bound to a private data
-- table. Constructors are plain functions so __new (and typeOfJS checks)
-- treat them as JS constructors.

local function sameKey(a, b)
	if rawequal(a, b) then
		return true
	end
	if type(a) == "number" and type(b) == "number" and a == b then
		return true
	end
	return false
end

local function newMapInstance()
	local d = {}
	local m = {}
	m.size = 0
	m.set = function(k, v)
		for i = 1, #d do
			if d[i][3] and sameKey(d[i][1], k) then
				d[i][2] = v
				return m
			end
		end
		d[#d + 1] = { k, v, true }
		m.size += 1
		return m
	end
	m.get = function(k)
		for i = 1, #d do
			if d[i][3] and sameKey(d[i][1], k) then
				return d[i][2]
			end
		end
		return nil
	end
	m.has = function(k)
		for i = 1, #d do
			if d[i][3] and sameKey(d[i][1], k) then
				return true
			end
		end
		return false
	end
	m["delete"] = function(k)
		for i = 1, #d do
			if d[i][3] and sameKey(d[i][1], k) then
				d[i] = { nil, nil, false }
				m.size -= 1
				return true
			end
		end
		return false
	end
	m.clear = function()
		for i = 1, #d do
			d[i] = { nil, nil, false }
		end
		m.size = 0
		return m
	end
	m.forEach = function(fn)
		-- Stable slots preserve JS iteration when callbacks delete/clear keys.
		-- Newly appended entries are visited during the same iteration.
		local i = 1
		while i <= #d do
			local entry = d[i]
			if entry[3] then fn(entry[2], entry[1], m) end
			i += 1
		end
	end
	return m
end

local function newSetInstance()
	local d = {}
	local m = {}
	m.size = 0
	m.add = function(v)
		for i = 1, #d do
			if sameKey(d[i], v) then
				return m
			end
		end
		d[#d + 1] = v
		m.size = #d
		return m
	end
	m.has = function(v)
		for i = 1, #d do
			if sameKey(d[i], v) then
				return true
			end
		end
		return false
	end
	m["delete"] = function(v)
		for i = 1, #d do
			if sameKey(d[i], v) then
				table.remove(d, i)
				m.size = #d
				return true
			end
		end
		return false
	end
	m.clear = function()
		for i = 1, #d do
			d[i] = nil
		end
		m.size = 0
		return m
	end
	return m
end

local function newWeakMapInstance()
	local d = {}
	local m = {}
	m.set = function(k, v)
		d[k] = v
		return m
	end
	m.get = function(k)
		return d[k]
	end
	m.has = function(k)
		return d[k] ~= nil
	end
	m["delete"] = function(k)
		local had = d[k] ~= nil
		d[k] = nil
		return had
	end
	return m
end

_G.Map = function(_inst)
	return newMapInstance()
end
_G.Set = function(_inst)
	return newSetInstance()
end
_G.WeakMap = function(_inst)
	return newWeakMapInstance()
end

-- Store a value on an ST table; if it is a function, wrap it so it
-- tolerates both dot and colon call conventions (colon calls arrive with
-- the ST table as the first argument).
function __spikeSetST(ST, name, value)
	if type(value) == "function" then
		ST[name] = function(...)
			-- Vararg-safe: a nil argument must survive, so the receiver is
			-- peeled with select rather than a table + unpack (which would
			-- resolve to Roblox's builtin unpack on the staged runtime).
			if select("#", ...) > 0 and (select(1, ...)) == ST then
				return value(select(2, ...))
			end
			return value(...)
		end
	else
		ST[name] = value
	end
end

-- A CJS module whose exports are a function (e.g. react-reconciler) is
-- callable; the ES-module namespace table is not, so callers that treat
-- the namespace as the export value get a thin callable wrapper.
-- A field read on a value that may be a function (e.g. an element type's
-- defaultProps/displayName/name). Tables behave normally; functions consult
-- the function-field registry (nil unless a field was actually set).
function __spikeOptField(obj, key)
	if type(obj) == "function" then
		local reg = fnFieldReg[obj]
		if reg ~= nil then
			return reg[key]
		end
		return nil
	end
	return obj[key]
end

function __spikeOptFieldSet(obj, key, val)
	if type(obj) == "function" then
		__spikeFnField(obj, key, val, true)
	else
		obj[key] = val
	end
	return val
end

function __spikeCallable(ns)
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
	return t
end

local function harden(g)
	for k, v in pairs(g) do
		if type(v) == "function" then
			g[k] = function(a, ...)
				if a == g then
					return v(a, ...)
				end
				return v(g, a, ...)
			end
		end
	end
	return g
end

harden(Obj)
harden(Cn)
harden(D)
harden(M)
harden(JSON)
harden(R)
harden(Sym)
harden(ObjectProto)
harden(FunctionProto)
if type(_G.performance) == "table" then
	harden(_G.performance)
end


-- The install rewrite above sends every `getfenv(0).X = ...` to `_G.X = ...`
-- so cross-module reads of _G.Symbol / _G.__spikeMicrotasks resolve. But some
-- of this module's OWN functions read those names as bare identifiers (e.g.
-- ObjectProto.hasOwnProperty calls Obj.hasOwnProperty(Object, ...)). On Roblox
-- a bare identifier reads the script environment, which does NOT chain to _G,
-- so `Object` would be nil and hasOwnProperty would wrongly answer false --
-- silently dropping every prop React.createElement copies. The env metatable
-- is protected (setmetatable throws), so copy the _G installs into this
-- module's environment instead; the reads happen later (when a consumer calls
-- in), by which point every install is present.
for _k, _v in pairs(_G) do
	if _gBaseline[_k] == nil then
		getfenv(0)[_k] = _v
	end
end

-- Export everything this module defined so each staged module can copy it into
-- its own environment: the _G installs above plus the bare `function foo()`
-- helpers, which land in this script's environment rather than in _G.
local _exported = {}
for _k, _v in pairs(_G) do
	if _gBaseline[_k] == nil then
		_exported[_k] = _v
	end
end
for _k, _v in pairs(getfenv(0)) do
	if _envBaseline[_k] == nil and _exported[_k] == nil then
		_exported[_k] = _v
	end
end
return _exported
