import isArray from '../is/isArray';
import isNumeric from '../is/isNumeric';
import isSet from '../is/isSet';
/**
 * 对多个数字或数字列表计算平均值并返回结果
 * @example
 * //2.5
 * console.log(_.mean([1,2,'3',4]))
 * //NaN
 * console.log(_.mean([1,'2',3,'a',4]))
 * //2
 * console.log(_.mean([1,'2',3,null,4]))
 *
 * @param values 数字/字符数组/Set
 * @returns mean value
 * @since 1.0.0
 */
function mean(values: Set<string | number> | Array<string | number>): number {
  if (!isArray(values) && !isSet(values)) return NaN
  let total = 0
  let len = 0
  values.forEach(v => {
    if (isNumeric(v)) {
      total += Number(v)
      len++
    }
  });
  return total / len
}

export default mean