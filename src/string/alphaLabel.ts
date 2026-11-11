/**
 * 0-based 索引 → 字母序号串（双射 26 进制）：0→A、25→Z、26→AA、51→AZ、52→BA。
 * 双射计数没有 0 数位，不能直接套 `toString(26)`。与 {@link alphaIndex} 互逆。
 * @example
 * //'A'
 * console.log(_.alphaLabel(0))
 * //'AA'
 * console.log(_.alphaLabel(26))
 * //'BA'
 * console.log(_.alphaLabel(52))
 *
 * @param index 0-based 索引（负数按 0 处理，小数向下取整）
 * @returns 字母序号串
 * @since 2.0.0
 */
function alphaLabel(index: number): string {
  let n = Math.max(0, Math.floor(index))
  let s = ''
  do {
    s = String.fromCharCode(65 + (n % 26)) + s
    n = Math.floor(n / 26) - 1
  } while (n >= 0)
  return s
}

export default alphaLabel