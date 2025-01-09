import _eachIterator from "../_eachIterator";
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
  ) => boolean | void | Promise<void>
): void
function each<V>(
  collection: Record<string, V> | Map<string, V>,
  callback: (
    value: V,
    index: string,
    collection: Collection<V, string>
  ) => boolean | void | Promise<void>
): void
function each<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  callback: (value: V, index: K, collection: Collection<V>) => boolean | void | Promise<void>
): void
function each<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  callback: (value: V, index: K, collection: Collection<V>) => boolean | void | Promise<void>
): void {
  _eachIterator<V, K>(collection, callback)
}

export default each