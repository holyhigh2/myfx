/**
 * 判断参数是否为Array对象的实例
 *
 * @example
 * //true
 * console.log(_.isArray([]))
 * //false
 * console.log(_.isArray(document.body.children))
 *
 * @param v
 * @returns
 */
function isArray<T>(v: unknown): v is T[] {
  // 使用 instanceof Array 无法鉴别某些场景，比如
  // Array.prototype instanceof Array => false
  // Array.isArray(Array.prototype) => true
  // typeof new Proxy([],{}) => object
  // Array.isArray(new Proxy([],{})) => true
  return Array.isArray(v)
}

export default isArray