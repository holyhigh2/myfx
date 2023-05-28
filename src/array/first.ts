import toArray from "../collection/toArray";
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
function first<T>(array: T[]): T {
  return toArray<T>(array)[0]
}

export default first