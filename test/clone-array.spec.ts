/**
 * @jest-environment jsdom
 *
 * 数组克隆回归（2026-10-22）。
 *
 * 背景：`cloneWith` / `cloneDeepWith` 曾用 `Object.create(Object.getPrototypeOf(obj))`
 * 给**所有**对象建空壳，数组因此变成「原型是 Array.prototype 的普通对象」——
 * `Array.isArray()` 为 false、没有 `length`、`push/map` 直接不可用、
 * `JSON.stringify` 输出 `{"0":…}`。
 *
 * 真实故障：`ce-button-group` 多选（字体 B/I/U、边框四边）里
 * `clone(this.selectedValues)` 把字符串数组退化成对象，宿主用
 * `Array.isArray(arg.value)` 判定载荷 ⇒ 判假 ⇒ 三个开关一起写成 undefined，
 * 界面上表现为「点了完全没反应」。
 *
 * 这组用例既锁 `Array.isArray`，也锁**数组方法可用**（伪数组过不了 `.map`）。
 */
import { clone, cloneDeep, cloneWith, cloneDeepWith } from "../src/index";

describe("clone 系列：数组必须克隆成真数组", () => {
  test("clone(数组) 是真数组且元素与方法可用", () => {
    const src = ["bold", "italic"];
    const c = clone(src);
    expect(Array.isArray(c)).toBe(true);
    expect(c).toEqual(src);
    expect(c).not.toBe(src);
    expect(c.length).toBe(2);
    expect(c.map((v) => v)).toEqual(src);
    expect(JSON.stringify(c)).toBe('["bold","italic"]');
  });

  test("clone(空数组) 保持真数组", () => {
    const c = clone([] as string[]);
    expect(Array.isArray(c)).toBe(true);
    expect(c.length).toBe(0);
  });

  test("clone 保留稀疏数组长度", () => {
    // eslint-disable-next-line no-sparse-arrays
    const src = [1, , 3];
    const c = clone(src);
    expect(Array.isArray(c)).toBe(true);
    expect(c.length).toBe(3);
  });

  test("clone 是浅拷贝：嵌套对象仍共享引用", () => {
    const inner = { a: 1 };
    const c = clone([inner]);
    expect(Array.isArray(c)).toBe(true);
    expect(c[0]).toBe(inner);
  });

  test("cloneDeep(数组) 深拷贝且嵌套数组仍是真数组", () => {
    const src = [{ a: [1, 2] }];
    const d = cloneDeep(src);
    expect(Array.isArray(d)).toBe(true);
    expect(Array.isArray(d[0].a)).toBe(true);
    expect(d).toEqual(src);
    expect(d[0]).not.toBe(src[0]);
    expect(d[0].a).not.toBe(src[0].a);
  });

  test("cloneWith / cloneDeepWith 对数组同样成立", () => {
    const a = cloneWith(["a", "b"], (v: string) => v.toUpperCase());
    expect(Array.isArray(a)).toBe(true);
    expect(a).toEqual(["A", "B"]);

    const b = cloneDeepWith([{ x: [1] }]);
    expect(Array.isArray(b)).toBe(true);
    expect(Array.isArray(b[0].x)).toBe(true);
    expect(b).toEqual([{ x: [1] }]);
  });

  test("数组子类保留原型", () => {
    class MyArr extends Array {}
    const src: number[] = new MyArr();
    src.push(1, 2);
    const c = clone(src);
    expect(Array.isArray(c)).toBe(true);
    expect(c instanceof MyArr).toBe(true);
    expect([...c]).toEqual([1, 2]);
  });

  test("TypedArray/ArrayBuffer/DataView 克隆为独立副本且可正常访问", () => {
    const ta = clone(new Int8Array([1, 2, 3]));
    expect(ta instanceof Int8Array).toBe(true);
    expect(Array.from(ta)).toEqual([1, 2, 3]);
    expect(ta[0]).toBe(1);

    const buf = new ArrayBuffer(4);
    const cb = clone(buf);
    expect(cb instanceof ArrayBuffer).toBe(true);
    expect(cb.byteLength).toBe(4);
    expect(cb).not.toBe(buf);

    const src = new Uint8Array([9, 8, 7]);
    const dv = new DataView(src.buffer, 1, 2);
    const cdv = clone(dv);
    expect(cdv instanceof DataView).toBe(true);
    expect(cdv.byteLength).toBe(2);
    expect(cdv.getUint8(0)).toBe(8);
    // 脱开原 buffer：改副本不影响源
    cdv.setUint8(0, 6);
    expect(src[1]).toBe(8);

    const deep = cloneDeep({ t: new Uint8Array([1, 2]) });
    expect(deep.t instanceof Uint8Array).toBe(true);
    expect(Array.from(deep.t)).toEqual([1, 2]);
    expect(deep.t).not.toBe(undefined);
  });
});
