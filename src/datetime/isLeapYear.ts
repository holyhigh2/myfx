import toDate from "./toDate"

/**
 * 指定日期是否是闰年
 * @param date 日期对象
 * @returns 闰年返回true
 */
function isLeapYear(date: Date): boolean {
  date = toDate(date)
  const year = date.getFullYear()
  return year % 400 === 0 || year % 4 === 0
}

export default isLeapYear