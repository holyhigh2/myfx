/**
 * 判断值是不是一个WeakSet对象
 *
 * @example
 * //true
 * console.log(_.isWeakSet(new WeakSet))
 * //false
 * console.log(_.isWeakSet(new Set))
 *
 * @param v
 * @returns
 */
function isWeakSet(v: unknown): v is WeakSet<any> {
  return v instanceof WeakSet
}

export default isWeakSet