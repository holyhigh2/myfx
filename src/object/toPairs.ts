import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _noop from "../_noop";
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
  const rs:any[] = []
  for(let k in obj){
    let v = obj[k]
    rs.push([k, v])
  }
  return rs
}

export default toPairs