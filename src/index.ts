/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */

import * as str from './string'
import * as num from './number'
import * as datetime from './datetime'
import * as is from './is'
import * as object from './object'
import * as collection from './collection'
import * as array from './array'
import * as math from './math'
import * as utils from './utils'
import * as functions from './function'
import * as template from './template/template'
import * as tree from './tree'

import { myfx,FuncChain } from "./func";
import mixin from "./utils/mixin";

export * from './string'
export * from './number'
export * from './datetime'
export * from './is'
export * from './object'
export * from './array'
export * from './collection'
export * from './math'
export * from './utils'
export * from './function'
export * from './tree'
export * from './template/template'

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

(myfx as any).VERSION = '1.0.2';//version
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
    ctx._ = myfx
  },0);
}

export default myfx
