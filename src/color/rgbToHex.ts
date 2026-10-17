/** 把 0~255 的通道值取整并限制到合法范围 */
function clampChannel(v: number): number {
  const n = Math.round(v)
  if (isNaN(n) || n < 0) return 0
  if (n > 255) return 255
  return n
}

/**
 * 将 `r/g/b`（各自 0~255）拼装为小写十六进制颜色 `#rrggbb`。
 *
 * 通道值会先四舍五入并限制到 0~255，故 `rgbToHex(255, 0, 0)` 与
 * `rgbToHex(254.6, -3, 300)` 均得到合法结果。
 *
 * @example
 * console.log(_.rgbToHex(255, 0, 0))//#ff0000
 * console.log(_.rgbToHex(0, 128, 255))//#0080ff
 *
 * @param r 红通道 0~255
 * @param g 绿通道 0~255
 * @param b 蓝通道 0~255
 * @returns 形如 `#rrggbb` 的颜色字符串
 */
function rgbToHex(r: number, g: number, b: number): string {
  const to = (v: number) => clampChannel(v).toString(16).padStart(2, '0')
  return '#' + to(r) + to(g) + to(b)
}

export default rgbToHex
