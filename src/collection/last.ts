import toArray from "../collection/toArray";
import isArrayLike from "../is/isArrayLike";
import type { Collection } from "../types";

function last<T>(array: Collection<T>): T
function last<T, U>(array: Collection<T>): U
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
function last<T>(array: Collection<T>): T {
  if (Array.isArray(array) || typeof array === "string") {
    const a = array as any
    return a[a.length - 1] as T
  }
  if (array instanceof Set || array instanceof Map) {
    const it = (array as any).values()
    let cur = it.next()
    if (cur.done) return undefined as any
    let v = cur.value
    while (!(cur = it.next()).done) v = cur.value
    return v as T
  }
  if (isArrayLike<T>(array)) return (array as any)[(array as any).length - 1] as T
  const ary = toArray<T>(array)
  return ary[ary.length - 1]
}

export default last