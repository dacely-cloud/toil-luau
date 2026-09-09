// Repeatable read-only code audit. Uses the existing compiled engine in out/;
// Studio/device checks and live product prices remain separate checks.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const binary=process.env.LUAU_BIN || path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
const env={...process.env,LUAU_BIN:binary};
const run=(binary,args)=>execFileSync(binary,args,{stdio:'inherit',env});
const specs=fs.readdirSync('cookie-clicker').filter(n=>n.endsWith('.spec.luau')).sort();
run(binary,specs.map(n=>path.join('cookie-clicker',n)));
const views=fs.readdirSync('scripts').filter(n=>/^test-cookie-.*\.mjs$/.test(n)).sort();
for(const file of views)run(process.execPath,[path.join('scripts',file)]);
run(process.execPath,['scripts/run-native.mjs','spike','host','css','host-translator']);
for(const file of ['test-labeled-switch.mjs','test-resumed-bailout.mjs'])run(process.execPath,[path.join('scripts',file)]);
console.log(`Audit passed: ${specs.length} game suites, ${views.length} UI suites, four engine suites, two compiler/reconciler checks.`);
