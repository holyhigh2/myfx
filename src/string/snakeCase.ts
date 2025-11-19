import isLowerCaseChar from "../is/isLowerCaseChar";
import isNumeric from "../is/isNumeric";
import isUpperCaseChar from "../is/isUpperCaseChar";
import toString from "./toString";
/**
 * 返回下划线风格的字符串
 *
 * @example
 * //'a_b_c'
 * console.log(_.snakeCase('a-b c'))//mixCase
 * //'love_loves_to_love_love'
 * console.log(_.snakeCase('Love loves to love Love'))//spaces
 * //'a_b_c'
 * console.log(_.snakeCase('a B-c'))//camelCase
 * //'get_my_url'
 * console.log(_.snakeCase('getMyURL'))//camelCase
 *
 * @param str
 * @returns 返回新字符串
 */
function snakeCase(str: string): string {
  let rs = "";
  str = toString(str)
  let prevType = 0; //1小写字母；2大写字母；3分隔符
  let lastPos = str.length - 1
  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (isLowerCaseChar(s) || isNumeric(s)) {
      rs += s;
      prevType = 1;
      continue;
    }
    if (s === " " || s === "-" || s === "_") {
      if (prevType === 3 || i === lastPos) continue;
      rs += "_";
      prevType = 3;
      continue;
    }
    if (isUpperCaseChar(s)) {
      if (prevType === 1) {
        rs += "_";
      }
      rs += (s as string).toLowerCase();
      prevType = 2;
    }
  }
  return rs;
}

export default snakeCase