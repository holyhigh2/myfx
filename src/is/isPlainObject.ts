/**
 * 判断值是不是一个朴素对象，即通过Object创建的对象
 *
 * @example
 * //false
 * console.log(_.isPlainObject(1))
 * //false
 * console.log(_.isPlainObject(new String()))
 * //true
 * console.log(_.isPlainObject({}))
 * //false
 * console.log(_.isPlainObject(null))
 * //true
 * console.log(_.isPlainObject(new Object))
 * function Obj(){}
 * //false
 * console.log(_.isPlainObject(new Obj))
 *
 * @param v value
 * @returns 是否朴素对象
 * @since 0.19.0
 */
function isPlainObject(v: unknown): boolean {
  if (v === null || typeof v !== 'object') return false
  if (Object.prototype.toString.call(v) !== '[object Object]') return false
  const proto = Object.getPrototypeOf(v)
  if (proto === null) return true
  // 沿原型链找到顶端，直接原型即顶端时才视为朴素对象
  let top = proto
  while (Object.getPrototypeOf(top) !== null) {
    top = Object.getPrototypeOf(top)
  }
  return proto === top
}

export default isPlainObject