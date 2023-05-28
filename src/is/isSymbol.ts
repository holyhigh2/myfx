/**
 * 判断值是不是Symbol
 *
 * @example
 * //true
 * console.log(_.isSymbol(Symbol()))
 *
 * @param v
 * @returns
 * @since 1.0.0
 */
function isSymbol(v: unknown): v is symbol {
  return typeof v === 'symbol'
}

export default isSymbol