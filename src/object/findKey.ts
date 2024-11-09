import _iteratee from "../_iteratee";
import type { NonFuncItee, UnknownMapKey } from "../types";
/**
 * 对`object`内的所有属性进行断言并返回第一个匹配的属性key
 *
 * @example
 * const libs = {
 *  'func.js':{platform:['web','nodejs'],tags:{utils:true}},
 *  'juth2':{platform:['web','java'],tags:{utils:false,middleware:true}},
 *  'soya2d':{platform:['web'],tags:{utils:true}}
 * }
 *
 * //func.js 查询对象的key
 * console.log(_.findKey(libs,'tags.utils'))
 * //juth2
 * console.log(_.findKey(libs,{'tags.utils':false}))
 * //tags
 * console.log(_.findKey(libs['soya2d'],'utils'))
 * //2
 * console.log(_.findKey([{a:1,b:2},{c:2},{d:3}],'d'))
 *
 * @param object 所有集合对象array / arrayLike / map / object / ...
 * @param predicate (value[,index|key[,collection]]) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 第一个匹配断言的元素的key或undefined
 */
function findKey<V>(
  object: any,
  predicate:
    | ((value: V, index: UnknownMapKey, collection: any) => boolean)
    | NonFuncItee
): string | number | symbol | undefined {
  const callback = _iteratee(predicate)
  let rs
  for (let k in object) {
    let v = object[k]
    const r = callback(v, k, object)
    if (r) {
      rs = k
      break
    }
  }
  return rs
}

export default findKey