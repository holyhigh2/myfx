import isArrayLike from "../is/isArrayLike";
import isMap from "../is/isMap";
import isObject from "../is/isObject";
import isSet from "../is/isSet";
import isString from "../is/isString";
import type { Collection } from "../types";

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
 * @param callback (value[,index|key[,collection]]);回调函数，如果返回false会立即中断遍历
 */
function each<V>(
  collection: Set<V> | ArrayLike<V>,
  callback: (
    value: V,
    index: number,
    collection: Collection<V>
  ) => any
): void
function each<V>(
  collection: Record<string, V> | Map<string, V>,
  callback: (
    value: V,
    index: string,
    collection: Collection<V, string>
  ) => any
): void
function each<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  callback: (value: V, index: K, collection: Collection<V>) => any
): void
function each<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  callback: (value: V, index: K, collection: Collection<V>) => any
): void {
  let values
  let keys
  if (isString(collection) || isArrayLike(collection)) {
    let size = collection.length

    for (let i = 0; i < size; i++) {
      const r = callback(collection[i] as V, i as K, collection)
      if (r === false) return
    }

  } else if (isSet(collection)) {
    let size = collection.size

    values = collection.values()
    for (let i = 0; i < size; i++) {
      const r = callback(values.next().value as V, i as K, collection)
      if (r === false) return
    }

  } else if (isMap(collection)) {
    let size = collection.size

    keys = collection.keys()
    values = collection.values()

    for (let i = 0; i < size; i++) {
      const r = callback(
        values.next().value as V,
        keys.next().value as K,
        collection as Collection<V>
      )
      if (r === false) return
    }

  } else if (isObject(collection)) {
    keys = Object.keys(collection)
    let size = keys.length

    for (let i = 0; i < size; i++) {
      const k = keys[i]
      const r = callback((collection as any)[k] as V, k as K, collection)
      if (r === false) return
    }

  }
}

export default each