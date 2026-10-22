import _caseScan from "../_caseScan";

/**
 * 返回帕斯卡风格的字符串
 *
 * 非ASCII字符（如CJK、重音字母、代理对）不会被丢弃：无大小写形态的按「字母」原样保留参与分词，
 * 有大小写形态的按其大小写归类
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
 * //'CaféBar'
 * console.log(_.pascalCase('caféBar'))//unicode
 *
 * @param str
 * @returns 返回新字符串
 */
function pascalCase(str: string): string {
  return _caseScan(str, undefined, true)
}

export default pascalCase
