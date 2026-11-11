/**
 * memoize 的选项。
 * @since 2.0.0
 */
export interface MemoizeOptions<F extends (...args: any[]) => any> {
  /** 缓存上限，默认 512；Infinity 表示不限。非 LRU 模式满后整表清空，LRU 模式逐出最久未用 */
  maxSize?: number
  /** 是否 LRU（命中回尾、超限逐出最老），默认 false（满后整表清空，O(1)） */
  lru?: boolean
  /** 多参函数的缓存键生成器；缺省用第一个实参作键 */
  resolver?: (...args: Parameters<F>) => any
}

/**
 * 缓存函数结果：同键命中直接返回，不再调用 fn。
 * 约定：返回 `undefined` 的结果**不缓存**（每次重算）；缓存为强引用 Map，只适用于值类型键。
 * @example
 * let calls = 0
 * const slow = (n: number) => { calls++; return n * 2 }
 * const fast = _.memoize(slow)
 * fast(2) //4，calls=1
 * fast(2) //4，calls 仍=1
 *
 * //多参 + 自定义键
 * const fmt = _.memoize(
 *   (locale: string, opts?: object) => new Intl.DateTimeFormat(locale, opts),
 *   { maxSize: Infinity, resolver: (l, o) => l + JSON.stringify(o ?? {}) }
 * )
 *
 * @param fn 被缓存的函数
 * @param options 缓存选项
 * @returns 带缓存的同签名函数
 * @since 2.0.0
 */
function memoize<F extends (...args: any[]) => any>(fn: F, options?: MemoizeOptions<F>): F {
  const maxSize = options?.maxSize ?? 512
  const lru = options?.lru ?? false
  const resolver = options?.resolver
  const cache = new Map<any, ReturnType<F>>()
  const memoized = (...args: Parameters<F>): ReturnType<F> => {
    const key = resolver ? resolver(...args) : args[0]
    const hit = cache.get(key)
    if (hit !== undefined) {
      if (lru) {
        cache.delete(key)
        cache.set(key, hit)
      }
      return hit
    }
    const r = fn(...args)
    if (r !== undefined) {
      if (cache.size >= maxSize) {
        if (lru) {
          const oldest = cache.keys().next().value
          if (oldest !== undefined) cache.delete(oldest)
        } else {
          cache.clear()
        }
      }
      cache.set(key, r)
    }
    return r
  }
  return memoized as F
}

export default memoize