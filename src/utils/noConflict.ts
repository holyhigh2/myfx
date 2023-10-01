/**
 * 当通过非esm方式引用函数库时，函数库会默认挂载全局变量<code>_</code>。
 * 如果项目中存在其它以该变量为命名空间的函数库（如lodash、underscore等）则会发生命名冲突。
 * 该函数可恢复全局变量为挂载前的引用，并返回myfuncs命名空间
 * @example
 * // 返回myfuncs并重置全局命名空间 _
 * console.log(_.noConflict())
 *
 * @returns 返回myfuncs命名空间
 * @since 1.0.0
 */
export default function noConflict(): Record<string, any> {
  const ctx = globalThis as any
  if (ctx.myff) {
    ctx._ = ctx.__f_prev
  }
  return ctx.myff
}