--!strict
-- ImageConfig
--
-- EVERY IMAGE THIS GAME DRAWS, BY NAME. Uploaded 2026-09-08 from
-- Downloads/images to group 4500740 through the Open Cloud Assets API -- 33
-- from images/images plus Cookie, CursorCookie and GoldenCookie beside them.
-- All 36 came back moderation state Approved.
--
-- TWO IDS PER IMAGE, AND THE DIFFERENCE MATTERS. Uploading a PNG through the
-- Assets API creates a DECAL, and `Id` is the decal the API handed back.
-- `ImageId` is the texture INSIDE it, read back through InsertService. An
-- ImageLabel takes either -- it resolves a decal on its own -- but the image id
-- is the value it actually wants, so `Images` is built from that and the hop is
-- never paid. The decal id is kept because it is what the Creator Dashboard,
-- the Open Cloud API and every future update call will name the asset by.
--
-- THE NAME IS THE KEY AND THE FILENAME IS KEPT BESIDE IT. The source files are
-- lower-case and three carry typos ("cookiefratalengine", "cookietample",
-- "spatual"), so the PascalCase name here is a CORRECTION rather than a
-- transliteration -- and `Source` is what makes that reversible. Without it
-- there is no way back from CookieFractalEngine to the file it came from.
--
-- A FRESH UPLOAD HAS NO THUMBNAIL FOR A WHILE, and that is not a broken asset.
-- Straight after this ran, thumbnails.roblox.com returned ONE shared placeholder
-- image for every decal here, which reads exactly like 36 blank uploads. Loading
-- the decals proved otherwise: 36 distinct textures, no duplicates. Check the
-- asset, not its thumbnail.
--
-- AND `IsLoaded` CANNOT BE READ IN A BACKGROUNDED STUDIO. A control image that
-- has existed for years reported false through the same harness, so a false
-- there says nothing about the id.
--
-- ONE TABLE, TWO VIEWS. `Assets` is the record and `Images` is derived from it
-- at require time, so a name cannot exist in one and not the other -- which is
-- the failure a hand-written second table produces, and it shows up as a blank
-- rectangle rather than as an error.

local ImageConfig = {}

export type Asset = {
	Id: number, -- the Decal asset -- what Open Cloud created and will update
	ImageId: number, -- the texture inside it -- what an ImageLabel draws
	Source: string, -- the original filename, so a rename stays traceable
}

ImageConfig.Assets = {
    BakeryLevel5 = { Id = 121801422919701, ImageId = 121801422919701, Source = "user-provided level 5 bakery background" },
	BakeForParty = { Id = 89016281670574, ImageId = 104612721638877, Source = "bakeforparty.png" },
	Cookie = { Id = 72527335782131, ImageId = 99845411162505, Source = "Cookie.png" },
	CookieAlchemy = { Id = 90110441527476, ImageId = 86883983206343, Source = "cookiealchemy.png" },
	CookieAntimatterCondenser = { Id = 138087734003504, ImageId = 73947694418630, Source = "cookieantimattercondenser.png" },
	CookieBank = { Id = 109659056102279, ImageId = 81680378566526, Source = "cookiebank.png" },
	CookieChangemaker = { Id = 127882798753875, ImageId = 109904641990857, Source = "cookiechangemaker.png" },
	CookieConsole = { Id = 139563689050735, ImageId = 104407191559244, Source = "cookieconsole.png" },
	CookieCortexBreaker = { Id = 80632074448746, ImageId = 110658753434888, Source = "cookiecortex breaker.png" },
	CookieCrown = { Id = 92807827570366, ImageId = 131152270075256, Source = "cookiecrown.png" },
	CookieDelivery = { Id = 71499249113523, ImageId = 94480489013115, Source = "cookiedelivery.png" },
	CookieEmpire = { Id = 129525652378062, ImageId = 114261088563180, Source = "cookieempire.png" },
	CookieFactory = { Id = 86396660155681, ImageId = 123768927230574, Source = "cookiefactory.png" },
	CookieFestival = { Id = 110560330020856, ImageId = 123556196415410, Source = "cookiefestival.png" },
	CookieFractalEngine = { Id = 129959997900543, ImageId = 117963424307741, Source = "cookiefratalengine.png" },
	CookieIdleverse = { Id = 111692828009101, ImageId = 89149728083019, Source = "cookieidleverse.png" },
	CookieJar = { Id = 81308078947453, ImageId = 99226646608258, Source = "cookiejar.png" },
	CookieMarket = { Id = 139868704747675, ImageId = 128738962766580, Source = "cookiemarket.png" },
	CookiePortal = { Id = 120463171447870, ImageId = 125565026778793, Source = "cookieportal.png" },
	CookiePrism = { Id = 78163466272060, ImageId = 97185277675191, Source = "cookieprims.png" },
	CookieShipment = { Id = 126404326990923, ImageId = 119550130954157, Source = "cookieshipment.png" },
	CookieStand = { Id = 107746616751965, ImageId = 74405280658175, Source = "cookiestand.png" },
	CookieStore = { Id = 107617472477984, ImageId = 72139649362060, Source = "cookiestore.png" },
	CookieTemple = { Id = 84300686067896, ImageId = 109898173617642, Source = "cookietample.png" },
	CookieTimeMachine = { Id = 125024797296285, ImageId = 79047897130019, Source = "cookietimemachine.png" },
	CookieTray = { Id = 115112505378670, ImageId = 96220331764859, Source = "cookietray.png" },
	CookieWizardTower = { Id = 100317755187381, ImageId = 131844744744792, Source = "cookiewizardtower.png" },
	CookieYou = { Id = 97693488541104, ImageId = 96657151269254, Source = "cookieyou.png" },
	CursorCookie = { Id = 137725984453361, ImageId = 136796773436976, Source = "CursorCookie.png" },
	Farm = { Id = 137899286538406, ImageId = 116611998112705, Source = "farm.png" },
	GoldenCookie = { Id = 111649687062465, ImageId = 122858954026942, Source = "GoldenCookie.png" },
	Grandma = { Id = 129249740988758, ImageId = 120184369850506, Source = "grandma.png" },
	LuckyApron = { Id = 90700354676748, ImageId = 126154528778777, Source = "luckyapron.png" },
	Mine = { Id = 75953322545400, ImageId = 77718151307436, Source = "mine.png" },
	SilverMixer = { Id = 84400386372423, ImageId = 132577295456771, Source = "silvermixer.png" },
	Spatula = { Id = 72491289349810, ImageId = 79907906705598, Source = "spatual.png" },
	WashCookieTray = { Id = 138085106044753, ImageId = 138748605156667, Source = "washcookietray.png" },
} :: { [string]: Asset }

