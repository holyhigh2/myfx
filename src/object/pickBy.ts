import { UnknownMapKey } from "../types"
import _identity from "../_identity";
/**
 * 同<code>pick</code>，但支持断言函数进行选取
 * @example
 * //{a: 1, b: 2}
 * console.log(_.pickBy({a:1,b:2,c:'3'},_.isNumber))
 *
 * @param obj 选取对象
 * @param [predicate=identity] (v,k)断言函数
 * @returns 对象子集
 * @since 0.23.0
 */
function pickBy<V, K extends UnknownMapKey>(
  obj: Record<UnknownMapKey, any>,
  predicate?: (v: V, k: K) => boolean
): Record<UnknownMapKey, any> {
  const rs: Record<UnknownMapKey, any> = {}
  if(obj === null || obj === undefined)return rs
  Object.keys(obj).forEach(k=>{
    let v = obj[k]
    if ((predicate || _identity)(v, k as K)) {
      rs[k] = v
    }
  })
  return rs
}

export default pickBy