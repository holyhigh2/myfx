import remove from "./remove";
import includes from "../collection/includes";
/**
 * 与without相同，但会修改原数组
 * <div class="alert alert-secondary">
      该函数会修改原数组
    </div>
 *
 * @example
 * //[1, 1] true
 * let ary = [1,2,3,4,3,2,1];
 * let newAry = _.pull(ary,2,3,4)
 * console.log(newAry,ary === newAry)
 *
 * @param array 数组对象
 * @param values 需要删除的值
 * @returns 新数组
 * @since 0.19.0
 */
    function pull<T>(array: T[], ...values: T[]): T[] {
      remove(array, (item) => includes(values, item))
      return array
    }

export default pull