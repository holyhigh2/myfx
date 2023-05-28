import isEqualWith from "./isEqualWith";
/**
 * 判断两个值是否相等，对于非基本类型会进行深度比较，可以比较日期/正则/数组/对象等
 *
 * @example
 * //false
 * console.log(_.isEqual(1,'1'))
 * //true,false
 * let o = {a:1,b:[2,{c:['3','x']}]}
 * let oo = {a:1,b:[2,{c:['3','x']}]}
 * console.log(_.isEqual(o,oo),o == oo)
 * //true
 * console.log(_.isEqual([new Date('2010-2-1'),/12/],[new Date(1264953600000),new RegExp('12')]))
 * //false
 * console.log(_.isEqual([new Date('2010-2-1'),'abcd'],['2010/2/1','Abcd']))
 *
 * @param a
 * @param b
 * @returns
 * @since 1.0.0
 */
function isEqual(a: unknown, b: unknown): boolean {
  return isEqualWith(a, b)
}

export default isEqual