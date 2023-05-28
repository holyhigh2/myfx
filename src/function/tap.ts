/**
 * 传递v为参数执行interceptor函数，然后返回v。常用于函数链的过程调试，比如在filter后执行日志操作
 * <p>
 * 注意，一旦函数链执行了shortcut fusion，tap函数的执行会延迟到一个数组推导完成后执行
 * </p>
 *
 * @example
 * //shortut fusion中的tap只保留最后一个
 * _([1,2,3,4])
 * .map(v=>v*3).tap(v=>console.log(v))//被覆盖
 * .filter(v=>v%2===0).tap(v=>console.log(v))//会延迟，并输出结果[6,12]
 * .join('-')
 * .value()
 *
 * @param v
 * @param interceptor (v);如果v是引用值，改变v将影响后续函数流
 * @returns v
 */
function tap<T>(v: T, interceptor: Function): T {
  interceptor(v)
  return v
}

export default tap