-- Small reusable sound pool; uses a bundled Roblox UI sound, no external asset.
return function()
	local sounds = {}
	local cueVolumes = {}
	local enabled, cursor, lastClick = true, 0, 0
	local volume=1
	for i=1,6 do
		local sound=Instance.new("Sound")
		sound.Name="CookieCue"..i
		sound.SoundId="rbxasset://sounds/volume_slider.ogg"
		sound.Volume=.5
		sound.Parent=game:GetService("SoundService")
		sounds[i]=sound
		cueVolumes[i]=.5
	end
	local api={}
	function api.setVolume(percent)
		volume=math.clamp(percent,0,100)/100
		for i,sound in sounds do
			sound.Volume=cueVolumes[i]*volume
			if volume==0 then sound:Stop() end
		end
	end
	function api.setEnabled(value)
		enabled=value
		if not enabled then for _, sound in sounds do sound:Stop() end end
	end
	function api.play(kind)
		if not enabled or volume==0 then return end
		if kind=="click" then
			if os.clock()-lastClick<.05 then return end
			lastClick=os.clock()
		end
		cursor=cursor%#sounds+1
		local sound=sounds[cursor]
		sound:Stop()
		sound.PlaybackSpeed=kind=="error" and .7 or kind=="achievement" and 1.8 or kind=="success" and 1.4 or 1.1
		cueVolumes[cursor]=kind=="click" and .28 or .5
		sound.Volume=cueVolumes[cursor]*volume
		sound:Play()
	end
	function api.destroy() for _,sound in sounds do sound:Destroy() end end
	return api
end
