import _hasOwn from "../_hasOwn"
import _toPath from "../_toPath"
import isObject from "../is/isObject"
import type { UnknownMapKey } from "../types"
/**
 * 删除obj上path路径对应属性
 * @param obj 需要设置属性值的对象，如果obj不是对象(isObject返回false)，直接返回obj
 * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
 * @since 1.0.0
 * @returns 成功返回true，失败或路径不存在返回false
 */
function unset(
  obj: Record<UnknownMapKey, any>,
  path: Array<string | number> | string | number
): boolean {
  if (!isObject(obj)) return false
  const chain = _toPath(path)
  let target = obj
  for (let i = 0; i < chain.length; i++) {
    const seg = chain[i]
    if (seg === "__proto__" || seg === "constructor" || seg === "prototype") {
      return false
    }
    const nextSeg = chain[i + 1]
    if (!_hasOwn(target, seg)) return false
    if (nextSeg) {
      const tmp = target[seg]
      if (tmp === null || tmp === undefined) return false
      target = tmp
    } else {
      return delete target[seg]
    }
  }
  return false
}

export default unset