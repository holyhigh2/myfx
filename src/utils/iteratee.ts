import _iteratee from "../_iteratee";
/**
 * 创建一个函数，函数类型根据参数值类型而定。创建的函数常用于迭代回调，在Func.js内部被大量使用
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:false}
 * ];
 *
 * //[{func.js...}] 如果参数是object，返回_.matcher
 * console.log(_.filter(libs,_.iteratee({tags:{utils:true},js:true})))
 * //[func.js,juth2,soya2d] 如果参数是字符串，返回_.prop
 * console.log(_.map(libs,_.iteratee('name')))
 * //[true,false,true] 如果参数是数组，内容会转为path，并返回_.prop
 * console.log(_.map(libs,_.iteratee(['tags','utils'])))
 * //[1,3,5] 如果参数是函数，返回这个函数
 * console.log(_.filter([1,2,3,4,5],_.iteratee(n=>n%2)))
 * //[1,2,4,'a','1'] 无参返回_.identity
 * console.log(_.filter([0,1,false,2,4,undefined,'a','1','',null],_.iteratee()))
 *
 *
 * @param value 迭代模式
 * <br>当value是字符串类型时，返回_.prop
 * <br>当value是对象类型时，返回_.matcher
 * <br>当value是数组类型时，内容会转为path，并返回_.prop
 * <br>当value是函数时，返回这个函数
 * <br>当value未定义时，返回_.identity
 * <br>其他类型返回f() = false
 * @returns 不同类型的返回函数
 * @since 0.17.0
 */
export default _iteratee