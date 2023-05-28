/**
 * 返回一个大于等于min，小于max的随机浮点数。支持单参数/无参数签名
 * 
 * ```js
 * _.randf(max);//单参数签名，此时min为0
 * _.randf();//无参数签名，此时返回0-1的随机浮点数。效果与Math.random()相同
 * ```
 * 
 * @example
 * //0-1随机浮点数
 * console.log(_.randf())
 * //0-9随机浮点数
 * console.log(_.randf(10))
 * //10-19随机浮点数
 * console.log(_.randf(10,20))
 *
 * @param min 最小边界值，包含。会进行浮点数转换，如果非数字会变为0
 * @param max 最大边界值，不包含。会进行整数转换，如果非数字会变为0
 * @returns
 */
function randf(): number
function randf(max: number): number
function randf(min?: number, max?: number): number
function randf(min?: number, max?: number): number {
  if (max === undefined) {
    if (!min) return Math.random()

    max = min
    min = 0
  }
  max = parseFloat(max + '') || 0
  min = parseFloat(min + '') || 0
  return Math.random() * (max - min) + min
}

export default randf