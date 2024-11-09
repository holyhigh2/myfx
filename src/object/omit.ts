import flatDeep from "../array/flatDeep"
import type { UnknownMapKey } from "../types"
import omitBy from "./omitBy"
/**
 * 创建一个剔除指定属性的对象子集并返回。与pick()刚好相反
 * @example
 * //{a: 1, c: '3'}
 * console.log(_.omit({a:1,b:2,c:'3'},'b'))
 * //{a: 1}
 * console.log(_.omit({a:1,b:2,c:'3'},'b','c'))
 * //{c: '3'}
 * console.log(_.omit({a:1,b:2,c:'3'},['b','a']))
 *
 * @param obj 选取对象
 * @param props 属性集合
 * @returns 对象子集
 * @since 0.16.0
 */
function omit(
  obj: Record<UnknownMapKey, any>,
  ...props: (string | string[])[]
) {
  const keys: string[] = flatDeep(props)
  return omitBy<any, string>(obj, (v, k) => {
    return keys.includes(k)
  })
}

export default omit