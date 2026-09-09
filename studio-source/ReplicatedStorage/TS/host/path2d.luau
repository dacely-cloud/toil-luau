-- toil-luau: install the JS-semantics runtime into this module's environment.
do
	local _rt = require(game:GetService("ReplicatedStorage"):WaitForChild("ToilRuntime"))
	local _env = getfenv(0)
	for _k, _v in pairs(_rt) do
		if rawget(_env, _k) == nil then
			_env[_k] = _v
		end
	end
end
-- Compiled with roblox-ts v3.0.0
--* Native Roblox Path2D. Coordinates and tangents are relative to its GUI parent. 
return nil
