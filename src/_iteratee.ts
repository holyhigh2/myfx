import { NonFuncItee } from "./types"
import isUndefined from "./is/isUndefined"
import isFunction from "./is/isFunction"
import isString from "./is/isString"
import isArray from "./is/isArray"
import isObject from "./is/isObject"
import _identity from "./_identity"
import prop from "./object/prop"
import toPath from "./utils/toPath"
import matcher from "./utils/matcher"

function iteratee(value: Function | NonFuncItee): Function {
  if (isUndefined(value)) {
    return _identity
  } else if (isFunction(value)) {
    return value
  } else if (isString(value)) {
    return prop(value)
  } else if (isArray(value)) {
    return prop(toPath(value))
  } else if (isObject(value)) {
    return matcher(value)
  }
  return () => false
}
export default iteratee