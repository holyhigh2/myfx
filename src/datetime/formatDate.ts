import getDayOfYear from "./getDayOfYear"
import getWeekOfMonth from "./getWeekOfMonth"
import getWeekOfYear from "./getWeekOfYear"
import toDate from "./toDate"

const INVALID_DATE = ''
const SearchExp =
  /y{2,4}|M{1,3}|d{1,4}|h{1,2}|m{1,2}|s{1,2}|Q{1,2}|E{1,2}|W{1,2}|w{1,2}|H{1,2}|S|a/gm
const pad0 = (str: string) => str.length > 1 ? str : '0' + str
const pad00 = (str: string) => str.length > 2 ? str : (str.length > 1 ? '0' + str : '00' + str)

/**
 * 通过表达式格式化日期时间
 * 
 * ```
 * yyyy-MM-dd hh:mm:ss => 2020-12-11 10:09:08
 * ```
 * 
 * pattern解释：
 * 
 * - `yy` 2位年 - 22
 * - `yyyy` 4位年 - 2022
 * - `M` 1位月(1-12)
 * - `MM` 2位月(01-12)
 * - `MMM` 月描述(一月 - 十二月)
 * - `d` 1位日(1-30/31/29/28)
  - `dd` 2位日(01-30/31/29/28)
  - `ddd` 一年中的日(1-365)
  - `dddd` 一年中的日(001-365)
  - `h` 1位小时(1-12)
  - `hh` 2位小时(01-12)
  - `H` 1位小时(0-23)
  - `HH` 2位小时(00-23)
  - `m` 1位分钟(0-59)
  - `mm` 2位分钟(00-59)
  - `s` 1位秒(0-59)
  - `ss` 2位秒(00-59)
  - `Q` 季度(1-4)
  - `QQ` 季度描述(春-冬)
  - `W` 一年中的周(1-53)
  - `WW` 一年中的周(01-53)
  - `w` 一月中的周(1-6)
  - `ww` 一月中的周描述(第一周 - 第六周)
  - `E` 星期(1-7)
  - `EE` 星期描述(星期一 - 星期日)
  - `S` 毫秒
  - `a` AM/PM
 *
 * @example
 * //now time
 * console.log(_.formatDate(_.now(),'yyyy-MM-dd hh:mm'))
 * //2/1/2021
 * console.log(_.formatDate('2021-2-1','M/d/yyyy'))
 * //2/1/21
 * console.log(_.formatDate('2021-2-1','M/d/yy'))
 * //02/01/21
 * console.log(_.formatDate('2021-2-1','MM/dd/yy'))
 * //02/01/2021
 * console.log(_.formatDate('2021-2-1','MM/dd/yyyy'))
 * //21/02/01
 * console.log(_.formatDate('2021-2-1','yy/MM/dd'))
 * //2021-02-01
 * console.log(_.formatDate('2021-2-1','yyyy-MM-dd'))
 * //21-12-11 10:09:08
 * console.log(_.formatDate('2021-12-11T10:09:08','yy-MM-dd HH:mm:ss'))
 * //12/11/2020 1009
 * console.log(_.formatDate('2020-12-11 10:09:08','MM/dd/yyyy hhmm'))
 * //2020-12-11 08:00
 * console.log(_.formatDate(1607644800000))
 * //''
 * console.log(_.formatDate('13:02'))
 * //''
 * console.log(_.formatDate(null))
 * //现在时间:(20-12-11 10:09:08)
 * console.log(_.formatDate('2020-12-11 10:09:08','现在时间:(yy-MM-dd hh:mm:ss)'))
 *
 * @param val 需要格式化的值，可以是日期对象或时间字符串或日期毫秒数
 * @param [pattern='yyyy-MM-dd HH:mm:ss'] 格式化模式
 * @returns 格式化后的日期字符串，无效日期返回空字符串
 */
