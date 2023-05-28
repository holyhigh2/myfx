import flat from './flat'
/**
 * 无限深度遍历数组，并将所有元素与子数组中的元素合并为一个新数组返回
 *
 * @example
 * //[1,2,1,3,4]
 * console.log(_.flatDeep(new Set([1,1,[2,[1,[3,4]]]])))
 * //[1,2,3,4]
 * console.log(_.flatDeep([1,[2,[3,[4]]]]))
 *
 * @param array 数组
 * @returns 扁平化后的新数组
 */
function flatDeep<T>(array: any[]): T[] {
  return flat<T>(array, Infinity)
}

export default flatDeep