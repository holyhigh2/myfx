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
function keysIn<K>(obj: Map<K, any>): K[]
function keysIn<K extends keyof any>(obj: Record<K, any> | object): K[]
function keysIn<K extends keyof any>(obj: Record<K, any> | object): K[] {
  if (isMap(obj)) {
    return Array.from((obj as Map<any, any>).keys())
  }
  const rs: K[] = []
  // eslint-disable-next-line guard-for-in
  for (const k in obj) {
    if (k) rs.push(k as K)
  }

  return rs
}

export default keysIn