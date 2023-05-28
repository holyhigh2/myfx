import toString from "./toString"
/**
 * 验证字符串是否以查询子字符串结尾
 *
 * @example
 * //true
 * console.log(_.endsWith('func.js','js'))
 * //true
 * console.log(_.endsWith('func.js','c',4))
 *
 * @param str
 * @param searchStr 查询字符串
 * @param position 索引
 * @returns 如果以查询子字符串开头返回true，否则返回false
 */
function endsWith(str: any, searchStr: string, position?: number): boolean {
  return toString(str).endsWith(searchStr, position)
}

export default endsWith