import isObject from "./is/isObject";
import type { UnknownMapKey } from "./types";

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
  for (let s = 0; s < sources.length; s++) {
    const src = sources[s]
    if (!isObject(src)) continue
    const ks = Object.keys(src)
    for (let i = 0; i < ks.length; i++) {
      const k = ks[i]
      let v = src[k]
      if (handler) {
        v = handler(src[k], target[k], k, src, target)
      }
      afterHandler(v, src[k], target[k], k, src, target)
    }
  }
}

export default eachSources