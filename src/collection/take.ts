import toArray from "../collection/toArray";
import type { Collection } from "../types";
/**
 * 从起始位置获取指定数量的元素并放入新数组后返回
 *
 * @example
 * //[1, 2, 3]
 * console.log(_.take([1, 2, 3, 4, 5],3))
 * //[1, 2, 3, 4, 5]
 * console.log(_.take([1, 2, 3, 4, 5]))
 *
 * @param array 数组
 * @param [length] 获取元素数量，默认数组长度
 * @returns 新数组
 */
function take<T>(array: Collection<T>, length?: number): T[] {
  const rs = toArray<T>(array)
  return rs.slice(0, length)
}

export default take