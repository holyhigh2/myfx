import toNumber from './toNumber'
/**
 * 判断a是否小于b
 *
 * @example
 * //true
 * console.log(_.lt(1,2))
 * //false
 * console.log(_.lt(5,'5'))
 *
 * @param a
 * @param b
 * @returns
 * @since 1.0.0
 */
function lt(a: any, b: any): boolean {
  return toNumber(a) < toNumber(b)
}

export default lt