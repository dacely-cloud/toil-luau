local Layout=require("./Layout")
for _,size in {{320,568},{401,777},{390,844},{820,1180},{749,361},{568,320},{844,390},{932,430},{1024,576},{1440,900},{2497,847},{1920,1080},{1080,1920}} do
    local l=Layout.measure(size[1],size[2])
    assert(math.abs(l.width*l.scale-size[1])<.001 and math.abs(l.height*l.scale-size[2])<.001,"must use actual viewport pixels")
    assert(math.abs((l.contentHeight+30+(l.mobile and 60 or 0))*l.scale-size[2])<.001,"panels must fit available height")
    assert(l.landscape==(l.mobile and size[1]>size[2]))
    if l.mobile then
        assert(l.scale==1,"mobile must stay native")
        assert(l.width/3-8>=44,"navigation tap targets")
        local productWidth=l.landscape and l.width-math.floor(l.width*.44) or l.width
        assert((productWidth-16)/5-4>=44,"shop controls fit without overlap")
    end
end
print("PASS 13 viewport sizes: full viewport, exact fit, orientation and tap targets")