function formatDate(val: string | Date | number, pattern?: string): string {
  pattern = pattern || 'yyyy-MM-dd HH:mm:ss'
  let formatter = cache[pattern]
  if (!formatter) {
    formatter = (date: string | Date | number) => {
      if (!date) return INVALID_DATE

      let ptn = pattern + ''
      if (typeof date === 'string' || typeof date === 'number') {
        date = toDate(date)
      }
      if (date.toString().indexOf('Invalid') > -1) return INVALID_DATE

      let valDate: Date = date

      return ptn.replace(SearchExp, (tag) => {
        const cap = tag[0]

        const month = valDate.getMonth()
        const locale = Locale[Lang]

        if (cap === 'y') {
          const year = valDate.getFullYear()
          return tag === 'yy' ? (year % 100) + '' : year + ''
        } else if (cap === 'M') {
          switch (tag) {
            case 'M':
              return month + 1 + ''
            case 'MM':
              return pad0(month + 1 + '')
            case 'MMM':
              return locale?.months[month] || tag
          }
        } else if (cap === 'd') {
          let dayOfMonth = valDate.getDate()
          switch (tag) {
            case 'd':
              return dayOfMonth + ''
            case 'dd':
              return pad0(dayOfMonth + '')
            case 'ddd':
              return getDayOfYear(valDate) + ''
            case 'dddd':
              return pad00(getDayOfYear(valDate) + '')
          }
        } else if (cap === 'a') {
          let val = valDate.getHours()
          return val < 12 ? locale?.meridiems[0] : locale?.meridiems[1]
        } else if (cap === 'h') {//12
          let val = valDate.getHours()
          val = val % 12;
          if (val === 0) val = 12
          return tag.length > 1 ? pad0(val + '') : val + ''
        } else if (cap === 'H') {//24
          const val = valDate.getHours() + ''
          return tag.length > 1 ? pad0(val) : val
        } else if (cap === 'm') {
          const val = valDate.getMinutes() + ''
          return tag.length > 1 ? pad0(val) : val
        } else if (cap === 's') {
          const val = valDate.getSeconds() + ''
          return tag.length > 1 ? pad0(val) : val
        } else if (cap === 'Q') {
          const quarter = Math.ceil(month / 3)
          if (tag === 'Q') return quarter + ''
          return locale?.quarters[quarter - 1] || tag
        } else if (cap === 'W') {
          const val = getWeekOfYear(valDate) + ''
          return tag.length > 1 ? pad0(val) : val
        } else if (cap === 'w') {
          const val = getWeekOfMonth(valDate)
          if (tag === 'w') return val + ''
          return locale?.weeks[val - 1] || tag
        } else if (cap === 'E') {
          let dayOfWeek = valDate.getDay()
          dayOfWeek = dayOfWeek < 1 ? 7 : dayOfWeek
          return tag === 'E'
            ? dayOfWeek + ''
            : locale?.days[dayOfWeek - 1] || tag
        } else if (cap === 'S') {
          return valDate.getMilliseconds() + ''
        }
        return tag
      })
    }
  }
  return formatter(val)
}
const cache: Record<string, Function> = {}
const Locale: Record<
  string,
  { quarters: string[]; months: string[]; weeks: string[]; days: string[]; meridiems: string[] }
> = {
  'zh-CN': {
    quarters: ['一季度', '二季度', '三季度', '四季度'],
    months: [
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '十一',
      '十二',
    ].map((v) => v + '月'),
    weeks: ['一', '二', '三', '四', '五', '六'].map((v) => '第' + v + '周'),
    days: ['一', '二', '三', '四', '五', '六', '日'].map((v) => '星期' + v),
    meridiems: ['AM', 'PM']
  },
}
let Lang = globalThis.navigator?.language || 'zh-CN'
/**
 * 设置不同locale的配置
 * @param lang 语言标记，默认跟随系统
 * @param {object} options 格式化选项
 * @param options.quarters 季度描述，默认"一 - 四季度"
 * @param options.months 月度描述，默认"一 - 十二月"
 * @param options.weeks 一月中的周描述，默认"第一 - 六周"
 * @param options.days 星期描述，默认"星期一 - 日"
 * @param options.meridiems 上午/下午描述，默认"AM/PM"
 */
formatDate.locale = function (
  lang: string,
  options: {
    quarters: string[]
    months: string[]
    weeks: string[]
    days: string[]
    meridiems: string[]
  }
): void {
  let locale = Locale[lang]
  if (!locale) {
    locale = Locale[lang] = { quarters: [], months: [], weeks: [], days: [], meridiems: [] }
  }

  if (options?.quarters) {
    locale.quarters = options?.quarters
  }
  if (options?.months) {
    locale.months = options?.months
  }
  if (options?.weeks) {
    locale.weeks = options?.weeks
  }
  if (options?.days) {
    locale.days = options?.days
  }
  if (options?.meridiems) {
    locale.meridiems = options?.meridiems
  }
}
/**
 * 可以设置当前格式化使用的语言
 * @param lang 语言标记，默认跟随系统
 */
formatDate.lang = function (lang: string) {
  Lang = lang
}

export default formatDate