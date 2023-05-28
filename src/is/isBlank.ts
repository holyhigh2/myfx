/**
 * 对字符串进行trim后进行验证。如果非字符串，转为字符串后进行验证
 * @example
 * //true
 * console.log(_.isBlank('  '))
 * //true
 * console.log(_.isBlank(null))
 * //false
 * console.log(_.isBlank({}))
 * //false
 * console.log(_.isBlank('     1'))
 *
 * @param v 字符串
 * @returns 如果字符串是null/undefined/\t \n \f \r或trim后长度为0，返回true
 * @since 0.16.0
 */
function isBlank(v: unknown): boolean {
  return v === null || v === undefined || (v + '').trim().replace(/\t|\n|\f|\r/mg,'').length === 0
}

export default isBlank