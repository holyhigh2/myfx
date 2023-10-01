import toString from "./toString"
import escapeRegExp from './escapeRegExp'
import isObject from '../is/isObject'
import isRegExp from '../is/isObject'
/**
 * 对超过指定长度的字符串进行截取并在末尾追加代替字符
 *
 * @example
 * //func...
 * console.log(_.truncate('func.js',4))
 * //func...
 * console.log(_.truncate('func.js',6,{separator:/\.\w+/g}))
 * //func.js.com...
 * console.log(_.truncate('func.js.com.cn',13,{separator:'.'}))
 * //func.js
 * console.log(_.truncate('func.js',10))
 * //fun!!!
 * console.log(_.truncate('func.js',3,{omission:'!!!'}))
 *
 * @param str
 * @param len 最大长度。如果长度大于<code>str</code>长度，直接返回str
 * @param options 可选项
 * @param options.omission 替代字符，默认 '...'
 * @param options.separator 截断符。如果截取后的字符串中包含截断符，则最终只会返回截断符之前的内容
 * @returns 返回新字符串
 * @since 1.0.0
 */
function truncate(
  str: any,
  len: number,
  options?: { omission?: '...'; separator?: string | RegExp }
) {
  str = toString(str)
  if (str.length <= len) return str

  if (!isObject(options)) {
    options = { omission: '...' }
  }

  options.omission = options.omission || '...'

  str = str.substring(0, len)
  if (options.separator) {
    let separator = options.separator
    if (!isRegExp(separator)) {
      separator = new RegExp(escapeRegExp(separator), 'g')
    } else if (!separator.global) {
      separator = new RegExp(separator, separator.flags + 'g')
    }
    let rs
    let tmp
    while ((tmp = separator.exec(str)) !== null) {
      rs = tmp
    }
    if (rs) {
      str = str.substring(0, rs.index)
    }
  }

  return str + options.omission
}

export default truncate