import _eq from "../_eq";
import isDate from "./isDate";
import isElement from "./isElement";
import isFunction from "./isFunction";
import isMap from "./isMap";
import isObject from "./isObject";
import isRegExp from "./isRegExp";
import isSet from "./isSet";

const MAX_DEPTH = 128;
const hasOwn = Object.prototype.hasOwnProperty;

function isEqualWithInternal(a: any, b: any, comparator: Function | undefined, depth: number, visited: WeakMap<object, WeakMap<object, boolean>>): boolean {
  if (depth > MAX_DEPTH) return false

  let cptor = comparator
  if (!isObject(a) || !isObject(b)) {
    return (cptor || _eq)(a, b)
  }

  if (isDate(a) && isDate(b)) return cptor ? cptor(a, b) : a.getTime() === b.getTime()
  if (isRegExp(a) && isRegExp(b)) return cptor ? cptor(a, b) : a.toString() === b.toString()

  if (isMap(a) || isMap(b)) {
    if (!isMap(a) || !isMap(b)) return false
    if (a.size !== b.size) return false
    const nextDepth = depth + 1
    let bMap = visited.get(a)
    if (!bMap) {
      bMap = new WeakMap()
      visited.set(a, bMap)
    } else if (bMap.has(b)) {
      return true
    }
    bMap.set(b, true)
    for (const [k, v] of a) {
      if (!b.has(k)) return false
      if (!isEqualWithInternal(v, b.get(k), cptor, nextDepth, visited)) return false
    }
    return true
  }
  if (isSet(a) || isSet(b)) {
    if (!isSet(a) || !isSet(b)) return false
    if (a.size !== b.size) return false
    for (const v of a) {
      if (!b.has(v)) return false
    }
    return true
  }
  if (ArrayBuffer.isView(a) || ArrayBuffer.isView(b)) {
    if (!ArrayBuffer.isView(a) || !ArrayBuffer.isView(b)) return false
    const ta = a as any
    const tb = b as any
    if (ta.length !== tb.length) return false
    const nextDepth = depth + 1
    for (let i = 0; i < ta.length; i++) {
      if (!isEqualWithInternal(ta[i], tb[i], cptor, nextDepth, visited)) return false
    }
    return true
  }

  const aKeys = Object.keys(a)
  if (aKeys.length !== Object.keys(b).length) return false
  const aSyms = Object.getOwnPropertySymbols(a)
  if (aSyms.length !== Object.getOwnPropertySymbols(b).length) return false

  if (isElement(a) && isElement(b)) {
    if (a.tagName && b.tagName) {
      const tagA = a.tagName.toLowerCase()
      const tagB = b.tagName.toLowerCase()
      if (tagA !== tagB) return false
      if (a.id !== b.id) return false
      const classListA = a.classList
      const classListB = b.classList
      if (classListA && classListB) {
        if (classListA.length !== classListB.length) return false
        for (let i = 0; i < classListA.length; i++) {
          if (classListA[i] !== classListB[i]) return false
        }
      }
      return cptor ? cptor(a, b) : true
    }
  }
  if (isFunction(a) && isFunction(b)) return cptor ? cptor(a, b) : a.name === b.name

  const pairKey = a
  let bMap = visited.get(pairKey)
  if (!bMap) {
    bMap = new WeakMap()
    visited.set(pairKey, bMap)
  } else if (bMap.has(b)) {
    return true
  }
  bMap.set(b, true)

  const nextDepth = depth + 1
  for (let i = aKeys.length; i--;) {
    const k = aKeys[i]
    if (!hasOwn.call(b, k)) return false
    const v1 = (a as any)[k]
    const v2 = (b as any)[k]
    if (!isEqualWithInternal(v1, v2, cptor, nextDepth, visited)) {
      return false
    }
  }
  for (let i = 0; i < aSyms.length; i++) {
    const s = aSyms[i]
    if (!hasOwn.call(b, s)) return false
    if (!isEqualWithInternal((a as any)[s], (b as any)[s], cptor, nextDepth, visited)) {
      return false
    }
  }

  return true
}

/**
 * 同<code>isEqual</code>，但支持自定义比较器。如果未指定比较器则使用内置逻辑处理  
 * 内置逻辑:  
 *  - 如果是日期使用getTime对比
 *  - 如果是正则使用toString对比
 *  - 如果是元素节点使用tagName+id+class对比
 *  - 如果是函数使用name对比
 * @example
 * //true
 * console.log(_.isEqualWith([new Date('2010-2-1'),'abcd'],['2010/2/1','Abcd'],(av,bv)=>_.isDate(av)?av.toLocaleDateString() == bv:_.test(av,bv,'i')))
 *
 * @param a
 * @param b
 * @param [comparator] 比较器，参数(v1,v2)，返回true表示匹配。如果返回undefined使用对应内置比较器处理
 * @param _depth 内部递归深度计数器
 * @returns
 * @since 1.0.0
 */
function isEqualWith(a: any, b: any, comparator?: Function, _depth = 0): boolean {
  const visited = new WeakMap<object, WeakMap<object, boolean>>()
  return isEqualWithInternal(a, b, comparator, _depth, visited)
}

export default isEqualWith