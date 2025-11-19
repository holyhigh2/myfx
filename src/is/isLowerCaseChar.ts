/**
 * 判断参数是否为小写字母
 * @example
 * //false
 * console.log(_.isLowerCaseChar('A'))
 * //true
 * console.log(_.isLowerCaseChar('a'))
 * //false
 * console.log(_.isLowerCaseChar(null))
 *
 * @param v
 * @returns
 */
function isLowerCaseChar(v: string): v is Lowercase<string> {
  if (v === null || v === undefined || Number.isNaN(v)) return false
  const code = (v + '').charCodeAt(0);
  return code >= 97 && code <= 122;
}

export default isLowerCaseChar