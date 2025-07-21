import clone from "./clone";
import cloneDeepWith from "./cloneDeepWith";
/**
 * 完整复制对象,可以保持被复制属性的原有类型
 *
 * 如果obj是基本类型，返回原值
 * 如果obj是函数类型，返回原值
 * 只复制对象的自身可枚举属性
 *
 * @example
 * //true
 * console.log(_.cloneDeep({d:new Date}).d instanceof Date)
 *
 * @param obj
 * @returns 被复制的新对象
 */
function cloneDeep<T extends Record<string | number | symbol, any>>(
  obj: T
): T
function cloneDeep<T extends Record<string | number | symbol, any>, U>(
  obj: T
): U
function cloneDeep<T extends Record<string | number | symbol, any>>(
  obj: T
): T {
  return cloneDeepWith<T>(obj, clone)
}

export default cloneDeep