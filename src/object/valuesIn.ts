import isMap from "../is/isMap";
import type { UnknownMapKey } from "../types";
import keysIn from "./keysIn";
/**
 * 返回对象的所有value数组
 * 包括原型链中的属性
 *
 * @example
 * let f = new Function("this.a=1;this.b=2;");
 * f.prototype.c = 3;
 * //[1,2,3]
 * console.log(_.valuesIn(new f()))
 *
 * @param obj
 * @returns 对象根属性对应的值列表
 */
function valuesIn<V>(obj: Record<UnknownMapKey, any>): V[] {
  if (isMap(obj)) {
    return Array.from((obj as Map<any, V>).values())
  }
  return keysIn(obj).map<V>((k) => obj[k])
}

export default valuesIn