import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _noop from "../_noop";
import mergeWith from "./mergeWith";
/**
 * 类似<code>assign</code>，但会递归源对象的属性合并到目标对象。
 * <br>如果目标对象属性值存在，但对应源对象的属性值为undefined，跳过合并操作。
 * 支持自定义处理器，如果处理器返回值为undefined，启用默认合并。
 * 该函数在对可选配置项与默认配置项进行合并时非常有用
 *
 * > 该函数会修改目标对象
 *
 * - 当目标对象是null/undefined时，返回空对象
 * - 当目标对象是基本类型时，返回对应的包装对象
 * - 当目标对象是不可扩展/冻结/封闭状态时，返回目标对象
 *
 * @example
 * //{x: 0, y: {a: 1, b: 2, c: 3, d: 4}}
 * console.log(_.merge({x:1,y:{a:1,b:2}},{x:2,y:{c:5,d:4}},{x:0,y:{c:3}}))
 * //[{x: 0, y: {a: 1, b: 2, c: 3, d: 4}}]
 * console.log(_.merge([{x:1,y:{a:1,b:2}}],[{x:2,y:{c:5,d:4}}],[{x:0,y:{c:3}}]))
 *
 * @param target 目标对象
 * @param sources 1-n个源对象
 * @returns 返回target
 * @since 0.22.0
 */
function merge<T extends Record<UnknownMapKey, any>>(
  target: T,
  ...sources: any[]
): T {
  return mergeWith(target, ...sources, _noop)
}

export default merge