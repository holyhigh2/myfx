import isFunction from "../is/isFunction"

/**
 * 通过给定参数调用fn并返回执行结果
 *
 * @example
 * //自动填充参数
 * _.call(fn,1,2);
 * //事件
 * _.call(fn,1,2);
 *
 * @param fn 需要执行的函数
 * @param args 可变参数
 * @returns 执行结果。如果函数无效或无返回值返回undefined
 * @since 2.4.0
 */
function call(fn: any, ...args: any): any {
  if (!isFunction(fn)) return undefined
  return fn(...args)
}

export default call