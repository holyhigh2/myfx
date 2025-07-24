import isArray from "../is/isArray";
import isNumeric from "../is/isNumeric";
import isSet from "../is/isSet";

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
 * @returns 如果参数不是数组/Set，返回NaN
 * @since 1.0.0
 */
function min(
  values: Set<string | number> | Array<string | number>
): number {
  if (!isArray(values) && !isSet(values)) return NaN
  let rs: number | string = isArray(values) ? values[0] : values.values().next().value!
  values.forEach(v => {
    if (isNumeric(v) && v < rs) {
      rs = v
    }
  });
  return Number(rs)
}

export default min