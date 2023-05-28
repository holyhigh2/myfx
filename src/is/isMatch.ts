import isMatchWith from "./isMatchWith";
import _eq from "../_eq";
/**
 * 检测props对象中的所有属性是否在object中存在，可用于对象的深度对比。
 * 使用<code>eq</code>作为值对比逻辑
 *
 * @example
 * let target = {a:{x:1,y:2},b:1}
 * //true
 * console.log(_.isMatch(target,{b:1}))
 * //true
 * console.log(_.isMatch(target,{a:{x:1}}))
 *
 * target = [{x:1,y:2},{b:1}]
 * //true
 * console.log(_.isMatch(target,{1:{b:1}}))
 * //true
 * console.log(_.isMatch(target,[{x:1}]))
 *
 * @param object
 * @param props 对比属性对象，如果是null，返回true
 * @returns 匹配所有props返回true
 * @since 0.17.0
 */
function isMatch<T extends Record<string | number | symbol, any>>(
  object: T,
  props: T
): boolean {
  return isMatchWith(object, props, _eq)
}

export default isMatch