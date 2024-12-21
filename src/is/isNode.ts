/**
 * 判断值是不是Node的实例
 *
 * @example
 * //true
 * console.log(_.isNode(document.body.attributes[0]))
 * //true
 * console.log(_.isNode(document))
 *
 * @param v
 * @returns
 * @since 1.5.0
 */
function isNode(v: unknown): v is Node {
  return typeof v === 'object' && v instanceof Node
}

export default isNode