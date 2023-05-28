import { Collection, NonFuncItee } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import flatMap from "./flatMap";

/**
 * 同<code>flatMap</code>，但会递归元素进行扁平化处理
 *
 * @example
 * //[1, 2, 3]
 * console.log(_.flatMapDeep([[1,2],[[3]]]))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param [iteratee=identity] (value[,index|key[,collection]]) 回调函数，返回值作为新数组元素。
 * @returns 映射值的新数组
 * @since 1.0.0
 */
function flatMapDeep<V>(
  collection: Collection<V>,
  itee:
    | ((
      value: V,
      index: string | number | symbol,
      collection: Collection<V>
    ) => V)
    | NonFuncItee
): V[]
function flatMapDeep<V, K extends string | number | symbol>(
  collection: Collection<V>,
  itee: ((value: V, index: K, collection: Collection<V>) => V) | NonFuncItee
): V[]
function flatMapDeep<V, K extends string | number | symbol, U>(
  collection: Collection<V>,
  itee: ((value: V, index: K, collection: Collection<V>) => U) | NonFuncItee
): U[]
function flatMapDeep<V, K extends string | number | symbol, U>(
  collection: Collection<V>,
  itee: ((value: V, index: K, collection: Collection<V>) => U) | NonFuncItee
): U[] {
  return flatMap<V, K, U>(collection, itee, Infinity)
}

export default flatMapDeep