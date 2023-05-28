/**
 * 判断值是不是一个安全整数
 *
 * @example
 * //true
 * console.log(_.isSafeInteger(-0))
 * //true
 * console.log(_.isSafeInteger(5.0))
 * //false
 * console.log(_.isSafeInteger(5.000000000000001))
 * //true
 * console.log(_.isSafeInteger(5.0000000000000001))
 * //false
 * console.log(_.isSafeInteger('5'))
 * //true
 * console.log(_.isSafeInteger(Number.MAX_SAFE_INTEGER))
 * //false
 * console.log(_.isSafeInteger(Number.MAX_VALUE))
 *
 * @param v
 * @returns
 */
function isSafeInteger(v: unknown): v is number {
  return Number.isSafeInteger(v)
}

export default isSafeInteger