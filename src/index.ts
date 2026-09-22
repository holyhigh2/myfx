/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */

import append from "./array/append";
import chunk from "./array/chunk";
import compact from "./array/compact";
import concat from "./array/concat";
import except from "./array/except";
import fill from "./array/fill";
import findIndex from "./array/findIndex";
import findLastIndex from "./array/findLastIndex";
import flat from "./array/flat";
import flatDeep from "./array/flatDeep";
import insert from "./array/insert";
import intersect from "./array/intersect";
import join from "./array/join";
import pop from "./array/pop";
import pull from "./array/pull";
import range from "./array/range";
import remove from "./array/remove";
import reverse from "./array/reverse";
import slice from "./array/slice";
import sortedIndex from "./array/sortedIndex";
import sortedIndexBy from "./array/sortedIndexBy";
import union from "./array/union";
import uniq from "./array/uniq";
import uniqBy from "./array/uniqBy";
import unzip from "./array/unzip";
import without from "./array/without";
import zip from "./array/zip";
import zipObject from "./array/zipObject";
import zipWith from "./array/zipWith";
import countBy from "./collection/countBy";
import each from "./collection/each";
import eachRight from "./collection/eachRight";
import every from "./collection/every";
import filter from "./collection/filter";
import find from "./collection/find";
import findLast from "./collection/findLast";
import first from "./collection/first";
import flatMap from "./collection/flatMap";
import flatMapDeep from "./collection/flatMapDeep";
import groupBy from "./collection/groupBy";
import includes from "./collection/includes";
import initial from "./collection/initial";
import keyBy from "./collection/keyBy";
import last from "./collection/last";
import map from "./collection/map";
import partition from "./collection/partition";
import reduce from "./collection/reduce";
import reject from "./collection/reject";
import sample from "./collection/sample";
import sampleSize from "./collection/sampleSize";
import shuffle from "./collection/shuffle";
import size from "./collection/size";
import some from "./collection/some";
import sort from "./collection/sort";
import sortBy from "./collection/sortBy";
import tail from "./collection/tail";
import take from "./collection/take";
import takeRight from "./collection/takeRight";
import toArray from "./collection/toArray";
import addTime from "./datetime/addTime";
import compareDate from "./datetime/compareDate";
import formatDate from "./datetime/formatDate";
import getDayOfYear from "./datetime/getDayOfYear";
import getWeekOfMonth from "./datetime/getWeekOfMonth";
import getWeekOfYear from "./datetime/getWeekOfYear";
import isLeapYear from "./datetime/isLeapYear";
import isSameDay from "./datetime/isSameDay";
import now from "./datetime/now";
import toDate from "./datetime/toDate";
import after from "./function/after";
import alt from "./function/alt";
import bind from "./function/bind";
import bindAll from "./function/bindAll";
import call from "./function/call";
import compose from "./function/compose";
import debounce from "./function/debounce";
import delay from "./function/delay";
import fval from "./function/fval";
import once from "./function/once";
import partial from "./function/partial";
import tap from "./function/tap";
import throttle from "./function/throttle";
import isAlnum from "./is/isAlnum";
import isAlpha from "./is/isAlpha";
import isArray from "./is/isArray";
import isArrayLike from "./is/isArrayLike";
import isBlank from "./is/isBlank";
import isBoolean from "./is/isBoolean";
import isCustomElement from "./is/isCustomElement";
import isDate from "./is/isDate";
import isDefined from "./is/isDefined";
import isElement from "./is/isElement";
import isEmpty from "./is/isEmpty";
import isEqual from "./is/isEqual";
import isEqualWith from "./is/isEqualWith";
import isError from "./is/isError";
import isFinite from "./is/isFinite";
import isFunction from "./is/isFunction";
import isInteger from "./is/isInteger";
import isIterator from "./is/isIterator";
import isLowerCaseChar from "./is/isLowerCaseChar";
import isMap from "./is/isMap";
import isMatch from "./is/isMatch";
import isMatchWith from "./is/isMatchWith";
import isNaN from "./is/isNaN";
import isNative from "./is/isNative";
import isNil from "./is/isNil";
import isNode from "./is/isNode";
import isNull from "./is/isNull";
import isNumber from "./is/isNumber";
import isNumeric from "./is/isNumeric";
import isObject from "./is/isObject";
import isPlainObject from "./is/isPlainObject";
import isPrimitive from "./is/isPrimitive";
import isRegExp from "./is/isRegExp";
import isSafeInteger from "./is/isSafeInteger";
import isSet from "./is/isSet";
import isString from "./is/isString";
import isSymbol from "./is/isSymbol";
import isUndefined from "./is/isUndefined";
import isUpperCaseChar from "./is/isUpperCaseChar";
import isWeakMap from "./is/isWeakMap";
import isWeakSet from "./is/isWeakSet";
import add from "./math/add";
import divide from "./math/divide";
import max from "./math/max";
import mean from "./math/mean";
import median from "./math/median";
import min from "./math/min";
import minmax from "./math/minmax";
import multiply from "./math/multiply";
import randf from "./math/randf";
import randi from "./math/randi";
import subtract from "./math/subtract";
import sum from "./math/sum";
import formatNumber from "./number/formatNumber";
import gt from "./number/gt";
import gte from "./number/gte";
import inRange from "./number/inRange";
import lt from "./number/lt";
import lte from "./number/lte";
import toInteger from "./number/toInteger";
import toNumber from "./number/toNumber";
import assign from "./object/assign";
import assignWith from "./object/assignWith";
import clone from "./object/clone";
import cloneDeep from "./object/cloneDeep";
import cloneDeepWith from "./object/cloneDeepWith";
import cloneWith from "./object/cloneWith";
import defaults from "./object/defaults";
import defaultsDeep from "./object/defaultsDeep";
import eq from "./object/eq";
import findKey from "./object/findKey";
import fromPairs from "./object/fromPairs";
import functions from "./object/functions";
import get from "./object/get";
import has from "./object/has";
import keys from "./object/keys";
import keysIn from "./object/keysIn";
import merge from "./object/merge";
import mergeWith from "./object/mergeWith";
import omit from "./object/omit";
import omitBy from "./object/omitBy";
import parseJSON from "./object/parseJSON";
import pick from "./object/pick";
import pickBy from "./object/pickBy";
import prop from "./object/prop";
import set from "./object/set";
import toObject from "./object/toObject";
import toPairs from "./object/toPairs";
import unset from "./object/unset";
import values from "./object/values";
import valuesIn from "./object/valuesIn";
import camelCase from "./string/camelCase";
import capitalize from "./string/capitalize";
import endsWith from "./string/endsWith";
import escapeRegExp from "./string/escapeRegExp";
import indexOf from "./string/indexOf";
import kebabCase from "./string/kebabCase";
import lastIndexOf from "./string/lastIndexOf";
import lowerCase from "./string/lowerCase";
import lowerFirst from "./string/lowerFirst";
import padEnd from "./string/padEnd";
import padStart from "./string/padStart";
import padZ from "./string/padZ";
import pascalCase from "./string/pascalCase";
import repeat from "./string/repeat";
import replace from "./string/replace";
import replaceAll from "./string/replaceAll";
import snakeCase from "./string/snakeCase";
import split from "./string/split";
import startsWith from "./string/startsWith";
import substring from "./string/substring";
import test from "./string/test";
import toFixed from "./string/toFixed";
import toString from "./string/toString";
import trim from "./string/trim";
import trimEnd from "./string/trimEnd";
import trimStart from "./string/trimStart";
import truncate from "./string/truncate";
import upperCase from "./string/upperCase";
import upperFirst from "./string/upperFirst";
import template from "./template/template";
import arrayToTree from "./tree/arrayToTree";
import closest from "./tree/closest";
import filterTree from "./tree/filterTree";
import findTreeNode from "./tree/findTreeNode";
import findTreeNodes from "./tree/findTreeNodes";
import sortTree from "./tree/sortTree";
import walkTree from "./tree/walkTree";
import alphaId from "./utils/alphaId";
import defaultTo from "./utils/defaultTo";
import identity from "./utils/identity";
import iteratee from "./utils/iteratee";
import matcher from "./utils/matcher";
import mixin from "./utils/mixin";
import noop from "./utils/noop";
import snowflakeId from "./utils/snowflakeId";
import times from "./utils/times";
import toPath from "./utils/toPath";
import uniqueId from "./utils/uniqueId";
import uuid from "./utils/uuid";

