/**
 * 返回13位日期毫秒数，表示从1970 年 1 月 1 日 00:00:00 (UTC)起到当前时间
 *
 * @example
 * //now time
 * console.log(_.now())
 *
 * @returns 带毫秒数的时间戳
 */
function now(): number {
  return Date.now()
}

export default now