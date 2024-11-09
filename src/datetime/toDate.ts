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
 * _.toDate([year,month,day]); //注意，month的索引从1开始
 * _.toDate([year,month,day,hour,min,sec]); //注意，month的索引从1开始
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
 * @returns 转换后的日期。无效日期统一返回1970/1/1
 */
function toDate(value: number | Array<number> | string | Date): Date {
  let rs
  if (isInteger(value)) {
    if (value < TIMESTAMP_MIN) {
      value = toNumber(padEnd(value + '', 13, '0'))
    } else if (value > TIMESTAMP_MAX) {
      value = 0
    }
    rs = new Date(value)
  } else if (isArray(value)) {
    rs = new Date(...(value as []))
  } else {
    rs = new Date(value)
  }

  if (rs.toDateString() === 'Invalid Date') {
    rs = new Date(0)
  }

  return rs
}
const TIMESTAMP_MIN = 1000000000000
const TIMESTAMP_MAX = 9999999999999

export default toDate