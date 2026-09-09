-- All visible UI is rendered by toil-luau's React reconciler and CSS host.
local Players = game:GetService("Players")
local Marketplace = game:GetService("MarketplaceService")
local RS = game:GetService("ReplicatedStorage")
local TS = require(RS:WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local toil = TS.import(script, RS, "TS")
local React = toil.React
local e = React.createElement
local Model = require(script.Parent.Model)
local Layout = require(script.Parent.Layout)
local makeAudio = require(script.Parent.Audio)
local makeFeedbackQueue = require(script.Parent.FeedbackQueue)
local ImageConfig = require(RS:WaitForChild("ImageConfig"))
local ImageNames = require(script.Parent.ImageNames)
local Ripple = require(RS:WaitForChild("Packages"):WaitForChild("Ripple"))
local uiFont = "Arial"

-- Spring-driven scale that React never sees. The UIScale is made in a ref and
-- owned by Ripple, so a re-render cannot clobber it -- and, more to the point,
-- animating costs no React render at all. That matters here: the page re-renders
-- only when pageSignature changes, and driving a spring through state would
-- rebuild the tree every frame and undo that whole design.
-- `transform: scale()` is deliberately left off the styles below; it would make
-- toil's own ToilScale helper and the two would fight over the same property.
local function useSpringScale(initial)
	local store = React.useRef({}).current
	if not store.bind then
		store.bind = function(inst)
			if store.disconnect then store.disconnect();store.disconnect=nil end
			if store.scale then store.scale:Destroy();store.scale=nil end
			if inst == nil then
				-- Ripple's scheduler holds started motions, so an unmount that
				-- did not destroy would leak one per mount.
				if store.motion then store.motion:destroy();store.motion=nil end
				return
			end
			if not store.motion then store.motion = Ripple.createMotion(initial, { start = true }) end
			local ui = Instance.new("UIScale")
			ui.Name = "SpringScale"
			ui.Scale = store.motion:getPosition()
			ui.Parent = inst
			store.scale = ui
			store.disconnect = store.motion:onChange(function(value)
				if ui.Parent then ui.Scale = value end
			end)

		end
		store.to = function(goal, options)
			if store.motion then store.motion:spring(goal, options) end
		end
		-- Kicks velocity rather than setting a pose, so a click recoils from
		-- wherever the spring already is. Rapid clicking then compounds into a
		-- real wobble instead of retriggering one canned animation.
		-- Deliberately scale, not rotation: these elements are absolutely
		-- positioned with the default top-left AnchorPoint, and Roblox rotates
		-- about that point -- a tilt swings the element bodily down and right
		-- instead of spinning in place.
		store.kick = function(goal, options)
			if store.motion then store.motion:spring(goal, options) end
		end
	end
	return store
end
-- Press is critically damped so it bottoms out cleanly; release is loose enough
-- to overshoot, which is what reads as a bounce rather than a fade.
local COOKIE_PRESS = { frequency = 9, dampingRatio = 1 }
local COOKIE_RELEASE = { frequency = 5, dampingRatio = 0.45 }
-- Measured at the old values: 0.900 -> 1.004 in 250ms. A tenth of the travel,
-- finished in a blink -- present in the numbers, invisible on screen. These
-- settle in ~0.6s from further out, with a touch of overshoot to land on.
local CARD_IN = { frequency = 3.1, dampingRatio = 0.5 }
-- A new boost is earned, not merely shown: it starts much smaller and overshoots
-- harder, so it reads as arriving rather than being listed.
local BOOST_IN = { frequency = 2.4, dampingRatio = 0.44 }

-- Cards spring up as a page opens, each a beat behind the one above it.
-- The guard is keyed by which pane is showing, so opening a tab replays the
-- cascade while a price ticking over mid-page does not -- without it, every
-- re-render would re-fire the animation and the list would never sit still.
-- The UIScale is temporary: it removes itself once the motion completes, so a
-- settled page carries no leftover instances.
-- Frames built in a ref rather than rendered. Anything React draws has its
-- geometry rewritten on every re-render, so a spring fighting it would snap to
-- the new value and slide back from there -- visible as a flick on each frame
-- the page updates. Owning the instance outright avoids that entirely.
local NAV_MARKER = { frequency = 5.6, dampingRatio = 0.68 }
local GOAL_FILL = { frequency = 4.6, dampingRatio = 0.6 }
local function makeSpringFrame(store, colour, radius)
	return function(inst)
		if inst == nil then
			if store.off then store.off(); store.off = nil end
			if store.motion then store.motion:destroy(); store.motion = nil end
			store.frame, store.placed = nil, nil
			return
		end
		local f = Instance.new("Frame")
		f.Name = "SpringFrame"
		f.BorderSizePixel = 0
		f.BackgroundColor3 = Color3.fromHex(colour)
		f.Position = UDim2.fromOffset(0, 0)
		f.Size = UDim2.fromOffset(0, 0)
		f.ZIndex = 5
		local corner = Instance.new("UICorner")
		corner.CornerRadius = UDim.new(0, radius)
		corner.Parent = f
		f.Parent = inst
		store.frame = f
		store.motion = Ripple.createMotion(0, { start = true })
		store.off = store.motion:onChange(function(value)
			if f.Parent then store.draw(f, value) end
		end)
	end
end
-- The rail's marker slides between tiles instead of teleporting.
local navMarker = {}
navMarker.draw = function(f, value) f.Position = UDim2.fromOffset(0, value) end
navMarker.bind = makeSpringFrame(navMarker, "#e9a827", 2)
-- Progress toward the first building eases up rather than stepping per click.
local goalBar = {}
goalBar.draw = function(f, value) f.Size = UDim2.fromOffset(math.max(0, value), 10) end
goalBar.bind = makeSpringFrame(goalBar, "#e9a827", 5)
-- First placement jumps; everything after springs. Otherwise the marker slides
-- in from the top of the rail the first time the page draws.
local function springTo(store, goal, options, width, height)
	local f = store.frame
	if not f or not store.motion then return end
	f.Size = UDim2.fromOffset(width or f.Size.X.Offset, height or f.Size.Y.Offset)
	if not store.placed then
		store.placed = true
		store.motion:setPosition(goal)
		store.draw(f, goal)
		return
	end
	store.motion:spring(goal, options)
end

-- Unlike springIn, this is for an element that stays mounted and reappears --
-- it has to be re-triggerable, and it cannot rely on a fresh instance to reset.
-- Same anchor problem as the cards: scaling about the default top-left corner
-- throws the element down and right, so the centre is asserted for the duration
-- of the pop and handed back afterwards.
local TOAST_POP = { frequency = 3.4, dampingRatio = 0.5 }
local function makePop(store)
	local function centre()
		local inst = store.inst
		if not inst then return end
		inst.AnchorPoint = Vector2.new(0.5, 0.5)
		inst.Position = UDim2.fromOffset(store.baseX + inst.Size.X.Offset / 2, store.baseY + inst.Size.Y.Offset / 2)
	end
	store.bind = function(inst)
		if store.off then store.off(); store.off = nil end
		if store.ui then store.ui:Destroy(); store.ui = nil end
		if inst == nil then
			if store.motion then store.motion:destroy(); store.motion = nil end
			store.inst = nil
			return
		end
		store.inst = inst
		local ui = Instance.new("UIScale")
		ui.Name = "Pop"
		ui.Scale = 1
		ui.Parent = inst
		store.ui = ui
		if not store.motion then store.motion = Ripple.createMotion(1, { start = true }) end
		store.off = store.motion:onChange(function(value)
			if ui.Parent == nil then return end
			ui.Scale = value
			if value < 0.999 then centre() else store.release() end
		end)
	end
	store.release = function()
		local inst = store.inst
		if inst and inst.AnchorPoint.X ~= 0 then
			inst.AnchorPoint = Vector2.zero
			inst.Position = UDim2.fromOffset(store.baseX, store.baseY)
		end
	end
	-- Springs to any target, not just back to 1 -- which is what an exit needs.
	store.to = function(goal, options)
		local inst, motion = store.inst, store.motion
		if not inst or not motion then return end
		if inst.AnchorPoint.X == 0 then
			store.baseX, store.baseY = inst.Position.X.Offset, inst.Position.Y.Offset
		end
		centre()
		motion:spring(goal, options)
	end
	store.pop = function(from, options)
		local inst, motion = store.inst, store.motion
		if not inst or not motion or not store.ui then return end
		-- Only read the resting position while the anchor is still top-left,
		-- otherwise a re-pop mid-flight would bake in the centred offset.
		if inst.AnchorPoint.X == 0 then
			store.baseX, store.baseY = inst.Position.X.Offset, inst.Position.Y.Offset
		end
		motion:setPosition(from)
		store.ui.Scale = from
		centre()
		motion:spring(1, options)
	end
end
local feedbackPop = {}
makePop(feedbackPop)
-- The drawer is mounted and unmounted rather than toggled, so it gets a pop of
-- its own each time it opens.
local DRAWER_IN = { frequency = 3.6, dampingRatio = 0.62 }
-- Critically damped on the way out: an exit that wobbles reads as indecision,
-- and it has to finish before the unmount rather than bouncing into it.
local DRAWER_OUT = { frequency = 6.2, dampingRatio = 1 }
local DRAWER_OUT_SECONDS = 0.15
-- A critically damped spring only approaches its goal, so aiming at exactly the
-- panel width still left 26px on screen when the unmount fired -- the tail of
-- the slide read as a pop. Aim past the edge instead: the panel is fully gone
-- by ~0.10s and the remaining 0.05s is spent off screen.
local DRAWER_OUT_OVERSHOOT = 40
-- Slides rather than scales: the panel is flush to the column's right edge, and
-- centerColumn clips, so travelling right takes it cleanly off screen.
local function makeSlide(store)
	store.bind = function(inst)
		if store.off then store.off(); store.off = nil end
		if inst == nil then
			if store.motion then store.motion:destroy(); store.motion = nil end
			store.inst = nil
			return
		end
		store.inst = inst
		store.baseX, store.baseY = inst.Position.X.Offset, inst.Position.Y.Offset
		if not store.motion then store.motion = Ripple.createMotion(0, { start = true }) end
		-- Re-asserted every frame so a re-render mid-slide cannot snap it back.
		store.off = store.motion:onChange(function(value)
			if inst.Parent then inst.Position = UDim2.fromOffset(store.baseX + value, store.baseY) end
		end)
	end
	store.jump = function(value)
		if store.motion then store.motion:setPosition(value) end
		local inst = store.inst
		if inst then inst.Position = UDim2.fromOffset(store.baseX + value, store.baseY) end
	end
	store.to = function(goal, options)
		if store.motion then store.motion:spring(goal, options) end
	end
end
local drawerPop = {}
makeSlide(drawerPop)

local entrancePane, entranceSeen = "", {}
-- Boosts get their own set, and it is never cleared: a boost should pop the
-- first time it ever appears -- the moment buying a Cursor unlocks it -- not
-- every time you glance at the store.
local boostSeen = {}
-- The jar is a column of controls rather than a list of cards, so they drop
-- further and land one after another.
local JAR_IN = { frequency = 4.3, dampingRatio = 0.55 }
local CARD_ENTRANCE = { seen = entranceSeen, from = 0.86, drop = 16, spring = CARD_IN, stagger = 0.032, cap = 8 }
local JAR_ENTRANCE = { seen = entranceSeen, from = 0.9, drop = 30, spring = JAR_IN, stagger = 0.026, cap = 9 }
local BOOST_ENTRANCE = { seen = boostSeen, from = 0.5, drop = 22, spring = BOOST_IN, stagger = 0, cap = 0 }
local function springIn(key, index, cfg)
	cfg = cfg or CARD_ENTRANCE
	return function(inst)
		if inst == nil or cfg.seen[key] then return end
		cfg.seen[key] = true
		-- A UIScale grows about the AnchorPoint, and these cards are laid out from
		-- their top-left -- so scaling alone balloons them down and to the right,
		-- which is what read as cheap. Centre the anchor for the duration and
		-- shift Position to match, then hand both back when the motion ends.
		-- The host does not compensate Position for a centred anchor, so this has
		-- to be done in pairs or the card jumps half its own size.
		local baseX, baseY = inst.Position.X.Offset, inst.Position.Y.Offset
		local halfW, halfH = inst.Size.X.Offset / 2, inst.Size.Y.Offset / 2
		-- The drop rides the same motion as the scale rather than a second one,
		-- so the two can never drift apart -- progress is read straight off the
		-- scale, and overshoot carries the element a touch past its resting line
		-- before it settles, which is what sells the fall.
		local drop = cfg.drop or 0
		local function place(value)
			local t = (value - cfg.from) / (1 - cfg.from)
			inst.AnchorPoint = Vector2.new(0.5, 0.5)
			inst.Position = UDim2.fromOffset(baseX + halfW, baseY + halfH - (1 - t) * drop)
		end
		local function centre() place(cfg.from) end
		centre()
		local ui = Instance.new("UIScale")
		ui.Name = "SpringIn"
		ui.Scale = cfg.from
		ui.Parent = inst
		local motion = Ripple.createMotion(cfg.from, { start = true })
		local disconnect
		local function finish()
			if disconnect then disconnect(); disconnect = nil end
			if motion then motion:destroy(); motion = nil end
			if ui.Parent then
				inst.AnchorPoint = Vector2.zero
				inst.Position = UDim2.fromOffset(baseX, baseY)
				ui:Destroy()
			end
		end
		disconnect = motion:onChange(function(value)
			if ui.Parent == nil then finish(); return end
			ui.Scale = value
			-- Re-asserted every frame: a re-render mid-entrance would otherwise
			-- put the top-left anchor back and snap the card sideways.
			place(value)
		end)
		-- onComplete is registered only after a goal exists. A freshly created
		-- motion is already at rest, so subscribing up front fires it on the
		-- first frame -- finish() then tore the UIScale down before the staggered
		-- start could run, and every entrance silently did nothing.
		-- Guarded on Parent because a tab switch can destroy the card first.
		task.delay(math.min(index, cfg.cap) * cfg.stagger, function()
			if ui.Parent == nil or motion == nil then return end
			motion:onComplete(finish)
			motion:spring(1, cfg.spring)
		end)
	end
end
local suffixes = { "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion" }
-- Each resource owns a hue already (the amount label and the meter fill), so
-- the countdown and the landing badge are drawn from that same family: dim for
-- "still waiting", bright for "here it is". A separate accent colour for these
-- read as a foreign element bolted onto the meter.
local RESOURCE_TINT={
    energy={dim="#6f97a6",bright="#a6ddeb"},
    stamina={dim="#917fa1",bright="#dabbed"},
}
-- How long the "+1" sits there before the countdown takes the slot back. Under
-- a second, so it always clears before the next tick of the new countdown.
local GAIN_SECONDS=0.9
-- m:ss for the short waits in the header. Rounds up, so the last second reads
-- 0:01 rather than 0:00 sitting there while the point has not landed yet.
local function clock(seconds)
	local whole=math.max(0,math.ceil(seconds))
	return string.format("%d:%02d",whole//60,whole%60)
end
-- H:MM:SS once a campaign is over an hour, M:SS below it. Rounds up for the
-- same reason clock() does: the last second should read 0:01, not 0:00.
local function countdown(seconds)
	local whole=math.max(0,math.ceil(seconds))
	if whole>=3600 then return string.format("%d:%02d:%02d",whole//3600,whole//60%60,whole%60) end
	return string.format("%d:%02d",whole//60,whole%60)
end
-- The advertised length of a campaign, as a player would say it out loud.
local function span(seconds)
	if seconds<3600 then return math.floor(seconds/60).." min" end
	local hours=seconds/3600
	return (if hours%1==0 then string.format("%d",hours) else string.format("%.1f",hours)).." hr"
end
local function number(n, decimals)
	if n >= 1e36 then return string.format("%.3g",n) end
	if n >= 1e6 then
		local tier = math.min(#suffixes, math.floor(math.log10(n) / 3) - 1)
		local mantissa = n / 10 ^ ((tier + 1) * 3)
		-- Three significant figures, not three decimal places. A fixed "%.3f"
		-- printed exactly one million as "1.000 million", which is not a thing
		-- anyone says -- and it wasted the same three digits on 123.456 million
		-- where they carry no information either.
		local places = if mantissa < 10 then 2 elseif mantissa < 100 then 1 else 0
		local text = string.format("%." .. places .. "f", mantissa)
		if places > 0 then text = text:gsub("%.?0+$", "") end
		return text .. " " .. suffixes[tier]
	end
	if decimals and n % 1 > 0.001 then return string.format("%.1f", n) end
	local text = tostring(math.floor(n))
	local grouped = text:reverse():gsub("(%d%d%d)", "%1,"):reverse():gsub("^,", "")
	return grouped
end
local function style(x, y, w, h, more)
	local result = { position = "absolute", left = x .. "px", top = y .. "px", width = w .. "px", height = h .. "px" }
	if more then for k, v in more do result[k] = v end end
	return result
end
-- Preserve element identity so React skips unchanged decorative subtrees.
local function remember(cache,key,signature,build)
    local old=cache[key]
    if old and old.signature==signature then return old.element end
    local element=build()
    cache[key]={signature=signature,element=element}
    return element
end
local shopBackdrop
local function box(id, x, y, w, h, color, children, more)
	local s = style(x, y, w, h, more)
	if color then s.background = color end
	local zone=s["--zone-background"]
    local shopIcon=s["--shop-icon"];s["--shop-icon"]=nil
    -- ZoneBackground is its own namespace with its own spellings, so a name
    -- taken from the icon set resolves to nil here. Concatenating that into
    -- url() threw, and because this runs during render it took down the entire
    -- App tree -- every card, not just this one -- leaving the UI frozen on its
    -- last good frame. Resolve first and drop the layer if there is no image.
    local zoneImage=if zone then ImageConfig.get("ZoneBackground/"..zone) else nil
    if zone and not zoneImage then zone=nil end
    if zone or shopIcon then
        s["--zone-background"]=nil
        s.overflow="hidden"
        -- Every layer carries the radius: ClipsDescendants clips to the
        -- rectangle, NOT to the UICorner, so a full-bleed child renders square
        -- and fills the rounded corner unless given a corner of its own.
        -- The outline stays on this frame. A UIStroke draws OUTSIDE its own
        -- bounds, so putting it on a child that fills the frame would place it
        -- exactly where this frame clips -- drawn, then clipped away. Out here
        -- nothing clips it, and the rounded art no longer covers it either.
        local radius=s["border-radius"]
        children={
            e("div",{key="zoneInset",id="zoneInset",style=style(0,0,w,h,{overflow="hidden",["z-index"]="0",["border-radius"]=radius})},
                shopIcon and shopBackdrop(shopIcon,w,h,radius) or e("img",{key="zoneImage",id="zoneImage",style=style(0,0,w,h,{["background-image"]="url("..tostring(zoneImage)..")",["object-fit"]="cover",["border-radius"]=radius})}),
                e("div",{key="zoneShade",id="zoneShade",style=style(0,0,w,h,{background="rgba(17,13,10,0.66)",["z-index"]="1",["border-radius"]=radius})})),
            e("div",{key="zoneContent",id="zoneContent",style=style(0,0,w,h,{["z-index"]="2"})},table.unpack(children or {})),
        }
    end
	local boxRef = s.ref; s.ref = nil
	return e("div", { key = id, id = id, style = s, ref = boxRef }, table.unpack(children or {}))
end
local function label(id, text, x, y, w, h, size, color, more)
	local s = style(x, y, w, h, { ["font-size"] = (size or 16) .. "px", color = color or "#eee5dc", ["font-family"] = uiFont, ["text-align"] = "left" })
	if more then for k, v in more do s[k] = v end end
	return e("span", { key = id, id = id, style = s }, text)
end
-- Hover updates only this button and the tooltip.
local function HoverButton(props)
	local state = React.useState(false)
	local hovered, setHovered = state[1], state[2]
	local s = table.clone(props.style)
	if hovered and props.highlight then s.background = props.highlight end
	return e("button", {id=props.id,style=s,ref=props.elementRef,onClick=props.onClick,
		onMouseEnter=function() setHovered(true); props.hover(true) end,
		onMouseLeave=function() setHovered(false); props.hover(false) end}, table.unpack(props.content))
end
local function button(id, text, x, y, w, h, callback, more, kids, hover, highlight)
	local s = style(x, y, w, h, { color = "#fff4df", ["font-family"] = uiFont, ["font-size"] = "19px", background = "#493b2e", border = "1px solid #89745c", ["text-align"] = "center" })
	if more then for k, v in more do s[k] = v end end
	local btnRef = s.ref; s.ref = nil
	local children = kids or {}
	if text ~= "" then table.insert(children, 1, text) end
    local shopIcon=s["--shop-icon"];s["--shop-icon"]=nil
    if shopIcon then
        children={shopBackdrop(shopIcon,w,h,s["border-radius"]),e("div",{key="shopContent",id="shopContent",style=style(0,0,w,h,{["z-index"]="2"})},table.unpack(children))}
    end
	-- Forwarded explicitly: HoverButton renders its own inner button, so a ref
	-- left on the component props would never reach an instance.
	if hover then return e(HoverButton, {key=id,id=id,style=s,elementRef=btnRef,onClick=callback,content=children,hover=hover,highlight=highlight}) end
	return e("button", { key = id, id = id, style = s, ref = btnRef, onClick = callback, onMouseEnter = hover and function() hover(true) end, onMouseLeave = hover and function() hover(false) end }, table.unpack(children))
end
-- Width of every wood divider. columnWidths() budgets two of them, so this is
-- the only number to change to thin or thicken the frame.
local RAILW = 6
-- `more` lets one rail opt out of the default stacking. A rail's dark border is
-- drawn outside its own bounds, so a rail that ends flush against a column edge
-- puts that stroke on top of the frame beside it unless it is pushed underneath.
local function rail(id, x, y, w, h, more)
	local s = { border = "1px solid #1b120c" }
	if more then for k, v in more do s[k] = v end end
	return box(id, x, y, w, h, "linear-gradient(90deg, #21160e, #9e7650, #5d3c24, #b28c5c, #291e14)", {}, s)
end
local function picture(id,name,x,y,w,h,more)
    local s=style(x,y,w,h,{background="transparent",["background-image"]="url("..ImageConfig.get(name)..")",["object-fit"]="contain"})
    if more then for k,v in more do s[k]=v end end
    return e("img",{key=id,id=id,style=s})
end
-- A static, weighted image stack approximates a soft blur within this card.
local shopBackdropCache={}
local function configureShopGroup(group)
    if group then group.GroupTransparency=.55;group.Interactable=false end
end
shopBackdrop=function(name,w,h,radius)
    local key=name..":"..w..":"..h..":"..tostring(radius)
    if shopBackdropCache[key] then return shopBackdropCache[key] end
    local seed=0
    for i=1,#name do seed=(seed*31+string.byte(name,i))%2147483647 end
    local rng=Random.new(seed)
    local kids={}
    local perimeter=2*(w+h)
    local count=math.clamp(math.floor(perimeter/70),8,12)
    for i=1,count do
        local size=math.min(h*.52,44)*rng:NextNumber(.8,1.1)
        -- Spread small icons around all four edges, leaving the middle clear.
        local distance=(i-1+rng:NextNumber(.2,.8))*perimeter/count
        local inset=size*rng:NextNumber(.08,.28)
        local cx,cy
        if distance<w then cx,cy=distance,inset
        elseif distance<w+h then cx,cy=w-inset,distance-w
        elseif distance<2*w+h then cx,cy=2*w+h-distance,h-inset
        else cx,cy=inset,perimeter-distance end
        local x,y=cx-size/2,cy-size/2
        local rotation=rng:NextInteger(-35,35)
        for j,offset in {{0,0},{-2,-2},{2,2}} do
            kids[#kids+1]=picture("scatter"..i.."_"..j,name,x+offset[1],y+offset[2],size,size,{rotation=tostring(rotation),opacity=j==1 and "0.32" or "0.14"})
        end
    end
    local result=e("canvasgroup",{key="shopBackdrop",id="shopBackdrop",ref=configureShopGroup,style=style(0,0,w,h,{background="transparent",overflow="hidden",["z-index"]="0",["border-radius"]=radius})},table.unpack(kids))
    -- Bound cached layouts when resizing; mounted elements remain owned by React.
    if not shopBackdropCache[key] then
        local count=0;for _ in shopBackdropCache do count+=1 end
        if count>=128 then shopBackdropCache={} end
    end
    shopBackdropCache[key]=result
    return result
end

local function MenuImageButton(props)
    local zoom=props.name=="More" and 1.65 or 1.5
    local visual=React.useRef({}).current
    if not visual.bind then
        visual.bind=function(face)
            if visual.tint then visual.tint:Cancel();visual.tint=nil end
            if visual.bounce then visual.bounce:Cancel();visual.bounce=nil end
            visual.face=face
            visual.scale=nil
            if face then
                local scale=Instance.new("UIScale")
                scale.Name="MenuPressScale";scale.Parent=face
                visual.scale=scale
            end
        end
    end
    local function activate()
        if visual.face then
            if visual.tint then visual.tint:Cancel() end
            if visual.bounce then visual.bounce:Cancel() end
            visual.face.ImageColor3=Color3.fromRGB(145,145,145)
            local tweenService=game:GetService("TweenService")
            local timing=TweenInfo.new(.18,Enum.EasingStyle.Quad,Enum.EasingDirection.Out)
            visual.tint=tweenService:Create(visual.face,timing,{ImageColor3=Color3.new(1,1,1)})
            visual.tint:Play()
            if visual.scale and not props.reducedMotion then
                visual.scale.Scale=.94
                visual.bounce=tweenService:Create(visual.scale,timing,{Scale=1})
                visual.bounce:Play()
            end
        end
        props.activate()
    end
    return e("button",{id="nav"..props.name,onClick=activate,style=style(props.x,4,props.width,52,{background="transparent",overflow="visible",border="0px solid transparent"})},
        e("img",{id="menuFace",ref=visual.bind,style=style(props.width*(1-zoom)/2,-26,props.width*zoom,52*zoom,{background="transparent",["background-image"]="url("..ImageConfig.get("MenuButtons/"..props.name.."Button")..")",["object-fit"]="contain"})}))
end

-- A static, weighted image stack approximates a soft blur within this card.
-- It is cached, does not animate, and leaves text/buttons outside the blur.
-- Annotated because an empty table literal infers no fields, so every read off
-- the cache below was reported as a missing key.
local standBackgroundCache:{width:number?,height:number?,radius:string?,element:any?}={}
local function standBackground(width,height,radius)
    if standBackgroundCache.width==width and standBackgroundCache.height==height and standBackgroundCache.radius==radius then return standBackgroundCache.element end
    local layers={}
    local weight=0
    local zoom=1.35
    local imageW,imageH=width*zoom+48,height*zoom+48
    for row=-2,2 do
        for col=-2,2 do
            local sampleWeight=math.exp(-(row*row+col*col)/2)
            weight+=sampleWeight
                            layers[#layers+1]=picture("blurSample"..#layers,"ZoneBackground/BakingCookie",(width-imageW)/2+col*10,(height-imageH)/2+row*10,imageW,imageH,{
                ["object-fit"]="cover",opacity=tostring(sampleWeight/weight),["z-index"]=tostring(#layers+1),
            })
        end
    end
    layers[#layers+1]=box("backgroundShade",0,0,width,height,"rgba(17,13,10,0.48)",nil,{["z-index"]="30"})
    local element=e("canvasgroup",{key="standBackground",id="standBackground",style=style(0,0,width,height,{background="transparent",overflow="hidden",["z-index"]="0",["border-radius"]=radius})},table.unpack(layers))
    standBackgroundCache={width=width,height=height,radius=radius,element=element}
    return element
end
local function buildingPicture(id,index,x,y,w,h,more)
    return picture(id,ImageNames.buildings[index],x,y,w,h,more)
end
local stripeCache = {}
local function stripes(id, w, h, dark, light)
	local cached = stripeCache[id]
	if cached and cached.w == w and cached.h == h and cached.dark == dark and cached.light == light then return cached.element end
	local kids = {}
	for i = 0, math.ceil(w / 36) do
		kids[#kids + 1] = box(id .. i, i * 36, 0, 18, h, light)
	end
	local element = box(id, 0, 0, w, h, dark, kids, { overflow = "hidden" })
	stripeCache[id] = { w = w, h = h, dark = dark, light = light, element = element }
	return element
end
local function cookieCurrency(id,x,y)
    return picture(id,"Cookie",x,y,24,24)
end
local upgradeNames = {
	fingers="Stronger clicks", cream="Even stronger clicks", ambidextrous="Super clicks",
	rolling="Better grandma baking", steel="Stronger rolling pins", lubricated="Super grandma baking",
	hoes="Better farm tools", fertilizer="Help your crops grow", picks="Better mining", conveyor="Faster factories",
}
local function upgradeBenefit(u, state)
	if u.click then
		local before = state.clickPower or Model.clickPower(state)
        local after=table.clone(state);after.upgrades=table.clone(state.upgrades);after.upgrades[u.id]=true
		return "Each click gives " .. number(Model.clickPower(after),true) .. " cookies instead of " .. number(before,true) .. ".\nYour cursors make double the cookies too!"
	end
	local building = Model.Buildings[u.building]
	local before = building.cps * Model.multiplier(state,u.building)
	return "Each " .. building.name:lower() .. " makes " .. number(before*2,true) .. " cookies a second instead of " .. number(before,true) .. "."
end
-- The prose form above still feeds the hover tooltip, which has room for a
-- sentence. The store card does not: it needs the same shape of line the
-- building rows carry, so both halves of the store read as one list.
local function upgradeEffect(u, state)
	if u.click then
		local before = state.clickPower or Model.clickPower(state)
		local after = table.clone(state); after.upgrades = table.clone(state.upgrades); after.upgrades[u.id] = true
		return "Clicks x2  ·  +" .. number(Model.clickPower(after) - before, true) .. " per click"
	end
	local building = Model.Buildings[u.building]
	-- Doubling means the gain equals what one already makes.
	local gain = building.cps * Model.multiplier(state, u.building)
	return building.name .. " x2  ·  +" .. number(gain, true) .. " / sec each"
end
local animationRules = toil.cssToRules([[
@keyframes goldenFall { from { top: -12%; rotation: -20; } to { top: 100%; rotation: 160; } }
@keyframes shine { from { rotation: 0; } to { rotation: 360; } }
@keyframes orbit { from { rotation: 0; } to { rotation: -360; } }
@keyframes cursorTap { 0% { transform: translate(0px,0px); } 90% { transform: translate(0px,0px); } 95% { transform: translate(0px,5px); } 100% { transform: translate(0px,0px); } }
@keyframes milkFlow { from { transform: translate(0px,0px); } to { transform: translate(80px,0px); } }
@keyframes popupA { from { transform: translate(0px,0px); opacity: 1; } to { transform: translate(0px,-90px); opacity: 0; } }
@keyframes popupB { from { transform: translate(0px,0px); opacity: 1; } to { transform: translate(0px,-90px); opacity: 0; } }
@keyframes crumbA { 0% { transform: translate(0px,0px); opacity: 1; rotation: 0; } 25% { transform: translate(12px,-24px); opacity: 1; rotation: 45; } 100% { transform: translate(48px,180px); opacity: 0; rotation: 240; } }
@keyframes crumbB { 0% { transform: translate(0px,0px); opacity: 1; rotation: 0; } 25% { transform: translate(-12px,-24px); opacity: 1; rotation: -45; } 100% { transform: translate(-48px,180px); opacity: 0; rotation: -240; } }
@keyframes rain { 0% { top: -10%; opacity: 0; } 10% { top: 2%; opacity: 0.55; } 85% { top: 92%; opacity: 0.55; } 100% { top: 110%; opacity: 0; } }
]])
local cookieKick = 0
local function Cookie(props)
	-- Hover lives in a ref, not state: the spring already carries the visual, so
	-- there is nothing for a re-render to do. Pressing the cookie -- the single
	-- most repeated action in the game -- now costs zero React work.
	local scale = useSpringScale(1)
	local hovered = React.useRef(false)
	-- rotation="0" is load-bearing, not leftover: the host centres AnchorPoint for
	-- any element that declares a rotation, and that is what makes the UIScale
	-- grow about the cookie's middle. Drop it and the anchor reverts to top-left,
	-- so the cookie jumps half its own size down and to the right.
	return e("button", {id="bigCookie",ref=scale.bind,style=style(210,props.y+135,270,270,{
		background="transparent",rotation="0"}),
		onMouseEnter=function() hovered.current=true; scale.to(1.04, COOKIE_RELEASE) end,
		onMouseLeave=function() hovered.current=false; scale.to(1, COOKIE_RELEASE) end,
		onMouseDown=function() scale.to(0.9, COOKIE_PRESS) end,
		onMouseUp=function() scale.to(hovered.current and 1.04 or 1, COOKIE_RELEASE) end,
		onClick=function()
			props.send("click"); props.emit()
			-- Alternating sign with a drifting magnitude: consecutive clicks never
			-- land the same kick twice, so rapid clicking reads as a real wobble
			-- instead of one animation retriggering.
			cookieKick += 1
			scale.kick(hovered.current and 1.04 or 1, { frequency = 4.4, dampingRatio = 0.34,
				impulse = -(0.55 + (cookieKick * 17 % 40) / 100) })
		end},picture("cookieArtwork","Cookie",0,0,270,270))
end
local function Rain(props)
	local kids={}
	for i=1,12 do
		kids[#kids+1]=picture("rainCookie"..i,"Cookie",(i*137)%math.max(1,props.w-26),0,18+(i%3)*4,18+(i%3)*4,
			{["border-radius"]="12px",opacity="0",animation=props.cps>0 and not props.reducedMotion and ("rain "..(5+i%4).."s linear -"..(i*.43).."s infinite") or ""})
	end
	return e("div",{id="cookieRain",style=style(0,0,props.w,props.h,{overflow="hidden"})},table.unpack(kids))
end
local function Cursors(props)
	local kids={}
	for i=1,math.min(props.count,50) do
		local angle=(i-1)/50*math.pi*2
		kids[i]=label("cursor"..i,"\u{261D}",180+math.cos(angle)*172,180+math.sin(angle)*172,30,34,28,"#ffffff",
			{rotation=tostring(math.deg(angle)+90),animation=not props.reducedMotion and ("cursorTap 3s linear -"..(i*.06).."s infinite") or ""})
	end
	return box("cursorOrbit",210,props.y+135,360,360,nil,kids,{rotation="0",animation=not props.reducedMotion and "orbit 120s linear infinite" or ""})
end
local PremiumShop=require(script.Parent.PremiumShop)(React,{label=label,box=box,button=button,style=style,number=number},Model)
local PromoPopups=require(script.Parent.PromoPopups).component(React,{label=label,box=box,button=button,picture=picture,style=style},Model.MonetizationConfig)
return function()
	local remote = script.Parent:WaitForChild("Action")
	local snapshot = Model.snapshot(Model.new())
	snapshot.ready = false
	local audio = makeAudio()
	local alive = true
	local notify = function() end
    local showEmpireInvitation=function()end
    local invitePromptBusy=false
    local function inviteFriends()
        local empire=snapshot.empire
        if not empire or snapshot.empirePending or invitePromptBusy then return end
        invitePromptBusy=true
        task.spawn(function()
            local options=Instance.new("ExperienceInviteOptions")
            options.PromptMessage="Invite friends to your cookie empire!"
            options.LaunchData=game:GetService("HttpService"):JSONEncode({cookieEmpire=empire.id})
            local ok,allowed=pcall(function()
                local social=game:GetService("SocialService")
                if not social:CanSendGameInviteAsync(Players.LocalPlayer) then return false end
                social:PromptGameInvite(Players.LocalPlayer,options)
                return true
            end)
            options:Destroy();invitePromptBusy=false
            if alive and (not ok or not allowed) then notify("Friend invites are unavailable here. You can invite players in this server below.","info") end
        end)
    end
    local feedbackQueue
	local lastEventId = 0
	snapshot.saveStatus = "Connecting…"
	local refresh
	local refreshCounters
	local currentTab = "Buildings"
	local currentPage="Bake"
    local lastPurchaseAt=-math.huge
	local navigateBack=function()return false end
	-- Reflow panels to the actual viewport; text stays at native pixel sizes.
	local displayWidth, displayHeight, uiScale, mobile, contentHeight, landscape
	local guiService=game:GetService("GuiService")
	local input=game:GetService("UserInputService")
	local safeArea
	local function measureViewport()
		local viewport = workspace.CurrentCamera.ViewportSize
		local topLeft,bottomRight=guiService:GetGuiInset()
		local size=safeArea and safeArea.AbsoluteSize
		local width,height=viewport.X-topLeft.X-bottomRight.X,viewport.Y-topLeft.Y-bottomRight.Y
		if size and size.X>0 and size.Y>0 then width,height=size.X,size.Y end
		-- Alt-Tab or an attached keyboard changes PreferredInput, not the device.
		-- Keep compact touch layouts stable when the window loses focus.
		local touchLayout=input.TouchEnabled
		local layout = Layout.measure(width,height,touchLayout)
		uiScale, displayWidth, displayHeight, mobile, contentHeight = layout.scale, layout.width, layout.height, layout.mobile, layout.contentHeight
		landscape=layout.landscape
		-- One typeface on every platform. Desktop used Georgia (Font.Antique)
		-- against mobile's Arial (Font.Gotham) -- two different typefaces, so
		-- the same screen never matched itself across devices.
		uiFont="Arial"
	end
	measureViewport()
	local function columnWidths()
		if mobile then return displayWidth,displayWidth,displayWidth end
		local available = displayWidth - RAILW * 2
		local left=math.min(480,available*.30)
		local store=math.max(340,math.min(440,available*.25))
		return left,available-left-store,store
	end
	local function send(action,...)
		if action~="sync" and not snapshot.ready then notify("Please wait while your bakery opens.","info");return end
        if action~="sync" and action~="click" then lastPurchaseAt=os.clock() end
		if action=="click" then audio.play("click") end
		remote:FireServer(action,...)
	end
	-- Roblox owns the price, exactly as the shop grid does, so the figure on the
	-- card can never drift from what the buy dialog will actually charge. false
	-- means a lookup is in flight; the pane redraws every second, so the number
	-- appears on its own once it lands.
	local rushPrices={}
	local function rushPrice(productId)
		local cached=rushPrices[productId]
		if cached~=nil then return cached or nil end
		rushPrices[productId]=false
		task.spawn(function()
			local ok,info=pcall(function()return Marketplace:GetProductInfoAsync(productId,Enum.InfoType.Product)end)
			rushPrices[productId]=(ok and info and type(info.PriceInRobux)=="number") and info.PriceInRobux or false
		end)
		return nil
	end
	-- Finishing a campaign early is a Robux product. The slot is recorded on the
	-- save first, because a product receipt carries nothing but its id, and then
	-- the server hands back the id to prompt -- the same route the shop uses, so
	-- the product id is never taken on the client's word.
	local function finishCampaignNow(slot,productKey)
		send("economy","adRushIntent",slot)
		task.spawn(function()
			local ok,allowed,id=pcall(function()
				return script.Parent:WaitForChild("PurchaseRequest",5):InvokeServer("Product",productKey)
			end)
			if not ok or not allowed then notify(type(id)=="string" and id or "Shop unavailable. Try again.","error");return end
			if not pcall(function() Marketplace:PromptProductPurchase(Players.LocalPlayer,id) end) then
				notify("Purchase window unavailable. Try again.","error")
			end
		end)
	end
	local function Feedback()
		local message = React.useState(nil)
        if not feedbackQueue then
            feedbackQueue=makeFeedbackQueue(function(value)
                if not alive then return end
                message[2](value)
                if value then audio.play(value.kind) end
            end,task.delay,task.cancel)
            notify=feedbackQueue.push
        end
		local value=message[1]
		local w=math.min(540,displayWidth-20)
		-- Fires on the message changing, not on every render, so a page update
		-- while a toast is up does not restart it.
		if value and value.text ~= feedbackPop.last then
			feedbackPop.last = value.text
			task.defer(function() feedbackPop.pop(0.82, TOAST_POP) end)
		elseif not value then
			feedbackPop.last = nil
		end
		return box("feedback",(displayWidth-w)/2,mobile and math.max(0,displayHeight-172) or 42,w,76,value and value.kind=="error" and "#603728" or "#30462c",{
			label("feedbackText",value and value.text or "",12,8,w-24,60,19,"#ffffff",{["text-align"]="center"})
		},{display=value and "block" or "none",["z-index"]="100",border="2px solid #dabf81",ref=feedbackPop.bind})
	end
	local tooltipHover = 0
	local updateTooltip
	local function setHover(value)
		if tooltipHover == value then return end
		tooltipHover = value
		if updateTooltip then updateTooltip(value) end
	end
    local refreshResources=function()end
    local function ResourceStatus(props)
        local value=React.useState(snapshot)
        local previous=React.useRef("")
        -- Per resource: the last whole amount seen, when it last went up, and by
        -- how much. Detected against the pushes rather than the renders, because
        -- a render only happens when the signature moves and the increment is
        -- precisely what moves it.
        local gains=React.useRef({}).current
        refreshResources=function(nextState)
            local economy=nextState.economy
            -- The countdown belongs in the signature too: floor(energy) only
            -- changes once every few seconds, so without this the timer would
            -- redraw at the same rate as the number it is counting down to.
            local function pending(resource)
                local remaining=Model.secondsToNextPoint(nextState,resource)
                return if remaining then math.ceil(remaining) else -1
            end
            -- Also returns the badge to show, so the signature changes both when
            -- the point lands and when the badge expires. Seeded silently on the
            -- first push: without that, joining would flash "+110".
            local function landed(resource)
                local whole=math.floor(economy[resource])
                local entry=gains[resource]
                if entry==nil then gains[resource]={whole=whole,at=0,amount=0};return 0 end
                if whole>entry.whole then
                    entry.amount,entry.at=whole-entry.whole,os.clock()
                elseif whole<entry.whole then
                    -- Spent, not earned. No badge for going down.
                    entry.amount,entry.at=0,0
                end
                entry.whole=whole
                return if os.clock()-entry.at<GAIN_SECONDS then entry.amount else 0
            end
            local signature=tostring(economy.xp)..":"..math.floor(economy.energy)..":"..math.floor(economy.stamina)..":"..Model.maxEnergy(nextState)..":"..pending("energy")..":"..pending("stamina")..":"..landed("energy")..":"..landed("stamina")
            if signature~=previous.current then previous.current=signature;value[2](nextState) end
        end
        local state=value[1]
        -- Laid out in the profile panel's own space so the two groups can be
        -- placed against each other instead of one being nested inside the
        -- other. The old header put the XP meter directly above the Stamina
        -- label while its own "Lv 1" text sat far away on the name row: by the
        -- law of proximity that bar read as Stamina's. Level and its meter are
        -- a pair now, and energy/stamina are a pair inside a shared region, so
        -- every number sits next to the thing that explains it.
        local width=props.width
        local panelX,panelW=58,math.max(120,width-70)
        local meterWidth=math.max(10,(panelW-38)/2)
        local resourceStatus={}
        for i,resource in {"energy","stamina"} do
            local x=13+(i-1)*(meterWidth+12)
            local maximum=resource=="energy" and Model.maxEnergy(state) or 100
            resourceStatus[#resourceStatus+1]=label(resource.."Amount",(resource=="energy" and "Energy " or "Stamina ")..math.floor(state.economy[resource]).."/"..maximum,x,4,meterWidth,16,13,resource=="energy" and "#a6ddeb" or "#dabbed")
            -- Opposite end of the same line, so the pair reads "how much I have"
            -- / "when I get more" without adding a row. The same slot carries the
            -- "+1" as the point lands, so the wait resolves into its payoff in
            -- place instead of the countdown just vanishing. Empty at full,
            -- because a countdown to nothing is noise.
            local tint=RESOURCE_TINT[resource]
            local entry=gains[resource]
            local landed=entry and entry.amount>0 and os.clock()-entry.at<GAIN_SECONDS
            local remaining=Model.secondsToNextPoint(state,resource)
            if landed or remaining then
                -- One meaning per colour: dim is "still waiting", bright is "it
                -- just landed". An earlier version also brightened this while a
                -- regen pass was active, which left a pass owner unable to tell
                -- the two states apart. The pass already shows itself in the
                -- interval -- 2.5s instead of 5s -- so it needs no colour.
                resourceStatus[#resourceStatus+1]=label(resource.."Timer",
                    if landed then "+"..entry.amount else clock(remaining),
                    x,4,meterWidth,16,13,
                    if landed then tint.bright else tint.dim,
                    {["text-align"]="right"})
            end
            resourceStatus[#resourceStatus+1]=box(resource.."Meter",x,22,meterWidth,4,"#2b2724",{
                box("fill",0,0,meterWidth*math.clamp(state.economy[resource]/maximum,0,1),4,resource=="energy" and "#6abed5" or "#b18bcc",{},{["border-radius"]="2px",border="none"}),
            },{["border-radius"]="2px",border="none"})
        end
        local level=Model.jobLevel(state)
        local levelStart=Model.jobLevelXp(level)
        local levelSpan=Model.jobLevelXp(level+1)-levelStart
        local earned=math.max(0,state.economy.xp-levelStart)
        local xpWidth=150
        local xpX=math.max(58,width-12-xpWidth)
        return e(React.Fragment,nil,
            -- Common region: one inset plate says "these two are the same kind
            -- of fact", which nothing on the old flat slab did.
            box("resourcePanel",panelX,36,panelW,32,"rgba(255,255,255,0.05)",resourceStatus,{["border-radius"]="8px",border="none"}),
            label("workStatus","Lv "..level.." · "..number(earned).."/"..number(levelSpan).." XP",xpX,8,xpWidth,16,12,"#f5d58f",{["text-align"]="right"}),
            box("xpMeter",xpX,26,xpWidth,4,"#2b2724",{
                box("xpFill",0,0,xpWidth*math.clamp(earned/levelSpan,0,1),4,"#f5d58f",{},{["border-radius"]="2px",border="none"}),
            },{["border-radius"]="2px",border="none"}))
    end
	local function Tooltip(props)
		local selection = React.useState(tooltipHover)
		updateTooltip = selection[2]
		local hover = selection[1]
		local state, bulk, sell = props.state, props.bulk, props.sell
		local name, description, cost = "", "", 0
		if hover ~= 0 then
			if type(hover) == "number" then
				local b = Model.Buildings[hover]
				name, description, cost = b.name, "Each " .. b.name:lower() .. " produces " .. number(b.cps * Model.multiplier(state, hover), true) .. " cookies per second.\nOwned: " .. state.buildings[hover], Model.price(state, hover, bulk, sell)
			else
				local u
				for _, candidate in Model.Upgrades do if candidate.id == hover then u = candidate; break end end
				if u then name, description, cost = upgradeNames[u.id] or u.name, upgradeBenefit(u, state) .. " This boost stays after you buy it.", u.price end
			end
		end
		return box("tooltip", select(1, columnWidths()) + select(2, columnWidths()) - 410, 233, 410, 175, "#1d1914", {
				label("tooltipTitle", name, 16, 10, 378, 42, 25, "#f8ead2"), cookieCurrency("tooltipCurrency",16,57), label("tooltipCost", number(cost), 46, 54, 348, 30, 22, state.cookies >= cost and "#9cda78" or "#d68f78"), label("tooltipDescription", description, 16, 92, 378, 68, 17, "#c3b8a8"),
			}, { border = "3px solid #9c8159", ["z-index"] = "40", display = (mobile or hover == 0) and "none" or "block" })
	end
	local emitClick = function() end
	local function ClickEffects()
		local slots=React.useState({})
		local serial=React.useRef(0)
		emitClick=function()
			if snapshot.reducedMotion then return end
			serial.current+=1
			local n=serial.current
			local slot=(n-1)%12
			local mouse=game:GetService("UserInputService"):GetMouseLocation()-guiService:GetGuiInset()
			local scale=uiScale
			local leftWidth = columnWidths()
			local x,y=mouse.X/scale-(leftWidth-420)/2,mouse.Y/scale
			if mobile or x<75 or x>345 then x=landscape and displayWidth*.7 or 210; y=landscape and (contentHeight-50)/2+20 or 138+(contentHeight-178)/2 end
			local elements=table.clone(slots[1])
			local variant=math.floor((n-1)/12)%2==0 and "A" or "B"
			elements[slot*3+1]=label("clickNumber"..slot,"+"..number(snapshot.clickPower,true),x,y-15,130,32,24,"#ffffff",{
				rotation="0",["text-align"]="center",["z-index"]="15",opacity="0",animation="popup"..variant.." 1s ease-out forwards"})
			for j=1,2 do elements[slot*3+1+j]=picture("clickCrumb"..slot.."_"..j,"Cookie",x+(j==1 and -12 or 12),y,12,12,
				{rotation="0",["border-radius"]="5px",["z-index"]="14",opacity="0",animation="crumb"..(j==1 and variant or (variant=="A" and "B" or "A")).." 0.9s linear forwards"}) end
			slots[2](elements)
		end
		return e("div",{id="clickEffects",style=style(0,0,landscape and displayWidth or 420,contentHeight,{["z-index"]="12"})},table.unpack(slots[1]))
	end
	local function Counters(props)
        local state = React.useState(0)
        refreshCounters = state[2]
        -- The rate and the friend boost are one statement about one thing, so
        -- they straddle the true centre with a separator between them. They used
        -- to be pinned either side of an axis 140px right of centre, which read
        -- as two unrelated readouts rather than a single line. The count keeps
        -- the only large type here, so it stays the unmistakable subject.
        local width=props.width
        local half=width/2
        local metaFont=if width<340 then 13 else 15
        return e(React.Fragment, nil,
            label("cookieCount", number(snapshot.cookies) .. (math.floor(snapshot.cookies) == 1 and " cookie" or " cookies"), 12, 68, width-24, 36, 33, "#ffffff", {["text-align"]="center"}),
            label("cps", number(snapshot.cps, true).." / sec",12,104,math.max(20,half-22),20,metaFont,"#ded3c2",{["text-align"]="right"}),
            label("cpsDivider","·",half-6,104,12,20,metaFont,"#6f6558",{["text-align"]="center"}),
            label("friendBoost","Friend boost +"..(snapshot.friendCount or 0).."%",half+10,104,math.max(20,half-22),20,metaFont,"#b6e6bf",{["text-align"]="left"}),
            label("bonusTimer",(snapshot.frenzyUntil or 0)>snapshot.played and ("Baking + taps boosted · "..math.ceil(snapshot.frenzyUntil-snapshot.played).."s") or "",12,128,width-24,22,16,"#f4d28a",{["text-align"]="center"}))
    end

	local function App()
		local renderState = React.useState(0)
		refresh = renderState[2]
		local pageState = React.useState("Bake")
		local page,setPage=pageState[1],pageState[2]
		currentPage=page
		local tabState = React.useState("Buildings")
		local tab, setTab = tabState[1], tabState[2]
		currentTab = tab
		local bulkState = React.useState(1)
		local bulk, setBulk = bulkState[1], bulkState[2]
		local sellState = React.useState(false)
		local sell, setSell = sellState[1], sellState[2]
		local state = snapshot
		local productCache = React.useRef({}).current
        local viewCache = React.useRef({}).current
        local premiumLanding=React.useState("Pass")
		local nameDraft = React.useRef("")
		local confirmFresh=React.useState(false)
		local workPage=React.useState("Jobs")
        local adventurePage=React.useState("Home")
        local stockQuantity=React.useState(1)
        local jarAmount=React.useState(100)
        local empireNameDraft=React.useRef("")
        local empireBadge=React.useState("cookie")
        local empireEdit=React.useState(false)
        local empireMemberPage=React.useState(1)
        local empireRemoveConfirm=React.useState(nil)
        local drawer=React.useState(false)
        -- React unmounts the drawer the instant this flips, so a close has to
        -- animate first and drop the state afterwards. The guard stops a second
        -- click (or the scrim underneath) restarting a close already in flight.
        local function closeDrawer()
            if not drawer[1] or drawerPop.closing then return end
            drawerPop.closing = true
            drawerPop.to((drawerPop.width or 260) + DRAWER_OUT_OVERSHOOT, DRAWER_OUT)
            task.delay(DRAWER_OUT_SECONDS, function()
                drawerPop.closing = false
                drawer[2](false)
            end)
        end
        showEmpireInvitation=function()setPage("More");setTab("Work");workPage[2]("Empire")end
		navigateBack=function()
			if mobile and page~="More" then
				if page=="Bake" then return false end
				setPage("Bake");return true
			end
			if confirmFresh[1] then confirmFresh[2](false)
			elseif empireEdit[1] and tab=="Work" then empireEdit[2](false)
			elseif tab=="Work" and workPage[1]~="Jobs" then workPage[2]("Jobs")
			elseif tab=="Adventure" and adventurePage[1]~="Home" then adventurePage[2]("Home")
			elseif tab=="Options" or tab=="Stats" or tab=="Treat Shop" then setTab("More")
			elseif tab~="Buildings" then setTab("Buildings")
			elseif mobile and page=="More" then setPage("Bake")
			else return false end
			setHover(0);return true
		end
		local h = contentHeight
		local leftW, centerW, storeW = columnWidths()
		local centerX, storeX = mobile and 0 or leftW + RAILW, mobile and 0 or displayWidth - storeW
		-- Navigation gets its own column with a wood-rail edge, matching the rails
		-- that already frame this panel. Every pane coordinate is derived from
		-- centerW, so the rail is taken out of the column rather than laid over
		-- it: shrink the content width and start it after the rail.
		-- Desktop only. A phone measured 389px wide and the rail was taking 78 of
		-- them (20%), pushing the content column off x=0; on the More page the rail
		-- and the content then sat side by side in what was left. Mobile gets the
		-- horizontal strip instead, mounted into the content column further down.
		local NAVW = if mobile then 0 else 72
		local NAVRAIL = if mobile then 0 else RAILW
		local navX=centerX
		centerX+=NAVW+NAVRAIL
		centerW-=NAVW+NAVRAIL
		local bakeryOffset=landscape and 0 or (leftW-420)/2
		local productX=landscape and math.floor(storeW*.44) or 0
		local boostW=landscape and productX-16 or storeW
		local productW=storeW-productX
		local controlW=(productW-16)/5
		local wave = React.useRef({}).current
		if wave.width ~= leftW then
			wave.width, wave.points = leftW, {}
			-- Keep the 80px repeating wave and its 80px motion in the same
			-- scaled coordinate space, so wrapping is visually seamless.
			for i=0,math.min(99,math.ceil((leftW+160)/40)) do
				wave.points[#wave.points+1] = Path2DControlPoint.new(UDim2.fromScale(i*40/(leftW+160),(i%2==0 and 2 or 6)/12),UDim2.fromScale(-13/(leftW+160),0),UDim2.fromScale(13/(leftW+160),0))
			end
		end
		local titleStyle = { ["text-align"] = "center" }
        local unlocked=0
        for _,earned in state.achievements do if earned then unlocked+=1 end end
        local milkHeight=math.min(h*.12,64,26+unlocked*.8)
        local leftSignature=table.concat({leftW,h,tostring(landscape),uiFont,state.bakery,math.min(state.buildings[1],50),unlocked,tostring(state.reducedMotion)},"|")
        local left=remember(viewCache,"bakery",leftSignature,function()
		local left = {}
        local profileWidth=landscape and leftW*.45 or leftW
        local avatar=e("img",{id="playerAvatar",style=style(2,2,34,34,{
            background="transparent",["background-image"]="url(rbxthumb://type=AvatarHeadShot&id="..Players.LocalPlayer.UserId.."&w=150&h=150)",["object-fit"]="contain",["border-radius"]="17px",
        })})
        -- Every element now left-aligns to 58 -- clear of the 46px avatar ring,
        -- which the old 48 sat 2px from -- or right-
        -- aligns to 12 from the edge (level, XP) instead of the four different
        -- margins the old header used, and a closing rule separates the panel
        -- from the stage below rather than letting it bleed into the stripes.
        left[#left+1]=box("playerProfile",-bakeryOffset,0,profileWidth,126,"rgba(0,0,0,0.38)",{
            box("avatarRing",8,5,38,38,"rgba(255,255,255,0.13)",{avatar},{["border-radius"]="19px",border="none"}),
            label("bakeryName",state.bakery,58,8,math.max(40,profileWidth-240),24,17,"#f4e9d9"),
            e(Counters,{key="counters",width=profileWidth}),
            e(ResourceStatus,{key="resourceStatus",width=profileWidth}),
            box("profileEdge",0,124,profileWidth,2,"rgba(255,255,255,0.08)",{},{border="none"}),
        },{["z-index"]="5"})
		local cookieY = 0
		local cookieScale = math.min(1, math.max(0.25, (h - (landscape and 70 or 190)) / 380))
		local scene = {}
		scene[#scene + 1] = picture("cookieShine","CookieShine",210,cookieY+135,380,380,{rotation="0",animation=not state.reducedMotion and "shine 60s linear infinite" or ""})
		scene[#scene + 1] = box("cookieHalo", 55, cookieY - 20, 310, 310, "rgba(180,224,255,0.08)", {}, { ["border-radius"] = "155px" })
		scene[#scene + 1] = box("cookieHaloInner", 67, cookieY - 8, 286, 286, "rgba(165,218,255,0.09)", {}, { ["border-radius"] = "143px" })
		scene[#scene + 1] = e(Cookie, { key = "cookie", y = cookieY, send = send, emit=function() emitClick() end })
		scene[#scene + 1] = e(Cursors,{key="cursors",count=state.buildings[1],y=cookieY,reducedMotion=state.reducedMotion})
		left[#left+1] = box("cookieScene",(landscape and leftW*.7 or 210)-210*cookieScale,(landscape and (h-50)/2+20 or 138+(h-178)/2)-135*cookieScale,420,math.max(380,h),nil,scene,{transform="scale("..cookieScale..")",["z-index"]="3"})
		left[#left + 1] = e(ClickEffects,{key="effects"})
		left[#left + 1] = box("milk", -bakeryOffset, h - milkHeight, leftW, milkHeight, "linear-gradient(90deg, #e8e7dd, #a8bfca)",{}, {["z-index"]="0"})
		left[#left + 1] = box("milkWave",-bakeryOffset-80,h-milkHeight,leftW+160,12,nil,{
			e("path2d",{key="milkFoam",id="milkFoam",color="#faf5e8",thickness=8,controlPoints=wave.points})
		},{animation=not state.reducedMotion and "milkFlow 4s linear infinite" or "",transition="top 0.8s ease-out",["z-index"]="1"})
        local milkBonus,milkProgress=Model.milkBonus(state)
        left[#left+1]=label("milkBonus","Milk +"..milkBonus.."% · "..(unlocked==#Model.Achievements and "All badges!" or milkProgress.."/5 badges"),-bakeryOffset+8,h-66,leftW-16,24,14,"#f0f5f8",{["z-index"]="2",background="rgba(20,31,41,0.8)",["text-align"]="center",["border-radius"]="8px"})
		left[#left + 1] = label("version", "v1", -bakeryOffset+leftW-28, h - 22, 24, 20, 10, "#516572",{["z-index"]="2"})
            return left
        end)
		local center = { stripes("brownStripes", centerW, h, "#211d19", "#28231e") }
        local workSections={
            {"Jobs","WashCookieTray"},{"Properties","CookieStore"},{"Shop","Spatula"},{"Bag","CookieTray"},
            {"Collection","CookieCrown"},{"Jar","CookieJar"},{"Charity","CookieFestival"},{"Empire","CookieEmpire"},
            {"Decor","CookiePrism"},
        }
        -- Which pane is on screen. Changing it replays the card entrance.
        local paneKey=tab..":"..workPage[1]..":"..adventurePage[1]
        -- Cleared in place: the entrance configs hold a reference to this table.
        if paneKey~=entrancePane then entrancePane=paneKey;table.clear(entranceSeen) end
        -- Jobs owns the Adventure/Work pair, so it stays lit for either of them.
        local jobsOpen=tab=="Adventure" or (tab=="Work" and (workPage[1]=="Jobs" or workPage[1]=="Ads"))
        local innerTabs=jobsOpen and (tab~="Adventure" or adventurePage[1]=="Home")
        -- The rail sizes itself to the column: eight destinations plus the
        -- burger, never scrolling, never competing for width.
        -- Roblox frames default to BorderSizePixel 1 in a navy grey, and the host
        -- only zeroes it when a css border-width is actually set, so every thin
        -- box below states a border in its own colour rather than the default.
        local navItems={}
        local activeNavIndex=0
        local navSlots=#workSections+1
        -- Vertical down the rail on desktop. On mobile it becomes a fixed grid
        -- docked to the BOTTOM of the column. A horizontal scrolling strip at
        -- the top failed twice over on a phone: the top of a tall screen is
        -- outside the thumb's arc, and side-scrolling hid four of the nine
        -- destinations behind an affordance that was just a clipped tile. The
        -- grid shows every destination at once and sits where the thumb rests.
        local NAV_COLS=5
        local navRows=math.ceil(navSlots/NAV_COLS)
        local navPad,navGap=4,3
        local navPitch=if mobile then 0 else math.clamp((h-16)/navSlots,44,62)
        local navItemH=if mobile then 48 else navPitch-4
        local navItemW=if mobile then math.floor((centerW-navPad*2-(NAV_COLS-1)*navGap)/NAV_COLS) else NAVW
        local navIcon=if mobile then 24 else math.clamp(navItemH-24,18,34)
        -- Desktop's tile is tall enough to leave the label loose. The mobile tile
        -- is 48px and also has to fit the active underline beneath the label, so
        -- it tucks the label up and takes 2px off its height.
        local navLabelY=if mobile then navIcon+3 else navIcon+6
        local navLabelH=if mobile then 14 else 16
        local navDockH=if mobile then navPad*2+navRows*navItemH+(navRows-1)*navGap else 0
        -- The Bake/Shop/More bar's artwork is drawn 26px above its own frame, so
        -- the dock reserves a strip that the art can overhang without landing on
        -- the bottom row's labels. The dock's background still runs the whole way
        -- down to the bar; only the tiles stop short.
        local navDockLift=if mobile then 28 else 0
        -- Nine items over five columns leaves the last row short. Centre it, so
        -- the dock stays symmetric rather than trailing an empty cell.
        local function navCell(index)
            local row=math.ceil(index/NAV_COLS)
            local firstOfRow=(row-1)*NAV_COLS+1
            local inRow=math.min(NAV_COLS,navSlots-firstOfRow+1)
            local rowW=inRow*navItemW+(inRow-1)*navGap
            return (centerW-rowW)/2+(index-firstOfRow)*(navItemW+navGap),
                   navPad+(row-1)*(navItemH+navGap)
        end
        for i,section in workSections do
            local name=section[1]
            local active=if name=="Jobs" then jobsOpen else tab=="Work" and workPage[1]==name
            local kids={
                picture("navPicture",section[2],(navItemW-navIcon)/2,4,navIcon,navIcon),
                label("navName",name,1,navLabelY,navItemW-2,navLabelH,11,active and "#fff8ec" or "#9d9081",{["text-align"]="center"}),
            }
            -- Marker on the leading edge, the convention every rail-shaped nav uses.
            if active then activeNavIndex = i end
            -- "none" leaves the default navy border in place; on the filled
            -- active item that reads as a black outline, so state it explicitly.
            local navX0,navY0
            if mobile then
                navX0,navY0=navCell(i)
                -- The rail's sliding marker is desktop-only, so the lit tile
                -- carries its own underline here.
                if active then kids[#kids+1]=box("navUnderline",(navItemW-22)/2,navItemH-5,22,3,"#e9a827",{},{border="none",["border-radius"]="2px"}) end
            else
                navX0,navY0=0,8+(i-1)*navPitch
            end
            navItems[#navItems+1]=button("nav"..name,"",navX0,navY0,navItemW,navItemH,function()setTab("Work");workPage[2](name)end,{background=active and "#241f19" or "none",border="none"},kids)
        end
        local burgerX,burgerY
        if mobile then burgerX,burgerY=navCell(navSlots) else burgerX,burgerY=0,8+#workSections*navPitch end
        navItems[#navItems+1]=button("openMore","",burgerX,burgerY,navItemW,navItemH,function() if drawer[1] then closeDrawer() else drawer[2](true) end end,{background="none",border="none"},{
            -- A 1px stroke sits outside the frame, so each 2px rule draws 4px:
            -- space them 8 apart or they close up into a solid block.
            box("burger1",(navItemW-18)/2,navItemH/2-9,18,2,"#9d9081",{},{["border-radius"]="2px"}),
            box("burger2",(navItemW-18)/2,navItemH/2-1,18,2,"#9d9081",{},{["border-radius"]="2px"}),
            box("burger3",(navItemW-18)/2,navItemH/2+7,18,2,"#9d9081",{},{["border-radius"]="2px"}),
        })
        -- Mobile mounts the same tiles into a dock across the bottom of the
        -- content column; desktop keeps them in the rail with its wood edge.
        -- Below the scrim's z-index, so an open drawer covers the dock the way
        -- a modal should rather than leaving live controls under it.
        if mobile then
            table.insert(navItems,1,box("navDockEdge",0,0,centerW,2,"#3a3226",{},{border="none"}))
            center[#center+1]=box("navDock",0,h-navDockH-navDockLift,centerW,navDockH+navDockLift,"#1c1815",navItems,{border="none",["z-index"]="6"})
            navItems={}
        else
            navItems[#navItems+1]=rail("navEdge",NAVW,0,NAVRAIL,h)
        end
        -- Marker rides to whichever tile is lit. Hidden outright when none is,
        -- so leaving the section does not leave a bar parked on nothing. It only
        -- exists on the rail: the mobile strip scrolls, and a marker positioned
        -- against a scrolling canvas would drift out of step with its tile.
        if navMarker.frame then
            navMarker.frame.Visible = (not mobile) and activeNavIndex > 0
            if not mobile and activeNavIndex > 0 then
                springTo(navMarker, 8+(activeNavIndex-1)*navPitch+6, NAV_MARKER, 3, navItemH-12)
            end
        end
        -- With navigation in the rail the content column has no header of its
        -- own, so the inner pair sits at the top of the panel it belongs to.
        if innerTabs then
            center[#center+1]=box("innerBackdrop",0,0,centerW,math.max(0,h-navDockH-navDockLift),"#241f19")
            -- Three destinations now, so the row is measured rather than hard
            -- coded. "Advertisements" does not fit beside the other two on a
            -- phone, and a clipped pill is worse than a short one.
            local roomy=centerW>=470
            local pills={
                {id="Adventure",text="Adventure",width=110},
                {id="Work",text="Work",width=78},
                {id="Ads",text=if roomy then "Advertisements" else "Ads",width=if roomy then 148 else 62},
            }
            local pillsW=-14
            for _,pill in pills do pillsW+=pill.width+14 end
            local pillX=(centerW-pillsW)/2
            for _,pill in pills do
                local active=if pill.id=="Adventure" then tab=="Adventure" else tab=="Work" and workPage[1]==(if pill.id=="Ads" then "Ads" else "Jobs")
                center[#center+1]=button("inner"..pill.id,pill.text,pillX,12,pill.width,30,function()
                    if pill.id=="Adventure" then setTab("Adventure");adventurePage[2]("Home")
                    else setTab("Work");workPage[2](if pill.id=="Ads" then "Ads" else "Jobs") end
                end,{background=active and "#3a3025" or "none",border="none",color=active and "#fff0d8" or "#8a7f6d",["border-radius"]="999px",["font-size"]="15px"})
                pillX+=pill.width+14
            end
        end
        local contentY=if innerTabs then 50 else 6
		if tab == "Buildings" then
			local rows = {}
			local row = 0
			for i, b in Model.Buildings do
				if state.buildings[i] > 0 then
                    local rowIndex=row
                    local rowSignature=table.concat({centerW,rowIndex,state.buildings[i],Model.multiplier(state,i),uiFont},"|")
                    rows[#rows+1]=remember(viewCache,"buildingScene"..i,rowSignature,function()
                    local children = {
                        label("ownedTitle" .. i, b.name, 18, 6, 390, 26, 24, "#ffffff"),
						label("ownedCps" .. i, number(b.cps * state.buildings[i] * Model.multiplier(state, i), true) .. " cookies / second", 18, 35, 400, 22, 14, "#ddd4c6"),
						label("ownedCount" .. i, tostring(state.buildings[i]), centerW - 110, 6, 72, 48, 40, "#e2d7c5", { ["text-align"] = "right" }),
					}
					for k = 1, math.min(state.buildings[i], 14) do
						children[#children + 1] = buildingPicture("sprite" .. i .. "_" .. k,i,16+(k-1)*41,62,38,48)
					end
					children[#children + 1] = rail("rowRail" .. i, 0, 117, centerW - 12, 7)
					return box("buildingScene" .. i, 0, row * 124, centerW - 12, 124, row % 2 == 0 and "#37352d" or "#302d27", children,{["--zone-background"]=ImageNames.buildingBackgrounds[i]})
                    end)
					row += 1
				end
			end
			if row == 0 then
				-- This branch only runs while nothing is owned, so it is the first-run
				-- screen and the goal is always the cheapest building. A visible target
				-- with visible progress beats an empty column and a line of grey text.
				local goal = Model.Buildings[1]
				local goalPrice = Model.price(state, 1, 1, false)
				local progress = math.clamp(state.cookies / goalPrice, 0, 1)
				local cardW = math.min(centerW - 60, 400)
				local cardX = (centerW - cardW) / 2
				springTo(goalBar, (cardW - 52) * progress, GOAL_FILL, nil, 10)
				rows[#rows + 1] = label("emptyHint", "Click the cookie to bake.", 25, 24, centerW - 50, 34, 22, "#b3a795", titleStyle)
				rows[#rows + 1] = box("firstGoal", cardX, 74, cardW, 196, "#2b2620", {
					label("goalEyebrow", "YOUR NEXT GOAL", 0, 18, cardW, 20, 12, "#9d9081", {["text-align"]="center",["letter-spacing"]="2px"}),
					buildingPicture("goalIcon", 1, (cardW - 64) / 2, 44, 64, 64),
					label("goalName", goal.name, 0, 114, cardW, 28, 21, "#fff4df", {["text-align"]="center"}),
					box("goalTrack", 26, 152, cardW - 52, 10, "#1b1713", {}, {["border-radius"]="5px", ref=goalBar.bind}),
					label("goalCount", number(math.floor(state.cookies)) .. " / " .. number(goalPrice) .. " cookies", 0, 166, cardW, 24, 15, "#c6b9a7", {["text-align"]="center"}),
				}, {["border-radius"]="14px", border="1px solid #3f382e"})
				rows[#rows + 1] = label("emptySub", "A " .. goal.name:lower() .. " bakes for you automatically. Buy one in the store.", 30, 286, centerW - 60, 46, 16, "#8c8070", titleStyle)
			end
			center[#center + 1] = e("scroll", { key = "buildingScenes", id = "buildingScenes", style = style(0, contentY, centerW, math.max(30,h - contentY - navDockH - navDockLift - 4), { overflow = "scroll" }) }, table.unpack(rows))
		else
			-- The centred pills already title the page, so the label would double up.
			local pane = (tab=="Work" or innerTabs) and {} or { label("panelTitle", tab, 24, 12, centerW-48, 40, 32, "#fff0d8") }
			-- The Adventure/Work/More row used to be the only way off these three
			-- screens; with it gone they need an exit of their own.
			if tab=="Options" or tab=="Stats" or tab=="Treat Shop" then
				pane[#pane+1]=button("leafBack","Back",centerW-108,12,84,40,function()setTab("Buildings")end,{["font-size"]="17px"})
			end
			if tab == "More" then
                pane[#pane+1]=button("openOptions","Options",24,68,centerW-48,52,function()setTab("Options")end)
                pane[#pane+1]=button("openStats","Stats",24,132,centerW-48,52,function()setTab("Stats")end)
                pane[#pane+1]=button("openPremium","Passes & goodies",24,196,centerW-48,60,function()setTab("Treat Shop")end,{background="#765a27"})
            elseif tab == "Treat Shop" then
                pane[#pane+1]=e(PremiumShop,{key="premiumShop",state=state,width=centerW-48,initialCategory=premiumLanding[1]})
            elseif tab == "Stats" then
				local stats = {
					{ "Cookies in bank", number(state.cookies) }, { "Cookies baked (all time)", number(state.earned) },
					{ "Cookies per second", number(state.cps, true) }, { "Cookies per click", number(state.clickPower, true) },
					{ "Cookie clicks", number(state.clicks) }, { "Hand-made cookies", number(state.handmade) },
					{ "Run duration", math.floor(state.played / 60) .. " minutes" }, { "Achievements", unlocked .. " / " .. #Model.Achievements },
				}
				local statWidth=centerW-48
				local stacked=statWidth<540
				local rowHeight=stacked and 76 or 40
				local nameWidth=stacked and statWidth or math.floor(statWidth*.5)-8
				for i, pair in stats do
					local rowY=68+(i-1)*rowHeight
					pane[#pane + 1] = label("statName" .. i, pair[1], 24,rowY,nameWidth,32,17)
					pane[#pane + 1] = label("statValue" .. i, pair[2],stacked and 24 or 24+nameWidth+16,rowY+(stacked and 32 or 0),stacked and statWidth or statWidth-nameWidth-16,36,19,"#d4b474",{["text-align"]=stacked and "left" or "right"})
				end
				local achievementY=68+#stats*rowHeight+16
				local achievementHeight=stacked and 88 or 56
				pane[#pane + 1] = label("achievementHeading", "Achievements",24,achievementY,statWidth,36,27)
				for i, a in Model.Achievements do pane[#pane + 1] = label("achievement" .. i, (state.achievements[a[1]] and "Done: " or "Goal: ") .. a[1] .. "  —  " .. a[2],24,achievementY+44+(i-1)*achievementHeight,statWidth,achievementHeight-4,16,state.achievements[a[1]] and "#e6c980" or "#877c6e") end
			elseif tab == "Options" then
				pane[#pane + 1] = button("saveGame", "Save now", 24, 74, 150, 48, function() send("save") end)
				pane[#pane + 1] = label("saveStatus", state.saveStatus or "", 190, 74, centerW-214, 60, 17)
				pane[#pane + 1] = label("saveExplanation", "Your bakery saves every minute. Come back later to collect up to 8 hours of cookies! Test games reset when testing stops.", 24, 137, centerW-48, 100, 18)
				pane[#pane+1] = button("soundToggle",state.soundEnabled~=false and "Sounds: on" or "Sounds: off",24,250,200,48,function()
					local enabled=snapshot.soundEnabled==false
					audio.setEnabled(enabled)
					send("sound",enabled)
				end)
				local volume=state.soundVolume or 100
				local function changeVolume(delta)
					local nextVolume=math.clamp((snapshot.soundVolume or 100)+delta,0,100)
					audio.setVolume(nextVolume);send("volume",nextVolume)
					if snapshot.soundEnabled~=false then audio.play("success") end
				end
				pane[#pane+1]=button("volumeDown","−",24,310,48,48,function()changeVolume(-10)end,{["font-size"]="26px"})
				pane[#pane+1]=label("volumeValue","Volume "..volume.."%",80,318,centerW-160,34,20,"#fff4df",{["text-align"]="center"})
				pane[#pane+1]=button("volumeUp","+",centerW-72,310,48,48,function()changeVolume(10)end,{["font-size"]="26px"})
				pane[#pane+1] = button("motionToggle",state.reducedMotion and "Movement: less" or "Movement: full",24,370,220,48,function()send("motion",not snapshot.reducedMotion)end)
				pane[#pane+1] = label("renameLabel","Name your bakery",24,435,centerW-48,30,21)
				pane[#pane+1] = e("input",{key="bakeryInput",id="bakeryInput",style=style(24,475,centerW-48,48,{background="#eee5d2",color="#211d19",["font-size"]="20px"}),onChange=function(event)nameDraft.current=event.value end})
				pane[#pane+1] = button("renameBakery","Use this name",24,538,220,48,function()send("rename",nameDraft.current)end)
            elseif tab == "Work" then
                local economy=state.economy
                local y,w=8,centerW-48
                local function text(id,value,height)
                    pane[#pane+1]=label(id,value,24,y,w,height or 64,18,"#eee5dc");y+=(height or 64)+8
                end
                local function action(id,title,kind,arg)
                    pane[#pane+1]=button(id,title,24,y,w,48,function()send("economy",kind,arg)end,{["font-size"]="18px"});y+=56
                end
                if workPage[1]=="Jobs" then
                    local jobIndex=0
                    for _,job in Model.Jobs do
                        jobIndex+=1
                        local locked=Model.jobLevel(state)<job.level
                        local ready=not locked and economy.energy>=job.energy
                        local reward=Model.jobReward(state,job)
                        local jobY=y
                        local jobSignature=table.concat({w,jobY,uiFont,reward,tostring(locked),tostring(ready)},"|")
                        pane[#pane+1]=remember(viewCache,"jobCard"..job.id,jobSignature,function()
                        local card={
                            picture("jobPicture",ImageNames.jobs[job.id],12,14,52,52),
                            label("jobTitle",job.name,76,10,w-88,52,21,"#fff4df"),
                            label("jobRewards",number(reward).." cookies",14,72,w-28,36,19,"#ffe3a3"),
                            label("jobXp","+"..job.xp.." XP",14,112,w-150,28,18,"#b6e6bf"),
                            label("jobDrop",math.floor(job.chance*100).."% item chance",14,174,w-28,26,16,"#ddd2ff"),
                            button("doJob"..job.id,locked and "Level "..job.level or "Do it!",w-128,120,114,48,function()send("economy","job",job.id)end,{background=ready and "#276849" or "#51483d",["font-size"]="22px"}),
                            label("jobEnergy",job.energy.." energy",14,142,w-150,26,18,"#9fdcf6"),
                        }
                        return box("jobCard"..job.id,24,jobY,w,210,"#342d25",card,{border="1px solid #827052",["border-radius"]="12px",ref=springIn("jobCard"..job.id,jobIndex),["--zone-background"]=ImageNames.jobBackgrounds[job.id]})
                        end);y+=222
                    end
                elseif workPage[1]=="Ads" then
                    local ads=economy.ads or {}
                    local slots=Model.adSlots(state)
                    local baseSlots=Model.Balance.AdSlots
                    text("adsIntro","Book a campaign, then collect it when it finishes. Timers only run while you are in the game.",44)
                    -- Slots first: what is already running is what a returning
                    -- player came here to check, so it never sits below the menu.
                    for slot=1,math.max(slots,baseSlots+Model.Balance.AdSlotsVip) do
                        local entry=ads[slot]
                        local slotY=y
                        if entry then
                            local ad
                            for _,candidate in Model.Ads do if candidate.id==entry.id then ad=candidate; break end end
                            local total=if ad then ad.seconds else 1
                            local done=entry.remaining<=0
                            local progress=math.clamp(1-entry.remaining/math.max(1,total),0,1)
                            local barW=w-28
                            local card={
                                label("adSlotName",if ad then ad.name else "Campaign",14,10,w-28,28,20,"#fff4df"),
                                box("adSlotTrack",14,44,barW,22,"#221d19",{
                                    box("adSlotFill",0,0,barW*progress,22,if done then "#3f7a55" else "#4d7ea8",{},{["border-radius"]="6px",border="none"}),
                                },{["border-radius"]="6px",border="none"}),
                                label("adSlotTime",if done then "Ready to collect" else countdown(entry.remaining).." left",14,46,barW,20,15,"#f2ecdf",{["text-align"]="center"}),
                                label("adSlotReward",number(entry.reward).." cookies  ·  +"..math.floor(entry.xp).." XP"..(if ad then "  ·  "..math.floor(ad.chance*100).."% item" else ""),14,74,w-28,24,16,"#ffe3a3"),
                            }
                            if done then
                                card[#card+1]=button("adCollect"..slot,"COLLECT",14,104,w-28,44,function()send("economy","adCollect",slot)end,{background="#276849",["font-size"]="19px"})
                            else
                                local halfW=(w-40)/2
                                local rushKey=if ad then ad.rush else "FinishCampaign"
                                local rushProduct=Model.MonetizationConfig.Products[rushKey]
                                local rushRobux=if rushProduct then rushPrice(rushProduct.ProductId) else nil
                                card[#card+1]=button("adRush"..slot,"Finish now",14,104,halfW,44,function()finishCampaignNow(slot,rushKey)end,{background="#8a6b22",["font-size"]="17px"})
                                card[#card+1]=label("adRushCost"..slot,if rushRobux then rushRobux.." Robux" else "with Robux",14,150,halfW,20,13,"#e2c98a",{["text-align"]="center"})
                                card[#card+1]=button("adCancel"..slot,"Cancel",26+halfW,104,halfW,44,function()send("economy","adCancel",slot)end,{background="#5a2f2b",["font-size"]="17px"})
                            end
                            pane[#pane+1]=box("adSlot"..slot,24,slotY,w,if done then 160 else 178,"#342d25",card,{border="1px solid #827052",["border-radius"]="12px",ref=springIn("adSlot"..slot,slot),["--zone-background"]=if ad then ad.zone else nil})
                            y+=(if done then 160 else 178)+12
                        elseif slot>slots then
                            -- Empty and locked slots stay one slim line. Three
                            -- stacked placeholder cards pushed the campaign list
                            -- most of a screen down, which is the opposite of
                            -- what someone with nothing running came here for.
                            pane[#pane+1]=box("adSlotLocked"..slot,24,slotY,w,56,"#26221e",{
                                label("adLockedTitle","Slot "..slot.." · LOCKED — VIP unlocks a third campaign slot",14,16,w-28,24,15,"#6f675c",{["text-align"]="center"}),
                            },{border="1px solid #3d372f",["border-radius"]="12px",ref=springIn("adSlotLocked"..slot,slot)})
                            y+=68
                        else
                            pane[#pane+1]=box("adSlotEmpty"..slot,24,slotY,w,56,"#2b2620",{
                                label("adEmptyTitle","Slot "..slot.." open · pick a campaign below",14,16,w-28,24,15,"#8d8375",{["text-align"]="center"}),
                            },{border="1px dashed #4a4239",["border-radius"]="12px",ref=springIn("adSlotEmpty"..slot,slot)})
                            y+=68
                        end
                    end
                    local free=slots-#ads
                    text("adsHeading",if free>0 then "Campaigns  ·  "..free.." slot"..(if free==1 then "" else "s").." free" else "Campaigns  ·  no free slots",34)
                    local adIndex=0
                    for _,ad in Model.Ads do
                        adIndex+=1
                        local cost=Model.adCost(state,ad)
                        local reward=Model.adReward(state,ad)
                        local affordable=state.cookies>=cost and free>0
                        local rowY=y
                        pane[#pane+1]=box("adRow"..ad.id,24,rowY,w,104,"#312b24",{
                            picture("adPicture",ad.image,12,14,44,44),
                            label("adName",ad.name,68,10,w-210,28,19,"#fff4df"),
                            label("adFacts",span(ad.seconds).."  ·  "..number(reward).." cookies  ·  +"..ad.xp.." XP  ·  "..math.floor(ad.chance*100).."% item",68,40,w-88,22,14,"#b9ad9b"),
                            label("adCost","Costs "..number(cost).." up front",68,64,w-88,22,14,if affordable then "#b6e6bf" else "#c08a7f"),
                            button("adStart"..ad.id,"START",w-138,26,124,44,function()send("economy","adStart",ad.id)end,{background=if affordable then "#276849" else "#51483d",["font-size"]="18px"}),
                        },{border="1px solid #443c32",["border-radius"]="12px",ref=springIn("adRow"..ad.id,adIndex)})
                        y+=116
                    end
                elseif workPage[1]=="Decor" then
                    local level=Model.jobLevel(state)
                    local owned,bonus=0,Model.decorBonus(state)
                    for _,d in Model.Decor do if Model.decorOwned(state,d.id) then owned+=1 end end
                    text("decorIntro","Decorate the bakery. Every piece you put up is a permanent boost to everything you bake.",44)
                    -- The player's level lives up here rather than repeated on
                    -- every locked card: the per-card version ran to 262px and
                    -- the card's text column is 173px on a phone.
                    text("decorTotal","Level "..level.."  ·  "..owned.."/"..#Model.Decor.."  ·  +"..math.floor((bonus-1)*100+.5).."% baking",30)
                    -- Only the piece being worked toward is shown. Ten cards of
                    -- which nine said "Needs level 40" was a wall of things the
                    -- player cannot act on; the header still says how many exist.
                    local nextD,nextIndex=Model.nextDecor(state)
                    local showing=if nextD then {nextD} else {}
                    if not nextD then
                        text("decorDone","Every piece is up. The bakery is fully decorated.",30)
                    end
                    local decorIndex=0
                    for _,d in showing do
                        decorIndex+=1
                        local have=Model.decorOwned(state,d.id)
                        local reachable=Model.decorUnlocked(state,d)
                        local cost=Model.decorCost(state,d)
                        local affordable=reachable and not have and state.cookies>=cost
                        local rowY=y
                        -- Price gets its own line rather than riding inside the
                        -- button: on a phone the text column is about 170px, and
                        -- "1 million cookies" does not fit beside a verb there.
                        -- The card is 140 tall and the art reaches y=130, so the
                        -- bottom row has to finish by 130.
                        local card={
                            picture("decorArt",d.image,10,10,130,120,{["border-radius"]="8px",["object-fit"]="cover",opacity=if have then "1" else "0.45"}),
                            label("decorName",d.name,150,12,w-168,28,21,if have then "#ffe3a3" else "#fff4df"),
                            label("decorBoost","+"..math.floor(d.bonus*100).."% baking, forever",150,42,w-168,22,16,"#b6e6bf"),
                        }
                        if have then
                            card[#card+1]=label("decorState","OWNED",150,70,w-168,24,15,"#e9a827",{["letter-spacing"]="1px"})
                        elseif not reachable then
                            card[#card+1]=label("decorState","Needs level "..d.level,150,70,w-168,24,16,"#c08a7f")
                        else
                            card[#card+1]=label("decorPrice",number(cost).." cookies",150,66,w-168,24,17,if affordable then "#ffe3a3" else "#c08a7f")
                            card[#card+1]=button("buyDecor"..d.id,"Buy",150,94,math.min(200,w-168),36,function()send("economy","buyDecor",d.id)end,{background=if affordable then "#276849" else "#51483d",["font-size"]="17px"})
                        end
                        pane[#pane+1]=box("decorCard"..d.id,24,rowY,w,140,if have then "#37312a" else "#312b24",card,{border="1px solid "..(if have then "#9a7f45" else "#443c32"),["border-radius"]="12px",ref=springIn("decorCard"..d.id,decorIndex)})
                        y+=152
                        -- One line of what comes after, so the ladder is still
                        -- visible without ten cards of it.
                        local after=Model.Decor[(nextIndex or 0)+1]
                        if after then text("decorAfter","Then "..after.name.." at level "..after.level..".",28) end
                    end
                elseif workPage[1]=="Properties" then
                    text("propertyIncome","Your places: +"..number(Model.propertyIncome(state),true).." cookies / sec",38)
                    local propertyIndex=0
                    for _,property in Model.Properties do
                        propertyIndex+=1
                        local card={
                            picture("propertyArt",ImageNames.properties[property.id],12,18,56,56),
                            label("propertyName",property.name,80,10,w-92,28,22,"#fff4df"),
                            label("propertyCount","Own "..(economy.properties[property.id] or 0).."  |  +"..number(property.income*Model.collectionBonus(state)*(1+Model.empireBonus(state))^2*Model.friendMultiplier(state)*Model.passFactor(state,"PropertyIncome")*Model.passFactor(state,"CookieGain")*Model.milkMultiplier(state),true).." / sec each",80,44,w-92,40,18,"#b6e6bf"),
                            button("buyProperty"..property.id,"Buy: "..number(Model.propertyPrice(state,property.id)),12,94,w-24,48,function()send("economy","property",property.id)end,{background="#276849",["font-size"]="21px"}),
                        }
                        if property.id=="stand" then
                            -- Full bleed with the card's own radius, matching every
                            -- other property card; the CanvasGroup does the rounding.
                            card={standBackground(w,154,"12px"),box("propertyControls",0,0,w,154,nil,card,{["z-index"]="2"})}
                        end
                        pane[#pane+1]=box("propertyCard"..property.id,24,y,w,154,"#342d25",card,{border="1px solid #827052",["border-radius"]="12px",overflow="hidden",ref=springIn("propertyCard"..property.id,propertyIndex),["--zone-background"]=property.id~="stand" and ImageNames.propertyBackgrounds[property.id] or nil});y+=166
                    end
                elseif workPage[1]=="Collection" then
                    -- Deliberately not the Bag list. Bag is an inventory: rows, counts,
                    -- actions. Collection is an album -- a grid of slots where a missing
                    -- piece is a faded silhouette and a displayed one wears a gold frame,
                    -- so what you have and what you are missing reads at a glance.
                    text("collectionHelp","Baking, jobs & property boost: +"..math.floor((Model.collectionBonus(state)-1)*100+.5).."%",52)
                    local rarityColors={Common="#b4c4d0",Uncommon="#89cf9e",Rare="#93b5ff",Legendary="#f5cd70",Exclusive="#e9a5f0"}
                    local slotW=(w-16)/2
                    local slot=0
                    for _,item in Model.Items do
                        slot+=1
                        local owned=economy.inventory[item.id] or 0
                        local displayed=economy.collection[item.id]
                        local art=displayed and "1" or (owned>0 and "0.8" or "0.22")
                        local card={
                            picture("itemArt",ImageNames.items[item.id],(slotW-84)/2,14,84,84,{opacity=art}),
                            label("itemName",if displayed or owned>0 then item.name else "???",4,104,slotW-8,26,18,displayed and "#fff4df" or "#a2988a",{["text-align"]="center"}),
                            label("rarity",item.rarity,4,130,slotW-8,22,15,displayed and rarityColors[item.rarity] or "#6f6558",{["text-align"]="center"}),
                        }
                        if displayed then
                            card[#card+1]=label("displayedTag","DISPLAYED · +"..math.floor(item.bonus*100).."%",4,158,slotW-8,24,13,"#e9a827",{["text-align"]="center",["letter-spacing"]="1px"})
                        elseif owned>0 then
                            card[#card+1]=button("displayItem"..item.id,"Display · +"..math.floor(item.bonus*100).."%",10,154,slotW-20,36,function()send("economy","collect",item.id)end,{background="#605193",["font-size"]="16px"})
                        else
                            card[#card+1]=label("missingTag","NOT FOUND YET",4,158,slotW-8,24,13,"#6f6558",{["text-align"]="center",["letter-spacing"]="1px"})
                        end
                        pane[#pane+1]=box("itemSlot"..item.id,24+((slot-1)%2)*(slotW+16),y+math.floor((slot-1)/2)*206,slotW,194,"#2b2620",card,{border=displayed and "1px solid #e9a827" or "1px solid #3f382e",["border-radius"]="12px",ref=springIn("itemSlot"..item.id,slot)})
                    end
                    y+=math.ceil(slot/2)*206
                elseif workPage[1]=="Shop" or workPage[1]=="Bag" then
                    text("collectionHelp","Baking, jobs & property boost: +"..math.floor((Model.collectionBonus(state)-1)*100+.5).."%",52)
                    local rarityColors={Common="#b4c4d0",Uncommon="#89cf9e",Rare="#93b5ff",Legendary="#f5cd70",Exclusive="#e9a5f0"}
                    local itemIndex=0
                    for _,item in Model.Items do
                        if workPage[1]=="Shop" and item.exclusive then continue end
                        itemIndex+=1
                        local owned=economy.inventory[item.id] or 0
                        local displayed=economy.collection[item.id]
                        local card={picture("itemArt",ImageNames.items[item.id],8,8,66,66),
                            label("itemName",item.name,84,8,w-96,28,22,"#fff4df"),
                            label("rarity",item.rarity.."  |  +"..math.floor(item.bonus*100).."%",84,40,w-96,26,18,rarityColors[item.rarity]),
                            label("owned",workPage[1]=="Collection" and (displayed and "Displayed!" or "Missing") or "In bag: "..owned,14,78,w-28,26,18,"#e9dcc6"),
                        }
                        if workPage[1]=="Shop" then
                            card[#card+1]=button("buyItem"..item.id,"Buy: "..number(item.price),12,112,w-24,48,function()send("economy","item",item.id)end,{background="#276849",["font-size"]="21px"})
                        elseif not displayed then
                            card[#card+1]=button("displayItem"..item.id,"Display for +"..math.floor(item.bonus*100).."%",12,112,w-24,48,function()send("economy","collect",item.id)end,{background=owned>0 and "#605193" or "#51483d",["font-size"]="21px"})
                        elseif workPage[1]=="Bag" and owned>0 and not item.exclusive then
                            card[#card+1]=button("sellSpare"..item.id,"Sell 1 spare · "..number(math.floor(item.price*.25)),12,112,w-24,48,function()send("economy","sellItem",item.id)end,{background="#544479",["font-size"]="19px"})
                        else card[#card+1]=label("activeBoost","Boost is active",14,117,w-28,35,21,"#b6e6bf") end
                        pane[#pane+1]=box("itemCard"..item.id,24,y,w,172,"#342d25",card,{border="1px solid "..rarityColors[item.rarity],["border-radius"]="12px",ref=springIn("itemCard"..item.id,itemIndex),["--zone-background"]=ImageNames.itemBackgrounds[item.id],["--shop-icon"]=workPage[1]=="Shop" and ImageNames.items[item.id] or nil});y+=184
                    end
                elseif workPage[1]=="Empire" then
                    local empire=state.empire
                    local function badgeArt(id,badge,x,py)
                        return picture(id,ImageNames.badges[badge] or "CookieEmpire",x,py,64,64)
                    end
                    if state.empireInvite and not empire then
                        local invite=state.empireInvite
                        pane[#pane+1]=box("empireInvitation",24,y,w,190,"#342d25",{
                            badgeArt("invitedBadge",invite.badge,8,4),
                            label("invitedName","Join "..invite.name.."?",82,8,w-94,70,21,"#fff0d8"),
                            button("acceptEmpireInvite","Join empire",12,88,w-24,44,function()if not state.empirePending then send("empire","join",invite.id) end end,{background="#276849"}),
                            button("declineEmpireInvite","Not now",12,138,w-24,44,function()send("empire","declineInvite")end,{background="transparent",border="0px solid transparent",["font-size"]="16px"}),
                        },{ref=springIn("empireInvitation",1)});y+=202
                    end
                    local function empireButton(id,title,kind,arg,extra)
                        pane[#pane+1]=button(id,title,24,y,w,48,function()if not state.empirePending then send("empire",kind,arg,extra) end end,{["font-size"]="20px",background="#544479"});y+=56
                    end
                    if empire then
                        pane[#pane+1]=badgeArt("myEmpireBadge",empire.badge,24,y)
                        pane[#pane+1]=label("empireName",empire.name,100,y,w-76,32,24,"#fff0d8")
                        pane[#pane+1]=label("empireLevel","Level "..empire.level.."  |  "..empire.members.." members",100,y+36,w-76,28,18,"#dbc5ef");y+=80
                        local economyPercent=math.floor(((1+empire.level*.01)^2-1)*10000+.5)/100
                        local perks={
                            {"Cookie","Baking","+"..empire.level.."%"},
                            {"CookieStore","Jobs & places","+"..economyPercent.."%"},
                            {"CookieDelivery","Steal more","+"..empire.level.."%"},
                            {"CookieJar","Less stolen",math.min(75,empire.level).."%"},
                        }
                        local perkW=(w-8)/2
                        for i,perk in perks do
                            local px=24+((i-1)%2)*(perkW+8)
                            pane[#pane+1]=box("empirePerk"..i,px,y+math.floor((i-1)/2)*68,perkW,60,"#342d25",{
                                picture("perkPicture",perk[1],6,12,30,30),
                                label("perkAmount",perk[3],42,3,perkW-48,26,20,"#b6e6bf"),
                                label("perkName",perk[2],42,28,perkW-48,30,14,"#e9dcc6"),
                            })
                        end;y+=140
                        local needed=empire.level*100
                        local maxLevel=empire.level>=100
                        text("empirePoints",maxLevel and "Your team is at the highest level!" or (empire.points.." / "..needed.." points to level "..(empire.level+1)),32)
                        pane[#pane+1]=box("empireProgress",24,y,w,10,"#30283e",{box("fill",0,0,w*(maxLevel and 1 or math.min(1,empire.points/needed)),10,"#b18bdd")},{["border-radius"]="5px"});y+=22
                        text("donationHelp",state.empirePending and "Saving your team changes..." or "Give stamina = add team points",30)
                        for i,amount in {10,25,50} do
                            local canGive=not state.empirePending and economy.stamina>=amount
                            pane[#pane+1]=button("donateEmpire"..amount,"Give "..amount,24+(i-1)*w/3,y,w/3-4,48,function()if canGive then send("empire","donate",amount) end end,{background=canGive and "#544479" or "#403a43",["font-size"]="19px"})
                        end;y+=62
                        if empire.id==state.playerId then
                            if not maxLevel then
                                local canUpgrade=empire.points>=needed and not state.empirePending
                                pane[#pane+1]=button("upgradeEmpire",canUpgrade and "Level up!" or "Need "..(math.max(0,needed-empire.points)).." more points",24,y,w,48,function()if canUpgrade then send("empire","upgrade",empire.level) end end,{background=canUpgrade and "#276849" or "#403a43",["font-size"]="20px"});y+=56
                            end
                            text("ownerManagement","Owner controls",30)
                            pane[#pane+1]=button("editEmpire","Name & picture",24,y,w,48,function()empireEdit[2](not empireEdit[1])end);y+=56
                        else empireButton("leaveEmpire","Leave empire","leave") end
                    end
                    if empire then
                        pane[#pane+1]=button("inviteEmpireFriends","Invite a friend to empire",24,y,w,48,inviteFriends,{background="#276849",["font-size"]="18px"});y+=60
                        local roster=empire.roster or {}
                        text("empireMembersHeading","Members · "..empire.members.." / 64",32)
                        local pages=math.max(1,math.ceil(#roster/6))
                        local memberPage=math.clamp(empireMemberPage[1],1,pages)
                        for i=(memberPage-1)*6+1,math.min(#roster,memberPage*6) do
                            local member=roster[i]
                            local canRemove=empire.id==state.playerId and member.id~=empire.id
                            local row={
                                e("img",{key="memberAvatar",id="memberAvatar",style=style(8,8,52,52,{["background-image"]="url(rbxthumb://type=AvatarHeadShot&id="..member.id.."&w=150&h=150)",["object-fit"]="contain"})}),
                                label("memberName",member.name,72,6,w-84,32,18,"#fff0d8"),
                                label("memberRole",(member.owner and "Owner" or "Member").." · "..(member.online and "Here" or "Away"),72,38,w-84,24,14,member.owner and "#ffe19a" or "#b6c9d8"),
                                label("memberDonated","Gave "..number(member.donated).." stamina",12,66,w-(canRemove and 120 or 24),40,14,"#c8b3df"),
                            }
                            if canRemove then
                                row[#row+1]=button("removeEmpireMember"..member.id,empireRemoveConfirm[1]==member.id and "Confirm" or "Remove",w-96,62,84,44,function()
                                    if state.empirePending then return end
                                    if empireRemoveConfirm[1]==member.id then empireRemoveConfirm[2](nil);send("empire","remove",member.id)
                                    else empireRemoveConfirm[2](member.id) end
                                end,{background=state.empirePending and "#403a43" or "#70463c",["font-size"]="15px"})
                            end
                            pane[#pane+1]=box("empireMember"..member.id,24,y,w,112,"#342d25",row,{border=member.owner and "1px solid #a99154" or "1px solid #514862",["border-radius"]="10px",ref=springIn("empireMember"..member.id,i-(memberPage-1)*6)});y+=120
                        end
                        if pages>1 then
                            pane[#pane+1]=button("previousEmpireMembers","Previous",24,y,(w-8)/2,44,function()empireRemoveConfirm[2](nil);empireMemberPage[2](math.max(1,memberPage-1))end,{["font-size"]="17px"})
                            pane[#pane+1]=button("nextEmpireMembers","Next",24+(w+8)/2,y,(w-8)/2,44,function()empireRemoveConfirm[2](nil);empireMemberPage[2](math.min(pages,memberPage+1))end,{["font-size"]="17px"});y+=50
                            text("empireMemberPage","Page "..memberPage.." / "..pages,26)
                        end
                        for _,other in state.socialPlayers or {} do
                            if other.id~=state.playerId and not other.empireId then
                                local id=other.id
                                pane[#pane+1]=button("inviteEmpirePlayer"..id,"Invite "..other.name,24,y,w,48,function()send("empire","invite",id)end);y+=56
                            end
                        end
                    end
                    if not empire or empireEdit[1] then
                        text("empireCreateLabel",empire and "Give your team a new look" or "Make your cookie team",36)
                        pane[#pane+1]=e("input",{key="empireNameInput",id="empireNameInput",style=style(24,y,w,44,{background="#eee5d2",color="#211d19",["font-size"]="20px"}),onChange=function(event)empireNameDraft.current=event.value end});y+=56
                        local badges={"cookie","crown","star","heart","shield","bakery"}
                        local cols=math.max(3,math.min(6,math.floor(w/72)))
                        for i,badge in badges do
                            local bx=24+((i-1)%cols)*(w/cols)
                            local by=y+math.floor((i-1)/cols)*72
                            pane[#pane+1]=button("badge"..badge,"",bx,by,68,68,function()empireBadge[2](badge)end,{border=empireBadge[1]==badge and "3px solid #ffe19a" or "1px solid #514862",background="#30283e"},{badgeArt("badgePicture",badge,2,2)})
                        end
                        y+=math.ceil(#badges/cols)*72+8
                        pane[#pane+1]=button("saveEmpire",empire and "Save look" or "Create empire",24,y,w,48,function()if not state.empirePending then send("empire",empire and "rename" or "create",empireNameDraft.current,empireBadge[1]) end end,{background="#276849"});y+=64
                    end
                    if not empire then
                        text("joinEmpireHeading","Join a friend's team",36)
                        local seen={};local found=false
                        for _,other in state.socialPlayers or {} do
                            if other.empireId and other.empireName and not seen[other.empireId] then
                                seen[other.empireId]=true;found=true
                                pane[#pane+1]=box("joinTeam"..other.empireId,24,y,w,132,"#342d25",{
                                    badgeArt("teamBadge",other.empireBadge,8,4),
                                    label("teamName",other.empireName,82,8,w-94,52,22,"#fff0d8"),
                                    button("joinEmpire"..other.empireId,"Join team",12,76,w-24,44,function()if not state.empirePending then send("empire","join",other.empireId) end end,{background="#544479"}),
                                });y+=144
                            end
                        end
                        if not found then text("noEmpires","No teams here yet. Create one together!",50) end
                    end
                elseif workPage[1]=="Charity" then
                    text("charityHelp",state.charityPending and "Saving your party..." or "Cookie parties",36)
                    local charity=economy.charity
                    if charity then
                        local remaining=math.max(0,charity.endsAt-(state.serverNow or 0))
                        local ready=remaining==0 and not state.charityPending
                        local tier=Model.Fundraisers[charity.tier]
                        local progress=math.clamp(1-remaining/tier.seconds,0,1)
                        pane[#pane+1]=box("ownParty",24,y,w,188,"#342d25",{
                            picture("partyPicture","CookieFestival",12,12,64,64),
                            label("partyPot",number(charity.pot).." cookies",88,12,w-100,34,23,"#ffe3a3"),
                            label("partyTime",remaining>0 and math.ceil(remaining/60).." min left" or "Ready!",88,48,w-100,30,19,"#b6e6bf"),
                            box("partyTrack",14,92,w-28,8,"#51483d",{box("fill",0,0,(w-28)*progress,8,"#97ce8a")}),
                            button("claimCharity",ready and "Collect cookies" or "Growing...",12,122,w-24,50,function()if ready then send("fundraiser","claim") end end,{background=ready and "#276849" or "#51483d",["font-size"]="22px"}),
                        },{["border-radius"]="12px",ref=springIn("ownParty",1),["--zone-background"]="CookieParty"});y+=200
                    else
                        pane[#pane+1]=box("partyJar",24,y,w,80,nil,{
                            picture("jarPicture","CookieJar",0,0,64,64),
                            label("jarBalance",number(economy.jar).." in your jar",76,4,w-76,34,22,"#ffe3a3"),
                            button("openJar","Add cookies",76,40,w-76,40,function()workPage[2]("Jar")end,{["font-size"]="18px"}),
                        });y+=92
                        for i,tier in Model.Fundraisers do
                            local cost=Model.fundraiserCost(state,i)
                            local ready=economy.jar>=cost and not state.charityPending
                            pane[#pane+1]=box("partyTier"..i,24,y,w,218,"#342d25",{
                                picture("partyPicture","CookieFestival",12,12,56,56),
                                label("partyDuration",tier.name,80,10,w-92,28,23,"#fff4df"),
                                label("partyReward",number(math.floor(cost*tier.multiplier)).." cookies back",80,42,w-92,54,19,"#b6e6bf"),
                                label("partyProfit","+"..number(math.floor(cost*tier.multiplier)-cost).." extra cookies",12,98,w-24,40,18,"#b6e6bf",{["text-align"]="center"}),
                                button("startCharity"..i,(ready and "Start: " or "Need: ")..number(cost).." from jar",12,154,w-24,50,function()if ready then send("fundraiser","start",i) else workPage[2]("Jar") end end,{background=ready and "#276849" or "#51483d",["font-size"]="20px"}),
                            },{border="1px solid #827052",["border-radius"]="12px",ref=springIn("charityTier"..i,i),["--zone-background"]="CookieCharity"});y+=230
                        end
                        text("partyChanges","Rewards grow with your baking when you start. Friends can add cookies; thieves can take some.",76)
                    end
                    text("charityPlayers","Friends' parties",36)
                    local found=false
                    local friendIndex=0
                    for _,other in state.socialPlayers or {} do
                        if other.id~=state.playerId and other.endsAt>(state.serverNow or 0) then
                            found=true
                            friendIndex+=1
                            local half=(w-32)/2
                            pane[#pane+1]=box("friendParty"..other.id,24,y,w,204,"#342d25",{
                                picture("friendPicture","CookieDelivery",12,12,56,56),
                                label("friendName",other.name,80,8,w-92,30,21,"#fff4df"),
                                label("friendPot",number(other.pot).." cookies",80,40,w-92,28,19,"#ffe3a3"),
                                label("friendTime",math.ceil((other.endsAt-state.serverNow)/60).." min left",14,78,w-28,26,18,"#ccc0ac"),
                                button("helpCharity"..other.id,"Help",12,112,half,48,function()send("charity","help",other.id)end,{background="#276849",["font-size"]="22px"}),
                                button("stealCharity"..other.id,"Steal",20+half,112,half,48,function()send("charity","steal",other.id)end,{background="#68402d",["font-size"]="22px"}),
                                label("helpCost","5 stamina",12,164,half,26,17,"#a6ddeb",{["text-align"]="center"}),
                                label("stealCost","10 stamina",20+half,164,half,26,17,"#a6ddeb",{["text-align"]="center"}),
                            },{border="1px solid #827052",["border-radius"]="12px",ref=springIn("friendParty"..other.id,friendIndex),["--zone-background"]="CookieCharity"});y+=216
                        end
                    end
                    if found then text("helpReward","Each help earns 50 cookies + 20 XP.",48)
                    else text("noCharities","No parties yet. Invite a friend!",48) end
                else
                    local artW=math.min(140,math.floor(w*.36))
                    local controlsX=24+artW+12
                    local controlsW=w-artW-12
                    pane[#pane+1]=box("jarCard",24,y,artW,224,nil,{
                        picture("jarPicture","CookieJar",0,16,artW,artW),
                        label("jarBalance",number(economy.jar).."\ncookies in jar",0,artW+24,artW,62,21,"#ffe3a3",{["text-align"]="center"}),
                    },{ref=springIn("jarCard",1,JAR_ENTRANCE),["--zone-background"]="CookieJar"})
                    local cell=(controlsW-8)/2
                    for i,amount in {100,500,1000,10000} do
                        pane[#pane+1]=button("jarAmount"..amount,number(amount),controlsX+((i-1)%2)*(cell+8),y+math.floor((i-1)/2)*52,cell,44,function()jarAmount[2](amount)end,{background=jarAmount[1]==amount and "#74603a" or "#30271f",["font-size"]="17px",ref=springIn("jarAmount"..amount,i+1,JAR_ENTRANCE)})
                    end
                    pane[#pane+1]=button("depositCookies","Put in",controlsX,y+108,controlsW,48,function()send("economy","deposit",jarAmount[1])end,{background="#276849",["font-size"]="22px",ref=springIn("depositCookies",5,JAR_ENTRANCE)})
                    pane[#pane+1]=button("withdrawCookies","Take out",controlsX,y+164,controlsW,48,function()send("economy","withdraw",jarAmount[1])end,{["font-size"]="22px",ref=springIn("withdrawCookies",6,JAR_ENTRANCE)})
                    pane[#pane+1]=label("depositFee","Deposit fee: "..number(Model.depositFee(state,jarAmount[1])).." cookies",24,y+218,w,30,16,"#dfcba6")
                    y+=258
                    local depositAll=math.floor(math.max(0,math.min(state.cookies,Model.Balance.MaxJarCookies-economy.jar)))
                    local withdrawAll=math.floor(economy.jar)
                    pane[#pane+1]=button("depositAll","Put in max",24,y,(w-8)/2,44,function()if depositAll>0 then send("economy","deposit",depositAll) end end,{background="#276849",["font-size"]="18px",ref=springIn("depositAll",7,JAR_ENTRANCE)})
                    pane[#pane+1]=button("withdrawAll","Take out max",24+(w+8)/2,y,(w-8)/2,44,function()if withdrawAll>0 then send("economy","withdraw",withdrawAll) end end,{["font-size"]="18px",ref=springIn("withdrawAll",8,JAR_ENTRANCE)});y+=56
                    pane[#pane+1]=button("jarParty","Start a cookie party",24,y,w,48,function()workPage[2]("Charity")end,{background="#544479",["font-size"]="21px",ref=springIn("jarParty",9,JAR_ENTRANCE)});y+=56

                end

			else
				-- 68 leaves room for the panel title; the centred pills replace it
				-- on the Adventure landing, so reclaim that band there.
				local y=if innerTabs then 20 else 68
				local w=centerW-48
				local function text(id,value,height)
					pane[#pane+1]=label(id,value,24,y,w,height or 60,18,"#dfd3bf");y+= (height or 60)+8
				end
				local function action(id,title,kind,arg)
					pane[#pane+1]=button(id,title,24,y,w,48,function()send("advanced",kind,arg)end,{["font-size"]="18px"});y+=56
				end
                local activities={
                    {"Stars","Stars"},{"Boosts","CookieBoost"},{"Levels","CookieLevels"},
                    {"Buddies","CookieFriends"},{"Garden","CookieGarden"},{"Market","CookieMarket"},
                    {"Helpers","CookieHelper"},{"Magic","CookieWizardTower"},{"Seasons","CookieFestival"},
                }
                if adventurePage[1]=="Home" then
                    local hints={Stars="Rebirth for permanent rewards",Boosts="Spend chips on lasting boosts",Levels="Make your buildings stronger",Buddies="Save cookies and collect extra",Garden="Grow a temporary baking boost",Market="Trade ingredients for cookies",Helpers="Choose your baking bonus",Magic="Cast spells for cookie rewards",Seasons="Catch golden cookies for prizes"}
                    local status={
                        Stars=Model.ascensionGain(state)>0 and "Stars ready to collect!" or "Bake toward your next star",
                        Boosts=number(state.chips).." star chips",Levels=number(state.lumps).." sugar lumps",
                        Buddies=state.buildings[2]>=10 and "Open" or "Needs 10 grandmas",
                        Garden=state.buildings[3]>0 and (state.gardenReady>0 and state.gardenReady<=state.played and "Ready to harvest!" or "Open") or "Needs a Farm",
                        Market=state.buildings[6]>0 and "Open" or "Needs a Bank",
                        Helpers=state.buildings[7]>0 and "Open" or "Needs a Temple",
                        Magic=state.buildings[8]>0 and math.floor(state.magic).." magic ready" or "Needs a Wizard Tower",
                        Seasons=state.season~="none" and "Hunt in progress" or "Start a cookie hunt",
                    }
                    for i,activity in activities do
                        local name=activity[1]
                        local locked=status[name]:find("Needs",1,true)~=nil
                        pane[#pane+1]=button("adventure"..name,"",24,y+(i-1)*150,w,138,function()adventurePage[2](name)end,{background=locked and "#373737" or "#342d25",["border-radius"]="12px",ref=springIn("adventure"..name,i)},{
                            picture("activityPicture",activity[2],12,14,68,68,{opacity=locked and "0.45" or "1"}),
                            label("activityName",name,94,10,w-108,34,24,"#fff4df"),
                            label("activityHint",hints[name],94,48,w-108,58,17,"#e1d5c2"),
                            label("activityStatus",status[name],12,106,w-24,24,16,locked and "#bcbcbc" or "#b6e6bf"),
                        })
                    end
                else
                    local imageName="Cookie"
                    for _,activity in activities do if activity[1]==adventurePage[1] then imageName=activity[2];break end end
                    pane[#pane+1]=button("adventureBack","Back",24,y,80,48,function()confirmFresh[2](false);adventurePage[2]("Home")end,{["font-size"]="21px"})
                    pane[#pane+1]=picture("activityPicture",imageName,116,y,48,48)
                    pane[#pane+1]=label("activityName",adventurePage[1],176,y+6,w-152,36,24,"#ffe3a3")
                    y+=64
                    local requirements={Garden={3,1,"Farm","Farm"},Market={6,1,"Bank","CookieBank"},Helpers={7,1,"Temple","CookieTemple"},Magic={8,1,"Wizard Tower","CookieWizardTower"},Buddies={2,10,"10 grandmas","Grandma"}}
                    local requirement=requirements[adventurePage[1]]
                    if requirement and state.buildings[requirement[1]]<requirement[2] then
                        pane[#pane+1]=box("adventureLocked",24,y,w,298,"#393939",{
                            picture("unlockBuilding",requirement[4],(w-80)/2,16,80,80,{opacity="0.45"}),
                            label("unlockTitle",adventurePage[1].." is locked",12,110,w-24,36,23,"#eeeeee",{["text-align"]="center"}),
                            label("unlockRequirement","Own "..requirement[3].." to get started.",16,154,w-32,56,20,"#d0d0d0",{["text-align"]="center"}),
                            button("unlockStore","Go to Store",16,236,w-32,48,function()setPage("Shop");setTab("Buildings")end,{background="#685338",["font-size"]="21px"}),
                        },{["border-radius"]="12px"});y+=310
                    elseif adventurePage[1]=="Stars" then
                    local gain=Model.ascensionGain(state)
                    pane[#pane+1]=box("starHowTo",24,y,w,160,"#403447",{
                        label("starHowToTitle","How to get star chips",12,10,w-24,32,22,"#ffe3a3",{["text-align"]="center"}),
                        label("starHowToSteps",state.prestige==0 and "Bake "..number(Model.Balance.RebirthCookies).." cookies, then rebirth for your first star chip." or "Bake to the next star goal, then rebirth to collect your star chips.",16,50,w-32,64,19,"#fff4df",{["text-align"]="center"}),
                        label("starChipRule","1 star earned = 1 chip to spend",12,122,w-24,28,17,"#b6e6bf",{["text-align"]="center"}),
                    },{["border-radius"]="10px"});y+=172
                    pane[#pane+1]=box("starReward",24,y,w,230,"#34283f",{
                        picture("starPicture","Stars",(w-100)/2,12,100,100),
                        label("starGain",gain>0 and "+"..number(gain).." stars ready!" or "Your next big step",12,122,w-24,38,27,"#ffe3a3",{["text-align"]="center"}),
                        label("starBonus","Baking bonus: +"..number((Model.starMultiplier(state.prestige)-1)*100,true).."% → +"..number((Model.starMultiplier(state.prestige+gain)-1)*100,true).."%",12,166,w-24,48,18,"#b6e6bf",{["text-align"]="center"}),
                    },{["border-radius"]="12px",border="1px solid #967446"});y+=242
                    local total=(state.pastEarned or 0)+(state.earned or 0)
                    local nextStar=state.prestige+gain+1
                    local goal=Model.starGoal(nextStar)
                    pane[#pane+1]=box("starProgress",24,y,w,132,"#302a35",{
                        label("starUnlock","Bake "..number(math.max(0,goal-total)).." more cookies",12,8,w-24,54,20,"#fff1cd",{["text-align"]="center"}),
                        box("starProgressTrack",16,72,w-32,10,"#17141e",{box("starProgressFill",0,0,(w-32)*math.clamp(total/goal,0,1),10,"#eac36d")},{["border-radius"]="5px"}),
                        label("starProgressHint","Next star: "..number(goal).." baked in total",12,94,w-24,28,15,"#cbbbd7",{["text-align"]="center"}),
                    },{["border-radius"]="10px"});y+=144
                    text("starGrowth","First "..number(Model.Balance.StarBonusSoftcap).." stars: +"..number(Model.Balance.StarProductionBonus*100).."% baking each. After that, each star adds a smaller boost.",76)
                    text("freshWarning","Rebirth resets cookies, buildings, regular boosts and Adventure activities.",76)
                    if confirmFresh[1] then
                        text("freshDetails","Your ingredients, garden, helpers, magic and wrinklers also reset.",70)
                    end
                    pane[#pane+1]=button("ascendBakery",gain<1 and "Keep baking to rebirth" or confirmFresh[1] and "Confirm rebirth" or "Rebirth · +"..number(gain).." stars",24,y,w,52,function()
                        if gain<1 then return end
                        if confirmFresh[1] then send("advanced","ascend");confirmFresh[2](false) else confirmFresh[2](true) end
                    end,{background=gain>=1 and "#65508c" or "#403a43",["font-size"]="22px"});y+=64
				if confirmFresh[1] then pane[#pane+1]=button("cancelAscend","Keep my bakery",24,y,w,48,function()confirmFresh[2](false)end);y+=56 end
                    pane[#pane+1]=box("starKeeps",24,y,w,158,"#293c34",{
                        label("starKeepsTitle","Your hard work stays",14,10,w-28,34,22,"#b6e6bf",{["text-align"]="center"}),
                        label("freshKeep","Keep XP, Work progress, achievements, stars, permanent boosts, sugar lumps and building levels.",16,52,w-32,92,18,"#e2eee6",{["text-align"]="center"}),
                    },{["border-radius"]="10px"});y+=170
                    pane[#pane+1]=box("starShop",24,y,w,232,"#342d25",{
                        picture("starShopPicture","CookieBoost",(w-64)/2,12,64,64),
                        label("prestigeInfo",number(state.prestige).." permanent stars",12,86,w-24,30,22,"#ffe3a3",{["text-align"]="center"}),
                        label("chipCount",number(state.chips).." star chips to spend",12,124,w-24,30,20,"#dbc5ef",{["text-align"]="center"}),
                        button("openStarBoosts","Permanent upgrades",12,174,w-24,46,function()confirmFresh[2](false);adventurePage[2]("Boosts")end,{background="#544479",["font-size"]="20px"}),
                    },{["border-radius"]="10px"});y+=244

                    elseif adventurePage[1]=="Boosts" then
				text("chipCount","Star chips: "..number(state.chips),32)
                    pane[#pane+1]=button("earnStarChips","How do I get chips?",24,y,w,44,function()adventurePage[2]("Stars")end,{["font-size"]="18px"});y+=56
                    for _,boost in Model.HeavenlyBoosts do
                        local owned=state.heavenly[boost.id]==true
                        local locked=boost.requires and not state.heavenly[boost.requires]
                        local ready=not owned and not locked and state.chips>=boost.cost
                        local requirement="Yours forever, even after rebirth"
                        if locked then
                            for _,first in Model.HeavenlyBoosts do if first.id==boost.requires then requirement="First buy "..first.name;break end end
                        end
                        local signature=table.concat({w,y,tostring(owned),tostring(locked),tostring(ready),uiFont},":")
                        pane[#pane+1]=remember(viewCache,"heavenly"..boost.id,signature,function()return box("heavenlyCard"..boost.id,24,y,w,266,"#342d25",{
                            picture("boostPicture",boost.icon,(w-64)/2,12,64,64),
                            label("boostName",boost.name,12,84,w-24,30,22,"#fff4df",{["text-align"]="center"}),
                            label("boostBenefit",boost.description,12,118,w-24,48,19,"#fff4df",{["text-align"]="center"}),
                            label("boostLasts",requirement,12,170,w-24,36,17,"#b6e6bf",{["text-align"]="center"}),
                            button("heavenly_"..boost.id,owned and "Owned!" or (ready and "Buy · " or "Need ")..boost.cost.." star chips",12,212,w-24,44,function()if ready then send("advanced","heavenly",boost.id) end end,{background=owned and "#385847" or ready and "#544479" or "#403a43",["font-size"]="21px"}),
                        },{["border-radius"]="10px"})end);y+=278
                    end
				if state.heavenly.slot then
					text("permanentChoice","Choose a boost to keep. Current: "..(state.permanentUpgrade~="" and (upgradeNames[state.permanentUpgrade] or state.permanentUpgrade) or "none"),60)
					for _,u in Model.Upgrades do if state.upgrades[u.id] then action("keep"..u.id,"Keep "..(upgradeNames[u.id] or u.name),"permanent",u.id) end end
				end

                    elseif adventurePage[1]=="Levels" then
                    text("lumpCount",number(state.lumps).." sugar lumps",34)
                    if state.earned<1e6 then
                        text("lumpUnlock","Bake 1 million cookies to grow sugar lumps",48)
                    else
                        local minutes=math.ceil(math.max(0,Model.Balance.SugarLumpSeconds-state.lumpTime)/60)
                        text("lumpNext","Next lump: "..math.floor(minutes/60).."h "..(minutes%60).."m",34)
                    end
                    local found=false
                    for i,b in Model.Buildings do if state.buildings[i]>0 then
                        found=true
                        local level=state.levels[i]
                        local maxed=level>=100
                        local cost=level+1
                        local ready=not maxed and state.lumps>=cost
                        pane[#pane+1]=box("levelCard"..i,24,y,w,176,"#342d25",{
                            buildingPicture("levelPicture",i,12,12,60,60),
                            label("levelName",b.name,84,10,w-96,60,20,"#fff4df"),
                            label("levelBonus","Level "..level.." • +"..level.."% baking",12,82,w-24,30,18,"#b6e6bf",{["text-align"]="center"}),
                            button("level"..i,maxed and "Highest level!" or ready and "Level up • "..cost.." lumps" or "Need "..cost.." sugar lumps",12,120,w-24,44,function()if ready then send("advanced","level",i) end end,{background=ready and "#276849" or "#403a43",["font-size"]="20px"}),
                        },{["border-radius"]="10px"});y+=188
                    end end
                    if not found then text("levelsEmpty","Buy a building in the store to level it up",60) end

                    elseif adventurePage[1]=="Buddies" then
                    local feeding=state.buddies and state.buildings[2]>=10
                    text("buddyInfo","Wrinklers save 5% of your baking each. Pop one to get its cookies back, plus 10% extra!",72)
                    if state.buildings[2]<10 then text("buddyUnlock","Own 10 grandmas to invite wrinklers.",48)
                    else action("buddyToggle",state.buddies and "Pause feeding" or "Invite wrinklers","buddies") end
                    text("buddyStatus",#(state.wrinklers or {}).." / 10 wrinklers"..(feeding and " - feeding" or " - resting"),32)
                    if feeding and #(state.wrinklers or {})<10 then
                        text("nextWrinkler","Next arrival: "..math.ceil(60-(state.wrinklerTime or 0)).."s",28)
                    end
                    for i,wrinkler in state.wrinklers or {} do
                        local id=wrinkler.id
                        pane[#pane+1]=box("wrinklerCard"..id,24,y,w,104,"#342d25",{
                            picture("savedCookies","Cookie",8,14,32,32),
                            label("wrinklerName","Wrinkler "..i,48,14,w-152,32,18,"#fff4df"),
                            label("wrinklerReward",number(wrinkler.bank*1.1).." cookies",12,62,w-24,34,19,"#f5d58f"),
                            button("popWrinkler"..id,"Pop!",w-96,8,84,48,function()send("advanced","popWrinkler",id)end,{background="#516d36"}),
                        });y+=112
                    end
                    if state.buddyBank>0 then action("collectBuddies","Collect all: "..number(state.buddyBank*1.1),"collectBuddies") end

                    elseif adventurePage[1]=="Garden" then
                    local planted=state.gardenReady>0
                    local remaining=math.max(0,state.gardenReady-state.played)
                    local ripe=planted and remaining==0
                    local canPlant=not planted and state.buildings[3]>0 and state.lumps>=1
                    local progress=planted and math.clamp(1-remaining/60,0,1) or 0
                    pane[#pane+1]=box("gardenPlot",24,y,w,282,"#283b28",{
                        picture("gardenPicture","CookieGarden",(w-88)/2,12,88,88,{opacity=planted and "1" or "0.55"}),
                        label("gardenStatus",ripe and "Ready to pick!" or planted and "Growing..." or "Plant your garden",12,112,w-24,34,24,"#fff4df",{["text-align"]="center"}),
                        label("gardenTimer",planted and (ripe and "+5% baking for 10 min" or math.ceil(remaining).." seconds left") or "1 sugar lump • 1 minute",12,152,w-24,42,18,"#b6e6bf",{["text-align"]="center"}),
                        box("gardenTrack",12,204,w-24,8,"#43523a",{box("fill",0,0,(w-24)*progress,8,"#a5d987")}),
                        button(ripe and "harvestGarden" or "plantGarden",ripe and "Harvest!" or planted and "Growing..." or canPlant and "Plant • 1 lump" or state.buildings[3]<1 and "Buy a farm first" or "Need 1 sugar lump",12,226,w-24,44,function()
                            if ripe then send("advanced","harvest") elseif canPlant then send("advanced","plant") end
                        end,{background=(ripe or canPlant) and "#477d35" or "#4d5141",["font-size"]="21px"}),
                    },{["border-radius"]="12px"});y+=294
                    local boost=math.max(0,state.gardenBoostUntil-state.played)
                    if boost>0 then text("gardenBoost","+5% baking • "..math.ceil(boost/60).." min left",36)
                    else text("gardenReward","Harvest for +5% baking for 10 minutes.",44) end

                    elseif adventurePage[1]=="Market" then
                    local unlocked=state.buildings[6]>0
                    if not unlocked then
                        pane[#pane+1]=box("marketLocked",24,y,w,310,"#393939",{
                            picture("marketBank","CookieBank",(w-96)/2,24,96,96,{opacity="0.4"}),
                            label("marketLockedTitle","Stock market locked",16,138,w-32,36,23,"#e2e2e2",{["text-align"]="center"}),
                            label("marketLockedReason","You need a Bank to access this feature.",16,184,w-32,64,20,"#d0d0d0",{["text-align"]="center"}),
                            label("marketLockedHint","Buy a Bank in the Store.",16,258,w-32,32,17,"#bcbcbc",{["text-align"]="center"}),
                        },{border="1px solid #686868",["border-radius"]="12px"});y+=322
                    else
                    text("marketInfo",unlocked and "Buy low. Sell when prices rise." or "Buy a bank to open the market",44)
                    text("marketTimer","New prices in "..math.ceil(30-state.played%30).."s",32)
                    local quantity=stockQuantity[1]
                    text("marketQuantity","How many?",28)
                    local quantityWidth=(w-24)/5
                    for slot,amount in {1,5,10,100,1000} do
                        pane[#pane+1]=button("stockQuantity"..amount,tostring(amount),24+(slot-1)*(quantityWidth+6),y,quantityWidth,44,function()stockQuantity[2](amount)end,{background=quantity==amount and "#806333" or "#493b2e",["font-size"]="16px"})
                    end;y+=56
                    for i,name in {"Flour","Sugar","Chocolate"} do
                        local unitPrice=Model.stockPrice(state,i)
                        local price=unitPrice*quantity
                        local sellPrice=math.floor(unitPrice*.9)*quantity
                        local owned=state.stocks[i]
                        local canBuy=unlocked and state.cookies>=price and owned+quantity<=10000
                        local canSell=unlocked and owned>=quantity
                        local half=(w-32)/2
                        pane[#pane+1]=box("stockCard"..i,24,y,w,174,"#342d25",{
                            label("stockName",name,14,10,w-28,32,25,"#fff4df"),
                            label("stockOwned","In your pantry: "..owned,14,46,w-28,28,19,"#dbc5ef"),
                            label("stockBuyPrice",number(price).." cookies",12,82,half,28,20,"#ffe3a3",{["text-align"]="center"}),
                            label("stockSellPrice",number(sellPrice).." cookies",20+half,82,half,28,20,"#b6e6bf",{["text-align"]="center"}),
                            button("stockBuy"..i,owned>=10000 and "Pantry full" or "Buy "..quantity,12,118,half,44,function()
                                if not unlocked then notify("Buy a Bank in the Store to unlock the stock market.","info")
                                elseif canBuy then send("advanced","stockBuy",{index=i,quantity=quantity}) end
                            end,{background=canBuy and "#276849" or "#403a43",["font-size"]="18px"}),
                            button("stockSell"..i,"Sell "..quantity,20+half,118,half,44,function()
                                if not unlocked then notify("Buy a Bank in the Store to unlock the stock market.","info")
                                elseif canSell then send("advanced","stockSell",{index=i,quantity=quantity}) end
                            end,{background=canSell and "#544479" or "#403a43",["font-size"]="18px"}),
                        },{["border-radius"]="10px",["--zone-background"]="CookieMarket"});y+=186
                    end
                    text("marketFee","Selling pays 90% of the current price.",40)
                    end

                    elseif adventurePage[1]=="Helpers" then
                    local unlocked=state.buildings[7]>0
                    local remaining=math.max(0,60-(state.played-state.spiritChanged))
                    text("spiritInfo",not unlocked and "Buy a temple to meet your helpers" or remaining>0 and "Switch helpers in "..math.ceil(remaining).."s" or "Choose one helper",48)
                    for _,helper in {{"baking","Cookie","Baker","+10% baking","spiritBake"},{"clicking","CursorCookie","Tap helper","+10% per tap","spiritClick"},{"luck","GoldenCookie","Lucky helper","+20% lucky cookies","spiritLuck"}} do
                        local active=state.spirit==helper[1]
                        local ready=unlocked and remaining==0 and not active
                        pane[#pane+1]=box("helperCard"..helper[1],24,y,w,222,"#342d25",{
                            picture("helperPicture",helper[2],(w-64)/2,12,64,64),
                            label("helperName",helper[3],12,86,w-24,30,24,"#fff4df",{["text-align"]="center"}),
                            label("helperBonus",helper[4],12,124,w-24,30,20,"#b6e6bf",{["text-align"]="center"}),
                            button(helper[5],active and "Helping you!" or not unlocked and "Need a temple" or remaining>0 and "Wait "..math.ceil(remaining).."s" or "Choose helper",12,166,w-24,44,function()if ready then send("advanced","spirit",helper[1]) end end,{background=active and "#276849" or ready and "#544479" or "#403a43",["font-size"]="21px"}),
                        },{border=active and "2px solid #97ce8a" or "1px solid #827052",["border-radius"]="10px"});y+=234
                    end

                    elseif adventurePage[1]=="Magic" then
                    local unlocked=state.buildings[8]>0
                    local magic=math.clamp(state.magic,0,100)
                    pane[#pane+1]=box("magicMeter",24,y,w,88,"#30283e",{
                        picture("magicPicture","CookieWizardTower",10,8,56,56),
                        label("magicAmount",math.floor(magic).." / 100 magic",78,8,w-90,32,23,"#e6d3ff"),
                        label("magicRecharge",unlocked and "+1 magic each second" or "Buy a wizard tower to unlock",78,40,w-90,30,17,"#e9dcc6"),
                        box("magicTrack",12,76,w-24,6,"#514862",{box("fill",0,0,(w-24)*magic/100,6,"#bb95e8")}),
                    },{["border-radius"]="10px"});y+=100
                    for _,spell in {{"lucky","GoldenCookie","Lucky cookie",40,"Catch it as it falls!","spellLucky"},{"cookies","Cookie","Cookie burst",60,"1 minute of baking instantly","spellCookies"}} do
                        local ready=unlocked and magic>=spell[4]
                        local title=not unlocked and "Need a wizard tower" or ready and "Cast • "..spell[4].." magic" or "Ready in "..math.ceil(spell[4]-magic).."s"
                        pane[#pane+1]=box("spellCard"..spell[1],24,y,w,234,"#342d25",{
                            picture("spellPicture",spell[2],(w-64)/2,12,64,64),
                            label("spellName",spell[3],12,86,w-24,32,24,"#fff4df",{["text-align"]="center"}),
                            label("spellReward",spell[5],12,126,w-24,44,18,"#dbc5ef",{["text-align"]="center"}),
                            button(spell[6],title,12,176,w-24,46,function()if ready then send("advanced","spell",spell[1]) end end,{background=ready and "#544479" or "#403a43",["font-size"]="20px"}),
                        },{["border-radius"]="10px"});y+=246
                    end

                    elseif adventurePage[1]=="Seasons" then
                    local hunting=state.season~="none"
                    local collected=state.seasonCookies%5
                    local huntTitle=state.season=="winter" and "Winter hunt" or state.season=="spring" and "Spring hunt" or "Choose a cookie hunt"
                    pane[#pane+1]=box("huntProgress",24,y,w,190,"#342d25",{
                        picture("huntPicture","CookieFestival",12,10,64,64),
                        label("huntTitle",huntTitle,88,10,w-100,34,23,"#fff4df"),
                        label("huntHint","Catch falling golden cookies",88,48,w-100,44,18,"#ffe3a3"),
                        label("huntReward","Every 5 = 2 minutes of baking",12,142,w-24,26,18,"#b6e6bf",{["text-align"]="center"}),
                        label("huntMinimum","At least 500 bonus cookies",12,168,w-24,22,16,"#dbc5ef",{["text-align"]="center"}),
                    },{["border-radius"]="10px"})
                    local slotW=(w-24)/5
                    for i=1,5 do
                        pane[#pane+1]=picture("huntCookie"..i,"GoldenCookie",36+(i-1)*slotW+(slotW-36)/2,y+98,36,36,{opacity=i<=collected and "1" or "0.25"})
                    end;y+=204
                    text("huntCount",collected.." / 5 collected"..(hunting and "" or " • paused"),32)
                    for _,season in {{"winter","Winter hunt","#334e68","winterSeason"},{"spring","Spring hunt","#38623a","springSeason"}} do
                        local active=state.season==season[1]
                        pane[#pane+1]=button(season[4],active and season[2].." • Active" or "Start "..season[2],24,y,w,48,function()if not active then send("advanced","season",season[1]) end end,{background=active and "#544479" or season[3],["font-size"]="21px"});y+=56
                    end
                    if hunting then action("normalSeason","Pause hunt","season","none") end
                    end
                end
			end
			center[#center + 1] = e("scroll", { key = "menuPanel"..tab..workPage[1]..adventurePage[1], id = "menuPanel", style = style(0, contentY, centerW, math.max(30,h-contentY-navDockH-navDockLift-4), { background = "#241f19", ["overflow-x"]="hidden", ["overflow-y"]="scroll" }) }, table.unpack(pane))
		end
		-- Settings-shaped destinations live behind the burger instead of taking a
		-- permanent slot in the header. Appended last, above everything else.
		if drawer[1] then
			local drawerW=math.min(250,centerW-40)
			local items={
				label("drawerTitle","More",18,16,drawerW-70,34,22,"#fff0d8"),
				button("drawerClose","X",drawerW-42,14,28,28,closeDrawer,{background="none",border="none",color="#9d9081",["font-size"]="19px"}),
				button("drawerOptions","Options",14,70,drawerW-28,44,function()closeDrawer();setTab("Options")end,{["font-size"]="16px"}),
				button("drawerStats","Stats",14,124,drawerW-28,44,function()closeDrawer();setTab("Stats")end,{["font-size"]="16px"}),
				button("drawerPremium","Passes & goodies",14,178,drawerW-28,44,function()closeDrawer();setTab("Treat Shop")end,{background="#765a27",["font-size"]="16px"}),
			}
			center[#center+1]=button("drawerScrim","",0,0,centerW,h,closeDrawer,{background="rgba(10,8,6,0.55)",border="none",["z-index"]="10"})
			center[#center+1]=box("drawerPanel",centerW-drawerW,0,drawerW,h,"#1d1915",items,{["z-index"]="11",border="1px solid #4a3f31",ref=function(inst)
				drawerPop.bind(inst)
				if inst then
					drawerPop.width = inst.Size.X.Offset
					drawerPop.jump(drawerPop.width)
					task.defer(function() drawerPop.to(0, DRAWER_IN) end)
				end
			end})
		end
		local store = { stripes("storeStripes", storeW, h, "#24221f", "#2a2723"), label("storeTitle", "Store", 10, 7, boostW - 156, 42, 36, "#fff2dd", titleStyle),button("storePremium","Passes & goodies",boostW-146,8,136,44,function()setPage("More");setTab("Treat Shop")end,{background="#765a27",["font-size"]="15px"}) }
		local upgrades = {}
		for _, u in Model.Upgrades do
			if not state.upgrades[u.id] and state.buildings[u.building] >= u.required then upgrades[#upgrades + 1] = u end
		end
		-- Desktop gave the boost list a 112px window on a 112px card pitch: exactly
		-- one card, so nothing on screen said a list existed. 180 shows the second
		-- card cut off, which is the signal. The bands below shift to match.
		local boostY = 86
		-- With nothing to show the band holds a two-line message, so it collapses
		-- rather than reserving room for cards that do not exist yet.
		-- Sized to what there is: 92 for the two-line empty message, one card's
		-- height for one boost, and 180 once there are several -- which lands
		-- mid-card, so the cut edge itself says the list keeps going.
		local boostH = if landscape then math.max(100, h - 94) elseif mobile then 112 elseif #upgrades == 0 then 92 else math.min(180, #upgrades * 112 + 8)
		local controlsY = if landscape then 16 elseif mobile then 219 else boostY + boostH + 18
		local productsY = if landscape then 78 elseif mobile then 275 else controlsY + 40
		-- Narrowed so it clears the Passes button above it instead of running under.
		store[#store+1] = label("upgradeHeading", "Buy a boost for your bakery!", 10, 56, boostW-110, 25, 20, "#f4d28a")
		if #upgrades > 1 then
			store[#store+1] = label("upgradeCount", #upgrades .. " boosts", boostW-100, 58, 90, 22, 14, "#c9ac6a", {["text-align"]="right"})
		end
		local upgradeCards = {}
		for i, u in upgrades do
			local affordable = state.cookies >= u.price
            local effect=upgradeEffect(u,state)
            local signature=table.concat({i,boostW,tostring(affordable),effect,uiFont},"|")
            upgradeCards[#upgradeCards+1]=remember(viewCache,"upgrade"..u.id,signature,function()
            -- Icon, name, one effect line, price -- the same anatomy as a store
            -- row, so the boost list and the building list scan alike. Green
            -- moves to a left edge: it still says "you can buy this" from across
            -- the panel without flooding the card the text sits on.
            local kids = {
                buildingPicture("upgradeIcon"..u.id,u.building,12,14,58,61,not affordable and {opacity="0.45"} or nil),
                label("upgradeName", upgradeNames[u.id] or u.name, 80, 10, boostW-112, 26, 19, affordable and "#fff2dd" or "#a89d8c"),
				label("upgradeEffect", effect, 80, 38, boostW-112, 22, 15, affordable and "#c9d8bd" or "#7d8478"),
				cookieCurrency("upgradeCurrency",80,68),
				label("upgradePrice", number(u.price), 110, 66, boostW-142, 29, 21, affordable and "#b3ef96" or "#9a8d7b"),
			}
			if affordable then kids[#kids+1]=box("upgradeEdge",0,0,4,108,"#7fc98a") end
			return button("upgrade_"..u.id,"",0,(i-1)*112,boostW-22,108,function()
				send("upgrade",u.id)
			end,{background=affordable and "#333c2e" or "#2c2823",border=affordable and "1px solid #5d7a4e" or "1px solid #4b4235",ref=springIn("upgrade"..u.id,0,BOOST_ENTRANCE)},kids,function(inside) setHover(inside and u.id or 0) end)
            end)
		end
		if #upgrades == 0 then
			local hasBuildings = false
			for _, count in state.buildings do if count > 0 then hasBuildings = true; break end end
			upgradeCards[1] = label("upgradeEmpty",hasBuildings and "Buy more buildings to find new boosts!" or "First, buy a Cursor below.\nThen come here to make it stronger!",10,8,boostW-42,75,17,"#c3b8a8")
		end
		store[#store+1] = e("scroll",{key="upgradeList",id="upgradeList",style=style(8,boostY,boostW-8,boostH,{overflow="scroll"})},table.unpack(upgradeCards))
		-- Sits in the gap between the boost band and the buy controls. It was pinned
		-- at a hard 200 while everything around it now derives from the band, so it
		-- ran straight through the buttons once the band could change height.
		-- Inset a pixel each side rather than restacked. A UIStroke draws outside its
		-- own bounds, so a rail flush to x=0 puts its dark edge one pixel past the
		-- column and onto the wood rail beside it. Starting at 1 lands that stroke
		-- exactly on the column edge instead of over it, and the rail keeps its
		-- normal stacking -- z-index 0 put it behind the column's own stripes,
		-- leaving only the stroke visible as a black sliver.
		store[#store + 1] = rail("upgradeRail", 1, controlsY - 14, (landscape and 0 or storeW) - 2, 9)
		-- Buy/Sell is a mode; 1/10/100 is a quantity. Five identical buttons in an
		-- even row said they were one set of five options. A gap groups them by
		-- proximity, and the quantities sit back a shade so the mode reads first.
		local controlY = controlsY
		local controlH = mobile and 44 or 28
		local groupGap = 16
		local slot = (controlW * 5 - groupGap) / 5
		local qtyX = productX + 8 + slot * 2 + groupGap
		store[#store + 1] = button("buyMode", "Buy", productX+8, controlY, slot-4, controlH, function() setSell(false) end, { background = sell and "#27221c" or "#766446", ["font-size"] = "17px" })
		store[#store + 1] = button("sellMode", "Sell", productX+8+slot, controlY, slot-4, controlH, function() setSell(true) end, { background = sell and "#766446" or "#27221c", ["font-size"] = "17px" })
		for i, amount in { 1, 10, 100 } do
			local on = bulk == amount
			store[#store + 1] = button("bulk" .. amount, tostring(amount), qtyX+(i-1)*slot, controlY, slot-4, controlH, function() setBulk(amount) end, { background = on and "#544a38" or "#221e19", border = "1px solid #4e4436", color = on and "#f0e6d5" or "#a2988a", ["font-size"] = "16px" })
		end
		local products = {}
		-- What a building actually gives you was only ever in the desktop hover
		-- tooltip. Put it in the row. Production per unit moves only on upgrades
		-- and levels, and the share is rounded to a whole percent, so neither
		-- churns the row cache the way a raw cookie count would.
		local totalCps = Model.cps(state)
		for i, b in Model.Buildings do
			local price = Model.price(state, i, bulk, sell)
			local unlockedBuilding = i <= 2 or state.earned >= Model.Buildings[i - 1].price or state.buildings[i] > 0
			local affordable = sell and state.buildings[i] > 0 or not sell and state.cookies >= price
			local cached = productCache[i]
			local perUnit = b.cps * Model.multiplier(state, i)
			local sharePct = (totalCps > 0 and state.buildings[i] > 0) and math.floor(perUnit * state.buildings[i] / totalCps * 100 + .5) or 0
			local signature = table.concat({tostring(price),tostring(unlockedBuilding),tostring(affordable),tostring(state.buildings[i]),tostring(bulk),tostring(sell),tostring(productW),uiFont,tostring(perUnit),tostring(sharePct)},"|")
			if cached and cached.signature == signature then
				products[#products+1] = cached.element
				continue
			end
			local kids = {
				unlockedBuilding and buildingPicture("buildingIcon"..i,i,10,4,58,61,not affordable and {opacity="0.45"} or nil) or label("buildingIcon"..i,"???",10,4,58,61,23,"#8c8070",{["text-align"]="center"}),
				label("buildingName" .. i, unlockedBuilding and b.name or "???", 77, 7, productW - 139, 31, 25, affordable and "#fff7e6" or "#a59a89"),
				cookieCurrency("buildingCurrency"..i,79,40),
				label("buildingPrice" .. i, number(price), 109, 38, productW-124, 30, 22, affordable and "#91cf74" or "#b07865"),
				label("buildingOwned" .. i, state.buildings[i] > 0 and tostring(state.buildings[i]) or "", productW - 68, 8, 46, 52, 38, affordable and "#afa18a" or "#7b7264", { ["text-align"] = "right" }),
			}
			if unlockedBuilding then
				local detail = "+" .. number(perUnit, true) .. " / sec each"
				if sharePct > 0 then detail ..= "  ·  " .. sharePct .. "% of your bakery" end
				kids[#kids + 1] = label("buildingRate" .. i, detail, 79, 66, productW - 100, 24, 16, affordable and "#9db3a1" or "#6d7a70")
			elseif i > 1 then
				-- A locked row showed a price and no way to learn what opens it. The
				-- rule already exists just above: total baked past the previous price.
				kids[#kids + 1] = label("buildingUnlock" .. i, "Unlocks at " .. number(Model.Buildings[i - 1].price) .. " baked", 79, 66, productW - 100, 24, 16, "#8c8070")
			end
			products[#products + 1] = button("buyBuilding" .. i, "", 0, (i - 1) * 96, productW - 9, 94, function() send("trade", i, bulk, sell) end, { background = affordable and "linear-gradient(90deg, #534c40, #2d2923)" or "linear-gradient(90deg, #3a352d, #241f1b)", border = affordable and "1px solid #74634c" or "1px solid #4b4235",["--shop-icon"]=unlockedBuilding and ImageNames.buildings[i] or nil }, kids, function(inside) setHover(inside and i or 0) end, "linear-gradient(90deg, #766a54, #463f34)")
			productCache[i] = {signature=signature,element=products[#products]}
		end
		store[#store + 1] = e("scroll", { key = "storeProducts", id = "storeProducts", style = style(productX, productsY, productW, math.max(40, h - productsY), { overflow = "scroll" }) }, table.unpack(products))
		-- The bakery wears the best decor owned, so a purchase is immediately
		-- visible behind the cookie. With nothing bought it falls through to the
		-- bare stripes below. It briefly used BakeryLevel5 as that default, which
		-- was a mistake: that art is a fully dressed bakery and reads as the same
		-- room as the Tier 1 reward, so buying Tier 1 looked like it did nothing.
		-- An undecorated bakery has to LOOK undecorated.
		local ownedDecor=Model.equippedDecor(state)
		local backgroundName=if ownedDecor then ownedDecor.image else nil
        local bakeryBackground=remember(viewCache,"background",tostring(backgroundName)..":"..leftW..":"..h,function()return backgroundName and picture("bakeryBackground",backgroundName,0,0,leftW,h,{["object-fit"]="cover",["z-index"]="0"}) or stripes("blueStripes",leftW,h,"#173346","#1a3b51") end)
        local children = {
			box("bakeryColumn", 0, 0, leftW, h, nil, {bakeryBackground, remember(viewCache,"rain",leftW..":"..h..":"..tostring(state.cps>0)..":"..tostring(state.reducedMotion),function()return e(Rain,{key="rain",w=leftW,h=h,cps=state.cps,reducedMotion=state.reducedMotion})end), box("bakeryContent",bakeryOffset,0,landscape and leftW or 420,h,nil,left,{["z-index"]="2"})}, { overflow = "hidden",display=(not mobile or page=="Bake") and "block" or "none" }),
			rail("leftRail", leftW, 0, mobile and 0 or RAILW, h),
			box("navColumn", navX, 0, NAVW+NAVRAIL, h, "#1c1815", navItems,{display=(not mobile or page=="More") and "block" or "none",overflow="hidden",ref=navMarker.bind}),
			box("centerColumn", centerX, 0, centerW, h, nil, center,{display=(not mobile or page=="More") and "block" or "none",overflow="hidden"}),
			rail("rightRail", centerX + centerW, 0, mobile and 0 or RAILW, h), box("storeColumn", storeX, 0, storeW, h, nil, store,{display=(not mobile or page=="Shop") and "block" or "none",overflow="hidden"}),
		}
		if mobile then
			local nav={}
			for i,name in {"Bake","Shop","More"} do
                nav[i]=e(MenuImageButton,{key=name,name=name,x=(i-1)*(displayWidth/3)+4,width=displayWidth/3-8,selected=page==name,reducedMotion=state.reducedMotion,activate=function()setPage(name);setHover(0)end})
			end
			children[#children+1]=box("mobileNav",0,displayHeight-60,displayWidth,60,"#171510",nav,{["z-index"]="50"})
		end
        if (state.goldenUntil or 0)>state.played then
            local duration=state.goldenDuration or 12
            local elapsed=math.max(0,state.played-(state.goldenStarted or state.played))
            local cookieSize=44
            local artworkSize=mobile and 32 or 28
            local inset=(cookieSize-artworkSize)/2
            local x=math.max(0,leftW-cookieSize)*(state.goldenX or .5)
            local falling=button("goldenCookie","",x,-72,cookieSize,cookieSize,function()send("golden",snapshot.goldenId)end,{
                background="transparent",border="0px solid transparent",
                animation="goldenFall "..duration.."s linear -"..elapsed.."s forwards",
            },{picture("goldenArtwork","GoldenCookie",inset,inset,artworkSize,artworkSize)})
            children[#children+1]=e("div",{key="goldenDrop"..state.goldenId,id="goldenDrop",style=style(0,0,leftW,h-milkHeight,{overflow="hidden",["z-index"]="70",display=(not mobile or page=="Bake") and "block" or "none"})},falling)
        end
		children[#children+1]=e(Feedback,{key="feedback"})
        children[#children+1]=e(PromoPopups,{key="promos",width=displayWidth,height=displayHeight,mobile=mobile,
            available=function()
                return alive and snapshot.ready and (not mobile or currentPage=="Bake") and currentTab=="Buildings" and not snapshot.empireInvite and os.clock()-lastPurchaseAt>8 and not guiService.MenuIsOpen
            end,
            activate=function(kind)
                if kind=="shop" then setPage("Shop");setTab("Buildings")
                elseif kind=="starter" then premiumLanding[2]("Product");setPage("More");setTab("Treat Shop")
                elseif kind=="friends" then
                    if invitePromptBusy then return end
                    invitePromptBusy=true
                    task.spawn(function()
                        local ok,allowed=pcall(function()
                            local social=game:GetService("SocialService")
                            if not social:CanSendGameInviteAsync(Players.LocalPlayer) then return false end
                            if not alive then return false end
                            social:PromptGameInvite(Players.LocalPlayer);return true
                        end)
                        invitePromptBusy=false
                        if alive and (not ok or not allowed) then notify("Friend invites aren't available here yet.","info") end
                    end)
                end
            end})
		if not state.ready then
			children[#children+1]=box("loadingBakery",0,0,displayWidth,displayHeight,"#211d19",{
				label("loadingMessage",state.saveStatus or "Opening your bakery...",20,60,displayWidth-40,120,24,"#fff2dd",titleStyle)
			},{["z-index"]="90"})
		end

		children[#children + 1] = e(Tooltip, {key="tooltip",state=state,bulk=bulk,sell=sell})
		return e("div", { id = "cookieClicker", style = style(0, 0, displayWidth, displayHeight, { background = "#171510" }) }, table.unpack(children))
	end
	local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
	local old = playerGui:FindFirstChild("CookieClickerGui")
	if old then old:Destroy() end
    -- Only the backdrop extends behind Roblox controls; game controls use safe insets.
    local oldBackdrop=playerGui:FindFirstChild("CookieClickerBackdrop")
    if oldBackdrop then oldBackdrop:Destroy() end
    local backdrop=Instance.new("ScreenGui")
    backdrop.Name="CookieClickerBackdrop"
    backdrop.ScreenInsets=Enum.ScreenInsets.None
    backdrop.DisplayOrder=19
    backdrop.ResetOnSpawn=false
    local background=Instance.new("Frame")
    background.Name="Background"
    background.Size=UDim2.fromScale(1,1)
    background.BackgroundColor3=Color3.fromRGB(23,21,16)
    background.BorderSizePixel=0
    background.Parent=backdrop
    backdrop.Parent=playerGui
	local handle = toil.mountReactRoot(playerGui, animationRules, e(App), nil, nil)
	handle.gui.Name = "CookieClickerGui"
	handle.gui.IgnoreGuiInset = false
	handle.gui.ScreenInsets = Enum.ScreenInsets.CoreUISafeInsets
	handle.gui.SafeAreaCompatibility = Enum.SafeAreaCompatibility.None
	safeArea=Instance.new("Frame")
	safeArea.Name="SafeAreaBounds"
	safeArea.BackgroundTransparency=1
	safeArea.Size=UDim2.fromScale(1,1)
	safeArea.Parent=handle.gui
	handle.gui.ResetOnSpawn = false
	handle.gui.DisplayOrder = 20
	local viewportScale=Instance.new("UIScale")
	viewportScale.Name="ViewportScale"
	viewportScale.Scale=uiScale
	viewportScale.Parent=handle.gui:FindFirstChild("cookieClicker",true)
	local revision = 0
	-- One flush on the renderer's Heartbeat. Never recursively drain React
	-- from every network packet or delayed click callback.
	-- Bank changes do not rebuild the hundreds of static scene/store elements.
	-- Re-render the page only when its visible content or affordability changes.
	local lastSignature
	local lastAdventureSecond=-1
	local priceCache = {}
	local function pageSignature()
		local storeVisible=not mobile or currentPage=="Shop"
		local monetizationSignature=tostring(snapshot.paidRandomAllowed)..":"..tostring(snapshot.shieldUntil)
		for _,key in Model.MonetizationConfig.PassOrder do monetizationSignature..=":"..tostring(snapshot.passes and snapshot.passes[key]) end
		-- Owning a one-time product changes its card, so it has to move the
		-- signature or the shop keeps offering something already bought.
		for _,key in Model.MonetizationConfig.ProductOrder do monetizationSignature..=":"..tostring(Model.productOwned(snapshot,key)) end
		for _,d in Model.Decor do monetizationSignature..=":"..tostring(Model.decorOwned(snapshot,d.id)) end
		local equipped=Model.equippedDecor(snapshot)
		local parts = {equipped and equipped.id or "default", snapshot.bakery, snapshot.saveStatus or "", tostring(snapshot.cps), tostring(snapshot.clickPower), tostring(snapshot.soundEnabled), tostring(snapshot.soundVolume), tostring(snapshot.reducedMotion), tostring(snapshot.goldenId), tostring((snapshot.goldenUntil or 0)>snapshot.played), tostring(snapshot.ready), tostring(snapshot.earned < 50), tostring(snapshot.earned < 1000)}
		local ownedTotal = 0
		for i, b in Model.Buildings do
			ownedTotal += snapshot.buildings[i]
			parts[#parts+1] = tostring(snapshot.buildings[i])
			if storeVisible then parts[#parts+1] = tostring(snapshot.earned >= b.price) end
			local cached = priceCache[i]
			if not cached or cached.owned ~= snapshot.buildings[i] then
				cached = {owned=snapshot.buildings[i],prices={}}
				for _, bulk in {1,10,100} do cached.prices[#cached.prices+1] = Model.price(snapshot,i,bulk,false) end
				priceCache[i] = cached
			end
			if storeVisible then for _, price in cached.prices do parts[#parts+1] = tostring(snapshot.cookies >= price) end end
		end
		-- The bank is deliberately absent above, so a rising cookie count does not
		-- rebuild every scene and store row. The one exception is the first-run goal
		-- card: while nothing is owned there are no scenes to rebuild and production
		-- is zero, so this only ticks on a click, and its progress bar can then keep
		-- step with the counter beside it instead of lagging a frame behind.
		if ownedTotal == 0 then parts[#parts+1] = tostring(math.floor(snapshot.cookies)) end
		for _, u in Model.Upgrades do
			parts[#parts+1] = tostring(snapshot.upgrades[u.id] == true)
			if storeVisible and not snapshot.upgrades[u.id] and snapshot.buildings[u.building]>=u.required then
				parts[#parts+1] = tostring(snapshot.cookies >= u.price)
			end
		end
		for _, a in Model.Achievements do parts[#parts+1] = tostring(snapshot.achievements[a[1]] == true) end
		-- Campaign slots redraw once a second off the Work tab's timed refresh,
		-- but starting, cancelling or collecting one has to land immediately.
		for _, entry in snapshot.economy.ads or {} do parts[#parts+1] = entry.id..":"..math.ceil(entry.remaining) end
		parts[#parts+1] = tostring(#(snapshot.economy.ads or {}))
		return monetizationSignature.."|"..table.concat(parts,"|")
	end
	local function update(force)
		revision += 1
		if refreshCounters then refreshCounters(revision) end
		local signature = pageSignature()
		local centerVisible=not mobile or currentPage=="More"
		local timedMenu=centerVisible and (currentTab=="Stats" or currentTab=="Adventure" or currentTab=="Work")
		if force or signature ~= lastSignature or (timedMenu and math.floor(snapshot.played) ~= lastAdventureSecond) then
			lastSignature = signature
			lastAdventureSecond=math.floor(snapshot.played)
			if refresh then refresh(revision) end
		end
	end
	local connection = remote.OnClientEvent:Connect(function(nextState)
		local oldInvite=snapshot.empireInvite
		snapshot = nextState
        refreshResources(nextState)
		audio.setEnabled(snapshot.soundEnabled~=false)
		audio.setVolume(snapshot.soundVolume or 100)
		for _,event in snapshot.events or {} do
			if event.id>lastEventId then lastEventId=event.id;notify(event.text,event.kind) end
		end
		update(false)
        local invite=snapshot.empireInvite
        if invite and (not oldInvite or invite.id~=oldInvite.id or invite.expires~=oldInvite.expires) then showEmpireInvitation() end
	end)
	local resize = workspace.CurrentCamera:GetPropertyChangedSignal("ViewportSize"):Connect(function()
		measureViewport()
		viewportScale.Scale=uiScale
		update(true)
	end)
	local safeResize=safeArea:GetPropertyChangedSignal("AbsoluteSize"):Connect(function()
		measureViewport();viewportScale.Scale=uiScale;update(true)
	end)
	local inputResize=input:GetPropertyChangedSignal("TouchEnabled"):Connect(function()
		measureViewport();viewportScale.Scale=uiScale;update(true)
	end)
	measureViewport();viewportScale.Scale=uiScale;update(true)
	script.Destroying:Connect(function() alive=false;if feedbackQueue then feedbackQueue.destroy() end;connection:Disconnect(); resize:Disconnect();safeResize:Disconnect();inputResize:Disconnect(); audio.destroy();handle.unmount();backdrop:Destroy() end)
	local actions=game:GetService("ContextActionService")
	actions:BindAction("CookieClickerBake",function(_,state)
		if input:GetFocusedTextBox() then return Enum.ContextActionResult.Pass end
		if state==Enum.UserInputState.Begin then send("click");emitClick() end
		return Enum.ContextActionResult.Sink
	end,false,Enum.KeyCode.ButtonR2)
	local usingController=input:GetLastInputType().Name:find("Gamepad",1,true)~=nil
	actions:BindAction("CookieClickerBack",function(_,state)
		if input:GetFocusedTextBox() or guiService.MenuIsOpen then return Enum.ContextActionResult.Pass end
		if state==Enum.UserInputState.Begin and navigateBack() then
			usingController=true
			guiService.SelectedObject=nil
			return Enum.ContextActionResult.Sink
		end
		return Enum.ContextActionResult.Pass
	end,false,Enum.KeyCode.ButtonB)
	local selection=input.LastInputTypeChanged:Connect(function(kind)
		usingController=kind.Name:find("Gamepad",1,true)~=nil
	end)
	local function visibleSelection(object)
		if not object or not object:IsDescendantOf(handle.gui) then return false end
		local node=object
		while node and node~=handle.gui do
			if node:IsA("GuiObject") and (not node.Visible or node.AbsoluteSize.X<=0 or node.AbsoluteSize.Y<=0) then return false end
			node=node.Parent
		end
		return true
	end
	local focusElapsed=0
	local focus=game:GetService("RunService").Heartbeat:Connect(function(dt)
		if not usingController or guiService.MenuIsOpen or input:GetFocusedTextBox() then return end
		focusElapsed+=dt;if focusElapsed<.15 then return end;focusElapsed=0
		local selected=guiService.SelectedObject
		if selected and not selected:IsDescendantOf(handle.gui) then return end
		if visibleSelection(selected) then return end
		local focusTab=(currentTab=="Options" or currentTab=="Stats") and "More" or currentTab
		local name=mobile and ("nav"..currentPage) or (focusTab~="Buildings" and "tab"..focusTab or "bigCookie")
		local target=handle.gui:FindFirstChild(name,true)
		if visibleSelection(target) then guiService.SelectedObject=target end
	end)
	script.Destroying:Connect(function()selection:Disconnect();focus:Disconnect();actions:UnbindAction("CookieClickerBake");actions:UnbindAction("CookieClickerBack")end)
	send("sync")
	print("[CookieClicker] Mounted with toil-luau React")
	return handle
end
