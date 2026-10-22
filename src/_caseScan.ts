import isLowerCaseChar from "./is/isLowerCaseChar";
import isNumeric from "./is/isNumeric";
import isUpperCaseChar from "./is/isUpperCaseChar";
import toString from "./string/toString";

/**
 * snakeCase / kebabCase / pascalCase 的共用分词扫描
 */
function _caseScan(str: any, sep?: string, cap?: boolean): string {
  let rs = "";
  const chars = Array.from(toString(str));
  let prevType = 0; //1小写字母；2大写字母；3分隔符
  const lastPos = chars.length - 1;
  for (let i = 0; i < chars.length; i++) {
    const s = chars[i];
    let kind = isLowerCaseChar(s) || isNumeric(s) ? 1
      : s === " " || s === "-" || s === "_" ? 3
        : isUpperCaseChar(s) ? 2 : 0;
    if (kind === 0) {
      if ((s.codePointAt(0) as number) <= 0x7f) continue
      kind = s.toLowerCase() !== s ? 2 : 1
    }
    if (kind === 1) {
      rs += cap && (prevType === 3 || prevType === 0) ? s.toUpperCase() : s;
      prevType = 1;
      continue;
    }
    if (kind === 3) {
      if (prevType === 3 || (sep && i === lastPos)) continue;
      if (sep) rs += sep;
      prevType = 3;
      continue;
    }
    // kind === 2
    const lower = s.toLowerCase();
    if (sep) {
      if (prevType === 1) rs += sep;
      rs += lower;
    } else {
      rs += prevType === 2 ? lower : s;
    }
    prevType = 2;
  }
  return rs;
}

export default _caseScan
