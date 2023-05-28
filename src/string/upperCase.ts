import toString from "./toString"
/**
 * 返回所有字母是大写格式的字符串
 *
 * @example
 * //''
 * console.log(_.upperCase())
 * //'FUNC.JS'
 * console.log(_.upperCase('func.js'))
 *
 * @param str
 * @returns 返回新字符串
 */
function upperCase(str: any): string {
  return toString(str).toUpperCase()
}

export default upperCase