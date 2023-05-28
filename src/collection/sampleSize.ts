import { Collection, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import _identity from "../_identity";
import toArray from "../collection/toArray";
import range from "../array/range";
import randi from "../math/randi";
import pop from "../array/pop";
import map from "../collection/map";

/**
 * 返回对指定列表的指定数量随机采样结果
 * @example
 * //[随机值]
 * console.log(_.sampleSize([1,2,3,4,5,6,7,8,9,0]))
 * //[随机值1,随机值2]
 * console.log(_.sampleSize([{a:1},{b:2},{c:3},{d:4},{e:5}],2))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param [count=1] 采样数量
 * @returns 采样结果
 * @since 0.16.0
 */
function sampleSize<T>(collection: Collection<T>, count?: number): T[] {
  count = count || 1
  const ary = toArray<T>(collection)
  const seeds = range(0, ary.length)
  const ks: number[] = []
  while (seeds.length > 0) {
    if (count-- < 1) break
    const i = pop<number>(seeds, randi(seeds.length))
    if (i) ks.push(i)
  }
  const rs = map<number, UnknownMapKey, T>(ks, (v) => ary[v])
  return rs
}

export default sampleSize