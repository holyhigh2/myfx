import toArray from "../collection/toArray";
import { ArrayLike } from "../types";
/**
 * 对数组元素位置进行颠倒，返回改变后的数组。
 *
 *  @example
 * //[3, 2, 1]
 * console.log(_.reverse([1, 2, 3]))
 *
 * @param array 数组
 * @returns 颠倒后的新数组
 */
function reverse<T>(array: Set<T> | ArrayLike): T[] {
  const rs = toArray<T>(array)
  return rs.reverse()
}

export default reverse