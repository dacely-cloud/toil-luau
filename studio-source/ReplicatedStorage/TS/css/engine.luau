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
	 * Pure CSS engine for the Roblox host.
	 *
	 * No Roblox service access, no `game`, no `Instance`: it runs on the plain Luau
	 * VM (Lest native backend) and on the Roblox runtime alike.
	 *
	 * The public contract is the `Engine` interface from engine-types.ts:
	 * computedStyle, keyframes, parseAnimation, evaluateAnimation, parseTransition,
	 * sampleTiming.  This module re-exports those types so consumers can import
	 * everything from one place.
	 
]]
-- ------------------------------------------------------------------ string helpers
-- Module-local so no runtime global is needed (Lest's VM never gets the
-- spike helper globals).  roblox-ts keeps `string` as the native Luau
-- string type, so these emit as direct `s:match(...)` / `s:sub(...)` etc.
local function strTrim(s)
	local m = { string.match(s, "^%s*(.-)%s*$") }
	return m[1]
end
local function slice(s, start, finish)
	if finish == nil then
		return string.sub(s, start)
	end
	return string.sub(s, start, finish)
end
local function strMatch(s, pattern)
	return string.match(s, pattern)
end
--[[
	*
	 * Like strMatch but returns ALL capture groups as an array. Needed where the
	 * pattern has 2+ captures (parseValue, parseAnB, parseHexColor) — string.match
	 * returns multiple values that a single-variable binding would drop.
	 
]]
local function strMatchAll(s, pattern)
	-- string.match returns its capture groups as multiple values. Wrapping in an
	-- array literal makes roblox-ts emit `local r = { { string.match(...) } }`
	-- (an outer array holding an inner table of the captures). We unwrap that
	-- inner table and return it as a flat array (0-indexed in TS / 1 in Luau).
	local wrapped = { { string.match(s, pattern) } }
	local inner = wrapped[1]
	if #inner == 0 or inner[1] == nil then
		return nil
	end
	return inner
end
local function strSplit(s, sep)
	return string.split(s, sep)
end
--* Split on whitespace (pattern), since string.split is plain-only. 
local function strSplitWs(s)
	local out = {}
	local iter = string.gmatch(s, "%S+")
	local m
	while true do
		m = (iter())
		if m == nil then
			break
		end
		local _m = m
		table.insert(out, _m)
	end
	return out
end
local jsTypeOfJS
local function strFind(s, pattern, init, plain)
	-- string.find returns (start, end, ...). roblox-ts may emit this as a plain
	-- first-return number OR wrap the multi-return in a table, depending on how
	-- the result is typed/used. Handle both: if the binding is a table, take the
	-- first element; if it is already a number, use it directly.
	local r = (string.find(s, pattern, init, plain))
	if r == nil then
		return nil
	end
	if jsTypeOfJS(r) == "number" then
		return r
	end
	return r[1]
end
local function strGsub(s, pattern, repl)
	local _s = s
	local _pattern = pattern
	local _repl = repl
	return string.gsub(_s, _pattern, _repl)
end
local function strStartsWith(s, prefix)
	return #s >= #prefix and slice(s, 1, #prefix) == prefix
end
local function strEndsWith(s, suffix)
	return #s >= #suffix and slice(s, #s - #suffix + 1) == suffix
end
-- ------------------------------------------------------------------ number/JS helpers
-- Module-local mirrors of the JS runtime globals the engine used to rely on
-- (parseFloat, parseInt, isNaN, typeOfJS, Math). Local so the pure engine runs
-- in any env chain (the Lest css spec requires it directly, outside the spike
-- env that installs those globals). Behavior matches the spike RT shims.
local function jsParseFloat(s)
	local _condition = strMatch(tostring(s), "^%s*([%+%-]?%d*%.?%d+[eE][%+%-]?%d+)")
	if _condition == nil then
		_condition = strMatch(tostring(s), "^%s*([%+%-]?%d*%.?%d+)")
	end
	local m = _condition
	local n = if m ~= nil then tonumber(m) else nil
	return if n ~= nil then n else math.huge - math.huge
end
local function jsParseInt(s, radix)
	if radix == 16 then
		local n = tonumber(strTrim(s), 16)
		return if n == nil then math.huge - math.huge else n
	end
	local m = strMatch(tostring(s), "^%s*([%+%-]?%d+)")
	local n = if m ~= nil then tonumber(m) else nil
	return if n ~= nil then n else math.huge - math.huge
end
local function jsIsNaN(n)
	return n ~= n
end
function jsTypeOfJS(v)
	local t = type(v)
	if t == "table" then
		return "object"
	end
	if t == "string" then
		return "string"
	end
	if t == "number" then
		return "number"
	end
	if t == "boolean" then
		return "boolean"
	end
	if t == "function" then
		return "function"
	end
	return "undefined"
end
local function jsRound(n)
	return math.floor(n + 0.5)
end
local function jsFloor(n)
	return math.floor(n)
end
local function jsAbs(n)
	return if n < 0 then -n else n
