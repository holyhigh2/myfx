import _iteratee from "../_iteratee"
import type { NonFuncItee } from "../types"
/**
 * 对集合内的所有元素进行断言并返回第一个匹配的元素索引
 *
 * @example
 * //3 查询数组的索引
 * console.log(_.findIndex(['a','b','c',1,3,6],_.isNumber))
 * //0
 * console.log(_.findIndex([{a:1},{a:2},{a:3}],'a'))
 * //2
 * console.log(_.findIndex([{a:1},{a:2},{a:3}],{a:3}))
 *
 * @param array 数组，非数组返回-1
 * @param predicate (value[,index[,array]]);断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @param fromIndex 从0开始的起始索引，设置该参数可以减少实际遍历次数。默认0
 * @returns 第一个匹配断言的元素索引或-1
 */
function findIndex<T>(
  array: T[],
  predicate:
    | ((value: T, index: string | number, array: T[]) => boolean)
    | NonFuncItee,
  fromIndex?: number
): number {
  if (!Array.isArray(array)) return -1
  let rs = -1
  let fromIndexNum = fromIndex || 0
  const itee = _iteratee(predicate)
  for (let i = fromIndexNum; i < array.length; i++) {
    const v = array[i];
    const r = itee(v, i, array)
    if (r) {
      rs = i + fromIndexNum
      break
    }
  }
  return rs
}

export default findIndex