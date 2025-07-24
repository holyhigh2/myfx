import isLowerCaseChar from "../is/isLowerCaseChar";
import isUpperCaseChar from "../is/isUpperCaseChar";
import toString from "./toString";

/**
 * 返回帕斯卡风格的字符串
 *
 * @example
 * //'LoveLovesToLoveLove'
 * console.log(_.pascalCase('Love loves to love Love'))//spaces
 * //'ABC'
 * console.log(_.pascalCase('a B-c'))//mixCase
 * //'GetMyUrl'
 * console.log(_.pascalCase('getMyURL'))//camelCase
 * //'AbCdEf'
 * console.log(_.pascalCase('AB_CD_EF'))//snakeCase
 * //'ABcDEfGhXy'
 * console.log(_.pascalCase('aBc   D__EF_GH----XY_'))//mixCase
 *
 * @param str
 * @returns 返回新字符串
 */
function pascalCase(str: string): string {
  let rs = "";
  str = toString(str)
  let prevType = 0; //1小写字母；2大写字母；3分隔符
  for (let i = 0; i < str.length; i++) {
    let s = str[i];
    if (isLowerCaseChar(s)) {
      if (prevType === 3 || prevType === 0) {
        s = s.toUpperCase();
      }
      rs += s;
      prevType = 1;
      continue;
    }
    if (s === " " || s === "-" || s === "_") {
      if (prevType === 3) continue;
      prevType = 3;
      continue;
    }
    if (isUpperCaseChar(s)) {
      if (prevType === 2) {
        s = s.toLowerCase();
      }
      rs += s;
      prevType = 2;
    }
  }
  return rs;
}

export default pascalCase