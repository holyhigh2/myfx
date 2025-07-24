import isArray from "./is/isArray"

function toPath(path: Array<string | number> | string | number): string[] {
  let chain = path
  if (isArray(chain)) {
    chain = chain.join('.')
  }

  let rs = chain + ''
  if (rs.includes('[')) {
    rs = rs.replace(/\[(['"])?([^\]'"]+)\1?\]/gm, '.$2')
  }
  if (rs[0] === '.') {
    rs = rs.substring(1)
  }

  return rs.split('.')
}

export default toPath