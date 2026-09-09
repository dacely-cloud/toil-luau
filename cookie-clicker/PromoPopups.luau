-- One optional hint at a time, never a queue or a purchase prompt.
local PromoPopups={}
function PromoPopups.new(now)
    local nextAt=now+60
    local index=1
    local expires=0
    local active
    local order={"friends","shop","starter"}
    local self={}
    function self.dismiss(now)
        active=nil;expires=0;nextAt=now+180
    end
    function self.step(now,available)
        if active and (not available or now>=expires) then self.dismiss(now) end
        if not active and available and now>=nextAt and index<=#order then
            active=order[index];index+=1;expires=now+10
        end
        return active
    end
    return self
end
function PromoPopups.component(React,helpers,Config)
    local array=require(game:GetService("ReplicatedStorage").ToilRuntime).__arrNew
    local e=React.createElement
    local label,box,button,picture,style=helpers.label,helpers.box,helpers.button,helpers.picture,helpers.style
    return function(props)
        local selected=React.useState(nil)
        local schedule=React.useRef(nil)
        if not schedule.current then schedule.current=PromoPopups.new(os.clock()) end
        local latest=React.useRef(props);latest.current=props
        local function dismiss()
            schedule.current.dismiss(os.clock());selected[2](nil)
        end
        React.useEffect(function()
            local alive=true
            task.spawn(function()
                local previous
                while alive do
                    local key=schedule.current.step(os.clock(),latest.current.available())
                    if key~=previous then previous=key;selected[2](key) end
                    task.wait(1)
                end
            end)
            return function()alive=false end
        end,array())
        local key=selected[1]
        if not key or not props.available() then return nil end
        local offers={
            friends={title="Bake with friends!",detail="+1% baking per friend here.\nThe boost stacks!",cta="Invite friends",icon="CookieEmpire",background="CookieParty"},
            shop={title="20% OFF!",detail="Everything in the shop.\nPick your next boost!",cta="Open shop · 20% off",icon="CookieStore",background="CookieStore"},
            starter={title="Starter Pack",detail="50,000 cookies + 2 collectibles",cta="See pack · Robux",icon="Cookie",background="BakingCookie"},
        }
        local offer=offers[key]
        local w=math.min(360,props.width-24)
        local h=214
        local kids={
            picture("promoBackdrop","ZoneBackground/"..offer.background,0,0,w,h,{["object-fit"]="cover"}),
            box("promoShade",0,0,w,h,"rgba(20,16,29,0.88)",{}),
            label("promoTitle",offer.title,16,12,w-70,38,23,"#ffe8ab"),
            picture("promoArtwork",offer.icon,12,64,80,80),
            label("promoDetail",offer.detail,104,60,w-120,88,17,"#fff4df"),
            button("dismissPromo","X",w-48,4,44,44,dismiss,{background="transparent",border="0px solid transparent"}),
            button("openPromo",offer.cta,16,158,w-32,44,function()dismiss();props.activate(key)end,{background="#346e54",["font-size"]="20px"}),
        }
        if key=="starter" then
            kids[4]=e("img",{key="promoArtwork",id="promoArtwork",style=style(12,64,80,80,{["background-image"]="url("..Config.Products.StarterPack.Icon..")",["object-fit"]="contain"})})
        end
        return box("promoPopup",props.width-w-12,math.max(8,props.height-h-(props.mobile and 78 or 16)),w,h,"#29212d",kids,{["z-index"]="80",overflow="hidden",border="2px solid #b59250",["border-radius"]="16px"})
    end
end
return PromoPopups
