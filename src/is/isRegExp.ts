/**
 * 判断值是不是一个正则对象
 *
 * @example
 * //true
 * console.log(_.isRegExp(new RegExp))
 * //true
 * console.log(_.isRegExp(/1/))
 *
 * @param v
 * @returns
 * @since 0.19.0
 */
function isRegExp(v: unknown): v is RegExp {
  return v instanceof RegExp || Object.prototype.toString.call(v) === '[object RegExp]'
}

export default isRegExp