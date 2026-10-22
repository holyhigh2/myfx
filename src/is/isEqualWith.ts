import _eq from "../_eq";
import isElement from "./isElement";
import isFunction from "./isFunction";
import isMap from "./isMap";
import isObject from "./isObject";
import isSet from "./isSet";

const MAX_DEPTH = 128;
const hasOwn = Object.prototype.hasOwnProperty;
const objToString = Object.prototype.toString;

/**
 * comparator优先，返回undefined时回退内置比较器（文档承诺），返回值收敛为boolean
 */
function compareWithFallback(a: any, b: any, cptor: Function | undefined, builtin: () => boolean): boolean {
  if (cptor) {
    const r = cptor(a, b)
    if (r !== undefined) return !!r
  }
  return builtin()
}

function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function isEqualWithInternal(a: any, b: any, comparator: Function | undefined, depth: number, visited: WeakMap<object, WeakMap<object, boolean>>): boolean {
  if (depth > MAX_DEPTH) return false

  let cptor = comparator
  if (!isObject(a) || !isObject(b)) {
    return compareWithFallback(a, b, cptor, () => _eq(a, b))
  }

  // 内建类型交叉校验：tag不同直接false（Date vs {} / RegExp vs {} / 数组 vs 对象 等）
  const tag = objToString.call(a)
  if (tag !== objToString.call(b)) return false

  if (tag === '[object Date]') {
    const da = a as Date
    const db = b as Date
    return compareWithFallback(a, b, cptor, () => da.getTime() === db.getTime())
  }
  if (tag === '[object RegExp]') {
    return compareWithFallback(a, b, cptor, () => a.toString() === b.toString())
  }
  if (
    tag === '[object Number]' || tag === '[object String]' || tag === '[object Boolean]' ||
    tag === '[object Symbol]' || tag === '[object BigInt]'
  ) {
    // 包装原语按valueOf比较
    return compareWithFallback(a, b, cptor, () => _eq(a.valueOf(), b.valueOf()))
  }
  if (tag === '[object Error]') {
    const ea = a as Error
    const eb = b as Error
    return compareWithFallback(a, b, cptor, () => ea.name === eb.name && ea.message === eb.message)
  }
  if (tag === '[object ArrayBuffer]') {
    const aba = a as ArrayBuffer
    const bbb = b as ArrayBuffer
    if (aba.byteLength !== bbb.byteLength) return false
    return compareWithFallback(a, b, cptor, () => bytesEqual(new Uint8Array(aba), new Uint8Array(bbb)))
  }
  if (tag === '[object DataView]') {
    const da = a as DataView
    const db = b as DataView
    if (da.byteLength !== db.byteLength) return false
    return compareWithFallback(a, b, cptor, () => bytesEqual(
      new Uint8Array(da.buffer, da.byteOffset, da.byteLength),
      new Uint8Array(db.buffer, db.byteOffset, db.byteLength)
    ))
  }

  if (isMap(a)) {
    const ma = a as Map<any, any>
    const mb = b as Map<any, any>
    if (ma.size !== mb.size) return false
    const nextDepth = depth + 1
    let bMap = visited.get(a)
    if (!bMap) {
      bMap = new WeakMap()
      visited.set(a, bMap)
    } else if (bMap.has(b)) {
      return true
    }
    bMap.set(b, true)
    const bEntries = Array.from(b as Map<any, any>)
    const matched = new Set<number>()
    const pending: Array<[any, any]> = []
    for (const [k, v] of a as Map<any, any>) {
      let hit = -1
      for (let i = 0; i < bEntries.length; i++) {
        if (!matched.has(i) && _eq(bEntries[i][0], k)) {
          hit = i
          break
        }
      }
      if (hit >= 0 && isEqualWithInternal(v, bEntries[hit][1], cptor, nextDepth, visited)) {
        matched.add(hit)
      } else {
        pending.push([k, v])
      }
    }
    for (const [k, v] of pending) {
      let found = false
      for (let i = 0; i < bEntries.length; i++) {
        if (matched.has(i)) continue
        if (
          isEqualWithInternal(k, bEntries[i][0], cptor, nextDepth, visited) &&
          isEqualWithInternal(v, bEntries[i][1], cptor, nextDepth, visited)
        ) {
          matched.add(i)
          found = true
          break
        }
      }
      if (!found) return false
    }
    return true
  }
  if (isSet(a)) {
    const sa = a as Set<any>
    const sb = b as Set<any>
    if (sa.size !== sb.size) return false
    const nextDepth = depth + 1
    let bMap = visited.get(a)
    if (!bMap) {
      bMap = new WeakMap()
      visited.set(a, bMap)
    } else if (bMap.has(b)) {
      return true
    }
    bMap.set(b, true)
    const bVals = Array.from(b as Set<any>)
    const matched = new Set<number>()
    const pending: any[] = []
    for (const av of a as Set<any>) {
      let hit = -1
      for (let i = 0; i < bVals.length; i++) {
        if (!matched.has(i) && _eq(bVals[i], av)) {
          hit = i
          break
        }
      }
      if (hit >= 0) {
        matched.add(hit)
      } else {
        pending.push(av)
      }
    }
    for (const av of pending) {
      let found = false
      for (let i = 0; i < bVals.length; i++) {
        if (matched.has(i)) continue
        if (isEqualWithInternal(av, bVals[i], cptor, nextDepth, visited)) {
          matched.add(i)
          found = true
          break
        }
      }
      if (!found) return false
    }
    return true
  }
  if (ArrayBuffer.isView(a)) {
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
      return compareWithFallback(a, b, cptor, () => true)
    }
  }
  if (isFunction(a) && isFunction(b)) return compareWithFallback(a, b, cptor, () => a.name === b.name)

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