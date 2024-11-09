import _identity from "./_identity"
import isArray from "./is/isArray"
import isFunction from "./is/isFunction"
import isObject from "./is/isObject"
import isString from "./is/isString"
import isUndefined from "./is/isUndefined"
import prop from "./object/prop"
import type { NonFuncItee } from "./types"
import matcher from "./utils/matcher"
import toPath from "./utils/toPath"

function iteratee(value: Function | NonFuncItee): Function {
  if (isUndefined(value)) {
    return _identity
  } else if (isFunction(value)) {
    return value
  } else if (isString(value)) {
    return prop(value)
  } else if (isArray<string | number>(value)) {
    return prop(toPath(value))
  } else if (isObject(value)) {
    return matcher(value)
  }
  return () => false
}
export default iteratee