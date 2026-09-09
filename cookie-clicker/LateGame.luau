-- Simplified, server-owned late-game rules for the kid-friendly edition.
return function(Model)
    Model.HeavenlyBoosts={
        {id="baking",name="Star ovens",description="+10% building baking",icon="CookieBoost",cost=3,stat="baking",factor=1.1},
        {id="tapping",name="Star fingers",description="+10% cookies per tap",icon="CursorCookie",cost=3,stat="tapping",factor=1.1},
        {id="energy",name="Full of energy",description="Energy refills 20% faster",icon="CookieFestival",cost=8,stat="energy",factor=1.2},
        {id="stamina",name="Ready to help",description="Stamina refills 20% faster",icon="CookieJar",cost=8,stat="stamina",factor=1.2},
        {id="slot",name="Keep a favorite",description="Keep one regular boost on rebirth",icon="Stars",cost=10},
        {id="jobs",name="Star worker",description="+25% job cookies",icon="CookieFestival",cost=15,stat="jobs",factor=1.25},
        {id="property",name="Star shops",description="+25% property income",icon="CookieStand",cost=15,stat="property",factor=1.25},
        {id="baking2",name="Galaxy ovens",description="Another +25% building baking",icon="CookieBoost",cost=25,stat="baking",factor=1.25,requires="baking"},
        {id="tapping2",name="Galaxy fingers",description="Another +25% cookies per tap",icon="CursorCookie",cost=25,stat="tapping",factor=1.25,requires="tapping"},
    }
    local boostsById,boostsByStat={},{}
    for _,boost in Model.HeavenlyBoosts do
        boostsById[boost.id]=boost
        if boost.stat then
            boostsByStat[boost.stat]=boostsByStat[boost.stat] or {}
            table.insert(boostsByStat[boost.stat],boost)
        end
    end
    function Model.heavenlyFactor(s,stat)
        local factor=1
        for _,boost in boostsByStat[stat] or {} do
            if s.heavenly and s.heavenly[boost.id] then factor*=boost.factor end
        end
        return factor
    end
	local function finite(n) return type(n)=="number" and n==n and n>=0 and n<math.huge end
	local function int(n) return finite(n) and math.floor(n) or 0 end
	function Model.initAdvanced(s)
		s.pastEarned=0;s.prestige=0;s.chips=0;s.heavenly={};s.lumps=0;s.lumpTime=0
		s.levels=table.create(#Model.Buildings,0);s.buddyBank=0;s.buddies=false
        s.wrinklers={};s.wrinklerSequence=0;s.wrinklerTime=0
		s.gardenReady=0;s.gardenBoostUntil=0;s.stocks={0,0,0};s.stockCosts={0,0,0};s.spirit="none";s.spiritChanged=-60
		s.magic=0;s.season="none";s.seasonCookies=0;s.permanentUpgrade=""
	end
	function Model.restoreAdvanced(s,data)
		for _,key in {"pastEarned","prestige","chips","lumps","lumpTime","buddyBank","magic","seasonCookies","gardenReady","gardenBoostUntil","spiritChanged","frenzyUntil"} do if finite(data[key]) then s[key]=data[key] end end
		s.prestige=int(s.prestige);s.chips=math.min(int(s.chips),s.prestige);s.lumps=int(s.lumps);s.magic=math.min(100,s.magic)
		for i=1,#Model.Buildings do s.levels[i]=math.min(100,int(type(data.levels)=="table" and data.levels[i])) end
		for i=1,3 do
            s.stocks[i]=math.min(10000,int(type(data.stocks)=="table" and data.stocks[i]))
            local cost=type(data.stockCosts)=="table" and data.stockCosts[i]
            -- Older saves have no cost basis. Start at today's value rather than
            -- treating their entire inventory as free, newly baked cookies.
            s.stockCosts[i]=s.stocks[i]>0 and (finite(cost) and cost or s.stocks[i]*Model.stockPrice(s,i)) or 0
        end
        for _,boost in Model.HeavenlyBoosts do if type(data.heavenly)=="table" and data.heavenly[boost.id]==true then s.heavenly[boost.id]=true end end
		if data.spirit=="baking" or data.spirit=="clicking" or data.spirit=="luck" then s.spirit=data.spirit end
		if data.season=="winter" or data.season=="spring" then s.season=data.season end
		s.buddies=data.buddies==true and s.buildings[2]>=10
        s.wrinklerSequence=math.min(1e12,int(data.wrinklerSequence))
        s.wrinklerTime=math.min(60,finite(data.wrinklerTime) and data.wrinklerTime or 0)
        local seen={}
        if type(data.wrinklers)=="table" then
            for i=1,10 do
                local w=data.wrinklers[i]
                if type(w)=="table" and finite(w.id) and w.id%1==0 and w.id>0 and w.id<=1e12 and not seen[w.id] and finite(w.bank) then
                    seen[w.id]=true;s.wrinklerSequence=math.max(s.wrinklerSequence,w.id)
                    table.insert(s.wrinklers,{id=w.id,bank=math.min(1e100,w.bank)})
                end
            end
        elseif s.buddyBank>0 and s.wrinklerSequence<1e12 then
            s.wrinklerSequence+=1
            table.insert(s.wrinklers,{id=s.wrinklerSequence,bank=math.min(1e100,s.buddyBank)})
        end
        s.buddyBank=0;for _,w in s.wrinklers do s.buddyBank+=w.bank end
		for _,u in Model.Upgrades do if u.id==data.permanentUpgrade and s.heavenly.slot then s.permanentUpgrade=u.id end end
	end
    local function spawnWrinkler(s)
        if #s.wrinklers>=10 or s.wrinklerSequence>=1e12 then return end
        s.wrinklerSequence+=1
        table.insert(s.wrinklers,{id=s.wrinklerSequence,bank=0})
    end
    function Model.feedWrinklers(s,dt,production)
        local elapsed,earned=0,0
        local feeding=s.buddies and s.buildings[2]>=10
        if not feeding then return production(0,dt) end
        while elapsed<dt do
            local step=dt-elapsed
            if feeding and #s.wrinklers<10 and s.wrinklerSequence<1e12 then step=math.min(step,60-s.wrinklerTime) end
            local amount=production(elapsed,elapsed+step)
            if feeding then
                local held=amount*.05
                for _,w in s.wrinklers do w.bank+=held end
                amount-=held*#s.wrinklers
            end
            earned+=amount;elapsed+=step
            if feeding and #s.wrinklers<10 and s.wrinklerSequence<1e12 then
                s.wrinklerTime+=step
                if s.wrinklerTime>=60 then s.wrinklerTime=0;spawnWrinkler(s) end
            end
        end
        s.buddyBank=0;for _,w in s.wrinklers do s.buddyBank+=w.bank end
        return earned
    end
    function Model.starMultiplier(stars)
        stars=math.max(0,stars or 0)
        local cap=Model.Balance.StarBonusSoftcap
        -- Preserve opening rewards; taper later gains without removing stars/chips.
        local effective=stars<=cap and stars or cap*(1+math.log(stars/cap))
        return 1+effective*Model.Balance.StarProductionBonus
    end
	function Model.productionFactor(s)
		return Model.starMultiplier(s.prestige)*Model.heavenlyFactor(s,"baking")*(s.spirit=="baking" and 1.1 or 1)*(1+Model.empireBonus(s))*Model.milkMultiplier(s)*Model.collectionBonus(s)*Model.decorBonus(s)
	end
    function Model.starGoal(stars)
        return stars^Model.Balance.RebirthExponent*Model.Balance.RebirthCookies
    end
	function Model.ascensionGain(s)
        local total=s.pastEarned+s.earned
        local stars=math.floor((total/Model.Balance.RebirthCookies)^(1/Model.Balance.RebirthExponent))
        -- Correct root rounding at exact thresholds without granting early chips.
        if Model.starGoal(stars)>total then stars-=1
        elseif Model.starGoal(stars+1)<=total then stars+=1 end
		return math.max(0,stars-s.prestige)
	end
	function Model.stockPrice(s,index)
		return math.floor(100*(index+1)*(1+.25*math.sin(math.floor(s.played/30)*.7+index)))
	end
	function Model.advancedTick(s,dt,base)
		s.lumpTime+=dt
		if s.earned>=1e6 then
			local grown=math.floor(s.lumpTime/Model.Balance.SugarLumpSeconds)
			s.lumps+=grown;s.lumpTime-=grown*Model.Balance.SugarLumpSeconds
		else s.lumpTime=0 end
		if s.buildings[8]>0 then s.magic=math.min(100,s.magic+dt) end
		local gardenSeconds=math.clamp(s.gardenBoostUntil-(s.played-dt),0,dt)
		local overlap=math.clamp(math.min(s.gardenBoostUntil,s.frenzyUntil or 0)-(s.played-dt),0,dt)
		local extra=base*(gardenSeconds+overlap)*.05
		return extra
	end
	function Model.advancedAction(s,action,arg)
		if action=="ascend" then
			local gain=Model.ascensionGain(s)
			if gain<1 then return false,"Reach the next star goal before rebirthing." end
			local fresh=Model.new()
			fresh.pastEarned=s.pastEarned+s.earned;fresh.prestige=s.prestige+gain;fresh.chips=s.chips+gain
			for _,key in {"heavenly","lumps","lumpTime","levels","permanentUpgrade","economy","customName","bakery","soundEnabled","soundVolume","reducedMotion","achievements","wrinklerSequence","goldenId","friendCount","passes","purchaseReceipts","shieldUntil"} do fresh[key]=s[key] end
			if fresh.permanentUpgrade~="" then fresh.upgrades[fresh.permanentUpgrade]=true end
			for key in s do s[key]=nil end;for key,value in fresh do s[key]=value end
			return true,"A fresh bakery! You earned "..gain.." star chips and a lasting baking boost."
		elseif action=="heavenly" then
            local boost=boostsById[arg];local cost=boost and boost.cost
			if not cost or s.heavenly[arg] or s.chips<cost then return false,"You need more star chips, or already own this." end
            if boost.requires and not s.heavenly[boost.requires] then return false,"Buy "..boostsById[boost.requires].name.." first." end
			s.chips-=cost;s.heavenly[arg]=true;return true,"Your permanent boost is ready!"
		elseif action=="permanent" then
			if not s.heavenly.slot or not s.upgrades[arg] then return false,"Buy a permanent slot, then choose a boost you own." end
			s.permanentUpgrade=arg;return true,"This boost will stay after you start a new bakery."
		elseif action=="level" then
			if type(arg)~="number" or arg%1~=0 or not s.levels[arg] or s.buildings[arg]<1 then return false,"Buy this building first." end
			if s.levels[arg]>=100 then return false,"This building is at the highest level." end
			local cost=s.levels[arg]+1
			if s.lumps<cost then return false,"You need "..cost.." sugar lumps." end
			s.lumps-=cost;s.levels[arg]+=1;return true,"Building leveled up! It bakes 1% more cookies."
        elseif action=="buddies" then
            if s.buildings[2]<10 then return false,"Own 10 grandmas to meet wrinklers." end
            s.buddies=not s.buddies
            if s.buddies and #s.wrinklers==0 then spawnWrinkler(s);s.wrinklerTime=0 end
            return true,s.buddies and "Wrinklers save cookies. Pop one to get 10% extra!" or "Wrinklers are resting. Their saved cookies are safe."
        elseif action=="popWrinkler" then
            if not finite(arg) or arg%1~=0 then return false,"Choose a wrinkler." end
            for i,w in s.wrinklers do
                if w.id==arg then
                    local amount=w.bank*1.1
                    table.remove(s.wrinklers,i);s.buddyBank=math.max(0,s.buddyBank-w.bank)
                    Model.award(s,amount)
                    return true,"Pop! +"..math.floor(amount).." cookies!"
                end
            end
            return false,"That wrinkler was already collected."
        elseif action=="collectBuddies" then
            if s.buddyBank<=0 then return false,"Your wrinklers have not saved any cookies yet." end
            local amount=s.buddyBank*1.1;s.buddyBank=0;s.wrinklers={};s.wrinklerTime=0
            Model.award(s,amount);return true,"Wrinklers returned "..math.floor(amount).." cookies!"
		elseif action=="plant" then
			if s.buildings[3]<1 or s.lumps<1 or s.gardenReady>0 then return false,"Own a farm and use 1 sugar lump to plant an empty garden." end
			s.lumps-=1;s.gardenReady=s.played+60;return true,"Seeds planted! Come back in one minute."
		elseif action=="harvest" then
			if s.gardenReady<=0 or s.played<s.gardenReady then return false,"Your garden is still growing." end
			s.gardenReady=0;s.gardenBoostUntil=s.played+600;return true,"Harvest time! Bake 5% more cookies for 10 minutes."
		elseif action=="stockBuy" or action=="stockSell" then
            local index,quantity=arg,1
            if type(arg)=="table" then index=arg.index;quantity=arg.quantity end
            if not finite(index) or index%1~=0 or index<1 or index>3 or s.buildings[6]<1 then return false,"Buy a bank to open the ingredient market." end
            if not finite(quantity) or quantity%1~=0 or quantity<1 or quantity>1000 then return false,"Choose between 1 and 1,000 ingredients." end
			local price=Model.stockPrice(s,index)
			if action=="stockBuy" then
                local total=price*quantity
				if s.cookies<total or s.stocks[index]+quantity>10000 then return false,"Not enough cookies or pantry space for that many." end
				s.cookies-=total;s.stocks[index]+=quantity;s.stockCosts[index]+=total;return true,"Bought "..quantity.." ingredients for "..total.." cookies."
			end
			if s.stocks[index]<quantity then return false,"You do not own that many ingredients yet." end
            local total=math.floor(price*.9)*quantity
            local basis=s.stockCosts[index]*quantity/s.stocks[index]
            local profit=math.max(0,total-basis)
            s.stockCosts[index]=math.max(0,s.stockCosts[index]-basis)
			s.stocks[index]-=quantity
            if s.stocks[index]==0 then s.stockCosts[index]=0 end
            s.cookies+=total-profit
            Model.award(s,profit)
            return true,"Sold "..quantity.." ingredients for "..total.." cookies."
		elseif action=="spirit" then
			if s.buildings[7]<1 or (arg~="baking" and arg~="clicking" and arg~="luck") then return false,"Buy a temple to choose a helper." end
			if s.played-s.spiritChanged<60 then return false,"Wait one minute before changing helpers." end
			s.spirit=arg;s.spiritChanged=s.played;return true,"Your "..arg.." helper is ready!"
		elseif action=="spell" then
			local cost=arg=="lucky" and 40 or arg=="cookies" and 60
			if not cost or s.buildings[8]<1 or s.magic<cost then return false,"Buy a wizard tower and let your magic recharge." end
			s.magic-=cost
			if arg=="lucky" then Model.spawnGolden(s);return true,"A lucky cookie appeared!" end
			Model.award(s,math.max(10,Model.cps(s)*60));return true,"Magic baked a minute of extra cookies!"
		elseif action=="season" then
			if arg~="winter" and arg~="spring" and arg~="none" then return false,"Choose a season from the menu." end
			s.season=arg;return true,arg=="none" and "Back to your everyday bakery." or "The "..arg.." cookie hunt has started! Lucky cookies count toward your collection."
		end
		return false,"That action is not available."
	end
end
