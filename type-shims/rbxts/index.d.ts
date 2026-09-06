/**
 * Type package for `types: ["rbxts"]` in tsconfig.json.
 * Resolved via typeRoots ("type-shims") because @rbxts does not ship
 * an `rbxts` package of its own. Pulls in the full Roblox platform
 * typings, which in turn reference @rbxts/compiler-types.
 */
/// <reference types="@rbxts/types" />