/**
 * 判断值是否为null或undefined
 *
 * @example
 * //true
 * console.log(_.isNil(undefined))
 * //false
 * console.log(_.isNil(0))
 * //true
 * console.log(_.isNil(null))
 * //false
 * console.log(_.isNil(NaN))
 *
 * @param v
 * @returns
 * @since 1.2.3
 */
function isNil(v: unknown): v is null | undefined {
  return v === null || v === undefined
}

export default isNil