/**
 * 转换整数。小数部分会直接丢弃
 *
 * @example
 * //9
 * console.log(_.toInteger(9.99))
 * //12
 * console.log(_.toInteger('12.34'))
 * //0
 * console.log(_.toInteger(null))
 * //0
 * console.log(_.toInteger(new Error))
 *
 * @param v
 * @returns
 * @since 1.0.0
 */
function toInteger(v: any): number {
  if (v === null || v === undefined) return 0
  return parseInt(v)
}

export default toInteger