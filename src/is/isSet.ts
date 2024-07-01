/**
 * 判断值是不是一个Set对象
 *
 * @example
 * //false
 * console.log(_.isSet(new WeakSet))
 * //true
 * console.log(_.isSet(new Set))
 *
 * @param v
 * @returns
 */
function isSet<T>(v: unknown): v is Set<T> {
  return v instanceof Set
}

export default isSet