import toArray from "../collection/toArray";
import type { ArrayLike } from "../types";
/**
 * 对数组进行切片，并返回切片后的新数组，原数组不变。新数组内容是对原数组内容的浅拷贝
 *
 * @example
 * //[2,3,4]
 * console.log(_.slice([1,2,3,4,5],1,4))
 * //[2,3,4,5]
 * console.log(_.slice([1,2,3,4,5],1))
 *
 *
 * @param array 数组
 * @param [begin=0] 切片起始下标，包含下标位置元素
 * @param [end] 切片结束下标，<b>不包含</b>下标位置元素
 * @returns 切片元素组成的新数组
 */
function slice<T>(array: Set<T> | ArrayLike, begin?: number, end?: number): T[] {
  return toArray<T>(array).slice(begin || 0, end)
}

export default slice