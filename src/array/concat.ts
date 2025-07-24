import each from "../collection/each";
import isArrayLike from "../is/isArrayLike";
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
function concat(...arrays: any[]): any[] {
  if (arrays.length < 1) return []
  let rs = [];
  for (let i = 0; i < arrays.length; i++) {
    const item = arrays[i];
    if (isArrayLike(item)) {
      each(item, (v) => rs.push(v));
    } else {
      rs.push(item);
    }
  }
  return rs;
}

export default concat