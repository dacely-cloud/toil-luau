--!nocheck
--[[
	toil-luau Studio demo -- React 19 driving a CSS-animated scene on a real
	Roblox PlayerGui.

	Staged into StarterPlayer.StarterPlayerScripts by scripts/stage-studio.mjs
	(Rojo and Azul both turn a `.client.luau` file into a LocalScript).

	Everything below is plain CSS the engine parses at runtime and maps onto
	real Roblox instances:
	  * background: linear-gradient(...) -> a UIGradient, its angle animated
	    (`gradient-rotation`) so the mesh backdrop and the card slowly flow
	  * border-image: linear-gradient(...) -> a gradient UIStroke outline
	  * @keyframes transform: translate      -> the confetti field + the slider
	  * transform: rotate                    -> the spinning square
	  * width + background-color keyframes    -> the pulsing button
	  * background-color keyframes            -> the rainbow bar
	  * useState + onClick                    -> the live click counter

	The host starts every `animation` at mount and advances them on
	RunService.Heartbeat, which also flushes React's task queue.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local TS = require(ReplicatedStorage:WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local toil = TS.import(script, ReplicatedStorage, "TS")

local React = toil.React
local e = React.createElement

local css = [[
	@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
	@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
	@keyframes pulse {
		0%   { transform: scale(1);    background-color: #2563ff; }
		50%  { transform: scale(1.08); background-color: #7c3aed; }
		100% { transform: scale(1);    background-color: #2563ff; }
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
	/* Meshy gradients: keep rotating the gradient angle so the colours flow. */
	@keyframes mesh     { from { gradient-rotation: 0; }   to { gradient-rotation: 360; } }
	@keyframes meshCard { from { gradient-rotation: 200; } to { gradient-rotation: 560; } }

	/* Full-screen meshy gradient backdrop, slowly turning. */
	.app {
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, #2a0845, #0d1017, #0b2a4a, #241a3a);
		animation: mesh 14s linear infinite;
	}
	/* Overlay (confetti): behind the card (z-index 1), NO flex so pieces keep
	   their absolute positions. */
	.overlay { position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 1; }
	/* Front layer (the slider): above the card (z-index 3) so it stays visible. */
	.front { position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 3; }
	/* Full-screen flex box that centres the card. */
	.center {
		position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 2;
		display: flex; flex-direction: column; align-items: center; justify-content: center;
	}
	/* Glass card: its own flowing gradient fill + a gradient UIStroke edge. */
	.card {
		width: 760px; height: 520px; padding: 44px;
		display: flex; flex-direction: column; gap: 22px; align-items: center; justify-content: center;
		background: linear-gradient(120deg, #10233a, #1a1035, #0b2a4a);
		border-radius: 24px;
		border: 3px;
		border-image: linear-gradient(90deg, #8ab4ff, #c77dff, #06d6a0, #ffd166);
		animation: meshCard 10s linear infinite, fade-in 1s ease-out;
	}
	.title   { width: 620px; height: 60px; color: #cfe0ff; font-size: 46px; font-weight: bold; text-align: center; }
	.status  { width: 660px; height: 34px; color: #e6eefc; font-size: 24px; text-align: center; }
	/* No fixed height: wrapped captions auto-size their height to the text. */
	.caption { width: 640px; color: #9fb0c8; font-size: 16px; text-align: center; }
	.row {
		width: 660px; height: 110px;
		display: flex; flex-direction: row; gap: 28px; align-items: center; justify-content: center;
	}
	/* A comet trail of dots that orbit as the ring rotates -- a loading spinner. */
	/* A UIListLayout child does NOT render Rotation, so the ring cannot rotate
	   directly inside the flex row. The wrapper is the (non-rotating) flex child;
	   the ring is absolutely centred inside it and is free to rotate. */
	.spinner-wrap { width: 72px; height: 72px; }
	/* The stroke gradient fades bright -> transparent, so the ring is really an
	   ARC. Rotating the ring sweeps the arc: a clean Material-style spinner. */
	.spinner {
		position: absolute; top: 50%; left: 50%;
		width: 72px; height: 72px; border-radius: 36px;
		background-color: rgba(255, 255, 255, 0.02);
		border: 6px;
		border-image: linear-gradient(90deg, #bcd6ff, #6a8fd0, #24365e, #12203a);
		animation: spin 0.9s linear infinite;
	}
	.pulse   { width: 190px; height: 60px; color: #ffffff; font-size: 22px; text-align: center; border-radius: 12px; animation: pulse 1.6s ease-in-out infinite; }
	.bar     { width: 660px; height: 16px; border-radius: 8px; animation: rainbow 3s linear infinite; }
	.slider  { position: absolute; top: 70px; left: 50%; width: 46px; height: 46px; background-color: #ffd166; border-radius: 23px; animation: slide 1.4s ease-in-out infinite alternate; }
]]

-- Captured from the render so the probe loop can drive state.
local setTicks = nil

local PALETTE = { "#ff4d6d", "#4dff88", "#4d9bff", "#ffd166", "#c77dff", "#ff9f1c", "#06d6a0", "#ef476f" }

-- One confetti piece: an absolutely-positioned square whose inline style gives
-- it its own colour, column and start delay (so the field is staggered).
local function confettiPiece(i, count)
	local leftPct = string.format("%.2f%%", (i - 0.5) / count * 100)
	local color = PALETTE[(i % #PALETTE) + 1]
	local delay = string.format("%.2f", (i % 9) * 0.33)
	local dur = string.format("%.2f", 2.8 + (i % 6) * 0.4)
	return e("div", {
		key = "confetti" .. i,
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

	local COUNT = 36
	local overlayKids = {}
	for i = 1, COUNT do
		overlayKids[i] = confettiPiece(i, COUNT)
	end

	return e("div", { id = "app", className = "app" },
		e("div", { id = "overlay", className = "overlay" }, table.unpack(overlayKids)),
		e("div", { id = "center", className = "center" },
			e("div", { id = "card", className = "card" },
				e("h1", { id = "title", className = "title" }, "toil-luau"),
				e("span", { id = "status", className = "status" },
					"React 19 on Roblox.  Ticks: " .. tostring(ticks) .. "   Clicks: " .. tostring(clicks)),
				e("span", { id = "cap1", className = "caption" },
					"Backdrop + card = animated linear-gradient (UIGradient).  Edge = gradient UIStroke."),
				e("div", { id = "row", className = "row" },
					e("div", { id = "spinnerWrap", className = "spinner-wrap" },
					e("div", { id = "spinner", className = "spinner" })
				),
					e("button", {
						id = "pulse",
						className = "pulse",
						onClick = function()
							setClicks(clicks + 1)
						end,
					}, "Click me")
				),
				e("span", { id = "cap2", className = "caption" },
					"Confetti = transform:translate.  Spinner + gradients = rotate.  Button = scale + colour."),
				e("div", { id = "bar", className = "bar" })
			)
		)
	)
end

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")

local handle = toil.mountReactRoot(playerGui, toil.parseCss(css), e(App), nil, nil)

print("[toil] mounted:", handle.gui:GetFullName())

local function probe(label)
	local gui = handle.gui
	local status = gui:FindFirstChild("status", true)
	local spinner = gui:FindFirstChild("spinner", true)
	local slider = gui:FindFirstChild("slider", true)
	local card = gui:FindFirstChild("card", true)
	local grad = card and card:FindFirstChildWhichIsA("UIGradient")
	local stroke = card and card:FindFirstChildWhichIsA("UIStroke")
	print(string.format(
		"[toil] %s status=%q spinner.rot=%.0f slider.x=%d cardGradient=%s cardStroke=%s",
		label,
		status and status.Text or "<none>",
		spinner and spinner.Rotation or -1,
		slider and math.round(slider.AbsolutePosition.X) or -1,
		grad and ("rot=" .. string.format("%.0f", grad.Rotation)) or "<none>",
		stroke and ("thick=" .. tostring(stroke.Thickness)) or "<none>"
	))
end

task.spawn(function()
	probe("t=0")
	for i = 1, 6 do
		task.wait(1)
		if setTicks ~= nil then
			setTicks(i)
			toil.drainTasks()
		end
		probe("t=" .. i)
	end
	print("[toil] probes done; animations keep running")
end)
