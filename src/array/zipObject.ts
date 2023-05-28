import each from "../collection/each";
import { UnknownMapKey } from "../types";
import get from "../object/get";
/**
 * 创建一个对象，属性名称与属性值分别来自两个数组
 * @example
 * //{a: 1, b: 2}
 * console.log(_.zipObject(['a','b'],[1,2,3]))
 *
 * @param keys 对象属性标识符数组
 * @param values 对象值数组
 * @returns 组合后的对象
 * @since 0.23.0
 */
function zipObject(
  keys: Array<string | number | symbol>,
  values: any[]
): Record<UnknownMapKey, any> {
  const rs: { [key: string | number | symbol]: any } = {}
  each<string | number | symbol, number>(keys, (k, i) => {
    rs[k] = get(values, i)
  })

  return rs
}

export default zipObject