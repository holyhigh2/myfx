import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _identity from "../_identity";
import isFunction from "../is/isFunction";
/**
 * 返回对象中的函数属性key数组
 * @example
 * const funcs = {
 *  a(){},
 *  b(){}
 * };
 * //[a,b]
 * console.log(_.functions(funcs))
 * //[....]
 * console.log(_.functions(_))
 *
 * @param obj
 * @returns 函数名数组
 * @since 0.18.0
 */
function functions(obj: Record<UnknownMapKey, any>): string[] {
  let rs:string[] = []
  for(let k in obj){
    if (isFunction(obj[k])){
      rs.push(k)
    }
  }
  return rs
}

export default functions