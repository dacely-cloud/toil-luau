local Model=require("./Model")
for _,quantity in {1,5,10,100,1000} do
    local s=Model.new();s.buildings[6]=1;s.cookies=1e9
    local price=Model.stockPrice(s,2)
    assert(Model.advancedAction(s,"stockBuy",{index=2,quantity=quantity}))
    assert(s.stocks[2]==quantity and s.cookies==1e9-price*quantity)
    assert(Model.advancedAction(s,"stockSell",{index=2,quantity=quantity}))
    assert(s.stocks[2]==0 and s.cookies==1e9-price*quantity+math.floor(price*.9)*quantity)
end
local s=Model.new();s.buildings[6]=1;s.cookies=1e9;s.stocks[1]=9999
assert(not Model.advancedAction(s,"stockBuy",{index=1,quantity=5}))
assert(s.stocks[1]==9999 and s.cookies==1e9)
assert(Model.advancedAction(s,"stockBuy",1));assert(s.stocks[1]==10000)
for _,arg in {{index=1},{index=1,quantity=false},{index=1,quantity=0},{index=1,quantity=-1},{index=1,quantity=1.5},{index=1,quantity=1001},{index=1,quantity=0/0},{index=1,quantity=math.huge},{index=1,quantity="10"},{index=0/0,quantity=1}} do
    local bank=s.cookies
    assert(not Model.advancedAction(s,"stockSell",arg))
    assert(s.stocks[1]==10000 and s.cookies==bank)
end
s=Model.new();s.cookies=1e9
assert(not Model.advancedAction(s,"stockBuy",{index=1,quantity=1000}),"bank required")
s.buildings[6]=1;s.cookies=0
assert(not Model.advancedAction(s,"stockBuy",{index=1,quantity=1000}))
assert(not Model.advancedAction(s,"stockSell",{index=1,quantity=1000}))
assert(s.stocks[1]==0 and s.cookies==0)
print("PASS stock quantities, exact totals, per-unit selling fee, capacity, funds, bank lock and malformed requests")
