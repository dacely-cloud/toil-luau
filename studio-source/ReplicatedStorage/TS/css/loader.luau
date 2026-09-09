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
	 * Pure CSS text loader for the Roblox host.
	 *
	 * Turns a CSS stylesheet as a string (inline `<style>` text, an external
	 * `*.css` file read at load time, or a template literal) into the `StyleRule[]`
	 * shape the cascade engine (src/css/engine.ts) already consumes. No Roblox
	 * service access, no `game`, no `Instance`, no scheduler: it runs on the plain
	 * Luau VM (Lest native backend) and on the Roblox runtime alike, exactly like
	 * the pure engine beside it.
	 *
	 * What it parses:
	 *   - normal rules:        `selector { prop: value; ... }` (incl. comma groups)
	 *   - at-rules with blocks: `@media (max-width: 600px) { ... }` (nested rules)
	 *   - at-rules with bodies: `@keyframes name { 0% {..} 100% {..} }` (frames)
	 *   - at-rules with args:   `@import "url.css";`
	 *   - comments:             `/* ... *\/` (including line comments `--`)
	 *
	 * String handling follows the house pattern in engine.ts (module-local
	 * `string.match` / `string.sub` / `string.gmatch` helpers). roblox-ts keeps
	 * `string` as the native Luau string type, so these emit as direct
	 * `s:match(...)` / `s:sub(...)` calls and no runtime global is needed.
	 
]]
-- ------------------------------------------------------------------ string helpers
-- Module-local mirrors of engine.ts's string helpers. Kept private to this
-- module so the loader has zero runtime global dependencies (the Lest css
-- spec requires it directly, outside the spike env that installs those
-- globals). Behavior is identical to the engine's helpers.
local function strTrim(s)
	local m = { string.match(s, "^%s*(.-)%s*$") }
	return m[1]
end
--* Strip trailing whitespace. 
local function rtrim(s)
	local m = { string.match(s, "^(.-)%s*$") }
	return m[1]
end
--* Lowercase a string (Luau builtin, since noLib gives no String.prototype). 
local function strLower(s)
	return string.lower(s)
end
local function slice(s, start, finish)
	if finish == nil then
		return string.sub(s, start)
	end
	return string.sub(s, start, finish)
end
local function strFind(s, pattern, init, plain)
	local r = (string.find(s, pattern, init, plain))
	return r
end
--* True if `s` has `prefix` at the start. 
local function startsWith(s, prefix)
	return #s >= #prefix and slice(s, 1, #prefix) == prefix
end
--[[
	*
	 * Normalize a CSS selector or at-rule head that was rebuilt from tokens.
	 * The token stream drops whitespace, so we join tokens with spaces and then
	 * need to collapse artifacts:
	 *   - "@ keyframes" -> "@keyframes" (at-sign + ident)
	 *   - "a , b , c"   -> "a, b, c"   (comma selectors)
	 *   - multiple spaces -> one
	 
]]
local function normalizeHead(s)
	local out = s
	-- Collapse "@ " (at-sign followed by space) into "@".
	out = (string.gsub(out, "@ (%S)", "@%1"))
	-- Collapse " ," into "," and ", " into ",".
	out = (string.gsub(out, " ,", ", "))
	out = (string.gsub(out, " %.", "."))
	-- Collapse spaces around \": : ( )
	out = (string.gsub(out, " : ", ":"))
	out = (string.gsub(out, " %( ", "("))
	out = (string.gsub(out, " %)", ")"))
	-- Collapse multiple spaces into one.
	out = (string.gsub(out, "%s%s+", " "))
	return strTrim(out)
end
--[[
	*
	 * Collect the keys of a record table (pure Luau, no Roblox Object:keys).
	 
]]
local function tableKeys(rec)
	local keys = {}
	local k
	while true do
		k = next(rec, k)
		if k == nil then
			break
		end
		local _k = k
		table.insert(keys, _k)
	end
	return keys
