import toNumber from "../number/toNumber";
import isArray from "../is/isArray";
/**
 * 删除数组末尾或指定索引的一个元素并返回被删除的元素
 * 
 * > 该函数会修改原数组
 *
 * @example
 * //3, [1, 2]
 * let ary = [1,2,3];
 * console.log(_.pop(ary),ary)
 * //{a: 1}, [{"a":2},{"a":3}]
 * ary = [{a:1},{a:2},{a:3}];
 * console.log(_.pop(ary,0),ary)
 *
 * @param array 数组对象。如果非数组类型会直接返回null
 * @param [index=-1] 要删除元素的索引。默认删除最后一个元素
 * @returns 被删除的值或null
 */
    function pop<T>(array: unknown[], index?: number): T | null {
      index = index || -1
      let rs = null
      if (isArray(array)) {
        const i = toNumber(index)
        if (i > -1) {
          rs = array.splice(i, 1)
          if (rs.length < 1) rs = null
          else {
            rs = rs[0]
          }
        } else {
          rs = array.pop()
        }
      }
      return rs as T | null
    }

export default pop