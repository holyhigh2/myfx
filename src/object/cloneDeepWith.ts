import _cloneBuiltInObject from "../_cloneBuiltInObject";
import isElement from "../is/isElement";
import isFunction from "../is/isFunction";
import isObject from "../is/isObject";
import type { UnknownMapKey } from "../types";
import clone from "./clone";
/**
 * 完整复制对象,可以保持被复制属性的原有类型。支持赋值处理器
 *
 * 如果obj是基本类型，返回原值
 * 如果obj是函数类型，返回原值
 * 如果obj是元素类型，返回原值
 * 只复制对象的自身可枚举属性
 *
 * @example
 * //true
 * console.log(_.cloneDeepWith({d:new Date}).d instanceof Date)
 *
 * @param obj
 * @param handler (value,key,obj) 自定义赋值处理器，返回赋予新对象[k]的值，当返回对象且返回值与被复制值相同引用则跳过深度复制。默认 `clone`
 * @param skip (value,key) 返回true 跳过clone该属性
 * @returns 被复制的新对象
 */
function cloneDeepWith<T>(
  obj: Record<UnknownMapKey, any>,
  handler?: (v: any, k: UnknownMapKey, obj: Record<UnknownMapKey, any>) => any,
  skip: (v: any, k: string | number | symbol) => boolean = (value?, key?) => false
): T {
  if (!isObject(obj)) return obj
  if (isFunction(obj)) return <T>obj
  if (isElement(obj)) return <T>obj

  let copy = _cloneBuiltInObject(obj)
  if (copy !== null) return <T>copy

  copy = new (obj as any).constructor()
  const propNames = Object.keys(obj)
  propNames.forEach((p) => {
    let skipTag = skip(obj[p], p)
    if (skipTag) return;

    let newProp = (handler || clone)(obj[p], p, obj)
    if (isObject(newProp) && newProp !== obj[p]) {
      newProp = cloneDeepWith(newProp, handler)
    }
    try {
      // maybe unwritable
      ; (copy as any)[p] = newProp
    } catch (e) { }
  })

  return <T>copy
}

export default cloneDeepWith