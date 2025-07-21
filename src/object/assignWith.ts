import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _identity from "../_identity";
import type { UnknownMapKey } from "../types";
/**
 * 与<code>assign</code>相同，但支持自定义处理器
 * 
 * > 该函数会修改目标对象
 * 
 * @example
 * //{x: 1, y: '3y', z: null}
 * console.log(_.assignWith({x:1},{y:3,z:4},(sv,tv,k)=>k=='z'?null:sv+k))
 *
 * @param target 目标对象
 * @param sources 源对象，可变参数。最后一个参数为函数时，签名为(src[k],target[k],k,src,target) 自定义赋值处理器，返回赋予target[k]的值
 * @returns 返回target
 */
function assignWith<T extends Record<UnknownMapKey, any>>(
  target: T,
  ...sources: any[]
): T {
  const rs = _checkTarget(target)
  if (rs) return rs

  let src = sources
  const sl = sources.length
  let handler = src[sl - 1]
  if (!handler || !handler.call) {
    handler = _identity
  } else {
    src = src.slice(0, sl - 1)
  }

  _eachSources(
    target,
    src,
    handler,
    (
      v: any,
      sv: any,
      tv: any,
      k: string,
      s: Record<UnknownMapKey, any>,
      t: Record<UnknownMapKey, any>
    ) => {
      t[k] = v
    }
  )

  return target
}

export default assignWith