end
--[[
	*
	 * Collect the string keys of a record, in undefined order. Local because the
	 * spike helper globals (and the JS `Object` global) are not present in the
	 * env chain the pure engine runs in under Lest (the spec requires it directly,
	 * outside the spike env that installs `Object`). Iterates with the Luau
	 * builtin `next`, which is always present and needs no global.
	 
]]
local function keysOf(rec)
	local out = {}
	if rec == nil then
		return out
	end
	local k = nil
	while true do
		-- Luau `next` returns (key, value); roblox-ts wraps the multi-return into a
		-- table when the result is indexed, so r[0] is the key and r[1] the value.
		local r = { next(rec, if k == nil then nil else k) }
		local key = r[1]
		if key == nil then
			break
		end
		table.insert(out, key)
		k = key
	end
	return out
end
-- ------------------------------------------------------------------ declarations
--* camelCase (React style objects) -> kebab-case CSS property names. 
local function toKebab(key)
	return string.lower(strGsub(key, "(%u)", "-%1"))
end
--* Expand a 1..4 value box shorthand (padding / margin) into its sides. 
local function expandSides(prefix, value, out)
	local t = strSplitWs(value)
	local n = #t
	if n == 0 then
		return nil
	end
	local top = t[1]
	local right = if n >= 2 then t[2] else t[1]
	local bottom = if n >= 3 then t[3] else t[1]
	local left = if n >= 4 then t[4] else right
	out[prefix .. "-top"] = top
	out[prefix .. "-right"] = right
	out[prefix .. "-bottom"] = bottom
	out[prefix .. "-left"] = left
end
--[[
	*
	 * Canonicalize one declaration block: kebab-case keys, trimmed values, and
	 * the shorthands the host reads by their longhand names (`padding`,
	 * `margin`, `background`, `border`) expanded.
	 
]]
--* Expand `inset` (1..4 values) into top / right / bottom / left. 
local function expandInset(value, out)
	local t = strSplitWs(value)
	local n = #t
	if n == 0 then
		return nil
	end
	local top = t[1]
	local right = if n >= 2 then t[2] else t[1]
	local bottom = if n >= 3 then t[3] else t[1]
	local left = if n >= 4 then t[4] else right
	out.top = top
	out.right = right
	out.bottom = bottom
	out.left = left
end
--* Expand the `font` shorthand into font-size / font-family / font-weight / font-style. 
local function expandFont(value, out)
	local t = strSplitWs(value)
	local family = {}
	local sawSize = false
	for i = 0, #t - 1 do
		local tok = t[i + 1]
		if not sawSize and (strEndsWith(tok, "px") or strMatch(tok, "^%d") ~= nil) then
			-- A <size> or <size>/<line-height> token: everything after is the family.
			local slashIdx = strFind(tok, "/", 1, true)
			if slashIdx ~= nil then
				out["font-size"] = slice(tok, 1, slashIdx - 1)
				out["line-height"] = slice(tok, slashIdx + 1)
			else
				out["font-size"] = tok
			end
			sawSize = true
		elseif sawSize then
			table.insert(family, tok)
		elseif tok == "bold" or tok == "bolder" or tok == "lighter" or strMatch(tok, "^%d%d%d$") ~= nil then
			out["font-weight"] = tok
		elseif tok == "italic" or tok == "oblique" then
			out["font-style"] = tok
		end
	end
	if #family > 0 then
		out["font-family"] = table.concat(family, " ")
	end
end
local function normalizeDeclarations(decls)
	local out = {}
	if decls == nil then
		return out
	end
	local keys = keysOf(decls)
	for ki = 0, #keys - 1 do
		local rawKey = keys[ki + 1]
		local value = strTrim(tostring(decls[rawKey]))
		local key = toKebab(strTrim(rawKey))
		if key == "padding" or key == "margin" then
			expandSides(key, value, out)
		elseif key == "background" then
			-- A gradient maps to background-image (-> UIGradient); a plain
			-- colour maps to background-color.
			if strFind(value, "gradient", 1, true) ~= nil then
				out["background-image"] = value
			else
				out["background-color"] = value
			end
		elseif key == "border" then
			local parts = strSplitWs(value)
			for pi = 0, #parts - 1 do
				local p = parts[pi + 1]
				if strEndsWith(p, "px") or strMatch(p, "^%d") ~= nil then
					out["border-width"] = p
				elseif p == "solid" or p == "dashed" or p == "dotted" or p == "none" then
					out["border-style"] = p
				else
					out["border-color"] = p
				end
			end
		elseif key == "inset" then
			expandInset(value, out)
		elseif key == "font" then
			expandFont(value, out)
		elseif key == "place-items" then
			local t = strSplitWs(value)
			if #t > 0 then
				out["align-items"] = t[1]
				out["justify-items"] = if #t >= 2 then t[2] else t[1]
			end
		elseif key == "place-content" then
			local t = strSplitWs(value)
			if #t > 0 then
				out["align-content"] = t[1]
				out["justify-content"] = if #t >= 2 then t[2] else t[1]
			end
		elseif key == "overflow" then
			out.overflow = value
			out["overflow-x"] = value
			out["overflow-y"] = value
		else
			out[key] = value
		end
	end
	return out
