import { memoize } from '../src/index'

describe('memoize', () => {
  test('caches by first arg', () => {
    let calls = 0
    const fn = memoize((n: number) => { calls++; return n * 2 })
    expect(fn(2)).toBe(4)
    expect(fn(2)).toBe(4)
    expect(calls).toBe(1)
    expect(fn(3)).toBe(6)
    expect(calls).toBe(2)
  })

  test('does not cache undefined results', () => {
    let calls = 0
    const fn = memoize((n: number) => { calls++; return n > 0 ? n : undefined })
    fn(0)
    fn(0)
    expect(calls).toBe(2)
  })

  test('clears all when maxSize reached (non-LRU)', () => {
    let calls = 0
    const fn = memoize((n: number) => { calls++; return n }, { maxSize: 2 })
    fn(1)
    fn(2)
    fn(1)
    expect(calls).toBe(2)
    fn(3)
    fn(1)
    expect(calls).toBe(4)
  })

  test('LRU evicts oldest and touches on hit', () => {
    let calls = 0
    const fn = memoize((n: number) => { calls++; return n }, { maxSize: 2, lru: true })
    fn(1)
    fn(2)
    fn(1)
    fn(3)
    expect(calls).toBe(3)
    fn(1)
    expect(calls).toBe(3)
    fn(2)
    expect(calls).toBe(4)
  })

  test('resolver keys multi-arg calls', () => {
    let calls = 0
    const fn = memoize((a: number, b: number) => { calls++; return a + b }, { resolver: (a, b) => a + ':' + b })
    expect(fn(1, 2)).toBe(3)
    expect(fn(1, 2)).toBe(3)
    expect(fn(2, 1)).toBe(3)
    expect(calls).toBe(2)
  })

  test('maxSize Infinity stays unbounded', () => {
    let calls = 0
    const fn = memoize((n: number) => { calls++; return n }, { maxSize: Infinity })
    for (let i = 0; i < 1000; i++) fn(i)
    for (let i = 0; i < 1000; i++) fn(i)
    expect(calls).toBe(1000)
  })
})