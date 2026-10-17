import _cloneBuiltInObject from "../_cloneBuiltInObject";
import isElement from "../is/isElement";
import isFunction from "../is/isFunction";
import isMap from "../is/isMap";
import isObject from "../is/isObject";
import isSet from "../is/isSet";
import type { UnknownMapKey } from "../types";

function cloneDeepWith<T extends Record<string | number | symbol, any>>(
  obj: T,
  handler?: (v: any, k: UnknownMapKey, obj: T) => any,
  skip?: (v: any, k: string | number | symbol) => boolean,
  _visited?: WeakMap<object, any>
): T
function cloneDeepWith<T extends Record<string | number | symbol, any>, U>(
  obj: T,
  handler?: (v: any, k: UnknownMapKey, obj: T) => any,
  skip?: (v: any, k: string | number | symbol) => boolean,
  _visited?: WeakMap<object, any>
): U
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
function cloneDeepWith<T extends Record<string | number | symbol, any>, U>(
  obj: T,
  handler?: (v: any, k: UnknownMapKey, obj: T) => any,
  skip: (v: any, k: string | number | symbol) => boolean = (value?, key?) => false,
  _visited?: WeakMap<object, any>
): U {
  if (!isObject(obj)) return obj
  if (isFunction(obj)) return <T>obj
  if (isElement(obj)) return <T>obj

  const visited = _visited || new WeakMap<object, any>()

  // Map/Set 需要深拷贝其内部元素（内置浅拷贝分支无法满足）
  if (isMap(obj) || isSet(obj)) {
    if (visited.has(obj)) return visited.get(obj)

    const cloneValue = (val: any, key: any): any => {
      if (isObject(val)) {
        const cached = visited.get(val)
        if (cached !== undefined) return cached
      }
      if (handler) {
        let nv = handler(val, key, obj)
        if (isObject(nv) && nv !== val) {
          nv = cloneDeepWith<any, any>(nv, handler, skip, visited)
        }
        return nv
      }
      return isObject(val) ? cloneDeepWith<any, any>(val, undefined, skip, visited) : val
    }

    if (isMap(obj)) {
      const copy = new Map<any, any>()
      visited.set(obj, copy)
      obj.forEach((v: any, k: any) => {
        if (skip(v, k)) return
        const newKey = isObject(k) ? cloneDeepWith<any, any>(k, undefined, skip, visited) : k
        copy.set(newKey, cloneValue(v, k))
      })
      return copy as any
    }

    const copy = new Set<any>()
    visited.set(obj, copy)
    obj.forEach((v: any) => {
      if (skip(v, v)) return
      copy.add(cloneValue(v, v))
    })
    return copy as any
  }

  const copy0 = _cloneBuiltInObject(obj)
  if (copy0 !== null) return copy0 as any

  if (visited.has(obj)) return visited.get(obj)

  const copy = new (obj as any).constructor()
  visited.set(obj, copy)
  const propNames = Object.keys(obj)
  propNames.forEach((p) => {
    if (p === "__proto__") return
    const value = obj[p]
    const skipTag = skip(value, p)
    if (skipTag) return

    if (isObject(value)) {
      const cached = visited.get(value)
      if (cached !== undefined) {
        ; (copy as any)[p] = cached
        return
      }
    }

    let newProp
    if (handler) {
      newProp = handler(value, p, obj)
      if (isObject(newProp) && newProp !== value) {
        newProp = cloneDeepWith<T, U>(<T>newProp, handler, skip, visited)
      }
    } else {
      newProp = isObject(value) ? cloneDeepWith<T, U>(<T>value, undefined, skip, visited) : value
    }
    try {
      // maybe unwritable
      ; (copy as any)[p] = newProp
    } catch (e) { }
  })

  return copy as any;
}

export default cloneDeepWith