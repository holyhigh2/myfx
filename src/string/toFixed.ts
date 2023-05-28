import padEnd from "./padEnd"
/**
 * 截取数字小数位。用来修复原生toFixed函数的bug
 *
 * @example
 * //14.05
 * console.log(_.toFixed(14.049,2))
 * //-15
 * console.log(_.toFixed(-14.6))
 * //14.0001
 * console.log(_.toFixed(14.00005,4))
 * //0.101
 * console.log(_.toFixed(0.1009,3))
 * //2.47
 * console.log(_.toFixed(2.465,2))
 * //2.46 原生
 * console.log((2.465).toFixed(2))
 *
 * @param v 数字或数字字符串
 * @param [scale=0] 小数位长度
 * @returns 填充后的字符串
 */
function toFixed(v: string | number, scale?: number): string {
  scale = scale || 0
  const num = parseFloat(v + '')
  if (isNaN(num)) return v as string
  const isNeg = num < 0 ? -1 : 1
  const tmp = (num + '').split('.')
  const frac = tmp[1] || ''
  const diff = scale - frac.length
  let rs = ''
  if (diff > 0) {
    let z = padEnd(frac, scale, '0')
    z = z ? '.' + z : z
    rs = tmp[0] + z
  } else if (diff === 0) {
    rs = num + ''
  } else {
    let integ = parseInt(tmp[0])
    const i = frac.length + diff
    const round = frac.substring(i)
    let keep = frac.substring(0, i)
    let startZ = false
    if (keep[0] === '0' && keep.length > 1) {
      keep = 1 + keep.substring(1)
      startZ = true
    }
    let n: any = Math.round(parseFloat(keep + '.' + round))
    const strN = n + ''
    if (n > 0 && strN.length > keep.length) {
      integ += 1 * isNeg
      n = strN.substring(1)
    }
    if (startZ) {
      n = parseInt(strN[0]) - 1 + strN.substring(1)
    }
    n = n !== '' && keep.length > 0 ? '.' + n : n
    rs = integ + n + ''
    if (isNeg < 0 && rs[0] !== '-') rs = '-' + rs
  }
  return rs
}

export default toFixed