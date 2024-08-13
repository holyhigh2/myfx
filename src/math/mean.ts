import isNil from '../is/isNil'
import map from '../collection/map'
/**
 * 对多个数字或数字列表计算平均值并返回结果
 * @example
 * //2.5
 * console.log(_.mean([1,2,'3',4]))
 * //NaN
 * console.log(_.mean([1,'2',3,'a',4]))
 * //2
 * console.log(_.mean([1,'2',3,null,4]))
 *
 * @param values 数字/字符数组/Set
 * @returns mean value
 * @since 1.0.0
 */
function mean(values: Set<string | number> | Array<string | number> ):number{
  const vals = map<any>(values, v => v ?? 0)
  let f64a = new Float64Array(vals)
  let rs = 0
  f64a.forEach(v=>{
    rs += v
  })

  return rs / f64a.length
}

export default mean