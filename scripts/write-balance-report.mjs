import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const exe=process.env.LUAU_BIN || path.join(os.homedir(),'.luau','bin',process.platform==='win32'?'luau.exe':'luau');
for(const [script,report] of [['balance-audit','BALANCE-TABLES.txt'],['simulate-balance','BALANCE-SIMULATION.txt']]) {
  const output=execFileSync(exe,[`scripts/${script}.luau`],{encoding:'utf8'});
  fs.writeFileSync(`cookie-clicker/${report}`,output);
  console.log(`Wrote ${report}`);
}
