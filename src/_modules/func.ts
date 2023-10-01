/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/**
 * 函数链操作相关函数
 * @author holyhigh
 */

import { first, head, last, range, reverse, slice, tail, take } from './array'
import { size, toArray, map, filter, eachRight, each } from './collection'
import { tap } from './function'
import { isArrayLike, isDefined, isFunction, isUndefined } from './is'
import { split } from './string'
import { iteratee } from './utils'

/**
 * 用于定义FuncChain对象并构造函数链
 * 注意，该类仅用于内部构造函数链
 */
export class FuncChain<T> {
  /**
   * @internal 
   */
  private _wrappedValue: T
  /**
   * @internal 
   */
  private _chain: { fn: Function; params: [] }[]

  /**
   * @internal 
   */
  constructor(v: T) {
    this._wrappedValue = v
    this._chain = []
  }

  /**
   * 惰性计算。执行函数链并返回计算结果
   * @example
   * //2-4
   * console.log(_([1,2,3,4]).map(v=>v+1).filter(v=>v%2===0).take(2).join('-').value())
   * //[1,2,2,1]
   * console.log(_(["{a:1,b:2}","{a:2,b:1}"]).map((v) => _.fval(v)).map(v=>[v.a,v.b]).join().value())
   * //[1,2,3,4]
   * console.log(_([1,2,3,4]).value())
   *
   * @returns 执行函数链返回的值
   */
  value() {
    let comprehension = isArrayLike(this._wrappedValue)
      ? createComprehension()
      : null
    const maxChainIndex = this._chain.length - 1
    return this._chain.reduce((acc, v, i) => {
      const params = [acc, ...v.params]
      if (comprehension) {
        let rs
        const sig = buildComprehension(comprehension, v.fn, v.params)
        if (sig > 0 || (!sig && maxChainIndex === i)) {
          rs = execComprehension(comprehension, acc)
          if (comprehension.tap) {
            ;(comprehension.tap as Function)(rs)
          }
          comprehension = null
        }
        if (sig > 1) {
          comprehension = createComprehension(v.fn, v.params)
        }
        if (rs) {
          return sig !== 1 ? rs : v.fn(...[rs, ...v.params])
        }
        return acc
      }
      if (CAN_COMPREHENSIONS.includes(v.fn.name)) {
        comprehension = createComprehension()
        return v.fn(...[acc, ...v.params])
      }
      return v.fn(...params)
    }, this._wrappedValue)
  }
}

/**
 * 返回一个包裹了参数v的FuncChain对象，并隐式开始函数链。函数链可以链接Myfx提供的所有函数，如

```js
 _([1,2,3,4]).map(v=>v+1).filter(v=>v%2===0).take(2).join('-').value()
```

 * 函数链与直接调用方法的区别不仅在于可以链式调用，更在于函数链是基于惰性求值的。
 * 上式中必须通过显式调用`value()`方法才能获取结果，
 * 而只有在`value()`方法调用时整个函数链才进行求值。
 * 
 * 
 * 惰性求值允许FuncChain实现捷径融合(shortcut fusion) —— 一项基于已有函数对数组循环次数进行大幅减少以提升性能的优化技术。
 * 下面的例子演示了原生函数链和Myfx函数链的性能差异
 * @example
 * let ary = _.range(20000000);
console.time('native');
let c = 0;
let a = ary.map((v)=>{
    c++;
    return v+1;
  }).filter((v) => {
    c++;
    return v%2==0;
  })
  .reverse()
  .slice(1, 4)
console.timeEnd('native');
console.log(a, c, '次');//大约600ms左右，循环 40000000 次

//Myfx
ary = _.range(20000000);
console.time('Myfx');
let x = 0;
let targets = _(ary)
  .map((v) => {
    x++;
    return v+1;
  })
  .filter((v) => {
    x++;
    return v%2==0;
  })
  .reverse()
  .slice(1, 4)
  .value();
console.timeEnd('Myfx');
console.log(targets, x, '次');//大约0.5ms左右，循环 18 次
 *
 * @param v
 * @returns Myfx对象
 */
export function myfx(v: any) {
  return v instanceof FuncChain ? v : new FuncChain(v)
}


const CAN_COMPREHENSIONS = [split.name, toArray.name, range.name]

function createComprehension(fn?: Function, params?: []) {
  const comprehension = {
    forEachRight: false,
    goalSettings: [],
    range: [],
    reverse: false,
    count: undefined,
    tap: undefined,
    returnEl: false,
  }
  if (fn && params) {
    buildComprehension(comprehension, fn, params)
  }
  return comprehension
}

function buildComprehension(
  comprehension: Record<string, any>,
  fn: Function,
  params: any[]
) {
  const fnName = fn.name
  switch (fnName) {
    case map.name:
    case filter.name:
      if (size(comprehension.range) > 0 || isDefined(comprehension.count))
        return 2
      let fn = params[0]
      if (!isFunction(fn)) {
        fn = iteratee(params[0])
      }
      comprehension.goalSettings.push({ type: fnName, fn: fn })
      break
    case reverse.name:
      if (size(comprehension.range) < 1) {
        comprehension.forEachRight = !comprehension.forEachRight
      } else {
        comprehension.reverse = !comprehension.reverse
      }
      break
    case slice.name:
      if (size(comprehension.range) > 0) return 2
      comprehension.range[0] = params[0]
      comprehension.range[1] = params[1]
      break
    case tail.name:
      if (size(comprehension.range) > 0) return 2
      comprehension.range[0] = 1
      comprehension.range[1] = params[1]
      break
    case take.name:
      if (isUndefined(comprehension.count) || params[0] < comprehension.count) {
        comprehension.count = params[0]
      }
      break
    case first.name:
    case head.name:
      if (isUndefined(comprehension.count) || 1 < comprehension.count) {
        comprehension.count = 1
        comprehension.returnEl = true
      }
      break
    case last.name:
      comprehension.count = 1
      comprehension.returnEl = true
      comprehension.forEachRight = true
      break
    case tap.name:
      comprehension.tap = params[0]
      break
    default:
      return 1
  }
  return 0
}

function execComprehension(
  comprehension: Record<string, any>,
  collection: any
) {
  const targets: any[] = []
  let targetIndex = 0
  if (!comprehension.count && comprehension.range.length > 0) {
    comprehension.count = comprehension.range[1] - comprehension.range[0]
  }
  const isReverse = comprehension.reverse
  const count = comprehension.count
  const gs = comprehension.goalSettings
  const gsLen = gs.length
  const range = comprehension.range
  const hasRange = range.length > 0
  const forEach = comprehension.forEachRight ? eachRight : each
  forEach(collection, (v, k) => {
    let t = v
    // before save target
    for (let i = 0; i < gsLen; i++) {
      const setting = gs[i]
      if (setting.type === map.name) {
        t = setting.fn(t, k)
      } else if (setting.type === filter.name) {
        if (!setting.fn(t, k)) {
          return
        }
      }
    } // for end

    if (hasRange && targetIndex++ < range[0]) return
    if (hasRange && targetIndex > range[1]) return false
    if (targets.length === count) return false

    if (isReverse) {
      targets.unshift(t)
    } else {
      targets.push(t)
    }
  })
  if (targets.length === 1 && comprehension.returnEl) {
    return targets[0]
  }
  return targets
}