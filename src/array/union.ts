import toArray from "../collection/toArray"
import map from "../collection/map"
import isFunction from "../is/isFunction"
import isArray from "../is/isArray"
import isArrayLike from "../is/isArrayLike"
import flat from './flat'
/**
 * 对所有集合做并集并返回并集元素组成的新数组。并集类似concat()但不允许重复值
 *
 * @example
 * //[1, 2, 3]
 * console.log(_.union([1,2,3],[2,3]))
 * //[1, 2, 3, "1", "2"]
 * console.log(_.union([1,2,3],['1','2']))
 * //[{name: "a"},{name: "b"}]
 * console.log(_.union([{name:'a'},{name:'b'}],[{name:'a'}],v=>v.name))
 * //[a/b/a] 没有标识函数无法去重
 * console.log(_.union([{name:'a'},{name:'b'}],[{name:'a'}]))
 * //[1, 2, 3, "3"] "3"和3不相等
 * console.log(_.union([1,2,3],[1,3],[2,'3',1]))
 *
 * @param [arrays] 1-n个数组或arraylike对象，非arraylike参数会被忽略
 * @param [identifier] (v);标识函数，用来对每个元素返回唯一标识，标识相同的值会认为相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
 * 算法进行值比较。如果为空，直接使用值自身比较
 * @returns 并集元素组成的新数组
 */
function union<T>(...params: any): T[] {
  let comparator: any
  let list = params
  const sl = params.length
  if (sl > 2 && isFunction(params[sl-1])) {
    comparator = params[sl-1]
    list = params.slice(0, sl - 1)
  }

  list = list.filter((v: any) => isArrayLike(v) || isArray(v))
  if (list.length < 1) return list
  let rs
  if (comparator) {
    const kvMap = new Map()
    flat(list).forEach((v) => {
      const id = comparator(v)
      if (!kvMap.get(id)) {
        kvMap.set(id, v)
      }
    })
    rs = map(kvMap, (v: any) => v)
  } else {
    rs = toArray(new Set(flat(list)))
  }
  return rs
}

export default union