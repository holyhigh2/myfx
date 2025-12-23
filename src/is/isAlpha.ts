/**
 * 判断参数是否全部为字母，含国际字母表
 *
 * @example
 * //true
 * console.log(_.isAlpha('𰻞𰻞mian'))
 * //false
 * console.log(_.isAlpha(1))
 *
 * @param v
 * @returns 
 * @since 1.15.0
 */
function isAlpha(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0 && /^\p{L}+$/u.test(v)
}

export default isAlpha