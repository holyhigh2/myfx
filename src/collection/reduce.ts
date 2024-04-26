import { Collection, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import each from "./each";

/**
 * 对集合中的每个元素执行一次reducer函数，并将其结果汇总为单个值返回。
 * <p>
 * 如果没有提供initialValue，reduce 会从集合索引1开始执行 callback 方法。如果提供initialValue则从索引0开始。
 * </p>
 * <p>
 * 注意，对于Object类型的对象，如果未提供initialValue，则accumulator会是索引0元素的value，而不是key
 * </p>
 *
 * @example
 * //25
 * console.log(_.reduce([1,3,5,7,9],(a,v)=>a+v))
 * //35
 * console.log(_.reduce([1,3,5,7,9],(a,v)=>a+v,10))
 * //x-y-z
 * console.log(_.reduce({x:1,y:2,z:3},(a,v,k)=>a+'-'+k,'').substr(1))
 *
 * @param collection
 * @param callback (accumulator,value[,key|index[,collection]]);reducer函数
 * @param [initialValue] 第一次调用 callback函数时的第一个参数的值
 * @returns 汇总值
 */
function reduce<T,U>(
  collection: Collection<T>,
  callback: (
    accumulator: U,
    value: T,
    key: UnknownMapKey,
    collection: Collection<T>
  ) => U,
  initialValue: U
): U 
function reduce<T>(
  collection: Collection<T>,
  callback: (
    accumulator: T,
    value: T,
    key: UnknownMapKey,
    collection: Collection<T>
  ) => T,
  initialValue: T
): T {
  let accumulator = initialValue
  let hasInitVal = initialValue !== undefined
  each<T, UnknownMapKey>(collection, (v, k, c) => {
    if (hasInitVal) {
      accumulator = callback(accumulator, v, k, c)
    } else {
      accumulator = v
      hasInitVal = true
    }
  })

  return accumulator
}

export default reduce