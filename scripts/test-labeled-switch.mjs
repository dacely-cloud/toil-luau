import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default ?? traverseModule;
const generate=generateModule.default ?? generateModule;
const source=parse(fs.readFileSync('scripts/tame-vendor.mjs','utf8'),{sourceType:'module'});
const helpers=source.program.body.filter(n=>n.type==='FunctionDeclaration' && ['targetsLabel','desugarLabels','desugarOneLabel'].includes(n.id.name) || n.type==='VariableDeclaration' && n.declarations.some(d=>d.id.name==='LOOP_TYPES'));
const context=vm.createContext({t,traverse,Set,Map});
vm.runInContext(helpers.map(n=>generate(n).code).join('\n')+'\nthis.convert=desugarLabels;',context);
for(const code of [
`let result=[]; outer: { switch(1) { case 1: result.push('suspend'); break outer; } result.push('WRONG COMMIT'); } result;`,
`let result=[]; outer: for(let i=0;i<3;i++){ switch(i){case 1: continue outer;case 2:break outer;} result.push(i); } result;`,
`let result=[]; outer: { for(let i=0;i<2;i++){switch(i){case 1:break outer;}result.push(i);} result.push('WRONG');} result;`,
`let result=[]; outer: { switch(1){case 1:switch(2){case 2:break outer;}result.push('WRONG');}result.push('WRONG');}result;`
]){
 const expected=JSON.stringify(vm.runInNewContext(code));
 const ast=parse(code);context.convert(ast,{labels:0,labelJumps:0,labelChecks:0});
 const actual=JSON.stringify(vm.runInNewContext(generate(ast).code));
 assert.equal(actual,expected,generate(ast).code);
}
console.log('PASS labeled break/continue through switches, loops and nested switches preserve control flow');
