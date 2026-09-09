local Layout={}
function Layout.measure(width,height,touchLayout)
	width,height=math.max(1,width),math.max(1,height)
	local mobile=touchLayout==true and (width<1100 or (height<600 and width<1200))
	local landscape=mobile and width>height
	-- Keep desktop controls comfortably sized while using the full viewport.
	-- Mobile remains at native pixels; neither mode imposes an aspect ratio.
	local zoom=mobile and 1 or math.clamp(width/1440,1,2)
	return {mobile=mobile,landscape=landscape,scale=zoom,width=width/zoom,height=height/zoom,
		contentHeight=math.max(0,height/zoom-(mobile and 60 or 0))}
end
return Layout
