import isArray from "../is/isArray";
import isNumeric from "../is/isNumeric";
import isSet from "../is/isSet";

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
 * @since 1.0.0
 */
function max(
  values: Set<string | number> | Array<string | number>
): number {
  if (!isArray(values) && !isSet(values)) return NaN
  const items: Array<string | number> = isArray(values) ? values : Array.from(values)
  let rs: number | undefined
  for (let i = 0; i < items.length; i++) {
    const v = items[i]
    if (!isNumeric(v)) continue
    const n = Number(v)
    if (rs === undefined || n > rs) {
      rs = n
    }
  }
  return rs === undefined ? NaN : rs
}

export default max