import _identity from "../_identity";
import type { UnknownMapKey } from "../types";
/**
 * 同<code>omit</code>，但支持断言函数进行剔除
 * @example
 * //{c: '3'}
 * console.log(_.omitBy({a:1,b:2,c:'3'},_.isNumber))
 *
 * @param obj 选取对象
 * @param [predicate=identity] (v,k)断言函数
 * @returns 对象子集
 * @since 0.23.0
 */
function omitBy<V, K extends UnknownMapKey>(
  obj: Record<UnknownMapKey, any>,
  predicate?: (v: V, k: K) => boolean
): Record<UnknownMapKey, any> {
  const rs: Record<UnknownMapKey, any> = {}
  if (obj === null || obj === undefined) return rs
  Object.keys(obj).forEach(k => {
    let v = obj[k]
    if (!(predicate || _identity)(v, k as K)) {
      rs[k] = v
    }
  })
  return rs
}

export default omitBy