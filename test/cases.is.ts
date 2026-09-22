/**
 * 测试用例
 */
const Datas: Record<string, any[]> = {
  isDefined: [
    [null, true], [undefined, false], [0, true]
  ],
  isUndefined: [
    [undefined, true], [null, false], [0, false]
  ],
  isArray: [
    [[], true], [document.body.children, false], [new Set(), false]
  ],
  isArrayLike: [
    ['abc123', true], [[], true], [document.body.children, true]
  ],
  isNull: [
    [null, true], [undefined, false], [0, false]
  ],
  isEmpty: [
    [null, true], [[], true], [{ }, true], [{ x: 1 }, false]
  ],
  isBlank: [
    ['  ', true], [null, true], [{}, false], ['     1', false]
  ],
  eq: [
    [NaN, NaN, true], [1, '1', false], [0, -0, true]
  ],
  isObject: [
    [1, false], [new String(), true], [true, false], [null, false]
  ],
  isPlainObject: [
    [1, false], [new String(), false], [{}, true], [new Object, true], [new Date, false]
  ],
  isMap: [
    [new Map(), true], [new WeakMap(), false], [{}, false]
  ],
  isWeakMap: [
    [new Map(), false], [new WeakMap(), true], [{}, false]
  ],
  isSet: [
    [new WeakSet(), false], [new Set(), true], [{}, false]
  ],
  isWeakSet: [
    [new WeakSet(), true], [new Set(), false], [{}, false]
  ],
  isBoolean: [
    [1, false], [false, true], [true, true]
  ],
  isDate: [
    [new Date(), true], [Date.now(), false], ['2020/1/1', false]
  ],
  isInteger: [
    [-0, true], [1.0, true], ['1', false], [Number.MAX_VALUE, true], [5.0000000000000001, true]
  ],
  isSafeInteger: [
    [-0, true], [1.0, true], ['1', false], [Number.MAX_VALUE, false], [5.0000000000000001, true]
  ],
  isNaN: [
    [NaN, true], [undefined, false], [null, false]
  ],
  isEqual: [
    [[new Date('2010-2-1'), /12/], [new Date(1264953600000), new RegExp('12')], true],
    [[new Date('2010-2-1'), 'abcd'], ['2010/2/1', 'Abcd'], false],
    [1, '1', false],
  ],
  isMatch: [
    [{ a: { x: 1, y: 2 }, b: 1 }, { b: 1 }, true],
    [{ a: { x: 1, y: 2 }, b: 1 }, { b: 2 }, false],
    [[{ x: 1, y: 2 }, { b: 1 }], [{ x: 1 }], true]
  ],
  isRegExp: [
    [new RegExp(''), true], [/1/, true], [{}, false]
  ],
  isElement: [
    [document, false], [document.documentElement, true], [document.body, true]
  ],
  isError: [
    [new TypeError(''), true], [Error, false], [{}, false]
  ],
  isSymbol: [
    [Symbol(), true], [Symbol.iterator, true], ['symbol', false]
  ],
  isFinite: [
    [Number.MAX_VALUE, true], [99999999999999999999999999999999999999999999999999999999999999999999999, true], [Infinity, false]
  ],
  isNil: [
    [null, true], [undefined, true], [0, false], [NaN, false]
  ],
  isAlnum: [
    ['123', true], ['123abc', true], [1, false]
  ],
  isAlpha: [
    ['𰻞𰻞mian', true], ['abc', true], [1, false]
  ],
  isCustomElement: [
    [document.body, false], [{}, false], [null, false]
  ],
  isIterator: [
    [new Map(), true], [new Map().values(), true], [{ a: 1 }, false]
  ],
  isNative: [
    [Array, true], [() => {}, false], [Math.max, true]
  ],
  isNode: [
    [document.createElement('i'), true], [document, true], [{}, false]
  ],
  isNumeric: [
    [1, true], ['-1.1', true], ['-1.1a', false]
  ],
  isPrimitive: [
    [1, true], [null, true], [new String(), false]
  ],
  isLowerCaseChar: [
    ['A', false], ['a', true], [null, false]
  ],
  isUpperCaseChar: [
    ['A', true], ['a', false], [null, false]
  ],
  isNumber: [
    [1, true], [Number.MAX_VALUE, true], ['1', false]
  ],
  isString: [
    [new String(''), true], ['', true], [1, false]
  ],
  isFunction: [
    [new Function(), true], [() => {}, true], [{}, false]
  ],
  isEqualWith: [
    [[new Date('2010-2-1'), 'abcd'], ['2010/2/1', 'Abcd'], (av: any, bv: any) => (av instanceof Date ? av.toLocaleDateString() === bv : String(av).toLowerCase() === String(bv).toLowerCase()), true],
    [1, 1, undefined, true],
    [{ a: 1 }, { a: 2 }, undefined, false]
  ],
  isMatchWith: [
    [{ a: { x: 1, y: 2 }, b: 1 }, { b: 1 }, (a: any, b: any) => a === b, true],
    [{ a: { x: 1, y: 2 }, b: 1 }, { b: '1' }, (a: any, b: any) => a === b, false],
    [{ a: null, b: 0 }, { a: '', b: '0' }, (a: any, b: any) => (a == null || a === '' ? b == null || b === '' : String(a) === String(b)), true]
  ],
}

export default Datas
