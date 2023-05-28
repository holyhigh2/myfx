import padStart from "./padStart"
/**
 * 使用字符0填充原字符串达到指定长度。从原字符串起始位置开始填充。
 *
 * @example
 * //001
 * console.log(_.padZ('1',3))
 *
 * @param str 原字符串
 * @param len 填充后的字符串长度
 * @returns 填充后的字符串
 */
function padZ(str: any, len: number): string {
  return padStart(str, len, '0')
}

export default padZ