import isRegExp from "../is/isRegExp"
import escapeRegExp from "./escapeRegExp"

/**
 * 检测字符串是否与指定的正则匹配
 *
 * @example
 * //true 忽略大小写包含判断
 * console.log(_.test('func.js','Func','i'))
 * //true 忽略大小写相等判断
 * console.log(_.test('func.js',/^FUNC\.js$/i))
 * //false
 * console.log(_.test('func.js',/FUNC/))
 *
 * @param str
 * @param pattern 指定正则。如果非正则类型会先转义全部正则特殊字符再转换为正则进行匹配（即字符串pattern按字面量匹配）
 * @param flags 如果pattern参数不是正则类型，会使用该标记作为正则构造的第二个参数
 * @returns 匹配返回true
 * @since 0.19.0
 */
function test(str: any, pattern: RegExp | string, flags?: string): boolean {
  if (isRegExp(pattern)) {
    const re = pattern.global
      ? new RegExp(pattern.source, pattern.flags.replace('g', ''))
      : pattern
    return re.test(str)
  }
  const regExp = new RegExp(escapeRegExp(pattern), flags)
  return regExp.test(str)
}

export default test