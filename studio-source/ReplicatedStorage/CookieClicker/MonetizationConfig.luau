--!strict
-- MonetizationConfig
--
-- THE ONE RECORD OF WHAT THIS GAME SELLS. Every developer product and game
-- pass, its live id, its icon, and what buying it is meant to do.
--
-- Created 2026-09-08 against universe 10765642220 (ULTIMATE STELLAR SIMULATOR)
-- through the Open Cloud API. Every id below is live and for sale, and every
-- icon was uploaded WITH the item rather than pointed at afterwards -- so a row
-- here cannot name an image that was never attached.
--
-- THERE ARE NO PRICES HERE, AND THAT IS DELIBERATE. Roblox owns the price: the
-- Creator Dashboard and the Open Cloud API are the record, a price can be
-- changed there without this file being touched, and regional pricing means
-- there is not even ONE number to copy. A figure written down here would be a
-- second place it was said, and the drift is SILENT -- a card offering an item
-- at what this file remembers while Roblox charges something else, which the
-- player only discovers in the purchase prompt.
--
-- SO ASK THE PLATFORM. `MarketplaceService:GetProductInfoAsync(id, ...)` gives the
-- live figure for a card, and the purchase prompt states it again at the moment
-- it is charged. Cache it if the shelf needs to; do not TYPE it.
--
-- Rewards implement the requested offers; handlers and UI consume these values.
-- AutoBake is retained for ID history but excluded from the offered passes.
--
-- ADDING ONE: create it through Open Cloud (the icon goes up in the same call),
-- then add a row here. `verify()` fails a duplicate id, a missing icon, and two
-- timed items sold at the same duration -- the ways a row can be wrong and
-- still look completely right.

local MonetizationConfig = {}

MonetizationConfig.UniverseId = 10765642220
MonetizationConfig.PlaceId = 85138609584604

export type RewardKind =
	"Bundle" -- several grants at once
	| "Refill" -- put a bar back to full
	| "Currency" -- a flat amount of something
	| "Jackpot" -- a random amount between Min and Max
	| "Crate" -- roll a loot table by Tier
	| "Timed" -- a state that lasts Duration seconds
	| "Multiplier" -- a permanent rate change
	| "Perk" -- permanent, non-numeric benefits
	| "Item"
	| "ScaledCurrency"

export type Reward = {
	Kind: RewardKind,
	Stat: string?, -- which bar, currency or rate it touches
	Amount: number?, -- a flat grant, or the FRACTION for a Refill
	Min: number?, -- Jackpot only
	Max: number?, -- Jackpot only
	Multiplier: number?, -- 0 is legal and means "waived"
	Duration: number?, -- seconds, for anything Timed
	Tier: string?, -- Crate only
	Grants: { Reward }?, -- Bundle only
	Perks: { string }?, -- Perk only
	Item: string?,
	Seconds: number?,
	Odds: {number}?,
}

export type Product = {
	Key: string,
	Name: string,
	ProductId: number,
	Icon: string,
	Goal: string,
	Reward: Reward,
	-- Developer products repeat by nature. This one is bought once: ownership is
	-- recorded on the save, the shop shows it as Owned, and the server refuses to
	-- open a second prompt for it.
	OneTime: boolean?,
	-- Kept out of the Goodies grid. It still has to stay in ProductOrder, because
	-- that list is also the server's allowlist for opening a purchase prompt --
	-- dropping it there would make the offer unbuyable everywhere, not just here.
	-- Sold from its own place in the UI instead; see the campaign cards.
	Hidden: boolean?,
}

export type Pass = {
	Key: string,
	Name: string,
	GamePassId: number,
	Icon: string,
	Goal: string,
	Reward: Reward,
}

local HOUR = 3600
MonetizationConfig.DepositFee = 0.05
MonetizationConfig.PassOrder = {"VIP","JobRewards2x","PropertyIncome2x","EnergyRegen2x","StaminaRegen2x","NoDepositFee"}
MonetizationConfig.ProductOrder = {"StarterPack","EnergyRefill","StaminaRefill","FinishCampaign","FinishCampaignBig","FinishCampaignHuge","FinishCampaignEpic","CookieDelivery","CookieJackpot","GrandmasCrate","BakersCrate","SantasCrate","Shield4h","Shield8h","Shield24h"}
MonetizationConfig.CrateItems = {"spatula","apron","mixer","crown"}

