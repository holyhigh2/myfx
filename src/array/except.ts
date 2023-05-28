import each from "../collection/each"
import isArray from "../is/isArray"
import isArrayLike from "../is/isArrayLike"
import isFunction from "../is/isFunction"
/**
 * 对所有集合做差集并返回差集元素组成的新数组
 *
 * @example
 * //[1]
 * console.log(_.except([1,2,3],[2,3]))
 * //[1,4]
 * console.log(_.except([1,2,3],[2,3],[3,2,1,4]))
 * //[{name: "b"}]
 * console.log(_.except([{name:'a'},{name:'b'}],[{name:'a'}],v=>v.name))
 * //[2, 3, "2", "3"] '2'和2不相等
 * console.log(_.except([1,2,3],[1,'2',3],[2,'3',1]))
 *
 * @param [arrays] 1-n个数组或arraylike对象，非arraylike参数会被忽略
 * @param [identifier] (v);标识函数，用来对每个元素返回唯一标识，标识相同的值会认为相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
 * 算法进行值比较。如果为空，直接使用值自身比较
 * @returns 差集元素组成的新数组
 */
function except(...params: any): any[] {
  let comparator
  let list = params
  const sl = params.length
  if (sl > 2) {    
    const lp = params[sl - 1]
    if (isFunction(lp)) {
      comparator = lp
      list = params.slice(0, params.length - 1)
    }
  }
  list = list.filter((v: any) => isArrayLike(v) || isArray(v))
  if (list.length < 1) return list
  const len = list.length
  const kvMap = new Map()
  // 遍历所有元素
  for (let j = 0; j < len; j++) {
    const ary = list[j]
    const localMap = new Map()
    for (let i = 0; i < ary.length; i++) {
      const v = ary[i]
      const id = comparator ? comparator(v) : v
      if (!kvMap.get(id)) {
        // 防止组内重复
        kvMap.set(id, { i: 0, v: v })
      }
      if (kvMap.get(id) && !localMap.get(id)) {
        kvMap.get(id).i++
        // 相同id本组内不再匹配
        localMap.set(id, true)
      }
    }
  }
  const rs: any[] = []
  each(kvMap, (v: any) => {
    if (v.i < len) {
      rs.push(v.v)
    }
  })
  return rs
}

export default except