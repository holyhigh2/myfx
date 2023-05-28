import isArrayLike from "./isArrayLike";
/**
 * 判断参数是否为空，包括`null/undefined/空字符串/0/[]/{}`都表示空
 * 
 * 注意：相比isBlank，isEmpty只判断字符串长度是否为0
 *
 * @example
 * //true
 * console.log(_.isEmpty(null))
 * //true
 * console.log(_.isEmpty([]))
 * //false
 * console.log(_.isEmpty({x:1}))
 *
 * @param v
 * @returns
 */
function isEmpty(v: unknown): boolean {
  if (null === v) return true
  if (undefined === v) return true
  if ('' === v) return true
  if (0 === v) return true
  if (isArrayLike(v) && v.length < 1) return true
  if (v instanceof Object && Object.keys(v).length < 1) return true
  return false
}

export default isEmpty