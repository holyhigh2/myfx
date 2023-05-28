import filter from "../collection/filter"
import includes from "../collection/includes"
/**
 * 返回删除所有values后的新数组。使用<code>eq</code>函数进行等值判断
 *
 * @example
 * //[1, 1]
 * console.log(_.without([1,2,3,4,3,2,1],2,3,4))
 *
 * @param array 数组对象
 * @param values 需要删除的值
 * @returns 新数组
 * @since 0.19.0
 */
function without<T>(array: T[], ...values: T[]): T[] {
  return filter(array, (item) => !includes(values, item))
}

export default without