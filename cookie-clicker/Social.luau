-- Pure rules. Only the server supplies time, actor identity and target state.
return function(Model)
    Model.Fundraisers={
        {seconds=1800,name="30 minutes",cost=500,multiplier=1.5},
        {seconds=3600,name="1 hour",cost=1000,multiplier=1.8},
        {seconds=14400,name="4 hours",cost=2500,multiplier=2.5},
        {seconds=28800,name="8 hours",cost=5000,multiplier=3},
    }
    function Model.fundraiserCost(s,index)
        local tier=Model.Fundraisers[index]
        if not tier then return math.huge end
        local rate=Model.deliveryAmount(s,{Min=0,Seconds=1})
        return math.floor(math.max(tier.cost,math.min(1e12,rate*tier.seconds*.05)))
    end
    local function integer(n,max)
        return type(n)=="number" and n==n and n>=0 and n<=max and n%1==0
    end
    function Model.restoreSocial(s,data)
        local e=type(data.economy)=="table" and data.economy
        local c=e and e.charity
        if type(c)~="table" or not integer(c.tier,4) or c.tier<1 or not integer(c.endsAt,1e12) then return end
        local tier=Model.Fundraisers[c.tier]
        local cost=c.cost==nil and tier.cost or c.cost
        if not integer(cost,1e12) or cost<tier.cost then return end
        if not integer(c.pot,cost*tier.multiplier+6400) or not integer(c.stolen,cost) then return end
        local restored={tier=c.tier,cost=cost,endsAt=c.endsAt,pot=c.pot,stolen=c.stolen,helpers={},thieves={},participants=0}
        for _,key in {"helpers","thieves"} do
            if type(c[key])=="table" then
                for id,value in c[key] do
                    if restored.participants>=64 then break end
                    if type(id)=="string" and #id<=20 and id:match("^%-?%d+$") and value==true then
                        restored[key][id]=true;restored.participants+=1
                    end
                end
            end
        end
        s.economy.charity=restored
    end
    function Model.startFundraiser(s,tierIndex,now)
        if not integer(tierIndex,4) or tierIndex<1 then return false,"Choose a fundraiser duration." end
        if s.economy.charity then return false,"Collect your current fundraiser first." end
        local tier=Model.Fundraisers[tierIndex]
        local cost=Model.fundraiserCost(s,tierIndex)
        if s.economy.jar<cost then return false,"Deposit "..cost.." cookies into your jar first." end
        s.economy.jar-=cost
        s.economy.charity={tier=tierIndex,cost=cost,endsAt=now+tier.seconds,pot=math.floor(cost*tier.multiplier),stolen=0,helpers={},thieves={},participants=0}
        return true,"Fundraiser started! Friends can help until it finishes."
    end
    function Model.claimFundraiser(s,now)
        local c=s.economy.charity
        if not c or now<c.endsAt then return false,"Your fundraiser is not finished yet." end
        s.economy.charity=nil -- Consume before granting so repeated claims cannot pay twice.
        local principal=c.cost or Model.Fundraisers[c.tier].cost
        s.cookies+=math.min(principal,c.pot)
        Model.award(s,math.max(0,c.pot-principal))
        return true,"Fundraiser complete! Collected "..c.pot.." cookies."
    end
    function Model.charityAction(actor,target,actorId,targetId,action,now,insurance,stealBonus)
        if actor==target or actorId==targetId then return false,"Choose another player's fundraiser." end
        local c=target.economy.charity
        if not c or now>=c.endsAt then return false,"That fundraiser is no longer open." end
        if c.participants>=64 then return false,"This fundraiser has reached its visitor limit." end
        local id=tostring(actorId)
        if action=="help" then
            if c.helpers[id] then return false,"You already helped this fundraiser." end
            if actor.economy.stamina<5 then return false,"Helping takes 5 stamina." end
            actor.economy.stamina-=5;c.helpers[id]=true;c.participants+=1;c.pot+=100
            actor.economy.xp+=20;Model.award(actor,50)
            return true,"You helped! +50 cookies and +20 XP."
        elseif action=="steal" then
            if (target.shieldUntil or 0)>now then return false,"This bakery has an active shield." end
            if c.thieves[id] then return false,"You already tried this fundraiser." end
            if actor.economy.stamina<10 then return false,"Stealing takes 10 stamina." end
            local tier=Model.Fundraisers[c.tier]
            local cost=c.cost or tier.cost
            -- At most 25% of the starting investment can be stolen, in total.
            local remaining=math.max(0,math.floor(cost*.25)-c.stolen)
            local amount=math.min(remaining,math.max(1,math.floor(cost*.05*(1+math.clamp(stealBonus or 0,0,1))*(1-math.clamp(insurance or 0,0,.9)))))
            if amount<=0 then return false,"This fundraiser's remaining cookies are protected." end
            actor.economy.stamina-=10;c.thieves[id]=true;c.participants+=1;c.stolen+=amount;c.pot-=amount
            Model.award(actor,amount)
            return true,"You took "..amount.." cookies for 10 stamina."
        end
        return false,"Unknown fundraiser action."
    end
end
