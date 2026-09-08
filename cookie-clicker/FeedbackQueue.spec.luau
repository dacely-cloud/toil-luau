local makeFeedback=require("./FeedbackQueue")
local shown,timers={},{}
local active,maxActive=0,0
local feedback=makeFeedback(function(message)table.insert(shown,message or false)end,function(seconds,callback)
    local timer={seconds=seconds,callback=callback,live=true}
    table.insert(timers,timer);active+=1;maxActive=math.max(maxActive,active)
    return timer
end,function(timer)if timer.live then timer.live=false;active-=1 end end)
feedback.push("Bought cursor","success")
local old=timers[1]
assert(old.seconds==1.25)
feedback.push("Achievement!","achievement")
assert(not old.live and shown[#shown].text=="Achievement!" and timers[2].seconds==2)
old.callback();assert(shown[#shown].text=="Achievement!","stale expiry cannot hide replacement")
local count=#shown
feedback.push("Achievement!","achievement")
assert(#shown==count and #timers==2,"duplicate does not extend display")
for i=1,30 do feedback.push("Purchase "..i,"success")end
assert(shown[#shown].text=="Purchase 30" and active==1 and maxActive==1)
local latest=timers[#timers];latest.live=false;active-=1;latest.callback()
assert(shown[#shown]==false and active==0,"expiry clears without replay")
feedback.push("Closing","success")
local pending=timers[#timers]
feedback.destroy();count=#shown
pending.callback();feedback.push("After close","success")
assert(#shown==count and active==0)
print("PASS notifications: immediate replacement, no backlog, stale expiry protection, single timer and cleanup")