end
-- ------------------------------------------------------------------ token stream
--[[
	*
	 * A single token of the CSS source. The lexer reduces the stylesheet to a
	 * flat list of these; the parser walks the list with an index.
	 
]]
--[[
	*
	 * Lex a CSS source into tokens. The lexer is line-oriented: it walks the
	 * source character by character, classifying each run. Comments are kept
	 * (kind "comment") so the parser can decide whether to skip them at the
	 * top level (they are whitespace-equivalent) or drop them inside a block
	 * (they are also whitespace-equivalent there; we just skip them).
	 *
	 * Whitespace is collapsed to a single "ws" token per run.
	 
]]
local function lex(src)
	local out = {}
	local i = 1
	local n = #src
	while i <= n do
		local c = slice(src, i, i)
		-- Line comment: -- to end of line
		if c == "-" and i + 1 <= n and slice(src, i + 1, i + 1) == "-" then
			local j = i + 2
			while j <= n and slice(src, j, j) ~= "\n" do
				j += 1
			end
			local _arg0 = {
				kind = "comment",
				text = slice(src, i, j - 1),
				pos = i,
			}
			table.insert(out, _arg0)
			i = j
			continue
		end
		-- Block comment: /* to */
		if c == "/" and i + 1 <= n and slice(src, i + 1, i + 1) == "*" then
			local j = i + 2
			while j + 1 <= n and not (slice(src, j, j) == "*" and slice(src, j + 1, j + 1) == "/") do
				j += 1
			end
			local _arg0 = {
				kind = "comment",
				text = slice(src, i, j + 1),
				pos = i,
			}
			table.insert(out, _arg0)
			i = j + 2
			continue
		end
		-- Whitespace run
		if c == " " or c == "\t" or c == "\n" or c == "\r" or c == "\f" then
			local j = i
			while j <= n do
				local cj = slice(src, j, j)
				if cj == " " or cj == "\t" or cj == "\n" or cj == "\r" or cj == "\f" then
					j += 1
				else
					break
				end
			end
			local _arg0 = {
				kind = "ws",
				text = slice(src, i, j - 1),
				pos = i,
			}
			table.insert(out, _arg0)
			i = j
			continue
		end
		-- String: single or double quoted
		if c == '"' or c == "'" then
			local j = i + 1
			while j <= n do
				local cj = slice(src, j, j)
				if cj == c then
					j += 1
					break
				end
				-- Escaped quote
				if cj == "\\" and j + 1 <= n then
					j += 2
					continue
				end
				j += 1
			end
			local _arg0 = {
				kind = "string",
				text = slice(src, i, j - 1),
				pos = i,
			}
			table.insert(out, _arg0)
			i = j
			continue
		end
		-- Punctuation: single characters
		if c == "{" or c == "}" or c == ";" or c == ":" or c == "," or c == "(" or c == ")" or c == "@" then
			local _arg0 = {
				kind = "punct",
				text = c,
				pos = i,
			}
			table.insert(out, _arg0)
			i += 1
			continue
		end
		-- Ident / number / at-rule keyword / any other run:
		--   read until whitespace, semicolon, or brace
		local j = i
		while j <= n do
			local cj = slice(src, j, j)
			if cj == " " or cj == "\t" or cj == "\n" or cj == "\r" or cj == "\f" then
				break
			end
			if cj == "{" or cj == "}" or cj == ";" or cj == ":" or cj == "," or cj == "(" or cj == ")" then
				break
			end
			if cj == "/" and j + 1 <= n and slice(src, j + 1, j + 1) == "*" then
				break
			end
			if cj == "-" and j + 1 <= n and slice(src, j + 1, j + 1) == "-" then
				break
			end
			j += 1
		end
		local text = slice(src, i, j - 1)
		local _arg0 = {
			kind = "ident",
			text = text,
			pos = i,
		}
		table.insert(out, _arg0)
		i = j
	end
	return out
end
-- ------------------------------------------------------------------ skip / peek helpers
--[[
	*
	 * Skip whitespace and comments. Returns the next token that is neither, or
	 * undefined at end-of-input.
	 
]]
local function nextToken(tokens, from)
	local i = from
	while i < #tokens do
		local t = tokens[i + 1]
		if t.kind == "ws" or t.kind == "comment" then
			i += 1
			continue
		end
		return { t, i }
	end
	return { nil, i }
end
--[[
	*
	 * Collect tokens up to (but not including) the first `}` at the current
	 * brace depth, or up to end-of-input. The collected range is [start, stop)
	 * where `stop` is the index of the closing `}` (or end). The caller is
	 * responsible for consuming the closing brace.
	 
]]
local function collectUntilClose(tokens, start)
	local out = {}
	local depth = 1
	local i = start
	while i < #tokens do
		local t = tokens[i + 1]
		if t.kind == "punct" then
			if t.text == "{" then
				depth += 1
			end
			if t.text == "}" then
				depth -= 1
				if depth == 0 then
					break
				end
			end
		end
		table.insert(out, t)
		i += 1
	end
	return { out, i }
