import isObject from "./isObject";
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
  return isObject(v) && v.constructor === Object.prototype.constructor
}

export default isPlainObject