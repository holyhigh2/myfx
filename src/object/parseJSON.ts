/**
 * 解析标准/非标准JSON字符串，返回对象
 * @example
 * //{a:1,b:2,c:'3'}
 * console.log(_.parseJSON("{a:1,b:2,c:'3'}"))
 * //{a:1,b:2,c:'3"'}
 * console.log(_.parseJSON(`[{"a":1,"b":2,"c":"3\\""}]`))
 * //true
 * console.log(_.parseJSON('true')
 * //12
 * console.log(_.parseJSON('12')
 *
 * @param str JSON字符串
 * @returns 解析后的对象或空对象
 * @since 1.9.0
 */
function parseJSON(str: string): Record<string, any> {
  let s = (str + '').replace(/:\s*(['`])(.*)\1(?=\s*[},])/mg, ':"$2"').replace(/([{,])\s*([a-zA-Z0-9_$]+)\s*:/mg, '$1"$2":')
  let rs
  try {
    rs = JSON.parse(s)
  } catch (e) {
    rs = {}
  }
  return rs
}

export default parseJSON