end
-- ------------------------------------------------------------------ types
-- ------------------------------------------------------------------ parseAnB
local function parseAnB(expr)
	local e = strGsub(expr, "%s+", "")
	if e == "odd" then
		return { 2, 1 }
	end
	if e == "even" then
		return { 2, 0 }
	end
	-- an+b: optional sign + optional digits + "n" + optional signed integer.
	-- Also handle a bare number (a=0) and a bare "n" (a=1, b=0).
	local caps = strMatchAll(e, "^(%-?%d*)n([%+%-]?%d+)$")
	if caps ~= nil then
		local _condition = caps[1]
		if _condition == nil then
			_condition = ""
		end
		local aRaw = _condition
		local a
		if #aRaw == 0 or aRaw == "-" then
			a = if aRaw == "-" then -1 else 1
		else
			a = jsParseInt(aRaw, 10)
		end
		local _condition_1 = caps[2]
		if _condition_1 == nil then
			_condition_1 = ""
		end
		local bRaw = _condition_1
		-- The b capture may include a leading + or -; jsParseInt handles - but
		-- not +, so strip a leading + (a + means positive, value is unchanged).
		local b = jsParseInt(if #bRaw > 0 and string.sub(bRaw, 1, 1) == "+" then string.sub(bRaw, 2) else bRaw, 10)
		return { a, b }
	end
	-- bare integer: a=0, b=that number
	local plain = strMatch(e, "^(%-?%d+)$")
	if plain ~= nil then
		return { 0, jsParseInt(plain, 10) }
	end
	return nil
end
-- ------------------------------------------------------------------ number helpers
local function toNum(v)
	if jsTypeOfJS(v) == "number" then
		return v
	end
	local n = jsParseFloat(v)
	return if jsIsNaN(n) then 0 else n
end
local function clampN(v, lo, hi)
	return if v < lo then lo elseif v > hi then hi else v
end
local function fmt(n)
	if jsAbs(n - jsRound(n)) < 1e-6 then
		return tostring(jsRound(n))
	end
	return tostring(n)
end
local function specGreater(a, b)
	if a[1] ~= b[1] then
		return a[1] > b[1]
	end
	if a[2] ~= b[2] then
		return a[2] > b[2]
	end
	return a[3] > b[3]
end
-- ------------------------------------------------------------------ selector parsing
--[[
	*
	 * Parse a single compound selector (e.g. ".btn.primary", "#app .nav li:first-child").
	 * Returns the compound and advances `pos` past the last character consumed.
	 
]]
local function parseCompound(s, pos)
	local parts = {}
	local p = pos
	while p <= #s do
		local c = slice(s, p, p)
		if c == " " or c == ">" or c == "+" or c == "~" or c == "," then
			break
		end
		local part
		if c == "*" then
			part = {
				kind = "universal",
				name = "*",
				matches = function(_el)
					return true
				end,
				specificity = { 0, 0, 0 },
			}
			p += 1
		elseif c == "." then
			-- class
			local name = ""
			p += 1
			while p <= #s do
				local ch = slice(s, p, p)
				if ch == "." or ch == "#" or ch == ":" or ch == "[" or ch == " " or ch == ">" or ch == "+" or ch == "~" or ch == "," then
					break
				end
				name ..= ch
				p += 1
			end
			if #name == 0 then
				return nil
			end
			local cls = name
			part = {
				kind = "class",
				name = cls,
				matches = function(el)
					return table.find(el.classList, cls) ~= nil
				end,
				specificity = { 0, 1, 0 },
			}
		elseif c == "#" then
			-- id
			local name = ""
			p += 1
			while p <= #s do
				local ch = slice(s, p, p)
				if ch == "." or ch == "#" or ch == ":" or ch == "[" or ch == " " or ch == ">" or ch == "+" or ch == "~" or ch == "," then
					break
				end
				name ..= ch
				p += 1
			end
			if #name == 0 then
				return nil
			end
			local id = name
			part = {
				kind = "id",
				name = id,
				matches = function(el)
					return el.id == id
				end,
				specificity = { 1, 0, 0 },
			}
		elseif c == ":" then
			-- pseudo-class
			local name = ""
			p += 1
			while p <= #s do
				local ch = slice(s, p, p)
				if ch == "(" or ch == "." or ch == "#" or ch == ":" or ch == "[" or ch == " " or ch == ">" or ch == "+" or ch == "~" or ch == "," then
					break
				end
				name ..= ch
				p += 1
			end
			if #name == 0 then
				return nil
			end
			if name == "nth-child" or name == "nth-last-child" then
				-- expect (an+b)
				if p <= #s and slice(s, p, p) == "(" then
					local close = p + 1
					while close <= #s and slice(s, close, close) ~= ")" do
						close += 1
					end
					local arg = slice(s, p + 1, close - 1)
					local ab = parseAnB(arg)
					if ab == nil then
						return nil
					end
					local _binding = ab
					local a = _binding[1]
					local b = _binding[2]
					local isLast = name == "nth-last-child"
					part = {
						kind = "pseudo",
						name = name .. "(" .. arg .. ")",
						matches = function(_el)
							return true
						end,
						specificity = { 0, 1, 0 },
					}
					p = close + 1
				else
					return nil
				end
			elseif name == "first-child" then
				part = {
					kind = "pseudo",
					name = "first-child",
					matches = function()
						return true
					end,
					specificity = { 0, 1, 0 },
				}
			elseif name == "last-child" then
				part = {
					kind = "pseudo",
					name = "last-child",
					matches = function()
						return true
					end,
					specificity = { 0, 1, 0 },
				}
			else
				-- hover / active / focus / other state pseudos
				local st = name
				part = {
					kind = "pseudo",
					name = st,
					matches = function(el)
						return table.find(el.states, st) ~= nil
					end,
					specificity = { 0, 1, 0 },
				}
			end
		elseif c == "[" then
			-- attribute selector
			local name = ""
			p += 1
			while p <= #s do
				local ch = slice(s, p, p)
				if ch == "=" or ch == "]" or ch == " " then
					break
				end
				name ..= ch
				p += 1
			end
			if #name == 0 then
				return nil
			end
			local op
			local val
			if p <= #s and slice(s, p, p) == "=" then
				op = "="
				p += 1
				local v = ""
				local q1 = slice(s, p, p)
				if q1 == '"' or q1 == "'" then
					p += 1
					while p <= #s and slice(s, p, p) ~= q1 do
						v ..= slice(s, p, p)
						p += 1
					end
					p += 1
				else
					while p <= #s do
						local ch = slice(s, p, p)
						if ch == "]" then
							break
						end
						v ..= ch
						p += 1
					end
				end
				val = v
			end
			if p <= #s and slice(s, p, p) == "]" then
				p += 1
			end
			local aname = name
			local aop = op
			local aval = val
			part = {
				kind = "attr",
				name = aname,
				attrOp = aop,
				matches = function(el)
					local v = el.attributes[aname]
					if aop == nil then
						return v ~= nil
					end
					return v ~= nil and v == aval
				end,
				specificity = { 0, 1, 0 },
			}
		else
			-- type selector
			local name = ""
			while p <= #s do
				local ch = slice(s, p, p)
				if ch == "." or ch == "#" or ch == ":" or ch == "[" or ch == " " or ch == ">" or ch == "+" or ch == "~" or ch == "," or ch == "*" then
					break
				end
				name ..= ch
				p += 1
			end
			if #name == 0 then
				return nil
			end
			local tn = name
			part = {
				kind = "type",
				name = tn,
				matches = function(el)
					return el.tagName == tn
				end,
				specificity = { 0, 0, 1 },
			}
		end
		local _part = part
		table.insert(parts, _part)
	end
	if #parts == 0 then
		return nil
	end
	-- compute compound specificity
	local sa = 0
	local sb = 0
	local sc = 0
	for i = 0, #parts - 1 do
		sa += parts[i + 1].specificity[1]
		sb += parts[i + 1].specificity[2]
		sc += parts[i + 1].specificity[3]
	end
	return { {
		parts = parts,
		specificity = { sa, sb, sc },
	}, p }
end
--[[
	*
	 * Parse a full selector string (may contain comma-separated groups).
	 * Returns an array of Selector objects.
	 
]]
local function parseSelectors(input)
	-- split on commas (respecting parentheses depth for :nth-child)
	local groups = {}
	local depth = 0
	local cur = ""
	for i = 0, #input - 1 do
		local c = slice(input, i + 1, i + 1)
		if c == "(" then
			depth += 1
		end
		if c == ")" then
			depth -= 1
		end
		if c == "," and depth == 0 then
			local _cur = cur
			table.insert(groups, _cur)
			cur = ""
		else
			cur ..= c
		end
	end
	if #cur > 0 then
		local _cur = cur
		table.insert(groups, _cur)
	end
	local result = {}
	for gi = 0, #groups - 1 do
		local group = strTrim(groups[gi + 1])
		if #group == 0 then
			continue
		end
		-- tokenize the group into compound selectors and combinators
		local chain = {}
		local combinators = {}
		local pos = 1
		while pos <= #group do
			-- skip whitespace
			while pos <= #group and slice(group, pos, pos) == " " do
				pos += 1
			end
			if pos > #group then
				break
			end
			-- check for combinator
			local c = slice(group, pos, pos)
			if c == ">" or c == "+" or c == "~" then
				table.insert(combinators, c)
				pos += 1
				continue
			end
			-- parse compound
			local parsed = parseCompound(group, pos)
			if parsed == nil then
				break
			end
			local _binding = parsed
			local compound = _binding[1]
			local newPos = _binding[2]
			table.insert(chain, compound)
			pos = newPos
		end
		if #chain > 0 then
			-- compute selector specificity
			local sa = 0
			local sb = 0
			local sc = 0
			for i = 0, #chain - 1 do
				sa += chain[i + 1].specificity[1]
				sb += chain[i + 1].specificity[2]
				sc += chain[i + 1].specificity[3]
			end
			local _arg0 = {
				chain = chain,
				combinators = combinators,
				specificity = { sa, sb, sc },
			}
			table.insert(result, _arg0)
		end
	end
	return result
end
-- ------------------------------------------------------------------ matching
--[[
	*
	 * Check whether a compound selector matches an element, given sibling
	 * context for :first-child / :last-child / :nth-child.
	 
]]
local function matchCompound(compound, el, siblingIndex, siblingCount)
	for i = 0, #compound.parts - 1 do
		local part = compound.parts[i + 1]
		if part.kind == "pseudo" then
			if part.name == "first-child" then
				if siblingIndex ~= 0 then
					return false
				end
				continue
			end
			if part.name == "last-child" then
				if siblingIndex ~= siblingCount - 1 then
					return false
				end
				continue
			end
			if strStartsWith(part.name, "nth-child(") or strStartsWith(part.name, "nth-last-child(") then
				-- name is "nth-child(a,b)" or "nth-last-child(a,b)"
				local lastOpen = strFind(part.name, "(", 1, true)
				local _exp = part.name
				local _condition = lastOpen
				if _condition == nil then
					_condition = 1
				end
				local arg = slice(_exp, _condition + 1, #part.name - 1)
				local ab = parseAnB(arg)
				if ab == nil then
					return false
				end
				local _binding = ab
				local a = _binding[1]
				local b = _binding[2]
				local isLast = strStartsWith(part.name, "nth-last-child")
				local n = if isLast then (siblingCount - 1 - siblingIndex) else siblingIndex
				local target = n + 1
				if a == 0 then
					if target ~= b then
						return false
					end
				else
					local diff = target - b
					if diff % a ~= 0 then
						return false
					end
					local k = diff / a
					if k < 0 then
						return false
					end
				end
				continue
			end
		end
		if not part.matches(el) then
			return false
		end
	end
	return true
end
--[[
	*
	 * Match a full selector against an element, walking up the ancestor chain.
	 * `ancestors` is ordered outermost-first.
	 
]]
local function matchSelector(sel, el, ancestors, siblingIndex, siblingCount)
	local chain = sel.chain
	if #chain == 0 then
		return false
	end
	-- The last compound must match the element itself
	local lastIdx = #chain - 1
	local lastCompound = chain[lastIdx + 1]
	if not matchCompound(lastCompound, el, siblingIndex, siblingCount) then
		return false
	end
	-- Walk backwards through the chain, matching ancestors
	local ancestorPtr = #ancestors - 1
	do
		local ci = lastIdx - 1
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				ci -= 1
			else
				_shouldIncrement = true
			end
			if not (ci >= 0) then
				break
			end
			local compound = chain[ci + 1]
			local combinator = if ci < #sel.combinators then sel.combinators[ci + 1] else " "
			if combinator == ">" then
				-- direct parent: the next ancestor must match
				if ancestorPtr < 0 then
					return false
				end
				if not matchCompound(compound, ancestors[ancestorPtr + 1], siblingIndex, siblingCount) then
					return false
				end
				ancestorPtr -= 1
			elseif combinator == "+" or combinator == "~" then
				-- sibling combinator: for the spike, treat like descendant
				local found = false
				do
					local ai = ancestorPtr
					local _shouldIncrement_1 = false
					while true do
						if _shouldIncrement_1 then
							ai -= 1
						else
							_shouldIncrement_1 = true
						end
						if not (ai >= 0) then
							break
						end
						if matchCompound(compound, ancestors[ai + 1], siblingIndex, siblingCount) then
							found = true
							break
						end
					end
				end
				if not found then
					return false
				end
			else
				-- descendant: any ancestor must match
				local found = false
				do
					local ai = ancestorPtr
					local _shouldIncrement_1 = false
					while true do
						if _shouldIncrement_1 then
							ai -= 1
						else
							_shouldIncrement_1 = true
						end
						if not (ai >= 0) then
							break
						end
						if matchCompound(compound, ancestors[ai + 1], siblingIndex, siblingCount) then
							found = true
							ancestorPtr = ai - 1
							break
						end
					end
				end
				if not found then
					return false
				end
			end
		end
	end
	return true
end
-- ------------------------------------------------------------------ cascade
local function computedStyle(compiledRules, identity, ancestors, siblingIndex, siblingCount, inline)
	-- Collect matching rules with their specificity and source order
	local matched = {}
	for i = 0, #compiledRules - 1 do
		local rule = compiledRules[i + 1]
		if matchSelector(rule.selector, identity, ancestors, siblingIndex, siblingCount) then
			local _arg0 = {
				spec = rule.specificity,
				order = i,
				decls = rule.declarations,
			}
			table.insert(matched, _arg0)
		end
	end
	-- Sort by specificity (ascending), then source order (ascending)
	table.sort(matched, function(a, b)
		if a.spec[1] ~= b.spec[1] then
			return a.spec[1] < b.spec[1]
		end
		if a.spec[2] ~= b.spec[2] then
			return a.spec[2] < b.spec[2]
		end
		if a.spec[3] ~= b.spec[3] then
			return a.spec[3] < b.spec[3]
		end
		return a.order < b.order
	end)
	-- Apply in order: later entries override earlier ones
	local result = {}
	for i = 0, #matched - 1 do
		local decls = matched[i + 1].decls
		local keys = keysOf(decls)
		for ki = 0, #keys - 1 do
			result[keys[ki + 1]] = decls[keys[ki + 1]]
		end
	end
	-- Inline style wins last
	if inline ~= nil then
		local norm = normalizeDeclarations(inline)
		-- Luau style tables have no declaration order. Explicit longhands in an
		-- inline object must win over its shorthand expansions deterministically.
		-- Keep stylesheet declaration normalization and rule cascade unchanged.
		local rawKeys = keysOf(inline)
		for i = 0, #rawKeys - 1 do
			local rawKey = rawKeys[i + 1]
			local key = toKebab(strTrim(rawKey))
			if key ~= "padding" and key ~= "margin" and key ~= "background" and key ~= "border" and key ~= "inset" and key ~= "font" and key ~= "place-items" and key ~= "place-content" and key ~= "overflow" then
				norm[key] = strTrim(tostring(inline[rawKey]))
			end
		end
		local ikeys = keysOf(norm)
		for ki = 0, #ikeys - 1 do
			result[ikeys[ki + 1]] = norm[ikeys[ki + 1]]
		end
	end
	return result
end
-- ------------------------------------------------------------------ keyframes
local keyframesFromDeclarations, keyframesFromFrames
local function parseKeyframesFromRules(rules)
	local sets = {}
	for i = 0, #rules - 1 do
		local rule = rules[i + 1]
		if rule.keyframes ~= nil then
			local name = strTrim(rule.selector)
			local prefix = "@keyframes"
			local _name = name
			local _arg1 = #prefix
			if string.sub(_name, 1, _arg1) == prefix then
				local _name_1 = name
				local _arg0 = #prefix + 1
				name = strTrim(string.sub(_name_1, _arg0))
			end
			local frames = {}
			if jsTypeOfJS(rule.keyframes) == "string" then
				keyframesFromDeclarations(rule.declarations, frames)
			else
				keyframesFromFrames(rule.keyframes, frames)
			end
			table.sort(frames, function(a, b)
				return a.offset < b.offset
			end)
			sets[name] = {
				name = name,
				frames = frames,
			}
		end
	end
	return sets
end
function keyframesFromFrames(frames, out)
	for i = 0, #frames - 1 do
		local _out = out
		local _arg0 = {
			offset = frames[i + 1].offset,
			styles = normalizeDeclarations(frames[i + 1].styles),
		}
		table.insert(_out, _arg0)
	end
end
--[[
	*
	 * A keyframe selector as a 0..1 offset: `from` / `to`, a percentage, or a
	 * bare fraction (a bare number above 1 is read as a percentage).
	 
]]
local function parseOffset(label)
	local s = string.lower(strTrim(label))
	if s == "from" then
		return 0
	end
	if s == "to" then
		return 1
	end
	local n = jsParseFloat(s)
	if jsIsNaN(n) then
		return 0
	end
	if strEndsWith(s, "%") or n > 1 then
		return clampN(n / 100, 0, 1)
	end
	return clampN(n, 0, 1)
end
function keyframesFromDeclarations(decls, out)
	if decls == nil then
		return nil
	end
	local keys = keysOf(decls)
	for ki = 0, #keys - 1 do
		local offsetStr = keys[ki + 1]
		local valueStr = decls[offsetStr]
		local styles = {}
		local parts = strSplit(valueStr, ";")
		for pi = 0, #parts - 1 do
			local part = strTrim(parts[pi + 1])
			if #part == 0 then
				continue
			end
			local colonIdx = strFind(part, ":", 1, true)
			if colonIdx ~= nil then
				local prop = strTrim(slice(part, 1, colonIdx - 1))
				local val = strTrim(slice(part, colonIdx + 1))
				if #prop > 0 then
					styles[prop] = val
				end
			end
		end
		local _out = out
		local _arg0 = {
			offset = parseOffset(offsetStr),
			styles = normalizeDeclarations(styles),
		}
		table.insert(_out, _arg0)
	end
end
-- ------------------------------------------------------------------ animation parsing
local function parseAnimation(value)
	local parts = strSplit(value, ",")
	local specs = {}
	for i = 0, #parts - 1 do
		local part = strTrim(parts[i + 1])
		if #part == 0 then
			continue
		end
		local tokens = strSplitWs(part)
		local name = ""
		local duration = 0
		local timingFunction = "ease"
		local delay = 0
		local timeSeen = 0
		local iterationCount = 1
		local direction = "normal"
		local fillMode = "none"
		local playState = "running"
		for ti = 0, #tokens - 1 do
			local t = strTrim(tokens[ti + 1])
			if #t == 0 then
				continue
			end
			-- CSS animation shorthand: the first <time> is the duration, the
			-- second is the delay (check "ms" before "s" since "ms" ends in "s").
			if strEndsWith(t, "ms") then
				local n = jsParseFloat(t)
				if not jsIsNaN(n) then
					if timeSeen == 0 then
						duration = n / 1000
					elseif timeSeen == 1 then
						delay = n / 1000
					end
					timeSeen += 1
					continue
				end
			end
			if strEndsWith(t, "s") then
				local n = jsParseFloat(t)
				if not jsIsNaN(n) then
					if timeSeen == 0 then
						duration = n
					elseif timeSeen == 1 then
						delay = n
					end
					timeSeen += 1
					continue
				end
			end
			if t == "ease" or t == "linear" or t == "ease-in" or t == "ease-out" or t == "ease-in-out" then
				timingFunction = t
				continue
			end
			if t == "infinite" then
				iterationCount = "infinite"
				continue
			end
			if t == "normal" or t == "reverse" or t == "alternate" or t == "alternate-reverse" then
				direction = t
				continue
			end
			if t == "none" or t == "forwards" or t == "backwards" or t == "both" then
				fillMode = t
				continue
			end
			if t == "running" or t == "paused" then
				playState = t
				continue
			end
			local n = jsParseFloat(t)
			if not jsIsNaN(n) and tostring(n) == t then
				iterationCount = n
				continue
			end
			if #name == 0 then
				name = t
			end
		end
		if #name > 0 then
			local _arg0 = {
				name = name,
				duration = duration,
				timingFunction = timingFunction,
				delay = delay,
				iterationCount = iterationCount,
				direction = direction,
				fillMode = fillMode,
				playState = playState,
			}
			table.insert(specs, _arg0)
		end
	end
	return specs
end
-- ------------------------------------------------------------------ transition parsing
local function parseTransition(value)
	local parts = strSplit(value, ",")
	local specs = {}
	for i = 0, #parts - 1 do
		local part = strTrim(parts[i + 1])
		if #part == 0 then
			continue
		end
		local tokens = strSplitWs(part)
		local property = "all"
		local duration = 0.3
		local timingFunction = "ease"
		local delay = 0
		local timeSeen = 0
		for ti = 0, #tokens - 1 do
			local t = strTrim(tokens[ti + 1])
			if #t == 0 then
				continue
			end
			if strEndsWith(t, "s") and not strEndsWith(t, "ms") then
				local n = jsParseFloat(t)
				if not jsIsNaN(n) then
					if timeSeen == 0 then
						duration = n
					else
						delay = n
					end
					timeSeen += 1
					continue
				end
			end
			if strEndsWith(t, "ms") then
				local n = jsParseFloat(t)
				if not jsIsNaN(n) then
					if timeSeen == 0 then
						duration = n / 1000
					else
						delay = n / 1000
					end
					timeSeen += 1
					continue
				end
			end
			if t == "ease" or t == "linear" or t == "ease-in" or t == "ease-out" or t == "ease-in-out" then
				timingFunction = t
				continue
			end
			if timeSeen == 0 then
				property = t
			end
		end
		local _arg0 = {
			property = property,
			duration = duration,
			timingFunction = timingFunction,
			delay = delay,
		}
		table.insert(specs, _arg0)
	end
	return specs
end
-- ------------------------------------------------------------------ timing functions
local easeBezier
local function sampleTiming(fn, p)
	local pp = clampN(p, 0, 1)
	repeat
		if fn == "linear" then
			return pp
		end
		if fn == "ease" then
			return easeBezier(pp)
		end
		if fn == "ease-in" then
			return pp * pp
		end
		if fn == "ease-out" then
			return pp * (2 - pp)
		end
		if fn == "ease-in-out" then
			if pp < 0.5 then
				return 2 * pp * pp
			end
			return -1 + (4 - 2 * pp) * pp
		end
		return pp
	until true
end
function easeBezier(t)
	local t2 = t * t
	local t3 = t2 * t
	return 0.25 * t + 0.3 * t2 * (1 - t) + 0.75 * t2 * (1 - t) + t3
end
-- ------------------------------------------------------------------ animation evaluation
local function parseValue(v)
	local caps = strMatchAll(strTrim(v), "^([%-%d%.]+)([%a%%]*)$")
	if caps ~= nil then
		local n = jsParseFloat(caps[1])
		local _condition = caps[2]
		if _condition == nil then
			_condition = ""
		end
		local unit = _condition
		if not jsIsNaN(n) then
			return { n, unit }
		end
	end
	return nil
end
local parseHexColor, toHex
local function interpolateValue(from, to, t)
	local fa = parseValue(from)
	local tb = parseValue(to)
	if fa ~= nil and tb ~= nil then
		if fa[2] == tb[2] then
			local result = fa[1] + (tb[1] - fa[1]) * t
			return fmt(result) .. fa[2]
		end
	end
	local fc = parseHexColor(from)
	local tc = parseHexColor(to)
	if fc ~= nil and tc ~= nil then
		local r = jsRound(fc[1] + (tc[1] - fc[1]) * t)
		local g = jsRound(fc[2] + (tc[2] - fc[2]) * t)
		local b = jsRound(fc[3] + (tc[3] - fc[3]) * t)
		return "#" .. toHex(r) .. toHex(g) .. toHex(b)
	end
	-- Function forms (rotate(90deg), scale(1.2), rgb(...)): interpolate the
	-- argument lists pairwise when both sides use the same function.
	local ff = strMatchAll(strTrim(from), "^([%a][%w%-]*)%((.*)%)$")
	local tf = strMatchAll(strTrim(to), "^([%a][%w%-]*)%((.*)%)$")
	if ff ~= nil and tf ~= nil and ff[1] == tf[1] then
		local _condition = ff[2]
		if _condition == nil then
			_condition = ""
		end
		local fargs = strSplit(_condition, ",")
		local _condition_1 = tf[2]
		if _condition_1 == nil then
			_condition_1 = ""
		end
		local targs = strSplit(_condition_1, ",")
		if #fargs == #targs then
			local parts = {}
			for ai = 0, #fargs - 1 do
				local _arg0 = interpolateValue(strTrim(fargs[ai + 1]), strTrim(targs[ai + 1]), t)
				table.insert(parts, _arg0)
			end
			return ff[1] .. "(" .. table.concat(parts, ", ") .. ")"
		end
	end
	return if t < 0.5 then from else to
end
local HEX_DIGITS
function toHex(n)
	local v = jsFloor(clampN(n, 0, 255))
	local hi = jsFloor(v / 16)
	local lo = v % 16
	return HEX_DIGITS[hi + 1] .. HEX_DIGITS[lo + 1]
end
HEX_DIGITS = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" }
function parseHexColor(s)
	local caps = strMatchAll(strTrim(s), "^#(%x%x)(%x%x)(%x%x)$")
	if caps ~= nil then
		local _condition = caps[1]
		if _condition == nil then
			_condition = "0"
		end
		local _exp = jsParseInt(_condition, 16)
		local _condition_1 = caps[2]
		if _condition_1 == nil then
			_condition_1 = "0"
		end
		local _exp_1 = jsParseInt(_condition_1, 16)
		local _condition_2 = caps[3]
		if _condition_2 == nil then
			_condition_2 = "0"
		end
		return { _exp, _exp_1, jsParseInt(_condition_2, 16) }
	end
	return nil
end
local function evaluateAnimation(anim, kf, t)
	local frames = kf.frames
	if #frames == 0 then
		return {
			styles = {},
		}
	end
	-- Map absolute time onto one iteration: delay, iteration count, direction
	-- (alternate flips odd iterations) and the timing function.
	local duration = if anim.duration > 0 then anim.duration else 1
	local localTime = if t - anim.delay < 0 then 0 else t - anim.delay
	local count = if anim.iterationCount == "infinite" then math.huge else toNum(anim.iterationCount)
	local iter = localTime / duration
	if iter > count then
		iter = count
	end
	local idx = jsFloor(iter)
	local frac = iter - idx
	if frac == 0 and idx > 0 and idx >= count then
		-- Exactly at the end: hold the final frame of the last iteration.
		idx -= 1
		frac = 1
	end
	local dir = anim.direction
	local reversed = dir == "reverse"
	if dir == "alternate" then
		reversed = idx % 2 == 1
	elseif dir == "alternate-reverse" then
		reversed = idx % 2 == 0
	end
	local raw = if reversed then 1 - frac else frac
	local progress = clampN(sampleTiming(anim.timingFunction, raw), 0, 1)
	local i = 0
	for fi = 0, #frames - 1 do
		if frames[fi + 1].offset <= progress then
			i = fi
		else
			break
		end
	end
	if i >= #frames - 1 then
		local last = frames[#frames]
		local result = {}
		local lkeys = keysOf(last.styles)
		for ki = 0, #lkeys - 1 do
			result[lkeys[ki + 1]] = last.styles[lkeys[ki + 1]]
		end
		return {
			styles = result,
		}
	end
	local f0 = frames[i + 1]
	local f1 = frames[i + 2]
	local span = f1.offset - f0.offset
	local localT = if span > 0 then (progress - f0.offset) / span else 1
	local props = {}
	local keys0 = keysOf(f0.styles)
	local keys1 = keysOf(f1.styles)
	local allProps = {}
	for ki = 0, #keys0 - 1 do
		local _arg0 = keys0[ki + 1]
		if not (table.find(allProps, _arg0) ~= nil) then
			local _arg0_1 = keys0[ki + 1]
			table.insert(allProps, _arg0_1)
		end
	end
	for ki = 0, #keys1 - 1 do
		local _arg0 = keys1[ki + 1]
		if not (table.find(allProps, _arg0) ~= nil) then
			local _arg0_1 = keys1[ki + 1]
			table.insert(allProps, _arg0_1)
		end
	end
	for pi = 0, #allProps - 1 do
		local prop = allProps[pi + 1]
		local v0 = f0.styles[prop]
		local v1 = f1.styles[prop]
		if v0 ~= nil and v1 ~= nil then
			props[prop] = interpolateValue(v0, v1, localT)
		elseif v0 ~= nil then
			props[prop] = v0
		elseif v1 ~= nil then
			props[prop] = v1
		end
	end
	return {
		styles = props,
	}
end
-- ------------------------------------------------------------------ createEngine
local function createEngine(rules)
	local compiledRules = {}
	for i = 0, #rules - 1 do
		local rule = rules[i + 1]
		if rule.keyframes ~= nil then
			continue
		end
		local selectors = parseSelectors(rule.selector)
		local declarations = normalizeDeclarations(rule.declarations)
		for si = 0, #selectors - 1 do
			local _arg0 = {
				selector = selectors[si + 1],
				declarations = declarations,
				specificity = selectors[si + 1].specificity,
			}
			table.insert(compiledRules, _arg0)
		end
	end
	local keyframeSets = parseKeyframesFromRules(rules)
	local engine = {
		computedStyle = function(identity, ancestors, siblingIndex, siblingCount, inline)
			local anc = if ancestors == nil then {} else ancestors
			local si = if siblingIndex == nil then 0 else siblingIndex
			local sc = if siblingCount == nil then 1 else siblingCount
			return computedStyle(compiledRules, identity, anc, si, sc, inline)
		end,
		keyframes = function(name)
			local set = keyframeSets[name]
			if set == nil then
				return nil
			end
			return {
				name = set.name,
				frames = set.frames,
			}
		end,
		parseAnimation = function(value)
			return parseAnimation(value)
		end,
		evaluateAnimation = function(anim, kf, t)
			return evaluateAnimation(anim, kf, t)
		end,
		parseTransition = function(value)
			return parseTransition(value)
		end,
		sampleTiming = function(fn, p)
			return sampleTiming(fn, p)
		end,
	}
	return engine
end
return {
	interpolateValue = interpolateValue,
	createEngine = createEngine,
}
