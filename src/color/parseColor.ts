import _clampChannel from "../_clampChannel";

/**
 * 解析常用颜色写法为 `[r, g, b, a]`，通道 0~255、a 为 0~1。
 *
 * 支持：`#rgb` / `#rgba` / `#rrggbb` / `#rrggbbaa`、`rgb(...)` / `rgba(...)`（含百分比写法，按255换算）
 * 不支持命名色（如 `red`）与 CSS 关键字
 *
 * @example
 * console.log(_.parseColor('#ff0000'))//[255,0,0,1]
 * console.log(_.parseColor('#ff000080'))//[255,0,0,0.5019607843137255]
 * console.log(_.parseColor('rgba(1,2,3,0.5)'))//[1,2,3,0.5]
 * console.log(_.parseColor('rgb(100%,0%,0%)'))//[255,0,0,1]
 * console.log(_.parseColor('red'))//null
 *
 * @param input 颜色字符串
 * @returns `[r, g, b, a]` 或 null
 */
function parseColor(input: string): [number, number, number, number] | null {
  if (typeof input !== 'string') return null
  const s = input.trim()

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(s)
  if (hex) {
    const h = hex[1]
    if (h.length === 3 || h.length === 4) {
      const a = h.length === 4 ? parseInt(h[3] + h[3], 16) / 255 : 1
      return [
        parseInt(h[0] + h[0], 16),
        parseInt(h[1] + h[1], 16),
        parseInt(h[2] + h[2], 16),
        a,
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
    const raws = rgb[1].split(',').map((p) => p.trim())
    // CSS百分比写法：rgb(100%,0%,0%)。r/g/b必须同为百分比或同为数字，混用视为非法
    const isPct = (p: string) => p.endsWith('%')
    const pctCount = raws.slice(0, 3).filter(isPct).length
    if (raws.length >= 3 && (pctCount === 0 || pctCount === 3)) {
      const parseChannel = (p: string) =>
        isPct(p) ? (parseFloat(p) / 100) * 255 : parseFloat(p)
      const parts = [parseChannel(raws[0]), parseChannel(raws[1]), parseChannel(raws[2])]
      if (parts.every((n) => !isNaN(n))) {
        let a = 1
        if (raws[3] != null) {
          const av = isPct(raws[3]) ? parseFloat(raws[3]) / 100 : parseFloat(raws[3])
          if (!isNaN(av)) a = Math.max(0, Math.min(1, av))
        }
        return [_clampChannel(parts[0]), _clampChannel(parts[1]), _clampChannel(parts[2]), a]
      }
    }
  }

  return null
}

export default parseColor
