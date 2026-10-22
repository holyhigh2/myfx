import toDate from "./toDate"

/**
 * 获取指定日期在当前年中的周数（ISO 8601）并返回
 *
 * ISO 8601约定：周一为一周起始；包含当年第一个周四的那一周为第1周。
 * 因此年初/年末的几天可能属于上一年的最后一周或下一年的第1周，返回值范围1-53
 *
 * @example
 * //52（2022-12-31是周六，其ISO周的周四在2022年内）
 * console.log(_.getWeekOfYear('2022-12-31'))
 * //1（2024-01-01是周一，其ISO周的周四为2024-01-04）
 * console.log(_.getWeekOfYear('2024-01-01'))
 *
 * @param date 日期对象
 * @returns 当前年中的第几周(1-53)。无效日期返回NaN
 */
function getWeekOfYear(date: Date | string | number): number {
  const d = toDate(date)
  if (Number.isNaN(d.getTime())) return NaN
  // 本周周四（ISO 8601：周四决定周归属）。周一=0 ... 周日=6
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const dayNr = (target.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)
  // 目标年份第一个周四所在的周为第1周
  const firstThursday = new Date(target.getFullYear(), 0, 4)
  const firstDayNr = (firstThursday.getDay() + 6) % 7
  firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3)
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000))
}

export default getWeekOfYear
