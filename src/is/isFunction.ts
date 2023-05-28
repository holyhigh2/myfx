/**
 * 判断参数是否为函数对象
 *
 * @example
 * //true
 * console.log(_.isFunction(new Function()))
 * //true
 * console.log(_.isFunction(()=>{}))
 *
 * @param v
 * @returns
 */
function isFunction(v: unknown): v is Function {
  return typeof v == 'function' || v instanceof Function
}

export default isFunction