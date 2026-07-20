import isArray from "./is/isArray"

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
  let chain = path
  if (isArray(chain)) {
    chain = chain.join('.')
  }

  let rs = chain + ''
  if (rs.includes('[')) {
    rs = rs.replace(/\[(['"])?([^\]'"]+)\1?\]/gm, '.$2')
  }
  if (rs[0] === '.') {
    rs = rs.substring(1)
  }

  return rs.split('.')
}

export default toPath