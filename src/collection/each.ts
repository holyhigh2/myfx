import type { Collection } from "../types";

function each<V>(
  collection: Set<V> | ArrayLike<V>,
  callback: (
    value: V,
    index: number,
    collection: Collection<V>, i: number
  ) => any,
  startIndex?: number
): void
function each<V>(
  collection: Record<string, V> | Map<string, V>,
  callback: (
    value: V,
    index: string,
    collection: Collection<V, string>, i: number
  ) => any,
  startIndex?: number
): void
function each<V, K extends string | number | symbol | object>(
  collection: Collection<V, K>,
  callback: (value: V, index: K, collection: Collection<V>, i: number) => any,
  startIndex?: number
): void
/**
 * 对集合元素进行顺序遍历。
 * 注意，object类型无法保证遍历顺序
 *
 * @example
 * //1、2、3
 * _.each(new Set([1,2,3]),console.log)
 * //a、b、c
 * _.each({'1':'a','2':'b','3':'c'},console.log)
 * //1、{"a":1}、[2,3]
 * _.each([1,{a:1},[2,3]],console.log)
 * //h/o/l/y/h/i/g/h
 * _.each('holyhigh',console.log)
 * //遍历元素集合
 * const x=[];_.each(document.body.children,v=>x.push(v));console.log(x)
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param callback (value[,index|key[,collection][,i]]);回调函数，如果返回false会立即中断遍历
 * @param startIndex 遍历起始索引
 */
function each<V, K extends string | number | symbol | object>(
  collection: Collection<V, K>,
  callback: (value: V, index: K, collection: Collection<V>, i: number) => any,
  startIndex = 0
): void {
  if (collection == null) return

  // 快速路径：数组
  if (Array.isArray(collection)) {
    const size = collection.length
    for (let i = startIndex; i < size; i++) {
      if (callback(collection[i] as V, i as K, collection, i) === false) return
    }
    return
  }

  // 快速路径：字符串
  if (typeof collection === 'string') {
    const size = (collection as unknown as string).length
    for (let i = startIndex; i < size; i++) {
      if (callback((collection as unknown as string)[i] as V, i as K, collection, i) === false) return
    }
    return
  }

  // Set
  if (collection instanceof Set) {
    const size = (collection as Set<V>).size
    const values = (collection as Set<V>).values()
    for (let i = startIndex; i < size; i++) {
      if (callback(values.next().value as V, i as K, collection, i) === false) return
    }
    return
  }

  // Map
  if (collection instanceof Map) {
    const size = (collection as Map<any, V>).size
    const keys = (collection as Map<any, V>).keys()
    const values = (collection as Map<any, V>).values()
    for (let i = startIndex; i < size; i++) {
      if (callback(
        values.next().value as V,
        keys.next().value as K,
        collection as Collection<V>, i
      ) === false) return
    }
    return
  }

  // ArrayLike / Object
  const keys = Object.keys(collection as object)
  const size = keys.length
  for (let i = startIndex; i < size; i++) {
    const k = keys[i]
    if (callback((collection as any)[k] as V, k as K, collection, i) === false) return
  }
}

export default each