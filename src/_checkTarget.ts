import isObject from "./is/isObject"

function checkTarget(target: any) {
  if (target === null || target === undefined) return {}
  if (!isObject(target)) {
    const ctor = target.constructor
    if (typeof ctor === "function") {
      try {
        return new ctor(target)
      } catch (e) {
        return Object(target)
      }
    }
    return Object(target)
  }
  if (
    !Object.isExtensible(target) ||
    Object.isFrozen(target) ||
    Object.isSealed(target)
  ) {
    return target
  }
}
export default checkTarget