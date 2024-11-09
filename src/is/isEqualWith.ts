import _eq from "../_eq";
import isDate from "./isDate";
import isObject from "./isObject";
import isRegExp from "./isRegExp";
/**
 * 同<code>isEqual</code>，但支持自定义比较器
 *
 * @example
 * //true
 * console.log(_.isEqualWith([new Date('2010-2-1'),'abcd'],['2010/2/1','Abcd'],(av,bv)=>_.isDate(av)?av.toLocaleDateString() == bv:_.test(av,bv,'i')))
 *
 * @param a
 * @param b
 * @param [comparator] 比较器，参数(v1,v2)，返回true表示匹配。如果返回undefined使用对应内置比较器处理
 * @returns
 * @since 1.0.0
 */
function isEqualWith(a: any, b: any, comparator?: Function): boolean {
  let cptor = comparator
  if (!isObject(a) || !isObject(b)) {
    return (cptor || _eq)(a, b)
  }
  let keys: any = []

  if ((keys = Object.keys(a)).length !== Object.keys(b).length) return false
  if (isDate(a) && isDate(b))
    return cptor ? cptor(a, b) : a.getTime() === b.getTime()
  if (isRegExp(a) && isRegExp(b))
    return cptor ? cptor(a, b) : a.toString() === b.toString()

  for (let i = keys.length; i--;) {
    const k = keys[i]
    const v1 = (a as any)[k],
      v2 = (b as any)[k]
    if (!isEqualWith(v1, v2, cptor)) {
      return false
    }
  }

  return true
}

export default isEqualWith