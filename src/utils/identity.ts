import _identity from '../_identity'
/**
 * 返回参数列表中的第一个值,即<code>f(x) = x</code>。该函数可以用来为高阶函数提供数据如过滤列表或map，也用作默认迭代器
 * @example
 * //[1,2,4,'a','1']
 * console.log(_.filter([0,1,false,2,4,undefined,'a','1','',null],_.identity))
 * const list = [
 *  {name:'a',value:1},
 *  {name:'b',value:2},
 *  {name:'c',value:3}
 * ]
 * //list
 * console.log(_.map(list,_.identity))
 *
 * @param v
 * @returns 第一个参数
 * @since 0.17.0
 */
export default _identity