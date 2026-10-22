/**
 * @jest-environment jsdom
 */
import _ from '../src/index'

describe('chain', () => {
  test('字符串包裹值不进入捷径融合（不被逐字符拆开）', () => {
    expect(_.chain('a,b,c').split(',').value()).toEqual(['a', 'b', 'c'])
    expect(_.chain('a,b,c').split(',').join('-').value()).toBe('a-b-c')
  })
  test('数组融合路径保持正确', () => {
    expect(_.chain([1, 2, 3]).map((x: number) => x * 2).filter((x: number) => x > 2).value()).toEqual([4, 6])
  })
  test('take(0) 返回空数组', () => {
    expect(_.chain([1, 2, 3, 4]).slice(1, 4).take(0).value()).toEqual([])
  })
  test('融合段内多个 tap 全部执行', () => {
    const hits: string[] = []
    _.chain([1, 2, 3]).tap(() => hits.push('t1')).map((x: number) => x + 1).tap(() => hits.push('t2')).value()
    expect(hits).toEqual(['t1', 't2'])
  })
  test('String(chain) 返回原始值不抛错', () => {
    expect(String(_.chain([1, 2]))).toBe('1,2')
    expect(`${_.chain([1, 2])}`).toBe('1,2')
  })
})
