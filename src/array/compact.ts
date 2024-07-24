import toArray from "../collection/toArray";
import _identity from '../_identity'
/**
 * 对集合内的假值进行剔除，并返回剔除后的新数组。假值包括 null/undefined/NaN/0/''/false
 * @example
 * //[1,2,4,'a','1']
 * console.log(_.compact([0,1,false,2,4,undefined,'a','1','',null]))
 *
 * @param array 数组
 * @returns 转换后的新数组对象
 */
function compact<T>(array: T[]|Set<T>): T[] {
  return toArray(array).filter<T>(_identity as any)
}

export default compact