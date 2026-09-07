--!nocheck
--[[
	toil-luau Studio demo -- React 19 driving a CSS-animated scene on a real
	Roblox PlayerGui.

	Staged into StarterPlayer.StarterPlayerScripts by scripts/stage-studio.mjs
	(Rojo and Azul both turn a `.client.luau` file into a LocalScript).

	What it shows, all from plain CSS the engine parses at runtime:
	  * @keyframes with transform: translate  -> a full-screen confetti field
	    (each piece falls, spins and fades, staggered by animation-delay)
	  * transform: translate on X            -> a slider that glides side to side
	  * transform: rotate                    -> a spinning square
	  * width + background-color keyframes    -> a pulsing button
	  * background-color keyframes            -> a rainbow bar
	  * useState + onClick                    -> the live click counter

	The host starts every `animation` it finds at mount and advances them on
	RunService.Heartbeat, which also flushes React's task queue.
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
		0%   { width: 190px; background-color: #2563ff; }
		50%  { width: 280px; background-color: #7c3aed; }
		100% { width: 190px; background-color: #2563ff; }
	}
	@keyframes rainbow {
		0%   { background-color: #ff4d6d; }
		33%  { background-color: #4dff88; }
		66%  { background-color: #4d9bff; }
		100% { background-color: #ff4d6d; }
	}
	/* Confetti: fall the height of the screen while spinning and fading in. */
	@keyframes fall {
		0%   { transform: translate(0px, -80px); rotation: 0; opacity: 0.15; }
		100% { transform: translate(0px, 820px); rotation: 540; opacity: 1; }
	}
	/* Slider: glide left <-> right (alternate flips it each iteration). */
	@keyframes slide {
		0%   { transform: translate(-240px, 0px); }
		100% { transform: translate(240px, 0px); }
	}

	.app { width: 100%; height: 100%; background-color: #0d1017; }
	/* Overlay + panel both fill the screen and stack (z-index); the overlay
	   has NO flex so its children keep their absolute positions. */
	.overlay { position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 1; }
	.panel {
		position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;
		z-index: 2;
		display: flex; flex-direction: column; gap: 20px;
		align-items: center; justify-content: center;
	}
	.title   { width: 560px; height: 60px; color: #8ab4ff; font-size: 46px; font-weight: bold; text-align: center; }
	.status  { width: 680px; height: 34px; color: #e6eefc; font-size: 24px; text-align: center; }
	.caption { width: 680px; height: 24px; color: #7f8ea3; font-size: 16px; text-align: center; }
	.row {
		width: 680px; height: 96px;
		display: flex; flex-direction: row; gap: 24px;
		align-items: center; justify-content: center;
	}
	.spinner { width: 72px; height: 72px; background-color: #2563ff; border-radius: 14px; animation: spin 2s linear infinite; }
	.pulse   { width: 190px; height: 60px; color: #ffffff; font-size: 22px; text-align: center; border-radius: 12px; animation: pulse 1.6s ease-in-out infinite; }
	.bar     { width: 680px; height: 16px; border-radius: 8px; animation: rainbow 3s linear infinite; }
	.slider  { position: absolute; top: 140px; left: 50%; width: 44px; height: 44px; background-color: #ffd166; border-radius: 22px; animation: slide 1.4s ease-in-out infinite alternate; }
]]

-- Captured from the render so the probe loop can drive state.
local setTicks = nil

local PALETTE = { "#ff4d6d", "#4dff88", "#4d9bff", "#ffd166", "#c77dff", "#ff9f1c", "#06d6a0", "#ef476f" }

-- One confetti piece: an absolutely-positioned square with an inline style so
-- each gets its own colour, column and start delay (staggered fall).
local function confettiPiece(i, count)
	local leftPct = string.format("%.2f%%", (i - 0.5) / count * 100)
	local color = PALETTE[(i % #PALETTE) + 1]
	local delay = string.format("%.2f", (i % 9) * 0.33)
	local dur = string.format("%.2f", 2.8 + (i % 6) * 0.4)
	return e("div", {
		key = "c" .. i,
		id = "confetti" .. i,
		style = {
			position = "absolute",
			top = "0px",
			left = leftPct,
			width = "14px",
			height = "14px",
			["background-color"] = color,
			["border-radius"] = "3px",
			animation = "fall " .. dur .. "s linear " .. delay .. "s infinite",
		},
	})
end

local function App()
	local ticksState = React.useState(0)
	local ticks = ticksState[1]
	setTicks = ticksState[2]

	local clicksState = React.useState(0)
	local clicks = clicksState[1]
	local setClicks = clicksState[2]

	-- Build the confetti field + the slider as the overlay's children.
	local COUNT = 36
	local overlayKids = {}
	for i = 1, COUNT do
		overlayKids[i] = confettiPiece(i, COUNT)
	end
	overlayKids[COUNT + 1] = e("div", { key = "slider", id = "slider", className = "slider" })

	return e("div", { id = "app", className = "app" },
		e("div", { id = "overlay", className = "overlay" }, table.unpack(overlayKids)),
		e("div", { id = "panel", className = "panel" },
			e("h1", { id = "title", className = "title" }, "toil-luau"),
			e("span", { id = "status", className = "status" },
				"React 19 on Roblox.  Ticks: " .. tostring(ticks) .. "   Clicks: " .. tostring(clicks)),
			e("span", { id = "cap1", className = "caption" },
				"Confetti + slider = transform: translate.  Square = rotate.  Button = width/colour.  Bar = colour."),
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
			e("span", { id = "cap2", className = "caption" }, "Every animation above is plain CSS @keyframes, parsed at runtime:"),
			e("div", { id = "bar", className = "bar" })
		)
	)
end

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")

-- nil engine -> real CSS engine built from the parsed rules.
-- nil env    -> real Roblox engine adapter.
local handle = toil.mountReactRoot(playerGui, toil.parseCss(css), e(App), nil, nil)

print("[toil] mounted:", handle.gui:GetFullName())

local function probe(label)
	local gui = handle.gui
	local status = gui:FindFirstChild("status", true)
	local spinner = gui:FindFirstChild("spinner", true)
	local slider = gui:FindFirstChild("slider", true)
	local c1 = gui:FindFirstChild("confetti1", true)
	print(string.format(
		"[toil] %s status=%q spinner.rot=%.0f slider.x=%d confetti1.y=%d",
		label,
		status and status.Text or "<none>",
		spinner and spinner.Rotation or -1,
		slider and math.round(slider.AbsolutePosition.X) or -1,
		c1 and math.round(c1.AbsolutePosition.Y) or -1
	))
end

task.spawn(function()
	probe("t=0")
	for i = 1, 6 do
		task.wait(1)
		if setTicks ~= nil then
			setTicks(i)
			toil.drainTasks() -- the Heartbeat does this too; explicit so the probe reads fresh text
		end
		probe("t=" .. i)
	end
	print("[toil] probes done; animations keep running")
end)
