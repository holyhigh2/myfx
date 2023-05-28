import isString from "./isString";
import isObject from "./isObject";
import isFunction from "./isFunction";
import { ArrayLike ,IList} from "../types";
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
function isArrayLike(v: unknown): v is ArrayLike {
  if (isString(v) && v.length > 0) return true
  if (!isObject(v)) return false
  // 具有length属性
  const list = v as IList
  if (list.length !== undefined) {
    const proto = list.constructor.prototype
    // NodeList/HTMLCollection/CSSRuleList/...
    if (isFunction(proto.item)) return true
    // arguments
    if (isFunction(list[Symbol.iterator])) return true
  }

  return false
}

export default isArrayLike