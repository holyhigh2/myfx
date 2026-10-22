import toDate from "./toDate"

/**
 * 获取指定日期在当前月中的周数并返回
 *
 * 约定：周一为一周起始，月首（1日）所在的那一周为第1周，返回值范围1-6
 *
 * @example
 * //1（2023-04-01是周六，月首所在周为第1周）
 * console.log(_.getWeekOfMonth('2023-04-01'))
 * //2（2023-04-03是周一，开启第2周）
 * console.log(_.getWeekOfMonth('2023-04-03'))
 *
 * @param date 日期对象
 * @returns 当前月中的第几周(1-6)。无效日期返回NaN
 */
function getWeekOfMonth(date: Date | string | number): number {
  const d = toDate(date)
  if (Number.isNaN(d.getTime())) return NaN
  const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1)
  // 月首是本周第几天（周一=0 ... 周日=6）
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7
  return Math.floor((d.getDate() + firstWeekday - 1) / 7) + 1
}

export default getWeekOfMonth
