import { UnknownMapKey } from "../types"
import _identity from "../_identity"
import assignWith from "./assignWith";
/**
 * 将一个或多个源对象的可枚举属性值分配到目标对象。如果源对象有多个，则按照从左到右的顺序依次对target赋值，相同属性会被覆盖
 * 
 * > 该函数会修改目标对象
 * 
 * <ul>
 *  <li>当目标对象是null/undefined时，返回空对象</li>
 *  <li>当目标对象是基本类型时，返回对应的包装对象</li>
 *  <li>当目标对象是不可扩展/冻结/封闭状态时，返回目标对象</li>
 * </ul>
 * @example
 * //{x:1,y:3}
 * console.log(_.assign({x:1},{y:3}))
 *
 * @param target 目标对象
 * @param  {...object} sources 源对象
 * @returns 返回target
 */
function assign(
  target: Record<UnknownMapKey, any>,
  ...sources: any[]
): Record<UnknownMapKey, any> {
  return assignWith(target, ...sources, _identity)
}

export default assign