--!strict

--[[
	The `images2` art drop, uploaded 2026-09-08, mapped name -> id.

	GROUPED THE WAY THE FOLDER IS, because the folder is the only place the
	grouping is written down. The drop arrived as two directories and they hold
	two different KINDS of picture: `images2/` is UI art (boosts, friends,
	garden, helper, levels, stars) and `zonebackground/` is fifteen zone
	backdrops. Flattening them into one table would throw that away.

	THE IDS ARE DECAL IDS, WHICH IS WHAT OPEN CLOUD HANDS BACK.
	`POST /assets/v1/assets` files an image as a `Decal` and returns the DECAL's
	id; the engine resolves one for `ImageLabel.Image`. If a picture ever draws
	blank, that is the first thing to check -- `IconAssets`'s own header records
	an older flow where each Decal had to be resolved to its underlying Image id
	in Studio, and this drop has not been rendered in game yet.

	Uploaded under group 4500740 (Visually Synced); all 21 read back
	`moderationState = "Approved"`, `state = "Active"`.

	A BARE NAME IS ONLY VALID WHILE IT IS UNIQUE. `resolve` takes either
	"CookieJar" or "ZoneBackground/CookieJar", and the bare form is DROPPED from
	the index the moment two groups claim it -- a wrong picture reads as a real
	feature where a missing one reads as missing, which is the rule `IconAssets`
	already states for an unknown name. Nothing collides today.
]]

export type Group = { [string]: string }

local Images2Config = {}

--[[ `images2/` -- the UI art. ]]
Images2Config.Images2 = {
	CookieBoost = "rbxassetid://115046526101139",
	CookieFriends = "rbxassetid://125265608763756",
	CookieGarden = "rbxassetid://106628997126747",
	CookieHelper = "rbxassetid://71006696025408",
	CookieLevels = "rbxassetid://126886060963817",
	Stars = "rbxassetid://123064262097693",
} :: Group

--[[ `zonebackground/` -- the zone backdrops. ]]
Images2Config.ZoneBackground = {
	BakingCookie = "rbxassetid://113594123401140",
	BakreForAParty = "rbxassetid://114054713227039",
	CookieBank = "rbxassetid://102581667033305",
	CookieCharity = "rbxassetid://73218568085399",
	CookieFestival = "rbxassetid://114067646674351",
	CookieJar = "rbxassetid://119932974736363",
	CookieManifacture = "rbxassetid://120717544647171",
	CookieMarket = "rbxassetid://91100276525820",
	CookieParty = "rbxassetid://105063871824741",
	CookieStore = "rbxassetid://87986435450528",
	Crown = "rbxassetid://104402990331179",
	DeliverCookie = "rbxassetid://83488781738392",
	Luck = "rbxassetid://99547612959377",
	Mixer = "rbxassetid://75878135384892",
	WashTray = "rbxassetid://130636301829008",
} :: Group

--[[
	The groups by name, so a caller can iterate the drop without spelling the
	two folders out a second time.
]]
Images2Config.Groups = {
	Images2 = Images2Config.Images2,
	ZoneBackground = Images2Config.ZoneBackground,
} :: { [string]: Group }

--[[
	The lookup index, DERIVED rather than written down. Every picture is reachable
	as "Group/Name"; it is also reachable as a bare "Name" for as long as exactly
	one group offers it. A second claimant deletes the bare key instead of
	overwriting it, so an ambiguous name resolves to nothing and the caller has to
	say which group it meant.
]]
local INDEX: { [string]: string } = {}
local CLAIMED: { [string]: string } = {}

for groupName, group in Images2Config.Groups do
	for name, id in group do
		INDEX[`{groupName}/{name}`] = id

		local owner = CLAIMED[name]
		if owner == nil then
			CLAIMED[name] = groupName
			INDEX[name] = id
		elseif owner ~= groupName then
			INDEX[name] = nil
		end
	end
end

--[[
	Turn whatever a caller passed into something `ImageLabel.Image` accepts.

	Takes "Group/Name", a bare unique "Name", or an id that is already an id.
	An unrecognised or ambiguous name returns "" -- which draws NOTHING rather
	than substituting a plausible picture, the same choice `IconAssets.resolve`
	makes and for the same reason.
]]
function Images2Config.resolve(image: string?): string
	if image == nil or image == "" then
		return ""
	end
	-- Already an id: rbxassetid://, rbxasset://, or a bare number.
	if image:match("^rbx") or image:match("^%d+$") then
		return image
	end
	return INDEX[image] or ""
end


-- Upload Decal -> Image texture, resolved with InsertService.
Images2Config.UploadTextures = {
	["rbxassetid://129663961664100"] = "rbxassetid://115046526101139",
	["rbxassetid://133866484811409"] = "rbxassetid://125265608763756",
	["rbxassetid://121308130439368"] = "rbxassetid://106628997126747",
	["rbxassetid://116113624888631"] = "rbxassetid://71006696025408",
	["rbxassetid://74407081282215"] = "rbxassetid://126886060963817",
	["rbxassetid://86433609541210"] = "rbxassetid://123064262097693",
	["rbxassetid://130556433278188"] = "rbxassetid://113594123401140",
	["rbxassetid://82008327711233"] = "rbxassetid://114054713227039",
	["rbxassetid://117790995724861"] = "rbxassetid://102581667033305",
	["rbxassetid://128521460134443"] = "rbxassetid://73218568085399",
	["rbxassetid://91599751068912"] = "rbxassetid://114067646674351",
	["rbxassetid://117646324217695"] = "rbxassetid://119932974736363",
	["rbxassetid://84948859374629"] = "rbxassetid://120717544647171",
	["rbxassetid://71635559125533"] = "rbxassetid://91100276525820",
	["rbxassetid://102316660075235"] = "rbxassetid://105063871824741",
	["rbxassetid://94607816810691"] = "rbxassetid://87986435450528",
	["rbxassetid://124899000272562"] = "rbxassetid://104402990331179",
	["rbxassetid://132136835182921"] = "rbxassetid://83488781738392",
	["rbxassetid://88522439407598"] = "rbxassetid://99547612959377",
	["rbxassetid://114795508534373"] = "rbxassetid://75878135384892",
	["rbxassetid://117153884598836"] = "rbxassetid://130636301829008",
}

return Images2Config
