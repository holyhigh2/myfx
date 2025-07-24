/**
 * 判断参数是否为大写字母
 * @example
 * //true
 * console.log(_.isUpperCaseChar('A'))
 * //false
 * console.log(_.isUpperCaseChar(null))
 *
 * @param v
 * @returns
 */
function isUpperCaseChar(v: string): boolean {
  if (v === null || v === undefined || Number.isNaN(v)) return false
  const code = (v + '').charCodeAt(0);
  return code >= 65 && code <= 90;
}

export default isUpperCaseChar