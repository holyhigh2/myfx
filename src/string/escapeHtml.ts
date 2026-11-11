/**
 * HTML 转义：`& < > " '` 五个字符编码为实体，文本位与属性位通用。
 * 纯字符串实现，不依赖 DOM，SSR 可用。
 * @example
 * //'&lt;a href=&quot;x&quot;&gt;&amp;&#39;'
 * console.log(_.escapeHtml('<a href="x">&\''))
 * //''
 * console.log(_.escapeHtml(null))
 *
 * @param value 待转义的值（null/undefined 视为空串）
 * @returns 转义后的字符串
 * @since 2.0.0
 */
function escapeHtml(value: unknown): string {
  const ESC: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return String(value ?? '').replace(/[&<>"']/g, (c) => ESC[c])
}

export default escapeHtml