import toString from "./toString"
/**
 * 从字符串的两端删除空白字符。
 *
 * @example
 * //holyhigh
 * console.log(_.trim('  holyhigh '))
 *
 * @param str
 * @returns 对于null/undefined会返回空字符串
 */
function trim(str: any): string {
  str = toString(str)
  return str.trim()
}

export default trim