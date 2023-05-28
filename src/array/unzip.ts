import each from "../collection/each";
import size from "../collection/size";
/**
 * <code>zip</code>的反操作
 * @example
 * //[[1,2,undefined],['a','b','c']]
 * console.log(_.unzip([[1, 'a'],[2, 'b'],[undefined, 'c']]))
 * //[['a', 'b', 'c'], [1, 2, undefined],['1', undefined,undefined]]
 * console.log(_.unzip([['a', 1, '1'], ['b', 2],['c']]))
 *
 * @param array 包含若干分组的数组
 * @returns 重新分组后的新数组
 * @since 0.23.0
 */
function unzip(array: any[]): any[][] {
  const rs: any[][] = []
  const len = size(array)
  each<any[], number>(array, (group, colIndex) => {
    each<any, number>(group, (el, rowIndex) => {
      let row = rs[rowIndex]
      if (!row) {
        row = rs[rowIndex] = new Array(len)
      }
      row[colIndex] = el
    })
  })

  return rs
}

export default unzip