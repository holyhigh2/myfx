/**
 * 创建一个包含指定函数逻辑的节流函数并返回。每当节流函数执行后都会等待`wait`间隔归零才可再次调用，等待期间调用函数无效。
 * 对于一些需要降低执行频率的场景非常有用，如onmousemove、onscroll等事件中
 * *注意*，如果节流函数作为事件回调时，尾部执行会导致event参数target属性丢失
 *
 * @example
 * //每隔1秒输出当前时间
 * let log = _.throttle(console.log,1000);
 * setInterval(()=>log(new Date().toTimeString()),100)
 *
 * @param fn 需要调用的函数
 * @param wait 抖动间隔，ms
 * @param options 执行选项
 * @param options.leading 首次是否执行，默认true
 * @param options.trailing 最后一次是否执行，默认true
 * @returns 包装后的函数
 * @since 1.4.0
 */
function throttle<T extends (...args:any[])=>any>(fn: T, wait: number, options?:{leading?:boolean,trailing?:boolean}): T {
  let proxy = fn
  let lastExec = 0
  let timer: any = null
  let timeoutArgs:any
  let timeoutContext:any
  options = options || { leading: true, trailing: true }
  options.leading = options.leading === undefined ? true : options.leading;
  options.trailing = options.trailing === undefined ? true : options.trailing;

  function timeout() {
    if (options?.trailing)
    proxy.apply(timeoutContext,timeoutArgs);

    lastExec = Date.now();
    timeoutArgs = timer = null;
  }

  return (function(...args: any[]){
    timeoutArgs = args
    timeoutContext = this
    let now = Date.now()
    let remaining = wait - (now - lastExec)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timeoutArgs = timer = null
      }
      if (options?.leading){
        proxy.apply(this,args);
      }
        
      lastExec = now;
    } else if (!timer) {
      timer = setTimeout(timeout, remaining);
    }
  }) as T
}

export default throttle