import isRegExp from "../is/isRegExp"

const ESCAPE_EXP = /([+/\\()\[\].{}])/mg

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
 * @param pattern 指定正则。如果非正则类型会自动转换为正则再进行匹配
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
  const regExp = new RegExp(pattern.replace(ESCAPE_EXP, '\\$1'), flags)
  return regExp.test(str)
}

export default test