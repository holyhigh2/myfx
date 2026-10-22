import isBoolean from "./is/isBoolean"
import isDate from "./is/isDate"
import isMap from "./is/isMap"
import isNumber from "./is/isNumber"
import isRegExp from "./is/isRegExp"
import isSet from "./is/isSet"
import isString from "./is/isString"

function cloneBuiltInObject(
  obj: unknown
): Date | Boolean | String | RegExp | Set<any> | Map<any, any> | Number | ArrayBuffer | ArrayBufferView | null {
  let rs = null
  if (isDate(obj)) {
    rs = new Date(obj.getTime())
  } else if (isBoolean(obj)) {
    rs = new Boolean(obj.valueOf())
  } else if (isString(obj)) {
    rs = new String(obj)
  } else if (isRegExp(obj)) {
    rs = new RegExp(obj)
    // RegExp构造器不复制lastIndex，需要显式保留
    rs.lastIndex = obj.lastIndex
  } else if (isNumber(obj)) {
    rs = new Number(obj)
  } else if (isSet(obj)) {
    rs = new Set(obj)
  } else if (isMap(obj)) {
    rs = new Map(obj)
  } else if (typeof ArrayBuffer !== "undefined" && obj instanceof ArrayBuffer) {
    rs = obj.slice(0)
  } else if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(obj)) {
    if (typeof DataView !== "undefined" && obj instanceof DataView) {
      // 复制观测区间对应的字节，脱开原 buffer 引用
      rs = new DataView(obj.buffer.slice(obj.byteOffset, obj.byteOffset + obj.byteLength), 0, obj.byteLength)
    } else {
      // TypedArray.slice 复制内容且保留子类 species
      rs = (obj as Uint8Array).slice()
    }
  }
  return rs
}

export default cloneBuiltInObject