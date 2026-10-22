import isArray from "../is/isArray";
import isInteger from "../is/isInteger";
import toNumber from "../number/toNumber";
import padEnd from "../string/padEnd";
/**
 * 通过指定参数得到日期对象。支持多种签名
 * 
 * ```js
 * _.toDate(1320940800); //timestamp unix style
 * _.toDate(1320940800123); //timestamp javascript style
 * _.toDate([year,monthIndex,day]); //注意，monthIndex为0-based（0代表一月）
 * _.toDate([year,monthIndex,day,hour,min,sec]); //注意，monthIndex为0-based（0代表一月）
 * _.toDate(datetimeStr);
 * ```
 *
 * @example
 * //'2011/11/11 00:00:00'
 * console.log(_.toDate(1320940800).toLocaleString())
 * //'2011/11/11 00:01:39'
 * console.log(_.toDate(1320940899999).toLocaleString())
 * //'2022/12/12 00:00:00'
 * console.log(_.toDate([2022,11,12]).toLocaleString())
 * //'2022/12/12 12:12:12'
 * console.log(_.toDate([2022,11,12,12,12,12]).toLocaleString())
 * //'2022/2/2 00:00:00'
 * console.log(_.toDate('2022/2/2').toLocaleString())
 * //'2022/2/2 08:00:00'
 * console.log(_.toDate('2022-02-02').toLocaleString())
 *
 * @param value 转换参数
 *
 * @returns 转换后的日期。无效日期返回Invalid Date（即 new Date(NaN)）
 */
function toDate(value: number | [year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number] | string | Date): Date {
  let rs
  let v: any = value
  // 纯数字字符串形式的**时间戳**（JSON 里时间戳常被序列化成字符串）。
  // 只认 10 位以上：10 位是秒级时间戳的下限，短数字串（`'2020'`）必须留给
  if (typeof v === 'string' && /^[+-]?\d{10,}$/.test(v.trim())) v = toNumber(v.trim())
  if (isInteger(v)) {
    const neg = v < 0
    const abs = neg ? -v : v
    if (abs < TIMESTAMP_MIN) {
      // 位数不足13位，视为unix秒风格时间戳，按符号补位到13位毫秒
      v = (neg ? -1 : 1) * toNumber(padEnd(abs + '', 13, '0'))
    } else if (abs > TIMESTAMP_MAX) {
      v = NaN
    }
    rs = new Date(v)
  } else if (isArray(v)) {
    const a = v as any[]
    rs = new Date(a[0], a[1], a[2] || 1, a[3] || 0, a[4] || 0, a[5] || 0, a[6] || 0)
  } else {
    rs = new Date(v)
  }

  if (Number.isNaN(rs.getTime())) {
    // 无效日期返回Invalid Date，让下游（如formatDate）能够识别
    rs = new Date(NaN)
  }

  return rs
}
const TIMESTAMP_MIN = 1000000000000
const TIMESTAMP_MAX = 9999999999999

export default toDate