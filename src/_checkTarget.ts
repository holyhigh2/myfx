import isObject from "./is/isObject"

function checkTarget(target: any) {
  if (target === null || target === undefined) return {}
  if (!isObject(target)) return new target.constructor(target)
  if (
    !Object.isExtensible(target) ||
    Object.isFrozen(target) ||
    Object.isSealed(target)
  ) {
    return target
  }
}
export default checkTarget