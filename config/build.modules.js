import fs from 'fs'
import path from 'path'

//创建模块
function buildModules(dir) {
  const files = fs.readdirSync(dir)
  
  files.forEach((item, index) => {
    var fullpath = path.join(dir, item)
    const stat = fs.statSync(fullpath)
    if (stat.isDirectory()) {
      if(item === '_modules')return
      
      const funcs = fs.readdirSync(fullpath)

      let txt = ''
      let funcAry = []
      funcs.forEach(fn => {
        const funcName = fn.replace('.ts', '')
        funcAry.push(funcName)
        txt += `import ${funcName} from '../${item}/${funcName}'\n`

      });
      txt = txt.replace(/export default .*\n/, '')
      txt += `\nexport {${funcAry.join(',')}}`

      fs.writeFileSync(`src/_modules/${item}.ts`, txt)
    }
  })
}
buildModules('./src')