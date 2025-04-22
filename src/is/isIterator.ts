/**
 * 判断值是不是迭代器对象
 *
 * @example
 * //true
 * console.log(_.isIterator(new Map()))
 * //true
 * console.log(_.isIterator(new Map().values()))
 * //false
 * console.log(_.isIterator({a:1}))
 *
 * @param v
 * @returns
 * @since 1.10.0
 */
function isIterator(v: unknown): v is Iterable<any> {
  return typeof v === 'object' && v !== null && Symbol.iterator in v
}

export default isIterator