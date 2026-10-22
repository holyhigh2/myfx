import functions from "../object/functions"
/**
 * 为 myfx 扩展额外函数，扩展后的函数同样具有函数链访问能力
 *
 * @example
 * //向函数链注册扩展方法（链式代理按 _<fnName> 约定委托）
 * _.mixin(_.FuncChain, {
 *  select:_.get,
 *  top:_.first
 * });
 * //非链目标则直接挂为 _<fnName> 属性
 * _.mixin({}, { double:(v)=>v*2 })
 *
 * @param target 注册目标。传 FuncChain 时为函数链注册委托方法，其他对象挂 `_<name>` 属性
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