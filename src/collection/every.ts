import { Collection, NonFuncItee, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import each from "./each";

/**
 * 对集合内的所有元素进行断言，直到第一个返回false的元素结束。如果所有元素断言都为真返回true
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 *
 * //true
 * console.log(_.every([]))
 * //true
 * console.log(_.every([1,3,5],v=>v%2===1))
 * //false
 * console.log(_.every(['a','b','c',1],_.isNumber))
 * //false
 * console.log(_.every(libs,'tags.utils'))
 * //false
 * console.log(_.every(libs,{js:true}))
 * //false key不支持路径解析
 * console.log(_.every(libs,{'platform[0]':'web'}))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 全部通过返回true，否则false。对于一个空集合，会返回true
 */
function every<V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((value: V, index: number, collection: Collection<V>) => boolean)
    | NonFuncItee
): boolean
function every<V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((value: V, index: string, collection: Collection<V,string>) => boolean)
    | NonFuncItee
): boolean
function every<V, K extends string | number | symbol>(
  collection: Collection<V,K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): boolean
function every<V, K extends string | number | symbol>(
  collection: Collection<V,K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): boolean {
  let rs = true
  const callback = _iteratee(predicate)
  each<V, K>(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (!r) {
      rs = false
      return false
    }
  })
  return rs
}

export default every