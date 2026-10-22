import _caseScan from "../_caseScan";

/**
 * 返回短横线风格的字符串
 *
 * 非ASCII字符（如CJK、重音字母、代理对）不会被丢弃：无大小写形态的按「字母」原样保留参与分词，
 * 有大小写形态的按其大小写归类（大写视为分词边界并转为小写）
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
 * //'café-bar'
 * console.log(_.kebabCase('caféBar'))//unicode
 *
 * @param str
 * @returns 返回新字符串
 */
function kebabCase(str: any): string {
  return _caseScan(str, "-")
}

export default kebabCase
