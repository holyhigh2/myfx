/**
 * 判断值是不是异常对象
 *
 * @example
 * //true
 * console.log(_.isError(new TypeError))
 * //false
 * console.log(_.isError(Error))
 * //true
 * try{a=b}catch(e){console.log(_.isError(e))}
 *
 * @param v
 * @returns
 * @since 1.0.0
 */
function isError(v: unknown): v is Error {
  return v instanceof Error || Object.prototype.toString.call(v) === '[object Error]'
}

export default isError