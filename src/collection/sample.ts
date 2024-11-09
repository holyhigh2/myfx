import randi from '../math/randi';
import type { Collection } from "../types";
import toArray from "./toArray";

/**
 * 返回对指定列表的唯一随机采样结果
 * @example
 * //随机值
 * console.log(_.sample([1,2,3,4,5,6,7,8,9,0]))
 * //随机值
 * console.log(_.sample({a:1,b:2,c:3,d:4,e:5}))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @returns 采样结果
 * @since 0.16.0
 */
function sample<T>(collection: Collection<T>): T {
  const ary = toArray<T>(collection)
  return ary[randi(ary.length)]
}

export default sample