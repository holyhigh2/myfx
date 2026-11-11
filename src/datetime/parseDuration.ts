/**
 * 解析时长字符串为毫秒数：`'200ms'`→200、`'1.5s'`→1500。
 * 不带单位的数字按秒处理；空串或非法值返回 0。
 * @example
 * //200
 * console.log(_.parseDuration('200ms'))
 * //1500
 * console.log(_.parseDuration('1.5s'))
 * //0
 * console.log(_.parseDuration('abc'))
 *
 * @param value 时长串
 * @returns 毫秒数
 * @since 2.0.0
 */
function parseDuration(value?: string | null): number {
  const t = (value ?? '').trim()
  if (!t) return 0
  const n = parseFloat(t)
  if (!isFinite(n)) return 0
  return t.endsWith('ms') ? n : n * 1000
}

export default parseDuration