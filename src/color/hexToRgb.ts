/**
 * 将 `#rgb` / `#rrggbb` 十六进制颜色解析为 `[r, g, b]`（各自 0~255）。
 *
 * 解析失败（格式不合法、非字符串）返回 null。不支持 `#rrggbbaa`，
 * 含透明度的十六进制请使用 {@link parseColor}。
 *
 * @example
 * console.log(_.hexToRgb('#fff'))//[255,255,255]
 * console.log(_.hexToRgb('#ff0000'))//[255,0,0]
 * console.log(_.hexToRgb('nope'))//null
 *
 * @param hex 十六进制颜色字符串，`#` 可省略
 * @returns `[r, g, b]` 或 null
 */
function hexToRgb(hex: string): [number, number, number] | null {
  if (typeof hex !== 'string') return null
  const s = hex.trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(s)) {
    return [
      parseInt(s[0] + s[0], 16),
      parseInt(s[1] + s[1], 16),
      parseInt(s[2] + s[2], 16),
    ]
  }
  if (/^[0-9a-f]{6}$/i.test(s)) {
    return [
      parseInt(s.slice(0, 2), 16),
      parseInt(s.slice(2, 4), 16),
      parseInt(s.slice(4, 6), 16),
    ]
  }
  return null
}

export default hexToRgb
