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
  if (typeof v !== 'object' || v === null) return false
  const HTMLElementCtor = globalThis.HTMLElement
  if (typeof HTMLElementCtor !== 'function' || !(v instanceof HTMLElementCtor)) return false
  const el = v as HTMLElement & { shadowRoot?: unknown; tagName?: string }
  const ShadowRootCtor = globalThis.ShadowRoot
  if (typeof ShadowRootCtor === 'function' && el.shadowRoot instanceof ShadowRootCtor) return true
  const customElements = globalThis.customElements
  const tagName = typeof el.tagName === 'string' ? el.tagName.toLowerCase() : ''
  if (customElements && typeof customElements.get === 'function' && tagName && customElements.get(tagName)) return true
  return tagName.split('-').length > 1
}

export default isCustomElement