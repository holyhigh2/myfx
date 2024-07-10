import { Collection, NonFuncItee, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import _identity from "../_identity";
import each from "./each";

/**
 * 创建一个统计对象，对象的key是iteratee返回的值，对应的值是由所有key对应值组成的数组
 * @example
 * //{true: [1, 3, 5, 7, 9], false: ['a', 'b', 'c', 'd']}
 * console.log(_.groupBy([1,'a',3,'b',5,'c',7,'d',9],_.isNumber))
 * const users = [
 *  {name:'zhangsan',sex:'m',age:33},
 *  {name:'lisi',sex:'f',age:21},
 *  {name:'wangwu',sex:'m',age:25},
 *  {name:'zhaoliu',sex:'m',age:44},
 * ]
 * //{m: [{...},{...},{...}], f: [{...}]} 性别分布统计
 * console.log(_.groupBy(users,u=>u.sex))
 * //{20: [{...},{...}], 30: [{...}], 40: [{...}]} 年龄段分布统计
 * console.log(_.groupBy(users,u=>(u.age/10>>0)*10))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param [iteratee=identity] (value)回调函数，返回统计key
 * @returns 统计对象
 * @since 1.0.0
 */
function groupBy<V>(
  collection: Collection<V>,
  itee?: ((value: V) => UnknownMapKey) | NonFuncItee
): Record<UnknownMapKey, unknown[]> 
function groupBy<V,U>(
  collection: Collection<V>,
  itee?: ((value: V) => UnknownMapKey) | NonFuncItee
): U 
function groupBy<V,U>(
  collection: Collection<V>,
  itee?: ((value: V) => UnknownMapKey) | NonFuncItee
): U {
  const stat: Record<UnknownMapKey, unknown[]> = {}
  const cb = _iteratee(itee || _identity)
  each(collection, (el) => {
    const key = cb(el)
    if (stat[key] === undefined) stat[key] = []

    stat[key].push(el)
  })
  return <U>stat
}

export default groupBy