import { Collection, NonFuncItee, UnknownMapKey } from "../types"
import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import _identity from "../_identity";
import each from "./each";

/**
 * 创建一个对象，对象的key是iteratee返回的值，对象的值是collection中最后一个key对应的值
 * @example
 * //{true: 9, false: 'd'}
 * console.log(_.keyBy([1,'a',3,'b',5,'c',7,'d',9],_.isNumber))g
 * const users = [
 *  {name:'zhangsan',sex:'m',age:33},
 *  {name:'lisi',sex:'f',age:21},
 *  {name:'wangwu',sex:'m',age:25},
 *  {name:'zhaoliu',sex:'m',age:44},
 * ]
 * //{m: {...}, f: {...}}
 * console.log(_.keyBy(users,u=>u.sex))
 * //{20: {...}, 30: {...}, 40: {...} }
 * console.log(_.keyBy(users,u=>(u.age/10>>0)*10))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param [iteratee=identity] (value)回调函数，返回统计key
 * @returns 统计对象
 * @since 1.0.0
 */
function keyBy<K extends string | number | symbol>(
  collection: Collection<any>,
  itee?: ((value: unknown) => K) | NonFuncItee
): Record<K, unknown>
function keyBy<V,K extends string | number | symbol>(
  collection: Collection<V,K>,
  itee?: ((value: V) => K) | NonFuncItee
): Record<K, V>
function keyBy<V,K extends string | number | symbol>(
  collection: Collection<V,K>,
  itee?: ((value: V) => K) | NonFuncItee
): Record<K, V> {
  const stat: Record<UnknownMapKey, unknown> = {}
  const cb = _iteratee(itee || _identity)
  each(collection, (el) => {
    const key = cb(el)
    stat[key] = el
  })
  return stat as Record<K, V>
}

export default keyBy