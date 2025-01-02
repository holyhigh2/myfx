/**
 * 判断参数是否为字符串，包括String类的实例以及基本类型string的值
 *
 * @example
 * //true
 * console.log(_.isString(new String('')))
 * //true
 * console.log(_.isString(''))
 *
 * @param v
 * @returns
 */
function isString(v: unknown): v is string {
  return v instanceof String || Object.prototype.toString.call(v) === '[object String]'
}

export default isString