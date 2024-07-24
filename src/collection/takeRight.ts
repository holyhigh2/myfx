import toArray from "../collection/toArray";
import { Collection } from "../types";
/**
 * 从数组末尾位置获取指定数量的元素放入新数组并返回
 *
 * @example
 * //[3, 4, 5]
 * console.log(_.takeRight([1, 2, 3, 4, 5],3))
 * //[1, 2, 3, 4, 5]
 * console.log(_.takeRight([1, 2, 3, 4, 5]))
 *
 * @param array 数组
 * @param length
 * @returns 新数组
 * @since 1.0.0
 */
function takeRight<T>(array: Collection<T>, length?: number): T[] {
  const rs = toArray<T>(array)
  const maxLength = rs.length
  return rs.slice(maxLength - (length || maxLength), maxLength)
}

export default takeRight