import isNil from "./isNil"
import isNumber from "./isNumber"

/**
 * 判断参数是否为数字或数字字符串。不能判断BigInt
 *
 * @example
 * //true
 * console.log(_.isNumeric(1))
 * //true
 * console.log(_.isNumeric('-1.1'))
 * //false
 * console.log(_.isNumber('-1.1a'))
 *
 * @param v
 * @returns
 */
function isNumeric(v: unknown): v is number | string {
  if ((v + '').length < 1) return false
  if (isNil(v)) return false
  if (Number.isNaN(v)) return false
  if (isNumber(v)) return true

  return /^-?[0-9]*\.?[0-9]+$/.test(v + '')
}

export default isNumeric