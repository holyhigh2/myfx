function _getGrouped(str: string): string[] {
  return (
    str.match(
      /[A-Z]{2,}|([^\s-_]([^\s-_A-Z]+)?(?=[\s-_A-Z]))|([^\s-_]+(?=$))/g
    ) || []
  )
}

export default _getGrouped