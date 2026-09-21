import type { ArrayLike, IList } from "../types";
import isFunction from "./isFunction";
/**
 * 判断参数是否为类数组对象
 *
 * @example
 * //true
 * console.log(_.isArrayLike('abc123'))
 * //true
 * console.log(_.isArrayLike([]))
 * //true
 * console.log(_.isArrayLike(document.body.children))
 *
 * @param v
 * @returns
 */
function isArrayLike<T>(v: unknown): v is ArrayLike<T> {
  const t = typeof v
  if (t === 'string') return (v as string).length > 0
  if ((t !== 'object' && t !== 'function') || v === null) return false
  if (v instanceof String) return v.length > 0
  if (Array.isArray(v)) return true

  // 具有length属性
  const list = v as IList
  if ('length' in list) {
    const proto = Reflect.getPrototypeOf(list) as Record<string, unknown> | null
    // NodeList/HTMLCollection/CSSRuleList/...
    if (isFunction(proto?.item)) return true
    // arguments
    if (isFunction(list[Symbol.iterator])) return true
  }

  return false
}

export default isArrayLike