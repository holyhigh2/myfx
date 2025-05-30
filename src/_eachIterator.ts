import isArrayLike from "./is/isArrayLike";
import isMap from "./is/isMap";
import isObject from "./is/isObject";
import isSet from "./is/isSet";
import isString from "./is/isString";

function _eachIterator<V, K extends string | number | symbol>(
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

    for (let i = 0; i < size; i++) {
      const r = callback(collection[i] as V, i as K, collection)
      if (r === false) return
    }

  } else if (isSet(collection)) {
    let size = collection.size

    values = collection.values()
    for (let i = 0; i < size; i++) {
      const r = callback(values.next().value as V, i as K, collection)
      if (r === false) return
    }

  } else if (isMap(collection)) {
    let size = collection.size

    keys = collection.keys()
    values = collection.values()

    for (let i = 0; i < size; i++) {
      const r = callback(
        values.next().value as V,
        keys.next().value as K,
        collection
      )
      if (r === false) return
    }

  } else if (isObject(collection)) {
    keys = Object.keys(collection)
    let size = keys.length

    for (let i = 0; i < size; i++) {
      const k = keys[i]
      const r = callback((collection as any)[k] as V, k as K, collection)
      if (r === false) return
    }

  }
}

export default _eachIterator