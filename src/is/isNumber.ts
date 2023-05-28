/**
 * 判断参数是否为数字类型值
 *
 * @example
 * //true
 * console.log(_.isNumber(1))
 * //true
 * console.log(_.isNumber(Number.MAX_VALUE))
 * //false
 * console.log(_.isNumber('1'))
 *
 * @param v
 * @returns
 */
function isNumber(v: unknown): v is number {
  return typeof v === 'number' || v instanceof Number
}

export default isNumber