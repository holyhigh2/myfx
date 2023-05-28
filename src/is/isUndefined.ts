/**
 * 判断参数是否为undefined
 * @example
 * //true
 * console.log(_.isUndefined(undefined))
 * //false
 * console.log(_.isUndefined(null))
 *
 * @param v
 * @returns
 */
function isUndefined(v: unknown): v is undefined {
  return v === undefined
}

export default isUndefined