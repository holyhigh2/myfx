import lowerFirst from "./lowerFirst"
import pascalCase from "./pascalCase"
import toString from "./toString"
/**
 * 返回驼峰风格的字符串
 *
 * @example
 * //'aBC'
 * console.log(_.camelCase('a-b c'))//mixCase
 * //'loveLovesToLoveLove'
 * console.log(_.camelCase('Love loves to love Love'))//spaces
 * //'aBC'
 * console.log(_.camelCase('a B-c'))//camelCase
 * //'getMyUrl'
 * console.log(_.camelCase('getMyURL'))//camelCase
 *
 * @param str
 * @returns 返回新字符串
 */
function camelCase(str: string): string {
  return lowerFirst(pascalCase(toString(str)))
}

export default camelCase