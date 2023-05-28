/**
 * 判断值是不是一个Date实例
 *
 * @example
 * //true
 * console.log(_.isDate(new Date()))
 * //false
 * console.log(_.isDate('2020/1/1'))
 *
 * @param v
 * @returns
 */
function isDate(v: unknown): v is Date {
  return v instanceof Date
}

export default isDate