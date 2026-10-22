import _caseScan from "../_caseScan";

/**
 * 返回下划线风格的字符串
 *
 * 非ASCII字符（如CJK、重音字母、代理对）不会被丢弃：无大小写形态的按「字母」原样保留参与分词，
 * 有大小写形态的按其大小写归类（大写视为分词边界并转为小写）
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
 * //'café_bar'
 * console.log(_.snakeCase('caféBar'))//unicode
 *
 * @param str
 * @returns 返回新字符串
 */
function snakeCase(str: string): string {
  return _caseScan(str, "_")
}

export default snakeCase
