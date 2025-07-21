import _identity from "../_identity";
import cloneWith from "./cloneWith";
/**
 * 浅层复制对象
 * 如果是基本类型，返回原值
 * 如果是函数类型，返回原值
 * 只复制对象的自身可枚举属性
 *
 * @example
 * //null
 * console.log(_.clone(null))
 *
 * @param obj
 * @returns 被复制的新对象
 */
function clone<T extends Record<string | number | symbol, any>>(obj: T): T
function clone<T extends Record<string | number | symbol, any>, U>(obj: T): U
function clone<T extends Record<string | number | symbol, any>, U>(obj: T): U {
  return cloneWith<T, U>(obj, _identity)
}

export default clone