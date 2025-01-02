import toArray from "../collection/toArray";
import isArray from "../is/isArray";
/**
 * 向数组末尾追加一个或多个元素并返回
 * 
 * > 该函数会修改原数组
 *
 * @example
 * //[1, 2, 3, 4]
 * let ary = [1,2];
 * _.append(ary,3,4);
 * console.log(ary);
 * //[1, 2, Array(2), 5]
 * ary = [1,2];
 * _.append(ary,[3,4],5);
 * console.log(ary);
 * //[1, 2, 3, 4]
 * ary = [1,2];
 * _.append(ary,...[3,4]);
 * console.log(ary);
 *
 * @param array 数组对象。如果非数组类型会自动转为数组
 * @param values 1-n个需要插入列表的值
 * @returns 插入值后的数组对象
 */
function append<T>(array: T[] | Set<T>, ...values: any[]): T[] {
  const rs = isArray(array) ? array : toArray<T>(array)
  rs.push(...values)
  return rs
}

export default append