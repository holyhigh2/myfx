import isArrayLike from "./is/isArrayLike";
import isMap from "./is/isMap";
import isObject from "./is/isObject";
import isSet from "./is/isSet";
import isString from "./is/isString";

function _eachIteratorRight<V, K extends string | number | symbol>(
  collection: any,
  callback: (
    value: V,
    index: K,
    collection: any
  ) => boolean | void | Promise<void>
) {
  let values
  let keys
  if (isString(collection) || isArrayLike(collection)) {
    let size = collection.length

    while (size--) {
      const r = callback(collection[size] as V, size as K, collection)
      if (r === false) return
    }

  } else if (isSet(collection)) {
    let size = collection.size

    values = Array.from(collection)
    while (size--) {
      const r = callback(values[size] as V, size as K, collection)
      if (r === false) return
    }
  } else if (isMap(collection)) {
    let size = collection.size

    keys = collection.keys()
    values = collection.values()

    keys = Array.from(keys)
    values = Array.from(values)
    while (size--) {
      const r = callback(values[size] as V, keys[size] as K, collection)
      if (r === false) return
    }
  } else if (isObject(collection)) {
    keys = Object.keys(collection)
    let size = keys.length

    while (size--) {
      const k = keys[size]
      const r = callback((collection as any)[k] as V, k as K, collection)
      if (r === false) return
    }
  }
}

export default _eachIteratorRight