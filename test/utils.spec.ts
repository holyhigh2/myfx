import myfx from '../src/index'

/**
 * Utils module dedicated tests (function-returning helpers)
 */
describe('utils', () => {
  describe('matcher', () => {
    const props = { tags: { utils: true }, js: true }
    test('matches when all props match', () => {
      const m = myfx.matcher({ js: true })
      expect(m({ js: true } as any)).toBe(true)
    })
    test('rejects when props mismatch', () => {
      const m = myfx.matcher({ js: true })
      expect(m({ js: false } as any)).toBe(false)
    })
    test('returns a function', () => {
      expect(typeof myfx.matcher(props)).toBe('function')
    })
  })

  describe('prop', () => {
    const libs = [
      { name: 'a', platform: ['web', 'nodejs'] },
      { name: 'b', platform: ['java'] },
    ]
    test('gets simple path', () => {
      expect(myfx.prop('name')(libs[0] as any)).toBe('a')
    })
    test('gets array index path', () => {
      expect(myfx.prop(['platform', 1])(libs[0] as any)).toBe('nodejs')
    })
    test('returns function', () => {
      expect(typeof myfx.prop('name')).toBe('function')
    })
  })

  describe('iteratee', () => {
    test('identity for undefined', () => {
      expect(myfx.iteratee()(42)).toBe(42)
    })
    test('passes through function', () => {
      const f = (v: any) => v * 2
      expect(myfx.iteratee(f)(21)).toBe(42)
    })
    test('property shorthand', () => {
      const f = myfx.iteratee('a')
      expect(f({ a: 1, b: 2 })).toBe(1)
    })
  })
})
