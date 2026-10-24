import _hasOwn from "../_hasOwn";
import toArray from "../collection/toArray";
import isArrayLike from "../is/isArrayLike";
import isIterator from "../is/isIterator";
import isObject from "../is/isObject";
import type { Collection } from "../types";

function first<T>(array: Collection<T>): T
function first<T, U>(array: Collection<T>): U
/**
 * 获取数组中的第一个元素
 *
 * @example
 * //1
 * console.log(_.first([1,2,3]))
 * //"1"
 * console.log(_.first(new Set(['1',1])))
 *
 * @param array 数组
 * @returns 数组中第一个元素
 */
function first<T>(array: Collection<T>): T {
  if (Array.isArray(array) || typeof array === "string") return (array as any)[0] as T
  if (array instanceof Set || array instanceof Map) {
    const r = (array as any).values().next()
    return (r.done ? undefined : r.value) as T
  }
  if (isArrayLike<T>(array)) return (array as any)[0] as T
  if (isObject(array) && !isIterator(array)) {
    for (const k in array as any) {
      if (_hasOwn(array, k)) return (array as any)[k] as T
    }
    return undefined as any
  }
  return toArray<T>(array)[0]
}

export default first