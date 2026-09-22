/**
 * 永远返回undefined
 * @example
 * //undefined
 * console.log(_.noop('func'))
 * //undefined
 * console.log(_.noop())
 *
 * @returns undefined
 * @since 0.16.0
 */
export default function noop(..._args: any[]): undefined {
  return undefined
}