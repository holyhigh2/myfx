/**
 * 类似eval，对表达式进行求值并返回结果。不同于eval，fval()执行在严格模式下
 * 
 * > 注意，如果页面设置了<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">CSP</a>可能会导致该函数失效
 * 
 * @example
 * //5
 * console.log(_.fval('3+2'));
 * //{name:"func.js"}
 * console.log(_.fval("{name:'func.js'}"));
 *
 * @param expression 计算表达式
 * @returns 表达式计算结果
 */
function fval<T>(expression: string): T {
  return Function('"use strict";return ' + expression)()
}

export default fval