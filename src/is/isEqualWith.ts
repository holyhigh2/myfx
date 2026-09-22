import _eq from "../_eq";
import isDate from "./isDate";
import isElement from "./isElement";
import isFunction from "./isFunction";
import isObject from "./isObject";
import isRegExp from "./isRegExp";

const MAX_DEPTH = 128;

function isEqualWithInternal(a: any, b: any, comparator: Function | undefined, depth: number, visited: WeakMap<object, WeakMap<object, boolean>>): boolean {
  if (depth > MAX_DEPTH) return true

  let cptor = comparator
  if (!isObject(a) || !isObject(b)) {
    return (cptor || _eq)(a, b)
  }

  if (isDate(a) && isDate(b)) return cptor ? cptor(a, b) : a.getTime() === b.getTime()
  if (isRegExp(a) && isRegExp(b)) return cptor ? cptor(a, b) : a.toString() === b.toString()

  const aKeys = Object.keys(a)
  if (aKeys.length !== Object.keys(b).length) return false

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
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false
    const v1 = (a as any)[k]
    const v2 = (b as any)[k]
    if (!isEqualWithInternal(v1, v2, cptor, nextDepth, visited)) {
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