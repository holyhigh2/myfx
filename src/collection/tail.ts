import toArray from "../collection/toArray";
import { Collection } from "../types";
/**
 * 返回除第一个元素外的所有元素组成的新数组
 *
 * @example
 * //[2, 3]
 * console.log(_.tail([1, 2, 3]))
 *
 * @param array 数组
 * @returns 新数组
 */
function tail<T>(array: Collection<T>): T[] {
  const rs = toArray<T>(array)
  return rs.slice(1)
}

export default tail