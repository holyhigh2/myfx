/**
 * 启动计时器，并在倒计时为0后调用函数。
 * 内部使用setTimeout进行倒计时，如需中断延迟可以使用clearTimeout函数。*注意，该函数并不提供防抖逻辑*
 *
 * @example
 * //1000ms 后显示some text !
 * _.delay(console.log,1000,'some text','!');
 *
 * @param fn 需要调用的函数
 * @param [wait=0] 倒计时。单位ms
 * @param [args] 传入定时函数的参数
 * @returns 计时器id
 */
function delay(fn: any, wait?: number, ...args: any[]): NodeJS.Timeout {
  return setTimeout(() => {
    fn(...args)
  }, wait || 0)
}

export default delay