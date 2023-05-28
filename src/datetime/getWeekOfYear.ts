import getDayOfYear from "./getDayOfYear"
import toDate from "./toDate"

/**
 * 获取指定日期在当前年中的周数并返回
 * @param date 日期对象
 * @returns {number} 当前年中的第几周
 */
function getWeekOfYear(date: Date): number {
  date = toDate(date)
  const year = date.getFullYear()
  let firstDayOfYear = new Date(year, 0, 1)
  let extraWeek = 0
  //超过周5多1周
  let d = firstDayOfYear.getDay()
  if (d === 0 || d > 5) {
    extraWeek = 1
  }

  return Math.ceil(getDayOfYear(date) / 7) + extraWeek
}

export default getWeekOfYear