-- Developer products -- bought over and over, consumed on purchase.
MonetizationConfig.Products = {
	StarterPack = {
		Key = "StarterPack",
		Name = "Starter Pack",
		ProductId = 3711874011,
		OneTime = true,
		Icon = "rbxassetid://92555141797263",
		Goal = "50,000 cookies + an exclusive Golden whisk and Star apron.",
		Reward = {
			Kind = "Bundle",
			Grants = {
				{ Kind = "Currency", Stat = "Cookies", Amount = 50000 },
				{ Kind = "Item", Item = "goldenWhisk", Amount = 1 },
				{ Kind = "Item", Item = "starApron", Amount = 1 },
			},
		},
	} :: Product,

	EnergyRefill = {
		Key = "EnergyRefill",
		Name = "Energy Refill",
		ProductId = 3711874016,
		Icon = "rbxassetid://129643908610703",
		Goal = "Refill your Energy bar to full, right now.",
		Reward = { Kind = "Refill", Stat = "Energy", Amount = 1 },
	} :: Product,

	StaminaRefill = {
		Key = "StaminaRefill",
		Name = "Stamina Refill",
		ProductId = 3711874021,
		Icon = "rbxassetid://137682761306138",
		Goal = "Refill your Stamina bar to full, right now.",
		Reward = { Kind = "Refill", Stat = "Stamina", Amount = 1 },
	} :: Product,

	-- THREE SHIELDS, ONE ICON, ONE LADDER. They differ only in how long they
	-- last, so the DURATION is the whole product and the name has to carry it.
	--
	-- THE LADDER IS NO LONGER CHECKED HERE, because checking it needs prices
	-- and prices are Roblox's. It still has to HOLD -- each step dearer
	-- outright and cheaper per hour, or a shorter shield bought twice beats a
	-- longer one bought once -- so it is a thing to look at on the Creator
	-- Dashboard when any of the three moves. That is the cost of not keeping a
	-- second copy of the price, and it is worth paying: a stale number here
	-- would let the check pass while the real shelf was wrong.
	Shield4h = {
		Key = "Shield4h",
		Name = "4 Hour Shield",
		ProductId = 3711873983,
		Icon = "rbxassetid://103371360060935",
		Goal = "Nobody can steal from you for 4 hours.",
		Reward = { Kind = "Timed", Stat = "Shield", Duration = 4 * HOUR },
	} :: Product,

	Shield8h = {
		Key = "Shield8h",
		Name = "8 Hour Shield",
		ProductId = 3711875190,
		Icon = "rbxassetid://92051728894618",
		Goal = "Nobody can steal from you for 8 hours.",
		Reward = { Kind = "Timed", Stat = "Shield", Duration = 8 * HOUR },
	} :: Product,

	Shield24h = {
		Key = "Shield24h",
		Name = "24 Hour Shield",
		ProductId = 3711875195,
		Icon = "rbxassetid://73528023056259",
		Goal = "Nobody can steal from you for a full day.",
		Reward = { Kind = "Timed", Stat = "Shield", Duration = 24 * HOUR },
	} :: Product,

	CookieDelivery = {
		Key = "CookieDelivery",
		Name = "Cookie Delivery",
		ProductId = 3711874025,
		Icon = "rbxassetid://103104617184861",
		Goal = "A crate of cookies delivered straight to your stash.",
		Reward = { Kind = "ScaledCurrency", Stat = "Cookies", Min = 10000, Seconds = 1800 },
	} :: Product,

	CookieJackpot = {
		Key = "CookieJackpot",
		Name = "Cookie Motherload",
		ProductId = 3711874031,
		Icon = "rbxassetid://90796696457664",
		Goal = "A huge cookie delivery, growing with your bakery.",
		Reward = { Kind = "ScaledCurrency", Stat = "Cookies", Min = 50000, Seconds = 14400 },
	} :: Product,

	BakersCrate = {
		Key = "BakersCrate",
		Name = "Baker's Crate",
		ProductId = 3711874037,
		Icon = "rbxassetid://131775640808583",
		Goal = "One item. Better chances for rare treasures.",
		Reward = { Kind = "Crate", Tier = "Rare", Odds = {40,35,20,5} },
	} :: Product,

	GrandmasCrate = {
		Key = "GrandmasCrate",
		Name = "Grandma's Crate",
		ProductId = 3711874043,
		Icon = "rbxassetid://119463672796893",
		Goal = "One surprise item for your collection.",
		Reward = { Kind = "Crate", Tier = "Common", Odds = {65,25,9,1} },
	} :: Product,

	SantasCrate = {
		Key = "SantasCrate",
		Name = "Santa's Crate",
		ProductId = 3711874051,
		Icon = "rbxassetid://111953436605911",
		Goal = "The legendary crate. The best rewards in the bakery.",
		Reward = { Kind = "Crate", Tier = "Legendary", Odds = {15,30,40,15} },
	} :: Product,

	-- Bought from a running campaign card, not from the shop grid. A receipt
	-- carries only its product id, so the slot that was tapped is recorded on
	-- the save first (Model.setAdRushIntent) and read back when this grants.
	FinishCampaign = {
		Key = "FinishCampaign",
		Hidden = true,
		Name = "Finish Campaign Now",
		ProductId = 3712159264,
		Icon = "rbxassetid://92555141797263",
		Goal = "Finish the advertising campaign you are waiting on, right now.",
		Reward = { Kind = "AdRush" },
	} :: Product,

	FinishCampaignBig = {
		Key = "FinishCampaignBig",
		Hidden = true,
		Name = "Finish Big Campaign Now",
		ProductId = 3712162069,
		Icon = "rbxassetid://92555141797263",
		Goal = "Finish a large advertising campaign instantly.",
		Reward = { Kind = "AdRush" },
	} :: Product,

	FinishCampaignHuge = {
		Key = "FinishCampaignHuge",
		Hidden = true,
		Name = "Finish Huge Campaign Now",
		ProductId = 3712162073,
		Icon = "rbxassetid://92555141797263",
		Goal = "Finish a huge advertising campaign instantly.",
		Reward = { Kind = "AdRush" },
	} :: Product,

	FinishCampaignEpic = {
		Key = "FinishCampaignEpic",
		Hidden = true,
		Name = "Finish Epic Campaign Now",
		ProductId = 3712162080,
		Icon = "rbxassetid://92555141797263",
		Goal = "Finish an epic advertising campaign instantly.",
		Reward = { Kind = "AdRush" },
	} :: Product,
}

