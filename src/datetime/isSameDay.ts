/**
 * 比较两个日期是否为同一天
 * @example
 * //true
 * console.log(_.isSameDay(new Date('2020-05-01'),'2020/5/1'))
 * //false
 * console.log(_.isSameDay(new Date('2020-05-01 23:59:59.999'),'2020/5/2 0:0:0.000'))
 *
 * @param date1 日期对象或合法格式的日期时间字符串
 * @param date2 同date1
 * @returns
 */
function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  return (
    new Date(date1).setHours(0, 0, 0, 0) ===
    new Date(date2).setHours(0, 0, 0, 0)
  )
}

export default isSameDay