import _identity from "../_identity";
import _iteratee from "../_iteratee";
import type { Collection, NonFuncItee, UnknownMapKey } from "../types";
import each from "./each";

/**
 * 创建一个统计对象，对象的key是iteratee返回的值，对应的值是相同key出现的次数
 * @example
 * //{true: 5, false: 4}
 * console.log(_.countBy([1,'a',3,'b',5,'c',7,'d',9],_.isNumber))
 * const users = [
 *  {name:'zhangsan',sex:'m',age:33},
 *  {name:'lisi',sex:'f',age:21},
 *  {name:'wangwu',sex:'m',age:25},
 *  {name:'zhaoliu',sex:'m',age:44},
 * ]
 * //{m: 3, f: 1} 性别分布统计
 * console.log(_.countBy(users,u=>u.sex))
 * //{20: 2, 30: 1, 40: 1} 年龄段分布统计
 * console.log(_.countBy(users,u=>(u.age/10>>0)*10))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param [iteratee=identity] (value) 回调函数，返回统计key
 * @returns 统计对象
 * @since 1.0.0
 */
function countBy<V>(
  collection: Collection<V>,
  itee?: ((value: V) => string) | NonFuncItee
): Record<string, number>
function countBy<V, K extends string | number | symbol | object>(
  collection: Collection<V, K>,
  itee?: ((value: V) => K) | NonFuncItee
): Record<Exclude<K, object>, number>
function countBy<V, K extends string | number | symbol | object>(
  collection: Collection<V, K>,
  itee?: ((value: V) => K) | NonFuncItee
): Record<Exclude<K, object>, number> {
  const stat: Record<UnknownMapKey, any> = {}
  const cb = _iteratee(itee || _identity)
  each(collection, (el) => {
    const key = cb(el)
    if (stat[key] === undefined) stat[key] = 0

    stat[key]++
  })
  return stat
}

export default countBy