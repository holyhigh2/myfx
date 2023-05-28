import isNil from '../is/isNil'
/**
 * a - b
 * @example
 * //-1
 * console.log(_.subtract(1,2))
 * //1
 * console.log(_.subtract(1,null))
 * //NaN
 * console.log(_.subtract(1,NaN))
 * 
 * @param a 
 * @param b 
 * @returns a - b
 * @since 2.3
 */
function subtract(a:number,b:number):number{
  a = isNil(a) ? 0 : a
  b = isNil(b) ? 0 : b
  return a - b
}

export default subtract