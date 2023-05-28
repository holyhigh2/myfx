import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import _identity from "../_identity";
import size from "./size";
import sampleSize from "./sampleSize";
import { Collection } from "../types";

/**
 * 返回指定数组的一个随机乱序副本
 * @example
 * //[随机内容]
 * console.log(_.shuffle([1,2,3,4,5,6,7,8,9,0]))
 * //[随机内容]
 * console.log(_.shuffle([{a:1},{a:2},{a:3},{a:4},{a:5}]))
 * //[随机内容]
 * console.log(_.shuffle({a:1,b:2,c:3,d:4,e:5}))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @returns 乱序副本
 * @since 0.16.0
 */
function shuffle<T>(collection: Collection<T>): T[] {
  return sampleSize(collection, size(collection))
}

export default shuffle