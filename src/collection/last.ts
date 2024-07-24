import toArray from "../collection/toArray";
import { Collection } from "../types";
/**
 * 获取数组中的最后一个元素
 *
 * @example
 * //3
 * console.log(_.last([1,2,3]))
 *
 * @param array 数组
 * @returns 数组中最后一个元素
 */
function last<T>(array: Collection<T>): T
function last<T,V>(array: Collection<T>): V
function last<T>(array: Collection<T>): T {
  const ary = toArray<T>(array)
  return ary[ary.length - 1]
}

export default last