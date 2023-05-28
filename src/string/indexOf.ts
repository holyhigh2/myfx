import toString from "./toString"
/**
 * 查找指定值在字符串中首次出现的位置索引
 *
 * @example
 * //10
 * console.log(_.indexOf('cyberfunc.js','js'))
 * //10
 * console.log(_.indexOf('cyberfunc.js','js',5))
 *
 * @param str
 * @param search 指定字符串
 * @param [fromIndex=0] 起始索引
 * @returns 第一个匹配搜索字符串的位置索引或-1
 */
function indexOf(str: any, search: string, fromIndex?: number): number {
  str = toString(str)
  return str.indexOf(search, fromIndex || 0)
}

export default indexOf