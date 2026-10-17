/**
 * 归一化十六进制颜色为**小写、带 `#`、展开缩写**的标准形式。
 *
 * - 三位 / 四位缩写展开为六位 / 八位：`#abc` → `#aabbcc`、`#abcd` → `#aabbccdd`
 * - 六位 / 八位原样保留（仅转小写、补 `#`）
 * - 非法输入（长度不对、含非十六进制字符、非字符串）返回 `null`
 *
 * @example
 * console.log(_.normalizeHex('#ABC'))//#aabbcc
 * console.log(_.normalizeHex('f00'))//#ff0000
 * console.log(_.normalizeHex('#abcd'))//#aabbccdd
 * console.log(_.normalizeHex('#ff000080'))//#ff000080
 * console.log(_.normalizeHex('nope'))//null
 *
 * @param hex 十六进制颜色字符串，`#` 可省略
 * @returns 归一化后的颜色字符串，或 `null`
 * @since 2.0.0
 */
function normalizeHex(hex: string): string | null {
  if (typeof hex !== 'string') return null
  const s = hex.trim().replace(/^#/, '').toLowerCase()
  if (/^[0-9a-f]{3}$/.test(s) || /^[0-9a-f]{4}$/.test(s)) {
    return '#' + [...s].map((ch) => ch + ch).join('')
  }
  if (/^[0-9a-f]{6}$/.test(s) || /^[0-9a-f]{8}$/.test(s)) return '#' + s
  return null
}

export default normalizeHex
