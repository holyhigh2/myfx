import _getGrouped from "../_getGrouped"
import toString from "./toString"
import upperFirst from './upperFirst'
/**
 * 返回帕斯卡风格的字符串
 *
 * @example
 * //'LoveLovesToLoveLove'
 * console.log(_.pascalCase('Love loves to love Love'))//spaces
 * //'ABC'
 * console.log(_.pascalCase('a B-c'))//mixCase
 * //'GetMyUrl'
 * console.log(_.pascalCase('getMyURL'))//camelCase
 * //'AbCdEf'
 * console.log(_.pascalCase('AB_CD_EF'))//snakeCase
 * //'ABcDEfGhXy'
 * console.log(_.pascalCase('aBc   D__EF_GH----XY_'))//mixCase
 *
 * @param str
 * @returns 返回新字符串
 */
function pascalCase(str: string): string {
  return _getGrouped(toString(str)).reduce(
    (acc, v) => acc + upperFirst(v.toLowerCase()),
    ''
  )
}

export default pascalCase