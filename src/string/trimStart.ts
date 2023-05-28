import toString from "./toString"
/**
 * 从字符串起始位置删除空白字符。
 *
 * @example
 * //'holyhigh '
 * console.log(_.trimStart('  holyhigh '))
 *
 * @param str
 * @returns 对于null/undefined会返回空字符串
 */
function trimStart(str: any): string {
  str = toString(str)
  if (str.trimStart) return str.trimStart()
  return str.replace(/^\s*/, '')
}

export default trimStart