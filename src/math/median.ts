import map from '../collection/map'
/**
 * 对多个数字或数字列表计算中间值并返回结果
 * @example
 * //2.5
 * console.log(_.median([1,2,'3',4]))
 * //2
 * console.log(_.median([1,'2',3]))
 * //1
 * console.log(_.median([1,'2',-3]))
 *
 * @param values 数字/字符数组/Set
 * @returns mean value
 * @since 1.12.0
 */
function median(values: Set<string | number> | Array<string | number>): number {
  const vals = map<any>(values, v => v ?? 0)
  let f64a = new Float64Array(vals)
  f64a.sort()
  let rs
  if (f64a.length % 2 === 0) {
    let i = f64a.length / 2 - 1
    rs = (f64a[i] + f64a[i + 1]) / 2
  } else {
    rs = f64a[Math.ceil(f64a.length / 2) - 1]
  }

  return rs
}

export default median