end
-- ------------------------------------------------------------------ rule parsing
--[[
	*
	 * Parse a declaration block body (the tokens between `{` and `}` of a normal
	 * rule) into a `prop: value` record. Semicolons separate declarations; the
	 * last declaration may omit the trailing semicolon.
	 
]]
local function parseDeclarations(tokens)
	local out = {}
	local i = 0
	while i < #tokens do
		local _binding = nextToken(tokens, i)
		local propTok = _binding[1]
		local afterProp = _binding[2]
		if propTok == nil then
			break
		end
		-- Find the `:` that ends the property name.
		local colonIdx = afterProp + 1
		local colon = ""
		while colonIdx < #tokens do
			local t = tokens[colonIdx + 1]
			if t.kind == "punct" and t.text == ":" then
				colon = ":"
				break
			end
			-- A semicolon without a colon: malformed; skip it
			if t.kind == "punct" and t.text == ";" then
				break
			end
			if t.kind == "punct" and t.text == "{" then
				break
			end
			colonIdx += 1
		end
		if colon ~= ":" then
			-- No colon found; skip to the next semicolon
			while colonIdx < #tokens and not (tokens[colonIdx + 1].kind == "punct" and tokens[colonIdx + 1].text == ";") do
				colonIdx += 1
			end
			i = colonIdx + 1
			continue
		end
		-- Property name: tokens from i (after propTok, we already have it) up to the colon.
		local propParts = {}
		do
			local pi = i
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					pi += 1
				else
					_shouldIncrement = true
				end
				if not (pi < colonIdx) then
					break
				end
				local pt = tokens[pi + 1]
				if pt.kind == "ws" then
					continue
				end
				if pt.kind == "comment" then
					continue
				end
				local _text = pt.text
				table.insert(propParts, _text)
			end
		end
		local prop = strLower(table.concat(propParts, ""))
		-- Value: tokens after the colon up to `;` or end.
		local valueParts = {}
		local vi = colonIdx + 1
		while vi < #tokens do
			local vt = tokens[vi + 1]
			if vt.kind == "punct" and vt.text == ";" then
				break
			end
			if vt.kind == "ws" then
				-- collapse whitespace to a single space
				if #valueParts > 0 and valueParts[#valueParts] ~= " " then
					table.insert(valueParts, " ")
				end
				vi += 1
				continue
			end
			if vt.kind == "comment" then
				vi += 1
				continue
			end
			local _text = vt.text
			table.insert(valueParts, _text)
			vi += 1
		end
		local value = rtrim(table.concat(valueParts, ""))
		if #prop > 0 and #value > 0 then
			out[prop] = value
		end
		-- Advance past the semicolon (or end).
		if vi < #tokens and tokens[vi + 1].kind == "punct" and tokens[vi + 1].text == ";" then
			i = vi + 1
		else
			i = vi
		end
	end
	return out
end
--[[
	*
	 * Parse a keyframes block body (the tokens between `{` and `}` of an
	 * `@keyframes name` block) into `offset -> "prop: value; prop: value; ..."`.
	 * Each frame has an offset (`0%`, `50%`, `100%`, `from`, `to`) followed by a
	 * `{ ... }` of declarations.
	 
]]
local function parseKeyframesBody(tokens)
	local out = {}
	local i = 0
	while i < #tokens do
		local _binding = nextToken(tokens, i)
		local offsetTok = _binding[1]
		local afterOffset = _binding[2]
		if offsetTok == nil then
			break
		end
		-- Find the opening `{` of the frame.
		local braceIdx = afterOffset + 1
		while braceIdx < #tokens do
			local t = tokens[braceIdx + 1]
			if t.kind == "punct" and t.text == "{" then
				break
			end
			braceIdx += 1
		end
		if braceIdx >= #tokens then
			break
		end
		-- Offset label: tokens from i to braceIdx (excluding the brace).
		local offsetParts = {}
		do
			local oi = i
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					oi += 1
				else
					_shouldIncrement = true
				end
				if not (oi < braceIdx) then
					break
				end
				local ot = tokens[oi + 1]
				if ot.kind == "ws" then
					continue
				end
				if ot.kind == "comment" then
					continue
				end
				local _text = ot.text
				table.insert(offsetParts, _text)
			end
		end
		local offset = strLower(table.concat(offsetParts, ""))
		-- Frame body: collect until the matching `}`.
		local _binding_1 = collectUntilClose(tokens, braceIdx + 1)
		local body = _binding_1[1]
		local stop = _binding_1[2]
		local decls = parseDeclarations(body)
		-- Encode as "prop: value; prop: value" so the engine's
		-- keyframesFromDeclarations can re-split on ";" and then on ":".
		local parts = {}
		local keys = tableKeys(decls)
		for ki = 0, #keys - 1 do
			local k = keys[ki + 1]
			local v = decls[k]
			if v ~= nil then
				local _arg0 = k .. ": " .. v
				table.insert(parts, _arg0)
			end
		end
		local frame = table.concat(parts, "; ")
		if #offset > 0 and #frame > 0 then
			out[offset] = frame
		end
		i = stop + 1
	end
	return out
