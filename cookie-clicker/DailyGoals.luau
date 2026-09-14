-- Pure rules; the server supplies UTC time and records successful actions.
return function(Model)
    Model.DailyGoals={
        {id="clicks",name="Tap 50 cookies",target=50,image="Cookie",energy=10,stamina=0},
        {id="jobs",name="Finish 3 jobs",target=3,image="WashCookieTray",energy=10,stamina=0},
        {id="buildings",name="Grow by 5 buildings",target=5,image="CookieStore",energy=0,stamina=10},
    }
    function Model.restoreDaily(s,saved)
        if type(saved)~="table" or type(saved.day)~="number" or saved.day~=saved.day or saved.day<0 or saved.day>1e8 or saved.day%1~=0 then return end
        local d={day=saved.day,progress={},claimed={}}
        for _,goal in Model.DailyGoals do
            local value=type(saved.progress)=="table" and saved.progress[goal.id]
            d.progress[goal.id]=type(value)=="number" and value==value and value<math.huge and math.clamp(math.floor(value),0,goal.target) or 0
            d.claimed[goal.id]=type(saved.claimed)=="table" and saved.claimed[goal.id]==true and d.progress[goal.id]>=goal.target or false
        end
        s.economy.daily=d
    end
    function Model.refreshDaily(s,now)
        local day=math.floor(now/86400)
        local d=s.economy.daily
        if not d or day>d.day then d={day=day,progress={},claimed={}};s.economy.daily=d end
        return d
    end
    function Model.recordDaily(s,id,amount,now)
        local d=Model.refreshDaily(s,now)
        if type(amount)~="number" or amount~=amount or amount<=0 or amount==math.huge then return end
        for _,g in Model.DailyGoals do
            if g.id==id then d.progress[id]=math.min(g.target,(d.progress[id] or 0)+math.floor(amount));return end
        end
    end
    function Model.claimDaily(s,id,now)
        local d=Model.refreshDaily(s,now)
        local goal
        for _,g in Model.DailyGoals do if g.id==id then goal=g end end
        if not goal or d.claimed[id] or (d.progress[id] or 0)<goal.target then return false,"Finish this goal first, or try tomorrow." end
        d.claimed[id]=true
        s.economy.xp=math.min(1e15,s.economy.xp+5)
        s.economy.energy=math.min(Model.maxEnergy(s),s.economy.energy+goal.energy)
        s.economy.stamina=math.min(100,s.economy.stamina+goal.stamina)
        local complete=true
        for _,g in Model.DailyGoals do if not d.claimed[g.id] then complete=false end end
        if complete then
            s.economy.inventory.flour=math.min(1e12,(s.economy.inventory.flour or 0)+1)
            return true,"All 3 goals done! +5 XP and a sack of flour!","Flour"
        end
        return true,"Goal done! +5 XP +"..(goal.energy>0 and goal.energy.." energy" or goal.stamina.." stamina"),goal.image
    end
end
