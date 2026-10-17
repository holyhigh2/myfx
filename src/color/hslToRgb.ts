function hue2Rgb(v1: number, v2: number, vH: number): number {
  if (vH < 0) vH += 1
  if (vH > 1) vH -= 1
  if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH
  if (2 * vH < 1) return v2
  if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6
  return v1
}

/**
 * HSL 转 RGB，输入分量均为 0~1，返回 `[r, g, b]`（0~255）。
 *
 * @example
 * console.log(_.hslToRgb(0, 1, 0.5))//[255,0,0]
 * console.log(_.hslToRgb(1 / 3, 1, 0.5))//[0,255,0]
 *
 * @param h 色相 0~1
 * @param s 饱和度 0~1
 * @param l 明度 0~1
 * @returns `[r, g, b]` 各通道 0~255
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }
  const v2 = l < 0.5 ? l * (1 + s) : l + s - s * l
  const v1 = 2 * l - v2
  return [
    Math.round(255 * hue2Rgb(v1, v2, h + 1 / 3)),
    Math.round(255 * hue2Rgb(v1, v2, h)),
    Math.round(255 * hue2Rgb(v1, v2, h - 1 / 3)),
  ]
}

export default hslToRgb
