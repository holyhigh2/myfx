import toArray from "../collection/toArray";
/**
 * 把arrayLike中所有元素连接成字符串并返回。对于基本类型元素会直接转为字符值，对象类型会调用toString()方法
 *
 * @example
 * //'1/2/3/4'
 * console.log(_.join([1, 2, 3, 4], '/'))
 * //'1,2,3,4'
 * console.log(_.join([1, 2, 3, 4]))
 *
 * @param array 数组
 * @param [separator=','] 分隔符
 * @returns 拼接字符串
 */
function join(array: any[], separator?: string): string {
  return toArray(array).join(separator || ',')
}

export default join