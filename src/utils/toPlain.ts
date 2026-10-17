/**
 * 把任意值转为「纯 JSON」副本，等价于 `JSON.parse(JSON.stringify(v ?? null))`。
 *
 * 用途是**快照 / 落地前净化**：
 * - `undefined`、函数、`Symbol` 等 JSON 不支持的值会被丢弃；
 * - `Date` 变为 ISO 字符串（不保留 `Date` 类型，需要保类型请用 {@link cloneDeep}）；
 * - 响应式代理（`Proxy`）会被展开为普通对象，适合取"此刻快照"；
 * - 循环引用会抛错（与 `JSON.stringify` 行为一致）。
 *
 * @example
 * //{a:1,b:[1,2]}
 * console.log(_.toPlain({a:1,b:[1,2],c:undefined,d(){}}))
 * //'2020-01-01T00:00:00.000Z'
 * console.log(_.toPlain(new Date('2020-01-01')))
 * //null
 * console.log(_.toPlain(undefined))
 *
 * @param v 任意值
 * @returns 纯 JSON 结构的副本
 * @since 2.0.0
 */
function toPlain<T>(v: T): T {
  return JSON.parse(JSON.stringify(v ?? null))
}

export default toPlain
