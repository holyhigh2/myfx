import flatMap from '../collection/flatMap'
import isNil from '../is/isNil'
/**
 * 返回给定数字序列中最小的一个。忽略NaN，null，undefined
 * @example
 * //-1
 * console.log(_.min([2,3,1,7,'-1']))
 * //0
 * console.log(_.min([4,3,6,0,'x','y']))
 * //-Infinity
 * console.log(_.min([-Infinity,-9999,0,null]))
 * @param values 数字/字符数组/Set
 * @returns
 * @since 1.0.0
 */
function min(
  values: Set<string | number> | Array<string | number>
): number {
  const vals = flatMap<any>(values, v => isNil(v) || isNaN(v) ? [] : v)
  let f64a = new Float64Array(vals)
  f64a.sort()
  return f64a[0]
}

export default min