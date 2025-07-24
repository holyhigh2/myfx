import toString from "./toString";

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
  let rs = "";
  str = toString(str)
  for (let i = 0; i < str.length; i++) {
    let s = str[i];
    const code = s.charCodeAt(0);
    if (
      code === 36 ||
      code === 46 ||
      code === 63 ||
      (code >= 40 && code <= 43) ||
      (code >= 91 && code <= 94) ||
      (code >= 123 && code <= 125)
    ) {
      s = "\\" + s;
    }
    rs += s;
  }
  return rs;
}

export default escapeRegExp