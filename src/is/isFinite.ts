/**
 * 判断值是不是有限数字
 *
 * @example
 * //false
 * console.log(_.isFinite('0'))
 * //true
 * console.log(_.isFinite(0))
 * //true
 * console.log(_.isFinite(Number.MAX_VALUE))
 * //true
 * console.log(_.isFinite(99999999999999999999999999999999999999999999999999999999999999999999999))
 * //false
 * console.log(_.isFinite(Infinity))
 *
 * @param v
 * @returns
 * @since 1.0.0
 */
function isFinite(v: unknown): boolean {
  return Number.isFinite(v)
}

export default isFinite