import isArray from "../is/isArray";
import isMap from "../is/isMap";
import isObject from "../is/isObject";
import type { UnknownMapKey } from "../types";
import assign from "./assign";
/**
 * 解析传递参数并返回一个根据参数值创建的Object实例。
 * 支持数组对、k/v对、对象、混合方式等创建
 * 是 toPairs 的反函数
 *
 * @example
 * //{a:1,b:2}
 * console.log(_.toObject('a',1,'b',2))
 * //如果参数没有成对匹配，最后一个属性值则为undefined
 * //{a:1,b:2,c:undefined}
 * console.log(_.toObject('a',1,'b',2,'c'))
 * //{a:1,b:4,c:3} 重复属性会覆盖
 * console.log(_.toObject(['a',1,'b',2],['c',3],['b',4]))
 * //{a:1,b:2} 对象类型返回clone
 * console.log(_.toObject({a:1,b:2}))
 * //{1:now time,a:{}} 混合方式
 * console.log(_.toObject([1,new Date],'a',{}))
 *
 * @param vals 对象创建参数，可以是一个数组/对象或者多个成对匹配的基本类型或者多个不定的数组/对象
 * @returns 如果没有参数返回空对象
 */
function toObject<V extends Record<UnknownMapKey, any>>(...vals: any[]): V {
  if (vals.length === 0) return {} as V
  const rs: Record<UnknownMapKey, any> = {}
  const pairs: any[] = [] // 存放k/v
  let key: unknown = null

  vals.forEach((v) => {
    if (isArray(v)) {
      const tmp = toObject(...v)
      assign(rs, tmp)
    } else if (isMap(v)) {
      v.forEach((val, k: any) => {
        rs[k] = val
      })
    } else if (isObject(v)) {
      if (key) {
        pairs.push(key, v)
        key = null
      } else {
        assign(rs, v)
      }
    } else {
      if (key) {
        pairs.push(key, v)
        key = null
      } else {
        key = v
      }
    }
  })
  if (key) {
    pairs.push(key)
  }
  if (pairs.length > 0) {
    for (let i = 0; i < pairs.length; i += 2) {
      rs[pairs[i]] = pairs[i + 1]
    }
  }

  return rs
}

export default toObject