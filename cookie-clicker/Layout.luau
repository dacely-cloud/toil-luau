local Layout={}
function Layout.measure(width,height)
	width,height=math.max(1,width),math.max(1,height)
	local mobile=width<900
	local logicalWidth=mobile and 420 or 1440
	local scale=width/logicalWidth
	return {mobile=mobile,portraitRequired=mobile and width>height,scale=scale,width=logicalWidth,height=height/scale,
		contentHeight=math.max(280,height/scale-30-(mobile and 60 or 0))}
end
return Layout
