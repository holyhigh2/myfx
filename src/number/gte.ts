import toNumber from './toNumber'
/**
 * 判断a是否大于等于b
 *
 * @example
 * //true
 * console.log(_.gte(2,1))
 * //true
 * console.log(_.gte(5,'5'))
 * //false
 * console.log(_.gte(5,'b'))
 *
 * @param a
 * @param b
 * @returns
 * @since 1.0.0
 */
function gte(a: any, b: any): boolean {
  return toNumber(a) >= toNumber(b)
}

export default gte