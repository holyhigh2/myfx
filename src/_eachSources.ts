import { UnknownMapKey } from "./types"
import isObject from "./is/isObject";

function eachSources(
  target: Record<UnknownMapKey, any>,
  sources: Record<UnknownMapKey, any>[],
  handler: Function | null,
  afterHandler: (
    v: any,
    sv: any,
    tv: any,
    k: string,
    s: Record<UnknownMapKey, any>,
    t: Record<UnknownMapKey, any>
  ) => void
) {
  sources.forEach((src) => {
    if (!isObject(src)) return
    Object.keys(src).forEach((k) => {
      let v = src[k]
      if (handler) {
        v = handler(src[k], target[k], k, src, target)
      }
      afterHandler(v, src[k], target[k], k, src, target)
    })
  })
}

export default eachSources