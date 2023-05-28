import { UnknownMapKey } from "../types";
import _checkTarget from "../_checkTarget";
import _eachSources from "../_eachSources";
import _noop from "../_noop";
import get from "./get";
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
function prop(
  path: string | string[]
): (obj: Record<UnknownMapKey, any>) => any {
  return (obj) => {
    return get(obj, path)
  }
}

export default prop