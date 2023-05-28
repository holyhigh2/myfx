
function eq(a: unknown, b: unknown): boolean {
  if (Number.isNaN(a) && Number.isNaN(b)) return true
  return a === b
}

export default eq