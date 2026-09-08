-- Latest notification wins; no pending messages or replay.
return function(show, schedule, cancel)
    local current,timer
    local destroyed=false
    local revision=0
    return {
        push=function(text,kind)
            if destroyed then return end
            if current and current.text==text and current.kind==kind then return end
            revision+=1
            local id=revision
            if timer then cancel(timer);timer=nil end
            current={text=text,kind=kind}
            show(current)
            timer=schedule(kind=="achievement" and 2 or 1.25,function()
                if destroyed or revision~=id then return end
                timer=nil;current=nil
                show(nil)
            end)
        end,
        destroy=function()
            destroyed=true;revision+=1
            if timer then cancel(timer);timer=nil end
            current=nil
        end,
    }
end
