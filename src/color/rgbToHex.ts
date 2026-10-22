import _clampChannel from "../_clampChannel";

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
  const to = (v: number) => _clampChannel(v).toString(16).padStart(2, '0')
  return '#' + to(r) + to(g) + to(b)
}

export default rgbToHex
