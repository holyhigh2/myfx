import _toPath from "../_toPath"
import isObject from "../is/isObject"
import type { UnknownMapKey } from "../types"
/**
 * 通过path设置对象属性值。如果路径不存在则创建，索引会创建数组，属性会创建对象
 * <div class="alert alert-secondary">
      该函数会修改源对象
    </div>

    @example
 * //{"a":1,"b":{"c":[undefined,{"x":10}]}}
 * console.log(_.set({a:1},'b.c.1.x',10))
 *
 * @param obj 需要设置属性值的对象，如果obj不是对象(isObject返回false)，直接返回obj
 * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
 * @param value 任何值
 * @returns obj 修改后的源对象
 * @since 0.16.0
 */
function set(
  obj: Record<UnknownMapKey, any>,
  path: Array<string | number> | string | number,
  value: any
): Record<UnknownMapKey, any> {
  if (!isObject(obj)) return obj
  const chain = _toPath(path)
  let target = obj
  for (let i = 0; i < chain.length; i++) {
    const seg = chain[i]
    const nextSeg = chain[i + 1]
    let tmp = target[seg]
    if (nextSeg) {
      let next = !tmp ? (isNaN(nextSeg as any) ? {} : []) : tmp
      if (!tmp) {
        tmp = target[seg] = next
      }
    } else {
      target[seg] = value
      break
    }
    target = tmp
  }
  return obj
}

export default set