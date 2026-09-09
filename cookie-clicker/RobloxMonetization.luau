local PurchaseService=script and require(script.Parent.PurchaseService) or require("./PurchaseService")
return function(Model,Config,folder,sessions,persistence,charityStore,notice,send,platform)
    local services=platform or game
    local Marketplace=services:GetService("MarketplaceService")
    local Players=services:GetService("Players")
    local Policy=services:GetService("PolicyService")
    local rng=platform and platform.random or Random.new()
    local decisions=platform and platform.decisions or Enum.ProductPurchaseDecision
    local function randomAllowed(player)
        local ok,result=pcall(function()return Policy:GetPolicyInfoForPlayerAsync(player)end)
        if not ok then return nil end
        return result.ArePaidRandomItemsRestricted==false
    end
    local purchases=PurchaseService.new(Model,Config,persistence,{
        now=os.time,random=function()return rng:NextNumber()end,protect=charityStore.protect,warn=warn,
        randomAllowed=function(receipt)return randomAllowed(Players:GetPlayerByUserId(receipt.PlayerId))end,
    })
    local service={}
    function service.entitlements(player)
        local owned,complete={},true
        for _,key in Config.PassOrder do
            local ok,result=pcall(function()return Marketplace:UserOwnsGamePassAsync(player.UserId,Config.Passes[key].GamePassId)end)
            if ok then owned[key]=result==true else complete=false end
        end
        return owned,complete
    end
    function service.policy(player,session)
        session.paidRandomAllowed=randomAllowed(player)==true
        return session.paidRandomAllowed
    end
    Marketplace.ProcessReceipt=function(receipt)
        local player=Players:GetPlayerByUserId(receipt.PlayerId)
        local session=player and sessions[player]
        if purchases.receipt(session,receipt) then
            notice(session,"success",Config.ByProductId[receipt.ProductId].Name.." delivered!")
            send(player,session)
            return decisions.PurchaseGranted
        end
        return decisions.NotProcessedYet
    end
    Marketplace.PromptGamePassPurchaseFinished:Connect(function(player,id,purchased)
        if not purchased or not Config.ByGamePassId[id] then return end
        local session=sessions[player]
        if not session or not session.ready or session.closing then return end
        local ok,owned=pcall(function()return Marketplace:UserOwnsGamePassAsync(player.UserId,id)end)
        if ok and owned and sessions[player]==session and not session.closing then
            session.state.passes=session.state.passes or {}
            session.state.passes[Config.ByGamePassId[id].Key]=true
            notice(session,"success",Config.ByGamePassId[id].Name.." is active!");send(player,session)
        end
    end)
    local request=folder:FindFirstChild("PurchaseRequest") or Instance.new("RemoteFunction")
    request.Name="PurchaseRequest";request.Parent=folder
    request.OnServerInvoke=function(player,kind,key)
        local session=sessions[player]
        if not session or not session.ready or session.closing or session.purchaseBusy then return false,"Your bakery is still saving." end
        if session.lastPurchasePrompt and os.clock()-session.lastPurchasePrompt<2 then return false,"Please wait a moment." end
        session.lastPurchasePrompt=os.clock()
        if type(key)~="string" or (kind~="Pass" and kind~="Product") then return false,"Unknown offer." end
        local order=kind=="Pass" and Config.PassOrder or Config.ProductOrder
        if not table.find(order,key) then return false,"Unknown offer." end
        local item=kind=="Pass" and Config.Passes[key] or Config.Products[key]
        if kind=="Pass" and session.state.passes and session.state.passes[key] then return false,"You already own this pass." end
        if item.Reward.Kind=="Crate" and not service.policy(player,session) then return false,"Surprise crates are unavailable for this account." end
        return true,kind=="Pass" and item.GamePassId or item.ProductId
    end
    return service
end
