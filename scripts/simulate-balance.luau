-- Deterministic pacing model, not a claim about real player retention.
-- Chooses the best marginal production payback, waits to afford it, and buys
-- through the real game rules. Whole clicks are executed once per simulated second.
local Model=require("../cookie-clicker/Model")
local mode,days=...
if mode=="baseline" then
    for _,b in Model.Buildings do b.price=math.min(b.price,b.cps*3600) end
    for _,u in Model.Upgrades do
        local tier=u.id:match("^building_%d+_(%d+)$")
        if tier then
            local tiers={[1]=1,[5]=2,[25]=3,[50]=4,[100]=5}
            u.price=Model.Buildings[u.building].price*10*5^(tiers[tonumber(tier)]-1)
        end
    end
end
local function simulate(name,clicks,jobs,seconds,rebirth,full)
    local s=Model.new()
    if mode and mode:find("boosted",1,true) then
        s.passes={};for _,key in Model.MonetizationConfig.PassOrder do s.passes[key]=true end
        s.friendCount=10
    end
    local milestones={}
    local function rate()local cps=Model.cps(s);return cps+clicks*Model.clickPower(s,cps)end
    local function choose()
        local before=rate()
        local best
        local function offer(kind,id,cost,after)
            local delta=after-before
            if delta>0 then
                local roi=cost/delta+math.max(0,cost-s.cookies)/math.max(1,before)
                if not best or roi<best.roi then best={kind=kind,id=id,cost=cost,roi=roi} end
            end
        end
        for i=1,#Model.Buildings do
            local price=Model.price(s,i,1,false)
            s.buildings[i]+=1;local after=rate();s.buildings[i]-=1
            offer("building",i,price,after)
        end
        for _,u in Model.Upgrades do
            if not s.upgrades[u.id] and s.buildings[u.building]>=u.required then
                s.upgrades[u.id]=true;local after=rate();s.upgrades[u.id]=nil
                offer("upgrade",u.id,u.price,after)
            end
        end
        for _,p in Model.Properties do
            local owned=s.economy.properties[p.id] or 0
            if owned<100 then
                local price=Model.propertyPrice(s,p.id)
                s.economy.properties[p.id]=owned+1;local after=rate();s.economy.properties[p.id]=owned
                offer("property",p.id,price,after)
            end
        end
        if full then
            for _,item in Model.Items do
                if not item.exclusive and not s.economy.collection[item.id] then
                    s.economy.collection[item.id]=true;local after=rate();s.economy.collection[item.id]=nil
                    offer("item",item.id,item.price,after)
                end
            end
            for _,d in Model.Decor do
                if not Model.decorOwned(s,d.id) and Model.decorUnlocked(s,d) then
                    local price=Model.decorCost(s,d)
                    s.economy.decor[d.id]=true;local after=rate();s.economy.decor[d.id]=nil
                    offer("decor",d.id,price,after)
                end
            end
        end
        return best
    end
    local nextBuy=choose()
    local clickCarry=0
    for time=1,seconds do
        Model.tick(s,1)
        clickCarry+=clicks
        while clickCarry>=1 do Model.click(s);clickCarry-=1 end
        if jobs then
            local job
            for _,j in Model.Jobs do if Model.jobLevel(s)>=j.level then job=j end end
            if s.economy.energy>=job.energy then Model.economyAction(s,"job",job.id,.99) end
            Model.goldenTick(s)
            if s.goldenUntil>s.played and s.goldenId%2==1 then Model.collectGolden(s,s.goldenId) end
        end
        if full then
            for i=#s.economy.ads,1,-1 do
                if s.economy.ads[i].remaining<=0 then assert(Model.economyAction(s,"adCollect",i,.99)) end
            end
            -- Rebook a short campaign to track growing production, or a longer
            -- one when its floor pays more per second; reserve at most 10% bank.
            if time%30==0 then
                local ad,best=nil,0
                for _,a in Model.Ads do
                    local cost=Model.adCost(s,a)
                    local roi=(Model.adReward(s,a)-cost)/a.seconds
                    if cost<=s.cookies*.1 and roi>best then ad,best=a,roi end
                end
                if ad and #s.economy.ads<Model.adSlots(s) then Model.economyAction(s,"adStart",ad.id) end
            end
            if s.buildings[8]>0 and s.magic>=60 then Model.advancedAction(s,"spell","cookies") end
            if s.buildings[7]>0 and s.spirit~="baking" then Model.advancedAction(s,"spirit","baking") end
        end
        local bought=false
        if time%30==0 then nextBuy=choose() end
        while nextBuy and s.cookies>=nextBuy.cost do
            local ok
            if nextBuy.kind=="building" then ok=Model.trade(s,nextBuy.id,1,false)
            elseif nextBuy.kind=="upgrade" then ok=Model.buyUpgrade(s,nextBuy.id)
            elseif nextBuy.kind=="item" then
                ok=Model.economyAction(s,"item",nextBuy.id)
                if ok then assert(Model.economyAction(s,"collect",nextBuy.id)) end
            elseif nextBuy.kind=="decor" then ok=Model.economyAction(s,"buyDecor",nextBuy.id)
            else ok=Model.economyAction(s,"property",nextBuy.id) end
            assert(ok,"simulator quote mismatch")
            bought=true;nextBuy=choose()
        end
        for _,m in {{"Farm",s.buildings[3]>0},{"Bank",s.buildings[6]>0},{"Tower",s.buildings[8]>0},{"FinalBuilding",s.buildings[20]>0},{"Level3",Model.jobLevel(s)>=3},{"Level5",Model.jobLevel(s)>=5},{"10M",s.earned>=1e7},{"1T",s.earned>=1e12},{"Rebirth",Model.ascensionGain(s)>0}} do
            if m[2] and not milestones[m[1]] then milestones[m[1]]=time;print(name,m[1],time,"seconds") end
        end
        if rebirth and Model.ascensionGain(s)>=math.max(1,s.prestige) then
            local earned=s.earned
            -- A retained cursor boost helps the next bakery from its first tap.
            if s.heavenly.slot then
                for _,u in Model.Upgrades do
                    if u.click and s.upgrades[u.id] then
                        assert(Model.advancedAction(s,"permanent",u.id));break
                    end
                end
            end
            assert(Model.advancedAction(s,"ascend"))
            for _,boost in Model.HeavenlyBoosts do
                if not s.heavenly[boost.id] and s.chips>=boost.cost then Model.advancedAction(s,"heavenly",boost.id) end
            end
            print(name,"RESTART",time,"stars",s.prestige,"run earned",earned,"retained CPS",Model.cps(s))
            nextBuy=choose()
        end
        if time%(full and 86400 or 3600)==0 then print(name,"HOUR",time/3600,"earned",s.earned,"CPS",Model.cps(s),"click",Model.clickPower(s),"level",Model.jobLevel(s),"last building",s.buildings[20]) end
    end
end
if mode then
    simulate(mode,mode:find("boosted",1,true) and 8 or 2,true,(tonumber(days) or 7)*86400,mode:find("rebirth",1,true)~=nil,true)
    return
end
simulate("active",2,true,14400)
simulate("casual",.5,true,14400)
simulate("bakery_only",2,false,14400)
simulate("long_run",2,true,86400)
simulate("repeated_rebirth",2,true,86400,true)
