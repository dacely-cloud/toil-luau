-- All visible UI is rendered by toil-luau's React reconciler and CSS host.
local Players = game:GetService("Players")
local RS = game:GetService("ReplicatedStorage")
local TS = require(RS:WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local toil = TS.import(script, RS, "TS")
local React = toil.React
local e = React.createElement
local Model = require(script.Parent.Model)
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
	local s = style(x, y, w, h, { ["font-size"] = (size or 16) .. "px", color = color or "#eee5dc", ["font-family"] = "Georgia", ["text-align"] = "left" })
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
	local s = style(x, y, w, h, { color = "#eee5dc", ["font-family"] = "Georgia", ["font-size"] = "19px", background = "linear-gradient(90deg, #554638, #30271f)", border = "1px solid #89745c", ["text-align"] = "center" })
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
local cookieCrumbs = {}
for i = 1, 80 do
	local a, r = i * 2.39996, math.sqrt(i / 80) * 118
	local diameter = i % 4 == 0 and 18 or 5
	local color = i % 4 == 0 and "#4e2916" or (i % 3 == 0 and "#f2c27c" or "#b27b38")
	cookieCrumbs[#cookieCrumbs + 1] = box("crumb" .. i, 135 + math.cos(a) * r - diameter / 2, 135 + math.sin(a) * r - diameter / 2, diameter, diameter, color, {}, { ["border-radius"] = "6px", rotation = tostring(i * 29) })
end
local animationRules = toil.cssToRules([[
@keyframes shine { from { rotation: 0; } to { rotation: 360; } }
@keyframes orbit { from { rotation: 0; } to { rotation: -360; } }
@keyframes cursorTap { 0% { transform: translate(0px,0px); } 90% { transform: translate(0px,0px); } 95% { transform: translate(0px,5px); } 100% { transform: translate(0px,0px); } }
@keyframes milkFlow { from { transform: translate(0px,0px); } to { transform: translate(80px,0px); } }
@keyframes popupA { from { transform: translate(0px,0px); opacity: 1; } to { transform: translate(0px,-90px); opacity: 0; } }
@keyframes popupB { from { transform: translate(0px,0px); opacity: 1; } to { transform: translate(0px,-90px); opacity: 0; } }
@keyframes crumbA { 0% { transform: translate(0px,0px); opacity: 1; rotation: 0; } 25% { transform: translate(12px,-24px); opacity: 1; rotation: 45; } 100% { transform: translate(48px,180px); opacity: 0; rotation: 240; } }
@keyframes crumbB { 0% { transform: translate(0px,0px); opacity: 1; rotation: 0; } 25% { transform: translate(-12px,-24px); opacity: 1; rotation: -45; } 100% { transform: translate(-48px,180px); opacity: 0; rotation: -240; } }
@keyframes rain { 0% { transform: translate(0px,-120px); opacity: 0; } 10% { transform: translate(0px,2px); opacity: 0.55; } 85% { transform: translate(0px,917px); opacity: 0.55; } 100% { transform: translate(0px,1100px); opacity: 0; } }
]])
local function Cookie(props)
	local state = React.useState(false)
	local hover = React.useState(false)
	local pressed, setPressed = state[1], state[2]
	return e("button", {id="bigCookie",style=style(210,props.y+135,270,270,{
		background="linear-gradient(125deg, #ecc48a, #ce9b58, #b47935)", ["border-radius"]="135px",
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
	shineRays[i]=e("path2d",{key="ray"..i,color="#39596b",thickness=16,controlPoints={
		Path2DControlPoint.new(UDim2.fromOffset(190+math.cos(a)*110,190+math.sin(a)*110)),
		Path2DControlPoint.new(UDim2.fromOffset(190+math.cos(a)*190,190+math.sin(a)*190))}})
end
local function Ambient(props)
	local kids={box("cookieShine",210,props.y+135,380,380,nil,shineRays,{rotation="0",animation="shine 60s linear infinite"})}
	for i=1,12 do
		kids[#kids+1]=box("rainCookie"..i,(i*137)%420,0,18+(i%3)*4,18+(i%3)*4,"#b78042",{},
			{["border-radius"]="12px",opacity="0",animation=props.cps>0 and ("rain "..(5+i%4).."s linear -"..(i*.43).."s infinite") or ""})
	end
	return e("div",{id="ambient",style=style(0,0,420,props.h,{overflow="hidden"})},table.unpack(kids))
end
local function Cursors(props)
	local kids={}
	for i=1,math.min(props.count,50) do
		local angle=(i-1)/50*math.pi*2
		kids[i]=label("cursor"..i,"\u{261D}",180+math.cos(angle)*172,180+math.sin(angle)*172,30,34,28,"#ffffff",
			{rotation=tostring(math.deg(angle)+90),animation="cursorTap 3s linear -"..(i*.06).."s infinite"})
	end
	return box("cursorOrbit",210,props.y+135,360,360,nil,kids,{rotation="0",animation="orbit 120s linear infinite"})
end
return function()
	local remote = script.Parent:WaitForChild("Action")
	local snapshot = Model.snapshot(Model.new())
	snapshot.saveStatus = "Connecting…"
	local refresh
	local refreshCounters
	local currentTab = "Buildings"
	-- Fit controls to both viewport dimensions; share extra width across
	-- all three columns without enlarging the cookie.
	local displayWidth, displayHeight, uiScale
	local function measureViewport()
		local viewport = workspace.CurrentCamera.ViewportSize
		uiScale = math.min(1, math.max(1, viewport.X) / 1440, math.max(1, viewport.Y) / 800)
		displayWidth = math.max(1, viewport.X) / uiScale
		displayHeight = math.max(1, viewport.Y) / uiScale
	end
	measureViewport()
	local function columnWidths()
		local available = displayWidth - 24
		return available * 420 / 1416, available * 646 / 1416, available * 350 / 1416
	end
	local function send(...) remote:FireServer(...) end
	local tooltipHover = 0
	local updateTooltip
	local function setHover(value)
		if tooltipHover == value then return end
		tooltipHover = value
		if updateTooltip then updateTooltip(value) end
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
				if u then name, description, cost = u.name, u.description, u.price end
			end
		end
		return box("tooltip", select(1, columnWidths()) + select(2, columnWidths()) - 410, 233, 410, 175, "#1d1914", {
				label("tooltipTitle", name, 16, 10, 378, 42, 25, "#f8ead2"), label("tooltipCost", "● " .. number(cost), 16, 54, 378, 26, 19, state.cookies >= cost and "#9cda78" or "#d68f78"), label("tooltipDescription", description, 16, 92, 378, 68, 17, "#c3b8a8"),
			}, { border = "3px solid #9c8159", ["z-index"] = "40", display = hover == 0 and "none" or "block" })
	end
	local emitClick = function() end
	local function ClickEffects()
		local slots=React.useState({})
		local serial=React.useRef(0)
		emitClick=function()
			serial.current+=1
			local n=serial.current
			local slot=(n-1)%12
			local mouse=game:GetService("UserInputService"):GetMouseLocation()
			local scale=uiScale
			local leftWidth = columnWidths()
			local x,y=mouse.X/scale-(leftWidth-420)/2,mouse.Y/scale-30
			if x<75 or x>345 then x=210; y=math.floor((displayHeight-30)*.32)+135 end
			local elements=table.clone(slots[1])
			local variant=math.floor((n-1)/12)%2==0 and "A" or "B"
			elements[slot*3+1]=label("clickNumber"..slot,"+"..number(snapshot.clickPower,true),x,y-15,130,32,24,"#ffffff",{
				rotation="0",["text-align"]="center",["z-index"]="15",opacity="0",animation="popup"..variant.." 1s ease-out forwards"})
			for j=1,2 do elements[slot*3+1+j]=box("clickCrumb"..slot.."_"..j,x+(j==1 and -12 or 12),y,12,12,j==1 and "#d8a15c" or "#59311c",{},
				{rotation="0",["border-radius"]="5px",["z-index"]="14",opacity="0",animation="crumb"..(j==1 and variant or (variant=="A" and "B" or "A")).." 0.9s linear forwards"}) end
			slots[2](elements)
		end
		return e("div",{id="clickEffects",style=style(0,0,420,displayHeight-30,{["z-index"]="12"})},table.unpack(slots[1]))
	end
	local function Counters()
		local state = React.useState(0)
		refreshCounters = state[2]
		return e(React.Fragment, nil,
			label("cookieCount", number(snapshot.cookies) .. (math.floor(snapshot.cookies) == 1 and " cookie" or " cookies"), 5, 47, 410, 44, 31, "#ffffff", {["text-align"]="center"}),
			label("cps", "per second: " .. number(snapshot.cps, true), 10, 88, 400, 28, 18, "#ffffff", {["text-align"]="center"}))
	end
	local function App()
		local renderState = React.useState(0)
		refresh = renderState[2]
		local tabState = React.useState("Buildings")
		local tab, setTab = tabState[1], tabState[2]
		currentTab = tab
		local bulkState = React.useState(1)
		local bulk, setBulk = bulkState[1], bulkState[2]
		local sellState = React.useState(false)
		local sell, setSell = sellState[1], sellState[2]
		local state = snapshot
		local productCache = React.useRef({}).current
		local h = displayHeight - 30
		local leftW, centerW, storeW = columnWidths()
		local centerX, storeX = leftW + 12, displayWidth - storeW
		local wave = React.useRef({}).current
		if wave.width ~= leftW then
			wave.width, wave.points = leftW, {}
			for i=0,math.min(99,math.ceil((leftW+160)/40)) do
				wave.points[#wave.points+1] = Path2DControlPoint.new(UDim2.fromOffset(i*40,i%2==0 and 2 or 6),UDim2.fromOffset(-13,0),UDim2.fromOffset(13,0))
			end
		end
		local titleStyle = { ["text-align"] = "center" }
		local left = {}
		left[#left + 1] = box("bakeryShade", -(leftW-420)/2, 38, leftW, 100, "rgba(0,0,0,0.35)")
		left[#left + 1] = label("bakeryName", state.bakery, 10, 8, 400, 32, 25, "#f4e9d9", titleStyle)
		left[#left + 1] = e(Counters, {key="counters"})
		local cookieY = math.floor(h * 0.32)
		-- The cookie uses native vector-like geometry until the artwork pass.
		left[#left + 1] = e(Ambient,{key="ambient",y=cookieY,h=h,cps=state.cps})
		left[#left + 1] = box("cookieHalo", 55, cookieY - 20, 310, 310, "rgba(180,224,255,0.08)", {}, { ["border-radius"] = "155px" })
		left[#left + 1] = box("cookieHaloInner", 67, cookieY - 8, 286, 286, "rgba(165,218,255,0.09)", {}, { ["border-radius"] = "143px" })
		left[#left + 1] = e(Cookie, { key = "cookie", y = cookieY, send = send, emit=function() emitClick() end })
		left[#left + 1] = e(Cursors,{key="cursors",count=state.buildings[1],y=cookieY})
		left[#left + 1] = e(ClickEffects,{key="effects"})
		local unlocked = 0
		for _ in state.achievements do unlocked += 1 end
		local milkHeight = math.min(h * 0.35, 26 + unlocked * 12)
		left[#left + 1] = box("milk", -(leftW-420)/2, h - milkHeight, leftW, milkHeight, "linear-gradient(90deg, #e8e7dd, #a8bfca)")
		left[#left + 1] = box("milkWave",-(leftW-420)/2-80,h-milkHeight,leftW+160,12,nil,{
			e("path2d",{key="milkFoam",id="milkFoam",color="#faf5e8",thickness=8,controlPoints=wave.points})
		},{animation="milkFlow 4s linear infinite",transition="top 0.8s ease-out"})
		left[#left + 1] = label("version", "v. 2.058", 12, h - 28, 120, 20, 14, "#516572")
		local center = { stripes("brownStripes", centerW, h, "#211d19", "#28231e") }
		center[#center + 1] = box("newsBackdrop", 0, 0, centerW, 92, "linear-gradient(90deg, #423729, #181614)")
		center[#center + 1] = label("news", state.earned < 50 and "You feel like making cookies. But nobody wants to eat your cookies." or (state.earned < 1000 and "Your first batch goes to the neighbors. They have high hopes." or "News : local cookie production continues to rise!"), 100, 8, centerW - 200, 72, 21, "#f1e6d5", titleStyle)
		center[#center + 1] = rail("newsRail", 0, 92, centerW, 10)
		local tabs = { "Options", "Stats", "Info", "Legacy" }
		for i, name in tabs do
			center[#center + 1] = button("tab" .. name, name, 8 + (i - 1) * ((centerW - 14) / 4), 110, (centerW - 14) / 4 - 4, 31, function() setTab(tab == name and "Buildings" or name) end, { background = tab == name and "#726047" or "#322a22", ["font-size"] = "18px" })
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
					for k = 1, math.min(state.buildings[i], 14) do children[#children + 1] = label("sprite" .. i .. "_" .. k, b.icon, 16 + (k - 1) * 41, 62, 38, 48, 37, b.color, titleStyle) end
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
			local pane = { label("panelTitle", tab, 24, 12, 560, 40, 32, "#fff0d8") }
			if tab == "Stats" then
				local stats = {
					{ "Cookies in bank", number(state.cookies) }, { "Cookies baked (all time)", number(state.earned) },
					{ "Cookies per second", number(state.cps, true) }, { "Cookies per click", number(state.clickPower, true) },
					{ "Cookie clicks", number(state.clicks) }, { "Hand-made cookies", number(state.handmade) },
					{ "Run duration", math.floor(state.played / 60) .. " minutes" }, { "Achievements", unlocked .. " / " .. #Model.Achievements },
				}
				for i, pair in stats do
					pane[#pane + 1] = label("statName" .. i, pair[1], 24, 68 + (i - 1) * 34, 300, 30, 17)
					pane[#pane + 1] = label("statValue" .. i, pair[2], 326, 68 + (i - 1) * 34, 274, 30, 17, "#d4b474", { ["text-align"] = "right" })
				end
				pane[#pane + 1] = label("achievementHeading", "Achievements", 24, 362, 570, 36, 27)
				for i, a in Model.Achievements do pane[#pane + 1] = label("achievement" .. i, (state.achievements[a[1]] and "★  " or "☆  ") .. a[1] .. "  —  " .. a[2], 24, 405 + (i - 1) * 36, 570, 32, 16, state.achievements[a[1]] and "#e6c980" or "#877c6e") end
			elseif tab == "Options" then
				pane[#pane + 1] = button("saveGame", "Save", 24, 74, 150, 38, function() send("save") end)
				pane[#pane + 1] = label("saveStatus", state.saveStatus or "", 190, 74, 410, 38, 17)
				pane[#pane + 1] = label("saveExplanation", "Progress saves automatically every 60 seconds in published games. Studio playtests use a separate, temporary session.", 24, 137, 570, 88, 18)
			elseif tab == "Info" then
				pane[#pane + 1] = label("credits", "Cookie Clicker\nOriginal game by Orteil & Opti, DashNet.\n\nA Roblox recreation, rendered with toil-luau.\n\nClick the big cookie. Buy buildings. Bake more cookies.", 24, 74, 570, 240, 23)
			else
				pane[#pane + 1] = label("legacyDescription", "Your legacy begins with a trillion cookies.\n\nPrestige level: " .. number(math.floor((state.earned / 1e12) ^ (1 / 3))) .. "\n\nAscension and heavenly upgrades are still being implemented.", 24, 74, 570, 200, 21)
			end
			center[#center + 1] = e("scroll", { key = "menuPanel", id = "menuPanel", style = style(0, 160, centerW, h - 190, { background = "#241f19", overflow = "scroll" }) }, table.unpack(pane))
		end
		center[#center + 1] = label("footer", state.saveStatus or "", 12, h - 25, centerW - 24, 20, 13, "#9c8d7c")
		local store = { stripes("storeStripes", storeW, h, "#24221f", "#2a2723"), label("storeTitle", "Store", 10, 7, storeW - 20, 42, 36, "#fff2dd", titleStyle) }
		local upgrades = {}
		for _, u in Model.Upgrades do
			if not state.upgrades[u.id] and state.buildings[u.building] >= u.required then upgrades[#upgrades + 1] = u end
		end
		for i = 1, math.min(5, #upgrades) do
			local u = upgrades[i]
			store[#store + 1] = button("upgrade_" .. u.id, "✦", 10 + (i - 1) * 66, 56, 60, 60, function() send("upgrade", u.id) end, { ["font-size"] = "38px", color = state.cookies >= u.price and "#f4d28a" or "#807565", background = "linear-gradient(120deg, #605447, #30271e)" }, nil, function(inside) setHover(inside and u.id or 0) end)
		end
		if #upgrades == 0 then store[#store + 1] = label("upgradeEmpty", "Upgrades", 10, 67, 330, 34, 18, "#756b5d", titleStyle) end
		store[#store + 1] = rail("upgradeRail", 0, 126, storeW, 9)
		store[#store + 1] = button("buyMode", "Buy", 8, 145, 66, 28, function() setSell(false) end, { background = sell and "#27221c" or "#766446", ["font-size"] = "17px" })
		store[#store + 1] = button("sellMode", "Sell", 77, 145, 66, 28, function() setSell(true) end, { background = sell and "#766446" or "#27221c", ["font-size"] = "17px" })
		for i, amount in { 1, 10, 100 } do store[#store + 1] = button("bulk" .. amount, tostring(amount), 151 + (i - 1) * 62, 145, 57, 28, function() setBulk(amount) end, { background = bulk == amount and "#766446" or "#27221c", ["font-size"] = "17px" }) end
		local products = {}
		for i, b in Model.Buildings do
			local price = Model.price(state, i, bulk, sell)
			local unlockedBuilding = i <= 2 or state.earned >= Model.Buildings[i - 1].price or state.buildings[i] > 0
			local affordable = sell and state.buildings[i] > 0 or not sell and state.cookies >= price
			local cached = productCache[i]
			local signature = table.concat({tostring(price),tostring(unlockedBuilding),tostring(affordable),tostring(state.buildings[i]),tostring(bulk),tostring(sell),tostring(storeW)},"|")
			if cached and cached.signature == signature then
				products[#products+1] = cached.element
				continue
			end
			local kids = {
				label("buildingIcon" .. i, unlockedBuilding and b.icon or "?", 10, 4, 58, 61, 43, unlockedBuilding and b.color or "#5a5147", titleStyle),
				label("buildingName" .. i, unlockedBuilding and b.name or "???", 77, 7, storeW - 139, 31, 25, affordable and "#fff7e6" or "#a59a89"),
				label("buildingPrice" .. i, "● " .. number(price), 79, 40, 210, 23, 16, affordable and "#91cf74" or "#b07865"),
				label("buildingOwned" .. i, state.buildings[i] > 0 and tostring(state.buildings[i]) or "", storeW - 68, 8, 46, 52, 38, "#afa18a", { ["text-align"] = "right" }),
			}
			products[#products + 1] = button("buyBuilding" .. i, "", 0, (i - 1) * 76, storeW - 9, 74, function() send("trade", i, bulk, sell) end, { background = "linear-gradient(90deg, #534c40, #2d2923)", border = "1px solid #74634c" }, kids, function(inside) setHover(inside and i or 0) end, "linear-gradient(90deg, #766a54, #463f34)")
			productCache[i] = {signature=signature,element=products[#products]}
		end
		store[#store + 1] = e("scroll", { key = "storeProducts", id = "storeProducts", style = style(0, 184, storeW, h - 184, { overflow = "scroll" }) }, table.unpack(products))
		local children = {
			box("topBar", 0, 0, displayWidth, 30, "#111111", { label("brand", "Cookie Clicker", 12, 1, 180, 27, 18, "#e2d1b6"), label("attribution", "Original by Orteil & Opti • DashNet", 192, 2, 420, 25, 14, "#a89e90"), label("edition", "Roblox edition", displayWidth - 205, 2, 190, 25, 14, "#a89e90", { ["text-align"] = "right" }) }),
			box("bakeryColumn", 0, 30, leftW, h, nil, {stripes("blueStripes",leftW,h,"#173346","#1a3b51"), box("bakeryContent",(leftW-420)/2,0,420,h,nil,left)}, { overflow = "hidden" }),
			rail("leftRail", leftW, 30, 12, h), box("centerColumn", centerX, 30, centerW, h, nil, center),
			rail("rightRail", centerX + centerW, 30, 12, h), box("storeColumn", storeX, 30, storeW, h, nil, store),
		}
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
	local scale = Instance.new("UIScale")
	scale.Name = "ViewportScale"
	scale.Scale = uiScale
	scale.Parent = handle.gui:FindFirstChild("cookieClicker", true)
	local revision = 0
	-- One flush on the renderer's Heartbeat. Never recursively drain React
	-- from every network packet or delayed click callback.
	-- Bank changes do not rebuild the hundreds of static scene/store elements.
	-- Re-render the page only when its visible content or affordability changes.
	local lastSignature
	local priceCache = {}
	local function pageSignature()
		local parts = {snapshot.bakery, snapshot.saveStatus or "", tostring(snapshot.cps), tostring(snapshot.clickPower), tostring(snapshot.earned < 50), tostring(snapshot.earned < 1000)}
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
		if force or signature ~= lastSignature or currentTab == "Stats" or currentTab == "Legacy" then
			lastSignature = signature
			if refresh then refresh(revision) end
		end
	end
	local connection = remote.OnClientEvent:Connect(function(nextState) snapshot = nextState; update(false) end)
	local resize = workspace.CurrentCamera:GetPropertyChangedSignal("ViewportSize"):Connect(function()
		measureViewport()
		scale.Scale = uiScale
		update(true)
	end)
	script.Destroying:Connect(function() connection:Disconnect(); resize:Disconnect(); handle.unmount() end)
	send("sync")
	print("[CookieClicker] Mounted with toil-luau React")
	return handle
end
