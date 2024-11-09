import range from '../array/range'
/**
 * 调用iteratee函数n次，并将历次调用的返回值数组作为结果返回
 * @example
 * //['0',...,'4']
 * console.log(_.times(5,String))
 * //[[0],[1]]
 * console.log(_.times(2,_.toArray))
 *
 * @param n 迭代次数
 * @param iteratee 每次迭代调用函数
 * @returns 返回值数组
 * @since 0.17.0
 */
function times(n: number, iteratee: (n: number) => any): any[] {
  return range(n).map(iteratee)
}

export default times