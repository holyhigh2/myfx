
/**
 * 根据指定的node及parentKey属性，查找最近的祖先节点
 * @param node Element节点或普通对象节点
 * @param predicate (node,times,cancel)断言函数，如果返回true表示节点匹配。或调用cancel中断查找
 * @param parentKey 父节点引用属性名
 * @returns 断言为true的最近一个祖先节点
 * @since 1.0.0
 */
function closest<V extends Record<string | number | symbol, any>, U extends Record<string | number | symbol, any>>(
  node: V,
  predicate: (node: V, times: number, cancel: () => void) => boolean,
  parentKey: string,
): U | null
function closest<U extends Record<string | number | symbol, any>>(
  node: Record<string | number | symbol, any>,
  predicate: (node: Record<string | number | symbol, any>, times: number, cancel: () => void) => boolean,
  parentKey: string,
): U | null
function closest<U extends Record<string | number | symbol, any>>(
  node: Record<string | number | symbol, any>,
  predicate: (node: Record<string | number | symbol, any>, times: number, cancel: () => void) => boolean,
  parentKey: string,
): U | null {
  let p = node
  let t: any = null
  let k = true
  let i = 0
  while (k && p) {
    if (predicate(p, i++, () => { k = false })) {
      t = p
      break
    }
    p = p[parentKey]
  }
  return t
}

export default closest