end
--[[
	*
	 * Parse a top-level stylesheet into the `StyleRule[]` shape the cascade
	 * engine consumes.
	 *
	 * - Normal rules: `{ selector, declarations }`.
	 * - `@keyframes name`: `{ selector: "@keyframes name", keyframes: <frames> }`.
	 * - `@media (...)`: nested rules are inlined; each nested rule carries the
	 *   media query on its `media` field.
	 * - `@import "url"`: `{ selector: "@import", importFrom: url }`.
	 
]]
local function parseCss(source)
	local tokens = lex(source)
	local rules = {}
	local i = 0
	-- Parse a list of rules at the given level, carrying the active media
	-- query down to nested rules.
	local function parseRuleList(levelTokens, mediaQuery)
		local li = 0
		while li < #levelTokens do
			local _binding = nextToken(levelTokens, li)
			local headTok = _binding[1]
			local afterHead = _binding[2]
			if headTok == nil then
				break
			end
			-- Find the next `{` or `;` from the head.
			local nextBrace = -1
			local nextSemi = -1
			local depth = 0
			do
				local bi = afterHead
				local _shouldIncrement = false
				while true do
					if _shouldIncrement then
						bi += 1
					else
						_shouldIncrement = true
					end
					if not (bi < #levelTokens) then
						break
					end
					local bt = levelTokens[bi + 1]
					if bt.kind == "punct" then
						if bt.text == "(" then
							depth += 1
						end
						if bt.text == ")" then
							depth -= 1
						end
						if depth == 0 then
							if bt.text == "{" then
								nextBrace = bi
								break
							end
							if bt.text == ";" then
								nextSemi = bi
								break
							end
						end
					end
				end
			end
			-- Case 1: at-rule with a semicolon (no block): @import
			if nextSemi >= 0 and (nextBrace < 0 or nextSemi < nextBrace) then
				local atParts = {}
				do
					local pi = li
					local _shouldIncrement = false
					while true do
						if _shouldIncrement then
							pi += 1
						else
							_shouldIncrement = true
						end
						if not (pi < nextSemi) then
							break
						end
						local pt = levelTokens[pi + 1]
						if pt.kind == "ws" then
							continue
						end
						if pt.kind == "comment" then
							continue
						end
						local _text = pt.text
						table.insert(atParts, _text)
					end
				end
				local atLine = table.concat(atParts, "")
				if startsWith(atLine, "@import") then
					-- Extract the url (quoted or bare)
					local afterAt = slice(atLine, #"@import" + 1)
					local qm = { string.match(afterAt, [=[^%s*["\'](%S+)["\']]=]) }
					local q = (qm[1])
					local url
					if q ~= nil then
						url = q
					else
						-- No quotes: take everything up to the first `;` (or the whole string).
						local semi = strFind(afterAt, ";", 1, true)
						url = if semi == nil then strTrim(afterAt) else slice(afterAt, 1, semi - 1)
					end
					local _arg0 = {
						selector = "@import",
						importFrom = url,
					}
					table.insert(rules, _arg0)
				end
				li = nextSemi + 1
				continue
			end
			-- Case 2: rule with a block (normal rule, @keyframes, @media)
			if nextBrace >= 0 then
				local headParts = {}
				do
					local pi = li
					local _shouldIncrement = false
					while true do
						if _shouldIncrement then
							pi += 1
						else
							_shouldIncrement = true
						end
						if not (pi < nextBrace) then
							break
						end
						local pt = levelTokens[pi + 1]
						if pt.kind == "ws" then
							continue
						end
						if pt.kind == "comment" then
							continue
						end
						local _text = pt.text
						table.insert(headParts, _text)
					end
				end
				local head = normalizeHead(table.concat(headParts, " "))
				-- Body: collect until the matching `}`.
				local _binding_1 = collectUntilClose(levelTokens, nextBrace + 1)
				local body = _binding_1[1]
				local stop = _binding_1[2]
				if startsWith(head, "@keyframes") then
					local name = strTrim(slice(head, #"@keyframes" + 1))
					local frames = parseKeyframesBody(body)
					local _arg0 = {
						selector = "@keyframes " .. name,
						keyframes = "frames",
						declarations = frames,
					}
					table.insert(rules, _arg0)
				elseif startsWith(head, "@media") then
					local query = normalizeHead(slice(head, #"@media" + 1))
					parseRuleList(body, query)
				else
					-- Normal rule
					local decls = parseDeclarations(body)
					local rule = {
						selector = normalizeHead(head),
						declarations = decls,
					}
					if mediaQuery ~= nil then
						rule.media = mediaQuery
					end
					table.insert(rules, rule)
				end
				li = stop + 1
				continue
			end
			-- Case 3: neither `;` nor `{` found before end: trailing junk, skip.
			li = #levelTokens
		end
	end
	parseRuleList(tokens, nil)
	return rules
end
--[[
	*
	 * Build a CSS engine from a stylesheet string. Convenience wrapper over
	 * `parseCss` + `createEngine` so callers can do
	 * `mountWithCss(cssText, element)` in one call.
	 
]]
local function cssToRules(source)
	return parseCss(source)
end
return {
	parseCss = parseCss,
	cssToRules = cssToRules,
}
