/**
 * 传递v为参数执行interceptor1函数，如果该函数返回值未定义(undefined)则执行interceptor2函数，并返回函数返回值。
 * 用于函数链中的分支操作
 * @example
 * //false
 * console.log(_.alt(9,v=>false,v=>20))
 *
 * @param v
 * @param interceptor1 (v)
 * @param interceptor2 (v)
 * @returns 函数返回值
 */
function alt(v: unknown, interceptor1: Function, interceptor2: Function): any {
  let rs = interceptor1(v)
  if (rs === undefined) {
    rs = interceptor2(v)
  }
  return rs
}

export default alt