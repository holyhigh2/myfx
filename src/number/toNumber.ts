/**
 * 转换任何对象为数字类型
 *
 * @example
 * //NaN
 * console.log(_.toNumber(null))
 * //1
 * console.log(_.toNumber('1'))
 * //NaN
 * console.log(_.toNumber([3,6,9]))
 * //-0
 * console.log(_.toNumber(-0))
 * //NaN
 * console.log(_.toNumber(NaN))
 * //NaN
 * console.log(_.toNumber('123a'))
 *
 * @param v 任何值
 * @returns 对于null/undefined会返回NaN
 */
function toNumber(v: any): number {
  if (v === undefined || v === null) return NaN
  return Number(v)
}

export default toNumber