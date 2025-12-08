
/**
 * 判断参数是否全部为字母或数字字符串
 *
 * @example
 * //true
 * console.log(_.isAlnum('123'))
 * //true
 * console.log(_.isAlnum('123abc'))
 * //false
 * console.log(_.isAlnum(1))
 *
 * @param v
 * @returns 
 */
function isAlnum(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0 && /^[\p{L}0-9]+$/u.test(v)
}

export default isAlnum