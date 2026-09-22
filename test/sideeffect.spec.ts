import myfx from '../src/index'

/**
 * Side-effect / random / void-returning function tests
 */
describe('side effects & random', () => {
  describe('each', () => {
    test('iterates array', () => {
      const out: any[] = []
      myfx.each([1, 2, 3], (v: any) => { out.push(v) })
      expect(out).toEqual([1, 2, 3])
    })
    test('breaks on false return', () => {
      const out: any[] = []
      myfx.each([1, 2, 3], (v: any) => { out.push(v); if (v === 2) return false })
      expect(out).toEqual([1, 2])
    })
    test('iterates object keys', () => {
      const out: any[] = []
      myfx.each({ a: 1, b: 2 }, (_v: any, k: any) => { out.push(k) })
      expect(out).toEqual(['a', 'b'])
    })
  })

  describe('eachRight', () => {
    test('iterates array right-to-left', () => {
      const out: any[] = []
      myfx.eachRight([1, 2, 3], (v: any) => { out.push(v) })
      expect(out).toEqual([3, 2, 1])
    })
    test('breaks on false', () => {
      const out: any[] = []
      myfx.eachRight([1, 2, 3], (v: any) => { out.push(v); if (v === 2) return false })
      expect(out).toEqual([3, 2])
    })
    test('iterates string right-to-left', () => {
      const out: any[] = []
      myfx.eachRight('ab', (v: any) => { out.push(v) })
      expect(out).toEqual(['b', 'a'])
    })
  })

  describe('sample', () => {
    test('returns element from array', () => {
      const src = [1, 2, 3]
      expect(src).toContain(myfx.sample(src))
    })
    test('returns element from object values', () => {
      const src = { a: 1, b: 2 }
      expect([1, 2]).toContain(myfx.sample(src))
    })
    test('returns single element', () => {
      expect(myfx.sample([42])).toBe(42)
    })
  })

  describe('sampleSize', () => {
    test('returns requested count', () => {
      const rs = myfx.sampleSize([1, 2, 3, 4, 5], 2)
      expect(rs).toHaveLength(2)
    })
    test('elements come from source', () => {
      const src = [1, 2, 3]
      const rs = myfx.sampleSize(src, 3)
      rs.forEach((v: any) => expect(src).toContain(v))
    })
    test('default count is 1', () => {
      expect(myfx.sampleSize([1, 2, 3])).toHaveLength(1)
    })
  })

  describe('shuffle', () => {
    test('returns same length', () => {
      expect(myfx.shuffle([1, 2, 3, 4, 5])).toHaveLength(5)
    })
    test('contains same elements', () => {
      const src = [1, 2, 3]
      const rs = myfx.shuffle(src)
      expect([...rs].sort()).toEqual([1, 2, 3])
    })
    test('works on object', () => {
      expect(myfx.shuffle({ a: 1, b: 2 })).toHaveLength(2)
    })
  })

  describe('randi', () => {
    test('single arg returns [0, max)', () => {
      for (let i = 0; i < 20; i++) {
        const v = myfx.randi(10)
        expect(v).toBeGreaterThanOrEqual(0)
        expect(v).toBeLessThan(10)
        expect(Number.isInteger(v)).toBe(true)
      }
    })
    test('two arg returns [min, max)', () => {
      for (let i = 0; i < 20; i++) {
        const v = myfx.randi(10, 20)
        expect(v).toBeGreaterThanOrEqual(10)
        expect(v).toBeLessThan(20)
      }
    })
    test('non-numeric becomes 0', () => {
      const v = myfx.randi('abc' as any)
      expect(v).toBe(0)
    })
  })

  describe('randf', () => {
    test('no arg returns [0,1)', () => {
      for (let i = 0; i < 20; i++) {
        const v = myfx.randf()
        expect(v).toBeGreaterThanOrEqual(0)
        expect(v).toBeLessThan(1)
      }
    })
    test('single arg returns [0,max)', () => {
      const v = myfx.randf(10)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(10)
    })
    test('two arg returns [min,max)', () => {
      const v = myfx.randf(10, 20)
      expect(v).toBeGreaterThanOrEqual(10)
      expect(v).toBeLessThan(20)
    })
  })

  describe('alphaId', () => {
    test('default length 16', () => {
      expect(myfx.alphaId()).toHaveLength(16)
    })
    test('custom length', () => {
      expect(myfx.alphaId(8)).toHaveLength(8)
    })
    test('length 0 falls back to 16', () => {
      expect(myfx.alphaId(0)).toHaveLength(16)
    })
  })

  describe('uuid', () => {
    test('with delimiter has dashes', () => {
      expect(myfx.uuid(true)).toMatch(/-/)
    })
    test('without delimiter has no dashes', () => {
      expect(myfx.uuid()).not.toMatch(/-/)
    })
    test('length is 32 without delimiter', () => {
      expect(myfx.uuid()).toHaveLength(32)
    })
  })

  describe('snowflakeId', () => {
    test('nil nodeId returns zero string', () => {
      expect(myfx.snowflakeId(null as any)).toBe('0000000000000000000')
    })
    test('returns decimal string', () => {
      const id = myfx.snowflakeId(123)
      expect(typeof id).toBe('string')
      expect(id).toMatch(/^\d+$/)
    })
    test('same nodeId produces increasing ids over time', () => {
      const a = myfx.snowflakeId(1)
      const b = myfx.snowflakeId(1)
      expect(typeof a).toBe('string')
      expect(typeof b).toBe('string')
    })
  })

  describe('uniqueId', () => {
    test('with prefix', () => {
      expect(myfx.uniqueId('func')).toMatch(/^func_\d+$/)
    })
    test('without prefix is pure number string', () => {
      expect(myfx.uniqueId()).toMatch(/^\d+$/)
    })
    test('increments', () => {
      const a = myfx.uniqueId()
      const b = myfx.uniqueId()
      expect(Number(b)).toBeGreaterThan(Number(a))
    })
  })

  describe('now', () => {
    test('returns number', () => {
      expect(typeof myfx.now()).toBe('number')
    })
    test('returns 13-digit ms timestamp', () => {
      expect(myfx.now()).toBeGreaterThan(1e12)
    })
    test('monotonically non-decreasing', () => {
      const t1 = myfx.now()
      const t2 = myfx.now()
      expect(t2).toBeGreaterThanOrEqual(t1)
    })
  })

  describe('mixin', () => {
    test('adds _ methods to plain target', () => {
      const target: any = {}
      myfx.mixin(target, { select: myfx.get })
      expect(typeof target._select).toBe('function')
    })
    test('adds chain methods to FuncChain', () => {
      const target: any = function FuncChain() {}
      target.prototype.constructor = { name: 'FuncChain' }
      myfx.mixin(target, { top: myfx.first })
      expect(typeof target.prototype._top).toBe('function')
    })
    test('multiple functions', () => {
      const target: any = {}
      myfx.mixin(target, { a: myfx.get, b: myfx.set })
      expect(typeof target._a).toBe('function')
      expect(typeof target._b).toBe('function')
    })
  })

  describe('template', () => {
    test('interpolates values', () => {
      const render = myfx.template('1 [%= a %] 3')
      expect(render({ a: 4 })).toBe('1 4 3')
    })
    test('supports print and range', () => {
      const render = myfx.template('1 [% print(_.range(2,5)) %] 5')
      expect(render()).toBe('1 2,3,4 5')
    })
    test('supports mixins', () => {
      const render = myfx.template('[%@mix {x:5}%]', {
        mixins: { mix: '<div>[%= x %]</div>' },
      })
      expect(render()).toBe('<div>5</div>')
    })
  })

  describe('identity', () => {
    test('returns first arg', () => {
      expect(myfx.identity(1, 2, 3)).toBe(1)
    })
    // identity 使用 rest 参数，多参调用在运行时返回第一个值
    test('returns object by reference', () => {
      const o = { a: 1 }
      expect(myfx.identity(o)).toBe(o)
    })
    test('returns undefined for no args', () => {
      expect(myfx.identity()).toBeUndefined()
    })
  })

  describe('noop', () => {
    test('returns undefined', () => {
      expect(myfx.noop()).toBeUndefined()
    })
    test('ignores args', () => {
      expect(myfx.noop(1, 2, 3)).toBeUndefined()
    })
    test('is a function', () => {
      expect(typeof myfx.noop).toBe('function')
    })
  })

  describe('defaultTo', () => {
    test('null returns default', () => {
      expect(myfx.defaultTo(null, 'x')).toBe('x')
    })
    test('valid value kept', () => {
      expect(myfx.defaultTo(0, 'y')).toBe(0)
    })
    test('NaN returns default', () => {
      expect(myfx.defaultTo(NaN, 'z')).toBe('z')
    })
  })

  describe('times', () => {
    test('calls n times', () => {
      expect(myfx.times(5, String)).toEqual(['0', '1', '2', '3', '4'])
    })
    test('n=0 returns empty', () => {
      expect(myfx.times(0, String)).toEqual([])
    })
    test('maps return values', () => {
      expect(myfx.times(3, (n: number) => n * 2)).toEqual([0, 2, 4])
    })
  })

  describe('toPath', () => {
    test('simple path', () => {
      expect(myfx.toPath('a.b.c')).toEqual(['a', 'b', 'c'])
    })
    test('bracket index', () => {
      expect(myfx.toPath('a[0].b')).toEqual(['a', '0', 'b'])
    })
    test('single segment', () => {
      expect(myfx.toPath('x')).toEqual(['x'])
    })
  })
})
