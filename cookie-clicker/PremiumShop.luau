-- Image-led offers. Roblox supplies prices; the server verifies every purchase.
return function(React,helpers,Model)
    local e=React.createElement
    local label,box,button,style=helpers.label,helpers.box,helpers.button,helpers.style
    local Config=Model.MonetizationConfig
    local Marketplace=game:GetService("MarketplaceService")
    local Players=game:GetService("Players")
    local array=require(game:GetService("ReplicatedStorage").ToilRuntime).__arrNew
    local cache={}
    return function(props)
        local category=React.useState("Pass")
        local revision=React.useState(0)
        local busy=React.useState(false)
        local message=React.useState("")
        local retry=React.useState(0)
        local kind=category[1]
        local order=kind=="Pass" and Config.PassOrder or Config.ProductOrder
        React.useEffect(function()
            local alive=true
            for _,key in order do
                if not cache[key] or cache[key].expires<os.clock() then task.spawn(function()
                    local offer=kind=="Pass" and Config.Passes[key] or Config.Products[key]
                    local ok,info=pcall(function()return Marketplace:GetProductInfoAsync(offer.GamePassId or offer.ProductId,kind=="Pass" and Enum.InfoType.GamePass or Enum.InfoType.Product)end)
                    if ok then cache[key]={info=info,expires=os.clock()+300} end
                    if alive then revision[2](function(n)return n+1 end) end
                end) end
            end
            local a=Marketplace.PromptProductPurchaseFinished:Connect(function(id)if id==Players.LocalPlayer.UserId and alive then busy[2](false) end end)
            local b=Marketplace.PromptGamePassPurchaseFinished:Connect(function(player)if player==Players.LocalPlayer and alive then busy[2](false) end end)
            return function()alive=false;a:Disconnect();b:Disconnect()end
        end,array(kind,retry[1]))
        local function buy(key,offer)
            if busy[1] then return end
            busy[2](true);message[2]("")
            task.spawn(function()
                local ok,allowed,id=pcall(function()return script.Parent:WaitForChild("PurchaseRequest",5):InvokeServer(kind,key)end)
                if not ok or not allowed then message[2](ok and id or "Shop unavailable. Try again.");busy[2](false);return end
                local prompted,err=pcall(function()
                    if kind=="Pass" then Marketplace:PromptGamePassPurchase(Players.LocalPlayer,id)
                    else Marketplace:PromptProductPurchase(Players.LocalPlayer,id) end
                end)
                if not prompted then message[2]("Purchase window unavailable. Try again.");busy[2](false) end
            end)
        end
        local w=props.width
        local children={
            button("showPasses","Passes",0,0,(w-8)/2,46,function()category[2]("Pass")end,{background=kind=="Pass" and "#765a27" or "#493b2e"}),
            button("showProducts","Goodies",(w+8)/2,0,(w-8)/2,46,function()category[2]("Product")end,{background=kind=="Product" and "#765a27" or "#493b2e"}),
            label("purchaseMessage",message[1]~="" and message[1] or (kind=="Pass" and "Keep these boosts forever" or "Instant treats for your bakery"),0,54,w,52,18,"#f4dfad"),
        }
        local y=114
        if (props.state.shieldUntil or 0)>(props.state.serverNow or 0) then
            children[#children+1]=label("activeShield","Shield active · "..math.ceil((props.state.shieldUntil-props.state.serverNow)/3600).."h left",0,y,w,32,19,"#b6e6bf");y+=40
        end
        for _,key in order do
            local offer=kind=="Pass" and Config.Passes[key] or Config.Products[key]
            local info=cache[key] and cache[key].info
            local owned=kind=="Pass" and props.state.passes and props.state.passes[key]
            local crate=offer.Reward.Kind=="Crate"
            local allowed=not crate or props.state.paidRandomAllowed==true
            local available=info and info.IsForSale~=false and type(info.PriceInRobux)=="number"
            local description=offer.Goal
            if offer.Reward.Kind=="ScaledCurrency" then description=helpers.number(Model.deliveryAmount(props.state,offer.Reward)).." cookies at your current progress" end
            local height=crate and 306 or 202
            local card={
                e("img",{key="offerIcon",id="offerIcon",style=style(8,8,82,82,{["background-image"]="url("..offer.Icon..")",["object-fit"]="contain"})}),
                label("offerName",offer.Name,100,10,w-112,66,22,"#fff0cf"),
                label("offerReward",description,12,92,w-24,54,17,"#eee5dc"),
            }
            if crate then
                for i,id in Config.CrateItems do
                    local item=Model.Items[i]
                    card[#card+1]=label("odds"..id,item.name.." ("..item.rarity..") "..offer.Reward.Odds[i].."%",12,148+(i-1)*24,w-24,24,15,"#d9ccb7")
                end
            end
            local caption=owned and "Owned" or not allowed and "Unavailable" or not available and "Retry price" or busy[1] and "Please wait..." or "Buy · "..info.PriceInRobux.." Robux"
            card[#card+1]=button("buy"..key,caption,12,height-54,w-24,44,function()
                if owned or not allowed then return end
                if not available then cache[key]=nil;retry[2](function(n)return n+1 end);return end
                buy(key,offer)
            end,{background=owned and "#385847" or allowed and available and "#276849" or "#51483d",["font-size"]="19px"})
            children[#children+1]=box("offer"..key,0,y,w,height,"#342d25",card,{border="1px solid #8c7041",["border-radius"]="12px"})
            y+=height+12
        end
        return box("premiumOffers",24,68,w,y,nil,children)
    end
end
