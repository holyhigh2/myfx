import isNil from '../is/isNil'
import flatMap from '../collection/flatMap'
/**
 * 返回给定数字序列中最大的一个。忽略NaN，null，undefined
 * @example
 * //7
 * console.log(_.max([2,3,1,NaN,7,4,null]))
 * //6
 * console.log(_.max([4,5,6,'x','y']))
 * //Infinity
 * console.log(_.max([4,5,6,Infinity]))
 *
 * @param values 数字/字符数组/Set
 * @returns
 * @since 2.3
 */
function max(
  values: Set<string | number> | Array<string | number>
): number {
  const vals = flatMap<any>(values, v => isNil(v)||isNaN(v) ? [] : v)
  let f64a = new Float64Array(vals)
  f64a.sort()
  return f64a[f64a.length - 1]
}

export default max