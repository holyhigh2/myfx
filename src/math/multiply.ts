import isNil from '../is/isNil'
/**
 * a * b
 * @example
 * //2
 * console.log(_.multiply(1,2))
 * //0
 * console.log(_.multiply(1,null))
 * //NaN
 * console.log(_.multiply(1,NaN))
 * 
 * @param a 
 * @param b 
 * @returns a*b
 * @since 1.0.0
 */
function multiply(a: number, b: number): number {
  a = isNil(a) ? 0 : a
  b = isNil(b) ? 0 : b
  return a * b
}

export default multiply