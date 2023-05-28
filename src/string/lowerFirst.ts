import toString from "./toString"
/**
 * 转换字符串第一个字符为小写并返回
 *
 * @example
 * //'fIRST'
 * console.log(_.lowerFirst('FIRST'))//mixCase
 * //'love loves to love Love'
 * console.log(_.lowerFirst('Love loves to love Love'))//spaces
 *
 * @param str
 * @returns 返回新字符串
 */
function lowerFirst(str: any): string {
  str = toString(str)
  if (str.length < 1) return str
  return str[0].toLowerCase() + str.substring(1)
}

export default lowerFirst