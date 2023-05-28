import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
/**
 * 将一个或多个源对象的可枚举属性值分配到目标对象中属性值为undefined的属性上。
 * 如果源对象有多个，则按照从左到右的顺序依次对target赋值，相同属性会被忽略
 * 
 * > 该函数会修改目标对象
 * 
 * - 当目标对象是null/undefined时，返回空对象
 * - 当目标对象是基本类型时，返回对应的包装对象
 * - 当目标对象是不可扩展/冻结/封闭状态时，返回目标对象
 * 
 * @example
 * //{a: 1, b: 2, c: 3}
 * console.log(_.defaults({a:1},{b:2},{c:3,b:1,a:2}))
 *
 * @param target 目标对象
 * @param sources 1-n个源对象
 * @returns 返回target
 * @since 0.21.0
 */
function defaults<T extends Record<UnknownMapKey, any>>(
  target: T,
  ...sources: any[]
): T {
  const rs = _checkTarget(target)
  if (rs) return rs

  _eachSources(target, sources, null, (v, sv, tv, k, s, t) => {
    if (t[k] === undefined) {
      t[k] = v
    }
  })
  return target
}

export default defaults