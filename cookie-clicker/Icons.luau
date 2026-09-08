-- Small, scalable illustrations drawn with Path2D rather than font symbols.
-- Coordinates are normalized to a 10 by 10 drawing area.
local drawings={
	{{3,8,3,3,4,3,4,1,5,1,5,5,7,4,8,5,7,9,4,9,3,8}}, -- cursor
	{{2,4,2,2,4,1,6,1,8,2,8,4},{2,5,4,5,4,6,2,6,2,5},{6,5,8,5,8,6,6,6,6,5},{4,5,6,5},{3,8,5,9,7,8}}, -- grandma
	{{1,9,9,9},{3,9,3,3,1,2},{3,5,5,3},{7,9,7,2,9,1},{7,5,5,4}}, -- farm
	{{2,9,7,2},{2,3,4,1,7,1,9,4},{1,9,4,9}}, -- pickaxe
	{{1,9,1,4,4,6,4,3,7,5,7,1,9,1,9,9,1,9},{3,7,3,8},{5,7,5,8},{7,7,7,8}},
	{{1,3,5,1,9,3,1,3},{2,4,2,8},{5,4,5,8},{8,4,8,8},{1,9,9,9}},
	{{1,9,9,9},{2,8,8,8},{3,7,7,7},{4,6,4,3,6,3,6,6},{3,3,5,1,7,3}},
	{{2,9,7,4},{6,1,7,3,9,3,7,4,7,6,6,4,4,3,6,3,6,1}},
	{{4,7,3,4,5,1,7,4,6,7,4,7},{3,5,1,8,4,7},{7,5,9,8,6,7},{4,8,5,10,6,8}},
	{{4,1,6,1,6,4,9,8,8,9,2,9,1,8,4,4,4,1},{2,7,8,7}},
	{{5,1,8,2,9,5,8,8,5,9,2,8,1,5,2,2,5,1},{5,3,7,5,5,7,3,5,5,3}},
	{{5,1,8,2,9,5,8,8,5,9,2,8,1,5,2,2,5,1},{5,3,5,5,7,6}},
	{{1,3,3,1,9,7,7,9,1,3},{1,7,3,9,9,3,7,1,1,7},{5,1,7,5,5,9,3,5,5,1}},
	{{1,8,5,1,9,8,1,8},{5,1,5,8},{1,5,3,5},{7,4,10,3},{7,5,10,5},{8,6,10,7}},
	{{5,5,2,4,1,2,3,1,5,3,7,1,9,2,8,4,5,5,8,6,9,8,7,9,5,7,3,9,1,8,2,6,5,5},{5,7,5,10}},
	{{1,1,9,1,9,9,1,9,1,1},{3,3,7,3,7,7,3,7,3,3},{4,4,6,4,6,6,4,6,4,4}},
	{{1,2,9,2,9,8,1,8,1,2},{2,4,4,5,2,6},{5,6,8,6}},
	{{1,5,2,2,5,1,8,2,9,5,8,8,5,9,2,8,1,5},{3,5,5,3,7,5,5,7,3,5},{1,8,9,2}},
	{{5,2,3,1,1,3,2,5,1,7,3,9,5,8,7,9,9,7,8,5,9,3,7,1,5,2,5,8},{3,3,4,4,3,6},{7,3,6,4,7,6}},
	{{4,1,6,1,7,3,6,5,4,5,3,3,4,1},{1,9,2,7,4,6,6,6,8,7,9,9,1,9}},
}
return function(e,React)
	local cache={}
	local function Icon(props)
		local state=React.useRef({paths={},connections={}}).current
		local function update()
			local frame=state.frame
			if not frame then return end
			local visible=frame.Parent~=nil
			local p,size=frame.AbsolutePosition,frame.AbsoluteSize
			local ancestor=frame
			while ancestor do
				if ancestor:IsA("GuiObject") then
					if not ancestor.Visible then visible=false end
					if ancestor:IsA("ScrollingFrame") then
						local a,b=ancestor.AbsolutePosition,ancestor.AbsoluteSize
						-- Native Path2D strokes ignore ScrollingFrame clipping. Hide
						-- a clipped icon as a whole until its drawing area is in view.
						if p.X<a.X-.5 or p.Y<a.Y-.5 or p.X+size.X>a.X+b.X+.5 or p.Y+size.Y>a.Y+b.Y+.5 then visible=false end
					end
				end
				ancestor=ancestor.Parent
			end
			for _,path in state.paths do path.Visible=visible end
		end
		local function bind(frame)
			for _,connection in state.connections do connection:Disconnect() end
			state.connections={};state.frame=frame
			if not frame then return end
			for _,property in {"AbsolutePosition","AbsoluteSize"} do
				table.insert(state.connections,frame:GetPropertyChangedSignal(property):Connect(update))
			end
			local ancestor=frame
			while ancestor do
				if ancestor:IsA("GuiObject") then table.insert(state.connections,ancestor:GetPropertyChangedSignal("Visible"):Connect(update)) end
				if ancestor:IsA("ScrollingFrame") then
					for _,property in {"CanvasPosition","AbsoluteSize"} do table.insert(state.connections,ancestor:GetPropertyChangedSignal(property):Connect(update)) end
				end
				ancestor=ancestor.Parent
			end
			update()
		end
		local elements={}
		for i,line in drawings[props.index] or drawings[20] do
			local points={}
			for j=1,#line,2 do points[#points+1]=Path2DControlPoint.new(UDim2.fromScale(.08+line[j]*.084,.08+line[j+1]*.084)) end
			elements[#elements+1]=e("path2d",{key="stroke"..i,color=props.color,thickness=2.5,controlPoints=points,ref=function(path)state.paths[i]=path;update()end})
		end
		return e("div",{id="iconDrawing",ref=bind,style={position="absolute",left="0px",top="0px",width="100%",height="100%"}},table.unpack(elements))
	end
	return function(index,color)
		local key=tostring(index)..color
		if not cache[key] then cache[key]={e(Icon,{key=key,index=index,color=color})} end
		return cache[key]
	end
end
