--!strict
-- Fake Roblox environment for the host tests.

local instanceCount = 0

local function newInstance(className)
	instanceCount = instanceCount + 1
	local inst = {
		Name = className .. "_" .. instanceCount,
		Parent = nil,
		ClassName = className,
		Children = {},
		Size = nil,
		Position = nil,
		AnchorPoint = nil,
		BackgroundColor3 = nil,
		BackgroundTransparency = 0,
		TextColor3 = nil,
		TextSize = 32,
		Font = nil,
		TextXAlignment = nil,
		TextTransparency = 0,
		Visible = true,
		ClipsDescendants = false,
		ZIndex = 1,
		Rotation = 0,
		BorderSizePixel = 0,
		BorderColor3 = nil,
		BorderMode = nil,
		LayoutOrder = 0,
		CornerRadius = nil,
		PaddingTop = nil,
		PaddingLeft = nil,
		PaddingRight = nil,
		PaddingBottom = nil,
		FillDirection = nil,
		Padding = nil,
		HorizontalAlignment = nil,
		VerticalAlignment = nil,
		Color = nil,
		Thickness = 0,
		Transparency = 0,
		Text = "",
	}
	-- Emulate Roblox: setting inst.Parent = P appends inst to P.Children;
	-- setting inst.Parent = nil removes it. The host (insertChild) relies on
	-- this to keep the Instance tree in sync with the HostNode tree.
	local function setParent(p)
		local old = inst.Parent
		if old ~= nil then
			for i = #old.Children, 1, -1 do
				if old.Children[i] == inst then
					table.remove(old.Children, i)
					break
				end
			end
		end
		rawset(inst, "Parent", p)
		if p ~= nil then
			table.insert(p.Children, inst)
		end
	end
	local mt = {
		__index = {
			FindFirstChild = function(self, name)
				for _, child in ipairs(self.Children) do
					if child.Name == name then
						return child
					end
				end
				return nil
			end,
			Destroy = function(self)
				setParent(nil)
				for i = #self.Children, 1, -1 do
					setParent(self.Children[i])
					table.remove(self.Children, i)
				end
			end,
		},
		__newindex = function(self, key, value)
			if key == "Parent" then
				setParent(value)
			else
				rawset(self, key, value)
			end
		end,
	}
	setmetatable(inst, mt)
	return inst
end

local UDim2 = {}
UDim2.__index = UDim2
function UDim2.new(xScale, xOffset, yScale, yOffset)
	return setmetatable({ X = { Scale = xScale, Offset = xOffset }, Y = { Scale = yScale, Offset = yOffset } }, UDim2)
end

local UDim = {}
UDim.__index = UDim
function UDim.new(scale, offset)
	return setmetatable({ Scale = scale, Offset = offset }, UDim)
end

local Vector2 = {}
Vector2.__index = Vector2
function Vector2.new(x, y)
	return setmetatable({ X = x, Y = y }, Vector2)
end

local Color3 = {}
Color3.__index = Color3
function Color3.new(r, g, b)
	return setmetatable({ R = r / 255, G = g / 255, B = b / 255 }, Color3)
end

local Enum = {
	Font = {
		Gotham = { Name = "Gotham" },
		GothamBold = { Name = "GothamBold" },
		GothamMedium = { Name = "GothamMedium" },
		Antique = { Name = "Antique" },
		Code = { Name = "Code" },
		IndieFlower = { Name = "IndieFlower" },
	},
	BorderMode = {
		Inset = { Name = "Inset" },
		Outline = { Name = "Outline" },
		Middle = { Name = "Middle" },
	},
	FillDirection = {
		Horizontal = { Name = "Horizontal" },
		Vertical = { Name = "Vertical" },
	},
	HorizontalAlignment = {
		Left = { Name = "Left" },
		Center = { Name = "Center" },
		Right = { Name = "Right" },
	},
	VerticalAlignment = {
		Top = { Name = "Top" },
		Center = { Name = "Center" },
		Bottom = { Name = "Bottom" },
	},
	TextXAlignment = {
		Left = { Name = "Left" },
		Center = { Name = "Center" },
		Right = { Name = "Right" },
	},
	ZIndexBehavior = {
		Sibling = { Name = "Sibling" },
		Global = { Name = "Global" },
	},
}

local env = {
	newInstance = function(className)
		return newInstance(className)
	end,
	newUDim2 = function(xScale, xOffset, yScale, yOffset)
		return UDim2.new(xScale, xOffset, yScale, yOffset)
	end,
	newUDim = function(scale, offset)
		return UDim.new(scale, offset)
	end,
	newVector2 = function(x, y)
		return Vector2.new(x, y)
	end,
	newColor3 = function(r, g, b)
		return Color3.new(r, g, b)
	end,
	enumValue = function(name)
		local parts = {}
		for part in name:gmatch("[^%.]+") do
			table.insert(parts, part)
		end
		if #parts ~= 2 then
			return nil
		end
		local enumTable = Enum[parts[1]]
		if enumTable == nil then
			return nil
		end
		return enumTable[parts[2]]
	end,
	destroy = function(inst)
		local mt = getmetatable(inst)
		if mt and mt.__index and mt.__index.Destroy then
			mt.__index.Destroy(inst)
		end
	end,
}

local function strOp(s, op, a, b)
	if op == "trim" then
		return (s:match("^%s*(.-)%s*$"))
	elseif op == "lower" then
		return s:lower()
	elseif op == "sub" then
		if b == nil then
			return s:sub(a)
		end
		return s:sub(a, b)
	elseif op == "gsub" then
		return (s:gsub(a, b))
	end
	return s
end

local function strMatch(s, pattern)
	return s:match(pattern)
end

local function strSplit(s, sep)
	local parts = {}
	if sep == " " then
		for part in s:gmatch("%S+") do
			table.insert(parts, part)
		end
	else
		for part in (s .. sep):gmatch("([^" .. sep .. "]*)" .. sep) do
			table.insert(parts, part)
		end
	end
	return parts
end

local function objKeys(obj)
	local keys = {}
	for k in pairs(obj) do
		table.insert(keys, k)
	end
	return keys
end

local _isNaN = function(n) return n ~= n end
local _parseFloat = function(s) return tonumber(s) end
local _parseInt = function(s, base)
	if base == 16 then
		return tonumber(s, 16) or 0
	end
	return math.floor(tonumber(s) or 0)
end
local _Number = { isNaN = _isNaN }

return {
	env = env,
	strOp = strOp,
	strMatch = strMatch,
	strSplit = strSplit,
	objKeys = objKeys,
	isNaN = _isNaN,
	parseFloat = _parseFloat,
	parseInt = _parseInt,
	Number = _Number,
	Math = { round = math.floor },
	Enum = Enum,
	UDim2 = UDim2,
	UDim = UDim,
	Vector2 = Vector2,
	Color3 = Color3,
}
