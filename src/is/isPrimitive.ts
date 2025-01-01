import { PRIMITIVE_TYPES } from "../types"
/**
 * 判断参数是否为原始类型
 *
 * @example
 * //true
 * console.log(_.isPrimitive(1))
 * //true
 * console.log(_.isPrimitive(null)
 * //false
 * console.log(_.isPrimitive(new String()))
 * //true
 * console.log(_.isPrimitive(123n)
 *
 * @param v
 * @returns
 */
function isPrimitive(v: unknown): boolean {
  return null === v || PRIMITIVE_TYPES.indexOf(typeof v) > -1
}

export default isPrimitive