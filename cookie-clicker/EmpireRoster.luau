-- Public member rows and per-session membership changes; no service calls here.
local EmpireRoster={}
function EmpireRoster.members(record,resolve)
    local rows={}
    for key,member in record.members do
        local id=tonumber(key)
        if member.active and id then
            local name,online=resolve(id)
            rows[#rows+1]={id=id,name=name,online=online==true,owner=id==record.owner,donated=member.donated or 0}
        end
    end
    table.sort(rows,function(a,b)
        if a.owner~=b.owner then return a.owner end
        if a.online~=b.online then return a.online end
        return a.id<b.id
    end)
    return rows
end
function EmpireRoster.observe(session,userId,record,resolve)
    local previous=session.observedEmpire
    local current=record and {id=record.owner,name=record.name,members={}} or nil
    if current then for key,member in record.members do if member.active then current.members[key]=true end end end
    session.observedEmpire=current
    local messages={}
    if previous and current and previous.id==current.id then
        for key in current.members do
            if not previous.members[key] and tonumber(key)~=userId then
                local name,_,resolved=resolve(tonumber(key))
                if resolved==false then current.members[key]=nil
                else messages[#messages+1]=name.." joined "..current.name.."!" end
            end
        end
    elseif previous and not current then messages[1]="You are no longer in "..previous.name.."." end
    return messages
end
return EmpireRoster
