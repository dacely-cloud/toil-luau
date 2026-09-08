local RS=game:GetService("ReplicatedStorage")
local Players=game:GetService("Players")
local probe=RS:WaitForChild("ToilVerificationRemote")
local remote=RS:WaitForChild("CookieClicker"):WaitForChild("Action")
local latest
remote.OnClientEvent:Connect(function(s)latest=s end)
local deadline=os.clock()+45
while (not latest or not latest.ready) and os.clock()<deadline do remote:FireServer("sync");task.wait(1)end
local ok,result=pcall(function()
    assert(latest and latest.ready,"snapshot never became ready")
    local gui=Players.LocalPlayer.PlayerGui:WaitForChild("CookieClickerGui",15)
    assert(gui and gui:FindFirstChild("bigCookie",true),"cookie UI did not mount")
    local before=latest
    for _=1,10 do remote:FireServer("click");task.wait(.1)end
    remote:FireServer("economy","job","dishes")
    remote:FireServer("economy","deposit",-1)
    local finish=os.clock()+8
    repeat task.wait(.25)until (latest.clicks>=before.clicks+10 and latest.economy.xp>=before.economy.xp+10) or os.clock()>finish
    assert(latest.clicks==before.clicks+10,"click count differs")
    assert(latest.cookies>=before.cookies+40,"click/job rewards missing")
    assert(latest.economy.jar==before.economy.jar,"invalid deposit changed jar")
    assert(latest.economy.energy<before.economy.energy,"job energy not spent")
    assert(#latest.socialPlayers==2,"second player missing from social list")
    local function waitFor(check,label,seconds)
        local untilTime=os.clock()+(seconds or 25)
        repeat task.wait(.25)until check() or os.clock()>untilTime
        local event=latest.events and latest.events[#latest.events]
        assert(check(),label.."; last feedback: "..tostring(event and event.text))
    end
    local ids={};for _,p in Players:GetPlayers()do table.insert(ids,p.UserId)end;table.sort(ids)
    local owner=ids[1]
    local isOwner=Players.LocalPlayer.UserId==owner
    local function checkpoint(label)probe:FireServer("checkpoint",label)end
    checkpoint("startup and basic economy passed")
    if isOwner then
        remote:FireServer("economy","job","cater");task.wait(.15)
        remote:FireServer("economy","job","cater")
        waitFor(function()return latest.cookies>=840 end,"job funding")
        remote:FireServer("economy","deposit",500)
        waitFor(function()return latest.economy.jar==500 end,"jar deposit")
        remote:FireServer("fundraiser","start",1)
        waitFor(function()return latest.economy.charity and not latest.charityPending end,"fundraiser start")
        assert(latest.economy.jar==0 and latest.economy.charity.pot==750)
        probe:FireServer("partyReady")
        waitFor(function()return latest.economy.charity.pot==825 end,"helper and theft applied")
        checkpoint("owner fundraiser started; help and theft reflected in pot")
        remote:FireServer("empire","create","Cookie Team","cookie")
        waitFor(function()return latest.empire and not latest.empirePending end,"empire creation")
        task.wait(1.2);remote:FireServer("empire","donate",50)
        waitFor(function()return latest.empire.points>=100 and not latest.empirePending end,"both stamina donations",8)
        task.wait(1.2);remote:FireServer("empire","upgrade",1)
        waitFor(function()return latest.empire.level==2 end,"leader upgrade")
    else
        local function party()
            for _,other in latest.socialPlayers do if other.id==owner and other.endsAt>latest.serverNow then return other end end
        end
        waitFor(party,"friend fundraiser visible")
        waitFor(function()return probe:GetAttribute("PartyOwnerReady")==owner end,"owner initial pot verification")
        local cookies,xp=latest.cookies,latest.economy.xp
        remote:FireServer("charity","help",owner)
        waitFor(function()return latest.economy.xp==xp+20 and not latest.charityPending end,"helper rewards")
        assert(latest.cookies==cookies+50)
        task.wait(1.2);remote:FireServer("charity","steal",owner)
        waitFor(function()return latest.cookies==cookies+75 and not latest.charityPending end,"theft reward")
        assert(latest.economy.stamina<87 and latest.economy.stamina>=85)
        checkpoint("help cookies/XP and theft cookies received; stamina spent")
        waitFor(function()for _,other in latest.socialPlayers do if other.id==owner and other.empireId then return true end end return false end,"friend empire visible")
        remote:FireServer("empire","join",owner)
        waitFor(function()return latest.empire and not latest.empirePending end,"empire join")
        task.wait(1.2);remote:FireServer("empire","donate",50)
        waitFor(function()return latest.empire.level==2 and not latest.empirePending end,"shared level update",8)
    end
    checkpoint("empire membership, donations and shared upgrade passed")
    if script:GetAttribute("LongFundraiser") then
        remote:FireServer("sound",false);remote:FireServer("motion",true)
        if isOwner then
            local cookies=latest.cookies
            local expected=latest.economy.charity.pot
            local endsAt=latest.economy.charity.endsAt
            remote:FireServer("fundraiser","claim");task.wait(1.5)
            assert(latest.economy.charity and latest.cookies==cookies,"early claim paid out")
            checkpoint("early claim rejected; waiting for real expiry at "..endsAt)
            local timeout=os.clock()+1850
            local lastReport=os.clock()
            while latest.serverNow<endsAt and os.clock()<timeout do
                task.wait(1)
                if os.clock()-lastReport>=60 then lastReport=os.clock();checkpoint("fundraiser waiting: "..(endsAt-latest.serverNow).." seconds left")end
            end
            assert(latest.serverNow>=endsAt,"real fundraiser expiry timed out")
            remote:FireServer("fundraiser","claim")
            waitFor(function()return not latest.economy.charity and not latest.charityPending end,"expired fundraiser payout")
            assert(latest.cookies==cookies+expected,"wrong fundraiser payout")
            local paid=latest.cookies
            task.wait(1.2);remote:FireServer("fundraiser","claim");task.wait(1.5)
            assert(latest.cookies==paid,"repeat claim paid twice")
            checkpoint("real 30-minute expiry, exact payout and repeated-claim rejection passed")
        end
    end
    return {userId=Players.LocalPlayer.UserId,clicks=latest.clicks,cookies=latest.cookies,xp=latest.economy.xp,players=#latest.socialPlayers,gui=true,empireLevel=latest.empire.level,charity=true}
end)
probe:FireServer(ok,result)
