import _eachIterator from "../_eachIterator";
import _iteratee from "../_iteratee";
import _identity from "../_identity";
import isArray from "../is/isArray";
import isFunction from "../is/isFunction";
import isSet from "../is/isSet";
import isString from "../is/isString";
import isArrayLike from "../is/isArrayLike";
import isMap from "../is/isMap";
import isObject from "../is/isObject";
import values from "../object/values";

/**
 * 把一个集合对象转为array对象。对于非集合对象，
 * <ul>
 * <li>字符串 - 每个字符都会变成数组的元素</li>
 * <li>其他情况 - 返回包含一个collection元素的数组</li>
 * </ul>
 *
 * @example
 * //[1,2,3]
 * console.log(_.toArray(new Set([1,2,3])))
 * //['a','b','c']
 * console.log(_.toArray('abc'))
 * //[1,2,'b']
 * console.log(_.toArray({x:1,y:2,z:'b'}))
 * //[[1, 'a'], [3, 'b'], ['a', 5]]
 * console.log(_.toArray(new Map([[1,'a'],[3,'b'],['a',5]])))
 *
 * @param collection 如果是Map/Object对象会转换为值列表
 *
 * @returns 转换后的数组对象
 */
function toArray<T>(collection: any): T[] {
  if (isArray(collection)) return collection.concat()
  if (isFunction(collection)) return [collection as T]

  if (isSet(collection)) {
    return Array.from(collection)
  } else if (isString(collection)) {
    return collection.split('') as T[]
  } else if (isArrayLike(collection)) {
    return Array.from(collection as any)
  } else if (isMap(collection)) {
    return Array.from(collection.values())
  } else if (isObject(collection)) {
    return values(collection)
  }
  return [collection as T]
}

export default toArray