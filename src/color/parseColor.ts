/** 通道值限制到 0~255 并四舍五入 */
function clampChannel(v: number): number {
  const n = Math.round(v)
  if (isNaN(n) || n < 0) return 0
  if (n > 255) return 255
  return n
}

/**
 * 解析常用颜色写法为 `[r, g, b, a]`，通道 0~255、a 为 0~1。
 *
 * 支持：`#rgb` / `#rrggbb` / `#rrggbbaa`、`rgb(...)` / `rgba(...)`
 * 不支持命名色（如 `red`）与 CSS 关键字
 *
 * @example
 * console.log(_.parseColor('#ff0000'))//[255,0,0,1]
 * console.log(_.parseColor('#ff000080'))//[255,0,0,0.5019607843137255]
 * console.log(_.parseColor('rgba(1,2,3,0.5)'))//[1,2,3,0.5]
 * console.log(_.parseColor('red'))//null
 *
 * @param input 颜色字符串
 * @returns `[r, g, b, a]` 或 null
 */
function parseColor(input: string): [number, number, number, number] | null {
  if (typeof input !== 'string') return null
  const s = input.trim()

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(s)
  if (hex) {
    const h = hex[1]
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16),
        parseInt(h[1] + h[1], 16),
        parseInt(h[2] + h[2], 16),
        1,
      ]
    }
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
    return [r, g, b, a]
  }

  const rgb = /^rgba?\(([^)]+)\)$/i.exec(s)
  if (rgb) {
    const parts = rgb[1].split(',').map((p) => parseFloat(p.trim()))
    if (parts.length >= 3 && parts.slice(0, 3).every((n) => !isNaN(n))) {
      const a = parts[3] != null && !isNaN(parts[3]) ? Math.max(0, Math.min(1, parts[3])) : 1
      return [clampChannel(parts[0]), clampChannel(parts[1]), clampChannel(parts[2]), a]
    }
  }

  return null
}

export default parseColor
