/**
 * 返回一个大于等于min，小于max的随机整数。支持单参数签名
 * 
 * ```js
 * _.randi(max);//此时min为0
 * ```
 * 
 * @example
 * //0-9随机整数
 * console.log(_.randi(10))
 * //10-19随机整数
 * console.log(_.randi(10,20))
 *
 * @param min 最小边界值，包含。会进行整数转换，如果非数字会变为0，如果是小数会舍弃取整
 * @param max 最大边界值，不包含。会进行整数转换，如果非数字会变为0，如果是小数会舍弃取整
 * @returns
 */
function randi(max: number): number
function randi(min: number, max?: number): number
function randi(min: number, max?: number): number {
  let maxNum = max || min
  if (max === undefined) {
    min = 0
  }
  maxNum >>= 0
  min >>= 0
  return (Math.random() * (maxNum - min) + min) >> 0
}
export default randi