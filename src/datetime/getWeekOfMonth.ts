import toDate from "./toDate"

/**
 * 获取指定日期在当前月中的周数并返回
 * @param date 日期对象
 * @returns {number} 当前月中的第几周
 */
function getWeekOfMonth(date: Date): number {
  date = toDate(date)
  const year = date.getFullYear()
  let firstDayOfMonth = new Date(year, date.getMonth(), 1)
  let extraWeek = 0
  //超过周5多1周
  let d = firstDayOfMonth.getDay()
  if (d === 0 || d > 5) {
    extraWeek = 1
  }

  return Math.ceil(date.getDate() / 7) + extraWeek
}

export default getWeekOfMonth