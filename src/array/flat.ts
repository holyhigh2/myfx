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
  if (array == null) return []
  if (depth < 1) return Array.from(array)
  const safeDepth = Math.min(depth, MAX_DEPTH)
  const result: T[] = []

  const stack: { val: any; depth: number }[] = []

  // Convert to array to preserve insertion order and allow reverse iteration
  const inputArr = Array.from(array)

  // Reverse iteration to maintain original order (LIFO stack)
  for (let i = inputArr.length - 1; i >= 0; i--) {
    stack.push({ val: inputArr[i], depth: safeDepth })
  }

  while (stack.length > 0) {
    const { val, depth: currentDepth } = stack.pop()!
    if (Array.isArray(val)) {
      if (currentDepth > 0) {
        for (let i = val.length - 1; i >= 0; i--) {
          stack.push({ val: val[i], depth: currentDepth - 1 })
        }
      } else {
        result.push(val as T)
      }
    } else if (isSet(val)) {
      if (currentDepth > 0) {
        const childArr = Array.from(val)
        for (let i = childArr.length - 1; i >= 0; i--) {
          stack.push({ val: childArr[i], depth: currentDepth - 1 })
        }
      } else {
        result.push(val as T)
      }
    } else {
      result.push(val)
    }
  }

  return result
}

export default flat