-- Derived, never hand-written: `ImageConfig.Images.CookieJar` is the string an
-- ImageLabel's `Image` property takes.
local images: { [string]: string } = {}
for name, asset in ImageConfig.Assets do
	images[name] = `rbxassetid://{asset.ImageId}`
end
ImageConfig.Images = images

-- Add one named image per five-level milestone. Keep the latest unlocked image
-- until the next milestone has artwork configured.
ImageConfig.BakeryBackgrounds = { [5] = "BakeryLevel5" }
function ImageConfig.bakeryBackground(level: number): string?
    local tier=math.floor(level/5)*5
    local selected: string?=nil
    local highest=0
    for required,name in ImageConfig.BakeryBackgrounds do
        if required<=tier and required>highest then highest=required;selected=name end
    end
    return selected
end

-- ERRORS ON A NAME THAT DOES NOT EXIST, which is the whole reason to have it.
-- Indexing the table directly hands back nil for a typo, an ImageLabel given
-- nil draws NOTHING, and a missing image leaves no gap to notice -- so the
-- misspelling survives to production looking like art that was never made.
function ImageConfig.get(name: string): string
	local image = images[name]
	if not image then
		error(`ImageConfig has no image named "{name}"`, 2)
	end
	return image
end

function ImageConfig.names(): { string }
	local out: { string } = {}
	for name in ImageConfig.Assets do
		table.insert(out, name)
	end
	table.sort(out)
	return out
end

-- The two ways this table can be wrong and still look right: an id pasted twice
-- (two names quietly drawing one picture) and an id of zero, which reads as an
-- image that was never uploaded. Both ids are checked, because a correct decal
-- id beside a duplicated image id still draws the wrong picture.
function ImageConfig.verify(): { string }
	local faults: { string } = {}
	local seenDecal: { [number]: string } = {}
	local seenImage: { [number]: string } = {}

	for name, asset in ImageConfig.Assets do
		if asset.Id <= 0 then
			table.insert(faults, `{name} has no decal id`)
		elseif seenDecal[asset.Id] then
			table.insert(faults, `{name} shares decal id {asset.Id} with {seenDecal[asset.Id]}`)
		else
			seenDecal[asset.Id] = name
		end

		if asset.ImageId <= 0 then
			table.insert(faults, `{name} has no image id`)
		elseif seenImage[asset.ImageId] then
			table.insert(faults, `{name} shares image id {asset.ImageId} with {seenImage[asset.ImageId]}`)
		else
			seenImage[asset.ImageId] = name
		end
	end

	return faults
end

return ImageConfig

