/**
 * 正取模（欧几里得取模）：结果恒落在 [0, divisor) 内，负数不回绕成负值。
 * 与 `%` 的区别：`-1 % 5 === -1`，而 `_.mod(-1, 5) === 4`。
 * @example
 * //4
 * console.log(_.mod(-1, 5))
 * //2
 * console.log(_.mod(7, 5))
 *
 * @param value 被除数
 * @param divisor 除数（应为正数）
 * @returns [0, divisor) 内的余数
 * @since 2.0.0
 */
function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor
}

export default mod