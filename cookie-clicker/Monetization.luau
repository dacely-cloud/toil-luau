-- Pure reward rules. Ownership and receipt verification belong to the server.
return function(Model,Config)
    Model.MonetizationConfig=Config
    function Model.passFactor(s,stat)
        local factor=1
        local function visit(reward)
            if reward.Kind=="Bundle" then for _,grant in reward.Grants do visit(grant) end
            elseif reward.Kind=="Multiplier" and reward.Stat==stat then factor*=reward.Multiplier end
        end
        for _,key in Config.PassOrder do
            if s.passes and s.passes[key]==true then visit(Config.Passes[key].Reward) end
        end
        return factor
    end
    function Model.maxEnergy(s)return math.floor(100*Model.passFactor(s,"MaxEnergy")+.5)end
    function Model.depositFee(s,amount)return math.ceil(amount*Config.DepositFee*Model.passFactor(s,"DepositFee"))end
    function Model.jobReward(s,job)
        return math.floor(job.cookies*Model.collectionBonus(s)*(1+Model.empireBonus(s))^2*Model.passFactor(s,"JobReward")*Model.passFactor(s,"CookieGain"))
    end
    function Model.deliveryAmount(s,reward)
        -- Stable progression only: temporary golden/friend bonuses cannot inflate purchases.
        local rate=0
        for i,b in Model.Buildings do rate+=b.cps*s.buildings[i]*Model.multiplier(s,i) end
        rate*=Model.productionFactor(s)*Model.passFactor(s,"CookieGain")
        local property=0
        for _,p in Model.Properties do property+=p.income*(s.economy.properties[p.id] or 0) end
        rate+=property*Model.collectionBonus(s)*(1+Model.empireBonus(s))^2*Model.passFactor(s,"PropertyIncome")*Model.passFactor(s,"CookieGain")*Model.milkMultiplier(s)
        return math.floor(math.max(reward.Min,math.max(rate,Model.baseClickPower(s))*reward.Seconds))
    end
    function Model.productReward(s,product,roll,now)
        local grants={cookies=0,items={}}
        local function visit(r)
            if r.Kind=="Bundle" then for _,g in r.Grants do visit(g) end
            elseif r.Kind=="Currency" then grants.cookies+=r.Amount
            elseif r.Kind=="ScaledCurrency" then grants.cookies+=Model.deliveryAmount(s,r)
            elseif r.Kind=="Item" then grants.items[r.Item]=(grants.items[r.Item] or 0)+r.Amount
            elseif r.Kind=="Refill" then grants[string.lower(r.Stat)]=true
            elseif r.Kind=="Timed" then grants.shieldUntil=math.max(now,s.shieldUntil or 0)+r.Duration
            elseif r.Kind=="Crate" then
                assert(type(roll)=="number" and roll>=0 and roll<1,"Invalid server roll")
                local cumulative=0
                for i,chance in r.Odds do
                    cumulative+=chance
                    if roll*100<cumulative then grants.items[Config.CrateItems[i]]=1;break end
                end
            else error("Unsupported reward "..r.Kind) end
        end
        visit(product.Reward)
        return grants
    end
    function Model.grantProduct(s,grants)
        Model.award(s,grants.cookies)
        for id,count in grants.items do s.economy.inventory[id]=(s.economy.inventory[id] or 0)+count end
        if grants.energy then s.economy.energy=Model.maxEnergy(s) end
        if grants.stamina then s.economy.stamina=100 end
        if grants.shieldUntil then s.shieldUntil=grants.shieldUntil end
    end
    function Model.restorePurchases(s,data)
        s.purchaseReceipts={}
        if type(data.purchaseReceipts)=="table" then
            for id,granted in data.purchaseReceipts do
                if type(id)=="string" and #id<=200 and granted==true then s.purchaseReceipts[id]=true end
            end
        end
        local shield=data.shieldUntil
        s.shieldUntil=type(shield)=="number" and shield==shield and shield>=0 and shield<1e12 and shield or 0
        -- Entitlements are rechecked against Roblox, never restored as trusted ownership.
    end
end
