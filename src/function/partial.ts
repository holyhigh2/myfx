const PLACEHOLDER = void 0
/**
 * 创建一个新的函数，该函数会调用fn，并传入指定的部分参数。
 * 
 * `partial()`常用来创建函数模板或扩展核心函数，比如
 * 
 * ```js
 * let delay2 = _.partial(setTimeout,undefined,2000);
 * delay2(()=>\{console.log('2秒后调用')\})
 * ```
 *
 * @example
 * //2748
 * let hax2num = _.partial(parseInt,undefined,16);
 * console.log(hax2num('abc'))
 * //9
 * let square = _.partial(Math.pow,undefined,2);
 * console.log(square(3))
 * //￥12,345.00元
 * let formatYuan = _.partial(_.formatNumber,undefined,'￥,000.00元');
 * console.log(formatYuan(12345))
 * //[func.js] hi...
 * let log = _.partial((...args)=>args.join(' '),'[func.js][',undefined,']',undefined);
 * console.log(log('info','hi...'))
 *
 * @param fn 需要调用的函数
 * @param args 参数可以使用undefined作为占位符，以此来确定不同的实参位置
 * @returns 部分应用后的新函数
 */
function partial<T extends (...args:any[])=>any>(fn: any, ...args: any[]): T {
  return ((...params: any[])=> {
    let p = 0
    const applyArgs = args.map((v) => (v === PLACEHOLDER ? params[p++] : v))
    if (params.length > p) {
      for (let i = p; i < params.length; i++) {
        applyArgs.push(params[i])
      }
    }
    return fn(...applyArgs)
  }) as T
}

export default partial