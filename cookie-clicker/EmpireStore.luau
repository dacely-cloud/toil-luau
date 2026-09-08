-- Shared empire records. UpdateAsync serializes joins, donations and upgrades.
local EmpireStore={}
EmpireStore.Badges={"cookie","crown","star","heart","shield","bakery"}
local function int(n,max) return type(n)=="number" and n==n and n>=0 and n<=max and n%1==0 end
local function userKey(id) return type(id)=="number" and id==id and id%1==0 and math.abs(id)<=9007199254740991 and tostring(id) or nil end
local function copy(v) if type(v)~="table" then return v end;local r={};for k,x in v do r[k]=copy(x) end;return r end
local function valid(record)
    return type(record)=="table" and record.version==1 and type(record.members)=="table" and int(record.points,1e15) and int(record.level,100)
end
local function badgeValid(badge) for _,v in EmpireStore.Badges do if v==badge then return true end end;return false end
function EmpireStore.perks(record)
    local level=valid(record) and record.level or 0
    return {cookies=level*.01,steal=level*.01,insurance=math.min(.75,level*.01),jobs=level*.01,properties=level*.01}
end
function EmpireStore.new(store)
    local service={}
    local function mutate(id,transform)
        local key=userKey(id)
        if not key then return nil,"Choose a valid empire." end
        local reason="The empire could not be updated. Try again."
        local ok,result=pcall(function()
            return store:UpdateAsync("empire_"..key,function(old)
                local nextRecord,message=transform(copy(old))
                if message then reason=message end
                return nextRecord
            end)
        end)
        if not ok or not result then return nil,reason end
        return result
    end
    function service.read(id)
        local key=userKey(id);if not key then return nil end
        local ok,value=pcall(function()
            if store.GetAsync then return store:GetAsync("empire_"..key) end
            return store:UpdateAsync("empire_"..key,function(old)return old end)
        end)
        return ok and valid(value) and copy(value) or nil
    end
    function service.create(owner,name,badge)
        local key=userKey(owner)
        if not key or type(name)~="string" or #name<1 or #name>96 or not badgeValid(badge) then return nil,"Choose a name and badge." end
        -- Name must already have passed Roblox's server-side text filter.
        return mutate(owner,function(old)
            if old~=nil then
                if valid(old) and old.owner==owner then return old end
                return nil,"An existing empire cannot be replaced."
            end
            return {version=1,owner=owner,name=name,badge=badge,level=1,points=0,members={[key]={active=true,donated=0,lastSequence=0}}}
        end)
    end
    function service.join(id,playerId)
        local key=userKey(playerId);if not key then return nil,"Invalid member." end
        return mutate(id,function(r)
            if not valid(r) then return nil,"Empire not found." end
            local active,total=0,0
            for _,member in r.members do total+=1;if member.active then active+=1 end end
            local member=r.members[key]
            if member and member.active then return r end
            if active>=64 or (not member and total>=512) then return nil,"This empire is full." end
            r.members[key]=member or {donated=0,lastSequence=0};r.members[key].active=true
            return r
        end)
    end
    function service.leave(id,playerId)
        local key=userKey(playerId);if not key then return nil,"Invalid member." end
        return mutate(id,function(r)
            if not valid(r) then return nil,"Empire not found." end
            if r.owner==playerId then return nil,"The empire leader must stay with their empire." end
            if r.members[key] then r.members[key].active=false end
            -- Keep sequence tombstones so old donations cannot replay after rejoining.
            return r
        end)
    end
    function service.donate(id,playerId,sequence,amount)
        local key=userKey(playerId)
        if not key or not int(sequence,1e12) or sequence<1 or (amount~=10 and amount~=25 and amount~=50) then return nil,"Invalid donation." end
        return mutate(id,function(r)
            if not valid(r) then return nil,"Empire not found." end
            local member=r.members[key]
            if not member or not member.active then return nil,"Join this empire first." end
            if sequence<=member.lastSequence then return r end
            if r.points+amount>1e15 then return nil,"Empire points are full." end
            member.lastSequence=sequence;member.donated+=amount;r.points+=amount
            return r
        end)
    end
    function service.upgrade(id,playerId,expectedLevel)
        if not int(expectedLevel,99) or expectedLevel<1 then return nil,"Invalid upgrade." end
        return mutate(id,function(r)
            if not valid(r) or r.owner~=playerId then return nil,"Only the leader can upgrade the empire." end
            if r.level~=expectedLevel then return nil,"The empire level changed. Refresh and try again." end
            local cost=r.level*100
            if r.points<cost then return nil,"Donate more stamina first." end
            r.points-=cost;r.level+=1
            return r
        end)
    end
    function service.rename(id,playerId,name,badge)
        if type(name)~="string" or #name<1 or #name>96 or not badgeValid(badge) then return nil,"Choose a name and badge." end
        return mutate(id,function(r)
            if not valid(r) or r.owner~=playerId then return nil,"Only the leader can change this empire." end
            r.name=name;r.badge=badge;return r
        end)
    end
    return service
end
return EmpireStore
