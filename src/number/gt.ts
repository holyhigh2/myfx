import toNumber from './toNumber'
/**
 * 判断a是否大于b
 *
 * @example
 * //true
 * console.log(_.gt(2,1))
 * //false
 * console.log(_.gt(5,'5'))
 *
 * @param a
 * @param b
 * @returns
 * @since 1.0.0
 */
function gt(a: any, b: any): boolean {
  return toNumber(a) > toNumber(b)
}

export default gt