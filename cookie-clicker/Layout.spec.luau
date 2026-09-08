local Layout=require("./Layout")
for _,size in {{390,844},{820,1180},{1440,900},{2497,847}} do
	local l=Layout.measure(size[1],size[2])
	assert(math.abs(l.width*l.scale-size[1])<.001)
	if size[1]<900 then
		assert(l.mobile and l.width==420)
		assert(52*l.scale>=44, "phone navigation needs large tap targets")
	else assert(not l.mobile and l.width==1440) end
end
print("PASS phone, tablet and desktop layout sizes")
