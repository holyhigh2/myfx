import toString from "./toString"

const TRAILING_WS = /\s*$/
/**
 * 从字符串末尾删除空白字符。
 *
 * @example
 * //'  holyhigh'
 * console.log(_.trimEnd('  holyhigh '))
 *
 * @param str
 * @returns 对于null/undefined会返回空字符串
 */
function trimEnd(str: any): string {
  str = toString(str)
  if (str.trimEnd) return str.trimEnd()
  return str.replace(TRAILING_WS, '')
}

export default trimEnd