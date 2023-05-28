/**
 * 创建一个包含指定函数逻辑的包装函数并返回。该函数仅执行一次
 *
 * @example
 * //2748, undefined
 * let parseInt2 = _.once(parseInt);
 * console.log(parseInt2('abc',16),parseInt2('abc',16))
 *
 * @param fn 需要调用的函数
 * @returns 包装后的函数
 */
function once(fn: any): Function {
  let proxy = fn
  return (...args: any[]) => {
    let rtn
    if (proxy) {
      rtn = proxy(...args)
    }
    ; (proxy as any) = null
    return rtn
  }
}

export default once