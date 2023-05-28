import map from "../collection/map";
import isFunction from "../is/isFunction";
import _identity from "../_identity";
import pop from "./pop";
import zip from "./zip";
/**
 * 与<code>zip</code>相同，但支持自定义组合逻辑
 * @example
 * //[[1, 3, 5], [2, 4, 6]]
 * console.log(_.zipWith([1,2],[3,4],[5,6]))
 * //[9, 12]
 * console.log(_.zipWith([1,2],[3,4],[5,6],_.sum))
 * //[3, 4]
 * console.log(_.zipWith([1,2],[3,4],[5,6],group=>_.avg(group)))
 *
 * @param arrays 1-n个数组
 * @param [iteratee=identity] (group)回调函数，返回组合后的分组值
 * @returns 重新分组后的新数组
 * @since 1.0.0
 */
function zipWith(...params: any[]): any[][] {
  const sl = params.length
  let itee = params[sl - 1]
  const arys = params
  if (!isFunction(itee)) {
    itee = _identity
  } else {
    pop(arys)
  }
  const rs = zip(...arys)
  return map(rs, (group) => (itee as Function)(group))
}

export default zipWith