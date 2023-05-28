const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('')
/**
 * 生成一个指定长度的alphaId并返回。id内容由随机字母表字符组成
 * @example
 * // urN-k0mpetBwboeQ
 * console.log(_.alphaId())
 * // Ii6cPyfw-Ql5YC8OIhVwH1lpGY9x
 * console.log(_.alphaId(28))
 *
 * @param [len=16] id长度
 * @returns alphaId
 * @since 1.4.0
 */
function alphaId(len?: number): string {
  const bytes = self.crypto.getRandomValues(new Uint8Array(len || 16))
  let rs = ''
  bytes.forEach(b => rs += ALPHABET[b % ALPHABET.length])
  return rs
}

export default alphaId