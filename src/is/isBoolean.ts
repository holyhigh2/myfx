/**
 * 判断值是不是一个布尔值
 *
 * @example
 * //true
 * console.log(_.isBoolean(false))
 * //false
 * console.log(_.isBoolean('true'))
 * //false
 * console.log(_.isBoolean(1))
 *
 * @param v
 * @returns
 */
function isBoolean(v: unknown): v is boolean {
  return v instanceof Boolean || Object.prototype.toString.call(v) === '[object Boolean]'
}

export default isBoolean