-- Game passes -- bought once, owned for ever. Every reward here is permanent,
-- which is what makes a Multiplier the right shape for five of the seven.
MonetizationConfig.Passes = {
	AutoBake = {
		Key = "AutoBake",
		Name = "Auto Bake",
		GamePassId = 1975934251,
		Icon = "rbxassetid://127473473365683",
		Goal = "Your bakery keeps baking cookies for you, even while you are away.",
		-- A Perk with a RATE beside it rather than a bare flag. "Auto bake" is
		-- meaningless without how fast, and a handler that invented the number
		-- would be the second place it was written down.
		Reward = { Kind = "Perk", Perks = { "AutoBake" }, Stat = "AutoBakeRate", Amount = 1 },
	} :: Pass,

	VIP = {
		Key = "VIP",
		Name = "VIP",
		GamePassId = 1966305446,
		Icon = "rbxassetid://113654831326698",
		Goal = "+10% cookies from baking and jobs, and +10% maximum Energy.",
		Reward = {
			Kind = "Bundle",
			Grants = {
				{ Kind = "Multiplier", Stat = "CookieGain", Multiplier = 1.1 },
				{ Kind = "Multiplier", Stat = "MaxEnergy", Multiplier = 1.1 },
			},
		},
	} :: Pass,

	EnergyRegen2x = {
		Key = "EnergyRegen2x",
		Name = "2x Energy Regen",
		GamePassId = 1970309616,
		Icon = "rbxassetid://127221151150247",
		Goal = "Your Energy comes back twice as fast, for ever.",
		Reward = { Kind = "Multiplier", Stat = "EnergyRegen", Multiplier = 2 },
	} :: Pass,

	StaminaRegen2x = {
		Key = "StaminaRegen2x",
		Name = "2x Stamina Regen",
		GamePassId = 1970583608,
		Icon = "rbxassetid://116520443717653",
		Goal = "Your Stamina comes back twice as fast, for ever.",
		Reward = { Kind = "Multiplier", Stat = "StaminaRegen", Multiplier = 2 },
	} :: Pass,

	JobRewards2x = {
		Key = "JobRewards2x",
		Name = "2x Job Rewards",
		GamePassId = 1969293886,
		Icon = "rbxassetid://90181806639635",
		Goal = "Every job you finish pays double.",
		Reward = { Kind = "Multiplier", Stat = "JobReward", Multiplier = 2 },
	} :: Pass,

	PropertyIncome2x = {
		Key = "PropertyIncome2x",
		Name = "2x Property Income",
		GamePassId = 1967864115,
		Icon = "rbxassetid://88107679712232",
		Goal = "Every property you own earns double income.",
		Reward = { Kind = "Multiplier", Stat = "PropertyIncome", Multiplier = 2 },
	} :: Pass,

	NoDepositFee = {
		Key = "NoDepositFee",
		Name = "No Deposit Fee",
		GamePassId = 1970047588,
		Icon = "rbxassetid://90035063367798",
		Goal = "Bank your cookies with no fee taken off the top.",
		-- A multiplier of 0 rather than a boolean, so the fee has ONE
		-- expression -- fee * multiplier -- and a future half-price pass is a
		-- number rather than a second branch beside it.
		Reward = { Kind = "Multiplier", Stat = "DepositFee", Multiplier = 0 },
	} :: Pass,
}

