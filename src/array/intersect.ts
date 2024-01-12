import each from "../collection/each"
import isArray from "../is/isArray"
import isArrayLike from "../is/isArrayLike"
import isFunction from "../is/isFunction"
/**
 * 对所有集合做交集并返回交集元素组成的新数组
 * <p>
 * 关于算法性能可以查看文章<a href="https://www.jianshu.com/p/aa131d573575" target="_holyhigh">《如何实现高性能集合操作(intersect)》</a>
 * </p>
 *
 * @example
 * //[2]
 * console.log(_.intersect([1,2,3],[2,3],[1,2]))
 * //[3]
 * console.log(_.intersect([1,1,2,2,3],[1,2,3,4,4,4],[3,3,3,3,3,3]))
 * //[{name: "a"}] 最后一个参数是函数时作为标识函数
 * console.log(_.intersect([{name:'a'},{name:'b'}],[{name:'a'}],v=>v.name))
 * //[]
 * console.log(_.intersect())
 * //[3] 第三个参数被忽略，然后求交集
 * console.log(_.intersect([1,2,3],[3],undefined))
 * //[1] "2"和2不相同，3和"3"不相同
 * console.log(_.intersect([1,2,3],[1,'2',3],[2,'3',1]))
 *
 * @param [arrays] 1-n个数组或arraylike对象，非arraylike参数会被忽略
 * @param [identifier] (v);标识函数，用来对每个元素返回唯一标识，标识相同的值会认为相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
 * 算法进行值比较。如果为空，直接使用值自身比较
 * @returns 交集元素组成的新数组
 */
function intersect<T>(...params: any):T[] {
  let comparator
  let list = params
  const sl = params.length
  if (sl > 2) {
    const lp = params[sl - 1]
    if (isFunction(lp)) {
      comparator = lp
      list = params.slice(0, sl - 1)
    }
  }
  list = list.filter((v: any) => isArrayLike(v) || isArray(v))
  if (list.length < 1) return list
  const len = list.length
  // 取得最短集合
  list.sort((a: any, b: any) => a.length - b.length)
  const kvMap = new Map()
  // 记录最少id
  let idLength = 0 // 用于快速匹配
  for (let i = list[0].length; i--; ) {
    const v = list[0][i]
    const id = comparator ? comparator(v) : v
    if (!kvMap.get(id)) {
      // 防止组内重复
      kvMap.set(id, { i: 1, v: v })
      idLength++
    }
  }
  for (let j = 1; j < len; j++) {
    const ary = list[j]
    const localMap = new Map()
    let localMatchedCount = 0
    for (let i = 0; i < ary.length; i++) {
      const v = ary[i]
      const id = comparator ? comparator(v) : v
      if (kvMap.get(id) && !localMap.get(id)) {
        kvMap.get(id).i++
        // 相同id本组内不再匹配
        localMap.set(id, true)
        // 匹配次数加1
        localMatchedCount++
        // 已经匹配完所有可交集元素，无需继续检查
        if (localMatchedCount === idLength) break
      }
    }
  }
  const rs: any[] = []
  each(kvMap, (v: any) => {
    if (v.i === len) {
      rs.push(v.v)
    }
  })

  return rs
}

export default intersect