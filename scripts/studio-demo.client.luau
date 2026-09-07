--!nocheck
--[[
	toil-luau Studio demo -- React 19 rendered onto a real Roblox PlayerGui.

	Staged into StarterPlayer.StarterPlayerScripts by scripts/stage-studio.mjs
	(Rojo turns a `.client.luau` file into a LocalScript).

	Two notes on how this talks to the host, both of which reflect what the
	host currently implements rather than preference:

	  * The host maps element tags to Instances and applies computed CSS, but
	    it does not wire DOM event props -- `onClick` on a <button> is dropped
	    (only string props survive as attributes). So the click is connected
	    directly to the emitted TextButton below.
	  * `mountReactRoot` drains the React task queue once, at mount. The
	    Heartbeat connection it installs only ticks animations. A setState
	    after mount therefore has to be flushed explicitly with drainTasks().
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local TS = require(ReplicatedStorage:WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local toil = TS.import(script, ReplicatedStorage, "TS")

local React = toil.React
local mountReactRoot = toil.mountReactRoot
local drainTasks = toil.drainTasks

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")

-- Plain CSS property -> value, resolved by the engine (selectors + cascade).
local cssRules = {
	{
		selector = "section",
		declarations = {
			["background-color"] = "#141821",
			["border-radius"] = "12px",
			["padding-top"] = "16px",
			["padding-left"] = "16px",
			["padding-right"] = "16px",
			["padding-bottom"] = "16px",
			["width"] = "320px",
			["height"] = "180px",
		},
	},
	{ selector = "h1", declarations = { ["color"] = "#8ab4ff", ["font-size"] = "22px" } },
	{ selector = "span", declarations = { ["color"] = "#e6eefc", ["font-size"] = "16px" } },
	{
		selector = "button",
		declarations = {
			["background-color"] = "#2563ff",
			["color"] = "#ffffff",
			["font-size"] = "15px",
			["height"] = "40px",
		},
	},
}

-- Captured during render so the click handler can drive state (see header).
local setCount = nil

local function App()
	local state = React.useState(0)
	local count = state[1]
	setCount = state[2]

	return React.createElement(
		"section",
		nil,
		React.createElement("h1", nil, "toil-luau"),
		React.createElement("span", nil, "React 19 on Roblox Luau. Clicks: " .. tostring(count)),
		React.createElement("button", nil, "Click me")
	)
end

-- nil engine -> the real CSS engine built from cssRules.
-- nil env    -> the real Roblox engine adapter.
local handle = mountReactRoot(playerGui, cssRules, React.createElement(App), nil, nil)

print("[toil] mounted:", handle.gui:GetFullName(), "class:", handle.gui.ClassName)

local function findFirst(root, className)
	for _, d in ipairs(root:GetDescendants()) do
		if d:IsA(className) then
			return d
		end
	end
	return nil
end

local button = findFirst(handle.gui, "TextButton")
local label = findFirst(handle.gui, "TextLabel")

print("[toil] button:", button and button:GetFullName() or "<none>")
print("[toil] label :", label and label.Text or "<none>")

if button ~= nil and setCount ~= nil then
	local clicks = 0
	button.MouseButton1Click:Connect(function()
		clicks += 1
		setCount(clicks)
		drainTasks() -- flush the re-render through the reconciler
		print("[toil] click -> count =", clicks)
	end)
end

-- Prove the reconciler re-renders without any input, so the demo is
-- verifiable from the console alone.
task.spawn(function()
	for i = 1, 3 do
		task.wait(1)
		if setCount ~= nil then
			setCount(100 + i)
			drainTasks()
			local now = findFirst(handle.gui, "TextLabel")
			print("[toil] auto-tick", i, "label =", now and now.Text or "<none>")
		end
	end
end)
