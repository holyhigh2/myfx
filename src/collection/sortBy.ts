import _eq from "../_eq";
import { default as _identity, default as identity } from "../_identity";
import _iteratee from "../_iteratee";
import compareDate from "../datetime/compareDate";
import isDate from "../is/isDate";
import isNil from "../is/isNil";
import isNumber from "../is/isNumber";
import toString from "../string/toString";
import type { Collection, NonFuncItee } from "../types";
import map from "./map";
import size from "./size";


function sortBy<V>(
  collection: Set<V> | ArrayLike<V>,
  itee?: ((value: V, index: number) => any) | NonFuncItee
): V[]
function sortBy<V>(
  collection: Record<string, V> | Map<string, V>,
  itee?: ((value: V, index: string) => any) | NonFuncItee
): V[]
function sortBy<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  itee?: ((value: V, index: K) => any) | NonFuncItee
): V[]
/**
 * 使用指定回调对集合结果进行升序排序。根据集合结果的第一个元素确定排序逻辑，内置排序逻辑包括
 * <ul>
 * <li>字符串</li>
 * <li>数字</li>
 * <li>日期</li>
 * </ul>
 *
 * @example
 * //不变
 * console.log(_.sortBy([{a:2},{a:1},{a:3}]))
 * //[{{a:1},{a:2},{a:3}] 通过iteratee把集合变为数字后排序
 * console.log(_.sortBy([{a:2},{a:1},{a:3}],'a'))
 * //['3/1/2019', '2020/1/1', '2020-3-1']
 * console.log(_.sortBy(['2020-3-1','2020/1/1','3/1/2019'],_.toDate))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param iteratee (value,key|index) 筛选函数，返回排序值
 * <br>当iteratee是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @returns 排序后的数组
 * @since 1.0.0
 */
function sortBy<V, K extends string | number | symbol>(
  collection: Collection<V, K>,
  iteratee: ((value: V, index: K) => any) | NonFuncItee = identity
): V[] {
  if (size(collection) < 1) return []
  const cb = _iteratee(iteratee || _identity)
  let i = 0
  const list = map<V, any, { src: any; index: number; value: any }>(
    collection,
    (v, k) => {
      return {
        src: v,
        index: i++,
        value: cb(v, k),
      }
    }
  )
  const comparator = getComparator(list[0].value)
  list.sort((a, b) =>
    !_eq(a.value, b.value) ? comparator(a.value, b.value) : a.index - b.index
  )
  const rs: V[] = new Array(list.length)
  for (let j = 0; j < list.length; j++) {
    rs[j] = list[j].src
  }
  return rs
}

// comparators
const compareNumAsc = (a: number, b: number) => {
  if (isNil(a) || !isNumber(a)) return 1
  if (isNil(b) || !isNumber(b)) return -1

  return a - b
}
const compareStrAsc = (a: string, b: string) => {
  if (isNil(a)) return 1
  if (isNil(b)) return -1

  return toString(a).localeCompare(toString(b))
}
const compareDateAsc = (
  a: string | number | Date,
  b: string | number | Date
) => {
  if (isNil(a)) return 1
  if (isNil(b)) return -1

  return compareDate(a, b)
}
// eslint-disable-next-line require-jsdoc
function getComparator(el: any): Function {
  let comparator
  if (isNumber(el)) {
    comparator = compareNumAsc
  } else if (isDate(el)) {
    comparator = compareDateAsc
  } else {
    comparator = compareStrAsc
  }
  return comparator
}

export default sortBy