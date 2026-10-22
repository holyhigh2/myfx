import toInteger from "../number/toInteger";

/**
 * 返回一个大于等于min，小于max的随机整数。支持单参数签名
 * 
 * ```js
 * _.randi(max);//此时min为0
 * ```
 *
 * 边界会clamp到Number.MIN_SAFE_INTEGER~Number.MAX_SAFE_INTEGER范围内
 * 
 * @example
 * //0-9随机整数
 * console.log(_.randi(10))
 * //10-19随机整数
 * console.log(_.randi(10,20))
 *
 * @param min 最小边界值，包含。会进行整数转换，如果非数字会变为0，如果是小数会舍弃取整。超出安全整数范围会被clamp
 * @param max 最大边界值，不包含。会进行整数转换，如果非数字会变为0，如果是小数会舍弃取整。超出安全整数范围会被clamp
 * @returns
 */
function randi(max: number): number
function randi(min: number, max?: number): number
function randi(min: number, max?: number): number {
  let maxNum: number
  if (max === undefined) {
    maxNum = min
    min = 0
  } else {
    maxNum = max
  }
  maxNum = toInteger(maxNum)
  min = toInteger(min)
  // 双侧clamp到安全整数范围
  if (maxNum > Number.MAX_SAFE_INTEGER) maxNum = Number.MAX_SAFE_INTEGER
  else if (maxNum < Number.MIN_SAFE_INTEGER) maxNum = Number.MIN_SAFE_INTEGER
  if (min > Number.MAX_SAFE_INTEGER) min = Number.MAX_SAFE_INTEGER
  else if (min < Number.MIN_SAFE_INTEGER) min = Number.MIN_SAFE_INTEGER
  return Math.floor(Math.random() * (maxNum - min)) + min
}
export default randi