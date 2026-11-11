/**
 * 字母序号串 → 0-based 索引（双射 26 进制解码），与 {@link alphaLabel} 互逆。
 * 大小写不敏感；空串返回 0。
 * @example
 * //0
 * console.log(_.alphaIndex('A'))
 * //26
 * console.log(_.alphaIndex('AA'))
 * //52
 * console.log(_.alphaIndex('ba'))
 *
 * @param label 字母串（应只含字母）
 * @returns 0-based 索引
 * @since 2.0.0
 */
function alphaIndex(label: string): number {
  if (!label) return 0
  const s = String(label).toUpperCase()
  let code = 0
  for (let i = 0; i < s.length; i++) {
    code = code * 26 + (s.charCodeAt(i) - 64)
  }
  return code - 1
}

export default alphaIndex