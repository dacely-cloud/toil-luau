-- Small reusable sound pool; uses a bundled Roblox UI sound, no external asset.
return function()
	local sounds = {}
	local enabled, cursor, lastClick = true, 0, 0
	for i=1,6 do
		local sound=Instance.new("Sound")
		sound.Name="CookieCue"..i
		sound.SoundId="rbxasset://sounds/volume_slider.ogg"
		sound.Volume=.5
		sound.Parent=game:GetService("SoundService")
		sounds[i]=sound
	end
	local api={}
	function api.setEnabled(value)
		enabled=value
		if not enabled then for _, sound in sounds do sound:Stop() end end
	end
	function api.play(kind)
		if not enabled then return end
		if kind=="click" then
			if os.clock()-lastClick<.05 then return end
			lastClick=os.clock()
		end
		cursor=cursor%#sounds+1
		local sound=sounds[cursor]
		sound:Stop()
		sound.PlaybackSpeed=kind=="error" and .7 or kind=="achievement" and 1.8 or kind=="success" and 1.4 or 1.1
		sound.Volume=kind=="click" and .28 or .5
		sound:Play()
	end
	function api.destroy() for _,sound in sounds do sound:Destroy() end end
	return api
end
