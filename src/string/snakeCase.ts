import _getGrouped from "../_getGrouped"
import lowerCase from "./lowerCase"
import toString from "./toString"
/**
 * 返回下划线风格的字符串
 *
 * @example
 * //'a_b_c'
 * console.log(_.snakeCase('a-b c'))//mixCase
 * //'love_loves_to_love_love'
 * console.log(_.snakeCase('Love loves to love Love'))//spaces
 * //'a_b_c'
 * console.log(_.snakeCase('a B-c'))//camelCase
 * //'get_my_url'
 * console.log(_.snakeCase('getMyURL'))//camelCase
 *
 * @param str
 * @returns 返回新字符串
 */
function snakeCase(str: string): string {
  return lowerCase(_getGrouped(toString(str)).join('_'))
}

export default snakeCase