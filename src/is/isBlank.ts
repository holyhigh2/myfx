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
  if (v === null || v === undefined) return true
  const t = typeof v
  if (t === 'number' || t === 'boolean' || t === 'function') {
    return false
  }
  if (Array.isArray(v)) {
    const n = v.length
    if (n === 0) return true
    if (n === 1) return isBlank(v[0])
    return false
  }
  if (typeof v === 'string') {
    const len = v.length
    if (len === 0) return true
    const c0 = v.charCodeAt(0)
    if (c0 > 32 && c0 < 127) return false
    return v.trim().length === 0
  }
  return (v + '').trim().length === 0
}

export default isBlank