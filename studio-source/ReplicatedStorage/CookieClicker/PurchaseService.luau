-- A receipt and its rewards share one player-save snapshot.
local PurchaseService={}
function PurchaseService.new(Model,Config,persistence,options)
    local service={}
    function service.receipt(session,receipt)
        local product=Config.ByProductId[receipt.ProductId]
        local id=receipt.PurchaseId
        if not product or type(id)~="string" or #id==0 or #id>200 then return false end
        if not session or not session.ready or not session.canSave or session.closing or session.closed or session.purchaseBusy then return false end
        session.purchaseBusy=true
        local ok,granted=pcall(function()
            local s=session.state
            s.purchaseReceipts=s.purchaseReceipts or {}
            if not s.purchaseReceipts[id] then
                local restricted=false
                if product.Reward.Kind=="Crate" and options.randomAllowed then
                    local allowed=options.randomAllowed(receipt)
                    if allowed==nil then return false end
                    restricted=not allowed
                end
                if session.closing or session.closed or not session.ready or not session.canSave then return false end
                -- Honor a previously paid receipt even if account policy changed:
                -- give the best possible item, without a random roll.
                local reward=restricted and {cookies=0,items={[Config.CrateItems[#Config.CrateItems]]=1}} or Model.productReward(s,product,options.random(),options.now())
                Model.grantProduct(s,reward)
                s.purchaseReceipts[id]=true
            end
            -- Also save on retries: an earlier save may have failed after the grant.
            if not persistence.save(session,false) then return false end
            if (s.shieldUntil or 0)>options.now() and not options.protect(receipt.PlayerId,s.shieldUntil) then return false end
            return true
        end)
        session.purchaseBusy=false
        if not ok then if options.warn then options.warn(granted) end;return false end
        return granted==true
    end
    return service
end
return PurchaseService
