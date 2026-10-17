import isArray from "../is/isArray";
import randi from "../math/randi";
import type { Collection } from "../types";
import toArray from "./toArray";

/**
 * 返回对指定列表的指定数量随机采样结果
 * @example
 * //[随机值]
 * console.log(_.sampleSize([1,2,3,4,5,6,7,8,9,0]))
 * //[随机值1,随机值2]
 * console.log(_.sampleSize([{a:1},{b:2},{c:3},{d:4},{e:5}],2))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param count 采样数量
 * @returns 采样结果
 * @since 0.16.0
 */
function sampleSize<T>(collection: Collection<T>, count: number = 1): T[] {
  const n0 = count == null ? 1 : count
  const ary = isArray<T>(collection) ? (collection as T[]).slice() : toArray<T>(collection)
  const len = ary.length
  const k = Math.min(len, Math.max(0, Math.trunc(n0) || 0))
  const rs: T[] = []
  for (let i = 0; i < k; i++) {
    const j = randi(i, len)
    const tmp = ary[i]
    ary[i] = ary[j]
    ary[j] = tmp
    rs.push(ary[i])
  }
  return rs
}

export default sampleSize