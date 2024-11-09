import isFunction from "../is/isFunction";
/**
 * 创建一个新的函数，该函数的参数会传递给第一个<code>fns</code>函数来计算结果，而结果又是第二个fns函数的参数，以此类推，
 * 直到所有函数执行完成。常用于封装不同的可重用函数模块组成新的函数或实现惰性计算，比如
 *
 * <pre><code class="language-javascript">
 * let checkName = _.compose(_.trim,v=>v.length>6);
 * checkName(' holyhigh') //=> true
 * checkName(' ') //=> false
 * </code></pre>
 *
 * @example
 * // Holyhigh
 * let formatName = _.compose(_.lowerCase,_.capitalize);
 * console.log(formatName('HOLYHIGH'))
 *
 * @param  {...function} fns
 * @returns 组合后的入口函数
 */
function compose<T extends (...args: any[]) => any>(...fns: any[]): T {
  return (function (...args: any[]) {
    let rs = fns[0](...args)
    for (let i = 1; i < fns.length; i++) {
      if (isFunction(fns[i])) {
        rs = fns[i](rs)
      }
    }
    return rs
  }) as T
}

export default compose