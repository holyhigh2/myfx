import { UnknownMapKey } from "../types"
import _identity from "../_identity"
import _cloneBuiltInObject from "../_cloneBuiltInObject"
import isObject from "../is/isObject";
import isFunction from "../is/isFunction";
/**
 * 完整复制对象,可以保持被复制属性的原有类型。支持赋值处理器
 *
 * 如果obj是基本类型，返回原值
 * 如果obj是函数类型，返回原值
 * 只复制对象的自身可枚举属性
 *
 * @example
 * //true
 * console.log(_.cloneDeepWith({d:new Date}).d instanceof Date)
 *
 * @param obj
 * @param handler (obj[k],k,obj) 自定义赋值处理器，返回赋予新对象[k]的值。默认 `identity`
 * @returns 被复制的新对象
 */
function cloneDeepWith(
  obj: Record<UnknownMapKey, any>,
  handler?: (v: any, k: UnknownMapKey, obj: Record<UnknownMapKey, any>) => any
): any {
  if (!isObject(obj)) return obj
  if (isFunction(obj)) return obj

  let copy = _cloneBuiltInObject(obj)
  if (copy !== null) return copy

  copy = new (obj as any).constructor()
  const propNames = Object.keys(obj)
  propNames.forEach((p) => {
    let newProp = (handler || _identity)(obj[p], p, obj)
    if (isObject(newProp)) {
      newProp = cloneDeepWith(newProp, handler)
    }
    try {
      // maybe unwritable
      ; (copy as any)[p] = newProp
    } catch (e) { }
  })

  return copy
}

export default cloneDeepWith