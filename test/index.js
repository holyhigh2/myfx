(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myfx = {}));
})(this, (function (exports) { 'use strict';

  function _getGrouped(str) {
      return (str.match(/[A-Z]{2,}|([^\s-_]([^\s-_A-Z]+)?(?=[\s-_A-Z]))|([^\s-_]+(?=$))/g) || []);
  }

  /**
   * 判断值是否为null或undefined
   *
   * @example
   * //true
   * console.log(_.isNil(undefined))
   * //false
   * console.log(_.isNil(0))
   * //true
   * console.log(_.isNil(null))
   * //false
   * console.log(_.isNil(NaN))
   *
   * @param v
   * @returns
   * @since 1.0.0
   */
  function isNil(v) {
      return v === null || v === undefined;
  }

  /**
   * 转换任何对象为字符串。如果对象本身为string类型的值/对象，则返回该对象的字符串形式。否则返回对象的toString()方法的返回值
   *
   * @example
   * //''
   * console.log(_.toString(null))
   * //1
   * console.log(_.toString(1))
   * //3,6,9
   * console.log(_.toString([3,6,9]))
   * //-0
   * console.log(_.toString(-0))
   * //[object Set]
   * console.log(_.toString(new Set([3,6,9])))
   * //{a:1}
   * console.log(_.toString({a:1,toString:()=>'{a:1}'}))
   *
   * @param v 任何值
   * @returns 对于null/undefined会返回空字符串
   */
  function toString(v) {
      if (isNil(v))
          return '';
      if (v === 0 && 1 / v < 0)
          return '-0';
      return v.toString();
  }

  /**
   * 转换字符串第一个字符为大写并返回
   *
   * @example
   * //'First'
   * console.log(_.upperFirst('first'))//mixCase
   * //'GetMyURL'
   * console.log(_.upperFirst('getMyURL'))//camelCase
   *
   * @param str
   * @returns 返回新字符串
   */
  function upperFirst(str) {
      str = toString(str);
      if (str.length < 1)
          return str;
      return str[0].toUpperCase() + str.substring(1);
  }

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
  function pascalCase(str) {
      return _getGrouped(toString(str)).reduce((acc, v) => acc + upperFirst(v.toLowerCase()), '');
  }

  /**
   * 转换字符串第一个字符为小写并返回
   *
   * @example
   * //'fIRST'
   * console.log(_.lowerFirst('FIRST'))//mixCase
   * //'love loves to love Love'
   * console.log(_.lowerFirst('Love loves to love Love'))//spaces
   *
   * @param str
   * @returns 返回新字符串
   */
  function lowerFirst(str) {
      str = toString(str);
      if (str.length < 1)
          return str;
      return str[0].toLowerCase() + str.substring(1);
  }

  /**
   * 返回驼峰风格的字符串
   *
   * @example
   * //'aBC'
   * console.log(_.camelCase('a-b c'))//mixCase
   * //'loveLovesToLoveLove'
   * console.log(_.camelCase('Love loves to love Love'))//spaces
   * //'aBC'
   * console.log(_.camelCase('a B-c'))//camelCase
   * //'getMyUrl'
   * console.log(_.camelCase('getMyURL'))//camelCase
   *
   * @param str
   * @returns 返回新字符串
   */
  function camelCase(str) {
      return lowerFirst(pascalCase(toString(str)));
  }

  /**
   * 把字符串的首字母大写，如果首字母不是ascii中的a-z则返回原值
   *
   * @example
   * //Abc
   * console.log(_.capitalize('abc'))
   * //''
   * console.log(_.capitalize(null))
   * //1
   * console.log(_.capitalize(1))
   *
   *
   * @param str 字符串
   * @returns 对于null/undefined会返回空字符串
   */
  function capitalize(str) {
      str = toString(str);
      if (str.length < 1)
          return str;
      return str[0].toUpperCase() + toString(str.substring(1)).toLowerCase();
  }

  /**
   * 验证字符串是否以查询子字符串结尾
   *
   * @example
   * //true
   * console.log(_.endsWith('func.js','js'))
   * //true
   * console.log(_.endsWith('func.js','c',4))
   *
   * @param str
   * @param searchStr 查询字符串
   * @param position 索引
   * @returns 如果以查询子字符串开头返回true，否则返回false
   */
  function endsWith(str, searchStr, position) {
      return toString(str).endsWith(searchStr, position);
  }

  const REG_EXP_KEYWORDS = [
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
  ];
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
  function escapeRegExp(str) {
      return toString(str)
          .split('')
          .reduce((a, b) => a + (REG_EXP_KEYWORDS.includes(b) ? '\\' + b : b), '');
  }

  /**
   * 查找指定值在字符串中首次出现的位置索引
   *
   * @example
   * //10
   * console.log(_.indexOf('cyberfunc.js','js'))
   * //10
   * console.log(_.indexOf('cyberfunc.js','js',5))
   *
   * @param str
   * @param search 指定字符串
   * @param [fromIndex=0] 起始索引
   * @returns 第一个匹配搜索字符串的位置索引或-1
   */
  function indexOf(str, search, fromIndex) {
      str = toString(str);
      return str.indexOf(search, fromIndex || 0);
  }

  /**
   * 返回所有字母是小写格式的字符串
   *
   * @example
   * //''
   * console.log(_.lowerCase())
   * //'func.js'
   * console.log(_.lowerCase('FUNC.JS'))
   *
   * @param str
   * @returns 返回新字符串
   */
  function lowerCase(str) {
      return toString(str).toLowerCase();
  }

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
  function kebabCase(str) {
      return lowerCase(_getGrouped(toString(str)).join('-'));
  }

  /**
   * 查找指定值在字符串中最后出现的位置索引
   *
   * @example
   * //10
   * console.log(_.lastIndexOf('cyberfunc.js','js'))
   * //-1
   * console.log(_.lastIndexOf('cyberfunc.js','js',5))
   *
   * @param str
   * @param search 指定字符串
   * @param [fromIndex=Infinity] 起始索引，从起始索引位置向左查找指定字符串
   * @returns 最后一个匹配搜索字符串的位置索引或-1
   */
  function lastIndexOf(str, search, fromIndex) {
      str = toString(str);
      return str.lastIndexOf(search, fromIndex || Infinity);
  }

  /**
   * 使用填充字符串填充原字符串达到指定长度。从原字符串末尾开始填充。
   *
   * @example
   * //100
   * console.log(_.padEnd('1',3,'0'))
   * //1-0-0-
   * console.log(_.padEnd('1',6,'-0'))
   * //1
   * console.log(_.padEnd('1',0,'-0'))
   *
   * @param str 原字符串
   * @param len 填充后的字符串长度，如果长度小于原字符串长度，返回原字符串
   * @param [padString=' '] 填充字符串，如果填充后超出指定长度，会自动截取并保留左侧字符串
   * @returns 在原字符串末尾填充至指定长度后的字符串
   */
  function padEnd(str, len, padString) {
      str = toString(str);
      if (str.padEnd)
          return str.padEnd(len, padString);
      padString = padString || ' ';
      const diff = len - str.length;
      if (diff < 1)
          return str;
      let fill = '';
      let i = Math.ceil(diff / padString.length);
      while (i--) {
          fill += padString;
      }
      return str + fill.substring(0, diff);
  }

  /**
   * 使用填充字符串填充原字符串达到指定长度。从原字符串起始开始填充。
   *
   * @example
   * //001
   * console.log(_.padStart('1',3,'0'))
   *
   * @param str 原字符串。如果非字符串则会自动转换成字符串
   * @param len 填充后的字符串长度，如果长度小于原字符串长度，返回原字符串
   * @param [padString=' '] 填充字符串，如果填充后超出指定长度，会自动截取并保留右侧字符串
   * @returns 在原字符串起始填充至指定长度后的字符串
   */
  function padStart(str, len, padString) {
      str = toString(str);
      if (str.padStart)
          return str.padStart(len, padString);
      padString = padString || ' ';
      const diff = len - str.length;
      if (diff < 1)
          return str;
      let fill = '';
      let i = Math.ceil(diff / padString.length);
      while (i--) {
          fill += padString;
      }
      return fill.substring(fill.length - diff, fill.length) + str;
  }

  /**
   * 使用字符0填充原字符串达到指定长度。从原字符串起始位置开始填充。
   *
   * @example
   * //001
   * console.log(_.padZ('1',3))
   *
   * @param str 原字符串
   * @param len 填充后的字符串长度
   * @returns 填充后的字符串
   */
  function padZ(str, len) {
      return padStart(str, len, '0');
  }

  /**
   * 创建一个以原字符串为模板，重复指定次数的新字符串
   *
   * @example
   * //funcfuncfunc
   * console.log(_.repeat('func',3))
   *
   * @param str 原字符串
   * @param count 重复次数
   * @returns 对于null/undefined会返回空字符串
   */
  function repeat(str, count) {
      str = toString(str);
      count = Number.isFinite(count) ? count : 0;
      if (count < 1)
          return '';
      if (str.repeat)
          return str.repeat(count);
      let i = count;
      let rs = '';
      while (i--) {
          rs += str;
      }
      return rs;
  }

  /**
   * 使用<code>replaceValue</code>替换<code>str</code>中的首个<code>searchValue</code>部分
   *
   * @example
   * //'func-js'
   * console.log(_.replace('func.js','.','-'))
   * //''
   * console.log(_.replace(null,'.','-'))
   * //'kelikeli'
   * console.log(_.replace('geligeli',/ge/g,'ke'))
   * //'geligeli'
   * console.log(_.replace('kelikeli',/ke/g,()=>'ge'))
   *
   * @param str 字符串。非字符串值会自动转换成字符串
   * @param searchValue 查找内容，正则或者字符串
   * @param replaceValue 替换内容，字符串或处理函数。函数的返回值将用于替换
   * @returns 替换后的新字符串
   */
  function replace(str, searchValue, replaceValue) {
      return toString(str).replace(searchValue, replaceValue);
  }

  /**
   * 判断值是不是一个正则对象
   *
   * @example
   * //true
   * console.log(_.isRegExp(new RegExp))
   * //true
   * console.log(_.isRegExp(/1/))
   *
   * @param v
   * @returns
   * @since 0.19.0
   */
  function isRegExp(v) {
      return typeof v === 'object' && v instanceof RegExp;
  }

  /**
   * 判断参数是否为字符串，包括String类的实例以及基本类型string的值
   *
   * @example
   * //true
   * console.log(_.isString(new String('')))
   * //true
   * console.log(_.isString(''))
   *
   * @param v
   * @returns
   */
  function isString(v) {
      return typeof v === 'string' || v instanceof String;
  }

  const PRIMITIVE_TYPES = [
      'string',
      'number',
      'bigint',
      'boolean',
      'undefined',
      'symbol',
  ];
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
  function isObject(v) {
      return null !== v && PRIMITIVE_TYPES.indexOf(typeof v) < 0;
  }

  function replaceAll(str, searchValue, replaceValue) {
      let searchExp;
      let strRs = toString(str);
      if (isRegExp(searchValue)) {
          searchExp = searchValue;
          if (!searchValue.global) {
              searchExp = new RegExp(searchValue, searchValue.flags + 'g');
          }
          return strRs.replace(searchExp, replaceValue);
      }
      else if (isString(searchValue)) {
          searchExp = new RegExp(escapeRegExp(searchValue), 'g');
          return strRs.replace(searchExp, replaceValue);
      }
      else if (isObject(searchValue)) {
          const ks = Object.keys(searchValue);
          for (let i = ks.length; i--;) {
              const k = ks[i];
              const v = searchValue[k];
              searchExp = new RegExp(escapeRegExp(k), 'g');
              strRs = strRs.replace(searchExp, v);
          }
          return strRs;
      }
      return str;
  }

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
  function snakeCase(str) {
      return lowerCase(_getGrouped(toString(str)).join('_'));
  }

  /**
   * 使用分隔符将字符串分割为多段数组
   *
   * @example
   * //["func", "js"]
   * console.log(_.split('func.js','.'))
   * //["func"]
   * console.log(_.split('func.js','.',1))
   *
   * @param str 原字符串。如果非字符串则会自动转换成字符串
   * @param separator 分隔符
   * @param [limit] 限制返回的结果数量，为空返回所有结果
   * @returns 分割后的数组
   */
  function split(str, separator, limit) {
      return toString(str).split(separator, limit);
  }

  /**
   * 验证字符串是否以查询子字符串开头
   *
   * @example
   * //true
   * console.log(_.startsWith('func.js','func'))
   * //false
   * console.log(_.startsWith('func.js','func',3))
   * //true
   * console.log(_.startsWith('func.js','c',3))
   *
   * @param str
   * @param searchStr 查询字符串
   * @param [position=0] 索引
   * @returns 如果以查询子字符串开头返回true，否则返回false
   */
  function startsWith(str, searchStr, position) {
      return toString(str).startsWith(searchStr, position);
  }

  /**
   * 对字符串进行截取，返回从起始索引到结束索引间的新字符串。
   *
   * @example
   * //"34567"
   * console.log(_.substring('12345678',2,7))
   * //"345678"
   * console.log(_.substring('12345678',2))
   * //""
   * console.log(_.substring())
   *
   * @param str 需要截取的字符串，如果非字符串对象会进行字符化处理。基本类型会直接转为字符值，对象类型会调用toString()方法
   * @param [indexStart=0] 起始索引，包含
   * @param [indexEnd=str.length] 结束索引，不包含
   * @returns
   */
  function substring(str, indexStart, indexEnd) {
      str = toString(str);
      indexStart = indexStart || 0;
      return str.substring(indexStart, indexEnd);
  }

  /**
   * 检测字符串是否与指定的正则匹配
   *
   * @example
   * //true 忽略大小写包含判断
   * console.log(_.test('func.js','Func','i'))
   * //true 忽略大小写相等判断
   * console.log(_.test('func.js',/^FUNC\.js$/i))
   * //false
   * console.log(_.test('func.js',/FUNC/))
   *
   * @param str
   * @param pattern 指定正则。如果非正则类型会自动转换为正则再进行匹配
   * @param [flags] 如果pattern参数不是正则类型，会使用该标记作为正则构造的第二个参数
   * @returns 匹配返回true
   * @since 0.19.0
   */
  function test(str, pattern, flags) {
      let regExp = pattern;
      if (!isRegExp(regExp)) {
          regExp = new RegExp(pattern, flags);
      }
      return regExp.test(str);
  }

  /**
   * 截取数字小数位。用来修复原生toFixed函数的bug
   *
   * @example
   * //14.05
   * console.log(_.toFixed(14.049,2))
   * //-15
   * console.log(_.toFixed(-14.6))
   * //14.0001
   * console.log(_.toFixed(14.00005,4))
   * //0.101
   * console.log(_.toFixed(0.1009,3))
   * //2.47
   * console.log(_.toFixed(2.465,2))
   * //2.46 原生
   * console.log((2.465).toFixed(2))
   *
   * @param v 数字或数字字符串
   * @param [scale=0] 小数位长度
   * @returns 填充后的字符串
   */
  function toFixed(v, scale) {
      scale = scale || 0;
      const num = parseFloat(v + '');
      if (isNaN(num))
          return v;
      const isNeg = num < 0 ? -1 : 1;
      const tmp = (num + '').split('.');
      const frac = tmp[1] || '';
      const diff = scale - frac.length;
      let rs = '';
      if (diff > 0) {
          let z = padEnd(frac, scale, '0');
          z = z ? '.' + z : z;
          rs = tmp[0] + z;
      }
      else if (diff === 0) {
          rs = num + '';
      }
      else {
          let integ = parseInt(tmp[0]);
          const i = frac.length + diff;
          const round = frac.substring(i);
          let keep = frac.substring(0, i);
          let startZ = false;
          if (keep[0] === '0' && keep.length > 1) {
              keep = 1 + keep.substring(1);
              startZ = true;
          }
          let n = Math.round(parseFloat(keep + '.' + round));
          const strN = n + '';
          if (n > 0 && strN.length > keep.length) {
              integ += 1 * isNeg;
              n = strN.substring(1);
          }
          if (startZ) {
              n = parseInt(strN[0]) - 1 + strN.substring(1);
          }
          n = n !== '' && keep.length > 0 ? '.' + n : n;
          rs = integ + n + '';
          if (isNeg < 0 && rs[0] !== '-')
              rs = '-' + rs;
      }
      return rs;
  }

  /**
   * 从字符串的两端删除空白字符。
   *
   * @example
   * //holyhigh
   * console.log(_.trim('  holyhigh '))
   *
   * @param str
   * @returns 对于null/undefined会返回空字符串
   */
  function trim(str) {
      str = toString(str);
      return str.trim();
  }

  /**
   * 从字符串末尾删除空白字符。
   *
   * @example
   * //'  holyhigh'
   * console.log(_.trimEnd('  holyhigh '))
   *
   * @param str
   * @returns 对于null/undefined会返回空字符串
   */
  function trimEnd(str) {
      str = toString(str);
      if (str.trimEnd)
          return str.trimEnd();
      return str.replace(/\s*$/, '');
  }

  /**
   * 从字符串起始位置删除空白字符。
   *
   * @example
   * //'holyhigh '
   * console.log(_.trimStart('  holyhigh '))
   *
   * @param str
   * @returns 对于null/undefined会返回空字符串
   */
  function trimStart(str) {
      str = toString(str);
      if (str.trimStart)
          return str.trimStart();
      return str.replace(/^\s*/, '');
  }

  /**
   * 对超过指定长度的字符串进行截取并在末尾追加代替字符
   *
   * @example
   * //func...
   * console.log(_.truncate('func.js',4))
   * //func...
   * console.log(_.truncate('func.js',6,{separator:/\.\w+/g}))
   * //func.js.com...
   * console.log(_.truncate('func.js.com.cn',13,{separator:'.'}))
   * //func.js
   * console.log(_.truncate('func.js',10))
   * //fun!!!
   * console.log(_.truncate('func.js',3,{omission:'!!!'}))
   *
   * @param str
   * @param len 最大长度。如果长度大于<code>str</code>长度，直接返回str
   * @param options 可选项
   * @param options.omission 替代字符，默认 '...'
   * @param options.separator 截断符。如果截取后的字符串中包含截断符，则最终只会返回截断符之前的内容
   * @returns 返回新字符串
   * @since 1.0.0
   */
  function truncate(str, len, options) {
      str = toString(str);
      if (str.length <= len)
          return str;
      if (!isObject(options)) {
          options = { omission: '...' };
      }
      options.omission = options.omission || '...';
      str = str.substring(0, len);
      if (options.separator) {
          let separator = options.separator;
          if (!isObject(separator)) {
              separator = new RegExp(escapeRegExp(separator), 'g');
          }
          else if (!separator.global) {
              separator = new RegExp(separator, separator.flags + 'g');
          }
          let rs;
          let tmp;
          while ((tmp = separator.exec(str)) !== null) {
              rs = tmp;
          }
          if (rs) {
              str = str.substring(0, rs.index);
          }
      }
      return str + options.omission;
  }

  /**
   * 返回所有字母是大写格式的字符串
   *
   * @example
   * //''
   * console.log(_.upperCase())
   * //'FUNC.JS'
   * console.log(_.upperCase('func.js'))
   *
   * @param str
   * @returns 返回新字符串
   */
  function upperCase(str) {
      return toString(str).toUpperCase();
  }

  var str = /*#__PURE__*/Object.freeze({
    __proto__: null,
    camelCase: camelCase,
    capitalize: capitalize,
    endsWith: endsWith,
    escapeRegExp: escapeRegExp,
    indexOf: indexOf,
    kebabCase: kebabCase,
    lastIndexOf: lastIndexOf,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    padEnd: padEnd,
    padStart: padStart,
    padZ: padZ,
    pascalCase: pascalCase,
    repeat: repeat,
    replace: replace,
    replaceAll: replaceAll,
    snakeCase: snakeCase,
    split: split,
    startsWith: startsWith,
    substring: substring,
    test: test,
    toFixed: toFixed,
    toString: toString,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    truncate: truncate,
    upperCase: upperCase,
    upperFirst: upperFirst
  });

  /**
   * 通过表达式格式化数字
   *
   * ```
   * #,##0.00 => 1,234.00
   * ```
   *
   * pattern解释：
   *
   * - `0` 如果对应位置上没有数字，则用零代替。用于整数位时在位数不足时补0，用于小数位时，如果超长会截取限位并四舍五入；如果位数不足则补0
   * - `#` 如果对应位置上没有数字，不显示。用于整数位时在位数不足时原样显示，用于小数位时，如果超长会截取限位并四舍五入；如果位数不足原样显示
   * - `.` 小数分隔符，只能出现一个
   * - `,` 分组符号，如果出现多个分组符号，以最右侧为准
   * - `%` 后缀符号，数字乘100，并追加%
   * - `\u2030` 后缀符号，数字乘1000，并追加‰
   * - `E` 后缀符号，转为科学计数法格式
   *
   * @example
   * //小数位截取时会自动四舍五入
   * console.log(_.formatNumber(123.678,'0.00'))
   * //在整数位中，0不能出现在#左侧；在小数位中，0不能出现在#右侧。
   * console.log(_.formatNumber(12.1,'0##.#0')) //格式错误，返回原值
   * //当有分组出现时，0只会影响短于表达式的数字
   * console.log(_.formatNumber(12.1,',000.00'))//012.10
   * console.log(_.formatNumber(1234.1,',000.00'))//1,234.10
   * //非表达式字符会原样保留
   * console.log(_.formatNumber(1234.1,'￥,000.00元'))//￥1,234.10元
   * //转为科学计数法
   * console.log(_.formatNumber(-0.01234,'##.0000E'))//-1.2340e-2
   * //#号在小数位中会限位，整数位中不会
   * console.log(_.formatNumber(123.456,'#.##'))//123.46
   *
   * @param v 需要格式化的值，可以是数字或字符串类型
   * @param [pattern='#,##0.00'] 格式化模式
   *
   * @returns 格式化后的字符串或原始值字符串(如果格式无效时)或特殊值(Infinity\u221E、NaN\uFFFD)
   */
  function formatNumber(v, pattern = '#,##0.00') {
      if (v === Infinity)
          return '\u221E';
      if (v === -Infinity)
          return '-\u221E';
      if (Number.isNaN(v))
          return '\uFFFD';
      if (isNaN(parseFloat(v + '')))
          return v + '';
      let formatter = cache$1[pattern];
      if (!formatter) {
          const match = pattern.match(/(?<integer>[0,#]+)(?:\.(?<fraction>[0#]+))?(?<suffix>[%\u2030E])?/);
          if (match == null) {
              return v + '';
          }
          let integerPtn = match.groups?.integer || '';
          const fractionPtn = match.groups?.fraction || '';
          let suffix = match.groups?.suffix || '';
          if (!integerPtn ||
              integerPtn.indexOf('0#') > -1 ||
              fractionPtn.indexOf('#0') > -1)
              return v + '';
          const ptnPart = match[0];
          const endsPart = pattern.split(ptnPart);
          const rnd = true; // round
          const isPercentage = suffix === '%';
          const isPermillage = suffix === '\u2030';
          const isScientific = suffix === 'E';
          const groupMatch = integerPtn.match(/,[#0]+$/);
          let groupLen = -1;
          if (groupMatch) {
              groupLen = groupMatch[0].substring(1).length;
              integerPtn = integerPtn.replace(/^.*,(?=[^,])/, '');
          }
          let zeroizeLen = integerPtn.indexOf('0');
          if (zeroizeLen > -1) {
              zeroizeLen = integerPtn.length - zeroizeLen;
          }
          let fixedLen = Math.max(fractionPtn.lastIndexOf('0'), fractionPtn.lastIndexOf('#'));
          if (fixedLen > -1) {
              fixedLen += 1;
          }
          formatter = (val) => {
              const num = parseFloat(val + '');
              let number = num;
              let exponent = 0;
              if (isPercentage) {
                  number = number * 100;
              }
              else if (isPermillage) {
                  number = number * 1000;
              }
              else if (isScientific) {
                  const str = number + '';
                  const pair = str.split('.');
                  if (number >= 1) {
                      exponent = pair[0].length - 1;
                  }
                  else if (number < 1) {
                      const fraStr = pair[1];
                      exponent = fraStr.replace(/^0+/, '').length - fraStr.length - 1;
                  }
                  number = number / 10 ** exponent;
              }
              const numStr = number + '';
              let integer = parseInt(numStr);
              const pair = numStr.split('.');
              const fraction = pair[1] || '';
              // 处理小数
              let dStr = '';
              if (fractionPtn) {
                  if (fraction.length >= fixedLen) {
                      dStr = parseFloat('0.' + fraction).toFixed(fixedLen);
                      if (dStr[0] === '1') {
                          integer += 1;
                      }
                      dStr = dStr.substring(1);
                  }
                  else {
                      dStr =
                          '.' +
                              fractionPtn.replace(/[0#]/g, (tag, i) => {
                                  const l = fraction[i];
                                  return l == undefined ? (tag === '0' ? '0' : '') : l;
                              });
                  }
                  if (dStr.length < 2) {
                      dStr = '';
                  }
              }
              else {
                  let carry = 0;
                  if (fraction && rnd) {
                      carry = Math.round(parseFloat('0.' + fraction));
                  }
                  integer += carry;
              }
              // 处理整数
              let iStr = integer + '';
              let sym = num < 0 ? '-' : '';
              if (iStr[0] === '-' || iStr[0] === '+') {
                  sym = iStr[0];
                  iStr = iStr.substring(1);
              }
              if (groupLen > -1 && iStr.length > groupLen) {
                  const reg = new RegExp('\\B(?=(\\d{' + groupLen + '})+$)', 'g');
                  iStr = iStr.replace(reg, ',');
              }
              else if (iStr.length < integerPtn.length) {
                  const integerPtnLen = integerPtn.length;
                  const iStrLen = iStr.length;
                  iStr = integerPtn.replace(/[0#]/g, (tag, i) => {
                      if (integerPtnLen - i > iStrLen)
                          return tag === '0' ? '0' : '';
                      const l = iStr[iStrLen - (integerPtnLen - i)];
                      return l == undefined ? (tag === '0' ? '0' : '') : l;
                  });
              }
              // 合并
              if (isScientific) {
                  suffix = 'e' + exponent;
              }
              let rs = sym + iStr + dStr + suffix;
              return (endsPart[0] || '') + rs + (endsPart[1] || '');
          };
      }
      return formatter(v);
  }
  const cache$1 = {};

  /**
   * 转换任何对象为数字类型
   *
   * @example
   * //NaN
   * console.log(_.toNumber(null))
   * //1
   * console.log(_.toNumber('1'))
   * //NaN
   * console.log(_.toNumber([3,6,9]))
   * //-0
   * console.log(_.toNumber(-0))
   * //NaN
   * console.log(_.toNumber(NaN))
   * //NaN
   * console.log(_.toNumber('123a'))
   *
   * @param v 任何值
   * @returns 对于null/undefined会返回NaN
   */
  function toNumber(v) {
      if (v === undefined || v === null)
          return NaN;
      return Number(v);
  }

  /**
   * 判断a是否大于b
   *
   * @example
   * //true
   * console.log(_.gt(2,1))
   * //false
   * console.log(_.gt(5,'5'))
   *
   * @param a
   * @param b
   * @returns
   * @since 1.0.0
   */
  function gt(a, b) {
      return toNumber(a) > toNumber(b);
  }

  /**
   * 判断a是否大于等于b
   *
   * @example
   * //true
   * console.log(_.gte(2,1))
   * //true
   * console.log(_.gte(5,'5'))
   * //false
   * console.log(_.gte(5,'b'))
   *
   * @param a
   * @param b
   * @returns
   * @since 1.0.0
   */
  function gte(a, b) {
      return toNumber(a) >= toNumber(b);
  }

  /**
   * 判断a是否小于b
   *
   * @example
   * //true
   * console.log(_.lt(1,2))
   * //false
   * console.log(_.lt(5,'5'))
   *
   * @param a
   * @param b
   * @returns
   * @since 1.0.0
   */
  function lt(a, b) {
      return toNumber(a) < toNumber(b);
  }

  function inRange(v, start, end) {
      start = start || 0;
      if (end === undefined) {
          end = start;
          start = 0;
      }
      if (start > end) {
          const tmp = end;
          end = start;
          start = tmp;
      }
      return gte(v, start) && lt(v, end);
  }

  /**
   * 判断a是否小于等于b
   *
   * @example
   * //true
   * console.log(_.lte(1,2))
   * //true
   * console.log(_.lte(5,'5'))
   * //false
   * console.log(_.lte(5,'b'))
   *
   * @param a
   * @param b
   * @returns
   * @since 1.0.0
   */
  function lte(a, b) {
      return toNumber(a) <= toNumber(b);
  }

  /**
   * 转换整数。小数部分会直接丢弃
   *
   * @example
   * //9
   * console.log(_.toInteger(9.99))
   * //12
   * console.log(_.toInteger('12.34'))
   * //0
   * console.log(_.toInteger(null))
   * //0
   * console.log(_.toInteger(new Error))
   *
   * @param v
   * @returns
   * @since 1.0.0
   */
  function toInteger(v) {
      if (v === null || v === undefined)
          return 0;
      return parseInt(v);
  }

  var num = /*#__PURE__*/Object.freeze({
    __proto__: null,
    formatNumber: formatNumber,
    gt: gt,
    gte: gte,
    inRange: inRange,
    lt: lt,
    lte: lte,
    toInt: toInteger,
    toInteger: toInteger,
    toNumber: toNumber
  });

  const TIME_MAP$1 = {
      s: 1000,
      m: 1000 * 60,
      h: 1000 * 60 * 60,
      d: 1000 * 60 * 60 * 24,
  };
  /**
   * 对日期时间进行量变处理
   *
   * @example
   * //2020/5/1 08:00:20
   * console.log(_.formatDate(_.addTime(new Date('2020-05-01'),20),'yyyy/MM/dd hh:mm:ss'))
   * //2020-04-11 08:00
   * console.log(_.formatDate(_.addTime(new Date('2020-05-01'),-20,'d')))
   * //2022-01-01 00:00
   * console.log(_.formatDate(_.addTime(new Date('2020-05-01 0:0'),20,'M')))
   *
   * @param date 原日期时间
   * @param amount 变化量，可以为负数
   * @param [type='s'] 量变时间类型
   * <ul>
   * <li><code>y</code> 年</li>
   * <li><code>M</code> 月</li>
   * <li><code>d</code> 日</li>
   * <li><code>h</code> 时</li>
   * <li><code>m</code> 分</li>
   * <li><code>s</code> 秒</li>
   * </ul>
   * @returns 日期对象
   */
  function addTime(date, amount, type) {
      type = type || 's';
      const d = new Date(date);
      switch (type) {
          case 'y':
              d.setFullYear(d.getFullYear() + amount);
              break;
          case 'M':
              d.setMonth(d.getMonth() + amount);
              break;
          default:
              let times = 0;
              times = amount * TIME_MAP$1[type];
              d.setTime(d.getTime() + times);
      }
      return d;
  }

  const TIME_MAP = {
      s: 1000,
      m: 1000 * 60,
      h: 1000 * 60 * 60,
      d: 1000 * 60 * 60 * 24,
  };
  // const DATE_CONVERT_EXP = /(\d+)-(\d+)-(\d+)/;
  /**
   * 比较两个日期，并返回由比较时间单位确定的相差时间。
   * <p>
   * 使用truncated对比算法 —— 小于指定时间单位的值会被视为相同，
   * 比如对比月，则两个日期的 日/时/分/秒 会被认为相同，以此类推。
   * </p>
   * 相差时间为正数表示date1日期晚于(大于)date2，负数相反，0表示时间/日期相同。
   * <p>
   * 注意，如果对比单位是 h/m/s，务必要保持格式一致，比如
   *
   * ```ts
   * //实际相差8小时
   * new Date('2020-01-01')
   * //vs
   * new Date('2020/01/01')
   * ```
   *
   * @example
   * //0
   * console.log(_.compareDate(new Date('2020/05/01'),'2020/5/1'))
   * //格式不一致，相差8小时
   * console.log(_.compareDate(new Date('2020-05-01'),'2020/5/1','h'))
   * //-59
   * console.log(_.compareDate(new Date('2019/01/01'),'2019/3/1'))
   *
   * @param date1 日期对象、时间戳或合法格式的日期时间字符串。
   * 对于字符串格式，可以时<a href="https://www.iso.org/iso-8601-date-and-time-format.html">UTC格式</a>，或者
   * <a href="https://tools.ietf.org/html/rfc2822#section-3.3">RFC2822</a>格式
   * @param date2 同date1
   * @param [type='d'] 比较时间单位
   * <ul>
   * <li><code>y</code> 年</li>
   * <li><code>M</code> 月</li>
   * <li><code>d</code> 日</li>
   * <li><code>h</code> 时</li>
   * <li><code>m</code> 分</li>
   * <li><code>s</code> 秒</li>
   * </ul>
   * @returns 根据比较时间单位返回的比较值。正数为date1日期晚于(大于)date2，负数相反，0表示相同。
   */
  function compareDate(date1, date2, type) {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      type = type || 'd';
      if (type === 'y') {
          return d1.getFullYear() - d2.getFullYear();
      }
      else if (type === 'M') {
          return ((d1.getFullYear() - d2.getFullYear()) * 12 +
              (d1.getMonth() - d2.getMonth()));
      }
      else {
          switch (type) {
              case 'd':
                  d1.setHours(0, 0, 0, 0);
                  d2.setHours(0, 0, 0, 0);
                  break;
              case 'h':
                  d1.setHours(d1.getHours(), 0, 0, 0);
                  d2.setHours(d2.getHours(), 0, 0, 0);
                  break;
              case 'm':
                  d1.setHours(d1.getHours(), d1.getMinutes(), 0, 0);
                  d2.setHours(d2.getHours(), d2.getMinutes(), 0, 0);
                  break;
          }
          const diff = d1.getTime() - d2.getTime();
          return diff / TIME_MAP[type];
      }
  }

  /**
   * 判断值是不是一个整数
   *
   * @example
   * //true
   * console.log(_.isInteger(-0))
   * //true
   * console.log(_.isInteger(5.0))
   * //false
   * console.log(_.isSafeInteger(5.000000000000001))
   * //true
   * console.log(_.isSafeInteger(5.0000000000000001))
   * //false
   * console.log(_.isInteger('5'))
   * //true
   * console.log(_.isInteger(Number.MAX_SAFE_INTEGER))
   * //true
   * console.log(_.isInteger(Number.MAX_VALUE))
   *
   * @param v
   * @returns
   */
  function isInteger(v) {
      return Number.isInteger(v);
  }

  /**
   * 判断参数是否为Array对象的实例
   *
   * @example
   * //true
   * console.log(_.isArray([]))
   * //false
   * console.log(_.isArray(document.body.children))
   *
   * @param v
   * @returns
   */
  function isArray(v) {
      // 使用 instanceof Array 无法鉴别某些场景，比如
      // Array.prototype instanceof Array => false
      // Array.isArray(Array.prototype) => true
      // typeof new Proxy([],{}) => object
      // Array.isArray(new Proxy([],{})) => true
      return Array.isArray(v);
  }

  /**
   * 通过指定参数得到日期对象。支持多种签名
   *
   * ```js
   * _.toDate(1320940800); //timestamp unix style
   * _.toDate(1320940800123); //timestamp javascript style
   * _.toDate([year,month,day]); //注意，month的索引从1开始
   * _.toDate([year,month,day,hour,min,sec]); //注意，month的索引从1开始
   * _.toDate(datetimeStr);
   * ```
   *
   * @example
   * //'2011/11/11 00:00:00'
   * console.log(_.toDate(1320940800).toLocaleString())
   * //'2011/11/11 00:01:39'
   * console.log(_.toDate(1320940899999).toLocaleString())
   * //'2022/12/12 00:00:00'
   * console.log(_.toDate([2022,11,12]).toLocaleString())
   * //'2022/12/12 12:12:12'
   * console.log(_.toDate([2022,11,12,12,12,12]).toLocaleString())
   * //'2022/2/2 00:00:00'
   * console.log(_.toDate('2022/2/2').toLocaleString())
   * //'2022/2/2 08:00:00'
   * console.log(_.toDate('2022-02-02').toLocaleString())
   *
   * @param value 转换参数
   *
   * @returns 转换后的日期。无效日期统一返回1970/1/1
   */
  function toDate(value) {
      let rs;
      if (isInteger(value)) {
          if (value < TIMESTAMP_MIN) {
              value = toNumber(padEnd(value + '', 13, '0'));
          }
          else if (value > TIMESTAMP_MAX) {
              value = 0;
          }
          rs = new Date(value);
      }
      else if (isArray(value)) {
          rs = new Date(...value);
      }
      else {
          rs = new Date(value);
      }
      if (rs.toDateString() === 'Invalid Date') {
          rs = new Date(0);
      }
      return rs;
  }
  const TIMESTAMP_MIN = 1000000000000;
  const TIMESTAMP_MAX = 9999999999999;

  /**
   * 指定日期是否是闰年
   * @param date 日期对象
   * @returns {number} 闰年返回true
   */
  function isLeapYear(date) {
      date = toDate(date);
      const year = date.getFullYear();
      return year % 400 === 0 || year % 4 === 0;
  }

  const DaysOfMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  /**
   * 获取指定日期在当前年中的天数并返回
   * @param date 日期对象
   * @returns {number} 当前年中的第几天
   */
  function getDayOfYear(date) {
      date = toDate(date);
      const leapYear = isLeapYear(date);
      const month = date.getMonth();
      let dates = date.getDate();
      for (let i = 0; i < month; i++) {
          const ds = DaysOfMonth[i] || (leapYear ? 29 : 28);
          dates += ds;
      }
      return dates;
  }

  /**
   * 获取指定日期在当前月中的周数并返回
   * @param date 日期对象
   * @returns {number} 当前月中的第几周
   */
  function getWeekOfMonth(date) {
      date = toDate(date);
      const year = date.getFullYear();
      let firstDayOfMonth = new Date(year, date.getMonth(), 1);
      let extraWeek = 0;
      //超过周5多1周
      let d = firstDayOfMonth.getDay();
      if (d === 0 || d > 5) {
          extraWeek = 1;
      }
      return Math.ceil(date.getDate() / 7) + extraWeek;
  }

  /**
   * 获取指定日期在当前年中的周数并返回
   * @param date 日期对象
   * @returns {number} 当前年中的第几周
   */
  function getWeekOfYear(date) {
      date = toDate(date);
      const year = date.getFullYear();
      let firstDayOfYear = new Date(year, 0, 1);
      let extraWeek = 0;
      //超过周5多1周
      let d = firstDayOfYear.getDay();
      if (d === 0 || d > 5) {
          extraWeek = 1;
      }
      return Math.ceil(getDayOfYear(date) / 7) + extraWeek;
  }

  const INVALID_DATE = '';
  const SearchExp = /y{2,4}|M{1,3}|d{1,4}|h{1,2}|m{1,2}|s{1,2}|Q{1,2}|E{1,2}|W{1,2}|w{1,2}|H{1,2}|S|a/gm;
  const pad0 = (str) => str.length > 1 ? str : '0' + str;
  const pad00 = (str) => str.length > 2 ? str : (str.length > 1 ? '0' + str : '00' + str);
  /**
   * 通过表达式格式化日期时间
   *
   * ```
   * yyyy-MM-dd hh:mm:ss => 2020-12-11 10:09:08
   * ```
   *
   * pattern解释：
   *
   * - `yy` 2位年 - 22
   * - `yyyy` 4位年 - 2022
   * - `M` 1位月(1-12)
   * - `MM` 2位月(01-12)
   * - `MMM` 月描述(一月 - 十二月)
   * - `d` 1位日(1-30/31/29/28)
    - `dd` 2位日(01-30/31/29/28)
    - `ddd` 一年中的日(1-365)
    - `dddd` 一年中的日(001-365)
    - `h` 1位小时(1-12)
    - `hh` 2位小时(01-12)
    - `H` 1位小时(0-23)
    - `HH` 2位小时(00-23)
    - `m` 1位分钟(0-59)
    - `mm` 2位分钟(00-59)
    - `s` 1位秒(0-59)
    - `ss` 2位秒(00-59)
    - `Q` 季度(1-4)
    - `QQ` 季度描述(春-冬)
    - `W` 一年中的周(1-53)
    - `WW` 一年中的周(01-53)
    - `w` 一月中的周(1-6)
    - `ww` 一月中的周描述(第一周 - 第六周)
    - `E` 星期(1-7)
    - `EE` 星期描述(星期一 - 星期日)
    - `S` 毫秒
    - `a` AM/PM
   *
   * @example
   * //now time
   * console.log(_.formatDate(_.now(),'yyyy-MM-dd hh:mm'))
   * //2/1/2021
   * console.log(_.formatDate('2021-2-1','M/d/yyyy'))
   * //2/1/21
   * console.log(_.formatDate('2021-2-1','M/d/yy'))
   * //02/01/21
   * console.log(_.formatDate('2021-2-1','MM/dd/yy'))
   * //02/01/2021
   * console.log(_.formatDate('2021-2-1','MM/dd/yyyy'))
   * //21/02/01
   * console.log(_.formatDate('2021-2-1','yy/MM/dd'))
   * //2021-02-01
   * console.log(_.formatDate('2021-2-1','yyyy-MM-dd'))
   * //21-12-11 10:09:08
   * console.log(_.formatDate('2021-12-11T10:09:08','yy-MM-dd HH:mm:ss'))
   * //12/11/2020 1009
   * console.log(_.formatDate('2020-12-11 10:09:08','MM/dd/yyyy hhmm'))
   * //2020-12-11 08:00
   * console.log(_.formatDate(1607644800000))
   * //''
   * console.log(_.formatDate('13:02'))
   * //''
   * console.log(_.formatDate(null))
   * //现在时间:(20-12-11 10:09:08)
   * console.log(_.formatDate('2020-12-11 10:09:08','现在时间:(yy-MM-dd hh:mm:ss)'))
   *
   * @param val 需要格式化的值，可以是日期对象或时间字符串或日期毫秒数
   * @param [pattern='yyyy-MM-dd hh:mm:ss'] 格式化模式
   * @returns 格式化后的日期字符串，无效日期返回空字符串
   */
  function formatDate(val, pattern) {
      pattern = pattern || 'yyyy-MM-dd hh:mm:ss';
      let formatter = cache[pattern];
      if (!formatter) {
          formatter = (date) => {
              if (!date)
                  return INVALID_DATE;
              let ptn = pattern + '';
              if (typeof date === 'string' || typeof date === 'number') {
                  date = toDate(date);
              }
              if (date.toString().indexOf('Invalid') > -1)
                  return INVALID_DATE;
              let valDate = date;
              return ptn.replace(SearchExp, (tag) => {
                  const cap = tag[0];
                  const month = valDate.getMonth();
                  const locale = Locale[Lang];
                  if (cap === 'y') {
                      const year = valDate.getFullYear();
                      return tag === 'yy' ? (year % 100) + '' : year + '';
                  }
                  else if (cap === 'M') {
                      switch (tag) {
                          case 'M':
                              return month + 1 + '';
                          case 'MM':
                              return pad0(month + 1 + '');
                          case 'MMM':
                              return locale?.months[month] || tag;
                      }
                  }
                  else if (cap === 'd') {
                      let dayOfMonth = valDate.getDate();
                      switch (tag) {
                          case 'd':
                              return dayOfMonth + '';
                          case 'dd':
                              return pad0(dayOfMonth + '');
                          case 'ddd':
                              return getDayOfYear(valDate) + '';
                          case 'dddd':
                              return pad00(getDayOfYear(valDate) + '');
                      }
                  }
                  else if (cap === 'a') {
                      let val = valDate.getHours();
                      return val < 12 ? locale?.meridiems[0] : locale?.meridiems[1];
                  }
                  else if (cap === 'h') { //12
                      let val = valDate.getHours();
                      val = val % 12;
                      if (val === 0)
                          val = 12;
                      return tag.length > 1 ? pad0(val + '') : val + '';
                  }
                  else if (cap === 'H') { //24
                      const val = valDate.getHours() + '';
                      return tag.length > 1 ? pad0(val) : val;
                  }
                  else if (cap === 'm') {
                      const val = valDate.getMinutes() + '';
                      return tag.length > 1 ? pad0(val) : val;
                  }
                  else if (cap === 's') {
                      const val = valDate.getSeconds() + '';
                      return tag.length > 1 ? pad0(val) : val;
                  }
                  else if (cap === 'Q') {
                      const quarter = Math.ceil(month / 3);
                      if (tag === 'Q')
                          return quarter + '';
                      return locale?.quarters[quarter - 1] || tag;
                  }
                  else if (cap === 'W') {
                      const val = getWeekOfYear(valDate) + '';
                      return tag.length > 1 ? pad0(val) : val;
                  }
                  else if (cap === 'w') {
                      const val = getWeekOfMonth(valDate);
                      if (tag === 'w')
                          return val + '';
                      return locale?.weeks[val - 1] || tag;
                  }
                  else if (cap === 'E') {
                      let dayOfWeek = valDate.getDay();
                      dayOfWeek = dayOfWeek < 1 ? 7 : dayOfWeek;
                      return tag === 'E'
                          ? dayOfWeek + ''
                          : locale?.days[dayOfWeek - 1] || tag;
                  }
                  else if (cap === 'S') {
                      return valDate.getMilliseconds() + '';
                  }
                  return tag;
              });
          };
      }
      return formatter(val);
  }
  const cache = {};
  const Locale = {
      'zh-CN': {
          quarters: ['一季度', '二季度', '三季度', '四季度'],
          months: [
              '一',
              '二',
              '三',
              '四',
              '五',
              '六',
              '七',
              '八',
              '九',
              '十',
              '十一',
              '十二',
          ].map((v) => v + '月'),
          weeks: ['一', '二', '三', '四', '五', '六'].map((v) => '第' + v + '周'),
          days: ['一', '二', '三', '四', '五', '六', '日'].map((v) => '星期' + v),
          meridiems: ['AM', 'PM']
      },
  };
  let Lang = globalThis.navigator?.language || 'zh-CN';
  /**
   * 设置不同locale的配置
   * @param lang 语言标记，默认跟随系统
   * @param options 格式化选项
   * @param options.quarters 季度描述，默认"一 - 四季度"
   * @param options.months 月度描述，默认"一 - 十二月"
   * @param options.weeks 一月中的周描述，默认"第一 - 六周"
   * @param options.days 星期描述，默认"星期一 - 日"
   * @param options.meridiems 上午/下午描述，默认"AM/PM"
   */
  formatDate.locale = function (lang, options) {
      let locale = Locale[lang];
      if (!locale) {
          locale = Locale[lang] = { quarters: [], months: [], weeks: [], days: [], meridiems: [] };
      }
      if (options?.quarters) {
          locale.quarters = options?.quarters;
      }
      if (options?.months) {
          locale.months = options?.months;
      }
      if (options?.weeks) {
          locale.weeks = options?.weeks;
      }
      if (options?.days) {
          locale.days = options?.days;
      }
      if (options?.meridiems) {
          locale.meridiems = options?.meridiems;
      }
  };
  /**
   * 可以设置当前格式化使用的语言
   * @param lang 语言标记，默认跟随系统
   */
  formatDate.lang = function (lang) {
      Lang = lang;
  };

  /**
   * 比较两个日期是否为同一天
   * @example
   * //true
   * console.log(_.isSameDay(new Date('2020-05-01'),'2020/5/1'))
   * //false
   * console.log(_.isSameDay(new Date('2020-05-01 23:59:59.999'),'2020/5/2 0:0:0.000'))
   *
   * @param date1 日期对象或合法格式的日期时间字符串
   * @param date2 同date1
   * @returns
   */
  function isSameDay(date1, date2) {
      return (new Date(date1).setHours(0, 0, 0, 0) ===
          new Date(date2).setHours(0, 0, 0, 0));
  }

  /**
   * 返回13位日期毫秒数，表示从1970 年 1 月 1 日 00:00:00 (UTC)起到当前时间
   *
   * @example
   * //now time
   * console.log(_.now())
   *
   * @returns 带毫秒数的时间戳
   */
  function now() {
      return Date.now();
  }

  var datetime = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addTime: addTime,
    compareDate: compareDate,
    formatDate: formatDate,
    getDayOfYear: getDayOfYear,
    getWeekOfMonth: getWeekOfMonth,
    getWeekOfYear: getWeekOfYear,
    isLeapYear: isLeapYear,
    isSameDay: isSameDay,
    now: now,
    toDate: toDate
  });

  /**
   * 判断参数是否为函数对象
   *
   * @example
   * //true
   * console.log(_.isFunction(new Function()))
   * //true
   * console.log(_.isFunction(()=>{}))
   *
   * @param v
   * @returns
   */
  function isFunction(v) {
      return typeof v == 'function' || v instanceof Function;
  }

  /**
   * 判断参数是否为类数组对象
   *
   * @example
   * //true
   * console.log(_.isArrayLike('abc123'))
   * //true
   * console.log(_.isArrayLike([]))
   * //true
   * console.log(_.isArrayLike(document.body.children))
   *
   * @param v
   * @returns
   */
  function isArrayLike(v) {
      if (isString(v) && v.length > 0)
          return true;
      if (!isObject(v))
          return false;
      // 具有length属性
      const list = v;
      if (list.length !== undefined) {
          const proto = list.constructor.prototype;
          // NodeList/HTMLCollection/CSSRuleList/...
          if (isFunction(proto.item))
              return true;
          // arguments
          if (isFunction(list[Symbol.iterator]))
              return true;
      }
      return false;
  }

  /**
   * 对字符串进行trim后进行验证。如果非字符串，转为字符串后进行验证
   * @example
   * //true
   * console.log(_.isBlank('  '))
   * //true
   * console.log(_.isBlank(null))
   * //false
   * console.log(_.isBlank({}))
   * //false
   * console.log(_.isBlank('     1'))
   *
   * @param v 字符串
   * @returns 如果字符串是null/undefined/\t \n \f \r或trim后长度为0，返回true
   * @since 0.16.0
   */
  function isBlank(v) {
      return v === null || v === undefined || (v + '').trim().replace(/\t|\n|\f|\r/mg, '').length === 0;
  }

  /**
   * 判断值是不是一个布尔值
   *
   * @example
   * //true
   * console.log(_.isBoolean(false))
   * //false
   * console.log(_.isBoolean('true'))
   * //false
   * console.log(_.isBoolean(1))
   *
   * @param v
   * @returns
   */
  function isBoolean(v) {
      return typeof v === 'boolean' || v instanceof Boolean;
  }

  /**
   * 判断值是不是一个Date实例
   *
   * @example
   * //true
   * console.log(_.isDate(new Date()))
   * //false
   * console.log(_.isDate('2020/1/1'))
   *
   * @param v
   * @returns
   */
  function isDate(v) {
      return v instanceof Date;
  }

  /**
   * isUndefined()的反向验证函数，在需要验证是否变量存在的场景下非常有用
   * @example
   * //true
   * console.log(_.isDefined(null))
   * //false
   * console.log(_.isDefined(undefined))
   *
   * @param v
   * @returns
   */
  function isDefined(v) {
      return v !== undefined;
  }

  /**
   * 判断值是不是Element的实例
   *
   * @example
   * //true
   * console.log(_.isElement(document.body))
   * //false
   * console.log(_.isElement(document))
   *
   * @param v
   * @returns
   * @since 1.0.0
   */
  function isElement(v) {
      return typeof v === 'object' && v instanceof Element;
  }

  /**
   * 判断参数是否为空，包括`null/undefined/空字符串/0/[]/{}`都表示空
   *
   * 注意：相比isBlank，isEmpty只判断字符串长度是否为0
   *
   * @example
   * //true
   * console.log(_.isEmpty(null))
   * //true
   * console.log(_.isEmpty([]))
   * //false
   * console.log(_.isEmpty({x:1}))
   *
   * @param v
   * @returns
   */
  function isEmpty(v) {
      if (null === v)
          return true;
      if (undefined === v)
          return true;
      if ('' === v)
          return true;
      if (0 === v)
          return true;
      if (isArrayLike(v) && v.length < 1)
          return true;
      if (v instanceof Object && Object.keys(v).length < 1)
          return true;
      return false;
  }

  function eq$1(a, b) {
      if (Number.isNaN(a) && Number.isNaN(b))
          return true;
      return a === b;
  }

  /**
   * 同<code>isEqual</code>，但支持自定义比较器
   *
   * @example
   * //true
   * console.log(_.isEqualWith([new Date('2010-2-1'),'abcd'],['2010/2/1','Abcd'],(av,bv)=>_.isDate(av)?av.toLocaleDateString() == bv:_.test(av,bv,'i')))
   *
   * @param a
   * @param b
   * @param [comparator] 比较器，参数(v1,v2)，返回true表示匹配。如果返回undefined使用对应内置比较器处理
   * @returns
   * @since 1.0.0
   */
  function isEqualWith(a, b, comparator) {
      let cptor = comparator;
      if (!isObject(a) || !isObject(b)) {
          return (cptor || eq$1)(a, b);
      }
      let keys = [];
      if ((keys = Object.keys(a)).length !== Object.keys(b).length)
          return false;
      if (isDate(a) && isDate(b))
          return cptor ? cptor(a, b) : a.getTime() === b.getTime();
      if (isRegExp(a) && isRegExp(b))
          return cptor ? cptor(a, b) : a.toString() === b.toString();
      for (let i = keys.length; i--;) {
          const k = keys[i];
          const v1 = a[k], v2 = b[k];
          if (!isEqualWith(v1, v2, cptor)) {
              return false;
          }
      }
      return true;
  }

  /**
   * 判断两个值是否相等，对于非基本类型会进行深度比较，可以比较日期/正则/数组/对象等
   *
   * @example
   * //false
   * console.log(_.isEqual(1,'1'))
   * //true,false
   * let o = {a:1,b:[2,{c:['3','x']}]}
   * let oo = {a:1,b:[2,{c:['3','x']}]}
   * console.log(_.isEqual(o,oo),o == oo)
   * //true
   * console.log(_.isEqual([new Date('2010-2-1'),/12/],[new Date(1264953600000),new RegExp('12')]))
   * //false
   * console.log(_.isEqual([new Date('2010-2-1'),'abcd'],['2010/2/1','Abcd']))
   *
   * @param a
   * @param b
   * @returns
   * @since 1.0.0
   */
  function isEqual(a, b) {
      return isEqualWith(a, b);
  }

  /**
   * 判断值是不是异常对象
   *
   * @example
   * //true
   * console.log(_.isError(new TypeError))
   * //false
   * console.log(_.isError(Error))
   * //true
   * try{a=b}catch(e){console.log(_.isError(e))}
   *
   * @param v
   * @returns
   * @since 1.0.0
   */
  function isError(v) {
      return typeof v === 'object' && v instanceof Error;
  }

  /**
   * 判断值是不是有限数字
   *
   * @example
   * //false
   * console.log(_.isFinite('0'))
   * //true
   * console.log(_.isFinite(0))
   * //true
   * console.log(_.isFinite(Number.MAX_VALUE))
   * //true
   * console.log(_.isFinite(99999999999999999999999999999999999999999999999999999999999999999999999))
   * //false
   * console.log(_.isFinite(Infinity))
   *
   * @param v
   * @returns
   * @since 1.0.0
   */
  function isFinite(v) {
      return Number.isFinite(v);
  }

  /**
   * 判断值是不是一个Map对象
   *
   * @example
   * //true
   * console.log(_.isMap(new Map()))
   * //false
   * console.log(_.isMap(new WeakMap()))
   *
   * @param v
   * @returns
   */
  function isMap(v) {
      return v instanceof Map;
  }

  /**
   * 检测props对象中的所有属性是否在object中存在并使用自定义比较器对属性值进行对比。可以用于对象的深度对比。
   * 当comparator参数是默认值时，与<code>isMath</code>函数相同
   *
   * @example
   * let target = {a:{x:1,y:2},b:1}
   * //true
   * console.log(_.isMatchWith(target,{b:1}))
   * //false
   * console.log(_.isMatchWith(target,{b:'1'}))
   *
   * target = {a:null,b:0}
   * //true
   * console.log(_.isMatchWith(target,{a:'',b:'0'},(a,b)=>_.isEmpty(a) && _.isEmpty(b)?true:a==b))
   *
   * @param target 如果不是对象类型，返回false
   * @param props 对比属性对象，如果是nil，返回true
   * @param [comparator=eq] 比较器，参数(object[k],props[k],k,object,props)，返回true表示匹配
   * @returns 匹配所有props返回true
   * @since 0.18.1
   */
  function isMatchWith(target, props, comparator = eq$1) {
      if (isNil(props))
          return true;
      const ks = Object.keys(props);
      if (!isObject(target))
          return false;
      let rs = true;
      for (let i = ks.length; i--;) {
          const k = ks[i];
          const v1 = target[k];
          const v2 = props[k];
          if (isObject(v1) && isObject(v2)) {
              if (!isMatchWith(v1, v2, comparator)) {
                  rs = false;
                  break;
              }
          }
          else {
              if (!comparator(v1, v2, k, target, props)) {
                  rs = false;
                  break;
              }
          }
      }
      return rs;
  }

  /**
   * 检测props对象中的所有属性是否在object中存在，可用于对象的深度对比。
   * 使用<code>eq</code>作为值对比逻辑
   *
   * @example
   * let target = {a:{x:1,y:2},b:1}
   * //true
   * console.log(_.isMatch(target,{b:1}))
   * //true
   * console.log(_.isMatch(target,{a:{x:1}}))
   *
   * target = [{x:1,y:2},{b:1}]
   * //true
   * console.log(_.isMatch(target,{1:{b:1}}))
   * //true
   * console.log(_.isMatch(target,[{x:1}]))
   *
   * @param object
   * @param props 对比属性对象，如果是null，返回true
   * @returns 匹配所有props返回true
   * @since 0.17.0
   */
  function isMatch(object, props) {
      return isMatchWith(object, props, eq$1);
  }

  /**
   * 判断值是否NaN本身。与全局isNaN函数相比，只有NaN值本身才会返回true
   * <p>
   * isNaN(undefined) => true <br>
   * _.isNaN(undefined) => false
   * </p>
   *
   * @example
   * //true
   * console.log(_.isNaN(NaN))
   * //false
   * console.log(_.isNaN(null))
   * //false
   * console.log(_.isNaN(undefined))
   *
   * @param v
   * @returns
   */
  function isNaN$1(v) {
      return Number.isNaN(v);
  }

  /**
   * 判断参数是否为null
   *
   * @example
   * //true
   * console.log(_.isNull(null))
   * //false
   * console.log(_.isNull(undefined))
   *
   * @param v
   * @returns
   */
  function isNull(v) {
      return null === v;
  }

  /**
   * 判断参数是否为数字类型值
   *
   * @example
   * //true
   * console.log(_.isNumber(1))
   * //true
   * console.log(_.isNumber(Number.MAX_VALUE))
   * //false
   * console.log(_.isNumber('1'))
   *
   * @param v
   * @returns
   */
  function isNumber(v) {
      return typeof v === 'number' || v instanceof Number;
  }

  /**
   * 判断值是不是一个朴素对象，即通过Object创建的对象
   *
   * @example
   * //false
   * console.log(_.isPlainObject(1))
   * //false
   * console.log(_.isPlainObject(new String()))
   * //true
   * console.log(_.isPlainObject({}))
   * //false
   * console.log(_.isPlainObject(null))
   * //true
   * console.log(_.isPlainObject(new Object))
   * function Obj(){}
   * //false
   * console.log(_.isPlainObject(new Obj))
   *
   * @param v value
   * @returns 是否朴素对象
   * @since 0.19.0
   */
  function isPlainObject(v) {
      return isObject(v) && v.constructor === Object.prototype.constructor;
  }

  /**
   * 判断值是不是一个安全整数
   *
   * @example
   * //true
   * console.log(_.isSafeInteger(-0))
   * //true
   * console.log(_.isSafeInteger(5.0))
   * //false
   * console.log(_.isSafeInteger(5.000000000000001))
   * //true
   * console.log(_.isSafeInteger(5.0000000000000001))
   * //false
   * console.log(_.isSafeInteger('5'))
   * //true
   * console.log(_.isSafeInteger(Number.MAX_SAFE_INTEGER))
   * //false
   * console.log(_.isSafeInteger(Number.MAX_VALUE))
   *
   * @param v
   * @returns
   */
  function isSafeInteger(v) {
      return Number.isSafeInteger(v);
  }

  /**
   * 判断值是不是一个Set对象
   *
   * @example
   * //false
   * console.log(_.isSet(new WeakSet))
   * //true
   * console.log(_.isSet(new Set))
   *
   * @param v
   * @returns
   */
  function isSet(v) {
      return v instanceof Set;
  }

  /**
   * 判断值是不是Symbol
   *
   * @example
   * //true
   * console.log(_.isSymbol(Symbol()))
   *
   * @param v
   * @returns
   * @since 1.0.0
   */
  function isSymbol(v) {
      return typeof v === 'symbol';
  }

  /**
   * 判断参数是否为undefined
   * @example
   * //true
   * console.log(_.isUndefined(undefined))
   * //false
   * console.log(_.isUndefined(null))
   *
   * @param v
   * @returns
   */
  function isUndefined(v) {
      return v === undefined;
  }

  /**
   * 判断值是不是一个WeakMap对象
   *
   * @example
   * //true
   * console.log(_.isWeakMap(new WeakMap))
   * //false
   * console.log(_.isWeakMap(new Map))
   *
   * @param v
   * @returns
   */
  function isWeakMap(v) {
      return v instanceof WeakMap;
  }

  /**
   * 判断值是不是一个WeakSet对象
   *
   * @example
   * //true
   * console.log(_.isWeakSet(new WeakSet))
   * //false
   * console.log(_.isWeakSet(new Set))
   *
   * @param v
   * @returns
   */
  function isWeakSet(v) {
      return v instanceof WeakSet;
  }

  var is = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isArray: isArray,
    isArrayLike: isArrayLike,
    isBlank: isBlank,
    isBoolean: isBoolean,
    isDate: isDate,
    isDefined: isDefined,
    isElement: isElement,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isEqualWith: isEqualWith,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isMap: isMap,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    isNaN: isNaN$1,
    isNil: isNil,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet
  });

  function identity(v) {
      return v;
  }

  function eachSources(target, sources, handler, afterHandler) {
      sources.forEach((src) => {
          if (!isObject(src))
              return;
          Object.keys(src).forEach((k) => {
              let v = src[k];
              if (handler) {
                  v = handler(src[k], target[k], k, src, target);
              }
              afterHandler(v, src[k], target[k], k, src, target);
          });
      });
  }

  function checkTarget(target) {
      if (target === null || target === undefined)
          return {};
      if (!isObject(target))
          return new target.constructor(target);
      if (!Object.isExtensible(target) ||
          Object.isFrozen(target) ||
          Object.isSealed(target)) {
          return target;
      }
  }

  /**
   * 与<code>assign</code>相同，但支持自定义处理器
   *
   * > 该函数会修改目标对象
   *
   * @example
   * //{x: 1, y: '3y', z: null}
   * console.log(_.assignWith({x:1},{y:3,z:4},(sv,tv,k)=>k=='z'?null:sv+k))
   *
   * @param target 目标对象
   * @param sources 源对象，可变参数。最后一个参数为函数时，签名为(src[k],target[k],k,src,target) 自定义赋值处理器，返回赋予target[k]的值
   * @returns 返回target
   */
  function assignWith(target, ...sources) {
      const rs = checkTarget(target);
      if (rs)
          return rs;
      let src = sources;
      const sl = sources.length;
      let handler = src[sl - 1];
      if (!handler || !handler.call) {
          handler = identity;
      }
      else {
          src = src.slice(0, sl - 1);
      }
      eachSources(target, src, handler, (v, sv, tv, k, s, t) => {
          t[k] = v;
      });
      return target;
  }

  /**
   * 将一个或多个源对象的可枚举属性值分配到目标对象。如果源对象有多个，则按照从左到右的顺序依次对target赋值，相同属性会被覆盖
   *
   * > 该函数会修改目标对象
   *
   * <ul>
   *  <li>当目标对象是null/undefined时，返回空对象</li>
   *  <li>当目标对象是基本类型时，返回对应的包装对象</li>
   *  <li>当目标对象是不可扩展/冻结/封闭状态时，返回目标对象</li>
   * </ul>
   * @example
   * //{x:1,y:3}
   * console.log(_.assign({x:1},{y:3}))
   *
   * @param target 目标对象
   * @param  {...object} sources 源对象
   * @returns 返回target
   */
  function assign(target, ...sources) {
      return assignWith(target, ...sources, identity);
  }

  function cloneBuiltInObject(obj) {
      let rs = null;
      if (isDate(obj)) {
          rs = new Date(obj.getTime());
      }
      else if (isBoolean(obj)) {
          rs = Boolean(obj);
      }
      else if (isString(obj)) {
          rs = String(obj);
      }
      else if (isRegExp(obj)) {
          rs = new RegExp(obj);
      }
      return rs;
  }

  /**
   * 浅层复制对象，支持赋值处理器
   * 如果obj是基本类型，返回原值
   * 如果obj是函数类型，返回原值
   *
   * 只复制对象的自身可枚举属性
   *
   * @example
   * //{x: 1, y: 2, z: null}
   * console.log(_.cloneWith({x:1,y:2,z:3},(v,k)=>k=='z'?null:v))
   * //null
   * console.log(_.cloneWith(null))
   *
   * @param obj
   * @param  {Function} [handler=identity] (obj[k],k) 自定义赋值处理器，返回赋予新对象[k]的值
   * @returns 被复制的新对象
   */
  function cloneWith(obj, handler = identity) {
      if (!isObject(obj))
          return obj;
      if (isFunction(obj))
          return obj;
      let copy = cloneBuiltInObject(obj);
      if (copy !== null)
          return copy;
      copy = new obj.constructor();
      return assignWith(copy, obj, (sv, tv, k) => handler(sv, k));
  }

  /**
   * 浅层复制对象
   * 如果是基本类型，返回原值
   * 如果是函数类型，返回原值
   * 只复制对象的自身可枚举属性
   *
   * @example
   * //null
   * console.log(_.clone(null))
   *
   * @param obj
   * @returns 被复制的新对象
   */
  function clone(obj) {
      return cloneWith(obj, identity);
  }

  /**
   * 完整复制对象,可以保持被复制属性的原有类型。支持赋值处理器
   *
   * 如果obj是基本类型，返回原值
   * 如果obj是函数类型，返回原值
   * 只复制对象的自身可枚举属性
   *
   * @example
   * //true
   * console.log(_.cloneDeepWith({d:new Date}).d instanceof Date)
   *
   * @param obj
   * @param handler (obj[k],k,obj) 自定义赋值处理器，返回赋予新对象[k]的值。默认 `identity`
   * @returns 被复制的新对象
   */
  function cloneDeepWith(obj, handler) {
      if (!isObject(obj))
          return obj;
      if (isFunction(obj))
          return obj;
      let copy = cloneBuiltInObject(obj);
      if (copy !== null)
          return copy;
      copy = new obj.constructor();
      const propNames = Object.keys(obj);
      propNames.forEach((p) => {
          let newProp = (handler || identity)(obj[p], p, obj);
          if (isObject(newProp)) {
              newProp = cloneDeepWith(newProp, handler);
          }
          try {
              // maybe unwritable
              ;
              copy[p] = newProp;
          }
          catch (e) { }
      });
      return copy;
  }

  /**
   * 完整复制对象,可以保持被复制属性的原有类型
   *
   * 如果obj是基本类型，返回原值
   * 如果obj是函数类型，返回原值
   * 只复制对象的自身可枚举属性
   *
   * @example
   * //true
   * console.log(_.cloneDeep({d:new Date}).d instanceof Date)
   *
   * @param obj
   * @returns 被复制的新对象
   */
  function cloneDeep(obj) {
      return cloneDeepWith(obj, identity);
  }

  /**
   * 将一个或多个源对象的可枚举属性值分配到目标对象中属性值为undefined的属性上。
   * 如果源对象有多个，则按照从左到右的顺序依次对target赋值，相同属性会被忽略
   *
   * > 该函数会修改目标对象
   *
   * - 当目标对象是null/undefined时，返回空对象
   * - 当目标对象是基本类型时，返回对应的包装对象
   * - 当目标对象是不可扩展/冻结/封闭状态时，返回目标对象
   *
   * @example
   * //{a: 1, b: 2, c: 3}
   * console.log(_.defaults({a:1},{b:2},{c:3,b:1,a:2}))
   *
   * @param target 目标对象
   * @param sources 1-n个源对象
   * @returns 返回target
   * @since 0.21.0
   */
  function defaults(target, ...sources) {
      const rs = checkTarget(target);
      if (rs)
          return rs;
      eachSources(target, sources, null, (v, sv, tv, k, s, t) => {
          if (t[k] === undefined) {
              t[k] = v;
          }
      });
      return target;
  }

  /**
   * 与<code>defaults</code>相同，但会递归对象属性
   *
   * > 该函数会修改目标对象
   *
   * @example
   * //{a: {x: 1, y: 2, z: 3}, b: 2}
   * console.log(_.defaultsDeep({a:{x:1}},{b:2},{a:{x:3,y:2}},{a:{z:3,x:4}}))
   *
   * @param target 目标对象
   * @param sources 1-n个源对象
   * @returns 返回target
   * @since 0.21.0
   */
  function defaultsDeep(target, ...sources) {
      const rs = checkTarget(target);
      if (rs)
          return rs;
      eachSources(target, sources, null, (v, sv, tv, k, s, t) => {
          if (tv === undefined) {
              t[k] = v;
          }
          else if (isObject(tv) && !isFunction(tv)) {
              defaultsDeep(tv, sv);
          }
      });
      return target;
  }

  /**
   * 判断两个值是否相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
   * 算法进行值比较。
   *
   * @example
   * //true
   * console.log(_.eq(NaN,NaN))
   * //false
   * console.log(_.eq(1,'1'))
   *
   * @param a
   * @param b
   * @returns
   * @since 1.0.0
   */
  function eq(a, b) {
      return eq$1(a, b);
  }

  function toPath$1(path) {
      let chain = path;
      if (isArray(chain)) {
          chain = chain.join('.');
      }
      else {
          chain += '';
      }
      const rs = (chain + '')
          .replace(/\[([^\]]+)\]/gm, '.$1')
          .replace(/^\./g, '')
          .split('.');
      return rs;
  }

  /**
   * 通过path获取对象属性值
   *
   * @example
   * //2
   * console.log(_.get([1,2,3],1))
   * //Holyhigh
   * console.log(_.get({a:{b:[{x:'Holyhigh'}]}},['a','b',0,'x']))
   * //Holyhigh2
   * console.log(_.get({a:{b:[{x:'Holyhigh2'}]}},'a.b.0.x'))
   * //Holyhigh
   * console.log(_.get({a:{b:[{x:'Holyhigh'}]}},'a.b[0].x'))
   * //hi
   * console.log(_.get([[null,[null,null,'hi']]],'[0][1][2]'))
   * //not find
   * console.log(_.get({},'a.b[0].x','not find'))
   *
   * @param obj 需要获取属性值的对象，如果obj不是对象(isObject返回false)，则返回defaultValue
   * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
   * @param [defaultValue] 如果path未定义，返回默认值
   * @returns 属性值或默认值
   */
  function get(obj, path, defaultValue) {
      if (!isObject(obj))
          return defaultValue;
      const chain = toPath$1(path);
      let target = obj;
      for (let i = 0; i < chain.length; i++) {
          const seg = chain[i];
          target = target[seg];
          if (!target)
              break;
      }
      if (target === undefined)
          target = defaultValue;
      return target;
  }

  /**
   * 创建一个函数，该函数返回指定对象的path属性值
   * @example
   * const libs = [
   *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:false},
   *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:true},
   *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
   * ];
   * //[true,false,true]
   * console.log(_.map(libs,_.prop('tags.utils')))
   * //nodejs
   * console.log(_.prop(['platform',1])(libs[0]))
   *
   * @param path
   * @returns 接收一个对象作为参数的函数
   * @since 0.17.0
   */
  function prop(path) {
      return (obj) => {
          return get(obj, path);
      };
  }

  /**
   * 解析path并返回数组
   * @example
   * //['a', 'b', '2', 'c']
   * console.log(_.toPath('a.b[2].c'))
   * //['a', 'b', 'c', '1']
   * console.log(_.toPath(['a','b','c[1]']))
   * //['1']
   * console.log(_.toPath(1))
   *
   * @param path 属性路径，可以是数字索引，字符串key，或者多级属性数组
   * @returns path数组
   * @since 0.16.0
   */
  function toPath(path) {
      return toPath$1(path);
  }

  /**
   * 创建一个函数，该函数接收一个对象为参数并返回对该对象使用props进行验证的的断言结果。
   *
   *
   * @example
   * const libs = [
   *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
   *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
   *  {name:'soya2d',platform:['web'],tags:{utils:true},js:false}
   * ];
   *
   * //[{func.js...}]
   * console.log(_.filter(libs,_.matcher({tags:{utils:true},js:true})))
   *
   * @param props 断言条件对象
   * @returns matcher(v)函数
   * @since 0.17.0
   */
  function matcher(props) {
      return (obj) => {
          return isMatch(obj, props);
      };
  }

  function iteratee(value) {
      if (isUndefined(value)) {
          return identity;
      }
      else if (isFunction(value)) {
          return value;
      }
      else if (isString(value)) {
          return prop(value);
      }
      else if (isArray(value)) {
          return prop(toPath(value));
      }
      else if (isObject(value)) {
          return matcher(value);
      }
      return () => false;
  }

  /**
   * 对`object`内的所有属性进行断言并返回第一个匹配的属性key
   *
   * @example
   * const libs = {
   *  'func.js':{platform:['web','nodejs'],tags:{utils:true}},
   *  'juth2':{platform:['web','java'],tags:{utils:false,middleware:true}},
   *  'soya2d':{platform:['web'],tags:{utils:true}}
   * }
   *
   * //func.js 查询对象的key
   * console.log(_.findKey(libs,'tags.utils'))
   * //juth2
   * console.log(_.findKey(libs,{'tags.utils':false}))
   * //tags
   * console.log(_.findKey(libs['soya2d'],'utils'))
   * //2
   * console.log(_.findKey([{a:1,b:2},{c:2},{d:3}],'d'))
   *
   * @param object 所有集合对象array / arrayLike / map / object / ...
   * @param predicate (value[,index|key[,collection]]) 断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @returns 第一个匹配断言的元素的key或undefined
   */
  function findKey(object, predicate) {
      const callback = iteratee(predicate);
      let rs;
      for (let k in object) {
          let v = object[k];
          const r = callback(v, k, object);
          if (r) {
              rs = k;
              break;
          }
      }
      return rs;
  }

  /**
   * <code>toPairs</code>反函数，创建一个由键值对数组组成的对象
   *
   * @example
   * //{a:1,b:2,c:3}
   * console.log(_.fromPairs([['a', 1], ['b', 2], ['c', 3]]))
   *
   * @param pairs 键值对数组
   * @returns 对象
   */
  function fromPairs(pairs) {
      const rs = {};
      for (let k in pairs) {
          let pair = pairs[k];
          rs[pair[0]] = pair[1];
      }
      return rs;
  }

  /**
   * 返回对象中的函数属性key数组
   * @example
   * const funcs = {
   *  a(){},
   *  b(){}
   * };
   * //[a,b]
   * console.log(_.functions(funcs))
   * //[....]
   * console.log(_.functions(_))
   *
   * @param obj
   * @returns 函数名数组
   * @since 0.18.0
   */
  function functions$1(obj) {
      let rs = [];
      for (let k in obj) {
          if (isFunction(obj[k])) {
              rs.push(k);
          }
      }
      return rs;
  }

  /**
   * 检查指定key是否存在于指定的obj中
   *
   * @example
   * //true
   * console.log(_.has({a:12},'a'))
   *
   * @param obj
   * @param key
   * @returns 如果key存在返回true
   */
  function has(obj, key) {
      return obj && obj.hasOwnProperty && obj.hasOwnProperty(key);
  }

  /**
   * 返回对象的所有key数组
   *
   * > 只返回对象的自身可枚举属性
   *
   * @example
   * let f = new Function("this.a=1;this.b=2;");
   * f.prototype.c = 3;
   * //[a,b]
   * console.log(_.keys(new f()))
   *
   * @param obj
   * @returns 对象的key
   */
  function keys(obj) {
      if (obj === null || obj === undefined)
          return [];
      return Object.keys(obj);
  }

  /**
   * 返回对象的所有key数组
   * 包括原型链中的属性key
   *
   * @example
   * let f = new Function("this.a=1;this.b=2;");
   * f.prototype.c = 3;
   * //[a,b,c]
   * console.log(_.keysIn(new f()))
   *
   * @param obj
   * @returns 对象的key
   */
  function keysIn(obj) {
      const rs = [];
      // eslint-disable-next-line guard-for-in
      for (const k in obj) {
          if (k)
              rs.push(k);
      }
      return rs;
  }

  function noop() {
      return undefined;
  }

  /**
   * 返回对象的所有value数组
   * <div class="alert alert-secondary">
        只返回对象的自身可枚举属性
      </div>
   *
   *
   * @example
   * let f = new Function("this.a=1;this.b=2;");
   * f.prototype.c = 3;
   * //[1,2]
   * console.log(_.values(new f()))
   *
   * @param obj
   * @returns 对象根属性对应的值列表
   */
  function values(obj) {
      return keys(obj).map((k) => obj[k]);
  }

  /**
   * 把一个集合对象转为array对象。对于非集合对象，
   * <ul>
   * <li>字符串 - 每个字符都会变成数组的元素</li>
   * <li>其他情况 - 返回包含一个collection元素的数组</li>
   * </ul>
   *
   * @example
   * //[1,2,3]
   * console.log(_.toArray(new Set([1,2,3])))
   * //['a','b','c']
   * console.log(_.toArray('abc'))
   * //[1,2,'b']
   * console.log(_.toArray({x:1,y:2,z:'b'}))
   * //[[1, 'a'], [3, 'b'], ['a', 5]]
   * console.log(_.toArray(new Map([[1,'a'],[3,'b'],['a',5]])))
   *
   * @param collection 如果是Map/Object对象会转换为值列表
   *
   * @returns 转换后的数组对象
   */
  function toArray(collection) {
      if (isArray(collection))
          return collection.concat();
      if (isFunction(collection))
          return [collection];
      if (isSet(collection)) {
          return Array.from(collection);
      }
      else if (isString(collection)) {
          return collection.split('');
      }
      else if (isArrayLike(collection)) {
          return Array.from(collection);
      }
      else if (isMap(collection)) {
          return Array.from(collection.values());
      }
      else if (isObject(collection)) {
          return values(collection);
      }
      return [collection];
  }

  /**
   * 合并数组或值并返回新数组，元素可以重复。基于 `Array.prototype.concat` 实现
   *
   * @example
   * //[a/b/a]
   * console.log(_.concat([{name:'a'},{name:'b'}],[{name:'a'}]))
   * //[1, 2, 3, 1, 2]
   * console.log(_.concat([1,2,3],[1,2]))
   * //[1, 2, 3, 1, 2, null, 0]
   * console.log(_.concat([1,2,3],[1,2],null,0))
   * //[1, 2, 3, 1, 2, doms..., 0, null]
   * console.log(_.concat([1,2,3],[1,2],document.body.children,0,null))
   *
   * @param arrays 1-n个数组对象
   * @returns 如果参数为空，返回空数组
   */
  function concat(...arrays) {
      if (arrays.length < 1)
          return [];
      arrays = arrays.map((alk) => (isArrayLike(alk) ? toArray(alk) : alk));
      return toArray(arrays[0]).concat(...arrays.slice(1));
  }

  /**
   * 与<code>merge</code>相同，但支持自定义处理器
   *
   * > 该函数会修改目标对象
   *
   * @example
   * //{x: 2, y: {a: 2, b: 4, c: 3, d: 27}}
   * console.log(_.mergeWith({x:1,y:{a:1,b:2,c:3}},{x:2,y:{a:2,d:3}},{y:{b:4}},(sv,tv,k)=>k=='d'?sv*9:undefined))
   *
   * @param target 目标对象
   * @param sources 1-n个源对象
   * @param [handler=noop] (src[k],target[k],k,src,target,chain) 自定义赋值处理器，返回赋予target[k]的值
   * @returns 返回target
   * @since 0.22.0
   */
  function mergeWith(target, ...sources) {
      const rs = checkTarget(target);
      if (rs)
          return rs;
      let src = sources;
      const sl = src.length;
      let handler = src[sl - 1];
      if (!isFunction(handler)) {
          handler = noop;
      }
      else {
          src = src.slice(0, sl - 1);
      }
      walkSources(target, src, handler, []);
      return target;
  }
  function walkSources(target, src, handler, stack) {
      eachSources(target, src, null, (v, sv, tv, k, s, t) => {
          const path = concat(stack, k);
          v = handler(sv, tv, k, s, t, path);
          if (v !== undefined) {
              t[k] = v;
          }
          else {
              if (isObject(tv) && !isFunction(tv)) {
                  walkSources(tv, [sv], handler, path);
              }
              else {
                  t[k] = sv;
              }
          }
      });
  }

  /**
   * 类似<code>assign</code>，但会递归源对象的属性合并到目标对象。
   * <br>如果目标对象属性值存在，但对应源对象的属性值为undefined，跳过合并操作。
   * 支持自定义处理器，如果处理器返回值为undefined，启用默认合并。
   * 该函数在对可选配置项与默认配置项进行合并时非常有用
   *
   * > 该函数会修改目标对象
   *
   * - 当目标对象是null/undefined时，返回空对象
   * - 当目标对象是基本类型时，返回对应的包装对象
   * - 当目标对象是不可扩展/冻结/封闭状态时，返回目标对象
   *
   * @example
   * //{x: 0, y: {a: 1, b: 2, c: 3, d: 4}}
   * console.log(_.merge({x:1,y:{a:1,b:2}},{x:2,y:{c:5,d:4}},{x:0,y:{c:3}}))
   * //[{x: 0, y: {a: 1, b: 2, c: 3, d: 4}}]
   * console.log(_.merge([{x:1,y:{a:1,b:2}}],[{x:2,y:{c:5,d:4}}],[{x:0,y:{c:3}}]))
   *
   * @param target 目标对象
   * @param sources 1-n个源对象
   * @returns 返回target
   * @since 0.22.0
   */
  function merge(target, ...sources) {
      return mergeWith(target, ...sources, noop);
  }

  /**
   * 同<code>omit</code>，但支持断言函数进行剔除
   * @example
   * //{c: '3'}
   * console.log(_.omitBy({a:1,b:2,c:'3'},_.isNumber))
   *
   * @param obj 选取对象
   * @param [predicate=identity] (v,k)断言函数
   * @returns 对象子集
   * @since 0.23.0
   */
  function omitBy(obj, predicate) {
      const rs = {};
      if (obj === null || obj === undefined)
          return rs;
      Object.keys(obj).forEach(k => {
          let v = obj[k];
          if (!(predicate || identity)(v, k)) {
              rs[k] = v;
          }
      });
      return rs;
  }

  /**
   * 按照指定的嵌套深度递归遍历数组，并将所有元素与子数组中的元素合并为一个新数组返回
   *
   * @example
   * //[1,2,3,4,5]
   * console.log(_.flat([1,[2,3],[4,5]]))
   * //[1,2,3,4,5,[6,7]]
   * console.log(_.flat([1,[2,3],[4,5,[6,7]]]))
   * //[1,2,3,[4]]
   * console.log(_.flat([1,[2,[3,[4]]]],2))
   * //[1,2,1,3,4]
   * console.log(_.flat(new Set([1,1,[2,[1,[3,4]]]]),Infinity))
   *
   * @param array 数组
   * @param [depth=1] 嵌套深度
   * @returns 扁平化后的新数组
   */
  function flat(array, depth = 1) {
      if (depth < 1)
          return array.concat();
      const rs = toArray(array).reduce((acc, val) => {
          return acc.concat(Array.isArray(val) && depth > 0 ? flat(val, depth - 1) : val);
      }, []);
      return rs;
  }

  /**
   * 无限深度遍历数组，并将所有元素与子数组中的元素合并为一个新数组返回
   *
   * @example
   * //[1,2,1,3,4]
   * console.log(_.flatDeep(new Set([1,1,[2,[1,[3,4]]]])))
   * //[1,2,3,4]
   * console.log(_.flatDeep([1,[2,[3,[4]]]]))
   *
   * @param array 数组
   * @returns 扁平化后的新数组
   */
  function flatDeep(array) {
      return flat(array, Infinity);
  }

  /**
   * 创建一个剔除指定属性的对象子集并返回。与pick()刚好相反
   * @example
   * //{a: 1, c: '3'}
   * console.log(_.omit({a:1,b:2,c:'3'},'b'))
   * //{a: 1}
   * console.log(_.omit({a:1,b:2,c:'3'},'b','c'))
   * //{c: '3'}
   * console.log(_.omit({a:1,b:2,c:'3'},['b','a']))
   *
   * @param obj 选取对象
   * @param props 属性集合
   * @returns 对象子集
   * @since 0.16.0
   */
  function omit(obj, ...props) {
      const keys = flatDeep(props);
      return omitBy(obj, (v, k) => {
          return keys.includes(k);
      });
  }

  /**
   * 同<code>pick</code>，但支持断言函数进行选取
   * @example
   * //{a: 1, b: 2}
   * console.log(_.pickBy({a:1,b:2,c:'3'},_.isNumber))
   *
   * @param obj 选取对象
   * @param [predicate=identity] (v,k)断言函数
   * @returns 对象子集
   * @since 0.23.0
   */
  function pickBy(obj, predicate) {
      const rs = {};
      if (obj === null || obj === undefined)
          return rs;
      Object.keys(obj).forEach(k => {
          let v = obj[k];
          if ((predicate || identity)(v, k)) {
              rs[k] = v;
          }
      });
      return rs;
  }

  function _eachIterator(collection, callback, forRight) {
      let values;
      let keys;
      if (isString(collection) || isArrayLike(collection)) {
          let size = collection.length;
          if (forRight) {
              while (size--) {
                  const r = callback(collection[size], size, collection);
                  if (r === false)
                      return;
              }
          }
          else {
              for (let i = 0; i < size; i++) {
                  const r = callback(collection[i], i, collection);
                  if (r === false)
                      return;
              }
          }
      }
      else if (isSet(collection)) {
          let size = collection.size;
          if (forRight) {
              values = Array.from(collection);
              while (size--) {
                  const r = callback(values[size], size, collection);
                  if (r === false)
                      return;
              }
          }
          else {
              values = collection.values();
              for (let i = 0; i < size; i++) {
                  const r = callback(values.next().value, i, collection);
                  if (r === false)
                      return;
              }
          }
      }
      else if (isMap(collection)) {
          let size = collection.size;
          keys = collection.keys();
          values = collection.values();
          if (forRight) {
              keys = Array.from(keys);
              values = Array.from(values);
              while (size--) {
                  const r = callback(values[size], keys[size], collection);
                  if (r === false)
                      return;
              }
          }
          else {
              for (let i = 0; i < size; i++) {
                  const r = callback(values.next().value, keys.next().value, collection);
                  if (r === false)
                      return;
              }
          }
      }
      else if (isObject(collection)) {
          keys = Object.keys(collection);
          let size = keys.length;
          if (forRight) {
              while (size--) {
                  const k = keys[size];
                  const r = callback(collection[k], k, collection);
                  if (r === false)
                      return;
              }
          }
          else {
              for (let i = 0; i < size; i++) {
                  const k = keys[i];
                  const r = callback(collection[k], k, collection);
                  if (r === false)
                      return;
              }
          }
      }
  }

  function each(collection, callback) {
      _eachIterator(collection, callback, false);
  }

  /**
   * 对数组进行切片，并返回切片后的新数组，原数组不变。新数组内容是对原数组内容的浅拷贝
   *
   * @example
   * //[2,3,4]
   * console.log(_.slice([1,2,3,4,5],1,4))
   * //[2,3,4,5]
   * console.log(_.slice([1,2,3,4,5],1))
   *
   *
   * @param array 数组
   * @param [begin=0] 切片起始下标，包含下标位置元素
   * @param [end] 切片结束下标，<b>不包含</b>下标位置元素
   * @returns 切片元素组成的新数组
   */
  function slice(array, begin, end) {
      return toArray(array).slice(begin || 0, end);
  }

  /**
   * 判断集合中是否包含给定的值。使用<code>eq</code>函数进行等值判断。
   *
   * @example
   * //true
   * console.log(_.includes({a:1,b:2},2))
   * //false
   * console.log(_.includes([1,3,5,7,[2]],2))
   * //true
   * console.log(_.includes([1,3,5,7,[2]],3))
   * //false
   * console.log(_.includes([1,3,5,7,[2]],3,2))
   * //true
   * console.log(_.includes([0,null,undefined,NaN],NaN))
   * //true
   * console.log(_.includes('abcdefg','abc'))
   * //false
   * console.log(_.includes('abcdefg','abc',2))
   * //false
   * console.log(_.includes('aBcDeFg','abc'))
   *
   * @param collection 如果集合是map/object对象，则只对value进行比对
   * @param value
   * @param [fromIndex=0] 从集合的fromIndex 索引处开始查找。如果集合是map/object对象，无效
   * @returns 如果包含返回true否则返回false
   */
  function includes(collection, value, fromIndex) {
      let rs = false;
      fromIndex = fromIndex || 0;
      if (isString(collection)) {
          return collection.includes(value, fromIndex);
      }
      collection = isArrayLike(collection)
          ? slice(collection, fromIndex)
          : collection;
      each(collection, (v) => {
          if (eq$1(v, value)) {
              rs = true;
              return false;
          }
      });
      return rs;
  }

  /**
   * 创建一个指定属性的对象子集并返回
   * @example
   * //{b: 2}
   * console.log(_.pick({a:1,b:2,c:'3'},'b'))
   * //{b: 2,c:'3'}
   * console.log(_.pick({a:1,b:2,c:'3'},'b','c'))
   * //{a: 1, b: 2}
   * console.log(_.pick({a:1,b:2,c:'3'},['b','a']))
   *
   * @param obj 选取对象
   * @param props 属性集合
   * @returns 对象子集
   * @since 0.16.0
   */
  function pick(obj, ...props) {
      const keys = flatDeep(props);
      return pickBy(obj, (v, k) => {
          return includes(keys, k);
      });
  }

  /**
   * 通过path设置对象属性值。如果路径不存在则创建，索引会创建数组，属性会创建对象
   * <div class="alert alert-secondary">
        该函数会修改源对象
      </div>

      @example
   * //{"a":1,"b":{"c":[undefined,{"x":10}]}}
   * console.log(_.set({a:1},'b.c.1.x',10))
   *
   * @param obj 需要设置属性值的对象，如果obj不是对象(isObject返回false)，直接返回obj
   * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
   * @param value 任何值
   * @returns obj 修改后的源对象
   * @since 0.16.0
   */
  function set(obj, path, value) {
      if (!isObject(obj))
          return obj;
      const chain = toPath$1(path);
      let target = obj;
      for (let i = 0; i < chain.length; i++) {
          const seg = chain[i];
          const nextSeg = chain[i + 1];
          let tmp = target[seg];
          if (nextSeg) {
              tmp = target[seg] = !tmp ? (isNaN(nextSeg) ? {} : []) : tmp;
          }
          else {
              target[seg] = value;
              break;
          }
          target = tmp;
      }
      return obj;
  }

  /**
   * 解析传递参数并返回一个根据参数值创建的Object实例。
   * 支持数组对、k/v对、对象、混合方式等创建
   * 是 toPairs 的反函数
   *
   * @example
   * //{a:1,b:2}
   * console.log(_.toObject('a',1,'b',2))
   * //如果参数没有成对匹配，最后一个属性值则为undefined
   * //{a:1,b:2,c:undefined}
   * console.log(_.toObject('a',1,'b',2,'c'))
   * //{a:1,b:4,c:3} 重复属性会覆盖
   * console.log(_.toObject(['a',1,'b',2],['c',3],['b',4]))
   * //{a:1,b:2} 对象类型返回clone
   * console.log(_.toObject({a:1,b:2}))
   * //{1:now time,a:{}} 混合方式
   * console.log(_.toObject([1,new Date],'a',{}))
   *
   * @param vals 对象创建参数，可以是一个数组/对象或者多个成对匹配的基本类型或者多个不定的数组/对象
   * @returns 如果没有参数返回空对象
   */
  function toObject(...vals) {
      if (vals.length === 0)
          return {};
      const rs = {};
      const pairs = []; // 存放k/v
      let key = null;
      vals.forEach((v) => {
          if (isArray(v)) {
              const tmp = toObject(...v);
              assign(rs, tmp);
          }
          else if (isObject(v)) {
              if (key) {
                  pairs.push(key, v);
                  key = null;
              }
              else {
                  assign(rs, v);
              }
          }
          else {
              if (key) {
                  pairs.push(key, v);
                  key = null;
              }
              else {
                  key = v;
              }
          }
      });
      if (key) {
          pairs.push(key);
      }
      if (pairs.length > 0) {
          for (let i = 0; i < pairs.length; i += 2) {
              rs[pairs[i]] = pairs[i + 1];
          }
      }
      return rs;
  }

  /**
   * 返回指定对象的所有[key,value]组成的二维数组
   *
   * @example
   * //[['a', 1], ['b', 2], ['c', 3]]
   * console.log(_.toPairs({a:1,b:2,c:3}))
   *
   * @param obj
   * @returns 二维数组
   */
  function toPairs(obj) {
      const rs = [];
      for (let k in obj) {
          let v = obj[k];
          rs.push([k, v]);
      }
      return rs;
  }

  /**
   * 删除obj上path路径对应属性
   * @param obj 需要设置属性值的对象，如果obj不是对象(isObject返回false)，直接返回obj
   * @param path 属性路径，可以是索引数字，字符串key，或者多级属性数组
   * @since 1.0.0
   * @returns 成功返回true，失败或路径不存在返回false
   */
  function unset(obj, path) {
      if (!isObject(obj))
          return obj;
      const chain = toPath$1(path);
      let target = obj;
      for (let i = 0; i < chain.length; i++) {
          const seg = chain[i];
          const nextSeg = chain[i + 1];
          let tmp = target[seg];
          if (nextSeg) {
              tmp = target[seg] = !tmp ? (isNaN(nextSeg) ? {} : []) : tmp;
          }
          else {
              return delete target[seg];
          }
          target = tmp;
      }
      return false;
  }

  /**
   * 返回对象的所有value数组
   * 包括原型链中的属性
   *
   * @example
   * let f = new Function("this.a=1;this.b=2;");
   * f.prototype.c = 3;
   * //[1,2,3]
   * console.log(_.valuesIn(new f()))
   *
   * @param obj
   * @returns 对象根属性对应的值列表
   */
  function valuesIn(obj) {
      return keysIn(obj).map((k) => obj[k]);
  }

  var object = /*#__PURE__*/Object.freeze({
    __proto__: null,
    assign: assign,
    assignWith: assignWith,
    clone: clone,
    cloneDeep: cloneDeep,
    cloneDeepWith: cloneDeepWith,
    cloneWith: cloneWith,
    defaults: defaults,
    defaultsDeep: defaultsDeep,
    eq: eq,
    findKey: findKey,
    fromPairs: fromPairs,
    functions: functions$1,
    get: get,
    has: has,
    keys: keys,
    keysIn: keysIn,
    merge: merge,
    mergeWith: mergeWith,
    omit: omit,
    omitBy: omitBy,
    pick: pick,
    pickBy: pickBy,
    prop: prop,
    set: set,
    toObject: toObject,
    toPairs: toPairs,
    unset: unset,
    values: values,
    valuesIn: valuesIn
  });

  function countBy(collection, itee) {
      const stat = {};
      const cb = iteratee(itee || identity);
      each(collection, (el) => {
          const key = cb(el);
          if (stat[key] === undefined)
              stat[key] = 0;
          stat[key]++;
      });
      return stat;
  }

  function eachRight(collection, callback) {
      _eachIterator(collection, callback, true);
  }

  function every(collection, predicate) {
      let rs = true;
      const callback = iteratee(predicate);
      each(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (!r) {
              rs = false;
              return false;
          }
      });
      return rs;
  }

  function filter(collection, predicate) {
      const rs = [];
      const callback = iteratee(predicate);
      each(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (r) {
              rs.push(v);
          }
      });
      return rs;
  }

  function find(collection, predicate) {
      const callback = iteratee(predicate);
      let rs;
      each(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (r) {
              rs = v;
              return false;
          }
      });
      return rs;
  }

  function findLast(collection, predicate) {
      const callback = iteratee(predicate);
      let rs;
      eachRight(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (r) {
              rs = v;
              return false;
          }
      });
      return rs;
  }

  function map(collection, itee) {
      const rs = [];
      const cb = iteratee(itee);
      each(collection, (v, k, c) => {
          const r = cb(v, k, c);
          rs.push(r);
      });
      return rs;
  }

  function flatMap(collection, itee, depth) {
      return flat(map(collection, itee), depth || 1);
  }

  function flatMapDeep(collection, itee) {
      return flatMap(collection, itee, Infinity);
  }

  /**
   * 创建一个统计对象，对象的key是iteratee返回的值，对应的值是由所有key对应值组成的数组
   * @example
   * //{true: [1, 3, 5, 7, 9], false: ['a', 'b', 'c', 'd']}
   * console.log(_.groupBy([1,'a',3,'b',5,'c',7,'d',9],_.isNumber))
   * const users = [
   *  {name:'zhangsan',sex:'m',age:33},
   *  {name:'lisi',sex:'f',age:21},
   *  {name:'wangwu',sex:'m',age:25},
   *  {name:'zhaoliu',sex:'m',age:44},
   * ]
   * //{m: [{...},{...},{...}], f: [{...}]} 性别分布统计
   * console.log(_.groupBy(users,u=>u.sex))
   * //{20: [{...},{...}], 30: [{...}], 40: [{...}]} 年龄段分布统计
   * console.log(_.groupBy(users,u=>(u.age/10>>0)*10))
   *
   * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
   * @param [iteratee=identity] (value)回调函数，返回统计key
   * @returns 统计对象
   * @since 1.0.0
   */
  function groupBy(collection, itee) {
      const stat = {};
      const cb = iteratee(itee || identity);
      each(collection, (el) => {
          const key = cb(el);
          if (stat[key] === undefined)
              stat[key] = [];
          stat[key].push(el);
      });
      return stat;
  }

  function keyBy(collection, itee) {
      const stat = {};
      const cb = iteratee(itee || identity);
      each(collection, (el) => {
          const key = cb(el);
          stat[key] = el;
      });
      return stat;
  }

  function partition(collection, predicate) {
      const matched = [];
      const mismatched = [];
      const callback = iteratee(predicate);
      each(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (r) {
              matched.push(v);
          }
          else {
              mismatched.push(v);
          }
      });
      return [matched, mismatched];
  }

  /**
   * 对集合中的每个元素执行一次reducer函数，并将其结果汇总为单个值返回。
   * <p>
   * 如果没有提供initialValue，reduce 会从集合索引1开始执行 callback 方法。如果提供initialValue则从索引0开始。
   * </p>
   * <p>
   * 注意，对于Object类型的对象，如果未提供initialValue，则accumulator会是索引0元素的value，而不是key
   * </p>
   *
   * @example
   * //25
   * console.log(_.reduce([1,3,5,7,9],(a,v)=>a+v))
   * //35
   * console.log(_.reduce([1,3,5,7,9],(a,v)=>a+v,10))
   * //x-y-z
   * console.log(_.reduce({x:1,y:2,z:3},(a,v,k)=>a+'-'+k,'').substr(1))
   *
   * @param collection
   * @param callback (accumulator,value[,key|index[,collection]]);reducer函数
   * @param [initialValue] 第一次调用 callback函数时的第一个参数的值
   * @returns 汇总值
   */
  function reduce(collection, callback, initialValue) {
      let accumulator = initialValue;
      let hasInitVal = initialValue !== undefined;
      each(collection, (v, k, c) => {
          if (hasInitVal) {
              accumulator = callback(accumulator, v, k, c);
          }
          else {
              accumulator = v;
              hasInitVal = true;
          }
      });
      return accumulator;
  }

  function reject(collection, predicate) {
      const rs = [];
      const callback = iteratee(predicate);
      each(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (!r) {
              rs.push(v);
          }
      });
      return rs;
  }

  function randi(min, max) {
      let maxNum = max || min;
      if (max === undefined) {
          min = 0;
      }
      maxNum >>= 0;
      min >>= 0;
      return (Math.random() * (maxNum - min) + min) >> 0;
  }

  /**
   * 返回对指定列表的唯一随机采样结果
   * @example
   * //随机值
   * console.log(_.sample([1,2,3,4,5,6,7,8,9,0]))
   * //随机值
   * console.log(_.sample({a:1,b:2,c:3,d:4,e:5}))
   *
   * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
   * @returns 采样结果
   * @since 0.16.0
   */
  function sample(collection) {
      const ary = toArray(collection);
      return ary[randi(ary.length)];
  }

  function range(start = 0, end, step) {
      let startNum = 0;
      let endNum = 0;
      let stepNum = 1;
      if (isNumber(start) && isUndefined(end) && isUndefined(step)) {
          endNum = start >> 0;
      }
      else if (isNumber(start) && isNumber(end) && isUndefined(step)) {
          startNum = start >> 0;
          endNum = end >> 0;
      }
      else if (isNumber(start) && isNumber(end) && isNumber(step)) {
          startNum = start >> 0;
          endNum = end >> 0;
          stepNum = step || 1;
      }
      const rs = Array(Math.round(Math.abs(endNum - startNum) / stepNum));
      let rsIndex = 0;
      if (endNum > startNum) {
          for (let i = startNum; i < endNum; i += stepNum) {
              rs[rsIndex++] = i;
          }
      }
      else if (endNum < startNum) {
          for (let i = startNum; i > endNum; i -= stepNum) {
              rs[rsIndex++] = i;
          }
      }
      return rs;
  }

  /**
   * 删除数组末尾或指定索引的一个元素并返回被删除的元素
   *
   * > 该函数会修改原数组
   *
   * @example
   * //3, [1, 2]
   * let ary = [1,2,3];
   * console.log(_.pop(ary),ary)
   * //{a: 1}, [{"a":2},{"a":3}]
   * ary = [{a:1},{a:2},{a:3}];
   * console.log(_.pop(ary,0),ary)
   *
   * @param array 数组对象。如果非数组类型会直接返回null
   * @param [index=-1] 要删除元素的索引。默认删除最后一个元素
   * @returns 被删除的值或null
   */
  function pop(array, index) {
      index = index || -1;
      let rs = null;
      if (isArray(array)) {
          const i = toNumber(index);
          if (i > -1) {
              rs = array.splice(i, 1);
              if (rs.length < 1)
                  rs = null;
              else {
                  rs = rs[0];
              }
          }
          else {
              rs = array.pop();
          }
      }
      return rs;
  }

  /**
   * 返回对指定列表的指定数量随机采样结果
   * @example
   * //[随机值]
   * console.log(_.sampleSize([1,2,3,4,5,6,7,8,9,0]))
   * //[随机值1,随机值2]
   * console.log(_.sampleSize([{a:1},{b:2},{c:3},{d:4},{e:5}],2))
   *
   * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
   * @param [count=1] 采样数量
   * @returns 采样结果
   * @since 0.16.0
   */
  function sampleSize(collection, count) {
      count = count || 1;
      const ary = toArray(collection);
      const seeds = range(0, ary.length);
      const ks = [];
      while (seeds.length > 0) {
          if (count-- < 1)
              break;
          const i = pop(seeds, randi(seeds.length));
          if (i)
              ks.push(i);
      }
      const rs = map(ks, (v) => ary[v]);
      return rs;
  }

  /**
   * 获取集合对象的内容数量，对于map/object对象获取的是键/值对的数量
   *
   * @example
   * //3
   * console.log(_.size({a:1,b:2,c:{x:1}}))
   * //0
   * console.log(_.size(null))
   * //3
   * console.log(_.size(new Set([1,2,3])))
   * //2
   * console.log(_.size([1,[2,[3]]]))
   * //2
   * console.log(_.size(document.body.children))
   * //4
   * console.log(_.size(document.body.childNodes))
   * //3 arguments已不推荐使用，请使用Rest参数
   * console.log((function(){return _.size(arguments)})('a',2,'b'))
   * //7
   * console.log(_.size('func.js'))
   *
   * @param collection
   * @returns 集合长度，对于null/undefined/WeakMap/WeakSet返回0
   */
  function size(collection) {
      if (isNil(collection))
          return 0;
      if ((collection.length))
          return collection.length;
      if (isMap(collection) || isSet(collection))
          return collection.size;
      if (isObject(collection))
          return Object.keys(collection).length;
      return 0;
  }

  /**
   * 返回指定数组的一个随机乱序副本
   * @example
   * //[随机内容]
   * console.log(_.shuffle([1,2,3,4,5,6,7,8,9,0]))
   * //[随机内容]
   * console.log(_.shuffle([{a:1},{a:2},{a:3},{a:4},{a:5}]))
   * //[随机内容]
   * console.log(_.shuffle({a:1,b:2,c:3,d:4,e:5}))
   *
   * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
   * @returns 乱序副本
   * @since 0.16.0
   */
  function shuffle(collection) {
      return sampleSize(collection, size(collection));
  }

  function some(collection, predicate) {
      let rs = false;
      const callback = iteratee(predicate || (() => true));
      each(collection, (v, k, c) => {
          const r = callback(v, k, c);
          if (r) {
              rs = true;
              return false;
          }
      });
      return rs;
  }

  function sortBy(collection, itee) {
      if (size(collection) < 1)
          return [];
      const cb = iteratee(itee || identity);
      let i = 0;
      const list = map(collection, (v, k) => {
          return {
              src: v,
              index: i++,
              value: cb(v, k),
          };
      });
      const comparator = getComparator(list[0].value);
      return map(list.sort((a, b) => !eq$1(a.value, b.value) ? comparator(a.value, b.value) : a.index - b.index), (item) => item.src);
  }
  // comparators
  const compareNumAsc = (a, b) => {
      if (isNil(a) || !isNumber(a))
          return 1;
      if (isNil(b) || !isNumber(b))
          return -1;
      return a - b;
  };
  const compareStrAsc = (a, b) => {
      if (isNil(a))
          return 1;
      if (isNil(b))
          return -1;
      return toString(a).localeCompare(toString(b));
  };
  const compareDateAsc = (a, b) => {
      if (isNil(a))
          return 1;
      if (isNil(b))
          return -1;
      return compareDate(a, b);
  };
  // eslint-disable-next-line require-jsdoc
  function getComparator(el) {
      let comparator;
      if (isNumber(el)) {
          comparator = compareNumAsc;
      }
      else if (isDate(el)) {
          comparator = compareDateAsc;
      }
      else {
          comparator = compareStrAsc;
      }
      return comparator;
  }

  /**
   * 对集合进行排序，并返回排序后的数组副本。
   *
   * @example
   * //字符排序 ['lao1', 'lao2', 'lao3']
   * console.log(_.sort(['lao1','lao3','lao2']))
   * //数字排序[7, 9, 80]
   * console.log(_.sort([9,80,7]))
   * //日期排序["3/1/2019", "2020/1/1", Wed Apr 01 2020...]
   * console.log(_.sort([new Date(2020,3,1),'2020/1/1','3/1/2019']))
   * //第一个元素不是日期对象，需要转换
   * console.log(_.sort(_.map(['2020/1/1',new Date(2020,3,1),'3/1/2019'],v=>new Date(v))))
   * //对象排序
   * const users = [
   *  {name:'zhangsan',age:53},
   *  {name:'lisi',age:44},
   *  {name:'wangwu',age:25},
   *  {name:'zhaoliu',age:36}
   * ];
   * //[25,36,44,53]
   * console.log(_.sort(users,(a,b)=>a.age-b.age))
   * // 倒排
   * console.log(_.sort(users,(a,b)=>b.age-a.age))
   *
   * @param collection 任何可遍历的集合类型，比如array / arraylike / set / map / object / ...
   * @param [comparator] (a,b) 排序函数，如果为空使用sortBy逻辑
   * @returns 排序后的数组
   */
  function sort(collection, comparator) {
      const ary = toArray(collection);
      if (ary.length < 1)
          return ary;
      if (isFunction(comparator)) {
          return ary.sort(comparator);
      }
      else {
          return sortBy(collection);
      }
  }

  var collection = /*#__PURE__*/Object.freeze({
    __proto__: null,
    countBy: countBy,
    each: each,
    eachRight: eachRight,
    every: every,
    filter: filter,
    find: find,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    groupBy: groupBy,
    includes: includes,
    keyBy: keyBy,
    map: map,
    partition: partition,
    reduce: reduce,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    shuffle: shuffle,
    size: size,
    some: some,
    sort: sort,
    sortBy: sortBy,
    toArray: toArray
  });

  /**
   * 向数组末尾追加一个或多个元素并返回
   *
   * > 该函数会修改原数组
   *
   * @example
   * //[1, 2, 3, 4]
   * let ary = [1,2];
   * _.append(ary,3,4);
   * console.log(ary);
   * //[1, 2, Array(2), 5]
   * ary = [1,2];
   * _.append(ary,[3,4],5);
   * console.log(ary);
   * //[1, 2, 3, 4]
   * ary = [1,2];
   * _.append(ary,...[3,4]);
   * console.log(ary);
   *
   * @param array 数组对象。如果非数组类型会自动转为数组
   * @param values 1-n个需要插入列表的值
   * @returns 插入值后的数组对象
   */
  function append(array, ...values) {
      const rs = isArray(array) ? array : toArray(array);
      rs.push(...values);
      return rs;
  }

  /**
   * 把指定数组拆分成多个长度为size的子数组，并返回子数组组成的二维数组
   * @example
   * //[[1,2],[3,4]]
   * console.log(_.chunk([1,2,3,4],2))
   * //[[1,2,3],[4]]
   * console.log(_.chunk([1,2,3,4],3))
   *
   * @param array 数组对象。如果非数组类型会转成数组
   * @param [size=1] 子数组长度
   * @returns 拆分后的新数组
   * @since 0.23.0
   */
  function chunk(array, size = 1) {
      const ary = toArray(array);
      const sizeNum = (size || 1) >> 0;
      const rs = [];
      ary.forEach((v, i) => {
          if (i % sizeNum == 0) {
              rs.push(ary.slice(i, i + sizeNum));
          }
      });
      return rs;
  }

  /**
   * 对集合内的假值进行剔除，并返回剔除后的新数组。假值包括 null/undefined/NaN/0/''/false
   * @example
   * //[1,2,4,'a','1']
   * console.log(_.compact([0,1,false,2,4,undefined,'a','1','',null]))
   *
   * @param array 数组
   * @returns 转换后的新数组对象
   */
  function compact(array) {
      return toArray(array).filter(identity);
  }

  /**
   * 对所有集合做差集并返回差集元素组成的新数组
   *
   * @example
   * //[1]
   * console.log(_.except([1,2,3],[2,3]))
   * //[1,4]
   * console.log(_.except([1,2,3],[2,3],[3,2,1,4]))
   * //[{name: "b"}]
   * console.log(_.except([{name:'a'},{name:'b'}],[{name:'a'}],v=>v.name))
   * //[2, 3, "2", "3"] '2'和2不相等
   * console.log(_.except([1,2,3],[1,'2',3],[2,'3',1]))
   *
   * @param [arrays] 1-n个数组或arraylike对象，非arraylike参数会被忽略
   * @param [identifier] (v);标识函数，用来对每个元素返回唯一标识，标识相同的值会认为相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
   * 算法进行值比较。如果为空，直接使用值自身比较
   * @returns 差集元素组成的新数组
   */
  function except(...params) {
      let comparator;
      let list = params;
      const sl = params.length;
      if (sl > 2) {
          const lp = params[sl - 1];
          if (isFunction(lp)) {
              comparator = lp;
              list = params.slice(0, params.length - 1);
          }
      }
      list = list.filter((v) => isArrayLike(v) || isArray(v));
      if (list.length < 1)
          return list;
      const len = list.length;
      const kvMap = new Map();
      // 遍历所有元素
      for (let j = 0; j < len; j++) {
          const ary = list[j];
          const localMap = new Map();
          for (let i = 0; i < ary.length; i++) {
              const v = ary[i];
              const id = comparator ? comparator(v) : v;
              if (!kvMap.get(id)) {
                  // 防止组内重复
                  kvMap.set(id, { i: 0, v: v });
              }
              if (kvMap.get(id) && !localMap.get(id)) {
                  kvMap.get(id).i++;
                  // 相同id本组内不再匹配
                  localMap.set(id, true);
              }
          }
      }
      const rs = [];
      each(kvMap, (v) => {
          if (v.i < len) {
              rs.push(v.v);
          }
      });
      return rs;
  }

  /**
   * 使用固定值填充arrayLike中从起始索引到终止索引内的全部元素
   *
   * @example
   * //[6, 6, 6]
   * console.log(_.fill(new Array(3), 6))
   * //[1, 'x', 'x', 'x', 5]
   * console.log(_.fill([1, 2, 3, 4, 5], 'x', 1, 4))
   *
   * @param array 数组
   * @param value 填充值
   * @param [start=0] 起始索引，包含
   * @param [end] 终止索引，不包含
   * @returns 填充后的新数组
   */
  function fill(array, value, start = 0, end) {
      const rs = toArray(array);
      rs.fill(value, start, end);
      return rs;
  }

  /**
   * 对集合内的所有元素进行断言并返回第一个匹配的元素索引
   *
   * @example
   * //3 查询数组的索引
   * console.log(_.findIndex(['a','b','c',1,3,6],_.isNumber))
   * //0
   * console.log(_.findIndex([{a:1},{a:2},{a:3}],'a'))
   * //2
   * console.log(_.findIndex([{a:1},{a:2},{a:3}],{a:3}))
   *
   * @param array 数组
   * @param predicate (value[,index[,array]]);断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @param fromIndex 从0开始的起始索引，设置该参数可以减少实际遍历次数。默认0
   * @returns 第一个匹配断言的元素索引或-1
   */
  function findIndex(array, predicate, fromIndex) {
      let rs = -1;
      let fromIndexNum = fromIndex || 0;
      const itee = iteratee(predicate);
      each(slice(array, fromIndexNum), (v, k, c) => {
          const r = itee(v, k, c);
          if (r) {
              rs = k + fromIndexNum;
              return false;
          }
      });
      return rs;
  }

  /**
   * 对集合内的所有元素进行断言并返回最后一个匹配的元素索引
   *
   * @example
   * //5 查询数组的索引
   * console.log(_.findLastIndex(['a','b','c',1,3,6],_.isNumber))
   * //2
   * console.log(_.findLastIndex([{a:1},{a:2},{a:3}],'a'))
   *
   * @param array arrayLike对象及set对象
   * @param predicate (value[,index[,array]]);断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @param [fromIndex=array.length - 1] 从集合长度-1开始的起始索引。设置该参数可以减少实际遍历次数
   * @returns 最后一个匹配断言的元素索引或-1
   * @since 0.19.0
   */
  function findLastIndex(array, predicate, fromIndex) {
      let rs = -1;
      let fromIndexNum = fromIndex || 0;
      const itee = iteratee(predicate);
      if (fromIndex === undefined) {
          fromIndexNum = size(array) - 1;
      }
      eachRight(slice(array, 0, fromIndexNum + 1), (v, k, c) => {
          const r = itee(v, k, c);
          if (r) {
              rs = k;
              return false;
          }
      });
      return rs;
  }

  /**
   * 获取数组中的第一个元素
   *
   * @example
   * //1
   * console.log(_.first([1,2,3]))
   * //"1"
   * console.log(_.first(new Set(['1',1])))
   *
   * @param array 数组
   * @returns 数组中第一个元素
   */
  function first(array) {
      return toArray(array)[0];
  }

  /**
   * 返回除最后一个元素外的所有元素组成的新数组
   *
   * @example
   * //[1, 2]
   * console.log(_.initial([1, 2, 3]))
   *
   * @param array 数组
   * @returns 新数组
   * @since 0.19.0
   */
  function initial(array) {
      return array.slice(0, array.length - 1);
  }

  /**
   * 向数组中指定位置插入一个或多个元素并返回
   *
   * > 该函数会修改原数组
   *
   * @example
   * //[1, 2, Array(1), 'a', 3, 4]
   * let ary = [1,2,3,4];
   * _.insert(ary,2,[1],'a');
   * console.log(ary);
   * //[1, 2, 3, 4]
   * ary = [3,4];
   * _.insert(ary,0,1,2);
   * console.log(ary);
   * //func.js
   * console.log(_.insert('funcjs',4,'.').join(''));
   *
   * @param array 数组对象。如果非数组类型会自动转为数组
   * @param index 插入位置索引，0 - 列表长度
   * @param values 1-n个需要插入列表的值
   * @returns 插入值后的数组对象
   */
  function insert(array, index, ...values) {
      const rs = isArray(array) ? array : toArray(array);
      if (!isNumber(index) || index < 0)
          index = 0;
      rs.splice(index, 0, ...values);
      return rs;
  }

  /**
   * 对所有集合做交集并返回交集元素组成的新数组
   * <p>
   * 关于算法性能可以查看文章<a href="https://www.jianshu.com/p/aa131d573575" target="_holyhigh">《如何实现高性能集合操作(intersect)》</a>
   * </p>
   *
   * @example
   * //[2]
   * console.log(_.intersect([1,2,3],[2,3],[1,2]))
   * //[3]
   * console.log(_.intersect([1,1,2,2,3],[1,2,3,4,4,4],[3,3,3,3,3,3]))
   * //[{name: "a"}] 最后一个参数是函数时作为标识函数
   * console.log(_.intersect([{name:'a'},{name:'b'}],[{name:'a'}],v=>v.name))
   * //[]
   * console.log(_.intersect())
   * //[3] 第三个参数被忽略，然后求交集
   * console.log(_.intersect([1,2,3],[3],undefined))
   * //[1] "2"和2不相同，3和"3"不相同
   * console.log(_.intersect([1,2,3],[1,'2',3],[2,'3',1]))
   *
   * @param [arrays] 1-n个数组或arraylike对象，非arraylike参数会被忽略
   * @param [identifier] (v);标识函数，用来对每个元素返回唯一标识，标识相同的值会认为相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
   * 算法进行值比较。如果为空，直接使用值自身比较
   * @returns 交集元素组成的新数组
   */
  function intersect(...params) {
      let comparator;
      let list = params;
      const sl = params.length;
      if (sl > 2) {
          const lp = params[sl - 1];
          if (isFunction(lp)) {
              comparator = lp;
              list = params.slice(0, sl - 1);
          }
      }
      list = list.filter((v) => isArrayLike(v) || isArray(v));
      if (list.length < 1)
          return list;
      const len = list.length;
      // 取得最短集合
      list.sort((a, b) => a.length - b.length);
      const kvMap = new Map();
      // 记录最少id
      let idLength = 0; // 用于快速匹配
      for (let i = list[0].length; i--;) {
          const v = list[0][i];
          const id = comparator ? comparator(v) : v;
          if (!kvMap.get(id)) {
              // 防止组内重复
              kvMap.set(id, { i: 1, v: v });
              idLength++;
          }
      }
      for (let j = 1; j < len; j++) {
          const ary = list[j];
          const localMap = new Map();
          let localMatchedCount = 0;
          for (let i = 0; i < ary.length; i++) {
              const v = ary[i];
              const id = comparator ? comparator(v) : v;
              if (kvMap.get(id) && !localMap.get(id)) {
                  kvMap.get(id).i++;
                  // 相同id本组内不再匹配
                  localMap.set(id, true);
                  // 匹配次数加1
                  localMatchedCount++;
                  // 已经匹配完所有可交集元素，无需继续检查
                  if (localMatchedCount === idLength)
                      break;
              }
          }
      }
      const rs = [];
      each(kvMap, (v) => {
          if (v.i === len) {
              rs.push(v.v);
          }
      });
      return rs;
  }

  /**
   * 把arrayLike中所有元素连接成字符串并返回。对于基本类型元素会直接转为字符值，对象类型会调用toString()方法
   *
   * @example
   * //'1/2/3/4'
   * console.log(_.join([1, 2, 3, 4], '/'))
   * //'1,2,3,4'
   * console.log(_.join([1, 2, 3, 4]))
   *
   * @param array 数组
   * @param [separator=','] 分隔符
   * @returns 拼接字符串
   */
  function join(array, separator) {
      return toArray(array).join(separator || ',');
  }

  /**
   * 获取数组中的最后一个元素
   *
   * @example
   * //3
   * console.log(_.last([1,2,3]))
   *
   * @param array 数组
   * @returns 数组中最后一个元素
   */
  function last(array) {
      const ary = toArray(array);
      return ary[ary.length - 1];
  }

  /**
   * 删除数组中断言结果为true的元素并返回被删除的元素
   * <div class="alert alert-secondary">
        该函数会修改原数组
      </div>
   *
   * @example
   * //[1, 3] [2, 4]
   * let ary = [1,2,3,4];
   * console.log(_.remove(ary,x=>x%2),ary)
   * //[2] [1,3]
   * ary = [{a:1},{a:2},{a:3}];
   * console.log(_.remove(ary,v=>v.a===2),ary)
   * //[3] [1,2]
   * ary = [{a:1},{a:2},{a:3}];
   * console.log(_.remove(ary,{a:3}),ary)
   *
   * @param array 数组对象，如果参数非数组直接返回
   * @param predicate (value[,index[,array]]);断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @returns 被删除的元素数组或空数组
   * @since 0.19.0
   */
  function remove(array, predicate) {
      const rs = [];
      if (!isArray(array))
          return rs;
      const itee = iteratee(predicate);
      let i = 0;
      for (let l = 0; l < array.length; l++) {
          const item = array[l];
          const r = itee(item, l, array);
          if (r) {
              rs.push(item);
          }
          else {
              array[i++] = item;
          }
      }
      array.length = i;
      return rs;
  }

  /**
   * 与without相同，但会修改原数组
   * <div class="alert alert-secondary">
        该函数会修改原数组
      </div>
   *
   * @example
   * //[1, 1] true
   * let ary = [1,2,3,4,3,2,1];
   * let newAry = _.pull(ary,2,3,4)
   * console.log(newAry,ary === newAry)
   *
   * @param array 数组对象
   * @param values 需要删除的值
   * @returns 新数组
   * @since 0.19.0
   */
  function pull(array, ...values) {
      remove(array, (item) => includes(values, item));
      return array;
  }

  /**
   * 对数组元素位置进行颠倒，返回改变后的数组。
   *
   *  @example
   * //[3, 2, 1]
   * console.log(_.reverse([1, 2, 3]))
   *
   * @param array 数组
   * @returns 颠倒后的新数组
   */
  function reverse(array) {
      const rs = toArray(array);
      return rs.reverse();
  }

  /**
   * 同<code>sortedIndex</code>，但支持自定义回调用来获取对比值
   * @example
   * //2
   * console.log(_.sortedIndexBy([{a:1},{a:2},{a:3}], {a:2.5},'a'))
   *
   * @param keys 对象属性标识符数组
   * @param value 需要插入数组的值
   * @param [iteratee=identity] (value)回调函数，返回排序对比值
   * @returns array索引
   * @since 1.0.0
   */
  function sortedIndexBy(array, value, itee) {
      let left = 0;
      let right = size(array);
      let index = 0;
      const cb = iteratee(itee || identity);
      value = cb(value);
      while (left < right) {
          const mid = parseInt((left + right) / 2);
          if (cb(array[mid]) < value) {
              left = mid + 1;
              index = left;
          }
          else {
              right = mid;
          }
      }
      return index;
  }

  /**
   * 使用二分法确定在array保持排序不变的情况下，value可以插入array的最小索引
   * @example
   * //1
   * console.log(_.sortedIndex([1,2,3],1.5))
   * //1
   * console.log(_.sortedIndex(['a', 'c'], 'b'))
   * //0
   * console.log(_.sortedIndex([{a:1},{a:2},{a:3}], {a:2.5}))
   *
   * @param array 对象属性标识符数组
   * @param value 需要插入数组的值
   * @returns array索引
   * @since 1.0.0
   */
  function sortedIndex(array, value) {
      return sortedIndexBy(array, value);
  }

  /**
   * 返回除第一个元素外的所有元素组成的新数组
   *
   * @example
   * //[2, 3]
   * console.log(_.tail([1, 2, 3]))
   *
   * @param array 数组
   * @returns 新数组
   */
  function tail(array) {
      const rs = toArray(array);
      return rs.slice(1);
  }

  /**
   * 从起始位置获取指定数量的元素并放入新数组后返回
   *
   * @example
   * //[1, 2, 3]
   * console.log(_.take([1, 2, 3, 4, 5],3))
   * //[1, 2, 3, 4, 5]
   * console.log(_.take([1, 2, 3, 4, 5]))
   *
   * @param array 数组
   * @param [length] 获取元素数量，默认数组长度
   * @returns 新数组
   */
  function take(array, length) {
      const rs = toArray(array);
      return rs.slice(0, length);
  }

  /**
   * 从数组末尾位置获取指定数量的元素放入新数组并返回
   *
   * @example
   * //[3, 4, 5]
   * console.log(_.takeRight([1, 2, 3, 4, 5],3))
   * //[1, 2, 3, 4, 5]
   * console.log(_.takeRight([1, 2, 3, 4, 5]))
   *
   * @param array 数组
   * @param length
   * @returns 新数组
   * @since 1.0.0
   */
  function takeRight(array, length) {
      const rs = toArray(array);
      const maxLength = rs.length;
      return rs.slice(maxLength - (length || maxLength), maxLength);
  }

  /**
   * 对所有集合做并集并返回并集元素组成的新数组。并集类似concat()但不允许重复值
   *
   * @example
   * //[1, 2, 3]
   * console.log(_.union([1,2,3],[2,3]))
   * //[1, 2, 3, "1", "2"]
   * console.log(_.union([1,2,3],['1','2']))
   * //[{name: "a"},{name: "b"}]
   * console.log(_.union([{name:'a'},{name:'b'}],[{name:'a'}],v=>v.name))
   * //[a/b/a] 没有标识函数无法去重
   * console.log(_.union([{name:'a'},{name:'b'}],[{name:'a'}]))
   * //[1, 2, 3, "3"] "3"和3不相等
   * console.log(_.union([1,2,3],[1,3],[2,'3',1]))
   *
   * @param [arrays] 1-n个数组或arraylike对象，非arraylike参数会被忽略
   * @param [identifier] (v);标识函数，用来对每个元素返回唯一标识，标识相同的值会认为相等。使用<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value-zero_equality">SameValueZero</a>
   * 算法进行值比较。如果为空，直接使用值自身比较
   * @returns 并集元素组成的新数组
   */
  function union(...params) {
      let comparator;
      let list = params;
      const sl = params.length;
      if (sl > 2 && isFunction(params[sl - 1])) {
          comparator = params[sl - 1];
          list = params.slice(0, sl - 1);
      }
      list = list.filter((v) => isArrayLike(v) || isArray(v));
      if (list.length < 1)
          return list;
      let rs;
      if (comparator) {
          const kvMap = new Map();
          flat(list).forEach((v) => {
              const id = comparator(v);
              if (!kvMap.get(id)) {
                  kvMap.set(id, v);
              }
          });
          rs = map(kvMap, (v) => v);
      }
      else {
          rs = toArray(new Set(flat(list)));
      }
      return rs;
  }

  /**
   * 对数组内的值进行去重
   * @example
   * // [1,2,4,"a","1",null]
   * console.log(_.unique([1,2,2,4,4,'a','1','a',null,null]))
   *
   * @param array 数组
   * @returns 转换后的新数组对象
   */
  function uniq(array) {
      const ary = toArray(array);
      return toArray(new Set(ary));
  }

  /**
   * 同<code>uniq</code>，但支持自定义筛选函数
   * @example
   * // [{"a":1},{"a":"1"},{"a":2},{"a":"2"}]
   * console.log(_.uniqBy([{a:1},{a:1},{a:'1'},{a:2},{a:'2'},{a:2}],'a'))
   * // [{"a":1},{"a":2}]
   * console.log(_.uniqBy([{a:1},{a:1},{a:'1'},{a:2},{a:'2'},{a:2}],v=>v.a>>0))
   *
   * @param array 数组
   * @param iteratee (value,index) 筛选函数，返回需要对比的值。默认identity
   * <br>当iteratee是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils.iteratee}
   * @returns 去重后的新数组对象
   * @since 1.0.0
   */
  function uniqBy(array, itee) {
      const cb = iteratee(itee || identity);
      const keyMap = new Map();
      const rs = [];
      each(array, (v, k) => {
          const key = cb(v, k);
          if (keyMap.get(key))
              return;
          keyMap.set(key, 1);
          rs.push(v);
      });
      return rs;
  }

  /**
   * <code>zip</code>的反操作
   * @example
   * //[[1,2,undefined],['a','b','c']]
   * console.log(_.unzip([[1, 'a'],[2, 'b'],[undefined, 'c']]))
   * //[['a', 'b', 'c'], [1, 2, undefined],['1', undefined,undefined]]
   * console.log(_.unzip([['a', 1, '1'], ['b', 2],['c']]))
   *
   * @param array 包含若干分组的数组
   * @returns 重新分组后的新数组
   * @since 0.23.0
   */
  function unzip(array) {
      const rs = [];
      const len = size(array);
      each(array, (group, colIndex) => {
          each(group, (el, rowIndex) => {
              let row = rs[rowIndex];
              if (!row) {
                  row = rs[rowIndex] = new Array(len);
              }
              row[colIndex] = el;
          });
      });
      return rs;
  }

  /**
   * 返回删除所有values后的新数组。使用<code>eq</code>函数进行等值判断
   *
   * @example
   * //[1, 1]
   * console.log(_.without([1,2,3,4,3,2,1],2,3,4))
   *
   * @param array 数组对象
   * @param values 需要删除的值
   * @returns 新数组
   * @since 0.19.0
   */
  function without(array, ...values) {
      return filter(array, (item) => !includes(values, item));
  }

  /**
   * 创建一个由指定数组arrays内元素重新分组后组成的二维数组，
   * 第一个子数组由每个数组内的第一个元素组成，第二个子数组由每个数组内的第二个元素组成，以此类推。
   * 子数组的数量由参数中数组内元素最多的数组决定。
   * @example
   * //[[1, 'a'],[2, 'b'],[undefined, 'c']]
   * console.log(_.zip([1,2],['a','b','c']))
   * //[['a', 1, '1'], ['b', 2, undefined],['c', undefined,undefined]]
   * console.log(_.zip(['a','b','c'],[1,2],['1']))
   *
   * @param arrays 1-n个数组
   * @returns 重新分组后的新数组
   * @since 0.23.0
   */
  function zip(...arrays) {
      const rs = [];
      const size = arrays.length;
      arrays.forEach((ary, colIndex) => {
          each(ary, (el, i) => {
              let group = rs[i];
              if (!group) {
                  group = rs[i] = new Array(size);
              }
              group[colIndex] = el;
          });
      });
      return rs;
  }

  /**
   * 创建一个对象，属性名称与属性值分别来自两个数组
   * @example
   * //{a: 1, b: 2}
   * console.log(_.zipObject(['a','b'],[1,2,3]))
   *
   * @param keys 对象属性标识符数组
   * @param values 对象值数组
   * @returns 组合后的对象
   * @since 0.23.0
   */
  function zipObject(keys, values) {
      const rs = {};
      each(keys, (k, i) => {
          rs[k] = get(values, i);
      });
      return rs;
  }

  /**
   * 与<code>zip</code>相同，但支持自定义组合逻辑
   * @example
   * //[[1, 3, 5], [2, 4, 6]]
   * console.log(_.zipWith([1,2],[3,4],[5,6]))
   * //[9, 12]
   * console.log(_.zipWith([1,2],[3,4],[5,6],_.sum))
   * //[3, 4]
   * console.log(_.zipWith([1,2],[3,4],[5,6],group=>_.avg(group)))
   *
   * @param arrays 1-n个数组
   * @param [iteratee=identity] (group)回调函数，返回组合后的分组值
   * @returns 重新分组后的新数组
   * @since 1.0.0
   */
  function zipWith(...params) {
      const sl = params.length;
      let itee = params[sl - 1];
      const arys = params;
      if (!isFunction(itee)) {
          itee = identity;
      }
      else {
          pop(arys);
      }
      const rs = zip(...arys);
      return map(rs, (group) => itee(group));
  }

  var array = /*#__PURE__*/Object.freeze({
    __proto__: null,
    append: append,
    chunk: chunk,
    compact: compact,
    concat: concat,
    except: except,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    first: first,
    flat: flat,
    flatDeep: flatDeep,
    head: first,
    initial: initial,
    insert: insert,
    intersect: intersect,
    join: join,
    last: last,
    pop: pop,
    pull: pull,
    range: range,
    remove: remove,
    reverse: reverse,
    slice: slice,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    union: union,
    uniq: uniq,
    uniqBy: uniqBy,
    unzip: unzip,
    without: without,
    zip: zip,
    zipObject: zipObject,
    zipWith: zipWith
  });

  /**
   * a + b
   * @example
   * //3
   * console.log(_.add(1,2))
   * //1
   * console.log(_.add(1,null))
   * //NaN
   * console.log(_.add(1,NaN))
   *
   * @param a
   * @param b
   * @returns a+b
   * @since 1.0.0
   */
  function add(a, b) {
      a = isNil(a) ? 0 : a;
      b = isNil(b) ? 0 : b;
      return a + b;
  }

  /**
   * a / b
   * @example
   * //0.5
   * console.log(_.divide(1,2))
   * //Infinity
   * console.log(_.divide(1,null))
   * //NaN
   * console.log(_.divide(1,NaN))
   *
   * @param a
   * @param b
   * @returns a/b
   * @since 1.0.0
   */
  function divide(a, b) {
      a = isNil(a) ? 0 : a;
      b = isNil(b) ? 0 : b;
      return a / b;
  }

  /**
   * 返回给定数字序列中最大的一个。忽略NaN，null，undefined
   * @example
   * //7
   * console.log(_.max([2,3,1,NaN,7,4,null]))
   * //6
   * console.log(_.max([4,5,6,'x','y']))
   * //Infinity
   * console.log(_.max([4,5,6,Infinity]))
   *
   * @param values 数字/字符数组/Set
   * @returns
   * @since 1.0.0
   */
  function max(values) {
      const vals = flatMap(values, v => isNil(v) || isNaN(v) ? [] : v);
      let f64a = new Float64Array(vals);
      f64a.sort();
      return f64a[f64a.length - 1];
  }

  /**
   * 对多个数字或数字列表计算平均值并返回结果
   * @example
   * //2.5
   * console.log(_.mean([1,2,'3',4]))
   * //NaN
   * console.log(_.mean([1,'2',3,'a',4]))
   * //2
   * console.log(_.mean([1,'2',3,null,4]))
   *
   * @param values 数字/字符数组/Set
   * @returns mean value
   * @since 1.0.0
   */
  function mean(values) {
      const vals = map(values, v => isNil(v) ? 0 : v);
      let f64a = new Float64Array(vals);
      let rs = 0;
      f64a.forEach(v => {
          rs += v;
      });
      return rs / f64a.length;
  }

  /**
   * 返回给定数字序列中最小的一个。忽略NaN，null，undefined
   * @example
   * //-1
   * console.log(_.min([2,3,1,7,'-1']))
   * //0
   * console.log(_.min([4,3,6,0,'x','y']))
   * //-Infinity
   * console.log(_.min([-Infinity,-9999,0,null]))
   * @param values 数字/字符数组/Set
   * @returns
   * @since 1.0.0
   */
  function min(values) {
      const vals = flatMap(values, v => isNil(v) || isNaN(v) ? [] : v);
      let f64a = new Float64Array(vals);
      f64a.sort();
      return f64a[0];
  }

  /**
   * 返回min/max如果value超出范围
   * @example
   * //1
   * console.log(_.minmax([1,10,0]))
   * //6
   * console.log(_.minmax([4,8,6]))
   *
   * @param min
   * @param max
   * @param value
   * @returns
   */
  function minmax(min, max, value) {
      if (value < min)
          return min;
      if (value > max)
          return max;
      return value;
  }

  /**
   * a * b
   * @example
   * //2
   * console.log(_.multiply(1,2))
   * //0
   * console.log(_.multiply(1,null))
   * //NaN
   * console.log(_.multiply(1,NaN))
   *
   * @param a
   * @param b
   * @returns a*b
   * @since 1.0.0
   */
  function multiply(a, b) {
      a = isNil(a) ? 0 : a;
      b = isNil(b) ? 0 : b;
      return a * b;
  }

  function randf(min, max) {
      if (max === undefined) {
          if (!min)
              return Math.random();
          max = min;
          min = 0;
      }
      max = parseFloat(max + '') || 0;
      min = parseFloat(min + '') || 0;
      return Math.random() * (max - min) + min;
  }

  /**
   * a - b
   * @example
   * //-1
   * console.log(_.subtract(1,2))
   * //1
   * console.log(_.subtract(1,null))
   * //NaN
   * console.log(_.subtract(1,NaN))
   *
   * @param a
   * @param b
   * @returns a - b
   * @since 1.0.0
   */
  function subtract(a, b) {
      a = isNil(a) ? 0 : a;
      b = isNil(b) ? 0 : b;
      return a - b;
  }

  function sum(...values) {
      let ary = values;
      if (ary.length === 1 && isArrayLike(ary[0])) {
          ary = ary[0];
      }
      const vals = ary.map((v) => isNil(v) ? 0 : v);
      let rs = 0;
      const f64a = new Float64Array(vals);
      f64a.forEach((v) => {
          rs += v;
      });
      return rs;
  }

  var math = /*#__PURE__*/Object.freeze({
    __proto__: null,
    add: add,
    divide: divide,
    max: max,
    mean: mean,
    min: min,
    minmax: minmax,
    multiply: multiply,
    randf: randf,
    randi: randi,
    subtract: subtract,
    sum: sum
  });

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
  /**
   * 生成一个指定长度的alphaId并返回。id内容由随机字母表字符组成
   * @example
   * // urN-k0mpetBwboeQ
   * console.log(_.alphaId())
   * // Ii6cPyfw-Ql5YC8OIhVwH1lpGY9x
   * console.log(_.alphaId(28))
   *
   * @param [len=16] id长度
   * @returns alphaId
   * @since 1.0.0
   */
  function alphaId(len) {
      const bytes = self.crypto.getRandomValues(new Uint8Array(len || 16));
      let rs = '';
      bytes.forEach(b => rs += ALPHABET[b % ALPHABET.length]);
      return rs;
  }

  /**
   * 如果v是null/undefined/NaN中的一个，返回defaultValue
   * @example
   * //"x"
   * console.log(_.defaultTo(null,'x'))
   * //0
   * console.log(_.defaultTo(0,'y'))
   *
   * @param v 任何值
   * @param defaultValue 任何值
   * @returns v或defaultValue
   * @since 0.16.0
   */
  function defaultTo(v, defaultValue) {
      if (v === null || v === undefined || Number.isNaN(v))
          return defaultValue;
      return v;
  }

  /**
   * 为func.js扩展额外函数，扩展后的函数同样具有函数链访问能力
   *
   * @example
   * //增加扩展
   * _.mixin({
   *  select:_.get,
   *  from:_.chain,
   *  where:_.filter,
   *  top:_.head
   * });
   *
   * const libs = [
   *  {name:'func.js',platform:['web','nodejs'],tags:{utils:true},js:true},
   *  {name:'juth2',platform:['web','java'],tags:{utils:false,middleware:true},js:false},
   *  {name:'soya2d',platform:['web'],tags:{utils:true},js:true}
   * ];
   * //查询utils是true的第一行数据的name值
   * console.log(_.from(libs).where({tags:{utils:true}}).top().select('name').value())
   *
   * @param obj 扩展的函数声明
   */
  function mixin(target, obj) {
      functions$1(obj).forEach((fnName) => {
          const fn = obj[fnName];
          if (target.prototype && target.prototype.constructor.name === 'FuncChain') {
              target.prototype['_' + fnName] = function (...rest) {
                  this._chain.push({
                      fn: fn,
                      params: rest,
                  });
                  return this;
              };
          }
          else {
              target['_' + fnName] = fn;
          }
      });
  }

  /**
   * 当通过非esm方式引用函数库时，函数库会默认挂载全局变量<code>_</code>。
   * 如果项目中存在其它以该变量为命名空间的函数库（如lodash、underscore等）则会发生命名冲突。
   * 该函数可恢复全局变量为挂载前的引用，并返回myfuncs命名空间
   * @example
   * // 返回myfuncs并重置全局命名空间 _
   * console.log(_.noConflict())
   *
   * @returns 返回myfuncs命名空间
   * @since 1.0.0
   */
  function noConflict() {
      const ctx = globalThis;
      if (ctx.myff) {
          ctx._ = ctx.__f_prev;
      }
      return ctx.myff;
  }

  /**
   * 生成一个64bit整数的雪花id并返回，具体格式如下：
   * <code>
   * 0 - timestamp                                       - nodeId       - sequence<br>
   * 0 - [0000000000 0000000000 0000000000 0000000000 0] - [0000000000] - [000000000000]
   * </code>
   * 可用于客户端生成可跟踪统计的id，如定制终端
   * @example
   * // 343155438738309188
   * console.log(_.snowflakeId(123))
   * // 78249955004317758
   * console.log(_.snowflakeId(456,new Date(2022,1,1).getTime()))
   *
   * @param nodeId 节点id，10bit整数
   * @param [epoch=1580486400000] 时间起点，用于计算相对时间戳
   * @returns snowflakeId 由于js精度问题，直接返回字符串而不是number，如果nodeId为空返回 '0000000000000000000'
   * @since 1.0.0
   */
  function snowflakeId(nodeId, epoch) {
      epoch = epoch || 1580486400000;
      if (isNil(nodeId))
          return '0000000000000000000';
      let nowTime = Date.now();
      // 12bits for seq
      if (lastTimeStamp === nowTime) {
          sequence += randi(1, 9);
          if (sequence > 0xfff) {
              nowTime = _getNextTime(lastTimeStamp);
              sequence = randi(0, 99);
          }
      }
      else {
          sequence = randi(0, 99);
      }
      lastTimeStamp = nowTime;
      // 41bits for time
      const timeOffset = (nowTime - epoch).toString(2);
      // 10bits for nodeId
      const nodeBits = padEnd((nodeId % 0x3ff).toString(2) + '', 10, '0');
      // 12bits for seq
      const seq = padZ(sequence.toString(2) + '', 12);
      return BigInt(`0b${timeOffset}${nodeBits}${seq}`).toString();
  }
  let lastTimeStamp = -1;
  let sequence = 0;
  const _getNextTime = (lastTime) => {
      let t = Date.now();
      while (t <= lastTime) {
          t = Date.now();
      }
      return t;
  };

  /**
   * 调用iteratee函数n次，并将历次调用的返回值数组作为结果返回
   * @example
   * //['0',...,'4']
   * console.log(_.times(5,String))
   * //[[0],[1]]
   * console.log(_.times(2,_.toArray))
   *
   * @param n 迭代次数
   * @param iteratee 每次迭代调用函数
   * @returns 返回值数组
   * @since 0.17.0
   */
  function times(n, iteratee) {
      return range(n).map(iteratee);
  }

  /**
   * 返回一个全局的整数id，序号从0开始。可以用于前端列表编号等用途
   *
   * @example
   * //func_0
   * console.log(_.uniqueId('func'))
   * //1
   * console.log(_.uniqueId())
   *
   * @param [prefix] id前缀
   * @returns 唯一id
   * @since 0.16.0
   */
  function uniqueId(prefix) {
      return (prefix !== undefined ? prefix + '_' : '') + seed++;
  }
  let seed = 0;

  const VARIANTS = ['8', '9', 'a', 'b'];
  /**
   * 生成一个32/36个字符组件的随机uuid(v4)并返回
   * @example
   * // ddfd73a5-62ac-4412-ad2b-fd495f766caf
   * console.log(_.uuid(true))
   * // ddfd73a562ac4412ad2bfd495f766caf
   * console.log(_.uuid())
   *
   * @param delimiter 是否生成分隔符
   * @returns uuid
   * @since 1.0.0
   */
  function uuid(delimiter) {
      let uuid = '';
      if (self.crypto.randomUUID) {
          // only in https
          uuid = self.crypto.randomUUID();
      }
      else {
          const r32 = Math.random();
          const r16 = Math.random();
          const p1Num = Math.floor(r32 * (0xffffffff - 0x10000000)) + 0x10000000;
          const p1 = p1Num.toString(16);
          const p2Num = Math.floor(r16 * (0xffff - 0x1000)) + 0x1000;
          const p2 = p2Num.toString(16);
          const p3 = substring((p2Num << 1).toString(16), 0, 3);
          const p4 = substring((p2Num >> 1).toString(16), 0, 3);
          let p5 = Date.now().toString(16);
          p5 =
              substring((p1Num >> 1).toString(16), 0, 6) +
                  substring(p5, p5.length - 6, p5.length);
          uuid =
              p1 + '-' + p2 + '-4' + p3 + '-' + VARIANTS[randi(0, 3)] + p4 + '-' + p5;
      }
      return delimiter ? uuid : uuid.replace(/-/g, '');
  }

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    alphaId: alphaId,
    defaultTo: defaultTo,
    identity: identity,
    iteratee: iteratee,
    matcher: matcher,
    mixin: mixin,
    noConflict: noConflict,
    noop: noop,
    snowflakeId: snowflakeId,
    times: times,
    toPath: toPath,
    uniqueId: uniqueId,
    uuid: uuid
  });

  /**
   * 创建一个包含指定函数逻辑且内置计数的包装函数并返回。
   * 该函数每调用一次计数会减一，直到计数为0后生效。可用于异步结果汇总时只调用一次的场景
   *
   * @example
   * //undefined, undefined, 'data saved'
   * let saveTip = _.after(()=>'data saved',2);
   * console.log(saveTip(),saveTip(),saveTip())
   *
   * @param fn 需要调用的函数
   * @param [count=0] 计数
   * @returns 包装后的函数
   */
  function after(fn, count) {
      const proxy = fn;
      let i = count || 0;
      let rtn;
      return (...args) => {
          if (i === 0) {
              rtn = proxy(...args);
          }
          if (i > 0)
              i--;
          return rtn;
      };
  }

  /**
   * 传递v为参数执行interceptor1函数，如果该函数返回值未定义(undefined)则执行interceptor2函数，并返回函数返回值。
   * 用于函数链中的分支操作
   * @example
   * //false
   * console.log(_.alt(9,v=>false,v=>20))
   *
   * @param v
   * @param interceptor1 (v)
   * @param interceptor2 (v)
   * @returns 函数返回值
   */
  function alt(v, interceptor1, interceptor2) {
      let rs = interceptor1(v);
      if (rs === undefined) {
          rs = interceptor2(v);
      }
      return rs;
  }

  const PLACEHOLDER = void 0;
  /**
   * 创建一个新的函数，该函数会调用fn，并传入指定的部分参数。
   *
   * `partial()`常用来创建函数模板或扩展核心函数，比如
   *
   * ```js
   * let delay2 = _.partial(setTimeout,undefined,2000);
   * delay2(()=>\{console.log('2秒后调用')\})
   * ```
   *
   * @example
   * //2748
   * let hax2num = _.partial(parseInt,undefined,16);
   * console.log(hax2num('abc'))
   * //9
   * let square = _.partial(Math.pow,undefined,2);
   * console.log(square(3))
   * //￥12,345.00元
   * let formatYuan = _.partial(_.formatNumber,undefined,'￥,000.00元');
   * console.log(formatYuan(12345))
   * //[func.js] hi...
   * let log = _.partial((...args)=>args.join(' '),'[func.js][',undefined,']',undefined);
   * console.log(log('info','hi...'))
   *
   * @param fn 需要调用的函数
   * @param args 参数可以使用undefined作为占位符，以此来确定不同的实参位置
   * @returns 部分应用后的新函数
   */
  function partial(fn, ...args) {
      return function (...params) {
          let p = 0;
          const applyArgs = args.map((v) => (v === PLACEHOLDER ? params[p++] : v));
          if (params.length > p) {
              for (let i = p; i < params.length; i++) {
                  applyArgs.push(params[i]);
              }
          }
          return fn(...applyArgs);
      };
  }

  /**
   * 创建一个新的函数，并且绑定函数的this上下文。默认参数部分同<code>partial()</code>
   *
   * @example
   * const obj = {
   *  text:'Func.js',
   *  click:function(a,b,c){console.log('welcome to '+this.text,a,b,c)},
   *  blur:function(){console.log('bye '+this.text)}
   * }
   * //自动填充参数
   * let click = _.bind(obj.click,obj,'a',undefined,'c');
   * click('hi')
   * //1秒后执行，无参数
   * setTimeout(click,1000)
   *
   * @param fn 需要调用的函数
   * @param thisArg fn函数内this所指向的值
   * @param args 参数可以使用undefined作为占位符，以此来确定不同的实参位置
   * @returns 绑定thisArg的新函数
   * @since 0.17.0
   */
  function bind(fn, thisArg, ...args) {
      return partial(fn.bind(thisArg), ...args);
  }

  /**
   * 批量绑定对象内的函数属性，将这些函数的this上下文指向绑定对象。经常用于模型中的函数用于外部场景，比如setTimeout/事件绑定等
   *
   * @example
   * const obj = {
   *  text:'Func.js',
   *  click:function(a,b,c){console.log('welcome to '+this.text,a,b,c)},
   *  click2:function(){console.log('hi '+this.text)}
   * }
   * //自动填充参数
   * _.bindAll(obj,'click',['click2']);
   * //1秒后执行，无参数
   * setTimeout(obj.click,1000)
   * //事件
   * top.onclick = obj.click2
   *
   * @param object 绑定对象
   * @param  {...(string | Array<string>)} methodNames 属性名或path
   * @returns 绑定对象
   * @since 0.17.0
   */
  function bindAll(object, ...methodNames) {
      const pathList = flatDeep(methodNames);
      each(pathList, (path) => {
          const fn = get(object, path);
          set(object, path, fn.bind(object));
      });
      return object;
  }

  /**
   * 通过给定参数调用fn并返回执行结果
   *
   * @example
   * //自动填充参数
   * _.call(fn,1,2);
   * //事件
   * _.call(fn,1,2);
   *
   * @param fn 需要执行的函数
   * @param args 可变参数
   * @returns 执行结果。如果函数无效或无返回值返回undefined
   * @since 1.0.0
   */
  function call(fn, ...args) {
      if (!isFunction(fn))
          return undefined;
      return fn(...args);
  }

  /**
   * 创建一个新的函数，该函数的参数会传递给第一个<code>fns</code>函数来计算结果，而结果又是第二个fns函数的参数，以此类推，
   * 直到所有函数执行完成。常用于封装不同的可重用函数模块组成新的函数或实现惰性计算，比如
   *
   * <pre><code class="language-javascript">
   * let checkName = _.compose(_.trim,v=>v.length>6);
   * checkName(' holyhigh') //=> true
   * checkName(' ') //=> false
   * </code></pre>
   *
   * @example
   * // Holyhigh
   * let formatName = _.compose(_.lowerCase,_.capitalize);
   * console.log(formatName('HOLYHIGH'))
   *
   * @param  {...function} fns
   * @returns 组合后的入口函数
   */
  function compose(...fns) {
      return function (...args) {
          let rs = fns[0](...args);
          for (let i = 1; i < fns.length; i++) {
              if (isFunction(fns[i])) {
                  rs = fns[i](rs);
              }
          }
          return rs;
      };
  }

  /**
   * 启动计时器，并在倒计时为0后调用函数。
   * 内部使用setTimeout进行倒计时，如需中断延迟可以使用clearTimeout函数
   * <div class="alert alert-secondary">
        注意，函数并不提供防抖逻辑。如果需要处理重复调用必须自己处理计时器id
      </div>
   *
   * @example
   * //1000ms 后显示some text !
   * _.delay(console.log,1000,'some text','!');
   *
   * @param fn 需要调用的函数
   * @param [wait=0] 倒计时。单位ms
   * @param [args] 传入定时函数的参数
   * @returns 计时器id
   */
  function delay(fn, wait, ...args) {
      return setTimeout(() => {
          fn(...args);
      }, wait || 0);
  }

  /**
   * 类似eval，对表达式进行求值并返回结果。不同于eval，fval()执行在严格模式下
   *
   * > 注意，如果页面设置了<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">CSP</a>可能会导致该函数失效
   *
   * @example
   * //5
   * console.log(_.fval('3+2'));
   * //{name:"func.js"}
   * console.log(_.fval("{name:'func.js'}"));
   * //0
   * console.log(_.fval('1+x-b',{x:2,b:3}))
   *
   * @param expression 计算表达式
   * @param args 参数对象
   * @returns 表达式计算结果
   */
  function fval(expression, args) {
      const ks = keys(args);
      const val = values(args);
      return Function(...ks, '"use strict";return ' + expression)(...val);
  }

  /**
   * 创建一个包含指定函数逻辑的包装函数并返回。该函数仅执行一次
   *
   * @example
   * //2748, undefined
   * let parseInt2 = _.once(parseInt);
   * console.log(parseInt2('abc',16),parseInt2('abc',16))
   *
   * @param fn 需要调用的函数
   * @returns 包装后的函数
   */
  function once(fn) {
      let proxy = fn;
      return (...args) => {
          let rtn;
          if (proxy) {
              rtn = proxy(...args);
          }
          proxy = null;
          return rtn;
      };
  }

  /**
   * 传递v为参数执行interceptor函数，然后返回v。常用于函数链的过程调试，比如在filter后执行日志操作
   * <p>
   * 注意，一旦函数链执行了shortcut fusion，tap函数的执行会延迟到一个数组推导完成后执行
   * </p>
   *
   * @example
   * //shortut fusion中的tap只保留最后一个
   * _([1,2,3,4])
   * .map(v=>v*3).tap(v=>console.log(v))//被覆盖
   * .filter(v=>v%2===0).tap(v=>console.log(v))//会延迟，并输出结果[6,12]
   * .join('-')
   * .value()
   *
   * @param v
   * @param interceptor (v);如果v是引用值，改变v将影响后续函数流
   * @returns v
   */
  function tap(v, interceptor) {
      interceptor(v);
      return v;
  }

  var functions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    after: after,
    alt: alt,
    bind: bind,
    bindAll: bindAll,
    call: call,
    compose: compose,
    delay: delay,
    fval: fval,
    once: once,
    partial: partial,
    tap: tap
  });

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
  function template$1(string, options) {
      const delimiters = map(template$1.settings.delimiters, (d) => {
          const letters = replace(d, /\//gim, '');
          return map(letters, (l) => {
              return includes(ESCAPES, l) ? '\\' + l : l;
          }).join('');
      });
      options = toObject(options);
      const mixins = options.mixins;
      const stripWhite = options.stripWhite || false;
      const comment = delimiters[0] + template$1.settings.comment + delimiters[1];
      const interpolate = delimiters[0] + template$1.settings.interpolate + delimiters[1];
      const evaluate = delimiters[0] + template$1.settings.evaluate + delimiters[1];
      const mixin = delimiters[0] + template$1.settings.mixin + delimiters[1];
      const splitExp = new RegExp(`(?:${comment})|(?:${mixin})|(?:${interpolate})|(?:${evaluate})`, 'mg');
      // ///////////////////////////////----拆分表达式与文本
      // 1. 对指令及插值进行分段
      const tokens = parse(string, splitExp, mixins, stripWhite);
      // 2. 编译render函数
      const render = compile(tokens, options);
      return render;
  }
  const ESCAPES = ['[', ']', '{', '}', '$'];
  /**
   * 模板设置对象
   */
  template$1.settings = {
      /**
       * @defaultValue ['[%', '%]']
       */
      delimiters: ['[%', '%]'],
      interpolate: '=([\\s\\S]+?)',
      comment: '--[\\s\\S]+?--',
      mixin: '@([a-zA-Z_$][\\w_$]*)([\\s\\S]+?)',
      evaluate: '([\\s\\S]+?)',
  };
  function parse(str, splitExp, mixins, stripWhite) {
      let indicator = 0;
      let lastSegLength = 0;
      const tokens = [];
      const fullStack = [];
      let prevText = null;
      let prevNode = null;
      while (true) {
          const rs = splitExp.exec(str);
          if (rs == null) {
              const node = getText(str.substring(indicator + lastSegLength, str.length));
              if (prevText) {
                  tokens.push(getText(prevText));
              }
              if (prevNode) {
                  tokens.push(prevNode);
              }
              tokens.push(node);
              break;
          }
          else {
              let text = str.substring(indicator + lastSegLength, rs.index);
              if (prevText) {
                  // check strip white
                  if (stripWhite) {
                      const stripStart = prevText.replace(/\n\s*$/, '\n');
                      const stripEnd = text.replace(/^\s*\n/, '');
                      const prevTextNode = getText(stripStart);
                      if (stripStart.length !== prevText.length &&
                          stripEnd.length !== text.length) {
                          text = stripEnd;
                      }
                      if (prevNode?.comment) {
                          tokens.push(prevTextNode);
                      }
                      else {
                          // MTL标签之间都是\s\n，可以合并
                          const lastToken = last(tokens);
                          const merge1 = prevText.replace(/\n|\s/g, '');
                          const merge2 = lastToken
                              ? lastToken.source.replace(/\n|\s/g, '')
                              : true;
                          if (!merge1 && !merge2 && lastToken) {
                              lastToken.source = '';
                          }
                          else {
                              tokens.push(getText(prevText));
                          }
                          if (prevNode)
                              tokens.push(prevNode);
                      }
                  }
                  else {
                      tokens.push(getText(prevText));
                      if (prevNode)
                          tokens.push(prevNode);
                  }
              }
              prevText = text;
              indicator = rs.index;
              const node = getText(text);
              fullStack.push(node);
              try {
                  const node2 = parseNode(rs, mixins);
                  prevNode = node2;
                  fullStack.push(node2);
              }
              catch (error) {
                  // 获取最近信息
                  const recInfo = takeRight(fullStack, 5);
                  const tipInfo = map(recInfo, 'source').join('') + rs[0];
                  let tipIndicator = map(rs[0], () => '^').join('');
                  const tipLineStartIndex = lastIndexOf(substring(str, 0, rs.index), '\n') + 1;
                  tipIndicator = padStart(tipIndicator, rs.index - tipLineStartIndex + tipIndicator.length, ' ');
                  console.error('...', tipInfo + '\n' + tipIndicator + '\n', error);
                  return tokens;
              }
              lastSegLength = rs[0].length;
          }
      }
      return tokens;
  }
  function getText(str) {
      return {
          text: true,
          source: str,
      };
  }
  function parseNode(rs, mixins) {
      const parts = compact(rs);
      const src = parts[0];
      const modifier = src.replace(template$1.settings.delimiters[0], '')[0];
      switch (modifier) {
          case '-':
              return {
                  comment: true,
                  source: src,
              };
          case '=':
              return {
                  interpolate: true,
                  source: src,
                  expression: parts[1],
              };
          case '@':
              const mixin = parts[1];
              if (!mixins || !mixins[mixin]) {
                  throw new SyntaxError(`The mixin '${mixin}' does not exist, check if the options.mixins has been set`);
              }
              let paramters = trim(parts[2]);
              if (paramters) {
                  const matcher = paramters.match(/\{(?:,?[a-zA-Z_$][a-zA-Z0-9_$]*(?::.*?)?)+\}/gm);
                  if (!matcher) {
                      throw new SyntaxError(`Invalid mixin paramters '${parts[2]}', must be JSON form`);
                  }
                  paramters = matcher[0];
              }
              return {
                  mixin: true,
                  source: src,
                  tmpl: mixins[mixin],
                  paramters,
              };
          default:
              return {
                  evaluate: true,
                  source: src,
                  expression: parts[1],
              };
      }
  }
  // 返回编译后的render函数
  // 函数中不能出现异步代码，否则会导致render失败
  // 默认全局变量 print() / _
  function compile(tokens, options) {
      let funcStr = '';
      each(tokens, (token) => {
          if (token.comment)
              return;
          if (token.text) {
              funcStr += '\nprint(`' + token.source + '`);';
          }
          else if (token.interpolate) {
              funcStr += `\nprint(${token.expression});`;
          }
          else if (token.evaluate) {
              funcStr += '\n' + token.expression;
          }
          else if (token.mixin) {
              funcStr += `\nprint(_.template(${JSON.stringify(token.tmpl)},$options)(${token.paramters}));`;
          }
      });
      return (obj) => {
          let declarations = keys(obj).join(',');
          if (declarations) {
              declarations = '{' + declarations + '}';
          }
          let globalKeys = [];
          let globalValues = [];
          const paramAry = unzip(toPairs(options.globals));
          if (size(paramAry) > 0) {
              globalKeys = paramAry[0];
              globalValues = paramAry[1];
          }
          globalKeys.push('_');
          globalValues.push(self.myfx);
          const getRender = new Function(...globalKeys, '$options', `return function(${declarations}){
      const textQ=[];
      const print=(str)=>{
        textQ.push(str)
      };` +
              funcStr +
              ';return textQ.join("")}')(...globalValues, options);
          return getRender(obj);
      };
  }

  var template = /*#__PURE__*/Object.freeze({
    __proto__: null,
    template: template$1
  });

  /**
   * 使用高性能算法，将array结构数据变为tree结构数据
   * @example
   * //生成测试数据
   * function addChildren(count,parent){
   *  const data = [];
   *  const pid = parent?parent.id:null;
   *  const parentName = parent?parent.name+'-':'';
   *  _.each(_.range(0,count),i=>{
   *    const sortNo = _.randi(0,count);
   *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
   *  });
   *  return data;
   * }
   *
   * function genTree(depth,parents,data){
   *  _.each(parents,r=>{
   *    const children = addChildren(_.randi(1,4),r);
   *    if(depth-1>0){
   *      genTree(depth-1,children,data);
   *    }
   *    _.append(data,...children);
   *  });
   * }
   *
   * const roots = addChildren(2);
   * const data = [];
   * genTree(2,roots,data);
   * _.insert(data,0,...roots);
   *
   * const tree = _.arrayToTree(data,'id','pid',{attrMap:{text:'name'}});
   * _.walkTree(tree,(parentNode,node,chain)=>console.log('node',node.text,'sortNo',node.sortNo,'chain',_.map(chain,n=>n.name)));
   *
   *
   * @param array 原始数据集。如果非Array类型，返回空数组
   * @param idKey id标识
   * @param pidKey='pid' 父id标识
   * @param options 自定义选项
   * @param options.rootParentValue 根节点的parentValue，用于识别根节点。默认null
   * @param options.childrenKey 包含子节点容器的key。默认'children'
   * @param options.attrMap 转换tree节点时的属性映射，如\{text:'name'\}表示把array中一条记录的name属性映射为tree节点的text属性
   * @param options.sortKey 如果指定排序字段，则会在转换tree时自动排序。字段值可以是数字或字符等可直接进行比较的类型。性能高于转换后再排序
   * @returns 返回转换好的顶级节点数组或空数组
   * @since 1.0.0
   */
  function arrayToTree(array, idKey = 'id', pidKey, options = {}) {
      if (!isArray(array))
          return [];
      const pk = pidKey || 'pid';
      const attrMap = options.attrMap;
      const hasAttrMap = !!attrMap && isObject(attrMap);
      const rootParentValue = get(options, 'rootParentValue', null);
      const childrenKey = options.childrenKey || 'children';
      const sortKey = options.sortKey;
      const hasSortKey = !!sortKey;
      const roots = [];
      const nodeMap = {};
      const sortMap = {};
      array.forEach((record) => {
          const nodeId = record[idKey || 'id'];
          nodeMap[nodeId] = record;
          if (hasSortKey) {
              const sortNo = record[sortKey];
              sortMap[nodeId] = [sortNo, sortNo]; // min,max
          }
          if (record[pk] === rootParentValue) {
              if (hasAttrMap) {
                  each(attrMap, (v, k) => (record[k] = record[v]));
              }
              roots.push(record);
          }
      });
      array.forEach((record) => {
          const parentId = record[pk];
          const parentNode = nodeMap[parentId];
          if (parentNode) {
              let children = parentNode[childrenKey];
              if (!children) {
                  children = parentNode[childrenKey] = [];
              }
              if (hasAttrMap) {
                  each(attrMap, (v, k) => (record[k] = record[v]));
              }
              if (hasSortKey) {
                  const [min, max] = sortMap[parentId];
                  const sortNo = record[sortKey];
                  if (sortNo <= min) {
                      children.unshift(record);
                      sortMap[parentId][0] = sortNo;
                  }
                  else if (sortNo >= max) {
                      children.push(record);
                      sortMap[parentId][1] = sortNo;
                  }
                  else {
                      const i = sortedIndexBy(children, { [sortKey]: sortNo }, sortKey);
                      children.splice(i, 0, record);
                  }
              }
              else {
                  children.push(record);
              }
          }
      });
      return hasSortKey ? sortBy(roots, sortKey) : roots;
  }

  /**
   * 根据指定的node及parentKey属性，查找最近的祖先节点
   * @param node Element节点或普通对象节点
   * @param predicate (node,times,cancel)断言函数，如果返回true表示节点匹配。或调用cancel中断查找
   * @param parentKey 父节点引用属性名
   * @returns 断言为true的最近一个祖先节点
   * @since 1.0.0
   */
  function closest(node, predicate, parentKey) {
      let p = node;
      let t = null;
      let k = true;
      let i = 0;
      while (k && p) {
          if (predicate(p, i++, () => { k = false; })) {
              t = p;
              break;
          }
          p = p[parentKey];
      }
      return t;
  }

  /**
   * 以给定节点为根遍历所有子孙节点。深度优先
   * @example
   * //生成测试数据
   * function addChildren(count,parent){
   *  const data = [];
   *  const pid = parent?parent.id:null;
   *  const parentName = parent?parent.name+'-':'';
   *  _.each(_.range(0,count),i=>{
   *    const sortNo = _.randi(0,count);
   *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
   *  });
   *  return data;
   * }
   *
   * function genTree(depth,parents,data){
   *  _.each(parents,r=>{
   *    const children = addChildren(_.randi(1,4),r);
   *    if(depth-1>0){
   *      genTree(depth-1,children,data);
   *    }
   *    _.append(data,...children);
   *  });
   * }
   *
   * const roots = addChildren(2);
   * const data = [];
   * genTree(2,roots,data);
   * _.insert(data,0,...roots);
   * const tree = _.arrayToTree(data,'id','pid',{sortKey:'sortNo'});
   *
   * _.walkTree(tree,(node,parentNode,chain)=>console.log('node',node.name,'sortNo',node.sortNo,'chain',_.map(chain,n=>n.name)))
   *
   * @param treeNodes 一组节点或一个节点
   * @param callback (node,parentNode,chain,level,index)回调函数，如果返回false则中断遍历，如果返回-1则停止分支遍历
   * @param options 自定义选项
   * @param options.childrenKey 包含子节点容器的key。默认'children'
   * @since 1.0.0
   */
  function walkTree(treeNodes, callback, options) {
      _walkTree(treeNodes, callback, options);
  }
  function _walkTree(treeNodes, callback, options, ...rest) {
      options = options || {};
      const parentNode = rest[0];
      const chain = rest[1] || [];
      const childrenKey = options.childrenKey || 'children';
      const data = isArrayLike(treeNodes) ? treeNodes : [treeNodes];
      for (let i = 0; i < data.length; i++) {
          const node = data[i];
          const rs = callback(node, parentNode, chain, chain.length, i);
          if (rs === false)
              return;
          if (rs === -1)
              continue;
          if (!isEmpty(node[childrenKey])) {
              let nextChain = [node];
              if (parentNode) {
                  nextChain = chain.concat(nextChain);
              }
              const rs = _walkTree(node[childrenKey], callback, options, node, nextChain);
              if (rs === false)
                  return;
          }
      }
  }

  /**
   * 类似<code>findTreeNodes</code>，但会返回包含所有父节点的节点副本数组，已做去重处理。
   * 结果集可用于重新构建tree
   * @example
   * //生成测试数据
   * function addChildren(count,parent){
   *  const data = [];
   *  const pid = parent?parent.id:null;
   *  const parentName = parent?parent.name+'-':'';
   *  _.each(_.range(0,count),i=>{
   *    const sortNo = _.randi(1,4);
   *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
   *  });
   *  return data;
   * }
   *
   * function genTree(depth,parents,data){
   *  _.each(parents,r=>{
   *    const children = addChildren(_.randi(1,4),r);
   *    if(depth-1>0){
   *      genTree(depth-1,children,data);
   *    }
   *    _.append(data,...children);
   *  });
   * }
   *
   * const roots = addChildren(2);
   * const data = [];
   * genTree(2,roots,data);
   * _.insert(data,0,...roots);
   * const tree = _.arrayToTree(data,'id','pid',{sortKey:'sortNo'});
   *
   * _.each(_.filterTree(tree,node=>node.sortNo>1),node=>console.log(_.omit(node,'children','id','pid')))
   *
   *
   * @param treeNodes 一组节点或一个节点
   * @param predicate (node,parentNode,chain,level) 断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @param options 自定义选项
   * @param options.childrenKey 包含子节点容器的key。默认'children'
   * @returns 找到的符合条件的所有节点副本或空数组
   * @since 1.0.0
   */
  function filterTree(treeNodes, predicate, options) {
      options = options || {};
      const callback = iteratee(predicate);
      const childrenKey = options.childrenKey || 'children';
      let nodes = [];
      walkTree(treeNodes, (n, p, c, l) => {
          const rs = callback(n, p, c, l);
          if (rs) {
              c.forEach((node) => {
                  if (!includes(nodes, node)) {
                      nodes.push(node);
                  }
              });
              nodes.push(n);
          }
      }, options);
      nodes = map(nodes, (item) => cloneWith(item, (v, k) => (k === childrenKey ? null : v)));
      return nodes;
  }

  /**
   * 查找给定节点及所有子孙节点中符合断言的第一个节点并返回
   * @example
   * //生成测试数据
   * function addChildren(count,parent){
   *  const data = [];
   *  const pid = parent?parent.id:null;
   *  const parentName = parent?parent.name+'-':'';
   *  _.each(_.range(0,count),i=>{
   *    const sortNo = _.randi(0,count);
   *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
   *  });
   *  return data;
   * }
   *
   * function genTree(depth,parents,data){
   *  _.each(parents,r=>{
   *    const children = addChildren(_.randi(2,5),r);
   *    if(depth-1>0){
   *      genTree(depth-1,children,data);
   *    }
   *    _.append(data,...children);
   *  });
   * }
   *
   * const roots = addChildren(2);
   * const data = [];
   * genTree(4,roots,data);
   * _.insert(data,0,...roots);
   * const tree = _.arrayToTree(data,'id','pid',{sortKey:'sortNo'});
   *
   * console.log(_.omit(_.findTreeNode(tree,node=>node.sortNo>2),'children','id','pid'))
   *
   *
   * @param treeNodes 一组节点或一个节点
   * @param predicate (node,parentNode,chain,level,index) 断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @param options 自定义选项
   * @param options.childrenKey 包含子节点容器的key。默认'children'
   * @returns 第一个匹配断言的节点或undefined
   * @since 1.0.0
   */
  function findTreeNode(treeNodes, predicate, options) {
      const callback = iteratee(predicate);
      let node;
      walkTree(treeNodes, (n, p, c, l, i) => {
          const rs = callback(n, p, c, l, i);
          if (rs) {
              node = n;
              return false;
          }
      }, options);
      return node;
  }

  /**
   * 查找给定节点及所有子孙节点中符合断言的所有节点并返回
   * @example
   * //生成测试数据
   * function addChildren(count,parent){
   *  const data = [];
   *  const pid = parent?parent.id:null;
   *  const parentName = parent?parent.name+'-':'';
   *  _.each(_.range(0,count),i=>{
   *    const sortNo = _.randi(0,count);
   *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
   *  });
   *  return data;
   * }
   *
   * function genTree(depth,parents,data){
   *  _.each(parents,r=>{
   *    const children = addChildren(_.randi(2,5),r);
   *    if(depth-1>0){
   *      genTree(depth-1,children,data);
   *    }
   *    _.append(data,...children);
   *  });
   * }
   *
   * const roots = addChildren(2);
   * const data = [];
   * genTree(3,roots,data);
   * _.insert(data,0,...roots);
   * const tree = _.arrayToTree(data,'id','pid',{sortKey:'sortNo'});
   *
   * _.each(_.findTreeNodes(tree,node=>node.sortNo>2),node=>console.log(_.omit(node,'children','id','pid')))
   *
   *
   * @param treeNodes 一组节点或一个节点
   * @param predicate (node,parentNode,chain,level,index) 断言
   * <br>当断言是函数时回调参数见定义
   * <br>其他类型请参考 {@link utils!iteratee}
   * @param options 自定义选项
   * @param options.childrenKey 包含子节点容器的key。默认'children'
   * @returns 找到的符合条件的所有节点或空数组
   * @since 1.0.0
   */
  function findTreeNodes(treeNodes, predicate, options) {
      const callback = iteratee(predicate);
      const nodes = [];
      walkTree(treeNodes, (n, p, c, l, i) => {
          const rs = callback(n, p, c, l, i);
          if (rs) {
              nodes.push(n);
          }
      }, options);
      return nodes;
  }

  /**
   * 对给定节点及所有子孙节点(同级)排序
   * @example
   * //生成测试数据
   * function addChildren(count,parent){
   *  const data = [];
   *  const pid = parent?parent.id:null;
   *  const parentName = parent?parent.name+'-':'';
   *  _.each(_.range(0,count),i=>{
   *    const sortNo = _.randi(0,9);
   *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
   *  });
   *  return data;
   * }
   *
   * function genTree(depth,parents,data){
   *  _.each(parents,r=>{
   *    const children = addChildren(_.randi(1,4),r);
   *    if(depth-1>0){
   *      genTree(depth-1,children,data);
   *    }
   *    _.append(data,...children);
   *  });
   * }
   *
   * const roots = addChildren(1);
   * const data = [];
   * genTree(2,roots,data);
   * _.insert(data,0,...roots);
   * let tree = _.arrayToTree(data,'id','pid');
   *
   * console.log('Before sort---------------');
   * _.walkTree(_.cloneDeep(tree),(parentNode,node,chain)=>console.log('node',node.name,'sortNo',node.sortNo))
   * _.sortTree(tree,(a,b)=>a.sortNo - b.sortNo);
   * console.log('After sort---------------');
   * _.walkTree(tree,(parentNode,node,chain)=>console.log('node',node.name,'sortNo',node.sortNo))
   *
   * @param treeNodes 一组节点或一个节点
   * @param comparator (a,b) 排序函数
   * @param options 自定义选项
   * @param options.childrenKey 包含子节点容器的key。默认'children'
   *
   * @since 1.0.0
   */
  function sortTree(treeNodes, comparator, options) {
      options = options || {};
      const childrenKey = options.childrenKey || 'children';
      const data = isArray(treeNodes)
          ? treeNodes
          : [treeNodes];
      data.sort((a, b) => comparator(a, b));
      data.forEach((node) => {
          if (!isEmpty(node[childrenKey])) {
              sortTree(node[childrenKey], comparator);
          }
      });
  }

  var tree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    arrayToTree: arrayToTree,
    closest: closest,
    filterTree: filterTree,
    findTreeNode: findTreeNode,
    findTreeNodes: findTreeNodes,
    sortTree: sortTree,
    walkTree: walkTree
  });

  /* eslint-disable no-invalid-this */
  /* eslint-disable require-jsdoc */
  /* eslint-disable max-len */
  /**
   * 函数链操作相关函数
   * @author holyhigh
   */
  /**
   * chain 函数集
   */
  class ChainFx {
      append(...values) { return get(FuncChain.prototype, '_append').call(this, ...arguments); }
      chunk(size = 1) { return get(FuncChain.prototype, '_chunk').call(this, ...arguments); }
      compact() { return get(FuncChain.prototype, '_compact').call(this, ...arguments); }
      concat() { return get(FuncChain.prototype, '_concat').call(this, ...arguments); }
      except() { return get(FuncChain.prototype, '_except').call(this, ...arguments); }
      fill(value, start = 0, end) { return get(FuncChain.prototype, '_fill').call(this, ...arguments); }
      findIndex(predicate, fromIndex) { return get(FuncChain.prototype, '_findIndex').call(this, ...arguments); }
      findLastIndex(predicate, fromIndex) { return get(FuncChain.prototype, '_findLastIndex').call(this, ...arguments); }
      first() { return get(FuncChain.prototype, '_first').call(this, ...arguments); }
      flat(depth = 1) { return get(FuncChain.prototype, '_flat').call(this, ...arguments); }
      flatDeep() { return get(FuncChain.prototype, '_flatDeep').call(this, ...arguments); }
      initial() { return get(FuncChain.prototype, '_initial').call(this, ...arguments); }
      insert(index, ...values) { return get(FuncChain.prototype, '_insert').call(this, ...arguments); }
      intersect() { return get(FuncChain.prototype, '_intersect').call(this, ...arguments); }
      join(separator) { return get(FuncChain.prototype, '_join').call(this, ...arguments); }
      last() { return get(FuncChain.prototype, '_last').call(this, ...arguments); }
      pop(index) { return get(FuncChain.prototype, '_pop').call(this, ...arguments); }
      pull(...values) { return get(FuncChain.prototype, '_pull').call(this, ...arguments); }
      range(end, step) { return get(FuncChain.prototype, '_range').call(this, ...arguments); }
      remove(predicate) { return get(FuncChain.prototype, '_remove').call(this, ...arguments); }
      reverse() { return get(FuncChain.prototype, '_reverse').call(this, ...arguments); }
      slice(begin, end) { return get(FuncChain.prototype, '_slice').call(this, ...arguments); }
      sortedIndex(value) { return get(FuncChain.prototype, '_sortedIndex').call(this, ...arguments); }
      sortedIndexBy(value, itee) { return get(FuncChain.prototype, '_sortedIndexBy').call(this, ...arguments); }
      tail() { return get(FuncChain.prototype, '_tail').call(this, ...arguments); }
      take(length) { return get(FuncChain.prototype, '_take').call(this, ...arguments); }
      takeRight(length) { return get(FuncChain.prototype, '_takeRight').call(this, ...arguments); }
      union() { return get(FuncChain.prototype, '_union').call(this, ...arguments); }
      uniq() { return get(FuncChain.prototype, '_uniq').call(this, ...arguments); }
      uniqBy(itee) { return get(FuncChain.prototype, '_uniqBy').call(this, ...arguments); }
      unzip() { return get(FuncChain.prototype, '_unzip').call(this, ...arguments); }
      without(...values) { return get(FuncChain.prototype, '_without').call(this, ...arguments); }
      zip() { return get(FuncChain.prototype, '_zip').call(this, ...arguments); }
      zipObject(values) { return get(FuncChain.prototype, '_zipObject').call(this, ...arguments); }
      zipWith() { return get(FuncChain.prototype, '_zipWith').call(this, ...arguments); }
      countBy(itee) { return get(FuncChain.prototype, '_countBy').call(this, ...arguments); }
      every(predicate) { return get(FuncChain.prototype, '_every').call(this, ...arguments); }
      filter(predicate) { return get(FuncChain.prototype, '_filter').call(this, ...arguments); }
      find(predicate) { return get(FuncChain.prototype, '_find').call(this, ...arguments); }
      findLast(predicate) { return get(FuncChain.prototype, '_findLast').call(this, ...arguments); }
      flatMap(itee, depth) { return get(FuncChain.prototype, '_flatMap').call(this, ...arguments); }
      flatMapDeep(itee) { return get(FuncChain.prototype, '_flatMapDeep').call(this, ...arguments); }
      groupBy(itee) { return get(FuncChain.prototype, '_groupBy').call(this, ...arguments); }
      includes(value, fromIndex) { return get(FuncChain.prototype, '_includes').call(this, ...arguments); }
      keyBy(itee) { return get(FuncChain.prototype, '_keyBy').call(this, ...arguments); }
      map(itee) { return get(FuncChain.prototype, '_map').call(this, ...arguments); }
      partition(predicate) { return get(FuncChain.prototype, '_partition').call(this, ...arguments); }
      reduce(callback, initialValue) { return get(FuncChain.prototype, '_reduce').call(this, ...arguments); }
      reject(predicate) { return get(FuncChain.prototype, '_reject').call(this, ...arguments); }
      sample() { return get(FuncChain.prototype, '_sample').call(this, ...arguments); }
      sampleSize(count) { return get(FuncChain.prototype, '_sampleSize').call(this, ...arguments); }
      shuffle() { return get(FuncChain.prototype, '_shuffle').call(this, ...arguments); }
      size() { return get(FuncChain.prototype, '_size').call(this, ...arguments); }
      some(predicate) { return get(FuncChain.prototype, '_some').call(this, ...arguments); }
      sort(comparator) { return get(FuncChain.prototype, '_sort').call(this, ...arguments); }
      sortBy(itee) { return get(FuncChain.prototype, '_sortBy').call(this, ...arguments); }
      toArray() { return get(FuncChain.prototype, '_toArray').call(this, ...arguments); }
      addTime(amount, type) { return get(FuncChain.prototype, '_addTime').call(this, ...arguments); }
      compareDate(date2, type) { return get(FuncChain.prototype, '_compareDate').call(this, ...arguments); }
      formatDate(pattern) { return get(FuncChain.prototype, '_formatDate').call(this, ...arguments); }
      getDayOfYear() { return get(FuncChain.prototype, '_getDayOfYear').call(this, ...arguments); }
      getWeekOfMonth() { return get(FuncChain.prototype, '_getWeekOfMonth').call(this, ...arguments); }
      getWeekOfYear() { return get(FuncChain.prototype, '_getWeekOfYear').call(this, ...arguments); }
      isLeapYear() { return get(FuncChain.prototype, '_isLeapYear').call(this, ...arguments); }
      isSameDay(date2) { return get(FuncChain.prototype, '_isSameDay').call(this, ...arguments); }
      now() { return get(FuncChain.prototype, '_now').call(this, ...arguments); }
      toDate() { return get(FuncChain.prototype, '_toDate').call(this, ...arguments); }
      after(count) { return get(FuncChain.prototype, '_after').call(this, ...arguments); }
      alt(interceptor1, interceptor2) { return get(FuncChain.prototype, '_alt').call(this, ...arguments); }
      bind(thisArg, ...args) { return get(FuncChain.prototype, '_bind').call(this, ...arguments); }
      bindAll(...methodNames) { return get(FuncChain.prototype, '_bindAll').call(this, ...arguments); }
      call(...args) { return get(FuncChain.prototype, '_call').call(this, ...arguments); }
      compose() { return get(FuncChain.prototype, '_compose').call(this, ...arguments); }
      delay(wait, ...args) { return get(FuncChain.prototype, '_delay').call(this, ...arguments); }
      fval(args) { return get(FuncChain.prototype, '_fval').call(this, ...arguments); }
      once() { return get(FuncChain.prototype, '_once').call(this, ...arguments); }
      partial(...args) { return get(FuncChain.prototype, '_partial').call(this, ...arguments); }
      tap(interceptor) { return get(FuncChain.prototype, '_tap').call(this, ...arguments); }
      isArray() { return get(FuncChain.prototype, '_isArray').call(this, ...arguments); }
      isArrayLike() { return get(FuncChain.prototype, '_isArrayLike').call(this, ...arguments); }
      isBlank() { return get(FuncChain.prototype, '_isBlank').call(this, ...arguments); }
      isBoolean() { return get(FuncChain.prototype, '_isBoolean').call(this, ...arguments); }
      isDate() { return get(FuncChain.prototype, '_isDate').call(this, ...arguments); }
      isDefined() { return get(FuncChain.prototype, '_isDefined').call(this, ...arguments); }
      isElement() { return get(FuncChain.prototype, '_isElement').call(this, ...arguments); }
      isEmpty() { return get(FuncChain.prototype, '_isEmpty').call(this, ...arguments); }
      isEqual(b) { return get(FuncChain.prototype, '_isEqual').call(this, ...arguments); }
      isEqualWith(b, comparator) { return get(FuncChain.prototype, '_isEqualWith').call(this, ...arguments); }
      isError() { return get(FuncChain.prototype, '_isError').call(this, ...arguments); }
      isFinite() { return get(FuncChain.prototype, '_isFinite').call(this, ...arguments); }
      isFunction() { return get(FuncChain.prototype, '_isFunction').call(this, ...arguments); }
      isInteger() { return get(FuncChain.prototype, '_isInteger').call(this, ...arguments); }
      isMap() { return get(FuncChain.prototype, '_isMap').call(this, ...arguments); }
      isMatch(props) { return get(FuncChain.prototype, '_isMatch').call(this, ...arguments); }
      isMatchWith(props, comparator = eq$1) { return get(FuncChain.prototype, '_isMatchWith').call(this, ...arguments); }
      isNaN() { return get(FuncChain.prototype, '_isNaN').call(this, ...arguments); }
      isNil() { return get(FuncChain.prototype, '_isNil').call(this, ...arguments); }
      isNull() { return get(FuncChain.prototype, '_isNull').call(this, ...arguments); }
      isNumber() { return get(FuncChain.prototype, '_isNumber').call(this, ...arguments); }
      isObject() { return get(FuncChain.prototype, '_isObject').call(this, ...arguments); }
      isPlainObject() { return get(FuncChain.prototype, '_isPlainObject').call(this, ...arguments); }
      isRegExp() { return get(FuncChain.prototype, '_isRegExp').call(this, ...arguments); }
      isSafeInteger() { return get(FuncChain.prototype, '_isSafeInteger').call(this, ...arguments); }
      isSet() { return get(FuncChain.prototype, '_isSet').call(this, ...arguments); }
      isString() { return get(FuncChain.prototype, '_isString').call(this, ...arguments); }
      isSymbol() { return get(FuncChain.prototype, '_isSymbol').call(this, ...arguments); }
      isUndefined() { return get(FuncChain.prototype, '_isUndefined').call(this, ...arguments); }
      isWeakMap() { return get(FuncChain.prototype, '_isWeakMap').call(this, ...arguments); }
      isWeakSet() { return get(FuncChain.prototype, '_isWeakSet').call(this, ...arguments); }
      add(b) { return get(FuncChain.prototype, '_add').call(this, ...arguments); }
      divide(b) { return get(FuncChain.prototype, '_divide').call(this, ...arguments); }
      max() { return get(FuncChain.prototype, '_max').call(this, ...arguments); }
      mean() { return get(FuncChain.prototype, '_mean').call(this, ...arguments); }
      min() { return get(FuncChain.prototype, '_min').call(this, ...arguments); }
      minmax(max, value) { return get(FuncChain.prototype, '_minmax').call(this, ...arguments); }
      multiply(b) { return get(FuncChain.prototype, '_multiply').call(this, ...arguments); }
      randf(max) { return get(FuncChain.prototype, '_randf').call(this, ...arguments); }
      randi(max) { return get(FuncChain.prototype, '_randi').call(this, ...arguments); }
      subtract(b) { return get(FuncChain.prototype, '_subtract').call(this, ...arguments); }
      sum() { return get(FuncChain.prototype, '_sum').call(this, ...arguments); }
      formatNumber(pattern = '#,##0.00') { return get(FuncChain.prototype, '_formatNumber').call(this, ...arguments); }
      gt(b) { return get(FuncChain.prototype, '_gt').call(this, ...arguments); }
      gte(b) { return get(FuncChain.prototype, '_gte').call(this, ...arguments); }
      inRange(start, end) { return get(FuncChain.prototype, '_inRange').call(this, ...arguments); }
      lt(b) { return get(FuncChain.prototype, '_lt').call(this, ...arguments); }
      lte(b) { return get(FuncChain.prototype, '_lte').call(this, ...arguments); }
      toInteger() { return get(FuncChain.prototype, '_toInteger').call(this, ...arguments); }
      toNumber() { return get(FuncChain.prototype, '_toNumber').call(this, ...arguments); }
      assign(...sources) { return get(FuncChain.prototype, '_assign').call(this, ...arguments); }
      assignWith(...sources) { return get(FuncChain.prototype, '_assignWith').call(this, ...arguments); }
      clone() { return get(FuncChain.prototype, '_clone').call(this, ...arguments); }
      cloneDeep() { return get(FuncChain.prototype, '_cloneDeep').call(this, ...arguments); }
      cloneDeepWith(handler) { return get(FuncChain.prototype, '_cloneDeepWith').call(this, ...arguments); }
      cloneWith(handler = identity) { return get(FuncChain.prototype, '_cloneWith').call(this, ...arguments); }
      defaults(...sources) { return get(FuncChain.prototype, '_defaults').call(this, ...arguments); }
      defaultsDeep(...sources) { return get(FuncChain.prototype, '_defaultsDeep').call(this, ...arguments); }
      eq(b) { return get(FuncChain.prototype, '_eq').call(this, ...arguments); }
      findKey(predicate) { return get(FuncChain.prototype, '_findKey').call(this, ...arguments); }
      fromPairs() { return get(FuncChain.prototype, '_fromPairs').call(this, ...arguments); }
      functions() { return get(FuncChain.prototype, '_functions').call(this, ...arguments); }
      get(path, defaultValue) { return get(FuncChain.prototype, '_get').call(this, ...arguments); }
      has(key) { return get(FuncChain.prototype, '_has').call(this, ...arguments); }
      keys() { return get(FuncChain.prototype, '_keys').call(this, ...arguments); }
      keysIn() { return get(FuncChain.prototype, '_keysIn').call(this, ...arguments); }
      merge(...sources) { return get(FuncChain.prototype, '_merge').call(this, ...arguments); }
      mergeWith(...sources) { return get(FuncChain.prototype, '_mergeWith').call(this, ...arguments); }
      omit(...props) { return get(FuncChain.prototype, '_omit').call(this, ...arguments); }
      omitBy(predicate) { return get(FuncChain.prototype, '_omitBy').call(this, ...arguments); }
      pick(...props) { return get(FuncChain.prototype, '_pick').call(this, ...arguments); }
      pickBy(predicate) { return get(FuncChain.prototype, '_pickBy').call(this, ...arguments); }
      prop() { return get(FuncChain.prototype, '_prop').call(this, ...arguments); }
      set(path, value) { return get(FuncChain.prototype, '_set').call(this, ...arguments); }
      toObject() { return get(FuncChain.prototype, '_toObject').call(this, ...arguments); }
      toPairs() { return get(FuncChain.prototype, '_toPairs').call(this, ...arguments); }
      unset(path) { return get(FuncChain.prototype, '_unset').call(this, ...arguments); }
      values() { return get(FuncChain.prototype, '_values').call(this, ...arguments); }
      valuesIn() { return get(FuncChain.prototype, '_valuesIn').call(this, ...arguments); }
      camelCase() { return get(FuncChain.prototype, '_camelCase').call(this, ...arguments); }
      capitalize() { return get(FuncChain.prototype, '_capitalize').call(this, ...arguments); }
      endsWith(searchStr, position) { return get(FuncChain.prototype, '_endsWith').call(this, ...arguments); }
      escapeRegExp() { return get(FuncChain.prototype, '_escapeRegExp').call(this, ...arguments); }
      indexOf(search, fromIndex) { return get(FuncChain.prototype, '_indexOf').call(this, ...arguments); }
      kebabCase() { return get(FuncChain.prototype, '_kebabCase').call(this, ...arguments); }
      lastIndexOf(search, fromIndex) { return get(FuncChain.prototype, '_lastIndexOf').call(this, ...arguments); }
      lowerCase() { return get(FuncChain.prototype, '_lowerCase').call(this, ...arguments); }
      lowerFirst() { return get(FuncChain.prototype, '_lowerFirst').call(this, ...arguments); }
      padEnd(len, padString) { return get(FuncChain.prototype, '_padEnd').call(this, ...arguments); }
      padStart(len, padString) { return get(FuncChain.prototype, '_padStart').call(this, ...arguments); }
      padZ(len) { return get(FuncChain.prototype, '_padZ').call(this, ...arguments); }
      pascalCase() { return get(FuncChain.prototype, '_pascalCase').call(this, ...arguments); }
      repeat(count) { return get(FuncChain.prototype, '_repeat').call(this, ...arguments); }
      replace(searchValue, replaceValue) { return get(FuncChain.prototype, '_replace').call(this, ...arguments); }
      replaceAll(searchValue, replaceValue) { return get(FuncChain.prototype, '_replaceAll').call(this, ...arguments); }
      snakeCase() { return get(FuncChain.prototype, '_snakeCase').call(this, ...arguments); }
      split(separator, limit) { return get(FuncChain.prototype, '_split').call(this, ...arguments); }
      startsWith(searchStr, position) { return get(FuncChain.prototype, '_startsWith').call(this, ...arguments); }
      substring(indexStart, indexEnd) { return get(FuncChain.prototype, '_substring').call(this, ...arguments); }
      test(pattern, flags) { return get(FuncChain.prototype, '_test').call(this, ...arguments); }
      toFixed(scale) { return get(FuncChain.prototype, '_toFixed').call(this, ...arguments); }
      toString() { return get(FuncChain.prototype, '_toString').call(this, ...arguments); }
      trim() { return get(FuncChain.prototype, '_trim').call(this, ...arguments); }
      trimEnd() { return get(FuncChain.prototype, '_trimEnd').call(this, ...arguments); }
      trimStart() { return get(FuncChain.prototype, '_trimStart').call(this, ...arguments); }
      truncate(len, options) { return get(FuncChain.prototype, '_truncate').call(this, ...arguments); }
      upperCase() { return get(FuncChain.prototype, '_upperCase').call(this, ...arguments); }
      upperFirst() { return get(FuncChain.prototype, '_upperFirst').call(this, ...arguments); }
      arrayToTree(idKey = 'id', pidKey, options = {}) { return get(FuncChain.prototype, '_arrayToTree').call(this, ...arguments); }
      closest(predicate, parentKey) { return get(FuncChain.prototype, '_closest').call(this, ...arguments); }
      filterTree(predicate, options) { return get(FuncChain.prototype, '_filterTree').call(this, ...arguments); }
      findTreeNode(predicate, options) { return get(FuncChain.prototype, '_findTreeNode').call(this, ...arguments); }
      findTreeNodes(predicate, options) { return get(FuncChain.prototype, '_findTreeNodes').call(this, ...arguments); }
      alphaId() { return get(FuncChain.prototype, '_alphaId').call(this, ...arguments); }
      defaultTo(defaultValue) { return get(FuncChain.prototype, '_defaultTo').call(this, ...arguments); }
      matcher() { return get(FuncChain.prototype, '_matcher').call(this, ...arguments); }
      noConflict() { return get(FuncChain.prototype, '_noConflict').call(this, ...arguments); }
      snowflakeId(epoch) { return get(FuncChain.prototype, '_snowflakeId').call(this, ...arguments); }
      times(iteratee) { return get(FuncChain.prototype, '_times').call(this, ...arguments); }
      toPath() { return get(FuncChain.prototype, '_toPath').call(this, ...arguments); }
      uniqueId() { return get(FuncChain.prototype, '_uniqueId').call(this, ...arguments); }
      uuid() { return get(FuncChain.prototype, '_uuid').call(this, ...arguments); }
  } //#cfx
  /**
   * 用于定义FuncChain对象并构造函数链
   * 注意，该类仅用于内部构造函数链
   */
  class FuncChain extends ChainFx {
      /**
       * @internal
       */
      constructor(v) {
          super();
          this._wrappedValue = v;
          this._chain = [];
      }
      /**
       * 惰性计算。执行函数链并返回计算结果
       * @example
       * //2-4
       * console.log(_([1,2,3,4]).map(v=>v+1).filter(v=>v%2===0).take(2).join('-').value())
       * //[1,2,2,1]
       * console.log(_(["{a:1,b:2}","{a:2,b:1}"]).map((v) => _.fval(v)).map(v=>[v.a,v.b]).join().value())
       * //[1,2,3,4]
       * console.log(_([1,2,3,4]).value())
       *
       * @returns 执行函数链返回的值
       */
      value() {
          let comprehension = isArrayLike(this._wrappedValue)
              ? createComprehension()
              : null;
          const maxChainIndex = this._chain.length - 1;
          return this._chain.reduce((acc, v, i) => {
              const params = [acc, ...v.params];
              if (comprehension) {
                  let rs;
                  const sig = buildComprehension(comprehension, v.fn, v.params);
                  if (sig > 0 || (!sig && maxChainIndex === i)) {
                      rs = execComprehension(comprehension, acc);
                      if (comprehension.tap) {
                          comprehension.tap(rs);
                      }
                      comprehension = null;
                  }
                  if (sig > 1) {
                      comprehension = createComprehension(v.fn, v.params);
                  }
                  if (rs) {
                      return sig !== 1 ? rs : v.fn(...[rs, ...v.params]);
                  }
                  return acc;
              }
              if (CAN_COMPREHENSIONS.includes(v.fn.name)) {
                  comprehension = createComprehension();
                  return v.fn(...[acc, ...v.params]);
              }
              return v.fn(...params);
          }, this._wrappedValue);
      }
  }
  const CAN_COMPREHENSIONS = [split.name, toArray.name, range.name];
  function createComprehension(fn, params) {
      const comprehension = {
          forEachRight: false,
          goalSettings: [],
          range: [],
          reverse: false,
          count: undefined,
          tap: undefined,
          returnEl: false,
      };
      if (fn && params) {
          buildComprehension(comprehension, fn, params);
      }
      return comprehension;
  }
  function buildComprehension(comprehension, fn, params) {
      const fnName = fn.name;
      switch (fnName) {
          case map.name:
          case filter.name:
              if (size(comprehension.range) > 0 || isDefined(comprehension.count))
                  return 2;
              let fn = params[0];
              if (!isFunction(fn)) {
                  fn = iteratee(params[0]);
              }
              comprehension.goalSettings.push({ type: fnName, fn: fn });
              break;
          case reverse.name:
              if (size(comprehension.range) < 1) {
                  comprehension.forEachRight = !comprehension.forEachRight;
              }
              else {
                  comprehension.reverse = !comprehension.reverse;
              }
              break;
          case slice.name:
              if (size(comprehension.range) > 0)
                  return 2;
              comprehension.range[0] = params[0];
              comprehension.range[1] = params[1];
              break;
          case tail.name:
              if (size(comprehension.range) > 0)
                  return 2;
              comprehension.range[0] = 1;
              comprehension.range[1] = params[1];
              break;
          case take.name:
              if (isUndefined(comprehension.count) || params[0] < comprehension.count) {
                  comprehension.count = params[0];
              }
              break;
          case first.name:
          case first.name:
              if (isUndefined(comprehension.count) || 1 < comprehension.count) {
                  comprehension.count = 1;
                  comprehension.returnEl = true;
              }
              break;
          case last.name:
              comprehension.count = 1;
              comprehension.returnEl = true;
              comprehension.forEachRight = true;
              break;
          case tap.name:
              comprehension.tap = params[0];
              break;
          default:
              return 1;
      }
      return 0;
  }
  function execComprehension(comprehension, collection) {
      const targets = [];
      let targetIndex = 0;
      if (!comprehension.count && comprehension.range.length > 0) {
          comprehension.count = comprehension.range[1] - comprehension.range[0];
      }
      const isReverse = comprehension.reverse;
      const count = comprehension.count;
      const gs = comprehension.goalSettings;
      const gsLen = gs.length;
      const range = comprehension.range;
      const hasRange = range.length > 0;
      const forEach = comprehension.forEachRight ? eachRight : each;
      forEach(collection, (v, k) => {
          let t = v;
          // before save target
          for (let i = 0; i < gsLen; i++) {
              const setting = gs[i];
              if (setting.type === map.name) {
                  t = setting.fn(t, k);
              }
              else if (setting.type === filter.name) {
                  if (!setting.fn(t, k)) {
                      return;
                  }
              }
          } // for end
          if (hasRange && targetIndex++ < range[0])
              return;
          if (hasRange && targetIndex > range[1])
              return false;
          if (targets.length === count)
              return false;
          if (isReverse) {
              targets.unshift(t);
          }
          else {
              targets.push(t);
          }
      });
      if (targets.length === 1 && comprehension.returnEl) {
          return targets[0];
      }
      return targets;
  }

  /* eslint-disable require-jsdoc */
  /* eslint-disable no-invalid-this */
  /* eslint-disable max-len */
  const VERSION = "1.3.2"; //#ver
  /**
  * 显式开启myfx的函数链，返回一个包裹了参数v的myfx链式对象。函数链可以链接Myfx提供的所有函数，如
   <p>
  * 函数链使用惰性计算 —— 直到显示调用value()方法时，函数链才会进行计算并返回结果
  * </p>
  ```js
  _.chain([1,2,3,4]).map(v=>v+1).filter(v=>v%2===0).take(2).join('-').value()
  ```

  * 函数链与直接调用方法的区别不仅在于可以链式调用，更在于函数链是基于惰性求值的。
  * 上式中必须通过显式调用`value()`方法才能获取结果，
  * 而只有在`value()`方法调用时整个函数链才进行求值。
  *
  *
  * 惰性求值允许FuncChain实现捷径融合(shortcut fusion) —— 一项基于已有函数对数组循环次数进行大幅减少以提升性能的优化技术。
  * 下面的例子演示了原生函数链和Myfx函数链的性能差异
  * @example
  * let ary = _.range(20000000);
  console.time('native');
  let c = 0;
  let a = ary.map((v)=>{
     c++;
     return v+1;
   }).filter((v) => {
     c++;
     return v%2==0;
   })
   .reverse()
   .slice(1, 4)
  console.timeEnd('native');
  console.log(a, c, '次');//大约600ms左右，循环 40000000 次

  //Myfx
  ary = _.range(20000000);
  console.time('Myfx');
  let x = 0;
  let targets = _(ary)
   .map((v) => {
     x++;
     return v+1;
   })
   .filter((v) => {
     x++;
     return v%2==0;
   })
   .reverse()
   .slice(1, 4)
   .value();
  console.timeEnd('Myfx');
  console.log(targets, x, '次');//大约0.5ms左右，循环 18 次
  *
  * @param v
  * @returns Myfx对象
  */
  function chain(v) {
      return v instanceof FuncChain ? v : new FuncChain(v);
  }
  mixin(FuncChain, {
      ...str,
      ...num,
      ...datetime,
      ...is,
      ...object,
      ...collection,
      ...math,
      ...utils,
      ...functions,
      ...array,
      ...template,
      ...tree,
  });
  const myfx = {
      VERSION: VERSION,
      chain,
      ...str,
      ...num,
      ...datetime,
      ...is,
      ...object,
      ...collection,
      ...math,
      ...utils,
      ...functions,
      ...array,
      ...template,
      ...tree,
  };
  //bind _
  const ctx = globalThis;
  if (ctx.myff) {
      setTimeout(function () {
          ctx.__f_prev = ctx._;
          ctx._ = ctx.myfx = myfx;
      }, 0);
  }

  exports.VERSION = VERSION;
  exports.add = add;
  exports.addTime = addTime;
  exports.after = after;
  exports.alphaId = alphaId;
  exports.alt = alt;
  exports.append = append;
  exports.arrayToTree = arrayToTree;
  exports.assign = assign;
  exports.assignWith = assignWith;
  exports.bind = bind;
  exports.bindAll = bindAll;
  exports.call = call;
  exports.camelCase = camelCase;
  exports.capitalize = capitalize;
  exports.chain = chain;
  exports.chunk = chunk;
  exports.clone = clone;
  exports.cloneDeep = cloneDeep;
  exports.cloneDeepWith = cloneDeepWith;
  exports.cloneWith = cloneWith;
  exports.closest = closest;
  exports.compact = compact;
  exports.compareDate = compareDate;
  exports.compose = compose;
  exports.concat = concat;
  exports.countBy = countBy;
  exports.default = myfx;
  exports.defaultTo = defaultTo;
  exports.defaults = defaults;
  exports.defaultsDeep = defaultsDeep;
  exports.delay = delay;
  exports.divide = divide;
  exports.each = each;
  exports.eachRight = eachRight;
  exports.endsWith = endsWith;
  exports.eq = eq;
  exports.escapeRegExp = escapeRegExp;
  exports.every = every;
  exports.except = except;
  exports.fill = fill;
  exports.filter = filter;
  exports.filterTree = filterTree;
  exports.find = find;
  exports.findIndex = findIndex;
  exports.findKey = findKey;
  exports.findLast = findLast;
  exports.findLastIndex = findLastIndex;
  exports.findTreeNode = findTreeNode;
  exports.findTreeNodes = findTreeNodes;
  exports.first = first;
  exports.flat = flat;
  exports.flatDeep = flatDeep;
  exports.flatMap = flatMap;
  exports.flatMapDeep = flatMapDeep;
  exports.formatDate = formatDate;
  exports.formatNumber = formatNumber;
  exports.fromPairs = fromPairs;
  exports.functions = functions$1;
  exports.fval = fval;
  exports.get = get;
  exports.getDayOfYear = getDayOfYear;
  exports.getWeekOfMonth = getWeekOfMonth;
  exports.getWeekOfYear = getWeekOfYear;
  exports.groupBy = groupBy;
  exports.gt = gt;
  exports.gte = gte;
  exports.has = has;
  exports.head = first;
  exports.identity = identity;
  exports.inRange = inRange;
  exports.includes = includes;
  exports.indexOf = indexOf;
  exports.initial = initial;
  exports.insert = insert;
  exports.intersect = intersect;
  exports.isArray = isArray;
  exports.isArrayLike = isArrayLike;
  exports.isBlank = isBlank;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isDefined = isDefined;
  exports.isElement = isElement;
  exports.isEmpty = isEmpty;
  exports.isEqual = isEqual;
  exports.isEqualWith = isEqualWith;
  exports.isError = isError;
  exports.isFinite = isFinite;
  exports.isFunction = isFunction;
  exports.isInteger = isInteger;
  exports.isLeapYear = isLeapYear;
  exports.isMap = isMap;
  exports.isMatch = isMatch;
  exports.isMatchWith = isMatchWith;
  exports.isNaN = isNaN$1;
  exports.isNil = isNil;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isPlainObject = isPlainObject;
  exports.isRegExp = isRegExp;
  exports.isSafeInteger = isSafeInteger;
  exports.isSameDay = isSameDay;
  exports.isSet = isSet;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.isUndefined = isUndefined;
  exports.isWeakMap = isWeakMap;
  exports.isWeakSet = isWeakSet;
  exports.iteratee = iteratee;
  exports.join = join;
  exports.kebabCase = kebabCase;
  exports.keyBy = keyBy;
  exports.keys = keys;
  exports.keysIn = keysIn;
  exports.last = last;
  exports.lastIndexOf = lastIndexOf;
  exports.lowerCase = lowerCase;
  exports.lowerFirst = lowerFirst;
  exports.lt = lt;
  exports.lte = lte;
  exports.map = map;
  exports.matcher = matcher;
  exports.max = max;
  exports.mean = mean;
  exports.merge = merge;
  exports.mergeWith = mergeWith;
  exports.min = min;
  exports.minmax = minmax;
  exports.mixin = mixin;
  exports.multiply = multiply;
  exports.noConflict = noConflict;
  exports.noop = noop;
  exports.now = now;
  exports.omit = omit;
  exports.omitBy = omitBy;
  exports.once = once;
  exports.padEnd = padEnd;
  exports.padStart = padStart;
  exports.padZ = padZ;
  exports.partial = partial;
  exports.partition = partition;
  exports.pascalCase = pascalCase;
  exports.pick = pick;
  exports.pickBy = pickBy;
  exports.pop = pop;
  exports.prop = prop;
  exports.pull = pull;
  exports.randf = randf;
  exports.randi = randi;
  exports.range = range;
  exports.reduce = reduce;
  exports.reject = reject;
  exports.remove = remove;
  exports.repeat = repeat;
  exports.replace = replace;
  exports.replaceAll = replaceAll;
  exports.reverse = reverse;
  exports.sample = sample;
  exports.sampleSize = sampleSize;
  exports.set = set;
  exports.shuffle = shuffle;
  exports.size = size;
  exports.slice = slice;
  exports.snakeCase = snakeCase;
  exports.snowflakeId = snowflakeId;
  exports.some = some;
  exports.sort = sort;
  exports.sortBy = sortBy;
  exports.sortTree = sortTree;
  exports.sortedIndex = sortedIndex;
  exports.sortedIndexBy = sortedIndexBy;
  exports.split = split;
  exports.startsWith = startsWith;
  exports.substring = substring;
  exports.subtract = subtract;
  exports.sum = sum;
  exports.tail = tail;
  exports.take = take;
  exports.takeRight = takeRight;
  exports.tap = tap;
  exports.template = template$1;
  exports.test = test;
  exports.times = times;
  exports.toArray = toArray;
  exports.toDate = toDate;
  exports.toFixed = toFixed;
  exports.toInt = toInteger;
  exports.toInteger = toInteger;
  exports.toNumber = toNumber;
  exports.toObject = toObject;
  exports.toPairs = toPairs;
  exports.toPath = toPath;
  exports.toString = toString;
  exports.trim = trim;
  exports.trimEnd = trimEnd;
  exports.trimStart = trimStart;
  exports.truncate = truncate;
  exports.union = union;
  exports.uniq = uniq;
  exports.uniqBy = uniqBy;
  exports.uniqueId = uniqueId;
  exports.unset = unset;
  exports.unzip = unzip;
  exports.upperCase = upperCase;
  exports.upperFirst = upperFirst;
  exports.uuid = uuid;
  exports.values = values;
  exports.valuesIn = valuesIn;
  exports.walkTree = walkTree;
  exports.without = without;
  exports.zip = zip;
  exports.zipObject = zipObject;
  exports.zipWith = zipWith;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
