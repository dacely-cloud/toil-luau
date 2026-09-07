--!nocheck
--[[
	toil-luau Studio demo -- React 19 + CSS animations on a real PlayerGui.

	Staged into StarterPlayer.StarterPlayerScripts by scripts/stage-studio.mjs
	(Rojo and Azul both turn a `.client.luau` file into a LocalScript).

	The stylesheet is plain CSS text: parseCss() turns it into the rule list
	the engine consumes, @keyframes included. The host starts every
	`animation` it finds at mount and advances it on RunService.Heartbeat,
	which also flushes React's task queue -- so the button's onClick
	re-renders on the next frame with no manual pump.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local TS = require(ReplicatedStorage:WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local toil = TS.import(script, ReplicatedStorage, "TS")

local React = toil.React
local e = React.createElement

local css = [[
	@keyframes fade-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
	@keyframes spin {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	@keyframes pulse {
		0%   { width: 180px; background-color: #2563ff; }
		50%  { width: 260px; background-color: #7c3aed; }
		100% { width: 180px; background-color: #2563ff; }
	}
	@keyframes rainbow {
		0%   { background-color: #ff4d6d; }
		33%  { background-color: #4dff88; }
		66%  { background-color: #4d9bff; }
		100% { background-color: #ff4d6d; }
	}

	/* The card fills the whole screen (width/height 100% -> UDim2 scale 1). */
	.card {
		width: 100%;
		height: 100%;
		padding: 48px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		background-color: #141821;
		animation: fade-in 1.2s ease-out;
	}
	.title  { width: 100%; height: 52px; color: #8ab4ff; font-size: 44px; font-weight: bold; }
	.status { width: 100%; height: 34px; color: #e6eefc; font-size: 24px; }
	.row    { width: 100%; height: 96px; display: flex; flex-direction: row; gap: 24px; align-items: center; }
	.spinner {
		width: 72px;
		height: 72px;
		background-color: #2563ff;
		border-radius: 14px;
		animation: spin 2s linear infinite;
	}
	.pulse {
		width: 180px;
		height: 60px;
		color: #ffffff;
		font-size: 22px;
		text-align: center;
		border-radius: 12px;
		animation: pulse 1.6s ease-in-out infinite;
	}
	.bar {
		width: 100%;
		height: 16px;
		border-radius: 8px;
		animation: rainbow 3s linear infinite;
	}
]]

-- Captured from the render so the probe loop below can drive state.
local setTicks = nil

local function App()
	local ticksState = React.useState(0)
	local ticks = ticksState[1]
	setTicks = ticksState[2]

	local clicksState = React.useState(0)
	local clicks = clicksState[1]
	local setClicks = clicksState[2]

	return e("section", { id = "card", className = "card" },
		e("h1", { id = "title", className = "title" }, "toil-luau"),
		e("span", { id = "status", className = "status" },
			"React 19 on Roblox.  Ticks: " .. tostring(ticks) .. "   Clicks: " .. tostring(clicks)),
		e("div", { id = "row", className = "row" },
			e("div", { id = "spinner", className = "spinner" }),
			e("button", {
				id = "pulse",
				className = "pulse",
				onClick = function()
					setClicks(clicks + 1)
				end,
			}, "Click me")
		),
		e("div", { id = "bar", className = "bar" })
	)
end

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")

-- nil engine -> the real CSS engine built from the parsed rules.
-- nil env    -> the real Roblox engine adapter.
local handle = toil.mountReactRoot(playerGui, toil.parseCss(css), e(App), nil, nil)

print("[toil] mounted:", handle.gui:GetFullName())

-- Console-verifiable probe: the reconciler re-renders the tick counter while
-- the four animations keep moving.
local function probe(label)
	local gui = handle.gui
	local status = gui:FindFirstChild("status", true)
	local card = gui:FindFirstChild("card", true)
	local spinner = gui:FindFirstChild("spinner", true)
	local pulse = gui:FindFirstChild("pulse", true)
	local bar = gui:FindFirstChild("bar", true)
	print(string.format(
		"[toil] %s status=%q card.transparency=%.2f spinner.rotation=%.1f pulse.width=%d pulse.text=%q bar.color=%s",
		label,
		status and status.Text or "<none>",
		card and card.BackgroundTransparency or -1,
		spinner and spinner.Rotation or -1,
		pulse and pulse.Size.X.Offset or -1,
		pulse and pulse.Text or "<none>",
		bar and tostring(bar.BackgroundColor3) or "<none>"
	))
end

task.spawn(function()
	probe("t=0")
	for i = 1, 6 do
		task.wait(1)
		if setTicks ~= nil then
			setTicks(i)
			toil.drainTasks() -- the Heartbeat does this too; explicit here so the probe reads the new text
		end
		probe("t=" .. i)
	end
	print("[toil] probes done; animations keep running")
end)
