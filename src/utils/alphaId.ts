const ALPHABET =
  /* @__PURE__ */ 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('')
/**
 * 生成一个指定长度的alphaId并返回。id内容由随机字母表字符组成
 * @example
 * // urN-k0mpetBwboeQ
 * console.log(_.alphaId())
 * // Ii6cPyfw-Ql5YC8OIhVwH1lpGY9x
 * console.log(_.alphaId(28))
 *
 * @param len id长度
 * @returns alphaId
 * @since 1.0.0
 */
function alphaId(len: number = 16): string {
  const n = len || 16
  const cryptoObj = (globalThis as any).crypto
  let bytes: Uint8Array
  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    bytes = cryptoObj.getRandomValues(new Uint8Array(n))
  } else {
    bytes = new Uint8Array(n)
    for (let i = 0; i < n; i++) bytes[i] = (Math.random() * 256) | 0
  }
  let rs = ''
  for (let i = 0; i < bytes.length; i++) {
    rs += ALPHABET[bytes[i] % ALPHABET.length]
  }
  return rs
}

export default alphaId