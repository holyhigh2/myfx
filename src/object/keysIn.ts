import { UnknownMapKey } from "../types"
import _identity from "../_identity"
/**
 * 返回对象的所有key数组
 * 包括原型链中的属性key
 *
 * @example
 * let f = new Function("this.a=1;this.b=2;");
 * f.prototype.c = 3;
 * //[a,b,c]
 * console.log(_.keysIn(new f()))
 *
 * @param obj
 * @returns 对象的key
 */
function keysIn(obj: Record<UnknownMapKey, any>): string[] {
  const rs:string[] = []
  // eslint-disable-next-line guard-for-in
  for (const k in obj) {
    if (k) rs.push(k)
  }

  return rs
}

export default keysIn