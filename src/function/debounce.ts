/**
 * 防抖函数对象：在防抖函数上附加 `cancel()`。
 * @since 1.16.0
 */
export type DebouncedFunction<T extends (...args: any[]) => any> = T & {
  /**
   * 丢弃尚未执行的排队调用。队列为空时为安全空操作。
   * immediate 模式下会重置冷却状态，使下次调用可再次立即执行。
   */
  cancel: () => void
}

/**
 * 创建一个包含指定函数逻辑的防抖函数并返回。在防抖函数执行后的下一次调用会在 `wait` 间隔结束后执行，如果等待期间调用函数则会重置wait时间。
 * 对于一些需要等待过程停止后执行的场景非常有用，如输入结束时的查询、窗口resize后的计算等等
 *
 * 返回的防抖函数额外带有 `cancel()`，用于丢弃尚未执行的排队调用。
 * 典型场景：宿主（组件/组件库）卸载时清除已排队的回调，避免回调迟到执行时访问已销毁的实例。
 *
 * @example
 * //2
 * let log = _.debounce(console.log);
 * console.log(log(1),log(2))
 *
 * @example
 * //取消排队中的调用
 * let save = _.debounce(doSave, 300)
 * save(data)
 * save.cancel()   //doSave 不会被触发
 *
 * @param fn 需要调用的函数
 * @param wait 抖动间隔，ms
 * @param immediate 立即执行一次，默认false
 * @returns 包装后的防抖函数（含 `cancel()`）
 * @since 1.4.0
 */
function debounce<T extends (...args: any[]) => any>(fn: T, wait: number, immediate: boolean = false): DebouncedFunction<T> {
  let timer: any = null
  //最后一次调用的 this/args。原实现靠每次调用的闭包捕获，但 clearTimeout 只会留下
  //最后一次的闭包；改为显式暂存后语义等价，且 cancel 时能一并释放。
  let lastThis: any = null
  let lastArgs: any[] | null = null

  //统一的调用入口：先取出并清空暂存参数，再执行，保证 cancel/重复取消都是安全的
  function invoke() {
    timer = null
    if (lastArgs === null) return
    let args = lastArgs
    let self = lastThis
    lastArgs = lastThis = null
    fn.apply(self, args)
  }

  const debounced = function (this: any, ...args: any[]) {
    lastThis = this
    lastArgs = args
    //immediate：首次（或冷却结束后）调用同步执行；冷却期内的调用只重置计时，不触发 trailing
    const callNow = immediate && timer === null
    clearTimeout(timer)
    timer = setTimeout(function () {
      timer = null
      if (immediate) {
        lastThis = lastArgs = null
      } else {
        invoke()
      }
    }, wait)
    if (callNow) {
      const a = lastArgs
      const s = lastThis
      lastThis = lastArgs = null
      fn.apply(s, a)
    }
  } as unknown as DebouncedFunction<T>

  debounced.cancel = function () {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    lastThis = lastArgs = null
  }

  return debounced
}

export default debounce
