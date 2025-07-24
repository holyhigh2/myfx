import isLowerCaseChar from "../is/isLowerCaseChar";
import isUpperCaseChar from "../is/isUpperCaseChar";
import toString from "./toString";

/**
 * 返回短横线风格的字符串
 *
 * @example
 * //'a-b-c'
 * console.log(_.kebabCase('a_b_c'))//snakeCase
 * //'webkit-perspective-origin-x'
 * console.log(_.kebabCase('webkitPerspectiveOriginX'))//camelCase
 * //'a-b-c'
 * console.log(_.kebabCase('a B-c'))//mixCase
 * //'get-my-url'
 * console.log(_.kebabCase('getMyURL'))//camelCase
 *
 * @param str
 * @returns 返回新字符串
 */
function kebabCase(str: any): string {
  let rs = "";
  str = toString(str)
  let prevType = 0; //1小写字母；2大写字母；3分隔符
  let lastPos = str.length - 1
  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (isLowerCaseChar(s)) {
      rs += s;
      prevType = 1;
      continue;
    }
    if (s === " " || s === "-" || s === "_") {
      if (prevType === 3 || i === lastPos) continue;
      rs += "-";
      prevType = 3;
      continue;
    }
    if (isUpperCaseChar(s)) {
      if (prevType === 1) {
        rs += "-";
      }
      rs += s.toLowerCase();
      prevType = 2;
    }
  }
  return rs;
}

export default kebabCase