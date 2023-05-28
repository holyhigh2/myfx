/**
 * 如果v是null/undefined/NaN中的一个，返回defaultValue
 * @example
 * //"x"
 * console.log(_.defaultTo(null,'x'))
 * //0
 * console.log(_.defaultTo(0,'y'))
 *
 * @param v 任何值
 * @param defaultValue 任何值
 * @returns v或defaultValue
 * @since 0.16.0
 */
function defaultTo<T, V>(v: T, defaultValue: V): T | V {
  if (v === null || v === undefined || Number.isNaN(v)) return defaultValue
  return v
}

export default defaultTo