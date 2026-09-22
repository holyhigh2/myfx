/**
 * 测试用例 - complex function tests (after/alt/bind/debounce etc.) live in function.spec.ts
 * Only fval is data-driven here (returns a value).
 */
const Datas: Record<string, any[]> = {
  fval: [
    [['1+1'], 2],
    ['3+2', 5],
    ['1+x-b', { x: 2, b: 3 }, 0],
  ],
}

export default Datas
