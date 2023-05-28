import isString from "./is/isString"
import isDate from "./is/isDate"
import isBoolean from "./is/isBoolean"
import isRegExp from "./is/isRegExp"

function cloneBuiltInObject(
  obj: unknown
): Date | boolean | string | RegExp | null {
  let rs = null
  if (isDate(obj)) {
    rs = new Date(obj.getTime())
  } else if (isBoolean(obj)) {
    rs = Boolean(obj)
  } else if (isString(obj)) {
    rs = String(obj)
  } else if (isRegExp(obj)) {
    rs = new RegExp(obj)
  }
  return rs
}

export default cloneBuiltInObject