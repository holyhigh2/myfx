/**
 * 通道值限制到 0~255 并四舍五入；NaN/负数归 0。
 * parseColor / rgbToHex 共用此出口，钳位语义只在这里维护。
 */
function _clampChannel(v: number): number {
  const n = Math.round(v)
  if (isNaN(n) || n < 0) return 0
  if (n > 255) return 255
  return n
}

export default _clampChannel
