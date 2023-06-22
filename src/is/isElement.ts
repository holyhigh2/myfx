/**
 * 判断值是不是Element的实例
 *
 * @example
 * //true
 * console.log(_.isElement(document.body))
 * //false
 * console.log(_.isElement(document))
 *
 * @param v
 * @returns
 * @since 1.0.0
 */
function isElement(v: unknown): v is Element {
  return typeof v === 'object' && v instanceof Element
}

export default isElement