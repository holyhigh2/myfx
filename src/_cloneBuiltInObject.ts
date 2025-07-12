import isBoolean from "./is/isBoolean"
import isDate from "./is/isDate"
import isMap from "./is/isMap"
import isNumber from "./is/isNumber"
import isRegExp from "./is/isRegExp"
import isSet from "./is/isSet"
import isString from "./is/isString"

function cloneBuiltInObject(
  obj: unknown
): Date | Boolean | String | RegExp | Set<any> | Map<any, any> | Number | null {
  let rs = null
  if (isDate(obj)) {
    rs = new Date(obj.getTime())
  } else if (isBoolean(obj)) {
    rs = new Boolean(obj.valueOf())
  } else if (isString(obj)) {
    rs = new String(obj)
  } else if (isRegExp(obj)) {
    rs = new RegExp(obj)
  } else if (isNumber(obj)) {
    rs = new Number(obj)
  } else if (isSet(obj)) {
    rs = new Set(obj)
  } else if (isMap(obj)) {
    rs = new Map(obj)
  }
  return rs
}

export default cloneBuiltInObject