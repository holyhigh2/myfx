import toString from "./toString"
/**
 * 使用<code>replaceValue</code>替换<code>str</code>中的首个<code>searchValue</code>部分
 *
 * @example
 * //'func-js'
 * console.log(_.replace('func.js','.','-'))
 * //''
 * console.log(_.replace(null,'.','-'))
 * //'kelikeli'
 * console.log(_.replace('geligeli',/ge/g,'ke'))
 * //'geligeli'
 * console.log(_.replace('kelikeli',/ke/g,()=>'ge'))
 *
 * @param str 字符串。非字符串值会自动转换成字符串
 * @param searchValue 查找内容，正则或者字符串
 * @param replaceValue 替换内容，字符串或处理函数。函数的返回值将用于替换
 * @returns 替换后的新字符串
 */
function replace(
  str: any,
  searchValue: RegExp | string,
  replaceValue: string | ((substring: string, ...args: any[]) => string)
): string {
  return toString(str).replace(searchValue, replaceValue as any)
}

export default replace