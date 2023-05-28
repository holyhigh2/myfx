import toString from "./toString"
/**
 * 对字符串进行截取，返回从起始索引到结束索引间的新字符串。
 *
 * @example
 * //"34567"
 * console.log(_.substring('12345678',2,7))
 * //"345678"
 * console.log(_.substring('12345678',2))
 * //""
 * console.log(_.substring())
 *
 * @param str 需要截取的字符串，如果非字符串对象会进行字符化处理。基本类型会直接转为字符值，对象类型会调用toString()方法
 * @param [indexStart=0] 起始索引，包含
 * @param [indexEnd=str.length] 结束索引，不包含
 * @returns
 */
function substring(
  str: any,
  indexStart?: number,
  indexEnd?: number
): string {
  str = toString(str)
  indexStart = indexStart || 0

  return str.substring(indexStart, indexEnd)
}

export default substring