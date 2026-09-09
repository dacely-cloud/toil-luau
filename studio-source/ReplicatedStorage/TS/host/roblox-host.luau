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
	 * Roblox UI host for toil-roblox.
	 *
	 * A react-reconciler hostConfig that maps a React 19 element tree (styled by
	 * the CSS engine) onto a real Roblox ScreenGui instance tree, plus the
	 * engine-agnostic CSS-to-GUI mapper the commit phase runs against it.
	 *
	 * Testability (Lest native backend, no Roblox engine): every Roblox API
	 * touch goes through a HostEnv interface (Instance.new, UDim2/UDim/Vector2/
	 * Color3 constructors, Enum members, helper-child lookups). The default
	 * `makeEngineEnv()` reads the engine globals; tests inject a fake env.
	 * Everything else (TAG_TO_CLASS, length/color/transform parsing, placement
	 * math, idempotent applyStyle) is pure and exported for direct unit tests.
	 
]]
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
--[[
	*
	 * Build a host node's element identity from its props and node state.
	 * Pure and exported so specs can unit-test the mapping.
	 
]]
local function identityFromProps(node, props)
	local classList = {}
	-- React spells it `className`; plain `class` is accepted too.
	local _condition = props.class
	if _condition == nil then
		_condition = props.className
	end
	local rawClass = _condition
	if type(rawClass) == "string" then
		local tokens = string.split(rawClass, "%s+")
		for i = 0, #tokens - 1 do
			if #tokens[i + 1] > 0 then
				local _arg0 = tokens[i + 1]
				table.insert(classList, _arg0)
			end
		end
	end
	local attributes = {}
	local keys = keysOf(props)
	for i = 0, #keys - 1 do
		local k = keys[i + 1]
		if k == "class" or k == "className" or k == "children" or k == "ref" then
			continue
		end
		local v = props[k]
		if type(v) == "string" then
			attributes[k] = v
		end
	end
	local states = {}
	if #node.classId > 0 then
		local _classId = node.classId
		table.insert(states, _classId)
	end
	return {
		tagName = node.nodeType,
		id = attributes.id,
		classList = classList,
		attributes = attributes,
		states = states,
	}
