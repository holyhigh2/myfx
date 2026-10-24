const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * 自有属性探测原语（hasOwnProperty.call 的固定 receiver 包装）。
 * 全库唯一实现：isEqualWith/set/unset/has/first/fval 等一律引用此处，勿再就地声明。
 */
function _hasOwn(target: unknown, key: PropertyKey): boolean {
  return hasOwnProperty.call(target, key)
}

export default _hasOwn
