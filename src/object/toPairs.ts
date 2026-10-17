import type { UnknownMapKey } from "../types";
/**
 * 返回指定对象的所有[key,value]组成的二维数组
 *
 * @example
 * //[['a', 1], ['b', 2], ['c', 3]]
 * console.log(_.toPairs({a:1,b:2,c:3}))
 *
 * @param obj
 * @returns 二维数组
 */
function toPairs(obj: Record<UnknownMapKey, any>): any[][] {
  const rs: any[] = []
  if (obj == null) return rs
  const ks = Object.keys(obj)
  for (let i = 0; i < ks.length; i++) {
    const k = ks[i]
    rs.push([k, obj[k]])
  }
  return rs
}

export default toPairs