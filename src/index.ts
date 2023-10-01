/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */

import * as str from './_modules/string'
import * as num from './_modules/number'
import * as datetime from './_modules/datetime'
import * as is from './_modules/is'
import * as object from './_modules/object'
import * as collection from './_modules/collection'
import * as array from './_modules/array'
import * as math from './_modules/math'
import * as utils from './_modules/utils'
import * as functions from './_modules/function'
import * as template from './_modules/template'
import * as tree from './_modules/tree'

import { myfx,FuncChain } from "./_modules/func";
import mixin from "./utils/mixin";

export * from './_modules/string'
export * from './_modules/number'
export * from './_modules/datetime'
export * from './_modules/is'
export * from './_modules/object'
export * from './_modules/array'
export * from './_modules/collection'
export * from './_modules/math'
export * from './_modules/utils'
export * from './_modules/function'
export * from './_modules/tree'
export * from './_modules/template'

mixin(FuncChain,{
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

mixin(myfx, {
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

(myfx as any).VERSION = '1.1.0';//version
/**
 * 显式开启myfx的函数链，返回一个包裹了参数v的myfx链式对象。
 * <p>
 * 函数链使用惰性计算 —— 直到显示调用value()方法时，函数链才会进行计算并返回结果
 * </p>
 * @example
 * //3-5
 * console.log(_.chain([1,2,3,4]).map(v=>v+1).filter(v=>v%2!==0).take(2).join('-').value())
 *
 * @param v
 * @returns myfx对象
 */
(myfx as any).chain = myfx

//bind _
const ctx = globalThis as any
if(ctx.myff){
  setTimeout(function(){
    ctx.__f_prev = ctx._
    ctx._ = ctx.myfx = myfx
  },0);
}

export default myfx
