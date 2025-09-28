
function eq(a: unknown, b: unknown): boolean {
  return Object.is(a, b)
}

export default eq