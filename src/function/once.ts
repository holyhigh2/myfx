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
function once<T extends (...args: any[]) => any>(fn: T): T {
  let proxy = fn
  return ((...args: any[]) => {
    let rtn
    if (proxy) {
      let m = proxy;
      (proxy as any) = null;
      rtn = m(...args)
    }

    return rtn
  }) as T
}

export default once