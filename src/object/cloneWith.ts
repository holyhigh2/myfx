import { UnknownMapKey } from "../types"
import _identity from "../_identity"
import isObject from "../is/isObject"
import isFunction from "../is/isFunction"
import assignWith from "./assignWith"
import _cloneBuiltInObject from "../_cloneBuiltInObject";

/**
 * 浅层复制对象，支持赋值处理器
 * 如果obj是基本类型，返回原值
 * 如果obj是函数类型，返回原值
 *
 * 只复制对象的自身可枚举属性
 *
 * @example
 * //{x: 1, y: 2, z: null}
 * console.log(_.cloneWith({x:1,y:2,z:3},(v,k)=>k=='z'?null:v))
 * //null
 * console.log(_.cloneWith(null))
 *
 * @param obj
 * @param  {Function} [handler=identity] (obj[k],k) 自定义赋值处理器，返回赋予新对象[k]的值
 * @returns 被复制的新对象
 */
function cloneWith(
  obj: Record<UnknownMapKey, any>,
  handler: (v: any, k: string | number | symbol) => any = _identity
) {
  if (!isObject(obj)) return obj
  if (isFunction(obj)) return obj

  let copy = _cloneBuiltInObject(obj)
  if (copy !== null) return copy
  copy = new (obj as any).constructor()
  return assignWith(
    copy as Record<UnknownMapKey, any>,
    obj,
    (
      sv: Record<UnknownMapKey, any>,
      tv: Record<UnknownMapKey, any>,
      k: UnknownMapKey
    ) => handler(sv, k)
  )
}

export default cloneWith