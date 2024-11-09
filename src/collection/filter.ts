import _iteratee from "../_iteratee";
import type { ArrayLike, Collection, NonFuncItee } from "../types";
import each from "./each";

/**
 * 返回一个新数组，数组内容由集合内所有断言结果为真的元素组成
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:false},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:true},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 *
 * //[]
 * console.log(_.filter())
 * //[1,3]
 * console.log(_.filter([1,2,3,4],v=>v%2===1))
 * //[1]
 * console.log(_.filter(['a','b','c',1],_.isNumber))
 * //[1,2]
 * console.log(_.filter({a:1,b:2,c:'3'},_.isNumber))
 * //[f、s]
 * console.log(_.filter(libs,'tags.utils'))
 * //[j、s]
 * console.log(_.filter(libs,{js:true}))
 * //[] key不支持路径解析
 * console.log(_.filter(libs,{'platform[0]':'web'}))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 由通过断言的元素组成的新数组
 */
function filter<V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((value: V, index: number, collection: Collection<V>) => boolean)
    | NonFuncItee
): V[]
function filter<V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((value: V, index: string, collection: Collection<V, string>) => boolean)
    | NonFuncItee
): V[]
function filter<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): V[]
function filter<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): V[] {
  const rs: V[] = []
  const callback = _iteratee(predicate)
  each<V, K>(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (r) {
      rs.push(v)
    }
  })
  return rs
}

export default filter