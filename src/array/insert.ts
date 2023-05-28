import toArray from "../collection/toArray";
import isArray from "../is/isArray";
import isNumber from "../is/isNumber";
/**
 * 向数组中指定位置插入一个或多个元素并返回
 * 
 * > 该函数会修改原数组
 *
 * @example
 * //[1, 2, Array(1), 'a', 3, 4]
 * let ary = [1,2,3,4];
 * _.insert(ary,2,[1],'a');
 * console.log(ary);
 * //[1, 2, 3, 4]
 * ary = [3,4];
 * _.insert(ary,0,1,2);
 * console.log(ary);
 * //func.js
 * console.log(_.insert('funcjs',4,'.').join(''));
 *
 * @param array 数组对象。如果非数组类型会自动转为数组
 * @param index 插入位置索引，0 - 列表长度
 * @param values 1-n个需要插入列表的值
 * @returns 插入值后的数组对象
 */
    function insert<T>(array: T[], index: number, ...values: any[]): T[] {
      const rs = isArray(array) ? array : toArray<T>(array)
      if (!isNumber(index) || index < 0) index = 0
      rs.splice(index, 0, ...values)
      return rs
    }

export default insert