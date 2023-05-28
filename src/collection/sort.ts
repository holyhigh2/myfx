import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import _identity from "../_identity";
import toArray from "./toArray";
import isFunction from "../is/isFunction";
import sortBy from "./sortBy";
import { Collection } from "../types";

/**
 * 对集合进行排序，并返回排序后的数组副本。
 *
 * @example
 * //字符排序 ['lao1', 'lao2', 'lao3']
 * console.log(_.sort(['lao1','lao3','lao2']))
 * //数字排序[7, 9, 80]
 * console.log(_.sort([9,80,7]))
 * //日期排序["3/1/2019", "2020/1/1", Wed Apr 01 2020...]
 * console.log(_.sort([new Date(2020,3,1),'2020/1/1','3/1/2019']))
 * //第一个元素不是日期对象，需要转换
 * console.log(_.sort(_.map(['2020/1/1',new Date(2020,3,1),'3/1/2019'],v=>new Date(v))))
 * //对象排序
 * const users = [
 *  {name:'zhangsan',age:53},
 *  {name:'lisi',age:44},
 *  {name:'wangwu',age:25},
 *  {name:'zhaoliu',age:36}
 * ];
 * //[25,36,44,53]
 * console.log(_.sort(users,(a,b)=>a.age-b.age))
 * // 倒排
 * console.log(_.sort(users,(a,b)=>b.age-a.age))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param [comparator] (a,b) 排序函数，如果为空使用sortBy逻辑
 * @returns 排序后的数组
 */
function sort<T>(
  collection: Collection<T>,
  comparator?: (a: T, b: T) => number
): T[] {
  const ary = toArray<T>(collection)
  if (ary.length < 1) return ary
  if (isFunction(comparator)) {
    return ary.sort(comparator)
  } else {
    return sortBy(collection)
  }
}

export default sort