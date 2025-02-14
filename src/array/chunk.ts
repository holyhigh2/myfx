/**
 * 把指定数组拆分成多个长度为size的子数组，并返回子数组组成的二维数组
 * @example
 * //[[1,2],[3,4]]
 * console.log(_.chunk([1,2,3,4],2))
 * //[[1,2,3],[4]]
 * console.log(_.chunk([1,2,3,4],3))
 *
 * @param array 数组，非数组返回空数组
 * @param [size=1] 子数组长度
 * @returns 拆分后的新数组
 * @since 0.23.0
 */
function chunk<T>(array: T[] | Set<T>, size: number = 1): T[][] {
  const rs: T[][] = []
  if (!Array.isArray(array)) return rs

  const sizeNum = (size || 1) >> 0
  array.forEach((v, i) => {
    if (i % sizeNum == 0) {
      rs.push(array.slice(i, i + sizeNum))
    }
  })
  return rs
}

export default chunk