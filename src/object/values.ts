import { UnknownMapKey } from "../types"
import _identity from "../_identity"
import keys from "./keys";
/**
 * 返回对象的所有value数组
 * <div class="alert alert-secondary">
      只返回对象的自身可枚举属性
    </div>
 *
 *
 * @example
 * let f = new Function("this.a=1;this.b=2;");
 * f.prototype.c = 3;
 * //[1,2]
 * console.log(_.values(new f()))
 *
 * @param obj
 * @returns 对象根属性对应的值列表
 */
function values(obj: Record<UnknownMapKey, any>): any[] {
  return keys(obj).map((k) => obj[k])
}

export default values