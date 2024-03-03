/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */

import * as str from "./_modules/string";
import * as num from "./_modules/number";
import * as datetime from "./_modules/datetime";
import * as is from "./_modules/is";
import * as object from "./_modules/object";
import * as collection from "./_modules/collection";
import * as array from "./_modules/array";
import * as math from "./_modules/math";
import * as utils from "./_modules/utils";
import * as functions from "./_modules/function";
import * as template from "./_modules/template";
import * as tree from "./_modules/tree";

import { FuncChain } from "./_modules/func";
import mixin from "./utils/mixin";

export * from "./_modules/string";
export * from "./_modules/number";
export * from "./_modules/datetime";
export * from "./_modules/is";
export * from "./_modules/object";
export * from "./_modules/array";
export * from "./_modules/collection";
export * from "./_modules/math";
export * from "./_modules/utils";
export * from "./_modules/function";
export * from "./_modules/tree";
export * from "./_modules/template";

export const VERSION = "1.3.2"; //#ver

/**
* 显式开启myfx的函数链，返回一个包裹了参数v的myfx链式对象。函数链可以链接Myfx提供的所有函数，如
 <p>
* 函数链使用惰性计算 —— 直到显示调用value()方法时，函数链才会进行计算并返回结果
* </p>
```js
_.chain([1,2,3,4]).map(v=>v+1).filter(v=>v%2===0).take(2).join('-').value()
```

* 函数链与直接调用方法的区别不仅在于可以链式调用，更在于函数链是基于惰性求值的。
* 上式中必须通过显式调用`value()`方法才能获取结果，
* 而只有在`value()`方法调用时整个函数链才进行求值。
* 
* 
* 惰性求值允许FuncChain实现捷径融合(shortcut fusion) —— 一项基于已有函数对数组循环次数进行大幅减少以提升性能的优化技术。
* 下面的例子演示了原生函数链和Myfx函数链的性能差异
* @example
* let ary = _.range(20000000);
console.time('native');
let c = 0;
let a = ary.map((v)=>{
   c++;
   return v+1;
 }).filter((v) => {
   c++;
   return v%2==0;
 })
 .reverse()
 .slice(1, 4)
console.timeEnd('native');
console.log(a, c, '次');//大约600ms左右，循环 40000000 次

//Myfx
ary = _.range(20000000);
console.time('Myfx');
let x = 0;
let targets = _(ary)
 .map((v) => {
   x++;
   return v+1;
 })
 .filter((v) => {
   x++;
   return v%2==0;
 })
 .reverse()
 .slice(1, 4)
 .value();
console.timeEnd('Myfx');
console.log(targets, x, '次');//大约0.5ms左右，循环 18 次
*
* @param v
* @returns Myfx对象
*/
export function chain(v: any): FuncChain<any> {
  return v instanceof FuncChain ? v : new FuncChain(v);
}

mixin(FuncChain, {
  ...str,
  ...num,
  ...datetime,
  ...is,
  ...object,
  ...collection,
  ...math,
  ...utils,
  ...functions,
  ...array,
  ...template,
  ...tree,
});

const myfx = {
  VERSION: VERSION,
  chain,
  ...str,
  ...num,
  ...datetime,
  ...is,
  ...object,
  ...collection,
  ...math,
  ...utils,
  ...functions,
  ...array,
  ...template,
  ...tree,
};

//bind _
const ctx = globalThis as any;
if (ctx.myff) {
  setTimeout(function () {
    ctx.__f_prev = ctx._;
    ctx._ = ctx.myfx = myfx;
  }, 0);
}

export default myfx;
