import _iteratee from "../_iteratee";
import type { Collection, NonFuncItee } from "../types";
import each from "./each";

/**
 * 对集合内的所有元素进行断言并返回第一个匹配的元素
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:false},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:true},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 *
 * //1
 * console.log(_.find(['a','b','c',1,3,6],_.isNumber))
 * //holyhigh
 * console.log(_.find({a:1,b:true,c:'holyhigh',d:'func.js'},_.isString))
 * //{f}
 * console.log(_.find(libs,'tags.utils'))
 * //{j}
 * console.log(_.find(libs,{js:true}))
 * //undefined key不支持路径解析
 * console.log(_.find(libs,{'tags.utils':false}))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 第一个匹配断言的元素或undefined
 */
function find<V, U extends V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((
      value: V,
      index: number,
      collection: Collection<V>
    ) => boolean)
    | NonFuncItee
): U | undefined
function find<V, U extends V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((
      value: V,
      index: string,
      collection: Collection<V, string>
    ) => boolean)
    | NonFuncItee
): U | undefined
function find<V>(
  collection: Set<V> | ArrayLike<V>,
  predicate:
    | ((
      value: V,
      index: number,
      collection: Collection<V>
    ) => boolean)
    | NonFuncItee
): V | undefined
function find<V>(
  collection: Record<string, V> | Map<string, V>,
  predicate:
    | ((
      value: V,
      index: string,
      collection: Collection<V, string>
    ) => boolean)
    | NonFuncItee
): V | undefined
function find<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): V | undefined
function find<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): V | undefined {
  const callback = _iteratee(predicate)
  let rs
  each<V, K>(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (r) {
      rs = v
      return false
    }
  })
  return rs
}

export default find