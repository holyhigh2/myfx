import sortedIndexBy from "./sortedIndexBy";
/**
 * 使用二分法确定在array保持排序不变的情况下，value可以插入array的最小索引
 * @example
 * //1
 * console.log(_.sortedIndex([1,2,3],1.5))
 * //1
 * console.log(_.sortedIndex(['a', 'c'], 'b'))
 * //0
 * console.log(_.sortedIndex([{a:1},{a:2},{a:3}], {a:2.5}))
 *
 * @param array 对象属性标识符数组
 * @param value 需要插入数组的值
 * @returns array索引
 * @since 1.0.0
 */
function sortedIndex<T>(array: T[], value: any): number {
  return sortedIndexBy(array, value)
}

export default sortedIndex