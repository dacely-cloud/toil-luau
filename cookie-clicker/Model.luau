-- Cookie Clicker economy. Pure Luau: no services, rendering or wall clock.
local Model = {}
Model.Balance=if script then require(script.Parent.BalanceConfig) else require("./BalanceConfig")
Model.Buildings = {
	{ name = "Cursor", price = 15, cps = 0.1, icon = "☝", color = "#cad6e2" },
	{ name = "Grandma", price = 100, cps = 1, icon = "♟", color = "#d5aebc" },
	{ name = "Farm", price = 1100, cps = 8, icon = "♣", color = "#82ae62" },
	{ name = "Mine", price = 12000, cps = 47, icon = "◆", color = "#9b9caa" },
	{ name = "Factory", price = 130000, cps = 260, icon = "▥", color = "#bc9273" },
	{ name = "Bank", price = 1.4e6, cps = 1400, icon = "▤", color = "#cdb97d" },
	{ name = "Temple", price = 20e6, cps = 7800, icon = "♜", color = "#b998c6" },
	{ name = "Wizard tower", price = 330e6, cps = 44000, icon = "✦", color = "#899cd3" },
	{ name = "Shipment", price = 5.1e9, cps = 260000, icon = "▲", color = "#abbcbf" },
	{ name = "Alchemy lab", price = 75e9, cps = 1.6e6, icon = "⚗", color = "#d1bd53" },
	{ name = "Portal", price = 1e12, cps = 10e6, icon = "◉", color = "#b481d5" },
	{ name = "Time machine", price = 14e12, cps = 65e6, icon = "◷", color = "#8fb9d2" },
	{ name = "Antimatter condenser", price = 170e12, cps = 430e6, icon = "✺", color = "#79b3b4" },
	{ name = "Prism", price = 2.1e15, cps = 2.9e9, icon = "△", color = "#dab4dc" },
	{ name = "Chancemaker", price = 26e15, cps = 21e9, icon = "♧", color = "#9acf9b" },
	{ name = "Fractal engine", price = 310e15, cps = 150e9, icon = "❖", color = "#cf81ab" },
	{ name = "Javascript console", price = 71e18, cps = 1.1e12, icon = ">_", color = "#83b698" },
	{ name = "Idleverse", price = 12e21, cps = 8.3e12, icon = "◎", color = "#92a8d3" },
	{ name = "Cortex baker", price = 1.9e24, cps = 64e12, icon = "♧", color = "#d2a0ad" },
	{ name = "You", price = 540e24, cps = 510e12, icon = "✧", color = "#d0bec8" },
}
-- Keep opening costs intact. Later tiers must take progressively more work,
-- instead of every new building resetting to the same one-hour payback.
for index,building in Model.Buildings do
    local payback=Model.Balance.MaxBuildingBasePayback*Model.Balance.BuildingPaybackGrowth^math.max(0,index-Model.Balance.BuildingPaybackGrowthStart)
    building.price=math.min(building.price,building.cps*payback)
