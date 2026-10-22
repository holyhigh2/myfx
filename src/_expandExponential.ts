/**
 * 把数字的指数记数法字符串（如 1e-7、1e21）展开为普通数字字符串。
 * toFixed / formatNumber 共用此出口，指数展开语义只在这里维护。
 */
function _expandExponential(num: number): string {
  const numStr = num + ''
  if (!numStr.includes('e')) return numStr
  const [coefficient, power] = numStr.split('e')
  const p = parseInt(power)
  const cn = coefficient.replace('.', '')
  return p < 0
    ? `0.${'0'.repeat(-p - 1)}${cn}`
    : `${cn}${'0'.repeat(Math.max(0, p - cn.length + 1))}`
}

export default _expandExponential
