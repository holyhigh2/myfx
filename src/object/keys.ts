/**
 * 返回对象的所有key数组
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
 * @returns 对象的key
 */
function keys(obj: unknown): string[] {
  if (obj === null || obj === undefined) return []
  return Object.keys(obj)
}

export default keys