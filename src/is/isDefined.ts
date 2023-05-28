/**
 * isUndefined()的反向验证函数，在需要验证是否变量存在的场景下非常有用
 * @example
 * //true
 * console.log(_.isDefined(null))
 * //false
 * console.log(_.isDefined(undefined))
 *
 * @param v
 * @returns
 */
function isDefined(v: unknown): boolean {
  return v !== undefined
}

export default isDefined