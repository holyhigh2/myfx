import toString from "./toString"
/**
 * 创建一个以原字符串为模板，重复指定次数的新字符串
 *
 * @example
 * //funcfuncfunc
 * console.log(_.repeat('func',3))
 *
 * @param str 原字符串
 * @param count 重复次数
 * @returns 对于null/undefined会返回空字符串
 */
function repeat(str: any, count: number): string {
  str = toString(str)
  count = Number.isFinite(count) ? count : 0
  if (count < 1) return ''
  if(str.repeat)return str.repeat(count)
  
  let i = count
  let rs = ''
  while (i--) {
    rs += str
  }

  return rs
}

export default repeat