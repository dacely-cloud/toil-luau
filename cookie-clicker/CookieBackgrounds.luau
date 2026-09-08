--!strict

--[[
	The `CookieBackgrounds` drop, uploaded 2026-09-08, mapped name -> id.

	FLAT, BECAUSE THE FOLDER IS. `Images2Config` is grouped because its drop
	arrived as two directories that mean two different things; this one arrived
	as ten files in one directory, so inventing a grouping here would be stating
	something nobody decided.

	THE NAMES ARE ARBITRARY AND SHORT, WHICH WAS ASKED FOR -- and the source
	files could not have supplied better ones. Nine of the ten are named after a
	UUID (`05ed4d2d-30e8-...png`) and the tenth is `content.png`, so there was no
	meaning to preserve. Each name below records the file it came from, because
	an arbitrary name is only traceable if the mapping is written down:

	    Mira   05ed4d2d-30e8-489c-a60b-78938236c6ed.png
	    Nova   11616a5d-ea59-474c-ad19-5bd8fbacbf69.png
	    Kite   3995166b-d557-4776-b35a-8334c9b26f72.png
	    Fern   4489ee76-92ed-4b3c-b032-13aff8a851a3.png
	    Onyx   4ee7da48-dcee-4d2f-8497-ac02051e73cc.png
	    Sage   688e5b93-a4c0-470a-83f8-bb64a9b751a7.png
	    Rook   8660de2f-254f-4dd0-a6fa-f62872d857a9.png
	    Wisp   content.png
	    Dune   dd0cf71e-717a-47e0-80eb-b4ac0d6733b0.png
	    Halo   e20ef99e-c9b1-4f59-a0f1-a731278e6882.png

	A NAME THAT DESCRIBES NOTHING IS ALSO A NAME NOTHING CAN INVALIDATE, which
	is the one thing this shape has going for it -- the id is not derived from
	the name here, unlike `BlockCatalogue`, so renaming one costs nothing beyond
	its call sites. Renaming to something descriptive later is safe.

	THE IDS ARE DECAL IDS, WHICH IS WHAT OPEN CLOUD HANDS BACK.
	`POST /assets/v1/assets` files an image as a `Decal` and returns the DECAL's
	id; the engine resolves one for `ImageLabel.Image`. See `Images2Config`'s
	header for the fallback if one ever draws blank.

	Uploaded under group 4500740 (Visually Synced); all ten read back
	`moderationState = "Approved"`, `state = "Active"`.
]]

export type Group = { [string]: string }

local CookieBackgrounds = {}

CookieBackgrounds.Backgrounds = {
	Dune = "rbxassetid://131863781504218",
	Fern = "rbxassetid://111291443739709",
	Halo = "rbxassetid://125731194861717",
	Kite = "rbxassetid://105420358002370",
	Mira = "rbxassetid://100028141527505",
	Nova = "rbxassetid://84435387886896",
	Onyx = "rbxassetid://118589803596576",
	Rook = "rbxassetid://107124797274191",
	Sage = "rbxassetid://131521631660967",
	Wisp = "rbxassetid://101407893198844",
} :: Group

--[[
	The names in a stated order, so anything that picks one at random or cycles
	through them has a list that does not depend on hash order. `pairs` over the
	table above is not stable between runs, so a "random background" built on it
	would draw a different distribution on every server.
]]
CookieBackgrounds.NAMES = {
	"Mira",
	"Nova",
	"Kite",
	"Fern",
	"Onyx",
	"Sage",
	"Rook",
	"Wisp",
	"Dune",
	"Halo",
} :: { string }

--[[
	Turn whatever a caller passed into something `ImageLabel.Image` accepts.

	Takes a background name or an id that is already an id. An unrecognised name
	returns "" -- which draws NOTHING rather than substituting a plausible
	picture, the same choice `IconAssets.resolve` and `Images2Config.resolve`
	make.
]]
function CookieBackgrounds.resolve(image: string?): string
	if image == nil or image == "" then
		return ""
	end
	-- Already an id: rbxassetid://, rbxasset://, or a bare number.
	if image:match("^rbx") or image:match("^%d+$") then
		return image
	end
	
-- Upload Decal -> Image texture, resolved with InsertService.
CookieBackgrounds.UploadTextures = {
	["rbxassetid://123510161984372"] = "rbxassetid://131863781504218",
	["rbxassetid://101514255901024"] = "rbxassetid://111291443739709",
	["rbxassetid://73567980630632"] = "rbxassetid://125731194861717",
	["rbxassetid://109699412574562"] = "rbxassetid://105420358002370",
	["rbxassetid://125661174708224"] = "rbxassetid://100028141527505",
	["rbxassetid://100543760156858"] = "rbxassetid://84435387886896",
	["rbxassetid://83499903765037"] = "rbxassetid://118589803596576",
	["rbxassetid://70547251818081"] = "rbxassetid://107124797274191",
	["rbxassetid://88502979114844"] = "rbxassetid://131521631660967",
	["rbxassetid://92286602653196"] = "rbxassetid://101407893198844",
}

return CookieBackgrounds.Backgrounds[image] or ""
end

return CookieBackgrounds
