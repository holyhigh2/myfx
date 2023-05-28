import each from "../collection/each"
/**
 * 创建一个由指定数组arrays内元素重新分组后组成的二维数组，
 * 第一个子数组由每个数组内的第一个元素组成，第二个子数组由每个数组内的第二个元素组成，以此类推。
 * 子数组的数量由参数中数组内元素最多的数组决定。
 * @example
 * //[[1, 'a'],[2, 'b'],[undefined, 'c']]
 * console.log(_.zip([1,2],['a','b','c']))
 * //[['a', 1, '1'], ['b', 2, undefined],['c', undefined,undefined]]
 * console.log(_.zip(['a','b','c'],[1,2],['1']))
 *
 * @param arrays 1-n个数组
 * @returns 重新分组后的新数组
 * @since 0.23.0
 */
function zip(...arrays: any[][]): any[][] {
  const rs: any[][] = []
  const size = arrays.length
  arrays.forEach((ary, colIndex) => {
    each<any, number>(ary, (el, i) => {
      let group = rs[i]
      if (!group) {
        group = rs[i] = new Array(size)
      }
      group[colIndex] = el
    })
  })

  return rs
}

export default zip