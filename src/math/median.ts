import isArray from '../is/isArray'
import isNumeric from '../is/isNumeric'
import isSet from '../is/isSet'
/**
 * 对多个数字或数字列表计算中间值并返回结果
 * @example
 * //2.5
 * console.log(_.median([1,2,'3',4]))
 * //2
 * console.log(_.median([1,'2',3]))
 * //1
 * console.log(_.median([1,'2',-3]))
 *
 * @param values 数字/字符数组/Set
 * @returns mean value
 * @since 1.12.0
 */
function median(values: Set<string | number> | Array<string | number>): number {
  if (!isArray(values) && !isSet(values)) return NaN
  let sortNumbers: Array<number> = []
  values.forEach(v => {
    if (isNumeric(v)) {
      sortNumbers.push(Number(v))
    }
  });
  sortNumbers.sort()

  let rs
  if (sortNumbers.length % 2 === 0) {
    let i = sortNumbers.length / 2 - 1
    rs = (sortNumbers[i] + sortNumbers[i + 1]) / 2
  } else {
    rs = sortNumbers[Math.ceil(sortNumbers.length / 2) - 1]
  }

  return rs
}

export default median