import _iteratee from "../_iteratee";
import size from '../collection/size';
import type { NonFuncItee } from "../types";
/**
 * 对集合内的所有元素进行断言并返回最后一个匹配的元素索引
 *
 * @example
 * //5 查询数组的索引
 * console.log(_.findLastIndex(['a','b','c',1,3,6],_.isNumber))
 * //2
 * console.log(_.findLastIndex([{a:1},{a:2},{a:3}],'a'))
 *
 * @param array 数组，非数组返回-1
 * @param predicate (value[,index[,array]]);断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @param [fromIndex=array.length - 1] 从集合长度-1开始的起始索引。设置该参数可以减少实际遍历次数
 * @returns 最后一个匹配断言的元素索引或-1
 * @since 0.19.0
 */
function findLastIndex<T>(
  array: T[],
  predicate:
    | ((value: T, index: string | number, array: T[]) => boolean)
    | NonFuncItee,
  fromIndex?: number
): number {
  if (!Array.isArray(array)) return -1
  let rs = -1
  let fromIndexNum = fromIndex ?? size(array) - 1
  const itee = _iteratee(predicate)
  for (let i = fromIndexNum; i >= 0; i--) {
    const v = array[i];
    const r = itee(v, i, array)
    if (r) {
      rs = i
      break
    }
  }
  return rs
}

export default findLastIndex