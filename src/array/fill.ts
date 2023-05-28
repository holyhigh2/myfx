import toArray from "../collection/toArray";
/**
 * 使用固定值填充arrayLike中从起始索引到终止索引内的全部元素
 *
 * @example
 * //[6, 6, 6]
 * console.log(_.fill(new Array(3), 6))
 * //[1, 'x', 'x', 'x', 5]
 * console.log(_.fill([1, 2, 3, 4, 5], 'x', 1, 4))
 *
 * @param array 数组
 * @param value 填充值
 * @param [start=0] 起始索引，包含
 * @param [end] 终止索引，不包含
 * @returns 填充后的新数组
 */
function fill<T>(array: T[], value: any, start: number = 0, end?: number): T[] {
  const rs = toArray<T>(array)
  rs.fill(value, start, end)
  return rs
}

export default fill