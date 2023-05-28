import isMatch from "../is/isMatch";
/**
 * 创建一个函数，该函数接收一个对象为参数并返回对该对象使用props进行验证的的断言结果。
 *
 *
 * @example
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:false}
 * ];
 *
 * //[{func.js...}]
 * console.log(_.filter(libs,_.matcher({tags:{utils:true},js:true})))
 *
 * @param props 断言条件对象
 * @returns matcher(v)函数
 * @since 0.17.0
 */
function matcher<T extends Object>(props: T): (obj: T) => boolean {
  return (obj) => {
    return isMatch(obj, props)
  }
}

export default matcher