/**
 * 内部使用类型
 *
 * @packageDocumentation
 */


/**
 * 列表类型
 */
export interface IList {
  length: number
  [Symbol.iterator]?: any
  [index: number]: any
}

/**
 * 未知类型的mapKey
 */
export type UnknownMapKey = string | number | symbol

/**
 * 类数组类型
 */
export type ArrayLike<V = unknown> =
  | Array<V>
  | string
  | NodeList
  | HTMLCollection
  | IList

/**
 * 集合类型
 */
export type Collection<V = unknown> =
  | Record<UnknownMapKey, V>
  | Set<V>
  | Map<any, V>
  | ArrayLike<V>

/**
 * 非函数迭代类型
 */
export type NonFuncItee = string | Record<any, any> | Array<any>

/**
 * 模板节点
 */
export interface INode {
  source: string
  comment?: boolean
  text?: boolean
  interpolate?: boolean
  mixin?: boolean
  evaluate?: boolean
  tmpl?: string
  paramters?: string
  expression?: string
}

/**
 * 模板选项
 */
export interface IOptions {
  delimiters?: string[]
  mixins?: Record<UnknownMapKey, any>
  globals?: Record<string, any>
  stripWhite?: boolean
}