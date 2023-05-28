import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import isObject from "../is/isObject";
import isFunction from "../is/isFunction";
/**
 * 与<code>defaults</code>相同，但会递归对象属性
 * 
 * > 该函数会修改目标对象
 * 
 * @example
 * //{a: {x: 1, y: 2, z: 3}, b: 2}
 * console.log(_.defaultsDeep({a:{x:1}},{b:2},{a:{x:3,y:2}},{a:{z:3,x:4}}))
 *
 * @param target 目标对象
 * @param sources 1-n个源对象
 * @returns 返回target
 * @since 0.21.0
 */
function defaultsDeep<T extends Record<UnknownMapKey, any>>(
  target: T,
  ...sources: any[]
): T {
  const rs = _checkTarget(target)
  if (rs) return rs

  _eachSources(target, sources, null, (v, sv, tv, k, s, t) => {
    if (tv === undefined) {
      t[k] = v
    } else if (isObject(tv) && !isFunction(tv)) {
      defaultsDeep(tv, sv)
    }
  })
  return target
}

export default defaultsDeep