local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local loadingScreen = ReplicatedFirst:FindFirstChild("LoadingScreen")
if loadingScreen then
	loadingScreen.IgnoreGuiInset = true
	loadingScreen.Parent = playerGui

	-- Remove the default loading screen
	ReplicatedFirst:RemoveDefaultLoadingScreen()

	task.wait(5)  -- Force screen to appear for a minimum number of seconds

	if not game:IsLoaded() then
		game.Loaded:Wait()
	end

	--loadingScreen:Destroy()
end