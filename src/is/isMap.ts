/**
 * 判断值是不是一个Map对象
 *
 * @example
 * //true
 * console.log(_.isMap(new Map()))
 * //false
 * console.log(_.isMap(new WeakMap()))
 *
 * @param v
 * @returns
 */
function isMap<K,V>(v: unknown): v is Map<K, V> {
  return v instanceof Map
}

export default isMap