-- One friendship lookup per pair on arrival; no network work in the frame loop.
return function(check,spawn,changed)
    local players={}
    local function publish(player,entry)
        local count=0;for _ in entry.friends do count+=1 end
        changed(player,count)
    end
    local api={}
    function api.add(player)
        if players[player] then return end
        local entry={friends={}};players[player]=entry
        for other,otherEntry in players do
            if other~=player then
                spawn(function()
                    local ok,isFriend=pcall(check,player,other)
                    if players[player]~=entry or players[other]~=otherEntry then return end
                    if ok and isFriend==true then
                        entry.friends[other]=true;otherEntry.friends[player]=true
                        publish(player,entry);publish(other,otherEntry)
                    end
                end)
            end
        end
    end
    function api.remove(player)
        local entry=players[player]
        if not entry then return end
        players[player]=nil
        for other in entry.friends do
            local otherEntry=players[other]
            if otherEntry then otherEntry.friends[player]=nil;publish(other,otherEntry) end
        end
    end
    function api.count(player)
        local count=0
        if players[player] then for _ in players[player].friends do count+=1 end end
        return count
    end
    return api
end
