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
function isWeakMap(v: unknown): v is WeakMap<any, any> {
  return v instanceof WeakMap
}

export default isWeakMap