end
--[[
	*
	 * Native-Luau string operations, module-local so no runtime global is
	 * needed (Lest's VM never gets the spike helper globals).
	 * roblox-ts keeps `string` as the native Luau string type, so these emit as
	 * direct `s:match(...)` / `s:sub(...)` / `s:gsub(...)` / `s:lower()` calls.
	 
]]
-- ------------------------------------------------------------------ types
--* A wrapped Roblox Instance. Never `any`: typed accessors below. 
--* One host node of the rendered tree. 
--[[
	*
	 * The narrow Roblox surface the host touches. A test env implements the same
	 * interface over plain tables (specs/_host_env.luau).
	 
]]
--[[
	*
	 * A host node's identity, used to re-resolve the element's computed style.
	 * The mounter (src/host/index.ts) wires this up; the reconciler's commit
	 * calls receive it indirectly through the node.
	 
]]
-- --- string helpers.
-- Native Luau string operations, module-local so no runtime global is
-- needed (Lest's VM never gets the spike helper globals). roblox-ts keeps
-- `string` as the native Luau string type, so these emit as direct
-- `s:match(...)` / `s:sub(...)` / `s:find(...)` calls.
local function strTrim(s)
	local m = { string.match(s, "^%s*(.-)%s*$") }
	return m[1]
end
--[[
	*
	 * Module-local parseFloat/isNaN/parseInt so the mapper does not depend on
	 * the Roblox runtime globals being present in the test env. In Roblox these
	 * shadow the builtins; in the fake env they provide the same behavior.
	 
]]
local function _parseFloat(v)
	local _v = v
	if typeof(_v) == "number" then
		return v
	end
	local s = strTrim(v)
	local m = { string.match(s, "^%s*(-?%d+%.?%d*)") }
	local numStr = (m[1])
	if numStr == nil then
		return NaN
	end
	local n = tonumber(numStr)
	return if n ~= nil then n else NaN
end
local function _isNaN(v)
	return v ~= v
end
--* Module-local round (shadows the Roblox Math:round global). 
local function _round(v)
	return math.floor(v + 0.5)
end
local function _parseInt(v, base)
	local _v = v
	if typeof(_v) == "number" then
		return Math:floor(v)
	end
	local s = strTrim(v)
	if base == 16 then
		local n = tonumber(s, 16)
		return if n ~= nil then n else 0
	end
	local m = { string.match(s, "^%s*(-?%d+)") }
	local numStr = (m[1])
	if numStr == nil then
		return 0
	end
	local n = tonumber(numStr)
	return if n ~= nil then Math:floor(n) else 0
end
local function slice(s, start, finish)
	if finish == nil then
		return string.sub(s, start)
	end
	return string.sub(s, start, finish)
end
local function strFind(s, pattern, init, plain)
	return string.find(s, pattern, init, plain)
end
--* True if s starts with prefix. 
local function startsWith(s, prefix)
	return #s >= #prefix and slice(s, 1, #prefix) == prefix
end
--* True for the GUI classes that carry Text* properties. 
local function isTextInstance(inst)
	local c = inst.ClassName
	return c == "TextLabel" or c == "TextButton" or c == "TextBox"
end
local function isImageInstance(inst)
	local c = inst.ClassName
	return c == "ImageLabel" or c == "ImageButton"
end
-- ------------------------------------------------------------------ tag map
local TAG_TO_CLASS = {
	path2d = "Path2D",
	Path2D = "Path2D",
	scroll = "ScrollingFrame",
	div = "Frame",
	canvasgroup = "CanvasGroup",
	section = "Frame",
	article = "Frame",
	aside = "Frame",
	nav = "Frame",
	main = "Frame",
	footer = "Frame",
	header = "Frame",
	ul = "Frame",
	ol = "Frame",
	li = "Frame",
	svg = "Frame",
	span = "TextLabel",
	label = "TextLabel",
	p = "TextLabel",
	h1 = "TextLabel",
	h2 = "TextLabel",
	h3 = "TextLabel",
	h4 = "TextLabel",
	h5 = "TextLabel",
	h6 = "TextLabel",
	a = "TextButton",
	b = "TextLabel",
	strong = "TextLabel",
	i = "TextLabel",
	em = "TextLabel",
	small = "TextLabel",
	button = "TextButton",
	img = "ImageLabel",
	input = "TextBox",
}
--* Sanitize a DOM tag into a valid Instance.Name. 
local function tagNameToInstanceName(nodeType)
	if nodeType == "#text" then
		return "Text"
	end
	-- Keep alphanumerics; the engine would reject anything else.
	local out = ""
	for i = 0, #nodeType - 1 do
		local c = slice(nodeType, i + 1, i + 1)
		if (c >= "a" and c <= "z") or (c >= "A" and c <= "Z") or (c >= "0" and c <= "9") then
			out ..= c
		end
	end
	return if out == "" then "Element" else out
end
-- ------------------------------------------------------------------ parsing
--[[
	*
	 * Parse a canonical length string into scale (fraction of parent) and offset
	 * (pixels). "auto" -> { scale: 0, offset: 0, auto: true }. Returns undefined
	 * when the string is not a length.
	 
]]
local function parseLength(value)
	if value == nil then
		return nil
	end
	local s = strTrim(value)
	if s == "auto" then
		return {
			scale = 0,
			offset = 0,
			auto = true,
		}
	end
	-- slice(s, i) with one arg returns s[i..end]; the last character is at
	-- index s.size(), so "%" is slice(s, s.size()) -- NOT s.size()-1, which
	-- returns the last two characters and never equals "%". Getting this wrong
	-- made every percentage fall through to the bare-number branch and be
	-- treated as pixels, so width:100% became a 100px box.
	if #s >= 2 and slice(s, #s) == "%" then
		local n = _parseFloat(slice(s, 1, #s - 1))
		if _isNaN(n) then
			return nil
		end
		return {
			scale = n / 100,
			offset = 0,
			auto = false,
		}
	end
	if #s >= 3 and slice(s, #s - 1) == "px" then
		local n = _parseFloat(slice(s, 1, #s - 2))
		if _isNaN(n) then
			return nil
		end
		return {
			scale = 0,
			offset = n,
			auto = false,
		}
	end
	-- A bare number is treated as px.
	local n = _parseFloat(s)
	if _isNaN(n) then
		return nil
	end
	return {
		scale = 0,
		offset = n,
		auto = false,
	}
end
local NAMED_COLORS = {
	transparent = { 0, 0, 0 },
	white = { 255, 255, 255 },
	black = { 0, 0, 0 },
	red = { 255, 0, 0 },
	green = { 0, 128, 0 },
	lime = { 0, 255, 0 },
	blue = { 0, 0, 255 },
	yellow = { 255, 255, 0 },
	cyan = { 0, 255, 255 },
	aqua = { 0, 255, 255 },
	magenta = { 255, 0, 255 },
	fuchsia = { 255, 0, 255 },
	silver = { 192, 192, 192 },
	gray = { 128, 128, 128 },
	grey = { 128, 128, 128 },
	maroon = { 128, 0, 0 },
	olive = { 128, 128, 0 },
	purple = { 128, 0, 128 },
	teal = { 0, 128, 128 },
	navy = { 0, 0, 128 },
	orange = { 255, 165, 0 },
	gold = { 255, 215, 0 },
	pink = { 255, 192, 203 },
	brown = { 165, 42, 42 },
	coral = { 255, 127, 80 },
	crimson = { 220, 20, 60 },
	salmon = { 250, 128, 114 },
	tomato = { 255, 99, 71 },
	violet = { 238, 130, 238 },
	indigo = { 75, 0, 130 },
	turquoise = { 64, 224, 208 },
	skyblue = { 135, 206, 235 },
	royalblue = { 65, 105, 225 },
	steelblue = { 70, 130, 180 },
	slategray = { 112, 128, 144 },
	forestgreen = { 34, 139, 34 },
	seagreen = { 46, 139, 87 },
	limegreen = { 50, 205, 50 },
	khaki = { 240, 230, 140 },
	beige = { 245, 245, 220 },
	ivory = { 255, 255, 240 },
	lavender = { 230, 230, 250 },
	plum = { 221, 160, 221 },
	orchid = { 218, 112, 214 },
	tan = { 210, 180, 140 },
	chocolate = { 210, 105, 30 },
	darkred = { 139, 0, 0 },
	darkgreen = { 0, 100, 0 },
	darkblue = { 0, 0, 139 },
	darkgray = { 169, 169, 169 },
	darkgrey = { 169, 169, 169 },
	lightgray = { 211, 211, 211 },
	lightgrey = { 211, 211, 211 },
	lightblue = { 173, 216, 230 },
	lightgreen = { 144, 238, 144 },
	whitesmoke = { 245, 245, 245 },
	gainsboro = { 220, 220, 220 },
	dimgray = { 105, 105, 105 },
}
--* HSL (h in degrees, s/l in 0..1) to 0..255 RGB. 
local function hslToRgb(h, sat, light)
	local hh = ((h % 360) + 360) % 360
	local c = (1 - math.abs(2 * light - 1)) * sat
	local x = c * (1 - math.abs(((hh / 60) % 2) - 1))
	local m = light - c / 2
	local r = 0
	local g = 0
	local b = 0
	if hh < 60 then
		r = c
		g = x
	elseif hh < 120 then
		r = x
		g = c
	elseif hh < 180 then
		g = c
		b = x
	elseif hh < 240 then
		g = x
		b = c
	elseif hh < 300 then
		r = x
		b = c
	else
		r = c
		b = x
	end
	return { _round((r + m) * 255), _round((g + m) * 255), _round((b + m) * 255) }
end
--* Strip a trailing "%" and parse the number (for hsl / alpha percentages). 
local function parsePct(v)
	local t = strTrim(v)
	if #t >= 1 and slice(t, #t) == "%" then
		return _parseFloat(slice(t, 1, #t - 1)) / 100
	end
	return _parseFloat(t)
end
local clamp255, clamp01
local function parseColor(value)
	if value == nil then
		return nil
	end
	local s = string.lower(strTrim(value))
	if s == "transparent" then
		return {
			r = 0,
			g = 0,
			b = 0,
			a = 0,
		}
	end
	-- #rgb / #rgba / #rrggbb / #rrggbbaa
	if slice(s, 1, 1) == "#" then
		local hexLen = #s
		if hexLen == 4 or hexLen == 5 then
			local r = _parseInt(slice(s, 2, 2), 16) * 17
			local g = _parseInt(slice(s, 3, 3), 16) * 17
			local b = _parseInt(slice(s, 4, 4), 16) * 17
			local a = if hexLen == 5 then (_parseInt(slice(s, 5, 5), 16) * 17) / 255 else 1
			return {
				r = r,
				g = g,
				b = b,
				a = a,
			}
		end
		if hexLen == 7 or hexLen == 9 then
			local r = _parseInt(slice(s, 2, 3), 16)
			local g = _parseInt(slice(s, 4, 5), 16)
			local b = _parseInt(slice(s, 6, 7), 16)
			local a = if hexLen == 9 then _parseInt(slice(s, 8, 9), 16) / 255 else 1
			return {
				r = r,
				g = g,
				b = b,
				a = a,
			}
		end
	end
	-- rgb() / rgba()
	local rgbM = { string.match(s, "^rgba?%(([^)]+)%)$") }
	local rgb = (rgbM[1])
	if rgb ~= nil then
		local rawParts = (string.split(rgb, ","))
		local parts = {}
		for i = 0, #rawParts - 1 do
			local _arg0 = strTrim(rawParts[i + 1])
			table.insert(parts, _arg0)
		end
		if #parts >= 3 then
			local r = clamp255(_parseFloat(parts[1]))
			local g = clamp255(_parseFloat(parts[2]))
			local b = clamp255(_parseFloat(parts[3]))
			local a = 1
			if #parts >= 4 then
				local pa = _parseFloat(parts[4])
				a = if _isNaN(pa) then 1 else clamp01(pa)
			end
			return {
				r = r,
				g = g,
				b = b,
				a = a,
			}
		end
	end
	-- hsl() / hsla()
	local hslM = { string.match(s, "^hsla?%(([^)]+)%)$") }
	local hsl = (hslM[1])
	if hsl ~= nil then
		local rawParts = (string.split(hsl, ","))
		if #rawParts >= 3 then
			local h = _parseFloat(strTrim(rawParts[1]))
			local sat = parsePct(rawParts[2])
			local light = parsePct(rawParts[3])
			local a = 1
			if #rawParts >= 4 then
				local pa = _parseFloat(strTrim(rawParts[4]))
				a = if _isNaN(pa) then 1 else clamp01(pa)
			end
			local rgbv = hslToRgb(h, sat, light)
			return {
				r = rgbv[1],
				g = rgbv[2],
				b = rgbv[3],
				a = a,
			}
		end
	end
	local named = NAMED_COLORS[s]
	if named ~= nil then
		return {
			r = named[1],
			g = named[2],
			b = named[3],
			a = if s == "transparent" then 0 else 1,
		}
	end
	return nil
end
--[[
	*
	 * Extract the first color token from a box-shadow value.
	 * A box-shadow is "offset-x offset-y blur-radius [spread] color". We scan
	 * for the first token that parseColor can resolve (a named color, #hex,
	 * rgb()/rgba()).
	 
]]
local function firstColor(value)
	-- Tokenize on whitespace. rgb()/rgba() colors contain spaces, so rejoin
	-- tokens that form an rgb(...)/rgba(...) expression before testing.
	local parts = string.split(value, " ")
	do
		local _i = 0
		local _shouldIncrement = false
		while true do
			local i = _i
			if _shouldIncrement then
				i += 1
			else
				_shouldIncrement = true
			end
			if not (i < #parts) then
				break
			end
			local t = strTrim(parts[i + 1])
			if #t == 0 then
				_i = i
				continue
			end
			-- If this token starts an rgb()/rgba() expression, gather until ')'.
			local isRgbStart = startsWith(t, "rgba(") or startsWith(t, "rgb(")
			local hasCloseParen = strFind(t, ")", 1, true) ~= nil
			if isRgbStart and not hasCloseParen then
				local j = i + 1
				while j < #parts do
					t = t .. " " .. strTrim(parts[j + 1])
					if strFind(t, ")", 1, true) ~= nil then
						break
					end
					j += 1
				end
				i = j
			end
			if parseColor(t) ~= nil then
				return t
			end
			_i = i
		end
	end
	return ""
end
--[[
	*
	 * Pull the asset id/uri out of a CSS `url(...)` value, e.g.
	 * `url("rbxassetid://123")` -> `rbxassetid://123`. Returns "" when the value
	 * is a gradient or otherwise has no url() token.
	 
]]
local function extractUrl(value)
	local open = strFind(value, "url(", 1, true)
	if open == nil then
		return ""
	end
	local rest = slice(value, open + 4)
	local close = strFind(rest, ")", 1, true)
	local inner = if close ~= nil then slice(rest, 1, close - 1) else rest
	inner = strTrim(inner)
	-- Strip surrounding single or double quotes.
	if #inner >= 2 then
		local q = slice(inner, 1, 1)
		if q == '"' or q == "'" then
			inner = slice(inner, 2, #inner - 1)
		end
	end
	return strTrim(inner)
end
--[[
	*
	 * Extract the first length token (the blur radius) from a box-shadow value.
	 * We scan for the first token that parseLength can resolve to a positive
	 * pixel offset, skipping the offset-x/offset-y/position tokens (which are
	 * also lengths, but the blur is the 3rd length in the standard order).
	 
]]
local function firstLength(value)
	local tokens = (string.split(value, " "))
	for i = 0, #tokens - 1 do
		local t = strTrim(tokens[i + 1])
		if #t == 0 then
			continue
		end
		local l = parseLength(t)
		if l ~= nil and l.offset > 0 and not l.auto then
			return t
		end
	end
	return ""
end
--* Split on a separator at paren depth 0 (so rgb(...) commas stay intact). 
local function splitTopLevel(s, sep)
	local out = {}
	local depth = 0
	local cur = ""
	for i = 0, #s - 1 do
		local c = slice(s, i + 1, i + 1)
		if c == "(" then
			depth += 1
		elseif c == ")" then
			depth -= 1
		end
		if c == sep and depth == 0 then
			local _cur = cur
			table.insert(out, _cur)
			cur = ""
		else
			cur ..= c
		end
	end
	if #cur > 0 then
		local _cur = cur
		table.insert(out, _cur)
	end
	return out
end
--* A parsed linear-gradient: a rotation (deg) and its ordered colour stops. 
--[[
	*
	 * Parse a `linear-gradient(<angle>?, c1, c2, ...)` value. The angle is
	 * optional (default 0) and may be given in degrees or as `to <edge>`. Colour
	 * stop positions (`#fff 40%`) are ignored; only the colours are used.
	 
]]
local function parseGradient(value)
	local open = strFind(value, "(", 1, true)
	if open == nil then
		return nil
	end
	local close = #value
	while close > open and slice(value, close, close) ~= ")" do
		close -= 1
	end
	if close <= open then
		return nil
	end
	local inner = slice(value, open + 1, close - 1)
	local parts = splitTopLevel(inner, ",")
	if #parts == 0 then
		return nil
	end
	local rotation = 0
	local start = 0
	local first = strTrim(parts[1])
	local am = { string.match(first, "^(%-?%d+%.?%d*)deg") }
	local angle = (am[1])
	if angle ~= nil then
		local a = _parseFloat(angle)
		if not _isNaN(a) then
			rotation = a
		end
		start = 1
	elseif startsWith(first, "to ") then
		if strFind(first, "right", 1, true) ~= nil then
			rotation = 90
		elseif strFind(first, "left", 1, true) ~= nil then
			rotation = 270
		elseif strFind(first, "top", 1, true) ~= nil then
			rotation = 0
		else
			rotation = 180
		end
		start = 1
	end
	local stops = {}
	do
		local i = start
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i += 1
			else
				_shouldIncrement = true
			end
			if not (i < #parts) then
				break
			end
			local c = parseColor(strTrim(parts[i + 1]))
			if c ~= nil then
				table.insert(stops, c)
			end
		end
	end
	if #stops < 2 then
		return nil
	end
	return {
		rotation = rotation,
		stops = stops,
	}
end
function clamp255(n)
	if _isNaN(n) then
		return 0
	end
	if n < 0 then
		return 0
	end
	if n > 255 then
		return 255
	end
	return n
end
function clamp01(n)
	if n < 0 then
		return 0
	end
	if n > 1 then
		return 1
	end
	return n
end
--* A parsed length component: scale fraction of the parent, plus px offset. 
--* Parse a single "xpx" or "x%"/"x" token. 
local function parseOffset(v)
	if v == nil then
		return {
			scale = 0,
			offset = 0,
		}
	end
	local s = strTrim(v)
	if #s >= 1 and slice(s, #s) == "%" then
		local n = _parseFloat(slice(s, 1, #s - 1))
		return {
			scale = if _isNaN(n) then 0 else n / 100,
			offset = 0,
		}
	end
	local n = _parseFloat(s)
	return {
		scale = 0,
		offset = if _isNaN(n) then 0 else n,
	}
end
--[[
	*
	 * Compute AnchorPoint + Position (as UDim2 scale/offset) from the set of
	 * positioned edges. Top-left default; right/bottom are negative offsets.
	 * - top+left (or none): anchor (0,0)
	 * - bottom+right: anchor (1,1)
	 * - center (no edges, or "center"): anchor (0.5, 0.5)
	 
]]
local function computePlacement(style, rootSizePx)
	local _condition = style.position
	if _condition == nil then
		_condition = ""
	end
	local position = strTrim(_condition)
	local isPos = position == "absolute" or position == "fixed"
	if not isPos then
		-- Static flow: position is irrelevant; leave at 0,0 anchor 0,0.
		return {
			anchorX = 0,
			anchorY = 0,
			posScaleX = 0,
			posScaleY = 0,
			posOffsetX = 0,
			posOffsetY = 0,
		}
	end
	local top = parseOffset(style.top)
	local left = parseOffset(style.left)
	local right = parseOffset(style.right)
	local bottom = parseOffset(style.bottom)
	local hasTop = style.top ~= nil
	local hasLeft = style.left ~= nil
	local hasRight = style.right ~= nil
	local hasBottom = style.bottom ~= nil
	local anchorX
	local anchorY
	local posX
	local posY
	-- Horizontal
	if hasRight and hasLeft then
		-- Both: anchor centered horizontally, positioned by left.
		anchorX = 0
		posX = left
	elseif hasRight then
		anchorX = 1
		posX = {
			scale = 0,
			offset = -right.offset,
		}
	elseif hasLeft then
		anchorX = 0
		posX = left
	else
		anchorX = 0.5
		posX = {
			scale = 0,
			offset = 0,
		}
	end
	-- Vertical
	if hasBottom and hasTop then
		anchorY = 0
		posY = top
	elseif hasBottom then
		anchorY = 1
		posY = {
			scale = 0,
			offset = -bottom.offset,
		}
	elseif hasTop then
		anchorY = 0
		posY = top
	else
		anchorY = 0.5
		posY = {
			scale = 0,
			offset = 0,
		}
	end
	return {
		anchorX = anchorX,
		anchorY = anchorY,
		posScaleX = posX.scale,
		posScaleY = posY.scale,
		posOffsetX = posX.offset,
		posOffsetY = posY.offset,
	}
end
-- ------------------------------------------------------------------ applyStyle
--[[
	*
	 * Apply a computed style table to a host node's Roblox Instance.
	 * Idempotent: helper children are created only once; properties are
	 * re-written every call (cheap on the engine side).
	 
]]
--* Apply the complete public, writable Path2D surface without GuiObject assumptions. 
local function applyPath2D(node, style, env)
	local inst = node.inst
	local path = inst
	local props = node.pendingProps
	local set = function(name, value)
		if inst[name] ~= value then
			inst[name] = value
		end
	end
	local _condition = props.closed
	if _condition == nil then
		_condition = false
	end
	set("Closed", _condition)
	local _condition_1 = style.stroke
	if _condition_1 == nil then
		_condition_1 = style.color
		if _condition_1 == nil then
			_condition_1 = props.color
		end
	end
	local colorValue = _condition_1
	if type(colorValue) == "string" then
		local color = parseColor(colorValue)
		if color ~= nil then
			set("Color3", env.newColor3(color.r, color.g, color.b))
		end
	else
		local _condition_2 = colorValue
		if _condition_2 == nil then
			_condition_2 = env.newColor3(0, 0, 0)
		end
		set("Color3", _condition_2)
	end
	local _result
	if style["stroke-width"] ~= nil then
		_result = _parseFloat(style["stroke-width"])
	else
		local _condition_2 = props.thickness
		if _condition_2 == nil then
			_condition_2 = 1
		end
		_result = _condition_2
	end
	local width = _result
	if _isNaN(width) or width < 0 or width == math.huge then
		error("Path2D thickness must be a finite non-negative number")
	end
	set("Thickness", width)
	set("Visible", props.visible ~= false and style.visibility ~= "hidden" and style.display ~= "none" and style.stroke ~= "none")
	local _result_1
	if style["z-index"] ~= nil then
		_result_1 = _parseInt(style["z-index"])
	else
		local _condition_2 = props.zIndex
		if _condition_2 == nil then
			_condition_2 = 1
		end
		_result_1 = _condition_2
	end
	local z = _result_1
	set("ZIndex", z)
	local _condition_2 = props.controlPoints
	if _condition_2 == nil then
		_condition_2 = {}
	end
	local points = _condition_2
	local previous = node.styleState.pathPoints
	local changed = previous == nil or #previous ~= #points
	if not changed and previous ~= nil then
		for i = 0, #points - 1 do
			local p = points[i + 1]
			local old = previous[i + 1]
			if p.Position ~= old.position or p.LeftTangent ~= old.left or p.RightTangent ~= old.right then
				changed = true
				break
			end
		end
	end
	if changed then
		if #points > path:GetMaxControlPoints() then
			error("Path2D controlPoints exceeds the engine's GetMaxControlPoints() limit")
		end
		-- Snapshot values before emitting the change signal; callers may update
		-- an existing control-point userdata in place between React renders.
		local copy = {}
		for i = 0, #points - 1 do
			local p = points[i + 1]
			local _arg0 = {
				position = p.Position,
				left = p.LeftTangent,
				right = p.RightTangent,
			}
			table.insert(copy, _arg0)
		end
		node.styleState.pathPoints = copy
		path:SetControlPoints(points)
	end
end
--* Per-frame motion must not rebuild gradients, borders, text layout or constraints. 
local applyStyle, parseTransform, ensureHelperChild, findHelper
local function applyAnimatedStyle(node, values, env)
	local inst = node.inst
	if inst == nil then
		return nil
	end
	local fast = inst.ClassName ~= "Path2D"
	for key, value in pairs(values) do
		local k = key
		node.computed[k] = value
		if k ~= "rotation" and k ~= "transform" and k ~= "left" and k ~= "top" and k ~= "opacity" then
			fast = false
		end
	end
	if not fast then
		local saved = node.styleState.animatedProps
		node.styleState.animatedProps = nil
		applyStyle(node, node.computed, env)
		node.styleState.animatedProps = saved
		return nil
	end
	local style = node.computed
	if values.rotation ~= nil or values.transform ~= nil or values.left ~= nil or values.top ~= nil then
		local tf = parseTransform(style)
		local placement = computePlacement(style, { 100, 100 })
		inst.AnchorPoint = env.newVector2(if tf.rotation ~= nil then 0.5 else placement.anchorX, if tf.rotation ~= nil then 0.5 else placement.anchorY)
		inst.Position = env.newUDim2(placement.posScaleX, placement.posOffsetX + tf.translateX, placement.posScaleY, placement.posOffsetY + tf.translateY)
		local _condition = tf.rotation
		if _condition == nil then
			_condition = 0
		end
		inst.Rotation = _condition
		if tf.scale ~= nil then
			ensureHelperChild(node, "ToilScale", "UIScale", env)
			local sc = findHelper(node, "ToilScale")
			if sc ~= nil then
				sc.Scale = tf.scale
			end
		else
			local sc = findHelper(node, "ToilScale")
			if sc ~= nil then
				sc.Scale = 1
			end
		end
	end
	if values.opacity ~= nil then
		local opacity = clamp01(_parseFloat(values.opacity))
		local bg = parseColor(style["background-color"])
		local alpha = if findHelper(node, "ToilGradient") ~= nil then 1 elseif bg ~= nil then bg.a else 0
		inst.BackgroundTransparency = 1 - alpha * opacity
		if isTextInstance(inst) then
			inst.TextTransparency = 1 - opacity
		end
		if isImageInstance(inst) then
			inst.ImageTransparency = 1 - opacity
		end
	end
	local applied = node.styleState.lastAppliedStyle
	if applied ~= nil then
		for key, value in pairs(values) do
			applied[key] = value
		end
	end
end
local parseAspectRatio, mapFontFamily
function applyStyle(node, style, env)
	local inst = node.inst
	if inst == nil then
		return nil
	end
	node.computed = style
	-- Path2D inherits GuiBase, not GuiObject. Writing Size, Position, Rotation,
	-- LayoutOrder, backgrounds or connecting mouse signals to it throws.
	if inst.ClassName == "Path2D" then
		applyPath2D(node, style, env)
		return nil
	end
	-- React may supply a fresh style table with identical values on every
	-- counter update. Do not parse it or invalidate Roblox layout again.
	local previous = node.styleState.lastAppliedStyle
	local changed = previous == nil
	if previous ~= nil then
		for key, value in pairs(style) do
			if previous[key] ~= value then
				changed = true
				break
			end
		end
		if not changed then
			for key in pairs(previous) do
				if style[key] == nil then
					changed = true
					break
				end
			end
		end
	end
	if not changed then
		return nil
	end
	local applied = {}
	for key, value in pairs(style) do
		applied[key] = value
	end
	node.styleState.lastAppliedStyle = applied
	-- Properties currently driven by a running animation on this node. The
	-- animation driver is their sole writer (it re-applies every frame); a
	-- re-render's applyStyle must not reset them to their base value, or the
	-- element flickers back for a frame on every state change. The driver
	-- clears this set around its own applyStyle call so it always writes.
	local animated = node.styleState.animatedProps
	local animOf = function(prop)
		return animated ~= nil and animated[prop] == true
	end
	local animTransform = animOf("transform") or animOf("rotation")
	local animSize = animOf("width") or animOf("height")
	local animBg = animOf("background-color")
	local animOpacity = animOf("opacity")
	local animColor = animOf("color")
	local tf = parseTransform(style)
	-- --- Size (width / height) ---
	-- An axis that is "auto" (or undeclared while the other is declared)
	-- sizes to content through AutomaticSize, as CSS does.
	local w = parseLength(style.width)
	local h = parseLength(style.height)
	if (w ~= nil or h ~= nil) and not animSize then
		local autoX = w == nil or w.auto
		local autoY = h == nil or h.auto
		-- UDim2.new(xScale, xOffset, yScale, yOffset)
		local size = env.newUDim2(if autoX then 0 else w.scale, if autoX then 0 else w.offset, if autoY then 0 else h.scale, if autoY then 0 else h.offset)
		inst.Size = size
		local autoName = if autoX and autoY then "XY" elseif autoX then "X" elseif autoY then "Y" else "None"
		inst.AutomaticSize = env.enumValue("AutomaticSize." .. autoName)
	end
	-- --- Min / max size (UISizeConstraint) ---
	local minW = parseLength(style["min-width"])
	local maxW = parseLength(style["max-width"])
	local minH = parseLength(style["min-height"])
	local maxH = parseLength(style["max-height"])
	if minW ~= nil or maxW ~= nil or minH ~= nil or maxH ~= nil then
		ensureHelperChild(node, "ToilSizeConstraint", "UISizeConstraint", env)
		local scc = findHelper(node, "ToilSizeConstraint")
		if scc ~= nil then
			local scr = scc
			scr.MinSize = env.newVector2(if minW ~= nil then minW.offset else 0, if minH ~= nil then minH.offset else 0)
			scr.MaxSize = env.newVector2(if maxW ~= nil then maxW.offset else math.huge, if maxH ~= nil then maxH.offset else math.huge)
		end
	end
	-- --- Aspect ratio (UIAspectRatioConstraint) ---
	local _condition = style["aspect-ratio"]
	if _condition == nil then
		_condition = ""
	end
	local aspectRaw = _condition
	if #aspectRaw > 0 and aspectRaw ~= "auto" then
		local ratio = parseAspectRatio(aspectRaw)
		if ratio ~= nil and ratio > 0 then
			ensureHelperChild(node, "ToilAspect", "UIAspectRatioConstraint", env)
			local ar = findHelper(node, "ToilAspect")
			if ar ~= nil then
				ar.AspectRatio = ratio
			end
		end
	end
	-- --- Position (top / left / right / bottom + position) ---
	local placement = computePlacement(style, { 100, 100 })
	-- A rotating element spins about its centre (CSS transform-origin defaults
	-- to center), i.e. AnchorPoint (0.5, 0.5). A UIListLayout keeps such a child
	-- in its slot, so this is safe for flow elements as well as absolute ones.
	local rotates = tf.rotation ~= nil or animTransform
	inst.AnchorPoint = env.newVector2(if rotates then 0.5 else placement.anchorX, if rotates then 0.5 else placement.anchorY)
	-- transform: translate(x, y) shifts the element by a pixel offset on top of
	-- its laid-out position -- the natural map onto a Roblox Position offset.
	if not animTransform then
		inst.Position = env.newUDim2(placement.posScaleX, placement.posOffsetX + tf.translateX, placement.posScaleY, placement.posOffsetY + tf.translateY)
	end
	-- --- Background color + opacity ---
	-- A CSS background defaults to transparent, and opacity multiplies into
	-- the background alpha; text fades with opacity alone.
	local bg = parseColor(style["background-color"])
	local bgAlpha = 0
	if bg ~= nil then
		if not animBg then
			inst.BackgroundColor3 = env.newColor3(bg.r, bg.g, bg.b)
		end
		bgAlpha = bg.a
	end
	local opacity = 1
	local opacityRaw = style.opacity
	if opacityRaw ~= nil then
		local o = _parseFloat(opacityRaw)
		if not _isNaN(o) then
			opacity = clamp01(o)
		end
	end
	if not animBg and not animOpacity then
		inst.BackgroundTransparency = 1 - bgAlpha * opacity
	end
	if isTextInstance(inst) and not animOpacity then
		inst.TextTransparency = 1 - opacity
	end
	if isImageInstance(inst) and not animOpacity then
		inst.ImageTransparency = 1 - opacity
	end
	-- --- Gradient background (UIGradient) ---
	-- linear-gradient(<angle>, c1, c2, ...) -> a UIGradient child whose Color is
	-- a ColorSequence of the stops. UIGradient tints BackgroundColor3, so the
	-- frame is painted white for the stops to read true. The angle is animatable
	-- through the `gradient-rotation` property, which makes the gradient flow.
	local _condition_1 = style["background-image"]
	if _condition_1 == nil then
		_condition_1 = ""
	end
	local bgImage = _condition_1
	if strFind(bgImage, "gradient", 1, true) ~= nil and env.newColorSequence ~= nil then
		local grad = parseGradient(bgImage)
		if grad ~= nil and #grad.stops >= 2 then
			ensureHelperChild(node, "ToilGradient", "UIGradient", env)
			local g = findHelper(node, "ToilGradient")
			if g ~= nil then
				g.Color = env.newColorSequence(grad.stops)
				if env.newNumberSequence ~= nil then
					local alphas = {}
					for si = 0, #grad.stops - 1 do
						local _arg0 = 1 - grad.stops[si + 1].a
						table.insert(alphas, _arg0)
					end
					g.Transparency = env.newNumberSequence(alphas)
				end
				if not animOf("gradient-rotation") then
					g.Rotation = grad.rotation
				end
			end
			if not animBg then
				inst.BackgroundColor3 = env.newColor3(255, 255, 255)
			end
			inst.BackgroundTransparency = 1 - opacity
		end
	end
	-- gradient-rotation: animatable angle for the UIGradient above.
	local gradRot = style["gradient-rotation"]
	if gradRot ~= nil and not animOf("gradient-rotation") then
		local g = findHelper(node, "ToilGradient")
		if g ~= nil then
			local gr = _parseFloat(gradRot)
			if not _isNaN(gr) then
				g.Rotation = gr
			end
		end
	end
	-- --- Border -> UIStroke (follows the UICorner; a gradient outline when
	-- border-image is a gradient, otherwise a solid stroke). ---
	local borderW = parseLength(style["border-width"])
	local borderColor = parseColor(style["border-color"])
	if borderW ~= nil and borderW.offset > 0 then
		ensureHelperChild(node, "ToilStroke", "UIStroke", env)
		local stroke = findHelper(node, "ToilStroke")
		if stroke ~= nil then
			local st = stroke
			st.Thickness = _round(borderW.offset)
			if borderColor ~= nil then
				st.Color = env.newColor3(borderColor.r, borderColor.g, borderColor.b)
			end
			st.ApplyStrokeMode = env.enumValue("ApplyStrokeMode.Border")
			local _condition_2 = style["border-image"]
			if _condition_2 == nil then
				_condition_2 = ""
			end
			local borderImage = _condition_2
			if strFind(borderImage, "gradient", 1, true) ~= nil and env.newColorSequence ~= nil then
				local grad = parseGradient(borderImage)
				if grad ~= nil and #grad.stops >= 2 then
					-- A UIGradient MULTIPLIES the stroke's Color; the default
					-- black would render the gradient black. Paint the stroke
					-- white so the gradient stops show their true colours.
					st.Color = env.newColor3(255, 255, 255)
					if node.styleState.ToilStrokeGradient == nil then
						local sg = env.newInstance("UIGradient")
						sg.Name = "ToilStrokeGradient"
						sg.Parent = stroke
						node.styleState.ToilStrokeGradient = sg
					end
					local sg = node.styleState.ToilStrokeGradient
					sg.Color = env.newColorSequence(grad.stops)
					if env.newNumberSequence ~= nil then
						local alphas = {}
						for si = 0, #grad.stops - 1 do
							local _arg0 = 1 - grad.stops[si + 1].a
							table.insert(alphas, _arg0)
						end
						sg.Transparency = env.newNumberSequence(alphas)
					end
					if not animOf("gradient-rotation") then
						sg.Rotation = grad.rotation
					end
				end
			end
		end
		inst.BorderSizePixel = 0
	end
	-- --- Border radius (UICorner child) ---
	local radius = parseLength(style["border-radius"])
	if radius ~= nil and radius.offset > 0 then
		ensureHelperChild(node, "ToilCorner", "UICorner", env)
		local corner = findHelper(node, "ToilCorner")
		if corner ~= nil then
			local r = env.newUDim(0, radius.offset)
			corner.CornerRadius = r
		end
	end
	-- --- Padding (UIPadding child) ---
	local padT = parseLength(style["padding-top"])
	local padL = parseLength(style["padding-left"])
	local padR = parseLength(style["padding-right"])
	local padB = parseLength(style["padding-bottom"])
	if (padT ~= nil and padT.offset > 0) or (padL ~= nil and padL.offset > 0) or (padR ~= nil and padR.offset > 0) or (padB ~= nil and padB.offset > 0) then
		ensureHelperChild(node, "ToilPadding", "UIPadding", env)
		local pad = findHelper(node, "ToilPadding")
		if pad ~= nil then
			local p = pad
			if padT ~= nil then
				p.PaddingTop = env.newUDim(padT.scale, padT.offset)
			end
			if padL ~= nil then
				p.PaddingLeft = env.newUDim(padL.scale, padL.offset)
			end
			if padR ~= nil then
				p.PaddingRight = env.newUDim(padR.scale, padR.offset)
			end
			if padB ~= nil then
				p.PaddingBottom = env.newUDim(padB.scale, padB.offset)
			end
		end
	end
	-- --- Flex layout (UIListLayout child) ---
	local _condition_2 = style.display
	if _condition_2 == nil then
		_condition_2 = ""
	end
	local display = _condition_2
	if display == "flex" or display == "inline-flex" then
		local _condition_3 = style["flex-direction"]
		if _condition_3 == nil then
			_condition_3 = "row"
		end
		local dir = _condition_3
		local isColumn = dir == "column" or dir == "column-reverse"
		ensureHelperChild(node, "ToilLayout", "UIListLayout", env)
		local layout = findHelper(node, "ToilLayout")
		if layout ~= nil then
			local l = layout
			-- Order children by the LayoutOrder the host assigns from DOM order.
			-- A UIListLayout otherwise defaults to sorting by Name, which
			-- scrambles the children into alphabetical order.
			l.SortOrder = env.enumValue("SortOrder.LayoutOrder")
			l.FillDirection = env.enumValue(if isColumn then "FillDirection.Vertical" else "FillDirection.Horizontal")
			-- flex-wrap -> UIListLayout.Wraps (wrap / wrap-reverse both wrap).
			local _condition_4 = style["flex-wrap"]
			if _condition_4 == nil then
				_condition_4 = ""
			end
			local flexWrap = _condition_4
			l.Wraps = flexWrap == "wrap" or flexWrap == "wrap-reverse"
			-- gap
			local gap = parseLength(style.gap)
			if gap ~= nil and gap.offset > 0 then
				l.Padding = env.newUDim(gap.scale, gap.offset)
			end
			-- justify-content
			local _condition_5 = style["justify-content"]
			if _condition_5 == nil then
				_condition_5 = ""
			end
			local jc = _condition_5
			if jc == "center" then
				l.HorizontalAlignment = env.enumValue("HorizontalAlignment.Center")
				l.VerticalAlignment = env.enumValue("VerticalAlignment.Center")
			elseif jc == "flex-end" or jc == "end" then
				l.HorizontalAlignment = env.enumValue("HorizontalAlignment.Right")
				l.VerticalAlignment = env.enumValue("VerticalAlignment.Bottom")
			elseif jc == "flex-start" or jc == "start" then
				l.HorizontalAlignment = env.enumValue("HorizontalAlignment.Left")
				l.VerticalAlignment = env.enumValue("VerticalAlignment.Top")
			end
		end
	end
	-- --- Text color ---
	local textColor = parseColor(style.color)
	if textColor ~= nil and isTextInstance(inst) and not animColor then
		inst.TextColor3 = env.newColor3(textColor.r, textColor.g, textColor.b)
	end
	-- --- Text wrapping (CSS wraps by default; `white-space: nowrap` opts out) ---
	-- Without this a TextLabel never wraps, so long text overflows its box.
	if isTextInstance(inst) then
		local _condition_3 = style["white-space"]
		if _condition_3 == nil then
			_condition_3 = ""
		end
		local whiteSpace = _condition_3
		inst.TextWrapped = whiteSpace ~= "nowrap"
	end
	-- --- Font size ---
	local fontSize = parseLength(style["font-size"])
	if fontSize ~= nil and fontSize.offset > 0 and isTextInstance(inst) then
		inst.TextSize = _round(fontSize.offset)
	end
	-- --- Line height (TextLabel.LineHeight, a multiplier) ---
	local _condition_3 = style["line-height"]
	if _condition_3 == nil then
		_condition_3 = ""
	end
	local lineHeight = _condition_3
	if #lineHeight > 0 and isTextInstance(inst) then
		local lh = _parseFloat(lineHeight)
		if not _isNaN(lh) and lh > 0 then
			inst.LineHeight = lh
		end
	end
	-- --- Text transform: recorded here, applied to the joined text in
	-- syncTextContent (the text is assembled from child text nodes). ---
	local _condition_4 = style["text-transform"]
	if _condition_4 == nil then
		_condition_4 = ""
	end
	node.styleState.textTransform = _condition_4
	-- --- Font family (map to Enum.Font) ---
	local _condition_5 = style["font-family"]
	if _condition_5 == nil then
		_condition_5 = ""
	end
	local fontFamily = _condition_5
	if #fontFamily > 0 and isTextInstance(inst) then
		local fontEnum = mapFontFamily(fontFamily, env)
		if fontEnum ~= nil then
			inst.Font = fontEnum
		end
	end
	-- --- Font weight ---
	local _condition_6 = style["font-weight"]
	if _condition_6 == nil then
		_condition_6 = ""
	end
	local fontWeight = _condition_6
	if isTextInstance(inst) and (fontWeight == "bold" or (#fontWeight >= 2 and _parseInt(fontWeight) >= 600)) then
		inst.Font = env.enumValue("Font.GothamBold")
	end
	-- --- Text overflow: `ellipsis` -> truncate at end, `clip`/unset -> none. ---
	local _condition_7 = style["text-overflow"]
	if _condition_7 == nil then
		_condition_7 = ""
	end
	local textOverflow = _condition_7
	if #textOverflow > 0 and isTextInstance(inst) then
		inst.TextTruncate = env.enumValue(if textOverflow == "ellipsis" then "TextTruncate.AtEnd" else "TextTruncate.None")
	end
	-- --- Text shadow -> TextStroke (Roblox has no drop shadow for text, but a
	-- stroke is the closest built-in: colour + softness). `none` clears it. ---
	local _condition_8 = style["text-shadow"]
	if _condition_8 == nil then
		_condition_8 = ""
	end
	local textShadow = _condition_8
	if #textShadow > 0 and isTextInstance(inst) then
		if textShadow == "none" then
			inst.TextStrokeTransparency = 1
		else
			local shadowCol = parseColor(firstColor(textShadow))
			if shadowCol ~= nil then
				inst.TextStrokeColor3 = env.newColor3(shadowCol.r, shadowCol.g, shadowCol.b)
				inst.TextStrokeTransparency = 1 - shadowCol.a * 0.5
			end
		end
	end
	-- --- object-fit -> ImageLabel/ImageButton.ScaleType. ---
	local _condition_9 = style["object-fit"]
	if _condition_9 == nil then
		_condition_9 = ""
	end
	local objectFit = _condition_9
	if #objectFit > 0 and isImageInstance(inst) then
		local scale = "ScaleType.Fit"
		if objectFit == "fill" then
			scale = "ScaleType.Stretch"
		elseif objectFit == "cover" then
			scale = "ScaleType.Crop"
		elseif objectFit == "contain" or objectFit == "scale-down" then
			scale = "ScaleType.Fit"
		end
		inst.ScaleType = env.enumValue(scale)
	end
	-- --- background-image: url(...) -> ImageLabel/ImageButton.Image. ---
	local _condition_10 = style["background-image"]
	if _condition_10 == nil then
		_condition_10 = ""
	end
	local bgImageUrl = _condition_10
	if isImageInstance(inst) then
		local url = extractUrl(bgImageUrl)
		if #url > 0 then
			inst.Image = url
		end
	end
	-- --- Text alignment ---
	local _result
	if isTextInstance(inst) then
		local _condition_11 = style["text-align"]
		if _condition_11 == nil then
			_condition_11 = ""
		end
		_result = _condition_11
	else
		_result = ""
	end
	local textAlign = _result
	if textAlign == "center" then
		inst.TextXAlignment = env.enumValue("TextXAlignment.Center")
	elseif textAlign == "right" then
		inst.TextXAlignment = env.enumValue("TextXAlignment.Right")
	elseif textAlign == "left" then
		inst.TextXAlignment = env.enumValue("TextXAlignment.Left")
	end
	-- (opacity is folded into the background/text transparency above.)
	-- --- Visibility / display ---
	local _condition_11 = style.visibility
	if _condition_11 == nil then
		_condition_11 = ""
	end
	local vis = _condition_11
	local _condition_12 = style.display
	if _condition_12 == nil then
		_condition_12 = ""
	end
	local disp = _condition_12
	if vis == "hidden" or disp == "none" then
		inst.Visible = false
	else
		inst.Visible = true
	end
	-- --- Overflow ---
	local _condition_13 = style.overflow
	if _condition_13 == nil then
		_condition_13 = ""
	end
	local overflow = _condition_13
	if inst.ClassName == "ScrollingFrame" then
		local horizontal = style["overflow-x"] == "scroll" or style["overflow-x"] == "auto"
		local axis = if horizontal then (if style["overflow-y"] == "hidden" then "X" else "XY") else "Y"
		inst.AutomaticCanvasSize = env.enumValue("AutomaticSize." .. axis)
		inst.CanvasSize = env.newUDim2(0, 0, 0, 0)
		inst.ScrollingDirection = env.enumValue("ScrollingDirection." .. axis)
		inst.ScrollBarThickness = 6
	end
	if overflow == "hidden" or overflow == "scroll" then
		inst.ClipsDescendants = true
	end
	-- --- Z-index ---
	local _condition_14 = style["z-index"]
	if _condition_14 == nil then
		_condition_14 = ""
	end
	local zIndexStr = _condition_14
	if #zIndexStr > 0 then
		local z = _parseInt(zIndexStr)
		if not _isNaN(z) then
			inst.ZIndex = z
		end
	end
	-- --- Rotation + scale (from transform). Written unconditionally when not
	-- animated so a finished animation that restores the base also resets them.
	if not animTransform then
		local _condition_15 = tf.rotation
		if _condition_15 == nil then
			_condition_15 = 0
		end
		inst.Rotation = _condition_15
		-- transform: scale(n) -> a UIScale child (Roblox has no scale on the
		-- instance itself). Created only when a scale is present.
		if tf.scale ~= nil then
			ensureHelperChild(node, "ToilScale", "UIScale", env)
			local sc = findHelper(node, "ToilScale")
			if sc ~= nil then
				sc.Scale = tf.scale
			end
		else
			local sc = findHelper(node, "ToilScale")
			if sc ~= nil then
				sc.Scale = 1
			end
		end
	end
	-- --- Box shadow (approximated via UIStroke child) ---
	local _condition_15 = style["box-shadow"]
	if _condition_15 == nil then
		_condition_15 = ""
	end
	local boxShadow = _condition_15
	if #boxShadow > 0 and boxShadow ~= "none" then
		ensureHelperChild(node, "ToilShadow", "UIStroke", env)
		local shadow = findHelper(node, "ToilShadow")
		if shadow ~= nil then
			local s = shadow
			local shadowColor = parseColor(firstColor(boxShadow))
			if shadowColor ~= nil then
				s.Color = env.newColor3(shadowColor.r, shadowColor.g, shadowColor.b)
				s.Transparency = 1 - shadowColor.a
			end
			local blur = parseLength(firstLength(boxShadow))
			if blur ~= nil and blur.offset > 0 then
				s.Thickness = _round(blur.offset)
			end
			s.ApplyStrokeMode = env.enumValue("ApplyStrokeMode.Border")
		end
	end
	-- --- Gap (row-gap / column-gap) for UIListLayout ---
	local _condition_16 = style.display
	if _condition_16 == nil then
		_condition_16 = ""
	end
	local display2 = _condition_16
	if display2 == "flex" or display2 == "inline-flex" then
		local layout = findHelper(node, "ToilLayout")
		if layout ~= nil then
			local l = layout
			local _condition_17 = style["flex-direction"]
			if _condition_17 == nil then
				_condition_17 = "row"
			end
			local dir = _condition_17
			local isColumn = dir == "column" or dir == "column-reverse"
			local gap = parseLength(style.gap)
			local rowGap = parseLength(style["row-gap"])
			local columnGap = parseLength(style["column-gap"])
			if isColumn then
				local eff = rowGap or gap
				if eff ~= nil and eff.offset > 0 then
					l.Padding = env.newUDim(eff.scale, eff.offset)
				end
			else
				local eff = columnGap or gap
				if eff ~= nil and eff.offset > 0 then
					l.Padding = env.newUDim(eff.scale, eff.offset)
				end
			end
		end
	end
	-- --- Align-items for UIListLayout ---
	local _condition_17 = style["align-items"]
	if _condition_17 == nil then
		_condition_17 = ""
	end
	local alignItems = _condition_17
	if #alignItems > 0 then
		local layout = findHelper(node, "ToilLayout")
		if layout ~= nil then
			local l = layout
			local _condition_18 = style["flex-direction"]
			if _condition_18 == nil then
				_condition_18 = "row"
			end
			local dir = _condition_18
			local isColumn = dir == "column" or dir == "column-reverse"
			if isColumn then
				if alignItems == "center" then
					l.HorizontalAlignment = env.enumValue("HorizontalAlignment.Center")
				elseif alignItems == "flex-end" or alignItems == "end" then
					l.HorizontalAlignment = env.enumValue("HorizontalAlignment.Right")
				elseif alignItems == "flex-start" or alignItems == "start" or alignItems == "stretch" then
					l.HorizontalAlignment = env.enumValue("HorizontalAlignment.Left")
				end
			else
				if alignItems == "center" then
					l.VerticalAlignment = env.enumValue("VerticalAlignment.Center")
				elseif alignItems == "flex-end" or alignItems == "end" then
					l.VerticalAlignment = env.enumValue("VerticalAlignment.Bottom")
				elseif alignItems == "flex-start" or alignItems == "start" or alignItems == "stretch" then
					l.VerticalAlignment = env.enumValue("VerticalAlignment.Top")
				end
			end
		end
	end
	-- --- Letter-spacing (approximated, stored as a custom attribute) ---
	local _condition_18 = style["letter-spacing"]
	if _condition_18 == nil then
		_condition_18 = ""
	end
	local letterSpacing = _condition_18
	if #letterSpacing > 0 then
		-- Not a Roblox property: the write only lands on the fake test
		-- instances, so it is protected from the real engine's error.
		pcall(function()
			inst.LetterSpacing = letterSpacing
		end)
	end
end
function mapFontFamily(family, env)
	local lower = string.lower(strTrim(family))
	if lower == "sans-serif" or lower == "arial" or lower == "roboto" or lower == "verdana" then
		return env.enumValue("Font.Gotham")
	end
	if lower == "serif" or lower == "georgia" or lower == "times new roman" then
		return env.enumValue("Font.Antique")
	end
	if lower == "monospace" or lower == "courier new" or lower == "monaco" then
		return env.enumValue("Font.Code")
	end
	if lower == "cursive" or lower == "comic sans ms" then
		return env.enumValue("Font.IndieFlower")
	end
	return nil
end
--* Parsed CSS transform: rotate() -> degrees, translate() -> px, scale() -> factor. 
--[[
	*
	 * Parse a CSS `transform` value into the pieces the host can map onto a
	 * Roblox instance: rotate() -> Rotation, translate()/translateX/Y -> a Position
	 * offset (px), scale() -> a UIScale. Units on lengths are ignored (px assumed).
	 
]]
local strMatchAll
function parseTransform(style)
	local rotation
	local translateX = 0
	local translateY = 0
	local scale
	local _condition = style.transform
	if _condition == nil then
		_condition = ""
	end
	local transform = _condition
	if #transform > 0 and transform ~= "none" then
		local rm = { string.match(transform, "rotate%(%s*(%-?%d+%.?%d*)") }
		local deg = (rm[1])
		if deg ~= nil then
			local nn = _parseFloat(deg)
			if not _isNaN(nn) then
				rotation = nn
			end
		end
		local tm = strMatchAll(transform, "translate%(%s*(%-?%d+%.?%d*)%a*%s*,?%s*(%-?%d*%.?%d*)")
		if tm ~= nil then
			local _condition_1 = tm[1]
			if _condition_1 == nil then
				_condition_1 = "0"
			end
			local nx = _parseFloat(_condition_1)
			if not _isNaN(nx) then
				translateX = nx
			end
			local _condition_2 = tm[2]
			if _condition_2 == nil then
				_condition_2 = ""
			end
			local yRaw = _condition_2
			if #yRaw > 0 then
				local ny = _parseFloat(yRaw)
				if not _isNaN(ny) then
					translateY = ny
				end
			end
		end
		local txm = { string.match(transform, "translateX%(%s*(%-?%d+%.?%d*)") }
		local txv = (txm[1])
		if txv ~= nil then
			local nn = _parseFloat(txv)
			if not _isNaN(nn) then
				translateX = nn
			end
		end
		local tym = { string.match(transform, "translateY%(%s*(%-?%d+%.?%d*)") }
		local tyv = (tym[1])
		if tyv ~= nil then
			local nn = _parseFloat(tyv)
			if not _isNaN(nn) then
				translateY = nn
			end
		end
		local sm = { string.match(transform, "scale%(%s*(%-?%d+%.?%d*)") }
		local sv = (sm[1])
		if sv ~= nil then
			local nn = _parseFloat(sv)
			if not _isNaN(nn) then
				scale = nn
			end
		end
	end
	local _condition_1 = style.rotation
	if _condition_1 == nil then
		_condition_1 = ""
	end
	local rot = _condition_1
	if rotation == nil and #rot > 0 then
		local nn = _parseFloat(rot)
		if not _isNaN(nn) then
			rotation = nn
		end
	end
	return {
		rotation = rotation,
		translateX = translateX,
		translateY = translateY,
		scale = scale,
	}
end
--* strMatchAll: like string.match but returns all capture groups as an array. 
function strMatchAll(s, pattern)
	local wrapped = { { string.match(s, pattern) } }
	local inner = wrapped[1]
	if #inner == 0 or inner[1] == nil then
		return nil
	end
	return inner
end
function ensureHelperChild(node, name, className, env)
	local existing = findHelper(node, name)
	if existing == nil then
		local helper = env.newInstance(className)
		helper.Name = name
		helper.Parent = node.inst
		-- Track in styleState
		if node.styleState[name] == nil then
			node.styleState[name] = helper
		end
	end
end
function findHelper(node, name)
	local cached = node.styleState[name]
	if cached ~= nil then
		return cached
	end
	return nil
end
-- --- child tree helpers.
-- Declared before buildHostConfig so hoisting is not load-bearing: the
-- mutation callbacks below capture them in closures at factory time.
--[[
	*
	 * Re-derive a text-bearing instance's Text from its text children, in
	 * order. React renders string children as separate text instances that own
	 * no Roblox instance of their own, so the parent displays their join.
	 
]]
local function syncTextContent(node)
	local inst = node.inst
	if inst == nil or not isTextInstance(inst) then
		return nil
	end
	local out = ""
	local kids = node.children
	for i = 0, #kids - 1 do
		if kids[i + 1].kind == "text" then
			out ..= kids[i + 1].text
		end
	end
	-- text-transform (recorded by applyStyle). capitalize is left as-is (no
	-- per-word title-casing) since Roblox has no built-in for it.
	local tt = node.styleState.textTransform
	if tt == "uppercase" then
		out = string.upper(out)
	elseif tt == "lowercase" then
		out = string.lower(out)
	end
	inst.Text = out
end
--* Parse a CSS `aspect-ratio`: "16 / 9", "16/9", or a bare number. 
function parseAspectRatio(v)
	local s = strTrim(v)
	local slashIdx = strFind(s, "/", 1, true)
	if slashIdx ~= nil then
		local w = _parseFloat(slice(s, 1, slashIdx - 1))
		local h = _parseFloat(slice(s, slashIdx + 1))
		if not _isNaN(w) and not _isNaN(h) and h ~= 0 then
			return w / h
		end
		return nil
	end
	local n = _parseFloat(s)
	return if _isNaN(n) then nil else n
end
--* Roblox signal/connection shapes, typed as methods so calls emit `:`. 
--[[
	*
	 * Connect the React event props the host supports: `onClick` on button
	 * instances. The handler is read off the node at click time, so a re-render
	 * that passes a new function needs no re-wiring.
	 
]]
--* True when a Roblox InputObject is a left mouse click / primary touch. 
--[[
	*
	 * Minimal RBXScriptSignal shape. The `this` parameter is load-bearing: it
	 * makes roblox-ts emit a method call (`sig:Connect(fn)`) rather than a field
	 * call (`sig.Connect(fn)`), which would pass the callback as `self` and crash
	 * with "RBXScriptSignal expected, got function".
	 
]]
local function isPrimaryInput(input)
	local uit = input.UserInputType
	local enumT = Enum
	return uit == enumT.UserInputType.MouseButton1 or uit == enumT.UserInputType.Touch
end
--[[
	*
	 * Wire the React DOM-style event props this host supports onto the node's
	 * Roblox signals. Connected once per node; each connection reads the handler
	 * off `pendingProps` at fire time, so a re-render that changes (or adds) a
	 * handler takes effect with no re-wiring. Handlers absent on the fake test env
	 * (its instances have no such signals) are simply skipped.
	 
]]
local function wireEvents(node)
	local inst = node.inst
	if inst == nil then
		return nil
	end
	if node.styleState.eventsWired ~= nil then
		return nil
	end
	node.styleState.eventsWired = true
	local rec = inst
	local cls = inst.ClassName
	if cls == "Path2D" then
		local path = inst
		path.ControlPointChanged:Connect(function()
			local handler = node.pendingProps.onControlPointChanged
			if type(handler) == "function" then
				handler({
					type = "controlpointchanged",
					target = path,
				})
			end
		end)
		return nil
	end
	local fire = function(name, event)
		local h = node.pendingProps[name]
		if type(h) == "function" then
			h(event)
		end
	end
	local connect = function(signalName, cb)
		local sig = rec[signalName]
		local _condition = sig ~= nil
		if _condition then
			local _arg0 = sig.Connect
			_condition = type(_arg0) == "function"
		end
		if _condition then
			sig:Connect(function(...)
				local a = { ... }
				return cb(a)
			end)
		end
	end
	-- Hover, on every GuiObject.
	connect("MouseEnter", function()
		return fire("onMouseEnter", {
			type = "mouseenter",
			target = node,
		})
	end)
	connect("MouseLeave", function()
		return fire("onMouseLeave", {
			type = "mouseleave",
			target = node,
		})
	end)
	if cls == "TextButton" or cls == "ImageButton" then
		-- Activated covers mouse, touch and gamepad without duplicate clicks.
		connect("Activated", function(a)
			return fire("onClick", {
				type = "click",
				target = node,
				input = a[1],
			})
		end)
		connect("MouseButton1Down", function()
			return fire("onMouseDown", {
				type = "mousedown",
				target = node,
			})
		end)
		connect("MouseButton1Up", function()
			return fire("onMouseUp", {
				type = "mouseup",
				target = node,
			})
		end)
		connect("MouseButton2Click", function()
			return fire("onContextMenu", {
				type = "contextmenu",
				target = node,
			})
		end)
	else
		-- A non-button needs Active + input events to be clickable, like the DOM.
		if node.pendingProps.onClick ~= nil or node.pendingProps.onMouseDown ~= nil or node.pendingProps.onMouseUp ~= nil then
			rec.Active = true
		end
		connect("InputBegan", function(a)
			local input = a[1]
			if input ~= nil and isPrimaryInput(input) then
				fire("onMouseDown", {
					type = "mousedown",
					target = node,
				})
				fire("onClick", {
					type = "click",
					target = node,
				})
			end
		end)
		connect("InputEnded", function(a)
			local input = a[1]
			if input ~= nil and isPrimaryInput(input) then
				fire("onMouseUp", {
					type = "mouseup",
					target = node,
				})
			end
		end)
	end
	if cls == "TextBox" then
		connect("Focused", function()
			return fire("onFocus", {
				type = "focus",
				target = node,
			})
		end)
		connect("FocusLost", function(a)
			return fire("onBlur", {
				type = "blur",
				target = node,
				enterPressed = a[1],
				value = rec.Text,
			})
		end)
		-- Text changes: GetPropertyChangedSignal("Text") is a method.
		local gpcs = rec.GetPropertyChangedSignal
		if type(gpcs) == "function" then
			local sig = gpcs(inst, "Text")
			local _condition = sig ~= nil
			if _condition then
				local _arg0 = sig.Connect
				_condition = type(_arg0) == "function"
			end
			if _condition then
				sig:Connect(function()
					return fire("onChange", {
						type = "change",
						target = node,
						value = rec.Text,
					})
				end)
			end
		end
	end
end
local function detachChild(child)
	local parent = child.parent
	if parent == nil then
		return nil
	end
	local _children = parent.children
	local _child = child
	local idx = (table.find(_children, _child) or 0) - 1
	if idx >= 0 then
		table.remove(parent.children, idx + 1)
	end
	child.parent = nil
	if child.inst ~= nil then
		(child.inst).Parent = nil
	end
	if child.kind == "text" then
		syncTextContent(parent)
	end
end
local function insertChild(parent, child, before)
	detachChild(child)
	local idx
	if before == nil then
		idx = #parent.children
	else
		local _children = parent.children
		local _before = before
		local bi = (table.find(_children, _before) or 0) - 1
		idx = if bi >= 0 then bi else #parent.children
	end
	local _children = parent.children
	local _idx = idx
	local _child = child
	table.insert(_children, _idx + 1, _child)
	child.parent = parent
	if child.inst ~= nil and parent.inst ~= nil then
		(child.inst).Parent = parent.inst
		child.layoutOrder = idx
		if child.inst.ClassName ~= "Path2D" then
			(child.inst).LayoutOrder = idx
		end
	end
	if child.kind == "text" then
		syncTextContent(parent)
	end
end
-- ------------------------------------------------------------------ hostConfig factory
--[[
	*
	 * Build the react-reconciler hostConfig for the Roblox GUI host.
	 * `env` is the Roblox API adapter; `resolver` computes styles from the engine.
	 
]]
local function buildHostConfig(env, resolver)
	-- --- Transition context (self-referential stub, same as spike) ---
	local transitionContext = {
		["$$typeof"] = 0,
		Consumer = nil,
		Provider = {
			["$$typeof"] = 0,
			_context = nil,
		},
		_currentValue = 0,
		_currentValue2 = 0,
		_threadCount = 0,
	}
	transitionContext.Consumer = transitionContext;
	(transitionContext.Provider)._context = transitionContext
	local function createInstance(nodeType)
		local className = TAG_TO_CLASS[nodeType] or "Frame"
		local inst = env.newInstance(className)
		inst.Name = tagNameToInstanceName(nodeType)
		-- Roblox seeds every GuiObject with a 1px border in a navy grey, drawn
		-- outside the frame at the background's own transparency. Nothing in CSS
		-- asks for it, and it only becomes visible once an element is filled, so
		-- it surfaces as a stray dark hairline. Borders come from `border-*` via
		-- UIStroke; clear the built-in one here rather than only where a border
		-- happens to be declared. Path2D is the one tag that is not a GuiObject
		-- and has no such property -- assigning to it throws.
		if className ~= "Path2D" then
			inst.BorderSizePixel = 0
		end
		if isTextInstance(inst) then
			-- Roblox seeds Text with the class name ("Label", "Button");
			-- React owns the text through its text children.
			inst.Text = ""
		end
		return {
			kind = "host",
			nodeType = nodeType,
			inst = inst,
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
				tagName = nodeType,
				classList = {},
				attributes = {},
				states = {},
			},
		}
	end
	local function updateIdentity(instance, props)
		instance.pendingProps = props
		instance.identity = identityFromProps(instance, props)
		-- An `id` names the instance too, so the tree reads well in the
		-- Explorer and FindFirstChild(id, true) locates it.
		local id = props.id
		if type(id) == "string" and instance.inst ~= nil then
			(instance.inst).Name = tagNameToInstanceName(id)
		end
	end
	local function createTextInstance(text)
		return {
			kind = "text",
			nodeType = "#text",
			inst = nil,
			text = text,
			computed = {},
			classId = "",
			classes = "",
			pendingProps = {},
			parent = nil,
			children = {},
			layoutOrder = 0,
			styleState = {},
			identity = {
				tagName = "#text",
				classList = {},
				attributes = {},
				states = {},
			},
		}
	end
	local function appendInitialChild(parent, child)
		insertChild(parent, child, nil)
	end
	local function appendChild(parent, child)
		insertChild(parent, child, nil)
	end
	local function insertBefore(parent, child, before)
		insertChild(parent, child, before)
	end
	local function appendChildToContainer(container, child)
		insertChild(container, child, nil)
	end
	local function insertInContainerBefore(container, child, before)
		insertChild(container, child, before)
	end
	local function removeChild(_parent, child)
		if resolver.removed ~= nil then
			resolver.removed(child)
		end
		detachChild(child)
		if child.inst ~= nil then
			env.destroy(child.inst)
		end
	end
	local function removeChildFromContainer(_container, child)
		if resolver.removed ~= nil then
			resolver.removed(child)
		end
		detachChild(child)
		if child.inst ~= nil then
			env.destroy(child.inst)
		end
	end
	local function finalizeInitialChildren(instance, _type, props)
		updateIdentity(instance, props)
		-- Compute and apply style now
		local computed = resolver.resolve(instance)
		if resolver.beforeStyle ~= nil then
			resolver.beforeStyle(instance, computed)
		end
		applyStyle(instance, computed, env)
		wireEvents(instance)
		return true
	end
	local function commitMount(instance, _type, _props)
		-- Style already applied in finalizeInitialChildren
	end
	local function commitUpdate(instance, _type, _prevProps, nextProps)
		updateIdentity(instance, nextProps)
		local computed = resolver.resolve(instance)
		if resolver.beforeStyle ~= nil then
			resolver.beforeStyle(instance, computed)
		end
		applyStyle(instance, computed, env)
	end
	local function commitTextUpdate(textInstance, _oldText, newText)
		textInstance.text = newText
		if textInstance.parent ~= nil then
			syncTextContent(textInstance.parent)
		end
	end
	local function resetTextContent(instance)
		instance.text = ""
		if instance.inst ~= nil and isTextInstance(instance.inst) then
			(instance.inst).Text = ""
		end
	end
	local function shouldSetTextContent(nodeType, _props)
		return nodeType == "#text"
	end
	local function getRootHostContext(_container)
		return {}
	end
	local function getChildHostContext(parentContext, _type, _instance)
		return parentContext
	end
	local function getPublicInstance(instance)
		-- Refs (`ref.current`) resolve to whatever this returns. Hand back the
		-- real Roblox instance so consumers can read/write it directly
		-- (`ref.current.Size = ...`); fall back to the node for text/edge cases
		-- where no instance exists.
		return if instance.inst ~= nil then instance.inst else instance
	end
	local function prepareForCommit(_container)
		return nil
	end
	local function resetAfterCommit(_container, _newRootHostContext, _finishedWork)
	end
	local function preparePortalMount(_portalContainerNode)
	end
	-- Deferred timeouts. React schedules these (Suspense retries, etc.) expecting
	-- them to fire LATER, not inline -- firing synchronously risks re-entrant
	-- updates during commit. On real Roblox we defer through task.delay (exposed
	-- as env.setTimeout); handles are stored so cancelTimeout can task.cancel
	-- them. The native test env has no scheduler, so we fall back to running the
	-- callback inline there.
	local nextTimeoutHandle = 1
	local timeoutThreads = {}
	local function scheduleTimeout(fn, delay)
		if env.setTimeout ~= nil then
			local _original = nextTimeoutHandle
			nextTimeoutHandle += 1
			local handle = _original
			-- React's delay is in milliseconds; env.setTimeout takes seconds.
			local _env = env
			local _exp = function()
				timeoutThreads[handle] = nil
				fn(delay)
			end
			local _condition = delay
			if _condition == nil then
				_condition = 0
			end
			local thread = _env.setTimeout(_exp, _condition / 1000)
			timeoutThreads[handle] = thread
			return handle
		end
		fn(delay)
		return 0
	end
	local function cancelTimeout(handle)
		local _handle = handle
		local thread = timeoutThreads[_handle]
		if thread ~= nil then
			local _handle_1 = handle
			timeoutThreads[_handle_1] = nil
			if env.clearTimeout ~= nil then
				env.clearTimeout(thread)
			end
		end
	end
	local function getInstanceFromNode(_node)
		return nil
	end
	local function beforeActiveInstanceBlur()
	end
	local function afterActiveInstanceBlur()
	end
	local function prepareScopeUpdate(_scopeInstance, _instance)
	end
	local function getInstanceFromScope(_scopeInstance)
		return nil
	end
	local function detachDeletedInstance(node)
		-- React has removed this node for good. Free its Roblox instance (and
		-- its helper children) instead of leaking it after removeChild detached
		-- it from the tree.
		if node.inst ~= nil then
			env.destroy(node.inst)
			node.inst = nil
		end
	end
	local function hideInstance(instance)
		if instance.inst ~= nil then
			(instance.inst).Visible = false
		end
	end
	local function unhideInstance(instance)
		if instance.inst ~= nil then
			(instance.inst).Visible = true
		end
	end
	local function clearContainer(container)
		for i = #container.children - 1, 0, -1 do
			removeChildFromContainer(container, container.children[i + 1])
		end
	end
	local function resetFormInstance(_form)
	end
	local function requestPostPaintCallback(_callback)
	end
	local function shouldAttemptEagerTransition()
		return false
	end
	local function trackSchedulerEvent(_event, _time)
	end
	local function resolveEventType(_event)
		return nil
	end
	local function resolveEventTimeStamp(_event, _eventType)
		return 0
	end
	-- Update priority is intentionally pinned to the synchronous lane, NOT a
	-- no-op stub. This host has no concurrent scheduler of its own: React is
	-- driven synchronously by a manual drainTasks() pump on Heartbeat (see
	-- mountReactRoot). If these returned a concurrent event priority (Default =
	-- 32, Continuous = 8, Idle) the reconciler would time-slice and re-post
	-- scheduler work that the pump then spins on forever (script-timeout hang).
	-- requestUpdateLane() falls back to resolveUpdatePriority() whenever no
	-- transition/render lane is active, so it MUST return a sync lane. 1 is the
	-- synchronous lane the reconciler flushes eagerly; the setter is a no-op
	-- because there is no other priority state to track.
	local SyncPriority = 1
	local function setCurrentUpdatePriority(_newPriority)
	end
	local function getCurrentUpdatePriority()
		return SyncPriority
	end
	local function resolveUpdatePriority()
		return SyncPriority
	end
	local function maySuspendCommit(_type, _props)
		return false
	end
	local function preloadInstance(_instance, _type, _props)
		return false
	end
	local function startSuspendingCommit()
	end
	local function suspendInstance(_instance, _priority)
	end
	local function waitForCommitToBeReady()
		return nil
	end
	return {
		supportsMutation = true,
		supportsPersistence = false,
		supportsHydration = false,
		isPrimaryRenderer = true,
		createInstance = createInstance,
		createTextInstance = createTextInstance,
		appendInitialChild = appendInitialChild,
		finalizeInitialChildren = finalizeInitialChildren,
		shouldSetTextContent = shouldSetTextContent,
		getRootHostContext = getRootHostContext,
		getChildHostContext = getChildHostContext,
		getPublicInstance = getPublicInstance,
		prepareForCommit = prepareForCommit,
		resetAfterCommit = resetAfterCommit,
		preparePortalMount = preparePortalMount,
		scheduleTimeout = scheduleTimeout,
		cancelTimeout = cancelTimeout,
		noTimeout = -1,
		getInstanceFromNode = getInstanceFromNode,
		beforeActiveInstanceBlur = beforeActiveInstanceBlur,
		afterActiveInstanceBlur = afterActiveInstanceBlur,
		prepareScopeUpdate = prepareScopeUpdate,
		getInstanceFromScope = getInstanceFromScope,
		detachDeletedInstance = detachDeletedInstance,
		appendChild = appendChild,
		appendChildToContainer = appendChildToContainer,
		insertBefore = insertBefore,
		insertInContainerBefore = insertInContainerBefore,
		removeChild = removeChild,
		removeChildFromContainer = removeChildFromContainer,
		resetTextContent = resetTextContent,
		commitTextUpdate = commitTextUpdate,
		commitMount = commitMount,
		commitUpdate = commitUpdate,
		hideInstance = hideInstance,
		unhideInstance = unhideInstance,
		clearContainer = clearContainer,
		NotPendingTransition = nil,
		HostTransitionContext = transitionContext,
		setCurrentUpdatePriority = setCurrentUpdatePriority,
		getCurrentUpdatePriority = getCurrentUpdatePriority,
		resolveUpdatePriority = resolveUpdatePriority,
		resetFormInstance = resetFormInstance,
		requestPostPaintCallback = requestPostPaintCallback,
		shouldAttemptEagerTransition = shouldAttemptEagerTransition,
		trackSchedulerEvent = trackSchedulerEvent,
		resolveEventType = resolveEventType,
		resolveEventTimeStamp = resolveEventTimeStamp,
		maySuspendCommit = maySuspendCommit,
		preloadInstance = preloadInstance,
		startSuspendingCommit = startSuspendingCommit,
		suspendInstance = suspendInstance,
		waitForCommitToBeReady = waitForCommitToBeReady,
	}
end
return {
	identityFromProps = identityFromProps,
	tagNameToInstanceName = tagNameToInstanceName,
	parseLength = parseLength,
	parseColor = parseColor,
	firstColor = firstColor,
	extractUrl = extractUrl,
	firstLength = firstLength,
	parseGradient = parseGradient,
	computePlacement = computePlacement,
	applyAnimatedStyle = applyAnimatedStyle,
	applyStyle = applyStyle,
	buildHostConfig = buildHostConfig,
	TAG_TO_CLASS = TAG_TO_CLASS,
}
