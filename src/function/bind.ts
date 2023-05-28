import partial from "./partial";
/**
 * 创建一个新的函数，并且绑定函数的this上下文。默认参数部分同<code>partial()</code>
 *
 * @example
 * const obj = {
 *  text:'Func.js',
 *  click:function(a,b,c){console.log('welcome to '+this.text,a,b,c)},
 *  blur:function(){console.log('bye '+this.text)}
 * }
 * //自动填充参数
 * let click = _.bind(obj.click,obj,'a',undefined,'c');
 * click('hi')
 * //1秒后执行，无参数
 * setTimeout(click,1000)
 *
 * @param fn 需要调用的函数
 * @param thisArg fn函数内this所指向的值
 * @param args 参数可以使用undefined作为占位符，以此来确定不同的实参位置
 * @returns 绑定thisArg的新函数
 * @since 0.17.0
 */
function bind(fn: any, thisArg: any, ...args: any[]): Function {
  return partial(fn.bind(thisArg), ...args)
}

export default bind