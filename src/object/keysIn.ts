import isMap from "../is/isMap"
/**
 * 返回对象/Map的所有key数组
 * 包括对象原型链中的属性key
 *
 * @example
 * let f = new Function("this.a=1;this.b=2;");
 * f.prototype.c = 3;
 * //[a,b,c]
 * console.log(_.keysIn(new f()))
 *
 * @param obj
 * @returns key数组
 */
function keysIn(obj: Map<any, any> | Record<string | number | symbol, any>): string[] {
  if (isMap(obj)) {
    return Array.from((obj as Map<any, any>).keys())
  }
  const rs: string[] = []
  // eslint-disable-next-line guard-for-in
  for (const k in obj) {
    if (k) rs.push(k)
  }

  return rs
}

export default keysIn