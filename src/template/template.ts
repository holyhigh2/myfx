/* eslint-disable max-len */
/**
 * 模板函数
 *
 * @packageDocumentation
 */

/**
 * 
 * @author holyhigh
 */
import compact from "../array/compact"
import last from "../array/last"
import takeRight from "../array/takeRight"
import unzip from "../array/unzip"
import each from '../collection/each'
import includes from '../collection/includes'
import map from '../collection/map'
import size from '../collection/size'
import keys from "../object/keys"
import toObject from "../object/toObject"
import lastIndexOf from "../string/lastIndexOf"
import padStart from "../string/padStart"
import replace from "../string/replace"
import substring from "../string/substring"
import trim from "../string/trim"
import { INode, IOptions, UnknownMapKey } from '../types'
import toPairs from "../object/toPairs"

/**
 * 使用MTL(Myfx Template Language)编译字符串模板，并返回编译后的render函数
 * 
 * ### 一个MTL模板由如下部分组成：
 * - **文本** 原样内容输出
 * - **注释** `[%-- 注释 --%]` 仅在模板中显示，编译后不存在也不会输出
 * - **插值** `[%= 插值内容 %]` 输出表达式的结果，支持js语法
 * - **混入** `[%@名称 {参数} %]` 可以混入模板片段。被混入的片段具有独立作用域，可以通过JSON格式的对象传递参数给片段
 * - **语句** `[% _.each(xxxx... %]` 原生js语句
 *
 * @example
 * let render = _.template("1 [%= a %] 3");
 * //1 4 3
 * console.log(render({a:4}))
 *
 * render = _.template("1 [% print(_.range(2,5)) %] 5");
 * //1 2,3,4 5
 * console.log(render())
 *
 * render = _.template("[%-- 注释1 --%] [%@mix {x:5}%] [%-- 注释2 --%]",{
 *  mixins:{
 *    mix:'<div>[%= x %]</div>'
 *  }
 * });
 * //<div>5</div>
 * console.log(render())
 *
 * @param string 模板字符串
 * @param options MTL参数
 * @param options.delimiters 分隔符，默认 ['[%' , '%]']
 * @param options.mixins 混入对象。\{名称:模板字符串\}
 * @param options.globals 全局变量对象，可以在任意位置引用。模板内置的全局对象有两个：`print(content)`函数、`_` 对象，Myfx的命名空间
 * @param options.stripWhite 是否剔除空白，默认false。剔除发生在编译期间，渲染时不会受到影响。剔除规则：如果一行只有一个MTL注释或语句，则该行所占空白会被移除。
 * @returns 编译后的执行函数。该函数需要传递一个对象类型的参数作为运行时参数
 * @since 1.0.0
 */
