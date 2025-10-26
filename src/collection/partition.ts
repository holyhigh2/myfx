import _iteratee from "../_iteratee";
import type { Collection, NonFuncItee } from "../types";
import each from "./each";

/**
 * 类似<code>filter</code>函数，但返回固定长度为2的二维数组 - [[matched...],[mismatched...]]
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:false},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:true},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 *
 * //[[func.js],[juth2,soya2d]]
 * console.log(_.partition(libs,{name:'func.js'}))
 *
 * const seq = [1,2,3,4,5,6];
 * //[[2, 4, 6],[1, 3, 5]]
 * console.log(_.partition(seq,n=>n%2===0))
 *
 * //[[1,3],["2"]]
 * console.log(_.partition({a:1,b:'2',c:3},_.isNumber))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 由匹配列表，非匹配列表构成的二维数组
 * @since 0.17.0
 */
function partition<V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((
      value: V,
      index: number,
      collection: Collection<V>
    ) => boolean)
    | NonFuncItee
): V[][]
function partition<V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((
      value: V,
      index: string,
      collection: Collection<V, string>
    ) => boolean)
    | NonFuncItee
): V[][]
function partition<V, K extends string | number | symbol | object>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V, K>) => boolean)
    | NonFuncItee
): V[][]
function partition<V, K extends string | number | symbol | object>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V, K>) => boolean)
    | NonFuncItee
): V[][] {
  const matched: V[] = []
  const mismatched: V[] = []
  const callback = _iteratee(predicate)
  each<V, K>(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (r) {
      matched.push(v)
    } else {
      mismatched.push(v)
    }
  })
  return [matched, mismatched]
}

export default partition