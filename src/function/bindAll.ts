import { UnknownMapKey } from "../types";
import each from "../collection/each";
import get from "../object/get";
import set from "../object/set";
import flatDeep from "../array/flatDeep";
/**
 * 批量绑定对象内的函数属性，将这些函数的this上下文指向绑定对象。经常用于模型中的函数用于外部场景，比如setTimeout/事件绑定等
 *
 * @example
 * const obj = {
 *  text:'Func.js',
 *  click:function(a,b,c){console.log('welcome to '+this.text,a,b,c)},
 *  click2:function(){console.log('hi '+this.text)}
 * }
 * //自动填充参数
 * _.bindAll(obj,'click',['click2']);
 * //1秒后执行，无参数
 * setTimeout(obj.click,1000)
 * //事件
 * top.onclick = obj.click2
 *
 * @param object 绑定对象
 * @param  {...(string | Array<string>)} methodNames 属性名或path
 * @returns 绑定对象
 * @since 0.17.0
 */
function bindAll<T extends Record<UnknownMapKey, any>>(
  object: T,
  ...methodNames: (string | string[])[]
): T {
  const pathList = flatDeep<string>(methodNames)
  each<string>(pathList, (path) => {
    const fn = get<Function>(object, path)
    set(object, path, fn.bind(object))
  })

  return object
}


export default bindAll