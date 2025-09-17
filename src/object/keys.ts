import isMap from "../is/isMap"

/**
 * 返回对象/Map的所有key数组
 * 
 * > 只返回对象的自身可枚举属性
 *
 * @example
 * let f = new Function("this.a=1;this.b=2;");
 * f.prototype.c = 3;
 * //[a,b]
 * console.log(_.keys(new f()))
 *
 * @param obj
 * @returns key数组
 */
function keys<K>(obj: Map<K, any>): K[]
function keys<K extends keyof any>(obj: Record<K, any> | object): K[]
function keys<K extends keyof any>(obj: Record<K, any> | object): K[] {
  if (obj === null || obj === undefined) return []
  if (isMap(obj)) {
    return Array.from((obj as Map<K, any>).keys())
  }
  return Object.keys(obj) as K[]
}

export default keys