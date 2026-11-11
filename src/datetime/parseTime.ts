/**
 * 解析时间串 `'HH:mm[:ss]'` 为当日秒数。宽松口径：时允许 1~2 位（不校验上限），
 * 分/秒必须两位且 00~59；非法输入返回 NaN。
 * @example
 * //30600
 * console.log(_.parseTime('08:30'))
 * //30615
 * console.log(_.parseTime('8:30:15'))
 * //NaN
 * console.log(_.parseTime('8:60'))
 *
 * @param value 时间串
 * @returns 秒数；非法输入返回 NaN
 * @since 2.0.0
 */
function parseTime(value?: string | null): number {
  const m = /^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/.exec(String(value ?? '').trim())
  if (!m) return NaN
  return parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseInt(m[3] ?? '0', 10)
}

export default parseTime