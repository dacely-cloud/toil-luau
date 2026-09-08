-- Simplified, server-owned late-game rules for the kid-friendly edition.
return function(Model)
	local function finite(n) return type(n)=="number" and n==n and n>=0 and n<math.huge end
	local function int(n) return finite(n) and math.floor(n) or 0 end
	function Model.initAdvanced(s)
		s.pastEarned=0;s.prestige=0;s.chips=0;s.heavenly={};s.lumps=0;s.lumpTime=0
		s.levels=table.create(#Model.Buildings,0);s.buddyBank=0;s.buddies=false
        s.wrinklers={};s.wrinklerSequence=0;s.wrinklerTime=0
		s.gardenReady=0;s.gardenBoostUntil=0;s.stocks={0,0,0};s.spirit="none";s.spiritChanged=-60
		s.magic=0;s.season="none";s.seasonCookies=0;s.permanentUpgrade=""
	end
	function Model.restoreAdvanced(s,data)
		for _,key in {"pastEarned","prestige","chips","lumps","lumpTime","buddyBank","magic","seasonCookies","gardenReady","gardenBoostUntil","spiritChanged","frenzyUntil"} do if finite(data[key]) then s[key]=data[key] end end
		s.prestige=int(s.prestige);s.chips=math.min(int(s.chips),s.prestige);s.lumps=int(s.lumps);s.magic=math.min(100,s.magic)
		for i=1,#Model.Buildings do s.levels[i]=math.min(100,int(type(data.levels)=="table" and data.levels[i])) end
		for i=1,3 do s.stocks[i]=math.min(10000,int(type(data.stocks)=="table" and data.stocks[i])) end
		for _,key in {"baking","tapping","slot"} do if type(data.heavenly)=="table" and data.heavenly[key]==true then s.heavenly[key]=true end end
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
	function Model.productionFactor(s)
		return (1+(s.prestige or 0)*.01)*(s.heavenly and s.heavenly.baking and 1.1 or 1)*(s.spirit=="baking" and 1.1 or 1)*(1+Model.empireBonus(s))
	end
	function Model.ascensionGain(s)
		return math.max(0,math.floor(((s.pastEarned+s.earned)/1e12)^(1/3))-s.prestige)
	end
	function Model.stockPrice(s,index)
		return math.floor(100*(index+1)*(1+.25*math.sin(math.floor(s.played/30)*.7+index)))
	end
	function Model.advancedTick(s,dt,base)
		s.lumpTime+=dt
		if s.earned>=1e6 then
			local grown=math.floor(s.lumpTime/(20*3600))
			s.lumps+=grown;s.lumpTime-=grown*20*3600
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
			if gain<1 then return false,"Bake a trillion cookies to start your next bakery." end
			local fresh=Model.new()
			fresh.pastEarned=s.pastEarned+s.earned;fresh.prestige=s.prestige+gain;fresh.chips=s.chips+gain
			for _,key in {"heavenly","lumps","lumpTime","levels","permanentUpgrade","economy","customName","bakery","soundEnabled","soundVolume","reducedMotion","achievements","wrinklerSequence","goldenId","friendCount"} do fresh[key]=s[key] end
			if fresh.permanentUpgrade~="" then fresh.upgrades[fresh.permanentUpgrade]=true end
			for key in s do s[key]=nil end;for key,value in fresh do s[key]=value end
			return true,"A fresh bakery! You earned "..gain.." star chips and a lasting baking boost."
		elseif action=="heavenly" then
			local costs={baking=1,tapping=1,slot=3};local cost=costs[arg]
			if not cost or s.heavenly[arg] or s.chips<cost then return false,"You need more star chips, or already own this." end
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
			if s.buildings[6]<1 or type(arg)~="number" or arg%1~=0 or arg<1 or arg>3 then return false,"Buy a bank to open the ingredient market." end
			local price=Model.stockPrice(s,arg)
			if action=="stockBuy" then
				if s.cookies<price or s.stocks[arg]>=10000 then return false,"Not enough cookies, or your pantry is full." end
				s.cookies-=price;s.stocks[arg]+=1;return true,"Ingredient bought. Prices change every 30 seconds."
			end
			if s.stocks[arg]<1 then return false,"You do not own this ingredient yet." end
			s.stocks[arg]-=1;Model.award(s,math.floor(price*.9));return true,"Ingredient sold for "..math.floor(price*.9).." cookies."
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
