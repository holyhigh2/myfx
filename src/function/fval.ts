import keys from "../object/keys"
import values from "../object/values"

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
 * //0
 * console.log(_.fval('1+x-b',{x:2,b:3}))
 *
 * @param expression 计算表达式
 * @param args 可选参数对象
 * @param context 可选上下文
 * @returns 表达式计算结果
 */
function fval<T>(expression: string,args?:Record<string,any>,context?:any): T {
  const ks = keys(args)
  const val = values(args)
  return Function(...ks,'"use strict";return ' + expression).call(context,...val)
}

export default fval