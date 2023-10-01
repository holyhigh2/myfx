import isNil from '../is/isNil'
/**
 * a + b
 * @example
 * //3
 * console.log(_.add(1,2))
 * //1
 * console.log(_.add(1,null))
 * //NaN
 * console.log(_.add(1,NaN))
 * 
 * @param a 
 * @param b 
 * @returns a+b
 * @since 1.0.0
 */
function add(a:number,b:number):number{
  a = isNil(a) ? 0 : a
  b = isNil(b) ? 0 : b
  return a + b
}

export default add