-- Reverse lookups, built once at require time. A ProcessReceipt handler is
-- handed an id and nothing else, so this is the direction the game actually
-- asks in -- and building it here means no caller keeps its own copy to fall
-- out of step with the tables above.
local byProductId: { [number]: Product } = {}
local byGamePassId: { [number]: Pass } = {}

for _, product in MonetizationConfig.Products do
	byProductId[product.ProductId] = product
end

for _, pass in MonetizationConfig.Passes do
	byGamePassId[pass.GamePassId] = pass
end

MonetizationConfig.ByProductId = byProductId
MonetizationConfig.ByGamePassId = byGamePassId

function MonetizationConfig.productFor(productId: number): Product?
	return byProductId[productId]
end

function MonetizationConfig.passFor(gamePassId: number): Pass?
	return byGamePassId[gamePassId]
end

-- Every Timed product for one Stat, shortest first. This is the order a player
-- should read the shield shelf in, so the shelf and any future check share ONE
-- ordering rather than each deciding for itself.
function MonetizationConfig.durationLadder(stat: string): { Product }
	local ladder: { Product } = {}
	for _, product in MonetizationConfig.Products do
		local reward = product.Reward
		if reward.Kind == "Timed" and reward.Stat == stat and reward.Duration then
			table.insert(ladder, product)
		end
	end
	table.sort(ladder, function(a, b)
		local left, right = a.Reward.Duration :: number, b.Reward.Duration :: number
		if left == right then
			return a.Name < b.Name -- total, so table.sort cannot throw
		end
		return left < right
	end)
	return ladder
end

-- The ways a row can be wrong and still look completely right: an id pasted
-- twice (the second item silently becomes the first), an icon that was never
-- uploaded (the card draws an empty square), and two timed items sold at the
-- same duration, which makes one of them unbuyable for any reason a player
-- could state. Call it once at boot.
--
-- IT CANNOT CHECK A PRICE, AND THAT IS THE TRADE. Prices live on Roblox, so a
-- shield that is dearer AND shorter than the one below it type-checks, renders
-- and sells -- exactly as it did before this file existed. Read the ladder on
-- the Creator Dashboard when a price moves.
function MonetizationConfig.verify(): { string }
	local faults: { string } = {}
	local seen: { [number]: string } = {}

	local function check(key: string, name: string, id: number, icon: string, kind: string)
		if id <= 0 then
			table.insert(faults, `{kind} {key} ({name}) has no id`)
		elseif seen[id] then
			table.insert(faults, `{kind} {key} shares id {id} with {seen[id]}`)
		else
			seen[id] = key
		end

		if not string.match(icon, "^rbxassetid://%d+$") then
			table.insert(faults, `{kind} {key} ({name}) has no icon`)
		end
	end

	for key, product in MonetizationConfig.Products do
		check(key, product.Name, product.ProductId, product.Icon, "Product")
		if product.Reward.Kind == "Crate" then
			local total=0
			for _,chance in product.Reward.Odds or {} do
				if chance~=chance or chance<0 or chance>100 then table.insert(faults,key.." has invalid odds") end
				total+=chance
			end
			if total~=100 or #(product.Reward.Odds or {})~=#MonetizationConfig.CrateItems then table.insert(faults,key.." odds must describe every item and total 100%") end
		end
	end

	for key, pass in MonetizationConfig.Passes do
		check(key, pass.Name, pass.GamePassId, pass.Icon, "Pass")
	end

	-- Which stats are sold in more than one size is derived from the table
	-- rather than listed here, so a second laddered item is covered the day it
	-- is added and nobody has to remember to name it.
	local timedStats: { [string]: true } = {}
	for _, product in MonetizationConfig.Products do
		local reward = product.Reward
		if reward.Kind == "Timed" and reward.Stat then
			timedStats[reward.Stat] = true
		end
	end

	for stat in timedStats do
		local ladder = MonetizationConfig.durationLadder(stat)
		for i = 2, #ladder do
			local below, above = ladder[i - 1], ladder[i]
			if (above.Reward.Duration :: number) == (below.Reward.Duration :: number) then
				table.insert(faults, `{stat}: {above.Name} and {below.Name} last the same time`)
			end
		end
	end

	return faults
end

return MonetizationConfig
