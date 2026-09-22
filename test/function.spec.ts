import myfx from '../src/index'

/**
 * Function module dedicated tests (return functions / side effects)
 */
describe('function', () => {
  describe('after', () => {
    test('returns undefined until count reaches 0', () => {
      const saveTip = myfx.after(() => 'data saved', 2)
      expect(saveTip()).toBeUndefined()
      expect(saveTip()).toBeUndefined()
      expect(saveTip()).toBe('data saved')
    })
    test('default count=0 executes immediately', () => {
      const f = myfx.after(() => 'ok')
      expect(f()).toBe('ok')
    })
    test('keeps returning value after count exhausted', () => {
      const f = myfx.after(() => 'v', 1)
      expect(f()).toBeUndefined()
      expect(f()).toBe('v')
      expect(f()).toBe('v')
    })
  })

  describe('alt', () => {
    test('uses interceptor1 result when not undefined', () => {
      expect(myfx.alt(9, (v: any) => false, (v: any) => 20)).toBe(false)
    })
    test('falls back to interceptor2 when interceptor1 returns undefined', () => {
      expect(myfx.alt(9, (v: any) => undefined, (v: any) => 20)).toBe(20)
    })
    test('passes v to interceptors', () => {
      expect(myfx.alt(5, (v: any) => v + 1, (v: any) => 0)).toBe(6)
    })
  })

  describe('bind', () => {
    const obj = {
      text: 'Func.js',
      click: function (this: any, a: any, b: any, c: any) { return this.text + a + b + c },
    }
    test('binds thisArg', () => {
      const click = myfx.bind(obj.click, obj)
      expect(click('1', '2', '3')).toBe('Func.js123')
    })
    test('partial application with placeholder', () => {
      const click = myfx.bind(obj.click, obj, 'a', undefined, 'c')
      expect(click('hi')).toBe('Func.jsahic')
    })
    test('null fn becomes noop', () => {
      const f = myfx.bind(null as any, obj)
      expect(f()).toBeUndefined()
    })
  })

  describe('bindAll', () => {
    test('binds listed methods to object', () => {
      const obj: any = {
        text: 'myfx',
        click: function (this: any) { return this.text },
        click2: function (this: any) { return this.text + '2' },
      }
      myfx.bindAll(obj, 'click', ['click2'])
      expect(obj.click()).toBe('myfx')
      expect(obj.click2()).toBe('myfx2')
    })
    test('returns the same object', () => {
      const obj: any = { a() { return 1 } }
      expect(myfx.bindAll(obj, 'a')).toBe(obj)
    })
    test('works with nested path', () => {
      const obj: any = { nested: { fn(this: any) { return this.id } }, id: 7 }
      myfx.bindAll(obj, 'nested.fn')
      expect(obj.nested.fn()).toBe(7)
    })
  })

  describe('call', () => {
    test('invokes fn with args', () => {
      expect(myfx.call((a: number, b: number) => a + b, 1, 2)).toBe(3)
    })
    test('returns undefined for non-function', () => {
      expect(myfx.call(null, 1)).toBeUndefined()
    })
    test('returns undefined for non-function string', () => {
      expect(myfx.call('not-a-fn' as any)).toBeUndefined()
    })
  })

  describe('compose', () => {
    test('applies first fn first (left to right)', () => {
      const formatName = myfx.compose(myfx.lowerCase, myfx.capitalize)
      expect(formatName('HOLYHIGH')).toBe('Holyhigh')
    })
    test('single function passthrough', () => {
      const f = myfx.compose((v: any) => v * 2)
      expect(f(21)).toBe(42)
    })
    test('skips non-functions', () => {
      const f = myfx.compose((v: any) => v + 1, null as any, (v: any) => v * 2)
      expect(f(1)).toBe(4)
    })
  })

  describe('once', () => {
    test('executes only once', () => {
      let count = 0
      const f = myfx.once(() => ++count)
      expect(f()).toBe(1)
      expect(f()).toBeUndefined()
      expect(f()).toBeUndefined()
    })
    test('passes args on first call', () => {
      const f = myfx.once((a: number, b: number) => a + b)
      expect(f(2, 3)).toBe(5)
      expect(f(10, 10)).toBeUndefined()
    })
    test('second call returns undefined even with different args', () => {
      const f = myfx.once((v: any) => v)
      expect(f('a')).toBe('a')
      expect(f('b')).toBeUndefined()
    })
  })

  describe('partial', () => {
    test('fills placeholder from left', () => {
      const hax2num = myfx.partial(parseInt, undefined, 16)
      expect(hax2num('abc')).toBe(2748)
    })
    test('fills multiple placeholders', () => {
      const log = myfx.partial((...args: any[]) => args.join(' '), '[x]', undefined, ']', undefined)
      expect(log('info', 'hi')).toBe('[x] info ] hi')
    })
    test('no placeholder appends remaining args', () => {
      const f = myfx.partial((a: any, b: any) => a + b, 1) as (b: any) => any
      expect(f(2)).toBe(3)
    })
  })

  describe('tap', () => {
    test('returns v unchanged', () => {
      expect(myfx.tap(5, () => {})).toBe(5)
    })
    test('invokes interceptor with v', () => {
      const seen: any[] = []
      myfx.tap('x', (v: any) => seen.push(v))
      expect(seen).toEqual(['x'])
    })
    test('passes object by reference', () => {
      const obj = { a: 1 }
      let captured: any = null
      const ret = myfx.tap(obj, (v: any) => { captured = v })
      expect(ret).toBe(obj)
      expect(captured).toBe(obj)
    })
  })

  describe('debounce', () => {
    beforeEach(() => { jest.useFakeTimers() })
    afterEach(() => { jest.useRealTimers() })

    test('debounces calls', () => {
      const fn = jest.fn()
      const d = myfx.debounce(fn, 100)
      d(1); d(2); d(3)
      expect(fn).not.toHaveBeenCalled()
      jest.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(3)
    })
    test('immediate executes first call synchronously', () => {
      const fn = jest.fn()
      const d = myfx.debounce(fn, 100, true)
      d('a')
      expect(fn).toHaveBeenCalledTimes(1)
      d('b')
      jest.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test('cancel discards queued call', () => {
      const fn = jest.fn()
      const d = myfx.debounce(fn, 100) as any
      d(1)
      d.cancel()
      jest.advanceTimersByTime(200)
      expect(fn).not.toHaveBeenCalled()
    })
  })

  describe('throttle', () => {
    beforeEach(() => { jest.useFakeTimers() })
    afterEach(() => { jest.useRealTimers() })

    test('leading edge executes immediately', () => {
      const fn = jest.fn()
      const t = myfx.throttle(fn, 100)
      t()
      expect(fn).toHaveBeenCalledTimes(1)
      t()
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test('trailing executes after wait', () => {
      const fn = jest.fn()
      const t = myfx.throttle(fn, 100)
      t()
      jest.advanceTimersByTime(150)
      expect(fn).toHaveBeenCalled()
    })
    test('leading:false skips first call', () => {
      const fn = jest.fn()
      const t = myfx.throttle(fn, 100, { leading: false })
      t()
      expect(fn).not.toHaveBeenCalled()
      jest.advanceTimersByTime(150)
      expect(fn).toHaveBeenCalled()
    })
  })

  describe('delay', () => {
    beforeEach(() => { jest.useFakeTimers() })
    afterEach(() => { jest.useRealTimers() })

    test('calls fn after wait', () => {
      const fn = jest.fn()
      myfx.delay(fn, 100, 'a', 'b')
      expect(fn).not.toHaveBeenCalled()
      jest.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledWith('a', 'b')
    })
    test('wait defaults to 0', () => {
      const fn = jest.fn()
      myfx.delay(fn)
      jest.advanceTimersByTime(0)
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test('returns timer id', () => {
      const id = myfx.delay(() => {}, 50)
      expect(id).toBeDefined()
      clearTimeout(id)
    })
  })
})
