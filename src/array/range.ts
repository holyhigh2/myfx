import isUndefined from "../is/isUndefined"

function range(end: number): number[]
function range(start: number, end: number): number[]
function range(start: number, end: number, step: number): number[]
/**
 * 生成一个由(包含)start到(不包含)end的数字元素组成的数组。
 * 根据参数个数不同，分为三种签名
 * <pre><code class="language-javascript">
 * _.range(end);
 * _.range(start,end);
 * _.range(start,end,step);
 * </code></pre>
 *
 * @example
 * //[0, 1, 2, 3, 4]
 * console.log(_.range(5))
 * //[0, -1, -2, -3, -4]
 * console.log(_.range(-5))
 * //[0, -0.5, -1, -1.5, -2, -2.5, -3, -3.5, -4, -4.5]
 * console.log(_.range(0,-5,0.5))
 * //[-5, -4, -3, -2, -1, 0]
 * console.log(_.range(-5,1))
 *
 * @param start 起始数
 * @param end 结束数
 * @param step 步长
 * @returns 数字数组
 */
function range(start: number = 0, end?: number, step: number = 1): number[] {
  let startNum = 0
  let endNum: number
  let stepNum = 1

  if (isUndefined(end)) {
    endNum = start
  } else {
    startNum = start
    endNum = end
    stepNum = Math.abs(step) || 1
  }

  const maxCount = Math.ceil(Math.abs(endNum - startNum) / stepNum)
  const rs: number[] = []
  if (endNum > startNum) {
    for (let i = startNum; rs.length < maxCount && i < endNum; i += stepNum) {
      rs.push(i)
    }
  } else if (endNum < startNum) {
    for (let i = startNum; rs.length < maxCount && i > endNum; i -= stepNum) {
      rs.push(i)
    }
  }

  return rs
}

export default range