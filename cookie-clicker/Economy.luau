-- Server-owned job and item economy. Random rolls are supplied only by the server.
return function(Model)
    Model.Jobs={
        {id="dishes",name="Wash cookie trays",energy=5,cookies=30,xp=10,level=1,item="spatula",chance=.15},
        {id="deliver",name="Deliver cookies",energy=10,cookies=100,xp=25,level=2,item="apron",chance=.12},
        {id="cater",name="Bake for a party",energy=20,cookies=400,xp=60,level=5,item="mixer",chance=.08},
        {id="festival",name="Run a cookie festival",energy=35,cookies=1500,xp=130,level=10,item="crown",chance=.03},
    }
    Model.Items={
        {id="spatula",name="Baking spatula",rarity="Common",price=250,bonus=.01},
        {id="apron",name="Lucky apron",rarity="Uncommon",price=1500,bonus=.02},
        {id="mixer",name="Silver mixer",rarity="Rare",price=10000,bonus=.04},
        {id="crown",name="Cookie crown",rarity="Legendary",price=100000,bonus=.08},
    }
    Model.Properties={
        {id="stand",name="Cookie stand",price=500,income=1},
        {id="store",name="Cookie store",price=5000,income=12},
        {id="market",name="Cookie market",price=50000,income=140},
    }
    local function find(list,id)
        if type(id)~="string" then return nil end
        for _,entry in list do if entry.id==id then return entry end end
    end
    local function number(value,limit)
        return type(value)=="number" and value==value and value>=0 and value<math.huge and math.min(value,limit) or 0
    end
    function Model.initEconomy(s)
        s.economy={xp=0,energy=100,stamina=100,inventory={},collection={},properties={},jar=0}
    end
    function Model.restoreEconomy(s,data)
        local saved=data.economy
        if type(saved)~="table" then return end
        local e=s.economy
        if type(saved.empireId)=="number" and saved.empireId==saved.empireId and saved.empireId%1==0 and math.abs(saved.empireId)<=9007199254740991 then e.empireId=saved.empireId end
        e.empireSequence=math.floor(number(saved.empireSequence,1e12))
        e.empireLevel=e.empireId and math.floor(number(saved.empireLevel,100)) or 0
        e.charitySequence=math.floor(number(saved.charitySequence,1e12))
        local ref=saved.charityRef
        if type(ref)=="table" and type(ref.sequence)=="number" and ref.sequence>0 and ref.sequence%1==0 and ref.sequence<=1e12 then e.charityRef={sequence=ref.sequence} end
        local charityPending=saved.charityPending
        if type(charityPending)=="table" and charityPending.operation==e.charitySequence and e.charitySequence>0 then
            local kind=charityPending.kind
            local fund=charityPending.fundSequence
            local owner=charityPending.owner
            local validFund=type(fund)=="number" and fund>0 and fund%1==0 and fund<=1e12
            local validOwner=type(owner)=="number" and owner==owner and owner%1==0 and math.abs(owner)<=9007199254740991
            local clean={kind=kind,operation=e.charitySequence,fundSequence=fund,owner=owner}
            if kind=="start" and validFund and type(charityPending.tier)=="number" and charityPending.tier%1==0 and Model.Fundraisers[charityPending.tier] then
                clean.tier=charityPending.tier;clean.cost=Model.Fundraisers[clean.tier].cost
                clean.startedAt=number(charityPending.startedAt,1e12);clean.insurance=number(charityPending.insurance,.75)
                e.charityPending=clean
            elseif kind=="claim" and validFund and e.charityRef and e.charityRef.sequence==fund then e.charityPending=clean
            elseif (kind=="help" or kind=="steal") and validFund and validOwner then
                clean.cost=kind=="help" and 5 or 10;clean.bonus=number(charityPending.bonus,1);e.charityPending=clean
            end
        end
        local membership=saved.empireMembership
        if type(membership)=="table" and type(membership.empireId)=="number" and membership.empireId==membership.empireId and membership.empireId%1==0 and math.abs(membership.empireId)<=9007199254740991 then
            local kind=membership.kind
            local badge=false
            for _,v in {"cookie","crown","star","heart","shield","bakery"} do if membership.badge==v then badge=true end end
            if kind=="join" or kind=="leave" or (kind=="create" and type(membership.name)=="string" and #membership.name>0 and #membership.name<=96 and badge) then
                e.empireMembership={kind=kind,empireId=membership.empireId,name=kind=="create" and membership.name or nil,badge=kind=="create" and membership.badge or nil}
            end
        end
        local pending=saved.empireDonation
        if type(pending)=="table" and pending.empireId==e.empireId and e.empireId and pending.sequence==e.empireSequence and e.empireSequence>0 and (pending.amount==10 or pending.amount==25 or pending.amount==50) then
            e.empireDonation={empireId=e.empireId,sequence=e.empireSequence,amount=pending.amount}
        end
        for _,key in {"xp","jar"} do e[key]=number(saved[key],1e15) end
        for _,key in {"energy","stamina"} do e[key]=number(saved[key],100) end
        for _,item in Model.Items do
            e.inventory[item.id]=math.floor(number(type(saved.inventory)=="table" and saved.inventory[item.id],1000000))
            e.collection[item.id]=type(saved.collection)=="table" and saved.collection[item.id]==true or false
        end
        for _,property in Model.Properties do
            e.properties[property.id]=math.floor(number(type(saved.properties)=="table" and saved.properties[property.id],100))
        end
    end
    function Model.empireBonus(s) return ((s.economy and s.economy.empireLevel) or 0)*.01 end
    function Model.jobLevel(s) return 1+math.floor(math.sqrt(s.economy.xp/100)) end
    function Model.collectionBonus(s)
        local bonus=1
        for _,item in Model.Items do if s.economy.collection[item.id] then bonus+=item.bonus end end
        return bonus
    end
    function Model.propertyPrice(s,id)
        local p=find(Model.Properties,id)
        return p and math.floor(p.price*1.25^(s.economy.properties[id] or 0)) or math.huge
    end
    function Model.propertyIncome(s)
        local income=0
        for _,p in Model.Properties do income+=p.income*(s.economy.properties[p.id] or 0) end
        return income*Model.collectionBonus(s)*(1+Model.empireBonus(s))^2
    end
    function Model.economyTick(s,dt)
        local e=s.economy
        e.energy=math.min(100,e.energy+dt/30)
        e.stamina=math.min(100,e.stamina+dt/45)
        Model.award(s,Model.propertyIncome(s)*dt)
    end
    function Model.economyAction(s,action,arg,roll)
        local e=s.economy
        if action=="job" then
            local job=find(Model.Jobs,arg)
            if not job or Model.jobLevel(s)<job.level then return false,"Reach this job's level first." end
            if e.energy<job.energy then return false,"Not enough energy. It refills over time." end
            -- Validate the injected roll before spending anything.
            if type(roll)~="number" or roll~=roll or roll<0 or roll>=1 then return false,"Try this job again." end
            e.energy-=job.energy;e.xp+=job.xp
            local reward=math.floor(job.cookies*Model.collectionBonus(s)*(1+Model.empireBonus(s))^2)
            Model.award(s,reward)
            local dropped=roll<job.chance
            if dropped then e.inventory[job.item]=math.min(1000000,(e.inventory[job.item] or 0)+1) end
            return true,"Job done! +"..reward.." cookies, +"..job.xp.." XP"..(dropped and ", plus an item!" or "!")
        elseif action=="item" then
            local item=find(Model.Items,arg)
            if not item or s.cookies<item.price or (e.inventory[arg] or 0)>=1000000 then return false,"Not enough cookies, or your inventory is full." end
            s.cookies-=item.price;e.inventory[arg]=(e.inventory[arg] or 0)+1
            return true,"Added "..item.name.." to your inventory."
        elseif action=="collect" then
            local item=find(Model.Items,arg)
            if not item or (e.inventory[arg] or 0)<1 or e.collection[arg] then return false,"Own this item first. Each item can be displayed once." end
            e.inventory[arg]-=1;e.collection[arg]=true
            return true,"Item displayed! Jobs and properties now reward more cookies."
        elseif action=="property" then
            local p=find(Model.Properties,arg)
            local price=Model.propertyPrice(s,arg)
            if not p or s.cookies<price or (e.properties[arg] or 0)>=100 then return false,"Not enough cookies, or you own the maximum." end
            s.cookies-=price;e.properties[arg]=(e.properties[arg] or 0)+1
            return true,"Your new "..p.name.." is earning cookies!"
        elseif action=="deposit" or action=="withdraw" then
            if type(arg)~="number" or arg~=arg or arg%1~=0 or arg<=0 or arg>1e12 then return false,"Choose a valid cookie amount." end
            if action=="deposit" then
                if s.cookies<arg or e.jar+arg>1e15 then return false,"Not enough cookies, or the jar is full." end
                s.cookies-=arg;e.jar+=arg
            else
                if e.jar<arg then return false,"Your jar does not have that many cookies." end
                e.jar-=arg;s.cookies+=arg -- Moving cookies does not count as new earnings.
            end
            return true,"Cookie jar updated."
        end
        return false,"Unknown economy action."
    end
end
