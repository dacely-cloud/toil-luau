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
local cookieFill="linear-gradient(125deg, #ecc48a, #ce9b58, #b47935)"
local crumbCache={}
local function cookieArtwork(size)
    if crumbCache[size] then return crumbCache[size] end
    local crumbs={}
    local scale=size/270
    for i=1,80 do
        -- Tiny highlights fall below one pixel in currency icons.
        if size>=100 or i%4==0 then
            local a,r=i*2.39996,math.sqrt(i/80)*118
            local diameter=i%4==0 and 18 or 5
            local color=i%4==0 and "#4e2916" or (i%3==0 and "#f2c27c" or "#b27b38")
            crumbs[#crumbs+1]=box("crumb"..i,(135+math.cos(a)*r-diameter/2)*scale,(135+math.sin(a)*r-diameter/2)*scale,diameter*scale,diameter*scale,color,{}, {["border-radius"]=math.max(1,6*scale).."px",rotation=tostring(i*29)})
        end
    end
    crumbCache[size]=crumbs
    return crumbs
end
local cookieCrumbs=cookieArtwork(270)
local function cookieCurrency(id,x,y)
    return box(id,x,y,24,24,cookieFill,cookieArtwork(24),{["border-radius"]="12px",border="1px solid #8f5c2b",overflow="hidden"})
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
		background=cookieFill, ["border-radius"]="135px",
		border="7px solid #8f5c2b",overflow="hidden",rotation="0",transform="scale(" .. (pressed and "0.94" or hover[1] and "1.04" or "1") .. ")",transition="transform 0.09s ease-out"}),
		onMouseEnter=function() hover[2](true) end,
		onMouseLeave=function() hover[2](false); setPressed(false) end,
		onMouseDown=function() setPressed(true) end,
		onMouseUp=function() setPressed(false) end,
		onClick=function() props.send("click"); props.emit() end},table.unpack(cookieCrumbs))
end
local shineRays = {}
for i=1,12 do
	local a=i*math.pi/6
	shineRays[i]=e("path2d",{key="ray"..i,id="shineRay"..i,color="#39596b",thickness=16,controlPoints={
		Path2DControlPoint.new(UDim2.fromScale(.5+math.cos(a)*110/380,.5+math.sin(a)*110/380)),
		Path2DControlPoint.new(UDim2.fromScale(.5+math.cos(a)*.5,.5+math.sin(a)*.5))}})
