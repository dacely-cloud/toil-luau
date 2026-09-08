-- All visible UI is rendered by toil-luau's React reconciler and CSS host.
local Players = game:GetService("Players")
local RS = game:GetService("ReplicatedStorage")
local TS = require(RS:WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local toil = TS.import(script, RS, "TS")
local React = toil.React
local e = React.createElement
local Model = require(script.Parent.Model)
local Layout = require(script.Parent.Layout)
local makeAudio = require(script.Parent.Audio)
local ImageConfig = require(RS:WaitForChild("ImageConfig"))
local ImageNames = require(script.Parent.ImageNames)
local uiFont = "Georgia"
local suffixes = { "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion" }
local function number(n, decimals)
	if n >= 1e6 then
		local tier = math.min(#suffixes, math.floor(math.log10(n) / 3) - 1)
		return string.format("%.3f %s", n / 10 ^ ((tier + 1) * 3), suffixes[tier])
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
local function box(id, x, y, w, h, color, children, more)
	local s = style(x, y, w, h, more)
	if color then s.background = color end
	return e("div", { key = id, id = id, style = s }, table.unpack(children or {}))
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
	return e("button", {id=props.id,style=s,onClick=props.onClick,
		onMouseEnter=function() setHovered(true); props.hover(true) end,
		onMouseLeave=function() setHovered(false); props.hover(false) end}, table.unpack(props.content))
end
local function button(id, text, x, y, w, h, callback, more, kids, hover, highlight)
	local s = style(x, y, w, h, { color = "#fff4df", ["font-family"] = uiFont, ["font-size"] = "19px", background = "#493b2e", border = "1px solid #89745c", ["text-align"] = "center" })
	if more then for k, v in more do s[k] = v end end
	local children = kids or {}
	if text ~= "" then table.insert(children, 1, text) end
	if hover then return e(HoverButton, {key=id,id=id,style=s,onClick=callback,content=children,hover=hover,highlight=highlight}) end
	return e("button", { key = id, id = id, style = s, onClick = callback, onMouseEnter = hover and function() hover(true) end, onMouseLeave = hover and function() hover(false) end }, table.unpack(children))
end
local function rail(id, x, y, w, h)
	return box(id, x, y, w, h, "linear-gradient(90deg, #21160e, #9e7650, #5d3c24, #b28c5c, #291e14)", {}, { border = "1px solid #1b120c" })
end
local function picture(id,name,x,y,w,h,more)
    local s=style(x,y,w,h,{background="transparent",["background-image"]="url("..ImageConfig.get(name)..")",["object-fit"]="contain"})
    if more then for k,v in more do s[k]=v end end
    return e("img",{key=id,id=id,style=s})
end
-- A static, weighted image stack approximates a soft blur within this card.
-- It is cached, does not animate, and leaves text/buttons outside the blur.
local standBackgroundCache={}
local function standBackground(width,height)
    if standBackgroundCache.width==width and standBackgroundCache.height==height then return standBackgroundCache.element end
    local layers={}
    local weight=0
    local zoom=1.35
    local imageW,imageH=width*zoom+48,height*zoom+48
    for row=-2,2 do
        for col=-2,2 do
            local sampleWeight=math.exp(-(row*row+col*col)/2)
            weight+=sampleWeight
            layers[#layers+1]=picture("blurSample"..#layers,"CookieStandBackground",(width-imageW)/2+col*10,(height-imageH)/2+row*10,imageW,imageH,{
                ["object-fit"]="cover",opacity=tostring(sampleWeight/weight),["z-index"]=tostring(#layers+1),
            })
        end
    end
    layers[#layers+1]=box("backgroundShade",0,0,width,height,"rgba(17,13,10,0.48)",nil,{["z-index"]="30"})
    local element=box("standBackground",0,0,width,height,nil,layers,{overflow="hidden",["z-index"]="0"})
    standBackgroundCache={width=width,height=height,element=element}
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
		return "Each click gives " .. number(before*2,true) .. " cookies instead of " .. number(before,true) .. ".\nYour cursors make double the cookies too!"
	end
	local building = Model.Buildings[u.building]
	local before = building.cps * Model.multiplier(state,u.building)
	return "Each " .. building.name:lower() .. " makes " .. number(before*2,true) .. " cookies a second instead of " .. number(before,true) .. "."
end
local animationRules = toil.cssToRules([[
@keyframes goldenFall { from { top: -72px; rotation: -20; } to { top: 100%; rotation: 160; } }
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
local function Cookie(props)
	local state = React.useState(false)
	local hover = React.useState(false)
	local pressed, setPressed = state[1], state[2]
	return e("button", {id="bigCookie",style=style(210,props.y+135,270,270,{
		background="transparent",
		rotation="0",transform="scale(" .. (pressed and "0.94" or hover[1] and "1.04" or "1") .. ")",transition="transform 0.09s ease-out"}),
		onMouseEnter=function() hover[2](true) end,
		onMouseLeave=function() hover[2](false); setPressed(false) end,
		onMouseDown=function() setPressed(true) end,
		onMouseUp=function() setPressed(false) end,
		onClick=function() props.send("click"); props.emit() end},picture("cookieArtwork","Cookie",0,0,270,270))
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
return function()
	local remote = script.Parent:WaitForChild("Action")
	local snapshot = Model.snapshot(Model.new())
	snapshot.ready = false
	local audio = makeAudio()
	local alive = true
	local notify = function() end
	local lastEventId = 0
	snapshot.saveStatus = "Connecting…"
	local refresh
	local refreshCounters
	local currentTab = "Buildings"
	local currentPage="Bake"
	local navigateBack=function()return false end
	-- Reflow panels to the actual viewport; text stays at native pixel sizes.
	local displayWidth, displayHeight, uiScale, mobile, contentHeight, landscape
	local guiService=game:GetService("GuiService")
	local safeArea
	local function measureViewport()
		local viewport = workspace.CurrentCamera.ViewportSize
		local topLeft,bottomRight=guiService:GetGuiInset()
		local size=safeArea and safeArea.AbsoluteSize
		local width,height=viewport.X-topLeft.X-bottomRight.X,viewport.Y-topLeft.Y-bottomRight.Y
		if size and size.X>0 and size.Y>0 then width,height=size.X,size.Y end
		local layout = Layout.measure(width,height)
		uiScale, displayWidth, displayHeight, mobile, contentHeight = layout.scale, layout.width, layout.height, layout.mobile, layout.contentHeight
		landscape=layout.landscape
		uiFont=mobile and "Arial" or "Georgia"
	end
	measureViewport()
	local function columnWidths()
		if mobile then return displayWidth,displayWidth,displayWidth end
		local available = displayWidth - 24
		local left=math.min(480,available*.30)
		local store=math.max(340,math.min(440,available*.25))
		return left,available-left-store,store
	end
	local function send(action,...)
		if action~="sync" and not snapshot.ready then notify("Please wait while your bakery opens.","info");return end
		if action=="click" then audio.play("click") end
		remote:FireServer(action,...)
	end
	local function Feedback()
		local message = React.useState(nil)
		local serial = React.useRef(0)
		notify=function(text,kind)
			serial.current+=1
			local id=serial.current
			message[2]({text=text,kind=kind})
			audio.play(kind)
			task.delay(4,function()if alive and serial.current==id then message[2](nil)end end)
		end
		local value=message[1]
		local w=math.min(540,displayWidth-20)
		return box("feedback",(displayWidth-w)/2,mobile and 34 or 42,w,76,value and value.kind=="error" and "#603728" or "#30462c",{
			label("feedbackText",value and value.text or "",12,8,w-24,60,19,"#ffffff",{["text-align"]="center"})
		},{display=value and "block" or "none",["z-index"]="100",border="2px solid #dabf81"})
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
        refreshResources=function(nextState)
            local economy=nextState.economy
            local signature=tostring(economy.xp)..":"..math.floor(economy.energy)..":"..math.floor(economy.stamina)
            if signature~=previous.current then previous.current=signature;value[2](nextState) end
        end
        local state=value[1]
        local width=props.width
        local meterWidth=(width-12)/2
        local resourceStatus={}
        for i,resource in {"energy","stamina"} do
            local x=(i-1)*(meterWidth+12)
            resourceStatus[#resourceStatus+1]=label(resource.."Amount",(resource=="energy" and "Energy " or "Stamina ")..math.floor(state.economy[resource]).."/100",x,0,meterWidth,19,14,resource=="energy" and "#a6ddeb" or "#dabbed")
            resourceStatus[#resourceStatus+1]=box(resource.."Meter",x,20,meterWidth,3,"#393331",{
                box("fill",0,0,meterWidth*math.clamp(state.economy[resource]/100,0,1),3,resource=="energy" and "#6abed5" or "#b18bcc"),
            })
        end
        resourceStatus[#resourceStatus+1]=label("workStatus","Lv "..Model.jobLevel(state),width-64,-27,64,22,14,"#f5d58f",{["text-align"]="right"})
        return box("resourceStatus",48,31,width,23,nil,resourceStatus)
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
        return e(React.Fragment, nil,
            label("cookieCount", number(snapshot.cookies) .. (math.floor(snapshot.cookies) == 1 and " cookie" or " cookies"), 12, 56, props.width-24, 32, 31, "#ffffff", {["text-align"]="center"}),
            label("cps", number(snapshot.cps, true).." cookies / second", 12, 88, props.width-24, 23, 19, "#ffffff", {["text-align"]="center"}),
            label("bonusTimer",(snapshot.frenzyUntil or 0)>snapshot.played and ("Double baking! "..math.ceil(snapshot.frenzyUntil-snapshot.played).."s left") or "",12,116,props.width-24,22,16,"#f4d28a",{["text-align"]="center"}))
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
		local nameDraft = React.useRef("")
		local confirmFresh=React.useState(false)
		local workPage=React.useState("Jobs")
        local adventurePage=React.useState("Home")
        local jarAmount=React.useState(100)
        local empireNameDraft=React.useRef("")
        local empireBadge=React.useState("cookie")
        local empireEdit=React.useState(false)
		navigateBack=function()
			if mobile and page~="More" then
				if page=="Bake" then return false end
				setPage("Bake");return true
			end
			if confirmFresh[1] then confirmFresh[2](false)
			elseif empireEdit[1] and tab=="Work" then empireEdit[2](false)
			elseif tab=="Work" and workPage[1]~="Jobs" then workPage[2]("Jobs")
			elseif tab=="Adventure" and adventurePage[1]~="Home" then adventurePage[2]("Home")
			elseif tab=="Options" or tab=="Stats" then setTab("More")
			elseif tab~="Buildings" then setTab("Buildings")
			elseif mobile and page=="More" then setPage("Bake")
			else return false end
			setHover(0);return true
		end
		local h = contentHeight
		local leftW, centerW, storeW = columnWidths()
		local centerX, storeX = mobile and 0 or leftW + 12, mobile and 0 or displayWidth - storeW
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
		local left = {}
        local profileWidth=landscape and leftW*.45 or leftW
        local avatar=e("img",{id="playerAvatar",style=style(8,6,34,34,{
            background="transparent",["background-image"]="url(rbxthumb://type=AvatarHeadShot&id="..Players.LocalPlayer.UserId.."&w=150&h=150)",["object-fit"]="contain",
        })})
        left[#left+1]=box("playerProfile",-bakeryOffset,0,profileWidth,116,"rgba(0,0,0,0.35)",{
            avatar,
            label("bakeryName",state.bakery,48,4,profileWidth-124,24,18,"#f4e9d9"),
            e(Counters,{key="counters",width=profileWidth}),
            e(ResourceStatus,{key="resourceStatus",width=profileWidth-60}),
        },{["z-index"]="5"})
		local cookieY = 0
		local cookieScale = math.min(1, math.max(0.25, (h - (landscape and 70 or 190)) / 380))
		local scene = {}
		scene[#scene + 1] = picture("cookieShine","CookieShine",210,cookieY+135,380,380,{rotation="0",animation=not state.reducedMotion and "shine 60s linear infinite" or ""})
		scene[#scene + 1] = box("cookieHalo", 55, cookieY - 20, 310, 310, "rgba(180,224,255,0.08)", {}, { ["border-radius"] = "155px" })
		scene[#scene + 1] = box("cookieHaloInner", 67, cookieY - 8, 286, 286, "rgba(165,218,255,0.09)", {}, { ["border-radius"] = "143px" })
		scene[#scene + 1] = e(Cookie, { key = "cookie", y = cookieY, send = send, emit=function() emitClick() end })
		scene[#scene + 1] = e(Cursors,{key="cursors",count=state.buildings[1],y=cookieY,reducedMotion=state.reducedMotion})
		left[#left+1] = box("cookieScene",(landscape and leftW*.7 or 210)-210*cookieScale,(landscape and (h-50)/2+20 or 138+(h-178)/2)-135*cookieScale,420,math.max(380,h),nil,scene,{transform="scale("..cookieScale..")"})
		left[#left + 1] = e(ClickEffects,{key="effects"})
		local unlocked = 0
		for _ in state.achievements do unlocked += 1 end
		local milkHeight = math.min(h * 0.35, 26 + unlocked * 12)
		left[#left + 1] = box("milk", -bakeryOffset, h - milkHeight, leftW, milkHeight, "linear-gradient(90deg, #e8e7dd, #a8bfca)")
		left[#left + 1] = box("milkWave",-bakeryOffset-80,h-milkHeight,leftW+160,12,nil,{
			e("path2d",{key="milkFoam",id="milkFoam",color="#faf5e8",thickness=8,controlPoints=wave.points})
		},{animation=not state.reducedMotion and "milkFlow 4s linear infinite" or "",transition="top 0.8s ease-out"})
		left[#left + 1] = label("version", "v1", 12, h - 28, 120, 20, 14, "#516572")
		local center = { stripes("brownStripes", centerW, h, "#211d19", "#28231e") }
        local workSections={
            {"Jobs","WashCookieTray"},{"Properties","CookieStore"},{"Shop","Spatula"},{"Bag","CookieTray"},
            {"Collection","CookieCrown"},{"Jar","CookieJar"},{"Charity","CookieFestival"},{"Empire","CookieEmpire"},
        }
        local shortcuts={}
        for i,section in workSections do
            local name=section[1]
            shortcuts[#shortcuts+1]=button("work"..name,"",(i-1)*100,0,96,82,function()setTab("Work");workPage[2](name)end,{background=tab=="Work" and workPage[1]==name and "#74603a" or "#30271f"},{
                picture("shortcutPicture",section[2],27,4,42,42),
                label("shortcutName",name,2,51,92,26,16,"#fff4df",{["text-align"]="center"}),
            })
        end
        center[#center+1]=e("scroll",{key="workShortcuts",id="workShortcuts",style=style(8,4,centerW-16,88,{["overflow-x"]="scroll",["overflow-y"]="hidden"})},table.unpack(shortcuts))
        center[#center+1]=rail("shortcutsRail",0,92,centerW,10)

		local tabs = { "Adventure", "Work", "More" }
		for i, name in tabs do
			center[#center + 1] = button("tab" .. name, name, 8 + (i - 1) * ((centerW - 14) / #tabs), 110, (centerW - 14) / #tabs - 4, mobile and 44 or 31, function() setTab(tab == name and "Buildings" or name) end, { background = tab == name and "#726047" or "#322a22", ["font-size"] = math.min(18,(centerW-34)/#tabs/5.5).."px" })
		end
		center[#center + 1] = rail("toolbarRail", 0, 150, centerW, 10)
		if tab == "Buildings" then
			local rows = {}
			local row = 0
			for i, b in Model.Buildings do
				if state.buildings[i] > 0 then
					local children = {
						label("ownedTitle" .. i, b.name, 18, 6, 390, 26, 24, "#ffffff"),
						label("ownedCps" .. i, number(b.cps * state.buildings[i] * Model.multiplier(state, i), true) .. " cookies / second", 18, 35, 400, 22, 14, "#ddd4c6"),
						label("ownedCount" .. i, tostring(state.buildings[i]), centerW - 110, 6, 72, 48, 40, "#e2d7c5", { ["text-align"] = "right" }),
					}
					for k = 1, math.min(state.buildings[i], 14) do
						children[#children + 1] = buildingPicture("sprite" .. i .. "_" .. k,i,16+(k-1)*41,62,38,48)
					end
					children[#children + 1] = rail("rowRail" .. i, 0, 117, centerW - 12, 7)
					rows[#rows + 1] = box("buildingScene" .. i, 0, row * 124, centerW - 12, 124, row % 2 == 0 and "#37352d" or "#302d27", children)
					row += 1
				end
			end
			if row == 0 then
				rows[#rows + 1] = label("emptyHint", "Your cookie empire starts with a click.", 25, 62, centerW - 50, 35, 22, "#968675", titleStyle)
				rows[#rows + 1] = label("emptySub", "Buy buildings in the store to start baking automatically.", 35, 103, centerW - 70, 48, 16, "#7d7165", titleStyle)
			end
			center[#center + 1] = e("scroll", { key = "buildingScenes", id = "buildingScenes", style = style(0, 160, centerW, math.max(30,h - 164), { overflow = "scroll" }) }, table.unpack(rows))
		else
			local pane = tab=="Work" and {} or { label("panelTitle", tab, 24, 12, centerW-48, 40, 32, "#fff0d8") }
			if tab == "More" then
                pane[#pane+1]=button("openOptions","Options",24,68,centerW-48,52,function()setTab("Options")end)
                pane[#pane+1]=button("openStats","Stats",24,132,centerW-48,52,function()setTab("Stats")end)
            elseif tab == "Stats" then
				local stats = {
					{ "Cookies in bank", number(state.cookies) }, { "Cookies baked (all time)", number(state.earned) },
					{ "Cookies per second", number(state.cps, true) }, { "Cookies per click", number(state.clickPower, true) },
					{ "Cookie clicks", number(state.clicks) }, { "Hand-made cookies", number(state.handmade) },
					{ "Run duration", math.floor(state.played / 60) .. " minutes" }, { "Achievements", unlocked .. " / " .. #Model.Achievements },
				}
				for i, pair in stats do
					pane[#pane + 1] = label("statName" .. i, pair[1], 24, 68 + (i - 1) * (mobile and 52 or 34), mobile and 210 or 300, mobile and 48 or 30, 17)
					pane[#pane + 1] = label("statValue" .. i, pair[2], mobile and 235 or 326, 68 + (i - 1) * (mobile and 52 or 34), mobile and centerW-259 or 274, mobile and 48 or 30, 17, "#d4b474", { ["text-align"] = "right" })
				end
				pane[#pane + 1] = label("achievementHeading", "Achievements", 24, mobile and 490 or 362, centerW-48, 36, 27)
				for i, a in Model.Achievements do pane[#pane + 1] = label("achievement" .. i, (state.achievements[a[1]] and "Done: " or "Goal: ") .. a[1] .. "  —  " .. a[2], 24, (mobile and 535 or 405) + (i - 1) * (mobile and 60 or 36), centerW-48, mobile and 56 or 32, 16, state.achievements[a[1]] and "#e6c980" or "#877c6e") end
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
                    for _,job in Model.Jobs do
                        local locked=Model.jobLevel(state)<job.level
                        local ready=not locked and economy.energy>=job.energy
                        local reward=math.floor(job.cookies*Model.collectionBonus(state)*(1+Model.empireBonus(state))^2)
                        local card={
                            picture("jobPicture",ImageNames.jobs[job.id],12,14,52,52),
                            label("jobTitle",job.name,76,10,w-88,30,21,"#fff4df"),
                            label("jobRewards",number(reward).." cookies  |  +"..job.xp.." XP",76,44,w-88,28,19,"#ffe3a3"),
                            label("jobDrop",math.floor(job.chance*100).."% item chance",14,80,w-150,28,16,"#ddd2ff"),
                            button("doJob"..job.id,locked and "Level "..job.level or "Do it!",w-128,78,114,48,function()send("economy","job",job.id)end,{background=ready and "#276849" or "#51483d",["font-size"]="22px"}),
                            label("jobEnergy",job.energy.." energy",14,110,w-150,26,18,"#9fdcf6"),
                        }
                        pane[#pane+1]=box("jobCard"..job.id,24,y,w,146,"#342d25",card,{border="1px solid #827052",["border-radius"]="12px"});y+=158
                    end
                elseif workPage[1]=="Properties" then
                    text("propertyIncome","Your places: +"..number(Model.propertyIncome(state),true).." cookies / sec",38)
                    for _,property in Model.Properties do
                        local card={
                            picture("propertyArt",ImageNames.properties[property.id],12,18,56,56),
                            label("propertyName",property.name,80,10,w-92,28,22,"#fff4df"),
                            label("propertyCount","Own "..(economy.properties[property.id] or 0).."  |  +"..number(property.income*Model.collectionBonus(state)*(1+Model.empireBonus(state))^2,true).." / sec each",80,44,w-92,40,18,"#b6e6bf"),
                            button("buyProperty"..property.id,"Buy: "..number(Model.propertyPrice(state,property.id)),12,94,w-24,48,function()send("economy","property",property.id)end,{background="#276849",["font-size"]="21px"}),
                        }
                        if property.id=="stand" then
                            card={box("standBackgroundInset",4,4,w-8,146,nil,{standBackground(w-8,146)},{overflow="hidden",["z-index"]="0"}),box("propertyControls",0,0,w,154,nil,card,{["z-index"]="2"})}
                        end
                        pane[#pane+1]=box("propertyCard"..property.id,24,y,w,154,"#342d25",card,{border="1px solid #827052",["border-radius"]="12px",overflow="hidden"});y+=166
                    end
                elseif workPage[1]=="Shop" or workPage[1]=="Bag" or workPage[1]=="Collection" then
                    text("collectionHelp","Collection boost: +"..math.floor((Model.collectionBonus(state)-1)*100+.5).."% cookies",38)
                    local rarityColors={Common="#b4c4d0",Uncommon="#89cf9e",Rare="#93b5ff",Legendary="#f5cd70"}
                    for _,item in Model.Items do
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
                        else card[#card+1]=label("activeBoost","Boost is active",14,117,w-28,35,21,"#b6e6bf") end
                        pane[#pane+1]=box("itemCard"..item.id,24,y,w,172,"#342d25",card,{border="1px solid "..rarityColors[item.rarity],["border-radius"]="12px"});y+=184
                    end
                elseif workPage[1]=="Empire" then
                    local empire=state.empire
                    local function empireButton(id,title,kind,arg,extra)
                        pane[#pane+1]=button(id,title,24,y,w,48,function()if not state.empirePending then send("empire",kind,arg,extra) end end,{["font-size"]="20px",background="#544479"});y+=56
                    end
                    local function badgeArt(id,badge,x,py)
                        return picture(id,ImageNames.badges[badge] or "CookieEmpire",x,py,64,64)
                    end
                    if empire then
                        pane[#pane+1]=badgeArt("myEmpireBadge",empire.badge,24,y)
                        pane[#pane+1]=label("empireName",empire.name,100,y,w-76,32,24,"#fff0d8")
                        pane[#pane+1]=label("empireLevel","Level "..empire.level.."  |  "..empire.members.." friends",100,y+36,w-76,28,18,"#dbc5ef");y+=80
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
                            pane[#pane+1]=button("editEmpire","Name & picture",24,y,w,48,function()empireEdit[2](not empireEdit[1])end);y+=56
                        else empireButton("leaveEmpire","Leave empire","leave") end
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
                        },{["border-radius"]="12px"});y+=200
                    else
                        pane[#pane+1]=box("partyJar",24,y,w,80,nil,{
                            picture("jarPicture","CookieJar",0,0,64,64),
                            label("jarBalance",number(economy.jar).." in your jar",76,4,w-76,34,22,"#ffe3a3"),
                            button("openJar","Add cookies",76,40,w-76,40,function()workPage[2]("Jar")end,{["font-size"]="18px"}),
                        });y+=92
                        for i,tier in Model.Fundraisers do
                            local ready=economy.jar>=tier.cost and not state.charityPending
                            pane[#pane+1]=box("partyTier"..i,24,y,w,154,"#342d25",{
                                picture("partyPicture","CookieFestival",12,12,56,56),
                                label("partyDuration",tier.name,80,10,w-92,28,23,"#fff4df"),
                                label("partyReward",number(math.floor(tier.cost*tier.multiplier)).." cookies back",80,42,w-92,30,19,"#b6e6bf"),
                                button("startCharity"..i,(ready and "Start: " or "Need: ")..number(tier.cost).." from jar",12,90,w-24,50,function()if ready then send("fundraiser","start",i) else workPage[2]("Jar") end end,{background=ready and "#276849" or "#51483d",["font-size"]="20px"}),
                            },{["border-radius"]="12px"});y+=166
                        end
                        text("partyChanges","Friends can add cookies. Thieves can take some.",48)
                    end
                    text("charityPlayers","Friends' parties",36)
                    local found=false
                    for _,other in state.socialPlayers or {} do
                        if other.id~=state.playerId and other.endsAt>(state.serverNow or 0) then
                            found=true
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
                            },{["border-radius"]="12px"});y+=216
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
                    })
                    local cell=(controlsW-8)/2
                    for i,amount in {100,500,1000,10000} do
                        pane[#pane+1]=button("jarAmount"..amount,number(amount),controlsX+((i-1)%2)*(cell+8),y+math.floor((i-1)/2)*52,cell,44,function()jarAmount[2](amount)end,{background=jarAmount[1]==amount and "#74603a" or "#30271f",["font-size"]="17px"})
                    end
                    pane[#pane+1]=button("depositCookies","Put in",controlsX,y+108,controlsW,48,function()send("economy","deposit",jarAmount[1])end,{background="#276849",["font-size"]="22px"})
                    pane[#pane+1]=button("withdrawCookies","Take out",controlsX,y+164,controlsW,48,function()send("economy","withdraw",jarAmount[1])end,{["font-size"]="22px"})
                    y+=228
                    pane[#pane+1]=button("jarParty","Start a cookie party",24,y,w,48,function()workPage[2]("Charity")end,{background="#544479",["font-size"]="21px"});y+=56

                end

			else
				local y=68
				local w=centerW-48
				local function text(id,value,height)
					pane[#pane+1]=label(id,value,24,y,w,height or 60,18,"#dfd3bf");y+= (height or 60)+8
				end
				local function action(id,title,kind,arg)
					pane[#pane+1]=button(id,title,24,y,w,48,function()send("advanced",kind,arg)end,{["font-size"]="18px"});y+=56
				end
                local activities={
                    {"Stars","GoldenCookie"},{"Boosts","CookieCrown"},{"Levels","CookieTray"},
                    {"Buddies","Grandma"},{"Garden","Farm"},{"Market","CookieMarket"},
                    {"Helpers","CookieTemple"},{"Magic","CookieWizardTower"},{"Seasons","CookieFestival"},
                }
                if adventurePage[1]=="Home" then
                    local columns=w>=480 and 3 or 2
                    local cardW=(w-(columns-1)*12)/columns
                    for i,activity in activities do
                        local x=24+((i-1)%columns)*(cardW+12)
                        local row=math.floor((i-1)/columns)
                        pane[#pane+1]=button("adventure"..activity[1],"",x,y+row*120,cardW,108,function()adventurePage[2](activity[1])end,{background="#342d25",["border-radius"]="10px"},{
                            picture("activityPicture",activity[2],(cardW-60)/2,8,60,60),
                            label("activityName",activity[1],4,74,cardW-8,28,21,"#fff4df",{["text-align"]="center"}),
                        })
                    end
                else
                    local imageName="Cookie"
                    for _,activity in activities do if activity[1]==adventurePage[1] then imageName=activity[2];break end end
                    pane[#pane+1]=button("adventureBack","Back",24,y,80,48,function()confirmFresh[2](false);adventurePage[2]("Home")end,{["font-size"]="21px"})
                    pane[#pane+1]=picture("activityPicture",imageName,116,y,48,48)
                    pane[#pane+1]=label("activityName",adventurePage[1],176,y+6,w-152,36,24,"#ffe3a3")
                    y+=64
                    if adventurePage[1]=="Stars" then
				text("prestigeInfo","Fresh start: "..number(state.prestige).." baking stars.\nYou can earn "..number(Model.ascensionGain(state)).." star chips now. Each star adds 1% baking.",85)
				text("freshWarning","A fresh start resets cookies, buildings and normal boosts. Keep your stars, sugar lumps, building levels and achievements.",90)
				pane[#pane+1]=button("ascendBakery",confirmFresh[1] and "Confirm: start a new bakery" or "Start a new bakery",24,y,w,48,function()
					if confirmFresh[1] then send("advanced","ascend");confirmFresh[2](false) else confirmFresh[2](true) end
				end);y+=56
				if confirmFresh[1] then pane[#pane+1]=button("cancelAscend","Keep my bakery",24,y,w,48,function()confirmFresh[2](false)end);y+=56 end

                    elseif adventurePage[1]=="Boosts" then
				text("chipCount","Star chips: "..number(state.chips),32)
				action("heavenlyBaking","10% more baking - 1 star chip","heavenly","baking")
				action("heavenlyTapping","10% more per click - 1 star chip","heavenly","tapping")
				action("heavenlySlot","Keep one boost - 3 star chips","heavenly","slot")
				if state.heavenly.slot then
					text("permanentChoice","Choose a boost to keep. Current: "..(state.permanentUpgrade~="" and (upgradeNames[state.permanentUpgrade] or state.permanentUpgrade) or "none"),60)
					for _,u in Model.Upgrades do if state.upgrades[u.id] then action("keep"..u.id,"Keep "..(upgradeNames[u.id] or u.name),"permanent",u.id) end end
				end

                    elseif adventurePage[1]=="Levels" then
				text("lumpCount","Sugar lumps: "..number(state.lumps).."\nAfter baking 1 million cookies, grow a lump every 20 hours of bakery time.",75)
				for i,b in Model.Buildings do if state.buildings[i]>0 then action("level"..i,b.name.." level "..state.levels[i]..": +1% for "..(state.levels[i]+1).." lumps","level",i) end end

                    elseif adventurePage[1]=="Buddies" then
                    local feeding=state.buddies and state.buildings[2]>=10
                    text("buddyInfo","Wrinklers save 5% of your baking each. Pop one to get its cookies back, plus 10% extra!",72)
                    if state.buildings[2]<10 then text("buddyUnlock","Own 10 grandmas to invite wrinklers.",48)
                    else action("buddyToggle",state.buddies and "Pause feeding" or "Invite wrinklers","buddies") end
                    text("buddyStatus",#(state.wrinklers or {}).." / 10 wrinklers"..(feeding and " ? feeding" or " ? resting"),32)
                    if feeding and #(state.wrinklers or {})<10 then
                        text("nextWrinkler","Next arrival: "..math.ceil(60-(state.wrinklerTime or 0)).."s",28)
                    end
                    for i,wrinkler in state.wrinklers or {} do
                        local id=wrinkler.id
                        pane[#pane+1]=box("wrinklerCard"..id,24,y,w,78,"#342d25",{
                            picture("savedCookies","Cookie",8,20,32,32),
                            label("wrinklerName","Wrinkler "..i,48,6,w-152,26,18,"#fff4df"),
                            label("wrinklerReward",number(wrinkler.bank*1.1).." cookies",48,36,w-152,28,19,"#f5d58f"),
                            button("popWrinkler"..id,"Pop!",w-96,15,84,48,function()send("advanced","popWrinkler",id)end,{background="#516d36"}),
                        });y+=86
                    end
                    if state.buddyBank>0 then action("collectBuddies","Collect all: "..number(state.buddyBank*1.1),"collectBuddies") end

                    elseif adventurePage[1]=="Garden" then
                    local planted=state.gardenReady>0
                    local remaining=math.max(0,state.gardenReady-state.played)
                    local ripe=planted and remaining==0
                    local canPlant=not planted and state.buildings[3]>0 and state.lumps>=1
                    local progress=planted and math.clamp(1-remaining/60,0,1) or 0
                    pane[#pane+1]=box("gardenPlot",24,y,w,178,"#283b28",{
                        picture("gardenPicture","Farm",12,10,88,88,{opacity=planted and "1" or "0.55"}),
                        label("gardenStatus",ripe and "Ready to pick!" or planted and "Growing..." or "Plant your garden",112,10,w-124,34,22,"#fff4df"),
                        label("gardenTimer",planted and (ripe and "+5% baking for 10 min" or math.ceil(remaining).." seconds left") or "1 sugar lump • 1 minute",112,48,w-124,48,18,"#b6e6bf"),
                        box("gardenTrack",12,104,w-24,8,"#43523a",{box("fill",0,0,(w-24)*progress,8,"#a5d987")}),
                        button(ripe and "harvestGarden" or "plantGarden",ripe and "Harvest!" or planted and "Growing..." or canPlant and "Plant • 1 lump" or state.buildings[3]<1 and "Buy a farm first" or "Need 1 sugar lump",12,124,w-24,44,function()
                            if ripe then send("advanced","harvest") elseif canPlant then send("advanced","plant") end
                        end,{background=(ripe or canPlant) and "#477d35" or "#4d5141",["font-size"]="21px"}),
                    },{["border-radius"]="12px"});y+=190
                    local boost=math.max(0,state.gardenBoostUntil-state.played)
                    if boost>0 then text("gardenBoost","+5% baking • "..math.ceil(boost/60).." min left",36)
                    else text("gardenReward","Harvest for +5% baking for 10 minutes.",44) end

                    elseif adventurePage[1]=="Market" then
				text("marketInfo","Ingredient market (need a bank)\nBuy low, sell later. Prices change every 30 seconds. Selling returns 90% of the price.",90)
				for i,name in {"Flour","Sugar","Chocolate"} do
					text("stock"..i,name..": own "..state.stocks[i],30)
					action("stockBuy"..i,"Buy "..name.." - "..Model.stockPrice(state,i).." cookies","stockBuy",i)
					action("stockSell"..i,"Sell "..name.." - "..math.floor(Model.stockPrice(state,i)*.9).." cookies","stockSell",i)
				end

                    elseif adventurePage[1]=="Helpers" then
				text("spiritInfo","Temple helpers (need a temple)\nChoose one helper. Wait 1 minute to change. Current: "..state.spirit,80)
				action("spiritBake","Baking helper: 10% more baking","spirit","baking")
				action("spiritClick","Click helper: 10% more per click","spirit","clicking")
				action("spiritLuck","Lucky helper: 20% more lucky rewards","spirit","luck")

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
                        pane[#pane+1]=box("spellCard"..spell[1],24,y,w,162,"#342d25",{
                            picture("spellPicture",spell[2],12,12,64,64),
                            label("spellName",spell[3],88,12,w-100,32,22,"#fff4df"),
                            label("spellReward",spell[5],88,48,w-100,44,17,"#dbc5ef"),
                            button(spell[6],title,12,104,w-24,46,function()if ready then send("advanced","spell",spell[1]) end end,{background=ready and "#544479" or "#403a43",["font-size"]="20px"}),
                        },{["border-radius"]="10px"});y+=174
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
			center[#center + 1] = e("scroll", { key = "menuPanel"..tab..workPage[1]..adventurePage[1], id = "menuPanel", style = style(0, 160, centerW, math.max(30,h-164), { background = "#241f19", ["overflow-x"]="hidden", ["overflow-y"]="scroll" }) }, table.unpack(pane))
		end
		local store = { stripes("storeStripes", storeW, h, "#24221f", "#2a2723"), label("storeTitle", "Store", 10, 7, boostW - 20, 42, 36, "#fff2dd", titleStyle) }
		local upgrades = {}
		for _, u in Model.Upgrades do
			if not state.upgrades[u.id] and state.buildings[u.building] >= u.required then upgrades[#upgrades + 1] = u end
		end
		store[#store+1] = label("upgradeHeading", "Buy a boost for your bakery!", 10, 51, boostW-20, 25, 20, "#f4d28a")
		local upgradeCards = {}
		for i, u in upgrades do
			local affordable = state.cookies >= u.price
			local kids = {
				label("upgradeName", upgradeNames[u.id] or u.name, 10, 5, boostW-42, 25, 19, "#fff2dd"),
				label("upgradeBenefit", upgradeBenefit(u, state), 10, 32, boostW-42, 42, 15, "#dfd3bf"),
				cookieCurrency("upgradeCurrency",10,78),
				label("upgradePrice", (affordable and "Buy: " or "Need ") .. number(u.price), 40, 76, boostW-72, 29, 21, affordable and "#b3ef96" or "#d9ba8d"),
			}
			upgradeCards[#upgradeCards+1] = button("upgrade_"..u.id,"",0,(i-1)*112,boostW-22,108,function()
				send("upgrade",u.id)
			end,{background=affordable and "#3e5130" or "#393129"},kids,function(inside) setHover(inside and u.id or 0) end)
		end
		if #upgrades == 0 then
			local hasBuildings = false
			for _, count in state.buildings do if count > 0 then hasBuildings = true; break end end
			upgradeCards[1] = label("upgradeEmpty",hasBuildings and "Buy more buildings to find new boosts!" or "First, buy a Cursor below.\nThen come here to make it stronger!",10,8,boostW-42,75,17,"#c3b8a8")
		end
		store[#store+1] = e("scroll",{key="upgradeList",id="upgradeList",style=style(8,80,boostW-8,landscape and math.max(100,h-88) or 112,{overflow="scroll"})},table.unpack(upgradeCards))
		store[#store + 1] = rail("upgradeRail", 0, 200, landscape and 0 or storeW, 9)
		store[#store + 1] = button("buyMode", "Buy", productX+8, landscape and 16 or 219, controlW-4, mobile and 44 or 28, function() setSell(false) end, { background = sell and "#27221c" or "#766446", ["font-size"] = "17px" })
		store[#store + 1] = button("sellMode", "Sell", productX+8+controlW, landscape and 16 or 219, controlW-4, mobile and 44 or 28, function() setSell(true) end, { background = sell and "#766446" or "#27221c", ["font-size"] = "17px" })
		for i, amount in { 1, 10, 100 } do store[#store + 1] = button("bulk" .. amount, tostring(amount), productX+8+(i+1)*controlW, landscape and 16 or 219, controlW-4, mobile and 44 or 28, function() setBulk(amount) end, { background = bulk == amount and "#766446" or "#27221c", ["font-size"] = "17px" }) end
		local products = {}
		for i, b in Model.Buildings do
			local price = Model.price(state, i, bulk, sell)
			local unlockedBuilding = i <= 2 or state.earned >= Model.Buildings[i - 1].price or state.buildings[i] > 0
			local affordable = sell and state.buildings[i] > 0 or not sell and state.cookies >= price
			local cached = productCache[i]
			local signature = table.concat({tostring(price),tostring(unlockedBuilding),tostring(affordable),tostring(state.buildings[i]),tostring(bulk),tostring(sell),tostring(productW),uiFont},"|")
			if cached and cached.signature == signature then
				products[#products+1] = cached.element
				continue
			end
			local kids = {
				unlockedBuilding and buildingPicture("buildingIcon"..i,i,10,4,58,61) or label("buildingIcon"..i,"???",10,4,58,61,23,"#8c8070",{["text-align"]="center"}),
				label("buildingName" .. i, unlockedBuilding and b.name or "???", 77, 7, productW - 139, 31, 25, affordable and "#fff7e6" or "#a59a89"),
				cookieCurrency("buildingCurrency"..i,79,40),
				label("buildingPrice" .. i, number(price), 109, 38, productW-124, 30, 22, affordable and "#91cf74" or "#b07865"),
				label("buildingOwned" .. i, state.buildings[i] > 0 and tostring(state.buildings[i]) or "", productW - 68, 8, 46, 52, 38, "#afa18a", { ["text-align"] = "right" }),
			}
			products[#products + 1] = button("buyBuilding" .. i, "", 0, (i - 1) * 76, productW - 9, 74, function() send("trade", i, bulk, sell) end, { background = "linear-gradient(90deg, #534c40, #2d2923)", border = "1px solid #74634c" }, kids, function(inside) setHover(inside and i or 0) end, "linear-gradient(90deg, #766a54, #463f34)")
			productCache[i] = {signature=signature,element=products[#products]}
		end
		store[#store + 1] = e("scroll", { key = "storeProducts", id = "storeProducts", style = style(productX, landscape and 78 or mobile and 275 or 258, productW, math.max(40,h - (landscape and 78 or mobile and 275 or 258)), { overflow = "scroll" }) }, table.unpack(products))
		local backgroundName=ImageConfig.bakeryBackground(Model.jobLevel(state))
        local bakeryBackground=backgroundName and picture("bakeryBackground",backgroundName,0,0,leftW,h,{["object-fit"]="cover",["z-index"]="0"}) or stripes("blueStripes",leftW,h,"#173346","#1a3b51")
        local children = {
			box("bakeryColumn", 0, 0, leftW, h, nil, {bakeryBackground, e(Rain,{key="rain",w=leftW,h=h,cps=state.cps,reducedMotion=state.reducedMotion}), box("bakeryContent",bakeryOffset,0,landscape and leftW or 420,h,nil,left,{["z-index"]="2"})}, { overflow = "hidden",display=(not mobile or page=="Bake") and "block" or "none" }),
			rail("leftRail", leftW, 0, mobile and 0 or 12, h), box("centerColumn", centerX, 0, centerW, h, nil, center,{display=(not mobile or page=="More") and "block" or "none",overflow="hidden"}),
			rail("rightRail", centerX + centerW, 0, mobile and 0 or 12, h), box("storeColumn", storeX, 0, storeW, h, nil, store,{display=(not mobile or page=="Shop") and "block" or "none"}),
		}
		if mobile then
			local nav={}
			for i,name in {"Bake","Shop","More"} do
				nav[i]=button("nav"..name,name,(i-1)*(displayWidth/3)+4,4,displayWidth/3-8,52,function()setPage(name);setHover(0)end,{background=page==name and "#74603a" or "#30271f",["font-size"]="23px"})
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
		local parts = {tostring(math.floor(Model.jobLevel(snapshot)/5)), snapshot.bakery, snapshot.saveStatus or "", tostring(snapshot.cps), tostring(snapshot.clickPower), tostring(snapshot.soundEnabled), tostring(snapshot.soundVolume), tostring(snapshot.reducedMotion), tostring(snapshot.goldenId), tostring((snapshot.goldenUntil or 0)>snapshot.played), tostring(snapshot.ready), tostring(snapshot.earned < 50), tostring(snapshot.earned < 1000)}
		for i, b in Model.Buildings do
			parts[#parts+1] = tostring(snapshot.buildings[i])
			parts[#parts+1] = tostring(snapshot.earned >= b.price)
			local cached = priceCache[i]
			if not cached or cached.owned ~= snapshot.buildings[i] then
				cached = {owned=snapshot.buildings[i],prices={}}
				for _, bulk in {1,10,100} do cached.prices[#cached.prices+1] = Model.price(snapshot,i,bulk,false) end
				priceCache[i] = cached
			end
			for _, price in cached.prices do parts[#parts+1] = tostring(snapshot.cookies >= price) end
		end
		for _, u in Model.Upgrades do
			parts[#parts+1] = tostring(snapshot.upgrades[u.id] == true)
			parts[#parts+1] = tostring(snapshot.cookies >= u.price)
		end
		for _, a in Model.Achievements do parts[#parts+1] = tostring(snapshot.achievements[a[1]] == true) end
		return table.concat(parts,"|")
	end
	local function update(force)
		revision += 1
		if refreshCounters then refreshCounters(revision) end
		local signature = pageSignature()
		if force or signature ~= lastSignature or currentTab == "Stats" or ((currentTab == "Adventure" or currentTab == "Work") and math.floor(snapshot.played) ~= lastAdventureSecond) then
			lastSignature = signature
			lastAdventureSecond=math.floor(snapshot.played)
			if refresh then refresh(revision) end
		end
	end
	local connection = remote.OnClientEvent:Connect(function(nextState)
		snapshot = nextState
        refreshResources(nextState)
		audio.setEnabled(snapshot.soundEnabled~=false)
		audio.setVolume(snapshot.soundVolume or 100)
		for _,event in snapshot.events or {} do
			if event.id>lastEventId then lastEventId=event.id;notify(event.text,event.kind) end
		end
		update(false)
	end)
	local resize = workspace.CurrentCamera:GetPropertyChangedSignal("ViewportSize"):Connect(function()
		measureViewport()
		viewportScale.Scale=uiScale
		update(true)
	end)
	local safeResize=safeArea:GetPropertyChangedSignal("AbsoluteSize"):Connect(function()
		measureViewport();viewportScale.Scale=uiScale;update(true)
	end)
	measureViewport();viewportScale.Scale=uiScale;update(true)
	script.Destroying:Connect(function() alive=false;connection:Disconnect(); resize:Disconnect();safeResize:Disconnect(); audio.destroy();handle.unmount();backdrop:Destroy() end)
	local input=game:GetService("UserInputService")
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
