/**
 * 为「非内建类型」的克隆创建空壳：仅建壳、不复制属性（属性由调用方逐键写入）
 *
 */
function _cloneShell(obj: object): any {
  const proto = Object.getPrototypeOf(obj)
  if (Array.isArray(obj)) {
    const copy = new Array(obj.length) as any
    if (proto !== Array.prototype) Object.setPrototypeOf(copy, proto)
    return copy
  }
  // 不调用 constructor，按原型建空壳
  return proto === null ? Object.create(null) : Object.create(proto)
}

export default _cloneShell
