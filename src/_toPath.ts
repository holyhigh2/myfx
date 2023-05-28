import isArray from "./is/isArray"

function toPath(path: Array<string | number> | string | number): string[] {
  let chain = path
  if (isArray(chain)) {
    chain = chain.join('.')
  } else {
    chain += ''
  }

  const rs = (chain + '')
    .replace(/\[([^\]]+)\]/gm, '.$1')
    .replace(/^\./g, '')
    .split('.')

  return rs
}

export default toPath