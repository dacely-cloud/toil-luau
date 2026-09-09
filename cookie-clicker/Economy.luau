-- Server-owned job and item economy. Random rolls are supplied only by the server.
return function(Model)
    Model.Jobs={
        {id="dishes",name="Wash cookie trays",energy=5,cookies=30,xp=10,level=1,item="spatula",chance=.15},
        {id="deliver",name="Deliver cookies",energy=10,cookies=100,xp=25,level=2,item="apron",chance=.12},
        {id="cater",name="Bake for a party",energy=20,cookies=400,xp=60,level=5,item="mixer",chance=.08},
        {id="festival",name="Run a cookie festival",energy=35,cookies=1500,xp=130,level=10,item="crown",chance=.03},
    }
    -- Advertising campaigns: book one, wait, collect. Slots run in parallel.
    -- Durations climb from five minutes to twelve hours so there is always one
    -- that fits how long you are about to be away.
    Model.Ads={
        -- `image` is an icon name from ImageConfig; `zone` is a card-background
        -- name from Images2Config.ZoneBackground. They are DIFFERENT namespaces
        -- with different spellings, and a name from the wrong one resolves to nil.
        -- The flat cookie figure is the early-game floor; past that a campaign
        -- pays a share of production, so the rate per second climbs with length
        -- and committing a slot for longer is always the better deal.
        -- `rush` is the developer product that finishes this campaign early. The
        -- price ladder tracks the payout: skipping a five-minute flyer run and
        -- skipping a twelve-hour moon carving are not the same purchase.
        {id="flyers",name="Hand out flyers",seconds=300,cookies=1200,xp=20,item="spatula",chance=.10,image="CookieStand",zone="BakingCookie",rush="FinishCampaign"},
        {id="posters",name="Put up posters",seconds=1800,cookies=9000,xp=60,item="spatula",chance=.15,image="CookieStore",zone="CookieStore",rush="FinishCampaign"},
        {id="radio",name="Buy a radio spot",seconds=3600,cookies=22000,xp=140,item="apron",chance=.18,image="CookieDelivery",zone="DeliverCookie",rush="FinishCampaign"},
        {id="billboard",name="Rent a billboard",seconds=7200,cookies=60000,xp=300,item="apron",chance=.22,image="CookieMarket",zone="CookieMarket",rush="FinishCampaign"},
        {id="influencer",name="Sponsor an influencer",seconds=10800,cookies=110000,xp=520,item="mixer",chance=.26,image="BakeForParty",zone="BakreForAParty",rush="FinishCampaignBig"},
        {id="commercial",name="Film a TV commercial",seconds=14400,cookies=170000,xp=750,item="mixer",chance=.30,image="CookieFestival",zone="CookieFestival",rush="FinishCampaignBig"},
        {id="skywriter",name="Hire a skywriting plane",seconds=21600,cookies=300000,xp=1200,item="mixer",chance=.35,image="GoldenCookie",zone="Luck",rush="FinishCampaignHuge"},
        {id="airline",name="Wrap a jet in cookie livery",seconds=28800,cookies=460000,xp=1800,item="crown",chance=.40,image="CookieShipment",zone="CookieBank",rush="FinishCampaignHuge"},
        {id="orbit",name="Rent a billboard in low orbit",seconds=36000,cookies=650000,xp=2500,item="crown",chance=.50,image="CookiePortal",zone="CookieManifacture",rush="FinishCampaignEpic"},
        {id="moon",name="Carve the logo into the Moon",seconds=43200,cookies=900000,xp=3400,item="crown",chance=.65,image="CookieEmpire",zone="CookieParty",rush="FinishCampaignEpic"},
    }
    -- Bakery decor. Unlocked by level every 3-5, then BOUGHT -- and each one
    -- bought is a permanent production boost, so the backdrop is a reward you
    -- chose rather than one that appeared. `image` is an ImageConfig name.
    -- The id is the art's internal codename and never reaches a player; `name`
    -- is what they see, and it is the tier, because the codenames were picked
    -- from UUID filenames and mean nothing to anyone.
    -- ORDER IS DELIBERATE and set by eye from the art, not by the codenames --
    -- those came from UUID filenames and carried no ordering. Ownership is keyed
    -- by id, so this list can be resorted without touching anyone's save; only
    -- which backdrop counts as "best owned" moves with it.
    Model.Decor={
        {id="wisp",name="Tier 1",level=3, floor=1e4,  bonus=.05,image="CookieBackgrounds/Wisp",seconds=180},
        {id="kite",name="Tier 2",level=6, floor=5e7,  bonus=.05,image="CookieBackgrounds/Kite"},
        {id="rook",name="Tier 3",level=10,floor=2e9,  bonus=.05,image="CookieBackgrounds/Rook"},
        {id="mira",name="Tier 4",level=14,floor=1e11, bonus=.05,image="CookieBackgrounds/Mira"},
        {id="nova",name="Tier 5",level=18,floor=5e12, bonus=.05,image="CookieBackgrounds/Nova"},
        {id="fern",name="Tier 6",level=22,floor=2e14, bonus=.10,image="CookieBackgrounds/Fern"},
        {id="halo",name="Tier 7",level=26,floor=1e16, bonus=.10,image="CookieBackgrounds/Halo"},
        {id="sage",name="Tier 8",level=30,floor=5e17, bonus=.10,image="CookieBackgrounds/Sage"},
        {id="onyx",name="Tier 9",level=35,floor=2e19, bonus=.10,image="CookieBackgrounds/Onyx"},
        {id="dune",name="Tier 10",level=40,floor=1e21, bonus=.10,image="CookieBackgrounds/Dune"},
    }
    Model.Items={
        -- Ordered by price so the shop and the collection album both read as one
        -- ladder. Nothing may index this list positionally -- see CrateItems.
        {id="flour",name="Sack of flour",rarity="Common",price=100,bonus=.01},
        {id="sugar",name="Bag of sugar",rarity="Common",price=175,bonus=.01},
        {id="spatula",name="Baking spatula",rarity="Common",price=250,bonus=.01},
        {id="eggs",name="Fresh eggs",rarity="Common",price=300,bonus=.01},
        {id="butter",name="Block of butter",rarity="Uncommon",price=700,bonus=.02},
        {id="milk",name="Bottle of milk",rarity="Uncommon",price=1200,bonus=.02},
        {id="apron",name="Lucky apron",rarity="Uncommon",price=1500,bonus=.02},
        {id="dough",name="Perfect dough",rarity="Uncommon",price=2500,bonus=.02},
        {id="chocolate",name="Chocolate chunks",rarity="Rare",price=6000,bonus=.03},
        {id="mixer",name="Silver mixer",rarity="Rare",price=10000,bonus=.04},
        {id="tray",name="Baker's tray",rarity="Rare",price=20000,bonus=.05},
        {id="crown",name="Cookie crown",rarity="Legendary",price=100000,bonus=.08},
        {id="goldenWhisk",name="Golden whisk",rarity="Exclusive",price=math.huge,bonus=.03,exclusive=true},
        {id="starApron",name="Star apron",rarity="Exclusive",price=math.huge,bonus=.03,exclusive=true},
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
        s.economy={xp=0,tapXpProgress=0,energy=100,stamina=100,inventory={},collection={},properties={},jar=0,buildingXpHigh={},upgradeXpClaimed={},ads={},oneTimeProducts={},decor={}}
    end
    function Model.restoreEconomy(s,data)
        local saved=type(data.economy)=="table" and data.economy or {}
        local e=s.economy
        -- Lifetime records survive sales, ascension and rejoin. Existing saves
        -- start at current ownership, without granting retroactive XP.
        for i=1,#Model.Buildings do
            local high=type(saved.buildingXpHigh)=="table" and saved.buildingXpHigh[i]
            e.buildingXpHigh[i]=math.max(s.buildings[i],math.floor(number(high,1000000)))
        end
        for _,u in Model.Upgrades do
            e.upgradeXpClaimed[u.id]=s.upgrades[u.id]==true or (type(saved.upgradeXpClaimed)=="table" and saved.upgradeXpClaimed[u.id]==true)
        end
        if type(data.economy)~="table" then return end
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
                clean.tier=charityPending.tier
                local baseCost=Model.Fundraisers[clean.tier].cost
                clean.cost=math.max(baseCost,math.floor(number(charityPending.cost,Model.Balance.MaxFundraiserInvestment)))
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
        e.xp=number(saved.xp,1e15)
        e.jar=number(saved.jar,Model.Balance.MaxJarCookies)
        e.tapXpProgress=math.floor(number(saved.tapXpProgress,9))
        e.energy=number(saved.energy,110);e.stamina=number(saved.stamina,100)
        for _,item in Model.Items do
            e.inventory[item.id]=math.floor(number(type(saved.inventory)=="table" and saved.inventory[item.id],1e12))
            e.collection[item.id]=type(saved.collection)=="table" and saved.collection[item.id]==true or false
        end
        for _,property in Model.Properties do
            e.properties[property.id]=math.floor(number(type(saved.properties)=="table" and saved.properties[property.id],100))
        end
        -- Running campaigns are kept as a DENSE array, and rebuilt as one here.
        -- A Lua array with a hole in it comes back from the DataStore as a
        -- string-keyed dictionary, so a slot map would silently drop every
        -- campaign past the first empty slot. Cancelling closes the gap instead.
        e.decor={}
        local savedDecor=type(saved.decor)=="table" and saved.decor or {}
        for _,d in Model.Decor do if savedDecor[d.id]==true then e.decor[d.id]=true end end
        -- One-time products are an entitlement, so they are restored the way the
        -- rest of the save is: only keys the catalogue still knows about.
        e.oneTimeProducts={}
        local savedOwned=type(saved.oneTimeProducts)=="table" and saved.oneTimeProducts or {}
        for key,owned in savedOwned do
            if type(key)=="string" and owned==true and Model.MonetizationConfig.Products[key] then e.oneTimeProducts[key]=true end
        end
        e.ads={}
        e.adRush=nil
        local savedAds=type(saved.ads)=="table" and saved.ads or {}
        for index=1,Model.Balance.AdSlots+Model.Balance.AdSlotsVip do
            local entry=savedAds[index]
            if type(entry)=="table" then
                local ad=find(Model.Ads,entry.id)
                if ad then
                    e.ads[#e.ads+1]={
                        id=ad.id,
                        remaining=math.min(number(entry.remaining,ad.seconds),ad.seconds),
                        reward=math.floor(number(entry.reward,1e100)),
                        cost=math.floor(number(entry.cost or math.ceil(number(entry.reward,1e100)*.10),1e100)),
                        xp=math.floor(number(entry.xp,1e9)),
                    }
                end
            end
        end
        local rush=saved.adRush
        if type(rush)=="table" and type(rush.id)=="string" and find(Model.Ads,rush.id) then
            local slot=math.floor(number(rush.slot,#e.ads))
            if slot>=1 then e.adRush={slot=slot,id=rush.id} end
        end
    end
    function Model.empireBonus(s) return ((s.economy and s.economy.empireLevel) or 0)*.01 end
    -- Keep earned XP; the gentler curve immediately benefits existing players.
    function Model.jobLevelXp(level) return 40*(math.max(1,level)-1)^2 end
    function Model.jobLevel(s) return 1+math.floor(math.sqrt(s.economy.xp/40)) end
    function Model.buildingPurchaseXp(s,index)
        local e=s.economy
        local high=e.buildingXpHigh[index] or 0
        local added=math.max(0,s.buildings[index]-high)
        e.buildingXpHigh[index]=math.max(high,s.buildings[index])
        local reward=added*(2+math.floor((index-1)/4))
        e.xp=math.min(1e15,e.xp+reward)
        return reward
    end
    function Model.upgradePurchaseXp(s,id)
        local e=s.economy
        if e.upgradeXpClaimed[id] then return 0 end
        e.upgradeXpClaimed[id]=true
        e.xp=math.min(1e15,e.xp+10)
        return 10
    end
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
        return income*Model.collectionBonus(s)*(1+Model.empireBonus(s))^2*Model.friendMultiplier(s)*Model.passFactor(s,"PropertyIncome")*Model.passFactor(s,"CookieGain")*Model.milkMultiplier(s)*Model.heavenlyFactor(s,"property")
    end
    -- Regeneration in units per second. economyTick below is the only other
    -- place this rate exists, and the countdown in the header reads it from
    -- here so a balance or gamepass change can never leave the two disagreeing.
    function Model.regenRate(s,resource)
        if resource=="energy" then
            return Model.passFactor(s,"EnergyRegen")*Model.heavenlyFactor(s,"energy")/Model.Balance.EnergySeconds
        end
        return Model.passFactor(s,"StaminaRegen")*Model.heavenlyFactor(s,"stamina")/Model.Balance.StaminaSeconds
    end
    -- Seconds until the *displayed* amount ticks up by one, which is the number
    -- a player is actually waiting on. nil once the pool is full, or if nothing
    -- is regenerating, so callers have a single "no countdown" case.
    function Model.secondsToNextPoint(s,resource)
        local maximum=if resource=="energy" then Model.maxEnergy(s) else 100
        local current=s.economy[resource]
        if type(current)~="number" or current~=current or current>=maximum then return nil end
        local rate=Model.regenRate(s,resource)
        if rate<=0 or rate~=rate or rate==math.huge then return nil end
        return math.max(0,(math.min(maximum,math.floor(current)+1)-current)/rate)
    end
    function Model.decorOwned(s,id)
        local owned=s.economy and s.economy.decor
        return type(owned)=="table" and owned[id]==true
    end
    function Model.decorUnlocked(s,d) return Model.jobLevel(s)>=d.level end
    -- Priced off production so it stays a decision, with a floor for a player
    -- who levelled through jobs rather than buildings and has little running.
    -- `seconds` per piece, falling back to the shared figure. Tier 1 uses a much
    -- smaller one: it is the introduction to the mechanic, and two hours of
    -- production is too steep a first ask when nothing has been demonstrated yet.
    function Model.decorCost(s,d)
        return math.max(d.floor,math.floor(Model.cps(s)*(d.seconds or Model.Balance.DecorProductionSeconds)))
    end
    -- The one the player is working toward: first not owned, in ladder order.
    function Model.nextDecor(s)
        for i,d in Model.Decor do if not Model.decorOwned(s,d.id) then return d,i end end
        return nil,nil
    end
    function Model.decorBonus(s)
        local bonus=1
        for _,d in Model.Decor do if Model.decorOwned(s,d.id) then bonus+=d.bonus end end
        return bonus
    end
    -- The backdrop on the bakery is the best one owned, so buying is visible.
    function Model.equippedDecor(s)
        local best=nil
        for _,d in Model.Decor do if Model.decorOwned(s,d.id) then best=d end end
        return best
    end
    function Model.adSlots(s)
        return Model.Balance.AdSlots+(if s.passes and s.passes.VIP==true then Model.Balance.AdSlotsVip else 0)
    end
    -- Mirrors jobReward: a flat floor for early play, and a share of production
    -- over the campaign's length once the bakery has outgrown it.
    function Model.adReward(s,ad)
        local production=0
        for i,b in Model.Buildings do production+=b.cps*s.buildings[i]*Model.multiplier(s,i) end
        production*=Model.productionFactor(s)/(Model.collectionBonus(s)*(1+Model.empireBonus(s)))
        local base=math.max(ad.cookies,production*ad.seconds*Model.Balance.AdProductionShare)
        return math.floor(base*Model.collectionBonus(s)*(1+Model.empireBonus(s))^2*Model.passFactor(s,"CookieGain")*Model.heavenlyFactor(s,"jobs"))
    end
    function Model.adCost(s,ad) return math.ceil(Model.adReward(s,ad)*Model.Balance.AdUpFrontShare) end
    -- Finishing early is a Robux product, and a product receipt carries nothing
    -- but its id -- so the slot the player tapped is remembered here first and
    -- read back when the receipt lands.
    function Model.setAdRushIntent(s,slot)
        local entry=s.economy.ads[slot]
        if type(entry)~="table" or entry.remaining<=0 then return false end
        s.economy.adRush={slot=slot,id=entry.id}
        return true
    end
    -- A paid receipt must always do something. If the remembered campaign is
    -- gone by the time the purchase lands -- cancelled, collected, or finished
    -- in another session -- finish whichever one has the longest left instead
    -- of silently swallowing the purchase.
    function Model.finishAdRush(s)
        local e=s.economy
        local target=nil
        local intent=e.adRush
        if type(intent)=="table" then
            local entry=e.ads[intent.slot]
            if type(entry)=="table" and entry.id==intent.id and entry.remaining>0 then target=entry end
        end
        if not target then
            for _,entry in e.ads do
                if entry.remaining>0 and (target==nil or entry.remaining>target.remaining) then target=entry end
            end
        end
        e.adRush=nil
        if not target then return false end
        target.remaining=0
        return true
    end
    -- `offline` is the catch-up tick a save runs on load. Energy and stamina
    -- still refill across it -- that is what players expect of a bar -- but
    -- campaigns deliberately do not, so the only way to run one down is to be
    -- in the game watching it.
    function Model.economyTick(s,dt,offline)
        local e=s.economy
        e.energy=math.min(Model.maxEnergy(s),e.energy+dt/Model.Balance.EnergySeconds*Model.passFactor(s,"EnergyRegen")*Model.heavenlyFactor(s,"energy"))
        e.stamina=math.min(100,e.stamina+dt/Model.Balance.StaminaSeconds*Model.passFactor(s,"StaminaRegen")*Model.heavenlyFactor(s,"stamina"))
        if not offline then
            for _,entry in e.ads or {} do
                if entry.remaining>0 then entry.remaining=math.max(0,entry.remaining-dt) end
            end
        end
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
            local reward=Model.jobReward(s,job)
            Model.award(s,reward)
            local dropped=roll<job.chance
            if dropped then e.inventory[job.item]=math.min(1000000,(e.inventory[job.item] or 0)+1) end
            return true,"Job done! +"..reward.." cookies, +"..job.xp.." XP"..(dropped and ", plus an item!" or "!")
        elseif action=="item" then
            local item=find(Model.Items,arg)
            if not item or item.exclusive or s.cookies<item.price or (e.inventory[arg] or 0)>=1000000 then return false,"Not enough cookies, or your inventory is full." end
            s.cookies-=item.price;e.inventory[arg]=(e.inventory[arg] or 0)+1
            return true,"Added "..item.name.." to your inventory."
        elseif action=="collect" then
            local item=find(Model.Items,arg)
            if not item or (e.inventory[arg] or 0)<1 or e.collection[arg] then return false,"Own this item first. Each item can be displayed once." end
            e.inventory[arg]-=1;e.collection[arg]=true
            return true,"Item displayed! Baking, jobs and properties now reward more cookies."
        elseif action=="sellItem" then
            local item=find(Model.Items,arg)
            if not item or item.exclusive or not e.collection[arg] or (e.inventory[arg] or 0)<1 then return false,"Display one first, then sell your spare items." end
            local refund=math.floor(item.price*.25)
            e.inventory[arg]-=1;s.cookies+=refund
            -- Selling an item is a refund, not newly baked cookies or XP.
            return true,"Sold one spare item for "..refund.." cookies."
        elseif action=="property" then
            local p=find(Model.Properties,arg)
            local price=Model.propertyPrice(s,arg)
            if not p or s.cookies<price or (e.properties[arg] or 0)>=100 then return false,"Not enough cookies, or you own the maximum." end
            s.cookies-=price;e.properties[arg]=(e.properties[arg] or 0)+1
            return true,"Your new "..p.name.." is earning cookies!"
        elseif action=="buyDecor" then
            local d=find(Model.Decor,arg)
            if not d then return false,"Unknown decoration." end
            if Model.decorOwned(s,d.id) then return false,"You already own that one." end
            if not Model.decorUnlocked(s,d) then return false,"Reach level "..d.level.." to unlock it." end
            local cost=Model.decorCost(s,d)
            if s.cookies<cost then return false,"Not enough cookies for that decoration." end
            s.cookies-=cost;e.decor[d.id]=true
            return true,d.name.." decor is up! Baking is now "..math.floor(d.bonus*100).."% stronger."
        elseif action=="adStart" then
            local ad=find(Model.Ads,arg)
            if not ad then return false,"Unknown campaign." end
            if #e.ads>=Model.adSlots(s) then return false,"Every campaign slot is busy." end
            local cost=Model.adCost(s,ad)
            if s.cookies<cost then return false,"Not enough cookies to book that campaign." end
            s.cookies-=cost
            e.ads[#e.ads+1]={id=ad.id,remaining=ad.seconds,reward=Model.adReward(s,ad),cost=cost,xp=ad.xp}
            return true,ad.name.." is running."
        elseif action=="adRushIntent" then
            if type(arg)~="number" or arg~=arg or arg%1~=0 or arg<1 then return false,"No campaign in that slot." end
            if not Model.setAdRushIntent(s,arg) then return false,"That campaign is not running." end
            return true,"Choose Buy to finish it now."
        elseif action=="adCancel" or action=="adCollect" then
            if type(arg)~="number" or arg~=arg or arg%1~=0 or arg<1 or type(e.ads[arg])~="table" then return false,"No campaign in that slot." end
            local entry=e.ads[arg]
            local ad=find(Model.Ads,entry.id)
            if action=="adCancel" then
                -- A refund of part of the booking fee, so it is returned to the
                -- bank directly rather than counted as freshly baked cookies.
                local paid=entry.cost or math.ceil(entry.reward*.10)
                local refund=math.floor(paid*Model.Balance.AdCancelRefund)
                table.remove(e.ads,arg)
                s.cookies+=refund
                return true,"Campaign cancelled. "..refund.." cookies refunded."
            end
            if entry.remaining>0 then return false,"That campaign is still running." end
            if type(roll)~="number" or roll~=roll or roll<0 or roll>=1 then return false,"Try collecting again." end
            table.remove(e.ads,arg)
            local reward=math.floor(math.max(0,entry.reward))
            local gainedXp=math.floor(math.max(0,entry.xp))
            local principal=math.min(reward,entry.cost or math.ceil(entry.reward*.10))
            s.cookies+=principal
            Model.award(s,reward-principal)
            e.xp=math.min(1e15,e.xp+gainedXp)
            local dropped=ad~=nil and roll<ad.chance
            if dropped then e.inventory[ad.item]=math.min(1000000,(e.inventory[ad.item] or 0)+1) end
            return true,"Campaign paid off! +"..reward.." cookies, +"..gainedXp.." XP"..(if dropped then ", plus an item!" else "!")
        elseif action=="deposit" or action=="withdraw" then
            if type(arg)~="number" or arg~=arg or arg%1~=0 or arg<=0 or arg>Model.Balance.MaxJarCookies then return false,"Choose a valid cookie amount." end
            if action=="deposit" then
                if s.cookies<arg or e.jar+arg>Model.Balance.MaxJarCookies then return false,"Not enough cookies, or the jar is full." end
                s.cookies-=arg;e.jar+=arg-Model.depositFee(s,arg)
            else
                if e.jar<arg then return false,"Your jar does not have that many cookies." end
                e.jar-=arg;s.cookies+=arg -- Moving cookies does not count as new earnings.
            end
            return true,"Cookie jar updated."
        end
        return false,"Unknown economy action."
    end
end