end
local function Rain(props)
	local kids={}
	for i=1,12 do
		kids[#kids+1]=box("rainCookie"..i,(i*137)%math.max(1,props.w-26),0,18+(i%3)*4,18+(i%3)*4,"#b78042",{},
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
	-- Reflow panels to the actual viewport; text stays at native pixel sizes.
	local displayWidth, displayHeight, uiScale, mobile, contentHeight, landscape
	local function measureViewport()
		local viewport = workspace.CurrentCamera.ViewportSize
		local layout = Layout.measure(viewport.X,viewport.Y)
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
        local centerW,h=props.width,props.height
        local statusWidth=centerW-24
        local meterWidth=(statusWidth-68)/2
        local resourceStatus={label("workStatus","Lv "..Model.jobLevel(state),0,0,62,20,15,"#f5d58f")}
        for i,resource in {"energy","stamina"} do
            local x=68+(i-1)*meterWidth
            resourceStatus[#resourceStatus+1]=label(resource.."Amount",(resource=="energy" and "Energy " or "Stamina ")..math.floor(state.economy[resource]),x,0,meterWidth-8,19,15,resource=="energy" and "#a6ddeb" or "#dabbed")
            resourceStatus[#resourceStatus+1]=box(resource.."Meter",x,20,meterWidth-8,3,"#393331",{
                box("fill",0,0,(meterWidth-8)*state.economy[resource]/100,3,resource=="energy" and "#6abed5" or "#b18bcc"),
            })
        end
        return box("resourceStatus",12,h-25,statusWidth,23,nil,resourceStatus)
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
			local mouse=game:GetService("UserInputService"):GetMouseLocation()
			local scale=uiScale
			local leftWidth = columnWidths()
			local x,y=mouse.X/scale-(leftWidth-420)/2,mouse.Y/scale-30
			if mobile or x<75 or x>345 then x=landscape and displayWidth*.7 or 210; y=landscape and (contentHeight-50)/2+20 or 138+(contentHeight-178)/2 end
			local elements=table.clone(slots[1])
			local variant=math.floor((n-1)/12)%2==0 and "A" or "B"
			elements[slot*3+1]=label("clickNumber"..slot,"+"..number(snapshot.clickPower,true),x,y-15,130,32,24,"#ffffff",{
				rotation="0",["text-align"]="center",["z-index"]="15",opacity="0",animation="popup"..variant.." 1s ease-out forwards"})
			for j=1,2 do elements[slot*3+1+j]=box("clickCrumb"..slot.."_"..j,x+(j==1 and -12 or 12),y,12,12,j==1 and "#d8a15c" or "#59311c",{},
				{rotation="0",["border-radius"]="5px",["z-index"]="14",opacity="0",animation="crumb"..(j==1 and variant or (variant=="A" and "B" or "A")).." 0.9s linear forwards"}) end
			slots[2](elements)
		end
		return e("div",{id="clickEffects",style=style(0,0,landscape and displayWidth or 420,contentHeight,{["z-index"]="12"})},table.unpack(slots[1]))
	end
	local function Counters()
		local offset=mobile and not landscape and (displayWidth-420)/2 or 0
		local width=mobile and (landscape and displayWidth*.45-20 or displayWidth-20) or 400
		local state = React.useState(0)
		refreshCounters = state[2]
		return e(React.Fragment, nil,
			label("cookieCount", number(snapshot.cookies) .. (math.floor(snapshot.cookies) == 1 and " cookie" or " cookies"), 10-offset, 47, width, 44, 31, "#ffffff", {["text-align"]="center"}),
			label("cps", "per second: " .. number(snapshot.cps, true), 10-offset, 88, width, 28, 18, "#ffffff", {["text-align"]="center"}),
			label("bonusTimer",(snapshot.frenzyUntil or 0)>snapshot.played and ("Double baking! "..math.ceil(snapshot.frenzyUntil-snapshot.played).."s left") or "",10-offset,117,width,24,17,"#f4d28a",{["text-align"]="center"}))
	end
	local function App()
		local renderState = React.useState(0)
		refresh = renderState[2]
		local pageState = React.useState("Bake")
		local page,setPage=pageState[1],pageState[2]
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
        local empireNameDraft=React.useRef("")
        local empireBadge=React.useState("cookie")
        local empireEdit=React.useState(false)
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
		left[#left + 1] = box("bakeryShade", -bakeryOffset, 38, leftW, 100, "rgba(0,0,0,0.35)")
		left[#left + 1] = label("bakeryName", state.bakery, 10-bakeryOffset, 8, mobile and (landscape and leftW*.45-20 or leftW-20) or 400, 32, 25, "#f4e9d9", titleStyle)
		left[#left + 1] = e(Counters, {key="counters"})
		local cookieY = 0
		local cookieScale = math.min(1, math.max(0.25, (h - (landscape and 70 or 190)) / 380))
		local scene = {}
		-- The cookie uses native vector-like geometry until the artwork pass.
		scene[#scene + 1] = box("cookieShine",210,cookieY+135,380,380,nil,shineRays,{rotation="0",animation=not state.reducedMotion and "shine 60s linear infinite" or ""})
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
		center[#center + 1] = box("newsBackdrop", 0, 0, centerW, 92, "linear-gradient(90deg, #423729, #181614)")
		center[#center + 1] = label("news", state.earned < 50 and "You feel like making cookies. But nobody wants to eat your cookies." or (state.earned < 1000 and "Your first batch goes to the neighbors. They have high hopes." or "News : local cookie production continues to rise!"), 100, 8, centerW - 200, 72, 21, "#f1e6d5", titleStyle)
		center[#center + 1] = rail("newsRail", 0, 92, centerW, 10)
		local tabs = { "Options", "Stats", "Adventure", "Work" }
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
					for k = 1, math.min(state.buildings[i], 14) do children[#children + 1] = box("sprite" .. i .. "_" .. k,16+(k-1)*41,62,38,48,nil,icon(i,b.color)) end
					children[#children + 1] = rail("rowRail" .. i, 0, 117, centerW - 12, 7)
					rows[#rows + 1] = box("buildingScene" .. i, 0, row * 124, centerW - 12, 124, row % 2 == 0 and "#37352d" or "#302d27", children)
					row += 1
				end
			end
			if row == 0 then
				rows[#rows + 1] = label("emptyHint", "Your cookie empire starts with a click.", 25, 62, centerW - 50, 35, 22, "#968675", titleStyle)
				rows[#rows + 1] = label("emptySub", "Buy buildings in the store to start baking automatically.", 35, 103, centerW - 70, 48, 16, "#7d7165", titleStyle)
			end
			center[#center + 1] = e("scroll", { key = "buildingScenes", id = "buildingScenes", style = style(0, 160, centerW, h - 190, { overflow = "scroll" }) }, table.unpack(rows))
		else
			local pane = tab=="Work" and {} or { label("panelTitle", tab, 24, 12, centerW-48, 40, 32, "#fff0d8") }
			if tab == "Stats" then
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
				pane[#pane+1] = button("motionToggle",state.reducedMotion and "Movement: less" or "Movement: full",24,310,220,48,function()send("motion",not snapshot.reducedMotion)end)
				pane[#pane+1] = label("renameLabel","Name your bakery",24,375,centerW-48,30,21)
				pane[#pane+1] = e("input",{key="bakeryInput",id="bakeryInput",style=style(24,415,centerW-48,48,{background="#eee5d2",color="#211d19",["font-size"]="20px"}),onChange=function(event)nameDraft.current=event.value end})
				pane[#pane+1] = button("renameBakery","Use this name",24,478,220,48,function()send("rename",nameDraft.current)end)
            elseif tab == "Work" then
                local economy=state.economy
                local y,w=8,centerW-48
                local function text(id,value,height)
                    pane[#pane+1]=label(id,value,24,y,w,height or 64,18,"#eee5dc");y+=(height or 64)+8
                end
                local function action(id,title,kind,arg)
                    pane[#pane+1]=button(id,title,24,y,w,48,function()send("economy",kind,arg)end,{["font-size"]="18px"});y+=56
                end
                local sections={"Jobs","Properties","Shop","Bag","Collection","Jar","Charity","Empire"}
                local shortcuts={}
                for i,name in sections do
                    shortcuts[#shortcuts+1]=button("work"..name,name,(i-1)*98,0,94,44,function()workPage[2](name)end,{background=workPage[1]==name and "#74603a" or "#30271f",["font-size"]="16px"})
                end
                center[#center+1]=e("scroll",{key="workShortcuts",id="workShortcuts",style=style(8,158,centerW-16,50,{overflow="scroll",["overflow-x"]="scroll",["overflow-y"]="hidden"})},table.unpack(shortcuts))
                if workPage[1]=="Jobs" then
                    for _,job in Model.Jobs do
                        local locked=Model.jobLevel(state)<job.level
                        local ready=not locked and economy.energy>=job.energy
                        local reward=math.floor(job.cookies*Model.collectionBonus(state)*(1+Model.empireBonus(state))^2)
                        local card={
                            box("jobPicture",12,14,52,52,"#d4a35f",{
                                box("tray",5,18,42,28,"#706d75",{cookieCurrency("trayCookie",9,1)},{["border-radius"]="5px"}),
                            },{["border-radius"]="12px"}),
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
                            box("propertyArt",12,18,56,56,"#cf974e",{
                                box("roof",0,0,56,15,"#e97760"),box("door",22,28,14,28,"#624736"),
                                box("window",6,23,12,12,"#b4dfed"),
                            },{["border-radius"]="5px"}),
                            label("propertyName",property.name,80,10,w-92,28,22,"#fff4df"),
                            label("propertyCount","Own "..(economy.properties[property.id] or 0).."  |  +"..number(property.income*Model.collectionBonus(state)*(1+Model.empireBonus(state))^2,true).." / sec each",80,44,w-92,40,18,"#b6e6bf"),
                            button("buyProperty"..property.id,"Buy: "..number(Model.propertyPrice(state,property.id)),12,94,w-24,48,function()send("economy","property",property.id)end,{background="#276849",["font-size"]="21px"}),
                        }
                        pane[#pane+1]=box("propertyCard"..property.id,24,y,w,154,"#342d25",card,{border="1px solid #827052",["border-radius"]="12px"});y+=166
                    end
                elseif workPage[1]=="Shop" or workPage[1]=="Bag" or workPage[1]=="Collection" then
                    text("collectionHelp","Collection boost: +"..math.floor((Model.collectionBonus(state)-1)*100+.5).."% cookies",38)
                    local rarityColors={Common="#b4c4d0",Uncommon="#89cf9e",Rare="#93b5ff",Legendary="#f5cd70"}
                    for _,item in Model.Items do
                        local owned=economy.inventory[item.id] or 0
                        local displayed=economy.collection[item.id]
                        local art={}
                        if item.id=="spatula" then
                            art={box("handle",27,27,7,33,"#b97843"),box("blade",17,5,27,28,"#c2d9e0",{},{["border-radius"]="5px"})}
                        elseif item.id=="apron" then
                            art={box("neck",23,4,20,17,nil,{}, {border="4px solid #e98181",["border-radius"]="8px"}),box("cloth",12,18,43,42,"#e98181",{box("pocket",12,18,20,15,"#f5cbb6")},{["border-radius"]="8px"})}
                        elseif item.id=="mixer" then
                            art={box("stand",42,15,10,43,"#a0b8d4"),box("top",10,6,44,17,"#a0b8d4",{}, {["border-radius"]="8px"}),box("whisk",24,21,4,23,"#e3e4e8"),box("bowl",10,39,35,22,"#d2d7e2",{}, {["border-radius"]="10px"})}
                        else
                            art={box("band",8,33,48,22,"#edbf4f"),box("point1",8,13,12,27,"#edbf4f"),box("point2",26,6,12,34,"#edbf4f"),box("point3",44,13,12,27,"#edbf4f"),box("gem",28,37,10,11,"#ef826b")}
                        end
                        local card={box("itemArt",8,8,66,66,nil,art),
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
                        pane[#pane+1]=button(id,title,24,y,w,48,function()send("empire",kind,arg,extra)end,{["font-size"]="20px",background="#544479"});y+=56
                    end
                    local function badgeArt(id,badge,x,py)
                        local art={}
                        if badge=="cookie" then art={box("cookie",8,8,48,48,cookieFill,cookieArtwork(48),{["border-radius"]="24px",border="2px solid #8f5c2b"})}
                        elseif badge=="heart" then art={box("bottom",18,24,30,30,"#ee7896",{}, {rotation="45"}),box("left",9,12,30,30,"#ee7896",{}, {["border-radius"]="15px"}),box("right",29,12,30,30,"#ee7896",{}, {["border-radius"]="15px"})}
                        elseif badge=="crown" then art={box("band",10,32,44,23,"#e9bd54"),box("left",10,14,10,25,"#e9bd54"),box("middle",27,7,10,32,"#e9bd54"),box("right",44,14,10,25,"#e9bd54")}
                        elseif badge=="star" then art={box("star",15,15,34,34,"#e9bd54",{}, {rotation="45"}),box("spark",25,4,14,56,"#e9bd54"),box("spark2",4,25,56,14,"#e9bd54")}
                        elseif badge=="shield" then art={box("shield",13,8,38,48,"#79b8df",{box("stripe",16,5,6,35,"#d9edf7")},{["border-radius"]="18px"})}
                        else art={box("house",10,22,44,36,"#dfa961",{box("door",18,14,12,22,"#674831")}),box("roof",7,10,50,15,"#dd7266")} end
                        return box(id,x,py,64,64,"#30283e",art,{["border-radius"]="12px"})
                    end
                    if empire then
                        pane[#pane+1]=badgeArt("myEmpireBadge",empire.badge,24,y)
                        pane[#pane+1]=label("empireName",empire.name,100,y,w-76,32,24,"#fff0d8")
                        pane[#pane+1]=label("empireLevel","Level "..empire.level.."  |  "..empire.members.." friends",100,y+36,w-76,28,18,"#dbc5ef");y+=80
                        text("empirePerks","+"..empire.level.."% cookies  |  +"..empire.level.."% job & property rewards\n+"..empire.level.."% stealing  |  "..math.min(75,empire.level).."% insurance",74)
                        local needed=empire.level*100
                        text("empirePoints",empire.points.." / "..needed.." team points",30)
                        pane[#pane+1]=box("empireProgress",24,y,w,12,"#30283e",{box("fill",0,0,w*math.min(1,empire.points/needed),12,"#b18bdd")},{["border-radius"]="6px"});y+=26
                        text("donationHelp",state.empirePending and "Saving your donation..." or "Give stamina to help your team grow",36)
                        for i,amount in {10,25,50} do
                            pane[#pane+1]=button("donateEmpire"..amount,"Give "..amount,24+(i-1)*w/3,y,w/3-4,48,function()send("empire","donate",amount)end,{background="#544479",["font-size"]="19px"})
                        end;y+=62
                        if empire.id==state.playerId then
                            empireButton("upgradeEmpire","Level up - "..needed.." points","upgrade",empire.level)
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
                        pane[#pane+1]=button("saveEmpire",empire and "Save look" or "Create empire",24,y,w,48,function()send("empire",empire and "rename" or "create",empireNameDraft.current,empireBadge[1])end,{background="#276849"});y+=64
                    end
                    if not empire then
                        text("joinEmpireHeading","Join a friend's team",36)
                        local seen={};local found=false
                        for _,other in state.socialPlayers or {} do
                            if other.empireId and other.empireName and not seen[other.empireId] then
                                seen[other.empireId]=true;found=true
                                text("joinName"..other.empireId,other.empireName,36)
                                empireButton("joinEmpire"..other.empireId,"Join team","join",other.empireId)
                            end
                        end
                        if not found then text("noEmpires","No teams here yet. Create one together!",50) end
                    end
                elseif workPage[1]=="Charity" then
                    local function socialButton(id,title,kind,arg,target)
                        pane[#pane+1]=button(id,title,24,y,w,48,function()send(kind,arg,target)end,{["font-size"]="18px"});y+=56
                    end
                    text("charityHelp",state.charityPending and "Saving your fundraiser action..." or "Start a cookie party! Invite friends to help.",48)
                    local charity=economy.charity
                    if charity then
                        local remaining=math.max(0,charity.endsAt-(state.serverNow or 0))
                        text("ownCharity","Your fundraiser: "..number(charity.pot).." cookies\n"..(remaining>0 and math.ceil(remaining/60).." minutes left" or "Ready to collect!"),70)
                        socialButton("claimCharity","Collect fundraiser","fundraiser","claim")
                    else
                        text("charityJar","Available in jar: "..number(economy.jar).." cookies",40)
                        for i,tier in Model.Fundraisers do
                            text("charityTier"..i,tier.name..": invest "..number(tier.cost)..", collect "..number(math.floor(tier.cost*tier.multiplier)).." cookies before help or stealing.",70)
                            socialButton("startCharity"..i,"Start "..tier.name.." fundraiser","fundraiser","start",i)
                        end
                    end
                    text("charityPlayers","Friends? cookie parties",40)
                    local found=false
                    for _,other in state.socialPlayers or {} do
                        if other.id~=state.playerId and other.endsAt>(state.serverNow or 0) then
                            found=true
                            text("charityPlayer"..other.id,other.name.."\n"..number(other.pot).." cookies | "..math.ceil((other.endsAt-state.serverNow)/60).." minutes left",65)
                            socialButton("helpCharity"..other.id,"Help: +50 cookies, +20 XP | 5 stamina","charity","help",other.id)
                            socialButton("stealCharity"..other.id,"Steal - 10 stamina","charity","steal",other.id)
                        end
                    end
                    if not found then text("noCharities","No parties yet. Invite a friend!",48) end
                else
                    text("jarInfo","Cookie jar: "..number(economy.jar).." cookies\nMove cookies into your jar or take them back out.",80)
                    for _,amount in {100,1000,10000} do
                        action("deposit"..amount,"Deposit "..number(amount).." cookies","deposit",amount)
                        action("withdraw"..amount,"Withdraw "..number(amount).." cookies","withdraw",amount)
                    end
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
				text("journeyIntro","Bakery adventures\nThese are simple games for growing your bakery.",64)
				text("prestigeInfo","Fresh start: "..number(state.prestige).." baking stars.\nYou can earn "..number(Model.ascensionGain(state)).." star chips now. Each star adds 1% baking.",85)
				text("freshWarning","A fresh start resets cookies, buildings and normal boosts. Keep your stars, sugar lumps, building levels and achievements.",90)
				pane[#pane+1]=button("ascendBakery",confirmFresh[1] and "Confirm: start a new bakery" or "Start a new bakery",24,y,w,48,function()
					if confirmFresh[1] then send("advanced","ascend");confirmFresh[2](false) else confirmFresh[2](true) end
				end);y+=56
				if confirmFresh[1] then pane[#pane+1]=button("cancelAscend","Keep my bakery",24,y,w,48,function()confirmFresh[2](false)end);y+=56 end
				text("chipCount","Star chips: "..number(state.chips),32)
				action("heavenlyBaking","10% more baking - 1 star chip","heavenly","baking")
				action("heavenlyTapping","10% more per click - 1 star chip","heavenly","tapping")
				action("heavenlySlot","Keep one boost - 3 star chips","heavenly","slot")
				if state.heavenly.slot then
					text("permanentChoice","Choose a boost to keep. Current: "..(state.permanentUpgrade~="" and (upgradeNames[state.permanentUpgrade] or state.permanentUpgrade) or "none"),60)
					for _,u in Model.Upgrades do if state.upgrades[u.id] then action("keep"..u.id,"Keep "..(upgradeNames[u.id] or u.name),"permanent",u.id) end end
				end
				text("lumpCount","Sugar lumps: "..number(state.lumps).."\nAfter baking 1 million cookies, grow a lump every 20 hours of bakery time.",75)
				for i,b in Model.Buildings do if state.buildings[i]>0 then action("level"..i,b.name.." level "..state.levels[i]..": +1% for "..(state.levels[i]+1).." lumps","level",i) end end
				text("buddyInfo","Cookie buddies (need 10 grandmas)\nThey hold 5% of your baking and return 10% extra. Saved: "..number(state.buddyBank).." cookies.",90)
				action("buddyToggle",state.buddies and "Let buddies rest" or "Invite cookie buddies","buddies")
				action("collectBuddies","Collect buddy cookies","collectBuddies")
				text("gardenInfo","Garden (need a farm)\nPlant for 1 lump. Harvest in 1 minute for 5% extra baking for 10 minutes.",85)
				if state.gardenReady>state.played then text("gardenTimer","Growing: "..math.ceil(state.gardenReady-state.played).." seconds left.",32) end
				action("plantGarden","Plant seeds - 1 sugar lump","plant")
				action("harvestGarden","Harvest garden","harvest")
				text("marketInfo","Ingredient market (need a bank)\nBuy low, sell later. Prices change every 30 seconds. Selling returns 90% of the price.",90)
				for i,name in {"Flour","Sugar","Chocolate"} do
					text("stock"..i,name..": own "..state.stocks[i],30)
					action("stockBuy"..i,"Buy "..name.." - "..Model.stockPrice(state,i).." cookies","stockBuy",i)
					action("stockSell"..i,"Sell "..name.." - "..math.floor(Model.stockPrice(state,i)*.9).." cookies","stockSell",i)
				end
				text("spiritInfo","Temple helpers (need a temple)\nChoose one helper. Wait 1 minute to change. Current: "..state.spirit,80)
				action("spiritBake","Baking helper: 10% more baking","spirit","baking")
				action("spiritClick","Click helper: 10% more per click","spirit","clicking")
				action("spiritLuck","Lucky helper: 20% more lucky rewards","spirit","luck")
				text("spellInfo","Spell book (need a wizard tower)\nMagic: "..math.floor(state.magic).." / 100. Gain 1 magic each second.",75)
				action("spellLucky","Make a lucky cookie - 40 magic","spell","lucky")
				action("spellCookies","Bake a minute of cookies - 60 magic","spell","cookies")
				text("seasonInfo","Seasonal cookie hunt\nCurrent: "..state.season..". Found: "..state.seasonCookies..". Every 5 lucky cookies earns an extra reward.",85)
				action("winterSeason","Start winter cookie hunt","season","winter")
				action("springSeason","Start spring cookie hunt","season","spring")
				action("normalSeason","End seasonal hunt","season","none")
			end
			center[#center + 1] = e("scroll", { key = "menuPanel", id = "menuPanel", style = style(0, tab=="Work" and 214 or 160, centerW, math.max(30,h-(tab=="Work" and 244 or 190)), { background = "#241f19", overflow = "scroll" }) }, table.unpack(pane))
		end
        center[#center+1]=e(ResourceStatus,{key="resourceStatus",width=centerW,height=h})
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
				label("buildingIcon"..i,unlockedBuilding and b.icon or "?",10,4,58,61,43,unlockedBuilding and b.color or "#5a5147",titleStyle),
				label("buildingName" .. i, unlockedBuilding and b.name or "???", 77, 7, productW - 139, 31, 25, affordable and "#fff7e6" or "#a59a89"),
				cookieCurrency("buildingCurrency"..i,79,40),
				label("buildingPrice" .. i, number(price), 109, 38, productW-124, 30, 22, affordable and "#91cf74" or "#b07865"),
				label("buildingOwned" .. i, state.buildings[i] > 0 and tostring(state.buildings[i]) or "", productW - 68, 8, 46, 52, 38, "#afa18a", { ["text-align"] = "right" }),
			}
			products[#products + 1] = button("buyBuilding" .. i, "", 0, (i - 1) * 76, productW - 9, 74, function() send("trade", i, bulk, sell) end, { background = "linear-gradient(90deg, #534c40, #2d2923)", border = "1px solid #74634c" }, kids, function(inside) setHover(inside and i or 0) end, "linear-gradient(90deg, #766a54, #463f34)")
			productCache[i] = {signature=signature,element=products[#products]}
		end
		store[#store + 1] = e("scroll", { key = "storeProducts", id = "storeProducts", style = style(productX, landscape and 78 or mobile and 275 or 258, productW, math.max(40,h - (landscape and 78 or mobile and 275 or 258)), { overflow = "scroll" }) }, table.unpack(products))
		local children = {
			box("topBar", 0, 0, displayWidth, 30, "#111111", { label("brand", "Cookie Clicker", 12, 1, 180, 27, 18, "#e2d1b6"), label("edition", mobile and "v1" or "Roblox edition", displayWidth - 205, 2, 190, 25, 14, "#a89e90", { ["text-align"] = "right" }) }),
			box("bakeryColumn", 0, 30, leftW, h, nil, {stripes("blueStripes",leftW,h,"#173346","#1a3b51"), e(Rain,{key="rain",w=leftW,h=h,cps=state.cps,reducedMotion=state.reducedMotion}), box("bakeryContent",bakeryOffset,0,landscape and leftW or 420,h,nil,left)}, { overflow = "hidden",display=(not mobile or page=="Bake") and "block" or "none" }),
			rail("leftRail", leftW, 30, mobile and 0 or 12, h), box("centerColumn", centerX, 30, centerW, h, nil, center,{display=(not mobile or page=="More") and "block" or "none",overflow="hidden"}),
			rail("rightRail", centerX + centerW, 30, mobile and 0 or 12, h), box("storeColumn", storeX, 30, storeW, h, nil, store,{display=(not mobile or page=="Shop") and "block" or "none"}),
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
            },{box("goldenArtwork",inset,inset,artworkSize,artworkSize,"linear-gradient(125deg, #fff3a6, #f4ca45, #d69717)",cookieArtwork(artworkSize),{border="2px solid #ffed87",["border-radius"]=artworkSize/2 .."px",overflow="hidden"})})
            children[#children+1]=e("div",{key="goldenDrop"..state.goldenId,id="goldenDrop",style=style(0,30,leftW,h-milkHeight,{overflow="hidden",["z-index"]="70",display=(not mobile or page=="Bake") and "block" or "none"})},falling)
        end
		children[#children+1]=e(Feedback,{key="feedback"})
		if not state.ready then
			children[#children+1]=box("loadingBakery",0,30,displayWidth,displayHeight-30,"#211d19",{
				label("loadingMessage",state.saveStatus or "Opening your bakery...",20,60,displayWidth-40,120,24,"#fff2dd",titleStyle)
			},{["z-index"]="90"})
		end

		children[#children + 1] = e(Tooltip, {key="tooltip",state=state,bulk=bulk,sell=sell})
		return e("div", { id = "cookieClicker", style = style(0, 0, displayWidth, displayHeight, { background = "#171510" }) }, table.unpack(children))
	end
	local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
	local old = playerGui:FindFirstChild("CookieClickerGui")
	if old then old:Destroy() end
	local handle = toil.mountReactRoot(playerGui, animationRules, e(App), nil, nil)
	handle.gui.Name = "CookieClickerGui"
	handle.gui.IgnoreGuiInset = true
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
		local parts = {snapshot.bakery, snapshot.saveStatus or "", tostring(snapshot.cps), tostring(snapshot.clickPower), tostring(snapshot.soundEnabled), tostring(snapshot.reducedMotion), tostring(snapshot.goldenId), tostring((snapshot.goldenUntil or 0)>snapshot.played), tostring(snapshot.ready), tostring(snapshot.earned < 50), tostring(snapshot.earned < 1000)}
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
	script.Destroying:Connect(function() alive=false;connection:Disconnect(); resize:Disconnect(); audio.destroy();handle.unmount() end)
	local input=game:GetService("UserInputService")
	local actions=game:GetService("ContextActionService")
	actions:BindAction("CookieClickerBake",function(_,state)
		if input:GetFocusedTextBox() then return Enum.ContextActionResult.Pass end
		if state==Enum.UserInputState.Begin then send("click");emitClick() end
		return Enum.ContextActionResult.Sink
	end,false,Enum.KeyCode.ButtonR2)
	local selection=input.LastInputTypeChanged:Connect(function(kind)
		if kind.Name:find("Gamepad",1,true) then
			local guiService=game:GetService("GuiService")
			if not guiService.SelectedObject then guiService.SelectedObject=handle.gui:FindFirstChild("bigCookie",true) end
		end
	end)
	script.Destroying:Connect(function()selection:Disconnect();actions:UnbindAction("CookieClickerBake")end)
	send("sync")
	print("[CookieClicker] Mounted with toil-luau React")
	return handle
end
