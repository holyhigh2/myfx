import myfx from '../src/index'

/**
 * Tree module dedicated tests (complex structures)
 */
const tree = [
  { id: 1, pid: null, name: 'root', sortNo: 2 },
  { id: 2, pid: 1, name: 'child-a', sortNo: 1 },
  { id: 3, pid: 1, name: 'child-b', sortNo: 3 },
]

describe('tree', () => {
  describe('arrayToTree', () => {
    test('builds single root', () => {
      const rs = myfx.arrayToTree([{ id: 1, pid: null, name: 'r' } as any])
      expect(rs).toHaveLength(1)
      expect(rs[0].name).toBe('r')
    })
    test('builds children under root', () => {
      const rs = myfx.arrayToTree(tree as any)
      expect(rs).toHaveLength(1)
      expect(rs[0].children).toHaveLength(2)
    })
    test('non-array returns empty', () => {
      expect(myfx.arrayToTree(null as any)).toEqual([])
    })
  })

  describe('walkTree', () => {
    test('visits all nodes', () => {
      const rs = myfx.arrayToTree(tree as any)
      const names: string[] = []
      myfx.walkTree(rs, (node: any) => { names.push(node.name) })
      expect(names).toEqual(['root', 'child-a', 'child-b'])
    })
    test('stops on false', () => {
      const rs = myfx.arrayToTree(tree as any)
      const names: string[] = []
      myfx.walkTree(rs, (node: any) => { names.push(node.name); return false })
      expect(names).toEqual(['root'])
    })
    test('non-object is no-op', () => {
      expect(() => myfx.walkTree(null as any, () => {})).not.toThrow()
    })
  })

  describe('sortTree', () => {
    test('sorts siblings', () => {
      const rs = myfx.arrayToTree(tree as any)
      myfx.sortTree(rs, (a: any, b: any) => a.sortNo - b.sortNo)
      expect(rs[0].children.map((c: any) => c.name)).toEqual(['child-a', 'child-b'])
    })
    test('sorts root level', () => {
      const nodes = [{ sortNo: 3 }, { sortNo: 1 }] as any[]
      myfx.sortTree(nodes, (a: any, b: any) => a.sortNo - b.sortNo)
      expect(nodes.map((n: any) => n.sortNo)).toEqual([1, 3])
    })
    test('empty array no-op', () => {
      expect(() => myfx.sortTree([], (a: any, b: any) => 0)).not.toThrow()
    })
  })

  describe('filterTree', () => {
    test('returns matching nodes with parents stripped of children', () => {
      const rs = myfx.arrayToTree(tree as any)
      const filtered = myfx.filterTree(rs, (n: any) => n.sortNo > 2)
      expect(filtered.length).toBeGreaterThan(0)
      expect(filtered[filtered.length - 1].name).toBe('child-b')
    })
    test('empty tree returns empty', () => {
      expect(myfx.filterTree([], () => true)).toEqual([])
    })
    test('no match returns empty', () => {
      const rs = myfx.arrayToTree(tree as any)
      expect(myfx.filterTree(rs, () => false)).toEqual([])
    })
  })

  describe('findTreeNode', () => {
    test('finds first match', () => {
      const rs = myfx.arrayToTree(tree as any)
      const node = myfx.findTreeNode<any>(rs, (n: any) => n.sortNo > 2)
      expect(node?.name).toBe('child-b')
    })
    test('returns undefined when no match', () => {
      const rs = myfx.arrayToTree(tree as any)
      expect(myfx.findTreeNode(rs, (n: any) => n.id === 999)).toBeUndefined()
    })
    test('predicate receives node', () => {
      const rs = myfx.arrayToTree(tree as any)
      const node = myfx.findTreeNode<any>(rs, (n: any) => n.name === 'root')
      expect(node?.id).toBe(1)
    })
  })

  describe('findTreeNodes', () => {
    test('finds all matches', () => {
      const rs = myfx.arrayToTree(tree as any)
      const nodes = myfx.findTreeNodes(rs, (n: any) => n.sortNo != null)
      expect(nodes.length).toBeGreaterThanOrEqual(3)
    })
    test('empty when no match', () => {
      const rs = myfx.arrayToTree(tree as any)
      expect(myfx.findTreeNodes(rs, (n: any) => n.id === 999)).toEqual([])
    })
    test('matches root', () => {
      const rs = myfx.arrayToTree(tree as any)
      const nodes = myfx.findTreeNodes(rs, (n: any) => n.name === 'root')
      expect(nodes).toHaveLength(1)
    })
  })

  describe('closest', () => {
    test('finds self when predicate matches', () => {
      const node = { id: 1 }
      expect(myfx.closest(node, (n: any) => n.id === 1, 'parent')).toBe(node)
    })
    test('walks up parent chain', () => {
      const parent = { id: 2 }
      const node = { id: 1, parent }
      expect(myfx.closest(node, (n: any) => n.id === 2, 'parent')).toBe(parent)
    })
    test('returns null when not found', () => {
      const node = { id: 1 }
      expect(myfx.closest(node, (n: any) => n.id === 99, 'parent')).toBeNull()
    })
  })
})
