/**
 * 判断值是不是自定义Element
 *
 * @example
 * //false
 * console.log(_.isCustomElement(document.body))
 * //true
 * console.log(_.isCustomElement(document.body.querySelector('l-ele')))
 *
 * @param v
 * @returns
 * @since 1.14.0
 */
function isCustomElement(v: unknown): v is HTMLElement {
  return typeof v === 'object' && v instanceof (HTMLElement || Object) &&
    ((v.shadowRoot instanceof ShadowRoot) || !!customElements.get(v.tagName.toLowerCase()) || (v.tagName.split('-').length > 1))
}

export default isCustomElement