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
function isElement(v: unknown): v is globalThis.Element {
  return typeof v === 'object' && v !== null &&
    typeof globalThis.Element === 'function' && v instanceof globalThis.Element
}

export default isElement