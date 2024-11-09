import toArray from "../collection/toArray"
import type { Collection } from "../types"

/**
 * 返回除最后一个元素外的所有元素组成的新数组
 *
 * @example
 * //[1, 2]
 * console.log(_.initial([1, 2, 3]))
 *
 * @param array 数组
 * @returns 新数组
 * @since 0.19.0
 */
function initial<T>(array: Collection<T>): T[] {
  let ary = toArray(array)
  return ary.slice(0, ary.length - 1) as T[]
}

export default initial