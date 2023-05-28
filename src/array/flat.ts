import toArray from "../collection/toArray";
/**
 * 按照指定的嵌套深度递归遍历数组，并将所有元素与子数组中的元素合并为一个新数组返回
 *
 * @example
 * //[1,2,3,4,5]
 * console.log(_.flat([1,[2,3],[4,5]]))
 * //[1,2,3,4,5,[6,7]]
 * console.log(_.flat([1,[2,3],[4,5,[6,7]]]))
 * //[1,2,3,[4]]
 * console.log(_.flat([1,[2,[3,[4]]]],2))
 * //[1,2,1,3,4]
 * console.log(_.flat(new Set([1,1,[2,[1,[3,4]]]]),Infinity))
 *
 * @param array 数组
 * @param [depth=1] 嵌套深度
 * @returns 扁平化后的新数组
 */
function flat<T>(array: any[], depth: number = 1): T[] {
  if (depth < 1) return array.concat() as T[]
  const rs = toArray<T>(array).reduce((acc, val: any) => {
    return acc.concat(
      Array.isArray(val) && depth > 0 ? flat<T>(val, depth - 1) : val
    )
  }, [])

  return rs
}

export default flat