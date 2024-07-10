import { UnknownMapKey } from "../types"
import _identity from "../_identity"
import isObject from "../is/isObject"
import isFunction from "../is/isFunction"
import _cloneBuiltInObject from "../_cloneBuiltInObject";
import isElement from "../is/isElement"

/**
 * 浅层复制对象，支持赋值处理器
 * 如果obj是基本类型，返回原值
 * 如果obj是函数类型，返回原值
 * 如果obj是元素类型，返回原值
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
 * @param handler (value,key) 自定义赋值处理器，返回赋予新对象[k]的值。默认 `identity`
 * @param skip (value,key) (value,key) 返回true 跳过clone该属性
 * @returns 被复制的新对象
 */
function cloneWith<T>(
  obj: Record<UnknownMapKey, any>,
  handler: (v: any, k: string | number | symbol) => any = _identity,
  skip: (v: any, k: string | number | symbol) => boolean = ()=>false
):T {
  if (!isObject(obj)) return obj
  if (isFunction(obj)) return <T>obj
  if (isElement(obj)) return <T>obj

  let copy = _cloneBuiltInObject(obj)
  if (copy !== null) return <T>copy
  copy = new (obj as any).constructor()
  const propNames = Object.keys(obj)
  propNames.forEach((p) => {
    let skipTag = skip(obj[p], p)
    if(skipTag)return;
    let newProp = (handler || _identity)(obj[p], p)
    try {
      // maybe unwritable
      ; (copy as any)[p] = newProp
    } catch (e) { }
  })
  return <T>copy;
}

export default cloneWith