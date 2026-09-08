--!strict

--[[
	The three menu buttons, uploaded 2026-09-08, mapped name -> id.

	ITS OWN FILE RATHER THAN A THIRD GROUP IN `Images2Config`. These arrived as a
	separate drop and they are a different kind of thing: a CONTROL's face, not a
	picture of content. A shelf of backdrops and the buttons that sit over them
	are edited for different reasons and by different screens, so keeping them
	apart means neither drop can be disturbed by an edit meant for the other.

	THE IDS ARE DECAL IDS, WHICH IS WHAT OPEN CLOUD HANDS BACK.
	`POST /assets/v1/assets` files an image as a `Decal` and returns the DECAL's
	id; the engine resolves one for `ImageLabel.Image`. See `Images2Config`'s
	header for the fallback if one ever draws blank.

	Uploaded under group 4500740 (Visually Synced); all three read back
	`moderationState = "Approved"`, `state = "Active"`.
]]

export type Group = { [string]: string }

local MenuButtonConfig = {}

--[[ `menu button/` -- one face per button. ]]
MenuButtonConfig.Buttons = {
	BakeButton = "rbxassetid://136779873820702",
	MoreButton = "rbxassetid://102318049986406",
	ShopButton = "rbxassetid://91365869028475",
} :: Group

--[[
	Turn whatever a caller passed into something `ImageLabel.Image` accepts.

	Takes a button name or an id that is already an id. An unrecognised name
	returns "" -- which draws NOTHING rather than substituting a plausible face,
	the same choice `IconAssets.resolve` and `Images2Config.resolve` make.
]]
function MenuButtonConfig.resolve(image: string?): string
	if image == nil or image == "" then
		return ""
	end
	-- Already an id: rbxassetid://, rbxasset://, or a bare number.
	if image:match("^rbx") or image:match("^%d+$") then
		return image
	end
	
-- Upload Decal -> Image texture, resolved with InsertService.
MenuButtonConfig.UploadTextures = {
	["rbxassetid://121566279610436"] = "rbxassetid://136779873820702",
	["rbxassetid://74509559530379"] = "rbxassetid://102318049986406",
	["rbxassetid://136768671617339"] = "rbxassetid://91365869028475",
}

return MenuButtonConfig.Buttons[image] or ""
end

return MenuButtonConfig
