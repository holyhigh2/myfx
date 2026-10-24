const toString = Object.prototype.toString

/**
 * 内建类型标签读取原语（返回 '[object Xxx]'）。
 * isEqualWith 的跨类型判定与 isMatchWith 的 built-in 对象判定共用；勿再就地声明 objToString。
 */
function _objTag(v: unknown): string {
  return toString.call(v)
}

export default _objTag