import { FuncChain } from "./chain";

export {
  append,chunk,compact,concat,except,fill,findIndex,findLastIndex,flat,flatDeep,insert,intersect,join,pop,pull,range,remove,reverse,slice,sortedIndex,sortedIndexBy,union,uniq,uniqBy,unzip,without,zip,zipObject,zipWith,
  countBy,each,eachRight,every,filter,find,findLast,first,flatMap,flatMapDeep,groupBy,includes,initial,keyBy,last,map,partition,reduce,reject,sample,sampleSize,shuffle,size,some,sort,sortBy,tail,take,takeRight,toArray,
  addTime,compareDate,formatDate,getDayOfYear,getWeekOfMonth,getWeekOfYear,isLeapYear,isSameDay,now,toDate,
  after,alt,bind,bindAll,call,compose,debounce,delay,fval,once,partial,tap,throttle,
  isAlnum,isAlpha,isArray,isArrayLike,isBlank,isBoolean,isCustomElement,isDate,isDefined,isElement,isEmpty,isEqual,isEqualWith,isError,isFinite,isFunction,isInteger,isIterator,isLowerCaseChar,isMap,isMatch,isMatchWith,isNaN,isNative,isNil,isNode,isNull,isNumber,isNumeric,isObject,isPlainObject,isPrimitive,isRegExp,isSafeInteger,isSet,isString,isSymbol,isUndefined,isUpperCaseChar,isWeakMap,isWeakSet,
  add,divide,max,mean,median,min,minmax,multiply,randf,randi,subtract,sum,
  formatNumber,gt,gte,inRange,lt,lte,toInteger,toNumber,
  assign,assignWith,clone,cloneDeep,cloneDeepWith,cloneWith,defaults,defaultsDeep,eq,findKey,fromPairs,functions,get,has,keys,keysIn,merge,mergeWith,omit,omitBy,parseJSON,pick,pickBy,prop,set,toObject,toPairs,unset,values,valuesIn,
  camelCase,capitalize,endsWith,escapeRegExp,indexOf,kebabCase,lastIndexOf,lowerCase,lowerFirst,padEnd,padStart,padZ,pascalCase,repeat,replace,replaceAll,snakeCase,split,startsWith,substring,test,toFixed,toString,trim,trimEnd,trimStart,truncate,upperCase,upperFirst,
  template,
  arrayToTree,closest,filterTree,findTreeNode,findTreeNodes,sortTree,walkTree,
  alphaId,defaultTo,identity,iteratee,matcher,mixin,noop,snowflakeId,times,toPath,uniqueId,uuid
};

