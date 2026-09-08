local RS=game:GetService("ReplicatedStorage")
local Players=game:GetService("Players")
local test=game:GetService("StudioTestService")
local remote=Instance.new("RemoteEvent");remote.Name="ToilVerificationRemote";remote.Parent=RS
local reports={};local ended=false
local function finish(ok,message)
    if ended then return end;ended=true
    local result={ok=ok,message=message,reports=reports}
    print("[ToilStandaloneTest] "..game:GetService("HttpService"):JSONEncode(result))
    test:EndTest(result)
end
remote.OnServerEvent:Connect(function(player,ok,result)
    if ok=="partyReady" then remote:SetAttribute("PartyOwnerReady",player.UserId);return end
    if ok=="checkpoint" then print("[ToilStandaloneCheckpoint] "..player.UserId.." "..tostring(result));return end
    reports[tostring(player.UserId)]={ok=ok,result=result}
    if not ok then finish(false,"client assertion failed");return end
    local count=0;for _ in reports do count+=1 end
    if count==2 then finish(true,"two real clients verified jobs, charity help/theft, empire join/donations/upgrade")end
end)
task.delay(script:GetAttribute("LongFundraiser") and 1950 or 150,function()finish(false,"timed out waiting for two client reports")end)
