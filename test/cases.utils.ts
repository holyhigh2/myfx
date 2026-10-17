/**
 * 测试用例 - utils returning functions tested in utils.spec.ts / sideeffect.spec.ts
 * Simple value-returning utils live here for data-driven runner.
 */
const Datas: Record<string, any[]> = {
  defaultTo: [
    [null, 'x', 'x'],
    [0, 'y', 0],
    [NaN, 'z', 'z'],
  ],
  identity: [
    [1, 1],
    ['a', 'a'],
    [null, null],
  ],
  noop: [
    [null, undefined],
    [1, undefined],
    [{}, undefined],
  ],
  times: [
    [5, String, ['0', '1', '2', '3', '4']],
    [2, (n: number) => n * 2, [0, 2]],
    [0, String, []],
  ],
  toPath: [
    ['a.b[0].c', ['a', 'b', '0', 'c']],
    ['a', ['a']],
    [[1, 2], ['1', '2']],
  ],
  toPlain: [
    [{ a: 1, b: [1, 2], c: undefined }, { a: 1, b: [1, 2] }],
    [new Date('2020-01-01'), '2020-01-01T00:00:00.000Z'],
    [undefined, null],
    [5, 5],
  ],
}

export default Datas
