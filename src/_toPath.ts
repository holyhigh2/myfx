import isArray from "./is/isArray"

// 数组路径解析的哨兵分隔符：BRACKET 标记 [..] 段，ELEMENT 标记数组元素边界
const BRACKET = '\u0001'
const ELEMENT = '\u0000'
const SENTINEL_RE = /[\u0000\u0001]/
// [key] / ["key"] / ['key'] → 段边界；数组分支替换为 BRACKET，字符串分支替换为 '.'
const BRACKET_RE = /\[(['"])?([^\]'"]+)\1?\]/gm

/**
 * 解析path并返回数组
 * @example
 * //['a', 'b', '2', 'c']
 * console.log(_.toPath('a.b[2].c'))
 * //['a', 'b', 'c', '1']
 * console.log(_.toPath(['a','b','c[1]']))
 * //['1']
 * console.log(_.toPath(1))
 *
 * @param path 属性路径，可以是数字索引，字符串key，或者多级属性数组
 * @returns path数组
 * @since 0.16.0
 */
function toPath(path: Array<string | number> | string | number): string[] {
  if (isArray(path)) {
    let s = (path as Array<string | number>)
      .map((el) => (el + '').replace(BRACKET_RE, BRACKET + '$2'))
      .join(ELEMENT)
    if (s[0] === BRACKET) {
      s = s.substring(1)
    }
    return s.split(SENTINEL_RE)
  }

  let rs = path + ''
  if (rs.includes('[')) {
    rs = rs.replace(BRACKET_RE, '.$2')
  }
  if (rs[0] === '.') {
    rs = rs.substring(1)
  }

  return rs.split('.')
}

export default toPath