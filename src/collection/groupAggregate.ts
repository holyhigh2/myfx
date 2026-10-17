import { default as _identity } from "../_identity";
import _iteratee from "../_iteratee";
import type { Collection, NonFuncItee, UnknownMapKey } from "../types";
import each from "./each";
import sum from "../math/sum";
import mean from "../math/mean";
import median from "../math/median";
import max from "../math/max";
import min from "../math/min";

/** 分组聚合方式：`count` 计条数，其余对分组内的取值做数值统计 */
export type AggregateOp = "sum" | "mean" | "count" | "max" | "min" | "median";

/** 分组聚合的结果项 */
export interface AggregateEntry<K> {
  /** 分组键（`groupIteratee` 的返回值） */
  key: K;
  /** 该分组的聚合结果 */
  value: number;
}

function groupAggregate<V, K extends UnknownMapKey>(
  collection: Collection<V>,
  groupIteratee: ((value: V) => K) | NonFuncItee,
  valueIteratee?: ((value: V) => unknown) | NonFuncItee,
  op?: "sum" | "mean" | "count" | "max" | "min" | "median"
): Array<AggregateEntry<K>>
/**
 * 先按 `groupIteratee` 分组，再对每组用 `op` 聚合，返回**保序**的 `{key, value}` 列表。
 *
 * - 分组键按**首次出现**顺序返回（与 {@link groupBy} 的记录顺序一致）；
 * - `valueIteratee` 缺省时对组内元素本身做统计；提供时先取值再统计；
 * - `op` 缺省为 `sum`；`count` 计分组条数，其余忽略非数值项（`null` / 非数字串等）；
 * - 组内无可统计数值时 `sum`/`mean`/`max`/`min`/`median` 结果为 `NaN`（与 {@link sum} 等同口径）。
 *
 * @example
 * const rows = [
 *  {city:'bj',amount:1},
 *  {city:'sh',amount:2},
 *  {city:'bj',amount:3},
 * ]
 * //[{key:'bj',value:4},{key:'sh',value:2}]
 * console.log(_.groupAggregate(rows, r=>r.city, r=>r.amount, 'sum'))
 * //[{key:'bj',value:2},{key:'sh',value:1}] 计数
 * console.log(_.groupAggregate(rows, 'city', undefined, 'count'))
 *
 * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
 * @param groupIteratee (value)回调，返回分组键；也可是属性路径 / 匹配对象
 * @param valueIteratee (value)回调，返回参与统计的取值；缺省用元素本身
 * @param op 聚合方式，默认 `sum`
 * @returns 保序的分组聚合结果
 * @since 2.0.0
 */
function groupAggregate<V, K extends UnknownMapKey>(
  collection: Collection<V>,
  groupIteratee: ((value: V) => K) | NonFuncItee,
  valueIteratee?: ((value: V) => unknown) | NonFuncItee,
  op: "sum" | "mean" | "count" | "max" | "min" | "median" = "sum"
): Array<AggregateEntry<K>> {
  const gcb = _iteratee(groupIteratee == null ? _identity : groupIteratee);
  const vcb = valueIteratee ? _iteratee(valueIteratee) : undefined;

  const groups = new Map<K, any[]>();
  each(collection, (el) => {
    const key = gcb(el) as K;
    let arr = groups.get(key);
    if (!arr) {
      arr = [];
      groups.set(key, arr);
    }
    arr.push(vcb ? vcb(el) : el);
  });

  const out: Array<AggregateEntry<K>> = [];
  groups.forEach((arr, key) => {
    let value: number;
    switch (op) {
      case "count":
        value = arr.length;
        break;
      case "mean":
        value = mean(arr);
        break;
      case "median":
        value = median(arr);
        break;
      case "max":
        value = max(arr);
        break;
      case "min":
        value = min(arr);
        break;
      case "sum":
      default:
        value = sum(arr);
        break;
    }
    out.push({ key, value });
  });
  return out;
}

export default groupAggregate;
