import flatDeep from "../array/flatDeep"
import includes from "../collection/includes"
import type { UnknownMapKey } from "../types"
import pickBy from "./pickBy"
/**
 * 创建一个指定属性的对象子集并返回
 * @example
 * //{b: 2}
 * console.log(_.pick({a:1,b:2,c:'3'},'b'))
 * //{b: 2,c:'3'}
 * console.log(_.pick({a:1,b:2,c:'3'},'b','c'))
 * //{a: 1, b: 2}
 * console.log(_.pick({a:1,b:2,c:'3'},['b','a']))
 *
 * @param obj 选取对象
 * @param props 属性集合
 * @returns 对象子集
 * @since 0.16.0
 */
function pick(
  obj: Record<UnknownMapKey, any>,
  ...props: (string | string[])[]
): Record<UnknownMapKey, any> {
  const keys = flatDeep(props)
  return pickBy(obj, (v, k) => {
    return includes(keys, k)
  })
}

export default pick