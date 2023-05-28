/**
 * 判断值是不是DOM元素
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
function isElement(v: unknown): v is HTMLElement {
  return typeof v === 'object' && v instanceof HTMLElement
}

export default isElement