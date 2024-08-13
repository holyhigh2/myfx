import { Collection, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";

/**
 * 对集合元素进行顺序遍历，与 forEach 不同在于遍历顺序是从右到左
 * 注意，object类型无法保证遍历顺序
 *
 * @example
 * //3、2、1
 * _.eachRight(new Set([1,2,3]),console.log)
 * //c、b、a
 * _.eachRight({'1':'a','2':'b','3':'c'},console.log)
 * //[2,3]、{"a":1}、1
 * _.eachRight([1,{a:1},[2,3]],console.log)
 * //hgihyloh
 * _.eachRight('holyhigh',console.log)
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param callback (value[,index|key[,collection]]);回调函数，如果返回false会立即中断遍历
 */
function eachRight<V>(
  collection: Set<V> | ArrayLike<V>,
  callback: (
    value: V,
    index: number,
    collection: Collection<V>
  ) => boolean | void | Promise<void>
): void
function eachRight<V>(
  collection: Record<string, V> | Map<string, V>,
  callback: (
    value: V,
    index: string,
    collection: Collection<V,string>
  ) => boolean | void | Promise<void>
): void
function eachRight<V, K extends string | number | symbol>(
  collection: Collection<V,K>,
  callback: (value: V, index: K, collection: Collection<V>) => boolean | void
): void
function eachRight<V, K extends string | number | symbol>(
  collection: Collection<V,K>,
  callback: (value: V, index: K, collection: Collection<V>) => boolean | void
): void {
  _eachIterator<V, K>(collection, callback, true)
}

export default eachRight