import toNumber from './toNumber'
/**
 * 判断a是否小于等于b
 *
 * @example
 * //true
 * console.log(_.lte(1,2))
 * //true
 * console.log(_.lte(5,'5'))
 * //false
 * console.log(_.lte(5,'b'))
 *
 * @param a
 * @param b
 * @returns
 * @since 1.0.0
 */
function lte(a: any, b: any): boolean {
  return toNumber(a) <= toNumber(b)
}

export default lte