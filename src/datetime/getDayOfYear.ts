import toDate from './toDate'
import isLeapYear from "./isLeapYear";
const DaysOfMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
/**
 * 获取指定日期在当前年中的天数并返回
 * @param date 日期对象
 * @returns {number} 当前年中的第几天
 */
function getDayOfYear(date: Date): number {
  date = toDate(date)
  const leapYear = isLeapYear(date)
  const month = date.getMonth()

  let dates = date.getDate()
  for (let i = 0; i < month; i++) {
    const ds = DaysOfMonth[i] || (leapYear ? 29 : 28)
    dates += ds
  }
  return dates
}

export default getDayOfYear