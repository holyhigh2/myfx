const TIME_MAP: Record<string, number> = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
  d: 1000 * 60 * 60 * 24,
}
/**
 * 对日期时间进行量变处理
 *
 * @example
 * //2020/5/1 08:00:20
 * console.log(_.formatDate(_.addTime(new Date('2020-05-01'),20),'yyyy/MM/dd hh:mm:ss'))
 * //2020-04-11 08:00
 * console.log(_.formatDate(_.addTime(new Date('2020-05-01'),-20,'d')))
 * //2022-01-01 00:00
 * console.log(_.formatDate(_.addTime(new Date('2020-05-01 0:0'),20,'M')))
 *
 * @param date 原日期时间
 * @param amount 变化量，可以为负数
 * @param [type='s'] 量变时间类型
 * <ul>
 * <li><code>y</code> 年</li>
 * <li><code>M</code> 月</li>
 * <li><code>d</code> 日</li>
 * <li><code>h</code> 时</li>
 * <li><code>m</code> 分</li>
 * <li><code>s</code> 秒</li>
 * </ul>
 * @returns 日期对象
 */
function addTime(
  date: Date | string | number,
  amount: number,
  type?: string
): Date {
  type = type || 's'
  const d = new Date(date)
  switch (type) {
    case 'y':
      d.setFullYear(d.getFullYear() + amount)
      break
    case 'M':
      d.setMonth(d.getMonth() + amount)
      break
    default:
      let times = 0
      times = amount * TIME_MAP[type]
      d.setTime(d.getTime() + times)
  }
  return d
}

export default addTime