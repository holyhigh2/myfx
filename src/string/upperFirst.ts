import toString from "./toString"
/**
 * 转换字符串第一个字符为大写并返回
 *
 * @example
 * //'First'
 * console.log(_.upperFirst('first'))//mixCase
 * //'GetMyURL'
 * console.log(_.upperFirst('getMyURL'))//camelCase
 *
 * @param str
 * @returns 返回新字符串
 */
function upperFirst(str: any): string {
  str = toString(str)
  if (str.length < 1) return str
  return str[0].toUpperCase() + str.substring(1)
}

export default upperFirst