function template(string: string, options?: IOptions) {
  const delimiters = map<string>(template.settings.delimiters, (d) => {
    const letters = replace(d, /\//gim, '')
    return map(letters, (l) => {
      return includes(ESCAPES, l) ? '\\' + l : l
    }).join('')
  })
  options = toObject(options)
  const mixins = options.mixins
  const stripWhite = options.stripWhite || false

  const comment = delimiters[0] + template.settings.comment + delimiters[1]
  const interpolate =
    delimiters[0] + template.settings.interpolate + delimiters[1]
  const evaluate = delimiters[0] + template.settings.evaluate + delimiters[1]
  const mixin = delimiters[0] + template.settings.mixin + delimiters[1]

  const splitExp = new RegExp(
    `(?:${comment})|(?:${mixin})|(?:${interpolate})|(?:${evaluate})`,
    'mg'
  )

  // ///////////////////////////////----拆分表达式与文本
  // 1. 对指令及插值进行分段
  const tokens = parse(string, splitExp, mixins, stripWhite)
  // 2. 编译render函数
  const render = compile(tokens, options)
  return render
}
const ESCAPES = ['[', ']', '{', '}', '$']

/**
 * 模板设置对象
 */
template.settings = {
  /**
   * @defaultValue ['[%', '%]']
   */
  delimiters: ['[%', '%]'],
  interpolate: '=([\\s\\S]+?)',
  comment: '--[\\s\\S]+?--',
  mixin: '@([a-zA-Z_$][\\w_$]*)([\\s\\S]+?)',
  evaluate: '([\\s\\S]+?)',
}

function parse(
  str: string,
  splitExp: RegExp,
  mixins: Record<UnknownMapKey, any> | undefined,
  stripWhite: boolean
): INode[] {
  let indicator = 0
  let lastSegLength = 0
  const fullStack = []
  let prevText = null
  let prevNode = null
  while (true) {
    const rs = splitExp.exec(str)
    if (rs == null) {
      break
    } else {
      let text = str.substring(indicator + lastSegLength, rs.index)
      if (prevText) {
        // check strip white
        if (stripWhite) {
          const stripStart = prevText.replace(/\n\s*$/, '\n')
          const stripEnd = text.replace(/^\s*\n/, '')
          if (
            stripStart.length !== prevText.length &&
            stripEnd.length !== text.length
          ) {
            text = stripEnd
          }
        }
      }
      prevText = text
      indicator = rs.index

      const node = getText(text)
      fullStack.push(node)
      try {
        const node2 = parseNode(rs, mixins)
        prevNode = node2
        fullStack.push(node2)
      } catch (error) {
        // 获取最近信息
        const recInfo = takeRight(fullStack, 5)
        const tipInfo = map(recInfo, 'source').join('') + rs[0]
        let tipIndicator = map(rs[0], () => '^').join('')

        const tipLineStartIndex =
          lastIndexOf(substring(str, 0, rs.index), '\n') + 1
        tipIndicator = padStart(
          tipIndicator,
          rs.index - tipLineStartIndex + tipIndicator.length,
          ' '
        )

        console.error('...', tipInfo + '\n' + tipIndicator + '\n', error)
        return fullStack
      }

      lastSegLength = rs[0].length
    }
  }
  return fullStack
}

function getText(str: string) {
  return {
    text: true,
    source: str,
  }
}

function parseNode(
  rs: RegExpExecArray,
  mixins: Record<UnknownMapKey, any> | undefined
): INode {
  const parts = compact(rs)
  const src = parts[0]
  const modifier = src.replace(template.settings.delimiters[0], '')[0]
  switch (modifier) {
    case '-':
      return {
        comment: true,
        source: src,
      }
    case '=':
      return {
        interpolate: true,
        source: src,
        expression: parts[1],
      }
    case '@':
      const mixin = parts[1]
      if (!mixins || !mixins[mixin]) {
        throw new SyntaxError(
          `The mixin '${mixin}' does not exist, check if the options.mixins has been set`
        )
      }
      let paramters = trim(parts[2])
      if (paramters) {
        const matcher = paramters.match(
          /\{(?:,?[a-zA-Z_$][a-zA-Z0-9_$]*(?::.*?)?)+\}/gm
        )
        if (!matcher) {
          throw new SyntaxError(
            `Invalid mixin paramters '${parts[2]}', must be JSON form`
          )
        }
        paramters = matcher[0]
      }
      return {
        mixin: true,
        source: src,
        tmpl: mixins[mixin],
        paramters,
      }
    default:
      return {
        evaluate: true,
        source: src,
        expression: parts[1],
      }
  }
}

// 返回编译后的render函数
// 函数中不能出现异步代码，否则会导致render失败
// 默认全局变量 print() / _
function compile(tokens: INode[], options: IOptions): Function {
  let funcStr = ''
  each<INode>(tokens, (token) => {
    if (token.comment) return

    if (token.text) {
      funcStr += '\nprint(`' + token.source + '`);'
    } else if (token.interpolate) {
      funcStr += `\nprint(${token.expression});`
    } else if (token.evaluate) {
      funcStr += '\n' + token.expression
    } else if (token.mixin) {
      funcStr += `\nprint(_.template(${JSON.stringify(token.tmpl)},$options)(${
        token.paramters
      }));`
    }
  })

  return (obj: Record<UnknownMapKey, any>) => {
    let declarations = keys(obj).join(',')
    if (declarations) {
      declarations = '{' + declarations + '}'
    }
    let globalKeys = []
    let globalValues = []
    const paramAry = unzip(toPairs(options.globals!))
    if (size(paramAry) > 0) {
      globalKeys = paramAry[0]
      globalValues = paramAry[1]
    }
    globalKeys.push('_')
    globalValues.push((self as any).myfx)

    const getRender = new Function(
      ...globalKeys,
      '$options',
      `return function(${declarations}){
      const textQ=[];
      const print=(str)=>{
        textQ.push(str)
      };` +
        funcStr +
        ';return textQ.join("")}'
    )(...globalValues, options)

    return getRender(obj)
  }
}

export default template
