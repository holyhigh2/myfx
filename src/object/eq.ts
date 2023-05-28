import _eq from "../_eq";
/**
 * 判断两个值是否相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
 * 算法进行值比较。
 *
 * @example
 * //true
 * console.log(_.eq(NaN,NaN))
 * //false
 * console.log(_.eq(1,'1'))
 *
 * @param a
 * @param b
 * @returns
 * @since 1.0.0
 */
function eq(a: unknown, b: unknown): boolean {
  return _eq(a,b)
}

export default eq