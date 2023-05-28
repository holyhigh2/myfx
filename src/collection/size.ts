import { IList } from "../types";
import isNil from "../is/isNil";
import isMap from "../is/isMap";
import isSet from "../is/isSet";
import isObject from "../is/isObject";
/**
 * 获取集合对象的内容数量，对于map/object对象获取的是键/值对的数量
 *
 * @example
 * //3
 * console.log(_.size({a:1,b:2,c:{x:1}}))
 * //0
 * console.log(_.size(null))
 * //3
 * console.log(_.size(new Set([1,2,3])))
 * //2
 * console.log(_.size([1,[2,[3]]]))
 * //2
 * console.log(_.size(document.body.children))
 * //4
 * console.log(_.size(document.body.childNodes))
 * //3 arguments已不推荐使用，请使用Rest参数
 * console.log((function(){return _.size(arguments)})('a',2,'b'))
 * //7
 * console.log(_.size('func.js'))
 *
 * @param collection
 * @returns 集合长度，对于null/undefined/WeakMap/WeakSet返回0
 */
function size(collection: any): number {
  if (isNil(collection)) return 0
  if (((collection as IList).length))
    return (collection as IList).length
  if (isMap(collection) || isSet(collection)) return collection.size
  if (isObject(collection)) return Object.keys(collection).length
  return 0
}

export default size