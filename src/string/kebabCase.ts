import _getGrouped from "../_getGrouped"
import lowerCase from "./lowerCase"
import toString from "./toString"
/**
 * 返回短横线风格的字符串
 *
 * @example
 * //'a-b-c'
 * console.log(_.kebabCase('a_b_c'))//snakeCase
 * //'webkit-perspective-origin-x'
 * console.log(_.kebabCase('webkitPerspectiveOriginX'))//camelCase
 * //'a-b-c'
 * console.log(_.kebabCase('a B-c'))//mixCase
 * //'get-my-url'
 * console.log(_.kebabCase('getMyURL'))//camelCase
 *
 * @param str
 * @returns 返回新字符串
 */
function kebabCase(str: any): string {
  return lowerCase(_getGrouped(toString(str)).join('-'))
}

export default kebabCase