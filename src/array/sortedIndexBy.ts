import _identity from '../_identity'
import _itee from '../_iteratee'
import size from "../collection/size"
import type { NonFuncItee } from "../types"
/**
 * 同<code>sortedIndex</code>，但支持自定义回调用来获取对比值
 * @example
 * //2
 * console.log(_.sortedIndexBy([{a:1},{a:2},{a:3}], {a:2.5},'a'))
 *
 * @param array 对象属性标识符数组
 * @param value 需要插入数组的值
 * @param itee (value)回调函数，返回排序对比值。默认 identity
 * @returns array索引
 * @since 1.0.0
 */
function sortedIndexBy<T>(
  array: T[],
  value: any,
  itee?: ((value: any) => any) | NonFuncItee
): number {
  let left = 0
  let right = size(array)
  let index = 0
  const cb = _itee(itee || _identity)
  value = cb(value)
  while (left < right) {
    const mid = parseInt((left + right) / 2 + '')
    if (cb(array[mid]) < value) {
      left = mid + 1
      index = left
    } else {
      right = mid
    }
  }
  return index
}

export default sortedIndexBy