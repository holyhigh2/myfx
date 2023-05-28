const TIME_MAP: Record<string, number> = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
  d: 1000 * 60 * 60 * 24,
}
// const DATE_CONVERT_EXP = /(\d+)-(\d+)-(\d+)/;
/**
 * 比较两个日期，并返回由比较时间单位确定的相差时间。
 * <p>
 * 使用truncated对比算法 —— 小于指定时间单位的值会被视为相同，
 * 比如对比月，则两个日期的 日/时/分/秒 会被认为相同，以此类推。
 * </p>
 * 相差时间为正数表示date1日期晚于(大于)date2，负数相反，0表示时间/日期相同。
 * <p>
 * 注意，如果对比单位是 h/m/s，务必要保持格式一致，比如
 * 
 * ```ts
 * //实际相差8小时
 * new Date('2020-01-01') 
 * //vs
 * new Date('2020/01/01')
 * ```
 *
 * @example
 * //0
 * console.log(_.compareDate(new Date('2020/05/01'),'2020/5/1'))
 * //格式不一致，相差8小时
 * console.log(_.compareDate(new Date('2020-05-01'),'2020/5/1','h'))
 * //-59
 * console.log(_.compareDate(new Date('2019/01/01'),'2019/3/1'))
 *
 * @param date1 日期对象、时间戳或合法格式的日期时间字符串。
 * 对于字符串格式，可以时<a href="https://www.iso.org/iso-8601-date-and-time-format.html">UTC格式</a>，或者
 * <a href="https://tools.ietf.org/html/rfc2822#section-3.3">RFC2822</a>格式
 * @param date2 同date1
 * @param [type='d'] 比较时间单位
 * <ul>
 * <li><code>y</code> 年</li>
 * <li><code>M</code> 月</li>
 * <li><code>d</code> 日</li>
 * <li><code>h</code> 时</li>
 * <li><code>m</code> 分</li>
 * <li><code>s</code> 秒</li>
 * </ul>
 * @returns 根据比较时间单位返回的比较值。正数为date1日期晚于(大于)date2，负数相反，0表示相同。
 */
function compareDate(
  date1: Date | string | number,
  date2: Date | string | number,
  type?: string
): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  type = type || 'd'

  if (type === 'y') {
    return d1.getFullYear() - d2.getFullYear()
  } else if (type === 'M') {
    return (
      (d1.getFullYear() - d2.getFullYear()) * 12 +
      (d1.getMonth() - d2.getMonth())
    )
  } else {
    switch (type) {
      case 'd':
        d1.setHours(0, 0, 0, 0)
        d2.setHours(0, 0, 0, 0)
        break
      case 'h':
        d1.setHours(d1.getHours(), 0, 0, 0)
        d2.setHours(d2.getHours(), 0, 0, 0)
        break
      case 'm':
        d1.setHours(d1.getHours(), d1.getMinutes(), 0, 0)
        d2.setHours(d2.getHours(), d2.getMinutes(), 0, 0)
        break
    }
    const diff = d1.getTime() - d2.getTime()
    return diff / TIME_MAP[type]
  }
}

export default compareDate