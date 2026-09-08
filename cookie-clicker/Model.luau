-- Cookie Clicker economy. Pure Luau: no services, rendering or wall clock.
local Model = {}
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
Model.Upgrades = {
	{ id = "fingers", name = "Reinforced index finger", description = "The mouse and cursors are twice as efficient.", price = 100, building = 1, required = 1, click = true },
	{ id = "cream", name = "Carpal tunnel prevention cream", description = "The mouse and cursors are twice as efficient.", price = 500, building = 1, required = 1, click = true },
	{ id = "ambidextrous", name = "Ambidextrous", description = "The mouse and cursors are twice as efficient.", price = 10000, building = 1, required = 10, click = true },
	{ id = "rolling", name = "Forwards from grandma", description = "Grandmas are twice as efficient.", price = 1000, building = 2, required = 1 },
	{ id = "steel", name = "Steel-plated rolling pins", description = "Grandmas are twice as efficient.", price = 5000, building = 2, required = 5 },
	{ id = "lubricated", name = "Lubricated dentures", description = "Grandmas are twice as efficient.", price = 50000, building = 2, required = 25 },
	{ id = "hoes", name = "Cheap hoes", description = "Farms are twice as efficient.", price = 11000, building = 3, required = 1 },
	{ id = "fertilizer", name = "Fertilizer", description = "Farms are twice as efficient.", price = 55000, building = 3, required = 5 },
	{ id = "picks", name = "Sugar gas", description = "Mines are twice as efficient.", price = 120000, building = 4, required = 1 },
	{ id = "conveyor", name = "Sturdier conveyor belts", description = "Factories are twice as efficient.", price = 1300000, building = 5, required = 1 },
}
local achievements = {
	{ "Wake and bake", "Bake 1 cookie.", "earned", 1 },
	{ "Making some dough", "Bake 1,000 cookies.", "earned", 1000 },
	{ "So baked right now", "Bake 100,000 cookies.", "earned", 100000 },
	{ "Fledgling bakery", "Bake 1 million cookies.", "earned", 1e6 },
	{ "Clicktastic", "Bake 1,000 cookies by clicking.", "handmade", 1000 },
}
Model.Achievements = achievements
function Model.new()
	return { version = 1, cookies = 0, earned = 0, handmade = 0, clicks = 0, buildings = table.create(#Model.Buildings, 0), upgrades = {}, achievements = {}, played = 0, bakery = "Your bakery", goldenClicks = 0 }
end
function Model.multiplier(state, building)
	local value = 1
	for _, upgrade in Model.Upgrades do
		if upgrade.building == building and state.upgrades[upgrade.id] then value *= 2 end
	end
	return value
end
function Model.cps(state)
	local value = 0
	for i, b in Model.Buildings do value += b.cps * state.buildings[i] * Model.multiplier(state, i) end
	return value
end
function Model.clickPower(state)
	local value = 1
	for _, u in Model.Upgrades do if u.click and state.upgrades[u.id] then value *= 2 end end
	return value
end
function Model.award(state, amount)
	if amount <= 0 or amount ~= amount or amount == math.huge then return end
	state.cookies += amount
	state.earned += amount
	for _, a in achievements do if state[a[3]] >= a[4] then state.achievements[a[1]] = true end end
end
function Model.click(state)
	local value = Model.clickPower(state)
	state.clicks += 1
	state.handmade += value
	Model.award(state, value)
	return value
end
function Model.tick(state, dt)
	if dt <= 0 or dt ~= dt or dt == math.huge then return end
	state.played += dt
	Model.award(state, Model.cps(state) * dt)
end
function Model.price(state, index, quantity, sell)
	local b = Model.Buildings[index]
	if not b or quantity < 1 or quantity % 1 ~= 0 or quantity > 100 then return math.huge end
	local owned = state.buildings[index]
	if sell then quantity = math.min(quantity, owned) end
	local total = 0
	for j = 0, quantity - 1 do
		local exponent = sell and (owned - j - 1) or (owned + j)
		total += b.price * 1.15 ^ exponent
	end
	return math.ceil(total * (sell and 0.25 or 1))
end
function Model.trade(state, index, quantity, sell)
	if not Model.Buildings[index] or (quantity ~= 1 and quantity ~= 10 and quantity ~= 100) then return false end
	local amount = sell and math.min(state.buildings[index], quantity) or quantity
	if amount == 0 then return false end
	-- The original quotes a rounded geometric sum but transacts each unit.
	-- Bulk buy buys as many as affordable, up to the selected quantity.
	local traded = 0
	for _ = 1, amount do
		local price = math.ceil(Model.Buildings[index].price * 1.15 ^ state.buildings[index])
		if sell then
			state.cookies += math.floor(price * 0.25)
			state.buildings[index] -= 1
			state.earned = math.max(state.earned, state.cookies)
		elseif price <= state.cookies then
			state.cookies -= price
			state.buildings[index] += 1
		else break end
		traded += 1
	end
	return traded > 0
end
function Model.buyUpgrade(state, id)
	for _, u in Model.Upgrades do
		if u.id == id and not state.upgrades[id] and state.buildings[u.building] >= u.required and state.cookies >= u.price then
			state.cookies -= u.price
			state.upgrades[id] = true
			return true
		end
	end
	return false
end
function Model.snapshot(state)
	local result = table.clone(state)
	result.buildings = table.clone(state.buildings)
	result.upgrades = table.clone(state.upgrades)
	result.achievements = table.clone(state.achievements)
	result.cps = Model.cps(state)
	result.clickPower = Model.clickPower(state)
	return result
end
return Model
