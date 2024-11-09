import functions from "../object/functions"
/**
 * 为func.js扩展额外函数，扩展后的函数同样具有函数链访问能力
 *
 * @example
 * //增加扩展
 * _.mixin({
 *  select:_.get,
 *  from:_.chain,
 *  where:_.filter,
 *  top:_.head
 * });
 *
 * const libs = [
 *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
 *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
 *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
 * ];
 * //查询utils是true的第一行数据的name值
 * console.log(_.from(libs).where({tags:{utils:true}}).top().select('name').value())
 *
 * @param obj 扩展的函数声明
 */
function mixin(target: Record<any, any>, obj: Record<string, Function>): void {
    functions(obj).forEach((fnName) => {
        const fn: Function = obj[fnName]
        if (target.prototype && target.prototype.constructor.name === 'FuncChain') {
            target.prototype['_' + fnName] = function (...rest: any[]) {
                this._chain.push({
                    fn: fn,
                    params: rest,
                })
                return this
            }
        } else {
            (target as any)['_' + fnName] = fn
        }
    })
}

export default mixin