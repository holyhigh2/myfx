import _iteratee from "../_iteratee";
import isArray from "../is/isArray";
import { NonFuncItee } from "../types";
/**
 * 删除数组中断言结果为true的元素并返回被删除的元素
 * <div class="alert alert-secondary">
      该函数会修改原数组
    </div>
 *
 * @example
 * //[1, 3] [2, 4]
 * let ary = [1,2,3,4];
 * console.log(_.remove(ary,x=>x%2),ary)
 * //[2] [1,3]
 * ary = [{a:1},{a:2},{a:3}];
 * console.log(_.remove(ary,v=>v.a===2),ary)
 * //[3] [1,2]
 * ary = [{a:1},{a:2},{a:3}];
 * console.log(_.remove(ary,{a:3}),ary)
 *
 * @param array 数组对象，如果参数非数组直接返回
 * @param predicate (value[,index[,array]]);断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 被删除的元素数组或空数组
 * @since 0.19.0
 */
    function remove<T>(
      array: T[],
      predicate:
        | ((value: T, index: string | number, array: T[]) => boolean)
        | NonFuncItee
    ): T[] {
      const rs: T[] = []
      if (!isArray(array)) return rs
      const itee = _iteratee(predicate)
    
      let i = 0
      for (let l = 0; l < array.length; l++) {
        const item = array[l]
        const r = itee(item, l, array)
        if (r) {
          rs.push(item)
        } else {
          array[i++] = item
        }
      }
      array.length = i
    
      return rs
    }

export default remove