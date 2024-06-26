/**
 * 创建一个包含指定函数逻辑的防抖函数并返回。在防抖函数执行后的下一次调用会在 `wait` 间隔结束后执行，如果等待期间调用函数则会重置wait时间。
 * 对于一些需要等待过程停止后执行的场景非常有用，如输入结束时的查询、窗口resize后的计算等等
 *
 * @example
 * //2
 * let log = _.debounce(console.log);
 * console.log(log(1),log(2))
 *
 * @param fn 需要调用的函数
 * @param wait 抖动间隔，ms
 * @param immediate 立即执行一次，默认false
 * @returns 包装后的函数
 * @since 1.4.0
 */
function debounce(fn: any, wait: number, immediate:boolean=false): Function {
  let proxy = fn
  let timer: any = null
  let counting = false
  if(immediate){
    return function(...args: any[]) {
      if(!counting)
        proxy.apply(this,args)
      counting = true;

      clearTimeout(timer)
      timer = setTimeout(() => {
        counting = false;
        proxy.apply(this,args)
      }, wait);
    }
  }else{
    return function(...args: any[]) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        proxy.apply(this,args)
      }, wait);
    }
  }  
}

export default debounce