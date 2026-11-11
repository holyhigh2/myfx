/**
 * 把 value 夹取到 [min, max] 区间内。
 * @example
 * //5
 * console.log(_.clamp(5, 0, 10))
 * //0
 * console.log(_.clamp(-1, 0, 10))
 * //10
 * console.log(_.clamp(11, 0, 10))
 *
 * @param value 待夹取的值
 * @param min 下界
 * @param max 上界
 * @returns 夹取后的值；任一参数为 NaN 时返回 NaN
 * @since 2.0.0
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export default clamp