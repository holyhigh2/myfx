import type { UnknownMapKey } from "../types";
import _toPath from "../_toPath";
import isArray from "../is/isArray";
import isObject from "../is/isObject";
/**
 * 创建一个函数，该函数返回指定对象的path属性值
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:false},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:true},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 * //[true,false,true]
 * console.log(_.map(libs,_.prop('tags.utils')))
 * //nodejs
 * console.log(_.prop(['platform',1])(libs[0]))
 *
 * @param path
 * @returns 接收一个对象作为参数的函数
 * @since 0.17.0
 */
function prop<V>(
  path: string | Array<string | number>
): (obj: Record<UnknownMapKey, any>) => V {
  // 镜像 get 的路径规范化（含单元素数组解包后再解析），但仅在创建时预解析一次
  let p: any = path
  let useDirect = false
  if (!isArray(p) || (p.length === 1 && (p = p[0]) !== undefined)) {
    useDirect = true
  }
  const directKey = p
  const chain = _toPath(p)
  // 真单键（无分隔符，directKey 与解析结果一致）：最小闭包，省去通用路径分支
  if (useDirect && chain.length === 1 && directKey === chain[0]) {
    const key = chain[0]
    return (obj) => (isObject(obj) ? (obj as any)[key] : undefined) as V
  }
  return (obj) => {
    if (!isObject(obj)) return undefined as any
    // 单键快速路径：直接取值，命中即返回（与 get 一致，优先整串字面键）
    if (useDirect) {
      const v = (obj as any)[directKey]
      if (v !== undefined) return v as V
    }
    let target: any = obj
    let i = 0
    while (i < chain.length) {
      if (target === null || target === undefined) break
      target = target[chain[i++]]
    }
    if (i < chain.length) return undefined as any
    return target as V
  }
}

export default prop