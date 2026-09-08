// Run after stage-studio.mjs. Preserves the demo source while replacing its
// staged entry point with Cookie Clicker and adding the game's modules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = path.join(root, '.studio-stage');
const game = path.join(root, 'cookie-clicker');
fs.mkdirSync(path.join(stage, 'CookieClicker'), { recursive: true });
fs.mkdirSync(path.join(stage, 'ServerScriptService'), { recursive: true });
for (const name of ['Model', 'App', 'Persistence', 'Audio', 'Layout', 'Icons', 'LateGame', 'Economy', 'Social']) fs.copyFileSync(path.join(game, name + '.luau'), path.join(stage, 'CookieClicker', name + '.luau'));
fs.copyFileSync(path.join(game, 'Bootstrap.client.luau'), path.join(stage, 'StarterPlayerScripts', 'ToilDemo.client.luau'));
fs.copyFileSync(path.join(game, 'Server.server.luau'), path.join(stage, 'ServerScriptService', 'CookieClickerServer.server.luau'));
console.log('Cookie Clicker staged. Sync existing instances with node scripts/stage-to-sync.mjs.');
