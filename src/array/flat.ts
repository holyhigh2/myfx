import toArray from "../collection/toArray";
import isSet from "../is/isSet";

const MAX_DEPTH = 100;

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
 * @param depth 嵌套深度
 * @returns 扁平化后的新数组
 */
function flat<T>(array: any[] | Set<any>, depth: number = 1): T[] {
  if (depth < 1) return toArray<T>(array)
  const safeDepth = Math.min(depth, MAX_DEPTH)
  const inputArr = toArray<T>(array)
  const result: T[] = []
  
  // 反向压栈以保持原始顺序（LIFO）
  const stack: { arr: any[]; depth: number }[] = []
  for (let i = inputArr.length - 1; i >= 0; i--) {
    stack.push({ arr: [inputArr[i]], depth: safeDepth })
  }
  
  while (stack.length > 0) {
    const { arr, depth: currentDepth } = stack.pop()!
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i]
      if (Array.isArray(val) || isSet(val)) {
        if (currentDepth > 0) {
          const childArr = toArray(val)
          for (let j = childArr.length - 1; j >= 0; j--) {
            stack.push({ arr: [childArr[j]], depth: currentDepth - 1 })
          }
        } else {
          result.push(val as T)
        }
      } else {
        result.push(val)
      }
    }
  }
  
  return result
}

export default flat