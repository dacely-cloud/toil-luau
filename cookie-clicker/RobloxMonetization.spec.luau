local Model=require("./Model")
local Config=require("./MonetizationConfig")
local start=require("./RobloxMonetization")
local player={UserId=42}
local session={ready=true,canSave=true,state=Model.new()}
local sessions={[player]=session}
local request={}
local folder={FindFirstChild=function()return request end}
local listener
local owned,ownershipError,policyError,restricted=false,false,false,false
local market={PromptGamePassPurchaseFinished={Connect=function(_,callback)listener=callback end},UserOwnsGamePassAsync=function()
    if ownershipError then error("offline") end;return owned
end}
local services={
    MarketplaceService=market,
    Players={GetPlayerByUserId=function(_,id)return id==42 and player or nil end},
    PolicyService={GetPolicyInfoForPlayerAsync=function()if policyError then error("offline") end;return {ArePaidRandomItemsRestricted=restricted}end},
}
local platform={GetService=function(_,key)return services[key]end,random={NextNumber=function()return .5 end},decisions={PurchaseGranted="granted",NotProcessedYet="retry"}}
local saving=false
local service=start(Model,Config,folder,sessions,{save=function()return saving end},{protect=function()return true end},function()end,function()end,platform)
local passes,complete=service.entitlements(player);assert(complete and not passes.VIP)
ownershipError=true;passes,complete=service.entitlements(player);assert(not complete and not passes.VIP)
listener(player,Config.Passes.VIP.GamePassId,true);assert(not session.state.passes)
ownershipError=false;listener(player,Config.Passes.VIP.GamePassId,true);assert(not session.state.passes,"purchase signal alone cannot grant ownership")
owned=true;listener(player,Config.Passes.VIP.GamePassId,true);assert(session.state.passes.VIP)
local function ask(kind,key)session.lastPurchasePrompt=nil;return request.OnServerInvoke(player,kind,key)end
assert(not ask("Pass","VIP"));assert(not ask("Pass","AutoBake"));assert(not ask("Product",{}));assert(not ask("Product","unknown"))
assert(ask("Product","StarterPack"));assert(not request.OnServerInvoke(player,"Product","StarterPack"),"prompt cooldown")
restricted=true;assert(not ask("Product","SantasCrate"))
restricted=false;policyError=true;assert(not ask("Product","SantasCrate"))
policyError=false;assert(ask("Product","SantasCrate"))
local receipt={PlayerId=42,ProductId=Config.Products.StarterPack.ProductId,PurchaseId="test"}
assert(market.ProcessReceipt(receipt)=="retry");assert(session.state.cookies==50000)
saving=true;assert(market.ProcessReceipt(receipt)=="granted");assert(session.state.cookies==50000)
assert(market.ProcessReceipt({PlayerId=99,ProductId=receipt.ProductId,PurchaseId="absent"})=="retry")
assert(market.ProcessReceipt({PlayerId=42,ProductId=1,PurchaseId="unknown"})=="retry")
print("PASS actual Roblox adapter: ownership checks, failed APIs, restricted crates, prompt validation/cooldown, saved receipts and absent players")
