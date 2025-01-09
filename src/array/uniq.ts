import toArray from "../collection/toArray"

/**
 * 对数组内的值进行去重
 * @example
 * // [1,2,4,"a","1",null]
 * console.log(_.unique([1,2,2,4,4,'a','1','a',null,null]))
 *
 * @param array 数组，非数组返回空数组
 * @returns 转换后的新数组对象
 */
function uniq<T>(array: T[]): T[] {
  if (!Array.isArray(array)) return []
  return toArray(new Set(array))
}

export default uniq