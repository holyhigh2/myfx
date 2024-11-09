import _eq from "../_eq";
import slice from "../array/slice";
import isArrayLike from "../is/isArrayLike";
import isString from "../is/isString";
import type { Collection } from "../types";
import each from "./each";

/**
 * 判断集合中是否包含给定的值。使用<code>eq</code>函数进行等值判断。
 *
 * @example
 * //true
 * console.log(_.includes({a:1,b:2},2))
 * //false
 * console.log(_.includes([1,3,5,7,[2]],2))
 * //true
 * console.log(_.includes([1,3,5,7,[2]],3))
 * //false
 * console.log(_.includes([1,3,5,7,[2]],3,2))
 * //true
 * console.log(_.includes([0,null,undefined,NaN],NaN))
 * //true
 * console.log(_.includes('abcdefg','abc'))
 * //false
 * console.log(_.includes('abcdefg','abc',2))
 * //false
 * console.log(_.includes('aBcDeFg','abc'))
 *
 * @param collection 如果集合是map/object对象，则只对value进行比对
 * @param value
 * @param [fromIndex=0] 从集合的fromIndex 索引处开始查找。如果集合是map/object对象，无效
 * @returns 如果包含返回true否则返回false
 */
function includes(collection: Collection<any>, value: any, fromIndex?: number): boolean {
  let rs = false
  fromIndex = fromIndex || 0
  if (isString(collection)) {
    return collection.includes(value, fromIndex)
  }
  collection = isArrayLike(collection)
    ? slice(collection, fromIndex)
    : collection
  each(collection, (v) => {
    if (_eq(v, value)) {
      rs = true
      return false
    }
  })
  return rs
}

export default includes