/**
 * 创建一个包含指定函数逻辑且内置计数的包装函数并返回。
 * 该函数每调用一次计数会减一，直到计数为0后生效。可用于异步结果汇总时只调用一次的场景
 *
 * @example
 * //undefined, undefined, 'data saved'
 * let saveTip = _.after(()=>'data saved',2);
 * console.log(saveTip(),saveTip(),saveTip())
 *
 * @param fn 需要调用的函数
 * @param [count=0] 计数
 * @returns 包装后的函数
 */
function after<T extends (...args:any[])=>any>(fn: T, count?: number): T {
  const proxy = fn
  let i = count || 0
  let rtn: any
  return ((...args: any[]) => {
    if (i === 0) {
      rtn = proxy(...args)
    }
    if (i > 0) i--
    return rtn
  }) as T
}

export default after