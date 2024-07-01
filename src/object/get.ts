import isObject from "../is/isObject"
import _toPath from "../_toPath"
/**
 * 通过path获取对象属性值
 *
 * @example
 * //2
 * console.log(_.get([1,2,3],1))
 * //Holyhigh
 * console.log(_.get({a:{b:[{x:'Holyhigh'}]}},['a','b',0,'x']))
 * //Holyhigh2
 * console.log(_.get({a:{b:[{x:'Holyhigh2'}]}},'a.b.0.x'))
 * //Holyhigh
 * console.log(_.get({a:{b:[{x:'Holyhigh'}]}},'a.b[0].x'))
 * //hi
 * console.log(_.get([[null,[null,null,'hi']]],'[0][1][2]'))
 * //not find
 * console.log(_.get({},'a.b[0].x','not find'))
 *
 * @param obj 需要获取属性值的对象，如果obj不是对象(isObject返回false)，则返回defaultValue
 * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
 * @param [defaultValue] 如果path未定义，返回默认值
 * @returns 属性值或默认值
 */
function get<V>(
  obj: any,
  path: Array<string | number> | string | number,
  defaultValue?: any
): V {
  if (!isObject(obj)) return defaultValue
  const chain = _toPath(path)
  let target = obj as any
  for (let i = 0; i < chain.length; i++) {
    const seg = chain[i]
    target = target[seg]
    if (!target) break
  }
  if (target === undefined) target = defaultValue
  return target as V
}

export default get