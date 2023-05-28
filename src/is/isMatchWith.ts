import isObject from "./isObject";
import isNil from "./isNil";
import _eq from "../_eq";
/**
 * 检测props对象中的所有属性是否在object中存在并使用自定义比较器对属性值进行对比。可以用于对象的深度对比。
 * 当comparator参数是默认值时，与<code>isMath</code>函数相同
 *
 * @example
 * let target = {a:{x:1,y:2},b:1}
 * //true
 * console.log(_.isMatchWith(target,{b:1}))
 * //false
 * console.log(_.isMatchWith(target,{b:'1'}))
 *
 * target = {a:null,b:0}
 * //true
 * console.log(_.isMatchWith(target,{a:'',b:'0'},(a,b)=>_.isEmpty(a) && _.isEmpty(b)?true:a==b))
 *
 * @param target 如果不是对象类型，返回false
 * @param props 对比属性对象，如果是nil，返回true
 * @param [comparator=eq] 比较器，参数(object[k],props[k],k,object,props)，返回true表示匹配
 * @returns 匹配所有props返回true
 * @since 0.18.1
 */
function isMatchWith<T extends Record<string | number | symbol, any>>(
  target: T,
  props: T,
  comparator: Function = _eq
) {
  if (isNil(props)) return true
  const ks = Object.keys(props)
  if (!isObject(target)) return false
  let rs = true
  for (let i = ks.length; i--;) {
    const k = ks[i]
    const v1 = target[k]
    const v2 = props[k]
    if (isObject(v1) && isObject(v2)) {
      if (!isMatchWith(v1, v2, comparator)) {
        rs = false
        break
      }
    } else {
      if (!comparator(v1, v2, k, target, props)) {
        rs = false
        break
      }
    }
  }
  return rs
}

export default isMatchWith