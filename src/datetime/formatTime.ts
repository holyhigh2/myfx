import clamp from '../math/clamp'

/**
 * 当日秒数 → 时间串 `'HH:mm:ss'`（hideSeconds 时为 `'HH:mm'`）。
 * 越界钳制到 00:00:00 ~ 23:59:59（不跨午夜回绕），小数向下取整；NaN 返回空串。
 * @example
 * //'08:30:15'
 * console.log(_.formatTime(30615))
 * //'08:30'
 * console.log(_.formatTime(30600, true))
 * //'23:59:59'
 * console.log(_.formatTime(86400))
 *
 * @param seconds 当日秒数
 * @param hideSeconds 是否省略秒，默认 false
 * @returns 时间串
 * @since 2.0.0
 */
function formatTime(seconds: number, hideSeconds = false): string {
  if (Number.isNaN(seconds)) return ''
  const sec = Math.floor(clamp(seconds, 0, 86399))
  const p = (n: number) => String(n).padStart(2, '0')
  const hh = p(Math.floor(sec / 3600))
  const mm = p(Math.floor((sec % 3600) / 60))
  if (hideSeconds) return `${hh}:${mm}`
  return `${hh}:${mm}:${p(sec % 60)}`
}

export default formatTime