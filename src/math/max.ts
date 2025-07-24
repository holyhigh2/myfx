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
  let rs: number | string = isArray(values) ? values[0] : values.values().next().value!
  values.forEach(v => {
    if (isNumeric(v) && v > rs) {
      rs = v
    }
  });
  return Number(rs)
}

export default max