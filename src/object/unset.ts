import isObject from "../is/isObject"
import { UnknownMapKey } from "../types"
import _toPath from "../_toPath"
/**
 * 删除obj上path路径对应属性
 * @param obj 需要设置属性值的对象，如果obj不是对象(isObject返回false)，直接返回obj
 * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
 * @since 2.3
 * @returns 成功返回true，失败或路径不存在返回false
 */
function unset(
  obj: Record<UnknownMapKey, any>,
  path: Array<string | number> | string | number
): boolean {
  if (!isObject(obj)) return obj
  const chain = _toPath(path)
  let target = obj
  for (let i = 0; i < chain.length; i++) {
    const seg = chain[i]
    const nextSeg = chain[i + 1]
    let tmp = target[seg]
    if (nextSeg) {
      tmp = target[seg] = !tmp ? (isNaN(nextSeg as any) ? {} : []) : tmp
    } else {
      return delete target[seg]
    }
    target = tmp
  }
  return false
}

export default unset