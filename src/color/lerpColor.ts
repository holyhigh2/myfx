import hexToRgb from "./hexToRgb";

/**
 * 在两个十六进制颜色之间做线性插值，`t` 从 `a`（0）过渡到 `b`（1）。
 *
 * 仅对 RGB 通道插值，结果始终为 `#rrggbb`（不保留透明度）。
 * 任一颜色无法解析时退化为「就近取整」：`t < 0.5` 返回 a，否则返回 b。
 *
 * @example
 * console.log(_.lerpColor('#000000', '#ffffff', 0.5))//#808080
 * console.log(_.lerpColor('#ff0000', '#0000ff', 0))//#ff0000
 * console.log(_.lerpColor('bad', '#000000', 0.9))//#000000
 *
 * @param a 起始颜色
 * @param b 结束颜色
 * @param t 插值系数，0~1
 * @returns 插值后的 `#rrggbb`
 */
function lerpColor(a: string, b: string, t: number): string {
  const pa = hexToRgb(a)
  const pb = hexToRgb(b)
  if (!pa || !pb) return t < 0.5 ? a : b
  const to = (v: number) => v.toString(16).padStart(2, '0')
  const mix = pa.map((c, i) => Math.round(c + (pb[i] - c) * Math.max(0, Math.min(1, t))))
  return '#' + to(mix[0]) + to(mix[1]) + to(mix[2])
}

export default lerpColor
