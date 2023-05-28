import toString from "./toString"
import escapeRegExp from './escapeRegExp'
import isRegExp from '../is/isRegExp'
import isString from '../is/isString'
import isObject from '../is/isObject'
/**
 * 使用<code>replaceValue</code>替换<code>str</code>中的所有<code>searchValue</code>部分
 *
 * @example
 * //'a-b-c'
 * console.log(_.replaceAll('a.b.c','.','-'))
 * //''
 * console.log(_.replaceAll(null,'.','-'))
 * //'kelikeli'
 * console.log(_.replaceAll('geligeli',/ge/,'ke'))
 * //'geligeli'
 * console.log(_.replaceAll('kelikeli',/ke/g,()=>'ge'))
 *
 * @param str 字符串。非字符串值会自动转换成字符串
 * @param searchValue 查找内容，正则或者字符串。非global模式的正则对象会自动转为global模式
 * @param replaceValue 替换内容，字符串或处理函数。函数的返回值将用于替换
 * @returns 替换后的新字符串
 * @since 1.3.0
 */
function replaceAll(
  str: any,
  searchValue: RegExp | string,
  replaceValue: string | ((substring: string, ...args: any[]) => string)
): string
function replaceAll(str: any, replacement: Record<string, any>): string
function replaceAll(
  str: any,
  searchValue: RegExp | string | Record<string, any>,
  replaceValue?: string | ((substring: string, ...args: any[]) => string)
): string {
  let searchExp: RegExp
  let strRs = toString(str)
  if (isRegExp(searchValue)) {
    searchExp = searchValue
    if (!searchValue.global) {
      searchExp = new RegExp(searchValue, searchValue.flags + 'g')
    }
    return strRs.replace(searchExp, replaceValue as any)
  } else if (isString(searchValue)) {
    searchExp = new RegExp(escapeRegExp(searchValue), 'g')
    return strRs.replace(searchExp, replaceValue as any)
  } else if (isObject(searchValue)) {
    const ks = Object.keys(searchValue)
    for (let i = ks.length; i--; ) {
      const k = ks[i]
      const v = searchValue[k]
      searchExp = new RegExp(escapeRegExp(k), 'g')
      strRs = strRs.replace(searchExp, v)
    }
    return strRs
  }
  return str
}

export default replaceAll