/**
 * 返回一个全局的整数id，序号从0开始。可以用于前端列表编号等用途
 *
 * @example
 * //func_0
 * console.log(_.uniqueId('func'))
 * //1
 * console.log(_.uniqueId())
 *
 * @param [prefix] id前缀
 * @returns 唯一id
 * @since 0.16.0
 */
function uniqueId(prefix?: string): string {
  return (prefix !== undefined ? prefix + '_' : '') + seed++
}
let seed = 0

export default uniqueId