import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _noop from "../_noop";
import isObject from "../is/isObject";
import isFunction from "../is/isFunction";
import concat from "../array/concat";
/**
 * 与<code>merge</code>相同，但支持自定义处理器
 * 
 * > 该函数会修改目标对象
 *
 * @example
 * //{x: 2, y: {a: 2, b: 4, c: 3, d: 27}}
 * console.log(_.mergeWith({x:1,y:{a:1,b:2,c:3}},{x:2,y:{a:2,d:3}},{y:{b:4}},(sv,tv,k)=>k=='d'?sv*9:undefined))
 *
 * @param target 目标对象
 * @param sources 1-n个源对象
 * @param [handler=noop] (src[k],target[k],k,src,target,chain) 自定义赋值处理器，返回赋予target[k]的值
 * @returns 返回target
 * @since 0.22.0
 */
function mergeWith<T extends Record<UnknownMapKey, any>>(
  target: T,
  ...sources: any[]
): T {
  const rs = _checkTarget(target)
  if (rs) return rs

  let src = sources
  const sl = src.length
  let handler = src[sl-1]
  if (!isFunction(handler)) {
    handler = _noop
  } else {
    src = src.slice(0, sl - 1)
  }

  walkSources(target, src, handler as Function, [])
  return target
}

function walkSources(
  target: Record<UnknownMapKey, any>,
  src: Record<any, any>[],
  handler: Function,
  stack: any[]
) {
  _eachSources(target, src, null, (v, sv, tv, k, s, t) => {
    const path = concat(stack, k)
    v = handler(sv, tv, k, s, t, path)
    if (v !== undefined) {
      t[k] = v
    } else {
      if (isObject(tv) && !isFunction(tv)) {
        walkSources(tv, [sv], handler, path)
      } else {
        t[k] = sv
      }
    }
  })
}

export default mergeWith