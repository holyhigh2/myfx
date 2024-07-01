/**
 * 判断参数是否为null
 *
 * @example
 * //true
 * console.log(_.isNull(null))
 * //false
 * console.log(_.isNull(undefined))
 *
 * @param v
 * @returns
 */
function isNull(v: unknown): v is null {
  return null === v
}

export default isNull