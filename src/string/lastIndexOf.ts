import toString from "./toString"
/**
 * 查找指定值在字符串中最后出现的位置索引
 *
 * @example
 * //10
 * console.log(_.lastIndexOf('cyberfunc.js','js'))
 * //-1
 * console.log(_.lastIndexOf('cyberfunc.js','js',5))
 *
 * @param str
 * @param search 指定字符串
 * @param [fromIndex=Infinity] 起始索引，从起始索引位置向左查找指定字符串
 * @returns 最后一个匹配搜索字符串的位置索引或-1
 */
function lastIndexOf(str: any, search: string, fromIndex?: number): number {
  str = toString(str)
  return str.lastIndexOf(search, fromIndex || Infinity)
}

export default lastIndexOf