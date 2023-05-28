import { UnknownMapKey } from "../types"
import _identity from "../_identity"
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
function valuesIn(obj: Record<UnknownMapKey, any>): any[] {
  return keysIn(obj).map((k) => obj[k])
}

export default valuesIn