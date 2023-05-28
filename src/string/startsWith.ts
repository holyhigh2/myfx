import toString from "./toString"
/**
 * 验证字符串是否以查询子字符串开头
 *
 * @example
 * //true
 * console.log(_.startsWith('func.js','func'))
 * //false
 * console.log(_.startsWith('func.js','func',3))
 * //true
 * console.log(_.startsWith('func.js','c',3))
 *
 * @param str
 * @param searchStr 查询字符串
 * @param [position=0] 索引
 * @returns 如果以查询子字符串开头返回true，否则返回false
 */
function startsWith(
  str: any,
  searchStr: string,
  position?: number
): boolean {
  return toString(str).startsWith(searchStr, position)
}

export default startsWith