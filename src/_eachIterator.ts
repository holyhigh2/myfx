import isString from "./is/isString";
import isArrayLike from "./is/isArrayLike";
import isSet from "./is/isSet";
import isMap from "./is/isMap";
import isObject from "./is/isObject";

function _eachIterator<V, K extends string | number | symbol>(
  collection: any,
  callback: (
    value: V,
    index: K,
    collection: any
  ) => boolean | void | Promise<void>,
  forRight: boolean
) {
  let values
  let keys
  if (isString(collection) || isArrayLike(collection)) {
    let size = collection.length

    if (forRight) {
      while (size--) {
        const r = callback(collection[size] as V, size as K, collection)
        if (r === false) return
      }
    } else {
      for (let i = 0; i < size; i++) {
        const r = callback(collection[i] as V, i as K, collection)
        if (r === false) return
      }
    }
  } else if (isSet(collection)) {
    let size = collection.size

    if (forRight) {
      values = Array.from(collection)
      while (size--) {
        const r = callback(values[size] as V, size as K, collection)
        if (r === false) return
      }
    } else {
      values = collection.values()
      for (let i = 0; i < size; i++) {
        const r = callback(values.next().value as V, i as K, collection)
        if (r === false) return
      }
    }
  } else if (isMap(collection)) {
    let size = collection.size

    keys = collection.keys()
    values = collection.values()

    if (forRight) {
      keys = Array.from(keys)
      values = Array.from(values)
      while (size--) {
        const r = callback(values[size] as V, keys[size] as K, collection)
        if (r === false) return
      }
    } else {
      for (let i = 0; i < size; i++) {
        const r = callback(
          values.next().value as V,
          keys.next().value as K,
          collection
        )
        if (r === false) return
      }
    }
  } else if (isObject(collection)) {
    keys = Object.keys(collection)
    let size = keys.length

    if (forRight) {
      while (size--) {
        const k = keys[size]
        const r = callback((collection as any)[k] as V, k as K, collection)
        if (r === false) return
      }
    } else {
      for (let i = 0; i < size; i++) {
        const k = keys[i]
        const r = callback((collection as any)[k] as V, k as K, collection)
        if (r === false) return
      }
    }
  }
}

export default _eachIterator