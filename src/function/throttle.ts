/**
 * 节流函数对象：在节流函数上附加 `cancel()` / `flush()`。
 * @since 2.0.0
 */
export type ThrottledFunction<T extends (...args: any[]) => any> = T & {
  /**
   * 丢弃尚未执行的排队trailing调用，并释放内部滞留的参数引用（如DOM Event）。队列为空时为安全空操作。
   * 典型场景：宿主（组件/组件库）卸载时调用，避免trailing回调迟到执行时访问已销毁的实例。
   */
  cancel: () => void
  /**
   * 如果存在排队的trailing调用则立即执行并清除计时器；队列为空时为安全空操作。
   */
  flush: () => void
}

/**
 * 创建一个包含指定函数逻辑的节流函数并返回。每当节流函数执行后都会等待`wait`间隔归零才可再次调用，等待期间调用函数无效。
 * 对于一些需要降低执行频率的场景非常有用，如onmousemove、onscroll等事件中
 *
 * 返回的节流函数额外带有 `cancel()` / `flush()`（语义镜像`debounce`的`cancel()`）：
 * `cancel()`丢弃排队中的trailing调用并释放滞留的参数引用；`flush()`立即执行排队中的trailing调用。
 *
 * @example
 * //每隔1秒输出当前时间
 * let log = _.throttle(console.log,1000);
 * setInterval(()=>log(new Date().toTimeString()),100)
 *
 * //宿主销毁时取消排队中的调用
 * let onScroll = _.throttle(doLayout, 200)
 * window.addEventListener('scroll', onScroll)
 * //destroyed: onScroll.cancel() //trailing回调不会再触发
 *
 * @param fn 需要调用的函数
 * @param wait 抖动间隔，ms
 * @param options 执行选项
 * @param options.leading 首次是否执行，默认true
 * @param options.trailing 最后一次是否执行，默认true
 * @returns 包装后的节流函数（含 `cancel()` / `flush()`）
 * @since 1.4.0
 */
function throttle<T extends (...args: any[]) => any>(fn: T, wait: number, options?: { leading?: boolean, trailing?: boolean }): ThrottledFunction<T> {
  let proxy = fn
  let lastExec = 0
  let timer: any = null
  let timeoutArgs: any
  let timeoutContext: any
  const leading = options?.leading === undefined ? true : options.leading
  const trailing = options?.trailing === undefined ? true : options.trailing

  function timeout() {
    if (trailing) {
      for (const arg of timeoutArgs || []) {
        if (EventTargetMap.has(arg)) {
          let targets = EventTargetMap.get(arg)
          let ks = Object.keys(targets)
          for (const k of ks) {
            Object.defineProperty(arg, k, {
              value: targets[k],
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
          EventTargetMap.delete(arg)
        }
      }
      proxy.apply(timeoutContext, timeoutArgs);
    }

    lastExec = Date.now();
    // 执行后释放滞留的参数/this引用（含DOM Event）
    timeoutArgs = timeoutContext = timer = null;
  }

  const throttled = function (this: any, ...args: any[]) {
    timeoutArgs = args.map(arg => {
      if (typeof globalThis.Event === 'function' && arg instanceof globalThis.Event) {
        EventTargetMap.set(arg, {
          currentTarget: arg.currentTarget,
          fromElement: Reflect.get(arg, 'fromElement'),
          relatedTarget: Reflect.get(arg, 'relatedTarget'),
          target: arg.target,
          toElement: Reflect.get(arg, 'toElement'),
        })
      }
      return arg
    })
    timeoutContext = this
    let now = Date.now()
    let remaining = wait - (now - lastExec)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (leading) {
        proxy.apply(this, args);
        lastExec = now;
        // leading执行后释放滞留的参数引用（含DOM Event），trailing由后续调用重新暂存
        timeoutArgs = timeoutContext = null;
      } else if (trailing) {
        timer = setTimeout(timeout, wait);
      } else {
        lastExec = now;
        timeoutArgs = timeoutContext = null;
      }
    } else if (!timer) {
      timer = setTimeout(timeout, remaining);
    }
  } as unknown as ThrottledFunction<T>

  throttled.cancel = function () {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    timeoutArgs = timeoutContext = null
  }

  throttled.flush = function () {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
      timeout()
    }
  }

  return throttled
}

const EventTargetMap = new WeakMap

export default throttle
