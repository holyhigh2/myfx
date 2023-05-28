/**
 * 判断值是否NaN本身。与全局isNaN函数相比，只有NaN值本身才会返回true
 * <p>
 * isNaN(undefined) => true <br>
 * _.isNaN(undefined) => false
 * </p>
 *
 * @example
 * //true
 * console.log(_.isNaN(NaN))
 * //false
 * console.log(_.isNaN(null))
 * //false
 * console.log(_.isNaN(undefined))
 *
 * @param v
 * @returns
 */
function isNaN(v: unknown): boolean {
  return Number.isNaN(v)
}

export default isNaN