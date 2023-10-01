import isNil from '../is/isNil'
/**
 * a / b
 * @example
 * //0.5
 * console.log(_.divide(1,2))
 * //Infinity
 * console.log(_.divide(1,null))
 * //NaN
 * console.log(_.divide(1,NaN))
 * 
 * @param a 
 * @param b 
 * @returns a/b
 * @since 1.0.0
 */
function divide(a:number,b:number):number{
  a = isNil(a) ? 0 : a
  b = isNil(b) ? 0 : b
  return a / b
}

export default divide