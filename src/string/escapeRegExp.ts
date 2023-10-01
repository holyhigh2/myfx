import toString from "./toString"
const REG_EXP_KEYWORDS: string[] = [
  '\\',
  '$',
  '(',
  ')',
  '*',
  '+',
  '.',
  '[',
  ']',
  '?',
  '^',
  '{',
  '}',
  '|',
]
/**
 * 转义正则字符串中的特殊字符，包括 '\', '$', '(', ')', '*', '+', '.', '[', ']', '?', '^', '\{', '\}', '|'
 *
 * @example
 * //\^\[func\.js\] \+ \{crud-vue\} = \.\*\?\$
 * console.log(_.escapeRegExp('^[func.js] + {crud-vue} = .*?$'))
 *
 * @param str 需要转义的字符串
 * @returns 转义后的新字符串
 * @since 1.0.0
 */
function escapeRegExp(str: any): string {
  return toString(str)
    .split('')
    .reduce((a, b) => a + (REG_EXP_KEYWORDS.includes(b) ? '\\' + b : b), '')
}

export default escapeRegExp