import toString from "./toString"
/**
 * 返回所有字母是小写格式的字符串
 *
 * @example
 * //''
 * console.log(_.lowerCase())
 * //'func.js'
 * console.log(_.lowerCase('FUNC.JS'))
 *
 * @param str
 * @returns 返回新字符串
 */
function lowerCase(str: any): string {
  return toString(str).toLowerCase()
}

export default lowerCase