/**
 * 判断值是不是一个WeakMap对象
 *
 * @example
 * //true
 * console.log(_.isWeakMap(new WeakMap))
 * //false
 * console.log(_.isWeakMap(new Map))
 *
 * @param v
 * @returns
 */
function isWeakMap<K extends object, V>(v: unknown): v is WeakMap<K, V> {
  return v instanceof WeakMap || Object.prototype.toString.call(v) === '[object WeakMap]'
}

export default isWeakMap