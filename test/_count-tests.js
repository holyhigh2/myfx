// 统计每个导出函数的 jest 测试用例数（cases.*.ts 数据用例 + *.spec.ts 的 test/it）
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'src')
const testDir = path.join(root, 'test')

// 1. 收集所有导出函数名（模块目录下每个 .ts 文件的文件名即导出名）
const exported = new Set()
for (const d of fs.readdirSync(srcDir)) {
  const dir = path.join(srcDir, d)
  if (!fs.statSync(dir).isDirectory()) continue
  if (d === '_modules') continue
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.ts')) continue
    exported.add(f.replace(/\.ts$/, ''))
  }
}
exported.add('VERSION')
exported.add('chain')
exported.add('FuncChain')
exported.add('ChainFx')

// 2. cases.*.ts 顶层 key 的用例数（深度2数组字面量计数）
const casesCount = new Map()
for (const f of fs.readdirSync(testDir).filter((x) => x.startsWith('cases.') && x.endsWith('.ts'))) {
  const src = fs.readFileSync(path.join(testDir, f), 'utf8')
  const keyRe = /^ {2}([A-Za-z_$][\w$]*):\s*\[/gm
  const keys = []
  let m
  while ((m = keyRe.exec(src))) keys.push({ name: m[1], start: m.index + m[0].length - 1 })
  keys.forEach((k, i) => {
    const end = i + 1 < keys.length ? keys[i + 1].start : src.length
    const body = src.slice(k.start, end)
    let depth = 0
    let count = 0
    let inStr = null
    for (let j = 0; j < body.length; j++) {
      const c = body[j]
      if (inStr) {
        if (c === '\\') { j++; continue }
        if (c === inStr) inStr = null
        continue
      }
      if (c === '"' || c === "'" || c === '`') { inStr = c; continue }
      if (c === '[') { depth++; if (depth === 2) count++ }
      else if (c === ']') depth--
    }
    casesCount.set(k.name, (casesCount.get(k.name) || 0) + count)
  })
}

// 3. *.spec.ts：按花括号深度解析 describe/test 嵌套
const specCount = new Map()
function countSpec(src) {
  // token 流：匹配 describe/test/it 调用与 { } 
  const re = /\b(describe|test|it)\s*\(\s*(['"`])([^'"`]+)\2|([{}])/g
  const stack = [] // {type:'describe'|'root', name, tests:number}
  stack.push({ type: 'root', name: null, tests: 0 })
  let m
  while ((m = re.exec(src))) {
    if (m[1]) {
      const kind = m[1]
      const name = m[3]
      if (kind === 'describe') {
        stack.push({ type: 'describe', name, tests: 0, pendingDescribe: true })
        // describe 回调的 { 在后面遇到，无需特殊处理
      } else {
        // test/it：计入当前栈顶
        const top = stack[stack.length - 1]
        top.tests++
        // 同时，若当前是 describe 且其父级/自身是函数名，稍后汇总
      }
    } else if (m[4] === '{') {
      // 进入块 —— describe 的回调块
      const top = stack[stack.length - 1]
      if (top.pendingDescribe) top.pendingDescribe = false, top.inBlock = true
      else top.depth = (top.depth || 0) + 1
    } else if (m[4] === '}') {
      const top = stack[stack.length - 1]
      if (top.type !== 'root' && top.inBlock && !top.depth) {
        stack.pop()
        // 归属：describe 名本身是导出函数 → 计入；否则向上找最近的函数名 describe
        if (exported.has(top.name)) {
          specCount.set(top.name, (specCount.get(top.name) || 0) + top.tests)
        } else {
          // 向上归并到父 describe 的计数（父级稍后统一处理）——直接累到父
          const parent = stack[stack.length - 1]
          if (parent && parent.type === 'describe') {
            parent.tests += top.tests
            // 若父是函数，pop 时会统计；嵌套再深也一样
          }
        }
      } else if (top.type === 'root') {
        // 忽略
      } else {
        top.depth = (top.depth || 0) - 1
        if (top.depth < 0) top.depth = 0
      }
    }
  }
  // 未闭合的兜底
  while (stack.length > 1) {
    const top = stack.pop()
    if (exported.has(top.name)) specCount.set(top.name, (specCount.get(top.name) || 0) + top.tests)
    else {
      const parent = stack[stack.length - 1]
      if (parent && parent.type === 'describe') parent.tests += top.tests
    }
  }
  if (stack[0] && stack[0].type === 'describe' && exported.has(stack[0].name)) {
    specCount.set(stack[0].name, (specCount.get(stack[0].name) || 0) + stack[0].tests)
  }
}

for (const f of fs.readdirSync(testDir).filter((x) => x.endsWith('.spec.ts'))) {
  countSpec(fs.readFileSync(path.join(testDir, f), 'utf8'))
}

// 汇总
const rows = []
for (const fn of [...exported].sort()) {
  const c = casesCount.get(fn) || 0
  const s = specCount.get(fn) || 0
  rows.push({ fn, cases: c, spec: s, total: c + s })
}
const bad = rows.filter((r) => r.total < 3 && r.fn !== 'VERSION' && r.fn !== 'chain' && r.fn !== 'FuncChain' && r.fn !== 'ChainFx')
console.log(`导出函数总数: ${rows.length}`)
console.log(`用例不足3个的函数(排除VERSION/chain/FuncChain): ${bad.length}`)
console.log('---')
for (const r of bad) console.log(`${r.fn}: cases=${r.cases} spec=${r.spec} total=${r.total}`)
console.log('\n---cases 中存在但非导出---')
for (const k of [...casesCount.keys()].sort()) if (!exported.has(k)) console.log(k, casesCount.get(k))
