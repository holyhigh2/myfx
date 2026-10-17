import isMap from "../is/isMap";
import keys from "./keys";
/**
 * 返回对象/Map的所有value数组
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
 * @returns 值列表
 */
function values<V>(obj: Map<any, V> | Record<string | number | symbol, V> | object): V[] {
  if (isMap(obj)) {
    return Array.from((obj as Map<any, V>).values())
  }
  const ks = keys(obj) as Array<string | number | symbol>
  const rs: V[] = []
  for (let i = 0; i < ks.length; i++) {
    rs.push((obj as any)[ks[i]])
  }
  return rs
}

export default values