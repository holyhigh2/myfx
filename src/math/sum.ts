import isNil from '../is/isNil'
import isArrayLike from '../is/isArrayLike'

/**
 * 对字符/数字数组/Set进行求和并返回结果
 * - 对nil值，自动转为0
 * - 对NaN值，返回NaN
 * - 对Infinity值，返回Infinity
 * 
 * @example
 * //10
 * console.log(_.sum([1,'2',3,4]))
 * //10
 * console.log(_.sum([1,'2',3,4,null,undefined]))
 * //NaN
 * console.log(_.sum([NaN,'2',3,4]))
 * //Infinity
 * console.log(_.sum([Infinity,'2',3,4]))
 * //6
 * console.log(_.sum(new Set([1,2,3])))
 *
 * @param values 数字/字符数组/Set
 * @since 1.0.0
 * @returns
 */
function sum(
  values: Set<string | number> | Array<string | number>
): number
function sum(...values:any[]):number
function sum(...values:any[]):number {
  let ary:any = values
  if(ary.length === 1 && isArrayLike(ary[0])){
    ary = ary[0]
  }

  const vals = ary.map((v:any)=>isNil(v)?0:v)
  let rs = 0
  const f64a = new Float64Array(vals)
  f64a.forEach((v: number) => {
    rs += v
  })
  return rs
}

export default sum