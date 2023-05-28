/**
 * 判断值是不是一个整数
 *
 * @example
 * //true
 * console.log(_.isInteger(-0))
 * //true
 * console.log(_.isInteger(5.0))
 * //false
 * console.log(_.isSafeInteger(5.000000000000001))
 * //true
 * console.log(_.isSafeInteger(5.0000000000000001))
 * //false
 * console.log(_.isInteger('5'))
 * //true
 * console.log(_.isInteger(Number.MAX_SAFE_INTEGER))
 * //true
 * console.log(_.isInteger(Number.MAX_VALUE))
 *
 * @param v
 * @returns
 */
function isInteger(v: unknown): v is number {
  return Number.isInteger(v)
}

export default isInteger