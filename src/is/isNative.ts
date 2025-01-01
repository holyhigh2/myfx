/**
 * 判断参数是否为本地函数
 *
 * @example
 * //true
 * console.log(_.isNative(Array))
 * //false
 * console.log(_.isNative(()=>{}))
 *
 * @param v
 * @returns
 */
function isNative(v: unknown): boolean {
  return typeof v === 'function' && /native code/.test(v.toString());
}

export default isNative