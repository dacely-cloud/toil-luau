local Layout=require("./Layout")
for _,size in {{320,568},{401,777},{390,844},{820,1180},{749,361},{568,320},{844,390},{932,430},{1024,576},{1440,900},{2497,847},{1920,1080},{1080,1920}} do
    local desktop=Layout.measure(size[1],size[2],false)
    assert(not desktop.mobile and not desktop.landscape,"desktop must not become phone mode when resized")
    assert(desktop.scale==math.clamp(size[1]/1440,1,2),"preserve desktop zoom")
    local l=Layout.measure(size[1],size[2],true)
    assert(math.abs(l.width*l.scale-size[1])<.001 and math.abs(l.height*l.scale-size[2])<.001,"must use actual viewport pixels")
    assert(math.abs((l.contentHeight+(l.mobile and 60 or 0))*l.scale-size[2])<.001,"panels must fit available height")
    assert(l.landscape==(l.mobile and size[1]>size[2]))
    if l.mobile then
        assert(l.scale==1,"mobile must stay native")
        assert(l.width/3-8>=44,"navigation tap targets")
        local productWidth=l.landscape and l.width-math.floor(l.width*.44) or l.width
        assert((productWidth-16)/5-4>=44,"shop controls fit without overlap")
    end
end
assert(Layout.measure(401,719,true).mobile,"phone portrait uses touch layout")
assert(Layout.measure(844,390,true).landscape,"phone landscape uses touch layout")
assert(not Layout.measure(1024,768,false).mobile,"windowed desktop keeps columns")
print("PASS 13 viewport sizes for desktop and touch: detection, zoom, exact fit, orientation and tap targets")
