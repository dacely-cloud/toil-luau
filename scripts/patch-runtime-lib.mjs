// Idempotent patch of include/RuntimeLib.lua for the native Lest VM.
// roblox-ts rewrites include/ on every build (restoring the upstream file),
// so this must run after the compile.
import fs from "node:fs";
import { fileURLToPath } from "node:url";

// fileURLToPath, not .pathname: on Windows .pathname yields "/C:/..." and
// the leading slash makes Node resolve it as "C:\C:\...".
const p = fileURLToPath(new URL("../include/RuntimeLib.lua", import.meta.url));
let s = fs.readFileSync(p, "utf8");

if (!s.includes("spikeRequire")) {
	s = s.replace(
		"local Promise = require(script.Parent.Promise)",
		'-- Spike: the native Lest VM resolves require() on disk, relative to this file.\nlocal Promise = require("./Promise")'
	);

	s = s.replace(
		"local TS = {}\n\nTS.Promise = Promise",
		`local TS = {}

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
`
	);

	s = s.replace("\tlocal data = require(module)", "\tlocal data = require(spikeRequire(module))");
}

fs.writeFileSync(p, s);
console.log("runtime-lib patched");