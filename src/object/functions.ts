import isFunction from "../is/isFunction";
import type { UnknownMapKey } from "../types";
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
  let rs: string[] = []
  let ks = Object.keys(obj)
  //通过描述信息value判断而不是直接获取obj[k]可以避免getter的直接调用
  // let descrs = Object.getOwnPropertyDescriptors<Record<string, any>>(obj)
  // let ks = Object.keys(descrs)
  for (const k of ks) {
    let descr = Object.getOwnPropertyDescriptor(obj, k)
    if (!descr) continue

    // let { value } = descrs[k]
    if (isFunction(descr.value)) {
      rs.push(k)
    }
  }

  return rs
}

export default functions