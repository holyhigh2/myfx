const PRIMITIVE_TYPES = [
  'string',
  'number',
  'bigint',
  'boolean',
  'undefined',
  'symbol',
]
/**
 * 判断值是不是一个非基本类型外的值，如果true则认为值是一个对象
 * 同样，该方法还可以用来判断一个值是不是基本类型
 *
 * @example
 * //false
 * console.log(_.isObject(1))
 * //true
 * console.log(_.isObject(new String()))
 * //false
 * console.log(_.isObject(true))
 * //false
 * console.log(_.isObject(null))
 *
 * @param v value
 * @returns 是否对象。如果值是null返回false，即使typeof null === 'object'
 */
function isObject(v: unknown): v is Record<string | number | symbol, any> {
  return null !== v && PRIMITIVE_TYPES.indexOf(typeof v) < 0
}

export default isObject