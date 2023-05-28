import { Collection, NonFuncItee } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import eachRight from "./eachRight";

/**
 * 对集合内的所有元素进行断言并返回最后一个匹配的元素
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:false},js:false},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:true},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 *
 * //6
 * console.log(_.findLast(['a','b','c',1,3,6],_.isNumber))
 * //func.js
 * console.log(_.findLast({a:1,b:true,c:'holyhigh',d:'func.js'},_.isString))
 * //{s}
 * console.log(_.findLast(libs,'tags.utils'))
 * //{s}
 * console.log(_.findLast(libs,{js:true}))
 * //undefined key不支持路径解析
 * console.log(_.findLast(libs,{'tags.utils':false}))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 第一个匹配断言的元素或undefined
 */
function findLast<V>(
  collection: Collection<V>,
  predicate:
    | ((
      value: V,
      index: string | number | symbol,
      collection: Collection<V>
    ) => boolean)
    | NonFuncItee
): V | undefined
function findLast<V, K extends string | number | symbol>(
  collection: Collection<V>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): V | undefined
function findLast<V, K extends string | number | symbol>(
  collection: Collection<V>,
  predicate:
    | ((value: V, index: K, collection: Collection<V>) => boolean)
    | NonFuncItee
): V | undefined {
  const callback = _iteratee(predicate)
  let rs
  eachRight(collection, (v, k, c) => {
    const r = callback(v, k, c)
    if (r) {
      rs = v
      return false
    }
  })
  return rs
}

export default findLast