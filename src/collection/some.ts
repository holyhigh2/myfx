import { Collection, NonFuncItee, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import each from "./each";

/**
 * 对集合内的所有元素进行断言，直到第一个返回true的元素结束。
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 *
 * //false
 * console.log(_.some([]))
 * //true
 * console.log(_.some([1,2,3,4],v=>v%2===1))
 * //true
 * console.log(_.some(['a','b','c',1],_.isNumber))
 * //true
 * console.log(_.some(libs,'tags.middleware'))
 * //true
 * console.log(_.some(libs,{js:true}))
 * //false key不支持路径解析
 * console.log(_.some(libs,{'tags.utils':false}))
 *
 * @param collection 任何可遍历的集合类型，比如arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 只要有任意元素断言为真返回true，否则false。对于一个空集合，会返回false
 */
function some<V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((value: V, index: number, collection: Collection<V>) => boolean)
    | NonFuncItee
): boolean
function some<V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((value: V, index: string, collection: Collection<V,string>) => boolean)
    | NonFuncItee
): boolean
function some<V, K extends string | number | symbol>(
  collection: Collection<V,K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V,K>) => boolean)
    | NonFuncItee
): boolean
function some<V, K extends string | number | symbol>(
  collection: Collection<V,K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V,K>) => boolean)
    | NonFuncItee
): boolean {
  let rs = false
  const callback = _iteratee(predicate || (() => true))
  each<V, K>(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (r) {
      rs = true
      return false
    }
  })
  return rs
}

export default some