end
Model.Upgrades = {
	{ id = "fingers", name = "Reinforced index finger", description = "The mouse and cursors are twice as efficient.", price = 100, building = 1, required = 1, click = true },
	{ id = "cream", name = "Carpal tunnel prevention cream", description = "The mouse and cursors are twice as efficient.", price = 500, building = 1, required = 1, click = true },
	{ id = "ambidextrous", name = "Ambidextrous", description = "The mouse and cursors are twice as efficient.", price = 2500, building = 1, required = 10, click = true },
	{ id = "rolling", name = "Forwards from grandma", description = "Grandmas are twice as efficient.", price = 1000, building = 2, required = 1 },
	{ id = "steel", name = "Steel-plated rolling pins", description = "Grandmas are twice as efficient.", price = 5000, building = 2, required = 5 },
	{ id = "lubricated", name = "Lubricated dentures", description = "Grandmas are twice as efficient.", price = 25000, building = 2, required = 25 },
	{ id = "hoes", name = "Cheap hoes", description = "Farms are twice as efficient.", price = 11000, building = 3, required = 1 },
	{ id = "fertilizer", name = "Fertilizer", description = "Farms are twice as efficient.", price = 55000, building = 3, required = 5 },
	{ id = "picks", name = "Sugar gas", description = "Mines are twice as efficient.", price = 120000, building = 4, required = 1 },
	{ id = "conveyor", name = "Sturdier conveyor belts", description = "Factories are twice as efficient.", price = 1300000, building = 5, required = 1 },
}
-- Kid-friendly progression for every building, retaining existing save IDs.
for i, building in Model.Buildings do
	for tier, required in {1,5,25,50,100} do
		local exists=false
		for _,u in Model.Upgrades do if u.building==i and u.required==required then exists=true;break end end
		if not exists then
            Model.Upgrades[#Model.Upgrades+1]={id="building_"..i.."_"..required,name="Better "..building.name.." "..tier,description="Makes twice as many cookies.",price=building.price*10*5^(tier-1),building=i,required=required,click=i==1}
		end
	end
end
-- Definitions are static. Production should visit only this building's upgrades,
-- not rescan every upgrade for every building on each click and server tick.
local upgradesByBuilding={}
local upgradesById={}
local clickUpgrades={}
for i=1,#Model.Buildings do upgradesByBuilding[i]={} end
for _,upgrade in Model.Upgrades do
    table.insert(upgradesByBuilding[upgrade.building],upgrade)
    upgradesById[upgrade.id]=upgrade
    if upgrade.click then table.insert(clickUpgrades,upgrade) end
end
local achievements = {
	{ "Wake and bake", "Bake 1 cookie.", "earned", 1 },
	{ "Making some dough", "Bake 1,000 cookies.", "earned", 1000 },
	{ "So baked right now", "Bake 100,000 cookies.", "earned", 100000 },
	{ "Fledgling bakery", "Bake 1 million cookies.", "earned", 1e6 },
	{ "Clicktastic", "Bake 1,000 cookies by clicking.", "handmade", 1000 },
}
for i,b in Model.Buildings do
	for _,count in {1,10,50,100} do achievements[#achievements+1]={b.name.." team "..count,"Own "..count.." "..b.name.." buildings.","buildings",count,i} end
end
for _,count in {100,10000,100000} do achievements[#achievements+1]={"Cookie tapper "..count,"Click "..count.." times.","clicks",count} end
Model.Achievements = achievements
function Model.new()
	local state = { version = 1, cookies = 0, earned = 0, handmade = 0, clicks = 0, buildings = table.create(#Model.Buildings, 0), upgrades = {}, achievements = {}, played = 0, bakery = "Your bakery", goldenClicks = 0, goldenAt = 75, goldenId = 0, goldenUntil = 0, frenzyUntil = 0, soundEnabled = true, soundVolume = 100 }
	if Model.initAdvanced then Model.initAdvanced(state) end
	if Model.initEconomy then Model.initEconomy(state) end
	return state
end
function Model.multiplier(state, building)
	local value = 1
	for _, upgrade in upgradesByBuilding[building] or {} do
		if state.upgrades[upgrade.id] then value *= 2 end
	end
	return value * (1+((state.levels and state.levels[building]) or 0)*.01)
end
function Model.friendMultiplier(state)
    return 1+(state.friendCount or 0)*.01
end
function Model.milkBonus(state)
    local count=0
    for _,earned in state.achievements do if earned==true then count+=1 end end
    return math.floor(count/5),count%5
end
function Model.milkMultiplier(state)
    return 1+Model.milkBonus(state)*.01
end
local function clickProduction(state, excludeCursors)
	local value = 0
	for i, b in Model.Buildings do if not excludeCursors or i~=1 then value += b.cps * state.buildings[i] * Model.multiplier(state, i) end end
	local retained=state.buddies and state.buildings[2]>=10 and (1-#state.wrinklers*.05) or 1
	return value * retained * Model.productionFactor(state) * Model.friendMultiplier(state) * Model.passFactor(state,"CookieGain") * ((state.frenzyUntil or 0)>state.played and 2 or 1) * ((state.gardenBoostUntil or 0)>state.played and 1.05 or 1) + Model.propertyIncome(state)
end
-- Fifty staggered groups, regardless of ownership. Count crossed tap boundaries
-- arithmetically: an offline catch-up or 10,000 cursors never loops over taps.
-- A full-strength tap every ten seconds preserves the original 0.1 CPS
-- opening rate, while upgraded click power still increases cursor rewards.
Model.CursorPeriod = 10
Model.CursorVisualLimit = 50
function Model.cursorTaps(count, from, to)
    local function total(time)
        local step=math.floor(math.max(0,time)*50/Model.CursorPeriod+1e-8)
        local remainder=step%50
        return math.floor(step/50)*count+remainder*math.floor(count/50)+math.min(remainder,count%50)
    end
    return total(to)-total(from)
end
function Model.cps(state)
    -- Cursor production is replaced by actual taps. The old base production
    -- remains the input to click scaling so automatic income cannot recurse.
    return clickProduction(state,true)+state.buildings[1]*Model.clickPower(state)/Model.CursorPeriod
end
function Model.setVolume(state,percent)
	if type(percent)~="number" or percent~=percent or percent<0 or percent>100 or percent%1~=0 then return false end
	state.soundVolume=percent
	return true
end
function Model.baseClickPower(state)
	local value = 1
	for _, u in clickUpgrades do if state.upgrades[u.id] then value *= 2 end end
	return value * Model.heavenlyFactor(state,"tapping") * (state.spirit=="clicking" and 1.1 or 1)*(1+Model.empireBonus(state))*Model.passFactor(state,"CookieGain")
end
function Model.clickPower(state,cps)
    local tapping=Model.heavenlyFactor(state,"tapping")*(state.spirit=="clicking" and 1.1 or 1)
    local share=Model.Balance.ClickProductionShare
    for _,u in clickUpgrades do if state.upgrades[u.id] then share+=Model.Balance.ClickUpgradeShare end end
    local production=clickProduction(state)
    -- Wrinklers hold passive cookies only; arriving or feeding must not nerf taps.
    if state.buddies and state.buildings[2]>=10 and #state.wrinklers>0 then
        local property=Model.propertyIncome(state)
        production=property+(production-property)/(1-#state.wrinklers*.05)
    end
    return Model.baseClickPower(state)+production*share*tapping
end
function Model.checkAchievements(state)
	for _,a in achievements do
		local progress=a[5] and state.buildings[a[5]] or state[a[3]]
		if type(progress)=="number" and progress>=a[4] then state.achievements[a[1]]=true end
	end
end
function Model.award(state, amount)
	if amount <= 0 or amount ~= amount or amount == math.huge then return end
	state.cookies += amount
	state.earned += amount
	Model.checkAchievements(state)
end
function Model.click(state)
	local value = Model.clickPower(state)
	state.clicks += 1
    local economy=state.economy
    economy.tapXpProgress=(economy.tapXpProgress or 0)+1
    if economy.tapXpProgress>=10 then
        economy.tapXpProgress-=10;economy.xp=math.min(1e15,economy.xp+1)
    end
	state.handmade += value
	Model.award(state, value)
	return value
end
-- `offline` marks the single catch-up tick a save runs on load, so the parts
-- of the simulation that must not advance while nobody is playing can opt out.
function Model.tick(state, dt, offline)
	if dt <= 0 or dt ~= dt or dt == math.huge then return end
    local startTime=state.played
    local finish=startTime+dt
    local cursorAmount=0
    if state.buildings[1]>0 and Model.cursorTaps(state.buildings[1],startTime,finish)>0 then
        -- At most three intervals, even across hours of offline time. Freeze the
        -- current upgrades and split temporary bonuses at their expiry.
        local sample=table.clone(state)
        local points={startTime,finish}
        for _,boundary in {state.frenzyUntil or 0,state.gardenBoostUntil or 0} do
            if boundary>startTime and boundary<finish then table.insert(points,boundary) end
        end
        table.sort(points)
        for i=2,#points do
            sample.played=(points[i-1]+points[i])*.5
            cursorAmount+=Model.cursorTaps(state.buildings[1],points[i-1],points[i])*Model.clickPower(sample)
        end
    end
	state.played += dt
	-- Split production at the bonus boundary so a long tick cannot extend it.
	local base=0
	for i,b in Model.Buildings do if i~=1 then base+=b.cps*state.buildings[i]*Model.multiplier(state,i) end end
	base*=Model.productionFactor(state)*Model.friendMultiplier(state)*Model.passFactor(state,"CookieGain")
    -- Capture building bonuses before property rewards can unlock new badges.
    Model.economyTick(state,dt,offline)
    Model.advancedTick(state,dt,base)
    local start=state.played-dt
    local amount=Model.feedWrinklers(state,dt,function(from,to)
        local first,last=start+from,start+to
        local duration=to-from
        local frenzy=math.clamp((state.frenzyUntil or 0)-first,0,duration)
        local garden=math.clamp(state.gardenBoostUntil-first,0,duration)
        local both=math.clamp(math.min(state.gardenBoostUntil,state.frenzyUntil or 0)-first,0,duration)
        return base*(duration+frenzy+.05*(garden+both))
    end)
	Model.award(state,amount+cursorAmount)
end
function Model.price(state, index, quantity, sell)
	local b = Model.Buildings[index]
	if not b or quantity < 1 or quantity % 1 ~= 0 or quantity > 100 then return math.huge end
	local owned = state.buildings[index]
	if sell then quantity = math.min(quantity, owned) end
	local total = 0
	for j = 0, quantity - 1 do
		local exponent = sell and (owned - j - 1) or (owned + j)
        local unit=b.price*1.15^exponent
		total += sell and math.floor(unit*.25) or math.ceil(unit)
	end
	return total
end
function Model.trade(state, index, quantity, sell)
	if not Model.Buildings[index] or (quantity ~= 1 and quantity ~= 10 and quantity ~= 100) then return false end
	local amount = sell and math.min(state.buildings[index], quantity) or quantity
	if amount == 0 then return false end
	-- Quote and charge the same per-unit rounding. Bulk buys remain bounded by funds.
	local traded = 0
	for _ = 1, amount do
		local unit=Model.Buildings[index].price*1.15^(state.buildings[index]-(sell and 1 or 0))
		local price=math.ceil(unit)
		if sell then
			state.cookies += math.floor(unit * 0.25)
			state.buildings[index] -= 1
		elseif price <= state.cookies+(price>=1e12 and price*1e-14 or 0) then
            -- At late-game magnitudes doubles lose individual-cookie precision.
            -- Absorb only rounding noise so an exactly quoted bulk order completes.
			state.cookies = math.max(0,state.cookies-price)
			state.buildings[index] += 1
		else break end
		traded += 1
	end
	local xp=not sell and traded>0 and Model.buildingPurchaseXp(state,index) or 0
	Model.checkAchievements(state)
	return traded > 0,xp
end
function Model.buyUpgrade(state, id)
    local u=upgradesById[id]
		if u and not state.upgrades[id] and state.buildings[u.building] >= u.required and state.cookies >= u.price then
			state.cookies -= u.price
			state.upgrades[id] = true
			return true,Model.upgradePurchaseXp(state,id)
		end
	return false
end
function Model.spawnGolden(state)
    state.goldenId=(state.goldenId or 0)+1
    state.goldenDuration=8+(state.goldenId*7)%9
    state.goldenStarted=state.played
    state.goldenX=.1+((state.goldenId*37)%81)/100
    state.goldenUntil=state.played+state.goldenDuration
    state.goldenAt=state.played+75+(state.goldenId%4)*10
end
function Model.goldenTick(state)
    if state.played >= (state.goldenAt or 75) then Model.spawnGolden(state) end
end
function Model.collectGolden(state,id)
	if id~=state.goldenId or (state.goldenUntil or 0)<=state.played then return nil end
	state.goldenUntil=0
	state.goldenClicks+=1
	local huntMessage=""
	if state.season~="none" then
		state.seasonCookies+=1
		if state.seasonCookies%5==0 then
            local bonus=math.max(500,Model.cps(state)*120)
            Model.award(state,bonus)
            huntMessage=" Hunt reward: +"..math.floor(bonus).." cookies!"
        end
	end
	if state.goldenClicks%2==0 then
		state.frenzyUntil=state.played+30
		return "Double baking for 30 seconds!"..huntMessage
	end
    local rate=Model.cps(state)
    -- Hoarding purchased/offline cookies must not compound without limit.
	local reward=math.max(25,math.floor(rate*60+math.min(state.cookies*.1,rate*120)))
	if state.spirit=="luck" then reward=math.floor(reward*1.2) end
	Model.award(state,reward)
	return "Lucky cookie! You got "..reward.." extra cookies!"..huntMessage
end
function Model.snapshot(state,forClient)
	local function copy(value)
		if type(value)~="table" then return value end
		local result={};for k,v in value do if not (forClient and value==state and k=="purchaseReceipts") then result[k]=copy(v) end end;return result
	end
	local result = copy(state)
	result.cps = Model.cps(state)
	result.clickPower = Model.clickPower(state,result.cps)
	return result
end
local installLateGame
if script then installLateGame=require(script.Parent.LateGame) else installLateGame=require("./LateGame") end
installLateGame(Model)
local installEconomy
if script then installEconomy=require(script.Parent.Economy) else installEconomy=require("./Economy") end
installEconomy(Model)
local installSocial
if script then installSocial=require(script.Parent.Social) else installSocial=require("./Social") end
installSocial(Model)
local installMonetization,monetizationConfig
if script then
    installMonetization=require(script.Parent.Monetization)
    monetizationConfig=require(script.Parent:FindFirstChild("LiveMonetizationConfig") or script.Parent.MonetizationConfig)
else
    installMonetization=require("./Monetization")
    monetizationConfig=require("./MonetizationConfig")
end
installMonetization(Model,monetizationConfig)
return Model
