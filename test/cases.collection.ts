/**
 * 测试用例
 */
const Datas: Record<string, any[]> = {
  size: [
    [null, 0],
    [new Set([1, 2, 3]), 3],
    ['func.js', 7],
  ],
  every: [
    [[], true],
    [[1, 3, 5], (v: number) => v % 2 === 1, true],
    [['a', 'b', 'c', 1], Number.isInteger, false],
  ],
  some: [
    [[], false],
    [[1, 2, 3, 4], (v: number) => v % 2 === 1, true],
    [['a', 'b', 'c', 1], Number.isInteger, true],
  ],
  filter: [
    [[1, 2, 3, 4], (v: number) => v % 2 === 1, [1, 3]],
    [['a', 'b', 'c', 1], Number.isInteger, [1]],
    [{ a: 1, b: 2, c: '3' }, Number.isInteger, [1, 2]],
  ],
  reject: [
    [[1, 2, 3, 4], (v: number) => v % 2 === 1, [2, 4]],
    [['a', 'b', 'c', 1], Number.isInteger, ['a', 'b', 'c']],
    [{ a: 1, b: 2, c: '3' }, Number.isInteger, ['3']],
  ],
  partition: [
    [
      [1, 2, 3, 4, 5, 6],
      (n: number) => n % 2 === 0,
      [
        [2, 4, 6],
        [1, 3, 5],
      ],
    ],
    [{ a: 1, b: '2', c: 3 }, Number.isInteger, [[1, 3], ['2']]],
    [[], (v: any) => true, [[], []]],
  ],
  find: [
    [['a', 'b', 'c', 1, 3, 6], Number.isInteger, 1],
    [
      { a: 1, b: true, c: 'holyhigh', d: 'func.js' },
      (v: any) => typeof v == 'string',
      'holyhigh',
    ],
    [[1, 2], (v: any) => v === 99, undefined],
  ],
  findLast: [
    [['a', 'b', 'c', 1, 3, 6], Number.isInteger, 6],
    [
      { a: 1, b: true, c: 'holyhigh', d: 'func.js' },
      (v: any) => typeof v == 'string',
      'func.js',
    ],
    [[1, 2], (v: any) => v === 99, undefined],
  ],
  map: [
    [new Set([1, 2, 3]), (v: any) => v * 2, [2, 4, 6]],
    [{ '1': 'a', '2': 'b', '3': 'c' }, (v: any, k: any) => k, ['1', '2', '3']],
    [
      'holyhigh',
      (v: any) => String.fromCharCode(v.charCodeAt(0) - 32),
      ['H', 'O', 'L', 'Y', 'H', 'I', 'G', 'H'],
    ],
  ],
  flatMap: [
    [
      [[1, 2], [[3]]],
      [1, 2, [3]],
    ],
    [[[1, 2], 3, 4, 5], (n: any) => (n % 2 ? n : []), [3, 5]],
  ],
  flatMapDeep: [
    [
      [[1, 2], [[3]]],
      [1, 2, 3],
    ],
    [[[1]], (v: any) => v, [1]],
    [[], []],
  ],
  includes: [
    [{ a: 1, b: 2 }, 2, true],
    [[1, 3, 5, 7, [2]], 2, false],
    [[1, 3, 5, 7, [2]], 3, true],
    [[1, 3, 5, 7, [2]], 3, 2, false],
  ],
  reduce: [
    [[1, 3, 5, 7, 9], (a: any, v: any) => a + v, 25],
    [[1, 3, 5, 7, 9], (a: any, v: any) => a + v, 10, 35],
  ],
  toArray: [
    [new Set([1, 2, 3]), [1, 2, 3]],
    [{ x: 1, y: 2, z: 'b' }, [1, 2, 'b']],
    ['abc', ['a', 'b', 'c']],
  ],
  sort: [
    [
      ['lao1', 'lao3', 'lao2'],
      ['lao1', 'lao2', 'lao3'],
    ],
    [
      [9, 80, 7],
      [7, 9, 80],
    ],
  ],
  sortBy: [
    [[{ a: 2 }, { a: 1 }, { a: 3 }], 'a', [{ a: 1 }, { a: 2 }, { a: 3 }]],
    [[3, 1, 2], undefined, [1, 2, 3]],
    [['b', 'a'], undefined, ['a', 'b']],
  ],
  countBy: [
    [
      [1, 'a', 3, 'b', 5, 'c', 7, 'd', 9],
      Number.isInteger,
      { true: 5, false: 4 },
    ],
    [[1, 2, 3], (v: number) => (v > 2 ? 'hi' : 'lo'), { lo: 2, hi: 1 }],
    [[], Number.isInteger, {}],
  ],
  groupBy: [
    [
      [1, 'a', 3, 'b', 5, 'c', 7, 'd', 9],
      Number.isInteger,
      { true: [1, 3, 5, 7, 9], false: ['a', 'b', 'c', 'd'] },
    ],
    [[1, 2], (v: number) => (v % 2 === 0 ? 'e' : 'o'), { o: [1], e: [2] }],
    [[], Number.isInteger, {}],
  ],
  keyBy: [
    [
      [1, 'a', 3, 'b', 5, 'c', 7, 'd', 9],
      Number.isInteger,
      { true: 9, false: 'd' },
    ],
    [[{ id: 'x' }, { id: 'y' }], (v: any) => v.id, { x: { id: 'x' }, y: { id: 'y' } }],
    [[], Number.isInteger, {}],
  ],
}

export default Datas
