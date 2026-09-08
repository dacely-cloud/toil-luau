-- Temporary launcher; restoring the original UI does not alter its game state.
local pg=game.Players.LocalPlayer:WaitForChild("PlayerGui")
local hidden={}
for _,name in {"CookieClickerGui","CookieClickerBackdrop"}do
    local gui=pg:FindFirstChild(name)
    if gui then hidden[gui]=gui.Enabled;gui.Enabled=false end
end
script.Destroying:Connect(function()
    for gui,enabled in hidden do if gui.Parent then gui.Enabled=enabled end end
end)
require(game.ReplicatedStorage:WaitForChild("CookieUiVerification").App)()
