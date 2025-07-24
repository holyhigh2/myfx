import isArray from '../is/isArray'
import isNumeric from '../is/isNumeric'
import isSet from '../is/isSet'

/**
 * 对字符/数字数组/Set进行求和并返回结果
 * - 对nil值，自动转为0
 * - 对NaN值，返回NaN
 * - 对Infinity值，返回Infinity
 * 
 * @example
 * //10
 * console.log(_.sum([1,'2',3,4]))
 * //10
 * console.log(_.sum([1,'2',3,4,null,undefined]))
 * //9
 * console.log(_.sum([NaN,'2',3,4]))
 * //Infinity
 * console.log(_.sum([Infinity,'2',3,4]))
 * //6
 * console.log(_.sum(new Set([1,2,3])))
 *
 * @param values 数字/字符数组/Set
 * @since 1.0.0
 * @returns
 */
function sum(
  values: Set<string | number> | Array<string | number>
): number {
  if (!isArray(values) && !isSet(values)) return NaN
  let total = 0
  values.forEach(v => {
    if (isNumeric(v)) {
      total += Number(v)
    }
  });
  return total
}

export default sum