export type { ArrayLike, Collection, INode, IList, IOptions, NonFuncItee, UnknownMapKey } from "./types";
export type { DebouncedFunction } from "./function/debounce";
export type { FuncChain } from "./chain";

export const VERSION = "#ver#"; //#ver

/**
* 显式开启myfx的函数链，返回一个包裹了参数v的myfx链式对象。函数链可以链接Myfx提供的所有函数，如
 <p>
* 函数链使用惰性计算 —— 直到显示调用value()方法时，函数链才会进行计算并返回结果
</p>
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
export function chain<T>(v: T): FuncChain<T> {
  return (v instanceof FuncChain ? v : new FuncChain(v)) as FuncChain<T>;
}

const api = {
  append,chunk,compact,concat,except,fill,findIndex,findLastIndex,flat,flatDeep,insert,intersect,join,pop,pull,range,remove,reverse,slice,sortedIndex,sortedIndexBy,union,uniq,uniqBy,unzip,without,zip,zipObject,zipWith,
  countBy,each,eachRight,every,filter,find,findLast,first,flatMap,flatMapDeep,groupBy,includes,initial,keyBy,last,map,partition,reduce,reject,sample,sampleSize,shuffle,size,some,sort,sortBy,tail,take,takeRight,toArray,
  addTime,compareDate,formatDate,getDayOfYear,getWeekOfMonth,getWeekOfYear,isLeapYear,isSameDay,now,toDate,
  after,alt,bind,bindAll,call,compose,debounce,delay,fval,once,partial,tap,throttle,
  isAlnum,isAlpha,isArray,isArrayLike,isBlank,isBoolean,isCustomElement,isDate,isDefined,isElement,isEmpty,isEqual,isEqualWith,isError,isFinite,isFunction,isInteger,isIterator,isLowerCaseChar,isMap,isMatch,isMatchWith,isNaN,isNative,isNil,isNode,isNull,isNumber,isNumeric,isObject,isPlainObject,isPrimitive,isRegExp,isSafeInteger,isSet,isString,isSymbol,isUndefined,isUpperCaseChar,isWeakMap,isWeakSet,
  add,divide,max,mean,median,min,minmax,multiply,randf,randi,subtract,sum,
  formatNumber,gt,gte,inRange,lt,lte,toInteger,toNumber,
  assign,assignWith,clone,cloneDeep,cloneDeepWith,cloneWith,defaults,defaultsDeep,eq,findKey,fromPairs,functions,get,has,keys,keysIn,merge,mergeWith,omit,omitBy,parseJSON,pick,pickBy,prop,set,toObject,toPairs,unset,values,valuesIn,
  camelCase,capitalize,endsWith,escapeRegExp,indexOf,kebabCase,lastIndexOf,lowerCase,lowerFirst,padEnd,padStart,padZ,pascalCase,repeat,replace,replaceAll,snakeCase,split,startsWith,substring,test,toFixed,toString,trim,trimEnd,trimStart,truncate,upperCase,upperFirst,
  template,
  arrayToTree,closest,filterTree,findTreeNode,findTreeNodes,sortTree,walkTree,
  alphaId,defaultTo,identity,iteratee,matcher,mixin,noop,snowflakeId,times,toPath,uniqueId,uuid
};

mixin(FuncChain, { ...api });

const myfx = {
  VERSION: VERSION,
  chain,
  ...api,
};

export default myfx
