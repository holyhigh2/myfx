/**
 * 第二轮审查（2026-10-22）修复的回归用例。
 *
 * 每条都对应一条能**复现**的缺陷：断言写成"期望值"，在旧实现下会红。
 * 覆盖 M-1 / M-2 / M-3 / M-5 / M-6 / M-7 / M-11。
 */
import set from '../src/object/set'
import get from '../src/object/get'
import merge from '../src/object/merge'
import mergeWith from '../src/object/mergeWith'
import defaultsDeep from '../src/object/defaultsDeep'
import unset from '../src/object/unset'
import formatNumber from '../src/number/formatNumber'
import toFixed from '../src/string/toFixed'
import toDate from '../src/datetime/toDate'
import truncate from '../src/string/truncate'

describe('M-1 set 中间段不可下钻时应替换容器', () => {
  test('非空原始值不再抛 TypeError', () => {
    expect(set({ a: 1 }, 'a.b', 2)).toEqual({ a: { b: 2 } })
    expect(set({ a: 'str' }, 'a.b', 2)).toEqual({ a: { b: 2 } })
    expect(set({ a: true }, 'a.b', 2)).toEqual({ a: { b: 2 } })
  })

  test('falsy 中间段行为保持一致（回归对照）', () => {
    expect(set({ a: 0 }, 'a.b', 2)).toEqual({ a: { b: 2 } })
    expect(set({ a: '' }, 'a.b', 2)).toEqual({ a: { b: 2 } })
    expect(set({ a: null }, 'a.b', 2)).toEqual({ a: { b: 2 } })
  })

  test('数组中间段仍可取下标写入', () => {
    const o: any = set({ a: [1, 2] }, 'a.0.x', 9)
    expect(Array.isArray(o.a)).toBe(true)
    expect(o.a[0]).toEqual({ x: 9 })
    expect(o.a[1]).toBe(2)
  })

  test('函数中间段保留下钻（函数可挂属性）', () => {
    const fn: any = () => 1
    const o: any = set({ a: fn }, 'a.x', 1)
    expect(o.a).toBe(fn)
    expect(fn.x).toBe(1)
  })

  test('中间段是数组、下一段是数字键时继续用数组', () => {
    expect(set({}, 'a.0.b', 1)).toEqual({ a: [{ b: 1 }] })
  })

  test('原型污染守卫仍然有效', () => {
    set({}, 'a.__proto__.polluted', 1)
    expect(({} as any).polluted).toBeUndefined()
  })
})

describe('M-2 merge 容器类型不同应整体替换', () => {
  test('对象键不再写进数组', () => {
    const t: any = { list: [1, 2] }
    merge(t, { list: { x: 9 } } as any)
    expect(Array.isArray(t.list)).toBe(false)
    expect(t.list).toEqual({ x: 9 })
  })

  test('数组不再污染对象成伪数组', () => {
    const t: any = { obj: { a: 1 } }
    merge(t, { obj: [7] } as any)
    expect(Array.isArray(t.obj)).toBe(true)
    expect(t.obj).toEqual([7])
    expect(Object.keys(t.obj)).toEqual(['0'])
  })

  test('同类型容器仍然递归合并（回归对照）', () => {
    const t: any = { a: { x: 1 }, b: [1, 2] }
    merge(t, { a: { y: 2 } } as any)
    expect(t.a).toEqual({ x: 1, y: 2 })
    const t2: any = { b: [1, 2] }
    merge(t2, { b: [3] } as any)
    expect(t2.b).toEqual([3, 2])
  })

  test('对象被原始值覆盖（lodash 语义）', () => {
    const t: any = { a: { x: 1 } }
    merge(t, { a: 5 } as any)
    expect(t.a).toBe(5)
  })

  test('mergeWith 同样遵守容器类型判据', () => {
    const t: any = { list: [1, 2] }
    mergeWith(t, { list: { x: 9 } } as any)
    expect(Array.isArray(t.list)).toBe(false)
    expect(t.list).toEqual({ x: 9 })
  })

  test('defaultsDeep 不跨类型递归（目标已有值即赢）', () => {
    const t: any = { a: [1] }
    defaultsDeep(t, { a: { x: 2 } } as any)
    expect(Array.isArray(t.a)).toBe(true)
    expect(t.a).toEqual([1])
    expect((t.a as any).x).toBeUndefined()
  })

  test('循环引用不栈溢出（回归对照）', () => {
    const a: any = { name: 'a' }
    a.self = a
    const t: any = {}
    expect(() => merge(t, a)).not.toThrow()
    expect((t.self as any).name).toBe('a')
  })
})

