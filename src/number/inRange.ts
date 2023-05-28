import gte from './gte'
import lt from './lt'
/**
 * 验证数字v是否大于等于start并且小于end
 * 根据参数个数不同，分为两种签名
 * <pre><code class="language-javascript">
 * _.inRange(v,end);
 * _.inRange(v,start,end);
 * </code></pre>
 * 如果start大于end，则会交换位置
 *
 * @example
 * //true
 * console.log(_.inRange(1,1,2))
 * //true
 * console.log(_.inRange(2,3))
 * //false
 * console.log(_.inRange(2,0,2))
 * //true
 * console.log(_.inRange(-2,-2,0))
 * //true
 * console.log(_.inRange(-1,-2))
 *
 * @param v
 * @param [start=0] 最小值
 * @param end 最大值
 * @returns
 * @since 1.0.0
 */
function inRange(v: any, end: number): boolean
function inRange(v: any, start: number, end: number): boolean
function inRange(v: any, start?: number, end?: number): boolean {
  start = start || 0
  if (end === undefined) {
    end = start
    start = 0
  }
  if (start > end) {
    const tmp = end
    end = start
    start = tmp
  }
  return gte(v, start) && lt(v, end)
}

export default inRange