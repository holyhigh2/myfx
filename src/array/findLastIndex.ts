import eachRight from "../collection/eachRight";
import { NonFuncItee } from "../types";
import _iteratee from "../_iteratee"
import slice from './slice'
import size from '../collection/size'
/**
 * 对集合内的所有元素进行断言并返回最后一个匹配的元素索引
 *
 * @example
 * //5 查询数组的索引
 * console.log(_.findLastIndex(['a','b','c',1,3,6],_.isNumber))
 * //2
 * console.log(_.findLastIndex([{a:1},{a:2},{a:3}],'a'))
 *
 * @param array arrayLike对象及set对象
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
  let rs = -1
  let fromIndexNum = fromIndex || 0
  const itee = _iteratee(predicate)
  if (fromIndex === undefined) {
    fromIndexNum = size(array) - 1
  }
  eachRight<any, number>(slice(array, 0, fromIndexNum + 1), (v, k, c) => {
    const r = itee(v, k, c)
    if (r) {
      rs = k
      return false
    }
  })
  return rs
}

export default findLastIndex