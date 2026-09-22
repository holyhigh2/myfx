import fs from 'fs';
import path from 'path';
import { Project } from "ts-morph";

//构建chainFx
function buildChainFx(dir) {
  const files = fs.readdirSync(dir)
  const project = new Project({})
  project.addSourceFilesAtPaths("src/**/*.ts");

  let funcAry = []
  files.forEach((item, index) => {
    var fullpath = path.join(dir, item)
    const stat = fs.statSync(fullpath)
    if (stat.isDirectory()) {
      if (item === 'template') return

      const sourceFiles = project.getSourceFiles(`src/${item}/*.ts`);

      let txt = ''
      sourceFiles.forEach(file => {
        const base = path.basename(file.getFilePath()).replace(/\.ts$/, '')
        const candidates = file.getFunctions().filter(f => f.getName() === base)
        const fn =
          candidates.find(f => !f.isOverload()) ||
          candidates[0] ||
          file.getFunctions().find(f => {
            const name = f.getName() || ''
            return !name.endsWith('Internal') && !name.startsWith('_')
          })
        if (!fn) {
          return
        }
        //返回值
        let rt = fn.getReturnType()
        if (rt.isVoid()) return

        //函数名
        let fnName = fn.getName()
        //泛型参数
        let types = fn.getTypeParameters()
        let typeStr = types.map(t => t.print()).reduce((p, c) => p + ',' + c, '').replace(/^,/, '')
        if (typeStr) {
          typeStr = '<' + typeStr + '>'
        }
        //参数
        let params = fn.getParameters()
        params.shift()
        let paramStr = params.map(p => p.print()).reduce((p, c) => p + ',' + c, '').replace(/^,/, '')
        txt = `${fnName}${typeStr}(${paramStr}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_${fnName}').call(this,...arguments)}`
        funcAry.push(txt)
      });
    }
  })

  let chainfx = fs.readFileSync('./src/chain.ts').toString()
  fs.writeFileSync('./src/chain.ts', chainfx.replace(/export class ChainFx \{.*\}\/\/#cfx/s, 'export class ChainFx {\n' + funcAry.join('\n') + '\n}//#cfx'))
}
buildChainFx('./src')