-- Each fundraiser keeps its own receipts, so later fundraisers cannot erase replay protection.
local CharityStore={}
local function int(n,max) return type(n)=="number" and n==n and n>=0 and n<=max and n%1==0 end
local function validId(id) return type(id)=="number" and id==id and id%1==0 and math.abs(id)<=9007199254740991 end
local function copy(v)if type(v)~="table" then return v end;local r={};for k,x in v do r[k]=copy(x) end;return r end
function CharityStore.new(Model,store)
    local service={}
    function service.protect(owner,untilTime)
        if not validId(owner) or type(untilTime)~="number" or untilTime~=untilTime or untilTime<0 or untilTime>=1e12 then return false end
        local ok,result=pcall(function()
            return store:UpdateAsync("shield_"..owner,function(old)return math.max(type(old)=="number" and old or 0,untilTime)end)
        end)
        return ok and type(result)=="number" and result>=untilTime
    end
    local function key(owner,sequence)
        if not validId(owner) or not int(sequence,1e12) or sequence<1 then return nil end
        return "fund_"..owner.."_"..sequence
    end
    local function change(owner,sequence,fn)
        local k=key(owner,sequence);if not k then return nil,"Invalid fundraiser.",true end
        local reason="Please try again.";local rejected=false
        local ok,result=pcall(function()return store:UpdateAsync(k,function(old)
            local value,message=fn(copy(old));rejected=value==nil;if message then reason=message end;return value
        end)end)
        if not ok then return nil,"Fundraiser save is waiting. We will retry.",false end
        if not result then return nil,reason,rejected end
        return result
    end
    function service.read(owner,sequence)
        local k=key(owner,sequence);if not k then return nil end
        local ok,r=pcall(function()
            if store.GetAsync then return store:GetAsync(k) end
            return store:UpdateAsync(k,function(old)return old end)
        end)
        return ok and type(r)=="table" and r.version==1 and copy(r) or nil
    end
    function service.create(owner,sequence,tierIndex,now,insurance,investment)
        if not int(tierIndex,4) or tierIndex<1 then return nil,"Choose a duration.",true end
        local tier=Model.Fundraisers[tierIndex]
        local cost=investment==nil and tier.cost or investment
        if not int(cost,1e12) or cost<tier.cost then return nil,"Invalid investment.",true end
        return change(owner,sequence,function(old)
            if old then
                if old.version==1 and old.owner==owner and old.sequence==sequence then return old end
                return nil,"This fundraiser cannot be replaced."
            end
            return {version=1,owner=owner,sequence=sequence,tier=tierIndex,cost=cost,endsAt=now+tier.seconds,pot=math.floor(cost*tier.multiplier),stolen=0,insurance=math.clamp(insurance or 0,0,.75),visitors={},visits=0}
        end)
    end
    function service.import(owner,sequence,legacy,insurance)
        return change(owner,sequence,function(old)
            if old then return old.version==1 and old or nil end
            if type(legacy)~="table" or not Model.Fundraisers[legacy.tier] then return nil,"Old fundraiser is invalid." end
            local visitors,visits={},0
            for field,kind in {helpers="help",thieves="steal"} do
                for id in legacy[field] or {} do
                    if visits>=64 then break end
                    visitors[id]=visitors[id] or {};visitors[id][kind]={operation=0,cookies=0,xp=0};visits+=1
                end
            end
            return {version=1,owner=owner,sequence=sequence,tier=legacy.tier,cost=legacy.cost or Model.Fundraisers[legacy.tier].cost,endsAt=legacy.endsAt,pot=legacy.pot,stolen=legacy.stolen,insurance=math.clamp(insurance or 0,0,.75),visitors=visitors,visits=visits}
        end)
    end
    function service.visit(owner,sequence,actor,operation,kind,now,bonus)
        if not validId(actor) or actor==owner or not int(operation,1e12) or operation<1 or (kind~="help" and kind~="steal") then return nil,"Choose another fundraiser.",true end
        local protected=false
        if kind=="steal" then
            local ok,expiry=pcall(function()
                return store:UpdateAsync("shield_"..owner,function(old)return old or 0 end)
            end)
            if not ok then return nil,"Checking this bakery's shield. Try again soon.",false end
            protected=type(expiry)=="number" and expiry>now
        end
        return change(owner,sequence,function(r)
            if not r or r.version~=1 then return nil,"Fundraiser not found." end
            local id=tostring(actor)
            local visitor=r.visitors[id]
            local receipt=visitor and visitor[kind]
            if receipt then
                if receipt.operation==operation then return r end
                return nil,"You already visited this fundraiser."
            end
            if r.claimed or now>=r.endsAt then return nil,"This fundraiser has finished." end
            if protected then return nil,"This bakery has an active shield." end
            if r.visits>=64 then return nil,"This fundraiser is full." end
            local reward,xp=50,20
            if kind=="steal" then
                local tier=Model.Fundraisers[r.tier]
                local cost=r.cost or tier.cost
                reward=math.min(math.max(0,math.floor(cost*.25)-r.stolen),math.max(1,math.floor(cost*.05*(1+math.clamp(bonus or 0,0,1))*(1-r.insurance))))
                if reward<=0 then return nil,"These cookies are protected." end
                r.pot-=reward;r.stolen+=reward;xp=0
            else r.pot+=100 end
            visitor=visitor or {};r.visitors[id]=visitor
            visitor[kind]={operation=operation,cookies=reward,xp=xp};r.visits+=1
            return r
        end)
    end
    function service.claim(owner,sequence,operation,now)
        if not int(operation,1e12) or operation<1 then return nil,"Invalid claim.",true end
        return change(owner,sequence,function(r)
            if not r or r.version~=1 then return nil,"Fundraiser not found." end
            if r.claimed then
                if r.claimed.operation==operation then return r end
                return nil,"Already collected."
            end
            if now<r.endsAt then return nil,"Still growing. Come back later!" end
            r.claimed={operation=operation,cookies=r.pot,principal=r.cost or Model.Fundraisers[r.tier].cost}
            return r
        end)
    end
    return service
end
return CharityStore
