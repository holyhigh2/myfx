/**
 * 返回min/max如果value超出范围
 * @example
 * //1
 * console.log(_.minmax([1,10,0]))
 * //6
 * console.log(_.minmax([4,8,6]))
 *
 * @param min
 * @param max
 * @param value
 * @returns
 */
function minmax(min: number, max: number, value: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export default minmax;
