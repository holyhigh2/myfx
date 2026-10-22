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
 * 输入归一化：h 按模 1 回绕（如 1.25 → 0.25）、s/l 会被 clamp 到 0~1（对齐 parseColor 的 clamp 策略）；
 * 任一分量非有限数字（NaN/Infinity）时返回 `[0, 0, 0]`
 *
 * @example
 * console.log(_.hslToRgb(0, 1, 0.5))//[255,0,0]
 * console.log(_.hslToRgb(1 / 3, 1, 0.5))//[0,255,0]
 * console.log(_.hslToRgb(1.5, 1, 0.5))//[0,255,255]（h=1.5回绕为0.5）
 *
 * @param h 色相 0~1，超出范围按模1回绕
 * @param s 饱和度 0~1，超出范围会被clamp
 * @param l 明度 0~1，超出范围会被clamp
 * @returns `[r, g, b]` 各通道 0~255
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (!Number.isFinite(h) || !Number.isFinite(s) || !Number.isFinite(l)) {
    return [0, 0, 0]
  }
  // h 模1回绕，s/l clamp到0~1
  h = h - Math.floor(h)
  s = Math.max(0, Math.min(1, s))
  l = Math.max(0, Math.min(1, l))
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
