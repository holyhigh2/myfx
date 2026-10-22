import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import isFunction from "../is/isFunction";
import isObject from "../is/isObject";
import type { UnknownMapKey } from "../types";
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

  walkDefaults(target, sources, new WeakMap<object, WeakSet<object>>())
  return target
}

function walkDefaults(
  target: Record<UnknownMapKey, any>,
  sources: any[],
  seen: WeakMap<object, WeakSet<object>>
) {
  _eachSources(target, sources, null, (v, sv, tv, k, s, t) => {
    if (tv === undefined) {
      t[k] = v
    } else if (isObject(tv) && !isFunction(tv) && Array.isArray(tv) === Array.isArray(sv)) {
      // 容器类型不同（数组 vs 对象）不递归：defaults 语义是"只补 undefined"
      const rs = _checkTarget(tv)
      if (rs) return
      // 循环引用防护：同一(target,source)对只递归一次，自引用结构不会栈溢出
      if (isObject(sv)) {
        let seenSet = seen.get(tv)
        if (!seenSet) {
          seenSet = new WeakSet<object>()
          seen.set(tv, seenSet)
        }
        if (seenSet.has(sv)) return
        seenSet.add(sv)
      }
      walkDefaults(tv, [sv], seen)
    }
  })
}

export default defaultsDeep