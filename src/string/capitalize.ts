import toString from "./toString"
/**
 * 把字符串的首字母大写，如果首字母不是ascii中的a-z则返回原值
 *
 * @example
 * //Abc
 * console.log(_.capitalize('abc'))
 * //''
 * console.log(_.capitalize(null))
 * //1
 * console.log(_.capitalize(1))
 *
 *
 * @param str 字符串
 * @returns 对于null/undefined会返回空字符串
 */
function capitalize(str: any): string {
  str = toString(str)
  if (str.length < 1) return str
  return str[0].toUpperCase() + toString(str.substring(1)).toLowerCase()
}

export default capitalize