describe('M-3 formatNumber 与 toFixed 同一舍入口径', () => {
  const cases = [2.475, 8.835, 0.615, 10.235, 1.005, 0.045, 0.475, 0.995, 2.465, 14.049]
  test('两位小数逐值对齐', () => {
    for (const v of cases) {
      expect(formatNumber(v, '0.00')).toBe(toFixed(v, 2))
    }
  })

  test('文档示例不受影响', () => {
    expect(formatNumber(1234, '#,##0.00')).toBe('1,234.00')
    expect(formatNumber(0.5, '0.0%')).toBe('50.0%')
  })

  test('整数进位仍然正确', () => {
    expect(formatNumber(0.999, '0.00')).toBe('1.00')
    expect(formatNumber(-2.475, '0.00')).toBe('-2.48')
  })
})

describe('M-5 unset 提前返回 boolean', () => {
  test('非对象返回 false 而不是原值', () => {
    expect(unset('str' as any, 'x')).toBe(false)
    expect(unset(5 as any, 'x')).toBe(false)
    expect(unset(null as any, 'x')).toBe(false)
  })

  test('正常删除仍返回 true', () => {
    const o: any = { a: { b: 1 } }
    expect(unset(o, 'a.b')).toBe(true)
    expect(o.a.b).toBeUndefined()
  })
})

describe('M-6 / M-7 toDate 边界', () => {
  test('超出范围的整数不再是 1970', () => {
    expect(Number.isNaN(toDate(99999999999999).getTime())).toBe(true)
    expect(Number.isNaN(toDate(-99999999999999).getTime())).toBe(true)
  })

  test('字符串毫秒时间戳可解析', () => {
    expect(toDate('1607644800000').toISOString()).toBe(new Date(1607644800000).toISOString())
  })

  test('字符串秒级时间戳可解析', () => {
    expect(toDate('1320940800').toISOString()).toBe(new Date(1320940800000).toISOString())
  })

  test('短数字串仍按日期串解析（不被当时间戳）', () => {
    const d = toDate('2020')
    expect(d.getFullYear()).toBe(2020)
  })

  test('常规入参不受影响（回归对照）', () => {
    expect(toDate(1320940800).getTime()).toBe(1320940800000)
    expect(toDate(1320940800123).getTime()).toBe(1320940800123)
    expect(toDate([2022, 11, 12]).getFullYear()).toBe(2022)
    expect(toDate('2022-02-02').getFullYear()).toBe(2022)
  })
})

describe('M-11 truncate omission 判空', () => {
  test("omission: '' 不再回落成 '...'", () => {
    expect(truncate('hello world', 5, { omission: '' })).toBe('hello')
  })

  test('缺省 omission 仍是 ...', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })

  test('len 语义是保留字符数（文档示例，回归对照）', () => {
    expect(truncate('func.js', 4)).toBe('func...')
    expect(truncate('func.js', 3, { omission: '!!!' })).toBe('fun!!!')
    expect(truncate('func.js.com.cn', 13, { separator: '.' })).toBe('func.js.com...')
  })
})

describe('M-1 与 get 的组合语义', () => {
  test('set 后 get 能读回', () => {
    const o: any = set({ a: 1 }, 'a.b', 2)
    expect(get(o, 'a.b')).toBe(2)
  })
})
