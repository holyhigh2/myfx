/**
 * RGB 转 HSL，输入 `r/g/b` 为 0~255，返回 `[h, s, l]`（均为 0~1）。
 *
 * @example
 * console.log(_.rgbToHsl(255, 0, 0))//[0,1,0.5]
 * console.log(_.rgbToHsl(0, 255, 0))//[0.3333333333333333,1,0.5]
 *
 * @param r 红通道 0~255
 * @param g 绿通道 0~255
 * @param b 蓝通道 0~255
 * @returns `[h, s, l]` 各分量 0~1
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r = (r || 0) / 255
  g = (g || 0) / 255
  b = (b || 0) / 255

  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const cdel = cmax - cmin

  const l = (cmin + cmax) / 2
  let h = 0
  let s = 0

  if (cmax > 0 && cdel > 0) {
    s = l < 0.5 ? cdel / (cmax + cmin) : cdel / (2 - cmax - cmin)

    const delR = ((cmax - r) / 6 + cdel / 2) / cdel
    const delG = ((cmax - g) / 6 + cdel / 2) / cdel
    const delB = ((cmax - b) / 6 + cdel / 2) / cdel

    if (r === cmax) h = delB - delG
    else if (g === cmax) h = 1 / 3 + delR - delB
    else h = 2 / 3 + delG - delR

    if (h < 0) h += 1
    if (h > 1) h -= 1
  }

  return [h, s, l]
}

export default rgbToHsl
