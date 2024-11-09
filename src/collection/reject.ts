import _iteratee from "../_iteratee";
import type { Collection, NonFuncItee } from "../types";
import each from "./each";

/**
 * <code>filter</code>的反函数，数组内容由集合内所有断言结果为假的元素组成
 *
 * @example
 * //['a', 'b', 'c']
 * console.log(_.reject(['a','b','c',1],_.isNumber))
 * //['3']
 * console.log(_.reject({a:1,b:2,c:'3'},_.isNumber))
 * //[2，4]
 * console.log(_.reject([1,2,3,4],v=>v%2===1))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 由通过断言的元素组成的新数组
 * @since 1.0.0
 */
function reject<V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((value: V, index: number, collection: Collection<V>) => boolean)
    | NonFuncItee
): V[]
function reject<V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((value: V, index: string, collection: Collection<V, string>) => boolean)
    | NonFuncItee
): V[]
function reject<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V, K>) => boolean)
    | NonFuncItee
): V[]
function reject<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V, K>) => boolean)
    | NonFuncItee
): V[] {
  const rs: V[] = []
  const callback = _iteratee(predicate)
  each<V, K>(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (!r) {
      rs.push(v)
    }
  })
  return rs
}

export default reject