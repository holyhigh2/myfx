import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _noop from "../_noop";
/**
 * <code>toPairs</code>反函数，创建一个由键值对数组组成的对象
 *
 * @example
 * //{a:1,b:2,c:3}
 * console.log(_.fromPairs([['a', 1], ['b', 2], ['c', 3]]))
 *
 * @param pairs 键值对数组
 * @returns 对象
 */
function fromPairs(pairs: any[][]): Record<UnknownMapKey, any> {
  const rs: Record<UnknownMapKey, any> = {}
  for(let k in pairs){
    let pair = pairs[k]
    rs[pair[0]] = pair[1]
  }
  return rs
}

export default fromPairs