/**
 * 线性插值：t=0 返回 a，t=1 返回 b，t 在 [0,1] 内按比例取值（不夹取 t）。
 * @example
 * //5
 * console.log(_.lerp(0, 10, 0.5))
 * //2.5
 * console.log(_.lerp(2, 4, 0.25))
 *
 * @param a 起点
 * @param b 终点
 * @param t 插值比例
 * @returns a + (b - a) * t
 * @since 2.0.0
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export default lerp