import _hasOwn from "../_hasOwn"
import type { UnknownMapKey } from "../types"
/**
 * 检查指定key是否存在于指定的obj中（不含prototype中）
 *
 * @example
 * //true
 * console.log(_.has({a:12},'a'))
 *
 * @param obj
 * @param key
 * @returns 如果key存在返回true
 */
function has(obj: Record<UnknownMapKey, any>, key: UnknownMapKey): boolean {
  return obj != null && _hasOwn(Object(obj), key)
}

export default has