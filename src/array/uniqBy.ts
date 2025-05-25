import _identity from '../_identity';
import _iteratee from '../_iteratee';
import each from "../collection/each";
import type { NonFuncItee, UnknownMapKey } from "../types";
/**
 * 同<code>uniq</code>，但支持自定义筛选函数
 * @example
 * // [{"a":1},{"a":"1"},{"a":2},{"a":"2"}]
 * console.log(_.uniqBy([{a:1},{a:1},{a:'1'},{a:2},{a:'2'},{a:2}],'a'))
 * // [{"a":1},{"a":2}]
 * console.log(_.uniqBy([{a:1},{a:1},{a:'1'},{a:2},{a:'2'},{a:2}],v=>v.a>>0))
 *
 * @param array 数组
 * @param itee (value,index) 筛选函数，返回需要对比的值。默认identity
 * <br>当iteratee是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils.iteratee}
 * @returns 去重后的新数组对象
 * @since 1.0.0
 */
function uniqBy<T>(
  array: T[],
  itee?: ((value: T, index: UnknownMapKey) => boolean) | NonFuncItee
): T[] {
  const cb = _iteratee(itee || _identity)
  const keyMap = new Map()
  const rs: T[] = []
  each<T>(array, (v, k) => {
    const key = cb(v, k)
    if (keyMap.get(key)) return
    keyMap.set(key, 1)
    rs.push(v)
  })
  return rs
}

export default uniqBy